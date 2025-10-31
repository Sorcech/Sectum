<script lang="ts" setup>
import { computed, ref, onMounted, watch } from 'vue'

const props = defineProps({
  // 代码内容
  code: {
    type: String,
    default: ''
  },
  // 编程语言
  language: {
    type: String,
    default: ''
  },
  // 是否为行内代码
  inline: {
    type: Boolean,
    default: false
  },
  // 是否自动换行
  wordWrap: {
    type: Boolean,
    default: false
  },
  // 是否显示行号
  showLineNumbers: {
    type: Boolean,
    default: false
  },
  // 是否去除首尾空白
  trim: {
    type: Boolean,
    default: true
  }
})

const codeRef = ref<HTMLElement | null>(null)

// 计算行号
const lineNumbers = computed(() => {
  if (props.inline || !props.showLineNumbers) return ''
  
  let number = 1
  const numbers: number[] = []
  let lastIsLineWrap = false
  
  const codeContent = props.trim ? props.code.trim() : props.code
  
  for (const char of codeContent) {
    if (char === '\n') {
      lastIsLineWrap = true
      numbers.push(number++)
    } else {
      lastIsLineWrap = false
    }
  }
  
  if (!lastIsLineWrap) {
    numbers.push(number++)
  }
  
  return numbers.join('\n')
})

// 解码 HTML 实体
const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

// 设置代码内容
const setCode = () => {
  if (!codeRef.value) return
  
  // 解码 HTML 实体（包括换行符 &#10;）
  let decodedCode = props.code
  if (props.code.includes('&#')) {
    decodedCode = decodeHtmlEntities(props.code)
  }
  
  // 行内代码去除首尾空白，代码块保持原样（包括换行和缩进）
  const codeContent = props.inline || props.trim ? decodedCode.trim() : decodedCode
  
  if (props.inline) {
    // 行内代码直接设置文本
    codeRef.value.textContent = codeContent
  } else {
    // 代码块：查找或创建 code 元素
    let codeEl = codeRef.value.querySelector('.__code__')
    if (!codeEl) {
      codeEl = document.createElement('code')
      codeEl.className = '__code__'
      codeRef.value.innerHTML = ''
      codeRef.value.appendChild(codeEl)
    }
    // 使用 textContent 保持原始格式（包括换行和空格）
    codeEl.textContent = codeContent
  }
}

// 基础样式类
const baseClasses = computed(() => {
  const classes = ['code']
  
  if (props.inline) {
    classes.push('code--inline')
  } else {
    classes.push('code--block')
  }
  
  if (props.wordWrap) {
    classes.push('code--word-wrap')
  }
  
  if (props.showLineNumbers && !props.inline) {
    classes.push('code--show-line-numbers')
  }
  
  if (props.language) {
    classes.push(`code--${props.language}`)
  }
  
  return classes.join(' ')
})

onMounted(() => {
  setCode()
})

watch(() => props.code, setCode)
watch(() => props.language, setCode)
watch(() => props.inline, setCode)
</script>

<template>
  <pre
    v-if="!inline"
    ref="codeRef"
    :class="baseClasses"
  >
    <code
      v-if="showLineNumbers && !inline"
      class="code__line-numbers"
    >
      {{ lineNumbers }}
    </code>
    <slot />
  </pre>
  <code
    v-else
    ref="codeRef"
    :class="baseClasses"
  >
    <slot />
  </code>
</template>

<style scoped>
.code {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--base-content);
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
}

/* 行内代码样式 */
.code--inline {
  background-color: var(--base-200);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  border: 1px solid var(--base-100);
  color: var(--base-content);
}

/* 代码块样式 */
.code--block {
  display: block;
  background-color: var(--base-200);
  border-radius: 0.5rem;
  border: 1px solid var(--base-100);
  padding: 1rem 1.25rem;
  margin: 1rem 0;
  overflow-x: auto;
}

.code--word-wrap {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* 行号样式 */
.code--show-line-numbers {
  position: relative;
  padding-left: 3rem;
}

.code__line-numbers {
  position: absolute;
  left: 0;
  top: 0;
  padding: 1rem 1rem;
  margin: 0;
  background-color: transparent;
  border: none;
  color: var(--base-300);
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: right;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  white-space: pre;
}

.code--show-line-numbers .__code__ {
  padding-left: 0;
}

/* 代码块内的 code 元素样式 */
.code--block code.__code__ {
  display: block;
  background-color: transparent;
  padding: 0;
  border: none;
  border-radius: 0;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  white-space: pre; /* 保持代码的原始格式，包括换行和缩进 */
  margin: 0;
}

/* 代码选择高亮 */
.code::selection,
.code ::selection {
  background-color: rgba(59, 130, 246, 0.3);
  color: inherit;
}

.code::-moz-selection,
.code ::-moz-selection {
  background-color: rgba(59, 130, 246, 0.3);
  color: inherit;
}

/* 暗色模式 */
.dark .code--inline {
  background-color: var(--dark-base-200);
  border-color: var(--dark-base-100);
  color: var(--dark-base-content, #f9fafb);
}

.dark .code--block {
  background-color: var(--dark-base-200);
  border-color: var(--dark-base-100);
  color: var(--dark-base-content, #f9fafb);
}

.dark .code__line-numbers {
  color: var(--dark-base-300);
}

.dark .code::selection,
.dark .code ::selection {
  background-color: rgba(59, 130, 246, 0.4);
}

.dark .code::-moz-selection,
.dark .code ::-moz-selection {
  background-color: rgba(59, 130, 246, 0.4);
}
</style>

