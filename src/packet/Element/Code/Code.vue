<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import hljs from 'highlight.js/lib/core'
// 导入 highlight.js 样式（使用 atom-one-dark 主题，视觉效果更好的暗色主题）
// 其他可选主题：'monokai', 'dracula', 'vs2015', 'github', 'github-dark', 'tomorrow-night', 'ocean' 等
import 'highlight.js/styles/atom-one-dark.css'
// 动态导入常用语言的语法高亮
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import csharp from 'highlight.js/lib/languages/csharp'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import bash from 'highlight.js/lib/languages/bash'
import shell from 'highlight.js/lib/languages/shell'
import sql from 'highlight.js/lib/languages/sql'
import yaml from 'highlight.js/lib/languages/yaml'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import go from 'highlight.js/lib/languages/go'
import rust from 'highlight.js/lib/languages/rust'
import php from 'highlight.js/lib/languages/php'
import vue from 'highlight.js/lib/languages/xml' // Vue 使用 HTML 语法

// 注册语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('py', python)
hljs.registerLanguage('java', java)
hljs.registerLanguage('csharp', csharp)
hljs.registerLanguage('cs', csharp)
hljs.registerLanguage('css', css)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('html', xml) // HTML 使用 XML 语法高亮
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('json', json)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('md', markdown)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', shell)
hljs.registerLanguage('sh', shell)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('yml', yaml)
hljs.registerLanguage('dockerfile', dockerfile)
hljs.registerLanguage('docker', dockerfile)
hljs.registerLanguage('go', go)
hljs.registerLanguage('rust', rust)
hljs.registerLanguage('rs', rust)
hljs.registerLanguage('php', php)
hljs.registerLanguage('vue', vue)

const props = defineProps({
  code: {type: String,default: ''},// 代码内容
  language: {type: String,default: ''},// 编程语言
  inline: {type: Boolean,default: false},// 是否为行内代码
  wordWrap: {type: Boolean,default: false},// 是否自动换行
  trim: {type: Boolean,default: true},// 是否去除首尾空白
  highlight: {type: Boolean,default: true}// 是否启用代码高亮
})

const codeRef = ref<HTMLElement | null>(null)
// 代码折叠状态
const isCodeExpanded = ref(true)

// 解码 HTML 实体
const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

  // 复制代码到剪贴板
  const copyCode = async () => {
    try {
      const codeToCopy = props.code || codeRef.value?.querySelector('._code')?.textContent || ''
      await navigator.clipboard.writeText(codeToCopy)
      // TODO: 可以添加成功提示（如 toast 消息）
      console.log('代码已复制到剪贴板')
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  // 切换代码显示/隐藏
  const toggleCode = () => {
    isCodeExpanded.value = !isCodeExpanded.value
  }

// 获取高亮后的代码 HTML
const getHighlightedCode = (code: string, lang: string): string => {
  if (!props.highlight || props.inline) {
    return code
  }

  try {
    if (lang) {
      // 使用指定语言进行高亮
      const result = hljs.highlight(code, { language: lang, ignoreIllegals: true })
      return result.value
    } else {
      // 自动检测语言
      const result = hljs.highlightAuto(code, ['javascript', 'typescript', 'python', 'java', 'html', 'css', 'json', 'xml', 'bash', 'sql'])
      if (result.relevance > 2) {
        return result.value
      }
    }
  } catch (e) {
    // 如果高亮失败，返回原始代码
    console.warn('代码高亮失败:', e)
    return code
  }

  return code
}

// 设置代码内容
const setCode = () => {
  if (!codeRef.value) return
  let decodedCode = props.code// 解码 HTML 实体（包括换行符 &#10;）
  if (props.code.includes('&#')) {
    decodedCode = decodeHtmlEntities(props.code)
  }
  const codeContent = props.inline || props.trim ? decodedCode.trim() : decodedCode// 行内代码去除首尾空白，代码块保持原样（包括换行和缩进）
  if (props.inline) {
    codeRef.value.textContent = codeContent// 行内代码直接设置文本
  } else {
    let codeEl = codeRef.value.querySelector('._code')
    if (!codeEl) {
      codeEl = document.createElement('code')
      codeEl.className = '_code'
      //查找 code-slot-container div
      const slotContainer = codeRef.value.querySelector('.code-slot-container')
      if (slotContainer) {
        // 清空容器内容并将 code 插入其中
        slotContainer.innerHTML = ''
        slotContainer.appendChild(codeEl)
      } else {
        // 如果都没找到，直接添加到 pre 末尾
        codeRef.value.appendChild(codeEl)
      }
    }
    
    if (codeEl) {
      if (props.highlight) {
        // 使用代码高亮
        const highlightedCode = getHighlightedCode(codeContent, props.language)
        codeEl.innerHTML = highlightedCode
        // 添加 highlight.js 的类名
        codeEl.classList.add('hljs')
        // 移除可能存在的 language-xxx 类，添加正确的
        codeEl.classList.remove(...Array.from(codeEl.classList).filter(c => c.startsWith('language-')))
        if (props.language) {
          codeEl.classList.add(`language-${props.language}`)
        }
      } else {
        // 不使用高亮，直接设置文本
        codeEl.textContent = codeContent
        codeEl.classList.remove('hljs')
        codeEl.classList.remove(...Array.from(codeEl.classList).filter(c => c.startsWith('language-')))
      }
    }
  }
}
onMounted(() => { 
  setCode()
  
  // 清理 pre 元素中的空白文本节点（模板中的换行和缩进）
  if (codeRef.value && !props.inline) {
    nextTick(() => {
      const pre = codeRef.value as HTMLElement
      if (!pre) return
      
      // 遍历所有直接子节点，移除只包含空白字符的文本节点
      const nodesToRemove: Node[] = []
      pre.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || ''
          // 如果文本节点只包含空白字符（空格、换行、制表符），则标记为删除
          if (!text.trim() && /^[\s\n\r\t]*$/.test(text)) {
            nodesToRemove.push(node)
          }
        }
      })
      // 删除标记的节点
      nodesToRemove.forEach(node => {
        if (node.parentNode) {
          node.parentNode.removeChild(node)
        }
      })
    })
  }
})
watch(() => props.code, setCode)
watch(() => props.language, setCode)
watch(() => props.inline, setCode)
watch(() => props.highlight, setCode)
</script>

<template>
  <div v-if="!inline" class="flex flex-col gap-0 py-5">
    <!-- 顶部按钮行（单独占一行） -->
    <div :class="[
      'relative h-8 border-b border-b-solid border-base-300 dark:border-dark-base-300 flex items-center justify-center gap-3 bg-base-200 dark:bg-dark-base-200 m-0 pointer-events-auto',
      isCodeExpanded ? 'rounded-t-lg' : 'rounded-lg']">
      <!-- Code 图标按钮（折叠/展开） -->
      <button @click="toggleCode" class="p-1 rounded hover:bg-base-300 dark:hover:bg-dark-base-300 transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none"
        style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;"
        type="button" :title="isCodeExpanded ? '折叠代码' : '展开代码'">
        <icn name="code" light sm class="text-base-content/60 hover:text-base-content dark:text-dark-base-content/60 dark:hover:text-dark-base-content" />
      </button>
      <!-- Copy 图标按钮 -->
      <button @click="copyCode" class="p-1 rounded hover:bg-base-300 dark:hover:bg-dark-base-300 transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none"
        style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;"
        type="button" title="复制代码">
        <icn name="copy" light sm class="text-base-content/60 hover:text-base-content dark:text-dark-base-content/60 dark:hover:text-dark-base-content" />
      </button>
      <!-- 语言类型标签 -->
      <div v-show="isCodeExpanded" :class="[
        'absolute top-0 right-0 bg-base-300 dark:bg-dark-base-300 text-base-content dark:text-dark-base-content font-medium select-none pointer-events-none px-2 py-1.5',
        isCodeExpanded ? 'rounded-bl-lg' : 'rounded-br-lg']">
        {{ language }}
      </div>
    </div>
    <pre v-show="isCodeExpanded" ref="codeRef"
      :class="[
        'font-mono text-sm leading-normal select-text',
        'block bg-base-200 rounded-b-lg border border-t-0 border-base-100 px-5 overflow-x-auto m-0',
        'dark:bg-dark-base-200 dark:border-dark-base-100',
        {
          'code-word-wrap whitespace-pre-wrap break-words': wordWrap,
          [`code-${language}`]: language,
          // 只有在不高亮时才应用 text-base-content，避免覆盖 highlight.js 的颜色
          'text-base-content dark:text-dark-base-content': !highlight
        }
      ]"
      style="white-space: pre; margin-top: 0;"
    >
      <div class="code-slot-container py-3">
        <slot />
      </div>
    </pre>
  </div>
</template>

<style scoped>
/* 确保 highlight.js 样式在组件中正确应用 */
/* 不要覆盖 highlight.js 的颜色和背景，让高亮效果正常显示 */
:deep(.hljs) {
  display: block;
  overflow-x: auto;
  padding: 0;
}

/* 确保代码块内的样式正确，但不覆盖高亮颜色 */
:deep(.code-slot-container .hljs) {
  background: transparent;
}

/* 确保 pre 元素不会覆盖 highlight.js 的颜色 */
/* highlight.js 的颜色样式会通过导入的 CSS 文件自动应用 */
</style>

