import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { partOne, partTwo } from ".";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const sampleInput = readFileSync(resolve(__dirname, "./sample.txt"), "utf-8");
const actualInput = readFileSync(resolve(__dirname, "./actual.txt"), "utf-8");

describe("part one", () => {
  test("sampleInput", () => {
    expect(partOne(sampleInput)).toBe(13140);
  });
  test("actualInput", () => {
    expect(partOne(actualInput)).toBe(14320);
  });
});

describe("part two", () => {
  test("sampleInput", () => {
    expect(partTwo(sampleInput)).toBe(
      `##..##..##..##..##..##..##..##..##..##..\n###...###...###...###...###...###...###.\n####....####....####....####....####....\n#####.....#####.....#####.....#####.....\n######......######......######......####\n#######.......#######.......#######.....`
    );
  });
  test("actualInput", () => {
    expect(partTwo(actualInput)).toBe(
      `###...##..###..###..#..#..##..###....##.\n#..#.#..#.#..#.#..#.#.#..#..#.#..#....#.\n#..#.#....#..#.###..##...#..#.#..#....#.\n###..#....###..#..#.#.#..####.###.....#.\n#....#..#.#....#..#.#.#..#..#.#....#..#.\n#.....##..#....###..#..#.#..#.#.....##..`
    );
  });
});
