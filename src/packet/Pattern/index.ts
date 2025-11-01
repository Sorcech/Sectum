import type { App } from 'vue'
import ThemeSelect from './Theme/ThemeSelect.vue'
import LanguageSelect from './Language/LanguageSelect.vue'
import DarkChange from './Dark/DarkChange.vue'
import Markdown from './Markdown/Markdown.vue'
import Catalog from './Markdown/catalog.vue'
import FullScreen from './FullScreen/FullScreen.vue'

// 导出所有组件
export {
  ThemeSelect, LanguageSelect, DarkChange, Markdown, Catalog, FullScreen
}

const install = (app: App) => {
  app.component('Theme', ThemeSelect);//主题选择
  app.component('Language', LanguageSelect);//语言选择
  app.component('Dark', DarkChange);//黑白主题切换
  app.component('Markdown', Markdown);//Markdown文档解析
  app.component('Catalog', Catalog);//目录组件
  app.component('FullScreen', FullScreen);//全屏切换
}

export default install //全局引用