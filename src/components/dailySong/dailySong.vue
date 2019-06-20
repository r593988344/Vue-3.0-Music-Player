<template>
  <transition name="slide">
    <div class="router-music-list">
     <top-title @back="back"></top-title>
    <!--  &lt;!&ndash;      // 吸顶播放&ndash;&gt;
      <div v-show="playTopShow" class="play playTop" @click="playAll">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span class="play-all">播放全部</span>
      </div>-->
      <!--      头部背景-->
      <div class="bg-img" ref="bgImg">
        <div class="dim-bg" alt="" style="width: 100%;height: 100%;"></div>
      </div>
      <!--       滚动区域-->
      <scroll class="song-list-scroll"
              :data="songLists"
              @scroll="scroll"
              :listen-scroll="listenScroll"
              :probeType="probeType">
        <div class="flex-contain">
          <div class="business-card">
            <div><span>{{nowDate.day }}</span>/{{nowDate.month }}</div>
            <p>根据你的音乐口味，为你推荐好音乐、好朋友</p>
          </div>
          <!--          歌曲列表-->
          <song-list :songLists="songLists">
            <div v-show="!playTopShow" class="play" ref="play" @click="playAll">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              <span class="play-all">播放全部</span>
            </div>
          </song-list>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import { getDailySong } from 'common/api/discover'
import { ERR_OK } from 'common/js/config'
import Scroll from '@/baseComponent/scroll/scroll'
import SongList from '@/baseComponent/songList/songList'
import TopTitle from 'baseComponent/topTitle/topTitle'
import { mapActions } from 'vuex'

export default {
  name: 'dailySong',
  components: {
    TopTitle,
    Scroll,
    SongList
  },
  data () {
    return {
      // 歌曲列表数据
      songLists: [],
      probeType: 3,
      listenScroll: true,
      playTopShow: false,
      bgImgHeight: null,
      nowDate: {
        day: '',
        month: ''
      }
    }
  },
  mounted () {
    this._getDailySong()
    // 获取初始播放按钮距离顶部高度
    // this.playTop = this.$refs.play.offsetTop + 1
    // 获取头部虚化图片高度
    this.bgImgHeight = this.$refs.bgImg.clientHeight
    this.nowDate.day = new Date().getDate()
    this.nowDate.month = new Date().getMonth() + 1
  },
  methods: {
    // 返回上一级
    back () {
      this.$router.go(-1)
    },
    playAll () {
      if (this.songLists.length > 0) {
        this.selectPlay({ list: this.songLists, index: 0 })
      }
    },
    // 获取滚动坐标
    scroll (pos) {
      let posY = pos.y
      posY >= 0 && (this.$refs.bgImg.style.height = (this.bgImgHeight + posY) + 'px')
      // this.floatingCover(posY, this.playTop)
    },
    /* // 滑动吊顶
    floatingCover (posY, offsetTop) {
      if (-posY >= offsetTop) {
        this.playTopShow = true
      } else {
        this.playTopShow = false
      }
    },*/
    _getDailySong () {
      getDailySong().then(res => {
        if (res.data.code === ERR_OK) {
          this.songLists = res.data.result
        }
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable.scss";
  @import "~common/scss/common.scss";
  .router-music-list{
    .song-list-scroll{
      height: calc(100% - 60px);
      overflow: hidden;
      .flex-contain{
        padding-bottom: 0px;
      }
    }
    .bg-img{
      position: fixed;
      height: 140px;
      z-index: -1;
      top: 0;
      left: 0;
      overflow: hidden;
      .dim-bg{
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: url("~common/image/test.png");
        background-size:cover;
        background-position:center top;
      }
    }
    .wrapper{
      height: calc(100% - 60px);
      overflow: hidden;
    }
    .business-card{
      color: #ffffff;
      text-align: left;
      padding-bottom: 20px;
      span{
        padding-left: 10px;
        font-size: 22px;
      }
      p{
        font-size: $font-size-sm;
        padding-left: 10px;
      }
    }
  }
  .play{
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    background-color: #ffffff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    .play-all{
      font-size: $font-size-lg;
      font-weight: bold;
      padding-left: 10px;
      line-height: 40px;
      display: flex;
      align-items: center;
    }
    .icon{
      font-size: 20px;
      float: left;
    }
  }
</style>
