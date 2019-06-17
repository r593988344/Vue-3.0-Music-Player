import * as types from './mutations-types'

export default {
  [types.SET_MUSIC_LIST] (state, musicList) {
    state.musicList = musicList
  },
  [types.SET_SONG_DETAIL] (state, songDetail) {
    state.songDetail = songDetail
  },
  [types.SHOW_PLAY] (state, showPlay) {
    state.showPlay = showPlay
  },
  [types.SET_PLAYING] (state, playing) {
    state.showPlay = playing
  },
  [types.SET_PLAY_LIST] (state, playList) {
    state.showPlay = playList
  },
  [types.SET_MODE] (state, mode) {
    state.showPlay = mode
  },
  [types.SET_CURRENT_INDEX] (state, currentIndex) {
    state.showPlay = currentIndex
  }
}
