<script lang="ts" setup>
import { ref, computed, useAttrs } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], required: false },
  direction: { type: String, default: 'row', required: false },
  label: { type: String, required: false },
  labelWidth: { type: String, default: 'w-4/9', required: false },
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
  // 响应式尺寸
  sm: { type: String, required: false },
  md: { type: String, required: false },
  lg: { type: String, required: false },
  xl: { type: String, required: false }
})

// 获取外部传入的 class
const attrs = useAttrs()

const inputText = ref<HTMLInputElement | null>(null)
const isError = ref(props.error || false)
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const input = (e: any) => {
  emit('update:modelValue', e.target.value)
}

// 获取外部传入的 class（用于容器和 input）
const getExternalClass = () => {
  return typeof attrs.class === 'string' 
    ? attrs.class 
    : Array.isArray(attrs.class) 
      ? attrs.class.join(' ')
      : ''
}

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
  
  // 如果没有 label 且外部传入了 flex-1，确保 input 也占据全宽
  if (!props.label && externalClass && externalClass.includes('flex-1')) {
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
  
  if (isError.value) {
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
  
  // 只有在有 label 时才设置 w-full，否则让外部控制宽度
  if (props.label) {
    classes.push('w-full', props.direction)
  } else if (externalClass) {
    // 没有 label 时，从外部传入的 class 中提取 flex 相关类应用到容器
    const flexClasses = externalClass.split(' ').filter(cls => 
      cls.includes('flex-') || cls.includes('w-') || cls.includes('min-w-') || cls.includes('max-w-')
    )
    if (flexClasses.length > 0) {
      classes.push(...flexClasses)
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
  return [
    'select-none py-2 ',
    props.label ? props.labelWidth : ''
  ].filter(Boolean).join(' ')
})

</script>

<template>
  <div :class="containerClasses" :style="containerStyle">
    <label v-if="label" :class="labelClasses">
      <span :class="`text-${size}`">{{ label }}</span>
    </label>
    <input 
      ref="inputText" 
      :value="modelValue" 
      @input="input" 
      :name="name" 
      :placeholder="placeholder" 
      :type="type"
      :disabled="disabled || loading" 
      :class="inputClasses"
    >
    <div v-if="isError" class="text-error text-xs mt-2 ml-1" v-text="error" />
  </div>
</template>

