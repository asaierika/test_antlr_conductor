import { TypeCheckerError } from "./error/TypeCheckerError";

export class RustTypeChecker {
  head = (arr) => arr[0];
  tail = (arr) => arr.slice(1)[0];
  pair = (a, b) => [a, b];

  unary_arith_type = { tag: "fun", args: ["number"], res: "number" };

  binary_arith_type = { tag: "fun", args: ["number", "number"], res: "number" };

  number_comparison_type = {
    tag: "fun",
    args: ["number", "number"],
    res: "bool",
  };

  binary_bool_type = { tag: "fun", args: ["bool"], res: "bool" };

  unary_bool_type = { tag: "fun", args: ["bool"], res: "bool" };

  unary_mut_type = { tag: "fun", immutable: false, args: "any", res: "any" };
  unary_immut_type = { tag: "fun", immutable: true, args: "any", res: "any" };

  global_type_frame = {
    undefined: "undefined",
    math_E: "number",
    math_PI: "number",
    math_sin: this.unary_arith_type,
    "+": this.binary_arith_type,
    "-": this.binary_arith_type,
    "*": this.binary_arith_type,
    "/": this.binary_arith_type,
    "<": this.number_comparison_type,
    ">": this.number_comparison_type,
    "<=": this.number_comparison_type,
    ">=": this.number_comparison_type,
    "===": this.number_comparison_type,
    "&&": this.binary_bool_type,
    "||": this.binary_bool_type,
    "-unary": this.unary_arith_type,
    "!": this.unary_bool_type,
    "&": this.unary_immut_type,
    "&mut": this.unary_mut_type,
  };

  empty_type_environment = null;
  global_type_environment = this.pair(
    this.global_type_frame,
    this.empty_type_environment
  );

  check_for_duplicates = (decls) => {
    const values = Object.values(decls).filter((v) => v["sym"] !== undefined);
    const symbols = values.map((v) => v["sym"]);
    if (new Set(symbols).size !== symbols.length) {
      throw new TypeCheckerError(
        "same variable cannot be delcared more than once"
      );
    }
  };

  annotate_comp = {
    lit: (comp) => comp,
    nam: (comp) => comp,
    unop: (comp) => ({
      tag: "unop",
      sym: comp.sym,
      frst: this.annotate(comp.frst),
    }),
    binop: (comp) => ({
      tag: "binop",
      sym: comp.sym,
      frst: this.annotate(comp.frst),
      scnd: this.annotate(comp.scnd),
    }),
    log: (comp) =>
      this.annotate(
        comp.sym == "&&"
          ? {
              tag: "cond",
              pred: comp.frst,
              cons: comp.scnd,
              alt: { tag: "lit", val: false },
            }
          : {
              tag: "cond",
              pred: comp.frst,
              cons: { tag: "lit", val: true },
              alt: comp.scnd,
            }
      ),
    cond: (comp) => ({
      tag: "cond",
      pred: this.annotate(comp.pred),
      cons: this.annotate(comp.cons),
      alt: this.annotate(comp.alt),
    }),
    while: (comp) => ({
      tag: "cond",
      pred: this.annotate(comp.pred),
      body: this.annotate(comp.body),
    }),
    break: (comp) => ({
      tag: "break",
    }),
    continue: (comp) => ({
      tag: "continue",
    }),
    app: (comp) => ({
      tag: "app",
      fun: this.annotate(comp.fun),
      args: comp.args.map(this.annotate),
    }),
    seq: (comp) => ({
      tag: "seq",
      stmts: comp.stmts.map((stmt) => this.annotate(stmt)),
    }),
    blk: (comp) => ({ tag: "blk", body: this.annotate(comp.body) }),
    ret: (comp) => ({ tag: "ret", expr: this.annotate(comp.expr) }),
    fun: (comp) => ({
      tag: "fun",
      sym: comp.sym,
      prms: comp.prms,
      body: this.annotate(comp.body),
      type: comp.type,
    }),
    let: (comp) => ({
      tag: "let",
      sym: comp.sym,
      type: comp.type,
      expr: this.annotate(comp.expr),
    }),
    assmt: (comp) => ({
      tag: "assmt",
      sym: comp.sym,
      expr: this.annotate(comp.expr),
    }),
    struct: (comp) => ({
      tag: "struct",
      sym: comp.sym,
      type: comp.type,
    }),
    struct_init: (comp) => ({
      tag: "struct_init",
      sym: comp.sym,
      args: comp.args,
    }),
  };

  annotate = (comp) => this.annotate_comp[comp.tag](comp);

  lookup_type = (x, e) => {
    if (!e || e.length == 0) {
      throw new TypeCheckerError("unbound name: " + x);
    }
    const res = this.head(e).hasOwnProperty(x)
      ? this.head(e)[x]
      : this.lookup_type(x, this.tail(e));
    return res;
  };

  // to check all code path returns designated type -> assumption all parsing wraps function body in a block
  RTS = [];
  ALWAYS_RET = true;
  // type_comp has the typing
  // functions for each component tag
  type_comp = {
    lit: (comp, te) =>
      comp.type != "f64" && comp.type != "i32" && comp.type != "bool"
        ? new TypeCheckerError("unknown literal: " + comp.val)
        : comp.type,
    nam: (comp, te) => this.lookup_type(comp.sym, te),
    unop: (comp, te) =>
      this.type(
        { tag: "app", fun: { tag: "nam", sym: comp.sym }, args: [comp.frst] },
        te
      ),
    binop: (comp, te) =>
      this.type(
        {
          tag: "app",
          fun: { tag: "nam", sym: comp.sym },
          args: [comp.frst, comp.scnd],
        },
        te
      ),
    log: (comp, te) =>
      this.type(
        {
          tag: "app",
          fun: { tag: "nam", sym: comp.sym },
          args: [comp.frst, comp.scnd],
        },
        te
      ),
    cond: (comp, te) => {
      const t0 = this.type(comp.pred, te);
      if (t0 !== "bool")
        throw new TypeCheckerError(
          "expected predicate type: bool, " +
            "actual predicate type: " +
            this.unparse_type(t0)
        );
      const t1 = this.type(comp.cons, te);
      let t2 = { tag: undefined, always: false };
      if (comp.alt) {
        t2 = this.type(comp.alt, te);
      }

      // if t1 and t2 are ret stmt, type check is done in type_comp[ret]
      if (this.RTS.length) {
        if (t1.tag !== "ret" && t2.tag !== "ret") {
          return "undefined";
        } else if (t1.tag === "ret" && t2.tag === "ret") {
          t1.always = t1.always && t2.always;
          return t1;
        } else if (t1.tag === "ret") {
          t1.always = false;
          return t1;
        } else {
          t2.always = false;
          return t2;
        }
      }

      if (t1.tag === "ret" || t2.tag === "ret") {
        throw new TypeCheckerError("Returning outside of a function");
      }

      return "undefined";
    },
    while: (comp, te) => {
      const t0 = this.type(comp.pred, te);
      if (t0 !== "bool")
        throw new TypeCheckerError(
          "expected predicate type: bool, " +
            "actual predicate type: " +
            this.unparse_type(t0)
        );
      const t1 = this.type(comp.body, te);
      return t1;
    },
    break: (comp, te) => ({ tag: "break", expr: "undefined" }),
    continue: (comp, te) => ({ tag: "continue", expr: "undefined" }),
    fun: (comp, te) => {
      const extended_te = this.extend_type_environment(
        comp.prms.map((prm) => prm.name),
        comp.prms.map((prm) => prm.type),
        te
      );

      this.ALWAYS_RET = true; // Even with nested functions when back to this fun scope means nested return so gv is still true no affect
      this.RTS.push(comp.type.res);
      this.type(comp.body, extended_te);
      if (!this.ALWAYS_RET)
        throw new TypeCheckerError(
          "type Error in function declaration; not all code paths return " +
            this.unparse_type(comp.type.res)
        );
      this.RTS.pop();
      return "undefined";
    },
    app: (comp, te) => {
      const fun_type = this.type(comp.fun, te);
      if (fun_type.tag !== "fun")
        throw new TypeCheckerError(
          "type Error in application; function " +
            "expression must have function type; " +
            "actual type: " +
            this.unparse_type(fun_type)
        );
      const expected_arg_types = fun_type.args;
      const actual_arg_types = comp.args.map((e) => this.type(e, te));

      if (fun_type.immutable !== null) {
        // & and mut&
        const actual_arg = comp.args[0];
        const actual_arg_type = actual_arg_types[0];
        if (!fun_type.immutable && actual_arg.tag === "lit") {
          // for now only constants are immutable
          throw new TypeCheckerError(
            "type Error in application; " + "cannot borrow immutable as mutable"
          );
        }
        console.log(comp.fun.sym);
        console.log(actual_arg_type);
        return comp.fun.sym + actual_arg_type;
      }

      if (fun_type.args.includes("number")) {
        // handles the case for unary_arith_type, binary_arith_type and number_comparison_type
        const expected_arg_types_i32 = expected_arg_types.map((arg) =>
          arg === "number" ? "i32" : arg
        );
        const expected_trs_type_i32 =
          fun_type.res === "number" ? "i32" : fun_type.res;

        if (this.equal_types(actual_arg_types, expected_arg_types_i32)) {
          return expected_trs_type_i32;
        }

        const expected_arg_types_f64 = expected_arg_types.map((arg) =>
          arg === "number" ? "f64" : arg
        );
        const expected_trs_type_f64 =
          fun_type.res === "number" ? "f64" : fun_type.res;

        if (this.equal_types(actual_arg_types, expected_arg_types_f64)) {
          return expected_trs_type_f64;
        }
      } else {
        if (this.equal_types(actual_arg_types, expected_arg_types)) {
          return fun_type.res;
        }
      }

      throw new TypeCheckerError(
        "type Error in application; " +
          "expected argument types: " +
          this.unparse_types(expected_arg_types) +
          ", " +
          "actual argument types: " +
          this.unparse_types(actual_arg_types)
      );
    },
    let: (comp, te) => {
      let declared_type = comp.type;
      if (comp.type.tag != null) {
        // type is struct
        declared_type = this.type(comp.type, te);
      }

      const actual_type = this.type(comp.expr, te);

      if (this.equal_type(actual_type, declared_type)) {
        return "undefined";
      } else {
        throw new TypeCheckerError(
          "type Error in variable declaration; " +
            "declared type: " +
            this.unparse_type(declared_type) +
            ", " +
            "actual type: " +
            this.unparse_type(actual_type)
        );
      }
    },
    assmt: (comp, te) => {
      const declared_type = this.lookup_type(comp.sym, te);
      const actual_type = this.type(comp.expr, te);
      if (this.equal_type(actual_type, declared_type)) {
        return "undefined";
      } else {
        throw new TypeCheckerError(
          "type Error in variable assignment; " +
            "declared type: " +
            this.unparse_type(declared_type) +
            ", " +
            "actual type: " +
            this.unparse_type(actual_type)
        );
      }
    },
    seq: (comp, te) => {
      for (let i = 0; i < comp.stmts.length; i++) {
        const stmt_type = this.type(comp.stmts[i], te);
        if (stmt_type.tag === "break" || stmt_type.tag === "continue") {
          break;
        }
        if (stmt_type.tag === "ret" && stmt_type.always) {
          this.ALWAYS_RET = true;
          return stmt_type;
        }
        if (!this.RTS.length && i == comp.stmts.length - 1) return stmt_type;
      }

      if (this.RTS.length && this.RTS[this.RTS.length - 1] !== "undefined")
        this.ALWAYS_RET = false;
      return "undefined";
    },
    blk: (comp, te) => {
      let decls;
      if (!comp.body.stmts) {
        decls =
          comp.body.tag === "let" ||
          comp.body.tag === "fun" ||
          comp.body.tag === "struct"
            ? [comp.body]
            : null;
      } else {
        decls = comp.body.stmts.filter(
          (comp) =>
            comp.tag === "let" || comp.tag === "fun" || comp.tag === "struct"
        );
      }
      let extended_te = te;
      if (decls) {
        this.check_for_duplicates(decls);
        extended_te = this.extend_type_environment(
          decls.map((comp) => comp.sym),
          decls.map((comp) => comp.type),
          te
        );
      }

      const result = this.type(comp.body, extended_te);
      if (
        this.RTS.length &&
        this.RTS[this.RTS.length - 1] !== "undefined" &&
        !(result.tag === "ret" && result.always)
      ) {
        // handles the case where there is only one statement instead of a sequence
        this.ALWAYS_RET = false;
      }
      return result;
    },
    ret: (comp, te) => {
      const ret_type = this.type(comp.expr, te);
      if (!this.equal_type(this.RTS[this.RTS.length - 1], ret_type))
        throw new TypeCheckerError(
          "type Error in function declaration; declared return type: " +
            this.unparse_type(this.RTS[this.RTS.length - 1]) +
            ", actual return type: " +
            this.unparse_type(ret_type)
        );
      this.ALWAYS_RET = true;
      return { tag: "ret", always: true, expr: ret_type };
    },
    struct: (comp, te) => {
      return "undefined";
    },
    struct_init: (comp, te) => {
      const expected_type = this.lookup_type(comp.sym, te);
      const expected_args = expected_type.fields.map((field) => field.type);
      const actual_args = comp.args.map((e) => this.type(e, te));

      if (this.equal_types(expected_args, actual_args)) {
        return expected_type;
      } else {
        throw new TypeCheckerError(
          "type Error in variable declaration; " +
            "declared type: " +
            this.unparse_types(expected_args) +
            ", " +
            "actual type: " +
            this.unparse_types(actual_args)
        );
      }
    },
  };

  type = (comp, te) => {
    //console.log(comp.tag);
    return this.type_comp[comp.tag](comp, te);
  };

  unparse_types = (ts) => {
    // console.log("unparse types: " + JSON.stringify(ts));
    return ts.length === 0
      ? "null"
      : ts.reduce(
          (s, t) =>
            s === "" ? this.unparse_type(t) : s + ", " + this.unparse_type(t),
          ""
        );
  };

  unparse_type = (t) => {
    // console.log("unparse type: " + t);
    return typeof t == "string"
      ? t
      : t.tag != null && t.tag === "fun"
      ? // t is function type
        "(" +
        this.unparse_types(t.args) +
        " > " +
        this.unparse_type(t.res) +
        ")"
      : t.tag != null && t.tag === "struct"
      ? // t is struct type
        t.fields.reduce(
          (s, t) =>
            s === ""
              ? this.unparse_type(t.type)
              : s + ", " + this.unparse_type(t.type),
          ""
        )
      : // t is return, break or continue type
        this.unparse_type(t.expr);
  };

  equal_types = (ts1, ts2) =>
    this.unparse_types(ts1) === this.unparse_types(ts2);

  equal_type = (t1, t2) => this.unparse_type(t1) === this.unparse_type(t2);

  extend_type_environment = (xs, ts, e) => {
    if (ts.length > xs.length)
      throw new TypeCheckerError("too few parameters in function declaration");
    if (ts.length < xs.length)
      throw new TypeCheckerError("too many parameters in function declaration");
    const new_frame = {};
    for (let i = 0; i < xs.length; i++) new_frame[xs[i]] = ts[i];
    return this.pair(new_frame, e);
  };

  check = (program) => {
    try {
      this.type(program, this.global_type_environment);
    } catch (x) {
      throw x;
    }
  };
}
