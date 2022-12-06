export function partOne(input) {
  return processInput(input).reduce(
    (acc, [a, b]) => acc + getPriorityTotalForSack(a, b),
    0
  );
}

export function partTwo(input) {
  return chunkArray(input.split(`\n`), 3).reduce(
    (acc, [a, b, c]) => acc + getPriorityTotalForGroups(a, b, c),
    0
  );
}

function processInput(input) {
  return input
    .split(`\n`)
    .map((sack) => [
      sack.slice(0, sack.length / 2),
      sack.slice(sack.length / 2),
    ]);
}

const priorities = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
}

function getPriorityTotalForSack(compartmentA, compartmentB) {
  let total = 0;
  const foundItems = [];
  for (const item of compartmentA) {
    if (compartmentB.includes(item) && !foundItems.includes(item)) {
      total += priorities.indexOf(item);
      foundItems.push(item);
    }
  }
  return total;
}

function getPriorityTotalForGroups(bagA, bagB, bagC) {
  let total = 0;
  const foundItems = [];
  for (const item of bagA) {
    if (
      bagB.includes(item) &&
      bagC.includes(item) &&
      !foundItems.includes(item)
    ) {
      total += priorities.indexOf(item);
      foundItems.push(item);
    }
  }
  return total;
}
