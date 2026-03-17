<script lang="ts" setup>
import { ref, computed, useAttrs } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  modelValue: { type: String },
  direction: { type: String, default: 'row', required: false },
  label: { type: String, required: false },
  labelWidth: { type: String, default: 'w-1/3', required: false },
  inputWidth: { type: String, required: false },
  fullWidth: { type: Boolean, default: false, required: false },
  rows: { type: Number, default: 5 },
  cols: { type: Number, default: 30 },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  placeholder: { type: String, default: undefined },
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

// 获取外部传入的 class
const attrs = useAttrs()

const quantity = ref(0)
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

// 获取外部传入的 class（用于容器和 textarea）
const getExternalClass = () => {
  return typeof attrs.class === 'string' 
    ? attrs.class 
    : Array.isArray(attrs.class) 
      ? attrs.class.join(' ')
      : ''
}

// 基础样式
const baseClasses = computed(() => {
  const externalClass = getExternalClass()
  const classes = [
    'bg-base-100 transition-all duration-200 ease-in-out',
    'min-w-0',
    'rounded-$rounded-btn'
  ]
  
  // 如果设置了 fullWidth，确保 textarea 占据全宽
  if (props.fullWidth) {
    classes.push('w-full')
  } else if (!props.label && externalClass && externalClass.includes('flex-1')) {
    // 如果没有 label 且外部传入了 flex-1，确保 textarea 也占据全宽
    classes.push('w-full')
  } else if (props.label && props.direction === 'row') {
    // 如果有 label 且是 row 布局，textarea 也应该占据全宽（在 flex-1 容器内）
    classes.push('w-full')
  } else {
    // 默认情况下，使用 max-w-sm 限制最大宽度
    classes.push('w-full', 'max-w-sm')
  }
  
  return classes.filter(Boolean).join(' ')
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
    default: () => props.bordered ? 'border border-base-250 focus:outline-2 focus:outline-offset-2 focus:outline-base-250' : '',
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
    classes.push('cursor-not-allowed pointer-events-none bg-base-100/70 border-base-150/50 text-base-content/80')
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
  const externalClass = getExternalClass()
  
  return [
    baseClasses.value,
    sizeClasses.value,
    colorVariantClasses.value,
    stateClasses.value,
    responsiveClasses.value,
    props.resize,
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
  
  // 容器需要相对定位，以便计数器可以绝对定位
  classes.push('relative')
  
  if (props.label) {
    // 根据 direction 设置布局方向
    if (props.direction === 'row') {
      classes.push('flex', 'flex-row', 'items-start')
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

// 标签样式
const labelClasses = computed(() => {
  const classes = ['select-none']
  
  if (props.label) {
    // 根据 direction 设置不同的样式
    if (props.direction === 'row') {
      classes.push('pr-2', 'pt-1') // 水平布局时，右边距和顶部对齐
    } else {
      classes.push('pb-2') // 垂直布局时，下边距
    }
    classes.push(props.labelWidth)
  }
  
  return classes.filter(Boolean).join(' ')
})

// textarea 包装容器样式
const textareaWrapperClasses = computed(() => {
  const classes = [
    'relative',
    'flex'
  ]
  
  // 如果设置了 fullWidth，强制使用 w-full
  if (props.fullWidth) {
    classes.push('w-full')
  } else if (props.inputWidth) {
    // 如果指定了 inputWidth，使用指定的宽度
    classes.push(props.inputWidth)
  } else if (props.label && props.direction === 'row') {
    // 如果有 label 且是 row 布局，textarea 占据剩余空间
    classes.push('flex-1', 'min-w-0')
  } else {
    // 默认情况下，textarea 占据全宽
    classes.push('w-full')
  }
  
  return classes.filter(Boolean).join(' ')
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
<template>
  <div :class="containerClasses">
    <label v-if="label" :class="labelClasses">
      <span :class="`text-${size} text-base-content`">
        {{ label }}
      </span>
    </label>
    <div :class="textareaWrapperClasses">
      <textarea 
        :value="modelValue" 
        @input="input" 
        :rows="rows" 
        :cols="cols" 
        :disabled="disabled || loading" 
        :readonly="readonly"
        :placeholder="placeholder || t('common.pleaseInput')"
        @focus="focus" 
        @blur="blur" 
        :maxlength="maxlength" 
        :class="textareaClasses"
      ></textarea>
      <div v-if="showCounter" class="opacity-50 absolute bottom-2 right-2 text-xs">{{ quantity }}/{{ maxlength }}</div>
    </div>
  </div>
</template>

<style scoped>
/* 文本域边框颜色设置 - 使用 CSS 变量确保纯色 */
textarea.border-base-250 {
  border-color: var(--base-250);
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