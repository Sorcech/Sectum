<script setup lang="ts">
import { PropType, computed } from 'vue'
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

// 检查是否为活动项
const isActiveItem = (slug: string) => {
  return route.hash === `#${decodeURIComponent(slug)}`
}

// 获取链接样式类
const getLinkClasses = (level: number, slug: string) => {
  const isActive = props.index === slug
  return [
    'inline-block no-underline py-1',
    headingCssClassMap[level] || '',
    isActive
      ? 'text-primary-500 subpixel-antialiased border-l-2 border-primary bg-base-gray-300 dark:bg-base-gray-600 px-3.5'
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
  }
}

</script>

<template>
  <div class="site-toc order-last hidden flex-shrink-0 px-4 text-sm xl:block ">
    <div ref="tocContent" class="max-h-[calc(100vh-4rem-env(safe-area-inset-bottom))] !border-l z-0 overflow-x-hidden overflow-y-hidden">
      <ul v-if="hasHeadings" class="!list-none p-0 m-0">
        <p class="mb-4 font-semibold tracking-tight dark:text-gray-300">
          {{ t("home.tableOfContent") }}
        </p>
        <li v-for="heading in toc" :key="heading.slug" :class="[headingCssClassMap[heading.level], '!list-none m-0 pl-0 relative']">
          <a 
            :href="`#${heading.slug}`" 
            :class="getLinkClasses(heading.level, heading.slug)"
            :aria-selected="isActiveItem(heading.slug)"
            @click="handleLinkClick($event, heading.slug)"
            class="block no-underline transition-all duration-200 ease-in-out hover:no-underline"
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
                class="block no-underline transition-all duration-200 ease-in-out hover:no-underline"
              >
                {{ child.title }}
              </a>
              
              <!-- 第三级子项 -->
              <ul v-if="child.children && child.children.length > 0" class="!list-none !p-0 !m-0">
                <li v-for="grandchild in child.children" :key="grandchild.slug" :class="[headingCssClassMap[grandchild.level], '!list-none !m-0 !pl-0 relative group']">
                  <a 
                    :href="`#${grandchild.slug}`" 
                    :class="getLinkClasses(grandchild.level, grandchild.slug)"
                    :aria-selected="isActiveItem(grandchild.slug)"
                    @click="handleLinkClick($event, grandchild.slug)"
                    class="block no-underline transition-all duration-200 ease-in-out hover:no-underline"
                  >
                    {{ grandchild.title }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

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
</style>

