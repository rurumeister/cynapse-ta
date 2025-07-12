import { validateNumber, validateStringNotEmpty } from "./validation.js";

/**
 * Transforms a string value into a number.
 * @param value The string value to transform into a number.
 * @returns transformed number.
 */
export function transformToNumber(value: string): number {
  return +value;
}

/**
 * Cleans an array of string values, transforming them into numbers.
 * Validates that each string is not empty and can be converted to a number.
 * @param numberValues The array of string values to clean.
 * @returns An array of numbers.
 */
export function cleanNumbers(numberValues: string[]): number[] {
  const numbers: number[] = [];

  for (const numberInput of numberValues) {
    validateStringNotEmpty(numberInput);

    const number = transformToNumber(numberInput);

    validateNumber(number);
    numbers.push(number);
  }
  return numbers;
}
