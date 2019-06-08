import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/recommend'
import Discover from '@/components/discover/discover'
import Mine from '@/components/mine/mine'
import Friends from '@/components/friends/friends'
import Account from '@/components/account/account'
import Videos from '@/components/videos/videos'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/discover',
      name: 'discover',
      component: Discover
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/friends',
      name: 'friends',
      component: Friends
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/videos',
      name: 'videos',
      component: Videos
    }
  ]
})
