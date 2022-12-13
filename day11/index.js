export function partOne(input) {
  const monkeys = processMonkeys(processInput(input), 20, (num) =>
    Math.floor(num / 3)
  );
  const [first, second] = monkeys
    .map((m) => m.inspections)
    .sort((a, b) => b - a);
  return first * second;
}

export function partTwo(input) {
  const preMonkeys = processInput(input);
  const modulo = preMonkeys.reduce((acc, cur) => acc * cur.divisor, 1);
  const monkeys = processMonkeys(preMonkeys, 10000, (num) => num % modulo);
  const [first, second] = monkeys
    .map((m) => m.inspections)
    .sort((a, b) => b - a);
  return first * second;
}

export function processMonkeys(monkeys, n, easingFunction) {
  for (let i = 0; i < n; i++) {
    for (const monkey of monkeys) {
      const results = monkey.processItems(easingFunction);
      for (const { item, nextMonkey } of results) {
        monkeys[nextMonkey].addItem(item);
      }
    }
  }
  return monkeys;
}

function processInput(input) {
  return input.split(`\n\n`).map(monkeyFactory);
}

function monkeyFactory(monkeyText) {
  const [_, itemText, operationText, ...testTextLines] = monkeyText.split(`\n`);
  const items = parseItems(itemText);
  const operation = parseOperationText(operationText);
  const { test, divisor } = parseTestTextLines(testTextLines);
  return new Monkey({
    items,
    operation,
    test,
    divisor,
  });
}

class Monkey {
  constructor({ items, operation, test, divisor }) {
    this.items = items;
    this.operation = operation;
    this.test = test;
    this.inspections = 0;
    this.divisor = divisor;
  }

  addItem(item) {
    this.items.push(item);
  }

  processItems(easingFunction) {
    const { items, test, operation } = this;
    this.inspections += items.length;
    this.items = [];

    return items.map((item) => {
      const operationResult = operation(item);
      const easedValue = easingFunction(operationResult);
      const nextMonkey = test(easedValue);
      return { item: easedValue, nextMonkey };
    });
  }
}

function parseItems(itemText) {
  return itemText.replace("  Starting items: ", "").split(",").map(Number);
}

function parseOperationText(operationText) {
  const [operator, operandText] = operationText
    .replace("  Operation: new = old ", "")
    .split(" ");

  return (old) => {
    const operand = operandText === "old" ? Number(old) : Number(operandText);
    return operations[operator](old, operand);
  };
}

function parseTestTextLines([testText, trueText, falseText]) {
  const divisor = Number(testText.replace("  Test: divisible by ", ""));
  const trueResult = trueText
    .replace("    If true: throw to monkey ", "")
    .trim();
  const falseResult = falseText
    .replace("    If false: throw to monkey ", "")
    .trim();

  return {
    test: (number) => (number % divisor === 0 ? trueResult : falseResult),
    divisor,
  };
}

const operations = {
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "%": (a, b) => a % b,
};
