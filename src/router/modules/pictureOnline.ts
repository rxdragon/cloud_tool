import Layout from '@/layout/index.vue'
import { RouteConfig } from 'vue-router'

const PictureOnline: RouteConfig = {
  path: '/picture-online',
  component: Layout,
  name: 'PictureOnline',
  redirect: '/picture-online/picture-search',
  meta: { title: '在线看片模块', icon: 'mdi-image-edit' },
  children: [
    {
      path: 'pictureSearch',
      name: 'PictureSearch',
      component: () => import('@/views/picture-online/picture-search.vue'),
      meta: { title: '在线看片订单查询', icon: '' }
    }
  ]
}

export default PictureOnline
