<template>
  <div class="flex flex-col h-screen overflow-hidden text-base-content" :class="bgClass">
    <div class="sticky top-0 z-50">
      <Header 
        project-name="Sectum"
        logo-icon="section"
        :theme-component="Theme"
        :dark-component="DarkToggle"
        :language-component="Language"
        :icon-buttons="iconButtons"
        :background-opacity="0.25"
      />
    </div>
    <div class="flex flex-col min-h-0 flex-1 bg-base-300">
      <!-- 首页内容 -->
      <template v-if="isHomePage">
        <div class="flex flex-col h-full min-h-0 overflow-y-auto" :class="contentClass">
          <HomePage />
          <HomeExample />
          <Footer />
        </div>
      </template>
      <!-- 文档页面内容（包含 Sidebar） -->
      <template v-else>
        <Menual :routes="routeConfig" />
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header, { type IconButton } from '~/packet/Layout/Header/Header.vue'
import HomePage from './HomePage.vue'
import HomeExample from './HomeExample.vue'
import Footer from '~/packet/Layout/Footer/Footer.vue'
import Menual from '~/packet/Layout/Menual/Menual.vue'
import Theme from '~/packet/Pattern/Theme/Theme.vue'
import DarkToggle from '~/packet/Pattern/Dark/DarkToggle.vue'
import Language from '~/packet/Pattern/Language/Language.vue'
import routeConfig from '~/router/route'

const route = useRoute()

// 判断是否为首页
const isHomePage = computed(() => {
  return route.path === '/' || route.path === '/index'
})

// 动态背景色
const bgClass = computed(() => {
  return isHomePage.value ? 'bg-base-200' : 'bg-base-300'
})

// 动态内容区域样式
const contentClass = computed(() => {
  return isHomePage.value ? 'px-8 lg:px-36 pt-25' : ''
})

// 图标按钮配置
const iconButtons: IconButton[] = [
  {
    link: '/profile',
    icon: 'user',
    light: true,
    brand: false
  },
  {
    link: 'https://github.com/Sorcech/Sectum',
    icon: 'github',
    light: false,
    brand: true
  }
]
</script>