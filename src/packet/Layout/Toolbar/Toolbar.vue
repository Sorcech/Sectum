<template>
  <div class="flex flex-row">
    <div class="flex flex-col h-screen w-16 bg-base-100 dark:bg-gray-800 dark:border-gray-600">
      <Menu class="flex flex-col h-full w-full">
        <btn item class="hover:text-primary flex items-center justify-center w-full h-12" @click="showPlus">
          <icn name="plus" light lg />
        </btn>
        <btn item class="hover:text-primary flex items-center justify-center w-full h-12" @click="showUser">
          <icn name="user" light lg />
        </btn>
        <Dark item class="flex items-center justify-center w-full h-12" />
        <btn item class="hover:text-primary flex items-center justify-center w-full h-12" @click="showTheme">
          <icn name="swatchbook" light lg />
        </btn>
        <btn item class="hover:text-primary flex items-center justify-center w-full h-12" @click="showLanguage">
          <icn name="language" light lg />
        </btn>
        <btn item class="hover:text-primary flex items-center justify-center w-full h-12" @click="showNotice">
          <icn name="bell" light lg />
        </btn>
        <btn item class="hover:text-primary flex items-center justify-center w-full h-12" @click="props.onSearchClick?.()">
          <icn name="magnifying-glass" light lg />
        </btn>
        <FullScreen v-slot="{ toggle, isFullscreen }">
          <btn item @click="toggle()" class="hover:text-primary flex items-center justify-center w-full h-12">
            <span v-show="!isFullscreen">
              <icn name="expand" light lg />
            </span>
            <span v-show="isFullscreen">
              <icn name="compress" light lg />
            </span>
          </btn>
        </FullScreen>
      </Menu>
    </div>
    <Drawer :title="t('toolbar.plus')" :width="plusWidth" :isShow="isShowPlus" @update:isShow="showPlus">
      <div class="flex flex-row">
        <Menu shadow class=" w-36 h-screen">
          <btn item @click="plusTask" :class="[isShowTaskForm ? 'bg-gray-200 dark:bg-gray-700' : '']">
            <icn name="calendar-check" light lg />{{ t('task.task') }}
          </btn>
          <btn item @click="plusAccount" :class="[isShowAccountForm ? 'bg-gray-200 dark:bg-gray-700' : '']">
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
    <Drawer title="User" :isShow="isShowUser" @update:isShow="showUser">
      <Menu shadow class="h-screen">
        <btn item @click="Logout()">
          <icn name="calendar-check" light lg />{{ t('toolbar.logout') }}
        </btn>
        <btn item @click="props.onSettingClick?.()">
          <icn name="gear" light lg />{{ t('toolbar.setting') }}
        </btn>
      </Menu>
    </Drawer>
    <Drawer title="Theme" width="w-36" :isShow="isShowTheme" @update:isShow="showTheme">
      <Menu shadow class="bg-base-300 dark:bg-base-100 m-3">
        <btn clean @click="changeTheme('theme-default')">
          <span class="theme-blue rounded-$rounded-btn bg-blue-700 h-6 w-6"></span>{{ t("theme.blue") }}
        </btn>
        <btn clean @click="changeTheme('theme-teal')">
          <span class="theme-teal rounded-$rounded-btn bg-teal-700 h-6 w-6"></span>{{ t("theme.teal") }}
        </btn>
        <btn clean @click="changeTheme('theme-rose')">
          <span class="theme-rose rounded-$rounded-btn bg-rose-700 h-6 w-6"></span>{{ t("theme.rose") }}
        </btn>
        <btn clean @click="changeTheme('theme-violet')">
          <span class="theme-violet rounded-$rounded-btn bg-violet-700 h-6 w-6"></span>{{ t("theme.violet") }}
        </btn>
        <btn clean @click="changeTheme('theme-orange')">
          <span class="theme-orange rounded-$rounded-btn bg-orange-700 h-6 w-6"></span>{{ t("theme.orange") }}
        </btn>
      </Menu>
    </Drawer>
    <Drawer title="Language" :isShow="isShowLanguage" @update:isShow="showLanguage">
      <Menu shadow class="bg-base-300 dark:bg-base-100 m-3">
        <btn clean @click="setLanguage('en-US')">
          English
        </btn>
        <btn clean @click="setLanguage('zh-CN')">
          中文
        </btn>
      </Menu>
    </Drawer>
    <Drawer title="Notice" :isShow="isShowNotice" @update:isShow="showNotice">
      <h1>用户登录</h1>
      <h1>用户登出</h1>
    </Drawer>
  </div>
</template>  
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import I18n from '~/locale'
import router from '~/router'
import { Store } from '~/packet/Util/storage'
import { Task } from '~/store/project/task'
import { Project } from '~/store/project/project'
// Props 定义
const props = defineProps<{
  onLogout?: () => void | Promise<void>
  onThemeChange?: (theme: string) => void
  onLanguageChange?: (locale: 'zh-CN' | 'en-US') => void
  onTaskCreate?: () => void
  onAccountCreate?: () => void
  onNoticeClick?: () => void
  onSearchClick?: () => void
  onSettingClick?: () => void
}>()

const { t } = useI18n()
const plusWidth = ref('')

onMounted(() => {
  if (Store.getLocalStorage('locale')) {
    I18n.global.locale.value = Store.getLocalStorage('locale')
  }
})

const setLanguage = (locale: 'zh-CN' | 'en-US') => {
  if (locale !== I18n.global.locale.value) {
    Store.setLocalStorage('locale', locale)
    I18n.global.locale.value = locale
    // 调用父组件传入的语言切换回调
    props.onLanguageChange?.(locale)
    return true
  } else {
    return false
  }
}

const Logout = () => {
  router.push('/')
  // 调用父组件传入的登出回调
  props.onLogout?.()
  Store.removeLocalStorage('Token')
  Store.removeLocalStorage('Expire')
  Store.clearLocalStorage()
}

const isShowPlus = ref(false)
const isShowUser = ref(false)
const isShowTheme = ref(false)
const isShowNotice = ref(false)
const isShowLanguage = ref(false)
const isShowTaskForm = ref(false)
const isShowProjectForm = ref(false)
const isShowAccountForm = ref(false)
const showPlus = () => {
  isShowPlus.value = !isShowPlus.value
  isShowUser.value = false
  isShowTheme.value = false
  isShowNotice.value = false
  isShowLanguage.value = false
  isShowTaskForm.value = false
  isShowProjectForm.value = false
  plusWidth.value = 'w-32'
}
function showUser() {
  isShowUser.value = !isShowUser.value
  isShowTheme.value = false
  isShowNotice.value = false
  isShowPlus.value = false
  isShowLanguage.value = false
}
function showTheme() {
  isShowTheme.value = !isShowTheme.value
  isShowUser.value = false
  isShowNotice.value = false
  isShowPlus.value = false
  isShowLanguage.value = false
}
function showNotice() {
  isShowNotice.value = !isShowNotice.value
  isShowUser.value = false
  isShowTheme.value = false
  isShowPlus.value = false
  isShowLanguage.value = false
  // 调用父组件传入的通知点击回调
  props.onNoticeClick?.()
}
function showLanguage() {
  isShowLanguage.value = !isShowLanguage.value
  isShowUser.value = false
  isShowTheme.value = false
  isShowPlus.value = false
  isShowNotice.value = false
}

const isTheme = ref<string>('theme-default')

onMounted(() => {
  if (Store.getLocalStorage('theme'))
    isTheme.value = Store.getLocalStorage('theme')
  document.documentElement.classList.add(isTheme.value);
})

function changeTheme(color: string) {
  document.documentElement.classList.remove(isTheme.value);
  isTheme.value = color;
  document.documentElement.classList.add(isTheme.value);
  Store.setLocalStorage('theme', isTheme.value);
  // 调用父组件传入的主题切换回调
  props.onThemeChange?.(color);
}

function plusTask() {
  isShowTaskForm.value = true
  isShowProjectForm.value = false
  isShowAccountForm.value = false
  plusWidth.value = 'w-100'
  // 调用父组件传入的任务创建回调
  props.onTaskCreate?.()
}
function plusAccount() {
  isShowAccountForm.value = true
  isShowProjectForm.value = false
  isShowTaskForm.value = false
  plusWidth.value = 'w-100'
  // 调用父组件传入的账户创建回调
  props.onAccountCreate?.()
}

// 任务表单回调函数
const handleTaskSubmit = async (formData: any) => {
  try {
    const response: any = await Task.Create(formData)
    if (response.data.code === 0) {
      handleTaskSuccess(response)
    } else {
      handleTaskError(response.data.message)
    }
  } catch (error) {
    handleTaskError(error)
  }
}

const handleTaskSuccess = (response: any) => {
  console.log('任务创建成功:', response)
  // 可以添加成功后的处理逻辑，比如关闭表单、刷新列表等
}

const handleTaskError = (error: any, response?: any) => {
  console.error('任务创建失败:', error)
  // 可以添加错误处理逻辑，现在可以访问 response 参数
  if (response?.data?.message) {
    console.error('错误信息:', response.data.message)
  }
}

// 账户表单回调函数
const handleAccountSubmit = async (formData: any) => {
  try {
    const response: any = await Project.Create(formData)
    if (response.data.code === 0) {
      handleAccountSuccess(response)
    } else {
      handleAccountError(response.data.message)
    }
  } catch (error) {
    handleAccountError(error)
  }
}

const handleAccountSuccess = (response: any) => {
  console.log('账户创建成功:', response)
  // 可以添加成功后的处理逻辑
}

const handleAccountError = (error: any, response?: any) => {
  console.error('账户创建失败:', error)
  // 可以添加错误处理逻辑，现在可以访问 response 参数
  if (response?.data?.message) {
    console.error('错误信息:', response.data.message)
  }
}
</script>