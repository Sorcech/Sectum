<script lang="ts" setup>
import { ref, computed, useAttrs, nextTick, watch, onMounted } from 'vue'
// @ts-ignore - Vue script setup auto-exports
import icn from '../Icon/Icon.vue'

const props = defineProps({
  modelValue: { type: [String, Number], required: false },
  direction: { type: String, default: 'row', required: false },
  label: { type: String, required: false },
  labelWidth: { type: String, default: 'w-1/3', required: false },
  inputWidth: { type: String, required: false },
  fullWidth: { type: Boolean, default: false, required: false },
  placeholder: { type: String, required: false },
  type: { type: String, default: 'text', required: false },
  name: { type: String, required: false },
  disabled: { type: Boolean, default: false, required: false },
  size: {
    type: String, default: 'md', required: false,
    validator: (value: string) => { return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value) }
  },
  bordered: { type: Boolean, default: true, required: false },
  ghost: { type: Boolean, default: false, required: false },
  color: {
    type: String, default: 'default', required: false,
    validator: (value: string) => { return ['default', 'primary', 'secondary', 'success', 'error', 'warning'].includes(value) }
  },
  error: { type: String, required: false },
  pills: { type: Boolean, default: false, required: false },
  circle: { type: Boolean, default: false, required: false },
  clean: { type: Boolean, default: false, required: false },
  loading: { type: Boolean, default: false, required: false },
  // 图标属性
  leftIcon: { type: String, required: false },
  leftIconStyle: {
    type: String,
    default: 'light',
    required: false,
    validator: (value: string) => ['solid', 'regular', 'light', 'thin', 'brand'].includes(value)
  },
  rightIcon: { type: String, required: false },
  rightIconStyle: {
    type: String,
    default: 'light',
    required: false,
    validator: (value: string) => ['solid', 'regular', 'light', 'thin', 'brand'].includes(value)
  },
  // 响应式尺寸
  sm: { type: String, required: false },
  md: { type: String, required: false },
  lg: { type: String, required: false },
  xl: { type: String, required: false },
  // 格式验证
  validate: {
    type: String,
    required: false,
    validator: (value: string) => !value || ['phone', 'email', 'password'].includes(value)
  },
  // 是否在输入时自动验证（默认 true）
  autoValidate: { type: Boolean, default: true, required: false }
})

// 获取外部传入的 class
const attrs = useAttrs()

const inputText = ref<HTMLInputElement | null>(null)
const internalError = ref('') // 内部验证错误
const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'clear', 'validate'])

// 密码可见性状态
const passwordVisible = ref(false)

// 当前 input 的值（用于跟踪没有 v-model 的情况）
const currentInputValue = ref('')

const input = (e: any) => {
  const value = e.target.value
  currentInputValue.value = value
  emit('update:modelValue', value)
  
  // 如果启用了自动验证，在输入时进行验证
  if (props.autoValidate && props.validate) {
    validateFormat(value)
  }
}

// 处理失焦事件
const handleBlur = (event: FocusEvent) => {
  if (props.validate && props.autoValidate) {
    validateFormat(props.modelValue)
  }
  emit('blur', event)
}

// 处理聚焦事件
const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// 判断右侧图标是否是清除图标
const isClearIcon = computed(() => {
  const clearIcons = ['xmark', 'times', 'close', 'x', 'remove']
  return props.rightIcon && clearIcons.includes(props.rightIcon.toLowerCase())
})

// 判断是否是密码输入框且右侧图标是 eye
const isPasswordToggle = computed(() => {
  return props.type === 'password' && props.rightIcon && props.rightIcon.toLowerCase() === 'eye'
})

// 判断 input 是否为空
// 需要同时检查 modelValue 和 currentInputValue，因为可能没有使用 v-model
const isEmpty = computed(() => {
  const modelValue = props.modelValue || ''
  const inputValue = currentInputValue.value || ''
  const value = String(modelValue || inputValue).trim()
  return value.length === 0
})

// 当前显示的图标名称（密码切换时动态变化）
const currentRightIcon = computed(() => {
  if (isPasswordToggle.value) {
    const icon = passwordVisible.value ? 'eye-slash' : 'eye'
    return icon
  }
  return props.rightIcon
})

// 当前 input 的 type（密码切换时动态变化）
const currentInputType = computed(() => {
  if (isPasswordToggle.value) {
    return passwordVisible.value ? 'text' : 'password'
  }
  return props.type
})

// 切换密码可见性
const togglePasswordVisibility = (event?: Event) => {
  if (props.disabled || props.loading || isEmpty.value) return
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  
  try {
    // 保存当前输入框的值
    const currentValue = String(inputText.value?.value || props.modelValue || '')
    
    // 切换可见性
    passwordVisible.value = !passwordVisible.value
    
    // 延迟更新，避免在 Markdown 环境中 DOM 操作错误
    nextTick(() => {
      try {
        if (inputText.value && inputText.value.isConnected) {
          // 恢复输入框的值
          inputText.value.value = currentValue
          // 如果值改变了，触发 input 事件更新 v-model
          if (currentValue !== String(props.modelValue || '')) {
            input({ target: inputText.value } as any)
          }
          // 聚焦到输入框
          inputText.value.focus()
        }
      } catch (error) {
        // 静默处理错误，避免在 Markdown 环境中报错
        console.warn('Password toggle focus error:', error)
      }
    })
  } catch (error) {
    // 静默处理错误，避免在 Markdown 环境中报错
    console.warn('Password toggle error:', error)
  }
}

// 清除输入框内容
const clearInput = (event?: Event) => {
  if (props.disabled || props.loading || isEmpty.value) return
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  
  // 直接设置 input 元素的值（即使没有 v-model 也能工作）
  if (inputText.value) {
    inputText.value.value = ''
    // 通过 input 方法触发更新，确保 v-model 也能更新
    input({ target: inputText.value } as any)
  }
  
  emit('update:modelValue', '')
  emit('clear')
  currentInputValue.value = ''
  
  // 聚焦到输入框
  nextTick(() => {
    inputText.value?.focus()
  })
}

// 初始化 currentInputValue
onMounted(() => {
  if (inputText.value) {
    currentInputValue.value = inputText.value.value || String(props.modelValue || '')
  }
})

// 监听 modelValue 变化，同步到 currentInputValue
watch(() => props.modelValue, (newValue) => {
  const value = String(newValue || '')
  currentInputValue.value = value
  if (inputText.value && inputText.value.value !== value) {
    inputText.value.value = value
  }
})

// 获取外部传入的 class（用于容器和 input）
const getExternalClass = () => {
  return typeof attrs.class === 'string' 
    ? attrs.class 
    : Array.isArray(attrs.class) 
      ? attrs.class.join(' ')
      : ''
}

// 图标尺寸映射
const iconSizeProps = computed(() => {
  const sizeMap: Record<string, { xs?: boolean, sm?: boolean, lg?: boolean, xl?: boolean }> = {
    xs: { xs: true },
    sm: { sm: true },
    md: {}, // 默认尺寸，不设置任何尺寸属性
    lg: { lg: true },
    xl: { xl: true }
  }
  return sizeMap[props.size] || {}
})

// 左侧图标样式属性
const leftIconStyleProps = computed(() => {
  const style = props.leftIconStyle || 'light'
  return {
    solid: style === 'solid',
    regular: style === 'regular',
    light: style === 'light',
    thin: style === 'thin',
    brand: style === 'brand'
  }
})

// 右侧图标样式属性
const rightIconStyleProps = computed(() => {
  const style = props.rightIconStyle || 'light'
  return {
    solid: style === 'solid',
    regular: style === 'regular',
    light: style === 'light',
    thin: style === 'thin',
    brand: style === 'brand'
  }
})

// 基础输入框样式
const baseClasses = computed(() => {
  if (props.clean) {
    return 'bg-transparent border-none p-0 m-0 font-inherit text-inherit w-full'
  }
  
  const externalClass = getExternalClass()
  const classes = [
    'bg-base-100 transition-all duration-200 ease-in-out',
    'min-w-0', // 防止溢出，移除 flex-shrink-0 以支持外部 flex 设置
    // 圆角
    props.pills ? 'rounded-full' : 
    props.circle ? 'rounded-full' : 'rounded-$rounded-btn'
  ]
  
  // 根据图标位置调整 padding
  if (props.leftIcon && props.rightIcon) {
    classes.push('pl-8 pr-8') // 左右都有图标
  } else if (props.leftIcon) {
    classes.push('pl-8 pr-2') // 只有左边图标
  } else if (props.rightIcon) {
    classes.push('pl-2 pr-8') // 只有右边图标
  } else {
    classes.push('px-2') // 没有图标，使用默认 padding
  }
  
  // 如果设置了 fullWidth，确保 input 占据全宽
  if (props.fullWidth) {
    classes.push('w-full')
  } else if (!props.label && externalClass && externalClass.includes('flex-1')) {
    // 如果没有 label 且外部传入了 flex-1，确保 input 也占据全宽
    classes.push('w-full')
  } else if (props.label && props.direction === 'row') {
    // 如果有 label 且是 row 布局，input 也应该占据全宽（在 flex-1 容器内）
    classes.push('w-full')
  }
  
  return classes.filter(Boolean).join(' ')
})

// 输入框包装容器样式
const inputWrapperClasses = computed(() => {
  const classes = [
    'relative',
    'flex items-center'
  ]
  
  // 如果设置了 fullWidth，强制使用 w-full
  if (props.fullWidth) {
    classes.push('w-full')
  } else if (props.inputWidth) {
    // 如果指定了 inputWidth，使用指定的宽度
    classes.push(props.inputWidth)
  } else if (props.label && props.direction === 'row') {
    // 如果有 label 且是 row 布局，input 占据剩余空间
    classes.push('flex-1', 'min-w-0')
  } else {
    // 默认情况下，input 占据全宽
    classes.push('w-full')
  }
  
  return classes.filter(Boolean).join(' ')
})

// 统一的尺寸样式定义
const sizes = {
  xs: 'h-6  texlt-xs',
  sm: 'h-8  text-sm',
  md: 'h-10  text-sm',
  lg: 'h-12  text-base',
  xl: 'h-14  text-xl'
}

// 尺寸样式
const sizeClasses = computed(() => {
  if (props.clean) return ''
  return sizes[props.size as keyof typeof sizes] || sizes.md
})

// 颜色和变体样式
const colorVariantClasses = computed(() => {
  if (props.clean) return ''
  
  const variants = {
    // default: 默认透明边框（保持大小不变），聚焦时显示边框（不受 bordered 影响）
    default: () => 'border border-transparent focus:border-base-250 focus:outline-2 focus:outline-base-250 focus:outline-offset-2',
    // 其他颜色: 一直显示边框，聚焦时显示外围边框（需要 bordered 为 true）
    primary: () => props.bordered ? 'border border-primary focus:outline-2 focus:outline-primary focus:outline-offset-2' : '',
    secondary: () => props.bordered ? 'border border-secondary focus:outline-2 focus:outline-secondary focus:outline-offset-2' : '',
    success: () => props.bordered ? 'border border-success focus:outline-2 focus:outline-success focus:outline-offset-2' : '',
    error: () => props.bordered ? 'border border-error focus:outline-2 focus:outline-error focus:outline-offset-2' : '',
    warning: () => props.bordered ? 'border border-warning focus:outline-2 focus:outline-warning focus:outline-offset-2' : ''
  }
  
  const variantFn = variants[props.color as keyof typeof variants]
  return variantFn ? variantFn() : ''
})

// 格式验证函数
const validateFormat = (value: string | number | null | undefined) => {
  if (!props.validate) {
    internalError.value = ''
    return true
  }
  
  const strValue = String(value || '').trim()
  
  // 如果值为空，不进行验证（由外部处理必填验证）
  if (!strValue) {
    internalError.value = ''
    return true
  }
  
  if (props.validate === 'phone') {
    // 中国手机号格式：11位数字，以1开头，第二位是3-9
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(strValue)) {
      internalError.value = '请输入有效的手机号（11位数字，以1开头）'
      emit('validate', { valid: false, error: internalError.value, type: 'phone' })
      return false
    }
    internalError.value = ''
    emit('validate', { valid: true, error: '', type: 'phone' })
    return true
  }
  
  if (props.validate === 'email') {
    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(strValue)) {
      internalError.value = '请输入有效的邮箱地址'
      emit('validate', { valid: false, error: internalError.value, type: 'email' })
      return false
    }
    internalError.value = ''
    emit('validate', { valid: true, error: '', type: 'email' })
    return true
  }
  
  if (props.validate === 'password') {
    // 密码规则：8-20位，至少包含字母和数字
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/
    if (!passwordRegex.test(strValue)) {
      internalError.value = '密码需8-20位，至少包含字母和数字'
      emit('validate', { valid: false, error: internalError.value, type: 'password' })
      return false
    }
    internalError.value = ''
    emit('validate', { valid: true, error: '', type: 'password' })
    return true
  }
  
  internalError.value = ''
  return true
}

// 计算最终的错误信息（优先显示外部传入的 error，否则显示内部验证错误）
const finalError = computed(() => {
  return props.error || internalError.value || ''
})

// 计算是否有错误
const hasError = computed(() => {
  return !!(props.error || internalError.value)
})

// 状态样式
const stateClasses = computed(() => {
  const classes = []
  
  if (props.ghost) {
    classes.push('bg-transparent')
  }
  
  if (props.disabled) {
    classes.push('cursor-not-allowed pointer-events-none bg-base-100/70 border-base-150/50 text-base-content/80')
  }
  
  if (props.loading) {
    classes.push('pointer-events-none')
  }
  
  if (hasError.value) {
    classes.push('border-error focus:outline-2 focus:outline-error focus:outline-offset-2')
  }
  
  return classes.join(' ')
})

// 响应式样式
const responsiveClasses = computed(() => {
  const classes = []
  
  if (props.sm) {
    const size = props.sm as keyof typeof sizes
    classes.push(`sm:${sizes[size]}`)
  }
  
  if (props.md) {
    const size = props.md as keyof typeof sizes
    classes.push(`md:${sizes[size]}`)
  }
  
  if (props.lg) {
    const size = props.lg as keyof typeof sizes
    classes.push(`lg:${sizes[size]}`)
  }
  
  if (props.xl) {
    const size = props.xl as keyof typeof sizes
    classes.push(`xl:${sizes[size]}`)
  }
  
  return classes.join(' ')
})

// 最终样式组合
const inputClasses = computed(() => {
  const externalClass = getExternalClass()
  
  return [
    baseClasses.value,
    sizeClasses.value,
    colorVariantClasses.value,
    stateClasses.value,
    responsiveClasses.value,
    externalClass // 合并外部传入的 class
  ].filter(Boolean).join(' ')
})

// 容器样式
const containerClasses = computed(() => {
  const classes: string[] = []
  const externalClass = getExternalClass()
  
  // 从外部传入的 class 中提取宽度相关类
  const widthClasses = externalClass ? externalClass.split(' ').filter(cls => 
    cls.includes('w-') || cls.includes('min-w-') || cls.includes('max-w-')
  ) : []
  
  // 容器需要相对定位，以便错误信息可以绝对定位
  classes.push('relative')
  
  if (props.label) {
    // 根据 direction 设置布局方向
    if (props.direction === 'row') {
      classes.push('flex', 'flex-row', 'items-center')
    } else {
      classes.push('flex', 'flex-col')
    }
    
    // 如果设置了 fullWidth，强制使用 w-full；否则根据外部传入的宽度类或默认 w-full
    if (props.fullWidth) {
      classes.push('w-full')
    } else if (widthClasses.length > 0) {
      classes.push(...widthClasses)
    } else {
      classes.push('w-full')
    }
  } else {
    // 没有 label 时
    if (props.fullWidth) {
      // 如果设置了 fullWidth，强制使用 w-full
      classes.push('w-full')
    } else if (externalClass) {
      // 从外部传入的 class 中提取 flex 和宽度相关类应用到容器
      const flexClasses = externalClass.split(' ').filter(cls => 
        cls.includes('flex-') || cls.includes('w-') || cls.includes('min-w-') || cls.includes('max-w-')
      )
      if (flexClasses.length > 0) {
        classes.push(...flexClasses)
      }
    }
  }
  return classes.join(' ')
})

// 容器内联样式（用于确保 flex 布局生效）
const containerStyle = computed(() => {
  const externalClass = getExternalClass()
  if (!props.label && externalClass && externalClass.includes('flex-1')) {
    // 如果外部传入了 flex-1，确保容器也应用 flex 布局
    return {
      display: 'flex',
      flex: '1 1 0%',
      minWidth: '0',
      width: '100%'
    }
  }
  return {}
})

// 标签样式
const labelClasses = computed(() => {
  const classes = ['select-none']
  
  if (props.label) {
    // 根据 direction 设置不同的样式
    if (props.direction === 'row') {
      classes.push('pr-2') // 水平布局时，右边距
    } else {
      classes.push('py-2') // 垂直布局时，上下边距
    }
    classes.push(props.labelWidth)
  }
  
  return classes.filter(Boolean).join(' ')
})

// 解析标签，将 * 号提取出来用于红色显示
const parsedLabel = computed(() => {
  if (!props.label) return { text: '', hasRequired: false }
  
  const label = props.label
  // 检查是否包含 * 号
  if (label.includes('*')) {
    // 将 * 号替换为特殊标记，然后分割
    const parts = label.split('*')
    return {
      text: parts[0] || '', // * 号前的文本
      hasRequired: true,
      suffix: parts.slice(1).join('*') || '' // * 号后的文本（如果有多个 * 号）
    }
  }
  
  return { text: label, hasRequired: false, suffix: '' }
})

</script>

<template>
  <div :class="containerClasses" :style="containerStyle">
    <label v-if="label" :class="labelClasses">
      <span :class="`text-${size}`">
        {{ parsedLabel.text }}
        <span v-if="parsedLabel.hasRequired" class="text-error">*</span>
        <span v-if="parsedLabel.suffix">{{ parsedLabel.suffix }}</span>
      </span>
    </label>
    <div :class="inputWrapperClasses">
      <!-- 左侧图标 -->
      <div 
        v-if="leftIcon" 
        class="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10"
        :class="disabled || loading ? 'opacity-50' : 'opacity-70'"
      >
        <icn 
          :name="leftIcon" 
          v-bind="{ ...iconSizeProps, ...leftIconStyleProps }"
        />
      </div>
      <!-- 输入框 -->
      <input 
        ref="inputText" 
        :value="modelValue" 
        @input="input"
        @blur="handleBlur"
        @focus="handleFocus"
        :name="name" 
        :placeholder="placeholder" 
        :type="currentInputType"
        :disabled="disabled || loading" 
        :class="inputClasses"
      >
      <!-- 右侧图标 -->
      <div
        v-if="rightIcon"
        class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center z-10"
        :class="[
          (isClearIcon || isPasswordToggle) && !isEmpty
            ? 'cursor-pointer hover:text-primary transition-colors duration-200' 
            : 'pointer-events-none',
          disabled || loading || (isEmpty && (isClearIcon || isPasswordToggle)) ? 'opacity-50' : (isClearIcon || isPasswordToggle) ? 'opacity-70 hover:opacity-100' : 'opacity-70'
        ]"
        @click.stop.prevent="isEmpty ? null : (isClearIcon ? clearInput($event) : (isPasswordToggle ? togglePasswordVisibility($event) : null))"
        @mousedown.stop.prevent
      >
        <!-- 密码切换：使用两个独立的图标，通过 v-show 控制显示 -->
        <template v-if="isPasswordToggle">
          <span v-show="!passwordVisible">
            <icn 
              name="eye" 
              v-bind="{ ...iconSizeProps, ...rightIconStyleProps }"
              class="pointer-events-none"
            />
          </span>
          <span v-show="passwordVisible">
            <icn 
              name="eye-slash" 
              v-bind="{ ...iconSizeProps, ...rightIconStyleProps }"
              class="pointer-events-none"
            />
          </span>
        </template>
        <!-- 其他图标：使用动态图标名称 -->
        <icn 
          v-else
          :name="currentRightIcon" 
          v-bind="{ ...iconSizeProps, ...rightIconStyleProps }"
          :class="(isClearIcon || isPasswordToggle) ? 'pointer-events-none' : ''"
        />
      </div>
      <!-- 错误信息：使用绝对定位，相对于 inputWrapper，不影响容器高度 -->
      <div 
        v-if="hasError" 
        class="absolute top-full left-0 text-error text-xs mt-1 ml-1 whitespace-nowrap" 
        v-text="finalError" 
      />
    </div>
  </div>
</template>


