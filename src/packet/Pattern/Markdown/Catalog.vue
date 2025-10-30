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
const catalogContainer = ref<HTMLElement | null>(null)
const hasHeadings = computed(() => props.toc.length > 0)

// 标题层级样式映射
const headingCssClassMap: Record<number, string> = {
  1: '',
  2: '',
  3: '',
  4: 'ml-4',
  5: 'ml-6',
  6: 'ml-8',
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
    'inline-block no-underline py-1 w-full rounded transition-colors duration-200',
    headingCssClassMap[level] || '',
    isActive
      ? 'text-primary-500 subpixel-antialiased border-l-2 border-primary bg-blue-50 dark:bg-blue-900/30 px-3.5'
      : 'text-gray-700 hover:bg-base-gray-300 dark:text-gray-400 dark:hover:text-gray-400 dark:hover:bg-base-gray-600 px-4',
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
    if (catalogContainer.value) {
      const maxScrollTop = catalogContainer.value.scrollHeight - catalogContainer.value.clientHeight
      catalogContainer.value.scrollTop = ratio * maxScrollTop
    }
  },
  // 滚动到指定的标题项
  scrollToItem: (slug: string) => {
    if (catalogContainer.value) {
      const element = catalogContainer.value.querySelector(`[href="#${slug}"]`)
      if (element) {
        const containerRect = catalogContainer.value.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()
        
        // 计算元素在容器中的位置
        const elementTop = elementRect.top - containerRect.top + catalogContainer.value.scrollTop
        
        // 将元素滚动到容器中间位置
        const scrollTo = elementTop - (catalogContainer.value.clientHeight / 2) + (elementRect.height / 2)
        catalogContainer.value.scrollTop = scrollTo
      }
    }
  },
  getScrollRatio: () => {
    if (catalogContainer.value) {
      const scrollTop = catalogContainer.value.scrollTop
      const maxScrollTop = catalogContainer.value.scrollHeight - catalogContainer.value.clientHeight
      return maxScrollTop > 0 ? scrollTop / maxScrollTop : 0
    }
    return 0
  }
})

</script>

<template>
  <div class="site-toc order-last hidden flex-shrink-0 text-sm xl:block h-full">
    <div ref="catalogContainer" class="h-full z-0 overflow-x-hidden overflow-y-auto pr-2 hide-scrollbar">
      <div>
        <ul v-if="hasHeadings" class="!list-none pt-2 m-0">
          <p class="mb-2 font-semibold tracking-tight dark:text-gray-300 pl-2">
            {{ t("home.tableOfContent") }}
          </p>
          <li v-for="heading in toc" :key="heading.slug" :class="[headingCssClassMap[heading.level], '!list-none m-0 pl-0 relative']">
            <a 
              :href="`#${heading.slug}`" 
              :class="getLinkClasses(heading.level, heading.slug)"
              :aria-selected="isActiveItem(heading.slug)"
              @click="handleLinkClick($event, heading.slug)"
            >
              {{ heading.title }}
            </a>
            
            <!-- 递归渲染子项 -->
            <ul v-if="heading.children && heading.children.length > 0" class="!list-none p-0 m-0">
              <li v-for="child in heading.children" :key="child.slug" :class="[headingCssClassMap[child.level], '!list-none !m-0 !pl-0 relative group']">
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
  </div>
</template>

<style scoped>
/* 隐藏滚动条 */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 确保 hover 背景色覆盖整个目录宽度 - 只对嵌套的 li 应用 */
.site-toc li li.group:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: -2rem; /* 扩展到左侧 padding */
  right: -2rem; /* 扩展到右侧 padding */
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.05);
  z-index: -1;
  width: calc(100% + 2rem); /* 确保宽度正确计算 */
  max-width: calc(100% + 2rem); /* 防止超出容器 */
}

.dark .site-toc li li.group:hover::before {
  background-color: rgba(255, 255, 255, 0.05);
}

/* 目录容器左边框（避免被 markdown.css 影响）*/
.site-toc {
  border-left: 2px solid var(--base-200) !important;
}

.dark .site-toc {
  border-left-color: var(--dark-base-200) !important;
}
</style>