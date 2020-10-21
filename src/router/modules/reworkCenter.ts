import Layout from '@/layout/index.vue'
import { RouteConfig } from 'vue-router'

const ReworkCenter: RouteConfig = {
  path: '/rework-center',
  component: Layout,
  name: 'ReworkCenter',
  redirect: '/rework-center/coupon-management',
  meta: { title: '退单工具', icon: 'mdi-alpha-p-circle' },
  children: [
    {
      path: 'tableList',
      name: 'ReworkTableList',
      component: () => import('@/views/rework-center/rework-table-list.vue'),
      meta: { title: '退单列表', icon: '' }
    }
  ]
}

export default ReworkCenter
