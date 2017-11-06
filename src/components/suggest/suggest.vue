<template>
  <scroll class="suggest" ref="suggest"
          :data="result" @scrollToEnd="searchMore" @beforeScroll="listScroll"
          :pullup="pullup"
          :beforeScroll="beforeScroll">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉,暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
  import {createSong} from 'common/js/song'
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import Scroll from 'base/scroll/scroll'
  import NoResult from 'base/no-result/no-result'
  import Loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  import {mapMutations,mapActions} from 'vuex'


  const TYPE_SINGER = 'singer'
  const perpage = 20
  export default {
    data(){
        return {
          page:1,
          result:[],
          pullup:true,
          hasMore:true,
          beforeScroll:true
        }
    },
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      /*点击搜索歌曲 或歌手*/
      selectItem(item){
        if (item.type === TYPE_SINGER) {
            const singer = new Singer({
              id:item.singermid,
              name:item.singername
            })
            this.$router.push({
              path:`/search/${singer.id}`
            })
            this.setSinger(singer)
        }else {
            this.insertSong(item)
        }
        /*向父组件派发 事件 监听存储播放历史*/
        this.$emit('select')
      },
      refresh(){
          this.$refs.suggest.refresh()
      },
      search() {
        /*当输入框发生变化后 重新初始化scroll组件*/
        this.page =1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0,0)

        /*传入 查找内容的参数 包括分页 */
        search(this.query,this.page,this.showSinger,perpage).then((res) => {
            if(res.code === ERR_OK) {
              this.result = this.getResult(res.data)
              this._checkMore(res.data)
            }
        })
      },
      searchMore(){/*搜索更多*/
        if(!this.hasMore) {
          return
        }
        this.page ++
        this.search(this.query,this.page,this.showSinger,perpage).then((res) => {
          if(res.code === ERR_OK) {
            this.result = this.result.concat(this.getResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      listScroll(){
          this.$emit('listScroll')
      },
      _checkMore(data){/*监听是否 还有数据 没有更多就不加载*/
        const song = data.song
        if(!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
          this.hasMore = false
        }
      },
      getResult(data) {
        let ret = []
        if(data.zhida && data.zhida.singerid) {
            ret.push({...data.zhida, ...{type:TYPE_SINGER}})
        }
        if(data.song) {
            ret = ret.concat(this._normalizeSong(data.song.list))
        }
        return ret
      },
      getIconCls(item){
        if(item.type === TYPE_SINGER) {
            return 'icon-mine'
        }else {
            return 'icon-music'
        }
      },
      getDisplayName(item){
        if(item.type === TYPE_SINGER) {
            return item.singername
        }else{
            return `${item.name}-${item.singer}`
        }
      },
      _normalizeSong(list) {
        let ret = []
        list.forEach((musicData) => {
            if(musicData.songid && musicData.albumid) {
                ret.push(createSong(musicData))
            }
        })
        return ret
      },
      //映射 mutation-types 的常量SET_SINGER
      ...mapMutations({
        setSinger:'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
        query() {
            this.search()
        }
    },
    components:{
      Scroll,Loading,NoResult
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable.scss";
  @import "~common/sass/mixin.scss";
  .suggest{
    height: 100%;
    overflow: hidden;
    .suggest-list{
      padding:0 30px;
      .suggest-item{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
      }
      .icon{
        flex:0 0 30px;
        width:30px;
        [class^="icon-"]{
          font-size: 14px;
          color: $color-text-d;
        }
      }
      .name{
        flex:1;
        font-size:$font-size-medium;
        color: $color-text-d;
        overflow: hidden;
        .text{
          @include no-wrap;
        }
      }
    }
    .no-result-wrapper{
      position: absolute;
      width: 100%;
      top:50%;
      transform: translateY(-50%);
    }
  }
</style>
