import { createApp, ref, watch } from 'vue'
import MessageComponent from './Message.vue'

// 消息类型定义
export const MessageTypes = {
  SUCCESS: 'success',
  MESSAGE: 'message',
  WARNING: 'warning',
  ERROR: 'error'
} as const

export type MessageType = typeof MessageTypes[keyof typeof MessageTypes]

interface MessageOptions {
  type?: MessageType
  message: string
  duration?: number
}

const messageArr = ref<any[]>([])
const Message = (options: MessageOptions) => {
  const messageApp = createApp(MessageComponent, options as any)
  showMessage(messageApp, options.duration || 3000)
}

// 为 Message 函数添加类型化的方法
const MessageWithMethods = Message as typeof Message & {
  [K in MessageType]: (options: Omit<MessageOptions, 'type'>) => void
}

Object.values(MessageTypes).forEach(type => {
  (MessageWithMethods as any)[type] = (options: Omit<MessageOptions, 'type'>) => {
    const optionsWithType = { ...options, type }
    return Message(optionsWithType)
  }
})

function showMessage(app: any, duration: number) {
  const oFrag = document.createDocumentFragment()
  const vm = app.mount(oFrag)
  messageArr.value.push(vm)
  document.body.appendChild(oFrag)
  setTop(vm)
  vm.setVisible(true)
  watch(messageArr, () => setTop(vm))
  hideMessage(app, vm, duration)
}

function hideMessage(app: any, vm: any, duration: number) {
  vm.timer = setTimeout(async () => {
    await vm.setVisible(false)
    app.unmount()
    messageArr.value = messageArr.value.filter(item => item !== vm)
    clearTimeout(vm.timer)
    vm.timer = null
  }, duration || 3000)
}

function setTop(vm: any) {
  const { setTop, height, margin } = vm
  const currentIndex = messageArr.value.findIndex(item => item === vm)
  // 将消息显示在窗体中间的中上方，每个消息之间有适当的间距
  const baseTop = 5 // 距离顶部的基准距离（5rem）
  setTop(baseTop + (margin * 2 + height) * currentIndex)
}

export default MessageWithMethods
