<template>
  <div :class="containerClasses">
    <label v-if="label" class="select-none py-2 px-1" :class="[label ? labelWidth : '']">
      <span :class="[`text-${size}`]">{{ label }}</span>
    </label>
    <div class="w-95">
      <div v-show="files" class="py-1">
        <li v-for="(item, index) in files" :key="index"
          class="flex align-middle justify-between w-full hover:bg-base-300 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-1 rounded-$rounded-btn">
          <span class="text-sm truncate"><a :href="item.Link">{{ item.Name }}</a></span>
          <span class="cursor-pointer hover:text-primary" @click="deleteAppendix(item.AppendixId)">
            <icn name="trash-can" light md></icn>
          </span>
        </li>
      </div>
      <div>
        <input type="file" ref="inRef" class="hidden" @change="inChange" :multiple="multiple">
        <btn size="sm" @click="fileUpload" class="w-full">
          <icn name="file-arrow-up" light lg v-show="icon"></icn>
          <span class="px-1">{{ button }}</span>
        </btn>
      </div>
      <div v-show="list">
        <li v-for="(item, index) in fileList" :key="index" class="flex align-middle justify-between w-full">
          <span>{{ item.name }}</span>
          <span class="cursor-pointer hover:text-primary" @click="deleteFile(index)">
            <icn name="trash-can" light lg></icn>
          </span>
        </li>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'

// 定义接口类型
interface FileItem {
  Link: string
  Name: string
  AppendixId: number
}

const props = defineProps({
  direction: { type: String, default: 'row', required: false },
  multiple: { type: Boolean, default: false, required: false },
  button: { type: String, default: 'Upload', required: false },
  icon: { type: Boolean, default: false, required: false },
  list: { type: Boolean, default: false, required: false },
  size: {
    type: String, default: 'md', required: false,
    validator: (value: string) => { return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value) }
  },
  label: { type: String, required: false },
  labelWidth: { type: String, default: 'w-4/9', required: false },
  files: { type: Array as () => FileItem[], required: false }
})

// 容器样式计算属性 - 将CSS转换为UnoCSS原子类
const containerClasses = computed(() => {
  if (props.direction === 'col') {
    return 'flex flex-col w-full'
  }
  // 默认row方向
  return 'flex flex-row justify-between items-center w-full'
})

const emit = defineEmits(['change', 'delete'])
const inRef = ref<HTMLInputElement>()
const fileList = reactive<File[]>([])

const fileUpload = () => {
  inRef.value?.click()
}

const inChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    fileList.unshift(...Array.from(target.files))
    emit('change', fileList)
  }
}

const deleteFile = (index: number) => {
  fileList.splice(index, 1)
}

const deleteAppendix = (index: number) => {
  emit('delete', index)
}
</script>
