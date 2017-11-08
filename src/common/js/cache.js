import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15 //最大存储15条数据

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200  //最近播放歌曲的最大值

                              //比较函数   最大值
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)//匹配到返回 当前索引，未匹配到返回-1
  if(index === 0) {
    return
  }
  //如果存在 就删除
  if(index > 0) {
    arr.splice(index,1)
  }
  //把最新的插入到数组最前
  arr.unshift(val)

  //当有存储最大值限制时
  if(maxLen && arr.length > maxLen) {
    //pop()用于删除并返回数组的最后一个元素。
    arr.pop()
  }
}

/*封装删除本地存储方法*/
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if(index >-1) {
    arr.splice(index,1)
  }
}

/*思路：最多保存15条数据，当有重复数据，把重复的数据剔除，新加入的数据在最前边*/
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])

  insertArray(searches,query,(item) => {
    return item === query
  },SEARCH_MAX_LENGTH)

  storage.set(SEARCH_KEY,searches)//存储处理后的值
  return searches
}

/*读取本地存储的值*/
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

/*删除存储*/
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches,(item) =>{
    return item === query
  })
   storage.set(SEARCH_KEY, searches)
  return searches
}

/*清除存储*/

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}



/*思路：最多保存200条数据，当有重复数据，把重复的数据剔除，新加入的数据在最前边*/
//最近播放的歌曲
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])

  insertArray(songs,song,(item) => {
    alert(0)
    console.log(song.id+'---song')
    console.log(item.id+'---item')
    return item.id === song.id
  },PLAY_MAX_LENGTH)

  storage.set(PLAY_KEY,songs)//存储处理后的值
  return songs
}

/*读取本地存储播放的值*/
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}
