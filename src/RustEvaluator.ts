import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import { CharStream, CommonTokenStream } from "antlr4ng";
import { RustLexer } from "./parser/src/RustLexer";
import { RustParser } from "./parser/src/RustParser";
import { ASTToJsonVisitor } from "./ASTToJsonVisitor";
import { RustCompiler } from "./RustCompiler";

export class RustEvaluator extends BasicEvaluator {
  private executionCount: number;
  private astToJsonVisitor: ASTToJsonVisitor;

  constructor(conductor: IRunnerPlugin) {
    super(conductor);
    this.executionCount = 0;
    this.astToJsonVisitor = new ASTToJsonVisitor();
  }

  async evaluateChunk(chunk: string): Promise<void> {
    this.executionCount++;
    try {
      // Create the lexer and parser
      const inputStream = CharStream.fromString(chunk);
      const lexer = new RustLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new RustParser(tokenStream);
      const compiler = new RustCompiler();

      // Parse the input
      const tree = parser.prog();

      // Evaluate the parsed tree
      const json = this.astToJsonVisitor.visit(tree);
      console.log("json: ");
      console.log(json);
      const complied = compiler.compile_program(json);
      console.log("compiled: ");
      console.log(complied);
      const result = 0; // vm not implemented yet returning default
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
