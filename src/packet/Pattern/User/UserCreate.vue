<template>
  <form @submit.prevent="handleSubmit" class="space-y-4" novalidate>
    <!-- 姓名 -->
    <div>
      <ipt 
        v-model="accountForm.name" 
        label="姓名"
        placeholder="输入姓名" 
        class="w-full"
        direction="col"
      />
    </div>

    <!-- 手机号 -->
    <div>
      <ipt 
        v-model="accountForm.phone" 
        label="手机号 *"
        placeholder="请输入手机号" 
        class="w-full"
        direction="col"
        validate="phone"
        :error="errors.phone"
        @blur="validatePhone"
      />
    </div>

    <!-- 邮箱 -->
    <div>
      <ipt 
        v-model="accountForm.email" 
        type="email"
        label="邮箱"
        placeholder="输入邮箱" 
        class="w-full"
        direction="col"
        validate="email"
        :error="errors.email"
        @blur="validateEmail"
      />
    </div>

    <!-- 密码 -->
    <div>
      <ipt 
        :model-value="accountForm.password"
        @update:modelValue="updatePassword"
        @blur="validatePassword"
        type="password"
        right-icon="eye"
        label="密码 *"
        placeholder="请输入密码（8-20位，至少包含字母和数字）" 
        class="w-full"
        direction="col"
        validate="password"
        :error="errors.password"
      />
    </div>

    <!-- 性别 -->
    <div>
      <Select
        v-model="accountForm.gender"
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
        :modelValue="accountForm.birthday || undefined"
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
        v-model="accountForm.address" 
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
      创建账户
    </btn>
  </form>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue';
import Toast from '~/packet/Element/Toast/Toast';
import Select from '~/packet/Section/Select/Select.vue';
import Date from '~/packet/Section/Date/Date.vue';
//import { User } from './User';

// Props 定义
const props = defineProps<{
  onSubmit?: (formData: any) => void | Promise<void>
  onSuccess?: (response: any) => void
  onError?: (error: any, response?: any) => void
}>()

// 性别选项
const genderOptions = [
  { label: '男', value: 0 },
  { label: '女', value: 1 }
]

// 账户创建表单
const accountForm = reactive({
  password: '',
  name: '',
  phone: '',
  email: '',
  gender: 0,
  birthday: '',
  address: ''
})

// 错误信息
const errors = reactive({
  password: '',
  phone: '',
  email: ''
})

const isSubmitting = ref(false)

// 处理生日变化
// Date.vue 组件在 format="YYYY-MM-DD" 时会返回 Date 对象，这里转换为 RFC3339 格式
const handleBirthdayChange = (value: string | Date | null) => {
  if (!value) {
    accountForm.birthday = ''
    return
  }
  
  try {
    // Date.vue 返回的 value 应该是 Date 对象（当 format="YYYY-MM-DD" 时）
    const dateObj = value instanceof globalThis.Date 
      ? value 
      : new globalThis.Date(value as string)
    
    // 转换为 RFC3339 格式（ISO8601）
    if (!isNaN(dateObj.getTime())) {
      accountForm.birthday = dateObj.toISOString()
    } else {
      accountForm.birthday = ''
    }
  } catch (error) {
    console.warn('Failed to handle birthday change:', error)
    accountForm.birthday = ''
  }
}

/**
 * 更新密码
 */
const updatePassword = (value: string) => {
  accountForm.password = value
  // 清空错误后立即验证，确保按钮状态正确
  if (value.trim() !== '') {
    validatePassword()
  } else {
    errors.password = ''
  }
}

// 监听手机号变化，清除必填错误（格式验证由 ipt 组件处理）
watch(() => accountForm.phone, (newValue) => {
  const value = newValue?.trim() || ''
  if (value) {
    // 格式验证由 ipt 组件的 validate="phone" 自动处理
    // 这里只清除必填错误
    if (errors.phone === '请输入手机号') {
      errors.phone = ''
    }
  } else {
    // 清空时清除错误
    errors.phone = ''
  }
})

// 监听邮箱变化（格式验证由 ipt 组件处理）
watch(() => accountForm.email, () => {
  // 格式验证由 ipt 组件的 validate="email" 自动处理
  // 邮箱是可选的，不需要额外处理
})

// 验证密码（只验证必填，格式验证由 ipt 组件处理）
const validatePassword = (): boolean => {
  errors.password = ''
  
  if (!accountForm.password || accountForm.password.trim() === '') {
    errors.password = '请输入密码'
    return false
  }
  
  // 格式验证由 ipt 组件的 validate="password" 自动处理
  return true
}

// 验证手机号（只验证必填，格式验证由 ipt 组件处理）
const validatePhone = (): boolean => {
  errors.phone = ''
  
  if (!accountForm.phone || accountForm.phone.trim() === '') {
    errors.phone = '请输入手机号'
    return false
  }
  
  // 格式验证由 ipt 组件的 validate="phone" 自动处理
  return true
}

// 验证邮箱（只验证格式，邮箱是可选的，格式验证由 ipt 组件处理）
const validateEmail = (): boolean => {
  errors.email = ''
  
  // 邮箱是可选的，如果填写了，格式验证由 ipt 组件的 validate="email" 自动处理
  return true
}

// 表单是否有效
const isFormValid = computed(() => {
  // 必填字段：phone 和 password
  const phone = (accountForm.phone || '').trim()
  const password = (accountForm.password || '').trim()
  
  // 检查必填字段
  if (!phone || !password) {
    return false
  }
  
  // 检查是否有错误（格式验证由 ipt 组件处理，错误信息会自动显示）
  if (errors.password || errors.phone || errors.email) {
    return false
  }
  
  // 实时验证格式（用于按钮状态，格式验证由 ipt 组件处理）
  // 密码格式：8-20位，至少包含字母和数字
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/
  if (!passwordRegex.test(password)) {
    return false
  }
  
  // 手机号格式：11位数字，以1开头，第二位是3-9
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(phone)) {
    return false
  }
  
  // 如果填写了邮箱，验证格式
  const email = (accountForm.email || '').trim()
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return false
    }
  }
  
  return true
})

const handleSubmit = async () => {
  // 验证所有字段
  const passwordValid = validatePassword()
  const phoneValid = validatePhone()
  const emailValid = validateEmail()
  
  if (!passwordValid || !phoneValid || !emailValid) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // 准备提交数据
    const submitData: any = {
      phone: accountForm.phone,
      password: accountForm.password,
      gender: accountForm.gender
    }
    
    // 可选字段
    if (accountForm.name && accountForm.name.trim()) {
      submitData.name = accountForm.name.trim()
    }
    if (accountForm.email && accountForm.email.trim()) {
      submitData.email = accountForm.email.trim()
    }
    if (accountForm.address && accountForm.address.trim()) {
      submitData.address = accountForm.address.trim()
    }
    
    // 处理生日字段
    // handleBirthdayChange 已经将日期转换为 RFC3339 格式，直接使用即可
    if (accountForm.birthday && accountForm.birthday.trim() !== '') {
      submitData.birthday = accountForm.birthday
    }
    
    // 调用父组件传入的提交回调，或直接调用 API
    if (props.onSubmit) {
      const response = await props.onSubmit(submitData)
      // 如果成功，调用成功回调并重置表单
      if (props.onSuccess) {
        props.onSuccess(response)
      }
      // 重置表单
      resetForm()
    } else {
      // 直接调用注册 API
      //const response: any = await User.Register(submitData)
    }
  } catch (error: any) {
    // 调用父组件传入的错误回调
    if (props.onError) {
      props.onError(error, error.response || error)
    } else {
      // 默认错误处理
      const errorMessage = error?.response?.data?.message || error?.data?.message || error?.message || '账户注册失败，请重试'
      Toast({ type: 'error', message: errorMessage })
    }
  } finally {
    isSubmitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  accountForm.password = ''
  accountForm.name = ''
  accountForm.phone = ''
  accountForm.email = ''
  accountForm.gender = 0
  accountForm.birthday = ''
  accountForm.address = ''
  
  errors.password = ''
  errors.phone = ''
  errors.email = ''
}
</script>
