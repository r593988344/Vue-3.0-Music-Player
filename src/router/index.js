import Vue from 'vue'
import Router from 'vue-router'
const MusicDiscover = () => import(/* webpackChunkName: "group-foo" */ '@/components/discover/musicDiscover')
const MusicMine = () => import(/* webpackChunkName: "group-foo" */ '@/components/mine/musicMine')
const MusicFriends = () => import(/* webpackChunkName: "group-foo" */ '@/components/friends/musicFriends')
const MusicAccount = () => import(/* webpackChunkName: "group-foo" */ '@/components/account/musicAccount')
const MusicVideos = () => import(/* webpackChunkName: "group-foo" */ '@/components/videos/musicVideos')
const MusicList = () => import(/* webpackChunkName: "group-foo" */ '@/components/musicList/musicList')
const DailySong = () => import(/* webpackChunkName: "group-foo" */ '@/components/dailySong/dailySong')
const SongListClassify = () => import(/* webpackChunkName: "group-foo" */ '@/components/songListClassify/songListClassify')
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
          path: 'songListClassify',
          component: SongListClassify,
          children: [
            {
              path: ':id',
              component: MusicList
            }
          ]
        },
        {
          path: ':id',
          component: MusicList
        }
      ]
    },
    {
      path: '/musicMine',
      component: MusicMine
    },
    {
      path: '/musicFriends',
      component: MusicFriends
    },
    {
      path: '/musicAccount',
      component: MusicAccount
    },
    {
      path: '/musicVideos',
      component: MusicVideos
    }
  ]
})
