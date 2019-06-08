<template>
  <div class="hello">
    <music-header></music-header>
    <!--<music-footer></music-footer>-->
  </div>
</template>

<script>
import MusicHeader from './header/musicHeader'
import MusicFooter from './footer/musicFooter'
export default {
  name: 'HelloWorld',
  components: {
    MusicHeader,
    MusicFooter
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
