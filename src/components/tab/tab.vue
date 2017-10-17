<template>
  <div class="tab">
      <router-link tag="div" class="tab-item" to="/recommend">
        <div class="tab-link">推荐</div>
      </router-link>
      <router-link tag="div" class="tab-item" to="/singer">
        <div class="tab-link">歌手</div>
      </router-link>
      <router-link tag="div" class="tab-item" to="/rank">
        <div class="tab-link">排行</div>
      </router-link>
      <router-link tag="div" class="tab-item" to="/search">
        <div class="tab-link">搜索</div>
      </router-link>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../common/sass/variable.scss';
  .tab{
    display: flex;
    height:44px;
    line-height: 44px;
    font-size: $font-size-medium;
    .tab-item{
      flex:1;
      text-align: center;
      .tab-link{
        padding-bottom: 5px;
        color: $color-text-l;
      }
      &.router-link-active{
        .tab-link{
          color: $color-theme;
          border-bottom: 2px solid $color-theme;
        }
      }
    }
  }

</style>
