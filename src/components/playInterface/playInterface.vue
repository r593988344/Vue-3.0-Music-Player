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
        <div class="progress"></div>
        <div class="actions">
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
          <div @click="openPlayLists">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-faxian2"></use>
            </svg>
          </div>
        </div>
        <transition name="topSlide">
          <div v-if="playListShow" class="play-lists">
            <div class="list-title">
              <div class="title-left">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-faxian2"></use>
                </svg>
                <span>{{playMode}} ({{listNumber}})</span>
              </div>
              <div class="title-right">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-faxian2"></use>
                </svg>
                <span>收藏全部</span>
                <svg class="icon clear-all" aria-hidden="true">
                  <use xlink:href="#icon-faxian2"></use>
                </svg>
              </div>
            </div>
            <scroll :data="playList" class="scroll-container">
              <ul>
                <li v-for="(item,index) of playList" :key="index" class="text-ellipsis-one-line">{{item.name}}
                  <span v-for="(names, index) of item.artists" :key="index">-{{names.name}}</span>
                </li>
              </ul>
            </scroll>
            <div class="close" @click="closePlayList">关闭</div>
          </div>
        </transition>
        <div v-show="playListShow" class="play-list-mask" @click="closePlayList"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import TopTitle from 'baseComponent/topTitle/topTitle'
import { mapGetters, mapMutations } from 'vuex'
import Scroll from 'baseComponent/scroll/scroll'
export default {
  name: 'playInterface',
  components: { Scroll, TopTitle },
  data () {
    return {
      playListShow: false,
      playMode: '列表循环'
    }
  },
  methods: {
    back () {
      this.playHide(false)
    },
    openPlayLists () {
      this.playListShow = true
    },
    closePlayList () {
      this.playListShow = false
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
    listNumber () {
      return this.playList.length
    },
    ...mapGetters(['songDetail', 'showPlay', 'playList'])
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/common.scss";
@import "~common/scss/variable.scss";
.topSlide-enter-active, .topSlide-leave-active {
  transition: all 0.5s
}
.topSlide-enter, .topSlide-leave-to {
  transform: translate3d(0, 100%, 0);
}
.play-list-mask{
  background-color: rgba(145,145,145,0.2);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 99;
}
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
  .actions{
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 30px;
    position: absolute;
    bottom: 30px;
    left: 0;
  }
  .play-lists{
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 60%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    text-align: left;
    line-height: 40px;
    font-size: $font-size-md;
    z-index: 999;
    .list-title{
      padding: 10px 0 10px 15px;
      line-height: 20px;
      border-bottom: 1px solid $border-bottom-gray;
      display: flex;
      justify-content: space-between;
      >div{
        display: flex;
        align-items: center;
        span{
          padding: 0 5px;
        }
      }
      .title-left{
        width: auto;
      }
      .title-right{
        width: auto;
        padding-right: 15px;
        span{
          padding-right: 15px;
          border-right: 1px solid $border-bottom-gray;
        }
        .clear-all{
          margin-left: 15px;
        }
      }
      .icon{
        font-size: 20px;
      }
    }
    ul{
      /*padding-bottom: 114px;*/
    }
    li{
      border-bottom: 1px solid $border-bottom-gray;
      padding-left: 15px;
      span{
        font-size: $font-size-sm;
        color: $play-list-gray-font;
      }
    }
    .close{
      text-align: center;
      line-height: 50px;
      position: absolute;
      bottom: 0;
      left: 0;
      padding-bottom: 20px;
      background-color: #ffffff;
      border-top: 1px solid $border-bottom-gray;
    }
  }
  .scroll-container{
    height: calc(100% - 110px);
    overflow: hidden;
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
