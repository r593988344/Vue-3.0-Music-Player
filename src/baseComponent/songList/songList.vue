<template>
  <div class="song-list content">
    <slot></slot>
    <div class="songs">
      <div>
        <div v-for="(item, index) of songLists" :key="index" class="song">
          <i>{{index+1}}</i>
          <div class="artist">
            <p>{{item.name}}</p>
            <p>
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
    position: absolute;
    left: 50%;
    top: calc(50% + 80px);
    transform: translate(-50%,-50%);
  }
  .song-list{
    background-color: #ffffff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  .songs{
    height: 100%;
    text-align: left;
    padding: 0 15px;
    overflow: hidden;
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
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
