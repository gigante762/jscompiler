import { Parser } from "../Parser.js";

let parser = new Parser();

const program = parser.parse("asv 123 456");

console.log(program);
//enhance this test

process.exit(0);
