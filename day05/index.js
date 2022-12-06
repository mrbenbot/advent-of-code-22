export function partOne(input) {
  const [stacks, moves] = processInput(input);
  for (const moveLine of moves) {
    const [, amount, , from, , to] = moveLine.split(" ");
    moveReverse(stacks, amount, from, to);
  }
  return readTop(stacks);
}

export function partTwo(input) {
  const [stacks, moves] = processInput(input);
  for (const moveLine of moves) {
    const [, amount, , from, , to] = moveLine.split(" ");
    move(stacks, amount, from, to);
  }
  return readTop(stacks);
}

function processInput(input) {
  const [stackInput, instructionsInput] = input.split(`\n\n`);
  const stacks = stackInputToObject(stackInput);
  return [stacks, instructionsInput.split(`\n`)];
}

function stackInputToObject(input) {
  return input.split(`\n`).reduceRight((acc, line, i, arr) => {
    if (i === arr.length - 1) {
      return chunkArray([...line], 4).reduce((acc2, _, i) => {
        return { ...acc2, [i + 1]: [] };
      }, {});
    }

    return chunkArray([...line], 4).reduce((acc2, itemChars, i) => {
      const item = itemChars.join("").replace(/[^\w]/gi, "");
      if (item) {
        return { ...acc2, [i + 1]: [...acc2[i + 1], item] };
      }
      return acc2;
    }, acc);
  }, {});
}

function readTop(stacks) {
  return Object.values(stacks)
    .map((arr) => arr[arr.length - 1])
    .join("");
}

function moveReverse(stacks, amount, from, to) {
  const crates = stacks[from].splice(stacks[from].length - amount);
  stacks[to].push(...crates.reverse());
}

function move(stacks, amount, from, to) {
  const crates = stacks[from].splice(stacks[from].length - amount);
  stacks[to].push(...crates);
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
}
