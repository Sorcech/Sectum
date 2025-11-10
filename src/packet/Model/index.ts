import type { App } from 'vue'

// Forms 组件
import TaskCreate from './Forms/TaskCreate.vue'
import AccountCreate from './Forms/AccountCreate.vue'
import ProjectCreate from './Forms/ProjectCreate.vue'
import LoginForm from './Forms/LoginForm.vue'

// Layout 组件（从 Layout 迁移到 Model）
import Footer from './Footer/Footer.vue'
import Header from './Header/Header.vue'
import Navbar from './Navbar/Navbar.vue'
import Sidebar from './Sidebar/Sidebar.vue'
import Toolbar from './Toolbar/Toolbar.vue'

// 导出类型
export type { NavItem, IconButton } from './Header/Header.vue'
export type { NavbarItem } from './Navbar/Navbar'
export type { SitemapLink, SitemapLinkGroup } from './Footer/Footer.vue'
export type { SidebarItem } from './Sidebar/Sidebar.vue'

// 导出导航配置
export { navbarItems, default as navbarConfig } from './Navbar/Navbar'

// 导出所有组件
export {
  // Forms
  TaskCreate, AccountCreate, ProjectCreate, LoginForm,
  // Layout
  Footer, Header, Navbar, Sidebar, Toolbar
}

const install = (app: App) => {
  // Forms
  app.component('TaskCreate', TaskCreate)//任务创建表单
  app.component('AccountCreate', AccountCreate)//账户创建表单
  app.component('ProjectCreate', ProjectCreate)//项目创建表单
  app.component('LoginForm', LoginForm)//登录表单
  
  // Layout
  app.component('Footer', Footer)//页脚
  app.component('Header', Header)//页眉
  app.component('Navbar', Navbar)//导航
  app.component('Sidebar', Sidebar)//侧边栏
  app.component('Toolbar', Toolbar)//工具栏
}

export default install //全局引用