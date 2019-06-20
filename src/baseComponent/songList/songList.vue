<!------歌曲列表组件------->
<template>
  <div class="song-list content">
    <slot></slot>
    <div class="songs">
      <div>
        <div v-for="(item, index) of songLists" :key="index" class="song" @click="playSong(item, index)">
          <div class="sorts" :class="{top3:rank && index < 3, ranks:rank}">
            <p><span v-if="rank && index < 9">0</span>{{index+1}}</p>
          </div>
          <div class="artist">
            <p class="text-ellipsis-one-line">{{item.name}}</p>
            <p class="text-ellipsis-one-line">
              <span v-for="(names, index) of item.artists" :key="index"><span v-if="index !== 0">/</span>{{names.name}}</span>
              <span>-{{item.name}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="loading-container" v-show="!songLists.length">
      <loading></loading>
    </div>
  </div>
</template>
<!------歌曲列表组件------->

<script>
import Loading from '../loading/loading'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'songList',
  components: { Loading },
  data () {
    return {
    }
  },
  props: {
    songLists: {
      type: Array
    },
    playTopShow: {
      type: Boolean
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    playSong (item, index) {
      this.selectPlay({ list: this.songLists, index: index })
      this.showPlay(true)
    },
    ...mapActions([
      'selectPlay'
    ]),
    ...mapMutations({
      showPlay: 'SHOW_PLAY',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable.scss";
  .loading-container{
    position: absolute;
    background-color: #ffffff;
    top: 60px;
    left: 0;
  }
  .song-list{
    min-height: 100%;
    height: auto;
    overflow: hidden;
    position: relative;
  .songs{
    height: 100%;
    text-align: left;
    padding: 0 10px;
    overflow: hidden;
    background-color: #ffffff;
    min-height: 100px;
  .song{
    height: 40px;
    margin: 10px 0;
  .sorts{
    float: left;
    display: inline-block;
    line-height: 40px;
    width: 24px;
    color: $song-list-gray-font;
    text-align: center;
    &.top3{
      color: $background-r-color;
    }
  }
  .artist{
    float: left;
    width: 90%;
    padding-left: 10px;
  p{
    font-size: $font-size-lg;
  }
  span{
    font-size: $font-size-sm;
    color: $song-list-gray-font;
        }
      }
     }
    }
  }
</style>
