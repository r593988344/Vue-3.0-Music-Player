<template>
  <div class="back-to">
        <span class="back" @click="back">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-houtui"></use>
          </svg>
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
      console.log('back')
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss" scoped>
  .back-to{
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    position: relative;
    z-index: 3;
    .back{
    float: left;
    width: 20%;
    font-size: 22px;
    display: flex;
    height: 40px;
      padding-left: 10px;
    align-items: center;
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
