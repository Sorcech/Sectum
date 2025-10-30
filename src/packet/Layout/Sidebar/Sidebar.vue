<template>
  <!-- 移动端遮罩层 -->
  <bkd @click="toggleSidebar" :show="isOpen" v-if="!isLgSize" />
  
  <!-- 侧边栏容器 -->
  <aside 
    v-show="isOpen || isLgSize" 
    :class="{ '!lg:hidden': isHome }"
    class="flex-none w-65 bg-base-200 border-r"
  >
    <!-- 移动端头部 -->
    <div class="lg:hidden flex items-center justify-between bg-primary-200/10 px-2">
      <btn @click="toggleSidebar" variant="transparent" color="secondary" class="!fill-base-text">
        <icn name="arrow-left" regular xl />
      </btn>
    </div>
    
    <!-- 侧边栏内容 -->
    <div class="max-w-2xs lg:mx-2 lg:w-60">
      <nav class="px-1 pl-3 text-base lg:(text-sm pb-10 h-(screen-18))" aria-label="Docs navigation">
        <template v-for="menu in props.routes" :key="menu.meta?.title">
          <Menu v-if="menu.children && menu.children.length > 1" v-for="parent in menu.children" :key="parent.meta?.title"
            class="w-full bg-base-200">
            <span class="menu-title">{{ parent.meta.title }}</span>
            <btn size="sm" clean variant="transparent" v-for="child in parent.children" :key="child.path" 
              @click="props.onNavigate ? props.onNavigate(child.path) : null"
              :class="[route?.meta?.title === child.meta.title ? 'border-l-2 border-primary bg-base-300 dark:bg-base-100' : '']">
              {{ child.meta.title }}
            </btn>
          </Menu>
        </template>
      </nav>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { windowWidth } from '~/packet/Util/window-width'

// Props 定义
const props = defineProps<{
  routes?: any[]
  onNavigate?: (path: string) => void
}>()

// 侧边栏状态管理 - 完全由 Sidebar 自己管理
const isOpen = ref<boolean>(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
}

// 监听全局事件
const handleToggleSidebar = () => {
  toggleSidebar()
}

onMounted(() => {
  // 监听来自 Header 的切换事件
  window.addEventListener('toggle-sidebar', handleToggleSidebar)
})

onUnmounted(() => {
  window.removeEventListener('toggle-sidebar', handleToggleSidebar)
})

const { isLgSize } = windowWidth();

// 使用路由功能（在 Sectum 项目中）
import { useRoute } from 'vue-router'

const route = useRoute()
const isHome = computed(() => route?.meta?.title === 'Index')
</script>
