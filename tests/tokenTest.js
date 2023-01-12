const Lexer = require("../Lexer");

let lexer = new Lexer();

let tokens = lexer.tokenize("let asv = (123 + 456)");

if (tokens.length !== 8) {
  console.error("Quantidade errada.");
  process.exit(1);
}

console.log(tokens);
//enhance this test

process.exit(0);
