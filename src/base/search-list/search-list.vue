<template>
  <div class="search-list">
    <transition-group name="list" tag="ul">
      <li :key="item" @click="selectItem(item)" class="search-item" v-for="item in searches">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
  import {debounce} from 'common/js/util'

  export default {
    props: {
      searches: {
        type: Array,
        default: []
      }
    },
    created() {
        //把v-model query 文本框参数暴露出去   debounce封装的节流方法  快速输入的时候不会发送请求
        this.$watch('query',debounce((newQuery) => {
            this.$emit('query',newQuery)
        },200))
    },
    methods: {
      selectItem(item) {
          this.$emit('select',item)
      },
      deleteOne(item) {
          this.$emit('delete',item)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable.scss";
  @import "~common/sass/mixin.scss";
  .search-list{
    .search-item{
      display: flex;
      align-items: center;
      height: 40px;
      &.list-enter-active,&.list-leave-active{
        transition:all .1s;
      }
      &.list-enter,&.list-leave-to{
        height: 0;
      }
      .text{
        flex: 1;
        color: $color-text-l;
      }
      .icon{
        @include extend-click;
        .icon-delete{
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
    }
  }
</style>
