import { calculateResult } from "./src/calculation.js";
import { generateResultText, outputResult } from "./src/output.js";
import { extractEnteredNumberValues } from "./src/parser.js";

const form = document.querySelector("form") as HTMLFormElement;

/**
 * Takes in values entered into form, does necessary validation checks, result calculation and output
 * @param event new Events happening
 */
function formSubmitHandler(event: Event): void {
  event.preventDefault();
  const enteredValues = extractEnteredNumberValues(form);

  const result = calculateResult(enteredValues);

  const resultText = generateResultText(result);

  outputResult(resultText);
}

form.addEventListener("submit", formSubmitHandler);
