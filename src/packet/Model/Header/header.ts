// Header 导航菜单配置
// 可以通过导入此文件并传入 Header 组件的 navItems prop 来使用
// 
// 使用示例：
// ```vue
// <script setup>
// import { Header } from 'sectum'
// import navItems from './header-nav'
// </script>
// <template>
//   <Header :nav-items="navItems" />
// </template>
// ```

import type { NavItem } from './Header.vue'

export default [
  {
    title: '产品中心',
    path: '/products',
  },
  {
    title: '解决方案',
    path: '/solutions',
  },
  {
    title: '关于我们',
    path: '/about',
  },
  {
    title: '联系我们',
    path: '/contact',
  }
] as NavItem[]

