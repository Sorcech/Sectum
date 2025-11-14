<template>
  <form @submit.prevent="handleSubmit" class="w-full space-y-5">
    <!-- 账号输入框 -->
    <div class="w-full">
      <ipt 
        class="w-full"
        :model-value="account.Passport"
        @update:modelValue="updatePassport"
        @blur="validatePassport"
        type="text" 
        bordered
        color="primary"
        :placeholder="passportPlaceholder"
        :disabled="isLoading"
        :error="passportError"
      />
    </div>
    
    <!-- 密码输入框 -->
    <div class="w-full">
      <ipt 
        class="w-full"
        :model-value="account.Password"
        @update:modelValue="updatePassword"
        @blur="validatePassword"
        type="password"
        right-icon="eye"
        bordered
        color="primary"
        :placeholder="safeT('login.placeholder.password', '请输入密码')"
        :disabled="isLoading"
        :error="passwordError"
      />
    </div>
    
    <!-- 错误信息显示 -->
    <div v-if="errorMessage" class="p-3 text-sm text-center text-error bg-error/10 rounded-md border border-error/20">
      {{ errorMessage }}
    </div>
    
    <!-- 登录按钮 -->
    <div class="pt-2">
      <btn 
        type="submit" 
        color="primary" 
        size="md" 
        class="w-full h-12 text-base font-medium" 
        :disabled="isLoading || !isFormValid" 
        :loading="isLoading"
      >
        {{ isLoading ? safeT('login.loggingIn', '登录中...') : safeT('login.login', '登录') }}
      </btn>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, inject, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { User } from '~/packet/Pattern/User/User'
import { Store } from '~/packet/Config/storage'

interface AccountInfo {
  Passport: string
  Password: string
}

interface Props {
  modelValue?: AccountInfo
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({ Passport: '', Password: '' })
})

const emit = defineEmits<{
  'success': [response: any]
  'error': [error: any]
}>()

// 获取 Toast 实例（如果可用）
const Toast: any = inject('toast', null)

// 路由相关
const route = useRoute()

// 多语言支持
const { t, locale } = useI18n()

// 初始化语言设置（从存储中读取）
onMounted(() => {
  try {
    const storedLocale = Store.getLocalStorage('locale')
    if (storedLocale && typeof storedLocale === 'string') {
      locale.value = storedLocale
    }
  } catch (error) {
    console.warn('Failed to load locale from storage:', error)
  }
})

// 安全的翻译函数，如果翻译失败则返回 key
const safeT = (key: string, fallback?: string): string => {
  try {
    const result = t(key)
    // 如果返回的是 key 本身（翻译不存在），使用 fallback
    if (result === key && fallback) {
      return fallback
    }
    return result
  } catch (error) {
    console.warn(`Translation error for key "${key}":`, error)
    return fallback || key
  }
}

// 内部账户数据
const account = reactive<AccountInfo>({
  Passport: props.modelValue?.Passport || '',
  Password: props.modelValue?.Password || ''
})

const isLoading = ref(false)
const errorMessage = ref('')
const passportError = ref('')
const passwordError = ref('')

// 账号类型枚举
type PassportType = 'account' | 'phone' | 'email' | 'unknown'

/**
 * 检测账号类型
 */
const detectPassportType = (value: string): PassportType => {
  if (!value || value.trim() === '') return 'unknown'
  
  const trimmed = value.trim()
  
  // 检测邮箱
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (emailRegex.test(trimmed)) {
    return 'email'
  }
  
  // 检测手机号（支持11位数字，可能以+86开头）
  const phoneRegex = /^(\+86)?1[3-9]\d{9}$/
  if (phoneRegex.test(trimmed.replace(/\s+/g, ''))) {
    return 'phone'
  }
  
  // 检测账号：
  // 1. 字母开头，允许字母、数字、下划线，4-20位
  // 2. 纯数字账号，4-20位（支持八位十进制数字等）
  const accountRegex = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/
  const numericAccountRegex = /^\d{4,20}$/
  
  if (accountRegex.test(trimmed) || numericAccountRegex.test(trimmed)) {
    return 'account'
  }
  
  return 'unknown'
}

/**
 * 账号类型提示
 */
const passportType = computed<PassportType>(() => detectPassportType(account.Passport))
const passportPlaceholder = computed(() => {
  if (account.Passport) {
    const type = passportType.value
    if (type === 'email') return safeT('login.placeholder.email', 'example@email.com')
    if (type === 'phone') return safeT('login.placeholder.phone', '13800138000')
    if (type === 'account') return safeT('login.placeholder.username', 'username')
  }
  return safeT('login.placeholder.account', '请输入账号、手机号或邮箱')
})
/**
 * 更新 Passport
 */
const updatePassport = (value: string) => {
  account.Passport = value
  errorMessage.value = ''
  // 清空错误后立即验证，确保按钮状态正确
  if (value.trim() !== '') {
    validatePassport()
  } else {
    passportError.value = ''
  }
}

/**
 * 更新 Password
 */
const updatePassword = (value: string) => {
  account.Password = value
  errorMessage.value = ''
  // 清空错误后立即验证，确保按钮状态正确
  if (value.trim() !== '') {
    validatePassword()
  } else {
    passwordError.value = ''
  }
}

/**
 * 验证账号格式
 */
const validatePassport = () => {
  passportError.value = ''
  
  if (!account.Passport || account.Passport.trim() === '') {
    passportError.value = safeT('login.error.accountRequired', '请输入账号、手机号或邮箱')
    return false
  }
  
  const type = detectPassportType(account.Passport)
  if (type === 'unknown') {
    passportError.value = safeT('login.error.accountInvalid', '请输入正确的账号、手机号或邮箱格式')
    return false
  }
  
  return true
}

/**
 * 验证密码格式
 */
const validatePassword = () => {
  passwordError.value = ''
  
  if (!account.Password || account.Password.trim() === '') {
    passwordError.value = safeT('login.error.passwordRequired', '请输入密码')
    return false
  }
  
  // 密码规则：8-20位，至少包含字母和数字
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/
  
  if (!passwordRegex.test(account.Password)) {
    passwordError.value = safeT('login.error.passwordInvalid', '密码需8-20位，至少包含字母和数字')
    return false
  }
  
  return true
}

/**
 * 表单是否有效
 * 实时检查账号和密码的格式是否正确
 */
const isFormValid = computed(() => {
  // 基本检查：账号和密码不为空
  const hasPassport = account.Passport.trim() !== ''
  const hasPassword = account.Password.trim() !== ''
  
  // 如果账号或密码为空，表单无效
  if (!hasPassport || !hasPassword) {
    return false
  }
  
  // 如果有错误信息，表单无效
  if (passportError.value || passwordError.value) {
    return false
  }
  
  // 实时验证格式（不显示错误，只用于判断按钮状态）
  const passportType = detectPassportType(account.Passport)
  if (passportType === 'unknown') {
    return false
  }
  
  // 密码规则：8-20位，至少包含字母和数字
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/
  if (!passwordRegex.test(account.Password)) {
    return false
  }
  
  return true
})

/**
 * 表单验证
 */
const validateForm = (): boolean => {
  errorMessage.value = ''
  
  const passportValid = validatePassport()
  const passwordValid = validatePassword()
  
  if (!passportValid || !passwordValid) {
    return false
  }
  
  return true
}

/**
 * 处理表单提交
 */
const handleSubmit = async () => {
  // 防止重复提交
  if (isLoading.value) {
    return
  }
  
  // 表单验证
  if (!validateForm()) {
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const res: any = await User.Login(account)
    
    // 检查响应数据 - 支持多种可能的响应结构
    let token = null
    let expire = null
    
    // 尝试多种可能的响应结构
    if (res?.data?.data?.Token) {
      token = res.data.data.Token
      expire = res.data.data.Expire
    } else if (res?.data?.Token) {
      token = res.data.Token
      expire = res.data.Expire
    } else if (res?.Token) {
      token = res.Token
      expire = res.Expire
    } else if (res?.data?.token) {
      token = res.data.token
      expire = res.data.expire
    }
    
    // 检查是否有错误消息（即使没有 token）
    if (res?.data?.message && !token) {
      // 有错误消息但没有 token，说明登录失败
      const errorMsg = res.data.message
      errorMessage.value = errorMsg
      if (Toast) {
        Toast.error({ message: errorMsg })
      }
      emit('error', { message: errorMsg, code: res.data.code })
      return
    }
    
    if (token) {
      // 保存 Token 和过期时间
      Store.setLocalStorage('Token', token)
      if (expire) {
        Store.setLocalStorage('Expire', expire)
      }
      
      // 显示成功消息
      if (Toast) {
        Toast.success({ message: safeT('login.success.loginSuccess', '登录成功！') })
      }
      
      // 发出成功事件
      emit('success', res)
      
      // 登录成功，跳转到目标页面
      // 检查是否有重定向参数
      const redirect = route.query.redirect as string
      const targetPath = (redirect && redirect.startsWith('/')) ? redirect : '/console/dashboard'
      
      // 使用 window.location.replace 避免在历史记录中留下登录页
      window.location.replace(targetPath)
    } else {
      // 响应数据格式不正确或没有 token
      // 检查是否有服务器返回的错误消息
      let errorMsg = safeT('login.error.responseError', '服务器响应格式错误')
      
      if (res?.data?.message) {
        // 使用服务器返回的错误消息
        errorMsg = res.data.message
      } else if (res?.data?.code) {
        // 根据错误码显示相应错误
        if (res.data.code === 50) {
          errorMsg = safeT('login.error.accountOrPasswordError', '账号或密码错误')
        }
      }
      
      errorMessage.value = errorMsg
      if (Toast) {
        Toast.error({ message: errorMsg })
      }
      emit('error', { message: errorMsg, code: res?.data?.code })
    }
  } catch (reason: any) {
    // 处理错误
    console.error('Login error:', reason)
    
    // 根据错误类型显示不同的错误信息
    let errorMsg = safeT('login.error.loginFailed', '登录失败，请检查账号和密码')
    if (reason?.response?.data?.message) {
      errorMsg = reason.response.data.message
    } else if (reason?.message) {
      errorMsg = reason.message
    } else if (reason?.response?.status === 401) {
      errorMsg = safeT('login.error.accountOrPasswordError', '账号或密码错误')
    } else if (reason?.response?.status === 403) {
      errorMsg = safeT('login.error.accessDenied', '访问被拒绝')
    } else if (reason?.response?.status >= 500) {
      errorMsg = safeT('login.error.serverError', '服务器错误，请稍后重试')
    } else if (reason?.code === 'ERR_NETWORK' || reason?.message?.includes('Network Error')) {
      errorMsg = safeT('login.error.networkError', '网络连接失败，请检查网络设置')
    }
    
    errorMessage.value = errorMsg
    if (Toast) {
      Toast.error({ message: errorMsg })
    }
    emit('error', reason)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* 调整输入框内部 padding，确保占位符文字右边和边框留出一个字的间隙 */
:deep(input) {
  padding-right: 1em !important;
}
</style>

