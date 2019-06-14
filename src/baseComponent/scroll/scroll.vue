<!-----better-scroll滚动区域组件------>
<template>
  <div ref="wrapper" class="scroll-body">
    <slot></slot>
  </div>
</template>
<!-----better-scroll滚动区域组件------>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: false
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullup: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    scrollDisable: {
      type: Boolean,
      default: false
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        pullUpLoad: this.pullUpLoad
      })

      if (this.listenScroll) {
        let _this = this
        this.scroll.on('scroll', (pos) => {
          _this.$emit('scroll', pos)
        })
      }
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 80)) {
            this.$emit('scrollToEnd')
          }
        })
      }
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    },
    scrollDisable () {
      if (this.scrollDisable) {
        setTimeout(() => {
          this.disable()
        }, this.refreshDelay)
      } else {
        this.enable()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-body{
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
