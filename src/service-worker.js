/* eslint-disable no-undef */
if (workbox) {
  console.log(`Yay! Workbox is loaded!`)
} else {
  console.log(`Boo! Workbox didn't load!`)
}


// 设置缓存前缀和后缀，请根据实际项目名修改
workbox.core.setCacheNameDetails({
  prefix: 'cloud_tool',
  suffix: 'v1.0.5'
})

// have our sw update and control a web page as soon as possible.
self.addEventListener('message', (e) => {
  if (e.data && e.data === 'skipWaiting') {
    workbox.core.skipWaiting() // 强制等待中的 Service Worker 被激活
  }
})

workbox.core.clientsClaim() // Service Worker 被激活后使其立即获得页面控制权

// vue-cli3.0 supports pwa with the help of workbox-webpack-plugin, we need to get the precacheing list through this sentence.
workbox.precaching.cleanupOutdatedCaches()
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

// // 缓存css文件
// workbox.routing.registerRoute(
//   /.*\.css/,
//   // 使用缓存，但尽快在后台更新
//   new workbox.strategies.StaleWhileRevalidate({
//     // 使用自定义缓存名称
//     cacheName: 'css-cache'
//   })
// )

// // 缓存JS文件
// workbox.routing.registerRoute(
//   /.*\.js/,
//   // 使用缓存，但尽快在后台更新
//   new workbox.strategies.StaleWhileRevalidate({
//     // 使用自定义缓存名称
//     cacheName: 'js-cache'
//   })
// );

// // 缓存图片文件
// workbox.routing.registerRoute(
//   /\.(?:png|gif|jpg|jpeg|svg)$/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'images',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 60,
//         maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
//       })
//     ]
//   })
// )

// // 获取cdn上的资源，支持跨域，按自己的域名规则进行配置
// workbox.routing.registerRoute(
//   /^https:\/\/images\.lancky\.com\/.*\.(jpe?g|png|gif|svg)/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'cdn-images',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 10,
//         maxAgeSeconds: 5 * 24 * 60 * 60 // 5 Days
//       })
//     ],
//     fetchOptions: {
//       credentials: 'include'
//     }
//   })
// )
