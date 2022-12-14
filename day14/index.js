export function partOne(input) {
  const paths = processInput(input);
  const space = getSpace(paths);
  const width = space.maxX - space.minX + 1;
  const height = space.maxY + 1;
  const offsetX = space.minX;
  const matrix = createMatrix(width, height);

  paths.forEach((path) => drawPath(matrix, path, offsetX));

  const start = { x: 500 - offsetX, y: 0 };
  const answer = getNumStepsTilInfinite(matrix, start);
  return answer;
}

export function partTwo(input) {
  const paths = processInput(input);
  const space = getSpace(paths);
  const height = space.maxY + 3;
  const width = height * 2;

  const offsetX = 500 - height;
  const matrix = createMatrix(width, height);

  paths.forEach((path) => drawPath(matrix, path, offsetX));

  drawPath(
    matrix,
    [
      { x: 0, y: matrix.length - 1 },
      { x: matrix[0].length - 1, y: matrix.length - 1 },
    ],
    0
  );

  const start = { x: 500 - offsetX, y: 0 };
  const answer = getNumStepsTilInfinite(matrix, start);
  return answer;
}

function getNumStepsTilInfinite(matrix, start) {
  let i = 0;
  while (true) {
    const restPoint = findRestPoint(start, matrix);
    if (restPoint === null) {
      return i;
    }
    if (isPointEqual(start, restPoint)) {
      return i + 1;
    }
    i++;
    matrix[restPoint.y][restPoint.x] = "o";
  }
}

function findRestPoint(startingPoint, matrix) {
  let { x, y } = startingPoint;
  while (true) {
    const next = getNextPoint({ x, y }, matrix);
    if (next === null) {
      return null;
    }
    if (isPointEqual(next, { x, y })) {
      return next;
    }
    ({ x, y } = next);
  }
}

function getNextPoint(point, matrix) {
  const options = movementOptions.map((transform) => transform(point));

  for (const option of options) {
    if (!isPointInMatrix(option, matrix)) {
      return null;
    }
    if (matrix[option.y][option.x] === ".") {
      return option;
    }
  }
  return point;
}

function isPointInMatrix({ x, y }, matrix) {
  return y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length;
}
function isPointEqual(a, b) {
  return a.x === b.x && a.y === b.y;
}

const movements = {
  down: ({ x, y }) => ({ x, y: y + 1 }),
  downLeft: ({ x, y }) => ({ x: x - 1, y: y + 1 }),
  downRight: ({ x, y }) => ({ x: x + 1, y: y + 1 }),
};

const movementOptions = Object.values(movements);

function format(matrix) {
  return matrix.map((line) => line.join("")).join(`\n`);
}

function drawPath(matrix, path, offsetX) {
  for (let i = 1; i < path.length; i++) {
    const previous = path[i - 1];
    const current = path[i];
    if (previous.x === current.x) {
      vertical(matrix, previous, current, () => "#", offsetX);
    } else {
      horizontal(matrix, previous, current, () => "#", offsetX);
    }
  }
}

function horizontal(matrix, from, to, callback, offsetX) {
  const { x: x1, y } = from;
  const { x: x2 } = to;
  const fromX = Math.min(x1, x2);
  const toX = Math.max(x1, x2);
  for (let i = fromX; i <= toX; i++) {
    const current = matrix[y][i - offsetX];
    matrix[y][i - offsetX] = callback(current);
  }
}

function vertical(matrix, from, to, callback, offsetX) {
  const { x, y: y1 } = from;
  const { y: y2 } = to;
  const fromY = Math.min(y1, y2);
  const toY = Math.max(y1, y2);

  for (let i = fromY; i <= toY; i++) {
    const current = matrix[i][x - offsetX];
    matrix[i][x - offsetX] = callback(current);
  }
}

function createMatrix(width, height, defaultValueCallback = () => ".") {
  return Array(height)
    .fill(null)
    .map((_) =>
      Array(width)
        .fill(null)
        .map(() => defaultValueCallback())
    );
}

function getSpace(paths) {
  const flatArray = paths.flat(1);
  const results = {};
  results["minY"] = 0;
  for (const { x, y } of flatArray) {
    results["minX"] = Math.min(x, results.minX ?? Number.MAX_VALUE);
    results["maxX"] = Math.max(x, results.maxX ?? Number.MIN_VALUE);
    results["maxY"] = Math.max(y, results.maxY ?? Number.MIN_VALUE);
  }

  return { ...results };
}

function processInput(input) {
  return input.split(`\n`).map((line) => {
    return line.split(` -> `).map((item) => {
      const [x, y] = item.split(`,`).map(Number);
      return { x, y };
    });
  });
}
