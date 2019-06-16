<template>
  <div class="back-to">
        <span class="back" @click="back">
          Back
        </span>
    <div class="title-scroll">
      <div>{{titleName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topTitle',
  props: {
    titleName: {
      type: String,
      default: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .back-to{
    height: 50px;
    line-height: 50px;
    color: #ffffff;
    position: relative;
  .back{
    float: left;
    width: 20%;
  }
  >div{
    width: 50%;
    margin-left: 25%;
    overflow: hidden;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  .title-scroll{
    white-space: nowrap;
  }
  }
  }
</style>
