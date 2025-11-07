<script setup lang="ts">
import { ref } from 'vue';
import Drawer from '../../Section/Drawer/Drawer.vue'

// Props 定义
const props = withDefaults(defineProps<{
  buttonClass?: string
  onNoticeClick?: () => void
}>(), {
  buttonClass: 'hover:text-primary'
})

const isShowDrawer = ref(false)

// 切换 Drawer 显示状态
const toggleDrawer = () => {
  isShowDrawer.value = !isShowDrawer.value
  // 调用父组件传入的通知点击回调
  if (isShowDrawer.value) {
    props.onNoticeClick?.()
  }
}

</script>
<template>
  <div key="notice-drawer" style="padding: 0; margin: 0;">
    <btn item :class="buttonClass" @click="toggleDrawer">
      <icn name="bell" light lg></icn>
    </btn>
    <Drawer title="Notice" width="w-64" :isShow="isShowDrawer" @update:isShow="isShowDrawer = $event">
      <h1>用户登录</h1>
      <h1>用户登出</h1>
    </Drawer>
  </div>
</template>

