import type { App } from 'vue'

// Layout 页面组件
import Menual from './Menual/Menual.vue'
//import Console from './Console/Console.vue'
//import Task from './Task/Task.vue'
//import Login from './Login/Login.vue'
//import Dashboard from './Dashboard/Dashboard.vue'
//import Project from './Project/Project.vue'
//import Mail from './Mail/Mail.vue'
//import Product from './Product/Product.vue'
//import Data from './Data/Data.vue'
//import Website from './Website/Website.vue'
//import Document from './Document/Document.vue'
//import Setting from './Setting/Setting.vue'

// 导出类型
//export type { TaskInfo, TaskCreate, MenuItem, UserInfo } from './Task/Task'
//export type { ProjectInfo, ProjectCreate } from './Project/Project'

// 导出 Task 服务
//export { TaskService } from './Task/TaskService'

// 导出所有 Layout 页面组件
export {
  Menual,      // 文档
//  Console,     // 控制台
//  Task,        // 任务
//  Login,       // 登录
//  Dashboard,   // 仪表盘
//  Project,     // 项目
//  Mail,        // 邮件
//  Product,     // 产品
//  Data,        // 数据
//  Website,     // 网站
//  Document,    // 文档
//  Setting      // 设置
}

// 重新导出 Model 中的布局组件（保持向后兼容）
export { Footer, Header, Navbar, Sidebar, Toolbar } from '~/packet/Model'
export type { NavItem, IconButton } from '~/packet/Model'
export type { NavbarItem } from '~/packet/Model'
export { navbarItems, navbarConfig } from '~/packet/Model'

const install = (app: App) => {
  app.component('Menual', Menual)      // 文档
//  app.component('Console', Console)    // 控制台
//  app.component('Task', Task)           // 任务
//  app.component('Login', Login)        // 登录
//  app.component('Dashboard', Dashboard)// 仪表盘
//  app.component('Project', Project)    // 项目
//  app.component('Mail', Mail)          // 邮件
//  app.component('Product', Product)    // 产品
//  app.component('Data', Data)          // 数据
//  app.component('Website', Website)    // 网站
//  app.component('Document', Document)  // 文档
//  app.component('Setting', Setting)    // 设置
}

export default install //全局引用