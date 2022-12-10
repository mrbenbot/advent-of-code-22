import { writeFileSync } from "fs";
export function partOne(input) {
  const pathModeler = new RopePathModeler();
  pathModeler.batchMove(processInput(input));
  return pathModeler.tailPositions.size;
}

export function partTwo(input) {
  const pathModeler = new RopePathModeler(10);
  pathModeler.batchMove(processInput(input));
  writeFileSync("./output.json", JSON.stringify(pathModeler.ropes));
  return pathModeler.tailPositions.size;
}

function processInput(input) {
  return input.split(`\n`).map((line) => {
    const [direction, amount] = line.split(" ");
    return [direction, Number(amount)];
  });
}

class RopePathModeler {
  constructor(ropeLength = 2) {
    this.rope = new Array(ropeLength).fill(null).map((_) => ({ x: 0, y: 0 }));
    this.tailPositions = new Set();
    this.ropes = [];
  }

  move(direction, amount) {
    for (let i = 0; i < amount; i++) {
      this.moveRope(direction);
    }
  }

  moveRope(direction) {
    this.ropes.push([...this.rope]);
    this.rope[0] = getNextPosition(this.rope[0], direction);
    for (let i = 1; i < this.rope.length; i++) {
      const prev = this.rope[i - 1];
      const nextTail = getNextTailPosition(prev, this.rope[i]);
      this.rope[i] = nextTail;
    }
    this.tailPositions.add(JSON.stringify(this.rope[this.rope.length - 1]));
  }

  batchMove(instructions) {
    for (const [direction, amount] of instructions) {
      this.move(direction, amount);
    }
  }
}

const transforms = {
  U: ({ x, y }) => ({ x, y: y + 1 }),
  D: ({ x, y }) => ({ x, y: y - 1 }),
  L: ({ x, y }) => ({ x: x - 1, y }),
  R: ({ x, y }) => ({ x: x + 1, y }),
  UR: ({ x, y }) => ({ x: x + 1, y: y + 1 }),
  UL: ({ x, y }) => ({ x: x - 1, y: y + 1 }),
  DR: ({ x, y }) => ({ x: x + 1, y: y - 1 }),
  DL: ({ x, y }) => ({ x: x - 1, y: y - 1 }),
};

function getNextTailPosition(head, tail) {
  if (
    arePointsEqual(head, tail) ||
    Object.values(transforms).some((transform) =>
      arePointsEqual(transform(head), tail)
    )
  ) {
    return tail;
  }

  if (head.x === tail.x) {
    if (head.y > tail.y) {
      return getNextPosition(tail, "U");
    }
    return getNextPosition(tail, "D");
  }

  if (head.y === tail.y) {
    if (head.x > tail.x) {
      return getNextPosition(tail, "R");
    }
    return getNextPosition(tail, "L");
  }

  if (head.x > tail.x) {
    if (head.y > tail.y) {
      return getNextPosition(tail, "UR");
    }
    return getNextPosition(tail, "DR");
  }

  if (head.x < tail.x) {
    if (head.y > tail.y) {
      return getNextPosition(tail, "UL");
    }
    return getNextPosition(tail, "DL");
  }

  throw new Error(
    `no matching tail move for ${JSON.stringify({ head, tail })}`
  );
}

function arePointsEqual(a, b) {
  return a.x === b.x && a.y === b.y;
}

function getNextPosition(item, direction) {
  return transforms[direction](item);
}
