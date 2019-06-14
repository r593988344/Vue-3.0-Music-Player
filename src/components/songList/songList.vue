<template>
    <div class="router-music-list">
      <div class="back-to">
        <span class="back" @click="back">
          Back
        </span>
        <div class="title-scroll">
          <div>歌单广场1</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'songList',
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~common/scss/common.scss";
  .back-to{
    color: #000;
  }
</style>
