import type { App } from 'vue'

// Forms 组件
import TaskCreate from './Forms/TaskCreate.vue'
import AccountCreate from './Forms/AccountCreate.vue'
import ProjectCreate from './Forms/ProjectCreate.vue'
import LoginForm from './Forms/LoginForm.vue'

// Detail 组件
import PartDetail from './Detail/PartDetail.vue'
import SectionDetail from './Detail/SectionDetail.vue'
import SourceDetail from './Detail/SourceDetail.vue'
import StandardDetail from './Detail/StandardDetail.vue'
import ProjectDetail from './Detail/ProjectDetail.vue'
import TaskDetail from './Detail/TaskDetail.vue'
import StorageDetail from './Detail/StorageDetail.vue'
import InterlinkDetail from './Detail/InterlinkDetail.vue'

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
  // Detail
  PartDetail, SectionDetail, SourceDetail, StandardDetail, ProjectDetail, TaskDetail, StorageDetail, InterlinkDetail,
  // Layout
  Footer, Header, Navbar, Sidebar, Toolbar
}

const install = (app: App) => {
  // Forms
  app.component('TaskCreate', TaskCreate)//任务创建表单
  app.component('AccountCreate', AccountCreate)//账户创建表单
  app.component('ProjectCreate', ProjectCreate)//项目创建表单
  app.component('LoginForm', LoginForm)//登录表单
  
  // Detail
  app.component('PartDetail', PartDetail)//零件详细信息
  app.component('SectionDetail', SectionDetail)//组件详细信息
  app.component('SourceDetail', SourceDetail)//源码详细信息
  app.component('StandardDetail', StandardDetail)//标准详细信息
  app.component('ProjectDetail', ProjectDetail)//项目详细信息
  app.component('TaskDetail', TaskDetail)//任务详细信息
  app.component('StorageDetail', StorageDetail)//文件详细信息
  app.component('InterlinkDetail', InterlinkDetail)//内部链接详细信息
  
  // Layout
  app.component('Footer', Footer)//页脚
  app.component('Header', Header)//页眉
  app.component('Navbar', Navbar)//导航
  app.component('Sidebar', Sidebar)//侧边栏
  app.component('Toolbar', Toolbar)//工具栏
}

export default install //全局引用