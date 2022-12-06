export function partOne(input) {
  return sumArray(
    processInput(input).map(([a, b]) => results[a][b] + moveScore[b])
  );
}

export function partTwo(input) {
  return sumArray(
    processInput(input).map(
      ([a, b]) => results[a][moves[a][b]] + moveScore[moves[a][b]]
    )
  );
}

function processInput(input) {
  return input.split(`\n`).map((r) => r.split(" "));
}

function sumArray(arr) {
  return arr.reduce((acc, cur) => acc + Number(cur), 0);
}

const results = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

const moveScore = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

const moves = {
  A: { X: "Z", Y: "X", Z: "Y" },
  B: { X: "X", Y: "Y", Z: "Z" },
  C: { X: "Y", Y: "Z", Z: "X" },
};
