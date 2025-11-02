<template>
  <!-- 移动端遮罩层 -->
  <bkd @click="toggleSidebar" :show="isOpen" v-if="!isLgSize" />
  
  <!-- 侧边栏容器 -->
  <aside v-show="isOpen || isLgSize" 
    :class="{ '!lg:hidden': isHome, 'z-100': isOpen, 'z-0': !isOpen }"
    class="fixed lg:relative flex flex-col flex-none w-70 bg-base-200 border-r"
    :style="{height: '100vh',maxHeight: '100vh'}"
    @click.stop
  >
    <!-- 移动端头部 -->
    <div class="lg:hidden flex items-center justify-between bg-primary-200/10 px-5  flex-shrink-0">
      <btn @click="toggleSidebar" variant="transparent" color="secondary" class="!fill-base-text">
        <icn name="arrow-left" regular xl />
      </btn>
    </div>
    
    <!-- 侧边栏内容 - 可滚动区域 -->
    <div class="overflow-y-auto overflow-x-hidden hidden-scrollbar" 
      :style="{
        height: isLgSize ? '100%' : 'calc(100vh - 60px)',
        minHeight: 0,
        WebkitOverflowScrolling: 'touch'
      }"
    >
      <div class="max-w-2xs lg:mx-2 lg:w-60" style="padding: 1.25rem 0 6rem 0;">
      <nav aria-label="Docs navigation">
        <Menu 
          v-for="(parent, index) in menuGroups" 
          :key="parent.meta?.title || parent.path || index"
          class="w-full bg-base-200">
          <span class="menu-title block text-base text-md font-bold bg-base-100  p-3">
            {{ parent.meta?.title }}
          </span>
          <template v-if="parent.children && parent.children.length > 0">
            <btn size="xs" clean variant="transparent" 
              v-for="(child, childIndex) in parent.children" 
              :key="child.path || childIndex" 
              @click="props.onNavigate ? props.onNavigate(child.path) : null"
              :class="['block w-full text-left px-3',
                    route?.meta?.title === child.meta?.title
                      ? '!border-l-2 !border-y-0 !border-r-0 !border-solid !border-primary bg-base-100'
                      : '!border-l-2 !border-y-0 !border-r-0 !border-transparent'
                  ]">
              {{ child.meta?.title }}
            </btn>
          </template>
          </Menu>
      </nav>
      </div>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { windowWidth } from '~/packet/Config/window-width'

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

// 获取实际的路由分组数据
const menuGroups = computed(() => {
  if (!props.routes || !Array.isArray(props.routes)) {
    return []
  }
  
  // 找到 /sectum 路由
  const sectumRoute = props.routes.find(r => r.path === '/sectum')
  if (!sectumRoute || !sectumRoute.children) {
    return []
  }
  
  // 返回所有分组，包括只有一个子项的分组
  return sectumRoute.children.filter((group: any) => 
    group.meta?.title && 
    group.children && 
    Array.isArray(group.children) && 
    group.children.length > 0
  )
})
</script>
