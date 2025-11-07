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
    path: '/login',
    component: () => import('~/view/Login.vue'),
    meta: { title: 'Login' },
  },
  {
    path: '/console',
    component: () => import('~/packet/Layout/Console/Console.vue'),
    meta: { title: 'Console' },
    redirect: '/console/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('~/view/Dashboard.vue'),
        meta: { title: 'Dashboard' }
      }
    ]
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

// 路由守卫：处理路由跳转问题
router.beforeEach((to, from, next) => {
  // 如果从 /login 回退到首页，使用 window.location.href 强制刷新页面
  // 这样可以绕过 Vue Router 的响应式系统，确保页面正确渲染
  if (from?.path === '/login' && (to.path === '/' || to.path === '/index')) {
    window.location.href = to.path
    return
  }
  
  // 如果访问 /console 但没有匹配到路由，重定向到 dashboard
  if (to.path === '/console' && to.matched.length === 0) {
    next({ path: '/console/dashboard', replace: true })
    return
  }
  
  // 其他情况正常处理
  next()
})

// 路由后置守卫：更新页面标题
router.afterEach((to, from, failure) => {
  // 如果导航失败，输出错误信息
  if (failure) {
    console.error('Navigation failure:', failure)
  }
  
  // 更新页面标题
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }
})

export default router