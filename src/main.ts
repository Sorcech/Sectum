import App from './App.vue'
import { createApp } from 'vue'
import Sectum, { Store } from './packet'
import Router from './router'
import I18n from './locale'
import 'uno.css'

// 创建全局对象，供组件库内部使用
const globalUtils = {
  Store,
  I18n
}

// 将工具函数挂载到 window 对象上，供组件库访问
if (typeof window !== 'undefined') {
  (window as any).globalUtils = globalUtils
}

createApp(App).use(Router).use(Sectum).use(I18n).mount('#app')
