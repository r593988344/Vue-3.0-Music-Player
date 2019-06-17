import { playMode } from 'common/js/config'

const state = {
  // 歌单信息
  musicList: {},
  // 歌曲信息
  songDetail: {},
  // 是否显示播放界面
  showPlay: false,
  // 是否播放
  playing: false,
  // 播放列表
  playList: [],
  // 播放模式 (顺序：0，循环：1，随机：2)
  mode: playMode.sequence,
  // 当前播放索引
  currentIndex: -1

}

export default state
