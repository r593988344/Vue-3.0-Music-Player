<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="discover">
    <scroll
      class="scroll-contain"
      :click="click"
      :data="personalized">
      <div>
        <!--顶部红色背景-->
        <div class="red-bg-color top-red"></div>
        <!--轮播图部分-->
        <div v-if="banner.length">
          <slider>
            <div v-for="(item, i) in banner" :key="i">
              <a :href="item.url">
                <img :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <!--     导航列表-->
        <div class="guide-lists">
          <ul>
            <li @click="toDaily">
              <div class="circle-bg red-bg-color">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-rili"></use>
                </svg>
              </div>
              <span>每日推荐</span>
            </li>
            <li @click="toSongList">
              <div class="circle-bg red-bg-color">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-musicyinle"></use>
                </svg>
              </div>
              <span>歌单</span>
            </li>
            <li @click="toRankingList">
              <div class="circle-bg red-bg-color">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-paixingbang"></use>
                </svg>
              </div>
              <span>排行榜</span>
            </li>
            <li>
              <div class="circle-bg red-bg-color">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-faxian2"></use>
                </svg>
              </div>
              <span>电台</span>
            </li>
            <li>
              <div class="circle-bg red-bg-color">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-icon_zhibo-xian"></use>
                </svg>
              </div>
              <span>直播</span>
            </li>
          </ul>
        </div>
        <h2>推荐歌单</h2>
        <song-group-list :songList="personalized" :songPath="songPath"></song-group-list>
      </div>
      <div class="loading-container" v-show="!personalized.length">
        <loading></loading>
      </div>
    </scroll>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPersonalized } from 'common/api/discover'
import { ERR_OK } from 'common/js/config'
import Slider from 'baseComponent/slider/slider'
import Scroll from 'baseComponent/scroll/scroll'
import Loading from 'baseComponent/loading/loading'
import SongGroupList from 'baseComponent/songGroupList/songGroupList'
export default {
  name: 'musicDiscover',
  components: {
    Slider,
    Scroll,
    Loading,
    SongGroupList
  },
  data () {
    return {
      swiperOption: {
        initialSlide: 0,
        direction: 'horizontal',
        slidesPerView: 1,
        autoplay: {
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      // 轮播图
      banner: [],
      // 推荐歌单
      personalized: [],
      click: true,
      songPath: ''
    }
  },
  created () {
    // 刷新页面后重定向到首页
    if (this.$router.path !== '/musicDiscover') {
      this.$router.replace('/musicDiscover')
    }
    this._getBanner()
    this._getPersonalized()
  },
  methods: {
    _getBanner () {
      getBanner().then(res => {
        if (res.data.code === ERR_OK) {
          let list = res.data.banners
          this.banner = list
        }
      })
    },
    _getPersonalized () {
      getPersonalized().then(res => {
        if (res.data.code === ERR_OK) {
          let list = res.data.result
          this.personalized = list
        }
      })
    },
    toDaily () {
      this.$router.push('/musicDiscover/dailySong')
    },
    toSongList () {
      this.$router.push('/musicDiscover/songListClassify')
    },
    toRankingList () {
      this.$router.push('/musicDiscover/rankingList')
    }
  }
}
</script>
<style scoped lang="scss">
  @import "~common/scss/variable.scss";
  @import "~common/scss/common.scss";
  h2{
    text-align: left;
    margin-left: 10px;
    font-weight: bold;
  }
  .scroll-contain{
    height: 100%;
    overflow: hidden;
    .loading-container{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .discover{
    background-color: #fff;
  }
  .swiper-area{
    height: 120px;
    width: 90%;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: -40px;
    img{
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
    .swiper-container{
      border-radius: 10px;
    }
    .swiper-pagination{
      height: 20px;
      bottom: 0;
    }
  }
  .top-red{
    height: 44px;
  }
  .guide-lists{
    height: 110px;
    padding-top: 20px;
    border-bottom: 1px solid rgb(221, 221, 240);
    ul{
      display: flex;
      align-items: center;
      justify-content: space-around;
      li{
        width: auto;
        display: inline-block;
        span{
          font-size: $font-size-sm;
          line-height: 34px;
          display: inline-block;
        }
      }
    }
    .circle-bg{
      width: 44px;
      height: 44px;
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      color: #ffffff;
    }
  }

</style>
