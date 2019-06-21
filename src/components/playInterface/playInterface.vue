<template>
  <transition name="fade">
    <div v-show="showPlay" class="play-song" @touchstart.once="firstPlay">
      <top-title :titleName="currentSong.name" @back="back"></top-title>
      <div class="play-bg">
        <img :src="circleImg" alt="">
      </div>
      <div class="mask"></div>
      <div class="play-container">
        <div class="container">
          <div class="play-circle">
            <img class="bg-img" :class="{rotation: !playing}" :src="circleImg">
          </div>
        </div>
        <div class="player-control">
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
          <progress-bar :currentTime="currentTime" :duration="duration" :percent="percent" @changePercent="changePercent"></progress-bar>
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
                <use :xlink:href="playIcon"></use>
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
                    v-for="(item,index) of playList" :key="index" ref="playList" @click="playSong(index)">
                  <svg v-if="index === currentIndex" class="icon laba" aria-hidden="true">
                    <use xlink:href="#icon-laba"></use>
                  </svg>
                  {{item.name}}
                  <span v-for="(names, index) of item.artists" :key="index">-{{names.name}}</span>
                  <i @click.stop="deleteSong(index)">
                    <svg class="icon cancel" aria-hidden="true">
                      <use xlink:href="#icon-cancel-1-copy"></use>
                    </svg>
                  </i>
                </li>
              </ul>
            </scroll>
            <div class="close" @click="closePlayList">关闭</div>
          </div>
        </transition>
        <div v-show="playListShow" class="play-list-mask" @click="closePlayList"></div>
      </div>
      <audio id="music-audio" autoplay ref="audio" @ended="end" @canplay="ready" @timeupdate="timeupdate"></audio>
    </div>
  </transition>
</template>

<script>
import TopTitle from 'baseComponent/topTitle/topTitle'
import { mapGetters, mapMutations } from 'vuex'
import Scroll from 'baseComponent/scroll/scroll'
import { getSongUrl } from 'common/api/discover'
import { ERR_OK } from 'common/js/config'
import ProgressBar from 'baseComponent/progressBar/progressBar'

export default {
  name: 'playInterface',
  components: { Scroll, TopTitle, ProgressBar },
  data () {
    return {
      playListShow: false,
      playMode: '列表循环',
      currentSongUrl: '',
      songReady: false,
      // 播放进度
      currentTime: 0,
      // 歌曲总时长
      duration: 0,
      // 歌曲播放比例
      percent: 0,
      touching: false,
      circleImg: ''
    }
  },
  mounted () {
    this.touching = false
  },
  methods: {
    firstPlay () {
      let audio = this.$refs.audio
      audio.play()
    },
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
        this._getSong(this.currentSong.id)
      } else if (index < this.currentIndex) {
        this.setCurrentIndex(this.currentIndex - 1)
      }
    },
    timeupdate (e) {
      if (!this.touching) {
        this.currentTime = e.target.currentTime
      }
    },
    _clearAll () {
      this.clearAll([])
    },
    _getSong (songId) {
      getSongUrl(songId).then(res => {
        if (res.data.code === ERR_OK) {
          this.currentSongUrl = res.data.data[0].url
        }
      })
    },
    togglePlaying () {
      const audio = this.$refs.audio
      if (this.playList.length > 0) {
        this.setPlaying(!this.playing)
        this.playing ? audio.play() : audio.pause()
      }
    },
    ready () {
      this.songReady = true
    },
    // 播放结束自动下一首歌
    end () {
      this.nextSong()
    },
    loop () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
    },
    nextSong () {
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
      this.setPlaying(true)
    },
    changePercent (percent, touching) {
      this.touching = touching
      const currentTime = this.duration * percent
      this.currentTime = currentTime
      if (!touching) {
        this.$refs.audio.currentTime = currentTime
      }
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
    listNumber () {
      return this.playList.length
    },
    playIcon () {
      return this.playing ? '#icon-suspend_icon' : '#icon-bofang'
    },
    ...mapGetters(['showPlay', 'playList', 'currentIndex', 'currentSong', 'playing'])
  },
  watch: {
    currentSong (newSong, oldSong) {
      this.circleImg = newSong.song ? newSong.song.album.picUrl : newSong.album.picUrl
      const audio = this.$refs.audio
      if (!newSong.id) {
        return
      }
      if (newSong.id === oldSong.id) {
        return
      }
      audio.currentTime = 0
      this._getSong(newSong.id)
    },
    currentSongUrl () {
      const audio = this.$refs.audio
      audio.pause()
      audio.src = this.currentSongUrl
      // 判断歌曲是否加载完成
      let stop = setInterval(() => {
        this.duration = audio.duration
        if (this.duration) {
          clearInterval(stop)
        }
      }, 150)
      this.setPlaying(true)
    },
    currentTime () {
      this.percent = Math.floor(this.currentTime) / Math.floor(this.duration)
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
.fade-enter,.fade-leave-to{
  opacity: 0;
}
.fade-enter-to,.fade-leave{
  opacity: 1;
}
.fade-enter-active,.fade-leave-active{
  transition: all 0.5s;
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
  overflow: hidden;
  .play-bg{
    width: 300%;
    height: 100%;
    z-index: -1;
    opacity: 0.8;
    filter: blur(30px);
    img{
      width: 100%;
      height: 100%;
    }
  }
  .mask{
    height: 100%;
    background-color: #000;
    opacity: 0.2;
    position: fixed;
    top: 0;
    bottom: 0;
  }
}
.play-container{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  .player-control{
    height: calc(50% - 60px);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .container{
    margin-top: 60px;
    height: 50%;
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
    width: 70%;
    height: 0;
    padding-bottom: 70%;
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
      line-height: 40px;
      position: absolute;
      bottom: 0;
      left: 0;
      padding-bottom: 8px;
      background-color: #ffffff;
      border-top: 1px solid $border-bottom-gray;
    }
  }
  .scroll-container{
    height: calc(100% - 90px);
    overflow: hidden;
    .redColor{
      color: $background-r-color;
      .cancel{
        color: $background-r-color;
      }
      span{
        color: $background-r-color;
      }
    }
    .laba{
      font-size: $font-size-md;
    }
    .cancel{
      color: $song-list-gray-font;
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
