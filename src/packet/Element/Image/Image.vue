<template>
  <div 
    :class="containerClasses"
    :style="containerStyles"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 加载占位符 -->
    <div 
      v-if="loading && !loaded && !error"
      :class="placeholderClasses"
    >
      <icn 
        v-if="placeholderIcon"
        :name="placeholderIcon"
        :light="placeholderIconLight"
        :brand="placeholderIconBrand"
        :class="iconClasses"
      />
      <span v-else-if="placeholderText" :class="textClasses">
        {{ placeholderText }}
      </span>
    </div>
    
    <!-- 错误占位符 -->
    <div 
      v-else-if="error"
      :class="placeholderClasses"
    >
      <icn 
        v-if="errorIcon"
        :name="errorIcon"
        :light="errorIconLight"
        :brand="errorIconBrand"
        :class="iconClasses"
      />
      <span v-else-if="errorText" :class="textClasses">
        {{ errorText }}
      </span>
      <icn 
        v-else
        name="image"
        light
        :class="iconClasses"
      />
    </div>
    
    <!-- 图片 -->
    <img
      v-else
      :src="src"
      :alt="alt"
      :class="imageClasses"
      :style="imageStyles"
      :loading="lazy ? 'lazy' : 'eager'"
      @load="handleLoad"
      @error="handleError"
    />
    
    <!-- 遮罩层（hover 时显示） -->
    <div 
      v-if="showOverlay && (hovered || clicked)"
      :class="overlayClasses"
    >
      <slot name="overlay">
        <icn 
          v-if="overlayIcon"
          :name="overlayIcon"
          :light="overlayIconLight"
          :brand="overlayIconBrand"
          :class="overlayIconClasses"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import icn from '../Icon/Icon.vue'

interface Props {
  // 图片源
  src: string
  // 替代文本
  alt?: string
  // 宽度
  width?: string | number
  // 高度
  height?: string | number
  // 尺寸预设
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  // 圆角
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  // 对象适配模式
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  // 是否懒加载
  lazy?: boolean
  // 是否显示加载状态
  loading?: boolean
  // 占位符图标
  placeholderIcon?: string
  placeholderIconLight?: boolean
  placeholderIconBrand?: boolean
  // 占位符文字
  placeholderText?: string
  // 错误图标
  errorIcon?: string
  errorIconLight?: boolean
  errorIconBrand?: boolean
  // 错误文字
  errorText?: string
  // 是否显示遮罩层
  showOverlay?: boolean
  // 遮罩层图标
  overlayIcon?: string
  overlayIconLight?: boolean
  overlayIconBrand?: boolean
  // 是否可点击
  clickable?: boolean
  // 点击时是否显示遮罩
  showOverlayOnClick?: boolean
  // 自定义类名
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  size: 'md',
  rounded: 'md',
  fit: 'cover',
  lazy: false,
  loading: true,
  placeholderIconLight: false,
  placeholderIconBrand: false,
  errorIconLight: false,
  errorIconBrand: false,
  showOverlay: false,
  overlayIconLight: false,
  overlayIconBrand: false,
  clickable: false,
  showOverlayOnClick: false
})

const emit = defineEmits<{
  load: [event: Event]
  error: [error: Event]
  click: [event: MouseEvent]
}>()

const loaded = ref(false)
const error = ref(false)
const hovered = ref(false)
const clicked = ref(false)

// 尺寸映射
const sizeMap = {
  xs: { width: 'w-16', height: 'h-16' },
  sm: { width: 'w-24', height: 'h-24' },
  md: { width: 'w-32', height: 'h-32' },
  lg: { width: 'w-48', height: 'h-48' },
  xl: { width: 'w-64', height: 'h-64' },
  full: { width: 'w-full', height: 'h-full' }
}

// 圆角映射
const roundedMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
}

// 对象适配模式映射
const fitMap = {
  contain: 'object-contain',
  cover: 'object-cover',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down'
}

// 容器样式
const containerClasses = computed(() => {
  const size = sizeMap[props.size]
  const classes = [
    'relative inline-block overflow-hidden',
    props.size !== 'full' && !props.width && !props.height ? size.width : '',
    props.size !== 'full' && !props.width && !props.height ? size.height : '',
    roundedMap[props.rounded],
    props.clickable ? 'cursor-pointer' : '',
    props.customClass
  ].filter(Boolean)
  
  return classes.join(' ')
})

const containerStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.width) {
    styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.height) {
    styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  return styles
})

// 图片样式
const imageClasses = computed(() => {
  return [
    'w-full h-full',
    fitMap[props.fit],
    'transition-opacity duration-300',
    loaded.value ? 'opacity-100' : 'opacity-0'
  ].join(' ')
})

const imageStyles = computed(() => {
  return {}
})

// 占位符样式
const placeholderClasses = computed(() => {
  return [
    'absolute inset-0',
    'flex items-center justify-center',
    'bg-base-200 text-base-content/50',
    roundedMap[props.rounded]
  ].join(' ')
})

// 图标样式
const iconClasses = computed(() => {
  return 'text-2xl'
})

// 文字样式
const textClasses = computed(() => {
  return 'text-sm'
})

// 遮罩层样式
const overlayClasses = computed(() => {
  return [
    'absolute inset-0',
    'flex items-center justify-center',
    'bg-black/50 backdrop-blur-sm',
    'transition-opacity duration-300',
    roundedMap[props.rounded]
  ].join(' ')
})

// 遮罩层图标样式
const overlayIconClasses = computed(() => {
  return 'text-white text-2xl'
})

// 处理图片加载成功
const handleLoad = (e: Event) => {
  loaded.value = true
  error.value = false
  emit('load', e)
}

// 处理图片加载错误
const handleError = (e: Event) => {
  error.value = true
  loaded.value = false
  emit('error', e)
}

// 处理点击
const handleClick = (e: MouseEvent) => {
  if (props.clickable) {
    if (props.showOverlayOnClick) {
      clicked.value = !clicked.value
    }
    emit('click', e)
  }
}

// 处理鼠标悬停
const handleMouseEnter = () => {
  if (props.showOverlay) {
    hovered.value = true
  }
}

const handleMouseLeave = () => {
  hovered.value = false
  if (!props.showOverlayOnClick) {
    clicked.value = false
  }
}
</script>

