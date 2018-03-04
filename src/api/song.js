import {commonParams } from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    // callback: MusicJsonCallback_lrc,
    pcachetime: +new Date(),
    songmid: mid,
    // songmid: mid,
    g_tk: 1047875849,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return axios.get(url,{
    params:data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
