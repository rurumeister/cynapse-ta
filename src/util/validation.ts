/**
 * Utility function to validate if a string is not empty.
 * @param value String value to validate
 * @throws Error if the string is empty
 */
export function validateStringNotEmpty(value: string) {
  if (value.trim().length === 0) {
    throw new Error("Invalid input - must not be empty.");
  }
}

/**
 * Utility function to validate if a number is valid.
 * @param number Number to validate
 * @throws Error if the number is NaN
 */
export function validateNumber(number: number) {
  if (isNaN(number)) {
    throw new Error("Invalid number input.");
  }
}
