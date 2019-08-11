import { Answer } from './types';
import { validateOperator } from './validateOperator';
import { validateOperand } from './validateOperand';

export function formatAnswer(answer: Answer): string {
  const precedenceMap: Record<string, number> = { '+': 1, '-': 1, '*': 2 };

  let ret = validateOperand(answer[0]).toString(10);
  let lastPrecedence = Infinity;
  for (let i = 1; i < answer.length; i += 2) {
    const operator = validateOperator(answer[i]);
    const operand = validateOperand(answer[i + 1]);
    const precedence = precedenceMap[operator];
    if (precedence > lastPrecedence) {
      ret = `(${ret})`;
    }
    ret = [ret, operator, operand].join(' ');
    lastPrecedence = precedence;
  }
  return ret;
}
