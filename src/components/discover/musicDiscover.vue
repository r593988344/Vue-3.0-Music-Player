<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="discover">
    <scroll
      class="scroll-contain"
      :click="click"
      :data="personalized">
      <div>
        <!--顶部红色背景-->
        <div class="red-bc-color top-red"></div>
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
            <li>
              <div class="circle-bg red-bc-color">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-rili"></use>
                </svg>
              </div>
              <span>每日推荐</span>
            </li>
            <li>
              <div class="circle-bg red-bc-color">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-musicyinle"></use>
                </svg>
              </div>
              <span>歌单</span>
            </li>
            <li>
              <div class="circle-bg red-bc-color">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-paixingbang"></use>
                </svg>
              </div>
              <span>排行榜</span>
            </li>
            <li>
              <div class="circle-bg red-bc-color">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-faxian2"></use>
                </svg>
              </div>
              <span>电台</span>
            </li>
            <li>
              <div class="circle-bg red-bc-color">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-icon_zhibo-xian"></use>
                </svg>
              </div>
              <span>直播</span>
            </li>
          </ul>
        </div>
        <!--推荐歌单-->
        <div class="recommend">
          <h2>推荐歌单</h2>
          <div class="recommend-lists">
            <div class="playList" v-for="(item, index) of personalized" :key="index">
              <div class="img-out" @click="songsList(item.id, item)">
                <div class="play-number">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-z"></use>
                  </svg>
                  <span>{{item.playCount}}</span>
                </div>
                <div class="gradients"></div>
                <img v-lazy="item.picUrl" alt="">
              </div>
              <p class="text-ellipsis-two-line">{{item.name}}</p>
            </div>
          </div>
        </div>
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
import { mapMutations } from 'vuex'
import { playExchange } from 'common/js/playExchange'
import { ERR_OK } from 'common/js/config'
import Slider from 'baseComponent/slider/slider'
import Scroll from 'baseComponent/scroll/scroll'
import Loading from 'baseComponent/loading/loading'
export default {
  name: 'musicDiscover',
  components: {
    Slider,
    Scroll,
    Loading
  },
  data () {
    return {
      swiperOption: {
        initialSlide: 0,
        direction: 'horizontal',
        slidesPerView: 1,
        // mousewheel: true,
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
      click: true
    }
  },
  created () {
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
          list.forEach(item => {
            item.playCount = playExchange(item.playCount)
          })
          this.personalized = list
        }
      })
    },
    songsList (id, musicList) {
      this.$router.push(`/musicDiscover/${id}`)
      this.setMuiscList(musicList)
    },
    ...mapMutations({
      setMuiscList: 'SET_MUSIC_LIST'
    })
  }
}
</script>
<style scoped lang="scss">
  @import "~common/scss/variable.scss";
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
  .slide-enter-active, .slide-leave-active {
    transition: all 0.2s
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(30%, 0, 0);
    opacity: 0;
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
  .recommend{
    h2{
      text-align: left;
      margin-left: 10px;
      font-weight: bold;
    }
    .recommend-lists{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 10px;
      .playList{
        width: 32%;
        font-size: $font-size-sm;
        overflow: hidden;
        text-align: left;
        .img-out{
          position: relative;
          .gradients{
            position: absolute;
            top: 0;
            width: 100%;
            height: 35px;
            border-radius: 3px;
            background: linear-gradient(hsla(0, 0%, 64%, 0.4),hsla(0,0%,100%,0));
          }
          .play-number{
            position: absolute;
            color: #ffffff;
            font-size: $font-size-lg;
            width: auto;
            right: 10px;
            .icon{
              vertical-align: middle;
            }
            span{
              font-size: $font-size-smm;
              margin-left: -5px;
            }
          }
          img{
            border-radius: 6px;
            width: 100%;
            height: 100%;
          }
        }
        p{
          display: -webkit-box;
          margin-top: 5px;
          margin-bottom: 15px;
          padding-right: 1px;
        }
      }
    }
  }
</style>
