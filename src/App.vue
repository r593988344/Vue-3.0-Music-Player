<template>
  <div id="app">
    <music-header></music-header>
    <router-view/>
    <music-footer></music-footer>
  </div>
</template>

<script>
import MusicHeader from 'components/header/musicHeader'
import MusicFooter from 'components/footer/musicFooter'
export default {
  name: 'App',
  components: {
    MusicHeader,
    MusicFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
