import Vue from 'vue'
import Router from 'vue-router'
const MusicDiscover = () => import(/* webpackChunkName: "group-foo" */ '@/components/discover/musicDiscover')
const MusicMine = () => import(/* webpackChunkName: "group-foo" */ '@/components/mine/musicMine')
const MusicFriends = () => import(/* webpackChunkName: "group-foo" */ '@/components/friends/musicFriends')
const MusicAccount = () => import(/* webpackChunkName: "group-foo" */ '@/components/account/musicAccount')
const MusicVideos = () => import(/* webpackChunkName: "group-foo" */ '@/components/videos/musicVideos')
const MusicList = () => import(/* webpackChunkName: "group-foo" */ '@/components/musicList/musicList')
const DailySong = () => import(/* webpackChunkName: "group-foo" */ '@/components/dailySong/dailySong')
const SongList = () => import(/* webpackChunkName: "group-foo" */ '@/components/songList/songList')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/musicDiscover'
    },
    {
      path: '/musicDiscover',
      component: MusicDiscover,
      children: [
        {
          path: 'dailySong',
          component: DailySong
        },
        {
          path: 'SongList',
          component: SongList
        },
        {
          path: ':id',
          component: MusicList
        }
      ]
    },
    {
      path: '/musicMine',
      name: 'musicMine',
      component: MusicMine
    },
    {
      path: '/musicFriends',
      name: 'musicFriends',
      component: MusicFriends
    },
    {
      path: '/musicAccount',
      name: 'musicAccount',
      component: MusicAccount
    },
    {
      path: '/musicVideos',
      name: 'musicVideos',
      component: MusicVideos
    }
  ]
})
