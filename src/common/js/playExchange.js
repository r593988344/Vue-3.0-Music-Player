/**
 *  转换单个播放量
 * @param item
 * @type number
 * @returns {number}
 */
export function playExchange (item) {
  let numStr = Math.floor(item).toString()
  // 亿
  if (numStr.length > 8) {
    item = parseInt(numStr / 10000000) / 10 + '亿'
  } else if (numStr.length > 4) {
    // 万
    item = parseInt(numStr / 10000) + '万'
  } else {
    return item
  }
  return item
}
