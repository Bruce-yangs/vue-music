<template>
  <transition name="slide">
    <div class="singer-detail">
      aaaaaa
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
   import {mapGetters} from 'vuex'
   import {getSingerDetail} from 'api/singer'
   import {ERR_OK} from 'api/config'
   import {createSong} from 'common/js/song'
    export default {
       data(){
           return{
               songs:[]
           }
       },
      computed: {
        ...mapGetters([//接受Vuex传递的值
            'singer'
        ])
      },
      created() {
//          console.log(this.singer)
        this._getDetail()
      },
      methods:{
        _getDetail(){
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
        }
      }
    }

</script>

<style lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable.scss";
  .singer-detail{
    position: fixed;
    z-index: 100;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: $color-background;
  }
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform:translate3d(100%,0,0);
  }
</style>
