// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.filter('timeFilter', function (value) {
  if (!value) {
    return ''
  }
  let time = new Date().getTime() - new Date(value).getTime()
  if (time < 0) {
    return ''
  } else if (time / 1000 < 60) {
    return '刚刚'
  } else if (time / (1000 * 60) < 60) {
    return `${Math.ceil(time / (1000 * 60))} 分钟前`
  } else if (time / (1000 * 60 * 60) < 24) {
    return `${Math.ceil(time / (1000 * 60 * 60))} 小时前`
  } else if (time / (1000 * 60 * 60 * 24) < 30) {
    return `${Math.ceil(time / (1000 * 60 * 60 * 24))} 天前`
  } else if (time / (1000 * 60 * 60 * 24 * 30) < 12) {
    return `${Math.ceil(time / (1000 * 60 * 60 * 24 * 30))} 个月前`
  } else {
    return `${Math.ceil(time / (1000 * 60 * 60 * 24 * 30))} 年前`
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
