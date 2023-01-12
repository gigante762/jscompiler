/* Example */
// let a = 10
// [LetToken, IdentifierToken, EqualsToken, NumberToken]

/* The lexer is a function that f(string): token[] */

const TokenType = {
  Number: "Number",
  Identifier: "Identifier",
  AssignOperator: "AssignOperator",
  OpenParen: "OpenParen",
  CloseParen: "CloseParen",
  BinaryOperator: "BinaryOperator",
  Let: "Let",
};

const KEYWORDS = {
  let: TokenType.Let,
};

class AuxiliarAnalizer {
  static isAlfa(char) {
    const chatCode = char.charCodeAt(0);
    return chatCode >= "A".charCodeAt(0) && chatCode <= "z".charCodeAt(0);
  }
  static isInt(char) {
    const chatCode = char.charCodeAt(0);
    return chatCode >= "0".charCodeAt(0) && chatCode <= "9".charCodeAt(0);
  }
}

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

  currentChar() {
    return this.chars[0] ?? "";
  }

  tokenize(sourceCode) {
    this.chars = sourceCode.split("");

    while (this.chars.length > 0) {
      if (
        this.currentChar() === " " ||
        this.currentChar() === "\n" ||
        this.currentChar() === "\t"
      ) {
        this.chars.shift();
        continue;
      }

      if (this.currentChar() === "(") {
        this.tokens.push(Token.new(this.chars.shift(), TokenType.OpenParen));
        continue;
      }
      if (this.currentChar() === ")") {
        this.tokens.push(Token.new(this.chars.shift(), TokenType.CloseParen));
        continue;
      }
      if (["+", "-", "/", "*"].includes(this.currentChar())) {
        this.tokens.push(
          Token.new(this.chars.shift(), TokenType.BinaryOperator)
        );
        continue;
      }
      if (this.currentChar() === "=") {
        this.tokens.push(
          Token.new(this.chars.shift(), TokenType.AssignOperator)
        );
        continue;
      }
      if (AuxiliarAnalizer.isInt(this.currentChar())) {
        let number = "";
        while (
          this.currentChar().length > 0 &&
          AuxiliarAnalizer.isInt(this.currentChar())
        ) {
          number += this.chars.shift();
        }
        this.tokens.push(Token.new(number, TokenType.Number));
        continue;
      }
      if (AuxiliarAnalizer.isAlfa(this.currentChar())) {
        let word = "";
        while (
          this.currentChar().length > 0 &&
          AuxiliarAnalizer.isAlfa(this.currentChar())
        ) {
          word += this.currentChar();
          this.chars.shift();
        }

        //check for reserved keyword
        if (!!KEYWORDS[word]) {
          this.tokens.push(Token.new(word, KEYWORDS[word]));
        } else {
          this.tokens.push(Token.new(word, TokenType.Identifier));
        }
        continue;
      }

      console.error(`Unrecognized token '${this.currentChar()}'`);
      process.exit(10);
    }

    return this.tokens;
  }
}

module.exports = Lexer;
