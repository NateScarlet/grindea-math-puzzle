<template lang="pug">
  .puzzle-calculator-output
    .answer
      template(v-if='valid')
        span {{ answer || $t('no-solution') }}
      template(v-else)
        span.invalid {{ $t('puzzle.invalid') }}
    .expected
      ElInputNumber(v-model='output')
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as puzzle from '@/puzzle';

@Component<PuzzleCalculatorOutput>({
  components: {},
})
export default class PuzzleCalculatorOutput extends Vue {
  @Prop({ required: true, type: String })
  padValue!: string;
  output: number = 0;
  get puzzle(): puzzle.Puzzle {
    const ret: puzzle.Puzzle = {
      operands: [],
      operators: [],
      output: this.output,
    };
    for (const i of this.padValue.split('')) {
      const operand = Number.parseInt(i, 10);
      if (isNaN(operand)) {
        ret.operators.push(i);
      } else {
        ret.operands.push(operand);
      }
    }
    return ret;
  }

  get valid() {
    return (
      this.puzzle.operands.length - this.puzzle.operators.length === 1 &&
      this.puzzle.operators.length > 0
    );
  }
  get answer(): string | undefined {
    if (!this.valid) {
      return undefined;
    }

    const answer = puzzle.findFirstCorrectAnswer(this.puzzle);
    return answer && answer.join(' ');
  }
}
</script>

<style lang="scss">
.puzzle-calculator-output {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1em;
  .answer {
    text-align: center;
    flex: 1 1 auto;
    .invalid {
      color: #f56c6c;
    }
  }
  .expected {
    .el-input-number {
      font-size: 1em;
      line-height: 1.5em;
      height: 1em;
      .el-input {
        font-size: 1em;
        .el-input__inner {
          font-size: 1em;
          height: 100%;
          line-height: 1.5em;
        }
      }
    }
    &::before {
      content: '=';
      margin: 0 10px;
    }
  }
}
</style>
