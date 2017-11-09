import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {//当组件dom ready时触发
    this.handlePlaylist(this.playlist)
  },
  activated() {//当切换keep-alive时会触发activated事件
    this.handlePlaylist(this.playlist)

  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

/*封装播放模式 共享复用*/
export const playerMixin = {
  computed: {
    iconMode(){//监听播放模式
      return this.mode === playMode.sequence? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' :'icon-random'
    },
    ...mapGetters([//mode播放模式  sequenceList 原始列表
      'sequenceList',
      'currentSong',
      'playlist',
      'mode',
      'favoriteList'
    ])
  },
  methods: {
    changeMode(){//切换播放模式
      const mode = (this.mode +1) % 3

      this.setPlayMode(mode)//由mapMutations 映射

      let list = null
      if(mode === playMode.random) {//随机播放
        list = shuffle(this.sequenceList)
      }else{//否则就是按顺序播放
        list = this.sequenceList
      }
      //保持当前歌曲播放不变
      this._resetCurrentIndex(list)

      /*播放模式切换 改变播放列表顺序*/
      this.setPlaylist(list)
    },
    _resetCurrentIndex(list) {//当切换模式后当前歌曲 currentSong 是通过 state.playlist[state.currentIndex] ||　{}计算得来的 避免当前歌曲正在播放被打乱
      let index = list.findIndex((item) => {//findIndex es6语法
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    getFavoriteIcon(song){
      if(this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'

    },
    toggleFavorite(song){
      if(this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      }else {
        this.saveFavoriteList(song)
      }
    },
    isFavorite(song){
      const index = this.favoriteList.findIndex((item) => {
          return song.id === item.id
      })
      return index > -1
    },
    ...mapMutations({
      setPlayingState:'SET_PLAYING_STATE',
      setCurrentIndex:'SET_CURRENT_INDEX',
      setPlayMode:'SET_PLAY_MODE',
      setPlaylist:'SET_PLAYLIST',
    }),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  }
}


export const searchMixin = {
  data(){
    return {
      query:'',
      refreshDelay:100
    }
  },
  computed: {
  ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    /*监听输入框的内容*/
    onQueryChange(query) {
      this.query = query
    },
    /*失去焦点 调取子组件的方法*/
    blurInput(){
      this.$refs.searchBox.blur()
    },
    addQuery(item) {/*父组件 通过调取子组件方法 传值*/
      this.$refs.searchBox.setQuery(item)
    },
    /*保存搜索结果*/
    saveSearch(){
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
    ])
  }
}
