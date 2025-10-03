<template>
  <div class="antialiased text-base-content bg-base-300 ">
    <Header 
      project-name="Section UI"
      :theme-component="ThemeSelect"
      :dark-component="DarkChange"
      :language-component="LanguageSelect"
      user-link="/login"
    />
    <div class="flex min-h-screen">
      <Sidebar :routes="route" />
      <main class="flex-1 min-w-0 overflow-hidden lg:ml-10">
        <div class="h-full overflow-y-auto">
          <RouterView class="doc" />
        </div>
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, provide } from 'vue'
import Header from '~/packet/Layout/Header/Header.vue'
import Sidebar from '~/packet/Layout/Sidebar/Sidebar.vue'
import ThemeSelect from '~/packet/Pattern/Theme/ThemeSelect.vue'
import DarkChange from '~/packet/Pattern/Dark/DarkChange.vue'
import LanguageSelect from '~/packet/Pattern/Language/LanguageSelect.vue'
import route from '~/router/route'

// 侧边栏状态管理
const isOpen = ref<boolean>(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

// 提供给子组件使用
provide('sidebar', {
  isOpen,
  toggleSidebar
})
</script>