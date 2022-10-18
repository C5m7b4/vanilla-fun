import { isValid } from "../src/utils";

describe("isValid", () => {
  test("should return false is passed an undefined value", () => {
    expect(isValid(undefined)).toEqual(false);
  });
  test("should returb false if passed a null value", () => {
    expect(isValid(null)).toEqual(false);
  });
  test("should return true if given an empty string", () => {
    expect(isValid("")).toEqual(true);
  });
  test("should return true if given an object", () => {
    expect(isValid({})).toEqual(true);
  });
  test("should return true if given an array", () => {
    expect(isValid([])).toEqual(true);
  });
  test("should return true if given an int", () => {
    expect(isValid(2)).toEqual(true);
  });
});
