/* Example */
// let a = 10
// [LetToken, IdentifierToken, EqualsToken, NumberToken]

/* The lexer is a function that f(string): token[] */

const TokeType = {
  Number: "Number",
  Identifier: "Identifier",
  Equals: "Equals",
  OpenParen: "OpenParen",
  CloseParen: "CloseParen",
  BinaryOperator: "BinaryOperator",
  Let: "Let",
};

class Token {
  constructor(value, tokenType) {
    this.value = value;
    this.tokenType = tokenType;
  }

  static new(value, tokenType) {
    return new Token(value, tokenType);
  }
}

class Lexer {
  constructor() {
    this.tokens = [];
    this.chars = [];
  }

  current() {
    return this.chars[0];
  }

  tokenize(sourceCode) {
    this.chars = sourceCode.split("");

    while (this.chars.length > 0) {
      const char = this.current();

      if (char === "(") {
        this.tokens.push(Token.new(this.chars.shift(), TokeType.OpenParen));
      }
    }

    return this.tokens;
  }
}

export default {};

let lexer = new Lexer();

let tokens = lexer.tokenize("(");

console.log(tokens);
