<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
      <div class="dots">
        <span class="dot" v-for="item in dots"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
  export default {
    data(){
        return{
          dots:[]
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
      },20)
    },
    methods: {
        _setSliderWidth() {
            //找到sliderG的所有children
          this.children = this.$refs.sliderGroup.children;
          let width = 0
          let sliderWidth = this.$refs.slider.clientWidth;

          for(let i = 0;i < this.children.length; i++) {
              let child = this.children[i]
              addClass(child,'slider-item')
              child.style.width = sliderWidth + 'px'
              width += sliderWidth
          }

          if(this.loop) {
              width += 2 * sliderWidth
          }
          this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initSlider() {
          this.slider = new BScroll(this.$refs.slider,{
            scrollX:true,
            scrollY:false,
            momentum:false,
            snap:true,
            snapLoop:this.loop,//循环
            snapThreshold:0.3,
            snapSpeed:400,
//            click:true
          })
      },
      _initDots(){
        this.dots = new Array(this.children.length);
      }
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
