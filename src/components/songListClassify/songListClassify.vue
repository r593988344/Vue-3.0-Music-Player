<template>
  <div class="router-music-list">
    <div class="back-to">
        <span class="back" @click="back">
          Back
        </span>
      <div class="title-scroll">
        <div>歌单广场</div>
      </div>
    </div>
    <div class="tabs">
      <Scroll :scrollX="scrollX">
        <ul ref="tabs">
          <li v-for="(item,i) of tabs" :key="i" @click="tabTitle(i)" :class="{active:index === i}">{{item}}</li>
        </ul>
      </Scroll>
    </div>
    <scroll>
      <song-group-list :songList="songList" :songPath="songPath"></song-group-list>
    </scroll>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getTopList, getCompetitive } from 'common/api/discover'
import SongGroupList from 'baseComponent/songGroupList/songGroupList'
import Scroll from 'baseComponent/scroll/scroll'

export default {
  name: 'songList',
  data () {
    return {
      songList: [],
      scrollX: true,
      tabs:['推荐', '精品', '华语', '流行', '民谣', '摇滚', '电子'],
      index: 0,
      songPath: '/songListClassify'
    }
  },
  components: {
    Scroll,
    SongGroupList
  },
  mounted () {
    this._getTopList('华语')
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    _getTopList (type) {
      getTopList(type).then(res => {
        this.songList = res.data.playlists
      })
    },
    _getCompetitive (timer) {
      getCompetitive(timer).then(res => {
        this.songList = res.data.playlists
      })
    },
    tabTitle (i) {
      switch (i) {
      case 0: this._getTopList('华语')
        break
      case 1: this._getCompetitive()
        break
      }
      this.index = i
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~common/scss/common.scss";
  @import "~common/scss/variable.scss";
  .back-to .back {
    color: #000;
  }

  .title-scroll {
    color: #000;
  }
  .tabs{
    border-bottom: 1px solid $font-color-gray;
    overflow: hidden;
    margin-bottom: 10px;
    .active{
      border-bottom: 2px solid $background-r-color;
    }
    ul{
      display: block;
      width: 430px;
      overflow: hidden;
      li{
        float: left;
        font-size: $font-size-md;
        font-weight: bolder;
        width: 40px;
        padding: 0 5px;
        line-height: 34px;
        margin: 0 10px;
      }
    }
  }
</style>
