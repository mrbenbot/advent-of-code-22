export function partOne(input) {
  return processInput(input).reduce(
    (acc, cur) => Math.max(sumArray(cur), acc),
    0
  );
}

export function partTwo(input) {
  return sumArray(
    processInput(input)
      .map(sumArray)
      .sort((a, b) => b - a)
      .slice(0, 3)
  );
}

function processInput(input) {
  return input.split(`\n\n`).map((group) => group.split(`\n`));
}

function sumArray(arr) {
  return arr.reduce((acc, cur) => acc + Number(cur), 0);
}
