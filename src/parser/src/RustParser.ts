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
    public static readonly TRUE = 35;
    public static readonly FALSE = 36;
    public static readonly BREAK = 37;
    public static readonly CONTINUE = 38;
    public static readonly RETURN = 39;
    public static readonly FN = 40;
    public static readonly WS = 41;
    public static readonly COMMENT = 42;
    public static readonly ID = 43;
    public static readonly INT = 44;
    public static readonly FLOAT = 45;
    public static readonly RULE_prog = 0;
    public static readonly RULE_stmt = 1;
    public static readonly RULE_let_decl = 2;
    public static readonly RULE_assign_stmt = 3;
    public static readonly RULE_expr_stmt = 4;
    public static readonly RULE_if_stmt = 5;
    public static readonly RULE_while_loop = 6;
    public static readonly RULE_break_stmt = 7;
    public static readonly RULE_continue_stmt = 8;
    public static readonly RULE_return_stmt = 9;
    public static readonly RULE_block = 10;
    public static readonly RULE_func_def = 11;
    public static readonly RULE_params = 12;
    public static readonly RULE_param = 13;
    public static readonly RULE_struct_def = 14;
    public static readonly RULE_struct_field = 15;
    public static readonly RULE_type = 16;
    public static readonly RULE_expr = 17;
    public static readonly RULE_args = 18;

    public static readonly literalNames = [
        null, "'let'", "':'", "'='", "';'", "'if'", "'else'", "'while'", 
        "'{'", "'}'", "'('", "')'", "'->'", "','", "'struct'", "'&'", "'mut'", 
        "'i32'", "'bool'", "'f64'", "'-'", "'!'", "'&mut'", "'*'", "'/'", 
        "'%'", "'+'", "'=='", "'!='", "'<'", "'>'", "'<='", "'>='", "'&&'", 
        "'||'", "'true'", "'false'", "'break'", "'continue'", "'return'", 
        "'fn'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, "TRUE", "FALSE", "BREAK", "CONTINUE", "RETURN", "FN", 
        "WS", "COMMENT", "ID", "INT", "FLOAT"
    ];
    public static readonly ruleNames = [
        "prog", "stmt", "let_decl", "assign_stmt", "expr_stmt", "if_stmt", 
        "while_loop", "break_stmt", "continue_stmt", "return_stmt", "block", 
        "func_def", "params", "param", "struct_def", "struct_field", "type", 
        "expr", "args",
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
            this.state = 41;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 15779234) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 1855) !== 0)) {
                {
                {
                this.state = 38;
                this.stmt();
                }
                }
                this.state = 43;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 44;
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
            this.state = 57;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 46;
                this.let_decl();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 47;
                this.assign_stmt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 48;
                this.expr_stmt();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 49;
                this.break_stmt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 50;
                this.continue_stmt();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 51;
                this.while_loop();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 52;
                this.if_stmt();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 53;
                this.return_stmt();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 54;
                this.block();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 55;
                this.func_def();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 56;
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
            this.state = 59;
            this.match(RustParser.T__0);
            this.state = 60;
            this.match(RustParser.ID);
            this.state = 61;
            this.match(RustParser.T__1);
            this.state = 62;
            this.type_();
            this.state = 63;
            this.match(RustParser.T__2);
            this.state = 64;
            this.expr(0);
            this.state = 66;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 65;
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
        this.enterRule(localContext, 6, RustParser.RULE_assign_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 68;
            this.match(RustParser.ID);
            this.state = 69;
            this.match(RustParser.T__2);
            this.state = 70;
            this.expr(0);
            this.state = 72;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 71;
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
        this.enterRule(localContext, 8, RustParser.RULE_expr_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 74;
            this.expr(0);
            this.state = 76;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 75;
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
        this.enterRule(localContext, 10, RustParser.RULE_if_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 78;
            this.match(RustParser.T__4);
            this.state = 79;
            this.expr(0);
            this.state = 80;
            this.block();
            this.state = 86;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 6) {
                {
                this.state = 81;
                this.match(RustParser.T__5);
                this.state = 84;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case RustParser.T__7:
                    {
                    this.state = 82;
                    this.block();
                    }
                    break;
                case RustParser.T__4:
                    {
                    this.state = 83;
                    this.if_stmt();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
            }

            this.state = 89;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                {
                this.state = 88;
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
        this.enterRule(localContext, 12, RustParser.RULE_while_loop);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 91;
            this.match(RustParser.T__6);
            this.state = 92;
            this.expr(0);
            this.state = 93;
            this.block();
            this.state = 95;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 94;
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
        this.enterRule(localContext, 14, RustParser.RULE_break_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 97;
            this.match(RustParser.BREAK);
            this.state = 99;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 98;
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
        this.enterRule(localContext, 16, RustParser.RULE_continue_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 101;
            this.match(RustParser.CONTINUE);
            this.state = 103;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 102;
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
        this.enterRule(localContext, 18, RustParser.RULE_return_stmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 105;
            this.match(RustParser.RETURN);
            this.state = 107;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 11, this.context) ) {
            case 1:
                {
                this.state = 106;
                this.expr(0);
                }
                break;
            }
            this.state = 110;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 109;
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
        this.enterRule(localContext, 20, RustParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 112;
            this.match(RustParser.T__7);
            this.state = 116;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 15779234) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 1855) !== 0)) {
                {
                {
                this.state = 113;
                this.stmt();
                }
                }
                this.state = 118;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 119;
            this.match(RustParser.T__8);
            this.state = 121;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                {
                this.state = 120;
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
        this.enterRule(localContext, 22, RustParser.RULE_func_def);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 123;
            this.match(RustParser.FN);
            this.state = 124;
            this.match(RustParser.ID);
            this.state = 125;
            this.match(RustParser.T__9);
            this.state = 127;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 43) {
                {
                this.state = 126;
                this.params();
                }
            }

            this.state = 129;
            this.match(RustParser.T__10);
            this.state = 132;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 12) {
                {
                this.state = 130;
                this.match(RustParser.T__11);
                this.state = 131;
                this.type_();
                }
            }

            this.state = 134;
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
        this.enterRule(localContext, 24, RustParser.RULE_params);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 136;
            this.param();
            this.state = 141;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 13) {
                {
                {
                this.state = 137;
                this.match(RustParser.T__12);
                this.state = 138;
                this.param();
                }
                }
                this.state = 143;
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
        this.enterRule(localContext, 26, RustParser.RULE_param);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 144;
            this.match(RustParser.ID);
            this.state = 145;
            this.match(RustParser.T__1);
            this.state = 146;
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
        this.enterRule(localContext, 28, RustParser.RULE_struct_def);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 148;
            this.match(RustParser.T__13);
            this.state = 149;
            this.match(RustParser.ID);
            this.state = 150;
            this.match(RustParser.T__7);
            this.state = 151;
            this.struct_field();
            this.state = 156;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 13) {
                {
                {
                this.state = 152;
                this.match(RustParser.T__12);
                this.state = 153;
                this.struct_field();
                }
                }
                this.state = 158;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 159;
            this.match(RustParser.T__8);
            this.state = 161;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 160;
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
        this.enterRule(localContext, 30, RustParser.RULE_struct_field);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 163;
            this.match(RustParser.ID);
            this.state = 164;
            this.match(RustParser.T__1);
            this.state = 165;
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
        this.enterRule(localContext, 32, RustParser.RULE_type);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 173;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 15) {
                {
                {
                this.state = 167;
                this.match(RustParser.T__14);
                this.state = 169;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 16) {
                    {
                    this.state = 168;
                    this.match(RustParser.T__15);
                    }
                }

                }
                }
                this.state = 175;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 176;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 17)) & ~0x1F) === 0 && ((1 << (_la - 17)) & 67108871) !== 0))) {
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
        let _startState = 34;
        this.enterRecursionRule(localContext, 34, RustParser.RULE_expr, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 202;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context) ) {
            case 1:
                {
                localContext = new ApplicationContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 179;
                this.match(RustParser.ID);
                this.state = 180;
                this.match(RustParser.T__9);
                this.state = 182;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 15762432) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 1795) !== 0)) {
                    {
                    this.state = 181;
                    this.args();
                    }
                }

                this.state = 184;
                this.match(RustParser.T__10);
                }
                break;
            case 2:
                {
                localContext = new StructInitContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 185;
                this.match(RustParser.ID);
                this.state = 186;
                this.match(RustParser.T__7);
                this.state = 188;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 15762432) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 1795) !== 0)) {
                    {
                    this.state = 187;
                    this.args();
                    }
                }

                this.state = 190;
                this.match(RustParser.T__8);
                }
                break;
            case 3:
                {
                localContext = new UnaryOpContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 191;
                (localContext as UnaryOpContext)._op = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 15761408) !== 0))) {
                    (localContext as UnaryOpContext)._op = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 192;
                this.expr(11);
                }
                break;
            case 4:
                {
                localContext = new VariableContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 193;
                this.match(RustParser.ID);
                }
                break;
            case 5:
                {
                localContext = new IntLiteralContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 194;
                this.match(RustParser.INT);
                }
                break;
            case 6:
                {
                localContext = new FloatLiteralContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 195;
                this.match(RustParser.FLOAT);
                }
                break;
            case 7:
                {
                localContext = new BoolLiteralContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 196;
                this.match(RustParser.TRUE);
                }
                break;
            case 8:
                {
                localContext = new BoolLiteralContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 197;
                this.match(RustParser.FALSE);
                }
                break;
            case 9:
                {
                localContext = new ParensContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 198;
                this.match(RustParser.T__9);
                this.state = 199;
                this.expr(0);
                this.state = 200;
                this.match(RustParser.T__10);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 218;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 26, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 216;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context) ) {
                    case 1:
                        {
                        localContext = new BinaryOpContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expr);
                        this.state = 204;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 205;
                        (localContext as BinaryOpContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 58720256) !== 0))) {
                            (localContext as BinaryOpContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 206;
                        this.expr(11);
                        }
                        break;
                    case 2:
                        {
                        localContext = new BinaryOpContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expr);
                        this.state = 207;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 208;
                        (localContext as BinaryOpContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 20 || _la === 26)) {
                            (localContext as BinaryOpContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 209;
                        this.expr(10);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinaryOpContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expr);
                        this.state = 210;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 211;
                        (localContext as BinaryOpContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 27)) & ~0x1F) === 0 && ((1 << (_la - 27)) & 63) !== 0))) {
                            (localContext as BinaryOpContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 212;
                        this.expr(9);
                        }
                        break;
                    case 4:
                        {
                        localContext = new LogicalOpContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, RustParser.RULE_expr);
                        this.state = 213;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 214;
                        (localContext as LogicalOpContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 33 || _la === 34)) {
                            (localContext as LogicalOpContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 215;
                        this.expr(8);
                        }
                        break;
                    }
                    }
                }
                this.state = 220;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 26, this.context);
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
        this.enterRule(localContext, 36, RustParser.RULE_args);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 221;
            this.expr(0);
            this.state = 226;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 13) {
                {
                {
                this.state = 222;
                this.match(RustParser.T__12);
                this.state = 223;
                this.expr(0);
                }
                }
                this.state = 228;
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
        case 17:
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
        4,1,45,230,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,1,0,5,0,40,8,0,
        10,0,12,0,43,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,3,1,58,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,67,8,2,1,3,1,3,1,
        3,1,3,3,3,73,8,3,1,4,1,4,3,4,77,8,4,1,5,1,5,1,5,1,5,1,5,1,5,3,5,
        85,8,5,3,5,87,8,5,1,5,3,5,90,8,5,1,6,1,6,1,6,1,6,3,6,96,8,6,1,7,
        1,7,3,7,100,8,7,1,8,1,8,3,8,104,8,8,1,9,1,9,3,9,108,8,9,1,9,3,9,
        111,8,9,1,10,1,10,5,10,115,8,10,10,10,12,10,118,9,10,1,10,1,10,3,
        10,122,8,10,1,11,1,11,1,11,1,11,3,11,128,8,11,1,11,1,11,1,11,3,11,
        133,8,11,1,11,1,11,1,12,1,12,1,12,5,12,140,8,12,10,12,12,12,143,
        9,12,1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,5,14,155,
        8,14,10,14,12,14,158,9,14,1,14,1,14,3,14,162,8,14,1,15,1,15,1,15,
        1,15,1,16,1,16,3,16,170,8,16,5,16,172,8,16,10,16,12,16,175,9,16,
        1,16,1,16,1,17,1,17,1,17,1,17,3,17,183,8,17,1,17,1,17,1,17,1,17,
        3,17,189,8,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,
        1,17,1,17,3,17,203,8,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,
        1,17,1,17,1,17,1,17,5,17,217,8,17,10,17,12,17,220,9,17,1,18,1,18,
        1,18,5,18,225,8,18,10,18,12,18,228,9,18,1,18,0,1,34,19,0,2,4,6,8,
        10,12,14,16,18,20,22,24,26,28,30,32,34,36,0,6,2,0,17,19,43,43,2,
        0,15,15,20,23,1,0,23,25,2,0,20,20,26,26,1,0,27,32,1,0,33,34,256,
        0,41,1,0,0,0,2,57,1,0,0,0,4,59,1,0,0,0,6,68,1,0,0,0,8,74,1,0,0,0,
        10,78,1,0,0,0,12,91,1,0,0,0,14,97,1,0,0,0,16,101,1,0,0,0,18,105,
        1,0,0,0,20,112,1,0,0,0,22,123,1,0,0,0,24,136,1,0,0,0,26,144,1,0,
        0,0,28,148,1,0,0,0,30,163,1,0,0,0,32,173,1,0,0,0,34,202,1,0,0,0,
        36,221,1,0,0,0,38,40,3,2,1,0,39,38,1,0,0,0,40,43,1,0,0,0,41,39,1,
        0,0,0,41,42,1,0,0,0,42,44,1,0,0,0,43,41,1,0,0,0,44,45,5,0,0,1,45,
        1,1,0,0,0,46,58,3,4,2,0,47,58,3,6,3,0,48,58,3,8,4,0,49,58,3,14,7,
        0,50,58,3,16,8,0,51,58,3,12,6,0,52,58,3,10,5,0,53,58,3,18,9,0,54,
        58,3,20,10,0,55,58,3,22,11,0,56,58,3,28,14,0,57,46,1,0,0,0,57,47,
        1,0,0,0,57,48,1,0,0,0,57,49,1,0,0,0,57,50,1,0,0,0,57,51,1,0,0,0,
        57,52,1,0,0,0,57,53,1,0,0,0,57,54,1,0,0,0,57,55,1,0,0,0,57,56,1,
        0,0,0,58,3,1,0,0,0,59,60,5,1,0,0,60,61,5,43,0,0,61,62,5,2,0,0,62,
        63,3,32,16,0,63,64,5,3,0,0,64,66,3,34,17,0,65,67,5,4,0,0,66,65,1,
        0,0,0,66,67,1,0,0,0,67,5,1,0,0,0,68,69,5,43,0,0,69,70,5,3,0,0,70,
        72,3,34,17,0,71,73,5,4,0,0,72,71,1,0,0,0,72,73,1,0,0,0,73,7,1,0,
        0,0,74,76,3,34,17,0,75,77,5,4,0,0,76,75,1,0,0,0,76,77,1,0,0,0,77,
        9,1,0,0,0,78,79,5,5,0,0,79,80,3,34,17,0,80,86,3,20,10,0,81,84,5,
        6,0,0,82,85,3,20,10,0,83,85,3,10,5,0,84,82,1,0,0,0,84,83,1,0,0,0,
        85,87,1,0,0,0,86,81,1,0,0,0,86,87,1,0,0,0,87,89,1,0,0,0,88,90,5,
        4,0,0,89,88,1,0,0,0,89,90,1,0,0,0,90,11,1,0,0,0,91,92,5,7,0,0,92,
        93,3,34,17,0,93,95,3,20,10,0,94,96,5,4,0,0,95,94,1,0,0,0,95,96,1,
        0,0,0,96,13,1,0,0,0,97,99,5,37,0,0,98,100,5,4,0,0,99,98,1,0,0,0,
        99,100,1,0,0,0,100,15,1,0,0,0,101,103,5,38,0,0,102,104,5,4,0,0,103,
        102,1,0,0,0,103,104,1,0,0,0,104,17,1,0,0,0,105,107,5,39,0,0,106,
        108,3,34,17,0,107,106,1,0,0,0,107,108,1,0,0,0,108,110,1,0,0,0,109,
        111,5,4,0,0,110,109,1,0,0,0,110,111,1,0,0,0,111,19,1,0,0,0,112,116,
        5,8,0,0,113,115,3,2,1,0,114,113,1,0,0,0,115,118,1,0,0,0,116,114,
        1,0,0,0,116,117,1,0,0,0,117,119,1,0,0,0,118,116,1,0,0,0,119,121,
        5,9,0,0,120,122,5,4,0,0,121,120,1,0,0,0,121,122,1,0,0,0,122,21,1,
        0,0,0,123,124,5,40,0,0,124,125,5,43,0,0,125,127,5,10,0,0,126,128,
        3,24,12,0,127,126,1,0,0,0,127,128,1,0,0,0,128,129,1,0,0,0,129,132,
        5,11,0,0,130,131,5,12,0,0,131,133,3,32,16,0,132,130,1,0,0,0,132,
        133,1,0,0,0,133,134,1,0,0,0,134,135,3,20,10,0,135,23,1,0,0,0,136,
        141,3,26,13,0,137,138,5,13,0,0,138,140,3,26,13,0,139,137,1,0,0,0,
        140,143,1,0,0,0,141,139,1,0,0,0,141,142,1,0,0,0,142,25,1,0,0,0,143,
        141,1,0,0,0,144,145,5,43,0,0,145,146,5,2,0,0,146,147,3,32,16,0,147,
        27,1,0,0,0,148,149,5,14,0,0,149,150,5,43,0,0,150,151,5,8,0,0,151,
        156,3,30,15,0,152,153,5,13,0,0,153,155,3,30,15,0,154,152,1,0,0,0,
        155,158,1,0,0,0,156,154,1,0,0,0,156,157,1,0,0,0,157,159,1,0,0,0,
        158,156,1,0,0,0,159,161,5,9,0,0,160,162,5,4,0,0,161,160,1,0,0,0,
        161,162,1,0,0,0,162,29,1,0,0,0,163,164,5,43,0,0,164,165,5,2,0,0,
        165,166,3,32,16,0,166,31,1,0,0,0,167,169,5,15,0,0,168,170,5,16,0,
        0,169,168,1,0,0,0,169,170,1,0,0,0,170,172,1,0,0,0,171,167,1,0,0,
        0,172,175,1,0,0,0,173,171,1,0,0,0,173,174,1,0,0,0,174,176,1,0,0,
        0,175,173,1,0,0,0,176,177,7,0,0,0,177,33,1,0,0,0,178,179,6,17,-1,
        0,179,180,5,43,0,0,180,182,5,10,0,0,181,183,3,36,18,0,182,181,1,
        0,0,0,182,183,1,0,0,0,183,184,1,0,0,0,184,203,5,11,0,0,185,186,5,
        43,0,0,186,188,5,8,0,0,187,189,3,36,18,0,188,187,1,0,0,0,188,189,
        1,0,0,0,189,190,1,0,0,0,190,203,5,9,0,0,191,192,7,1,0,0,192,203,
        3,34,17,11,193,203,5,43,0,0,194,203,5,44,0,0,195,203,5,45,0,0,196,
        203,5,35,0,0,197,203,5,36,0,0,198,199,5,10,0,0,199,200,3,34,17,0,
        200,201,5,11,0,0,201,203,1,0,0,0,202,178,1,0,0,0,202,185,1,0,0,0,
        202,191,1,0,0,0,202,193,1,0,0,0,202,194,1,0,0,0,202,195,1,0,0,0,
        202,196,1,0,0,0,202,197,1,0,0,0,202,198,1,0,0,0,203,218,1,0,0,0,
        204,205,10,10,0,0,205,206,7,2,0,0,206,217,3,34,17,11,207,208,10,
        9,0,0,208,209,7,3,0,0,209,217,3,34,17,10,210,211,10,8,0,0,211,212,
        7,4,0,0,212,217,3,34,17,9,213,214,10,7,0,0,214,215,7,5,0,0,215,217,
        3,34,17,8,216,204,1,0,0,0,216,207,1,0,0,0,216,210,1,0,0,0,216,213,
        1,0,0,0,217,220,1,0,0,0,218,216,1,0,0,0,218,219,1,0,0,0,219,35,1,
        0,0,0,220,218,1,0,0,0,221,226,3,34,17,0,222,223,5,13,0,0,223,225,
        3,34,17,0,224,222,1,0,0,0,225,228,1,0,0,0,226,224,1,0,0,0,226,227,
        1,0,0,0,227,37,1,0,0,0,228,226,1,0,0,0,28,41,57,66,72,76,84,86,89,
        95,99,103,107,110,116,121,127,132,141,156,161,169,173,182,188,202,
        216,218,226
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
