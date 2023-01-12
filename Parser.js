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
    /**
     * @type {Token[]}
     */
    this.tokens = [];
  }

  isTokenEOF() {
    return this.tokens[0].tokenType === TokenType.EOF;
  }

  /**
   * Produces the Ast from the source code
   */
  parse(sourceCode) {
    const lexer = new Lexer();
    this.tokens = lexer.tokenize(sourceCode);

    const program = new Program();

    while (!this.isTokenEOF()) {
      //console.log(this.tokens.shift());
      const stmt = this.parseStmt();
      program.body.push(stmt);
    }

    return program;
  }

  /**
   * @returns { Stmt }
   */
  parseStmt() {}
}
