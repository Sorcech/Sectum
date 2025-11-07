import type { App } from 'vue'
import Footer from './Footer/Footer.vue'
import Header from './Header/Header.vue'
import Navbar from './Navbar/Navbar.vue'
import Sidebar from './Sidebar/Sidebar.vue'
import Toolbar from './Toolbar/Toolbar.vue'
import Menual from './Menual/Menual.vue'

// 导出类型
export type { NavItem, IconButton } from './Header/Header.vue'
export type { NavbarItem } from './Navbar/Navbar'

// 导出导航配置
export { navbarItems, default as navbarConfig } from './Navbar/Navbar'

// 导出所有组件
export {
  Footer, Header, Navbar, Sidebar, Toolbar, Menual
}

const install = (app: App) => {
  app.component('Footer', Footer)//页脚
  app.component('Header', Header)//页眉
  app.component('Navbar', Navbar)//导航
  app.component('Sidebar', Sidebar)//侧边栏
  app.component('Toolbar', Toolbar)//工具栏
  app.component('Menual', Menual)//文档
}

export default install //全局引用