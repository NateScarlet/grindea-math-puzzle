import { Puzzle } from './types';

/** Iterate all possible answers, including wrong answers. */
export function* iterateAnswer(puzzle: Puzzle): Iterable<(string | number)[]> {
  if (puzzle.operands.length - puzzle.operators.length !== 1) {
    throw new Error(`Invalid puzzle: ${JSON.stringify(puzzle)}`);
  }
  if (puzzle.operators.length === 1) {
    const [left, right] = puzzle.operands;
    yield [left, puzzle.operators[0], right];
    if (left === right) {
      return;
    }
    yield [right, puzzle.operators[0], left];
    return;
  }
  for (
    let operandIndex = 0;
    operandIndex < puzzle.operands.length;
    operandIndex += 1
  ) {
    const operands = [...puzzle.operands];
    const [operand] = operands.splice(operandIndex, 1);
    for (
      let operatorIndex = 0;
      operatorIndex < puzzle.operators.length;
      operatorIndex += 1
    ) {
      const operators = [...puzzle.operators];
      const [operator] = operators.splice(operatorIndex, 1);
      for (const answer of iterateAnswer({
        ...puzzle,
        operands,
        operators,
      })) {
        yield [operand, operator, ...answer];
      }
    }
  }
}
