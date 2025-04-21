import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import { CharStream, CommonTokenStream } from "antlr4ng";
import { RustLexer } from "./parser/src/RustLexer";
import { RustParser } from "./parser/src/RustParser";
import { ASTToJsonVisitor } from "./ASTToJsonVisitor";
import { RustCompiler, primitive } from "./RustCompiler";
import { RustTypeChecker } from "./RustTypeChecker";
import { TypeCheckerError } from "./error/TypeCheckerError";

const word_size = 8;
const tmp_var_size = 2;
const mem_size = 2 ** 20;
const word_layout = {
  tag_os: 0,
  data_os: 1,
  size_os: 5,
};

const mem_make = (bytes: number) => {
  if (bytes % word_size !== 0)
    throw new Error("heap bytes must be divisible by 8");
  const data = new ArrayBuffer(bytes);
  const view = new DataView(data);
  return view;
};

enum Tag {
  False = 0,
  True = 1,
  Char = 2,
  Unassigned = 3,
  Number = 4,
  Closure = 7,
  String = 11,
}

const val_is_bool = (x: any) => typeof x === "boolean";
const val_is_number = (x: any) => typeof x === "number";
const val_is_string = (x: any) => typeof x === "string";

type OS_prim = { isaddr: boolean; val: primitive };
type OS_fun = { isaddr: boolean; val: [number, number, number]; isfun: true };
type OS_t = OS_prim | OS_fun;

export class RustEvaluator extends BasicEvaluator {
  private executionCount: number;
  private astToJsonVisitor: ASTToJsonVisitor;
  private mem: DataView;
  private free: number;
  private stack: number[]; // addrs of start of each stack frame
  private stacktop: number;
  private FDD: number; // depth of the function currently in when declared
  private FRD: number; // depth of the function currently in when called used to translate the compile time positions of vars
  private TCF: number; // number of tail call frames

  private OS: OS_t[];
  private PC: number;
  private RTS: [number, number, number][];
  private stringPool: Record<string, { addr: number; str: string }[]>;
  // private literals: { unassigned: number };

  constructor(conductor: IRunnerPlugin) {
    super(conductor);
    this.executionCount = 0;
    this.astToJsonVisitor = new ASTToJsonVisitor();
  }

  heap_allocate = (tag: Tag, size: number) => {
    const addr = this.free;
    this.free += size;
    this.mem.setUint8(addr * word_size, tag);
    this.mem.setUint16(addr * word_size + word_layout.size_os, size);
    return addr;
  };

  mem_get = (addr: number) => this.mem.getFloat64(addr * word_size);
  mem_setw = (addr: number, x: number) =>
    this.mem.setFloat64(addr * word_size, x);
  mem_get_child = (addr: number, child_ind: number) =>
    this.mem_get(addr + 1 + child_ind);
  mem_set_child = (addr: number, child_ind: number, x: number) =>
    this.mem_setw(addr + 1 + child_ind, x);
  mem_get_tag = (addr: number): Tag => this.mem.getUint8(addr * word_size);
  mem_get_size = (addr: number) =>
    this.mem.getUint16(addr * word_size + word_layout.size_os);
  mem_get_num_children = (addr: number) =>
    this.mem_get_tag(addr) === Tag.Number ? 0 : this.mem_get_size(addr) - 1;
  mem_setb_at_os = (addr: number, offset: number, x: number) =>
    this.mem.setUint8(addr * word_size + offset, x);
  mem_set2b_at_os = (addr: number, offset: number, x: number) =>
    this.mem.setUint16(addr * word_size + offset, x);
  mem_set4b_at_os = (addr: number, offset: number, x: number) =>
    this.mem.setUint32(addr * word_size + offset, x);
  mem_getb_at_os = (addr: number, offset: number) =>
    this.mem.getUint8(addr * word_size + offset);
  mem_get2b_at_os = (addr: number, offset: number) =>
    this.mem.getUint16(addr * word_size + offset);
  mem_get4b_at_os = (addr: number, offset: number) =>
    this.mem.getUint32(addr * word_size + offset);
  mem_copyw = (src: number, dest: number, size: number) => {
    console.log("copying: ", src, dest, size);
    for (let i = 0; i < size; i++)
      this.mem_setw(dest + i, this.mem_get(src + i));
  };

  // NOTE: Stack funcs
  stack_push_frame = (size: number) => {
    this.stack.push(this.stacktop);
    this.stacktop -= size * tmp_var_size;
    if (this.stacktop < 0) throw new Error("Stack overflow"); // TODO: More accurately is when the stack space and heap space overlap
  };

  stack_pop_frame = () => {
    const frame_addr = this.stack.pop();
    if (frame_addr === undefined) throw new Error("Stack underflow");
    this.stacktop = frame_addr;
  };

  stack_get = (fi: number, vi: number) => {
    const frame_addr = this.stack[fi];
    if (frame_addr === undefined) throw new Error("Unknown error");
    return frame_addr - (vi + 1) * tmp_var_size; // +1 for left align
  };

  stack_set_num = (addr: number, v: number) => {
    console.log("set num: ", addr * word_size, v);
    this.mem.setUint8(addr * word_size, Tag.Number);
    this.mem_set_child(addr, 0, v);
  };

  stack_set_true = (addr: number) =>
    this.mem.setUint8(addr * word_size, Tag.True);
  stack_set_false = (addr: number) =>
    this.mem.setUint8(addr * word_size, Tag.False);

  stack_set_closure = (
    addr: number,
    arity: number,
    pc: number,
    denv: number
  ) => {
    this.mem.setUint8(addr * word_size, Tag.Closure);
    this.mem_setb_at_os(addr, word_layout.data_os, arity);
    this.mem_set2b_at_os(addr, word_layout.data_os + 1, pc);
    this.mem_set_child(addr, 0, denv);
  };

  // NOTE: Literal Funcs
  is_boolean = (addr: number) =>
    this.mem_get_tag(addr) === Tag.True || this.mem_get_tag(addr) === Tag.False;
  is_true = (addr: number) => this.mem_get_tag(addr) === Tag.True;
  is_unassigned = (addr: number) => this.mem_get_tag(addr) === Tag.Unassigned;

  word_to_string = (word: number) => {
    const buf = new ArrayBuffer(8);
    const view = new DataView(buf);
    view.setFloat64(0, word);
    let binStr = "";
    for (let i = 0; i < 8; i++)
      binStr += ("00000000" + view.getUint8(i).toString(2)).slice(-8) + " ";
    return binStr;
  };

  // NOTE: String Funcs
  is_str = (addr: number) => this.mem_get_tag(addr) === Tag.String;

  hash_str = (str: string) => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) + hash + char;
      hash = hash & hash;
    }
    return hash >>> 0;
  };

  heap_allocate_string = (str: string) => {
    const hash = this.hash_str(str);
    const a = this.stringPool[hash];
    let i = 0;
    if (a) {
      for (; i < a.length; i++) if (a[i].str === str) return a[i].addr;
    } else this.stringPool[hash] = [];

    const addr = this.heap_allocate(Tag.String, 1);
    this.mem_set4b_at_os(addr, word_layout.data_os, hash);
    this.mem_set2b_at_os(addr, word_layout.size_os, i); // uses bytes for size to store index in pool entry
    this.stringPool[hash].push({ addr, str });
    return addr;
  };

  heap_get_string_hash = (addr: number) =>
    this.mem_get4b_at_os(addr, word_layout.data_os);
  heap_get_string_index = (addr: number) =>
    this.mem_get2b_at_os(addr, word_layout.size_os);
  heap_get_string = (addr: number) =>
    this.stringPool[this.heap_get_string_hash(addr)][
      this.heap_get_string_index(addr)
    ].str;

  // NOTE: Closure Funcs
  is_closure = (addr: number) => this.mem_get_tag(addr) === Tag.Closure;

  get_closure_arity = (addr: number) =>
    this.mem_getb_at_os(addr, word_layout.data_os);
  get_closure_pc = (addr: number) =>
    this.mem_get2b_at_os(addr, word_layout.data_os + 1);
  get_closure_denv = (addr: number) => this.mem_get_child(addr, 0);

  // NOTE: Number funcs
  is_number = (addr: number) => this.mem_get_tag(addr) === Tag.Number;
  heap_allocate_num = (n: number) => {
    const num_addr = this.heap_allocate(Tag.Number, 2);
    this.mem_set_child(num_addr, 0, n);
    return num_addr;
  };

  // NOTE: Conversion between addr and values
  address_to_value = (addr: number) =>
    this.is_boolean(addr)
      ? this.is_true(addr)
        ? true
        : false
      : this.is_number(addr)
      ? this.mem_get_child(addr, 0)
      : this.is_unassigned(addr)
      ? "<unassigned>"
      : this.is_str(addr)
      ? this.heap_get_string(addr)
      : this.is_closure(addr)
      ? "<closure>"
      : "unknown word tag: " + this.word_to_string(addr);

  value_to_address = (x: any) =>
    val_is_number
      ? this.heap_allocate_num(x)
      : val_is_string(x)
      ? this.heap_allocate_string(x)
      : "unknown word tag: " + this.word_to_string(x);

  // TODO: Builtin impls

  // NOTE: Operator builtins
  // TODO: Look into operator overloading
  unop_microcode = {
    "-unary": (x: any) => -x,
    "!": (x: any) => !x,
  };

  pointer_unop_microcode = {
    "&": (addr: number) => addr,
    "&mut": (addr: number) => addr,
    "*unary": (addr: number) => this.address_to_value(addr)
  }

  binop_microcode = {
    "+": (x: any, y: any) => x + y,
    "*": (x: any, y: any) => x * y,
    "-": (x: any, y: any) => x - y,
    "/": (x: any, y: any) => x / y,
    "%": (x: any, y: any) => x % y,
    "<": (x: any, y: any) => x < y,
    "<=": (x: any, y: any) => x <= y,
    ">=": (x: any, y: any) => x >= y,
    ">": (x: any, y: any) => x > y,
    "==": (x: any, y: any) => x === y,
    "!=": (x: any, y: any) => x !== y,
  };

  apply_binop = (op: string, opr2: OS_prim, opr1: OS_prim): number => {
    console.log("opr1v: ", opr1.isaddr ? this.address_to_value(opr1.val as number) : opr1.val);
    console.log("opr2v: ", opr2.isaddr ? this.address_to_value(opr2.val as number) : opr2.val);
    return this.binop_microcode[op](
      opr1.isaddr ? this.address_to_value(opr1.val as number) : opr1.val,
      opr2.isaddr ? this.address_to_value(opr2.val as number) : opr2.val
    );
  };
  apply_unop = (op: string, opr: OS_prim): number => {
    if (this.pointer_unop_microcode[op]) {
      return this.pointer_unop_microcode[op](opr.val);
    } else return this.unop_microcode[op](
      opr.isaddr ? this.address_to_value(opr.val as number) : opr.val
    );
  }

  microcode = {
    LDC: (instr: { tag: string; val: primitive }) =>
      this.OS.push({ isaddr: false, val: instr.val }),
    UNOP: (instr: { tag: string; sym: string }) =>
      // when returning addresses isaddr remains false as no indirection is required
      this.OS.push({
        isaddr: false,
        val: this.apply_unop(instr.sym, this.OS.pop() as OS_prim),
      }),
    BINOP: (instr: { tag: string; sym: string }) =>
      this.OS.push({
        isaddr: false,
        val: this.apply_binop(
          instr.sym,
          this.OS.pop() as OS_prim,
          this.OS.pop() as OS_prim
        ),
      }),
    POP: (instr: { tag: string }) => this.OS.pop(),
    JOF: (instr: { tag: string; addr: number }) =>
      (this.PC = this.OS.pop().val ? this.PC : instr.addr),
    GOTO: (instr: { tag: string; addr: number }) => (this.PC = instr.addr),
    // TODO: assumes each var use one word, havent account for structs
    ENTER_SCOPE: (instr: { tag: string; num: number }) => {
      this.stack_push_frame(instr.num);
    },
    EXIT_SCOPE: (instr: { tag: string }) => {
      this.stack_pop_frame();
    },
    LD: (instr: { tag: string; pos: [number, number] }) => {
      let [fi, vi] = instr.pos;
      if (this.FDD != -1 && fi >= this.FDD) fi += this.FRD - this.FDD;
      console.log("FDD FRD: ", this.FDD, this.FRD);
      console.log("og pos: ", instr.pos);
      console.log("Var pos: ", fi, vi);
      this.OS.push({ isaddr: true, val: this.stack_get(fi, vi) });
    },
    ASSIGN_DEREF: (instr: { tag: string }) => {
      const opr = this.OS.pop();
      const addr = this.OS.pop().val as number;
      if ("isfun" in opr) {
        this.stack_set_closure(addr, opr.val[0], opr.val[1], opr.val[2]);
      } else if (val_is_bool(opr.val)) {
        if (opr.val) this.stack_set_true(addr);
        else this.stack_set_false(addr);
      } else if (val_is_number(opr.val))
        this.stack_set_num(addr, opr.val as number);
    },
    ASSIGN: (instr: { tag: string; pos: [number, number] }) => {
      let [fi, vi] = instr.pos;
      if (this.FDD != -1 && fi >= this.FDD) fi += this.FRD - this.FDD;
      console.log("FDD FRD: ", this.FDD, this.FRD);
      console.log("og pos: ", instr.pos);
      console.log("Var pos: ", fi, vi);
      const addr = this.stack_get(fi, vi);
      console.log("Addr: ", addr);
      const fopr = this.OS.pop();
      if ("isfun" in fopr) {
        this.stack_set_closure(addr, fopr.val[0], fopr.val[1], fopr.val[2]);
      } else if (val_is_bool(fopr.val)) {
        if (fopr.val) this.stack_set_true(addr);
        else this.stack_set_false(addr);
      } else if (val_is_number(fopr.val))
        this.stack_set_num(addr, fopr.val as number);
      else throw new Error("Trying to assign unsupported type");
    },
    LDF: (instr: { tag: string; arity: number; addr: number }) =>
      this.OS.push({
        isaddr: false,
        val: [instr.arity, instr.addr, this.stack.length],
        isfun: true,
      }),
    CALL: (instr: { tag: string; arity: number }) => {
      this.stack_push_frame(instr.arity);
      let addr = this.stacktop;
      for (let i = instr.arity - 1; i >= 0; i--) {
        const arg = this.OS.pop();
        if (!arg.isaddr) {
          // place the value in the argument directly
          if ("isfun" in arg) {
            this.stack_set_closure(addr, arg.val[0], arg.val[1], arg.val[2]); // passing functions as args
          } else if (val_is_bool(arg.val)) {
            if (arg.val) this.stack_set_true(addr);
            else this.stack_set_false(addr);
          } else if (val_is_number(arg.val))
            this.stack_set_num(addr, arg.val as number);
          else throw new Error("Trying to bind unsupported type to argument");
        } else this.mem_copyw(arg.val as number, addr, tmp_var_size);
        addr += tmp_var_size;
      }

      this.RTS.push([this.PC, this.FDD, this.FRD]);
      const fun = this.OS.pop();
      if ("isfun" in fun) {
        this.PC = fun.val[1];
        this.FDD = fun.val[2];
        this.FRD = this.stack.length - 1;
      } else {
        this.PC = this.get_closure_pc(fun.val as number);
        this.FDD = this.get_closure_denv(fun.val as number);
        this.FRD = this.stack.length - 1; // FDD is counted without the params frame therefore so shud FRD
      }
    },
    TAIL_CALL: (instr: { tag: string; arity: number }) => {
      this.stack_push_frame(instr.arity);
      let addr = this.stacktop;
      for (let i = instr.arity - 1; i >= 0; i--) {
        const arg = this.OS.pop();
        if (!arg.isaddr) {
          // place the value in the argument directly
          if ("isfun" in arg) {
            this.stack_set_closure(addr, arg.val[0], arg.val[1], arg.val[2]); // passing functions as args
          } else if (val_is_bool(arg.val)) {
            if (arg.val) this.stack_set_true(addr);
            else this.stack_set_false(addr);
          } else if (val_is_number(arg.val))
            this.stack_set_num(addr, arg.val as number);
          else throw new Error("Trying to bind unsupported type to argument");
        } else this.mem_copyw(arg.val as number, addr, tmp_var_size);
        addr += tmp_var_size;
      }

      this.TCF++;
      const fun = this.OS.pop();
      if ("isfun" in fun) {
        this.PC = fun.val[1];
        this.FDD = fun.val[2];
        this.FRD = this.stack.length - 1;
      } else {
        this.PC = this.get_closure_pc(fun.val as number);
        this.FDD = this.get_closure_denv(fun.val as number);
        this.FRD = this.stack.length - 1;
      }
    },
    RESET: (instr: { tag: string }) => {
      const call_frame = this.RTS.pop();
      this.PC = call_frame[0];
      this.FDD = call_frame[1];
      this.FRD = call_frame[2];
      for (let i = 0; i <= this.TCF; i++) this.stack_pop_frame();
    },
  };

  print_OS = (msg: string) => {
    console.log(msg);
    for (let i = 0; i < this.OS.length; i++) console.log(this.OS[i]);
  };

  print_RTS = (msg: string) => {
    console.log(msg);
    for (let i = 0; i < this.RTS.length; i++) console.log(this.RTS[i]);
  };

  print_stack = (msg: string) => {
    console.log(msg);
    for (let i = 0; i < this.stack.length; i++) console.log(this.stack[i]);
  };

  run(instrs: { tag: string }[]) {
    this.OS = [];
    this.RTS = [];
    this.stack = [];
    this.PC = 0;
    this.free = 0;
    this.stacktop = mem_size / word_size;
    console.log("stacktop: ", this.stacktop);
    this.FDD = -1;
    this.FRD = -1;
    this.stringPool = {};
    this.mem = mem_make(mem_size);
    // console.log("allocated env");
    //print_code()
    while (!(instrs[this.PC].tag === "DONE")) {
      //heap_display()
      //display(PC, "PC: ")
      //display(instrs[PC].tag, "instr: ")
      //print_OS("\noperands:            ");
      //print_RTS("\nRTS:            ");
      console.log("PC: ", this.PC);
      console.log("instr: ", instrs[this.PC]);
      this.print_OS("\noperands:            ");
      this.print_RTS("\nRTS:            ");
      this.print_stack("\nstack:            ");
      const instr = instrs[this.PC++];
      //display(instrs[PC].tag, "next instruction: ")
      this.microcode[instr.tag](instr);
    }
    //display(OS, "\nfinal operands:           ")
    //print_OS()
    if (this.OS[0].isaddr)
      return this.address_to_value(this.OS[0].val as number);
    else return this.OS[0].val;
  }

  async evaluateChunk(chunk: string): Promise<void> {
    this.executionCount++;
    try {
      // Create the lexer and parser
      const inputStream = CharStream.fromString(chunk);
      const lexer = new RustLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new RustParser(tokenStream);
      const compiler = new RustCompiler();
      const typeChecker = new RustTypeChecker();

      // Parse the input
      const tree = parser.prog();

      // Evaluate the parsed tree
      const json = this.astToJsonVisitor.visit(tree);
      console.log("json: ", json);

      typeChecker.check(json);
      console.log("type checking passed");

      const instrs = compiler.compile_program(json);
      console.log("compiled: ", instrs);

      // // Execute compiled code
      const res = this.run(instrs);
      // Send the result to the REPL
      this.conductor.sendOutput(`Result of expression: ${res}`);
    } catch (error) {
      if (error instanceof TypeCheckerError) {
        this.conductor.sendOutput(`Type Checker Error: ${error.message}`);
      } else if (error instanceof Error) {
        this.conductor.sendOutput(`Error: ${error.message}`);
      } else {
        this.conductor.sendOutput(`Error: ${String(error)}`);
      }
    }
  }
}
