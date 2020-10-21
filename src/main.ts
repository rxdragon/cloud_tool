import Vue from 'vue'


import store from '@/store'
import router from '@/router/index'
import App from '@/App.vue'

import './registerServiceWorker'
import './plugins/axios'
import '@/components/Toast/index'

import vuetify from './plugins/vuetify';
import get from 'lodash/get'

window._ = { get }

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
