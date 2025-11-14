<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import { Store } from '../../Config/storage'
import Toast from '~/packet/Element/Toast/Toast';
//import { User } from './User'
import UserEdit from './UserEdit.vue'
import UserPassword from './UserPassword.vue'
import type { UserProfile, SettingsForm } from './User'
import { getInitialUserInfo, getInitialSettingsForm } from './User'

const { t } = useI18n();

// Props 定义
const props = withDefaults(defineProps<{
  buttonClass?: string
  onLogout?: () => void | Promise<void>
  onSettingClick?: () => void
  onNavigate?: (path: string) => void
  userInfo?: UserProfile
}>(), {
  buttonClass: 'hover:text-primary'
})

const isShowDrawer = ref(false)
const isSettingsMode = ref(false)
const isEditProfileMode = ref(false)
const isChangePasswordMode = ref(false)
const isLoadingUserInfo = ref(false)
const isSaving = ref(false)

// 用户信息（从 props 注入或使用默认数据）
const userInfo = ref<UserProfile>(
  props.userInfo || getInitialUserInfo()
)

// 设置表单数据（基于用户信息）
const settingsForm = ref<SettingsForm>(
  getInitialSettingsForm(userInfo.value)
)

// UserEdit 组件的引用
const profileEditRef = ref<InstanceType<typeof UserEdit> | null>(null)

// UserPassword 组件的引用
const passwordChangeRef = ref<InstanceType<typeof UserPassword> | null>(null)

// 编辑资料表单的初始数据（用于 UserEdit 组件）
const editProfileInitialData = ref({
  name: '',
  email: '',
  phone: '',
  gender: 0,
  birthday: '',
  address: ''
})

// 监听 props 变化，同步更新内部数据
watch(() => props.userInfo, (newUserInfo) => {
  if (newUserInfo) {
    userInfo.value = { ...newUserInfo }
    // 更新设置表单
    settingsForm.value = getInitialSettingsForm(userInfo.value)
  }
}, { deep: true })

// Drawer 宽度（根据当前模式动态调整）
const drawerWidth = computed(() => {
  if (isSettingsMode.value || isEditProfileMode.value || isChangePasswordMode.value) {
    return 'w-[48rem]'
  }
  return 'w-96'
})

// Drawer 标题
const drawerTitle = computed(() => {
  if (isChangePasswordMode.value) return '修改密码'
  if (isEditProfileMode.value) return '编辑资料'
  if (isSettingsMode.value) return t('toolbar.setting')
  return '用户中心'
})

// 获取姓名首字母（用于头像）
const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

// 登出处理
const handleLogout = async () => {
  try {
    // 调用父组件传入的登出回调（可能是异步的）
    if (props.onLogout) {
      await props.onLogout()
    }
    
    // 清除认证相关的本地存储数据
    Store.removeLocalStorage('Token')
    Store.removeLocalStorage('Expire')
    // 注意：不清空所有 localStorage，只删除认证相关数据
    // 这样可以保留其他设置（如语言、主题等）
    
    // 登出后关闭 Drawer
    isShowDrawer.value = false
    isSettingsMode.value = false
    
    // 使用回调函数进行路由跳转
    if (props.onNavigate) {
      // 登出后应该跳转到登录页
      props.onNavigate('/')
    } else {
      // 如果没有提供导航回调，使用 window.location 跳转到登录页
      window.location.href = '/'
    }
  } catch (error) {
    console.error('Logout error:', error)
    // 即使出错，也要清除本地存储并跳转
    Store.removeLocalStorage('Token')
    Store.removeLocalStorage('Expire')
    isShowDrawer.value = false
    isSettingsMode.value = false
    if (props.onNavigate) {
      props.onNavigate('/')
    } else {
      window.location.href = '/'
    }
  }
}

// 编辑资料点击处理
const handleEditProfileClick = () => {
  isEditProfileMode.value = true
  isChangePasswordMode.value = false
  isSettingsMode.value = false
  // 更新编辑表单初始数据为当前用户信息
  editProfileInitialData.value = {
    name: userInfo.value.name,
    email: userInfo.value.email,
    phone: userInfo.value.phone,
    gender: (userInfo.value as any).gender || 0,
    birthday: (userInfo.value as any).birthday || '',
    address: (userInfo.value as any).address || ''
  }
}

// 修改密码点击处理
const handleChangePasswordClick = () => {
  isChangePasswordMode.value = true
  isEditProfileMode.value = false
  isSettingsMode.value = false
  // 重置密码表单
  passwordChangeRef.value?.resetForm()
}

// 设置点击处理
const handleSettingClick = () => {
  isSettingsMode.value = true
  isEditProfileMode.value = false
  isChangePasswordMode.value = false
  props.onSettingClick?.()
}

// 返回用户中心
const backToUserCenter = () => {
  isSettingsMode.value = false
  isEditProfileMode.value = false
  isChangePasswordMode.value = false
}

// 保存设置
const handleSaveSettings = async () => {
  isSaving.value = true
  try {
    // TODO: 根据实际 API 保存设置
    // 这里可能需要调用不同的 API 来保存通知设置、隐私设置等
    Toast({ message: '设置已保存', type: 'success' })
    isSettingsMode.value = false
  } catch (error) {
    console.error('Failed to save settings:', error)
    Toast({ message: '保存失败，请重试', type: 'error' })
  } finally {
    isSaving.value = false
  }
}

// 保存编辑资料成功回调
const handleProfileUpdateSuccess = (response: any) => {
  // 重新获取用户信息以同步最新数据
  fetchUserInfo()
  isEditProfileMode.value = false
}

// 修改密码成功回调
const handleUserPasswordSuccess = (response: any) => {
  isChangePasswordMode.value = false
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

/**
 * 获取账户信息
 */
const fetchUserInfo = async () => {
  const token = Store.getLocalStorage('Token')
  if (!token) {
    return
  }
  
  isLoadingUserInfo.value = true
  try {
    // 使用 /user/profile 获取账户信息
    //const res: any = await User.GetProfile()
  
  } catch (error) {
    console.error('Failed to fetch user info:', error)
    // 获取失败不影响 Drawer 打开，使用现有数据
  } finally {
    isLoadingUserInfo.value = false
  }
}

// 切换 Drawer 显示状态
const toggleDrawer = async () => {
  const willOpen = !isShowDrawer.value
  
  if (willOpen) {
    // 打开前获取账户信息
    await fetchUserInfo()
  }
  
  isShowDrawer.value = willOpen
  if (!isShowDrawer.value) {
    // 关闭时重置所有模式
    isSettingsMode.value = false
    isEditProfileMode.value = false
    isChangePasswordMode.value = false
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
            (isSettingsMode || isEditProfileMode || isChangePasswordMode) ? 'w-80 flex-shrink-0 ' : 'w-full'
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
          <div v-if="!isLoadingUserInfo" class="flex-1 overflow-y-auto space-y-4">
            <Card shadow rounded>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-base-content/60">账号</span>
                  <span class="text-sm font-medium">{{ (userInfo as any).passport || '未知' }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-base-content/60">部门</span>
                  <span class="text-sm font-medium">{{ userInfo.department }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-base-content/60">电话</span>
                  <span class="text-sm font-medium">{{ userInfo.phone || '未设置' }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-base-content/60">加入日期</span>
                  <span class="text-sm font-medium">{{ userInfo.joinDate || '未知' }}</span>
                </div>
              </div>
            </Card>

            <!-- 快捷操作 -->
            <Card shadow rounded>
              <div class="space-y-2">
                <btn 
                  variant="outline" 
                  class="w-full justify-start"
                  @click="handleEditProfileClick"
                >
                  <icn name="user-edit" light sm class="mr-2"></icn>
                  编辑资料
                </btn>
                <btn 
                  variant="outline" 
                  class="w-full justify-start"
                  @click="handleChangePasswordClick"
                >
                  <icn name="key" light sm class="mr-2"></icn>
                  修改密码
                </btn>
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

        <!-- 编辑资料页面 -->
        <div v-if="isEditProfileMode" class="flex-1 flex flex-col border-l-2 border-l-solid border-base-200">
          <!-- 编辑头部 -->
          <div class="p-4 bg-base-150 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <btn clean @click="backToUserCenter">
                <icn name="arrow-left" light xl class="hover:text-primary"></icn>
              </btn>
              <h2 class="text-lg font-bold">编辑资料</h2>
            </div>
          </div>

          <!-- 编辑内容 -->
          <div class="flex-1 overflow-y-auto p-6 bg-base-250">
            <div class="space-y-6 max-w-4xl mx-auto">
              <Card title="个人资料" shadow rounded>
                <UserEdit
                  ref="profileEditRef"
                  :initial-data="editProfileInitialData"
                  @success="handleProfileUpdateSuccess"
                />
              </Card>
            </div>
          </div>
        </div>

        <!-- 修改密码页面 -->
        <div v-if="isChangePasswordMode" class="flex-1 flex flex-col border-l-2 border-l-solid border-base-200">
          <!-- 修改密码头部 -->
          <div class="p-4 bg-base-150 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <btn clean @click="backToUserCenter">
                <icn name="arrow-left" light xl class="hover:text-primary"></icn>
              </btn>
              <h2 class="text-lg font-bold">修改密码</h2>
            </div>
            <div class="flex items-center gap-2">
              <btn variant="transparent" size="sm" @click="backToUserCenter">
                取消
              </btn>
            </div>
          </div>

          <!-- 修改密码内容 -->
          <div class="flex-1 overflow-y-auto p-6 bg-base-250">
            <div class="space-y-6 max-w-4xl mx-auto">
              <Card title="修改密码" shadow rounded>
                <UserPassword
                  ref="passwordChangeRef"
                  @success="handleUserPasswordSuccess"
                />
              </Card>
            </div>
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
              <btn variant="transparent" size="sm" @click="handleCancelSettings" :disabled="isSaving">
                取消
              </btn>
              <btn color="primary" size="sm" @click="handleSaveSettings" :disabled="isSaving" :loading="isSaving">
                保存
              </btn>
            </div>
          </div>

          <!-- 设置内容 -->
          <div class="flex-1 overflow-y-auto p-6 bg-base-250">
            <div class="space-y-6 max-w-4xl mx-auto">
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

