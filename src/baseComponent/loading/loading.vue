<!------加载动画组件------>
<template>
  <div class="loading">
    <img src="./loading.svg" alt="">
    <div>
      {{title}}
    </div>
  </div>
</template>
<!------加载动画组件------>

<script>
export default {
  name: 'loading',
  props: {
    title: {
      type: String,
      default: '正在加载...'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable.scss";
  .loading{
    width: 60px;
    text-align: center;
    margin: 0 auto;
    font-size: $font-size-sm;
    color: $font-color-gray;
    img{
      padding-bottom: 5px;
      width: 50%;
    }
  }
</style>
