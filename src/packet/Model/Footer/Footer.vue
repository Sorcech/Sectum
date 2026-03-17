<script setup lang="ts">
import { RouterLink } from 'vue-router'

// 网站地图链接项类型
export interface SitemapLink {
  title: string
  path: string
}

// 网站地图链接组类型
export interface SitemapLinkGroup {
  title?: string  // 分组标题（可选）
  subtitle?: string  // 副标题（可选）
  subtitleLink?: string  // 副标题链接（可选）
  links: SitemapLink[]  // 链接列表
}

withDefaults(defineProps<{
  sitemapLinks?: SitemapLinkGroup[]  // 网站地图链接，支持分组
  copyright?: string  // 自定义版权信息
  copyrightHolder?: string  // 版权持有者名称
  icpNumber?: string  // ICP 备案号
  additionalInfo?: string  // 额外的信息（如备案号、联系方式等）
}>(), {
  sitemapLinks: () => [],
  copyrightHolder: 'Cesar.Studio'
})

// 当前年份
//const currentYear = computed(() => new Date().getFullYear())

// 判断是否为外部链接
const isExternalLink = (url: string): boolean => {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')
}
</script>

<template>
  <footer class="w-full bg-base-100">
    <div class="px-5 lg:px-30 mx-auto w-full pb-5">
      <!-- 网站地图链接区域 -->
      <div v-if="sitemapLinks && sitemapLinks.length > 0" class="pt-5">
        <div class="flex flex-wrap justify-center gap-6 md:gap-8 ">
          <div v-for="(group, groupIndex) in sitemapLinks" :key="groupIndex" class="text-center md:text-left border-l-2 border-l-solid border-base-300 pl-4">
            <h3 v-if="group.title" class="text-sm font-semibold text-base-content mb-3">
              {{ group.title }}
            </h3>
            <h4 v-if="group.subtitle" class="text-sm font-medium text-base-content mb-2">
              <RouterLink 
                v-if="group.subtitleLink && !isExternalLink(group.subtitleLink)"
                :to="group.subtitleLink"
                class="text-base-content hover:text-primary"
              >
                {{ group.subtitle }}
              </RouterLink>
              <a
                v-else-if="group.subtitleLink"
                :href="group.subtitleLink"
                target="_blank"
                rel="noopener noreferrer"
                class="text-base-content hover:text-primary"
              >
                {{ group.subtitle }}
              </a>
              <span v-else>{{ group.subtitle }}</span>
            </h4>
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
    </div>
    <!-- 版权信息 - 在整个页面宽度上居中 -->
    <div class="w-full text-center pb-5">
      <div v-if="copyrightHolder || icpNumber || additionalInfo" class="space-y-2">
        <p v-if="copyrightHolder" class="text-sm text-base-content">
          Copyright © {{ new Date().getFullYear() }} {{ copyrightHolder }}
        </p>
        <p v-if="icpNumber" class="text-xs text-base-content/70">
          {{ icpNumber }}
        </p>
        <p v-if="additionalInfo" class="text-xs text-base-content/70">
          {{ additionalInfo }}
        </p>
      </div>
    </div>
  </footer>
</template>
