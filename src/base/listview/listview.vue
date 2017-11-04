<template>
  <scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" class="item"  :data-index="index"
            :key="item.key"
            :class="{'current' : currentIndex === index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title"> {{fixedTitle}} </h1>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getData} from 'common/js/dom'
  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30
  export default {
    data() {
      return {
        scrollY: -1,
        diff: -1,//title差值
        currentIndex: 0
      }
    },
    created() {
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList() {
          return this.data.map((group) => {
              //截取热门 ->热
              return group.title.substr(0, 1)
          })
      },
      fixedTitle() {
        if (this.scrollY > 0) return
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods: {
      refresh() {
        this.$refs.listview.refresh()
      },
      onShortcutTouchStart(e) {
        // 获取当前触摸的index getData为封装好的方法
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]//第一次触摸屏幕
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        // 向下取整
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0//求出偏移差
        // 获取移动的距离
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      // 监听scroll组件派发的scroll事件 获取滚动时的pos值
      scroll(pos) {
        this.scrollY = pos.y
//        console.log(this.scrollY)
      },
      _scrollTo(index) {

        if (!index && index !== 0) {  //去除上下的2个空白区域
          return
        }
        // 判断index上下限
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)//第二个参数0 是动画时间
      },
      // 计算每一个singer list的height
      calcHeight() {
       this.listHeight = []
       const list = this.$refs.listGroup
       let height = 0
       this.listHeight.push(height)//此处先存放第一个元素的高度 为0
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectItem(item) {//派发事件
        this.$emit('select', item)
      }
    },
    components:{
      Scroll,
      Loading
    },
    watch: {
      data() {
        setTimeout(() => {
          this.calcHeight()
        }, 20)
      },
      // 监听scrollY 获取currentIndex
      scrollY(newY) {
        const listHeight = this.listHeight

        // top 当页面滚动到顶部 newY > 0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }

        // middle 算区间值 找到对应的index     此处length - 1 是因为之前先push 了一个 height=0
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          // 向上滚动srcollY的值为负 所以加上负号
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY //当前元素高度-滚动的值  newY为负值
//             console.log(this.diff)
            // console.log(this.currentIndex)
            return
          }
        }

        // bottom 当页面滚动到底部，且-newY大于最后一个元素的上限 length - 2 同上
        this.currentIndex = listHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
//         console.log(this.fixedTop)
        //fixedTop 偏移值
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable.scss";

  .listview {
    position: relative;
    width:100%;
    height:100%;
    overflow: hidden;
    background: $color-background;
    .list-group {
      padding-bottom:30px;
      .list-group-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color:$color-text-l;
        background: $color-highlight-background;
      }
      .list-group-item{
        display: flex;
        align-items: center;
        padding:20px 0 0 30px;
        .avatar {
          width:50px;
          height:50px;
          border-radius:50%;
        }
        .name{
          margin-left:20px;
          color:$color-text-l;
          font-size: $font-size-medium;
        }
      }
    }
    .list-shortcut{
      position: absolute;
      z-index: 30;
      right:0;
      top:50%;
      transform: translateY(-50%);
      width:20px;
      padding:20px 0;
      border-radius:10px;
      text-align: center;
      background: $color-background-d;
      font-family:Helvetica;
      .item{
        padding: 3px;
        line-height: 1;
        color: $color-text-l;
        font-size: $font-size-small;
        &.current{
           color: $color-theme;
         }
      }
    }
    .list-fixed{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .fixed-title{
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }
    }
    .loading-container{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
