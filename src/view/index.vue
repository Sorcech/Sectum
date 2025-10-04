<template>
  <div class="antialiased text-base-content" :class="bgClass">
    <Header 
      project-name="Section"
      :theme-component="ThemeSelect"
      :dark-component="DarkChange"
      :language-component="LanguageSelect"
      user-link="/login"
    />
    <div class="flex min-h-screen">
      <Sidebar :routes="routeConfig" :on-navigate="handleNavigate" />
      <main class="flex-1 min-w-0 overflow-hidden lg:ml-10">
        <div class="h-full overflow-y-auto" :class="contentClass">
          <!-- 首页内容 -->
          <template v-if="isHomePage">
            <HomePage />
            <HomeExample />
            <Footer />
          </template>
          <!-- 文档页面内容 -->
          <template v-else>
            <Menual />
          </template>
        </div>
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '~/packet/Layout/Header/Header.vue'
import Sidebar from '~/packet/Layout/Sidebar/Sidebar.vue'
import HomePage from './HomePage.vue'
import HomeExample from './HomeExample.vue'
import Footer from '~/packet/Layout/Footer/Footer.vue'
import Menual from './menual.vue'
import ThemeSelect from '~/packet/Pattern/Theme/ThemeSelect.vue'
import DarkChange from '~/packet/Pattern/Dark/DarkChange.vue'
import LanguageSelect from '~/packet/Pattern/Language/LanguageSelect.vue'
import routeConfig from '~/router/route'

const route = useRoute()
const router = useRouter()

// 路由跳转处理函数
const handleNavigate = (path: string) => {
  router.push(path)
}

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
</script>