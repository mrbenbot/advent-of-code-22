export function partOne(input) {
  return processInput(input).reduce((total, [left, right], i) => {
    if (isCorrectOrder(left, right)) {
      return total + i + 1;
    }
    return total;
  }, 0);
}

export function partTwo(input) {
  const dividers = [[[2]], [[6]]];
  const orderedPackets = [...processInput(input).flat(1), ...dividers].sort(
    (left, right) => (isCorrectOrder(left, right) ? -1 : 1)
  );
  return dividers.reduce((total, divider) => {
    const dividerIndex = orderedPackets.findIndex(
      (line) => JSON.stringify(line) === JSON.stringify(divider)
    );
    return total * (dividerIndex + 1);
  }, 1);
}

function isCorrectOrder(left, right) {
  for (
    let i = 0, longest = Math.max(left.length, right.length);
    i < longest;
    i++
  ) {
    if (typeof left[i] === "undefined" && typeof right[i] !== "undefined") {
      return true;
    }
    if (typeof left[i] !== "undefined" && typeof right[i] === "undefined") {
      return false;
    }

    if (typeof left[i] === "number" && typeof right[i] === "number") {
      if (left[i] < right[i]) {
        return true;
      }
      if (left[i] > right[i]) {
        return false;
      }
      continue;
    }

    const [leftArray, rightArray] = [left[i], right[i]].map(arrayify);
    const result = isCorrectOrder(leftArray, rightArray);
    if (result === undefined) {
      continue;
    }
    return result;
  }
}

function arrayify(numOrArray) {
  return Array.isArray(numOrArray) ? numOrArray : [numOrArray];
}

function processInput(input) {
  return input
    .split(`\n\n`)
    .map((packet) => packet.split(`\n`).map((line) => JSON.parse(line)));
}
