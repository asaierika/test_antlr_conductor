import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import { CharStream, CommonTokenStream } from "antlr4ng";
import { RustLexer } from "./parser/src/RustLexer";
import { RustParser } from "./parser/src/RustParser";
import { ASTToJsonVisitor } from "./ASTToJsonVisitor";
import { RustCompiler } from "./RustCompiler";
import { RustTypeChecker } from "./RustTypeChecker";
import { TypeCheckerError } from "./error/TypeCheckerError";

type primitive = boolean | number | string | null;

const word_size = 8;
const heap_size = 2 ** 20;
const stack_size = 2 ** 10;
const word_layout = {
  tag_os: 0,
  data_os: 1,
  size_os: 5,
}
const heap_make = (bytes: number) => {
	if (bytes % word_size !== 0) throw new Error("heap bytes must be divisible by 8");
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
  Blockframe = 5,
  Callframe = 6,
  Closure = 7,
  Frame = 8,
  Environment = 9,
  Builtin = 10,
  String = 11,
  Null = 12,
}

const val_is_bool = (x: any) => typeof x === "boolean";
const val_is_number = (x: any) => typeof x === "number";
const val_is_string = (x: any) => typeof x === "string";
const val_is_null = (x: any) => x === null;

// TODO: RC
export class RustEvaluator extends BasicEvaluator {
  private executionCount: number;
  private astToJsonVisitor: ASTToJsonVisitor;
  private heap: DataView;
  private stack: DataView;
  private free: number;
  private OS: number[];
  private PC: number;
  private E: number;
  private RTS: number[];
  private ST_OS: number[];
  private stringPool: Record<string, {addr: number, str: string}[]>
  private literals: {false: number, true: number, null: number, unassigned: number};

  constructor(conductor: IRunnerPlugin) {
    super(conductor);
    this.executionCount = 0;
    this.astToJsonVisitor = new ASTToJsonVisitor();
  }

  // NOTE: Heap Funcs
  heap_allocate = (tag: Tag, size: number) => {
    const addr = this.free;
    this.free += size;
    this.heap.setUint8(addr * word_size, tag);
    this.heap.setUint16(addr * word_size + word_layout.size_os, size);
    return addr;
  };

  heap_get = (addr: number) => this.heap.getFloat64(addr * word_size);
  heap_setw = (addr: number, x: number) => this.heap.setFloat64(addr * word_size, x);
  heap_get_child = (addr: number, child_ind: number) => this.heap_get(addr + 1 + child_ind);
  heap_set_child = (addr: number, child_ind: number, x: number) => this.heap_setw(addr + 1 + child_ind, x);
  heap_get_tag = (addr: number) : Tag => this.heap.getUint8(addr * word_size);
  heap_get_size = (addr: number) => this.heap.getUint16(addr * word_size + word_layout.size_os);
  heap_get_num_children = (addr: number) => this.heap_get_tag(addr) === Tag.Number ? 0 : this.heap_get_size(addr) - 1;
  heap_setb_at_os = (addr: number, offset: number, x: number) => this.heap.setUint8(addr * word_size + offset, x);
  heap_set2b_at_os = (addr: number, offset: number, x: number) => this.heap.setUint16(addr * word_size + offset, x);
  heap_set4b_at_os = (addr: number, offset: number, x: number) => this.heap.setUint32(addr * word_size + offset, x);
  heap_getb_at_os = (addr: number, offset: number) => this.heap.getUint8(addr * word_size + offset);
  heap_get2b_at_os = (addr: number, offset: number) => this.heap.getUint16(addr * word_size + offset);
  heap_get4b_at_os = (addr: number, offset: number) => this.heap.getUint32(addr * word_size + offset);

  // NOTE: Literal Funcs
  is_false = (addr: number) => this.heap_get_tag(addr) === Tag.False;
  is_true = (addr: number) => this.heap_get_tag(addr) === Tag.True;
  is_boolean = (addr: number) => this.is_true(addr) || this.is_false(addr);
  is_null = (addr: number) => this.heap_get_tag(addr) === Tag.Null;
  is_unassigned = (addr: number) => this.heap_get_tag(addr) === Tag.Unassigned;


  heap_allocate_lits = () => {
    this.literals = {
      false: this.heap_allocate(Tag.False, 1),
      true: this.heap_allocate(Tag.True, 1),
      null: this.heap_allocate(Tag.Null, 1),
      unassigned: this.heap_allocate(Tag.Unassigned, 1),
    };
  }

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
  is_str = (addr: number) => this.heap_get_tag(addr) === Tag.String;

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
    this.heap_set4b_at_os(addr, word_layout.data_os, hash);
    this.heap_set2b_at_os(addr, word_layout.size_os, i); // uses bytes for size to store index in pool entry
    this.stringPool[hash].push({ addr, str });
    return addr;
  };

  heap_get_string_hash = (addr: number) => this.heap_get4b_at_os(addr, word_layout.data_os);
  heap_get_string_index = (addr: number) => this.heap_get2b_at_os(addr, word_layout.size_os);
	heap_get_string = (addr: number) => this.stringPool[this.heap_get_string_hash(addr)][this.heap_get_string_index(addr)].str;

  // NOTE: Builtin Funcs
  is_builtin = (addr: number) => this.heap_get_tag(addr) === Tag.Builtin;

  heap_allocate_builtin = (id: number) => {
    const addr = this.heap_allocate(Tag.Builtin, 1);
    this.heap_setb_at_os(addr, word_layout.data_os, id);
    return addr;
  };

  heap_get_builtin_id = (addr: number) => this.heap_getb_at_os(addr, word_layout.data_os);

  // NOTE: Closure Funcs
  is_closure = (addr: number) => this.heap_get_tag(addr) === Tag.Closure;

  heap_allocate_closure = (arity: number, pc: number, env: number) => {
    const addr = this.heap_allocate(Tag.Closure, 2);
    this.heap_setb_at_os(addr, word_layout.data_os, arity);
    this.heap_set2b_at_os(addr, word_layout.data_os + 1, pc);
    this.heap_set_child(addr, 0, env);
    return addr;
  };
  
  heap_get_closure_arity = (addr: number) => this.heap_getb_at_os(addr, word_layout.data_os);
  heap_get_closure_pc = (addr: number) => this.heap_get2b_at_os(addr, word_layout.data_os + 1);
  heap_get_closure_env = (addr: number) => this.heap_get_child(addr, 0);

  // NOTE: Blockframe funcs
  is_Blockframe = (addr: number) => this.heap_get_tag(addr) === Tag.Blockframe;

  heap_allocate_blkframe = (env: number) => {
    const addr = this.heap_allocate(Tag.Blockframe, 2);
    this.heap_set_child(addr, 0, env);
    return addr;
  };

  heap_get_blkframe_env = (addr: number) => this.heap_get_child(addr, 0);

  // NOTE: Callframe funcs
  is_callframe = (addr: number) => this.heap_get_tag(addr) === Tag.Callframe;

  heap_allocate_callframe = (env: number, pc: number) => {
    const addr = this.heap_allocate(Tag.Callframe, 2);
    this.heap_set2b_at_os(addr, word_layout.data_os, pc);
    this.heap_set_child(addr, 0, env);
    return addr;
  };
  
  heap_get_callframe_env = (addr: number) => this.heap_get_child(addr, 0);
  heap_get_callframe_pc = (addr: number) => this.heap_get2b_at_os(addr, word_layout.data_os);
  
  // NOTE: Env funcs
  heap_allocate_frame = (num_of_vals: number) => this.heap_allocate(Tag.Frame, num_of_vals + 1);
  heap_allocate_env = (num_of_frames: number) => this.heap_allocate(Tag.Environment, num_of_frames + 1);
  
  // access environment given by addr using a "position", i.e. a pair of frame index and value index
  heap_get_env_value = (env_addr: number, position: [number, number]) => {
    const [frame_index, value_index] = position;
    const frame_addr = this.heap_get_child(env_addr, frame_index);
    return this.heap_get_child(frame_addr, value_index);
  };
  
  heap_set_env_value = (env_addr: number, position: [number, number], value: number) => {
    const [frame_index, value_index] = position;
    const frame_addr = this.heap_get_child(env_addr, frame_index);
    this.heap_set_child(frame_addr, value_index, value);
  };
  
  // extend a given environment by a new frame: create a new environment that is bigger by 1
  // frame slot than the given environment. copy the frame addres of the given environment to the new environment.
  // enter the addr of the new frame to end of the new environment
  heap_env_extend = (frame_addr: number, env_addr: number) => {
    const old_size = this.heap_get_size(env_addr);
    const new_env_addr = this.heap_allocate_env(old_size);
    let i: number;
    for (i = 0; i < old_size - 1; i++) this.heap_set_child(new_env_addr, i, this.heap_get_child(env_addr, i));
    this.heap_set_child(new_env_addr, i, frame_addr);
    return new_env_addr;
  };

  // NOTE: Number funcs
  is_number = (addr: number) => this.heap_get_tag(addr) === Tag.Number;
  heap_allocate_num = (n: number) => {
    const num_addr = this.heap_allocate(Tag.Number, 2);
    this.heap_set_child(num_addr, 0, n);
    return num_addr;
  };

  // NOTE: Conversion between addr and values
  address_to_value = (addr: number) =>
    this.is_boolean(addr)
      ? this.is_true(addr) ? true : false
      : this.is_number(addr) ? this.heap_get_child(addr, 0)
      : this.is_unassigned(addr) ? "<unassigned>"
      : this.is_null(addr) ? null
      : this.is_str(addr) ? this.heap_get_string(addr)
      : this.is_closure(addr) ? "<closure>"
      : this.is_builtin(addr) ? "<builtin>"
      : "unknown word tag: " + this.word_to_string(addr);

    
  value_to_address = (x: any) =>
	  val_is_bool(x)
		? x ? this.literals.true : this.literals.false
		: val_is_number ? this.heap_allocate_num(x) 
		: val_is_null(x) ? this.literals.null
		: val_is_string(x) ? this.heap_allocate_string(x)
		: "unknown word tag: " + this.word_to_string(x);

  // TODO: Builtin impls

  // NOTE: Operator builtins
  // TODO: Look into operator overloading
  unop_microcode = {
    "-unary": (x: any) => -x,
    "!": (x: any) => !x,
  };

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
    "===": (x: any, y: any) => x === y,
    "!==": (x: any, y: any) => x !== y,
  };

  apply_binop = (op: string, v2: any, v1: any): number => this.value_to_address(this.binop_microcode[op](this.address_to_value(v1), this.address_to_value(v2))) as number;
  apply_unop = (op: string, v: any): number => this.value_to_address(this.unop_microcode[op](this.address_to_value(v))) as number;

  microcode = {
    LDC: (instr: {tag: string, val: primitive}) => this.OS.push(this.value_to_address(instr.val) as number),
    UNOP: (instr: {tag: string, sym: string}) => this.OS.push(this.apply_unop(instr.sym, this.OS.pop())),
    BINOP: (instr: {tag: string, sym: string}) => this.OS.push(this.apply_binop(instr.sym, this.OS.pop(), this.OS.pop())),
    POP: (instr: {tag: string}) => this.OS.pop(),
    JOF: (instr: {tag: string, addr: number}) => (this.PC = this.is_true(this.OS.pop()) ? this.PC : instr.addr),
    GOTO: (instr: {tag: string, addr: number}) => (this.PC = instr.addr),
    // TODO: Convert to stack
    ENTER_SCOPE: (instr: {tag: string, num: number}) => {
      this.RTS.push(this.heap_allocate_blkframe(this.E));
      const frame_address = this.heap_allocate_frame(instr.num);
      this.E = this.heap_env_extend(frame_address, this.E);
      for (let i = 0; i < instr.num; i++) this.heap_set_child(frame_address, i, this.literals.unassigned);
    },
    EXIT_SCOPE: (instr: {tag: string}) => (this.E = this.heap_get_blkframe_env(this.RTS.pop())),
    LD: (instr: {tag: string, pos: [number, number]}) => {
      const val = this.heap_get_env_value(this.E, instr.pos);
      // if (is_Unassigned(val)) error("access of unassigned variable");
      this.OS.push(val);
    },
    ASSIGN: (instr: {tag: string, pos: [number, number]}) => this.heap_set_env_value(this.E, instr.pos, this.OS[this.OS.length - 1]),
    LDF: (instr: {tag: string, arity: number, addr: number}) => {
      const closure_address = this.heap_allocate_closure(instr.arity, instr.addr, this.E);
      this.OS.push(closure_address);
    },
    CALL: (instr: {tag: string, arity: number}) => {
      const arity = instr.arity;
      const fun = this.OS[this.OS.length - arity - 1];
      const frame_address = this.heap_allocate_frame(arity);
      for (let i = arity - 1; i >= 0; i--) this.heap_set_child(frame_address, i, this.OS.pop());
      this.OS.pop(); // pop fun
      this.RTS.push(this.heap_allocate_callframe(this.E, this.PC));
      this.E = this.heap_env_extend(frame_address, this.heap_get_closure_env(fun));
      this.PC = this.heap_get_closure_pc(fun);
    },
    TAIL_CALL: (instr: {tag: string, arity: number}) => {
      const arity = instr.arity;
      const fun = this.OS[this.OS.length - arity - 1];
      const frame_address = this.heap_allocate_frame(arity);
      for (let i = arity - 1; i >= 0; i--) this.heap_set_child(frame_address, i, this.OS.pop());
      this.OS.pop(); // pop fun
      // don't push on RTS here
      this.E = this.heap_env_extend(frame_address, this.heap_get_closure_env(fun));
      this.PC = this.heap_get_closure_pc(fun);
    },
    RESET: (instr: {tag: string}) => {
      // keep popping...
      const top_frame = this.RTS.pop();
      if (this.is_callframe(top_frame)) {
        // ...until top frame is a call frame
        this.PC = this.heap_get_callframe_pc(top_frame);
        this.E = this.heap_get_callframe_env(top_frame);
      } else this.PC--;
    },
  };

  run(instrs: {tag: string}[]) {
    this.OS = [];
    this.RTS = [];
    this.PC = 0;
    this.free = 0;
    this.stringPool = {};
    this.heap = heap_make(heap_size);
    this.E = this.heap_allocate_env(0);
    // console.log("allocated env");
    this.heap_allocate_lits();
    // console.log("allocated literals");
    //print_code()
    while (!(instrs[this.PC].tag === "DONE")) {
      //heap_display()
      //display(PC, "PC: ")
      //display(instrs[PC].tag, "instr: ")
      //print_OS("\noperands:            ");
      //print_RTS("\nRTS:            ");
      // console.log("PC: ", this.PC);
      // console.log("instr: ", instrs[this.PC]);
      const instr = instrs[this.PC++];
      //display(instrs[PC].tag, "next instruction: ")
      this.microcode[instr.tag](instr);
    }
    //display(OS, "\nfinal operands:           ")
    //print_OS()
    return this.address_to_value(this.OS[0]);
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
      console.log("json: ");
      console.log(json);

      typeChecker.check(json);
      console.log("type checking passed");

      const instrs = compiler.compile_program(json);
      console.log("compiled: ");
      console.log(instrs);

      // Execute compiled code
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
