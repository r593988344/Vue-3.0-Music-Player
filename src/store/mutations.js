import * as types from './mutations-types'

export default {
  [types.SET_MUSIC_LIST] (state, musicList) {
    state.musicList = musicList
  }
}
