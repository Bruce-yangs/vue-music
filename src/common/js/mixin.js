import {mapGetters} from 'vuex'
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
