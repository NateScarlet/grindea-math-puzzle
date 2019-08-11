<template lang="pug">
  .puzzle-calculator
    PuzzleCalculatorPad(
      ref='pad'
      v-model='padValue'
      @clear='clear'
      @submit='focuseOutput'
      :title='$t("calculator.pad.clear")'
    )
    PuzzleCalculatorOutput(
      ref='output'
      :padValue='padValue'
      @submit='focusPadDisplay'
    )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PuzzleCalculatorPad from './PuzzleCalculatorPad.vue';
import PuzzleCalculatorOutput from './PuzzleCalculatorOutput.vue';

@Component<PuzzleCalculator>({
  components: { PuzzleCalculatorPad, PuzzleCalculatorOutput },
})
export default class PuzzleCalculator extends Vue {
  padValue: string = '';

  $refs!: {
    output: PuzzleCalculatorOutput;
    pad: PuzzleCalculatorPad;
  };

  focusPadDisplay() {
    this.$refs.pad.$refs.display.focus();
  }
  focuseOutput() {
    this.$refs.output.$refs.output.focus();
    const input = this.$refs.output.$refs.output.$el.querySelector('input');
    if (!input) {
      return;
    }
    input.setSelectionRange(0, input.value.length);
  }
  onKeyup(e: KeyboardEvent) {
    if (e.target !== document.body) {
      return;
    }
    if (/^[0-9+\-*]*$/.test(e.key)) {
      this.padValue += e.key;
    }
    if (e.key === 'c') {
      this.$refs.pad.clear();
    }
    if (e.key === 'Enter' || e.key === '=') {
      this.focuseOutput();
    }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      this.$refs.pad.onBackspace();
    }
  }
  mounted() {
    document.addEventListener('keyup', this.onKeyup.bind(this));
  }
}
</script>

<style lang="scss" scoped>
.puzzle-calculator {
  font-size: 2em;
  max-width: 20em;
  @media screen and (max-width: 768px) {
    font-size: 1.5em;
  }
}
</style>
