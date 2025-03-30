import { AbstractParseTreeVisitor, ParserRuleContext } from "antlr4ng";
import { RustVisitor } from "./parser/src/RustVisitor";
import {
  ProgContext,
  Let_declContext,
  If_stmtContext,
  BlockContext,
  BinaryOpContext,
  VariableContext,
  LiteralContext,
} from "./parser/src/RustParser";

export class ASTToJsonVisitor
  extends AbstractParseTreeVisitor<any>
  implements RustVisitor<any>
{
  visitProg(ctx: ProgContext): any {
    // Create a synthetic BlockContext to reuse visitBlock logic
    const syntheticBlock = {
      stmt: () => ctx.stmt(), // Expose the same statements
      start: ctx.start, // Preserve source location
      stop: ctx.stop,
    } as BlockContext;

    return this.visitBlock(syntheticBlock);
  }

  visitLet_decl(ctx: Let_declContext): any {
    return {
      tag: "let",
      sym: ctx.ID().getText(),
      vartag: ctx.type().getText(),
      expr: this.visit(ctx.expr()),
    };
  }

  visitBinaryOp(ctx: BinaryOpContext): any {
    return {
      tag: "binop",
      operator: ctx._op.text,
      left: this.visit(ctx.expr(0)),
      right: this.visit(ctx.expr(1)),
    };
  }

  visitVariable(ctx: VariableContext): any {
    return {
      tag: "nam",
      name: ctx.ID().getText(),
    };
  }

  visitLiteral(ctx: LiteralContext): any {
    return {
      tag: "lit",
      val: parseInt(ctx.INT().getText()),
    };
  }

  visitIf_stmt(ctx: If_stmtContext): any {
    return {
      tag: "cond",
      pred: this.visit(ctx.expr()),
      con: this.visit(ctx.block(0)),
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
          ? ctx.stmt()
          : { tag: "seq", stmts: ctx.stmt().map((stmt) => this.visit(stmt)) },
    };
  }
}
