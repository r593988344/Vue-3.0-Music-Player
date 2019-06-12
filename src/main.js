// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './libs/rem.js'
import 'scss/variable.scss'
import 'scss/reset.scss'
import 'common/fonts/iconfont'
import store from './store/store'
import VueLazyload from 'vue-lazyload'
import fastclick from 'fastclick'

fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
