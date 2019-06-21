<template>
  <div id="app">
    <music-header></music-header>
    <div class="router-view">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <play-interface></play-interface>
    <music-footer></music-footer>
  </div>
</template>

<script>
import MusicHeader from 'components/header/musicHeader'
import MusicFooter from 'components/footer/musicFooter'
import PlayInterface from 'components/playInterface/playInterface'
export default {
  name: 'App',
  components: {
    PlayInterface,
    MusicHeader,
    MusicFooter
  },
  data () {
    return {
      stop: false
    }
  },
  // firstPlay 解决ios移动端以及一些安卓手机第一次进入页面无法播放的问题
  // （除非用户物理点击一次屏幕，其实现在不能苹果手机，其他的安卓手机和部分App有时也存在背景音不能自动播放的问题）
  mounted () {
    let m = document.querySelector('#app')
    m.addEventListener('touchend', this.firstPlay)
    m.addEventListener('touchmove', function (e) {
      e.preventDefault()
    }, { passive: false })
  },
  methods: {
    firstPlay () {
      let music = document.querySelector('#music-audio')
      music.play()
      if (music.src !== '') {
        this.stop = true
      }
    }
  },
  watch: {
    stop () {
      let m = document.querySelector('#app')
      m.removeEventListener('touchend', this.firstPlay)
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display:flex;
  height:100%;
  flex-direction:column;
}
.router-view{
  display: flex;
  flex: 1;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
}
</style>
