<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="discover">
    <!--顶部红色背景-->
    <div class="red-bc-color top-red"></div>
    <!--轮播图部分-->
    <div class="swiper-area">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item, i) in banner" :key="i"><img :src="item.picUrl" alt=""></swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <!--导航列表-->
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
          <div class="img-out" @click="songsList(item.id)">
            <div class="play-number">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-z"></use>
              </svg>
              <span>{{item.playCount}}</span>
            </div>
            <div class="gradients"></div>
            <img v-lazy="item.picUrl" alt="">
          </div>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getBanner, getPersonalized } from 'common/api/discover'
import { playExchange } from 'common/js/playExchange'
import { ERR_OK } from 'common/js/config'

export default {
  name: 'musicDiscover',
  components: {
    swiper,
    swiperSlide
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
      personalized: []
    }
  },
  mounted () {
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
    songsList (id) {
      this.$router.push(`/musicDiscover/${id}`)
    }
  }
}
</script>
<style scoped lang="scss">
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
          font-size: 12px;
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
    height: auto;
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
        font-size: 12px;
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
            font-size: 16px;
            height: auto;
            width: auto;
            right: 10px;
            .icon{
              vertical-align: middle;
            }
            span{
              font-size: 10px;
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
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin-top: 5px;
          margin-bottom: 15px;
          padding-right: 1px;
        }
      }
    }
  }
</style>
