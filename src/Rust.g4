grammar Rust;

// Parser rules
prog: stmt* EOF;

stmt: let_decl 
    | assign_stmt
    | expr_stmt
    | break_stmt   
    | continue_stmt  
    | while_loop
    | if_stmt
    | return_stmt
    | block
    | func_def;   

let_decl: 'let' ID ':' type '=' expr ';'?;
assign_stmt: ID '=' expr ';'?;
expr_stmt: expr ';'?;
if_stmt: 'if' expr block ('else' (block | if_stmt))?  ';'?;
while_loop: 'while' expr block ';'?;
break_stmt: 'break' ';'?;      
continue_stmt: 'continue' ';'?; 
return_stmt: 'return' expr? ';'?;
block: '{' stmt* '}' ';'?;

func_def: 'fn' ID '(' params? ')' ('->' type)? block;
params: param (',' param)*;
param: ID ':' type;

expr: 
    op=('-' | '!') expr                                     # UnaryOp
    | expr op=('*' | '/' | '%') expr                        # BinaryOp
    | expr op=('+' | '-') expr                              # BinaryOp
    | expr op=('==' | '!=' | '<' | '>' | '<=' | '>=') expr  # BinaryOp
    | expr op=('&&' | '||') expr                            # LogicalOp
    | ID                                                    # Variable
    | ID '(' args? ')'                                      # FunctionCall
    | INT                                                   # IntLiteral
    | FLOAT                                                 # FloatLiteral
    | TRUE                                                  # BoolLiteral
    | FALSE                                                 # BoolLiteral
    | '(' expr ')'                                          # Parens
    ;

args: expr (',' expr)*;

type: 'i32' | 'bool' | 'f64';

// Lexer rules
TRUE: 'true';
FALSE: 'false';
BREAK: 'break';
CONTINUE: 'continue';
RETURN: 'return';
FN: 'fn';
WS: [\t\r\n ]+ -> skip;
COMMENT: '//' ~[\r\n]* -> skip;
ID: [a-zA-Z_][a-zA-Z0-9_]*;
INT: [0-9]+;
FLOAT: [0-9]+ '.' [0-9]+ ([eE][+-]?[0-9]+)?;