/* eslint-disable no-console */

import { register } from 'register-service-worker'

console.log(process.env.BASE_URL)
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready (registration) {
      setInterval(() => {
        console.log('registration.update')
        registration.update()
      }, 1 * 60 * 1000)
      console.log('ready，app已从service worker 缓冲中启用')
    },
    registered (registration) {
      console.log('registered，Service worker 已经注册')
    },
    cached () {
      console.log('cached，内容已经缓存在cache中')
    },
    updatefound () {
      console.log('updatefound，新的内容下载中。。。')
    },
    updated () {
      console.log('updated，新的内容已经激活，请刷新页面')
    },
    offline () {
      console.log('offline，没有网络连接，App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
