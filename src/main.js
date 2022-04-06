import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 初始化
import '../public/css/reset.css'
import '../public/js/flexible'

import './plugin'


Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
