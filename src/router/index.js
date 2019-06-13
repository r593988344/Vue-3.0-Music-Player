import Vue from 'vue'
import Router from 'vue-router'
import MusicDiscover from '@/components/discover/musicDiscover'
import MusicMine from '@/components/mine/musicMine'
import MusicFriends from '@/components/friends/musicFriends'
import MusicAccount from '@/components/account/musicAccount'
import MusicVideos from '@/components/videos/musicVideos'
import MusicList from '@/components/musicList/musicList'
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
