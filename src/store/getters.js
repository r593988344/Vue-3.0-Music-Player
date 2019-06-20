export const musicList = state => state.musicList
export const showPlay = state => state.showPlay
export const playing = state => state.playing
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || ''
}

