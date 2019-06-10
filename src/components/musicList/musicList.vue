<template>
    <div class="music-list">
      <div class="back-to">
        歌单
      </div>
      <div>
        <div class="business-card">
          <div class="image">
            <img :src="coverImgUrl" alt="">
            <div class="introduce">
              <p class="title">{{name}}</p>
              <div>
                <img :src="avatarUrl" alt="">
                <span>{{nickname}}</span>
              </div>
              <p class="description">{{description}}</p>
            </div>
          </div>
        </div>
        <div class="song-list"></div>
      </div>
    </div>
</template>

<script>
import { getPersonalizedDetail } from 'common/api/discover'
import { playExchange } from 'common/js/playExchange'
import { ERR_OK } from 'common/js/config'
export default {
  name: 'musicList',
  data () {
    return {
      songLists: [],
      coverImgUrl: '',
      name: '',
      description: '',
      avatarUrl: '',
      nickname: '',
      playCount: ''
    }
  },
  mounted () {
    this._getPersonalizedDetail()
  },
  methods: {
    _getPersonalizedDetail () {
      let id = this.$route.params.id
      getPersonalizedDetail(id).then(res => {
        console.log(res.data.result)
        if (res.data.code === ERR_OK) {
          let playCount = res.data.result.playCount
          this.coverImgUrl = res.data.result.coverImgUrl
          this.songLists = res.data.result.tracks
          this.name = res.data.result.name
          this.description = res.data.result.description
          this.nickname = res.data.result.creator.nickname
          this.avatarUrl = res.data.result.creator.avatarUrl
          this.playCount = playExchange(playCount)
          console.log(this.playCount)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .music-list{
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background-color: #fff;
    .back-to{
      height: 50px;
      line-height: 50px;
    }
    .business-card{
      height: 200px;
      margin-top: 16px;
      img{
        height: auto;
        width: 40%;
        float: left;
        padding-left: 12px;
      }
      .introduce{
        float: left;
        width: 60%;
        padding-left: 12px;
        padding-right: 12px;
        height: auto;
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
          font-size: 14px;
          line-height: 30px;
          float: left;
          padding-left: 4px;
        }
        p{
          font-size: 10px;
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
          font-size: 16px;
          line-height: 20px;
        }
        .description{
          line-height: 16px;
        }
      }
    }
  }
</style>
