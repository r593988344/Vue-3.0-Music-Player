<template>
  <transition name="slide">
    <div class="router-music-list">
      <top-title :titleName="titleName"></top-title>
      <!--      // 吸顶播放-->
      <div v-show="playTopShow" class="play playTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-z"></use>
        </svg>
        <span class="play-all">播放全部<i>(共{{trackCount}}首)</i></span>
      </div>
      <!--      头部背景-->
      <div class="bg-img" ref="bgImg">
        <div class="dim-bg" alt="" :style="topBgImg"></div>
      </div>
      <!--       滚动区域-->
      <scroll
              :data="songLists"
              @scroll="scroll"
              :listen-scroll="listenScroll"
              :probeType="probeType">
        <div class="flex-contain">
          <div class="business-card">
            <div>{{updateTimes}}</div>
          </div>
          <!--          歌曲列表-->
          <song-list :songLists="songLists" :rank="rank">
            <div v-show="!playTopShow"  class="play" ref="play">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-z"></use>
              </svg>
              <span class="play-all">播放全部<i>(共{{trackCount}}首)</i></span>
            </div>
          </song-list>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import { getPersonalizedDetail } from 'common/api/discover'
import { ERR_OK } from 'common/js/config'
import Scroll from '@/baseComponent/scroll/scroll'
import SongList from '@/baseComponent/songList/songList'
import TopTitle from 'baseComponent/topTitle/topTitle'
import { mapGetters } from 'vuex'
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
      titleName: '排行榜',
      trackCount: 0,
      rank: true
    }
  },
  mounted () {
    // 获取初始播放按钮距离顶部高度
    this.playTop = this.$refs.play.offsetTop + 1
    // 获取头部虚化图片高度
    this.bgImgHeight = this.$refs.bgImg.clientHeight
    this._getPersonalizedDetail()
    console.log(this.musicList)
  },
  methods: {
    // 返回上一级
    back () {
      this.$router.go(-1)
    },
    // 获取滚动坐标
    scroll (pos) {
      let posY = pos.y
      posY >= 0 && (this.$refs.bgImg.style.height = (this.bgImgHeight + posY) + 'px')
      this.floatingCover(posY, this.playTop)
    },
    // 滑动吊顶
    floatingCover (posY, offsetTop) {
      if (-posY >= offsetTop) {
        this.playTopShow = true
      } else {
        this.playTopShow = false
      }
    },
    _getPersonalizedDetail () {
      getPersonalizedDetail(this.musicList.id).then(res => {
        if (res.data.code === ERR_OK) {
          this.songLists = res.data.result.tracks
          this.trackCount = res.data.result.trackCount
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'musicList'
    ]),
    topBgImg () {
      return `background-image:url(${this.musicList.coverImgUrl})`
    },
    updateTimes () {
      let date = new Date(this.musicList.updateTime)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      return `最近更新:${y}年${m}月${d}日`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable.scss";
  @import "~common/scss/common.scss";
  .router-music-list{
    .bg-img{
      position: fixed;
      height: 260px;
      z-index: -1;
      top: 0;
      left: 0;
      overflow: hidden;
      .dim-bg{
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-size:cover;
        background-position:center top;
      }
    }
    .business-card{
      color: #ffffff;
      text-align: left;
      height: 200px;
      font-size: $font-size-sm;
      position: relative;
      >div{
        position: absolute;
        bottom: 10px;
        left: 10px;
      }
    }
  }
</style>
