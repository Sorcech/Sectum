import { App } from 'vue'
import Element from './Element'
import Section from './Section'
import Pattern from './Pattern'
import Model from './Model'
import Layout from './Layout'

// 重新导出所有子模块的组件
export * from './Element'
export * from './Section'
export * from './Pattern'
export * from './Layout'
export * from './Model'

const install = (app: App) => {
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