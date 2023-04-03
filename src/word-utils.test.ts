import { describe, expect, test } from "vitest";
import {
  computeGuess,
  ColorState,
  LetterState,
  computeColor,
} from "./word-utils";

describe("computeGuess", () => {
  test("works with match and presents", () => {
    expect(computeGuess("boost", "basic")).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
    ]);
  });

  test("full match", () => {
    expect(computeGuess("boost", "boost")).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ]);
  });

  test("full miss", () => {
    expect(computeGuess("guard", "boost")).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  test("only does one match when two letters exist", () => {
    expect(computeGuess("solid", "boost")).toEqual([
      LetterState.Present,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  test("returns empty array when given incomplete guess", () => {
    expect(computeGuess("so", "boost")).toEqual([]);
  });

  test("when 2 letters are present but answer has only 1 of those letters", () => {
    expect(computeGuess("5524", "3655")).toEqual([
      LetterState.Present,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });
  test("colors", () => {
    expect(computeColor("5524")).toEqual([
      ColorState.Five,
      ColorState.Five,
      ColorState.Two,
      ColorState.Four,
    ]);
  });

  test("when 1 number matches but guess has more of the same number", () => {
    expect(computeGuess("8989", "1881")).toEqual([
      LetterState.Present,
      LetterState.Miss,
      LetterState.Match,
      LetterState.Miss,
    ]);
  });
});
