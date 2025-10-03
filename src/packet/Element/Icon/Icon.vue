<template>
  <i :class="iconClasses" :style="customStyles"></i>
</template>

<script lang="ts" setup>
import { computed, onMounted, nextTick } from 'vue'

// FontAwesome 动态加载
let fontAwesomeLoaded = false

const loadFontAwesome = async () => {
  if (fontAwesomeLoaded) return
  
  try {
    // 检查是否已经加载
    if (typeof window !== 'undefined' && (window as any).FontAwesome) {
      fontAwesomeLoaded = true
      return
    }
    
    // 动态加载 FontAwesome - 使用本地文件
    const script = document.createElement('script')
    script.src = '/icon.js'
    script.async = true
    
    return new Promise((resolve, reject) => {
      script.onload = () => {
        fontAwesomeLoaded = true
        resolve(true)
      }
      script.onerror = () => {
        reject(new Error('Failed to load FontAwesome'))
      }
      document.head.appendChild(script)
    })
  } catch (error) {
    console.warn('FontAwesome 加载失败:', error)
  }
}

const props = defineProps({
  name: { type: String, default: '', required: true },
  beat: { type: Boolean, default: false, required: false },
  fade: { type: Boolean, default: false, required: false },
  beatfade: { type: Boolean, default: false, required: false },
  bounce: { type: Boolean, default: false, required: false },
  flip: { type: Boolean, default: false, required: false },
  shake: { type: Boolean, default: false, required: false },
  spin: { type: Boolean, default: false, required: false },
  spinpulse: { type: Boolean, default: false, required: false },

  xs: { type: Boolean, required: false },
  sm: { type: Boolean, required: false },
  lg: { type: Boolean, required: false },
  xl: { type: Boolean, required: false },

  duotone: { type: Boolean, required: false },
  solid: { type: Boolean, required: false },
  regular: { type: Boolean, required: false },
  light: { type: Boolean, required: false },
  thin: { type: Boolean, required: false },
  brand: { type: Boolean, required: false },
  kit: { type: Boolean, required: false },

  // 颜色属性
  color: { 
    type: String, 
    default: '', 
    required: false,
    validator: (value: string) => {
      return ['', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'base', 'neutral'].includes(value)
    }
  },
  // 自定义颜色值
  customColor: { type: String, default: '', required: false },
  // 透明度
  opacity: { type: Number, default: 1, required: false }
})

// FontAwesome 使用原生图标名称，无需映射

// 计算图标类名
const iconClasses = computed(() => {
  const classes: string[] = []
  
  // 使用原始图标名称（FontAwesome 原生支持）
  const iconName = props.name
  
  // 根据属性选择 FontAwesome 图标类型
  if (props.solid) {
    classes.push('fas', `fa-${iconName}`)
  } else if (props.regular) {
    classes.push('far', `fa-${iconName}`)
  } else if (props.light) {
    classes.push('fal', `fa-${iconName}`)
  } else if (props.thin) {
    classes.push('fat', `fa-${iconName}`)
  } else if (props.duotone) {
    classes.push('fad', `fa-${iconName}`)
  } else if (props.brand) {
    classes.push('fab', `fa-${iconName}`)
  } else {
    // 默认使用 solid 样式
    classes.push('fas', `fa-${iconName}`)
  }
  
  // 尺寸类
  if (props.xs) classes.push('text-xs')
  else if (props.sm) classes.push('text-sm')
  else if (props.lg) classes.push('text-lg')
  else if (props.xl) classes.push('text-xl')
  else classes.push('text-base')
  
  // 颜色类
  if (props.color) {
    const colorMap: Record<string, string> = {
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      info: 'text-info',
      base: 'text-base-content',
      neutral: 'text-neutral'
    }
    if (colorMap[props.color]) {
      classes.push(colorMap[props.color])
    }
  }
  
  // 动画类
  if (props.beat || props.bounce) classes.push('animate-bounce')
  else if (props.fade) classes.push('opacity-50')
  else if (props.beatfade) classes.push('animate-pulse')
  else if (props.flip) classes.push('transform rotate-180')
  else if (props.shake) classes.push('animate-pulse')
  else if (props.spin) classes.push('animate-spin')
  else if (props.spinpulse) classes.push('animate-pulse')
  
  // 透明度类
  if (props.opacity !== 1) {
    const opacityClass = `opacity-${Math.round(props.opacity * 100)}`
    classes.push(opacityClass)
  }
  
  return classes
})

// 计算自定义样式
const customStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.customColor) {
    styles.color = props.customColor
  }
  
  return styles
})

// FontAwesome 初始化和渲染
onMounted(async () => {
  await nextTick()
  
  // 动态加载 FontAwesome
  await loadFontAwesome()
  
  // 等待 FontAwesome 加载完成后渲染图标
  if (typeof window !== 'undefined' && (window as any).FontAwesome) {
    const fa = (window as any).FontAwesome
    if (fa.dom && fa.dom.i2svg) {
      // 重新渲染图标
      fa.dom.i2svg()
    }
  }
})
</script>