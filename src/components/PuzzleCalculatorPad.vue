<template lang="pug">
  .puzzle-calculator-pad
    ElInput.display(
      ref='display'
      v-model='valueProxy'
      clearable
      :placeholder='$t("calculator.pad.placeholder")'
      @keydown.enter.native.prevent='$emit("submit")'
      @keydown.tab.native.prevent='$emit("submit")'
    )
    .row
      ElButton(@click='onBackspace') ←
      ElButton(@click='clear' :title='$t("calculator.pad.clear")') C
    .row
      ElButton(@click='valueProxy += "+"') +
      ElButton(@click='valueProxy += "-"') -
      ElButton(@click='valueProxy += "*"') ×
    .row
      ElButton(@click='valueProxy += "7"') 7
      ElButton(@click='valueProxy += "8"') 8
      ElButton(@click='valueProxy += "9"') 9
    .row
      ElButton(@click='valueProxy += "4"') 4
      ElButton(@click='valueProxy += "5"') 5
      ElButton(@click='valueProxy += "6"') 6
    .row
      ElButton(@click='valueProxy += "1"') 1
      ElButton(@click='valueProxy += "2"') 2
      ElButton(@click='valueProxy += "3"') 3
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ElInput } from 'element-ui/types/input';

@Component<PuzzleCalculatorPad>({
  components: {},
})
export default class PuzzleCalculatorPad extends Vue {
  @Prop({ required: true, type: String })
  value!: string;

  $refs!: {
    display: ElInput;
  };
  get valueProxy() {
    return this.value;
  }
  set valueProxy(v: string) {
    if (!/^[0-9+\-*]*$/.test(v)) {
      return;
    }
    this.$emit('input', v);
  }
  clear() {
    this.valueProxy = '';
    this.$emit('clear');
  }
  onBackspace() {
    this.valueProxy = this.valueProxy.slice(0, -1);
  }
}
</script>

<style lang="scss">
.puzzle-calculator-pad {
  .display {
    font-size: 1.5em;
    .el-input__inner {
      height: 1.5em;
    }
  }
  .row {
    display: flex;
    margin: 10px 0;
    .el-button {
      font-size: 1em;
      flex: 1 1 auto;
    }
  }
}
</style>
