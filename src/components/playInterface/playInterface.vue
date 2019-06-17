<template>
  <transition name="slide">
    <div v-show="showPlay" class="play-song">
      <div class="back-to">
        <span class="back" @click="back">
          Back
        </span>
        <div class="title-scroll">
          <div>{{songDetail.name}}</div>
        </div>
      </div>
      <div class="play-bg" :style="bgStyle"></div>
      <div class="mask"></div>
      <div class="play-container">
        <div class="container">
          <div class="play-circle">
            <img src="~common/image/disc.png" alt="">
            <img class="bg-img" :src="circleImg">
          </div>
        </div>
        <div class="contain-bottom">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-faxian2"></use>
            </svg>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-faxian2"></use>
            </svg>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-faxian2"></use>
            </svg>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-faxian2"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import TopTitle from 'baseComponent/topTitle/topTitle'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'playInterface',
  components: { TopTitle },
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.playHide(false)
    },
    ...mapMutations({
      playHide: 'SHOW_PLAY'
    })
  },
  computed: {
    bgStyle () {
      if (this.songDetail.al) {
        return `background-image: url(${this.songDetail.al.picUrl})`
      } else {
        return 'background-image: url("")'
      }
    },
    circleImg () {
      if (this.songDetail.al) {
        return this.songDetail.al.picUrl
      } else {
        return ''
      }
    },
    ...mapGetters(['songDetail', 'showPlay'])
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/common.scss";
.play-song{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100%;
  background-color: #ffffff;
  .play-bg{
    position: fixed;
    top: 0;
    left: 0;
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
    height: 50px;
    line-height: 50px;
    color: #ffffff;
    position: relative;
    z-index: 3;
    .back{
      float: left;
      width: 20%;
    }
    >div{
      width: 50%;
      margin-left: 25%;
      overflow: hidden;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      .title-scroll{
        white-space: nowrap;
      }
    }
  }
}
.play-container{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  .container{
    margin-top: 60px;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .contain-bottom{
    height: 60px;
    display: flex;
    justify-content: space-around;
    color: #ffffff;
    font-size: 20px;
    align-items: center;
  }
  .play-circle{
    width: 60%;
    height: 0;
    padding-bottom: 60%;
    position: relative;
    img{
      border-radius: 50%;
      border: 3px solid rgba(185, 185, 185, 0.44);
      transform: rotate(360deg);
      animation: rotation 8s linear infinite;;
    }
    .bg-img{
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
