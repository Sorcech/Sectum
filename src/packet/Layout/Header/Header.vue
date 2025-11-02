<template>
  <nav 
    ref="navRef"
    class="flex sticky top-0 z-10 flex-none py-3 mx-auto w-full border-b h-12 shadow-md"
    :class="backgroundClass"
    :style="backgroundStyle"
  >
    <div class="flex justify-between items-center px-5 lg:px-30 mx-auto w-full">
      <div class="flex items-center">
        <btn v-if="!isHomePage" @click.prevent="toggleSidebar" clean type="button" size="xl"
          class="px-5 items-center text-sm text-zinc-500 rounded-lg lg:hidden hover:bg-zinc-300/10 focus:outline-none focus:ring-2 focus:ring-zinc-300/10 active:bg-zinc-300/10">
          <icn name="bars" regular xl />
        </btn>
        
        <a href="/"
          class="inline-flex items-center gap-3 text-2xl font-bold transition-colors duration-200 transform hover:text-primary no-underline">
          <icn 
            v-if="props.logoIcon" 
            :name="props.logoIcon" 
            solid 
            xl 
            color="primary" 
            style="font-size: 2rem;" 
          />
          <span class="text-primary">{{ props.projectName || 'Cloud' }}</span>
        </a>
      </div>
      
      <!-- 中间导航菜单 -->
      <nav v-if="navItems.length > 0" class="hidden md:flex items-center gap-6 flex-1 justify-center">
        <template v-for="(item, index) in navItems" :key="index">
          <a
            v-if="isExternalLink(item.path)"
            :href="item.path"
            target="_blank"
            rel="noopener noreferrer"
            class="text-base font-medium transition-colors duration-200 no-underline"
            :class="[
              isActiveNav(item.path) 
                ? 'text-primary' 
                : 'text-base-content hover:text-primary'
            ]"
          >
            {{ item.title }}
          </a>
          <RouterLink
            v-else
            :to="item.path"
            class="text-base font-medium transition-colors duration-200 no-underline"
            :class="[
              isActiveNav(item.path) 
                ? 'text-primary' 
                : 'text-base-content hover:text-primary'
            ]"
          >
            {{ item.title }}
          </RouterLink>
        </template>
      </nav>
      
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
import { computed, ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

// 导航项类型定义
export interface NavItem {
  title: string  // 导航项标题
  path: string    // 路由路径或外部链接
}

// Props 定义
const props = defineProps<{
  projectName?: string
  logoIcon?: string  // Logo 图标名称，如果未提供则不显示图标
  themeComponent?: any
  darkComponent?: any
  languageComponent?: any
  userLink?: string
  userIcon?: string  // 用户图标名称，默认 'user'
  userIconLight?: boolean  // 图标样式是否为 light，默认 true
  userIconBrand?: boolean  // 图标样式是否为 brand（品牌图标），默认 false
  backgroundOpacity?: number  // 背景透明度，范围 0-1，默认 1（完全不透明）
  navItems?: NavItem[]  // 导航菜单项数组，支持通过配置文件导入
  routes?: any[]  // 路由配置，如果提供，将从路由中提取导航项（可选）
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

// 从路由配置中提取导航项
const extractNavItemsFromRoutes = (routes: any[]): NavItem[] => {
  const items: NavItem[] = []
  
  const traverseRoutes = (routes: any[], parentPath = '') => {
    routes.forEach((route) => {
      // 只提取有 meta.title 的一级路由
      if (route.meta?.title && route.path && !route.path.includes('/:')) {
        const fullPath = parentPath ? `${parentPath}${route.path}` : route.path
        // 排除首页和特殊路由
        if (fullPath !== '/' && !fullPath.includes('/:') && !route.children) {
          items.push({
            title: route.meta.title,
            path: fullPath
          })
        }
      }
      
      // 递归处理子路由
      if (route.children && Array.isArray(route.children)) {
        const parent = parentPath ? `${parentPath}${route.path}` : route.path
        traverseRoutes(route.children, parent)
      }
    })
  }
  
  traverseRoutes(routes)
  return items
}

// 导航菜单项（优先使用 props.navItems，其次从路由提取，最后为空数组）
const navItems = computed<NavItem[]>(() => {
  if (props.navItems && props.navItems.length > 0) {
    return props.navItems
  }
  
  if (props.routes && Array.isArray(props.routes) && props.routes.length > 0) {
    return extractNavItemsFromRoutes(props.routes)
  }
  
  return []
})

// 判断导航项是否激活（当前路由匹配）
const isActiveNav = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }
  // 精确匹配或路径开头匹配
  return route.path === path || route.path.startsWith(path + '/')
}

// 背景色类和样式计算
const backgroundOpacity = computed(() => {
  const opacity = props.backgroundOpacity ?? 1
  return Math.max(0, Math.min(1, opacity))  // 确保透明度在 0-1 范围内
})

const navRef = ref<HTMLElement | null>(null)
const backgroundColorWithOpacity = ref<string>('')

// 将十六进制颜色转换为 rgba
const hexToRgba = (hex: string, opacity: number): string => {
  hex = hex.replace('#', '')  // 移除 # 号
  // 处理 3 位十六进制
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('')
  }
  
  // 转换为 RGB
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// 更新背景色（考虑透明度和深色模式）
const updateBackgroundColor = () => {
  if (backgroundOpacity.value === 1) {
    backgroundColorWithOpacity.value = ''
    return
  }
  
  // 尝试同步获取 CSS 变量值
  const computedStyle = window.getComputedStyle(document.documentElement)
  const isDark = document.documentElement.classList.contains('dark')
  
  // 根据深色模式选择对应的 CSS 变量
  let cssVarName = isDark ? '--dark-base-200' : '--base-200'
  let base200Color = computedStyle.getPropertyValue(cssVarName).trim()
  
  // 如果获取失败，尝试从nav元素本身的计算样式获取
  if ((!base200Color || base200Color === 'none' || base200Color === '') && navRef.value) {
    const navComputedStyle = window.getComputedStyle(navRef.value)
    const navBg = navComputedStyle.backgroundColor // 尝试获取背景色
    if (navBg && navBg !== 'rgba(0, 0, 0, 0)' && navBg !== 'transparent') {
      base200Color = navBg
    }
  }
  
  // 如果还是获取失败，使用备用颜色
  if (!base200Color || base200Color === 'none' || base200Color === '') {
    base200Color = isDark ? '#1f2937' : '#f8f8f8'
  }
  
  // 如果是十六进制颜色，转换为 rgba
  if (base200Color.startsWith('#')) {
    backgroundColorWithOpacity.value = hexToRgba(base200Color, backgroundOpacity.value)
  } else if (base200Color.startsWith('rgb')) {
    // 如果是 rgb 或 rgba，提取 RGB 值并应用新的透明度
    const rgbMatch = base200Color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch
      backgroundColorWithOpacity.value = `rgba(${r}, ${g}, ${b}, ${backgroundOpacity.value})`
    } else {
      // 如果匹配失败，使用备用颜色
      const fallbackColor = isDark ? '#1f2937' : '#f8f8f8'
      backgroundColorWithOpacity.value = hexToRgba(fallbackColor, backgroundOpacity.value)
    }
  } else {
    // 其他格式，使用备用颜色
    const fallbackColor = isDark ? '#1f2937' : '#f8f8f8'
    backgroundColorWithOpacity.value = hexToRgba(fallbackColor, backgroundOpacity.value)
  }
  
  // 如果nav元素还没有渲染，使用 nextTick 延迟更新
  if (!navRef.value) {
    nextTick(() => {
      updateBackgroundColor()
    })
  }
}

const backgroundClass = computed(() => {
  // 如果透明度不是 1，不设置背景色类，通过 style 控制
  if (backgroundOpacity.value < 1) {
    return ''
  }
  return 'bg-base-200 dark:bg-dark-base-200'
})

const backgroundStyle = computed(() => {
  if (backgroundOpacity.value === 1) {
    return {}
  }
  
  // 如果有计算后的颜色值，使用它（优先）
  if (backgroundColorWithOpacity.value) {
    return {
      backgroundColor: backgroundColorWithOpacity.value,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)' // Safari 支持
    }
  }
  
  // 否则使用 CSS 变量和 color-mix（fallback）
  const opacityPercent = Math.round(backgroundOpacity.value * 100)
  const isDark = document.documentElement.classList.contains('dark')
  const cssVarName = isDark ? '--dark-base-200' : '--base-200'
  
  return {
    backgroundColor: `color-mix(in srgb, var(${cssVarName}) ${opacityPercent}%, transparent ${100 - opacityPercent}%)`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)' // Safari 支持
  }
})

// 监听透明度变化和主题变化
watch([backgroundOpacity, () => document.documentElement.classList.contains('dark')], () => {
  updateBackgroundColor()
}, { immediate: true })

onMounted(() => {
  // 延迟一下确保样式已加载
  nextTick(() => {
    updateBackgroundColor()
  })
  
  // 监听主题切换
  const observer = new MutationObserver(() => {
    nextTick(() => {
      updateBackgroundColor()
    })
  })
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})
</script>