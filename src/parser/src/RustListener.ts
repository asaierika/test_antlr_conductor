// Generated from src/Rust.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgContext } from "./RustParser.js";
import { StmtContext } from "./RustParser.js";
import { Let_declContext } from "./RustParser.js";
import { Assign_stmtContext } from "./RustParser.js";
import { Expr_stmtContext } from "./RustParser.js";
import { If_stmtContext } from "./RustParser.js";
import { While_loopContext } from "./RustParser.js";
import { Break_stmtContext } from "./RustParser.js";
import { Continue_stmtContext } from "./RustParser.js";
import { BlockContext } from "./RustParser.js";
import { UnaryOpContext } from "./RustParser.js";
import { VariableContext } from "./RustParser.js";
import { BoolLiteralContext } from "./RustParser.js";
import { FloatLiteralContext } from "./RustParser.js";
import { ParensContext } from "./RustParser.js";
import { IntLiteralContext } from "./RustParser.js";
import { BinaryOpContext } from "./RustParser.js";
import { TypeContext } from "./RustParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `RustParser`.
 */
export class RustListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `RustParser.prog`.
     * @param ctx the parse tree
     */
    enterProg?: (ctx: ProgContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.prog`.
     * @param ctx the parse tree
     */
    exitProg?: (ctx: ProgContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.stmt`.
     * @param ctx the parse tree
     */
    enterStmt?: (ctx: StmtContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.stmt`.
     * @param ctx the parse tree
     */
    exitStmt?: (ctx: StmtContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.let_decl`.
     * @param ctx the parse tree
     */
    enterLet_decl?: (ctx: Let_declContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.let_decl`.
     * @param ctx the parse tree
     */
    exitLet_decl?: (ctx: Let_declContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.assign_stmt`.
     * @param ctx the parse tree
     */
    enterAssign_stmt?: (ctx: Assign_stmtContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.assign_stmt`.
     * @param ctx the parse tree
     */
    exitAssign_stmt?: (ctx: Assign_stmtContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.expr_stmt`.
     * @param ctx the parse tree
     */
    enterExpr_stmt?: (ctx: Expr_stmtContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.expr_stmt`.
     * @param ctx the parse tree
     */
    exitExpr_stmt?: (ctx: Expr_stmtContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.if_stmt`.
     * @param ctx the parse tree
     */
    enterIf_stmt?: (ctx: If_stmtContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.if_stmt`.
     * @param ctx the parse tree
     */
    exitIf_stmt?: (ctx: If_stmtContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.while_loop`.
     * @param ctx the parse tree
     */
    enterWhile_loop?: (ctx: While_loopContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.while_loop`.
     * @param ctx the parse tree
     */
    exitWhile_loop?: (ctx: While_loopContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.break_stmt`.
     * @param ctx the parse tree
     */
    enterBreak_stmt?: (ctx: Break_stmtContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.break_stmt`.
     * @param ctx the parse tree
     */
    exitBreak_stmt?: (ctx: Break_stmtContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.continue_stmt`.
     * @param ctx the parse tree
     */
    enterContinue_stmt?: (ctx: Continue_stmtContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.continue_stmt`.
     * @param ctx the parse tree
     */
    exitContinue_stmt?: (ctx: Continue_stmtContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;
    /**
     * Enter a parse tree produced by the `UnaryOp`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    enterUnaryOp?: (ctx: UnaryOpContext) => void;
    /**
     * Exit a parse tree produced by the `UnaryOp`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    exitUnaryOp?: (ctx: UnaryOpContext) => void;
    /**
     * Enter a parse tree produced by the `Variable`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    enterVariable?: (ctx: VariableContext) => void;
    /**
     * Exit a parse tree produced by the `Variable`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    exitVariable?: (ctx: VariableContext) => void;
    /**
     * Enter a parse tree produced by the `BoolLiteral`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    enterBoolLiteral?: (ctx: BoolLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `BoolLiteral`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    exitBoolLiteral?: (ctx: BoolLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `FloatLiteral`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    enterFloatLiteral?: (ctx: FloatLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `FloatLiteral`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    exitFloatLiteral?: (ctx: FloatLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `Parens`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    enterParens?: (ctx: ParensContext) => void;
    /**
     * Exit a parse tree produced by the `Parens`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    exitParens?: (ctx: ParensContext) => void;
    /**
     * Enter a parse tree produced by the `IntLiteral`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    enterIntLiteral?: (ctx: IntLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `IntLiteral`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    exitIntLiteral?: (ctx: IntLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `BinaryOp`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    enterBinaryOp?: (ctx: BinaryOpContext) => void;
    /**
     * Exit a parse tree produced by the `BinaryOp`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     */
    exitBinaryOp?: (ctx: BinaryOpContext) => void;
    /**
     * Enter a parse tree produced by `RustParser.type`.
     * @param ctx the parse tree
     */
    enterType?: (ctx: TypeContext) => void;
    /**
     * Exit a parse tree produced by `RustParser.type`.
     * @param ctx the parse tree
     */
    exitType?: (ctx: TypeContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

