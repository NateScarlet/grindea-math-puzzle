<template lang="pug">
  .puzzle-calculator
    PuzzleCalculatorPad(v-model='padValue')
    PuzzleCalculatorOutput(:padValue='padValue')
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
}
</script>

<style lang="scss" scoped>
.puzzle-calculator {
  font-size: 2em;
  width: 20em;
}
</style>
