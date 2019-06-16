import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

// 开发模式下debug Vuex
const debug = process.env.NOD_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  // 在调用mutation时在控制台打印状态
  plugins: debug ? [createLogger()] : []
})
