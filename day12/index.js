export function partOne(input) {
  const matrix = processInput(input);
  const start = getCoordinates(matrix, "S");
  const end = getCoordinates(matrix, "E");
  return distanceFrom(matrix, start, end);
}

export function partTwo(input) {
  const matrix = processInput(input);
  const starts = matrix.reduce((acc, line, y) => {
    return line.reduce((acc2, item, x) => {
      if (["a", "S"].includes(item.elevation)) {
        acc2.push({ x, y });
      }
      return acc2;
    }, acc);
  }, []);
  const end = getCoordinates(matrix, "E");

  return starts
    .map((start) => {
      const matrix = processInput(input);
      return distanceFrom(matrix, start, end);
    })
    .sort((a, b) => a - b)[0];
}

export function distanceFrom(matrix, start, end) {
  matrix[start.y][start.x].elevation = "a";
  matrix[start.y][start.x].numSteps = 0;
  matrix[start.y][start.x].distanceToGoal = distanceToGoal(start, end);
  matrix[end.y][end.x].elevation = "z";

  console.log({ start, end });

  const pointsQueue = [start];

  while (pointsQueue.length > 0) {
    const { x, y } = pointsQueue.shift();
    const currentNode = matrix[y][x];

    const nextPoints = transforms.reduce((acc, transform) => {
      const next = transform({ x, y });
      if (
        isPointInMatrix(next, matrix) &&
        isPointValid({ x, y }, next, matrix)
      ) {
        acc.push(next);
      }
      return acc;
    }, []);

    for (const point of nextPoints) {
      if (isPointEqual(end, point)) {
        return currentNode.numSteps + 1;
      }

      const nextNode = matrix[point.y][point.x];
      const distance = distanceToGoal(point, end);
      const numSteps = currentNode.numSteps + 1;
      const rank = numSteps + distance;
      if (rank < nextNode.rank) {
        nextNode.numSteps = numSteps;
        nextNode.distanceToGoal = distance;
        nextNode.rank = rank;
        const index = pointsQueue.findIndex(
          (point) => nextNode.rank < matrix[point.y][point.x].rank
        );
        pointsQueue.splice(index, 0, point);
      }
    }
  }
}

const letters = "abcdefghijklmnopqrstuvwxyz";

function isPointValid(previous, next, matrix) {
  const previousValue = matrix[previous.y][previous.x].elevation;
  const nextValue = matrix[next.y][next.x].elevation;
  return letters.indexOf(nextValue) <= letters.indexOf(previousValue) + 1;
}
function isPointEqual(a, b) {
  return a.x === b.x && a.y === b.y;
}

function isPointInMatrix({ x, y }, matrix) {
  return y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length;
}

function distanceToGoal(current, goal) {
  return Math.abs(current.x - goal.x) + Math.abs(current.y - goal.y);
}

function getCoordinates(matrix, item) {
  const y = matrix.findIndex((line) =>
    line.find((node) => node.elevation === item)
  );
  const x = matrix[y].findIndex((node) => node.elevation === item);
  return { x, y };
}

function processInput(input) {
  return input.split(`\n`).map((line) =>
    [...line].map((elevation) => ({
      elevation,
      numSteps: Infinity,
      distanceToGoal: Infinity,
      isOpen: false,
      parent: null,
      rank: Infinity,
    }))
  );
}

const transformObject = {
  up: ({ x, y }) => ({ x, y: y + 1 }),
  down: ({ x, y }) => ({ x, y: y - 1 }),
  left: ({ x, y }) => ({ x: x - 1, y }),
  right: ({ x, y }) => ({ x: x + 1, y }),
};

const transforms = Object.values(transformObject);
