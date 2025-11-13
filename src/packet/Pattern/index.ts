import type { App } from 'vue'
import Theme from './Theme/Theme.vue'
import Language from './Language/Language.vue'
import User from './User/User.vue'
import Plus from './Plus/Plus.vue'
import Notice from './Notice/Notice.vue'
import DarkToggle from './Dark/DarkToggle.vue'
import Markdown from './Markdown/Markdown.vue'
import Catalog from './Markdown/Catalog.vue'
import FullScreen from './FullScreen/FullScreen.vue'
import Selector from './Selector/Selector.vue'
import Message from './Message/Message.vue'
import Contact from './Contact/Contact.vue'

// 导出 Markdown 相关的工具函数
export { autoWrapPlugin } from './Markdown/Markdown'

// 导出所有组件
export {
  Theme, Language, User, Plus, Notice, DarkToggle, Markdown, Catalog, FullScreen, Selector, Message, Contact
}

const install = (app: App) => {
  app.component('Theme', Theme);//主题选择
  app.component('Language', Language);//语言选择
  app.component('User', User);//用户菜单
  app.component('Plus', Plus);//创建菜单
  app.component('Notice', Notice);//通知菜单
  app.component('Dark', DarkToggle);//黑白主题切换
  app.component('Markdown', Markdown);//Markdown文档解析
  app.component('Catalog', Catalog);//目录组件
  app.component('FullScreen', FullScreen);//全屏切换
  app.component('Selector', Selector);//选择器
  app.component('Message', Message);//消息菜单
  app.component('Contact', Contact);//联系菜单
}

export default install //全局引用