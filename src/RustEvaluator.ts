import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import {
  CharStream,
  CommonTokenStream,
  AbstractParseTreeVisitor,
} from "antlr4ng";
import { RustLexer } from "./parser/src/RustLexer";
import { RustVisitor } from "./parser/src/RustVisitor";
import {
  RustParser,
  ProgContext,
  Let_declContext,
  ExprContext,
  If_stmtContext,
  BlockContext,
  BinaryOpContext,
  VariableContext,
  LiteralContext,
  ParensContext,
} from "./parser/src/RustParser";

type ValueType = number | boolean; // Our interpreter handles i32 and bool

class RustEvaluatorVisitor
  extends AbstractParseTreeVisitor<ValueType>
  implements RustVisitor<ValueType>
{
  private variables: Map<string, ValueType> = new Map();

  // Override default visit behavior
  protected defaultResult(): ValueType {
    return 0;
  }

  visitProg(ctx: ProgContext): ValueType {
    const statements = ctx.stmt();
    if (statements.length === 0) {
      return this.defaultResult(); // Return default if no statements
    }

    // Execute all statements and keep the last result
    let lastResult: ValueType = this.defaultResult();
    for (const stmt of statements) {
      lastResult = this.visit(stmt);
    }

    return lastResult;
  }

  visitLet_decl(ctx: Let_declContext): ValueType {
    const varName = ctx.ID().getText();
    const value = this.visit(ctx.expr());
    this.variables.set(varName, value);
    return this.defaultResult();
  }

  visitExpr(ctx: ExprContext): ValueType {
    if (ctx instanceof BinaryOpContext) {
      return this.visitBinaryOp(ctx);
    } else if (ctx instanceof VariableContext) {
      return this.visitVariable(ctx);
    } else if (ctx instanceof LiteralContext) {
      return this.visitLiteral(ctx);
    } else if (ctx instanceof ParensContext) {
      return this.visit(ctx.expr());
    }
    throw new Error(`Unknown expression type: ${ctx.constructor.name}`);
  }

  visitBinaryOp(ctx: BinaryOpContext): ValueType {
    const left = this.visit(ctx.expr(0));
    const right = this.visit(ctx.expr(1));
    const op = ctx._op.text;

    // Type checking
    if (typeof left !== "number" || typeof right !== "number") {
      throw new Error(`Cannot perform arithmetic on non-numeric values`);
    }

    switch (op) {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "*":
        return left * right;
      case "/":
        return Math.floor(left / right); // Rust-like integer division
      case "%":
        return left % right;
      case "==":
        return left === right;
      case "!=":
        return left !== right;
      case "<":
        return left < right;
      case ">":
        return left > right;
      default:
        throw new Error(`Unknown operator: ${op}`);
    }
  }

  visitVariable(ctx: VariableContext): ValueType {
    const varName = ctx.ID().getText();
    const value = this.variables.get(varName);
    if (value === undefined) {
      throw new Error(`Undefined variable: ${varName}`);
    }
    return value;
  }

  visitLiteral(ctx: LiteralContext): ValueType {
    return parseInt(ctx.INT().getText());
  }

  visitIf_stmt(ctx: If_stmtContext): ValueType {
    const condition = this.visit(ctx.expr());
    if (condition) {
      return this.visit(ctx.block(0));
    } else if (ctx.block(1)) {
      // else block
      return this.visit(ctx.block(1));
    }
    return this.defaultResult();
  }

  visitBlock(ctx: BlockContext): ValueType {
    ctx.stmt().forEach((stmt) => this.visit(stmt));
    return this.defaultResult();
  }
}

export class RustEvaluator extends BasicEvaluator {
  private executionCount: number;
  private visitor: RustEvaluatorVisitor;

  constructor(conductor: IRunnerPlugin) {
    super(conductor);
    this.executionCount = 0;
    this.visitor = new RustEvaluatorVisitor();
  }

  async evaluateChunk(chunk: string): Promise<void> {
    this.executionCount++;
    try {
      // Create the lexer and parser
      const inputStream = CharStream.fromString(chunk);
      const lexer = new RustLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new RustParser(tokenStream);

      // Parse the input
      const tree = parser.prog();

      // Evaluate the parsed tree
      const result = this.visitor.visit(tree);

      // Send the result to the REPL
      this.conductor.sendOutput(`Result of expression: ${result}`);
    } catch (error) {
      // Handle errors and send them to the REPL
      if (error instanceof Error) {
        this.conductor.sendOutput(`Error: ${error.message}`);
      } else {
        this.conductor.sendOutput(`Error: ${String(error)}`);
      }
    }
  }
}
