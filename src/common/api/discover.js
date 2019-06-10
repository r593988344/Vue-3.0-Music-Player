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
