import { createRouter, createWebHistory } from 'vue-router';
import SectumRoute from './SectumRoute.js'

// 基础路由配置
const baseRoutes = [
  {
    path: '/',
    component: () => import('~/view/index.vue'),
    meta: { title: 'Index' },
  },
  {
    path: '/profile',
    component: () => import('~/view/index.vue'),
    meta: { title: 'Profile' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...baseRoutes,
    ...SectumRoute,
    {
      path: '/test',
      component: () => import('~/view/test.vue'),
      meta: { title: 'Test' },
    },
  ]
})
export default router