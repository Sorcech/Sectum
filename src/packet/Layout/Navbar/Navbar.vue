<template>
  <div class="flex flex-col items-center h-screen w-20 bg-base-100 border-r dark:bg-gray-800 dark:border-gray-500 text-center">
    <div class="flex flex-col items-center pt-3">
      <icn 
        v-if="logoIcon" 
        :name="logoIcon" 
        solid 
        xl 
        color="primary" 
        style="font-size: 1.5rem;" 
      />
      <h3 class="font-medium text-primary text-md">
        <a href="/" class="no-underline">{{ projectName }}</a>
      </h3>
    </div>
    <nav class="flex flex-col mt-6 gap-y-2">
      <btn size="md" item v-for="(item, index) in Nav" :key="index" tag="RouterLink"
        class="flex flex-col items-center py-2 no-underline hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 w-20"
        :class="[ind === index ? 'bg-gray-200 text-blue-500 dark:bg-gray-800 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400']"
        :to="item.path" @click="setNav(index)">
        <icn :name="item.icon" light xl></icn>
        <span class="mx-2 text-sm font-normal">{{ item.title }}</span>
      </btn>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Store } from '~/packet/Config/storage'
import navbar from '~/packet/Layout/Navbar/Navbar'
import config from '~/config/config'

// 导入类型
import type { NavbarItem } from './Navbar'

// Props 定义
const props = withDefaults(defineProps<{
  items?: NavbarItem[]
  projectName?: string
  logoIcon?: string  // Logo 图标名称，如果未提供则不显示图标
}>(), {
  projectName: undefined,
  logoIcon: undefined
})

let ind = ref(0)
onMounted(() => {
  if (Store.getLocalStorage('Nav')) {
    ind.value = Store.getLocalStorage('Nav')
  } else {
    ind.value = 0
  }
})

// 使用传入的 items 或默认的 navbar 配置
const Nav = computed(() => props.items || navbar)

// 项目名称：优先使用传入的 prop，否则使用 config 中的默认值
const projectName = computed(() => {
  // 如果传入了 projectName 且不为空，使用传入的值
  if (props.projectName !== undefined && props.projectName !== null && props.projectName !== '') {
    return props.projectName
  }
  // 否则使用 config 中的默认值
  return config.project.name
})

const setNav = (index: number) => {
  ind.value = index
  Store.setLocalStorage('Nav', index)
}

</script>
