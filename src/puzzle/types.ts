export interface Puzzle {
  operands: number[];
  operators: string[];
  output: number;
}

export type Answer = (string | number)[];
