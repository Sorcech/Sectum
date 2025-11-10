import type { App } from 'vue'
import Button from './Button/Button.vue'
import Label from './Label/Label.vue'
import Input from './Input/Input.vue'
import Checkbox from './Checkbox/Checkbox.vue'
import Toggle from './Toggle/Toggle.vue'
import Icon from './Icon/Icon.vue'
import Mask from './Mask/Mask.vue'
import Textarea from './Textarea/Textarea.vue'
import Transition from './Transition/Transition.vue'
import Color from './Color/Color.vue'
import Palette from './Color/Palette.vue'
import Toast from './Toast/Toast'
import Code from './Code/Code.vue'
import Avatar from './Avatar/Avatar.vue'
import Image from './Image/Image.vue'

// 导出 Excel 工具函数
export { exportExcel } from './Excel/Excel'

// 导出 Code 插件
export { codePlugin } from './Code/Code'

// 导出所有组件
export {
  Button, Label, Input, Checkbox, Toggle, Icon, Mask, Textarea, Transition, Color, Palette, Toast, Code, Avatar, Image
}

const install = (app: App) => {
  app.component('btn', Button);//按钮
  app.component('lab', Label);//标签
  app.component('ipt', Input);//输入框
  app.component('tgl', Toggle);//切换开关
  app.component('ckb', Checkbox);//复选框
  app.component('icn', Icon);//图标
  app.component('msk', Mask);//背景遮罩
  app.component('txa', Textarea)//文本域
  app.component('tst', Transition)//动画
  app.component('cod', Code)//代码
  app.component('avt', Avatar)//头像
  app.component('imag', Image)//图片
  app.component('Color', Color)
  app.component('Palette', Palette)
  
  // 全局注册 Toast 函数
  app.config.globalProperties.$toast = Toast
  app.provide('toast', Toast)
}

export default install //全局引用