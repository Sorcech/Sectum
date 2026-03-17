<script setup lang="ts" >
import { reactive, ref, computed } from 'vue'
import { Storage } from '~/packet/Section/Upload/storage'
import type { StorageUploadRes, StorageUploadsRes } from '~/packet/Section/Upload/StorageType'
import Toast from '~/packet/Element/Toast/Toast'

const props = defineProps({
  direction: { type: String, default: 'row', required: false },
  multiple: { type: Boolean, default: false, required: false },
  button: { type: String, default: 'Upload', required: false },
  icon: { type: Boolean, default: false, required: false },
  list: { type: Boolean, default: false, required: false },
  autoUpload: { type: Boolean, default: true, required: false }, // 是否自动上传
  size: {
    type: String, default: 'md', required: false,
    validator: (value: string) => { return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value) }
  },
  label: { type: String, required: false },
  labelWidth: { type: String, default: 'w-1/3', required: false },
  fileIds: { type: Array as () => number[], required: false },
  fileNames: { type: Array as () => string[], required: false },
  fileLinks: { type: Array as () => string[], required: false }
})

// 容器样式计算属性 - 将CSS转换为UnoCSS原子类
const containerClasses = computed(() => {
  if (props.direction === 'col') {
    return 'flex flex-col w-full'
  }
  // 默认row方向
  return 'flex flex-row justify-between items-center w-full'
})

const emit = defineEmits<{
  change: [files: File[]]
  delete: [fileId: number]
  uploadSuccess: [result: StorageUploadRes | StorageUploadsRes[]]
  uploadError: [error: any]
}>()

const inRef = ref<HTMLInputElement>()
const fileList = reactive<File[]>([])
const uploading = ref(false)
const uploadedFiles = reactive<(StorageUploadRes | StorageUploadsRes)[]>([])

const fileUpload = () => {
  inRef.value?.click()
}

const inChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    const newFiles = Array.from(target.files)
    fileList.unshift(...newFiles)
    emit('change', fileList)
    
    // 如果启用自动上传，立即上传文件
    if (props.autoUpload) {
      await uploadFiles(newFiles)
    }
  }
  
  // 清空 input 的值，允许重复选择同一文件
  if (inRef.value) {
    inRef.value.value = ''
  }
}

/**
 * 上传文件
 */
const uploadFiles = async (files: File[]) => {
  if (files.length === 0) return
  
  uploading.value = true
  try {
    if (props.multiple && files.length > 1) {
      // 多文件上传
      const results = await Storage.Uploads(files)
      uploadedFiles.push(...results)
      emit('uploadSuccess', results)
      Toast({ type: 'success', message: `成功上传 ${results.length} 个文件` })
    } else {
      // 单文件上传（即使 multiple=true，如果只有一个文件也使用单文件接口）
      const file = files[0]
      const result = await Storage.Upload(file)
      uploadedFiles.push(result)
      emit('uploadSuccess', result)
      Toast({ type: 'success', message: '文件上传成功' })
    }
  } catch (error: any) {
    console.error('File upload error:', error)
    const errorMessage = error?.response?.data?.Message ?? error?.response?.data?.message ?? error?.message ?? '文件上传失败'
    emit('uploadError', error)
    Toast({ type: 'error', message: errorMessage })
  } finally {
    uploading.value = false
  }
}

const deleteFile = (index: number) => {
  fileList.splice(index, 1)
  // 同时删除对应的上传结果
  if (uploadedFiles[index]) {
    uploadedFiles.splice(index, 1)
  }
  emit('change', fileList)
}

const deleteAppendix = (index: number) => {
  emit('delete', index)
}

/**
 * 清空文件列表
 */
const clearFiles = () => {
  fileList.splice(0, fileList.length)
  uploadedFiles.splice(0, uploadedFiles.length)
  emit('change', [])
}

// 暴露方法供父组件调用
defineExpose({
  clearFiles
})
</script>

<template>
  <div class="w-full flex flex-col min-w-0 max-w-full box-border">
    <div :class="containerClasses">
      <label v-if="label" class="select-none py-2 pr-2 flex-shrink-0" :class="[label ? labelWidth : '']">
        <span :class="[`text-${size}`]">{{ label }}</span>
      </label>
      <div class="flex-1 min-w-0">
        <div v-show="fileIds && fileIds.length > 0" class="py-1">
          <li v-for="(fileId, index) in fileIds" :key="index"
            class="flex align-middle justify-between w-full hover:bg-base-300 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-1 rounded-$rounded-btn">
            <span class="text-sm truncate"><a :href="fileLinks?.[index]">{{ fileNames?.[index] }}</a></span>
            <span class="cursor-pointer hover:text-primary" @click="deleteAppendix(fileId)">
              <icn name="trash-can" light md></icn>
            </span>
          </li>
        </div>
        <div class="w-full">
          <input type="file" ref="inRef" class="hidden" @change="inChange" :multiple="multiple">
          <btn size="sm" @click="fileUpload" class="w-full">
            <icn name="file-arrow-up" light lg v-show="icon"></icn>
            <span class="px-1">{{ button }}</span>
          </btn>
        </div>
      </div>
    </div>
    <!-- 文件列表显示在 label 和 button 下方 -->
    <div v-show="list && fileList.length > 0" class="mt-4 mb-4 bg-base-200 rounded-lg p-3 space-y-2 w-full min-w-0 max-w-full box-border">
      <div v-for="(item, index) in fileList" :key="index"
        class="flex items-center gap-2 w-full min-w-0 max-w-full bg-base-100 rounded-md hover:bg-base-300 p-2 transition-colors box-border">
        <span class="text-sm text-base-content flex-1 min-w-0 overflow-hidden" 
        :title="item.name" style="text-overflow: ellipsis; white-space: nowrap;">{{ item.name }}</span>
        <span class="cursor-pointer hover:text-error text-base-content/60 flex-shrink-0" @click="deleteFile(index)" :title="'删除'">
          <icn name="trash-can" light sm></icn>
        </span>
      </div>
    </div>
  </div>
</template>
