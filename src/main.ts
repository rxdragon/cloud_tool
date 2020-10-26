import Vue from 'vue'

import store from '@/store'
import router from '@/router/index'
import App from '@/App.vue'

// import './registerServiceWorker'
import './plugins/axios'
import '@/components/Toast/index'
import './plugins/notificationApi'

import vuetify from './plugins/vuetify';
import get from 'lodash/get'

window._ = { get }

// if (navigator.serviceWorker) {
//   navigator.serviceWorker.getRegistrations()
//     .then(regs => {
//       console.log(regs)
//     })
// }

setTimeout(() => {
  Vue.prototype.$notification({
    title: `测试`,
    body: '测试body',
    icon: `https://i2.hdslb.com/bfs/face/c50d8de65bbaad7ccd714d298854181c117863bb.jpg`
  })
}, 1000)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
