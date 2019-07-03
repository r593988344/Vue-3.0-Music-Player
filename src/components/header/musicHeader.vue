<template>
    <div class="m-header red-bg-color">
      <svg class="icon icon-voice" aria-hidden="true">
        <use xlink:href="#icon-yuyin"></use>
      </svg>
      <form action="">
        <svg class="icon icon-search" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <throttle>
          <input class="search-input" type="text" placeholder="请输入要搜索的歌曲" @input="inputs">
        </throttle>
      </form>
      <img :class="{redBg: redBg}" v-show="!showPlay && playList.length && playing > 0" src="~common/image/music.svg" alt="" style="width: 30px;height: 30px;" @click="_showPlay">
      <img v-show="!showPlay && playList.length > 0 && !playing" src="~common/image/staticMusic.svg" alt="" style="width: 30px;height: 30px;" @click="_showPlay">
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Debounce from 'common/js/debounce'
import Throttle from 'common/js/throttle'
export default {
  name: 'musicHeader',
  components: { Throttle, Debounce },
  data () {
    return {
    }
  },
  methods: {
    _showPlay () {
      this.showPlays(true)
    },
    inputs () {
      console.log('click')
    },
    ...mapMutations({
      showPlays: 'SHOW_PLAY'
    })
  },
  computed: {
    ...mapGetters([
      'showPlay',
      'playList',
      'playing'
    ]),
    redBg () {
      if (this.$route.path === '/musicDiscover/songListClassify') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-header{
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  img{
    z-index: 9999;
  }
  .redBg{
    background-color: #ff0000;
    border-radius: 5px;
  }
  form{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    position: relative;
    .search-input{
      border: 0px solid #000;
      border-radius: 20px;
      font-size: 70%;
      width: 100%;
      height: 30px;
      display: inline-block;
      padding-left: 50px;
      background-color: #ca564c;
    }
    .search-input::placeholder{
      color: #e2e2e2;
    }
  }
  .icon-voice{
    width: 10%;
    color: #ffffff;
    float: left;
  }
  .icon-playing{
    float: right;
    width: 10%;
    color: #ffffff;
  }
  .icon-search{
    position: absolute;
    left: 15px;
    color: #e2e2e2;
    font-weight: bolder;
  }
}
</style>
