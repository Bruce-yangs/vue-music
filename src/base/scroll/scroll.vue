<template>
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
      },
      listenScroll: {
        type: Boolean,
        default:false
      },
      pullup: {
        type: Boolean,
        default:false
      },
      beforeScroll: {
        type: Boolean,
        default:false
      }
    },
    methods: {
        _initScroll() {
            //当存在就不执行
            if(!this.$refs.wrapper){
                return;
            }
            //否则初始化BS
            this.scroll = new BScroll(this.$refs.wrapper,{
              probeType:this.probeType,
              click:this.click
            })

            if(this.listenScroll) {
                let me = this
                this.scroll.on('scroll', (pos) => {
                  me.$emit('scroll', pos) //派发事件
                })
            }
            if(this.pullup) {/*上拉加载更多*/
                this.scroll.on('scrollEnd', () => {
                    if(this.scroll.y <= (this.scroll.maxScrollY +50)) {
                        this.$emit('scrollToEnd')
                    }
                })
            }
            if(this.beforeScroll) {
                this.scroll.on('beforeScrollStart',() => {
                    this.$emit('beforeScroll')
                })
            }
      },
      enable() {//启用 better-scroll, 默认 开启
        this.scroll && this.scroll.enable()
      },
      disable() {//禁用 better-scroll
        this.scroll && this.scroll.disable()
      },
      refresh() {//重新计算
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {//滚动到指定的位置
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {//滚动到指定的目标元素
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch:{
        //当有数据的时候，重新计算
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
  /*@import "~common/sass/variable.scss";*/

</style>
