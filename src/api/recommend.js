import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'
import axios from 'axios'

export function getRecommend() {//获取banner
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const  data = Object.assign({},commonParams,{
    uin:0,
    platform:'h5',
    needNewCode:1
  })
  return jsonp(url,data,options)
}

export function getDiscList() {//获取歌单
  const url = '/api/getDiscList'

  const  data = Object.assign({},commonParams,{
    hostUin:0,
    platform:'yqq',
    needNewCode:0,
    sortId:5,
    sin:0,
    ein:29,
    categoryId:10000000,
    rnd:Math.random(),
    format:'json'//返回类型
  })
  return axios.get(url,{
    params:data
  }).then((res) => {//请求成功返回 数据
    return Promise.resolve(res.data)
  })
}
