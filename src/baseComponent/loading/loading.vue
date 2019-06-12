<template>
  <div class="loading">
    <img src="./loading.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    title: {
      type: String,
      default: '正在载入'
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading{
    width: 40px;
    text-align: center;
    margin: 0 auto;
  }
</style>
