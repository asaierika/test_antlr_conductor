// Generated from src/Rust.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


import { ProgContext } from "./RustParser.js";
import { StmtContext } from "./RustParser.js";
import { Let_declContext } from "./RustParser.js";
import { Assign_deref_stmtContext } from "./RustParser.js";
import { Assign_stmtContext } from "./RustParser.js";
import { Expr_stmtContext } from "./RustParser.js";
import { If_stmtContext } from "./RustParser.js";
import { While_loopContext } from "./RustParser.js";
import { Break_stmtContext } from "./RustParser.js";
import { Continue_stmtContext } from "./RustParser.js";
import { Return_stmtContext } from "./RustParser.js";
import { BlockContext } from "./RustParser.js";
import { Func_defContext } from "./RustParser.js";
import { ParamsContext } from "./RustParser.js";
import { ParamContext } from "./RustParser.js";
import { Struct_defContext } from "./RustParser.js";
import { Struct_fieldContext } from "./RustParser.js";
import { TypeContext } from "./RustParser.js";
import { StructInitContext } from "./RustParser.js";
import { UnaryOpContext } from "./RustParser.js";
import { VariableContext } from "./RustParser.js";
import { BoolLiteralContext } from "./RustParser.js";
import { FloatLiteralContext } from "./RustParser.js";
import { ParensContext } from "./RustParser.js";
import { LogicalOpContext } from "./RustParser.js";
import { IntLiteralContext } from "./RustParser.js";
import { ApplicationContext } from "./RustParser.js";
import { BinaryOpContext } from "./RustParser.js";
import { ArgsContext } from "./RustParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `RustParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class RustVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `RustParser.prog`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProg?: (ctx: ProgContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStmt?: (ctx: StmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.let_decl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLet_decl?: (ctx: Let_declContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.assign_deref_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAssign_deref_stmt?: (ctx: Assign_deref_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.assign_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAssign_stmt?: (ctx: Assign_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.expr_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpr_stmt?: (ctx: Expr_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.if_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIf_stmt?: (ctx: If_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.while_loop`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWhile_loop?: (ctx: While_loopContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.break_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBreak_stmt?: (ctx: Break_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.continue_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitContinue_stmt?: (ctx: Continue_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.return_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReturn_stmt?: (ctx: Return_stmtContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlock?: (ctx: BlockContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.func_def`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunc_def?: (ctx: Func_defContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.params`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParams?: (ctx: ParamsContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.param`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParam?: (ctx: ParamContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.struct_def`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStruct_def?: (ctx: Struct_defContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.struct_field`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStruct_field?: (ctx: Struct_fieldContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.type`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitType?: (ctx: TypeContext) => Result;
    /**
     * Visit a parse tree produced by the `StructInit`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStructInit?: (ctx: StructInitContext) => Result;
    /**
     * Visit a parse tree produced by the `UnaryOp`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnaryOp?: (ctx: UnaryOpContext) => Result;
    /**
     * Visit a parse tree produced by the `Variable`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVariable?: (ctx: VariableContext) => Result;
    /**
     * Visit a parse tree produced by the `BoolLiteral`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBoolLiteral?: (ctx: BoolLiteralContext) => Result;
    /**
     * Visit a parse tree produced by the `FloatLiteral`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFloatLiteral?: (ctx: FloatLiteralContext) => Result;
    /**
     * Visit a parse tree produced by the `Parens`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParens?: (ctx: ParensContext) => Result;
    /**
     * Visit a parse tree produced by the `LogicalOp`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLogicalOp?: (ctx: LogicalOpContext) => Result;
    /**
     * Visit a parse tree produced by the `IntLiteral`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIntLiteral?: (ctx: IntLiteralContext) => Result;
    /**
     * Visit a parse tree produced by the `Application`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitApplication?: (ctx: ApplicationContext) => Result;
    /**
     * Visit a parse tree produced by the `BinaryOp`
     * labeled alternative in `RustParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBinaryOp?: (ctx: BinaryOpContext) => Result;
    /**
     * Visit a parse tree produced by `RustParser.args`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArgs?: (ctx: ArgsContext) => Result;
}

