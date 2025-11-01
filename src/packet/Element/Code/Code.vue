<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  code: {type: String,default: ''},// 代码内容
  language: {type: String,default: ''},// 编程语言
  inline: {type: Boolean,default: false},// 是否为行内代码
  wordWrap: {type: Boolean,default: false},// 是否自动换行
  trim: {type: Boolean,default: true}// 是否去除首尾空白
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
      codeEl.textContent = codeContent// 使用 textContent 保持原始格式（包括换行和空格）
    }
    
    // 输出 pre 元素的高度信息
    if (codeRef.value) {
      const pre = codeRef.value as HTMLElement
      const styles = window.getComputedStyle(pre)
      console.log('=== Pre 元素高度信息 ===')
      console.log('pre.clientHeight:', pre.clientHeight, 'px')
      console.log('pre.scrollHeight:', pre.scrollHeight, 'px')
      console.log('pre.offsetHeight:', pre.offsetHeight, 'px')
      console.log('pre.clientTop (上边框):', pre.clientTop, 'px')
      console.log('CSS padding-top:', styles.paddingTop)
      console.log('CSS padding-bottom:', styles.paddingBottom)
      console.log('CSS height:', styles.height)
      console.log('CSS line-height:', styles.lineHeight)
      console.log('CSS box-sizing:', styles.boxSizing)
      console.log('')
      console.log('=== 内部子元素高度 ===')
      
      // 检查顶部空白行
      const headerLine = pre.querySelector('.code-header-line') as HTMLElement
      if (headerLine) {
        const headerStyles = window.getComputedStyle(headerLine)
        console.log('code-header-line.offsetHeight:', headerLine.offsetHeight, 'px')
        console.log('code-header-line.clientHeight:', headerLine.clientHeight, 'px')
        console.log('code-header-line CSS height:', headerStyles.height)
      }
      
      // 检查语言标签
      const languageLabel = pre.querySelector('.code-language-label') as HTMLElement
      if (languageLabel) {
        const labelStyles = window.getComputedStyle(languageLabel)
        console.log('code-language-label.offsetHeight:', languageLabel.offsetHeight, 'px')
        console.log('code-language-label.clientHeight:', languageLabel.clientHeight, 'px')
        console.log('code-language-label CSS height:', labelStyles.height)
        console.log('code-language-label CSS padding:', labelStyles.padding)
      }
      
      // 检查 code-slot-container
      const slotContainer = pre.querySelector('.code-slot-container') as HTMLElement
      if (slotContainer) {
        const containerStyles = window.getComputedStyle(slotContainer)
        console.log('code-slot-container.offsetHeight:', slotContainer.offsetHeight, 'px')
        console.log('code-slot-container.clientHeight:', slotContainer.clientHeight, 'px')
        console.log('code-slot-container.scrollHeight:', slotContainer.scrollHeight, 'px')
        console.log('code-slot-container CSS height:', containerStyles.height)
        console.log('code-slot-container CSS display:', containerStyles.display)
        console.log('code-slot-container CSS line-height:', containerStyles.lineHeight)
        console.log('code-slot-container CSS margin:', containerStyles.margin)
        console.log('code-slot-container CSS padding:', containerStyles.padding)
        console.log('code-slot-container 子元素数量:', slotContainer.children.length)
        console.log('code-slot-container 文本节点数量:', Array.from(slotContainer.childNodes).filter(n => n.nodeType === Node.TEXT_NODE).length)
      }
      
      // 检查 code 元素
      const codeEl = pre.querySelector('._code') as HTMLElement
      if (codeEl) {
        const codeStyles = window.getComputedStyle(codeEl)
        console.log('_code.offsetHeight:', codeEl.offsetHeight, 'px')
        console.log('_code.clientHeight:', codeEl.clientHeight, 'px')
        console.log('_code.scrollHeight:', codeEl.scrollHeight, 'px')
        console.log('_code CSS height:', codeStyles.height)
        console.log('_code CSS line-height:', codeStyles.lineHeight)
        console.log('_code CSS display:', codeStyles.display)
        console.log('_code CSS white-space:', codeStyles.whiteSpace)
        console.log('_code CSS margin:', codeStyles.margin)
        console.log('_code CSS padding:', codeStyles.padding)
        console.log('_code textContent 行数:', codeEl.textContent?.split('\n').length || 0)
        console.log('_code textContent 长度:', codeEl.textContent?.length || 0)
      }
      
      // 计算总和（注意：绝对定位的元素不参与正常流布局）
      let totalHeight = 0
      let normalFlowHeight = 0
      
      // 绝对定位的元素（headerLine, languageLabel）不占用正常流空间
      // 只计算正常流中的元素
      if (slotContainer) {
        normalFlowHeight = slotContainer.offsetHeight
        totalHeight += slotContainer.offsetHeight
      } else if (codeEl) {
        normalFlowHeight = codeEl.offsetHeight
        totalHeight += codeEl.offsetHeight
      }
      
      // 检查 pre 的所有直接子节点（包括文本节点和注释节点）
      const allChildren = Array.from(pre.childNodes)
      let totalTextHeight = 0
      let textNodesInfo: string[] = []
      
      allChildren.forEach((node, index) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || ''
          // 即使是空白文本，也可能包含换行符
          const lines = text.split('\n').length
          const nodeHeight = lines > 1 ? (lines - 1) * 21 : 0 // 每行换行符占用 line-height
          if (lines > 1 || text.trim()) {
            totalTextHeight += nodeHeight
            // 将换行符和空格转换为可见字符以便调试
            const visibleText = text.replace(/\n/g, '\\n').replace(/ /g, '·').substring(0, 40)
            textNodesInfo.push(`  文本节点[${index}]: "${visibleText}" - ${lines}行 = ${nodeHeight}px`)
          }
        } else if (node.nodeType === Node.COMMENT_NODE) {
          textNodesInfo.push(`  注释节点[${index}]: <!-- ${(node as Comment).data.substring(0, 30)}... -->`)
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement
          textNodesInfo.push(`  元素节点[${index}]: <${el.tagName.toLowerCase()} class="${el.className}">`)
        }
      })
      
      console.log('')
      console.log('=== 高度分析 ===')
      console.log('正常流元素高度 (code-slot-container):', normalFlowHeight, 'px')
      console.log('绝对定位元素高度:')
      if (headerLine) console.log('  - header-line:', headerLine.offsetHeight, 'px (绝对定位)')
      if (languageLabel) console.log('  - language-label:', languageLabel.offsetHeight, 'px (绝对定位)')
      console.log('pre.clientHeight:', pre.clientHeight, 'px')
      console.log('pre 所有直接子节点:', allChildren.length, '个')
      if (textNodesInfo.length > 0) {
        console.log('文本/注释节点:')
        textNodesInfo.forEach(info => console.log(info))
        console.log('文本节点总高度:', totalTextHeight, 'px')
      }
      console.log('高度差:', pre.clientHeight - normalFlowHeight, 'px')
      console.log('计算验证:')
      console.log('  - code-slot-container:', normalFlowHeight, 'px')
      console.log('  - 文本节点高度:', totalTextHeight, 'px')
      console.log('  - 总和:', normalFlowHeight + totalTextHeight, 'px')
      console.log('  - pre.clientHeight:', pre.clientHeight, 'px')
      console.log('  - 剩余高度:', pre.clientHeight - normalFlowHeight - totalTextHeight, 'px')
      console.log('========================')
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
        'absolute top-0 right-0 bg-base-300 dark:bg-dark-base-300 text-base-content dark:text-dark-base-content z-10 font-medium select-none pointer-events-none px-2 py-1.5',
        isCodeExpanded ? 'rounded-bl-lg' : 'rounded-br-lg']">
        {{ language }}
      </div>
    </div>
    <pre v-show="isCodeExpanded" ref="codeRef"
      :class="[
        'font-mono text-sm leading-normal text-base-content select-text',
        'block bg-base-200 rounded-b-lg border border-t-0 border-base-100 px-5 overflow-x-auto m-0',
        'dark:bg-dark-base-200 dark:border-dark-base-100 dark:text-dark-base-content',
        {
          'code-word-wrap whitespace-pre-wrap break-words': wordWrap,
          [`code-${language}`]: language
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

