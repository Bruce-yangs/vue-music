import {playMode} from 'common/js/config'

const  state = {
  singer: {},//歌手
  playing: false,//播放状态 暂停 播放
  fullScreen:false,//是否全屏播放
  playlist:[],//播放列表
  sequenceList: [],//原始列表
  mode:playMode.sequence,//播放模式
  currentIndex: -1,//当前歌曲
  disc:{},//歌单对象
  topList:{}//排行榜
}
export default state
