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
      // 排除代码块中的 <Markdown> 标签（这些只是示例代码）
      const hasMarkdownWrapper = code.includes('<Markdown>') && 
        !code.match(/```[\s\S]*?<Markdown>[\s\S]*?```/g)
      
      if (hasMarkdownWrapper && !code.trim().startsWith('<Markdown>')) {
        return null
      }
      
      // 自动添加Markdown包装
      // 在开头和结尾添加换行符，确保内容不会被当作缩进处理
      const wrappedCode = `<Markdown>

${code}

</Markdown>`
      return {
        code: wrappedCode,
        map: null
      }
    }
  }
}
