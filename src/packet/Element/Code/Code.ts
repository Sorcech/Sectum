import type { Plugin } from 'vite'

/**
 * 将 markdown 渲染后的 code 和 pre 元素转换为 Code 组件
 * 这个插件在 markdown 被 unplugin-vue-markdown 处理之后运行
 */
export function codePlugin(): Plugin {
  return {
    name: 'code-component-plugin',
    enforce: 'post', // 在 markdown 处理之后运行
    transform(code, id) {
      // 处理所有可能的 markdown 相关文件
      const isMarkdownFile = 
        id.endsWith('.md') || 
        id.includes('.md?') || 
        id.includes('.md&') ||
        id.includes('.md.vue')
      
      if (!isMarkdownFile) {
        return null
      }
      
      // 只在包含 <pre> 或 <code> 标签时才处理
      if (!code.includes('<pre') && !code.includes('<code')) {
        return null
      }
      
      // 如果已经是 Code 组件，跳过
      if (code.includes('<cod') || code.includes('sectum-code')) {
        return null
      }

      // 先处理代码块 <pre><code class="language-xxx">...</code></pre>
      // 必须在处理行内代码之前处理，因为代码块也包含 code 标签
      // 使用更宽松的正则，支持各种空白字符和属性格式
      const newCode = code.replace(
        /<pre([^>]*)>[\s\n\r\t]*<code([^>]*)>([\s\S]*?)<\/code>[\s\n\r\t]*<\/pre>/gi,
        (match, preAttrs, codeAttrs, content) => {
          
          // 提取语言 - 支持多种格式
          const languageMatch = 
            codeAttrs.match(/class=["']language-([^"']+)["']/i) ||
            codeAttrs.match(/class=language-(\w+)/i) ||
            codeAttrs.match(/language-(\w+)/i)
          
          const language = languageMatch ? languageMatch[1].trim() : ''
          
          // 转义 HTML 特殊字符，保持代码的原始格式（包括换行和缩进）
          // 注意：HTML 中的换行符会被保留，因为 pre 标签会保持格式
          const escapedContent = content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\n/g, '&#10;') // 保留换行符
        
          // 构建 Code 组件，使用普通属性传递字符串
          return `<cod code="${escapedContent}" ${language ? `language="${language}"` : ''} :trim="false"></cod>`
        }
      )
      
      code = newCode

      // 处理单独的 <pre> 标签（如果没有 code 标签包裹）
      code = code.replace(
        /<pre([^>]*)>([\s\S]*?)<\/pre>/gi,
        (match, attrs, content) => {
          // 跳过已经被上面处理过的或包含 Code 组件的
          if (content.includes('<cod') || content.includes('__code__') || 
              content.includes('language-') || match.includes('<cod')) {
            return match
          }
          
          // 转义 HTML 特殊字符，保持原始格式
          const escapedContent = content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\n/g, '&#10;')
          return `<cod code="${escapedContent}" :trim="false"></cod>`
        }
      )

      // 最后处理行内代码 <code>...</code>（排除已经在 pre 内的）
      code = code.replace(
        /<code([^>]*)>([\s\S]*?)<\/code>/gi,
        (match, attrs, content) => {
          // 如果已经有 language 类，说明是代码块的一部分，跳过
          if (attrs && (
            attrs.includes('class="language-') || 
            attrs.includes("class='language-") || 
            attrs.includes('class=language-') ||
            attrs.includes('language-')
          )) {
            return match
          }
          
          // 行内代码使用 trim，去除首尾空白
          const escapedContent = content.trim()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
          return `<cod inline code="${escapedContent}"></cod>`
        }
      )

      return {
        code,
        map: null
      }
    }
  }
}
