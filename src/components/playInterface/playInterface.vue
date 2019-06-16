<template>
  <transition name="slide">
    <div class="play-song">
      <top-title :titleName="songDetail.name"></top-title>
      <div class="play-bg" :style="bgStyle"></div>
      <div class="mask"></div>
    </div>
  </transition>
</template>

<script>
import TopTitle from 'baseComponent/topTitle/topTitle'
import { mapGetters } from 'vuex'
export default {
  name: 'playInterface',
  components: { TopTitle },
  data () {
    return {
    }
  },
  created () {
    console.log(this.songDetail)
  },
  computed: {
    bgStyle () {
      return `background-image: url(${this.songDetail.al.picUrl})`
    },
    ...mapGetters(['songDetail'])
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/common.scss";
.play-song{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100%;
  background-color: #ffffff;
  .play-bg{
    height: 100%;
    background-size:cover;
    background-position:center top;
    -webkit-filter: blur(30px); /* Chrome, Safari, Opera */
    filter: blur(30px);
  }
  .mask{
    height: 100%;
    background-color: #000;
    opacity: 0.2;
    position: fixed;
    top: 0;
    bottom: 0;
  }
  .back-to{
    z-index: 3;
  }
}
</style>
