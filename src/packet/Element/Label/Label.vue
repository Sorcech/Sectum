<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String, default: 'primary',
    validator: (value: string) => {
      return ['primary', 'secondary', 'success', 'error', 'warning'].includes(value)
    },
  },
  disabled: { type: Boolean, default: false, required: false, },
  loading: { type: Boolean, default: false, required: false, },
  size: {
    type: String, default: 'md', required: false,
    validator: (value: string) => {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
  },
  variant: {
    type: String, default: 'default', required: false,
    validator: (value: string) => {
      return ['default', 'outline', 'transparent', 'link'].includes(value)
    }
  },
  pills: { type: Boolean, default: false, required: false },
  circle: { type: Boolean, default: false, required: false },
  active: { type: Boolean, default: false, required: false },
  // remove all styles from button
  clean: { type: Boolean, default: false, required: false },
  item: { type: Boolean, default: false, required: false },

  sm: { type: String, required: false }, // responsive sm
  md: { type: String, required: false }, // responsive md
  lg: { type: String, required: false }, // responsive lg
  xl: { type: String, required: false }  // responsive xl
})

// 基础标签样式
const baseClasses = computed(() => {
  if (props.clean || props.item) {
    return 'bg-transparent border-none p-0 m-0 font-inherit text-inherit cursor-pointer'
  }
  
  return [
    // 基础样式 - 重置浏览器默认样式
    'border-none outline-none',
    'font-semibold inline-flex items-center justify-center select-none relative overflow-hidden',
    // 确保没有边框
    
    // 动画和过渡 + 自定义动画类
    'transition-all duration-200 ease-out transform scale-100 lab-animate',
    'hover:scale-105 active:scale-95',
    // 圆角
    props.pills ? 'rounded-full' : 
    props.circle ? 'rounded-full' : 'rounded-$rounded-lab'
  ].filter(Boolean).join(' ')
})

// 尺寸样式
const sizeClasses = computed(() => {
  if (props.clean || props.item) return ''
  
  const sizes = {
    xs: props.circle ? 'w-6 h-6 p-0 text-xs' : 'h-6 px-1 text-xs',
    sm: props.circle ? 'w-8 h-8 p-0 text-sm' : 'h-8 px-2 text-sm', 
    md: props.circle ? 'w-10 h-10 p-0 text-sm' : 'h-10 px-4 text-sm',
    lg: props.circle ? 'w-12 h-12 p-0 text-base' : 'h-12 px-5 text-base',
    xl: props.circle ? 'w-14 h-14 p-0 text-xl' : 'h-14 px-6 text-xl'
  }
  return sizes[props.size as keyof typeof sizes] || sizes.md
})

// 颜色和变体样式
const colorVariantClasses = computed(() => {
  if (props.clean || props.item) return ''
  
  const variants = {
    default: (color: string) => `bg-${color} text-${color}-content shadow-md hover:bg-${color}-focus hover:shadow-${color}/15`,
    outline: (color: string) => `text-${color} border-2 border-${color} border-solid bg-transparent hover:bg-${color} hover:text-${color}-content hover:shadow-${color}/15`,
    transparent: (color: string) => `text-${color} bg-transparent hover:bg-${color}/10`,
    link: (color: string) => `text-${color} bg-transparent hover:underline`
  }
  
  const variantFn = variants[props.variant as keyof typeof variants]
  const result = variantFn ? variantFn(props.color) : ''
  
  return result
})

// 状态样式
const stateClasses = computed(() => {
  const classes = []
  
  if (props.disabled) {
    classes.push('cursor-not-allowed pointer-events-none opacity-70')
  }
  
  if (props.loading) {
    classes.push('pointer-events-none')
  }
  
  if (props.active) {
    classes.push('scale-95')
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
  xs: props.circle ? 'w-6 h-6 p-0 text-xs' : 'h-6 px-1 text-xs',
  sm: props.circle ? 'w-8 h-8 p-0 text-sm' : 'h-8 px-2 text-sm',
  md: props.circle ? 'w-10 h-10 p-0 text-sm' : 'h-10 px-4 text-sm',
  lg: props.circle ? 'w-12 h-12 p-0 text-base' : 'h-12 px-5 text-base',
  xl: props.circle ? 'w-14 h-14 p-0 text-xl' : 'h-14 px-6 text-xl'
}

// 最终样式组合
const labelClasses = computed(() => {
  return [
    baseClasses.value,
    sizeClasses.value,
    colorVariantClasses.value,
    stateClasses.value,
    responsiveClasses.value
  ].filter(Boolean).join(' ')
})
</script>
<template>
  <component 
    is="button" 
    :disabled="props.disabled || props.loading" 
    :class="labelClasses"
  >
    <slot />
  </component>
</template>

<style scoped>
/* 标签动画效果 */
@keyframes lab-pop {
  0% {
    transform: scale(0.95);
  }
  40% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

/* 标签基础动画 */
.lab-animate {
  animation: lab-pop 0.25s ease-out;
}

/* 标签激活时停止动画 */
.lab-animate:active {
  animation: none;
}
</style>
