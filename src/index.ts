// 直接使用 packet 模块的导出
import type { App } from 'vue'
import packet from './packet'

// 重新导出 packet 的所有内容
export * from './packet'

// 默认导出
export default packet

// 类型导出
export type { App }
