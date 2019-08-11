import { Answer } from './types';
import { validateOperator } from './validateOperator';
import { validateOperand } from './validateOperand';

function evaluateOperation(
  leftOperand: number,
  operator: string,
  rightOperand: number
): number {
  switch (operator) {
    case '+':
      return leftOperand + rightOperand;
    case '-':
      return leftOperand - rightOperand;
    case '*':
      return leftOperand * rightOperand;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

export function evaluateAnswer(answer: Answer): number {
  if (!(answer.length >= 3 && answer.length % 2)) {
    throw new Error(`Invalid Answer length: ${answer.join(' ')}`);
  }
  let ret = validateOperand(answer[0]);
  for (let i = 1; i < answer.length; i += 2) {
    const operator = validateOperator(answer[i]);
    const operand = validateOperand(answer[i + 1]);
    ret = evaluateOperation(ret, operator, operand);
  }
  return ret;
}
