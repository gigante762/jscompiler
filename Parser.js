import {
  BinaryExpr,
  Identifier,
  NodeType,
  NumericLiteral,
  Program,
  Stmt,
} from "./ast.js";

import { Lexer, Token, TokenType } from "./Lexer.js";

export class Parser {
  constructor() {
    this.tokens = [];
  }

  /**
   * Produces the Ast from the source code
   */
  parse(sourceCode) {
    const lexer = new Lexer();
    this.tokens = lexer.tokenize(sourceCode);

    const program = new Program();

    return program;
  }
}
