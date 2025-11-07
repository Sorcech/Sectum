<template>
  <div class="flex flex-row">
    <div class="flex flex-col h-screen w-16 bg-base-100 dark:bg-gray-800 dark:border-gray-600">
      <Menu class="flex flex-col h-full">
        <component 
          v-if="props.plusComponent !== null"
          :is="props.plusComponent || defaultPlusComponent"
          button-class="hover:text-primary flex items-center justify-center w-full h-12"
          :on-task-create="props.onTaskCreate"
          :on-account-create="props.onAccountCreate"
        />
        <component 
          v-if="props.userComponent !== null"
          :is="props.userComponent || defaultUserComponent"
          button-class="hover:text-primary flex items-center justify-center w-full h-12"
          :on-logout="props.onLogout"
          :on-setting-click="props.onSettingClick"
          :on-navigate="props.onNavigate"
        />
        <component 
          v-if="props.darkComponent !== null"
          :is="props.darkComponent || defaultDarkComponent"
          item 
          class="hover:text-primary flex items-center justify-center h-12"
        />
        <component 
          v-if="props.themeComponent !== null"
          :is="props.themeComponent || defaultThemeComponent"
          mode="drawer"
          button-class="hover:text-primary flex items-center justify-center w-full h-12"
        />
        <component 
          v-if="props.languageComponent !== null"
          :is="props.languageComponent || defaultLanguageComponent"
          mode="drawer"
          button-class="hover:text-primary flex items-center justify-center w-full h-12"
        />
        <component 
          v-if="props.noticeComponent !== null"
          :is="props.noticeComponent || defaultNoticeComponent"
          button-class="hover:text-primary flex items-center justify-center w-full h-12"
          :on-notice-click="props.onNoticeClick"
        />
        <component 
          v-if="props.fullScreenComponent !== null"
          :is="props.fullScreenComponent || defaultFullScreenComponent"
          class="flex items-center justify-center w-full h-12"
        />
      </Menu>
    </div>
  </div>
</template>  
<script setup lang="ts">
import { onMounted } from 'vue'
import I18n from '~/locale'
import { Store } from '~/packet/Config/storage'
import Theme from '~/packet/Pattern/Theme/Theme.vue'
import Language from '~/packet/Pattern/Language/Language.vue'
import User from '~/packet/Pattern/User/User.vue'
import Plus from '~/packet/Pattern/Plus/Plus.vue'
import Notice from '~/packet/Pattern/Notice/Notice.vue'
import Dark from '~/packet/Pattern/Dark/DarkToggle.vue'
import FullScreen from '~/packet/Pattern/FullScreen/FullScreen.vue'

// 默认组件（作为 fallback）
const defaultPlusComponent = Plus
const defaultUserComponent = User
const defaultDarkComponent = Dark
const defaultThemeComponent = Theme
const defaultLanguageComponent = Language
const defaultNoticeComponent = Notice
const defaultFullScreenComponent = FullScreen

// Props 定义
const props = withDefaults(defineProps<{
  // 组件注入（传入 null 可隐藏该组件，传入组件实例可替换默认组件，不传则使用默认组件）
  plusComponent?: any
  userComponent?: any
  darkComponent?: any
  themeComponent?: any
  languageComponent?: any
  noticeComponent?: any
  fullScreenComponent?: any
  // 回调函数
  onLogout?: () => void | Promise<void>
  onThemeChange?: (theme: string) => void
  onLanguageChange?: (locale: 'zh-CN' | 'en-US') => void
  onNavigate?: (path: string) => void
  onTaskCreate?: (formData?: any) => void
  onAccountCreate?: (formData?: any) => void
  onNoticeClick?: () => void
  onSearchClick?: () => void
  onSettingClick?: () => void
}>(), {
  // 默认显示所有组件（undefined 表示使用默认组件）
})

onMounted(() => {
  if (Store.getLocalStorage('locale')) {
    I18n.global.locale.value = Store.getLocalStorage('locale')
  }
})
</script>