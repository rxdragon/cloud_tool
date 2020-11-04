import Vue from 'vue'

import store from '@/store'
import router from '@/router/index'
import App from '@/App.vue'

import './registerServiceWorker'
import './plugins/axios'
import '@/components/Toast/index'
import './plugins/notificationApi'

import './assets/font.less'

import vuetify from './plugins/vuetify'
import { delayLoading } from '@/utils/index' // 延时加载
import get from 'lodash/get'

window._ = { get }

// if (navigator.serviceWorker) {
//   navigator.serviceWorker.getRegistrations()
//     .then(regs => {
//       console.log(regs)
//     })
// }

Vue.prototype.$delayLoading = delayLoading
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
