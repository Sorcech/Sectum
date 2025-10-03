<template>
  <div 
    :class="buttonGroupClasses"
    :style="buttonGroupStyles"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  // 方向
  direction?: 'horizontal' | 'vertical'
  // 尺寸
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  // 颜色
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  // 变体
  variant?: 'solid' | 'outline' | 'transparent'
  // 形状
  shape?: 'rounded' | 'square' | 'circle'
  // 间距
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  // 是否禁用
  disabled?: boolean
  // 是否只读
  readonly?: boolean
  // 最大按钮数量
  maxButtons?: number
  // 是否显示分隔线
  showDivider?: boolean
  // 是否可折叠
  collapsible?: boolean
  // 是否显示数量
  showCount?: boolean
  // 自定义类名
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  size: 'md',
  color: 'primary',
  variant: 'solid',
  shape: 'rounded',
  spacing: 'none',
  disabled: false,
  readonly: false,
  maxButtons: 0,
  showDivider: false,
  collapsible: false,
  showCount: false,
  customClass: ''
})

// 基础按钮组样式
const baseClasses = computed(() => {
  return [
    'inline-flex relative align-middle',
    // 方向
    props.direction === 'vertical' ? 'flex-col' : 'flex-row',
    // 可折叠
    props.collapsible ? 'flex-wrap' : '',
    // 状态
    props.disabled ? 'opacity-60' : '',
    props.readonly ? 'pointer-events-none' : '',
    // 自定义类名
    props.customClass
  ].filter(Boolean).join(' ')
})

// 按钮间距样式
const spacingClasses = computed(() => {
  if (props.spacing === 'none') return ''
  
  const spacings = {
    xs: props.direction === 'vertical' ? 'space-y-0.5' : 'space-x-0.5',
    sm: props.direction === 'vertical' ? 'space-y-1' : 'space-x-1',
    md: props.direction === 'vertical' ? 'space-y-2' : 'space-x-2',
    lg: props.direction === 'vertical' ? 'space-y-3' : 'space-x-3',
    xl: props.direction === 'vertical' ? 'space-y-4' : 'space-x-4'
  }
  return spacings[props.spacing] || ''
})

// 分隔线样式
const dividerClasses = computed(() => {
  if (!props.showDivider) return ''
  
  return props.direction === 'vertical' 
    ? 'divide-y divide-current/30' 
    : 'divide-x divide-current/30'
})

// 响应式折叠样式
const responsiveClasses = computed(() => {
  if (!props.collapsible) return ''
  
  return 'sm:flex-col sm:space-x-0 sm:space-y-1'
})

// 数量显示样式
const countClasses = computed(() => {
  if (!props.showCount) return ''
  
  return 'relative after:absolute after:-top-2 after:-right-2 after:bg-error after:text-error-content after:rounded-full after:w-6 after:h-6 after:flex after:items-center after:justify-center after:text-xs after:font-bold'
})

// 最大按钮数量限制样式
const maxButtonsClasses = computed(() => {
  if (props.maxButtons <= 0) return ''
  
  return `[&>*:nth-child(n+${props.maxButtons + 1})]:hidden`
})

// 最终样式组合
const buttonGroupClasses = computed(() => {
  return [
    baseClasses.value,
    spacingClasses.value,
    dividerClasses.value,
    responsiveClasses.value,
    countClasses.value,
    maxButtonsClasses.value
  ].filter(Boolean).join(' ')
})

// 计算按钮组样式
const buttonGroupStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // 最大按钮数量限制
  if (props.maxButtons > 0) {
    styles['--max-buttons'] = props.maxButtons.toString()
  }
  
  return styles
})

// 暴露给父组件的方法
defineExpose({
  // 获取按钮数量
  getButtonCount: () => {
    return document.querySelectorAll('.btn-group .btn').length
  },
  // 检查是否超过最大按钮数量
  isOverMaxButtons: () => {
    if (props.maxButtons <= 0) return false
    return document.querySelectorAll('.btn-group .btn').length > props.maxButtons
  },
  // 获取按钮组配置
  getConfig: () => {
    return {
      direction: props.direction,
      size: props.size,
      color: props.color,
      variant: props.variant,
      shape: props.shape,
      spacing: props.spacing,
      disabled: props.disabled,
      readonly: props.readonly,
      maxButtons: props.maxButtons,
      showDivider: props.showDivider,
      collapsible: props.collapsible,
      showCount: props.showCount
    }
  }
})
</script>

<style scoped>
/* 按钮圆角处理 - 使用纯CSS */
.btn-group :deep(.btn:first-child) {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0;
}

.btn-group :deep(.btn:not(:first-child):not(:last-child)) {
  border-radius: 0;
}

.btn-group :deep(.btn:last-child) {
  border-top-left-radius: 0;
  border-top-right-radius: 0.375rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0.375rem;
}

.btn-group :deep(.btn:not(:first-child).btn-outline) {
  border-left: 0;
}

/* 垂直方向的圆角处理 */
.btn-group.flex-col :deep(.btn:first-child) {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.btn-group.flex-col :deep(.btn:not(:first-child):not(:last-child)) {
  border-radius: 0;
}

.btn-group.flex-col :deep(.btn:last-child) {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

/* 焦点管理 */
.btn-group :deep(.btn:focus) {
  z-index: 10;
}

.btn-group :deep(.btn:hover) {
  z-index: 10;
}

.btn-group :deep(.btn.active) {
  z-index: 20;
}

/* 过渡动画 */
.btn-group :deep(.btn) {
  transition: all 0.2s ease-in-out;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .btn-group.flex-wrap {
    flex-direction: column;
  }
  
  .btn-group.flex-wrap :deep(.btn) {
    width: 100%;
    margin-top: 0.25rem;
  }
  
  .btn-group.flex-wrap :deep(.btn:first-child) {
    margin-top: 0;
  }
}
</style>