<!-- The ref attr used to find the swiper instance -->
<template>
  <div>
    <div class="red-bc-color top-red"></div>
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
        mousewheel: true,
        autoplay: true,
        loop: true,
        disableOnInteraction: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        init: true
      }
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
  .swiper-area{
    border-radius: 40px;
    height: 140px;
    width: 90%;
    margin-left: 50%;
    transform: translateX(-50%);
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
    position: absolute;
  }
</style>
