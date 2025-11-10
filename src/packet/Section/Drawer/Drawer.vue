<template>
    <msk :show="isShow && backdrop" @click="closeDrawer" blur/>
    <tst :name="animationName">
      <div v-if="isShow" class="fixed z-15 flex-none bg-base-300" :class="[positionClasses, sizeClasses]">
        <div class="flex items-center justify-between bg-base-100 px-2 h-10 text-base-content" >
          <span class="font-medium text-lg">{{ title }}</span>
          <btn item class="hover:text-primary " @click="closeDrawer">
            <icn name="xmark" regular xl  />
          </btn>
        </div>
        <div :class="['text-base-content', overflow ? 'overflow-y-auto' : '']" :style="contentStyle">
          <slot></slot>
        </div>
      </div>
    </tst>
</template>
<style scoped>
</style>
<script setup lang="ts">
import { computed } from 'vue'

// 偏移量类型定义
type OffsetValue = number | string
type OffsetConfig = {
  top?: OffsetValue
  right?: OffsetValue
  bottom?: OffsetValue
  left?: OffsetValue
}

const props = defineProps({
  isShow: { type: Boolean, default: false, required: false }, 
  title: { type: String, default: 'Title', required: false },
  width: { type: String, default: 'w-32', required: false },
  height: { type: String, required: false },
  backdrop: { type: Boolean, default: true, required: false },
  position: { 
    type: String, 
    default: 'right',
    validator: (value: string) => ['top', 'right', 'bottom', 'left'].includes(value)
  },
  // 偏移量配置：可以是数字（统一偏移）、对象（各方向偏移）或数组（方向-偏移对）
  offset: {
    type: [Number, String, Object, Array] as any,
    default: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
    required: false
  },
  // 是否允许内容区域滚动
  overflow: { type: Boolean, default: false, required: false }
})

// 支持 v-model
const isShow = computed({
  get: () => props.isShow,
  set: (value: boolean) => emit('update:isShow', value)
})
const emit = defineEmits(['update:isShow'])

// 动画名称
const animationName = computed(() => {
  const animationMap = {
    top: 'downward',
    right: 'leftward', 
    bottom: 'upward',
    left: 'rightward'
  }
  return animationMap[props.position as keyof typeof animationMap] || 'leftward'
})

// 获取偏移量值（转换为 Tailwind 类名格式）
const getOffsetClass = (offset: OffsetValue | undefined, direction: 'top' | 'right' | 'bottom' | 'left'): string => {
  if (offset === undefined || offset === null) {
    return `${direction}-0`
  }
  
  if (typeof offset === 'number') {
    return `${direction}-${offset}`
  }
  
  if (typeof offset === 'string') {
    // 如果已经是类名格式（如 'right-14'），直接返回
    if (offset.includes('-')) {
      return offset
    }
    // 否则作为数字处理
    return `${direction}-${offset}`
  }
  
  return `${direction}-0`
}

// 解析偏移量配置
const parseOffset = (offset: any): OffsetConfig => {
  // 如果是数字或字符串，统一应用到所有方向
  if (typeof offset === 'number' || (typeof offset === 'string' && !offset.includes('-'))) {
    const numValue = typeof offset === 'number' ? offset : parseInt(offset) || 0
    return { top: numValue, right: numValue, bottom: numValue, left: numValue }
  }
  
  // 如果是数组格式：[{ position: 'top', offset: 0 }, ...]
  if (Array.isArray(offset)) {
    const config: OffsetConfig = {}
    offset.forEach((item: any) => {
      if (item.position && (item.offset !== undefined || item.value !== undefined)) {
        const pos = item.position as 'top' | 'right' | 'bottom' | 'left'
        config[pos] = item.offset ?? item.value
      }
    })
    return { top: 0, right: 0, bottom: 0, left: 0, ...config }
  }
  
  // 如果是对象格式：{ top: 0, right: 0, ... }
  if (typeof offset === 'object' && offset !== null) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...offset }
  }
  
  // 默认值
  return { top: 0, right: 0, bottom: 0, left: 0 }
}

// 位置样式类
const positionClasses = computed(() => {
  const offsetConfig = parseOffset(props.offset)
  const currentPosition = props.position as 'top' | 'right' | 'bottom' | 'left'
  
  const positionMap = {
    top: `${getOffsetClass(offsetConfig.top, 'top')} ${getOffsetClass(offsetConfig.left, 'left')} ${getOffsetClass(offsetConfig.right, 'right')}`,
    right: `${getOffsetClass(offsetConfig.top, 'top')} ${getOffsetClass(offsetConfig.right, 'right')} h-screen`,
    bottom: `${getOffsetClass(offsetConfig.bottom, 'bottom')} ${getOffsetClass(offsetConfig.left, 'left')} ${getOffsetClass(offsetConfig.right, 'right')}`,
    left: `${getOffsetClass(offsetConfig.top, 'top')} ${getOffsetClass(offsetConfig.left, 'left')} h-screen`
  }
  
  return positionMap[currentPosition] || positionMap.right
})

// 尺寸样式类
const sizeClasses = computed(() => {
  if (props.position === 'top' || props.position === 'bottom') {
    return props.height || 'h-96'
  } else {
    // 确保宽度被正确应用，并添加最大宽度限制（最大不超过屏幕宽度的 80%）
    // 使用 max-w-4xl 作为最大宽度限制，避免占据全屏
    return `${props.width} max-w-4xl`
  }
})


// 内容区域样式
const contentStyle = computed(() => {
  // 内容区域应该占据剩余高度（减去标题栏的 h-10 = 2.5rem = 40px）
  return {
    height: 'calc(100% - 2.5rem)',
    display: 'flex',
    flexDirection: 'column' as const
  }
})

const closeDrawer = () => {
  emit('update:isShow', false)
}
</script>