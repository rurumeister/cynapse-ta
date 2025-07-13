import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanNumbers, transformToNumber } from "./numbers";
import { validateNumber, validateStringNotEmpty } from "./validation";

describe("transformToNumber()", () => {
  it("should transform a string to a number", () => {
    const input = ["0", "-1", "1", "1.23"];
    const expected = [0, -1, 1, 1.23];

    input.forEach((input, i) => {
      const result = transformToNumber(input);

      expect(result).toBe(expected[i]);
    });
  });

  it("should return NaN for non-numeric strings", () => {
    const input = ["abc", "abc123"];

    input.forEach((input) => {
      const result = transformToNumber(input);

      expect(result).toBeNaN;
    });
  });

  it("should return NaN for empty string", () => {
    const input = "";

    const result = transformToNumber(input);

    expect(result).toBeNaN;
  });
});

vi.mock("./validation.ts", () => ({
  validateNumber: vi.fn(),
  validateStringNotEmpty: vi.fn(),
}));

describe("cleanNumbers()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should successfully clean array of numeric strings", () => {
    const input = ["1", "2", "3"];

    const result = cleanNumbers(input);

    expect(result).toEqual([1, 2, 3]);
    expect(validateStringNotEmpty).toHaveBeenCalledTimes(3);
    expect(validateNumber).toHaveBeenCalledTimes(3);
  });

  it("should return empty array for empty input", () => {
    const input = [];

    const result = cleanNumbers(input);

    expect(result).toEqual([]);
    expect(validateStringNotEmpty).not.toHaveBeenCalled();
    expect(validateNumber).not.toHaveBeenCalled();
  });

  it("should throw error when validation fails", () => {
    const mockError = new Error("Validation failed");

    const input = ["invalid"];
    vi.mocked(validateNumber).mockImplementation(() => {
      throw mockError;
    });

    expect(() => cleanNumbers(input)).toThrow("Validation failed");
  });
});
