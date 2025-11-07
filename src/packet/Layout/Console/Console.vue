<template>
  <div class="w-screen h-screen bg-base-300 relative overflow-hidden">
    <!-- 固定的左侧导航栏 -->
    <div class="flex h-screen">
      <!-- 左侧导航栏 -->
      <div class="w-20 h-screen flex-shrink-0">
        <Navbar :items="consoleNavItems" :project-name="config.project.name" logo-icon="section" />
      </div>
      
      <!-- 主要内容区域 -->
      <div class="flex-1 h-screen overflow-hidden">
        <router-view :key="$route.fullPath"></router-view>
      </div>
      
      <!-- 右侧工具栏 -->
      <div class="w-16 h-screen flex-shrink-0">
        <Toolbar 
          :plusComponent="Plus"
          :userComponent="User"
          :darkComponent="Dark"
          :themeComponent="Theme"
          :languageComponent="Language"
          :noticeComponent="Notice"
          :fullScreenComponent="FullScreen"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Navbar from '~/packet/Layout/Navbar/Navbar.vue'
import Toolbar from '~/packet/Layout/Toolbar/Toolbar.vue'
import type { NavbarItem } from '~/packet/Layout/Navbar/Navbar'
import { navbarItems } from '~/packet/Layout/Navbar/Navbar'
import config from '~/config/config'
import Plus from '~/packet/Pattern/Plus/Plus.vue'
import User from '~/packet/Pattern/User/User.vue'
import Dark from '~/packet/Pattern/Dark/DarkToggle.vue'
import Theme from '~/packet/Pattern/Theme/Theme.vue'
import Language from '~/packet/Pattern/Language/Language.vue'
import Notice from '~/packet/Pattern/Notice/Notice.vue'
import FullScreen from '~/packet/Pattern/FullScreen/FullScreen.vue'

// Console 页面的导航配置：使用 navbar.ts 中的列表，并将路径转换为 console 路径
const consoleNavItems = computed<NavbarItem[]>(() => {
  return navbarItems.map(item => ({
    ...item,
    path: `/console${item.path}`
  }))
})



</script>

