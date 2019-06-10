<template>
    <div class="music-list">
      <div class="back-to">
        歌单
      </div>
      <div>
        <div class="business-card">
          <div></div>
        </div>
        <div class="song-list"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'musicList'
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
  }
</style>
