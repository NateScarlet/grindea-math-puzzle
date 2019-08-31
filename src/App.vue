<template lang="pug">
  #app
    h1.title
      span.project-name(:title="$t('project-name')") {{ $t('project-name') }}
      a.github(href='https://github.com/NateScarlet/grindea-math-puzzle')
        img(src='https://img.shields.io/github/stars/NateScarlet/grindea-math-puzzle?style=social')
    PuzzleCalculator
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PuzzleCalculator from './components/PuzzleCalculator.vue';

@Component<App>({
  components: { PuzzleCalculator },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  .title {
    display: flex;
    align-items: center;
    max-width: 100%;

    .project-name {
      max-width: 100%;
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    a.github {
      flex: 0 0 auto;
      margin: 0 5px;
      display: flex;
      align-items: center;
      img {
        height: 1em;
      }
    }
    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: flex-end;
      a.github {
        margin: 10px 0 0 0;
      }
    }
  }
}
</style>
