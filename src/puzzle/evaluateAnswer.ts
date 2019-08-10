import { Answer } from './types';

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
  let ret = answer[0];
  if (typeof ret !== 'number') {
    throw new Error(
      `Operand is should be a number: ${ret} : ${answer.join(' ')}`
    );
  }
  for (let i = 1; i < answer.length; i += 2) {
    const operator = answer[i];
    if (typeof operator !== 'string') {
      throw new Error(
        `Operator should be a string: ${operator} : ${answer.join(' ')}`
      );
    }
    const operand = answer[i + 1];
    if (typeof operand !== 'number') {
      throw new Error(
        `Operand is should be a number: ${operand} : ${answer.join(' ')}`
      );
    }
    ret = evaluateOperation(ret, operator, operand);
  }
  return ret;
}
