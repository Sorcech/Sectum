<template>
  <div class="flex flex-col w-screen h-screen overflow-hidden text-base-content" :class="bgClass">
    <div class="sticky top-0 z-50 flex-shrink-0">
      <Header 
        :project-name="config.project.name"
        logo-icon="section"
        :theme-component="Theme"
        :dark-component="DarkToggle"
        :language-component="Language"
        :icon-buttons="iconButtons"
      />
    </div>
    <div class="flex flex-col min-h-0 flex-1 bg-base-250 overflow-hidden">
      <!-- 首页内容 -->
      <template v-if="isHomePage">
        <div class="flex flex-col h-full min-h-0 overflow-y-auto overflow-x-hidden" :class="contentClass">
          <Home />
          <Example />
          <Footer 
            :copyright-holder="config.footer.copyrightHolder"
            :additional-info="config.footer.additionalInfo"
          />
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
import Header, { type IconButton } from '~/packet/Model/Header/Header.vue'
import Home from './Home.vue'
import Example from './Example.vue'
import Footer from '~/packet/Model/Footer/Footer.vue'
import Menual from '~/packet/Layout/Menual/Menual.vue'
import Theme from '~/packet/Pattern/Theme/Theme.vue'
import DarkToggle from '~/packet/Pattern/Dark/DarkToggle.vue'
import Language from '~/packet/Pattern/Language/Language.vue'
import routeConfig from '~/router/SectumRoute'
import config from '~/config/config'

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

// 图标按钮配置（从 config 中读取用户链接）
const iconButtons: IconButton[] = [
  {
    link: 'https://github.com/Sorcech/Sectum',
    icon: 'github',
    light: false,
    brand: true
  }
]
</script>