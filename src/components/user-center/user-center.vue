<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :switches="switches" @switch="switchItem" :currentIndex="currentIndex"></switches>
      </div>
      <div class="play-btn" ref="playBtn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
          <scroll  class="list-scroll" ref="favoriteList" v-if="currentIndex === 0" :data="favoriteList" >
            <div class="list-inner">
              <song-list :songs="favoriteList" @select="selectSong"></song-list>
            </div>
          </scroll>
          <!--播放历史-->
          <scroll class="list-scroll" ref="playList"  v-if="currentIndex === 1" :data="playHistory">
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong"></song-list>
            </div>
          </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </transition>
</template>

<script>
  import Switches from 'base/switches/switches'
  import SongList from 'base/song-list/song-list'
  import Scroll from 'base/scroll/scroll'
  import NoResult from 'base/no-result/no-result'
  import Song from 'common/js/song'
  import {mapGetters,mapActions} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'

  /*import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'*/

  export default {
    mixins:[playlistMixin],
    data() {
        return {
          currentIndex: 0,
          switches:[
            {
              name:'我喜欢的'
            },
            {
              name:'最近听的'
            }
          ]
        }
    },
    computed: {
      noResult() {//监听是否 结果
          if(this.currentIndex === 0) {
              return !this.favoriteList.length
          }else {
            return !this.playHistory.length

          }
      },
      noResultDesc() {//传当无结果时 的显示
          if(this.currentIndex === 0) {
              return '暂无收藏歌曲'
          }else {
            return '你还没听过歌曲'

          }
      },

      ...mapGetters([
        'playHistory',
        'favoriteList'
      ])
    },
    methods: {
      handlePlaylist (playlist) {//重新计算高度 避免mini播放器遮挡
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.listWrapper.style.bottom = bottom
        this.$refs.favoriteList && this.$refs.favoriteList.refresh()
        this.$refs.playList && this.$refs.playList.refresh()
      },
      switchItem(index) {/*接受子组件 switch  派发的事件和参数*/
        this.currentIndex = index
      },
      selectSong(song){
        this.insertSong(new Song(song))
      },
      back(){
        this.$router.back()
      },
      random(){/*随机播放*/
        //判断随机播放的类型
        let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory

        if(list.length === 0) return
        list = list.map((song) => {
            return new Song(song)
        })

        //随机播放
        this.randomPlay({
          list
        })
      },

      ...mapActions([
          'insertSong','randomPlay'
      ])
    },
    components: {
      Switches,SongList,Scroll,NoResult
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '~common/sass/variable.scss';
  @import '~common/sass/mixin.scss';
  .user-center{
    position: fixed;
    top:0;
    bottom:0;
    z-index: 100;
    width: 100%;
    background: $color-background;
    .slide-enter-active,.slide-leave-active {
      transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to {
      transform: translate3d(100%, 0, 0)
    }
    .back{
      position: absolute;
      top:0;
      left:6px;
      z-index: 50;
      .icon-back{
        display: block;
        padding:10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
    .switches-wrapper{
      margin:10px 0 30px 0;
    }
    .play-btn{
      box-sizing:border-box;
      width:135px;
      padding: 7px 0;
      margin: 0 auto;
      text-align: center;
      border:1px solid $color-text-l;
      color:$color-text-l;
      border-radius:100px;
      font-size: 0;
      .icon-play{
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text{
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .list-wrapper{
      position: absolute;
      top: 110px;
      bottom: 0;
      width: 100%;
      .list-scroll{
        height: 100%;
        overflow: hidden;
        .list-inner{
          padding: 20px 30px;
        }
      }
    }
    .no-result-wrapper{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }

</style>
