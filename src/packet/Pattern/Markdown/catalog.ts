import type { Plugin } from 'vite'
import { headersPlugin } from '@mdit-vue/plugin-headers'
import type { MarkdownItEnv } from '@mdit-vue/types'
import MarkdownIt from 'markdown-it'

// 目录项接口
export interface TocItem {
  level: number
  title: string
  slug: string
  children?: TocItem[]
}

// 解析目录结构
function parseToc(headers: any[]): TocItem[] {
  const toc: TocItem[] = []
  const stack: TocItem[] = []

  headers.forEach((header) => {
    const item: TocItem = {
      level: header.level,
      title: header.title,
      slug: header.slug || header.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    }

    // 找到合适的父级
    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      toc.push(item)
    } else {
      if (!stack[stack.length - 1].children) {
        stack[stack.length - 1].children = []
      }
      stack[stack.length - 1].children!.push(item)
    }

    stack.push(item)
  })

  return toc
}

// 创建目录插件
export function createTocPlugin(): Plugin {
  return {
    name: 'markdown-toc',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.md')) return null

      const md = new MarkdownIt()
      md.use(headersPlugin)
      
      const env: MarkdownItEnv = {}
      md.render(code, env)
      
      if (env.headers && env.headers.length > 0) {
        const toc = parseToc(env.headers)
        
        // 检查是否已经有script setup
        if (code.includes('<script setup>')) {
          // 如果已经有script setup，在其中添加toc
          const updatedCode = code.replace(/defineExpose\([^)]*\)/, (match) => {
            const content = match.slice(12, -1)
            return `defineExpose({ ${content}, toc })`
          })
          
          // 在defineExpose之前添加toc变量
          const tocVar = `\nconst toc = ${JSON.stringify(toc, null, 2)}\n`
          const finalCode = updatedCode.replace(/defineExpose/, tocVar + 'defineExpose')
          
          return {
            code: finalCode,
            map: null
          }
        } else {
          // 如果没有script setup，创建一个新的
          const tocData = `\n<script setup>
// 自动生成的目录数据
const toc = ${JSON.stringify(toc, null, 2)}
defineExpose({ toc })
</script>\n\n`
          
          return {
            code: tocData + code,
            map: null
          }
        }
      }

      return null
    }
  }
}

export default createTocPlugin
