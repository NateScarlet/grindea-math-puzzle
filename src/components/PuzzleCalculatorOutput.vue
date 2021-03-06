<template lang="pug">
  .puzzle-calculator-output
    .answer
      template(v-if='valid')
        span {{ answer || $t('no-solution') }}
      template(v-else)
        span.invalid {{ $t('puzzle.invalid') }}
    .expected
      ElInputNumber(
        ref='output'
        v-model='output'
        @keydown.enter.native.prevent='$emit("submit")'
        @keydown.tab.native.prevent='$emit("submit")'
      )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as puzzle from '@/puzzle';
import { ElInputNumber } from 'element-ui/types/input-number';

@Component<PuzzleCalculatorOutput>({
  components: {},
})
export default class PuzzleCalculatorOutput extends Vue {
  @Prop({ required: true, type: String })
  padValue!: string;
  output: number = 0;

  $refs!: {
    output: ElInputNumber;
  };

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
    return answer && puzzle.formatAnswer(answer);
  }
}
</script>

<style lang="scss">
.puzzle-calculator-output {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1em;
  flex-wrap: wrap;
  & > * {
    margin: 5px;
  }
  .answer {
    text-align: center;
    justify-content: center;
    flex: 1 1 auto;
    .invalid {
      color: #f56c6c;
    }
  }
  .expected {
    margin: 5px auto;
    flex: 0 0 auto;
    .el-input-number {
      font-size: 1em;
      line-height: 1.5em;
      height: 1.5em;
      .el-input {
        font-size: calc(1em + 1.5px);
        .el-input__inner {
          font-size: 1em;
          height: 1.5em;
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
