import { AbstractParseTreeVisitor, ParserRuleContext } from "antlr4ng";
import { RustVisitor } from "./parser/src/RustVisitor";
import {
  ProgContext,
  Let_declContext,
  If_stmtContext,
  BlockContext,
  BinaryOpContext,
  VariableContext,
  IntLiteralContext,
  BoolLiteralContext,
  FloatLiteralContext,
  UnaryOpContext,
  While_loopContext,
  Break_stmtContext,
  Continue_stmtContext,
  Assign_stmtContext,
  Func_defContext,
  ParamContext,
  ParamsContext,
  Return_stmtContext,
} from "./parser/src/RustParser";

interface FunctionParameter {
  name: string;
  type: string; // 'i32' | 'bool' | 'f64'
}

export class ASTToJsonVisitor
  extends AbstractParseTreeVisitor<any>
  implements RustVisitor<any>
{
  private inLoop = false; // Track if we're inside a loop

  visitProg(ctx: ProgContext): any {
    // Create a synthetic BlockContext to reuse visitBlock logic
    const syntheticBlock = {
      stmt: () => ctx.stmt(), // Expose the same statements
      start: ctx.start, // Preserve source location
      stop: ctx.stop,
    } as BlockContext;

    return this.visitBlock(syntheticBlock);
  }

  visitBinaryOp(ctx: BinaryOpContext): any {
    return {
      tag: "binop",
      sym: ctx._op.text,
      first: this.visit(ctx.expr(0)),
      second: this.visit(ctx.expr(1)),
    };
  }

  visitUnaryOp(ctx: UnaryOpContext): any {
    return {
      tag: "unop",
      sym: ctx._op.text,
      first: this.visit(ctx.expr()),
    };
  }

  visitIntLiteral(ctx: IntLiteralContext): any {
    return {
      tag: "lit",
      val: parseInt(ctx.INT().getText()),
      type: "i32",
    };
  }

  visitBoolLiteral(ctx: BoolLiteralContext): any {
    return {
      tag: "lit",
      val: ctx.TRUE() ? true : false,
      type: "bool",
    };
  }

  visitFloatLiteral(ctx: FloatLiteralContext): any {
    return {
      tag: "lit",
      val: parseFloat(ctx.FLOAT().getText()),
      type: "f64",
    };
  }

  visitVariable(ctx: VariableContext): any {
    return {
      tag: "nam",
      sym: ctx.ID().getText(),
    };
  }

  visitLet_decl(ctx: Let_declContext): any {
    return {
      tag: "let",
      sym: ctx.ID().getText(),
      vartag: ctx.type().getText(),
      expr: this.visit(ctx.expr()),
    };
  }

  visitAssign_stmt(ctx: Assign_stmtContext): any {
    return {
      tag: "assmt",
      sym: ctx.ID().getText(),
      expr: this.visit(ctx.expr()),
    };
  }

  visitIf_stmt(ctx: If_stmtContext): any {
    return {
      tag: "cond",
      pred: this.visit(ctx.expr()),
      cons: this.visit(ctx.block(0)),
      alt: ctx.block(1) ? this.visit(ctx.block(1)) : null,
    };
  }

  visitBlock(ctx: BlockContext): any {
    if (ctx.stmt().length == 0) {
      return {};
    }
    return {
      tag: "blk",
      body:
        ctx.stmt().length == 1
          ? this.visit(ctx.stmt()[0])
          : { tag: "seq", stmts: ctx.stmt().map((stmt) => this.visit(stmt)) },
    };
  }

  visitWhile_loop(ctx: While_loopContext): any {
    const prevInLoop = this.inLoop;
    this.inLoop = true;
    const result = {
      tag: "while",
      pred: this.visit(ctx.expr()),
      body: this.visit(ctx.block()),
    };
    this.inLoop = prevInLoop;
    return result;
  }

  visitBreak_stmt(ctx: Break_stmtContext): any {
    if (!this.inLoop) {
      throw new Error("Break statement outside of loop");
    }
    return { tag: "break" };
  }

  visitContinue_stmt(ctx: Continue_stmtContext): any {
    if (!this.inLoop) {
      throw new Error("Continue statement outside of loop");
    }
    return { tag: "continue" };
  }

  visitFunc_def(ctx: Func_defContext): any {
    return {
      tag: "fun",
      sym: ctx.ID().getText(),
      prms: ctx.params() ? this.visitParams(ctx.params()) : [],
      body: this.visit(ctx.block()),
      ret_type: ctx.type().getText(),
    };
  }

  visitParams(ctx: ParamsContext): FunctionParameter[] {
    return ctx.param().map((paramCtx) => this.visitParam(paramCtx));
  }

  visitParam(ctx: ParamContext): FunctionParameter {
    return {
      name: ctx.ID().getText(),
      type: ctx.type().getText(),
    };
  }

  visitReturn_stmt(ctx: Return_stmtContext): any {
    return {
      tag: "ret",
      expr: this.visit(ctx.expr()),
    };
  }
}
