<script setup lang="ts">
import { PropType, computed, ref} from 'vue'
import type { MarkdownItHeader } from '@mdit-vue/types'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()

// 主组件的 props
const props = defineProps({
  toc: { type: Array as PropType<MarkdownItHeader[]>, default: () => [] },
  index: { type: String, default: '' }
})

// 添加目录容器引用
const catalog = ref<HTMLElement | null>(null)
const hasHeadings = computed(() => props.toc.length > 0)

// 标题层级样式映射 - 控制目录缩进
const headingCssClassMap: Record<number, string> = {
  1: '',      // H1 无缩进
  2: 'ml-1',  // H2 缩进 0.5rem (8px)
  3: 'ml-2',  // H3 缩进 1rem (16px)
  4: 'ml-3',  // H4 缩进 1.5rem (24px)
  5: 'ml-4',  // H5 缩进 2rem (32px)
  6: 'ml-5', // H6 缩进 2.5rem (40px)
}

// 检查是否为活动项（优先使用滚动同步过来的 index，退化到 hash）
const isActiveItem = (slug: string) => {
  if (props.index) return props.index === slug
  return route.hash === `#${decodeURIComponent(slug)}`
}

// 获取链接样式类
const getLinkClasses = (level: number, slug: string) => {
  const isActive = isActiveItem(slug)
  return [
    'toc-link inline-block no-underline w-full transition-colors duration-200 text-sm py-1',
    headingCssClassMap[level] || '',
    isActive
      ? 'text-primary border-l-2 border-l-solid border-primary bg-base-200 dark:bg-dark-base-200 px-3.5'
      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 px-4',
  ]
}

// 处理链接点击，实现平滑滚动
const handleLinkClick = (event: Event, slug: string) => {
  event.preventDefault()
  
  // 滚动到锚点
  const element = document.getElementById(slug)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
    
    // 更新URL hash
    history.pushState(null, '', `#${slug}`)
  }
}

// 暴露方法给父组件调用
defineExpose({
  scrollToRatio: (ratio: number) => {
    if (catalog.value) {
      const maxScrollTop = catalog.value.scrollHeight - catalog.value.clientHeight
      catalog.value.scrollTop = ratio * maxScrollTop
    }
  },
  // 滚动到指定的标题项
  scrollToItem: (slug: string) => {
    if (catalog.value) {
      const element = catalog.value.querySelector(`[href="#${slug}"]`)
      if (element) {
        const containerRect = catalog.value.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()
        
        // 计算元素在容器中的位置
        const elementTop = elementRect.top - containerRect.top + catalog.value.scrollTop
        
        // 将元素滚动到容器中间位置
        const scrollTo = elementTop - (catalog.value.clientHeight / 2) + (elementRect.height / 2)
        catalog.value.scrollTop = scrollTo
      }
    }
  },
  getScrollRatio: () => {
    if (catalog.value) {
      const scrollTop = catalog.value.scrollTop
      const maxScrollTop = catalog.value.scrollHeight - catalog.value.clientHeight
      return maxScrollTop > 0 ? scrollTop / maxScrollTop : 0
    }
    return 0
  }
})

</script>

<template>
  <!-- 使用 UnoCSS 原子类，通过 .toc 前缀保持隔离 -->
  <div class="toc order-last hidden flex-shrink-0 border-l border-l-solid pl-2 border-base-200 dark:border-dark-base-200 xl:block h-full">
    <div ref="catalog" class="h-full z-0 overflow-x-hidden overflow-y-auto pr-2 hide-scrollbar">
        <ul v-if="hasHeadings" class="toc-list list-none m-0 p-0 pt-2">
          <p class="toc-title text-base font-semibold my-4 mb-2 tracking-tight text-gray-900 dark:text-gray-300">
            {{ t("home.tableOfContent") }}
          </p>
          <li v-for="heading in toc" :key="heading.slug" :class="[headingCssClassMap[heading.level], 'toc-item list-none']">
            <a 
              :href="`#${heading.slug}`" 
              :class="getLinkClasses(heading.level, heading.slug)"
              :aria-selected="isActiveItem(heading.slug)"
              @click="handleLinkClick($event, heading.slug)"
            >
              {{ heading.title }}
            </a>
            
            <!-- 递归渲染子项 -->
            <ul v-if="heading.children && heading.children.length > 0" class="toc-nested-list list-none m-0 p-0">
              <li v-for="child in heading.children" :key="child.slug" :class="[headingCssClassMap[child.level], 'toc-nested-item list-none']">
                <a 
                  :href="`#${child.slug}`" 
                  :class="getLinkClasses(child.level, child.slug)"
                  :aria-selected="isActiveItem(child.slug)"
                  @click="handleLinkClick($event, child.slug)"
                >
                  {{ child.title }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  </div>
</template>

<style scoped>
/* 隐藏滚动条 - 无法用 UnoCSS 表达 */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

</style>
