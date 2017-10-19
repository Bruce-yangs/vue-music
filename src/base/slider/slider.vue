0<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
  export default {
    data(){
        return{
          dots:[],
          currentPageIndex: 0
        }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 3000
      }
    },
    mounted() {
        //setTimeout 为了better-scroll 初始化  浏览器一般17秒刷新
      setTimeout(() => {
        this._setSliderWidth();
        this._initDots();
        this._initSlider();

        if (this.autoPlay) {//当如果有自动播放
          this._play();
        }
      },20)

      //此处监听浏览器模式打开 当切换屏幕尺寸时，轮播图的大小问题
      window.addEventListener('resize', () => {
        if (!this.slider) {
            return;
        }
        //当切换 重新计算宽度 true是为了区分 已经多加2次的宽度，如果重复加2次的宽度 就出现错乱现象
        this._setSliderWidth(true);
        this.slider.refresh();//重新计算
      })
    },
    methods: {
        _setSliderWidth(isResize) {//计算宽度
            //找到sliderG的所有children
          this.children = this.$refs.sliderGroup.children;
          let width = 0
          let sliderWidth = this.$refs.slider.clientWidth;//获取当前父级元素的宽度

          for(let i = 0;i < this.children.length; i++) {
              let child = this.children[i]
              addClass(child,'slider-item')//给所有child动态加样式
              child.style.width = sliderWidth + 'px'
              width += sliderWidth
          }

          if(this.loop && !isResize) {//此处无缝轮播会拷贝2个child 所以宽度 再多加2次
              width += 2 * sliderWidth
          }
          this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initSlider() {
            //初始化BS
          this.slider = new BScroll(this.$refs.slider,{
            scrollX:true,
            scrollY:false,
            momentum:false,
            snap:true,
            snapLoop:this.loop,//当this.loop为true 的时候，slide父级 宽度就要多加2次
            snapThreshold:0.3,
            snapSpeed:400
          })
          // 获取当前页 currentPageIndex this.slider是BS里绑定的方法 有scrollEnd
          this.slider.on('scrollEnd', () => {
            let pageIndex = this.slider.getCurrentPage().pageX //获取当前的index
            if (this.loop) {//如果有this.loop 就要先减一 这样下标 才对应当前下标
              pageIndex -= 1
            }
            this.currentPageIndex = pageIndex

            if (this.autoPlay) {//当手动触发轮播时，每次轮播前清除定时器，再调一次this._play()方法,解决轮播错乱
              clearTimeout(this.timer)
              this._play()
            }
          })
      },
      _initDots() {
            //对应轮播图下标的圆点
        this.dots = new Array(this.children.length);
      },
      _play() {//自动播放
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
            //作用：当我们做 slide 组件的时候，slide 通常会分成多个页面。调用此方法可以滚动到指定的页面
          this.slider.goToPage(pageIndex, 0, 400)//goToPage 也是BS提供的 (pageIndex, 0, 400) 0代表Y轴 400表示间隔和this.interval保持一致
        }, this.interval)
      }
    },
    destroyed() {//当有计时器的页面 销毁计时器
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable.scss";

  .slider {
     min-height: 1px;

    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
         width: 20px;
         border-radius: 5px;
         background: $color-text-ll;
       }
    }
  }
}
</style>
