import type { App } from 'vue'
import Button from './Button/Button.vue'
import Label from './Label/Label.vue'
import Input from './Input/Input.vue'
import Checkbox from './Checkbox/Checkbox.vue'
import Toggle from './Toggle/Toggle.vue'
import Icon from './Icon/Icon.vue'
import Backdrop from './Backdrop/Backdrop.vue'
import Textarea from './Textarea/Textarea.vue'
import Transition from './Transition/Transition.vue'
import Color from './Color/Color.vue'
import Palette from './Color/Palette.vue'
import Message from './Message/Message'


const install = (app: App) => {
  app.component('btn', Button);//按钮
  app.component('lab', Label);//标签
  app.component('ipt', Input);//输入框
  app.component('tgl', Toggle);//切换开关
  app.component('ckb', Checkbox);//复选框
  app.component('icn', Icon);//图标
  app.component('bkd', Backdrop);//背景遮罩
  app.component('txa', Textarea)//文本域
  app.component('tst', Transition)//动画
  app.component('Color', Color)
  app.component('Palette', Palette)
  
  // 全局注册 Message 函数
  app.config.globalProperties.$message = Message
  app.provide('message', Message)
}

export default install //全局引用