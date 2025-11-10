<template>
  <!-- 移动端遮罩层 -->
  <msk @click="toggleSidebar" :show="isOpen" v-if="!isLgSize" />
  
  <!-- 侧边栏容器 -->
  <aside v-show="isOpen || isLgSize" 
    :class="{ '!lg:hidden': isHome, 'z-100': isOpen, 'z-0': !isOpen }"
    class="fixed lg:relative flex flex-col flex-none w-70 bg-base-150 border-r"
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
        <!-- 使用简单的 items 数组 -->
        <Menu v-if="props.items && props.items.length > 0" class="w-full bg-base-150">
          <span v-if="props.title" class="menu-title block text-base text-md font-bold bg-base-150 p-3">
            {{ props.title }}
          </span>
          <template v-for="(item, index) in props.items" :key="index">
            <btn 
              v-if="item.path"
              size="xs" 
              clean 
              variant="transparent"
              @click="handleItemClick(item.path)"
              :class="['block w-full text-left',
                    isActiveItem(item.path)
                      ? '!border-l-2 !border-y-0 !border-r-0 !border-solid !border-primary bg-base-100'
                      : '!border-l-2 !border-y-0 !border-r-0 !border-transparent'
                  ]">
              {{ item.title }}
            </btn>
            <span v-else class="menu-title block text-base text-md font-bold bg-base-100">
              {{ item.title }}
            </span>
          </template>
        </Menu>
        
        <!-- 使用路由配置（向后兼容） -->
        <Menu 
          v-else-if="menuGroups.length > 0"
          v-for="(parent, index) in menuGroups" 
          :key="parent.meta?.title || parent.path || index"
          class="w-full bg-base-150">
          <span class="menu-title block text-base text-md font-bold bg-base-100  p-3">
            {{ parent.meta?.title }}
          </span>
          <template v-if="parent.children && parent.children.length > 0">
            <btn size="xs" clean variant="transparent" 
              v-for="(child, childIndex) in parent.children" 
              :key="child.path || childIndex" 
              @click="handleItemClick(child.path)"
              :class="['block w-full text-left',
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

// 侧边栏菜单项类型定义
export interface SidebarItem {
  title: string  // 菜单项标题
  path?: string   // 路由路径（可选，如果不提供则仅作为标题显示）
}

// Props 定义
const props = defineProps<{
  routes?: any[]  // 路由配置（旧版格式，向后兼容）
  items?: SidebarItem[]  // 简单的菜单项数组（新版格式）
  title?: string  // 侧边栏标题（当使用 items 时）
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
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isHome = computed(() => route?.meta?.title === 'Index')

// 处理菜单项点击
const handleItemClick = (path: string) => {
  if (props.onNavigate) {
    props.onNavigate(path)
  } else if (path) {
    // 默认使用 vue-router 导航
    router.push(path).catch((err) => {
      console.error('[Sidebar] router.push error:', err, path)
    })
  }
}

// 判断菜单项是否激活
const isActiveItem = (path: string): boolean => {
  if (!path) return false
  if (path === '/') {
    return route.path === '/'
  }
  return route.path === path || route.path.startsWith(path + '/')
}

// 获取实际的路由分组数据（向后兼容）
const menuGroups = computed(() => {
  if (!props.routes || !Array.isArray(props.routes)) {
    return []
  }
  
  // 首先检查是否传入的是完整的路由配置（包含 /sectum 路由）
  const sectumRoute = props.routes.find(r => r.path === '/sectum')
  if (sectumRoute && sectumRoute.children) {
    // 如果找到 /sectum 路由，使用其子路由
    return sectumRoute.children.filter((group: any) => 
      group.meta?.title && 
      group.children && 
      Array.isArray(group.children) && 
      group.children.length > 0
    )
  }
  
  // 如果没找到 /sectum 路由，说明传入的就是子路由数组
  // 直接过滤出有效的分组路由（有 meta.title 和 children 的）
  return props.routes.filter((group: any) => 
    group.meta?.title && 
    group.children && 
    Array.isArray(group.children) && 
    group.children.length > 0
  )
})
</script>

