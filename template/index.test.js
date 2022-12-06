import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { partOne, partTwo } from ".";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const sampleInput = readFileSync(resolve(__dirname, "./sample.txt"), "utf-8");
const actualInput = readFileSync(resolve(__dirname, "./actual.txt"), "utf-8");

describe.only("part one", () => {
  test.only("sampleInput", () => {
    expect(partOne(sampleInput)).toBe();
  });
  test("actualInput", () => {
    expect(partOne(actualInput)).toBe();
  });
});

describe("part two", () => {
  test("sampleInput", () => {
    expect(partTwo(sampleInput)).toBe();
  });
  test("actualInput", () => {
    expect(partTwo(actualInput)).toBe();
  });
});
