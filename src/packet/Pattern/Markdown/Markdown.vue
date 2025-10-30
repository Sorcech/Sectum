<template>
    <div class="flex flex-row flex-1 min-h-0 px-10">
      <div class="lg:w-4/5 w-full lg:pr-10">
          <slot />
      </div>
      <div v-if="toc && toc.length > 0" class="hidden xl:block xl:row-span-3">
        <div class="sticky top-5 h-[calc(100vh-4rem)]">
          <Catalog :toc="toc" :index="currentIndex" class="h-full" ref="catalogRef" />
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import type { TocItem as Item } from '~/packet/Pattern/Markdown/catalog'
import type { MarkdownItHeader } from '@mdit-vue/types'
import { ref, onMounted, nextTick, onUnmounted, watch } from 'vue'
import Catalog from './Catalog.vue'
import './markdown.css';

interface Props {
  content?: string
}

const props = defineProps<Props>()
const toc = ref<MarkdownItHeader[]>([])
const currentIndex = ref('')
const catalogRef = ref<InstanceType<typeof Catalog> | null>(null)

// 滚动监听
let scrollTimer: number | null = null

// 获取 Markdown 内容滚动容器（优先 markdown-body，其次 .doc，最后 documentElement）
const getContentContainer = (): HTMLElement => {
  const markdownBody = document.querySelector('.markdown-body') as HTMLElement | null
  if (markdownBody) return markdownBody
  const docContainer = document.querySelector('.doc') as HTMLElement | null
  if (docContainer) return docContainer
  return document.documentElement
}

// 滚动处理函数
const handleScroll = () => {
  // 防抖处理
  if (scrollTimer) {
    window.clearTimeout(scrollTimer)
  }
  scrollTimer = window.setTimeout(() => {
    // 获取所有标题元素
    const headers = toc.value.map(item => {
      return {
        id: item.slug,
        element: document.getElementById(item.slug)
      }
    }).filter(item => item.element) as {id: string, element: HTMLElement}[]
    
    // 查找当前视口中的标题
    let currentId = ''
    for (let i = headers.length - 1; i >= 0; i--) {
      const header = headers[i]
      const rect = header.element.getBoundingClientRect()
      
      // 如果标题在视口上方或刚好在视口顶部，则认为是当前标题
      if (rect.top <= 100) {
        currentId = header.id
        break
      }
    }
    
    // 只有当当前ID改变时才更新
    if (currentId !== currentIndex.value) {
      currentIndex.value = currentId
      
      // 滚动目录到当前标题项
      if (catalogRef.value && typeof (catalogRef.value as any).scrollToItem === 'function') {
        (catalogRef.value as any).scrollToItem(currentId)
      }
    }
  }, 100)
}

// 为文档示例定义的响应式变量 - 必须在defineProps之后定义
const showTop = ref(false)
const showRight = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showSmall = ref(false)
const showMedium = ref(false)
const showLarge = ref(false)
const showHeightDrawer = ref(false)
const showScrollDrawer = ref(false)
const showNoBackdropDrawer = ref(false)

// 将这些变量简单地暴露给全局作用域
;(window as any).showTop = showTop
;(window as any).showRight = showRight
;(window as any).showBottom = showBottom
;(window as any).showLeft = showLeft
;(window as any).showSmall = showSmall
;(window as any).showMedium = showMedium
;(window as any).showLarge = showLarge
;(window as any).showHeightDrawer = showHeightDrawer
;(window as any).showScrollDrawer = showScrollDrawer
;(window as any).showNoBackdropDrawer = showNoBackdropDrawer

// 转换 TocItem 到 MarkdownItHeader
function convertTocToMarkdownItHeaders(tocItems: Item[]): MarkdownItHeader[] {
  return tocItems.map(item => ({
    level: item.level,
    title: item.title,
    slug: item.slug,
    link: `#${item.slug}`,
    children: item.children ? convertTocToMarkdownItHeaders(item.children) : []
  }))
}

// 调试信息
const debugInfo = ref({
  headerCount: 0,
  domStatus: '未初始化',
  containerContent: '未检查'
})

// 解析Markdown内容中的标题
function parseHeaders(content: string): Item[] {
  const lines = content.split('\n')
  const headers: Item[] = []
  const stack: Item[] = []

  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const title = match[2].trim()
      const slug = title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

      const item: Item = {
        level,
        title,
        slug,
        children: []
      }

      // 构建层级结构
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop()
      }

      if (stack.length === 0) {
        headers.push(item)
      } else {
        if (!stack[stack.length - 1].children) {
          stack[stack.length - 1].children = []
        }
        stack[stack.length - 1].children!.push(item)
      }

      stack.push(item)
    }
  })

  return headers
}

// 为标题添加ID
function addHeaderIds() {
  const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  
  headers.forEach((header, index) => {
    const text = header.textContent || ''
    let slug = text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    
    // 如果slug为空（例如，因为中文被剥离），则创建一个 fallback ID
    if (!slug) {
      slug = `header-${index}` 
    }

    // 如果标题没有ID或者ID不匹配，则设置ID
    if (!header.id || header.id !== slug) {
      header.id = slug
    } 
  })
}

// 从DOM解析标题
function parseDOMHeaders() {
  debugInfo.value.domStatus = '正在解析...'
  
  addHeaderIds()
  
  // 只在 Markdown 内容容器内查找标题
  const markdownContainer = document.querySelector('.markdown-body')
  if (!markdownContainer) {
    debugInfo.value.domStatus = '未找到 Markdown 容器'
    return
  }
  
  const headers = markdownContainer.querySelectorAll('h2, h3')
  
  debugInfo.value.headerCount = headers.length
  debugInfo.value.containerContent = markdownContainer ? `Markdown容器存在，标题数: ${headers.length}` : 'Markdown容器不存在'
  
  const headerData: Item[] = []
  const stack: Item[] = []

  headers.forEach((header, index) => {
    const level = parseInt(header.tagName.charAt(1))
    const title = header.textContent || ''
    const slug = header.id || ''

    const item: Item = {
      level,
      title,
      slug,
      children: []
    }

    // 构建层级结构
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop()
    }

    if (stack.length === 0) {
      headerData.push(item)
    } else {
      const parent = stack[stack.length - 1]
      if (!parent.children) {
        parent.children = []
      }
      parent.children!.push(item)
    }
    stack.push(item)
  })
  toc.value = convertTocToMarkdownItHeaders(headerData)
  debugInfo.value.domStatus = `解析完成，找到 ${headerData.length} 个项目`
}

// 监听 currentIndex 的变化
watch(currentIndex, (newIndex) => {
  // 当 currentIndex 改变时，滚动目录到对应的标题项
  if (catalogRef.value && typeof (catalogRef.value as any).scrollToItem === 'function') {
    (catalogRef.value as any).scrollToItem(newIndex)
  }
})

onMounted(async () => {
  debugInfo.value.domStatus = '组件已挂载'
  
  // 如果有传入内容，解析内容中的标题
  if (props.content) {
    const parsedToc = parseHeaders(props.content)
    toc.value = convertTocToMarkdownItHeaders(parsedToc)
  } else {
    await nextTick()// 等待下一个tick确保DOM已更新
    parseDOMHeaders()// 立即尝试解析
    
    // 如果第一次没有找到标题，延迟后重试
    if (toc.value.length === 0) {
      setTimeout(() => {parseDOMHeaders()}, 100)
      setTimeout(() => {parseDOMHeaders()}, 500)
      setTimeout(() => {parseDOMHeaders()}, 1000)
    }
  }
  
  // 设置滚动监听
  await nextTick()
  const contentContainer = getContentContainer()
  contentContainer.addEventListener('scroll', handleScroll, { capture: true, passive: true } as any)
  
  // 初始化当前索引
  currentIndex.value = ''
})

onUnmounted(() => {
  const contentContainer = getContentContainer()
  contentContainer.removeEventListener('scroll', handleScroll, true)
  
  if (scrollTimer) {
    window.clearTimeout(scrollTimer)
  }
})
</script>