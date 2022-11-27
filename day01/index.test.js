import { readFileSync } from "fs";
import { partOne, partTwo } from ".";

const sampleInput = readFileSync("./sample.txt", "utf-8");
const actualInput = readFileSync("./actual.txt", "utf-8");

describe("part one", () => {
  test.only("sampleInput", () => {
    expect(partOne(sampleInput)).toBe();
  });
  test("actualInput", () => {
    expect(partOne(actualInput)).toBe("");
  });
});

describe.skip("part two", () => {
  test("sampleInput", () => {
    expect(partTwo(sampleInput)).toBe();
  });
  test("actualInput", () => {
    expect(partTwo(actualInput)).toBe("");
  });
});
