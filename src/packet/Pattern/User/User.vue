<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { Store } from '../../Config/storage'
import Drawer from '../../Section/Drawer/Drawer.vue'
import Menu from '../../Section/Menu/Menu.vue'

const { t } = useI18n();

// Props 定义
const props = withDefaults(defineProps<{
  buttonClass?: string
  onLogout?: () => void | Promise<void>
  onSettingClick?: () => void
  onNavigate?: (path: string) => void
}>(), {
  buttonClass: 'hover:text-primary'
})

const isShowDrawer = ref(false)

// 登出处理
const handleLogout = () => {
  // 调用父组件传入的登出回调
  props.onLogout?.()
  Store.removeLocalStorage('Token')
  Store.removeLocalStorage('Expire')
  Store.clearLocalStorage()
  
  // 使用回调函数进行路由跳转
  if (props.onNavigate) {
    props.onNavigate('/')
  } else {
    console.warn('Navigation callback not provided, please set onNavigate prop to handle redirect')
  }
  
  // 登出后关闭 Drawer
  isShowDrawer.value = false
}

// 设置点击处理
const handleSettingClick = () => {
  props.onSettingClick?.()
  // 点击设置后关闭 Drawer
  isShowDrawer.value = false
}

// 切换 Drawer 显示状态
const toggleDrawer = () => {
  isShowDrawer.value = !isShowDrawer.value
}

</script>
<template>
  <div key="user-drawer" style="padding: 0; margin: 0;">
    <btn item :class="buttonClass" @click="toggleDrawer">
      <icn name="user" light lg></icn>
    </btn>
    <Drawer title="User" width="w-48" :isShow="isShowDrawer" @update:isShow="isShowDrawer = $event">
      <Menu shadow class="h-screen">
        <btn item @click="handleLogout">
          <icn name="arrow-right-from-bracket" light lg />{{ t('toolbar.logout') }}
        </btn>
        <btn item @click="handleSettingClick">
          <icn name="gear" light lg />{{ t('toolbar.setting') }}
        </btn>
      </Menu>
    </Drawer>
  </div>
</template>

