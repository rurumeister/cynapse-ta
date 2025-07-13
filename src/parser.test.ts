import { describe, expect, it, vi } from "vitest";
import { extractEnteredNumberValues, extractNumbers } from "./parser";

describe("extractNumbers()", () => {
  it("should extract both amount and recipient from Form Data", () => {
    const input = {
      get: vi.fn().mockReturnValueOnce("10").mockReturnValueOnce("5"),
    };

    const result = extractNumbers(input);

    expect(result).toEqual(["10", "5"]);
    expect(input.get).toHaveBeenCalledWith("amount");
    expect(input.get).toHaveBeenCalledWith("recipients");
    expect(input.get).toHaveBeenCalledTimes(2);
  });

  it("should handle null values from Form Data", () => {
    const input = {
      get: vi.fn().mockReturnValueOnce(null).mockReturnValueOnce("3"),
    };

    const result = extractNumbers(input);

    expect(result).toEqual([null, "3"]);
  });

  it("should handle empty string values from Form Data", () => {
    const input = {
      get: vi.fn().mockReturnValueOnce("").mockReturnValueOnce(""),
    };

    const result = extractNumbers(input);

    expect(result).toEqual(["", ""]);
  });
});

describe("extractEnteredNumberValues", () => {
  it("should create Form Data from form and extract number values", () => {
    const formInput = {
      elements: {
        amounts: { value: "10" },
        recipients: { value: "5" },
      },
    };
    const inputData = {
      get: vi.fn().mockReturnValueOnce("10").mockReturnValueOnce("5"),
    };
    global.FormData = vi.fn().mockReturnValue(inputData);

    const result = extractEnteredNumberValues(formInput);

    expect(result).toEqual(["10", "5"]);
    expect(global.FormData).toHaveBeenCalledWith(formInput);
  });

  it("should handle form with missing fields", () => {
    const formInput = {
      elements: {},
    };
    const inputData = {
      get: vi.fn().mockReturnValueOnce(null).mockReturnValueOnce(null),
    };
    global.FormData = vi.fn().mockReturnValue(inputData);

    const result = extractEnteredNumberValues(formInput);

    expect(result).toEqual([null, null]);
  });

  it("should handle empty form values", () => {
    const formInput = {
      elements: {
        amount: { value: "" },
        recipients: { value: "" },
      },
    };
    const inputData = {
      get: vi.fn().mockReturnValueOnce("").mockReturnValueOnce(""),
    };
    global.FormData = vi.fn().mockReturnValue(inputData);

    const result = extractEnteredNumberValues(formInput);

    expect(result).toEqual(["", ""]);
  });
});
