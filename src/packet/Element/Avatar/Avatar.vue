<template>
  <div 
    :class="avatarClasses"
    :style="avatarStyles"
    @click="handleClick"
  >
    <!-- 图片头像 -->
    <img 
      v-if="src && !error" 
      :src="src" 
      :alt="alt || name"
      @error="handleImageError"
      class="w-full h-full object-cover"
    />
    
    <!-- 文字头像 -->
    <span 
      v-else-if="name || text" 
      :class="textClasses"
    >
      {{ displayText }}
    </span>
    
    <!-- 图标头像 -->
    <icn 
      v-else-if="icon"
      :name="icon"
      :light="iconLight"
      :brand="iconBrand"
      :class="iconClasses"
    />
    
    <!-- 默认图标 -->
    <icn 
      v-else
      name="user"
      light
      :class="iconClasses"
    />
    
    <!-- 状态指示器 -->
    <span 
      v-if="status"
      :class="statusClasses"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import icn from '../Icon/Icon.vue'

interface Props {
  // 图片源
  src?: string
  // 替代文本
  alt?: string
  // 名称（用于文字头像）
  name?: string
  // 自定义文字（用于文字头像）
  text?: string
  // 图标名称（用于图标头像）
  icon?: string
  // 图标样式
  iconLight?: boolean
  iconBrand?: boolean
  // 尺寸
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  // 形状
  shape?: 'circle' | 'square' | 'rounded'
  // 状态
  status?: 'online' | 'offline' | 'away' | 'busy' | ''
  // 状态位置
  statusPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  // 背景色（当使用文字或图标头像时）
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default'
  // 是否可点击
  clickable?: boolean
  // 自定义类名
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  shape: 'circle',
  status: '',
  statusPosition: 'bottom-right',
  color: 'default',
  clickable: false,
  iconLight: false,
  iconBrand: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  error: [error: Event]
}>()

const error = ref(false)

// 处理图片加载错误
const handleImageError = (e: Event) => {
  error.value = true
  emit('error', e)
}

// 处理点击事件
const handleClick = (e: MouseEvent) => {
  if (props.clickable) {
    emit('click', e)
  }
}

// 显示的文字（优先使用 text，否则使用 name 的首字母）
const displayText = computed(() => {
  if (props.text) return props.text
  if (props.name) {
    // 获取首字母，支持中文
    const firstChar = props.name.charAt(0)
    // 如果是中文，直接返回；如果是英文，返回大写字母
    return /[\u4e00-\u9fa5]/.test(firstChar) ? firstChar : firstChar.toUpperCase()
  }
  return ''
})

// 尺寸映射
const sizeMap = {
  xs: { size: 'w-6 h-6', text: 'text-xs', icon: 'xs', status: 'w-1.5 h-1.5' },
  sm: { size: 'w-8 h-8', text: 'text-sm', icon: 'sm', status: 'w-2 h-2' },
  md: { size: 'w-10 h-10', text: 'text-base', icon: 'md', status: 'w-2.5 h-2.5' },
  lg: { size: 'w-12 h-12', text: 'text-lg', icon: 'lg', status: 'w-3 h-3' },
  xl: { size: 'w-16 h-16', text: 'text-xl', icon: 'xl', status: 'w-4 h-4' }
}

// 头像容器样式
const avatarClasses = computed(() => {
  const size = sizeMap[props.size]
  const classes = [
    'relative inline-flex items-center justify-center',
    'overflow-hidden select-none',
    size.size,
    props.shape === 'circle' ? 'rounded-full' : 
    props.shape === 'square' ? 'rounded-none' : 
    'rounded-lg',
    props.clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : '',
    props.customClass
  ].filter(Boolean)
  
  return classes.join(' ')
})

// 头像容器内联样式（用于背景色）
const avatarStyles = computed(() => {
  // 背景色通过 CSS 类名设置，不需要内联样式
  return {}
})

// 图片样式

// 文字样式
const textClasses = computed(() => {
  const size = sizeMap[props.size]
  const bgColors = {
    primary: 'bg-primary text-primary-content',
    secondary: 'bg-secondary text-secondary-content',
    success: 'bg-success text-success-content',
    warning: 'bg-warning text-warning-content',
    error: 'bg-error text-error-content',
    default: 'bg-base-300 text-base-content'
  }
  
  return [
    'w-full h-full flex items-center justify-center font-semibold',
    size.text,
    bgColors[props.color]
  ].join(' ')
})

// 图标样式
const iconClasses = computed(() => {
  const textColors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    default: 'text-base-content'
  }
  
  return [
    textColors[props.color]
  ].join(' ')
})

// 状态指示器样式
const statusClasses = computed(() => {
  const size = sizeMap[props.size]
  const statusColors = {
    online: 'bg-success',
    offline: 'bg-gray-400',
    away: 'bg-warning',
    busy: 'bg-error'
  }
  
  const positions = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0'
  }
  
  return [
    'absolute border-2 border-base-100 rounded-full',
    size.status,
    statusColors[props.status as keyof typeof statusColors] || '',
    positions[props.statusPosition]
  ].filter(Boolean).join(' ')
})
</script>

