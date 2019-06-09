<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="discover">
    <!--顶部红色背景-->
    <div class="red-bc-color top-red"></div>
    <!--轮播图部分-->
    <div class="swiper-area">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide><img src="~common/image/swiper1.png" alt=""></swiper-slide>
        <swiper-slide><img src="~common/image/swiper2.png" alt=""></swiper-slide>
        <swiper-slide><img src="~common/image/swiper3.png" alt=""></swiper-slide>
        <swiper-slide><img src="~common/image/swiper4.png" alt=""></swiper-slide>
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
        <div class="playList">
          <div class="img-out">
            <img src="~common/image/playList1.jpg" alt="">
          </div>
          <p>来杯彩色汽水！论如何优雅的度过夏天</p>
        </div>
        <div class="playList">
          <div class="img-out">
            <img src="~common/image/playList1.jpg" alt="">
          </div>
          <p>来杯彩色汽水！论如何优雅的度过夏天</p>
        </div>
        <div class="playList">
          <div class="img-out">
            <img src="~common/image/playList1.jpg" alt="">
          </div>
          <p>来杯彩色汽水！论如何优雅的度过夏天</p>
        </div>
        <div class="playList">
          <div class="img-out">
            <img src="~common/image/playList1.jpg" alt="">
          </div>
          <p>来杯彩色汽水！论如何优雅的度过夏天</p>
        </div>
        <div class="playList">
          <div class="img-out">
            <img src="~common/image/playList1.jpg" alt="">
          </div>
          <p>来杯彩色汽水！论如何优雅的度过夏天</p>
        </div>
        <div class="playList">
          <div class="img-out">
            <img src="~common/image/playList1.jpg" alt="">
          </div>
          <p>来杯彩色汽水！论如何优雅的度过夏天</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
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
      }
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
  .discover{
    background-color: #fff;
  }
  .swiper-area{
    border-radius: 40px;
    height: 130px;
    width: 90%;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: -50px;
    .swiper-container{
      border-radius: 10px;
    }
    .swiper-pagination{
      height: 20px;
      bottom: 0;
    }
  }
  .top-red{
    height: 50px;
  }
  .guide-lists{
    height: 100px;
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
        .img-out{
          img{
            border-radius: 6px;
          }
        }
        p{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin-top: 5px;
          margin-bottom: 15px;
        }
      }
    }
  }
</style>
