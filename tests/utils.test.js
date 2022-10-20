import { isValid, formatMoney } from "../src/utils";

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

describe("formatMoney", () => {
  test("should return a dollar value if given 0", () => {
    expect(formatMoney(0)).toEqual("0.00");
  });
  test("should return a dollar value if given 0", () => {
    expect(formatMoney(0.1)).toEqual("0.10");
  });
  test("should return 2 decimal places", () => {
    expect(formatMoney(1.1)).toEqual("1.10");
  });
  test("should return 2 decimal places", () => {
    expect(formatMoney(1.2345678)).toEqual("1.23");
  });
});
