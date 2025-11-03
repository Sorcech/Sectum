<template>
    <div class="flex flex-row flex-1 min-h-0 px-10">
      <div class="flex-1 w-full lg:pr-10">
          <slot />
      </div>
      <!-- 目录：同时检查 TOC 和 showCatalog -->
      <div v-show="toc && toc.length > 0 && showCatalog" class="hidden xl:block xl:row-span-3 flex-shrink-0">
        <div class="sticky top-5 h-[calc(100vh-4rem)]">
          <Catalog :toc="toc" :index="currentIndex" class="h-full" ref="catalogRef" />
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import type { TocItem as Item } from '~/packet/Pattern/Markdown/catalog'
import type { MarkdownItHeader } from '@mdit-vue/types'
import { ref, shallowRef, onMounted, onActivated, nextTick, onUnmounted, watch } from 'vue'
import Catalog from './catalog.vue'
import './markdown.css';

interface Props {
  content?: string
}

const props = defineProps<Props>()
// 使用 shallowRef 避免深度响应式，减少不必要的更新和循环
const toc = shallowRef<MarkdownItHeader[]>([])
const currentIndex = ref('')
const catalogRef = ref<InstanceType<typeof Catalog> | null>(null)
const isMountedRef = ref(false) // 标记组件是否已挂载
const showCatalog = ref(false) // 延迟显示 Catalog，避免循环
let isUpdatingToc = false // 防止并发更新 TOC

// 滚动监听
let scrollTimer: number | null = null

// 防重复处理的标志（使用 ref 确保每个组件实例独立）
const headerIdsProcessed = ref(false)
const isParsing = ref(false)
let lastParseTime = 0
const MIN_PARSE_INTERVAL = 500 // 最小解析间隔（毫秒）

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
    try {
      // 如果没有目录项，直接返回
      if (toc.value.length === 0) {
        return
      }
      
      // 获取所有标题元素（限制最多检查20个，避免性能问题）
      const maxHeaders = Math.min(toc.value.length, 20)
      const headers = toc.value.slice(0, maxHeaders).map(item => {
        return {
          id: item.slug,
          element: document.getElementById(item.slug)
        }
      }).filter(item => item.element) as {id: string, element: HTMLElement}[]
      
      if (headers.length === 0) {
        return
      }
      
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
    } catch (error) {
      // 静默处理错误
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
const showNoBackdrop = ref(false) // 为了兼容 Drawer.md 中的使用

// Drawer.md 中使用的变量
const showTopDrawer = ref(false)
const showRightDrawer = ref(false)
const showBottomDrawer = ref(false)
const showLeftDrawer = ref(false)
const showSmallDrawer = ref(false)
const showMediumDrawer = ref(false)
const showLargeDrawer = ref(false)
const showHeight32 = ref(false)
const showHeight64 = ref(false)
const showHeight96 = ref(false)

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
;(window as any).showNoBackdrop = showNoBackdrop

// 暴露 Drawer.md 中使用的变量
;(window as any).showTopDrawer = showTopDrawer
;(window as any).showRightDrawer = showRightDrawer
;(window as any).showBottomDrawer = showBottomDrawer
;(window as any).showLeftDrawer = showLeftDrawer
;(window as any).showSmallDrawer = showSmallDrawer
;(window as any).showMediumDrawer = showMediumDrawer
;(window as any).showLargeDrawer = showLargeDrawer
;(window as any).showHeight32 = showHeight32
;(window as any).showHeight64 = showHeight64
;(window as any).showHeight96 = showHeight96

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

// 为标题添加ID（带防抖和标记，避免重复处理）
let lastAddIdsTime = 0
const MIN_ADD_IDS_INTERVAL = 300 // 最小添加ID间隔（毫秒）

function addHeaderIds() {
  // 防止频繁调用
  const now = Date.now()
  if (now - lastAddIdsTime < MIN_ADD_IDS_INTERVAL && headerIdsProcessed.value) {
    return
  }
  lastAddIdsTime = now
  
  try {
    // 尝试多种选择器查找容器
    let markdownContainer = document.querySelector('.markdown-body') as HTMLElement | null
    if (!markdownContainer) {
      // 尝试查找 slot 内的第一个 div
      const slotContent = document.querySelector('.flex-1.w-full.lg\\:pr-10')
      if (slotContent) {
        markdownContainer = slotContent.querySelector('div') as HTMLElement | null
      }
    }
    if (!markdownContainer) {
      // 最后尝试查找包含 h1, h2, h3 的容器
      const header = document.querySelector('h1, h2, h3')
      if (header && header.parentElement) {
        markdownContainer = header.parentElement as HTMLElement
      }
    }
    if (!markdownContainer) {
      return
    }
    
    // 如果已经处理过，快速检查是否所有标题都有ID
    if (headerIdsProcessed.value) {
      const headers = markdownContainer.querySelectorAll('h1, h2, h3, h4, h5, h6')
      let allHaveIds = true
      let checked = 0
      for (let i = 0; i < Math.min(headers.length, 5); i++) {  // 只检查前5个，避免全量检查
        if (!headers[i].id) {
          allHaveIds = false
          break
        }
        checked++
      }
      if (allHaveIds && headers.length <= 5) {  // 如果标题少于5个且都有ID，直接返回
        return
      }
      // 如果标题很多，继续处理可能缺失ID的标题
    }
    
    const headers = markdownContainer.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let hasChanges = false
    let processedCount = 0
    
    // 使用 DocumentFragment 批量操作，减少 DOM 重排
    headers.forEach((header, index) => {
      // 如果已经有ID，跳过处理（除非ID格式不对）
      if (header.id && (header.id.startsWith('header-') || header.id.match(/^[a-z0-9-]+$/))) {
        return
      }
      
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
        hasChanges = true
        processedCount++
      } 
    })
    
    if (hasChanges) {
      headerIdsProcessed.value = true
    }
  } catch (error) {
    // 静默处理错误
  }
}

// 从DOM解析标题（带防重复处理）
function parseDOMHeaders() {
  // 防止重复解析
  if (isParsing.value) {
    return
  }
  
  // 防止频繁解析（节流）
  const now = Date.now()
  if (now - lastParseTime < MIN_PARSE_INTERVAL) {
    return
  }
  lastParseTime = now
  
  try {
    isParsing.value = true
    debugInfo.value.domStatus = '正在解析...'
    
    // 直接执行，不使用 requestAnimationFrame（避免可能的阻塞）
    addHeaderIds()
    
    // 只在 Markdown 内容容器内查找标题
    // 特殊处理：如果是 Markdown.md 文档本身，可能需要更精确的查找
    const isMarkdownDoc = window.location.pathname.includes('/markdown')
    
    // 尝试多种选择器查找容器
    let markdownContainer = document.querySelector('.markdown-body') as HTMLElement | null
    if (!markdownContainer) {
      // 尝试查找 slot 内的第一个 div
      const slotContent = document.querySelector('.flex-1.w-full.lg\\:pr-10')
      if (slotContent) {
        // 对于 Markdown.md，可能需要查找更深层的容器
        if (isMarkdownDoc) {
          // 查找所有可能的容器，选择包含标题的那个
          const allDivs = slotContent.querySelectorAll('div')
          for (const div of Array.from(allDivs)) {
            const hasHeaders = div.querySelector('h1, h2, h3')
            if (hasHeaders) {
              markdownContainer = div as HTMLElement
              break
            }
          }
        } else {
          markdownContainer = slotContent.querySelector('div') as HTMLElement | null
        }
      }
    }
    if (!markdownContainer) {
      // 最后尝试查找包含 h1, h2, h3 的容器
      const header = document.querySelector('h1, h2, h3')
      if (header && header.parentElement) {
        markdownContainer = header.parentElement as HTMLElement
      }
    }
    if (!markdownContainer) {
      debugInfo.value.domStatus = '未找到 Markdown 容器'
      isParsing.value = false
      return
    }
    
    // 查找所有标题（h1-h6），但优先使用 h2, h3
    let headers = markdownContainer.querySelectorAll('h2, h3')
    
    // 如果没有找到 h2/h3，尝试查找所有标题
    if (headers.length === 0) {
      const allHeaders = markdownContainer.querySelectorAll('h1, h2, h3, h4, h5, h6')
      // 如果没有 h2/h3，至少使用 h1
      if (allHeaders.length > 0) {
        headers = allHeaders
      }
    }
    
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
    
    // 优化：使用简单的长度和第一个标题比较，避免深度 JSON.stringify
    const shouldUpdate = 
      headerData.length !== toc.value.length ||
      (headerData.length > 0 && toc.value.length > 0 && 
       (headerData[0].slug !== toc.value[0].slug || headerData[0].title !== toc.value[0].title))
    
    if (shouldUpdate) {
      const newToc = convertTocToMarkdownItHeaders(headerData)
      
      // 先重置解析状态，避免在更新过程中触发其他逻辑
      isParsing.value = false
      
      // 使用 nextTick 延迟更新，确保在 DOM 操作完成后更新
      nextTick(() => {
        // 防止并发更新
        if (isUpdatingToc) {
          return
        }
        
        // 检查组件是否仍然挂载（防止在延迟期间组件已卸载）
        if (!isMountedRef.value) {
          return
        }
        
        // 再次检查是否需要更新（可能在延迟期间已经更新过了）
        if (toc.value.length !== newToc.length || 
            (toc.value.length > 0 && newToc.length > 0 && toc.value[0].slug !== newToc[0].slug)) {
          isUpdatingToc = true
          try {
            // 使用 shallowRef 已经避免了深度响应式，这里不需要 markRaw
            toc.value = newToc
            
            // 直接显示 Catalog，如果 TOC 有内容
            if (newToc.length > 0) {
              // 使用 nextTick 确保在响应式更新完成后显示
              nextTick(() => {
                if (isMountedRef.value && toc.value.length > 0) {
                  showCatalog.value = true
                } else {
                  // 如果条件不满足，延迟再试一次
                  setTimeout(() => {
                    if (isMountedRef.value && toc.value.length > 0) {
                      showCatalog.value = true
                    }
                  }, 200)
                }
              })
            }
          } finally {
            // 确保即使出错也重置标志
            setTimeout(() => {
              isUpdatingToc = false
            }, 10) // 延迟重置，确保更新完成
          }
        }
        debugInfo.value.domStatus = `解析完成，找到 ${headerData.length} 个项目`
      })
    } else {
      isParsing.value = false
      debugInfo.value.domStatus = `解析完成，找到 ${headerData.length} 个项目`
    }
  } catch (error) {
    debugInfo.value.domStatus = `解析错误: ${error}`
    isParsing.value = false
    throw error // 重新抛出错误以便上层捕获
  }
}

// 监听 currentIndex 的变化（使用 immediate: false 和 flush: 'post' 避免在更新过程中触发）
watch(currentIndex, (newIndex) => {
  // 只有在组件稳定且 Catalog 已显示时才处理
  if (!isMountedRef.value || !showCatalog.value || isUpdatingToc || isParsing.value) {
    return
  }
  
  // 当 currentIndex 改变时，滚动目录到对应的标题项
  if (catalogRef.value && typeof (catalogRef.value as any).scrollToItem === 'function') {
    // 使用 nextTick 确保在 DOM 更新后执行
    nextTick(() => {
      // 再次检查状态，防止在延迟期间组件已卸载
      if (!isMountedRef.value || !showCatalog.value) {
        return
      }
      try {
        (catalogRef.value as any).scrollToItem(newIndex)
      } catch (error) {
        // 静默处理错误
      }
    })
  }
}, { flush: 'post' })

// 解析 TOC 的公共函数
const doParseTOC = async () => {
  try {
    isMountedRef.value = true // 标记已挂载
    debugInfo.value.domStatus = '组件已挂载'
    
    // 如果有传入内容，解析内容中的标题
    if (props.content) {
      const parsedToc = parseHeaders(props.content)
      if (!isUpdatingToc) {
        isUpdatingToc = true
        try {
          toc.value = convertTocToMarkdownItHeaders(parsedToc)
          if (toc.value.length > 0) {
            nextTick(() => {
              if (isMountedRef.value && toc.value.length > 0) {
                showCatalog.value = true
              } else {
                setTimeout(() => {
                  if (isMountedRef.value && toc.value.length > 0) {
                    showCatalog.value = true
                  }
                }, 200)
              }
            })
          }
        } finally {
          setTimeout(() => {
            isUpdatingToc = false
          }, 10)
        }
      }
    } else {
      // 使用更安全的方式延迟解析，避免阻塞
      // 先等待 DOM 更新
      await nextTick()
      
      // 添加超时保护，防止无限等待
      const parseTimeout = setTimeout(() => {
        isParsing.value = false
      }, 5000) // 5秒超时
      
      try {
        // 使用 Promise 延迟，避免阻塞
        await new Promise<void>(resolve => {
          const timer = setTimeout(() => {
            resolve()
          }, 150)
          // 保存 timer，以便在卸载时清理
          ;(window as any).__markdownDelayTimer = timer
        })
        
        // 检查组件是否仍然挂载（防止在延迟期间组件已卸载）
        if (!isMountedRef.value) {
          clearTimeout(parseTimeout)
          if ((window as any).__markdownDelayTimer) {
            clearTimeout((window as any).__markdownDelayTimer)
            delete (window as any).__markdownDelayTimer
          }
          return
        }
        
        // 特殊处理：如果是 Markdown.md 文档本身，可能需要更精确的查找
        const isMarkdownDoc = window.location.pathname.includes('/markdown')
        
        // 尝试多种选择器查找容器
        let markdownContainer = document.querySelector('.markdown-body') as HTMLElement | null
        if (!markdownContainer) {
          // 尝试查找 slot 内的第一个 div
          const slotContent = document.querySelector('.flex-1.w-full.lg\\:pr-10')
          if (slotContent) {
            // 对于 Markdown.md，可能需要查找更深层的容器
            if (isMarkdownDoc) {
              // 查找所有可能的容器，选择包含标题的那个
              const allDivs = slotContent.querySelectorAll('div')
              for (const div of Array.from(allDivs)) {
                const hasHeaders = div.querySelector('h1, h2, h3')
                if (hasHeaders) {
                  markdownContainer = div as HTMLElement
                  break
                }
              }
            } else {
              markdownContainer = slotContent.querySelector('div') as HTMLElement | null
            }
          }
        }
        if (!markdownContainer) {
          // 最后尝试查找包含 h1, h2, h3 的容器
          const header = document.querySelector('h1, h2, h3')
          if (header && header.parentElement) {
            markdownContainer = header.parentElement as HTMLElement
          }
        }
        if (!markdownContainer) {
          clearTimeout(parseTimeout)
          if ((window as any).__markdownDelayTimer) {
            clearTimeout((window as any).__markdownDelayTimer)
            delete (window as any).__markdownDelayTimer
          }
          return
        }
        
        // 直接调用解析（不在 requestAnimationFrame 中，避免可能的阻塞）
        if (!isParsing.value && isMountedRef.value) {
          parseDOMHeaders()
        }
        
        // 清除超时
        clearTimeout(parseTimeout)
        if ((window as any).__markdownDelayTimer) {
          clearTimeout((window as any).__markdownDelayTimer)
          delete (window as any).__markdownDelayTimer
        }
        
        // 如果第一次没有找到标题，延迟后重试（但只重试一次）
        const retryTimer = setTimeout(() => {
          if (isMountedRef.value && toc.value.length === 0 && !isParsing.value) {
            parseDOMHeaders()
          }
        }, 600)
        
        // 保存 timeout ID，以便在卸载时清理
        ;(window as any).__markdownRetryTimer = retryTimer
      } catch (error) {
        clearTimeout(parseTimeout)
        if ((window as any).__markdownDelayTimer) {
          clearTimeout((window as any).__markdownDelayTimer)
          delete (window as any).__markdownDelayTimer
        }
        throw error
      }
    }
    
    // 设置滚动监听
    await nextTick()
    if (!isMountedRef.value) {
      return
    }
    
    const contentContainer = getContentContainer()
    contentContainer.addEventListener('scroll', handleScroll, { capture: true, passive: true } as any)
    
    // 初始化当前索引
    currentIndex.value = ''
  } catch (error) {
    debugInfo.value.domStatus = `解析错误: ${error}`
    // 确保即使出错也重置状态
    isParsing.value = false
  }
}

// 跟踪上次解析的路径
let lastParsedPath = ''

onMounted(async () => {
  lastParsedPath = window.location.pathname
  await doParseTOC()
})

// KeepAlive 组件激活时重新检查 TOC
onActivated(async () => {
  const currentPath = window.location.pathname
  
  // 如果路径改变了，必须重新解析（因为不同 markdown 文件内容不同）
  const pathChanged = currentPath !== lastParsedPath
  
  if (pathChanged) {
    // 清空当前 TOC，强制更新
    toc.value = []
    showCatalog.value = false
    await nextTick()
    
    // 等待一小段时间确保 DOM 完全渲染
    setTimeout(async () => {
      // 重置状态，允许重新解析
      isParsing.value = false
      headerIdsProcessed.value = false
      
      // 重新解析 TOC
      await doParseTOC()
      lastParsedPath = currentPath
    }, 150)
  } else if (toc.value.length === 0 || !showCatalog.value) {
    await nextTick()
    
    setTimeout(async () => {
      isParsing.value = false
      headerIdsProcessed.value = false
      if (showCatalog.value) {
        showCatalog.value = false
      }
      
      await doParseTOC()
    }, 100)
  }
})

onUnmounted(() => {
  try {
    isMountedRef.value = false // 标记已卸载
    showCatalog.value = false // 隐藏 Catalog
    
    const contentContainer = getContentContainer()
    contentContainer.removeEventListener('scroll', handleScroll, true)
    
    if (scrollTimer) {
      window.clearTimeout(scrollTimer)
      scrollTimer = null
    }
    
    // 清理所有定时器
    if ((window as any).__markdownRetryTimer) {
      clearTimeout((window as any).__markdownRetryTimer)
      delete (window as any).__markdownRetryTimer
    }
    if ((window as any).__markdownDelayTimer) {
      clearTimeout((window as any).__markdownDelayTimer)
      delete (window as any).__markdownDelayTimer
    }
    
    // 重置标志，允许组件下次挂载时重新处理
    headerIdsProcessed.value = false
    isParsing.value = false
    isUpdatingToc = false
  } catch (error) {
    // 静默处理错误
  }
})
</script>