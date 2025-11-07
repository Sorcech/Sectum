<template>
  <div class="absolute bottom-0 left-0 right-0 flex flex-row rounded-$rounded-btn h-14 items-center bg-gray-500 dark:bg-gray-700 ml-5 mr-7">
    <span class="px-4 text-base-content dark:text-light-500">
      <icn name="plus" light lg />
    </span>
    <ipt 
      class="w-full h-10 pr-2" 
      :bordered="false" 
      ghost 
      :placeholder="placeholder || '添加任务'" 
      v-model="taskTitle"
      @keyup.enter="addTask()" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TaskCreate } from './Task.vue'

interface Props {
  taskInput: (task: TaskCreate) => void | Promise<void>
  placeholder?: string
  defaultProject?: number
  defaultDays?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '添加任务',
  defaultProject: 1,
  defaultDays: 7
})

const taskTitle = ref('')

const addTask = async () => {
  if (!taskTitle.value.trim()) return
  
  const task: TaskCreate = {
    Name: taskTitle.value.trim(),
    Project: props.defaultProject,
    EndAt: new Date(Date.now() + props.defaultDays * 24 * 60 * 60 * 1000).toISOString()
  }
  
  // 调用父组件传递的任务添加函数
  // 这个函数会通过 Task.vue -> TaskService.Create -> localStorage
  await props.taskInput(task)
  
  // 清空输入框
  taskTitle.value = ''
}
</script>

