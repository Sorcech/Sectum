import type { App } from 'vue'
import Group from './Group/Group.vue'
import Menu from './Menu/Menu.vue'
import Dropdown from './Dropdown/Dropdown.vue'
import Modal from './Modal/Modal.vue'
import Drawer from './Drawer/Drawer.vue'
import Table from './Table/Table.vue'
import Form from './Form/Form.vue'
import FormItem from './Form/FormItem.vue'
import Select from './Select/Select.vue'
import Calendar from './Calendar/Calendar.vue'
import Tabs from './Tabs/Tabs.vue'
import TabPane from './Tabs/TabPane.vue'
import Upload from './Upload/Upload.vue'
import File from './File/File.vue'
import Carousel from './Carousel/Carousel.vue'
import List from './List/List.vue'
import Card from './Card/Card.vue'


// 导出所有组件
export {
  Group, Menu, Dropdown, Modal, Drawer, Table, Form, FormItem, Select, Calendar, Tabs, TabPane, Upload, File, Carousel, List, Card
}

const install = (app: App) => {
  app.component('Group', Group)//组合按钮
  app.component('Menu', Menu);//菜单
  app.component('Dropdown', Dropdown);//下拉菜单
  app.component('Modal', Modal);//弹窗
  app.component('Drawer', Drawer)//抽屉
  app.component('Table', Table)//表格
  app.component('Form', Form)//表单
  app.component('FormItem', FormItem)//表单元素
  app.component('Select', Select)//下拉选择器
  app.component('Calendar', Calendar)//日历选择器
  app.component('Tabs', Tabs)
  app.component('TabPane', TabPane)
  app.component('Upload', Upload)//上传
  app.component('File',File)//文件
  app.component('Carousel', Carousel)//轮播图
  app.component('List', List)//列表
  app.component('Card', Card)//卡片
}

export default install //全局引用