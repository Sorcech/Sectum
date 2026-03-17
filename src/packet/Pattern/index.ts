import type { App } from 'vue'
import Theme from './Theme/Theme.vue'
import Language from './Language/Language.vue'
import Plus from './Plus/Plus.vue'
import DarkToggle from './Dark/DarkToggle.vue'
import Markdown from './Markdown/Markdown.vue'
import Catalog from './Markdown/Catalog.vue'
import FullScreen from './FullScreen/FullScreen.vue'
import Selector from './Selector/Selector.vue'
import Contact from './Contact/Contact.vue'
import Editor from './Editor/Editor.vue'

// 导出所有组件
export {
  Theme, Language, Plus, DarkToggle, Markdown, Catalog, FullScreen, Selector, Contact, Editor
}

const install = (app: App) => {
  app.component('Theme', Theme)
  app.component('Language', Language)
  app.component('Plus', Plus)
  app.component('Dark', DarkToggle)
  app.component('Markdown', Markdown)
  app.component('Catalog', Catalog)
  app.component('FullScreen', FullScreen)
  app.component('Selector', Selector)
  app.component('Contact', Contact)
  app.component('Editor', Editor)
}

export default install //全局引用