<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import { Store } from '../../Config/storage'
import Drawer from '../../Section/Drawer/Drawer.vue'
import Card from '../../Section/Card/Card.vue'
import Toast from '../../Element/Toast/Toast'
import type { UserInfo, SettingsForm } from './User'
import { getInitialUserInfo, getInitialSettingsForm } from './UserData'

const { t } = useI18n();

// Props 定义
const props = withDefaults(defineProps<{
  buttonClass?: string
  onLogout?: () => void | Promise<void>
  onSettingClick?: () => void
  onNavigate?: (path: string) => void
  userInfo?: UserInfo
}>(), {
  buttonClass: 'hover:text-primary'
})

const isShowDrawer = ref(false)
const isSettingsMode = ref(false)

// 用户信息（从 props 注入或使用默认数据）
const userInfo = ref<UserInfo>(
  props.userInfo || getInitialUserInfo()
)

// 设置表单数据（基于用户信息）
const settingsForm = ref<SettingsForm>(
  getInitialSettingsForm(userInfo.value)
)

// 监听 props 变化，同步更新内部数据
watch(() => props.userInfo, (newUserInfo) => {
  if (newUserInfo) {
    userInfo.value = { ...newUserInfo }
    // 更新设置表单
    settingsForm.value = getInitialSettingsForm(userInfo.value)
  }
}, { deep: true })

// Drawer 宽度（根据是否在设置模式动态调整）
const drawerWidth = computed(() => {
  return isSettingsMode.value ? 'w-[48rem]' : 'w-96'
})

// Drawer 标题
const drawerTitle = computed(() => {
  return isSettingsMode.value ? t('toolbar.setting') : '用户中心'
})

// 获取姓名首字母（用于头像）
const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

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
  isSettingsMode.value = false
}

// 设置点击处理
const handleSettingClick = () => {
  isSettingsMode.value = true
  props.onSettingClick?.()
}

// 返回用户中心
const backToUserCenter = () => {
  isSettingsMode.value = false
}

// 保存设置
const handleSaveSettings = () => {
  // 更新用户信息
  userInfo.value.name = settingsForm.value.name
  userInfo.value.email = settingsForm.value.email
  userInfo.value.phone = settingsForm.value.phone
  
  // TODO: 实际项目中应该调用 API 保存设置
  Toast({ message: '设置已保存', type: 'success' })
  
  // 保存后返回用户中心
  isSettingsMode.value = false
}

// 取消设置
const handleCancelSettings = () => {
  // 重置表单
  settingsForm.value.name = userInfo.value.name
  settingsForm.value.email = userInfo.value.email
  settingsForm.value.phone = userInfo.value.phone
  
  // 返回用户中心
  isSettingsMode.value = false
}

// 切换 Drawer 显示状态
const toggleDrawer = () => {
  isShowDrawer.value = !isShowDrawer.value
  if (!isShowDrawer.value) {
    // 关闭时重置设置模式
    isSettingsMode.value = false
  }
}

</script>
<template>
  <div key="user-drawer" style="padding: 0; margin: 0;">
    <btn item :class="buttonClass" @click="toggleDrawer">
      <icn name="user" light lg></icn>
    </btn>
    <Drawer 
      :title="drawerTitle" 
      :width="drawerWidth" 
      :isShow="isShowDrawer" 
      @update:isShow="isShowDrawer = $event"
      :overflow="true"
    >
      <div class="flex h-full">
        <!-- 用户中心 -->
        <div 
          :class="[
            'flex flex-col m-4',
            isSettingsMode ? 'w-80 flex-shrink-0 ' : 'w-full'
          ]"
        >
          <!-- 用户信息卡片 -->
          <Card shadow rounded class="mb-4 ">
            <div class="flex items-center gap-4">
              <!-- 头像 -->
              <div class="relative flex-shrink-0">
                <div class="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span v-if="!userInfo.avatar" class="text-primary font-bold text-lg">
                    {{ getInitials(userInfo.name) }}
                  </span>
                  <img 
                    v-else 
                    :src="userInfo.avatar" 
                    :alt="userInfo.name" 
                    class="w-full h-full rounded-full object-cover" 
                  />
                </div>
                <span class="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-base-200"></span>
              </div>
              
              <!-- 用户信息 -->
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-lg mb-1 truncate">{{ userInfo.name }}</h3>
                <p class="text-sm text-base-content/70 truncate">{{ userInfo.email }}</p>
                <p class="text-xs text-base-content/60 mt-1">{{ userInfo.role }}</p>
              </div>
            </div>
          </Card>

          <!-- 用户详情 -->
          <div class="flex-1 overflow-y-auto space-y-4">
            <Card shadow rounded>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-base-content/60">部门</span>
                  <span class="text-sm font-medium">{{ userInfo.department }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-base-content/60">电话</span>
                  <span class="text-sm font-medium">{{ userInfo.phone }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-base-content/60">加入日期</span>
                  <span class="text-sm font-medium">{{ userInfo.joinDate }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-base-content/60">最后登录</span>
                  <span class="text-sm font-medium">{{ userInfo.lastLogin }}</span>
                </div>
              </div>
            </Card>

            <!-- 快捷操作 -->
            <Card shadow rounded>
              <div class="space-y-2">
                <btn 
                  variant="outline" 
                  class="w-full justify-start"
                  @click="handleSettingClick"
                >
                  <icn name="gear" light sm class="mr-2"></icn>
                  {{ t('toolbar.setting') }}
                </btn>
                <btn 
                  variant="outline" 
                  class="w-full justify-start"
                >
                  <icn name="user-edit" light sm class="mr-2"></icn>
                  编辑资料
                </btn>
                <btn 
                  variant="outline" 
                  class="w-full justify-start"
                >
                  <icn name="key" light sm class="mr-2"></icn>
                  修改密码
                </btn>
                <btn 
                  variant="outline" 
                  class="w-full justify-start text-error"
                  @click="handleLogout"
                >
                  <icn name="arrow-right-from-bracket" light sm class="mr-2"></icn>
                  {{ t('toolbar.logout') }}
                </btn>
              </div>
            </Card>
          </div>
        </div>

        <!-- 设置页面 -->
        <div v-if="isSettingsMode" class="flex-1 flex flex-col border-l-2 border-l-solid border-base-200">
          <!-- 设置头部 -->
          <div class="p-4 bg-base-150 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <btn clean @click="backToUserCenter">
                <icn name="arrow-left" light xl class="hover:text-primary"></icn>
              </btn>
              <h2 class="text-lg font-bold">设置</h2>
            </div>
            <div class="flex items-center gap-2">
              <btn variant="transparent" size="sm" @click="handleCancelSettings">
                取消
              </btn>
              <btn color="primary" size="sm" @click="handleSaveSettings">
                保存
              </btn>
            </div>
          </div>

          <!-- 设置内容 -->
          <div class="flex-1 overflow-y-auto p-6 bg-base-250">
            <div class="space-y-6 max-w-4xl mx-auto">
              <!-- 个人资料 -->
              <Card title="个人资料" shadow rounded>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-1">姓名</label>
                    <ipt 
                      v-model="settingsForm.name" 
                      placeholder="输入姓名" 
                      class="w-full"
                    ></ipt>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">邮箱</label>
                    <ipt 
                      v-model="settingsForm.email" 
                      type="email"
                      placeholder="输入邮箱" 
                      class="w-full"
                    ></ipt>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">电话</label>
                    <ipt 
                      v-model="settingsForm.phone" 
                      placeholder="输入电话" 
                      class="w-full"
                    ></ipt>
                  </div>
                </div>
              </Card>

              <!-- 通知设置 -->
              <Card title="通知设置" shadow rounded>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium">邮件通知</p>
                      <p class="text-xs text-base-content/60">接收重要通知的邮件提醒</p>
                    </div>
                    <input 
                      type="checkbox" 
                      v-model="settingsForm.emailNotifications"
                      class="toggle toggle-primary"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium">推送通知</p>
                      <p class="text-xs text-base-content/60">接收系统推送通知</p>
                    </div>
                    <input 
                      type="checkbox" 
                      v-model="settingsForm.pushNotifications"
                      class="toggle toggle-primary"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium">短信通知</p>
                      <p class="text-xs text-base-content/60">接收重要通知的短信提醒</p>
                    </div>
                    <input 
                      type="checkbox" 
                      v-model="settingsForm.smsNotifications"
                      class="toggle toggle-primary"
                    />
                  </div>
                </div>
              </Card>

              <!-- 隐私设置 -->
              <Card title="隐私设置" shadow rounded>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-1">资料可见性</label>
                    <select 
                      v-model="settingsForm.profileVisibility"
                      class="select select-bordered w-full"
                    >
                      <option value="public">公开</option>
                      <option value="friends">仅好友</option>
                      <option value="private">私密</option>
                    </select>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium">显示邮箱</p>
                      <p class="text-xs text-base-content/60">其他用户可以看到您的邮箱</p>
                    </div>
                    <input 
                      type="checkbox" 
                      v-model="settingsForm.showEmail"
                      class="toggle toggle-primary"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium">显示电话</p>
                      <p class="text-xs text-base-content/60">其他用户可以看到您的电话</p>
                    </div>
                    <input 
                      type="checkbox" 
                      v-model="settingsForm.showPhone"
                      class="toggle toggle-primary"
                    />
                  </div>
                </div>
              </Card>

              <!-- 账户设置 -->
              <Card title="账户设置" shadow rounded>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-1">语言</label>
                    <select 
                      v-model="settingsForm.language"
                      class="select select-bordered w-full"
                    >
                      <option value="zh-CN">简体中文</option>
                      <option value="en-US">English</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">主题</label>
                    <select 
                      v-model="settingsForm.theme"
                      class="select select-bordered w-full"
                    >
                      <option value="auto">自动</option>
                      <option value="light">浅色</option>
                      <option value="dark">深色</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">时区</label>
                    <select 
                      v-model="settingsForm.timezone"
                      class="select select-bordered w-full"
                    >
                      <option value="Asia/Shanghai">Asia/Shanghai (UTC+8)</option>
                      <option value="America/New_York">America/New_York (UTC-5)</option>
                      <option value="Europe/London">Europe/London (UTC+0)</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  </div>
</template>

