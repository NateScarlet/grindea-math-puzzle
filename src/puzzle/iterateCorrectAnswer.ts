import { Puzzle, Answer } from './types';
import { iterateAnswer } from './iterateAnswer';
import { evaluateAnswer } from './evaluateAnswer';

export function* iterateCorrectAnswer(puzzle: Puzzle): Iterable<Answer> {
  for (const answer of iterateAnswer(puzzle)) {
    if (evaluateAnswer(answer) === puzzle.output) {
      yield answer;
    }
  }
}
