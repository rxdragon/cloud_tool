import Vue from 'vue'

import store from '@/store'
import router from '@/router/index'
import App from '@/App.vue'
import '@vant/touch-emulator'

import '@/router/guards' // 路由守护

import VConsole from 'vconsole'

import './registerServiceWorker'
import './plugins/axios'
import '@/components/Toast/index'

import './assets/font.less'

import initNotification from './plugins/notificationApi'
import vuetify from './plugins/vuetify'
import { delayLoading } from '@/utils/index' // 延时加载
import get from 'lodash/get'

window._ = { get }

document.body.style.setProperty('--vw', `${window.innerWidth}px`)
document.body.style.setProperty('--vh', `${window.innerHeight}px`)

/**
 * @description 判断设备类型
 */
function judgeIsMobile () {
  const ua = navigator.userAgent
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
  const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
  const isAndroid = ua.match(/(Android)\s+([\d.]+)/)
  const isMobile = isIphone || isAndroid

  if (isMobile && process.env.NODE_ENV !== 'production') {
    new VConsole()
  }

  Vue.prototype.$isMobile = Boolean(isMobile)
  Vue.prototype.$isIphone = Boolean(isIphone)
}
// 判断是否是移动设备
judgeIsMobile()
initNotification()


Vue.prototype.$delayLoading = delayLoading
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
