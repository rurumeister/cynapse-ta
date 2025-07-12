/**
 * Extracts numbers from a FormData object.
 * @param formData FormData object containing the input values
 * @returns A string array containing the amount and recipients
 */
export function extractNumbers(formData: any): string[] {
  const amountInput = formData.get("amount");
  const recipientsInput = formData.get("recipients");
  // console.log(amountInput, recipientsInput);

  return [amountInput, recipientsInput];
}

/**
 * Extracts entered number values from a form.
 * @param form The form element to extract values from.
 * @returns An array of string values representing the entered numbers.
 */
export function extractEnteredNumberValues(form: any): string[] {
  const formData = new FormData(form);
  const numberInputs = extractNumbers(formData);

  return numberInputs;
}
