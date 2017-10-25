<template>
  <div class="song-list">
    <ul>
      <li v-for="song in songs" class="item">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getData} from 'common/js/dom'

    export default {
      props: {
          songs: {
              type: Array,
              default: []
          }
      },
      methods: {
          getDesc(song) {
              return `${song.singer} . ${song.album}`
          }
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable.scss";
  @import "~common/sass/mixin.scss";

  .song-list {
    .item{
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 64px;
      font-size: $font-size-medium;
      .content{
        flex:1;
        line-height: 20px;
        overflow: hidden;
        .name{
           @include no-wrap;
           color: $color-text;
        }
        .desc{
           @include no-wrap;
           margin-top: 4px;
           color: $color-text-d;
        }
      }
    }
  }
</style>
