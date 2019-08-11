export function validateOperand(operand: number | string): number {
  if (typeof operand !== 'number') {
    throw new Error(`Operand is should be a number: ${operand}`);
  }
  return operand;
}
