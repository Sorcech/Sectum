import { createApp, ref, watch } from 'vue'
import ToastComponent from './Toast.vue'

// 消息类型定义
export const ToastTypes = {
  SUCCESS: 'success',
  MESSAGE: 'message',
  WARNING: 'warning',
  ERROR: 'error'
} as const

export type ToastType = typeof ToastTypes[keyof typeof ToastTypes]

interface ToastOptions {
  type?: ToastType
  message: string
  duration?: number
}

const toastArr = ref<any[]>([])
const Toast = (options: ToastOptions) => {
  const toastApp = createApp(ToastComponent, options as any)
  showToast(toastApp, options.duration || 3000)
}

// 为 Toast 函数添加类型化的方法
const ToastWithMethods = Toast as typeof Toast & {
  [K in ToastType]: (options: Omit<ToastOptions, 'type'>) => void
}

Object.values(ToastTypes).forEach(type => {
  (ToastWithMethods as any)[type] = (options: Omit<ToastOptions, 'type'>) => {
    const optionsWithType = { ...options, type }
    return Toast(optionsWithType)
  }
})

function showToast(app: any, duration: number) {
  const oFrag = document.createDocumentFragment()
  const vm = app.mount(oFrag)
  toastArr.value.push(vm)
  document.body.appendChild(oFrag)
  setTop(vm)
  vm.setVisible(true)
  watch(toastArr, () => setTop(vm))
  hideToast(app, vm, duration)
}

function hideToast(app: any, vm: any, duration: number) {
  vm.timer = setTimeout(async () => {
    await vm.setVisible(false)
    app.unmount()
    toastArr.value = toastArr.value.filter(item => item !== vm)
    clearTimeout(vm.timer)
    vm.timer = null
  }, duration || 3000)
}

function setTop(vm: any) {
  const { setTop, height, margin } = vm
  const currentIndex = toastArr.value.findIndex(item => item === vm)
  // 将消息显示在窗体中间的中上方，每个消息之间有适当的间距
  const baseTop = 5 // 距离顶部的基准距离（5rem）
  setTop(baseTop + (margin * 2 + height) * currentIndex)
}

export default ToastWithMethods

