/**
 * Generates result text based on calculation result.
 * @param calculationResult The result of the calculation.
 * @returns A string representing the result text.
 */
export function generateResultText(calculationResult: string): string {
  let resultText = "";
  // console.log("calculationResult: ", calculationResult);
  if (
    calculationResult.startsWith("Invalid") ||
    calculationResult.startsWith("Amount")
  ) {
    resultText = `ERROR: ${calculationResult}`;
  } else {
    resultText = `${calculationResult}`;
  }
  return resultText;
}

/**
 * Outputs error text to the DOM.
 * @param resultText The error text to output.
 * @param resultElement The DOM element to output the error text to.
 * @returns void
 */
export function outputError(
  resultText: string,
  resultElement: HTMLElement
): void {
  if (!resultElement) return;

  const errorDiv = document.createElement("div");
  errorDiv.textContent = resultText;
  errorDiv.className = "error";

  resultElement.appendChild(errorDiv);
}

/**
 * Outputs success text to the DOM.
 * @param resultText The success text to output.
 * @param resultElement The DOM element to output the success text to.
 * @returns void
 */
export function outputSuccess(resultText: string, resultElement: HTMLElement) {
  if (!resultElement) return;

  const lines = resultText.split(",");
  const result = document.createElement("div");
  resultElement.appendChild(result);
  result.textContent = "Result:";
  resultElement.appendChild(result);
  resultElement.classList.add("result");

  for (const line of lines) {
    const lineElement = document.createElement("span");
    lineElement.textContent = `$${line.trim()}`;
    lineElement.className = "result-line";

    resultElement.appendChild(lineElement);
  }
}

/**
 * Outputs the result text to the DOM.
 * @param resultText The text to output.
 */
export function outputResult(resultText: string): void {
  const resultElement = document.getElementById("result");

  if (!resultElement) return;

  // Clear previous content
  resultElement.innerHTML = "";

  if (resultText.startsWith("ERROR:")) {
    outputError(resultText, resultElement);
    return;
  } else {
    outputSuccess(resultText, resultElement);
    return;
  }
}
