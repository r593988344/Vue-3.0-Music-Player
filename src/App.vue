<template>
  <div id="app">
    <music-header></music-header>
    <div class="router-view">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
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
  display:flex;
  height:100%;
  flex-direction:column;
}
.router-view{
  display: flex;
  flex: 1;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
}
</style>
