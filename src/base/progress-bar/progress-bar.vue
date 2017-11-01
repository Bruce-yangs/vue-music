<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
            @touchstart.prevent="progressTouchStart"
            @touchmove.prevent="progressTouchMove"
            @touchend.prevent="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {prefixStyle} from 'common/js/dom'

  const progressBtnWidth = 16
  const transform = prefixStyle('transform')

  export default {
    props: {
        percent: {
            type: Number,
            default: 0
        }
    },
    created() {
        //实例touch 之间的共享数据
        this.touch = {

        }
    },
    methods: {
      progressTouchStart(e) {
        /*initiated = true 意味着已经接触屏幕*/
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if(!this.touch.initiated) return

        /*求出纵向偏移量  移动的值*/
        const deltaX = e.touches[0].pageX - this.touch.startX

        /*算出移动的范围*/
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,this.touch.left + deltaX))

        /*实时移动按钮的位置*/
        this._offset(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.initiated = false
        this._triggerPercent()//当手指离开后 派发事件传参
      },
      _offset(offsetWidth) {//封装偏移效果

        /*进度条播放 偏移值*/
        this.$refs.progress.style.width = `${offsetWidth}px`

        /*播放按钮 偏移值*/
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      },
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange',percent)
      },
      progressClick(e) {//点击哪就播放哪的音乐
        this._offset(e.offsetX)
        this._triggerPercent()
      }
    },
    watch: {
      percent(newPercent) {
          if(newPercent >= 0 && !this.touch.initiated) {
            const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth

            /*求出偏移值*/
            const offsetWidth = newPercent * barWidth

            this._offset(offsetWidth)

          }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable.scss";
  .progress-bar{
    height:30px;
    .bar-inner{
      position: relative;
      top:13px;
      height:4px;
      background: rgba(0,0,0,0.3);
      .progress{
        position: absolute;
        height: 100%;
        background: $color-theme;

      }
      .progress-btn-wrapper{
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
          .progress-btn{
           position: relative;
           left:7px;
           top:7px;
           width: 16px;
           height:16px;
           box-sizing: border-box;
           border:3px solid $color-text;
           border-radius:50%;
           background: $color-theme;
         }
      }
    }
  }
</style>
