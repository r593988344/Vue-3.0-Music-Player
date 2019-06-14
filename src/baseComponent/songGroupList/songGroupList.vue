<!------推荐歌单组件------>
<template>
  <div class="recommend">
    <div class="recommend-lists">
      <div class="playList" v-for="(item, index) of songList" :key="index">
        <div class="img-out" @click="songsList(item.id, item)">
          <div class="play-number">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-z"></use>
            </svg>
            <span>{{item.playCount}}</span>
          </div>
          <div class="gradients"></div>
          <img v-lazy="item.picUrl ? item.picUrl : item.coverImgUrl" alt="">
        </div>
        <p class="text-ellipsis-two-line">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>
<!------推荐歌单组件------>

<script>
import { mapMutations } from 'vuex'
// 转换播放量单位
import { playExchange } from 'common/js/playExchange'

export default {
  name: 'songLists',
  props: {
    songList:{
      type: Array
    }
  },
  updated () {
    this._playExChange()
  },
  methods: {
    songsList (id, musicList) {
      this.$router.push(`/musicDiscover/songListClassify/${id}`)
      this.setMusicList(musicList)
    },
    _playExChange () {
      this.songList.forEach(item => {
        item.playCount = playExchange(item.playCount)
      })
    },
    // 将获取到的标题数据存入store
    ...mapMutations({
      setMusicList: 'SET_MUSIC_LIST'
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable.scss";
  .recommend{
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
