import * as types from './mutations-types'

export default {
  [types.SET_MUSIC_LIST] (state, musicList) {
    state.musicList = musicList
  },
  [types.SET_SONG_DETAIL] (state, songDetail) {
    state.songDetail = songDetail
  }
}
