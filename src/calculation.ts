import { cleanNumbers } from "./util/numbers.js";
/**
 * Converts a number to a dollar amount with two decimal places.
 * @param amount the amount to convert.
 * @returns the converted amount as a number.
 */
export function convertToDollars(amount: number): number {
  return parseFloat((amount / 100).toFixed(2));
}

/**
 * Distributes an amount of money among a specified number of recipients.
 * The first number is the total amount, the second is the number of recipients.
 * @param numbers array containing the total amount and the number of recipients.
 * @returns an array of strings representing the distributed amounts for each recipient.
 */
export function distributeAmount(numbers: number[]): number[] {
  const [amount, recipients] = numbers;

  const amtInCents = Math.round(amount * 100);

  // Validate inputs against 0 recipients / money
  if (recipients < 1) {
    throw new Error("Invalid number of recipients. Must be at least 1.");
  }
  if (amtInCents < 1) {
    throw new Error("Invalid amount. Must be at least 1.");
  }

  // Array to hold distributed amounts
  const distribution = [];

  // Edge case: if only one recipient, they will get the full amount
  if (recipients === 1) {
    distribution.push(convertToDollars(amtInCents));
    return distribution;
  }

  const avgAmtInCents = Math.floor(amtInCents / recipients);
  console.log("avgAmtInCents: ", convertToDollars(avgAmtInCents));

  const minAmtInCents = Math.max(1, Math.floor(avgAmtInCents * 0.5)); // Ensures people don't get near 0
  console.log("minAmount: ", convertToDollars(minAmtInCents));

  if (minAmtInCents * recipients > amtInCents) {
    throw new Error(
      "Amount is too small to distribute fairly among recipients."
    );
  }

  let remainingAmount = amtInCents; // Initial variable to track

  // Distribute to all recipients except the last one
  for (let i = 0; i < recipients - 1; i++) {
    const remainingRecipients = recipients - i;
    const avgRemaining = remainingAmount / remainingRecipients;

    // Set bounds: minimum is our floor, maximum is 150% of average remaining
    // This prevents anyone from getting too much while ensuring decent amounts
    const maxAmount = Math.min(
      remainingAmount - minAmtInCents * (remainingRecipients - 1), // Leave enough for others
      Math.floor(avgRemaining * 1.5) // Don't exceed 150% of average
    );

    // Generate random amount between minAmount and maxAmount
    const randomAmount =
      minAmtInCents +
      Math.floor(Math.random() * (maxAmount - minAmtInCents + 1));

    console.log(
      `Recipient ${i + 1}: min=${convertToDollars(
        minAmtInCents
      )}, max=${convertToDollars(maxAmount)}, chosen=${convertToDollars(
        randomAmount
      )}, remaining=${convertToDollars(remainingAmount)}`
    );

    distribution.push(convertToDollars(randomAmount));
    remainingAmount -= randomAmount;
  }

  // Last recipient gets whatever is left
  distribution.push(convertToDollars(remainingAmount));

  console.log("Final distribution: ", distribution);
  return distribution;
}

/**
 * Calculates result of distributing amounts bbased on array of string values.
 * @param numberValues an array of string number values.
 * @returns
 */
export function calculateResult(numberValues: string[]): string {
  let result = "";
  try {
    const numbers = cleanNumbers(numberValues);

    console.log("cleanedNumbers: ", numbers);
    result = distributeAmount(numbers).toString();

    console.log("Distribution result: ", result);
  } catch (error) {
    result = error instanceof Error ? error.message : "An error occurred";
  }
  return result;
}
