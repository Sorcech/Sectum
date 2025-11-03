import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Sectum, { Store } from 'sectum'
import 'sectum/lib/style.css'
import 'uno.css'
import App from './App.vue'
import Home from './views/Home.vue'
import Product from './views/Product.vue'
import Solution from './views/Solution.vue'
import Service from './views/Service.vue'
import About from './views/About.vue'
import i18n from './locale'

// 创建全局对象，供 sectum 组件使用
const globalUtils = {
  Store,
  I18n: i18n
}

// 将工具函数挂载到 window 对象上，供 sectum 组件访问
if (typeof window !== 'undefined') {
  (window as any).globalUtils = globalUtils
}

const routes = [
  {
    path: '/',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/product',
    component: Product,
    meta: { title: '产品' }
  },
  {
    path: '/solution',
    component: Solution,
    meta: { title: '方案' }
  },
  {
    path: '/service',
    component: Service,
    meta: { title: '服务' }
  },
  {
    path: '/about',
    component: About,
    meta: { title: '关于' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(i18n)
app.use(Sectum)
app.use(router)
app.mount('#app')
