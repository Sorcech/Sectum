<template>
  <Select
    ref="selectRef"
    mode="avatar"
    :options="displayOptions"
    :model-value="modelValue"
    @update:modelValue="handleUpdateModelValue"
    @select="handleSelect"
    @selectIndex="handleSelectIndex"
    :direction="direction"
    :placeholder="placeholder"
    :label="label"
    :label-width="labelWidth"
    :input-width="inputWidth"
    :full-width="fullWidth"
    :disabled="disabled"
    :size="size"
    :avatar-size="avatarSize"
    :field-value="fieldValue"
    :icon-mode="iconMode"
    :show-placeholder="showPlaceholder"
    :trigger-width="triggerWidth"
    :menu-width="menuWidth"
    :menu-can-exceed-trigger="menuCanExceedTrigger"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Select } from 'sectum'
import { Account } from '~/store/account/account'
import type { AvatarOption } from 'sectum'


// 后端返回的用户数据接口
interface BackendUserData {
  Name?: string
  AccountId?: number
  Phone?: string
  Gender?: string
  Birthday?: string
  Detail?: string
  [key: string]: any
}

const props = withDefaults(defineProps<{
  direction?: string
  users?: AvatarOption[]
  placeholder?: string
  label?: string
  labelWidth?: string
  inputWidth?: string
  fullWidth?: boolean
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  modelValue?: string | number | null
  fieldValue?: string
  iconMode?: string
  showPlaceholder?: boolean
  triggerWidth?: string
  menuWidth?: string
  menuCanExceedTrigger?: boolean
  autoLoad?: boolean
}>(), {
  size: 'md',
  avatarSize: 'sm',
  iconMode: 'light',
  disabled: false,
  fieldValue: 'id',
  showPlaceholder: true,
  menuCanExceedTrigger: false,
  labelWidth: 'w-1/3',
  fullWidth: false,
  autoLoad: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null | undefined]
  select: [user: AvatarOption]
  selectIndex: [index: number]
}>()

// ==================== 响应式数据 ====================

const selectRef = ref<InstanceType<typeof Select> | null>(null)
const internalUsers = ref<AvatarOption[]>([])
const isLoadingUsers = ref(false)

// ==================== 工具函数 ====================

// 转换后端数据格式到 AvatarOption 格式
function convertBackendDataToAvatarOption(backendData: BackendUserData[]): AvatarOption[] {
  return backendData
    .filter(item => item.Name && item.Name.trim() !== '') // 过滤掉 Name 为空的项
    .map(item => ({
      id: item.AccountId,
      value: item.AccountId,
      name: item.Name,
      text: item.Name,
      label: item.Name,
      phone: item.Phone,
      gender: item.Gender,
      birthday: item.Birthday,
      detail: item.Detail,
      // 可以添加其他字段
      ...item
    }))
}

// 加载用户列表
async function loadUsers(): Promise<void> {
  if (isLoadingUsers.value) return
  
  isLoadingUsers.value = true
  try {
    const response: any = await Account.List()
    
    // 解析响应数据
    let userData: BackendUserData[] = []
    if (response?.data?.data && Array.isArray(response.data.data)) {
      userData = response.data.data
    } else if (response?.data && Array.isArray(response.data)) {
      userData = response.data
    } else if (Array.isArray(response)) {
      userData = response
    }
    
    // 转换数据格式并过滤
    internalUsers.value = convertBackendDataToAvatarOption(userData)
  } catch (error) {
    console.error('加载用户列表失败:', error)
    internalUsers.value = []
  } finally {
    isLoadingUsers.value = false
  }
}

// 计算最终使用的用户列表
const displayOptions = computed<AvatarOption[]>(() => {
  // 如果启用了自动加载，优先使用内部加载的用户列表（从服务器获取的最新数据）
  if (props.autoLoad && internalUsers.value.length > 0) {
    return internalUsers.value
  }
  // 如果传入了 users prop，使用传入的数据
  if (props.users && props.users.length > 0) {
    return props.users
  }
  // 否则使用内部加载的用户列表
  return internalUsers.value
})

// ==================== 事件处理 ====================

const handleUpdateModelValue = (value: string | number | null | undefined) => {
  emit('update:modelValue', value)
}

const handleSelect = (user: AvatarOption) => {
  emit('select', user)
}

const handleSelectIndex = (index: number) => {
  emit('selectIndex', index)
}

// ==================== 监听器 ====================

watch(() => props.users, () => {
  // 当 users prop 变化时，Select 组件会自动响应
}, { deep: true })

// ==================== 生命周期 ====================

onMounted(async () => {
  // 如果启用了自动加载，则自动加载用户列表（无论是否传入了 users prop）
  // 这样可以确保总是从服务器获取最新的用户列表
  if (props.autoLoad) {
    await loadUsers()
  }
})

// 暴露方法供外部调用
defineExpose({
  loadUsers,
  refreshUsers: loadUsers
})
</script>
