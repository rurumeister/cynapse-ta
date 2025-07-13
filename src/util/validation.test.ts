import { describe, expect, it } from "vitest";
import { validateNumber, validateStringNotEmpty } from "./validation";

describe("validateStringNotEmpty()", () => {
  it("should not throw error for valid string"),
    () => {
      const input = "test";

      expect(() => validateStringNotEmpty(input)).not.toThrow();
    };

  it("should throw error for empty string", () => {
    const input = "";

    expect(() => validateStringNotEmpty(input)).toThrow(
      "Invalid input - must not be empty"
    );
  });

  it("should throw error for string only spaces"),
    () => {
      const input = "  ";

      expect(() => validateStringNotEmpty(input)).toThrow(
        "Invalid input - must not be empty."
      );
    };
});

describe("validateNumber()", () => {
  it("should not throw for a valid number", () => {
    const input = 123;

    expect(() => validateNumber(input)).not.toThrow();
  });

  it("should not throw for a decimal number", () => {
    const input = 1.23;

    expect(() => validateNumber(input)).not.toThrow();
  });

  it("should throw error for NaN", () => {
    const input = NaN;

    expect(() => validateNumber(input)).toThrow("Invalid number input.");
  });
});
