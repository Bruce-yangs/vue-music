<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import MHeader from 'components/mHeader/mHeader'
  import Tab from 'components/tab/tab'
  import Player from 'components/player/player'
export default {
//  name: 'app',
  components:{
    MHeader,Tab,Player
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "common/sass/variable.scss";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
   /* text-align: center;
    color: #2c3e50;
    margin-top: 60px;*/
  }
</style>
