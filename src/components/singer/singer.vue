<template>
  <div class="singer">
    <listview @select="selectSinger" :data="singer"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import Listview from 'base/listview/listview'
  import {mapMutations} from 'vuex'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default {
    data() {
      return {
        singer:[]
      }
    },
    created() {
        this._getSingerList()
    },
    methods: {
        selectSinger(singer){//接受派发事件的传递
//          console.log(singer.id)

          this.$router.push({
            path:`/singer/${singer.id}`
          })
          this.setSinger(singer)
        },
        _getSingerList() {
          getSingerList().then((res) => {
            if (res.code === ERR_OK) {
              this.singer = this._normalizeSinger(res.data.list);//此处调用处理好的数据
//              console.log(this._normalizeSinger(this.singer))
            }
          })
        },
        _normalizeSinger(list) {
          let map = {
            hot: {
              title: HOT_NAME,
              items: []
            }
          }
          list.forEach((item,index) => {
            if (index < HOT_SINGER_LEN) {
                map.hot.items.push(new Singer({
                  id: item.Fsinger_mid,
                  name: item.Fsinger_name
                }))
            }
            //当key ->(a,b,c)字母顺序 没有就push
            // key 为歌手的姓 => 字母
            const key = item.Findex
            if(!map[key]) {
                map[key] = {
                    title :key,
                    items: []
                }
            }
            map[key].items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
        })
          //为了得到有序列表，如：热门->A->B这样的顺序,处理map
        let hot = []
        let ret = []
        for(let key in map) {
          let val =map[key]
          if(/[a-zA-Z]/.test(val.title)) {//当title包含字母
            ret.push(val)
          }else if(val.title === HOT_NAME) {
            hot.push(val)
          }
        }

        //进行排序又a-z
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
        console.log(map)
      },

        //映射 mutation-types 的常量SET_SINGER
        ...mapMutations({
          setSinger:'SET_SINGER'
        })
    },
    components: {
      Listview
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  /*@import '~common/sass/variable.scss';getSingerList*/
  .singer{
    position:fixed;
    top:88px;
    bottom:0;
    width: 100%;
  }


</style>
