import type { Plugin } from 'vite'

// 目录项接口定义
export interface TocItem {
  level: number
  title: string
  slug: string
  children?: TocItem[]
}

export function autoWrapPlugin(): Plugin {
  return {
    name: 'auto-wrap-markdown',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.md')) {
        return null
      }
      const hasMarkdownWrapper = code.includes('<Markdown>') &&
        !code.match(/```[\s\S]*?<Markdown>[\s\S]*?```/g)
      if (hasMarkdownWrapper && !code.trim().startsWith('<Markdown>')) {
        return null
      }
      // 与 Cumulu 一致：不包装，原始 .md 直接交给 unplugin-vue-markdown，Drawer/User 等均能正常编译
      return null
    }
  }
}
