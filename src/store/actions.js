//actions.js 通常是异步操作 对mutations 进行封装 可以穿对象值
import * as types from './mutation-types'
export const selectPlay = function ({commit,state},{list,index}) {
  commit(types.SET_SEQUENCE_LIST,list)
  commit(types.SET_PLAYLIST,list)
  commit(types.SET_CURRENT_INDEX,index)
  commit(types.SET_FULL_SCREEN,true)
  commit(types.SET_PLAYING_STATE,true)
}
