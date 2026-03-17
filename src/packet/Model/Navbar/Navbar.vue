<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Store } from '~/packet/Config/storage'
import { setFavicon as setFaviconUtil, setPageTitle } from '~/packet/Config'
import navbar from '~/packet/Model/Navbar/Navbar'
import config from '~/config/config'
import type { NavbarItem } from './Navbar'

// Props 定义（Sectum 无 Layout/Company，不包含 companies）
const props = withDefaults(defineProps<{
  items?: NavbarItem[]
  projectName?: string
  logoIcon?: string
}>(), {
  projectName: undefined,
  logoIcon: undefined
})

const route = useRoute()
let ind = ref(0)

// 使用传入的 items 或默认的 navbar 配置
const Nav = computed(() => props.items || navbar)

// 根据当前路由路径找到对应的导航项索引
const findActiveIndex = (): number => {
  const currentPath = route.path
  
  // 遍历导航项，找到匹配的项
  for (let i = 0; i < Nav.value.length; i++) {
    const item = Nav.value[i]
    if (!item.path) continue
    
    // 精确匹配
    if (currentPath === item.path) {
      return i
    }
    
    // 路径前缀匹配（支持子路由，如 /task 匹配 /task/xxx）
    if (currentPath.startsWith(item.path + '/') || currentPath.startsWith(item.path + '?')) {
      return i
    }
    
    // 路径段匹配（支持父路由，如 /console/task 匹配 /task）
    // 提取 item.path 的路径段（去掉前导斜杠和查询参数）
    const itemPathSegment = item.path.replace(/^\//, '').split('?')[0]
    if (itemPathSegment) {
      // 将当前路径按 / 分割，检查最后一段或任意段是否匹配
      const pathSegments = currentPath.split('?')[0].split('/').filter(Boolean)
      // 检查路径段中是否包含目标段（支持 /console/task 匹配 /task）
      if (pathSegments.includes(itemPathSegment)) {
        return i
      }
    }
  }
  
  // 如果没有找到匹配项，返回 0 或从 localStorage 读取
  const savedIndex = Store.getLocalStorage('Nav')
  return (typeof savedIndex === 'number' ? savedIndex : 0)
}

// 更新选中状态
const updateActiveIndex = () => {
  const activeIndex = findActiveIndex()
  ind.value = activeIndex
  Store.setLocalStorage('Nav', activeIndex)
}

onMounted(() => {
  // 初始化时根据当前路由设置选中状态
  updateActiveIndex()
})

// 监听路由变化，自动更新选中状态
watch(() => route.path, () => {
  updateActiveIndex()
})

// 项目名称：优先使用传入的 prop，否则使用 config 中的默认值
const projectName = computed(() => {
  // 如果传入了 projectName 且不为空，使用传入的值
  if (props.projectName !== undefined && props.projectName !== null && props.projectName !== '') {
    return props.projectName
  }
  // 否则使用 config 中的默认值
  return config.project.name
})

// Logo 图标：优先使用传入的 prop，否则使用 config 中的默认值
const logoIcon = computed(() => {
  // 如果传入了 logoIcon 且不为空，使用传入的值
  if (props.logoIcon !== undefined && props.logoIcon !== null && props.logoIcon !== '') {
    return props.logoIcon
  }
  // 否则使用 config 中的默认值
  return config.project.logoIcon || undefined
})

// 监听 logoIcon 变化并设置 favicon
watch(() => logoIcon.value, (newIcon) => {
  if (newIcon) {
    setFaviconUtil({
      iconName: newIcon,
      iconPrefix: 'far',
      size: 32
    })
  }
}, { immediate: false })

// 监听 projectName 变化并设置页面标题
watch(() => projectName.value, (newName) => {
  if (newName) {
    setPageTitle(newName)
  }
}, { immediate: false })

onMounted(() => {
  // 初始化时根据当前路由设置选中状态
  updateActiveIndex()
  
  // 设置 favicon（如果提供了 logoIcon）
  if (logoIcon.value) {
    setFaviconUtil({
      iconName: logoIcon.value,
      iconPrefix: 'far',
      size: 32
    })
  }
  
  // 设置页面标题（如果提供了 projectName）
  if (projectName.value) {
    setPageTitle(projectName.value)
  }
})

const setNav = (index: number) => {
  ind.value = index
  Store.setLocalStorage('Nav', index)
}

</script>

<template>
  <div class="flex flex-col items-center h-screen w-20 bg-base-100 border-r dark:bg-gray-800 dark:border-gray-500 text-center">
    <nav class="flex flex-col mt-6 gap-y-2">
      <btn size="md" item v-for="(item, index) in Nav" :key="index" tag="RouterLink"
        class="flex flex-col items-center py-2 no-underline hover:bg-base-300 hover:text-primary dark:hover:text-primary w-20"
        :class="[ind === index ? 'bg-primary/10 text-primary bg-base-200' : 'text-gray-600 dark:text-gray-400 ']"
        :to="item.path" @click="setNav(index)">
        <icn :name="item.icon" light xl ></icn>
        <span class="mx-2 text-sm font-normal">{{ item.title }}</span>
      </btn>
    </nav>
  </div>
</template>
