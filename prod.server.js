var express = require('express')
var config = require('./config/index')
const axios = require('axios')


const app = express()

var apiRoutes = express.Router()

//通过启动Node本地服务 走代理的形式 抓取数据
apiRoutes.get('/getDiscList', function (req,res) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {//请求线上地址拿到数据 返回给客户端
    headers:{
      referer: 'https://c.y.qq.com',
      host:'c.y.qq.com'
    },
    params:req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

//抓取歌词
apiRoutes.get('/lyric', function (req,res) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {//请求线上地址拿到数据 返回给客户端
    headers:{//此处配置的请求头就是为了绕过 qq音乐的限制
      referer: 'https://c.y.qq.com',
      host:'c.y.qq.com'
    },
    params:req.query
  }).then((response) => {
    var ret = response.data
    if(typeof ret === 'string') {

      /*匹配歌词转换*/
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if(matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

//抓取推荐歌单 歌曲列表
apiRoutes.get('/getSongList', function (req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    // 返回的是JSONP格式的话
    if (typeof ret === 'string') {
      var reg = /^\w+\(({.+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e)=> {
    console.log(e)
  })

})


app.use('/api',apiRoutes)

app.use(express.static('./dist'))

var port = process.env.PORT || config.build.port
//启动服务端口号
module.exports = app.listen(port, function(err) {
  if(err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port)
})
