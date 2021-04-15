import Layout from '@/layout/index.vue'
import { RouteConfig } from 'vue-router'

const CloudCenter: RouteConfig = {
  path: '/cloud-center',
  component: Layout,
  name: 'CloudCenter',
  redirect: '/cloud-center/level-search',
  meta: { title: '云端系统模块', icon: 'mdi-account-search' },
  children: [
    {
      path: 'levelSearch',
      name: 'LevelSearch',
      component: () => import('@/views/cloud-center/level-search.vue'),
      meta: { title: '升级等级查询', icon: '' }
    },
    {
      path: 'CloudDashboard',
      name: 'CloudDashboard',
      component: () => import('@/views/cloud-center/cloud-dashboard.vue'),
      meta: { title: '云端指标', icon: '' }
    },
    {
      path: 'cloudQueue',
      name: 'CloudQueue',
      component: () => import('@/views/cloud-center/cloud-queue.vue'),
      meta: { title: '云端队列修复', icon: '' }
    },
    {
      path: 'epibolyFix',
      name: 'EpibolyFix',
      component: () => import('@/views/cloud-center/epiboly-fix.vue'),
      meta: { title: '卡单修复', icon: '' }
    },
    {
      path: 'cloudOrderQuery',
      name: 'CloudOrderQuery',
      component: () => import('@/views/cloud-center/cloud-order-query.vue'),
      meta: { title: '云端订单查询', icon: '' }
    },
    {
      path: 'cloudOrderQuery/orderDetail',
      name: 'OrderDetail',
      component: () => import('@/views/cloud-center/components/order-detail.vue'),
      meta: { hidden: true },
    },
  ]
}

export default CloudCenter
