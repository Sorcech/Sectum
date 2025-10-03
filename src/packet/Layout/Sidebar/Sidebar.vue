<template>
  <!-- 移动端遮罩层 -->
  <bkd @click="toggleSidebar" :show="isOpen" v-if="!isLgSize" />
  
  <!-- 侧边栏容器 -->
  <aside 
    v-show="isOpen || isLgSize" 
    :class="{ '!lg:hidden': isHome }"
    class="fixed inset-0 z-10 flex-none w-72 h-screen bg-base-200 border-r lg:(z-0 static h-auto overflow-y-visible w-60 block)"
  >
    <!-- 移动端头部 -->
    <div class="lg:hidden flex items-center justify-between h-$navbar-height bg-primary-200/10 px-2">
      <btn @click="toggleSidebar" variant="transparent" color="secondary" class="!fill-base-text">
        <icn name="arrow-left" regular xl />
      </btn>
    </div>
    
    <!-- 侧边栏内容 -->
    <div class="overflow-y-auto h-full max-w-2xs lg:fixed lg:mx-2 lg:w-60">
      <nav class="px-1 pl-3 text-base lg:(text-sm pb-10 h-(screen-18))" aria-label="Docs navigation">
        <template v-for="menu in props.routes" :key="menu.meta?.title">
          <Menu v-if="menu.children && menu.children.length > 1" v-for="parent in menu.children" :key="parent.meta?.title"
            class="w-full bg-base-200">
            <span class="menu-title">{{ parent.meta.title }}</span>
            <btn size="sm" clean variant="transparent" v-for="child in parent.children" :key="child.path" tag="RouterLink"
              :to="child.path"
              :class="[router.meta.title === child.meta.title ? 'border-l-2 border-primary bg-base-300 dark:bg-base-100' : '']">
              {{ child.meta.title }}
            </btn>
          </Menu>
        </template>
      </nav>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { inject, ref } from 'vue'
import { windowWidth } from '~/packet/Util/window-width'
import { computed } from 'vue'

// Props 定义
const props = defineProps<{
  routes?: any[]
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

const { isLgSize } = windowWidth();
let router = useRoute()
const isHome = computed(() => router.meta.title === 'Index');
</script>
