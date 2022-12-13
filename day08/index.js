export function partOne(input) {
  const matrix = processInput(input);
  let totalVisible = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (
        isTreeVisible(matrix[i], j) ||
        isTreeVisible(sliceDown(matrix, 0, j, matrix.length), i)
      ) {
        totalVisible++;
      }
    }
  }
  return totalVisible;
}
export function partTwo(input) {
  const matrix = processInput(input);
  let maxScenicScore = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      maxScenicScore = Math.max(getScenicScore(matrix, i, j), maxScenicScore);
    }
  }
  return maxScenicScore;
}

function getScenicScore(matrix, row, column) {
  const tree = matrix[row][column];

  // to the right
  const right = matrix[row].slice(column + 1);
  const rightScore = score(tree, right);
  // to the left
  const left = matrix[row].slice(0, column).reverse();
  const leftScore = score(tree, left);
  // down
  const down = sliceDown(matrix, row + 1, column, matrix.length);
  const downScore = score(tree, down);
  // up
  const up = sliceDown(matrix, 0, column, row).reverse();
  const upScore = score(tree, up);
  return rightScore * leftScore * downScore * upScore;
}

function score(tree, line) {
  const index = line.findIndex((otherTree) => otherTree >= tree);
  if (index === -1) {
    return line.length;
  }
  return index + 1;
}

function processInput(input) {
  return input.split(`\n`).map((line) => [...line]);
}

function sliceDown(matrix, row, column, length) {
  return matrix.slice(row, length).map((row) => row[column]);
}

function isTreeVisible(line, index) {
  const before = line.slice(0, index);
  const after = line.slice(index + 1);
  return Math.max(...before) < line[index] || Math.max(...after) < line[index];
}
