import Vue from 'vue'
import { Route } from 'vue-router/types/router'
import router from './index'
import { UserStoreModule } from '@/store/modules/userStore'

import NProgress from 'nprogress' // 加载进度条
import { getXStreamId, getStreamIdExpireTime } from '../utils/sessionTool' // get token from cookie
import * as UserApi from '../api/userApi'
import '@assetsDir/styles/nprogress.less' // 进度条颜色

NProgress.configure({ showSpinner: false }) // 关闭加载微调器

const whiteList = ['/', '/login', '/auth-redirect', '/401', '/404'] // 白名单

router.beforeEach(async (to: Route, from: Route, next: any) => {
  NProgress.start() // 读取进度条
  const hasXStreamId = getXStreamId() // 获取token
  // 没有过期时的操作
  async function noExpire () {
    console.log(to.path, 'noExpire')
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (whiteList.includes(to.path)) {
        next()
      }
      const name = UserStoreModule.name
      if (name) {
        next()
      } else {
        await UserStoreModule.getUserInfo()
        next({ ...to, replace: true })
      }
    }
  }

  function goLogin () {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }

  if (hasXStreamId) {
    console.log(hasXStreamId)
    // 下次的过期时间
    const expireTime = getStreamIdExpireTime() * 1000
    const nowTime = new Date().getTime()
    const discrepancyTime = expireTime - nowTime
    if (discrepancyTime > 0) {
      // 过期时间小于1小时续上
      if (discrepancyTime < 60 * 60 * 1000) {
        await UserApi.userExpire()
      }
      noExpire()
    } else if (discrepancyTime < 0) {
      UserApi.logout()
      goLogin()
    }
  } else {
    goLogin() // 没有xStreamId
  }
})

router.afterEach(() => {
  let container = document
  const appLoading = container.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none"
  }
  NProgress.done() // 读取完成
})
