// Generated from src/Rust.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { RustListener } from "./RustListener.js";
import { RustVisitor } from "./RustVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class RustParser extends antlr.Parser {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly T__2 = 3;
    public static readonly T__3 = 4;
    public static readonly T__4 = 5;
    public static readonly T__5 = 6;
    public static readonly T__6 = 7;
    public static readonly T__7 = 8;
    public static readonly T__8 = 9;
    public static readonly T__9 = 10;
    public static readonly T__10 = 11;
    public static readonly T__11 = 12;
    public static readonly T__12 = 13;
    public static readonly T__13 = 14;
    public static readonly T__14 = 15;
    public static readonly T__15 = 16;
    public static readonly T__16 = 17;
    public static readonly T__17 = 18;
    public static readonly T__18 = 19;
    public static readonly T__19 = 20;
    public static readonly T__20 = 21;
    public static readonly T__21 = 22;
    public static readonly T__22 = 23;
    public static readonly T__23 = 24;
    public static readonly T__24 = 25;
    public static readonly T__25 = 26;
    public static readonly T__26 = 27;
    public static readonly T__27 = 28;
    public static readonly T__28 = 29;
    public static readonly T__29 = 30;
    public static readonly T__30 = 31;
    public static readonly T__31 = 32;
    public static readonly T__32 = 33;
    public static readonly T__33 = 34;
    public static readonly T__34 = 35;
    public static readonly TRUE = 36;
    public static readonly FALSE = 37;
    public static readonly BREAK = 38;
    public static readonly CONTINUE = 39;
    public static readonly RETURN = 40;
    public static readonly FN = 41;
    public static readonly WS = 42;
    public static readonly COMMENT = 43;
    public static readonly ID = 44;
    public static readonly INT = 45;
    public static readonly FLOAT = 46;
    public static readonly RULE_prog = 0;
    public static readonly RULE_stmt = 1;
    public static readonly RULE_let_decl = 2;
    public static readonly RULE_assign_expr_stmt = 3;
    public static readonly RULE_assign_stmt = 4;
    public static readonly RULE_expr_stmt = 5;
    public static readonly RULE_if_stmt = 6;
    public static readonly RULE_while_loop = 7;
    public static readonly RULE_break_stmt = 8;
    public static readonly RULE_continue_stmt = 9;
    public static readonly RULE_return_stmt = 10;
    public static readonly RULE_block = 11;
    public static readonly RULE_func_def = 12;
    public static readonly RULE_params = 13;
    public static readonly RULE_param = 14;
    public static readonly RULE_struct_def = 15;
    public static readonly RULE_struct_field = 16;
    public static readonly RULE_type = 17;
    public static readonly RULE_expr = 18;
    public static readonly RULE_args = 19;

    public static readonly literalNames = [
        null, "'let'", "':'", "'='", "';'", "'if'", "'else'", "'while'", 
        "'{'", "'}'", "'('", "')'", "'->'", "','", "'struct'", "'&'", "'mut'", 
        "'i32'", "'bool'", "'f64'", "'-'", "'!'", "'&mut'", "'*'", "'/'", 
        "'%'", "'.'", "'+'", "'=='", "'!='", "'<'", "'>'", "'<='", "'>='", 
        "'&&'", "'||'", "'true'", "'false'", "'break'", "'continue'", "'return'", 
        "'fn'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, "TRUE", "FALSE", "BREAK", "CONTINUE", "RETURN", 
        "FN", "WS", "COMMENT", "ID", "INT", "FLOAT"
    ];
    public static readonly ruleNames = [
        "prog", "stmt", "let_decl", "assign_expr_stmt", "assign_stmt", "expr_stmt", 
        "if_stmt", "while_loop", "break_stmt", "continue_stmt", "return_stmt", 
        "block", "func_def", "params", "param", "struct_def", "struct_field", 
        "type", "expr", "args",
    ];

    public get grammarFileName(): string { return "Rust.g4"; }
    public get literalNames(): (string | null)[] { return RustParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return RustParser.symbolicNames; }
    public get ruleNames(): string[] { return RustParser.ruleNames; }
    public get serializedATN(): number[] { return RustParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, RustParser._ATN, RustParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public prog(): ProgContext {
        let localContext = new ProgContext(this.context, this.state);
        this.enterRule(localContext, 0, RustParser.RULE_prog);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 43;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 15779234) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 1855) !== 0)) {
                {
                {
                this.state = 40;
                this.stmt();
                }
                }
                this.state = 45;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 46;
            this.match(RustParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public stmt(): StmtContext {
        let localContext = new StmtContext(this.context, this.state);
        this.enterRule(localContext, 2, RustParser.RULE_stmt);
        try {
            this.state = 60;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 48;
                this.let_decl();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 49;
                this.assign_stmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 50;
                this.assign_expr_stmt();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 51;
                this.expr_stmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 52;
                this.break_stmt();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 53;
                this.continue_stmt();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 54;
                this.while_loop();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 55;
                this.if_stmt();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 56;
                this.return_stmt();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 57;
                this.block();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 58;
                this.func_def();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 59;
                this.struct_def();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public let_decl(): Let_declContext {
        let localContext = new Let_declContext(this.context, this.state);
        this.enterRule(localContext, 4, RustParser.RULE_let_decl);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 62;
            this.match(RustParser.T__0);
            this.state = 63;
            this.match(RustParser.ID);
            this.state = 64;
            this.match(RustParser.T__1);
            this.state = 65;
            this.type_();
            this.state = 66;
            this.match(RustParser.T__2);
            this.state = 67;
            this.expr(0);
            this.state = 69;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 68;
                this.match(RustParser.T__3);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assign_expr_stmt(): Assign_expr_stmtContext {
        let localContext = new Assign_expr_stmtContext(this.context, this.state);
        this.enterRule(localContext, 6, RustParser.RULE_assign_expr_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 71;
            this.expr(0);
            this.state = 72;
            this.match(RustParser.T__2);
            this.state = 73;
            this.expr(0);
            this.state = 75;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 74;
                this.match(RustParser.T__3);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assign_stmt(): Assign_stmtContext {
        let localContext = new Assign_stmtContext(this.context, this.state);
        this.enterRule(localContext, 8, RustParser.RULE_assign_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 77;
            this.match(RustParser.ID);
            this.state = 78;
            this.match(RustParser.T__2);
            this.state = 79;
            this.expr(0);
            this.state = 81;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 80;
                this.match(RustParser.T__3);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr_stmt(): Expr_stmtContext {
        let localContext = new Expr_stmtContext(this.context, this.state);
        this.enterRule(localContext, 10, RustParser.RULE_expr_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 83;
            this.expr(0);
            this.state = 85;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 84;
                this.match(RustParser.T__3);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public if_stmt(): If_stmtContext {
        let localContext = new If_stmtContext(this.context, this.state);
        this.enterRule(localContext, 12, RustParser.RULE_if_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 87;
            this.match(RustParser.T__4);
            this.state = 88;
            this.expr(0);
            this.state = 89;
            this.block();
            this.state = 95;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 6) {
                {
                this.state = 90;
                this.match(RustParser.T__5);
                this.state = 93;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case RustParser.T__7:
                    {
                    this.state = 91;
                    this.block();
                    }
                    break;
                case RustParser.T__4:
                    {
                    this.state = 92;
                    this.if_stmt();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
            }

            this.state = 98;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                {
                this.state = 97;
                this.match(RustParser.T__3);
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public while_loop(): While_loopContext {
        let localContext = new While_loopContext(this.context, this.state);
        this.enterRule(localContext, 14, RustParser.RULE_while_loop);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 100;
            this.match(RustParser.T__6);
            this.state = 101;
            this.expr(0);
            this.state = 102;
            this.block();
            this.state = 104;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 103;
                this.match(RustParser.T__3);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public break_stmt(): Break_stmtContext {
        let localContext = new Break_stmtContext(this.context, this.state);
        this.enterRule(localContext, 16, RustParser.RULE_break_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 106;
            this.match(RustParser.BREAK);
            this.state = 108;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 107;
                this.match(RustParser.T__3);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public continue_stmt(): Continue_stmtContext {
        let localContext = new Continue_stmtContext(this.context, this.state);
        this.enterRule(localContext, 18, RustParser.RULE_continue_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 110;
            this.match(RustParser.CONTINUE);
            this.state = 112;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 111;
                this.match(RustParser.T__3);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public return_stmt(): Return_stmtContext {
        let localContext = new Return_stmtContext(this.context, this.state);
        this.enterRule(localContext, 20, RustParser.RULE_return_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 114;
            this.match(RustParser.RETURN);
            this.state = 116;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
            case 1:
                {
                this.state = 115;
                this.expr(0);
                }
                break;
            }
            this.state = 119;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 118;
                this.match(RustParser.T__3);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public block(): BlockContext {
        let localContext = new BlockContext(this.context, this.state);
        this.enterRule(localContext, 22, RustParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 121;
            this.match(RustParser.T__7);
            this.state = 125;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 15779234) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 1855) !== 0)) {
                {
                {
                this.state = 122;
                this.stmt();
                }
                }
                this.state = 127;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 128;
            this.match(RustParser.T__8);
            this.state = 130;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
            case 1:
                {
                this.state = 129;
                this.match(RustParser.T__3);
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public func_def(): Func_defContext {
        let localContext = new Func_defContext(this.context, this.state);
        this.enterRule(localContext, 24, RustParser.RULE_func_def);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 132;
            this.match(RustParser.FN);
            this.state = 133;
            this.match(RustParser.ID);
            this.state = 134;
            this.match(RustParser.T__9);
            this.state = 136;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 44) {
                {
                this.state = 135;
                this.params();
                }
            }

            this.state = 138;
            this.match(RustParser.T__10);
            this.state = 141;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 12) {
                {
                this.state = 139;
                this.match(RustParser.T__11);
                this.state = 140;
                this.type_();
                }
            }

            this.state = 143;
            this.block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public params(): ParamsContext {
        let localContext = new ParamsContext(this.context, this.state);
        this.enterRule(localContext, 26, RustParser.RULE_params);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 145;
            this.param();
            this.state = 150;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 13) {
                {
                {
                this.state = 146;
                this.match(RustParser.T__12);
                this.state = 147;
                this.param();
                }
                }
                this.state = 152;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public param(): ParamContext {
        let localContext = new ParamContext(this.context, this.state);
        this.enterRule(localContext, 28, RustParser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 153;
            this.match(RustParser.ID);
            this.state = 154;
            this.match(RustParser.T__1);
            this.state = 155;
            this.type_();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public struct_def(): Struct_defContext {
        let localContext = new Struct_defContext(this.context, this.state);
        this.enterRule(localContext, 30, RustParser.RULE_struct_def);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 157;
            this.match(RustParser.T__13);
            this.state = 158;
            this.match(RustParser.ID);
            this.state = 159;
            this.match(RustParser.T__7);
            this.state = 160;
            this.struct_field();
            this.state = 165;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 13) {
                {
                {
                this.state = 161;
                this.match(RustParser.T__12);
                this.state = 162;
                this.struct_field();
                }
                }
                this.state = 167;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 168;
            this.match(RustParser.T__8);
            this.state = 170;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 169;
                this.match(RustParser.T__3);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public struct_field(): Struct_fieldContext {
        let localContext = new Struct_fieldContext(this.context, this.state);
        this.enterRule(localContext, 32, RustParser.RULE_struct_field);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 172;
            this.match(RustParser.ID);
            this.state = 173;
            this.match(RustParser.T__1);
            this.state = 174;
            this.type_();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public type_(): TypeContext {
        let localContext = new TypeContext(this.context, this.state);
        this.enterRule(localContext, 34, RustParser.RULE_type);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 182;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 15) {
                {
                {
                this.state = 176;
                this.match(RustParser.T__14);
                this.state = 178;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 16) {
                    {
                    this.state = 177;
                    this.match(RustParser.T__15);
                    }
                }

                }
                }
                this.state = 184;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 185;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 17)) & ~0x1F) === 0 && ((1 << (_la - 17)) & 134217735) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public expr(): ExprContext;
    public expr(_p: number): ExprContext;
    public expr(_p?: number): ExprContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ExprContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 36;
        this.enterRecursionRule(localContext, 36, RustParser.RULE_expr, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 211;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context) ) {
            case 1:
                {
                localContext = new ApplicationContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 188;
                this.match(RustParser.ID);
                this.state = 189;
                this.match(RustParser.T__9);
                this.state = 191;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 15762432) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 1795) !== 0)) {
                    {
                    this.state = 190;
                    this.args();
                    }
                }

                this.state = 193;
                this.match(RustParser.T__10);
                }
                break;
            case 2:
                {
                localContext = new StructInitContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 194;
                this.match(RustParser.ID);
                this.state = 195;
                this.match(RustParser.T__7);
                this.state = 197;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 15762432) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 1795) !== 0)) {
                    {
                    this.state = 196;
                    this.args();
                    }
                }

                this.state = 199;
                this.match(RustParser.T__8);
                }
                break;
            case 3:
                {
                localContext = new UnaryOpContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 200;
                (localContext as UnaryOpContext)._op = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 15761408) !== 0))) {
                    (localContext as UnaryOpContext)._op = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 201;
                this.expr(11);
                }
                break;
            case 4:
                {
                localContext = new VariableContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 202;
                this.match(RustParser.ID);
                }
                break;
            case 5:
                {
                localContext = new IntLiteralContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 203;
                this.match(RustParser.INT);
                }
                break;
            case 6:
                {
                localContext = new FloatLiteralContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 204;
                this.match(RustParser.FLOAT);
                }
                break;
            case 7:
                {
                localContext = new BoolLiteralContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 205;
                this.match(RustParser.TRUE);
                }
                break;
            case 8:
                {
                localContext = new BoolLiteralContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 206;
                this.match(RustParser.FALSE);
                }
                break;
            case 9:
                {
                localContext = new ParensContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 207;
                this.match(RustParser.T__9);
                this.state = 208;
                this.expr(0);
                this.state = 209;
                this.match(RustParser.T__10);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 227;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 225;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
                    case 1:
                        {
                        localContext = new BinaryOpContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expr);
                        this.state = 213;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 214;
                        (localContext as BinaryOpContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 125829120) !== 0))) {
                            (localContext as BinaryOpContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 215;
                        this.expr(11);
                        }
                        break;
                    case 2:
                        {
                        localContext = new BinaryOpContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expr);
                        this.state = 216;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 217;
                        (localContext as BinaryOpContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 20 || _la === 27)) {
                            (localContext as BinaryOpContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 218;
                        this.expr(10);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinaryOpContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expr);
                        this.state = 219;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 220;
                        (localContext as BinaryOpContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 63) !== 0))) {
                            (localContext as BinaryOpContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 221;
                        this.expr(9);
                        }
                        break;
                    case 4:
                        {
                        localContext = new LogicalOpContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expr);
                        this.state = 222;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 223;
                        (localContext as LogicalOpContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 34 || _la === 35)) {
                            (localContext as LogicalOpContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 224;
                        this.expr(8);
                        }
                        break;
                    }
                    }
                }
                this.state = 229;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public args(): ArgsContext {
        let localContext = new ArgsContext(this.context, this.state);
        this.enterRule(localContext, 38, RustParser.RULE_args);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 230;
            this.expr(0);
            this.state = 235;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 13) {
                {
                {
                this.state = 231;
                this.match(RustParser.T__12);
                this.state = 232;
                this.expr(0);
                }
                }
                this.state = 237;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 18:
            return this.expr_sempred(localContext as ExprContext, predIndex);
        }
        return true;
    }
    private expr_sempred(localContext: ExprContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 10);
        case 1:
            return this.precpred(this.context, 9);
        case 2:
            return this.precpred(this.context, 8);
        case 3:
            return this.precpred(this.context, 7);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,46,239,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,1,0,
        5,0,42,8,0,10,0,12,0,45,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,3,1,61,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,70,
        8,2,1,3,1,3,1,3,1,3,3,3,76,8,3,1,4,1,4,1,4,1,4,3,4,82,8,4,1,5,1,
        5,3,5,86,8,5,1,6,1,6,1,6,1,6,1,6,1,6,3,6,94,8,6,3,6,96,8,6,1,6,3,
        6,99,8,6,1,7,1,7,1,7,1,7,3,7,105,8,7,1,8,1,8,3,8,109,8,8,1,9,1,9,
        3,9,113,8,9,1,10,1,10,3,10,117,8,10,1,10,3,10,120,8,10,1,11,1,11,
        5,11,124,8,11,10,11,12,11,127,9,11,1,11,1,11,3,11,131,8,11,1,12,
        1,12,1,12,1,12,3,12,137,8,12,1,12,1,12,1,12,3,12,142,8,12,1,12,1,
        12,1,13,1,13,1,13,5,13,149,8,13,10,13,12,13,152,9,13,1,14,1,14,1,
        14,1,14,1,15,1,15,1,15,1,15,1,15,1,15,5,15,164,8,15,10,15,12,15,
        167,9,15,1,15,1,15,3,15,171,8,15,1,16,1,16,1,16,1,16,1,17,1,17,3,
        17,179,8,17,5,17,181,8,17,10,17,12,17,184,9,17,1,17,1,17,1,18,1,
        18,1,18,1,18,3,18,192,8,18,1,18,1,18,1,18,1,18,3,18,198,8,18,1,18,
        1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,212,
        8,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,
        5,18,226,8,18,10,18,12,18,229,9,18,1,19,1,19,1,19,5,19,234,8,19,
        10,19,12,19,237,9,19,1,19,0,1,36,20,0,2,4,6,8,10,12,14,16,18,20,
        22,24,26,28,30,32,34,36,38,0,6,2,0,17,19,44,44,2,0,15,15,20,23,1,
        0,23,26,2,0,20,20,27,27,1,0,28,33,1,0,34,35,266,0,43,1,0,0,0,2,60,
        1,0,0,0,4,62,1,0,0,0,6,71,1,0,0,0,8,77,1,0,0,0,10,83,1,0,0,0,12,
        87,1,0,0,0,14,100,1,0,0,0,16,106,1,0,0,0,18,110,1,0,0,0,20,114,1,
        0,0,0,22,121,1,0,0,0,24,132,1,0,0,0,26,145,1,0,0,0,28,153,1,0,0,
        0,30,157,1,0,0,0,32,172,1,0,0,0,34,182,1,0,0,0,36,211,1,0,0,0,38,
        230,1,0,0,0,40,42,3,2,1,0,41,40,1,0,0,0,42,45,1,0,0,0,43,41,1,0,
        0,0,43,44,1,0,0,0,44,46,1,0,0,0,45,43,1,0,0,0,46,47,5,0,0,1,47,1,
        1,0,0,0,48,61,3,4,2,0,49,61,3,8,4,0,50,61,3,6,3,0,51,61,3,10,5,0,
        52,61,3,16,8,0,53,61,3,18,9,0,54,61,3,14,7,0,55,61,3,12,6,0,56,61,
        3,20,10,0,57,61,3,22,11,0,58,61,3,24,12,0,59,61,3,30,15,0,60,48,
        1,0,0,0,60,49,1,0,0,0,60,50,1,0,0,0,60,51,1,0,0,0,60,52,1,0,0,0,
        60,53,1,0,0,0,60,54,1,0,0,0,60,55,1,0,0,0,60,56,1,0,0,0,60,57,1,
        0,0,0,60,58,1,0,0,0,60,59,1,0,0,0,61,3,1,0,0,0,62,63,5,1,0,0,63,
        64,5,44,0,0,64,65,5,2,0,0,65,66,3,34,17,0,66,67,5,3,0,0,67,69,3,
        36,18,0,68,70,5,4,0,0,69,68,1,0,0,0,69,70,1,0,0,0,70,5,1,0,0,0,71,
        72,3,36,18,0,72,73,5,3,0,0,73,75,3,36,18,0,74,76,5,4,0,0,75,74,1,
        0,0,0,75,76,1,0,0,0,76,7,1,0,0,0,77,78,5,44,0,0,78,79,5,3,0,0,79,
        81,3,36,18,0,80,82,5,4,0,0,81,80,1,0,0,0,81,82,1,0,0,0,82,9,1,0,
        0,0,83,85,3,36,18,0,84,86,5,4,0,0,85,84,1,0,0,0,85,86,1,0,0,0,86,
        11,1,0,0,0,87,88,5,5,0,0,88,89,3,36,18,0,89,95,3,22,11,0,90,93,5,
        6,0,0,91,94,3,22,11,0,92,94,3,12,6,0,93,91,1,0,0,0,93,92,1,0,0,0,
        94,96,1,0,0,0,95,90,1,0,0,0,95,96,1,0,0,0,96,98,1,0,0,0,97,99,5,
        4,0,0,98,97,1,0,0,0,98,99,1,0,0,0,99,13,1,0,0,0,100,101,5,7,0,0,
        101,102,3,36,18,0,102,104,3,22,11,0,103,105,5,4,0,0,104,103,1,0,
        0,0,104,105,1,0,0,0,105,15,1,0,0,0,106,108,5,38,0,0,107,109,5,4,
        0,0,108,107,1,0,0,0,108,109,1,0,0,0,109,17,1,0,0,0,110,112,5,39,
        0,0,111,113,5,4,0,0,112,111,1,0,0,0,112,113,1,0,0,0,113,19,1,0,0,
        0,114,116,5,40,0,0,115,117,3,36,18,0,116,115,1,0,0,0,116,117,1,0,
        0,0,117,119,1,0,0,0,118,120,5,4,0,0,119,118,1,0,0,0,119,120,1,0,
        0,0,120,21,1,0,0,0,121,125,5,8,0,0,122,124,3,2,1,0,123,122,1,0,0,
        0,124,127,1,0,0,0,125,123,1,0,0,0,125,126,1,0,0,0,126,128,1,0,0,
        0,127,125,1,0,0,0,128,130,5,9,0,0,129,131,5,4,0,0,130,129,1,0,0,
        0,130,131,1,0,0,0,131,23,1,0,0,0,132,133,5,41,0,0,133,134,5,44,0,
        0,134,136,5,10,0,0,135,137,3,26,13,0,136,135,1,0,0,0,136,137,1,0,
        0,0,137,138,1,0,0,0,138,141,5,11,0,0,139,140,5,12,0,0,140,142,3,
        34,17,0,141,139,1,0,0,0,141,142,1,0,0,0,142,143,1,0,0,0,143,144,
        3,22,11,0,144,25,1,0,0,0,145,150,3,28,14,0,146,147,5,13,0,0,147,
        149,3,28,14,0,148,146,1,0,0,0,149,152,1,0,0,0,150,148,1,0,0,0,150,
        151,1,0,0,0,151,27,1,0,0,0,152,150,1,0,0,0,153,154,5,44,0,0,154,
        155,5,2,0,0,155,156,3,34,17,0,156,29,1,0,0,0,157,158,5,14,0,0,158,
        159,5,44,0,0,159,160,5,8,0,0,160,165,3,32,16,0,161,162,5,13,0,0,
        162,164,3,32,16,0,163,161,1,0,0,0,164,167,1,0,0,0,165,163,1,0,0,
        0,165,166,1,0,0,0,166,168,1,0,0,0,167,165,1,0,0,0,168,170,5,9,0,
        0,169,171,5,4,0,0,170,169,1,0,0,0,170,171,1,0,0,0,171,31,1,0,0,0,
        172,173,5,44,0,0,173,174,5,2,0,0,174,175,3,34,17,0,175,33,1,0,0,
        0,176,178,5,15,0,0,177,179,5,16,0,0,178,177,1,0,0,0,178,179,1,0,
        0,0,179,181,1,0,0,0,180,176,1,0,0,0,181,184,1,0,0,0,182,180,1,0,
        0,0,182,183,1,0,0,0,183,185,1,0,0,0,184,182,1,0,0,0,185,186,7,0,
        0,0,186,35,1,0,0,0,187,188,6,18,-1,0,188,189,5,44,0,0,189,191,5,
        10,0,0,190,192,3,38,19,0,191,190,1,0,0,0,191,192,1,0,0,0,192,193,
        1,0,0,0,193,212,5,11,0,0,194,195,5,44,0,0,195,197,5,8,0,0,196,198,
        3,38,19,0,197,196,1,0,0,0,197,198,1,0,0,0,198,199,1,0,0,0,199,212,
        5,9,0,0,200,201,7,1,0,0,201,212,3,36,18,11,202,212,5,44,0,0,203,
        212,5,45,0,0,204,212,5,46,0,0,205,212,5,36,0,0,206,212,5,37,0,0,
        207,208,5,10,0,0,208,209,3,36,18,0,209,210,5,11,0,0,210,212,1,0,
        0,0,211,187,1,0,0,0,211,194,1,0,0,0,211,200,1,0,0,0,211,202,1,0,
        0,0,211,203,1,0,0,0,211,204,1,0,0,0,211,205,1,0,0,0,211,206,1,0,
        0,0,211,207,1,0,0,0,212,227,1,0,0,0,213,214,10,10,0,0,214,215,7,
        2,0,0,215,226,3,36,18,11,216,217,10,9,0,0,217,218,7,3,0,0,218,226,
        3,36,18,10,219,220,10,8,0,0,220,221,7,4,0,0,221,226,3,36,18,9,222,
        223,10,7,0,0,223,224,7,5,0,0,224,226,3,36,18,8,225,213,1,0,0,0,225,
        216,1,0,0,0,225,219,1,0,0,0,225,222,1,0,0,0,226,229,1,0,0,0,227,
        225,1,0,0,0,227,228,1,0,0,0,228,37,1,0,0,0,229,227,1,0,0,0,230,235,
        3,36,18,0,231,232,5,13,0,0,232,234,3,36,18,0,233,231,1,0,0,0,234,
        237,1,0,0,0,235,233,1,0,0,0,235,236,1,0,0,0,236,39,1,0,0,0,237,235,
        1,0,0,0,29,43,60,69,75,81,85,93,95,98,104,108,112,116,119,125,130,
        136,141,150,165,170,178,182,191,197,211,225,227,235
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!RustParser.__ATN) {
            RustParser.__ATN = new antlr.ATNDeserializer().deserialize(RustParser._serializedATN);
        }

        return RustParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(RustParser.literalNames, RustParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return RustParser.vocabulary;
    }

    private static readonly decisionsToDFA = RustParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(RustParser.EOF, 0)!;
    }
    public stmt(): StmtContext[];
    public stmt(i: number): StmtContext | null;
    public stmt(i?: number): StmtContext[] | StmtContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StmtContext);
        }

        return this.getRuleContext(i, StmtContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_prog;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterProg) {
             listener.enterProg(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitProg) {
             listener.exitProg(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitProg) {
            return visitor.visitProg(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public let_decl(): Let_declContext | null {
        return this.getRuleContext(0, Let_declContext);
    }
    public assign_stmt(): Assign_stmtContext | null {
        return this.getRuleContext(0, Assign_stmtContext);
    }
    public assign_expr_stmt(): Assign_expr_stmtContext | null {
        return this.getRuleContext(0, Assign_expr_stmtContext);
    }
    public expr_stmt(): Expr_stmtContext | null {
        return this.getRuleContext(0, Expr_stmtContext);
    }
    public break_stmt(): Break_stmtContext | null {
        return this.getRuleContext(0, Break_stmtContext);
    }
    public continue_stmt(): Continue_stmtContext | null {
        return this.getRuleContext(0, Continue_stmtContext);
    }
    public while_loop(): While_loopContext | null {
        return this.getRuleContext(0, While_loopContext);
    }
    public if_stmt(): If_stmtContext | null {
        return this.getRuleContext(0, If_stmtContext);
    }
    public return_stmt(): Return_stmtContext | null {
        return this.getRuleContext(0, Return_stmtContext);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public func_def(): Func_defContext | null {
        return this.getRuleContext(0, Func_defContext);
    }
    public struct_def(): Struct_defContext | null {
        return this.getRuleContext(0, Struct_defContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_stmt;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterStmt) {
             listener.enterStmt(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitStmt) {
             listener.exitStmt(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitStmt) {
            return visitor.visitStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Let_declContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(RustParser.ID, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_let_decl;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterLet_decl) {
             listener.enterLet_decl(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitLet_decl) {
             listener.exitLet_decl(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitLet_decl) {
            return visitor.visitLet_decl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Assign_expr_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_assign_expr_stmt;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterAssign_expr_stmt) {
             listener.enterAssign_expr_stmt(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitAssign_expr_stmt) {
             listener.exitAssign_expr_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitAssign_expr_stmt) {
            return visitor.visitAssign_expr_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Assign_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(RustParser.ID, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_assign_stmt;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterAssign_stmt) {
             listener.enterAssign_stmt(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitAssign_stmt) {
             listener.exitAssign_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitAssign_stmt) {
            return visitor.visitAssign_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_expr_stmt;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterExpr_stmt) {
             listener.enterExpr_stmt(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitExpr_stmt) {
             listener.exitExpr_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitExpr_stmt) {
            return visitor.visitExpr_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class If_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public block(): BlockContext[];
    public block(i: number): BlockContext | null;
    public block(i?: number): BlockContext[] | BlockContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BlockContext);
        }

        return this.getRuleContext(i, BlockContext);
    }
    public if_stmt(): If_stmtContext | null {
        return this.getRuleContext(0, If_stmtContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_if_stmt;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterIf_stmt) {
             listener.enterIf_stmt(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitIf_stmt) {
             listener.exitIf_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitIf_stmt) {
            return visitor.visitIf_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class While_loopContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_while_loop;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterWhile_loop) {
             listener.enterWhile_loop(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitWhile_loop) {
             listener.exitWhile_loop(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitWhile_loop) {
            return visitor.visitWhile_loop(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Break_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BREAK(): antlr.TerminalNode {
        return this.getToken(RustParser.BREAK, 0)!;
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_break_stmt;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterBreak_stmt) {
             listener.enterBreak_stmt(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitBreak_stmt) {
             listener.exitBreak_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitBreak_stmt) {
            return visitor.visitBreak_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Continue_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CONTINUE(): antlr.TerminalNode {
        return this.getToken(RustParser.CONTINUE, 0)!;
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_continue_stmt;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterContinue_stmt) {
             listener.enterContinue_stmt(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitContinue_stmt) {
             listener.exitContinue_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitContinue_stmt) {
            return visitor.visitContinue_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Return_stmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(RustParser.RETURN, 0)!;
    }
    public expr(): ExprContext | null {
        return this.getRuleContext(0, ExprContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_return_stmt;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterReturn_stmt) {
             listener.enterReturn_stmt(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitReturn_stmt) {
             listener.exitReturn_stmt(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitReturn_stmt) {
            return visitor.visitReturn_stmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public stmt(): StmtContext[];
    public stmt(i: number): StmtContext | null;
    public stmt(i?: number): StmtContext[] | StmtContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StmtContext);
        }

        return this.getRuleContext(i, StmtContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_block;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitBlock) {
            return visitor.visitBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Func_defContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FN(): antlr.TerminalNode {
        return this.getToken(RustParser.FN, 0)!;
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(RustParser.ID, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public params(): ParamsContext | null {
        return this.getRuleContext(0, ParamsContext);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_func_def;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterFunc_def) {
             listener.enterFunc_def(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitFunc_def) {
             listener.exitFunc_def(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitFunc_def) {
            return visitor.visitFunc_def(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParamsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public param(): ParamContext[];
    public param(i: number): ParamContext | null;
    public param(i?: number): ParamContext[] | ParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ParamContext);
        }

        return this.getRuleContext(i, ParamContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_params;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterParams) {
             listener.enterParams(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitParams) {
             listener.exitParams(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitParams) {
            return visitor.visitParams(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(RustParser.ID, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_param;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterParam) {
             listener.enterParam(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitParam) {
             listener.exitParam(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitParam) {
            return visitor.visitParam(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Struct_defContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(RustParser.ID, 0)!;
    }
    public struct_field(): Struct_fieldContext[];
    public struct_field(i: number): Struct_fieldContext | null;
    public struct_field(i?: number): Struct_fieldContext[] | Struct_fieldContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Struct_fieldContext);
        }

        return this.getRuleContext(i, Struct_fieldContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_struct_def;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterStruct_def) {
             listener.enterStruct_def(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitStruct_def) {
             listener.exitStruct_def(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitStruct_def) {
            return visitor.visitStruct_def(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Struct_fieldContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(RustParser.ID, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_struct_field;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterStruct_field) {
             listener.enterStruct_field(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitStruct_field) {
             listener.exitStruct_field(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitStruct_field) {
            return visitor.visitStruct_field(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(RustParser.ID, 0)!;
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_type;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterType) {
             listener.enterType(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitType) {
             listener.exitType(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitType) {
            return visitor.visitType(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_expr;
    }
    public override copyFrom(ctx: ExprContext): void {
        super.copyFrom(ctx);
    }
}
export class StructInitContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(RustParser.ID, 0)!;
    }
    public args(): ArgsContext | null {
        return this.getRuleContext(0, ArgsContext);
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterStructInit) {
             listener.enterStructInit(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitStructInit) {
             listener.exitStructInit(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitStructInit) {
            return visitor.visitStructInit(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class UnaryOpContext extends ExprContext {
    public _op?: Token | null;
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterUnaryOp) {
             listener.enterUnaryOp(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitUnaryOp) {
             listener.exitUnaryOp(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitUnaryOp) {
            return visitor.visitUnaryOp(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class VariableContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(RustParser.ID, 0)!;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterVariable) {
             listener.enterVariable(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitVariable) {
             listener.exitVariable(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitVariable) {
            return visitor.visitVariable(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class BoolLiteralContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public TRUE(): antlr.TerminalNode | null {
        return this.getToken(RustParser.TRUE, 0);
    }
    public FALSE(): antlr.TerminalNode | null {
        return this.getToken(RustParser.FALSE, 0);
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterBoolLiteral) {
             listener.enterBoolLiteral(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitBoolLiteral) {
             listener.exitBoolLiteral(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitBoolLiteral) {
            return visitor.visitBoolLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class FloatLiteralContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public FLOAT(): antlr.TerminalNode {
        return this.getToken(RustParser.FLOAT, 0)!;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterFloatLiteral) {
             listener.enterFloatLiteral(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitFloatLiteral) {
             listener.exitFloatLiteral(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitFloatLiteral) {
            return visitor.visitFloatLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ParensContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterParens) {
             listener.enterParens(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitParens) {
             listener.exitParens(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitParens) {
            return visitor.visitParens(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LogicalOpContext extends ExprContext {
    public _op?: Token | null;
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterLogicalOp) {
             listener.enterLogicalOp(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitLogicalOp) {
             listener.exitLogicalOp(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitLogicalOp) {
            return visitor.visitLogicalOp(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IntLiteralContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public INT(): antlr.TerminalNode {
        return this.getToken(RustParser.INT, 0)!;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterIntLiteral) {
             listener.enterIntLiteral(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitIntLiteral) {
             listener.exitIntLiteral(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitIntLiteral) {
            return visitor.visitIntLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ApplicationContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(RustParser.ID, 0)!;
    }
    public args(): ArgsContext | null {
        return this.getRuleContext(0, ArgsContext);
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterApplication) {
             listener.enterApplication(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitApplication) {
             listener.exitApplication(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitApplication) {
            return visitor.visitApplication(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class BinaryOpContext extends ExprContext {
    public _op?: Token | null;
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterBinaryOp) {
             listener.enterBinaryOp(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitBinaryOp) {
             listener.exitBinaryOp(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitBinaryOp) {
            return visitor.visitBinaryOp(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArgsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public override get ruleIndex(): number {
        return RustParser.RULE_args;
    }
    public override enterRule(listener: RustListener): void {
        if(listener.enterArgs) {
             listener.enterArgs(this);
        }
    }
    public override exitRule(listener: RustListener): void {
        if(listener.exitArgs) {
             listener.exitArgs(this);
        }
    }
    public override accept<Result>(visitor: RustVisitor<Result>): Result | null {
        if (visitor.visitArgs) {
            return visitor.visitArgs(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
