<template>
  <nav class="flex sticky top-0 z-10 flex-none py-3 mx-auto w-full border-b bg-base-200 h-12 shadow-md">
    <div class="flex justify-between items-center px-5 lg:px-30 mx-auto w-full">
      <div class="flex items-center">
        <btn v-if="!isHomePage" @click.prevent="toggleSidebar" clean type="button" size="xl"
          class="px-5 items-center text-sm text-zinc-500 rounded-lg lg:hidden hover:bg-zinc-300/10 focus:outline-none focus:ring-2 focus:ring-zinc-300/10 active:bg-zinc-300/10">
          <icn name="bars" regular xl />
        </btn>
        
        <a href="/"
          class="inline-flex items-center gap-3 text-2xl font-bold transition-colors duration-200 transform hover:text-primary no-underline">
          <icn name="section" solid xl color="primary" style="font-size: 2rem;" />
          <span class="text-primary">{{ props.projectName || 'Cloud' }}</span>
        </a>
      </div>
      <div class="flex space-x-5">
        <component :is="props.themeComponent" v-if="props.themeComponent" />
        <component :is="props.darkComponent" v-if="props.darkComponent" />
        <component :is="props.languageComponent" v-if="props.languageComponent" />
        <btn v-if="props.userLink" clean class="transition-colors duration-200">
          <a v-if="isExternalLink(props.userLink)" :href="props.userLink" target="_blank" rel="noopener noreferrer" class="inline-flex items-center group">
            <icn :name="props.userIcon || 'user'" :brand="props.userIconBrand || false" :light="props.userIconLight !== false && !props.userIconBrand" xl class="text-base-content group-hover:text-primary transition-colors duration-200"></icn>
          </a>
          <RouterLink v-else :to="props.userLink" class="inline-flex items-center group">
            <icn :name="props.userIcon || 'user'" :brand="props.userIconBrand || false" :light="props.userIconLight !== false && !props.userIconBrand" xl class="text-base-content group-hover:text-primary transition-colors duration-200"></icn>
          </RouterLink>
        </btn>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// Props 定义
const props = defineProps<{
  projectName?: string
  themeComponent?: any
  darkComponent?: any
  languageComponent?: any
  userLink?: string
  userIcon?: string  // 用户图标名称，默认 'user'
  userIconLight?: boolean  // 图标样式是否为 light，默认 true
  userIconBrand?: boolean  // 图标样式是否为 brand（品牌图标），默认 false
}>()

// 当前是否为首页
const route = useRoute()
const isHomePage = computed(() => route.path === '/' || (route.name && String(route.name).toLowerCase().includes('home')))

// 判断是否为外部链接
const isExternalLink = (url: string | undefined): boolean => {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')
}

// 发送切换侧边栏事件
const toggleSidebar = () => {
  window.dispatchEvent(new CustomEvent('toggle-sidebar'))
}
</script>