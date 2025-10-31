import type { Plugin } from 'vite'

export function autoWrapPlugin(): Plugin {
  return {
    name: 'auto-wrap-markdown',
    enforce: 'pre', // 确保在其他插件之前运行
    transform(code, id) {
      // 只处理.md文件
      if (!id.endsWith('.md')) {
        return null
      }
      // 检查是否已经包含Markdown包装
      if (code.includes('<Markdown>')) {
        return null
      }
      // 自动添加Markdown包装
      const wrappedCode = `<Markdown>
        ${code}
</Markdown>`
      console.log(`Auto-wrapped markdown file: ${id}`)
      return {
        code: wrappedCode,
        map: null
      }
    }
  }
}
