import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'//初始化页面 重定向
    },{
      path: '/recommend',
      component: Recommend
    },{
      path: '/rank',
      component: Rank
    },{
      path: '/search',
      component: Search
    },{
      path: '/singer',
      component: Singer
    }
  ]
})
