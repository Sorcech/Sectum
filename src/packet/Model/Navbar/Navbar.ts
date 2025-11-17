// 导航项类型定义
export interface NavbarItem {
  title: string
  icon: string
  path: string
}

// 默认导航配置
const defaultNavbarItems: NavbarItem[] = [{
  title: 'Dashboard',
  icon: 'gauge',
  path: '/dashboard',
}, {
  title: 'Task',
  icon: 'calendar-check',
  path: '/task',
}, {
  title: 'Project',
  icon: 'layer-group',
  path: '/project'
}, {
  title: 'Mail',
  icon: 'envelope',
  path: '/mail'
}, {
  title: 'Product',
  icon: 'atom',
  path: '/product'
}, {
  title: 'Data',
  icon: 'database',
  path: '/data'
}, {
  title: 'Website',
  icon: 'globe',
  path: '/website'
}, {
  title: 'Mastery',
  icon: 'blog',
  path: '/mastery'
}, {
  title: 'Setting',
  icon: 'gear',
  path: '/setting'
}]

// 命名导出
export { defaultNavbarItems as navbarItems }
export { defaultNavbarItems }

// 默认导出（保持向后兼容）
export default defaultNavbarItems

