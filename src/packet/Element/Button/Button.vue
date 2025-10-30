<script lang="ts" setup>
import { type PropType, computed } from 'vue';
// 移除外部CSS文件导入，改为内联样式

const props = defineProps({
  tag: { type: String, default: 'button', required: false },
  color: {
    type: String, default: 'primary',
    validator: (value: string) => {
      return ['primary', 'secondary', 'success', 'warning', 'error'].includes(value)
    },
  },
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button', require: false,
    validator: (value: string) => {
      return ['button', 'submit', 'reset'].includes(value)
    }
  },
  loading: { type: Boolean, default: false, required: false, },
  disabled: { type: Boolean, default: false, required: false, },
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
  clean: { type: Boolean, default: false, required: false },
  item: { type: Boolean, default: false, required: false },

  sm: { type: String, required: false }, // responsive sm
  md: { type: String, required: false }, // responsive md
  lg: { type: String, required: false }, // responsive lg
  xl: { type: String, required: false }  // responsive xl
})

const computedType = computed(() => {
  if (props.tag === 'input' || props.tag === 'button')
    return props.type
  return null
})

// 基础按钮样式
const baseClasses = computed(() => {
  if (props.clean || props.item) {
    return 'bg-transparent border-none p-0 m-0 font-inherit text-inherit cursor-pointer no-underline hover:no-underline focus:no-underline'
  }
  
  return [
    // 基础样式 - 重置浏览器默认样式
    'border-none outline-none bg-transparent',
    'font-semibold inline-flex items-center justify-center select-none relative overflow-hidden',
    // 链接态去下划线
    'no-underline hover:no-underline focus:no-underline',
    // 动画和过渡 + 自定义动画类
    'transition-all duration-200 ease-out transform scale-100 btn-animate btn-ripple',
    'hover:scale-105 hover:shadow-lg',
    'active:scale-95 active:duration-100',
    // 圆角 - 修复为正确的UnoCSS语法
    props.pills ? 'rounded-full' : 
    props.circle ? 'rounded-full' : 'rounded-$rounded-btn'
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

// 颜色和变体样式 - 使用动态拼接 + safelist 保证类名生成
const colorVariantClasses = computed(() => {
  if (props.clean || props.item) return ''
  
  const variants = {
    default: (color: string) => `bg-${color} text-${color}-content shadow-md hover:bg-${color}-focus hover:shadow-${color}/15`,
    outline: (color: string) => `text-${color} ring-2 ring-${color} ring-inset bg-transparent hover:bg-${color} hover:text-${color}-content hover:shadow-${color}/15`,
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
    classes.push('cursor-not-allowed opacity-60 bg-base-100/70 border-base-100/50 text-base-content/80 transform-none!')
  }
  if (props.loading) {
    classes.push('cursor-wait')
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
const buttonClasses = computed(() => {
  return [
    baseClasses.value,
    sizeClasses.value,
    colorVariantClasses.value,
    stateClasses.value,
    responsiveClasses.value
  ].filter(Boolean).join(' ')
})

// 点击事件处理器 - 解决路由跳转问题
const handleClick = (event: Event) => {
  // 如果按钮禁用或加载中，阻止事件
  if (props.disabled || props.loading) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
}
</script>
<template>
  <component 
    :is="props.tag" 
    :disabled="props.disabled || props.loading" 
    :type="computedType" 
    :class="buttonClasses"
    @click="handleClick"
  >
    <div 
      v-if="props.loading" 
      class="btn-loading-icon animate-spin w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full"
    ></div>
    
    <!-- 按钮内容 -->
    <slot />
  </component>
</template>

<style scoped>
@keyframes btn-pop {
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

/* 波纹效果 - 复杂动画 
@keyframes btn-ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
*/
/* 基础按钮动画 */
.btn-animate {animation: btn-pop 0.25s ease-out;}

/* 点击波纹效果 */
.btn-ripple::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1) translate(-50%, -50%);
  transform-origin: 50% 50%;
}

.btn-ripple:focus:not(:active)::after {
  animation: btn-ripple 0.6s ease-out;
}

/* Loading 图标备用样式 - 以防UnoCSS类名不生效 */
.btn-loading-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
