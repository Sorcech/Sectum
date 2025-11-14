<template>
  <form @submit.prevent="handleSubmit" class="space-y-4" novalidate>
    <!-- 原密码 -->
    <div>
      <ipt 
        v-model="passwordForm.oldPassword" 
        type="password"
        right-icon="eye"
        label="原密码 *"
        placeholder="请输入原密码" 
        class="w-full"
        direction="col"
        :error="errors.oldPassword"
      />
    </div>

    <!-- 新密码 -->
    <div>
      <ipt 
        v-model="passwordForm.newPassword" 
        type="password"
        right-icon="eye"
        label="新密码 *"
        placeholder="请输入新密码（8-20位，至少包含字母和数字）" 
        class="w-full"
        direction="col"
        validate="password"
        :error="errors.newPassword"
      />
    </div>

    <!-- 确认新密码 -->
    <div>
      <ipt 
        v-model="passwordForm.confirmPassword" 
        type="password"
        right-icon="eye"
        label="确认新密码 *"
        placeholder="请再次输入新密码" 
        class="w-full"
        direction="col"
        :error="errors.confirmPassword"
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
import { ref, reactive, computed } from 'vue';
import Toast from '~/packet/Element/Toast/Toast'
//import { Store } from '../../Config/storage';
//import { User } from './User';

// Props 定义
const props = defineProps<{
  onSubmit?: (formData: any) => void | Promise<void>
  onSuccess?: (response: any) => void
  onError?: (error: any, response?: any) => void
}>()

// Emits 定义
const emit = defineEmits<{
  success: [response: any]
  error: [error: any, response?: any]
}>()

// 修改密码表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 错误信息
const errors = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isSubmitting = ref(false)

// 验证原密码
const validateOldPassword = (): boolean => {
  errors.oldPassword = ''
  
  if (!passwordForm.oldPassword || passwordForm.oldPassword.trim() === '') {
    errors.oldPassword = '请输入原密码'
    return false
  }
  
  return true
}

// 验证新密码（只验证必填，格式验证由 ipt 组件处理）
const validateNewPassword = (): boolean => {
  errors.newPassword = ''
  
  if (!passwordForm.newPassword || passwordForm.newPassword.trim() === '') {
    errors.newPassword = '请输入新密码'
    return false
  }
  
  // 格式验证由 ipt 组件的 validate="password" 自动处理
  return true
}

// 验证确认密码
const validateConfirmPassword = (): boolean => {
  errors.confirmPassword = ''
  
  if (!passwordForm.confirmPassword || passwordForm.confirmPassword.trim() === '') {
    errors.confirmPassword = '请确认新密码'
    return false
  }
  
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    errors.confirmPassword = '两次输入的密码不一致'
    return false
  }
  
  return true
}

// 表单是否有效
const isFormValid = computed(() => {
  // 必填字段检查
  if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
    return false
  }
  
  // 检查是否有错误
  if (errors.oldPassword || errors.newPassword || errors.confirmPassword) {
    return false
  }
  
  // 验证密码格式（用于按钮状态，格式验证由 ipt 组件处理）
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/
  if (!passwordRegex.test(passwordForm.newPassword)) {
    return false
  }
  
  // 验证密码一致性
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    return false
  }
  
  return true
})

const handleSubmit = async () => {
  // 验证所有字段
  const oldPasswordValid = validateOldPassword()
  const newPasswordValid = validateNewPassword()
  const confirmPasswordValid = validateConfirmPassword()
  
  if (!oldPasswordValid || !newPasswordValid || !confirmPasswordValid) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // 准备提交数据（根据后端接口定义）
    const submitData = {
      OldPassword: passwordForm.oldPassword.trim(),
      NewPassword: passwordForm.newPassword.trim()
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
      // 直接调用修改密码 API
      //const response: any = await User.ChangePassword(submitData)
      
      // 检查响应
      // 后端返回格式：{ code: 0, data: { Token: "...", Expire: "..." }, message: "success" }
    }
  } catch (error: any) {
    // 调用父组件传入的错误回调和事件
    if (props.onError) {
      props.onError(error, error.response || error)
    } else {
      // 默认错误处理
      const errorMessage = error?.response?.data?.message || error?.data?.message || error?.message || '修改失败，请重试'
      Toast({ type: 'error', message: errorMessage })
    }
    emit('error', error, error.response || error)
  } finally {
    isSubmitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  passwordForm.oldPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  
  errors.oldPassword = ''
  errors.newPassword = ''
  errors.confirmPassword = ''
}

// 暴露方法供父组件调用
defineExpose({
  resetForm
})
</script>

