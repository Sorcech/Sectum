<template>
  <div :class="containerClasses">
    <textarea 
      :value="modelValue" 
      @input="input" 
      :rows="rows" 
      :cols="cols" 
      :disabled="disabled || loading" 
      :readonly="readonly"
      :placeholder="placeholder"
      @focus="focus" 
      @blur="blur" 
      :maxlength="maxlength" 
      :class="textareaClasses"
    ></textarea>
    <div v-if="showCounter" :class="counterClasses">{{ quantity }}/{{ maxlength }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: String },
  rows: { type: Number, default: 5 },
  cols: { type: Number, default: 30 },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Please Input' },
  maxlength: { type: Number, default: 150 },
  showCounter: { type: Boolean, default: true },
  size: {
    type: String, default: 'md', required: false,
    validator: (value: string) => { return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value) }
  },
  color: {
    type: String, default: 'default', required: false,
    validator: (value: string) => { return ['default', 'primary', 'secondary', 'success', 'error', 'warning'].includes(value) }
  },
  bordered: { type: Boolean, default: true, required: false },
  ghost: { type: Boolean, default: false, required: false },
  resize: {
    type: String, default: "resize", required: false,
    validator: (value: string) => {
      return ['resize', 'resize-x', 'resize-y', 'resize-none'].includes(value)
    }
  },
  // 响应式尺寸
  sm: { type: String, required: false },
  md: { type: String, required: false },
  lg: { type: String, required: false },
  xl: { type: String, required: false }
})

const quantity = ref(0)
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

// 基础样式
const baseClasses = computed(() => {
  return [
    'w-full max-w-sm bg-base-100 transition-all duration-200 ease-in-out',
    'min-w-0 flex-shrink-0',
    'rounded-$rounded-btn'
  ].join(' ')
})

// 尺寸样式
const sizeClasses = computed(() => {
  const sizes = {
    xs: 'h-20 px-2 py-1 text-xs',
    sm: 'h-24 px-3 py-2 text-sm',
    md: 'h-32 px-4 py-3 text-sm',
    lg: 'h-40 px-5 py-4 text-base',
    xl: 'h-48 px-6 py-5 text-xl'
  }
  return sizes[props.size as keyof typeof sizes] || sizes.md
})

// 颜色和变体样式
const colorVariantClasses = computed(() => {
  const variants = {
    default: () => props.bordered ? 'border border-base-300 focus:outline-2 focus:outline-offset-2 focus:outline-base-300' : '',
    primary: () => props.bordered ? 'border border-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary' : '',
    secondary: () => props.bordered ? 'border border-secondary focus:outline-2 focus:outline-offset-2 focus:outline-secondary' : '',
    success: () => props.bordered ? 'border border-success focus:outline-2 focus:outline-offset-2 focus:outline-success' : '',
    error: () => props.bordered ? 'border border-error focus:outline-2 focus:outline-offset-2 focus:outline-error' : '',
    warning: () => props.bordered ? 'border border-warning focus:outline-2 focus:outline-offset-2 focus:outline-warning' : ''
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
    classes.push('cursor-not-allowed pointer-events-none bg-base-100/70 border-base-100/50 text-base-content/80')
  }
  
  if (props.loading) {
    classes.push('pointer-events-none')
  }
  
  if (props.readonly) {
    classes.push('cursor-default')
  }
  
  return classes.join(' ')
})

// 响应式样式
const responsiveClasses = computed(() => {
  const classes = []
  
  if (props.sm) {
    const size = props.sm as keyof typeof responsiveSizes
    classes.push(`sm:${responsiveSizes[size]}`)
  }
  
  if (props.md) {
    const size = props.md as keyof typeof responsiveSizes
    classes.push(`md:${responsiveSizes[size]}`)
  }
  
  if (props.lg) {
    const size = props.lg as keyof typeof responsiveSizes
    classes.push(`lg:${responsiveSizes[size]}`)
  }
  
  if (props.xl) {
    const size = props.xl as keyof typeof responsiveSizes
    classes.push(`xl:${responsiveSizes[size]}`)
  }
  
  return classes.join(' ')
})

const responsiveSizes = {
  xs: 'h-20 px-2 py-1 text-xs',
  sm: 'h-24 px-3 py-2 text-sm',
  md: 'h-32 px-4 py-3 text-sm',
  lg: 'h-40 px-5 py-4 text-base',
  xl: 'h-48 px-6 py-5 text-xl'
}

// 最终样式组合
const textareaClasses = computed(() => {
  return [
    baseClasses.value,
    sizeClasses.value,
    colorVariantClasses.value,
    stateClasses.value,
    responsiveClasses.value,
    props.resize
  ].filter(Boolean).join(' ')
})

// 容器样式
const containerClasses = computed(() => {
  return 'relative w-full'
})

// 计数器样式
const counterClasses = computed(() => {
  return 'opacity-50 absolute bottom-2 right-2 text-xs'
})

const input = (e: any) => {
  quantity.value = e.target.value.length
  if (quantity.value > props.maxlength) {
    quantity.value = props.maxlength
  }
  emit('update:modelValue', e.target.value)
}

const focus = (e: any) => {
  emit('focus', e.target.value)
}

const blur = (e: any) => {
  emit('blur', e.target.value)
}
</script>

<style scoped>
/* 文本域边框颜色设置 - 使用 CSS 变量确保纯色 */
textarea.border-base-300 {
  border-color: var(--base-300);
}

textarea.border-primary {
  border-color: var(--primary);
}

textarea.border-secondary {
  border-color: var(--secondary);
}

textarea.border-success {
  border-color: var(--success);
}

textarea.border-error {
  border-color: var(--error);
}

textarea.border-warning {
  border-color: var(--warning);
}

/* 文本域聚焦时的动画 */
@keyframes textarea-focus {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}

textarea:focus {
  animation: textarea-focus 0.2s ease-out;
}
</style>