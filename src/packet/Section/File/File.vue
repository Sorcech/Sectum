<template>
  <div :class="containerClasses">
    <label v-if="label" :class="labelClasses">
      <span :class="labelTextClasses">{{ label }}</span>
    </label>
    <div v-show="files" :class="filesContainerClasses">
      <li v-for="(item, index) in files" :key="index" :class="fileItemClasses">
        <span :class="fileLinkClasses">
          <a :href="item.Link" class="hover:underline">{{ item.Name }}</a>
        </span>
      </li>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  direction: { type: String, default: 'row', required: false },
  size: {
    type: String, default: 'md', required: false,
    validator: (value: string) => { return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value) }
  },
  label: { type: String, required: false },
  labelWidth: { type: String, default: 'w-4/9', required: false },
  files: { type: Array<{ Name: string; Link: string }>, required: false }
})

// 容器方向样式类
const containerClasses = computed(() => {
  return props.direction === 'col' ? 'flex flex-col' : 'flex flex-row w-full'
})

// 标签样式类
const labelClasses = computed(() => {
  return [
    'select-none py-2 px-1',
    props.label ? props.labelWidth : ''
  ].filter(Boolean).join(' ')
})

// 标签文本大小样式类
const labelTextClasses = computed(() => {
  const sizeMap = {
    xs: 'text-xs',
    sm: 'text-sm', 
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  return sizeMap[props.size as keyof typeof sizeMap] || 'text-base'
})

// 文件列表容器样式类
const filesContainerClasses = computed(() => {
  return 'w-95'
})

// 文件项样式类
const fileItemClasses = computed(() => {
  return [
    'flex pl-3 p-1 rounded-$rounded-btn',
    'bg-gray-100 dark:bg-gray-700',
    'hover:bg-base-300 dark:hover:bg-gray-600'
  ].join(' ')
})

// 文件链接样式类
const fileLinkClasses = computed(() => {
  return 'text-sm truncate hover:underline'
})
</script>