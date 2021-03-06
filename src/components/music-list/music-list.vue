<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0" ref="playBtn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list"
            ref="list">
      <div class="song-list-wrapper">
        <song-list :rank="rank" @select="selectItem" :songs="songs"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  /*import {getSingerDetail} from 'api/singer'
   import {ERR_OK} from 'api/config'*/
  import SongList from 'base/song-list/song-list'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {prefixStyle} from 'common/js/dom'
  import {playlistMixin} from 'common/js/mixin'
  import {mapActions} from 'vuex'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')


  export default {
    mixins: [playlistMixin],
    data() {
      return {
        scrollY: 0//定义一个监听纵向Y轴的值
      }
    },
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    components: {
      SongList, Scroll, Loading
    },
    created() {
      this.probeType = 3;
      this.listenScroll = true;
    },
    mounted(){
      //记录图片的高度
      this.imageHeight = this.$refs.bgImage.clientHeight

      //最小滚动的值
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT

      //$el是操作dom 设置scroll组件的初始位置   已经背景图得高度
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      scroll(pos) {//监听纵向滚动
        this.scrollY = pos.y;
//          console.log(this.scrollY)
      },
      back(){
        this.$router.back()
      },
      selectItem(item, index){//接受子组件派发的事件 参数
        console.log(index)
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      random() {//点击随机播放
        this.randomPlay({
          list: this.songs
        })
      },
      ...mapActions([/*此处是 store文件里  actions.js配置*/
        'selectPlay',
        'randomPlay'
      ])
      /*   _getDetail(){
       if(!this.singer.id) { //处理当用户在当前页面 刷新时  跳转歌手界面
       this.$router.push('/singer')
       return
       }
       getSingerDetail(this.singer.id).then((res) => {
       if(res.code=== ERR_OK) {
       this.songs = this._normalizeSongs(res.data.list)
       console.log(this.songs)

       }
       })
       },
       _normalizeSongs(list) {//过滤成歌单数据
       let ret = []
       list.forEach((item) => {
       let {musicData} = item
       if (musicData.songid && musicData.albummid) {
       ret.push(createSong(musicData))
       }
       })
       return ret
       }*/
    },
    watch: {
      scrollY(newY) {
//              console.log(newY)
        let tranlateY = Math.max(this.minTranslateY, newY) //此处是最多滚动的值
        let zIndex = 0
        let scale = 1
        let blur = 0

        this.$refs.layer.style[transform] = `translate3d(0,${tranlateY}px,0)`


        //计算背景图 缩放比例
        const percent = Math.abs(newY / this.imageHeight)
        if (newY > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          //高斯模糊 只有在iphone下可以看到效果
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`

        //动态设定滑动顶部的效果
        if (newY < this.minTranslateY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = ''
        }

        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.bgImage.style[transform] = `scale(${scale})`
      }
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "~common/sass/variable.scss";
  @import "~common/sass/mixin.scss";

  .music-list {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $color-background;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
      .icon-back {
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }

    .title {
      position: absolute;
      top: 0;
      left: 10%;
      z-index: 40;
      width: 80%;
      @include no-wrap;
      text-align: center;
      line-height: 40px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .bg-image {
      position: relative;
      width: 100%;
      height: 0;
      /*z-index: 1;*/
      padding-top: 70%;
      transform-origin: top;
      background-size: cover;
      .play-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 50;
        width: 100%;
        .play {
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;
          .icon-play {
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            font-size: $font-size-medium-x;
          }
          .text {
            display: inline-block;
            vertical-align: middle;
            font-size: $font-size-small;
          }
        }
      }
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4)
      }
    }
    .bg-layer {
      position: relative;
      height: 100%;
      background: $color-background;
    }
    .list {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: $color-background;
      .song-list-wrapper {
        padding: 20px 30px;
      }
      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
