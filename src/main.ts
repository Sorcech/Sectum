import App from './App.vue'
import { createApp } from 'vue'
import Sectum, { Store } from './packet'
import Router from './router'
import I18n from './locale'
import { initPageMeta } from './packet/Config/favicon'
import 'uno.css'

// 创建全局对象，供组件库内部使用
const globalUtils = {Store,I18n}

// 将工具函数挂载到 window 对象上，供组件库访问
if (typeof window !== 'undefined') {(window as any).globalUtils = globalUtils}

initPageMeta()// 初始化页面元信息（favicon 和 title，从配置中读取）

createApp(App).use(Router).use(Sectum).use(I18n).mount('#app')
