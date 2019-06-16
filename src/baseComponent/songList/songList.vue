<!------歌曲列表组件------->
<template>
  <div class="song-list content">
    <slot></slot>
    <div class="songs">
      <div>
        <div v-for="(item, index) of songLists" :key="index" class="song">
          <i>{{index+1}}</i>
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
export default {
  name: 'songList',
  components: { Loading },
  props: {
    songLists: {
      type: Array
    },
    playTopShow: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable.scss";
  .loading-container{
    position: relative;
  }
  .song-list{
    min-height: 100%;
    height: auto;
    overflow: hidden;
  .songs{
    height: 100%;
    text-align: left;
    padding: 0 15px;
    overflow: hidden;
    background-color: #ffffff;
  .song{
    height: 40px;
    margin: 20px 0;
  i{
    float: left;
    display: inline-block;
    line-height: 40px;
    color: $font-color-gray;
  }
  .artist{
    float: left;
    width: 90%;
    padding-left: 14px;
  p{
    font-size: $font-size-lg;
  }
  span{
    font-size: $font-size-sm;
    color: $font-color-gray;
        }
      }
     }
    }
  }
</style>
