<template>
  <div class="player" v-show="playlist.length>0">
    <!--播放页面全屏-->
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="leaveEnter"
    >

      <div class="normal-player" v-show="fullScreen">
        <!--背景 模糊-->
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <!--顶部-->
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <!--中间cd部分-->
        <div class="middle"
             @touchstart.prevent="middleTouchStart"
             @touchmove.prevent="middleTouchMove"
             @touchend="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdClass">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <!--歌词滚动-->
             <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines"><!--当有数据的时候就可以初始化 滑动 -->
               <div class="lyric-wrapper">
                 <div v-if="currentLyric">
                   <p ref="lyricLine"
                      class="text"
                      v-for="(line, index) in currentLyric.lines"
                      :key="line.key"
                      :class="{'current': currentLineNum === index}"
                   >
                     {{line.txt}}
                   </p>
                 </div>
               </div>
             </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active' : currentShow === 'cd'}"></span>
            <span class="dot" :class="{'active' : currentShow === 'lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onpercentBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>

          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"></i>
              <!--<i :class="icon-sequence"></i>-->
            </div>
            <div class="icon i-left" :class="disableClass">
              <i class="icon-prev" @click="prev"></i>
            </div>
            <div class="icon i-center" :class="disableClass">
              <i :class="playIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon i-right" :class="disableClass">
              <i class="icon-next" @click="next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon":class="getFavoriteIcon(currentSong)" @click="toggleFavorite(currentSong)"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon" :class="cdClass">
          <img :class="cdClass" width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control"><!--@click.stop阻止冒泡-->
          <progress-circle :radius="radius" :percent="percent">
            <i :class="miniIcon" class="icon-mini" @click.stop="togglePlaying"></i>
          </progress-circle>
        </div>
        <div class="control" @click.stop="showPlaylist">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <playlist ref="playlist"></playlist>
    <audio @timeupdate="updateTime" @ended="end" ref="audio" :src="currentSong.url" @play="ready" @error="error"></audio>
  </div>
</template>

<script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import animations from 'create-keyframe-animation'
  import {prefixStyle} from 'common/js/dom'
  import ProgressBar from 'base/progress-bar/progress-bar'
  import ProgressCircle from 'base/progress-circle/progress-circle'
  import Scroll from 'base/scroll/scroll'
  import Lyric from 'lyric-parser'
  import Playlist from 'components/playlist/playlist'
  import {playerMixin} from 'common/js/mixin'
  import {playMode} from 'common/js/config'


  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')

  export default {
    mixins:[playerMixin],
    data(){
        return {
            songReady:false,
            currentTime:0,
            radius:32,
            currentLyric:null,
            currentLineNum:0,
            currentShow:'cd',
            playingLyric:''
        }
    },
    // 填充歌曲信息 控制歌曲播放
    computed: {
        cdClass(){
            return this.playing ? 'play' : 'play pause'
        },
      playIcon(){
            return this.playing ? 'icon-pause' : 'icon-play'
        },
        miniIcon(){
          return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
        },
        disableClass(){
          return this.songReady ? '' : 'disable'
        },
        percent(){//算出比例 播放
            return this.currentTime / this.currentSong.duration
        },
        //mapGetters is Array
      ...mapGetters([
        'fullScreen',//播放器显示/隐藏
       /* 'playlist',//播放器渲染
        'currentSong',//当前歌曲*/
        'playing',//播放状态
        'currentIndex',//播放索引

      ])
    },
    created(){
        this.touch = {}
    },
    methods:{
      showPlaylist(){
          this.$refs.playlist.show()
      },
      prev() {
        if(!this.songReady){
            return
        }
        /*当歌曲列表 只有一首歌的时候 切换成单曲循环 否则正常切换*/
        if (this.playlist.length === 1) {
          this.loop()
          return
        }else{
          let index = this.currentIndex -1
          if(index === -1) {
            index = this.playlist.length -1
          }
          this.setCurrentIndex(index)
          if(!this.playing) {
            this.togglePlaying()
          }
        }

        this.songReady = false

      },
      end(){//当歌曲播放完后 如果播放模式不是单曲循环 就进行下一首
        if(this.mode === playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },
      loop() {
          //当播放结束后 是循环模式的情况 把当前播放时间设置为0 再进行播放
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()

        /*当在循环播放的模式下 歌曲播放结束后 歌词显示异常没有 恢复从初始位置问题*/
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      },
      next() {
        /*当歌曲列表 只有一首歌的时候 切换成单曲循环 否则正常切换*/

        if(!this.songReady){
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          return
        }else{
          let index = this.currentIndex +1
          if(index === this.playlist.length) {
            index = 0
          }
          this.setCurrentIndex(index)
          if(!this.playing) {
            this.togglePlaying()
          }
        }

        this.songReady = false
      },
      back() {
        this.setFullScreen(false)
      },
      open(){
        this.setFullScreen(true)
      },
      //done 当执行done的时候进入下一个函数 afterEnter 依次类推
      enter(el,done){
          const {x,y,scale} =this._getPosAndScale()

          let animation = {
              0: {
                  transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
              },
              60: {
                transform:`translate3d(0,0,0) scale(1.1)`
              },
              100: {
                transform:`translate3d(0,0,0) scale(1)`
              }
          }

          animations.registerAnimation({
            name:'move',
            animation,
            presets: {
              duration: 400,
              easing: 'linear'
            }
          })
          animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter(){
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation=''
      },
      leave(el,done){
        this.$refs.cdWrapper.style.transition='all 0.4s'
        const {x,y,scale} =this._getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend',done)//监听当动画结束后 done
      },
      leaveEnter(){
        this.$refs.cdWrapper.style.transition=''
        this.$refs.cdWrapper.style[transform] = ''
      },
      //算出底部cd和中间大CD的偏移值
      _getPosAndScale(){
          const targetWidth = 40;
          const paddingLeft = 40;
          const paddingBottom = 30;
          const paddingTop = 80;//距离头部的距离
          const width = window.innerWidth*0.8;//算出大CD的宽度
          const scale = targetWidth/width;
          const x = -( window.innerWidth/2-paddingLeft);//求出偏移X
          const y = window.innerHeight-paddingTop-width/2-paddingBottom;//求出偏移Y
          return {
              x,y,scale
          }
      },
      togglePlaying(){
        if(!this.songReady){
          return
        }
        this.setPlayingState(!this.playing);
        /*当切换歌曲后  歌词仍在播放的现象*/
        if(this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      },
      ready(){
          this.songReady = true
          this.savePlayHistory(this.currentSong)
      },
      error(){
          this.songReady = true
      },
      updateTime(e){
//        console.log(this.format(this.currentTime))
          this.currentTime = e.target.currentTime
      },
      format(interval){
        interval = interval | 0     // | 0  相当于 Math.floor 向下取整计算
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      _pad(num,n=2){//n代表补充0如：0：01  字符串的长度
        let len = num.toString().length
        while (len < n) {
          num = '0'+num
          len++
        }
        return num
      },
      onpercentBarChange(percent) { //接受 progressBar 组件 派发的事件传的参数percent  动态的设置当前播放音乐的进度
        const currentTime = this.currentSong.duration * percent
        this.$refs.audio.currentTime = currentTime
          if(!this.playing) {
            this.togglePlaying()
          }

          /*当拖到滚动条后 歌词的显示位置*/
          if (this.currentLyric) {
            this.currentLyric.seek(currentTime * 1000)
          }
      },
      getLyric() {//获取到歌词 解析歌词 使用lyric-parser库
          this.currentSong.getLyric().then((lyric) => {
            this.currentLyric = new Lyric(lyric, this.handleLyric)

            if(this.currentSong.lyric !== lyric) {
              return
            }
            if(this.playing) {
              this.currentLyric.play()
            }
//            console.log(this.currentLyric)
          }).catch(() => {/*处理异常情况*/
            this.currentLyric = null
            this.playingLyric = '' //cd 下方的歌词显示为空
            this.currentLineNum = 0 //当前播放的行数为0
          })
      },
      handleLyric({lineNum,txt}) {
          this.currentLineNum = lineNum //是 数组
        console.log(this.currentLineNum)
          if(lineNum > 5) {
              let lineEl = this.$refs.lyricLine[lineNum-5]
              this.$refs.lyricList.scrollToElement(lineEl,1000) //滚动到居中歌词
          }else {
              this.$refs.lyricList.scrollTo(0,0,1000)
          }
          this.playingLyric = txt
      },
      middleTouchStart(e){
          this.touch.initiated = true
          const touch = e.touches[0]
          this.touch.startX = touch.pageX
          this.touch.startY = touch.pageY
      },
      middleTouchMove(e){
          if(!this.touch.initiated) {
              return
          }
          const touch=  e.touches[0]
          const deltaX = touch.pageX - this.touch.startX
          const deltaY = touch.pageY - this.touch.startY
          if(Math.abs(deltaY) > Math.abs(deltaX)) {/*如果纵轴的移动值> 横轴的值   就不切换到歌词*/
            return
          }
          const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
          const offsetWidth = Math.min(0,Math.max(-window.innerWidth,left + deltaX))//求出偏移值
          this.touch.percent = Math.abs(offsetWidth / window.innerWidth)//滑动的比例
        console.log(this.touch.percent)
          this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
          this.$refs.lyricList.$el.style[transitionDuration] = 0
          this.$refs.middleL.style.opacity = 1 - this.touch.percent
          this.$refs.middleL.style[transitionDuration] = 0

      },
      middleTouchEnd(){
          let offsetWidth
          let opacity
          if (this.currentShow === 'cd') {
              if (this.touch.percent > 0.1) {
                offsetWidth = - window.innerWidth
                opacity = 0
                this.currentShow = 'lyric'
              } else {
                opacity = 1
                offsetWidth = 0
              }
          }else{
            if (this.touch.percent < 0.9) {
              offsetWidth = 0
              opacity = 1
              this.currentShow = 'cd'
            } else {
              opacity = 0
              offsetWidth = - window.innerWidth
            }
          }
        const time = 300;
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`

        this.$refs.middleL.style.opacity = opacity
        this.$refs.middleL.style[transitionDuration] = `${time}ms`

      },
      ...mapMutations({
          setFullScreen:'SET_FULL_SCREEN'

      }),
      ...mapActions([
          'savePlayHistory',
          'saveFavorite',
          'deleteFavoriteList'
      ])
    },
    watch:{
      currentSong(newSong, oldSong) {//监听当前歌曲变化
        if(!newSong.id) {
          return
        }
        if(newSong.id === oldSong.id) {
          return
        }
        /*当切换歌曲后  歌词仍在播放的现象*/
        if (this.currentLyric) {
          this.currentLyric.stop()
        }
        /*此处优化 微信在后台  重新进入后的播放*/
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play()
          this.getLyric()
//          this.currentSong.getLyric()
        },1000)
      },
      playing(newPlaying) {//监听歌曲 播放状态
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play():audio.pause()
        })
      }
    },
    components:{
      ProgressBar,ProgressCircle,Scroll,Playlist
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import '~common/sass/variable.scss';
  @import '~common/sass/mixin.scss';
  .player{
    .normal-player{
      position: fixed;
      left:0;
      right:0;
      top:0;
      bottom:0;
      z-index: 150;
      background: $color-background;
      .background{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height: 100%;
        z-index:-1;
        opacity: .6;
        filter: blur(20px);
      }
      .top{
        position: relative;
        margin-bottom: 25px;
        .back{
          position: absolute;
          top:0;
          left: 6px;
          z-index:50;
          .icon-back{
            display: block;
            padding: 9px;
            font-size:$font-size-large-x;
            color:$color-theme;
            transform:rotate(-90deg);
          }
        }
        .title{
          width:70%;
          margin:0 auto;
          line-height:40px;
          text-align: center;
          @include no-wrap;
          font-size: $font-size-large;
          color: $color-text;
        }
        .subtitle{
          line-height:20px;
          text-align: center;
          font-size: $font-size-medium;
          color:$color-text;
        }
      }
      .middle{
        position: fixed;
        width: 100%;
        top:80px;
        bottom:170px;
        white-space: nowrap;
        .middle-l{
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrapper{
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            .cd{
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 10px solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              &.play{
                 animation: rotate 20s linear infinite;
               }
              &.pause{
                 animation-play-state: paused;
               }
              .image{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }

          }
          .playing-lyric-wrapper{
            width: 80%;
            margin: 30px auto 0 auto;
            overflow: hidden;
            text-align: center;
            .playing-lyric{
              height: 20px;
              line-height: 20px;
              font-size: $font-size-medium;
              color: $color-text-l;
            }
          }
        }
        .middle-r{
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;
          .lyric-wrapper{
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;
            .text{
              line-height: 32px;
              color: $color-text-l;
              font-size: $font-size-medium;
              &.current{
                 color: $color-text;
               }
            }
          }
        }
      }
      .bottom{
        position: absolute;
        bottom: 50px;
        width: 100%;
        .dot-wrapper{
          text-align: center;
          font-size: 0;
          .dot{
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $color-text-l;
            &.active{
               width: 20px;
               border-radius: 5px;
               background: $color-text-ll;
             }
          }
        }
        .progress-wrapper{
          display: flex;
          align-items: center;
          width: 80%;
          margin: 0px auto;
          padding: 10px 0;
          .time{
            color: $color-text;
            font-size: $font-size-small;
            flex: 0 0 30px;
            line-height: 30px;
            width: 30px;
            &.time-l{
               text-align: left;
             }
            &.time-r{
               text-align: right;
             }
           }
          .progress-bar-wrapper{
            flex: 1;
          }
        }
      .operators{
        display: flex;
        align-items: center;
        .icon{
          flex: 1;
          color: $color-theme;
          &.disable{
             color: $color-theme-d;
           }
          i{
            font-size: 30px
          }
        }
        .i-left{
          text-align: right;
        }
        .i-center{
          padding: 0 20px ;
          text-align: center;
          i{
            font-size: 40px;
          }
        }
        .i-right{
          text-align: left;
        }
        .icon-favorite{
          color: $color-sub-theme;
        }
      }
    }
    &.normal-enter-active, &.normal-leave-active{
        transition: all 0.4s;
        .top, .bottom{
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
      }
    &.normal-enter, &.normal-leave-to{
      opacity: 0;
      .top{
        transform: translate3d(0, -100px, 0);
      }
      .bottom{
        transform: translate3d(0, 100px, 0);
      }
    }
  }
  .mini-player{
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: $color-highlight-background;
    &.mini-enter-active, &.mini-leave-active{
      transition: all 0.4s;
    }
    &.mini-enter, &.mini-leave-to{
      opacity: 0;
    }
    .icon{
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;
      img{
        border-radius: 50%;
        &.play{
           animation: rotate 10s linear infinite;
         }
        &.pause{
           animation-play-state: paused;
         }
      }
    }
    .text{
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name{
        margin-bottom: 2px;
        @include no-wrap;
        font-size: $font-size-medium;
        color: $color-text;
      }
      .desc{
        @include no-wrap;
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }
    .control{
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;
      .icon-play-mini, .icon-pause-mini, .icon-playlist{
        font-size: 30px;
        color: $color-theme-d;
      }
      .icon-mini{
        font-size: 32px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}
@keyframes rotate{
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
};

</style>
