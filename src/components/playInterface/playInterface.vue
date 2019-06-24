<template>
  <transition name="fade">
    <div v-show="showPlay" class="play-song" @touchstart.once="firstPlay">
      <top-title :titleName="currentSong.name" @back="back"></top-title>
      <div class="play-bg">
        <transition name="fade1" @after-leave="afterLeave">
          <img v-show="nowPic" :src="circleImg" alt="">
        </transition>
      </div>
      <div class="mask"></div>
      <div class="play-container">
        <div class="container" @click.stop="wordsControl">
          <transition name="fade2">
            <div class="play-circle" v-show="!showWords">
              <img class="bg-img" :class="{rotation: !playing}" :src="circleImg">
              <img class="bg-img" v-if="!circleImg" :class="{rotation: !playing}" src="~common/image/disc.png">
            </div>
          </transition>
          <transition name="fade2">
              <div class="song-words" v-show="showWords" @click.stop="wordsControl">
                <scroll v-if="currentLyrics" :data="currentLyrics.lines" ref="lyricLists">
                  <div ref="lyricLines">
                    <p v-for="(words,index) of currentLyrics.lines" :key="index" :class="{currentLine: currentLineNumber === index}">{{words.txt}}</p>
                  </div>
                </scroll>
              </div>
          </transition>
        </div>
        <div class="player-control">
          <div class="contain-bottom" :class="{showWord: showWords}">
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
            <div @click="changeMode">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="modeIcon"></use>
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
                <svg class="icon" aria-hidden="true" @click="changeMode">
                  <use :xlink:href="modeIcon"></use>
                </svg>
                <span>{{modeDescription}} ({{listNumber}})</span>
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
                  <span v-for="(names, index) of item.ar" :key="index">-{{names.name}}</span>
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
      <audio id="music-audio" autoplay ref="audio" @ended="end" @canplay="ready" @timeupdate="timeUpdate"></audio>
    </div>
  </transition>
</template>

<script>
import TopTitle from 'baseComponent/topTitle/topTitle'
import { mapGetters, mapMutations } from 'vuex'
import Scroll from 'baseComponent/scroll/scroll'
import { getSongUrl, getLyrics } from 'common/api/discover'
import { ERR_OK, playMode } from 'common/js/config'
import { breakArray } from 'common/js/tool'
import ProgressBar from 'baseComponent/progressBar/progressBar'
import Lyric from 'lyric-parser'

export default {
  name: 'playInterface',
  components: { Scroll, TopTitle, ProgressBar },
  data () {
    return {
      playListShow: false,
      currentSongUrl: '',
      songReady: false,
      // 播放进度
      currentTime: 0,
      // 歌曲总时长
      duration: 0,
      // 歌曲播放比例
      percent: 0,
      touching: false,
      circleImg: '',
      nowPic: true,
      showWords: false,
      currentLineNumber: 0,
      currentLyrics: null
    }
  },
  mounted () {
    this.touching = false
  },
  methods: {
    wordsControl () {
      this.showWords = !this.showWords
      if (this.showWords) {
        let line = this.$refs.lyricLines.children[this.currentLineNumber - 4]
        this.$refs.lyricLists.scrollToElement(line, 0)
      }
    },
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setMode(mode)
    },
    afterLeave () {
      this.nowPic = true
    },
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
    timeUpdate (e) {
      if (!this.touching) {
        if (this.currentLyrics) {
          this.currentLyrics.seek((e.target.currentTime) * 1000)
        }
        this.currentTime = e.target.currentTime
      }
    },
    _clearAll () {
      this.$refs.audio.src = ''
      this.setPlayList([])
      this.playHide(false)
      this.setPlaying(false)
      this.closePlayList()
    },
    _getSong (songId) {
      getSongUrl(songId).then(res => {
        if (res.data.code === ERR_OK) {
          this.currentSongUrl = res.data.data[0].url
          if (!this.currentSongUrl) {
            this.nextSong()
          }
          this._getLyrics(songId)
        }
      })
    },
    _getLyrics (id) {
      getLyrics(id).then(res => {
        if (res.data.code === ERR_OK) {
          let currentLyric = res.data.lrc.lyric
          if (this.currentLyrics) {
            this.currentLyrics.stop()
          }
          this.currentLyrics = new Lyric(currentLyric, this.handleLyric)
          if (this.playing) {
            this.currentLyrics.play()
          }
        }
      })
    },
    handleLyric ({ lineNum, txt }) {
      console.log(lineNum)
      if (!this.showWords) {
        return
      }
      this.currentLineNumber = lineNum
      if (lineNum > 5) {
        let line = this.$refs.lyricLines.children[lineNum - 4]
        this.$refs.lyricLists.scrollToElement(line, 1000)
      } else {
        this.$refs.lyricLists.scrollTo(0, 0, 0)
      }
    },
    togglePlaying () {
      const audio = this.$refs.audio
      if (this.playList.length > 0) {
        this.setPlaying(!this.playing)
        this.playing ? audio.play() : audio.pause()
      }
      if (this.currentLyrics) {
        this.currentLyrics.togglePlay()
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
      if (this.currentLyrics) {
        this.currentLyrics.seek(0)
      }
    },
    nextSong () {
      let index = null
      if (this.playList.length === 1 || this.mode === playMode.loop) {
        this.loop()
        return
      } else {
        if (this.mode === playMode.random) {
          index = breakArray(this.playList.length)
        } else {
          index = this.currentIndex + 1
          if (index === this.playList.length) {
            index = 0
          }
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
      this.songReady = false
    },
    preSong () {
      let index = null
      if (this.playList.length === 1 || this.mode === playMode.loop) {
        this.loop()
        return
      } else {
        if (this.mode === playMode.random) {
          index = breakArray(this.playList.length)
        } else {
          index = this.currentIndex - 1
          if (index < 0) {
            index = this.playList.length - 1
          }
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
      if (!touching && this.currentSong) {
        this.$refs.audio.currentTime = currentTime
      }
    },
    ...mapMutations({
      playHide: 'SHOW_PLAY',
      deletePlayList: 'DEL_PLAY_LIST',
      setPlayList: 'SET_PLAY_LIST',
      setPlaying: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setMode: 'SET_MODE',
      setSequenceList: 'SET_SEQUENCE_LIST'
    })
  },
  computed: {
    listNumber () {
      return this.playList.length
    },
    playIcon () {
      return this.playing ? '#icon-suspend_icon' : '#icon-bofang'
    },
    modeIcon () {
      return this.mode === 0 ? '#icon-xunhuanbofang' : this.mode === 1 ? '#icon-danquxunhuan' : '#icon-suijibofang'
    },
    modeDescription () {
      return this.mode === 0 ? '顺序播放' : this.mode === 1 ? '循环播放' : '随机播放'
    },
    ...mapGetters(['showPlay', 'playList', 'currentIndex', 'currentSong', 'playing', 'sequenceList', 'mode'])
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (this.currentLyrics) {
        this.currentLyrics.stop()
      }
      this.circleImg = newSong.al ? newSong.al.picUrl : newSong.song ? newSong.song.album.blurPicUrl : ''
      this.nowPic = false
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
    showPlay (nowShow) {
      if (nowShow && this.showWords) {
        console.log('show')
        let line = this.$refs.lyricLines.children[this.currentLineNumber - 4]
        this.$refs.lyricLists.scrollToElement(line, 0)
      }
    },
    currentTime (newTime) {
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
.fade2-enter,.fade-leave-to{
  opacity: 0;
}
.fade2-enter-to,.fade-leave{
  opacity: 1;
}
.fade2-enter-active,.fade-leave-active{
  transition: all 1s;
}
.play-list-mask{
  background-color: rgba(0, 0, 0, 0.32);
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.8;
    -webkit-filter: blur(25px);
    -moz-filter: blur(25px);
    -ms-filter: blur(25px);
    filter: blur(25px);
    img{
      width: 100%;
      height: 100%;
    }
  }
  .mask{
    height: 100%;
    position: fixed;
    background-color: rgba(35, 35, 35, 0.55);
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
    justify-content: space-between;
    padding-bottom: 10%;
  }
  .container{
    margin-top: 60px;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .song-words{
      font-size: $font-size-lg;
      padding: 5px 10px;
      height: calc(100% + 60px);
      color: #ffffff;
      line-height: 40px;
      position: absolute;
      top: 0;
      left: 0;
      .currentLine{
        color: $background-r-color;
      }
    }
  }
  .contain-bottom{
    height: 60px;
    display: flex;
    justify-content: space-around;
    color: #ffffff;
    font-size: 24px;
    align-items: center;
    visibility: visible;
    opacity: 1;
    &.showWord{
      visibility: hidden;
      opacity: 0;
      transition:all 0.3s linear;
    }
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
      padding-right: 15px;
      span{
        font-size: $font-size-sm;
        color: $play-list-gray-font;
      }
      i{
        width: 10%;
        height: 100%;
        float: right;
        position: absolute;
        right: 0;
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
