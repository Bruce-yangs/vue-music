//actions.js 通常是异步操作 对mutations 进行封装 可以穿对象值
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch,deleteSearch,clearSearch,savePlay} from 'common/js/cache'

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

/*搜索歌曲点击当前歌曲的状态*/
export const insertSong = function ({commit, state},song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()//.slice() 相当于修改了mutations 的副本 所以不会警告报错
  let currentIndex = state.currentIndex
  //记录当前歌曲
  let currentSong =playlist[currentIndex]

  //查找当前列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)

  //因为是插入歌曲,所以索引要+1
  currentIndex ++

  //插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0,song)

  //如果已经包含了这首歌
  if(fpIndex > -1) {
    //如果当前插入的序号大于列表中的序号
    if(currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex --
    }else{
      playlist.splice(fpIndex + 1, 1)
    }
  }

  //先找到插入位置
  let currentSIndex = findIndex(sequenceList, currentSong) +1
  //找到之前有没有这个song
  let fsIndex = findIndex(sequenceList, song)
  //然后把song插入到这个位置
  sequenceList.splice(currentSIndex,0,song)

  //如果有这个song就把这个song删除
  if(fsIndex > -1) {
    if(currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    }else{
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAYLIST,playlist)
  commit(types.SET_SEQUENCE_LIST,sequenceList)
  commit(types.SET_CURRENT_INDEX,currentIndex)
  commit(types.SET_FULL_SCREEN,true)
  commit(types.SET_PLAYING_STATE,true)
}


/*封装本地缓存*/
export const saveSearchHistory = function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

/*删除存储*/
export const deleteSearchHistory = function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY,deleteSearch(query))//调取deleSearch函数  从SET_SEARCH_HISTORY删除返回新的数组 提交到mutations
}

/*清除所有存储*/
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY,clearSearch())//调取clearSearch函数  从SET_SEARCH_HISTORY清除所有数据 提交到mutations
}

/*删除歌曲*/
export const deleteSong = function ({commit,state},song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()//.slice() 相当于修改了mutations 的副本 所以不会警告报错
  let currentIndex = state.currentIndex

  let pIndex = findIndex(playlist,song)
  playlist.splice(pIndex, 1)

  let sIndex = findIndex(sequenceList,song)
  sequenceList.splice(sIndex, 1)

  if(currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST,playlist)
  commit(types.SET_SEQUENCE_LIST,sequenceList)
  commit(types.SET_CURRENT_INDEX,currentIndex)

  const playingState = playlist.length > 0

  commit(types.SET_PLAYING_STATE,playingState)
}

/*清除所有播放列表*/
export const deleteSongList = function ({commit}) {
  commit(types.SET_PLAYLIST,[])
  commit(types.SET_SEQUENCE_LIST,[])
  commit(types.SET_CURRENT_INDEX,-1)
  commit(types.SET_PLAYING_STATE,false)
}

// 存储播放历史
export const savePlayHistory = function({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

