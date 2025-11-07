<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import Drawer from '../../Section/Drawer/Drawer.vue'
import Menu from '../../Section/Menu/Menu.vue'
import TaskCreate from '../../Model/Forms/TaskCreate.vue'
import AccountCreate from '../../Model/Forms/AccountCreate.vue'

const { t } = useI18n();

// Props 定义
const props = withDefaults(defineProps<{
  buttonClass?: string
  onTaskCreate?: (formData?: any) => void
  onAccountCreate?: (formData?: any) => void
}>(), {
  buttonClass: 'hover:text-primary'
})

const isShowDrawer = ref(false)
const isShowTaskForm = ref(false)
const isShowAccountForm = ref(false)
const drawerWidth = ref('w-32')

// 切换 Drawer 显示状态
const toggleDrawer = () => {
  isShowDrawer.value = !isShowDrawer.value
  if (!isShowDrawer.value) {
    // 关闭 Drawer 时重置表单状态
    isShowTaskForm.value = false
    isShowAccountForm.value = false
    drawerWidth.value = 'w-32'
  }
}

// 任务点击处理
const handleTaskClick = () => {
  isShowTaskForm.value = true
  isShowAccountForm.value = false
  drawerWidth.value = 'w-100'
  // 调用父组件传入的任务创建回调
  props.onTaskCreate?.()
}

// 账户点击处理
const handleAccountClick = () => {
  isShowAccountForm.value = true
  isShowTaskForm.value = false
  drawerWidth.value = 'w-100'
  // 调用父组件传入的账户创建回调
  props.onAccountCreate?.()
}

// 任务表单回调函数
const handleTaskSubmit = async (formData: any) => {
  props.onTaskCreate?.(formData)
}

const handleTaskSuccess = (response: any) => {
  console.log('任务创建成功:', response)
}

const handleTaskError = (error: any, response?: any) => {
  console.error('任务创建失败:', error)
  if (response?.data?.message) {
    console.error('错误信息:', response.data.message)
  }
}

// 账户表单回调函数
const handleAccountSubmit = async (formData: any) => {
  props.onAccountCreate?.(formData)
}

const handleAccountSuccess = (response: any) => {
  console.log('账户创建成功:', response)
}

const handleAccountError = (error: any, response?: any) => {
  console.error('账户创建失败:', error)
  if (response?.data?.message) {
    console.error('错误信息:', response.data.message)
  }
}

</script>
<template>
  <div key="plus-drawer" style="padding: 0; margin: 0;">
    <btn item :class="buttonClass" @click="toggleDrawer">
      <icn name="plus" light lg></icn>
    </btn>
    <Drawer :title="t('toolbar.plus')" :width="drawerWidth" :isShow="isShowDrawer" @update:isShow="isShowDrawer = $event">
      <div class="flex flex-row">
        <Menu shadow class="w-36 h-screen">
          <btn item @click="handleTaskClick" :class="[isShowTaskForm ? 'bg-gray-200 dark:bg-gray-700' : '']">
            <icn name="calendar-check" light lg />{{ t('task.task') }}
          </btn>
          <btn item @click="handleAccountClick" :class="[isShowAccountForm ? 'bg-gray-200 dark:bg-gray-700' : '']">
            <icn name="user" light lg />{{ t('toolbar.account') }}
          </btn>
        </Menu>
        <TaskCreate 
          v-if="isShowTaskForm" 
          :onSubmit="handleTaskSubmit"
          :onSuccess="handleTaskSuccess"
          :onError="handleTaskError"
        />
        <AccountCreate 
          v-if="isShowAccountForm" 
          :onSubmit="handleAccountSubmit"
          :onSuccess="handleAccountSuccess"
          :onError="handleAccountError"
        />
      </div>
    </Drawer>
  </div>
</template>

