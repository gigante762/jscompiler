import {
  BinaryExpr,
  Identifier,
  NodeType,
  NumericLiteral,
  Program,
  Stmt,
  Expr,
} from "./ast.js";

import { Lexer, Token, TokenType } from "./Lexer.js";

export class Parser {
  constructor() {
    /**
     * @type {Token[]}
     */
    this.tokens = [];
  }

  currentToken() {
    return this.tokens[0];
  }

  shiftTokens() {
    return this.tokens.shift();
  }

  isTokenEOF() {
    return this.currentToken().tokenType === TokenType.EOF;
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
  parseStmt() {
    //skip to parseExp
    return this.parseExp();
  }

  /**
   * @returns { Expr }
   */
  parseExp() {
    return this.parsePrimaryExpr();
  }

  /**
   * @returns { Expr }
   */
  parsePrimaryExpr() {
    const token = this.currentToken();

    switch (token.tokenType) {
      case TokenType.Identifier:
        return new Identifier(this.shiftTokens().symbol);
      case TokenType.Number:
        return new NumericLiteral(parseFloat(this.shiftTokens().value));

      default:
        console.error(
          "Unexpected token found during the parsing.",
          this.currentToken()
        );
        return process.exit(20);
    }
  }
}
