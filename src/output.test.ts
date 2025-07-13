import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  generateResultText,
  outputError,
  outputResult,
  outputSuccess,
} from "./output.ts";

const createElement = vi.fn();
const getElementById = vi.fn();

global.document = {
  createElement: createElement,
  getElementById: getElementById,
} as any;

describe("generateResultText()", () => {
  it("should return ERROR prefixed text for invalid result", () => {
    const input = "Invalid input - must not be empty.";

    const result = generateResultText(input);

    expect(result).toBe("ERROR: Invalid input - must not be empty.");
  });

  it("should return original text for valid result", () => {
    const input = "10.00,20.00,30.00";

    const result = generateResultText(input);

    expect(result).toBe("10.00,20.00,30.00");
  });

  it("should handle empty string input", () => {
    const input = "";

    const result = generateResultText(input);

    expect(result).toBe("");
  });
});

describe("outputError()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create error div and append to result element", () => {
    const input = "ERROR: Invalid input - must not be empty";
    const resultElement = {
      appendChild: vi.fn(),
    };
    const errorDiv = {
      textContent: "",
      className: "",
    };
    createElement.mockReturnValue(errorDiv);

    outputError(input, resultElement as any);

    expect(createElement).toHaveBeenCalledWith("div");
    expect(errorDiv.textContent).toBe(input);
    expect(errorDiv.className).toBe("error");
    expect(resultElement.appendChild).toHaveBeenCalledWith(errorDiv);
  });

  it("should return nothing if resultElement is undefined", () => {
    const resultText = "ERROR: Invalid input - must not be empty";
    const resultElement = undefined;

    outputError(resultText, resultElement as any);

    expect(createElement).not.toHaveBeenCalled();
  });
});

describe("outputSuccess()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create successful result div and span elements", () => {
    const resultText = "10.00,20.00,30.00";
    const resultElement = {
      appendChild: vi.fn(),
      classList: {
        add: vi.fn(),
      },
    };
    const mockResultDiv = { textContent: "" };
    const mockSpanElement = {
      textContent: "",
      className: "",
    };

    createElement
      .mockReturnValueOnce(mockResultDiv)
      .mockReturnValue(mockSpanElement);

    outputSuccess(resultText, resultElement as any);

    expect(createElement).toHaveBeenCalledWith("div");
    expect(createElement).toHaveBeenCalledWith("span");
    expect(createElement).toHaveBeenCalledTimes(4);
    expect(mockResultDiv.textContent).toBe("Result:");
    expect(resultElement.classList.add).toHaveBeenCalledWith("result");
    expect(resultElement.appendChild).toHaveBeenCalledTimes(5);
  });

  it("should return early if resultElement is null", () => {
    const resultText = "10.00,20.00,30.00";
    const resultElement = null;

    outputSuccess(resultText, resultElement as any);

    expect(createElement).not.toHaveBeenCalled();
  });
});

describe("outputResult()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call outputError for ERROR text", () => {
    const input = "ERROR: Invalid input - must not be empty";
    const resultElement = {
      innerHTML: "",
      appendChild: vi.fn(),
      classList: { add: vi.fn() },
    };
    getElementById.mockReturnValue(resultElement);
    createElement.mockReturnValue({ textContent: "", className: "" });

    outputResult(input);

    expect(getElementById).toHaveBeenCalledWith("result");
    expect(resultElement.innerHTML).toBe("");
    expect(createElement).toHaveBeenCalledWith("div");
  });

  it("should call outputSuccess for valid text", () => {
    const input = "10.00,20.00,30.00";
    const resultElement = {
      innerHTML: "",
      appendChild: vi.fn(),
      classList: { add: vi.fn() },
    };
    getElementById.mockReturnValue(resultElement);
    createElement.mockReturnValue({ textContent: "", className: "" });

    outputResult(input);

    expect(getElementById).toHaveBeenCalledWith("result");
    expect(resultElement.innerHTML).toBe("");
    expect(createElement).toHaveBeenCalledWith("div");
    expect(createElement).toHaveBeenCalledWith("span");
  });

  it("should clear previous content before outputting new result", () => {
    const input = "10.00,20.00,30.00";
    const resultElement = {
      innerHTML: "previous content",
      appendChild: vi.fn(),
      classList: { add: vi.fn() },
    };
    getElementById.mockReturnValue(resultElement);
    createElement.mockReturnValue({ textContent: "", className: "" });

    outputResult(input);

    expect(resultElement.innerHTML).toBe("");
  });
});
