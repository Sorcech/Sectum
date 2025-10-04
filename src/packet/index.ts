import { App } from 'vue'
import Element from './Element'
import Section from './Section'
import Pattern from './Pattern'
import Model from './Model'
import Layout from './Layout'
import { generateCSSVariables } from './Pattern/Theme/theme'

// 重新导出所有子模块的组件
export * from './Element'
export * from './Section'
export * from './Pattern'
export * from './Layout'
export * from './Model'


// 导出存储功能
export { Store } from './Util/storage'

// 导出 UnoCSS 配置
export * from './Config'

const install = (app: App) => {
  // 定义 process 对象，解决 UnoCSS 在浏览器环境中的 process is not defined 错误
  if (typeof process === 'undefined') {
    (window as any).process = { env: {} }
    ;(globalThis as any).process = { env: {} }
  }
  
  // 动态注入 CSS 变量
  if (typeof document !== 'undefined') {
    const style = document.createElement('style')
    style.textContent = generateCSSVariables()
    document.head.appendChild(style)
  }
  
  app.use(Element);//元素
  app.use(Section);//组件
  app.use(Pattern);//部件
  app.use(Layout);//布局
  app.use(Model);//模板
}

export { Element } //按需引入
export { Section } //按需引入
export { Pattern } //按需引入
export { Layout } //按需引入
export { Model } //按需引入
export default install //全局引用