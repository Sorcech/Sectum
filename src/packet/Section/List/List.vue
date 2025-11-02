<script lang="ts" setup>
import { computed } from 'vue'
  
const props = defineProps({
  // 列表方向
  direction: {
    type: String as () => 'vertical' | 'horizontal',
    default: 'vertical',
    validator: (value: string) => ['vertical', 'horizontal'].includes(value)
  },
  // 间距
  spacing: {
    type: String as () => 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    default: 'md',
    validator: (value: string) => ['none', 'xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  
  divider: { type: Boolean,default: false},// 是否显示分割线
  bordered: { type: Boolean,default: false},// 是否显示边框
  shadow: { type: Boolean,default: false},// 是否显示阴影
  rounded: { type: Boolean,default: false},// 是否显示圆角
  bg: { type: String,default: 'base-200'},// 背景颜色
})

// 基础列表样式
const baseClasses = computed(() => {
  return [
    'list',
    'w-full',
    'list-none',
    'p-0',
    'm-0',
    props.direction === 'horizontal' ? 'flex flex-row' : 'flex flex-col',
    props.bordered ? 'border border-base-300 dark:border-dark-base-300' : '',
    props.shadow ? 'shadow-md' : '',
    props.rounded ? 'rounded-$rounded-btn' : '',
    `bg-${props.bg} dark:bg-dark-${props.bg}`
  ].filter(Boolean).join(' ')
})

// 间距样式
const spacingClasses = computed(() => {
  if (props.spacing === 'none') return ''
  
  const spacings = {
    xs: props.direction === 'horizontal' ? 'gap-0.5' : 'gap-0.5',
    sm: props.direction === 'horizontal' ? 'gap-1' : 'gap-1',
    md: props.direction === 'horizontal' ? 'gap-2' : 'gap-2',
    lg: props.direction === 'horizontal' ? 'gap-3' : 'gap-3',
    xl: props.direction === 'horizontal' ? 'gap-4' : 'gap-4'
  }
  return spacings[props.spacing] || ''
})

// 分割线样式
const dividerClasses = computed(() => {
  if (!props.divider) return ''
  
  return props.direction === 'horizontal' 
    ? 'divide-x divide-base-300 dark:divide-dark-base-300' 
    : 'divide-y divide-base-300 dark:divide-dark-base-300'
})

// 最终样式组合
const listClasses = computed(() => {
  return [
    baseClasses.value,
    spacingClasses.value,
    dividerClasses.value
  ].filter(Boolean).join(' ')
})
</script>

<template>
  <ul :class="listClasses">
    <slot />
  </ul>
</template>

<style scoped>
.list :deep(li) {
  list-style: none;
}

/* 列表项默认样式 - 转换为 UnoCSS 对应的 CSS 值 */
.list :deep(li > *) {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  color: var(--base-content);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.list :deep(li > *:hover) {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .list :deep(li > *:hover) {
  background-color: rgba(255, 255, 255, 0.05);
}

/* 水平列表项样式 */
.list.flex-row :deep(li > *) {
  width: auto;
  padding: 0.5rem 1rem;
}
</style>
