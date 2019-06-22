// 获取min 到 max之间的数值
function randomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function breakArray (arrLen) {
  let rand = randomNumber(0, arrLen)
  return rand
}
