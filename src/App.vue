<template lang="pug">
  #app
    h1 {{ $t('project-name') }}
    PuzzleCalculator
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PuzzleCalculator from "./components/PuzzleCalculator.vue";

@Component<App>({
  components: { PuzzleCalculator }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: auto;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}
</style>
