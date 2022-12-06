export function partOne(input) {
  return processInput(input).reduce((total, [a, b]) => {
    if (containsRange(a, b) || containsRange(b, a)) {
      return total + 1;
    }
    return total;
  }, 0);
}

export function partTwo(input) {
  return processInput(input).reduce((total, [a, b]) => {
    if (overlap(a, b)) {
      return total + 1;
    }
    return total;
  }, 0);
}

function processInput(input) {
  return input
    .split(`\n`)
    .map((line) => line.split(`,`).map((part) => part.split("-").map(Number)));
}

function containsRange([a, b], [c, d]) {
  return c >= a && d <= b;
}

function overlap([a, b], [c, d]) {
  return Math.max(a, b) >= Math.min(c, d) && Math.min(a, b) <= Math.max(c, d);
}
