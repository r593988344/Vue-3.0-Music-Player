<template>
  <div class="progress">
    <div class="progress-wrapper"><span class="time time-l"></span>
      <div class="progress-bar-wrapper">
        <div class="progress-bar">
          <div class="bar-inner">
            <div class="progress"></div>
            <div class="progress-btn-wrapper">
              <div class="progress-btn"></div>
            </div>
          </div>
        </div>
      </div>
      <span class="time time-r">{{format(currentTime)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progressBar',
  props: {
    currentTime: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
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
    }
  }
}
</script>

<style scoped>

</style>
