export function validateOperator(operator: number | string): string {
  if (typeof operator !== 'string') {
    throw new Error(`Operator is should be a string: ${operator}`);
  }
  return operator;
}
