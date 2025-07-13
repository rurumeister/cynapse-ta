import { cleanNumbers } from "./util/numbers.js";

/**
 * Rounds an amount in cents to the nearest 0.5 dollar step (50 cents).
 * @param amountInCents the amount in cents to round.
 * @returns the rounded amount in cents.
 */
export function roundToHalfDollarStep(amountInCents: number): number {
  return Math.round(amountInCents / 50) * 50;
}

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

  if (recipients < 1) {
    throw new Error("Invalid number of recipients. Must be at least 1.");
  }
  if (amtInCents < 50) {
    throw new Error("Invalid amount. Must be at least $0.50.");
  }

  const distribution = [];

  if (recipients === 1) {
    distribution.push(convertToDollars(roundToHalfDollarStep(amtInCents)));
    return distribution;
  }

  const avgAmtInCents = Math.floor(amtInCents / recipients);
  // console.log("avgAmtInCents: ", convertToDollars(avgAmtInCents));

  const minAmtInCents = Math.max(
    50,
    roundToHalfDollarStep(Math.floor(avgAmtInCents * 0.5))
  );
  // console.log("minAmountInCents: ", convertToDollars(minAmtInCents));

  if (minAmtInCents * recipients > amtInCents) {
    throw new Error(
      "Amount is too small to distribute fairly among recipients."
    );
  }

  let remainingAmount = amtInCents;

  for (let i = 0; i < recipients - 1; i++) {
    const remainingRecipients = recipients - i;
    const avgRemaining = remainingAmount / remainingRecipients;

    const maxAmount = roundToHalfDollarStep(
      Math.min(
        remainingAmount - minAmtInCents * (remainingRecipients - 1),
        Math.floor(avgRemaining * 1.5)
      )
    );

    const numOfSteps = Math.floor((maxAmount - minAmtInCents) / 50) + 1;
    const randomStepIndex = Math.floor(Math.random() * numOfSteps);
    const randomAmount = minAmtInCents + randomStepIndex * 50;

    // console.log(
    //   `Recipient ${i + 1}: min=${convertToDollars(
    //     minAmtInCents
    //   )}, max=${convertToDollars(maxAmount)}, chosen=${convertToDollars(
    //     randomAmount
    //   )}, remaining=${convertToDollars(remainingAmount)}`
    // );

    distribution.push(convertToDollars(randomAmount));
    remainingAmount -= randomAmount;
  }

  const finalAmount = roundToHalfDollarStep(remainingAmount);
  distribution.push(convertToDollars(finalAmount));

  // console.log("Final distribution: ", distribution);
  return distribution;
}

/**
 * Calculates result of distributing amounts based on array of string values.
 * @param numberValues an array of string number values.
 * @returns result of distribution in a string
 */
export function calculateResult(numberValues: string[]): string {
  let result = "";
  try {
    const numbers = cleanNumbers(numberValues);

    // console.log("cleanedNumbers: ", numbers);
    result = distributeAmount(numbers).toString();

    // console.log("Distribution result: ", result);
  } catch (error) {
    result = error instanceof Error ? error.message : "An error occurred";
  }
  return result;
}
