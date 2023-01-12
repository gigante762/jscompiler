import { Parser } from "../Parser.js";

let parser = new Parser();

const program = parser.parse("10 - x + y");

console.log(program);
//enhance this test

process.exit(0);
