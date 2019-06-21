<template>
  <div class="progress">
    <div class="progress-wrapper"><span class="time time-l">{{format(currentTime)}}</span>
      <div class="progress-bar-wrapper" ref="progressBar">
        <div class="progress-bar">
          <div class="bar-inner">
            <div class="progress-color" :style="`width:${moveWidth}px`"></div>
            <div class="progress-btn-wrapper">
              <div class="progress-btn" :style="`left:${moveWidth}px`">
                <div class="btn"
                     @touchstart.stop="touchstart($event)"
                     @touchmove.stop="touchmove($event)"
                     @touchend.stop="touchend($event)">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="time time-r">{{format(duration)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progressBar',
  props: {
    percent: {
      default: 0
    },
    currentTime: {
      default: 0
    },
    duration: {
      default: 0
    }
  },
  data () {
    return {
      progressWith: 0,
      moveWidth: 0,
      touching: false,
      startLocation: 0
    }
  },
  methods: {
    format (interval) {
      interval = interval | 0
      let minute = interval / 60 | 0
      let second = interval % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    },
    touchstart (event) {
      this.startLocation = event.targetTouches[0].clientX - this.moveWidth
      this.touching = true
    },
    touchmove (event) {
      this.moveWidth = (event.targetTouches[0].clientX - this.startLocation)
      if (this.moveWidth < 0) {
        this.moveWidth = 0
      } else if (this.moveWidth > this.progressWith) {
        this.moveWidth = this.progressWith
      }
      let percent = this.moveWidth / this.progressWith
      this.$emit('changePercent', percent, this.touching)
    },
    touchend () {
      let percent = this.moveWidth / this.progressWith
      this.touching = false
      this.$emit('changePercent', percent, this.touching)
    }
  },
  watch: {
    percent () {
      if (!this.touching) {
        this.progressWith = this.$refs.progressBar.offsetWidth
        this.moveWidth = this.progressWith * this.percent
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable.scss";
  .progress{
    color: #ffffff;
    .progress-bar-wrapper{
      width: 76%;
      background-color: rgba(149, 149, 149, 0.35);
      height: 2px;
    }
    .progress-wrapper{
      justify-content: space-evenly;
      display: flex;
      align-items: center;
      font-size: $font-size-sm;
      .time-l{
        width: 5%;
      }
      .time-r{
        width: 5%;
      }
      .bar-inner{
        position: relative;
      }
      .progress-color{
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(203, 203, 203, 0.67);
        height: 2px;
      }
      .progress-btn-wrapper{
        display: flex;
        align-items: center;
        height: 2px;
        position: absolute;
        left: 0;
        top: 0;
      }
      .progress-btn{
        width: 10px;
        height: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #ffffff;
        .btn{
          width: 20px;
          height: 25px;
        }
      }
    }
  }
</style>
