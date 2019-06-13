import { Host } from '../js/config'
import axios from 'axios'
// 获取首页banner图
export function getBanner () {
  const url = Host + '/banner'
  return axios.get(url)
}
// 获取每日推荐歌单
export function getPersonalized () {
  const url = Host + '/personalized'
  return axios.get(url)
}
// 获取每日推荐歌单具体内容
export function getPersonalizedDetail (id) {
  const url = Host + '/playlist/detail?id=' + id
  return axios.get(url)
}
// 获取视频排行
// limit 取出数量，默认为30
export function getMVrank (limit) {
  const url = Host + '/top/mv?limit=' + limit
  return axios.get(url)
}
// 获取mv数据
export function MVdata (id) {
  const url = Host + '/mv/detail?mvid=' + id
  return axios.get(url)
}
