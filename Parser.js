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
    return this.parseAdditiveExpression();
  }

  /**
   * @returns { Expr }
   */
  parseAdditiveExpression() {
    // 10 + 5 - 5 -> (10 + 5) - 5
    let left = this.parseMultiplicativeExpression();

    while (["+", "-"].includes(this.currentToken().value)) {
      const operator = this.shiftTokens().value;
      const right = this.parseMultiplicativeExpression();
      left = new BinaryExpr(operator, left, right);
    }

    return left;
  }

  /**
   * @returns { Expr }
   */
  parseMultiplicativeExpression() {
    // 10 + 5 - 5 -> (10 + 5) - 5
    let left = this.parsePrimaryExpr();

    while (["*", "/", "%"].includes(this.currentToken().value)) {
      const operator = this.shiftTokens().value;
      const right = this.parsePrimaryExpr();
      left = new BinaryExpr(operator, left, right);
    }

    return left;
  }

  /**
   * @returns { Expr }
   */
  parsePrimaryExpr() {
    const token = this.currentToken();

    switch (token.tokenType) {
      case TokenType.Identifier:
        return new Identifier(this.shiftTokens().value);
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
