import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as state from './state'
import * as mutations from './mutations'
import createLogger  from 'vuex/dist/logger' //打印日志

Vue.use(Vuex)

//区分生产环境和dev环境
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict:debug,
  plugins:debug ? [createLogger()] : []
})
