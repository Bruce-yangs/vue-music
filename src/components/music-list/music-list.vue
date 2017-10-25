<template>
 <div class="music-list">
   <div class="back">
     <i class="icon-back"></i>
   </div>
   <h1 class="title" v-html="title"></h1>
   <div class="bg-image" :style="bgStyle" ref="bgImage">
     <div class="filter"></div>
   </div>
   <scroll :data="songs" class="list" ref="list">
     <div class="song-list-wrapper">
       <SongList :songs="songs"></SongList>
     </div>
   </scroll>
 </div>
</template>

<script type="text/ecmascript-6">
   import {getSingerDetail} from 'api/singer'
   import {ERR_OK} from 'api/config'
   import SongList from 'base/song-list/song-list'
   import Scroll from 'base/scroll/scroll'
    export default {
       props: {
           bgImage: {
             type:String,
             default:''
           },
           songs: {
             type:Array,
             default:[]
           },
           title: {
             type:String,
             default:''
           },
       },
      computed: {
        bgStyle() {
            return `background-image:url(${this.bgImage})`
        }

      },
      components: {
        SongList,Scroll
      },
      created() {
//          console.log(this.singer)
//        this._getDetail()
      },
      mounted(){
           //$el是操作dom 设置scroll组件的初始位置   已经背景图得高度
           this.$refs.list.$el.style.top =`${this.$refs.bgImage.clientHeight}px`
      },
      methods:{
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
      }
    }

</script>

<style lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable.scss";
  @import "~common/sass/mixin.scss";
  .music-list{
    position: fixed;
    z-index: 100;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: $color-background;
    .back{
      position:absolute;
      top:0;
      left:6px;
      z-index: 50;
      .icon-back{
        display: block;
        padding:10px;
        font-size:$font-size-large-x;
        color: $color-theme;
      }
    }

    .title{
      position: absolute;
      top:0;
      left:10%;
      z-index: 40;
      width:80%;
      @include no-wrap;
      text-align:center;
      line-height:40px;
      font-size:$font-size-large;
      color: $color-text;
    }
    .bg-image{
      position: relative;
      width: 100%;
      height:0;
      z-index: 1;
      padding-top:70%;
      transform-origin:top;
      background-size:cover;
      .play-wrapper{
        position: absolute;
        bottom:20px;
        z-index: 50;
        width:100%;
        .play{
          box-sizing: border-box;
          width: 135px;
          padding:7px 0;
          margin:0 auto;
          text-align: center;
          border:1px solid $color-theme;
          color: $color-theme;
          border-radius:100px;
          font-size:0;
          .icon-play{
            display:inline-block;
            vertical-align:middle;
            margin-right:6px;
            font-size:$font-size-medium-x;
          }
          .text{
            display:inline-block;
            vertical-align:middle;
            font-size:$font-size-small;
          }
        }
      }
      .filter{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4)
      }
    }
    .bg-layer{
      position: relative;
      height: 100%;
      background: $color-background;
    }
    .list{
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: $color-background;
      .song-list-wrapper{
        padding: 20px 30px;
      }
      .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
