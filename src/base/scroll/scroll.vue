0<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      }
    },
    methods: {
        _initScroll() {
            //当存在就不执行
            if(!this.$refs.wrapper){
                return;
            }
            //否则初始化BS
            this.slider = new BScroll(this.$refs.wrapper,{
              probeType:this.probeType,
              click:this.click
            })
      },
      enable() {
            this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {//重新计算
        this.scroll && this.scroll.refresh()
      }
    },
    watch:{
        data() {
          setTimeout(() => {
            this.refresh()
          },20)
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll()
        },20)
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable.scss";

</style>
