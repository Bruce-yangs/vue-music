//actions.js 通常是异步操作 对mutations 进行封装 可以穿对象值
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit,state},{list,index}) {
  commit(types.SET_SEQUENCE_LIST,list)
  /*当在 music-list中点击随机播放  进行判断避免和正常播放冲突*/
  if(state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST,randomList)
    index = findIndex(randomList,list[index])
  } else {
    commit(types.SET_PLAYLIST,list)
  }
  commit(types.SET_CURRENT_INDEX,index)
  commit(types.SET_FULL_SCREEN,true)
  commit(types.SET_PLAYING_STATE,true)
}

/*配置随机播放*/
export const randomPlay = function ({commit},{list}) {
  commit(types.SET_PLAY_MODE,playMode.random)
  commit(types.SET_SEQUENCE_LIST,list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST,randomList)
  commit(types.SET_CURRENT_INDEX,0)
  commit(types.SET_FULL_SCREEN,true)
  commit(types.SET_PLAYING_STATE,true)
}

