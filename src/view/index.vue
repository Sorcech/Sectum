<template>
  <div class="flex flex-col h-screen overflow-hidden text-base-content" :class="bgClass">
    <div class="sticky top-0 z-50">
      <Header 
        project-name="Sectum"
        :theme-component="ThemeSelect"
        :dark-component="DarkChange"
        :language-component="LanguageSelect"
        user-link="https://github.com/Sorcech/Sectum"
        user-icon="github"
        :user-icon-brand="true"
        :background-opacity="0.5"
      />
    </div>
    <div class="flex flex-col min-h-0 flex-1 bg-base-300">
      <div class="flex flex-1 min-h-0">
        <Sidebar :routes="routeConfig" :on-navigate="handleNavigate" />
        <main class="flex-1 min-w-0 lg:ml-10">
          <div class="flex flex-col h-full min-h-0 overflow-y-auto" :class="contentClass">
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