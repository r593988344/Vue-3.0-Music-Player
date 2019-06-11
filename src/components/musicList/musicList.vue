<template>
    <div class="music-list">
      <div class="back-to">
        歌单
      </div>
      <div class="bg-img">
        <div class="bg-mask"></div>
        <img :src="coverImgUrl" alt="" style="width: 100%;height: 100%;">
      </div>
      <scroll class="song-list-scroll" :data="songLists">
        <div>
          <div class="business-card">
            <div class="image">
              <div class="image-left">
                <img :src="coverImgUrl" alt="">
                <div class="play-number">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-z"></use>
                  </svg>
                  <span>{{playCount}}</span>
                </div>
              </div>
              <div class="introduce">
                <p class="title">{{name}}</p>
                <div>
                  <img class="sm-icon" :src="avatarUrl" alt="">
                  <span>{{nickname}}</span>
                </div>
                <p class="description">{{description}}</p>
              </div>
            </div>
            <div class="business-card-bottom">
              <div class="song-icons">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-faxian1"></use>
                </svg>
                <span>{{commentCount}}</span>
              </div>
              <div class="song-icons">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-faxian1"></use>
                </svg>
                <span>{{shareCount}}</span>
              </div>
              <div class="song-icons">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-faxian1"></use>
                </svg>
                <span>下载</span>
              </div>
              <div class="song-icons">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-faxian1"></use>
                </svg>
                <span>多选</span>
              </div>
            </div>
          </div>
          <div class="song-list content">
            <div class="vip">
              <span></span>
              <span class="bloder">会员享高品质听觉盛宴</span>
            </div>
            <div class="play" id="play">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-z"></use>
              </svg>
              <span class="play-all">播放全部 <i>(共{{trackCount}}首)</i></span>
            </div>
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
          </div>
        </div>
      </scroll>
      </div>
</template>

<script>
import { getPersonalizedDetail } from 'common/api/discover'
import { playExchange } from 'common/js/playExchange'
import { ERR_OK } from 'common/js/config'
import Scroll from '@/baseComponent/scroll/scroll'
export default {
  name: 'musicList',
  components: {
    Scroll
  },
  data () {
    return {
      songLists: [],
      coverImgUrl: '',
      name: '',
      description: '',
      avatarUrl: '',
      nickname: '',
      playCount: '',
      shareCount: '',
      commentCount: '',
      trackCount: ''
    }
  },
  mounted () {
    this._getPersonalizedDetail()
  },
  methods: {
    _getPersonalizedDetail () {
      let id = this.$route.params.id
      getPersonalizedDetail(id).then(res => {
        if (res.data.code === ERR_OK) {
          let playCount = res.data.result.playCount
          this.coverImgUrl = res.data.result.coverImgUrl
          this.songLists = res.data.result.tracks
          this.name = res.data.result.name
          this.description = res.data.result.description
          this.nickname = res.data.result.creator.nickname
          this.avatarUrl = res.data.result.creator.avatarUrl
          this.playCount = playExchange(playCount)
          this.shareCount = res.data.result.shareCount
          this.commentCount = res.data.result.commentCount
          this.trackCount = res.data.result.trackCount
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable.scss";
  .music-list{
    height: calc(100% - 64px);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background-color: #ffffff;
    overflow: hidden;
    .song-list-scroll{
      height: calc(100% - 60px);
      overflow: hidden;
    }
    .bg-img{
      position: fixed;
      height: 280px;
      z-index: -1;
      .bg-mask{
        background-color: rgba(0, 0, 0, 0.62);
        opacity: 0.3;
        position: fixed;
        top: 0;
        left: 0;
        height: 280px;
        z-index: 1;
      }
      img{
        -webkit-filter: blur(30px); /* Chrome, Safari, Opera */
        filter: blur(30px);
      }
    }
    .wrapper{
      height: calc(100% - 60px);
      overflow: hidden;
    }
    .back-to{
      height: 50px;
      line-height: 50px;
      color: #ffffff;
    }
    .business-card{
      margin-top: 16px;
      color: #ffffff;
      .image{
        height: 140px;
      }
      .business-card-bottom{
        height: 60px;
        display: flex;
        justify-content: space-around;
        font-size: 22px;
        padding-top: 10px;
        padding-bottom: 10px;
        .song-icons span{
          display: block;
          text-align: center;
          font-size: $font-size-sm;
        }
      }
      .image-left{
        height: 140px;
        width: 45%;
        float: left;
        padding-left: 12px;
        position: relative;
        img{
          border-radius: 5px;
        }
      }
      .play-number{
        position: absolute;
        color: #ffffff;
        font-size: $font-size-lg;
        height: auto;
        width: auto;
        right: 10px;
        top: 0;
        .icon{
          vertical-align: middle;
        }
        span{
          font-size: $font-size-smm;
          margin-left: -5px;
        }
      }
      img.sm-icon{
        float: left;
      }
      .introduce{
        float: left;
        width: 55%;
        padding-left: 15px;
        padding-right: 15px;
        height: 130px;
        position: relative;
        div{
          height: 30px;
        }
        img{
          width: 30px;
          height: 30px;
          padding: 0;
          border-radius: 15px;
          vertical-align: middle;
        }
        span{
          font-size: $font-size-md;
          line-height: 30px;
          float: left;
          padding-left: 4px;
        }
        p{
          font-size: $font-size-smm;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          padding-right: 1px;
          text-align: left;
          margin-top: 5px;
          margin-bottom: 10px;
        }
        .title{
          font-size: $font-size-lg;
          line-height: 20px;
          margin-top: 0;
        }
        .description{
          position: absolute;
          bottom: 0;
          line-height: 18px;
          margin: 0;
          padding-right: 15px;
          font-size: $font-size-sm;
        }
      }
    }
    .song-list{
      background-color: #ffffff;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      .vip{
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #f1f1f1;
        .bloder{
          font-size: $font-size-lg;
          font-weight: 400;
        }
      }
      .play{
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        .play-all{
          font-size: $font-size-lg;
          font-weight: bold;
          padding-left: 10px;
          line-height: 40px;
          display: flex;
          align-items: center;
          i{
            font-size: $font-size-md;
            margin-left: 5px;
            color: $font-color-gray;
          }
        }
        .icon{
          font-size: 20px;
          border: 1px solid #000;
          border-radius: 13px;
          float: left;
        }
      }
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
  }
</style>
