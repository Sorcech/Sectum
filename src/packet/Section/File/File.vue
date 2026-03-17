<script lang="ts" setup>
import { computed } from 'vue'
import { Store } from '~/packet/Config/storage'

const props = defineProps({
  direction: { type: String, default: 'row', required: false },
  size: {
    type: String, default: 'md', required: false,
    validator: (value: string) => { return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value) }
  },
  label: { type: String, required: false },
  labelWidth: { type: String, default: 'w-1/3', required: false },
  files: { 
    type: Array<{ 
      Name: string
      Link?: string
      DownloadUrl?: string
      [key: string]: any
    }>, 
    required: false 
  }
})

const emit = defineEmits<{
  'delete': [file: { Name: string; Link?: string; DownloadUrl?: string; [key: string]: any }, index: number]
}>()

// 容器方向样式类
const containerClasses = computed(() => {
  if (props.direction === 'col') {
    return 'flex flex-col'
  } else {
    return 'flex flex-row w-full items-center'
  }
})

// 标签样式类
const labelClasses = computed(() => {
  return [
    'select-none py-2',
    props.label ? (props.labelWidth || 'w-1/3') : '',
    props.direction === 'row' ? 'pr-2 flex-shrink-0' : ''
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
  const classes = []
  if (props.direction === 'row' && props.label) {
    classes.push('flex-1', 'min-w-0')
  } else {
    classes.push('w-full')
  }
  return classes.join(' ')
})

// 文件项样式类
const fileItemClasses = computed(() => {
  return [
    'flex items-center pl-2 p-1 rounded-$rounded-btn',
    'bg-gray-100 ',
    'hover:bg-base-200',
    'min-w-0'
  ].join(' ')
})

// 处理文件删除
const handleDelete = (file: any, index: number) => {
  emit('delete', file, index)
}

// 处理文件下载（携带 token）
const handleDownload = async (url: string, fileName: string) => {
  try {
    // 获取 token
    const token = Store.getLocalStorage('Token')
    
    // 构建请求头
    const headers: HeadersInit = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    // 发送 GET 请求
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    })
    
    if (!response.ok) {
      throw new Error(`下载失败: ${response.status} ${response.statusText}`)
    }
    
    // 获取响应数据并转换为 Blob
    const blob = await response.blob()
    
    // 创建下载链接
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    
    // 清理
    document.body.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    console.error('文件下载失败:', error)
    alert(`文件下载失败: ${error instanceof Error ? error.message : '未知错误'}`)
  }
}
</script>

<template>
  <div :class="containerClasses">
    <label v-if="label" :class="labelClasses">
      <span :class="labelTextClasses">{{ label }}</span>
    </label>
    <div v-show="files" :class="filesContainerClasses">
      <li v-for="(item, index) in files" :key="index" :class="fileItemClasses">
        <span class="text-sm truncate hover:underline min-w-0 flex-1">
          <a 
            v-if="item.DownloadUrl"
            href="#" 
            class="hover:underline cursor-pointer truncate block"
            @click.prevent="handleDownload(item.DownloadUrl, item.Name)"
          >
            {{ item.Name }}
          </a>
          <a 
            v-else-if="item.Link"
            :href="item.Link" 
            class="hover:underline truncate block"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.Name }}
          </a>
          <span v-else class="truncate block">{{ item.Name }}</span>
        </span>
        <btn
          v-if="item.Name && item.Name.trim() !== ''"
          clean
          @click.stop="handleDelete(item, index)"
          :title="'删除文件'"
        >
          <icn name="trash-can" light sm class="hover:text-error"></icn>
        </btn>
      </li>
    </div>
  </div>
</template>