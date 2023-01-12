const NodeType = {
  Program: "Program",
  NumericLiteral: "NumericLiteral",
  Identifier: "Identifier",
  BinaryExpr: "BinaryExpr",
};

class Stmt {
  constructor(NodeType) {
    this.kind = NodeType;
  }
}

class Program extends Stmt {
  constructor(NodeType) {
    super(NodeType);
    this.body = []; // Array of Stmt
  }
}

class BinaryExpr extends Stmt {
  constructor(NodeType, operator, left, right) {
    super(NodeType);
    this.left = left; // Stmt
    this.right = right; // Stmt
    this.operator = String(operator); // string;
  }
}

class Identifier extends Stmt {
  constructor(NodeType, symbol) {
    super(NodeType);
    this.symbol = String(operator); // string;
  }
}

class NumericLiteral extends Stmt {
  constructor(NodeType, value) {
    super(NodeType);
    this.value = Number(value); // number;
  }
}
