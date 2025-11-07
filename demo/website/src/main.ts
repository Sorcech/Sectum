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
import Profile from './views/Profile.vue'
// Product child routes
import ProductSelection from './views/product/ProductSelection.vue'
import ElectricRoller from './views/product/ElectricRoller.vue'
import DrivenRoller from './views/product/DrivenRoller.vue'
import DriveModule from './views/product/DriveModule.vue'
import GatewayModule from './views/product/GatewayModule.vue'
// Solution child routes
import Enterprise from './views/solution/Enterprise.vue'
import Smb from './views/solution/Smb.vue'
// Service child routes
import Support from './views/service/Support.vue'
import Training from './views/service/Training.vue'
import Maintenance from './views/service/Maintenance.vue'
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
    path: '/profile',
    component: Profile,
    meta: { title: '用户中心' }
  },
  {
    path: '/product',
    component: Product,
    meta: { title: '产品' }
  },
  {
    path: '/product/selection',
    component: ProductSelection,
    meta: { title: '产品选型' }
  },
  {
    path: '/product/electric-roller',
    component: ElectricRoller,
    meta: { title: '电动辊筒' }
  },
  {
    path: '/product/driven-roller',
    component: DrivenRoller,
    meta: { title: '从动辊筒' }
  },
  {
    path: '/product/drive-module',
    component: DriveModule,
    meta: { title: '驱动模块' }
  },
  {
    path: '/product/gateway-module',
    component: GatewayModule,
    meta: { title: '网关模块' }
  },
  {
    path: '/solution',
    component: Solution,
    meta: { title: '方案' }
  },
  {
    path: '/solution/enterprise',
    component: Enterprise,
    meta: { title: '企业解决方案' }
  },
  {
    path: '/solution/smb',
    component: Smb,
    meta: { title: '中小企业方案' }
  },
  {
    path: '/service',
    component: Service,
    meta: { title: '服务' }
  },
  {
    path: '/service/support',
    component: Support,
    meta: { title: '技术支持' }
  },
  {
    path: '/service/training',
    component: Training,
    meta: { title: '培训服务' }
  },
  {
    path: '/service/maintenance',
    component: Maintenance,
    meta: { title: '维护服务' }
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
