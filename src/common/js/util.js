//播放随机模式 函数

function getRandomInt(min, max) {
  /*Math.random() 会返回0~1直接的小数（不包括1） */
  return Math.floor(Math.random() * (max - min + 1) + min)//这样取随机数 包括最大值 和最小值
}

export function shuffle(arr) {
  let _arr = arr.slice()//_arr相当与arr的一个副本  不会打乱原有数据
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
