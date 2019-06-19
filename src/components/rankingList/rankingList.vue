<template>
    <div class="ranking-list">
      <top-title :titleName="titleName"></top-title>
      <scroll :data="officialList">
        <div>
          <div class="official-list">
            <div class="title">官方榜</div>
            <div class="rank" v-for="(item,index) of officialList" :key="index" @click="selectRank(item)">
              <div class="rank-img">
                <img :src="item.coverImgUrl" alt="">
                <span class="update-time">{{item.updateFrequency}}</span>
              </div>
              <div class="top3-rank">
                <ul>
                  <li class="text-ellipsis-one-line" v-for="(ranks,index) of item.tracks" :key="index">
                    <span>{{index+1}}.</span><span>{{ranks.first}}-{{ranks.second}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="recommend-list">
            <div class="title">推荐榜</div>
            <div class="recommend">
              <div class="rank" v-for="(item,index) of recommendList" :key="index" @click="moreRanks(item)">
                <div class="rank-img">
                  <div class="img">
                    <img :src="item.coverImgUrl" alt="">
                    <span class="update-time">{{item.updateFrequency}}</span>
                  </div>
                  <div class="rank-text">
                    <p class="text-ellipsis-two-line">{{item.name}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="recommend-list global-list">
            <div class="title">全球榜</div>
            <div class="recommend">
              <div class="rank" v-for="(item,index) of globalList" :key="index">
                <div class="rank-img">
                  <div class="img">
                    <img :src="item.coverImgUrl" alt="">
                    <span class="update-time">{{item.updateFrequency}}</span>
                  </div>
                  <div class="rank-text">
                    <p class="text-ellipsis-two-line">{{item.name}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="recommend-list more-list">
            <div class="title">更多榜单</div>
            <div class="recommend">
              <div class="rank" v-for="(item,index) of moreList" :key="index">
                <div class="rank-img">
                  <div class="img">
                    <img :src="item.coverImgUrl" alt="">
                    <span class="update-time">{{item.updateFrequency}}</span>
                  </div>
                  <div class="rank-text">
                    <p class="text-ellipsis-two-line">{{item.name}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
import TopTitle from 'baseComponent/topTitle/topTitle'
import { getRankListDetail } from 'common/api/discover'
import { ERR_OK } from 'common/js/config'
import Scroll from 'baseComponent/scroll/scroll'
import { mapMutations } from 'vuex'
export default {
  name: 'rankingList',
  components: { Scroll, TopTitle },
  data () {
    return {
      titleName: '排行榜',
      // 全部排行榜
      rankingList: [],
      // 官方榜
      officialList: [],
      // 推荐榜
      recommendList: [],
      // 全球榜单
      globalList: [],
      // 更多榜单
      moreList: []
    }
  },
  mounted () {
    this._getRankListDetail()
  },
  methods: {
    _getRankListDetail () {
      getRankListDetail().then(res => {
        if (res.data.code === ERR_OK) {
          this.rankingList = res.data.list
          this.officialList = this.rankingList.slice(0, 4)
          this.recommendList = this.rankingList.slice(4, 10)
          this.globalList = this.rankingList.slice(15, 21)
          this.moreList = this.rankingList.slice(21).concat(this.rankingList.slice(10, 15))
        }
      })
    },
    selectRank (item) {
      this.$router.push('/musicDiscover/rankingList/rankDetail')
      this.setMusicList(item)
    },
    moreRanks (item) {
      this.$router.push(`/musicDiscover/rankingList/${item.id}`)
      this.setMusicList(item)
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
  @import "~common/scss/common.scss";
.ranking-list{
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  .back-to{
    background-color: $background-r-color;
  }
  .scroll-body{
    height: calc(100% - 116px);
    background-color: #ffffff;
  }
}
  .title{
    text-align: left;
    font-weight: bolder;
    line-height: 40px;
  }
  .official-list {
    padding-left: 15px;
    .rank{
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .rank-img{
        position: relative;
        width: 30%;
        height: 0;
        padding-top: 30%;
        display: inline-block;
        .update-time{
          position: absolute;
          bottom: 0;
          left: 0;
          font-size: $font-size-sm;
          color: #ffffff;
          line-height: 30px;
          padding-left: 6px;
        }
        img{
          border-radius: 6px;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
    .top3-rank{
      width: 64%;
      display: inline-block;
      text-align: left;
      padding-right: 15px;
      font-size: $font-size-sm;
      line-height: 25px;
    }
  }
  .recommend-list{
    margin-top: 20px;
    padding-left: 15px;
    .recommend{
      width: 100%;
      overflow: hidden;
    }
    .rank-text{
      height: 40px;
      margin-top: 4px;
    }
    .rank{
      width: 30%;
      float: left;
      font-size: $font-size-sm;
      margin-right: 3%;
      margin-bottom: 10px;
        .img{
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 100%;
          img{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 6px;
          }
        }
        span{
          position: absolute;
          left: 0;
          bottom: 0;
          padding-left: 6px;
          color: #ffffff;
          line-height: 30px;
        }
        p{
          width: 100%;
          text-align: left;
          line-height: 20px;
        }
    }
  }
</style>
