<template>
  <nav 
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
        
        <RouterLink
          v-if="props.homeLink && !isExternalLink(props.homeLink)"
          :to="props.homeLink"
          class="inline-flex items-center gap-3 text-2xl font-bold transition-colors duration-200 transform hover:text-primary no-underline">
          <icn 
            v-if="props.logoIcon" 
            :name="props.logoIcon" 
            regular 
            xl 
            color="primary" 
            style="font-size: 2rem;" 
          />
          <span class="text-primary">{{ props.projectName || 'Cloud' }}</span>
        </RouterLink>
        <a
          v-else
          :href="props.homeLink || '/'"
          class="inline-flex items-center gap-3 text-2xl font-bold transition-colors duration-200 transform hover:text-primary no-underline">
          <icn 
            v-if="props.logoIcon" 
            :name="props.logoIcon" 
            regular 
            xl 
            color="primary" 
            style="font-size: 2rem;" 
          />
          <span class="text-primary">{{ props.projectName || 'Cloud' }}</span>
        </a>
      </div>
      
      <!-- 中间导航菜单 -->
      <nav v-if="navItems.length > 0" class="hidden md:flex items-center flex-1 justify-center" :style="{ gap: navItemsGap }">
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
        <!-- 图标按钮：支持多个图标按钮 -->
        <template v-for="(iconBtn, index) in iconButtons" :key="index">
          <btn v-if="iconBtn.link" clean class="transition-colors duration-200">
            <a v-if="isExternalLink(iconBtn.link)" :href="iconBtn.link" target="_blank" rel="noopener noreferrer" class="inline-flex items-center group">
              <icn 
                :name="iconBtn.icon || 'user'" 
                :light="iconBtn.light || false"
                :brand="iconBtn.brand || false"
                xl 
                class="text-base-content group-hover:text-primary transition-colors duration-200"
              ></icn>
            </a>
            <RouterLink v-else :to="iconBtn.link" class="inline-flex items-center group">
              <icn 
                :name="iconBtn.icon || 'user'" 
                :light="iconBtn.light || false"
                :brand="iconBtn.brand || false"
                xl 
                class="text-base-content group-hover:text-primary transition-colors duration-200"
              ></icn>
            </RouterLink>
          </btn>
        </template>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { setFavicon as setFaviconUtil } from '~/packet/Config/favicon'

// 导航项类型定义
export interface NavItem {
  title: string  // 导航项标题
  path: string    // 路由路径或外部链接
}

// 图标按钮配置类型定义
export interface IconButton {
  link: string  // 链接地址，支持内部路由或外部链接
  icon?: string  // 图标名称，默认 'user'
  light?: boolean  // 图标样式是否为 light，默认 false
  brand?: boolean  // 图标样式是否为 brand（品牌图标），默认 false
}

// Props 定义
const props = withDefaults(defineProps<{
  projectName?: string
  homeLink?: string  // 项目首页链接，如果未提供则默认为 '/'
  logoIcon?: string  // Logo 图标名称，如果未提供则不显示图标
  themeComponent?: any
  darkComponent?: any
  languageComponent?: any
  iconButtons?: IconButton[]  // 图标按钮配置数组，支持多个图标按钮
  // 向后兼容的旧属性（如果提供了 iconButtons，这些属性会被忽略）
  userLink?: string  // 用户链接，如果提供则显示用户按钮
  userIcon?: string  // 用户图标名称，默认 'user'
  userIconLight?: boolean  // 图标样式是否为 light，默认 true
  userIconBrand?: boolean  // 图标样式是否为 brand（品牌图标），默认 false
  githubLink?: string  // GitHub 链接，如果提供则显示 GitHub 按钮
  githubIcon?: string  // GitHub 图标名称，默认 'github'
  githubIconBrand?: boolean  // GitHub 图标样式是否为 brand（品牌图标），默认 true
  backgroundOpacity?: number  // 背景透明度，范围 0-1，默认 1（完全不透明）
  navItems?: NavItem[]  // 导航菜单项数组，支持通过配置文件导入
  routes?: any[]  // 路由配置，如果提供，将从路由中提取导航项（可选）
  navItemsGap?: string  // 导航按钮间距，支持 CSS 间距值（如 '1rem', '24px', '1.5rem'），默认 '1.5rem' (24px)
}>(), {
  homeLink: '/',  // 默认首页链接
  navItemsGap: '1.5rem'  // 默认间距 1.5rem (24px)
})

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

// 合并图标按钮配置：优先使用 iconButtons，如果没有则从旧属性构建
const iconButtons = computed<IconButton[]>(() => {
  // 如果提供了 iconButtons，直接使用
  if (props.iconButtons && props.iconButtons.length > 0) {
    return props.iconButtons
  }
  
  // 否则从旧属性构建
  const buttons: IconButton[] = []
  
  // User 按钮
  if (props.userLink) {
    buttons.push({
      link: props.userLink,
      icon: props.userIcon || 'user',
      light: props.userIconLight !== false,  // 默认 true
      brand: props.userIconBrand || false
    })
  }
  
  // GitHub 按钮
  if (props.githubLink) {
    buttons.push({
      link: props.githubLink,
      icon: props.githubIcon || 'github',
      light: false,
      brand: props.githubIconBrand !== false  // 默认 true
    })
  }
  
  return buttons
})

// 判断导航项是否激活（当前路由匹配）
const isActiveNav = (path: string): boolean => {
  const currentPath = route.path
  // 规范化路径（移除尾随斜杠）
  const normalizedPath = path.replace(/\/$/, '')
  const normalizedCurrentPath = currentPath.replace(/\/$/, '')
  
  // 处理首页路径
  if (normalizedPath === '/' || normalizedPath === '') {
    // 首页路径：只有当前路径是 '/' 或 '' 时才激活
    return normalizedCurrentPath === '/' || normalizedCurrentPath === ''
  }
  
  // 精确匹配（处理带/不带尾随斜杠的情况）
  if (normalizedCurrentPath === normalizedPath) {
    return true
  }
  
  // 检查是否有更精确的匹配（更长的路径匹配）
  // 例如：当路径是 /rotor.cn/product 时，不应该激活 /rotor.cn
  // 因为 /rotor.cn/product 是更精确的匹配
  const hasMoreSpecificMatch = navItems.value.some(item => {
    if (!item.path) return false
    const itemPath = item.path.replace(/\/$/, '')
    // 跳过自己
    if (itemPath === normalizedPath) return false
    // 检查是否有更长的路径匹配当前路径
    if (normalizedCurrentPath.startsWith(itemPath + '/') || normalizedCurrentPath === itemPath) {
      // 如果这个更长的路径是当前路径的前缀，说明有更精确的匹配
      return itemPath.length > normalizedPath.length
    }
    return false
  })
  
  // 如果有更精确的匹配，当前路径不应该激活
  if (hasMoreSpecificMatch) {
    return false
  }
  
  // 路径开头匹配（支持子路由）
  // 例如：/rotor.cn/product/xxx 应该匹配 /rotor.cn/product
  // 但 /rotor.cn/product 不应该匹配 /rotor.cn（因为这不是子路径，而是同级路径）
  // 只有当当前路径是导航路径的子路径时才匹配
  // 使用 normalizedPath + '/' 确保是真正的子路径
  if (normalizedCurrentPath.startsWith(normalizedPath + '/')) {
    return true
  }
  
  return false
}

// 背景色类和样式计算
const backgroundOpacity = computed(() => {
  const opacity = props.backgroundOpacity ?? 1
  return Math.max(0, Math.min(1, opacity))  // 确保透明度在 0-1 范围内
})


const backgroundClass = computed(() => {
  // 如果透明度不是 1，不设置背景色类，通过 style 控制
  if (backgroundOpacity.value < 1) {
    return ''
  }
  // 系统会自动根据 .dark 类切换 bg-base-100 的值
  return 'bg-base-100'
})

const backgroundStyle = computed(() => {
  if (backgroundOpacity.value === 1) {
    return {}
  }
  
  // 使用 CSS 变量和 color-mix，系统会自动根据 .dark 类切换 --base-100 的值
  const opacityPercent = Math.round(backgroundOpacity.value * 100)
  
  return {
    backgroundColor: `color-mix(in srgb, var(--base-100) ${opacityPercent}%, transparent ${100 - opacityPercent}%)`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)' // Safari 支持
  }
})

// 监听 logoIcon 变化并设置 favicon（如果 Header 组件提供了不同的 logoIcon，可以动态更新）
watch(() => props.logoIcon, (newIcon) => {
  if (newIcon) {
    setFaviconUtil({
      iconName: newIcon,
      iconPrefix: 'fas',
      size: 32
    })
  }
}, { immediate: false })

// 组件挂载后设置 favicon（如果提供了 logoIcon）
onMounted(() => {
  if (props.logoIcon) {
    setFaviconUtil({
      iconName: props.logoIcon,
      iconPrefix: 'fas',
      size: 32
    })
  }
})

</script>

