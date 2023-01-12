export const NodeType = {
  Program: "Program",
  NumericLiteral: "NumericLiteral",
  Identifier: "Identifier",
  BinaryExpr: "BinaryExpr",
};

NodeType.Program;

export class Stmt {
  constructor(NodeType) {
    this.kind = NodeType;
  }
}

export class Expr extends Stmt {
  constructor(NodeType) {
    super(NodeType);
  }
}

export class Program extends Stmt {
  constructor() {
    super();
    this.kind = NodeType.Program;
    /**
     * @type {Stmt[]}
     */
    this.body = []; // Array of Stmt
  }
}

export class BinaryExpr extends Stmt {
  constructor(operator, left, right) {
    super();
    this.kind = NodeType.BinaryExpr;
    this.left = left; // Stmt
    this.right = right; // Stmt
    this.operator = String(operator); // string;
  }
}

export class Identifier extends Stmt {
  constructor(symbol) {
    super();
    this.kind = NodeType.Identifier;
    this.symbol = String(operator); // string;
  }
}

export class NumericLiteral extends Stmt {
  constructor(value) {
    super();
    this.kind = NodeType.NumericLiteral;
    this.value = Number(value); // number;
  }
}
