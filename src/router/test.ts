import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Layout from '@/layout/index.vue'

export const asyncRoutes: Array<RouteConfig> = [
  // reworkCenter
]
// 基础权限路由
export const constantRoutes: Array<RouteConfig> = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  }, {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: { hidden: true }
  }, {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/dashboard.vue'),
        meta: { title: '面板', icon: 'mdi-equalizer', affix: true }
      }
    ]
  }, {
    path: '/401',
    meta: { hidden: true },
    component: () => import('@/views/error-page/401.vue')
  }, {
    path: '*',
    meta: { hidden: true },
    component: () => import('@/views/error-page/404.vue'),
  },
  ...asyncRoutes
]

Vue.use(VueRouter)

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRoutes
})

export const router: any = createRouter()

// url不变强制刷行
export function resetRouter () {
  const newRouter: any = createRouter()
  router.matcher = newRouter.matcher
}
