const STARTING_CYCLE = 20;
const CYCLE_PERIOD = 40;

export function partOne(input) {
  let x = 1;
  let cycleNumber = 0;
  let total = 0;
  for (const { operation, arg } of processInput(input)) {
    if (operation === "noop") {
      cycleNumber++;
      if ((cycleNumber - STARTING_CYCLE) % CYCLE_PERIOD === 0) {
        total += cycleNumber * x;
      }
    }
    if (operation === "addx") {
      cycleNumber++;
      if ((cycleNumber - STARTING_CYCLE) % CYCLE_PERIOD === 0) {
        total += cycleNumber * x;
      }
      cycleNumber++;

      if ((cycleNumber - STARTING_CYCLE) % CYCLE_PERIOD === 0) {
        total += cycleNumber * x;
      }
      x += Number(arg);
    }
  }
  return total;
}

export function partTwo(input) {
  let x = 1;
  const screen = new Screen(240);
  for (const { operation, arg } of processInput(input)) {
    if (operation === "noop") {
      // cycle 1
      screen.draw(x);
      screen.increment();
    }
    if (operation === "addx") {
      // cycle 1
      screen.draw(x);
      screen.increment();
      // cycle 2
      screen.draw(x);
      screen.increment();
      x += Number(arg);
    }
  }
  return screen.toString();
}

class Screen {
  constructor(length) {
    this.pixels = new Array(length).fill(null).map((_) => ".");
    this.currentPixel = 0;
  }
  increment() {
    this.currentPixel++;
  }
  draw(pixel) {
    if (
      this.currentPixel % 40 >= pixel - 1 &&
      this.currentPixel % 40 <= pixel + 1
    ) {
      this.pixels[this.currentPixel] = "#";
    }
  }
  toString() {
    const matrix = chunkArray(this.pixels, 40);
    return matrix.map((line) => line.join("")).join(`\n`);
  }
}

function processInput(input) {
  return input.split(`\n`).map((line) => {
    const [operation, arg] = line.split(" ");
    return { operation, arg };
  });
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
}
