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
            <img class="bg-img" :class="{rotation: !playing}" :src="circleImg">
            <img v-if="!circleImg" :class="{rotation: !playing}" class="bg-img" src="~common/image/disc.png">
          </div>
        </div>
        <div class="contain-bottom">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xihuan"></use>
            </svg>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-iconset0425"></use>
            </svg>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pinglun"></use>
            </svg>
          </div>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gengduoxiao"></use>
            </svg>
          </div>
        </div>
        <div class="progress"></div>
        <div class="actions">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-suijibofang"></use>
            </svg>
          </div>
          <div @click="preSong">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
          </div>
          <div @click="togglePlaying" class="playing">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="playIco"></use>
            </svg>
          </div>
          <div @click="nextSong">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
          </div>
          <div @click="openPlayLists">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gengduo"></use>
            </svg>
          </div>
        </div>
        <transition name="topSlide">
          <div v-if="playListShow" class="play-lists">
            <div class="list-title">
              <div class="title-left">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xunhuanbofang"></use>
                </svg>
                <span>{{playMode}} ({{listNumber}})</span>
              </div>
              <div class="title-right">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shoucang"></use>
                </svg>
                <span>收藏全部</span>
                <svg class="icon clear-all" aria-hidden="true" @click="_clearAll">
                  <use xlink:href="#icon-lajitong"></use>
                </svg>
              </div>
            </div>
            <scroll :data="playList" :scrollToSong="currentIndex" class="scroll-container">
              <ul>
                <li class="text-ellipsis-one-line" :class="{redColor:index === currentIndex}"
                    v-for="(item,index) of playList" :key="index" ref="playList">
                  <svg v-if="index === currentIndex" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-faxian2"></use>
                  </svg>
                  {{item.name}}
                  <span v-for="(names, index) of item.artists" :key="index">-{{names.name}}</span>
                  <i @click="deleteSong(index)">删除</i>
                </li>
              </ul>
            </scroll>
            <div class="close" @click="closePlayList">关闭</div>
          </div>
        </transition>
        <div v-show="playListShow" class="play-list-mask" @click="closePlayList"></div>
      </div>
      <audio autoplay :src="currentSongUrl" ref="audio" @ended="end" @canplay="ready"></audio>
    </div>
  </transition>
</template>

<script>
import TopTitle from 'baseComponent/topTitle/topTitle'
import { mapGetters, mapMutations } from 'vuex'
import Scroll from 'baseComponent/scroll/scroll'
import { getSong, getSongUrl } from 'common/api/discover'
import { ERR_OK } from 'common/js/config'

export default {
  name: 'playInterface',
  components: { Scroll, TopTitle },
  data () {
    return {
      playListShow: false,
      playMode: '列表循环',
      songDetail: {},
      currentSongUrl: '',
      songReady: false,
      playIco: '#icon-bofang'
    }
  },
  mounted () {
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
    deleteSong (index) {
      this.deletePlayList(index)
      if (index === this.currentIndex) {
        this._getSongUrl(this.currentSongId)
        this._getSong()
      } else if (index < this.currentIndex) {
        this.setCurrentIndex(index - 1)
      }
    },
    _clearAll () {
      this.clearAll([])
    },
    _getSong () {
      this.songId = this.currentSongId
      getSong([this.songId]).then(res => {
        if (res.data.code === ERR_OK) {
          this.songDetail = res.data.songs[0]
        }
      })
    },
    _getSongUrl (id) {
      getSongUrl(id).then(res => {
        if (res.data.code === ERR_OK) {
          this.currentSongUrl = res.data.data[0].url
        }
      })
    },
    togglePlaying () {
      const audio = this.$refs.audio
      this.setPlaying(!this.playing)
      this.playing ? audio.play() : audio.pause()
    },
    ready () {
      this.songReady = true
    },
    // 播放结束自动下一首歌
    end () {
      this.nextSong()
    },
    loop () {
      this.$refs.audio.play()
    },
    nextSong () {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loop()
        return
      } else {
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
      this.songReady = false
    },
    preSong () {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loop()
        return
      } else {
        let index = this.currentIndex - 1
        if (index < 0) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
      this.songReady = false
    },
    playSong (index) {
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      playHide: 'SHOW_PLAY',
      deletePlayList: 'DEL_PLAY_LIST',
      clearAll: 'SET_PLAY_LIST',
      setPlaying: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  },
  computed: {
    bgStyle () {
      if (this.songDetail.al) {
        return `background-image: url(${this.circleImg})`
      } else {
        return 'background-image: url("")'
      }
    },
    circleImg () {
      if (this.songDetail.al) {
        return this.songDetail.al.picUrl
      }
    },
    listNumber () {
      return this.playList.length
    },
    ...mapGetters(['showPlay', 'playList', 'currentIndex', 'currentSongId', 'playing'])
  },
  watch: {
    currentIndex () {
      const audio = this.$refs.audio
      this._getSongUrl(this.currentSongId)
      if (this.songReady) {
        audio.play()
        this.songReady = false
      }
      setTimeout(() => {
        this._getSong()
      }, 600)
    },
    playing () {
      if (this.playing) {
        this.playIco = '#icon-suspend_icon'
      } else {
        this.playIco = '#icon-bofang'
      }
    }
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
    transition: all 1.5s;
    animation: ease-in-out 1.5s;
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
    font-size: 24px;
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
      animation: rotation 8s linear infinite;
    }
    img.rotation{
      animation-play-state: paused;
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
    font-size: 26px;
    position: absolute;
    bottom: 30px;
    left: 0;
    color: #ffffff;
    .playing{
      font-size: 50px;
    }
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
      margin-left: 15px;
      position: relative;
      padding-right: 20%;
      span{
        font-size: $font-size-sm;
        color: $play-list-gray-font;
      }
      i{
        position: absolute;
        right: 10px;
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
    .redColor{
      color: $background-r-color;
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
