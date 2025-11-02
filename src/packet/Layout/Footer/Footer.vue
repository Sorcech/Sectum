<template>
  <footer class="mx-auto container !max-w-screen-2xl px-6">
    <div class="px-6 pb-9 sm:(px-6 pb-18)">
      <!-- 网站地图链接区域 -->
      <div v-if="sitemapLinks && sitemapLinks.length > 0" class="mb-6">
        <div class="flex flex-wrap justify-center gap-6 md:gap-8">
          <div v-for="(group, groupIndex) in sitemapLinks" :key="groupIndex" class="text-center md:text-left">
            <h3 v-if="group.title" class="text-sm font-semibold text-base-content mb-3">
              {{ group.title }}
            </h3>
            <ul class="space-y-2">
              <li v-for="(link, linkIndex) in group.links" :key="linkIndex">
                <RouterLink 
                  v-if="!isExternalLink(link.path)"
                  :to="link.path"
                  class="text-sm text-base-content/70 hover:text-primary transition-colors duration-200 no-underline"
                >
                  {{ link.title }}
                </RouterLink>
                <a
                  v-else
                  :href="link.path"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-base-content/70 hover:text-primary transition-colors duration-200 no-underline"
                >
                  {{ link.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="divider my-6"></div>
      </div>

      <!-- 版权信息 -->
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <span v-if="copyright">{{ copyright }}</span>
          <span v-else>MIT Licensed | Copyright © {{ currentYear }}{{ copyrightHolder ? ` ${copyrightHolder}` : ' Cesar.Studio' }}</span>
        </p>
        <div v-if="additionalInfo" class="mt-2 text-xs text-gray-500 dark:text-gray-500">
          {{ additionalInfo }}
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

// 网站地图链接项类型
export interface SitemapLink {
  title: string
  path: string
}

// 网站地图链接组类型
export interface SitemapLinkGroup {
  title?: string  // 分组标题（可选）
  links: SitemapLink[]  // 链接列表
}

withDefaults(defineProps<{
  sitemapLinks?: SitemapLinkGroup[]  // 网站地图链接，支持分组
  copyright?: string  // 自定义版权信息
  copyrightHolder?: string  // 版权持有者名称
  additionalInfo?: string  // 额外的信息（如备案号、联系方式等）
}>(), {
  sitemapLinks: () => [],
  copyrightHolder: 'Cesar.Studio'
})

// 当前年份
const currentYear = computed(() => new Date().getFullYear())

// 判断是否为外部链接
const isExternalLink = (url: string): boolean => {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')
}
</script>
