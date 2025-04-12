type Goto_instruction = { tag: string; addr: number };

type compile_comp = {tag: string, [key: string]: any};
type compiled_comp = compile_comp;
export type primitive = boolean | number;

export class RustCompiler {
  private wc: number = 0;
  private instrs: compiled_comp[] = [];

  private primitive_object = {};
  global_compile_frame = Object.keys(this.primitive_object);
  global_compile_environment = [this.global_compile_frame];
  while_instrs: number[] = [];
  break_map: Map<number, Goto_instruction[]> = new Map(); // maps the current while loop start addr to the break instructions inside
  continue_map: Map<number, Goto_instruction[]> = new Map(); // maps the current while loop start addr to the continue instructions inside
  blk_map: Map<number, number> = new Map(); // maps the current while loop start addr to the number of blocks until the break/continue
  compile_time_environment_position = (env: string[][], x: string) => {
    let frame_index = env.length;
    while (this.value_index(env[--frame_index], x) === -1) {}
    return [frame_index - 1, this.value_index(env[frame_index], x)];
  };

  value_index = (frame: string[], x: string) => {
    for (let i = 0; i < frame.length; i++)
      if (frame[i] === x) return i;
    return -1;
  };

  scan = (comp: compile_comp) =>
    comp.tag === "seq"
      ? comp.stmts.reduce((acc, x) => acc.concat(this.scan(x)), [])
      : ["let", "const", "fun"].includes(comp.tag)
      ? [comp.sym]
      : [];

  compile_time_environment_extend = (vs: string[], e: string[][]) => {
    e.push(vs);
    return e;
  }

  compile_sequence = (seq: compile_comp[], ce: string[][]) => {
    if (seq.length === 0)
      return (this.instrs[this.wc++] = { tag: "LDC", val: undefined });
    let frst = true;
    for (let comp of seq) {
      frst ? (frst = false) : (this.instrs[this.wc++] = { tag: "POP" });
      this.compile(comp, ce);
    }
  };

  compile_program(program: compile_comp): compiled_comp[] {
    this.wc = 0;
    this.instrs = [];
    this.compile(program, this.global_compile_environment);
    this.instrs[this.wc] = { tag: "DONE" };
    return this.instrs;
  }

  compile(comp: any, ce: any): void {
    //console.log(comp.tag);
    this.compile_comp[comp.tag](comp, ce);
  }

  compile_comp = {
    lit: (comp: {val: primitive}, ce: string[][]) => {
      this.instrs[this.wc++] = { tag: "LDC", val: comp.val };
    },
    nam:
      // store precomputed position information in LD instruction
      (comp: {sym: string}, ce: string[][]) => {
        this.instrs[this.wc++] = {
          tag: "LD",
          sym: comp.sym,
          pos: this.compile_time_environment_position(ce, comp.sym),
        };
      },
    unop: (comp: {sym: string, frst: compile_comp}, ce: string[][]) => {
      this.compile(comp.frst, ce);
      this.instrs[this.wc++] = { tag: "UNOP", sym: comp.sym };
    },
    binop: (comp: {frst: compile_comp, scnd: compile_comp, sym: string}, ce: string[][]) => {
      this.compile(comp.frst, ce);
      this.compile(comp.scnd, ce);
      this.instrs[this.wc++] = { tag: "BINOP", sym: comp.sym };
    },
    log: (comp: {sym: string, frst: compile_comp, scnd: compile_comp}, ce: string[][]) => {
      this.compile(
        comp.sym == "&&"
          ? {
              tag: "cond",
              pred: comp.frst,
              cons: { tag: "lit", val: true },
              alt: comp.scnd,
            }
          : {
              tag: "cond",
              pred: comp.frst,
              cons: comp.scnd,
              alt: { tag: "lit", val: false },
            },
        ce
      );
    },
    cond: (comp: {pred: compile_comp, cons: compile_comp, alt: compile_comp}, ce: string[][]) => {
      this.compile(comp.pred, ce);
      const jump_on_false_instruction = { tag: "JOF", addr: undefined };
      this.instrs[this.wc++] = jump_on_false_instruction;
      this.compile(comp.cons, ce);
      const goto_instruction = { tag: "GOTO", addr: undefined };
      this.instrs[this.wc++] = goto_instruction;
      const alternative_address = this.wc;
      jump_on_false_instruction.addr = alternative_address;
      if (comp.alt != null) this.compile(comp.alt, ce);
      goto_instruction.addr = this.wc;
    },
    while: (comp: {pred: compile_comp, body: compile_comp}, ce: string[][]) => {
      this.blk_map.set(this.wc, 0);
      this.while_instrs.push(this.wc);
      const loop_start = this.wc;
      this.compile(comp.pred, ce);
      const jump_on_false_instruction = { tag: "JOF", addr: undefined };
      this.instrs[this.wc++] = jump_on_false_instruction;
      this.compile(comp.body, ce);
      this.instrs[this.wc++] = { tag: "POP" };
      this.instrs[this.wc++] = { tag: "GOTO", addr: loop_start };
      jump_on_false_instruction.addr = this.wc;
      this.instrs[this.wc++] = { tag: "LDC", val: undefined };

      // assigns goto addr to the breaks in the current while loop
      if (this.break_map.has(loop_start)) {
        const breaks = this.break_map.get(loop_start);
        breaks.forEach((goto, index) => {
          goto.addr = jump_on_false_instruction.addr;
        });
        this.break_map.delete(loop_start);
      }

      // assigns goto addr to the continues in the current while loop
      if (this.continue_map.has(loop_start)) {
        const continues = this.continue_map.get(loop_start);
        continues.forEach((goto, index) => {
          goto.addr = loop_start;
        });
        this.continue_map.delete(loop_start);
      }

      this.while_instrs.pop();
      this.blk_map.delete(this.wc);
    },
    app: (comp: {fun: compile_comp, args: compile_comp[]}, ce: string[][]) => {
      this.compile(comp.fun, ce);
      for (let arg of comp.args) {
        this.compile(arg, ce);
      }
      this.instrs[this.wc++] = { tag: "CALL", arity: comp.args.length };
    },
    assmt:
      // store precomputed position info in ASSIGN instruction
      (comp: {expr: compile_comp, sym: string}, ce: string[][]) => {
        this.compile(comp.expr, ce);
        this.instrs[this.wc++] = {
          tag: "ASSIGN",
          pos: this.compile_time_environment_position(ce, comp.sym),
        };
      },
    lam: (comp: {tag: string, arity: number, prms: string[], body: compile_comp}, ce: string[][]) => {
      this.instrs[this.wc++] = {
        tag: "LDF",
        arity: comp.arity,
        addr: this.wc + 1,
      };
      // jump over the body of the lambda expression
      const goto_instruction = { tag: "GOTO", addr: undefined };
      this.instrs[this.wc++] = goto_instruction;
      // extend this.compile-time environment
      this.compile(
        comp.body,
        this.compile_time_environment_extend(comp.prms, ce)
      );
      this.instrs[this.wc++] = { tag: "LDC", val: undefined };
      this.instrs[this.wc++] = { tag: "RESET" };
      goto_instruction.addr = this.wc;
    },
    seq: (comp: {stmts: compile_comp[]}, ce: string[][]) => this.compile_sequence(comp.stmts, ce),
    blk: (comp: {body: compile_comp}, ce: string[][]) => {
      for (const key of this.blk_map.keys())
        this.blk_map.set(key, this.blk_map.get(key) + 1);
  
      const locals = this.scan(comp.body);
      this.instrs[this.wc++] = { tag: "ENTER_SCOPE", num: locals.length };
      this.compile(comp.body, this.compile_time_environment_extend(locals, ce));
      this.instrs[this.wc++] = { tag: "EXIT_SCOPE" };
      for (const key of this.blk_map.keys()) {
        this.blk_map.set(key, this.blk_map.get(key) - 1);
      }
    },
    let: (comp: {expr: compile_comp, sym: string}, ce: string[][]) => {
      this.compile(comp.expr, ce);
      this.instrs[this.wc++] = {
        tag: "ASSIGN",
        pos: this.compile_time_environment_position(ce, comp.sym),
      };
    },
    const: (comp: {expr: compile_comp, sym: string}, ce: string[][]) => {
      this.compile(comp.expr, ce);
      this.instrs[this.wc++] = {
        tag: "ASSIGN",
        pos: this.compile_time_environment_position(ce, comp.sym),
      };
    },
    ret: (comp: {expr: compile_comp}, ce: string[][]) => {
      this.compile(comp.expr, ce);
      if (comp.expr.tag === "app") {
        // tail call: turn CALL into TAILCALL
        this.instrs[this.wc - 1].tag = "TAIL_CALL";
      } else {
        this.instrs[this.wc++] = { tag: "RESET" };
      }
    },
    fun: (comp: {sym: string, body: compile_comp, prms: {name: string}[]}, ce: string[][]) => {
      this.compile(
        {
          tag: "const",
          sym: comp.sym,
          expr: {
            tag: "lam",
            prms: comp.prms.map((prm) => prm.name),
            body: comp.body,
            arity: comp.prms.length,
          },
        },
        ce
      );
    },
    break: (comp: compile_comp, ce: string[][]) => {
      const goto_instruction = { tag: "GOTO", addr: undefined };
      const curr_wihle = this.while_instrs[this.while_instrs.length - 1];
      if (!this.break_map.has(curr_wihle)) {
        this.break_map.set(curr_wihle, [goto_instruction]);
      } else {
        this.break_map.get(curr_wihle).push(goto_instruction);
      }
      const no_blocks = this.blk_map.get(
        this.while_instrs[this.while_instrs.length - 1]
      );
      for (let i = 0; i < no_blocks; i++) {
        this.instrs[this.wc++] = { tag: "EXIT_SCOPE" };
      }
      this.instrs[this.wc++] = { tag: "POP" };
      this.instrs[this.wc++] = goto_instruction;
    },
    continue: (comp: compile_comp, ce: string[][]) => {
      const goto_instruction = { tag: "GOTO", addr: undefined };
      const curr_wihle = this.while_instrs[this.while_instrs.length - 1];
      if (!this.continue_map.has(curr_wihle)) {
        this.continue_map.set(curr_wihle, [goto_instruction]);
      } else {
        this.continue_map.get(curr_wihle).push(goto_instruction);
      }
      const no_blocks = this.blk_map.get(
        this.while_instrs[this.while_instrs.length - 1]
      );
      for (let i = 0; i < no_blocks; i++) {
        this.instrs[this.wc++] = { tag: "EXIT_SCOPE" };
      }
      this.instrs[this.wc++] = { tag: "POP" };
      this.instrs[this.wc++] = goto_instruction;
    },
  };
}
