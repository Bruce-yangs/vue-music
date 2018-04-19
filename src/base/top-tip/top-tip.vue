<template>
  <transition name="drop">
    <div class="top-tip" v-show="showFlag" @clike.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    data(){
      return {
        showFlag: false
      }
    },
    props: {
      delay: {
        type: Number,
        default: 1500
      }
    },
    methods: {
      show() {
        this.showFlag = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.hide()
        }, this.delay)
      },
      hide() {
        this.showFlag = false
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "~common/sass/variable.scss";

  .top-tip {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 500;
    background: $color-dialog-background;
    &.drop-eanter-active, &.drop-leave-active {
      transition: all .3s;
    }
    &.drop-enter, &.drop-leave-to {
      transform: translate3d(0, -100%, 0)
    }
  }
</style>
