import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { partOne, partTwo } from ".";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const sampleInput = readFileSync(resolve(__dirname, "./sample.txt"), "utf-8");
const actualInput = readFileSync(resolve(__dirname, "./actual.txt"), "utf-8");

describe("part one", () => {
  test("sampleInput", () => {
    expect(partOne(sampleInput)).toBe(95437);
  });
  test("actualInput", () => {
    expect(partOne(actualInput)).toBe(1444896);
  });
});

describe("part two", () => {
  test("sampleInput", () => {
    expect(partTwo(sampleInput)).toBe(24933642);
  });
  test("actualInput", () => {
    expect(partTwo(actualInput)).toBe(404395);
  });
});
