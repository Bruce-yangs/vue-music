<template>
  <div class="search-box" ref="progressBar" >
    <i class="icon-search" @click=""></i>
    <input ref="query" type="text" class="box" :placeholder="placeholder" v-model="query">
    <i v-show="query" class="icon-dismiss"  @click="clear"></i>
  </div>
</template>

<script>
  import {debounce} from 'common/js/util'

  export default {
    data(){
        return {
          query:''
        }
    },
    props: {
        placeholder: {
            type: String,
            default: '搜索歌曲、歌手'
        }
    },
    created() {
        //把v-model query 文本框参数暴露出去   debounce封装的节流方法  快速输入的时候不会发送请求
        this.$watch('query',debounce((newQuery) => {
            this.$emit('query',newQuery)
        },200))
    },
    methods: {
      clear() {
          this.query=''
      },
      setQuery(query) {
        this.query = query
      },
      blur(){
        this.$refs.query.blur()
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable.scss";
  .search-box{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width:100%;
    padding:0 6px;
    height: 40px;
    background: $color-highlight-background;
    border-radius:6px;
    .icon-search{
      font-size: 24px;
      color: $color-background;
    }
    .box{
      flex:1;
      margin:0 5px;
      line-height:18px;
      background: $color-highlight-background;
      color: $color-text;
      font-size: $font-size-medium;
      &::placeholder{
        color: $color-text-d;
      }
    }
    .icon-dismiss{
      font-size:16px;
      color: $color-background;
    }
  }
</style>
