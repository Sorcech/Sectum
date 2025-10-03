<template>
  <nav class="flex sticky top-0 z-10 flex-none py-3 mx-auto w-full border-b bg-base-100 h-18">
    <div class="flex justify-between items-center px-5 lg:px-30 mx-auto w-full">
      <div class="flex items-center">
        <btn @click.prevent="toggleSidebar" clean type="button" size="xl"
          class="px-2 items-center text-sm text-zinc-500 rounded-lg lg:hidden hover:bg-zinc-300/10 focus:outline-none focus:ring-2 focus:ring-zinc-300/10 active:bg-zinc-300/10">
          <icn name="bars" regular xl />
        </btn>
        <a href="/"
          class="inline-flex items-center text-2xl font-bold transition-colors duration-200 transform hover:text-primary no-underline">
          <span class="text-primary">{{ props.projectName || 'Cloud' }}</span>
        </a>
      </div>
      <div class="flex space-x-5">
        <component :is="props.themeComponent" v-if="props.themeComponent" />
        <component :is="props.darkComponent" v-if="props.darkComponent" />
        <component :is="props.languageComponent" v-if="props.languageComponent" />
        <btn clean class="text-base-content hover:text-primary" v-if="props.userLink">
          <RouterLink :to="props.userLink">
            <icn name="user" light xl></icn>
          </RouterLink>
        </btn>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ref, inject } from 'vue'

// Props 定义
const props = defineProps<{
  projectName?: string
  themeComponent?: any
  darkComponent?: any
  languageComponent?: any
  userLink?: string
}>()

// 从父组件注入侧边栏状态
const sidebar = inject<{
  isOpen: any
  toggleSidebar: () => void
}>('sidebar', {
  isOpen: ref(false),
  toggleSidebar: () => {}
})
const isOpen = sidebar?.isOpen
const toggleSidebar = sidebar?.toggleSidebar
</script>