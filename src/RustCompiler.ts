type Goto_instruction = { tag: string; addr: number };

type compile_comp = {tag: string, [key: string]: any};
type compiled_comp = compile_comp;
export type primitive = boolean | number;
export const primitive_types = ["bool", "i32", "f64"];

interface VarMeta {
  sym: string;
  is_copy: boolean;
  is_mut: boolean; // if this is mutable
  imm_ref: number; // pointers from others to this
  mut_ref: number;
  dec: boolean;
  point_to?: string; // name of variable it points to, if null suggests invalid should not be dereferenced
}

export class RustCompiler {
  private wc: number = 0;
  private instrs: compiled_comp[] = [];

  compile_env: VarMeta[][] = [];
  while_instrs: number[] = [];
  break_map: Map<number, Goto_instruction[]> = new Map(); // maps the current while loop start addr to the break instructions inside
  continue_map: Map<number, Goto_instruction[]> = new Map(); // maps the current while loop start addr to the continue instructions inside
  blk_map: Map<number, number> = new Map(); // maps the current while loop start addr to the number of blocks until the break/continue
  
  compile_env_pos = (x: string): {pos: [number, number], meta: VarMeta} => {
    let frame_index = this.compile_env.length;
    console.log
    while (this.value_index(this.compile_env[--frame_index], x) === -1);
    const valInd = this.value_index(this.compile_env[frame_index], x);
    return {pos: [frame_index, valInd], meta: this.compile_env[frame_index][valInd]};
  };

  value_index = (frame: VarMeta[], x: string) => {
    for (let i = 0; i < frame.length; i++)
      if (frame[i].sym === x) return i;
    return -1;
  };

  // NOTE: imm ref and primitives are copy types, mut ref is not
  scan_for_vars = (comp: compile_comp): VarMeta[] =>
    comp.tag === "seq"
      ? (comp.stmts as compile_comp[]).reduce((acc: VarMeta[], x) => acc.concat(this.scan_for_vars(x)), [])
      : comp.tag === "fun"
      ? [{ sym: comp.sym, dec: false, is_mut: false, imm_ref: 0, mut_ref: 0, is_copy: false }]
      : comp.tag === "let"
      ? (comp.type as string).startsWith("&")
      ? [{ sym: comp.sym, dec: false, is_mut: true, imm_ref: 0, mut_ref: 0, point_to: "", is_copy: !(comp.type as string).includes("mut") }] // NOTE: Treat all as mutable can be reassigned
      : [{ sym: comp.sym, dec: false, is_mut: true, imm_ref: 0, mut_ref: 0, is_copy: primitive_types.includes(comp.type as string) }]
      : []

  compile_seq = (seq: compile_comp[]) => {
    if (seq.length === 0)
      return (this.instrs[this.wc++] = { tag: "LDC", val: undefined });
    let frst = true;
    for (let comp of seq) {
      frst ? (frst = false) : (this.instrs[this.wc++] = { tag: "POP" });
      this.compile(comp);
    }
  };

  compile_program(program: compile_comp): compiled_comp[] {
    this.wc = 0;
    this.instrs = [];
    this.compile(program);
    this.instrs[this.wc] = { tag: "DONE" };
    return this.instrs;
  }

  compile(comp: compile_comp) { return this.compile_comp[comp.tag](comp); }

  // NOTE: Two checks are ran:
  // 1. Compiler first pass lifetime analysis, demarcate last use of each reference (mutable ref enjoys exclusive access)
  // 2. Owner must be in the same or in parent scope of borrowed ref (imm or mut)
  compile_comp = {
    lit: (comp: {val: primitive}) => this.instrs[this.wc++] = { tag: "LDC", val: comp.val },
    nam: (comp: {sym: string}) => {
        const {pos, meta} = this.compile_env_pos(comp.sym);
        if (!meta.dec) throw new Error(`${comp.sym} has not been declared`);
        if (meta.point_to === null) throw new Error(`${comp.sym} is invalid`);
        this.instrs[this.wc++] = {
          tag: "LD",
          sym: comp.sym,
          pos: this.compile_env_pos(comp.sym).pos,
        };
      },
    unop: (comp: {sym: string, frst: compile_comp}) => {
      // NOTE: &, &mut, * can only be applied to lvalue
      const {sym: op, frst} = comp;
      if (op === "&" || op === "&mut" || op === "*unary") {
        if (comp.frst.tag !== "nam") throw new Error(`Cannot apply ${op} to ${frst.sym}, only lvalue allowed`);
        const {pos, meta} = this.compile_env_pos(frst.sym);
        if (op === "&mut") {
          if (!meta.is_mut) throw new Error(`Cannot apply &mut to ${frst.sym}, only mutable lvalue allowed`);
          if (meta.imm_ref || meta.mut_ref) throw new Error(`Cannot apply &mut to ${frst.sym}, already borrowed`);
        }
        // TODO: Not necessarily true for heap allocated data where "point_to" is in heap not another variable
      }
      this.compile(comp.frst);
      this.instrs[this.wc++] = { tag: "UNOP", sym: comp.sym };
      if (comp.sym === "&" || comp.sym === "&mut") {
        return {
          tag: "tempref",
          is_mut: op === "&mut",
          var: comp.frst.sym as string,
        }
      }
    },
    binop: (comp: {frst: compile_comp, scnd: compile_comp, sym: string}) => {
      this.compile(comp.frst);
      this.compile(comp.scnd);
      this.instrs[this.wc++] = { tag: "BINOP", sym: comp.sym };
    },
    log: (comp: {sym: string, frst: compile_comp, scnd: compile_comp}) => {
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
      );
    },
    cond: (comp: {pred: compile_comp, cons: compile_comp, alt: compile_comp}) => {
      this.compile(comp.pred);
      const jump_on_false_instruction = { tag: "JOF", addr: undefined };
      this.instrs[this.wc++] = jump_on_false_instruction;
      this.compile(comp.cons);
      const goto_instruction = { tag: "GOTO", addr: undefined };
      this.instrs[this.wc++] = goto_instruction;
      const alternative_address = this.wc;
      jump_on_false_instruction.addr = alternative_address;
      if (comp.alt != null) this.compile(comp.alt);
      goto_instruction.addr = this.wc;
    },
    while: (comp: {pred: compile_comp, body: compile_comp}) => {
      this.blk_map.set(this.wc, 0);
      this.while_instrs.push(this.wc);
      const loop_start = this.wc;
      this.compile(comp.pred);
      const jump_on_false_instruction = { tag: "JOF", addr: undefined };
      this.instrs[this.wc++] = jump_on_false_instruction;
      this.compile(comp.body);
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
    app: (comp: {fun: compile_comp, args: compile_comp[]}) => {
      this.compile(comp.fun);
      for (let arg of comp.args) {
        const res = this.compile(arg);
        if (res && res.tag === "tempref") {
          const {pos, meta} = this.compile_env_pos(res.var);
          if (res.is_mut && (meta.imm_ref || meta.mut_ref)) throw new Error(`Cannot obtain mutable reference to ${res.var} as argument, already borrowed`);
          // TODO: when trace function call path for better borrowing check need actually increment ref cnt
        }
      }
      this.instrs[this.wc++] = { tag: "CALL", arity: comp.args.length };
    },
    assmt:
      // store precomputed position info in ASSIGN instruction
      (comp: {expr: compile_comp, sym: string}) => {
        const {pos, meta} = this.compile_env_pos(comp.sym);
        if (!meta.is_mut || meta.imm_ref || meta.mut_ref) throw new Error(`Cannot assign to ${comp.sym} if it is not mutable or is borrowed`);
        const res = this.compile(comp.expr);
        // Update ref count
        if (meta.point_to !== undefined) {
          if (!meta.is_mut) throw new Error(`Cannot reassign immutable ${comp.sym} to ${res.var}`);
          if (meta.point_to !== null) {
            const ogpt = this.compile_env_pos(meta.point_to);
            if (meta.is_mut) ogpt.meta.mut_ref--;
            else ogpt.meta.imm_ref--;
          }
          if (comp.expr.tag === "nam") {
            const {pos: opos, meta: ometa} = this.compile_env_pos(comp.expr.sym as string);
            meta.point_to = ometa.point_to;
            if (meta.is_mut) ometa.point_to = null;
            else {
              const {pos: tpos, meta: tmeta} = this.compile_env_pos(meta.point_to);
              tmeta.imm_ref++;
            }
          } else {
            if (res.tag !== "tempref") throw new Error(`${comp.sym} not initialized correctly`);
            meta.point_to = res.var;
            const npt = this.compile_env_pos(meta.point_to);
            if (npt.meta.mut_ref) throw new Error(`Cannot assign ${comp.sym} to reference ${res.var} which is already borrowed mutably`);
            if (meta.is_mut && (npt.meta.imm_ref || npt.meta.mut_ref)) throw new Error(`Cannot obtain mutable reference to ${res.var} for ${comp.sym}, already borrowed`);
            // Check owner has longer lifetime than reference
            // console.log(`npt: ${npt.pos}, ogpt: ${ogpt.pos}, pos: ${pos}`);
            if (npt.pos[0] > pos[0]) throw new Error(`Cannot assign ${comp.sym} to reference ${meta.point_to} which has a shorter lifetime`);
            if (meta.is_mut) npt.meta.mut_ref++;
            else npt.meta.imm_ref++;
          }
        }

        this.instrs[this.wc++] = {
          tag: "ASSIGN",
          pos,
        };
      },
    lam: (comp: {tag: string, arity: number, prms: {name: string, type: string}[], body: compile_comp}) => {
      this.instrs[this.wc++] = {
        tag: "LDF",
        arity: comp.arity,
        addr: this.wc + 1,
      };
      // jump over the body of the lambda expression
      const goto_instruction = { tag: "GOTO", addr: undefined };
      this.instrs[this.wc++] = goto_instruction;
      const prmsInfo: VarMeta[] = comp.prms.map((x) => ({sym: x.name, dec: true, is_mut: primitive_types.includes(x.type) || x.type.includes("mut"), imm_ref: 0, mut_ref: 0, is_copy: primitive_types.includes(x.type) || x.type.includes("&")}));
      // extend this.compile-time environment
      this.compile_env.push(prmsInfo);
      this.compile(comp.body);
      this.compile_env.pop();
      this.instrs[this.wc++] = { tag: "LDC", val: undefined };
      this.instrs[this.wc++] = { tag: "RESET" };
      goto_instruction.addr = this.wc;
    },
    seq: (comp: {stmts: compile_comp[]}) => this.compile_seq(comp.stmts),
    blk: (comp: {body: compile_comp}) => {
      for (const key of this.blk_map.keys()) this.blk_map.set(key, this.blk_map.get(key) + 1);
  
      const locals = this.scan_for_vars(comp.body);
      console.log("locals", locals);
      this.instrs[this.wc++] = { tag: "ENTER_SCOPE", num: locals.length };
      this.compile_env.push(locals);
      this.compile(comp.body);
      this.instrs[this.wc++] = { tag: "EXIT_SCOPE" };
      for (let local of locals)
        if (local.point_to) {
          const {pos: ppos, meta: pmeta} = this.compile_env_pos(local.point_to);
          if (local.is_mut) pmeta.mut_ref--;
          else pmeta.imm_ref--;
        }
      this.compile_env.pop();
      for (const key of this.blk_map.keys()) this.blk_map.set(key, this.blk_map.get(key) - 1);
    },
    let: (comp: {expr: compile_comp, sym: string, type: string}) => {
      const res = this.compile(comp.expr);
      const {pos, meta} = this.compile_env_pos(comp.sym);
      if (meta.point_to !== undefined) {
        if (comp.expr.tag === "nam") {
          const {pos: opos, meta: ometa} = this.compile_env_pos(comp.expr.sym as string);
          meta.point_to = ometa.point_to;
          if (meta.is_mut) ometa.point_to = null;
          else {
            const {pos: tpos, meta: tmeta} = this.compile_env_pos(meta.point_to);
            tmeta.imm_ref++;
          }
        } else {
          if (res.tag !== "tempref") throw new Error(`${comp.sym} not initialized correctly`);
          const {pos: ppos, meta: pmeta} = this.compile_env_pos(res.var);
          if (pmeta.mut_ref) throw new Error(`Cannot assign ${comp.sym} to reference ${res.var} which is already borrowed mutably`);
          if (meta.is_mut && (pmeta.imm_ref || pmeta.mut_ref)) throw new Error(`Cannot obtain mutable reference to ${res.var} for ${comp.sym}, already borrowed`);
          meta.point_to = res.var;
          if (meta.is_mut) pmeta.mut_ref++;
          else pmeta.imm_ref++;
        }
      }
      this.instrs[this.wc++] = {
        tag: "ASSIGN",
        pos: this.compile_env_pos(comp.sym).pos,
      };
      meta.dec = true;
    },
    ret: (comp: {expr: compile_comp}) => {
      this.compile(comp.expr);
      if (comp.expr.tag === "app") {
        // tail call: turn CALL into TAILCALL
        this.instrs[this.wc - 1].tag = "TAIL_CALL";
      } else this.instrs[this.wc++] = { tag: "RESET" };
    },
    fun: (comp: {sym: string, body: compile_comp, prms: {name: string, type: string}[]}) => {
      console.log("fun comp", comp);
      this.compile(
        {
          tag: "let",
          sym: comp.sym,
          expr: {
            tag: "lam",
            prms: comp.prms,
            body: comp.body,
            arity: comp.prms.length,
          },
        }
      );
    },
    break: (comp: compile_comp) => {
      const goto_instruction = { tag: "GOTO", addr: undefined };
      const curr_while = this.while_instrs[this.while_instrs.length - 1];
      if (!this.break_map.has(curr_while)) {
        this.break_map.set(curr_while, [goto_instruction]);
      } else {
        this.break_map.get(curr_while).push(goto_instruction);
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
    continue: (comp: compile_comp) => {
      const goto_instruction = { tag: "GOTO", addr: undefined };
      const curr_while = this.while_instrs[this.while_instrs.length - 1];
      if (!this.continue_map.has(curr_while)) this.continue_map.set(curr_while, [goto_instruction]);
      else this.continue_map.get(curr_while).push(goto_instruction);
      const no_blocks = this.blk_map.get(this.while_instrs[this.while_instrs.length - 1]);
      for (let i = 0; i < no_blocks; i++) this.instrs[this.wc++] = { tag: "EXIT_SCOPE" };
      this.instrs[this.wc++] = { tag: "POP" };
      this.instrs[this.wc++] = goto_instruction;
    },
  };
}
