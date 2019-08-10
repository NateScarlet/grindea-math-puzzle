import { iterateCorrectAnswer } from './iterateCorrectAnswer';
import { Answer, Puzzle } from './types';

export function findFirstCorrectAnswer(puzzle: Puzzle): Answer | undefined {
  for (const i of iterateCorrectAnswer(puzzle)) {
    return i;
  }
}
