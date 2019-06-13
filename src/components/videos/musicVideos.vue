<template>
  <div class="movie-list">
    <scroll :data="MVlists" @scroll="scroll" @scrollToEnd="scrollToEnd" :probeType="probeType" :listenScroll="listenScroll" :pullup="pullup">
        <div>
          <div v-for="(item, index) of MVlists" :key="index" class="movie">
            <div class="movie-cover"><img v-lazy="item.cover" alt=""></div>
            <div class="text-ellipsis-two-line movie-title">{{item.name}}</div>
          </div>
        </div>
      <div class="loading-container" v-show="isLoading">
        <loading class="scrollUp"></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getMVrank } from 'common/api/discover'
import Scroll from 'baseComponent/scroll/scroll'
import { ERR_OK } from 'common/js/config'
import Loading from 'baseComponent/loading/loading'

export default {
  name: 'videos',
  components: { Scroll, Loading },
  data () {
    return {
      MVlists: [],
      probeType: 3,
      listenScroll: true,
      pullup: true,
      MVnumber: 10,
      isLoading: false,
      timer: null
    }
  },
  mounted () {
    this._getMVrank()
  },
  methods: {
    scrollToEnd () {
      this.MVnumber += 10
      this.isLoading = true
      this._getMVrank(this.MVnumber)
    },
    _getMVrank () {
      clearTimeout(this.timer)
      getMVrank(this.MVnumber).then(res => {
        if (res.data.code === ERR_OK) {
          this.MVlists = res.data.data
          this.timer = setTimeout(() => {
            this.isLoading = false
          }, 200)
        }
      })
    },
    scroll (pos) {
      // console.log(pos)
      if (pos.y) {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable.scss";
  .movie-list{
    .movie{
      width: 90%;
      margin: 0 auto;
      .movie-cover{
        padding-top: 20px;
      }
      &:first-child{
        margin-top: 60px;
      }
      &:last-child{
        padding-bottom: 60px;
      }
      img{
        border-radius: 10px;
        height: 160px;
        width: 100%;
      }
    }
    .movie-title{
      text-align: left;
      font-size: $font-size-md;
      font-weight: bolder;
      padding: 5px 0;
    }
    .loading-container{
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background-color: #ffffff;
    }
    .scrollUp{
      font-size: 2px;
      width: 40px;
      white-space: nowrap;
    }
  }

</style>
