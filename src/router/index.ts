import { createRouter, createWebHistory } from 'vue-router';
import SectumRoute from './SectumRoute'
//import ConsoleRoute, { setupConsoleGuards } from './ConsoleRoute'

// 基础路由配置
const baseRoutes = [
  {
    path: '/',
    component: () => import('~/view/index.vue'),
    meta: { title: 'Index' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...baseRoutes,
    //...ConsoleRoute,
    ...SectumRoute,
    {
      path: '/test',
      component: () => import('~/view/test.vue'),
      meta: { title: 'Test' },
    },
  ]
})

// 注册 Console 相关路由守卫
//setupConsoleGuards(router)

export default router