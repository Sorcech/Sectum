<template>
  <form @submit.prevent="handleSubmit" class="space-y-4" novalidate>
    <!-- 姓名 -->
    <div>
      <ipt 
        v-model="profileForm.name" 
        label="姓名 *"
        placeholder="输入姓名" 
        class="w-full"
        direction="col"
        :error="errors.name"
      />
    </div>

    <!-- 手机号 -->
    <div>
      <ipt 
        v-model="profileForm.phone" 
        label="手机号"
        placeholder="请输入手机号" 
        class="w-full"
        direction="col"
        validate="phone"
        :error="errors.phone"
      />
    </div>

    <!-- 邮箱 -->
    <div>
      <ipt 
        v-model="profileForm.email" 
        type="email"
        label="邮箱"
        placeholder="输入邮箱" 
        class="w-full"
        direction="col"
        validate="email"
        :error="errors.email"
      />
    </div>

    <!-- 性别 -->
    <div>
      <Select
        v-model="profileForm.gender"
        :options="genderOptions"
        label="性别"
        placeholder="请选择性别"
        field-label="label"
        field-value="value"
        custom-class="w-full"
      />
    </div>

    <!-- 生日 -->
    <div>
      <Date
        :modelValue="profileForm.birthday || undefined"
        @update:modelValue="handleBirthdayChange"
        label="生日"
        placeholder="请选择生日"
        format="YYYY-MM-DD"
        custom-class="w-full"
      />
    </div>

    <!-- 地址 -->
    <div>
      <ipt 
        v-model="profileForm.address" 
        label="地址"
        placeholder="输入地址" 
        class="w-full"
        direction="col"
      />
    </div>

    <!-- 提交按钮 -->
    <btn 
      type="submit"
      color="primary" 
      class="w-full" 
      :disabled="isSubmitting || !isFormValid" 
      :loading="isSubmitting"
    >
      <icn name="check" light sm class="mr-2"></icn>
      保存
    </btn>
  </form>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue';
import Toast from '~/packet/Element/Toast/Toast';
import Select from '~/packet/Section/Select/Select.vue';
import Date from '~/packet/Section/DatePicker/DatePicker.vue';
//import { User } from './User';

// Props 定义
const props = defineProps<{
  initialData?: {
    name?: string
    phone?: string
    email?: string
    gender?: number
    birthday?: string | null
    address?: string
  }
  onSubmit?: (formData: any) => void | Promise<void>
  onSuccess?: (response: any) => void
  onError?: (error: any, response?: any) => void
}>()

// Emits 定义
const emit = defineEmits<{
  success: [response: any]
  error: [error: any, response?: any]
}>()

// 性别选项
const genderOptions = [
  { label: '男', value: 0 },
  { label: '女', value: 1 }
]

// 编辑资料表单
const profileForm = reactive({
  name: '',
  phone: '',
  email: '',
  gender: 0,
  birthday: '',
  address: ''
})

// 错误信息
const errors = reactive({
  name: '',
  phone: '',
  email: ''
})

const isSubmitting = ref(false)

// 监听初始数据变化，更新表单
watch(() => props.initialData, (newData) => {
  if (newData) {
    profileForm.name = newData.name || ''
    profileForm.phone = newData.phone || ''
    profileForm.email = newData.email || ''
    profileForm.gender = newData.gender ?? 0
    profileForm.birthday = newData.birthday || ''
    profileForm.address = newData.address || ''
  }
}, { immediate: true, deep: true })

// 处理生日变化
// 将日期转换为 RFC3339 (ISO8601) 格式，例如: "1990-01-01T00:00:00Z" 或 "1990-01-01T00:00:00+08:00"
const handleBirthdayChange = (value: string | Date | null) => {
  if (!value) {
    profileForm.birthday = ''
    return
  }
  
  try {
    let dateObj: globalThis.Date | null = null
    
    if (typeof value === 'string') {
      // 如果已经是字符串格式，尝试解析为 Date 对象
      // 支持 YYYY-MM-DD 格式或 RFC3339 格式
      dateObj = new globalThis.Date(value)
      if (isNaN(dateObj.getTime())) {
        // 如果解析失败，尝试 YYYY-MM-DD 格式
        const parts = value.split('-')
        if (parts.length === 3) {
          dateObj = new globalThis.Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
        }
      }
    } else if (value instanceof globalThis.Date) {
      // 如果已经是 Date 对象，直接使用
      dateObj = value
    } else {
      // 其他情况，尝试转换为 Date
      dateObj = new globalThis.Date(String(value))
    }
    
    // 转换为 RFC3339 格式（ISO8601）
    if (dateObj && !isNaN(dateObj.getTime())) {
      // 使用 toISOString() 生成 UTC 格式: "1990-01-01T00:00:00.000Z"
      profileForm.birthday = dateObj.toISOString()
    } else {
      profileForm.birthday = ''
    }
  } catch (error) {
    console.warn('Failed to handle birthday change:', error)
    profileForm.birthday = ''
  }
}

// 验证姓名
const validateName = (): boolean => {
  errors.name = ''
  
  if (!profileForm.name || profileForm.name.trim() === '') {
    errors.name = '请输入姓名'
    return false
  }
  
  return true
}

// 验证手机号（格式验证由 ipt 组件处理）
const validatePhone = (): boolean => {
  errors.phone = ''
  // 格式验证由 ipt 组件的 validate="phone" 自动处理
  return true
}

// 验证邮箱（格式验证由 ipt 组件处理）
const validateEmail = (): boolean => {
  errors.email = ''
  // 格式验证由 ipt 组件的 validate="email" 自动处理
  return true
}

// 表单是否有效
const isFormValid = computed(() => {
  // 必填字段：name
  if (!profileForm.name || profileForm.name.trim() === '') {
    return false
  }
  
  // 检查是否有错误（格式验证由 ipt 组件处理，错误信息会自动显示）
  if (errors.name || errors.phone || errors.email) {
    return false
  }
  
  // 如果填写了手机号，验证格式（用于按钮状态，格式验证由 ipt 组件处理）
  if (profileForm.phone && !/^1[3-9]\d{9}$/.test(profileForm.phone)) {
    return false
  }
  
  // 如果填写了邮箱，验证格式（用于按钮状态，格式验证由 ipt 组件处理）
  if (profileForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
    return false
  }
  
  return true
})

const handleSubmit = async () => {
  // 验证所有字段
  const nameValid = validateName()
  const phoneValid = validatePhone()
  const emailValid = validateEmail()
  
  if (!nameValid || !phoneValid || !emailValid) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // 准备提交数据
    const submitData: any = {
      name: profileForm.name.trim(),
      phone: profileForm.phone.trim() || '',
      email: profileForm.email.trim() || '',
      gender: profileForm.gender,
      address: profileForm.address.trim() || ''
    }
    
    // 处理生日字段
    // handleBirthdayChange 已经将日期转换为 RFC3339 格式，直接使用即可
    // 后端期望的是 *time.Time 类型（指针），如果为空则传 null
    if (profileForm.birthday && profileForm.birthday.trim() !== '') {
      submitData.birthday = profileForm.birthday
    } else {
      // 如果生日为空，传 null（后端 *time.Time 指针类型）
      submitData.birthday = null
    }
    
    // 调用父组件传入的提交回调，或直接调用 API
    if (props.onSubmit) {
      const response = await props.onSubmit(submitData)
      // 如果成功，调用成功回调和事件
      if (props.onSuccess) {
        props.onSuccess(response)
      }
      emit('success', response)
    } else {
      // 直接调用更新资料 API
      //const response: any = await User.UpdateProfile(submitData)
    }
  } catch (error: any) {
    // 调用父组件传入的错误回调和事件
    if (props.onError) {
      props.onError(error, error.response || error)
    } else {
      // 默认错误处理
      const errorMessage = error?.response?.data?.message || error?.data?.message || error?.message || '更新失败，请重试'
      Toast({ type: 'error', message: errorMessage })
    }
    emit('error', error, error.response || error)
  } finally {
    isSubmitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  if (props.initialData) {
    profileForm.name = props.initialData.name || ''
    profileForm.phone = props.initialData.phone || ''
    profileForm.email = props.initialData.email || ''
    profileForm.gender = props.initialData.gender ?? 0
    profileForm.birthday = props.initialData.birthday || ''
    profileForm.address = props.initialData.address || ''
  } else {
    profileForm.name = ''
    profileForm.phone = ''
    profileForm.email = ''
    profileForm.gender = 0
    profileForm.birthday = ''
    profileForm.address = ''
  }
  
  errors.name = ''
  errors.phone = ''
  errors.email = ''
}

// 暴露方法供父组件调用
defineExpose({
  resetForm
})
</script>

