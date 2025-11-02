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
  direction?: 'horizontal' | 'vertical'// 方向
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'// 尺寸
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'// 颜色
  variant?: 'solid' | 'outline' | 'transparent'// 变体
  shape?: 'rounded' | 'square' | 'circle'// 形状
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'// 间距
  disabled?: boolean// 是否禁用
  readonly?: boolean// 是否只读
  maxButtons?: number// 最大按钮数量
  showDivider?: boolean// 是否显示分隔线
  collapsible?: boolean// 是否可折叠
  showCount?: boolean// 是否显示数量
  rounded?: boolean// 是否启用圆角
  customClass?: string// 自定义类名
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
  rounded: true,
  customClass: ''
})

// 基础按钮组样式
const baseClasses = computed(() => {
  return [
    'inline-flex relative align-middle',
    props.direction === 'vertical' ? 'flex-col' : 'flex-row',// 方向
    props.collapsible ? 'flex-wrap' : '',// 可折叠
    props.disabled ? 'opacity-60' : '',
    props.readonly ? 'pointer-events-none' : '',
    props.customClass// 自定义类名
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

// 圆角类名
const roundedClasses = computed(() => {
  if (!props.rounded) return ''
  return 'group-rounded'
})

// 最终样式组合
const buttonGroupClasses = computed(() => {
  return [
    'group',
    baseClasses.value,
    spacingClasses.value,
    dividerClasses.value,
    responsiveClasses.value,
    countClasses.value,
    maxButtonsClasses.value,
    roundedClasses.value
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
/* 按钮圆角处理 - 横向排布 */
.group.group-rounded.flex-row :deep(> *:first-child) {
  border-top-left-radius: var(--rounded-btn, 0.5rem);
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--rounded-btn, 0.5rem);
  border-bottom-right-radius: 0;
}

.group.group-rounded.flex-row :deep(> *:not(:first-child):not(:last-child)) {
  border-radius: 0;
}

.group.group-rounded.flex-row :deep(> *:last-child) {
  border-top-left-radius: 0;
  border-top-right-radius: var(--rounded-btn, 0.5rem);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: var(--rounded-btn, 0.5rem);
}

/* 按钮圆角处理 - 纵向排布 */
.group.group-rounded.flex-col :deep(> *:first-child) {
  border-top-left-radius: var(--rounded-btn, 0.5rem);
  border-top-right-radius: var(--rounded-btn, 0.5rem);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.group.group-rounded.flex-col :deep(> *:not(:first-child):not(:last-child)) {
  border-radius: 0;
}

.group.group-rounded.flex-col :deep(> *:last-child) {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--rounded-btn, 0.5rem);
  border-bottom-right-radius: var(--rounded-btn, 0.5rem);
}

/* Outline 变体的边框处理 */
.group.group-rounded.flex-row :deep(> *:not(:first-child).btn-outline),
.group.group-rounded.flex-row :deep(> *:not(:first-child)[variant="outline"]) {
  border-left: 0;
}

.group.group-rounded.flex-col :deep(> *:not(:first-child).btn-outline),
.group.group-rounded.flex-col :deep(> *:not(:first-child)[variant="outline"]) {
  border-top: 0;
}

/* 焦点管理 */
.group :deep(> *:focus) {
  z-index: 10;
}

.group :deep(> *:hover) {
  z-index: 10;
}

.group :deep(> *.active) {
  z-index: 20;
}

/* 过渡动画 */
.group :deep(> *) {
  transition: all 0.2s ease-in-out;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .group.flex-wrap {
    flex-direction: column;
  }
  
  .group.flex-wrap :deep(> *) {
    width: 100%;
    margin-top: 0.25rem;
  }
  
  .group.flex-wrap :deep(> *:first-child) {
    margin-top: 0;
  }
  
  /* 响应式时圆角需要重新计算 */
  .group.group-rounded.flex-wrap :deep(> *:first-child) {
    border-top-left-radius: var(--rounded-btn, 0.5rem);
    border-top-right-radius: var(--rounded-btn, 0.5rem);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  .group.group-rounded.flex-wrap :deep(> *:not(:first-child):not(:last-child)) {
    border-radius: 0;
  }
  
  .group.group-rounded.flex-wrap :deep(> *:last-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: var(--rounded-btn, 0.5rem);
    border-bottom-right-radius: var(--rounded-btn, 0.5rem);
  }
}
</style>