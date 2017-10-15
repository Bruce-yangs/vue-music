<template>
  <div id="app">
    <m-header></m-header>
    <!--<router-view/>-->
    <!--hello world-->
  </div>
</template>

<script>
  import MHeader from 'components/mHeader/mHeader'
export default {
  name: 'app',
  components:{
    MHeader
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
