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
    state.playing = playing
  },
  [types.SET_PLAY_LIST] (state, playList) {
    state.playList = playList
  },
  [types.SET_SEQUENCE_LIST] (state, sequenceList) {
    state.sequenceList = sequenceList
  },
  [types.SET_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, currentIndex) {
    state.currentIndex = currentIndex
  }
}
