import type { App } from 'vue'
import Theme from './Theme/Theme.vue'
import Language from './Language/Language.vue'
import DarkToggle from './Dark/DarkToggle.vue'
import Markdown from './Markdown/Markdown.vue'
import Catalog from './Markdown/catalog.vue'
import FullScreen from './FullScreen/FullScreen.vue'

// 导出所有组件
export {
  Theme, Language, DarkToggle, Markdown, Catalog, FullScreen
}

const install = (app: App) => {
  app.component('Theme', Theme);//主题选择
  app.component('Language', Language);//语言选择
  app.component('Dark', DarkToggle);//黑白主题切换
  app.component('Markdown', Markdown);//Markdown文档解析
  app.component('Catalog', Catalog);//目录组件
  app.component('FullScreen', FullScreen);//全屏切换
}

export default install //全局引用