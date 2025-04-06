export class RustTypeChecker {
  head = (arr) => arr[0];
  tail = (arr) => arr.slice(1);
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
  };

  empty_type_environment = null;
  global_type_environment = this.pair(
    this.global_type_frame,
    this.empty_type_environment
  );

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
              tag: "cond_expr",
              pred: comp.frst,
              cons: comp.scnd,
              alt: { tag: "lit", val: false },
            }
          : {
              tag: "cond_expr",
              pred: comp.frst,
              cons: { tag: "lit", val: true },
              alt: comp.scnd,
            }
      ),
    cond_expr: (comp) => ({
      tag: "cond_expr",
      pred: this.annotate(comp.pred),
      cons: this.annotate(comp.cons),
      alt: this.annotate(comp.alt),
    }),
    cond_stmt: (comp) => ({
      tag: "cond_stmt",
      pred: this.annotate(comp.pred),
      cons: this.annotate(comp.cons),
      alt: this.annotate(comp.alt),
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
      ret_type: comp.ret_type,
    }),
    let: (comp) => ({
      tag: "let",
      sym: comp.sym,
      vartag: comp.vartag,
      expr: this.annotate(comp.expr),
    }),
    assmt: (comp) => ({
      tag: "assmt",
      sym: comp.sym,
      expr: this.annotate(comp.expr),
    }),
  };

  //   annotate_sequence = (seq) => {
  //     const len = seq.length;
  //     const result = [];
  //     let j = 0; // write pointer into result array
  //     // loop through array
  //     // use each type declaration ('assmt')
  //     // as a type annotation for the subsequent
  //     // constant declaration
  //     for (let i = 0; i < len; i++) {
  //       if (seq[i].tag === "assmt") {
  //         const sym = seq[i].sym;
  //         const t = this.transform_type(seq[i].expr);
  //         const next = seq[++i];
  //         if (next.tag === "const" && next.sym === sym) {
  //           next.type = t;
  //           next.expr = this.annotate(next.expr);
  //           result[j++] = next;
  //         } else if (next.tag === "fun" && next.sym === sym) {
  //           next.type = t;
  //           next.body = this.annotate(next.body);
  //           result[j++] = next;
  //         } else {
  //           Error(
  //             "declaration of name " +
  //               sym +
  //               " expected after its type declaration"
  //           );
  //         }
  //       } else if (seq[i].tag === "const") {
  //         Error(
  //           "type declaration of name " +
  //             seq[i].sym +
  //             " before declaration missing"
  //         );
  //       } else {
  //         result[j++] = this.annotate(seq[i]);
  //       }
  //     }
  //     return result;
  //   };
  transform_types_or_null = (t) =>
    t.tag === "lit" && t.val === null ? [] : this.transform_types(t);

  transform_types = (t) =>
    t.tag === "binop" && t.sym === "*"
      ? [...this.transform_types(t.frst), ...this.transform_types(t.scnd)]
      : [this.transform_type(t)];

  transform_type = (t) =>
    t.tag === "nam" &&
    (t.sym === "number" || t.sym === "bool" || t.sym === "undefined")
      ? t.sym
      : t.tag === "binop" && t.sym === ">"
      ? {
          tag: "fun",
          args: this.transform_types_or_null(t.frst),
          res: this.transform_type(t.scnd),
        }
      : Error("illegal type expression");

  annotate = (comp) => this.annotate_comp[comp.tag](comp);

  lookup_type = (x, e) =>
    !e
      ? Error("unbound name: " + x)
      : this.head(e).hasOwnProperty(x)
      ? this.head(e)[x]
      : this.lookup_type(x, this.tail(e));

  // to check all code path returns designated type -> assumption all parsing wraps function body in a block
  RTS = [];
  ALWAYS_RET = true;
  // type_comp has the typing
  // functions for each component tag
  type_comp = {
    lit: (comp, te) =>
      comp.type != "f64" && comp.type != "i32" && comp.type != "bool"
        ? Error("unknown literal: " + comp.val)
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
    cond_expr: (comp, te) => {
      const t0 = this.type(comp.pred, te);
      if (t0 !== "bool")
        Error(
          "expected predicate type: bool, " +
            "actual predicate type: " +
            this.unparse_type(t0)
        );
      const t1 = this.type(comp.cons, te);
      const t2 = this.type(comp.alt, te);

      if (this.RTS.length && comp.is_stmt) {
        if (t1.tag !== "ret" && t2.tag !== "ret") {
          return "undefined";
        } else if (t1.tag === "ret" && t2.tag === "ret") {
          t1.always &= t2.always;
          return t1;
        } else if (t1.tag === "ret") {
          t1.always = false;
          return t1;
        } else {
          t2.always = false;
          return t2;
        }
      }

      if (this.equal_type(t1, t2)) {
        return t1;
      } else {
        Error(
          "types of branches not matching; " +
            "consequent type: " +
            this.unparse_type(t1) +
            ", " +
            "alternative type: " +
            this.unparse_type(t2)
        );
      }
    },
    // outside of function bodies,
    // conditional statements are
    // treated as conditional expressions
    cond_stmt: (comp, te) => {
      comp.tag = "cond_expr";
      comp.is_stmt = true;
      const stmt_type = this.type(comp, te);
      if (stmt_type.tag === "ret") this.ALWAYS_RET = stmt_type.always;
      return stmt_type;
    },
    fun: (comp, te) => {
      const extended_te = this.extend_type_environment(
        comp.prms.name,
        comp.prms.name.type,
        te
      );

      this.ALWAYS_RET = true; // Even with nested functions when back to this fun scope means nested return so gv is still true no affect
      this.RTS.push(comp.ret_type);
      this.type(comp.body, extended_te);
      if (!this.ALWAYS_RET)
        Error(
          "type Error in function declaration; not all code paths return " +
            this.unparse_type(comp.ret_type)
        );
      this.RTS.pop();
      return "undefined";
    },
    app: (comp, te) => {
      const fun_type = this.type(comp.fun, te);
      if (fun_type.tag !== "fun")
        Error(
          "type Error in application; function " +
            "expression must have function type; " +
            "actual type: " +
            this.unparse_type(fun_type)
        );
      const expected_arg_types = comp.fun.prms.type;
      const actual_arg_types = comp.args.map((e) => this.type(e, te));
      if (this.equal_types(actual_arg_types, expected_arg_types)) {
        return comp.fun.ret_type;
      } else {
        Error(
          "type Error in application; " +
            "expected argument types: " +
            this.unparse_types(expected_arg_types) +
            ", " +
            "actual argument types: " +
            this.unparse_types(actual_arg_types)
        );
      }
    },
    let: (comp, te) => {
      const declared_type = comp.vartag;
      const actual_type = this.type(comp.expr, te);
      if (this.equal_type(actual_type, declared_type)) {
        return "undefined";
      } else {
        Error(
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
        Error(
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
      // scan out declarations
      const decls = comp.body.stmts.filter(
        (comp) => comp.tag === "const" || comp.tag === "fun"
      );
      const extended_te = this.extend_type_environment(
        decls.map((comp) => comp.sym),
        decls.map((comp) => comp.type),
        te
      );
      return this.type(comp.body, extended_te);
    },
    ret: (comp, te) => {
      const ret_type = this.type(comp.expr, te);
      if (!this.equal_type(this.RTS[this.RTS.length - 1], ret_type))
        Error(
          "type Error in function declaration; declared return type: " +
            this.unparse_type(this.RTS[this.RTS.length - 1]) +
            ", actual return type: " +
            this.unparse_type(ret_type)
        );
      this.ALWAYS_RET = true;
      return { tag: "ret", always: true, ret_type };
    },
  };

  type = (comp, te) => this.type_comp[comp.tag](comp, te);

  unparse_types = (ts) =>
    ts.length === 0
      ? "null"
      : ts.reduce(
          (s, t) =>
            s === "" ? this.unparse_type(t) : s + ", " + this.unparse_type(t),
          ""
        );

  unparse_type = (t) =>
    typeof t == "string"
      ? t
      : t.tag != null && t.tag === "fun"
      ? // t is function type
        "(" +
        this.unparse_types(t.args) +
        " > " +
        this.unparse_type(t.res) +
        ")"
      : // t is return type
        this.unparse_type(t.expr);

  equal_types = (ts1, ts2) =>
    this.unparse_types(ts1) === this.unparse_types(ts2);

  equal_type = (t1, t2) => this.unparse_type(t1) === this.unparse_type(t2);

  extend_type_environment = (xs, ts, e) => {
    if (ts.length > xs.length)
      Error("too few parameters in function declaration");
    if (ts.length < xs.length)
      Error("too many parameters in function declaration");
    const new_frame = {};
    for (let i = 0; i < xs.length; i++) new_frame[xs[i]] = ts[i];
    return this.pair(new_frame, e);
  };
}
