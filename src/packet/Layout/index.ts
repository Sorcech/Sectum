import type { App } from 'vue'
import Footer from './Footer/Footer.vue'
import Header from './Header/Header.vue'
import Navbar from './Navbar/Navbar.vue'
import Sidebar from './Sidebar/Sidebar.vue'
import Toolbar from './Toolbar/Toolbar.vue'


const install = (app: App) => {
  app.component('Footer', Footer)//页脚
  app.component('Header', Header)//页眉
  app.component('Navbar', Navbar)//导航
  app.component('Sidebar', Sidebar)//侧边栏
  app.component('Toolbar', Toolbar)//工具栏
}

export default install //全局引用