<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // 百分比 (0-100)
  percent?: number
  // 状态: 'success' | 'exception' | 'active' | 'normal'
  status?: 'success' | 'exception' | 'active' | 'normal'
  // 自定义颜色，可以是字符串或对象 { '0%': '#108ee9', '100%': '#87d068' }
  strokeColor?: string | Record<string, string>
  // 是否显示百分比信息
  showInfo?: boolean
  // 大小，对于 line 类型可以是 number 或 'small' | 'default'
  size?: number | 'small' | 'default'
  // 类型: 'line' | 'circle' | 'dashboard'
  type?: 'line' | 'circle' | 'dashboard'
  // 自定义格式化函数
  format?: (percent?: number) => string
  // 进度条线宽
  strokeWidth?: number
  // 自定义类名
  class?: string
  // 是否固定在 Header 下方
  fixed?: boolean
  // 位置: 'top' | 'bottom'
  position?: 'top' | 'bottom'
  // 自定义 top 位置（仅在 fixed 模式下有效）
  top?: string | number
  // 是否显示圆角（仅对 line 类型有效）
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  percent: 0,
  status: 'normal',
  showInfo: true,
  size: 'default',
  type: 'line',
  strokeWidth: undefined,
  class: '',
  fixed: false,
  position: 'bottom',
  top: undefined,
  rounded: true
})

// 确保 percent 在 0-100 范围内
const normalizedPercent = computed(() => {
  const p = props.percent ?? 0
  if (p < 0) return 0
  if (p > 100) return 100
  return p
})

// 格式化百分比显示
const formattedPercent = computed(() => {
  if (props.format) {
    return props.format(normalizedPercent.value)
  }
  return `${normalizedPercent.value}%`
})

// 容器类名
const containerClass = computed(() => {
  // 如果 class 中包含 h-auto，使用 block 布局避免 inline-flex 带来的行高问题
  const hasAutoHeight = props.class && (props.class.includes('h-auto') || props.class.includes('h-fit'))
  
  if (hasAutoHeight) {
    const classes = ['w-full', 'block', 'h-auto', 'leading-none']
    
    if (props.fixed) {
      classes.push('fixed', 'left-0', 'right-0', 'z-50', 'bg-base-100/95', 'backdrop-blur-sm')
      classes.push('px-4', 'py-2', 'shadow-md')
      
      // 如果指定了自定义 top，不添加 top-0 或 bottom-0，让内联样式生效
      if (props.top === undefined) {
        classes.push(props.position === 'top' ? 'top-0' : 'bottom-0')
      }
      
      if (props.position === 'top') {
        classes.push('border-b', 'border-base-300')
      } else {
        classes.push('border-t', 'border-base-300')
      }
    }
    
    if (props.class) {
      classes.push(props.class)
    }
    
    return classes.join(' ')
  } else {
    const classes = ['w-full', 'inline-flex', 'items-center']
    
    if (!props.fixed) {
      classes.push('h-auto')
    }
    
    if (props.fixed) {
      classes.push('fixed', 'left-0', 'right-0', 'z-50', 'bg-base-100/95', 'backdrop-blur-sm')
      classes.push('px-4', 'py-2', 'shadow-md')
      
      // 如果指定了自定义 top，不添加 top-0 或 bottom-0，让内联样式生效
      if (props.top === undefined) {
        classes.push(props.position === 'top' ? 'top-0' : 'bottom-0')
      }
      
      if (props.position === 'top') {
        classes.push('border-b', 'border-base-300')
      } else {
        classes.push('border-t', 'border-base-300')
      }
    }
    
    if (props.class) {
      classes.push(props.class)
    }
    
    return classes.join(' ')
  }
})

// 容器样式
const containerStyle = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.fixed && props.top !== undefined) {
    styles.top = typeof props.top === 'number' ? `${props.top}px` : props.top
  }
  
  return styles
})

// Line 类型相关计算
const lineProgressClass = computed(() => {
  // 如果 showInfo 为 false，移除 gap-2 以避免额外高度，并设置 leading-none 避免行高影响
  const classes = ['progress-line', 'w-full', 'flex', 'items-start', 'h-auto', 'leading-none']
  if (props.showInfo) {
    classes.push('gap-2')
  }
  return classes
})

const lineOuterClass = computed(() => {
  const classes = ['flex-1', 'relative', 'overflow-hidden', 'bg-base-200', 'min-h-2']
  
  // 根据 rounded 属性决定是否添加圆角
  if (props.rounded) {
    classes.push('rounded-full')
  }
  
  // 根据 size 设置高度
  if (props.size === 'small') {
    classes.push('h-1')
  } else if (typeof props.size === 'number') {
    // 使用内联样式设置高度
  } else {
    classes.push('h-2')
  }
  
  return classes.join(' ')
})

const lineInnerClass = computed(() => {
  const classes = ['h-full', 'transition-all', 'duration-300', 'ease-out', 'relative', 'overflow-hidden']
  
  // 根据 rounded 属性决定是否添加圆角
  if (props.rounded) {
    classes.push('rounded-inherit')
  }
  
  // 根据状态添加类
  if (props.status === 'success') {
    classes.push('bg-success')
  } else if (props.status === 'exception') {
    classes.push('bg-error')
  } else if (props.status === 'active') {
    classes.push('bg-primary')
  } else {
    classes.push('bg-primary')
  }
  
  return classes.join(' ')
})

const lineInnerStyle = computed(() => {
  const styles: Record<string, string> = {
    width: `${normalizedPercent.value}%`
  }
  
  // 自定义颜色
  if (props.strokeColor) {
    if (typeof props.strokeColor === 'string') {
      styles.backgroundColor = props.strokeColor
    } else {
      // 渐变色处理
      const gradientStops = Object.entries(props.strokeColor)
        .sort((a, b) => {
          const aPercent = parseFloat(a[0])
          const bPercent = parseFloat(b[0])
          return aPercent - bPercent
        })
        .map(([percent, color]) => `${color} ${percent}`)
        .join(', ')
      styles.background = `linear-gradient(to right, ${gradientStops})`
    }
  }
  
  // 自定义高度
  if (typeof props.size === 'number') {
    styles.height = `${props.size}px`
  }
  
  return styles
})

const lineActiveClass = computed(() => {
  return ['absolute', 'top-0', 'left-0', 'h-full', 'w-1/3', 'bg-white/30', 'progress-line-active']
})

const lineInfoClass = computed(() => {
  const classes = ['progress-line-info', 'text-sm', 'text-base-content', 'whitespace-nowrap', 'flex-shrink-0']
  
  if (props.size === 'small') {
    classes.push('text-xs')
  }
  
  return classes.join(' ')
})

// Circle 和 Dashboard 类型相关计算
const actualStrokeWidth = computed(() => {
  return props.strokeWidth ?? 6
})

const circleSize = computed(() => {
  if (typeof props.size === 'number') {
    return props.size
  }
  return props.size === 'small' ? 80 : 120
})

const circleCenter = computed(() => {
  return circleSize.value / 2
})

const circleRadius = computed(() => {
  return (circleSize.value - actualStrokeWidth.value) / 2
})

const circleCircumference = computed(() => {
  return 2 * Math.PI * circleRadius.value
})

const circleDashOffset = computed(() => {
  // 圆形：从顶部开始，逆时针
  const offset = circleCircumference.value * (1 - normalizedPercent.value / 100)
  return offset
})

// Dashboard 类型相关计算
const dashboardBackgroundDashArray = computed(() => {
  // 背景显示 3/4 圆
  const dashLength = circleCircumference.value * 0.75
  const gapLength = circleCircumference.value * 0.25
  return `${dashLength} ${gapLength}`
})

const dashboardBackgroundDashOffset = computed(() => {
  // 背景从底部左侧开始（25% 位置）
  return circleCircumference.value * 0.25
})

const dashboardProgressDashArray = computed(() => {
  // 进度条最大长度为 3/4 圆
  const maxLength = circleCircumference.value * 0.75
  const gapLength = circleCircumference.value * 0.25
  return `${maxLength} ${gapLength}`
})

const dashboardDashOffset = computed(() => {
  // Dashboard：从底部左侧开始，顺时针
  const totalLength = circleCircumference.value * 0.75// 先计算总长度（3/4 圆）
  const completedLength = totalLength * (normalizedPercent.value / 100)// 计算已完成的长度
  // 计算偏移量（从底部左侧开始，需要从 25% 位置开始）
  return circleCircumference.value - completedLength + dashboardBackgroundDashOffset.value// 总长度减去已完成长度，再加上起始偏移
})

const strokeLinecap = computed<'round'>(() => {
  return 'round'
})

const circleBgColor = computed(() => { return 'rgba(0, 0, 0, 0.06)'})

const circleStrokeColor = computed(() => {
  if (props.strokeColor && typeof props.strokeColor === 'string') {
    return props.strokeColor
  }
  if (props.status === 'success') {
    return '#52c41a'
  } else if (props.status === 'exception') {
    return '#ff4d4f'
  } else if (props.status === 'active') {
    return '#1890ff'
  }
  return '#1890ff'
})

const circleProgressClass = computed(() => {
  return ['progress-circle', 'relative', 'inline-flex', 'items-center', 'justify-center']
})

const circleSvgClass = computed(() => {return ['-rotate-90']})

const circleStrokeClass = computed(() => {
  const classes: string[] = []
  if (props.status === 'active') {
    classes.push('animate-pulse')
  }
  return classes.join(' ')
})

const circleInfoClass = computed(() => {
  const classes = ['progress-circle-info', 'absolute', 'inset-0', 'flex', 'items-center', 'justify-center', 'text-base-content']
  
  if (props.size === 'small') {
    classes.push('text-xs')
  } else {
    classes.push('text-sm')
  }
  
  return classes.join(' ')
})
</script>

<template>
  <div :class="containerClass" :style="containerStyle">
    <!-- Line 类型进度条 -->
    <div v-if="type === 'line'" :class="lineProgressClass">
      <div :class="lineOuterClass">
        <div :class="lineInnerClass" :style="lineInnerStyle">
          <div v-if="status === 'active'" :class="lineActiveClass"></div>
        </div>
      </div>
      <div v-if="showInfo" :class="lineInfoClass">
        {{ formattedPercent }}
      </div>
    </div>
    
    <!-- Circle 类型进度条 -->
    <div v-else-if="type === 'circle'" :class="circleProgressClass">
      <svg :width="circleSize" :height="circleSize" :class="circleSvgClass">
        <circle :cx="circleCenter" :cy="circleCenter" :r="circleRadius" :stroke-width="actualStrokeWidth"
          :stroke="circleBgColor" fill="none" class="progress-circle-bg" />
        <circle :cx="circleCenter" :cy="circleCenter" :r="circleRadius" :stroke-width="actualStrokeWidth"
          :stroke="circleStrokeColor" fill="none" :stroke-dasharray="circleCircumference"
          :stroke-dashoffset="circleDashOffset" :stroke-linecap="strokeLinecap" class="progress-circle-stroke" :class="circleStrokeClass"/>
      </svg>
      <div v-if="showInfo" :class="circleInfoClass">
        {{ formattedPercent }}
      </div>
    </div>
    
    <!-- Dashboard 类型进度条 -->
    <div v-else-if="type === 'dashboard'" :class="circleProgressClass">
      <svg :width="circleSize" :height="circleSize" :class="circleSvgClass">
        <!-- 背景圆（3/4 圆） -->
        <circle :cx="circleCenter" :cy="circleCenter" :r="circleRadius" :stroke-width="actualStrokeWidth" :stroke="circleBgColor" 
        fill="none" :stroke-dasharray="dashboardBackgroundDashArray" :stroke-dashoffset="dashboardBackgroundDashOffset" class="progress-circle-bg"/>
        <!-- 进度圆（从底部左侧开始） -->
        <circle :cx="circleCenter" :cy="circleCenter" :r="circleRadius" :stroke-width="actualStrokeWidth" :stroke="circleStrokeColor"
          fill="none" :stroke-dasharray="dashboardProgressDashArray" :stroke-dashoffset="dashboardDashOffset"
          :stroke-linecap="strokeLinecap"  class="progress-circle-stroke" :class="circleStrokeClass"/>
      </svg>
      <div v-if="showInfo" :class="circleInfoClass">
        {{ formattedPercent }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Line 类型 active 状态动画 */
.progress-line-active {
  animation: progress-active 1.4s ease-in-out infinite;
}

@keyframes progress-active {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

/* Circle 和 Dashboard 类型 SVG 元素的 transition */
/* SVG 元素的特殊属性 transition 需要保留在 CSS 中 */
.progress-circle-bg {
  transition: stroke-dashoffset 0.3s ease;
}

.progress-circle-stroke {
  transition: stroke-dashoffset 0.3s ease, stroke 0.3s ease;
}
</style>
