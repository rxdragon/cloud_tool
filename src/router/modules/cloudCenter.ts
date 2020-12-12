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
    }
  ]
}

export default CloudCenter
