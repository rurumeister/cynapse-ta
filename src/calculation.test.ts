import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  calculateResult,
  convertToDollars,
  distributeAmount,
  roundToHalfDollarStep,
} from "./calculation.ts";
import { cleanNumbers } from "./util/numbers.ts";

vi.mock("./util/numbers.ts", () => ({
  cleanNumbers: vi.fn(),
}));

describe("roundToHalfDollarStep()", () => {
  it("should round to nearest 50 cent step"),
    () => {
      expect(roundToHalfDollarStep(25)).toBe(50);
      expect(roundToHalfDollarStep(50)).toBe(50);
      expect(roundToHalfDollarStep(75)).toBe(100);
      expect(roundToHalfDollarStep(100)).toBe(100);
    };

  it("should handle exact 50 cent multiples"),
    () => {
      const input = [50, 100, 150, 200];

      input.forEach((input) => {
        expect(roundToHalfDollarStep(input)).toBe(input);
      });
    };

  it("should handle zero"),
    () => {
      const input = 0;

      const result = roundToHalfDollarStep(input);

      expect(result).toBe(0);
    };
});

describe("convertToDollars()", () => {
  it("should convert cents to dollars with two decimal places"),
    () => {
      const input = 1234;

      const result = convertToDollars(input);

      expect(result).toBe(12.34);
    };

  it("should handle zero amount"),
    () => {
      const input = 0;

      const result = convertToDollars(input);

      expect(result).toBe(0.0);
    };

  it("should handle small cent amounts"),
    () => {
      const input = 1;

      const result = convertToDollars(input);

      expect(result).toBe(0.01);
    };

  it("should handle dollar amounts"),
    () => {
      const input = 500;

      const result = convertToDollars(input);

      expect(result).toBe(5.0);
    };
});

describe("distributeAmount()", () => {
  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should distribute total amount for single recipient"),
    () => {
      const input = [10.0, 1];

      const result = distributeAmount(input);

      expect(result).toEqual([10.0]);
    };

  it("should distribute amount for multiple recipients"),
    () => {
      const input = [10.0, 5];

      const result = distributeAmount(input);

      expect(result).toHaveLength(5);
      expect(result.every((amount) => amount >= 0.5)).toBe(true);
      expect(result.reduce((sum, amount) => sum + amount, 0)).toBeCloseTo(
        10.0,
        5
      );
    };

  it("should throw error for zero recipients"),
    () => {
      const input = [10.0, 0];

      expect(() => distributeAmount(input)).toThrow(
        "Invalid number of recipients. Must be at least 1."
      );
    };

  it("should throw error for negative recipients"),
    () => {
      const input = [10.0, -1];

      expect(() => distributeAmount(input)).toThrow(
        "Invalid number of recipients. Must be at least 1."
      );
    };

  it("should throw error when amount too small to distribute fairly"),
    () => {
      const input = [1.0, 10];

      expect(() => distributeAmount(input)).toThrow(
        "Amount is too small to distribute fairly among recipients."
      );
    };
});

describe("calculateResult()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return error message when cleanNumbers throws"),
    () => {
      const input = ["", "5"];
      const mockError = new Error("Invalid input - must not be empty.");
      vi.mocked(cleanNumbers).mockImplementation(() => {
        throw mockError;
      });

      const result = calculateResult(input);

      expect(result).toBe("Invalid input - must not be empty.");
    };

  it("should return error message when distributeAmount throws"),
    () => {
      const input = ["0.25", "1"];
      vi.mocked(cleanNumbers).mockReturnValue([0.25, 1]);

      const result = calculateResult(input);

      expect(result).toBe("Invalid amount. Must be at least $0.50.");
    };

  it("should handle non-Error objects thrown"),
    () => {
      const input = ["10", "5"];
      vi.mocked(cleanNumbers).mockImplementation(() => {
        throw "Some string error";
      });

      const result = calculateResult(input);

      expect(result).toBe("An error occurred");
    };

  it("should return comma-separated string for multiple recipients"),
    () => {
      const input = ["10.00", "5"];
      vi.mocked(cleanNumbers).mockReturnValue([10.0, 5]);

      const result = calculateResult(input);

      expect(result).toContain(",");
      expect(result.split(",")).toHaveLength(5);
    };

  it("should return single value for one recipient"),
    () => {
      const input = ["10.00", "1"];
      vi.mocked(cleanNumbers).mockReturnValue([10.0, 1]);

      const result = calculateResult(input);

      expect(result).toBe("10");
      expect(result).not.toContain(",");
    };
});
