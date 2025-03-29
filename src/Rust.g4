grammar Rust;

// Parser rules
prog: (stmt ';'?)* EOF;

stmt: let_decl
    | expr_stmt
    | if_stmt
    | block
    ;

let_decl: 'let' ID ':' type '=' expr;
expr_stmt: expr;
if_stmt: 'if' expr block ('else' (block | if_stmt))?;
block: '{' stmt* '}';

expr: expr op=('*' | '/' | '%') expr   # BinaryOp
    | expr op=('+' | '-') expr         # BinaryOp
    | expr op=('==' | '!=' | '<' | '>') expr  # Comparison
    | ID                               # Variable
    | INT                              # Literal
    | '(' expr ')'                     # Parens
    ;

type: 'i32' | 'bool';

// Lexer rules
ID: [a-zA-Z_][a-zA-Z0-9_]*;
INT: [0-9]+;
WS: [ \t\r\n]+ -> skip;
COMMENT: '//' ~[\r\n]* -> skip;