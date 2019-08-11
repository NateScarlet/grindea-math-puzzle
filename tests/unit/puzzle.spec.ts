import * as puzzle from '@/puzzle';
import { expect } from 'chai';

describe('puzzle', function(): void {
  describe('iterator-answer', function(): void {
    it('1-operator', function(): void {
      expect(
        Array.from(
          puzzle.iterateAnswer({
            operands: [1, 2],
            operators: ['*'],
            output: 0,
          })
        )
      ).to.deep.equals([[1, '*', 2], [2, '*', 1]]);
    });
    it('2-operators', function(): void {
      const result = Array.from(
        puzzle.iterateAnswer({
          operands: [1, 2, 3],
          operators: ['+', '-'],
          output: 0,
        })
      );
      const expected = [
        [1, '+', 2, '-', 3],
        [1, '+', 3, '-', 2],
        [1, '-', 2, '+', 3],
        [1, '-', 3, '+', 2],
        [2, '+', 1, '-', 3],
        [2, '+', 3, '-', 1],
        [2, '-', 1, '+', 3],
        [2, '-', 3, '+', 1],
        [3, '+', 1, '-', 2],
        [3, '+', 2, '-', 1],
        [3, '-', 1, '+', 2],
        [3, '-', 2, '+', 1],
      ];
      expect(result).to.deep.equals(expected);
    });
    it('3-operators', function(): void {
      const result = Array.from(
        puzzle.iterateAnswer({
          operands: [1, 2, 3, 4],
          operators: ['+', '-', '*'],
          output: 0,
        })
      );
      expect(result).has.lengthOf(144);
    });
    it('4-operators', function(): void {
      const result = Array.from(
        puzzle.iterateAnswer({
          operands: [1, 2, 3, 4, 5],
          operators: ['+', '-', '*', '+'],
          output: 0,
        })
      );
      expect(result).has.lengthOf(2880);
    });
  });
  describe('evaluate-answer', function(): void {
    it('1-operator', function(): void {
      const answer: puzzle.Answer = [1, '+', 2];
      const expected = 3;
      expect(puzzle.evaluateAnswer(answer)).to.equals(expected);
    });
    it('4-operators', function(): void {
      const answer: puzzle.Answer = [5, '*', 3, '-', 7, '+', 1, '-', 6];
      const expected = 3;
      expect(puzzle.evaluateAnswer(answer)).to.equals(expected);
    });
  });
  describe('iterate-correct-answers', function(): void {
    it('room-1', function(): void {
      const p: puzzle.Puzzle = {
        operands: [5, 3, 7, 1, 6],
        operators: ['*', '-', '+', '-'],
        output: 3,
      };
      const result = Array.from(puzzle.iterateCorrectAnswer(p));
      expect(result).has.lengthOf(168);
    });
    it('room-2', function(): void {
      const p: puzzle.Puzzle = {
        operands: [7, 4, 9, 2, 1],
        operators: ['+', '+', '*', '+'],
        output: 41,
      };
      const result = Array.from(puzzle.iterateCorrectAnswer(p));
      expect(result).has.lengthOf(36);
    });
  });
});
