// Generated from src/Rust.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";


export class RustLexer extends antlr.Lexer {
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
    public static readonly ID = 22;
    public static readonly INT = 23;
    public static readonly WS = 24;
    public static readonly COMMENT = 25;

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN"
    ];

    public static readonly literalNames = [
        null, "';'", "'let'", "':'", "'='", "'if'", "'else'", "'{'", "'}'", 
        "'*'", "'/'", "'%'", "'+'", "'-'", "'=='", "'!='", "'<'", "'>'", 
        "'('", "')'", "'i32'", "'bool'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        "ID", "INT", "WS", "COMMENT"
    ];

    public static readonly modeNames = [
        "DEFAULT_MODE",
    ];

    public static readonly ruleNames = [
        "T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", 
        "T__8", "T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", 
        "T__16", "T__17", "T__18", "T__19", "T__20", "ID", "INT", "WS", 
        "COMMENT",
    ];


    public constructor(input: antlr.CharStream) {
        super(input);
        this.interpreter = new antlr.LexerATNSimulator(this, RustLexer._ATN, RustLexer.decisionsToDFA, new antlr.PredictionContextCache());
    }

    public get grammarFileName(): string { return "Rust.g4"; }

    public get literalNames(): (string | null)[] { return RustLexer.literalNames; }
    public get symbolicNames(): (string | null)[] { return RustLexer.symbolicNames; }
    public get ruleNames(): string[] { return RustLexer.ruleNames; }

    public get serializedATN(): number[] { return RustLexer._serializedATN; }

    public get channelNames(): string[] { return RustLexer.channelNames; }

    public get modeNames(): string[] { return RustLexer.modeNames; }

    public static readonly _serializedATN: number[] = [
        4,0,25,136,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,
        2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,
        13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,
        19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,1,0,1,0,1,1,
        1,1,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,6,
        1,6,1,7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,1,11,1,11,1,12,1,12,1,13,1,
        13,1,13,1,14,1,14,1,14,1,15,1,15,1,16,1,16,1,17,1,17,1,18,1,18,1,
        19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,20,1,21,1,21,5,21,109,8,
        21,10,21,12,21,112,9,21,1,22,4,22,115,8,22,11,22,12,22,116,1,23,
        4,23,120,8,23,11,23,12,23,121,1,23,1,23,1,24,1,24,1,24,1,24,5,24,
        130,8,24,10,24,12,24,133,9,24,1,24,1,24,0,0,25,1,1,3,2,5,3,7,4,9,
        5,11,6,13,7,15,8,17,9,19,10,21,11,23,12,25,13,27,14,29,15,31,16,
        33,17,35,18,37,19,39,20,41,21,43,22,45,23,47,24,49,25,1,0,5,3,0,
        65,90,95,95,97,122,4,0,48,57,65,90,95,95,97,122,1,0,48,57,3,0,9,
        10,13,13,32,32,2,0,10,10,13,13,139,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,
        0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,
        0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,
        0,0,0,27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,0,35,1,0,
        0,0,0,37,1,0,0,0,0,39,1,0,0,0,0,41,1,0,0,0,0,43,1,0,0,0,0,45,1,0,
        0,0,0,47,1,0,0,0,0,49,1,0,0,0,1,51,1,0,0,0,3,53,1,0,0,0,5,57,1,0,
        0,0,7,59,1,0,0,0,9,61,1,0,0,0,11,64,1,0,0,0,13,69,1,0,0,0,15,71,
        1,0,0,0,17,73,1,0,0,0,19,75,1,0,0,0,21,77,1,0,0,0,23,79,1,0,0,0,
        25,81,1,0,0,0,27,83,1,0,0,0,29,86,1,0,0,0,31,89,1,0,0,0,33,91,1,
        0,0,0,35,93,1,0,0,0,37,95,1,0,0,0,39,97,1,0,0,0,41,101,1,0,0,0,43,
        106,1,0,0,0,45,114,1,0,0,0,47,119,1,0,0,0,49,125,1,0,0,0,51,52,5,
        59,0,0,52,2,1,0,0,0,53,54,5,108,0,0,54,55,5,101,0,0,55,56,5,116,
        0,0,56,4,1,0,0,0,57,58,5,58,0,0,58,6,1,0,0,0,59,60,5,61,0,0,60,8,
        1,0,0,0,61,62,5,105,0,0,62,63,5,102,0,0,63,10,1,0,0,0,64,65,5,101,
        0,0,65,66,5,108,0,0,66,67,5,115,0,0,67,68,5,101,0,0,68,12,1,0,0,
        0,69,70,5,123,0,0,70,14,1,0,0,0,71,72,5,125,0,0,72,16,1,0,0,0,73,
        74,5,42,0,0,74,18,1,0,0,0,75,76,5,47,0,0,76,20,1,0,0,0,77,78,5,37,
        0,0,78,22,1,0,0,0,79,80,5,43,0,0,80,24,1,0,0,0,81,82,5,45,0,0,82,
        26,1,0,0,0,83,84,5,61,0,0,84,85,5,61,0,0,85,28,1,0,0,0,86,87,5,33,
        0,0,87,88,5,61,0,0,88,30,1,0,0,0,89,90,5,60,0,0,90,32,1,0,0,0,91,
        92,5,62,0,0,92,34,1,0,0,0,93,94,5,40,0,0,94,36,1,0,0,0,95,96,5,41,
        0,0,96,38,1,0,0,0,97,98,5,105,0,0,98,99,5,51,0,0,99,100,5,50,0,0,
        100,40,1,0,0,0,101,102,5,98,0,0,102,103,5,111,0,0,103,104,5,111,
        0,0,104,105,5,108,0,0,105,42,1,0,0,0,106,110,7,0,0,0,107,109,7,1,
        0,0,108,107,1,0,0,0,109,112,1,0,0,0,110,108,1,0,0,0,110,111,1,0,
        0,0,111,44,1,0,0,0,112,110,1,0,0,0,113,115,7,2,0,0,114,113,1,0,0,
        0,115,116,1,0,0,0,116,114,1,0,0,0,116,117,1,0,0,0,117,46,1,0,0,0,
        118,120,7,3,0,0,119,118,1,0,0,0,120,121,1,0,0,0,121,119,1,0,0,0,
        121,122,1,0,0,0,122,123,1,0,0,0,123,124,6,23,0,0,124,48,1,0,0,0,
        125,126,5,47,0,0,126,127,5,47,0,0,127,131,1,0,0,0,128,130,8,4,0,
        0,129,128,1,0,0,0,130,133,1,0,0,0,131,129,1,0,0,0,131,132,1,0,0,
        0,132,134,1,0,0,0,133,131,1,0,0,0,134,135,6,24,0,0,135,50,1,0,0,
        0,5,0,110,116,121,131,1,6,0,0
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!RustLexer.__ATN) {
            RustLexer.__ATN = new antlr.ATNDeserializer().deserialize(RustLexer._serializedATN);
        }

        return RustLexer.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(RustLexer.literalNames, RustLexer.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return RustLexer.vocabulary;
    }

    private static readonly decisionsToDFA = RustLexer._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}