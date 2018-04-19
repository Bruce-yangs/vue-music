<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
      <scroll :refreshDelay="refreshDelay" class="shortcut" ref="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <!--搜索历史-->
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
            </h1>
            <search-list :searches="searchHistory" @select="addQuery" @delete="deleteSearchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" ref="searchResult" v-show="query">
      <suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
    </div>
    <confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空" @confirm="clearSearchHistory"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
  import SearchBox from 'base/search-box/search-box'
  import SearchList from 'base/search-list/search-list'
  import Scroll from 'base/scroll/scroll'
  import Confirm from 'base/confirm/confirm'
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
  import Suggest from 'components/suggest/suggest'
  import {playlistMixin,searchMixin} from 'common/js/mixin'
  import {mapActions} from 'vuex'
  export default {
    mixins: [playlistMixin,searchMixin],
    data(){
      return{
        hotKey:[],
        query:'',
        refreshDelay:100
      }
    },
    components: {
      SearchBox,Suggest,SearchList,Confirm,Scroll
    },
    created() {
      this._getHotKey()
    },
    methods: {
      /*解决上拉 被mini播放器挡住*/
      handlePlaylist(playlist){
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcut.refresh()

        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()
      },
      _getHotKey() {
        getHotKey().then((res) => {
            this.hotKey = res.data.hotkey.slice(0,10)//截取热搜的 前10条数据
          console.log(res.data.hotkey)
        })
      },
      showConfirm() {/*调用confirm*/
          this.$refs.confirm.show()
      },
     //此处如果只是简单的执行删除功能  可以直接 把mapActions定义的事件 赋值到对应的绑定事件上 从而减少代码量
     /* deleteOne(item){
        this.deleteSearchHistory(item)
      },
      deleteAll(){
        this.clearSearchHistory()
      },*/
      ...mapActions([
        'clearSearchHistory'
      ])
    },
    computed:{
      shortcut() {/*监听两者 任一 一个有变化就重新计算 scroll*/
          return this.hotKey.concat(this.searchHistory)
      }
    },
    watch: {
      query(newQuery) {
        if(!newQuery) {
          setTimeout(() => {
              this.$refs.shortcut.refresh()
          },20)
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  @import '~common/sass/variable.scss';
  @import '~common/sass/mixin.scss';
  .search{
    .search-box-wrapper{
      margin:20px;
    }
    .shortcut-wrapper{
      position:fixed;
      top:178px;
      bottom:0;
      width:100%;
      .shortcut{
        height: 100%;
        overflow: hidden;
        .hot-key{
          margin: 0 20px 20px 20px;
          .title{
            margin-bottom: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
          .item{
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: $color-highlight-background;
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
        .search-history{
          position: relative;
          margin: 0 20px;
          .title{
            display: flex;
            align-items: center;
            height: 40px;
            font-size: $font-size-medium;
            color: $color-text-l;
            .text{
              flex: 1;
            }
            .clear{
              @include extend-click;
              .icon-clear{
                font-size: $font-size-medium;
                color: $color-text-d;
              }
            }
          }
        }

      }
    }
    .search-result{
      position: fixed;
      width: 100%;
      top: 178px;
      bottom: 0;
    }
  }

</style>
