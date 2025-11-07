<template>
  <div class="overflow-y-auto h-full">
    <li 
      v-for="(item, index) in taskList" 
      :key="item.TaskId || index"
      v-show="!item.IsCompleted || isHideCompleted"
      class="flex flex-row justify-between my-2 h-12 rounded-$rounded-btn bg-base-200 hover:bg-gray-300 dark:hover:bg-gray-700 shadow-sm mx-5"
      :class="[item.IsCompleted ? 'bg-gray-300 dark:bg-gray-700' : '']" 
      @mouseenter="() => showDeleteButtons[item.TaskId || index] = true"
      @mouseleave="() => showDeleteButtons[item.TaskId || index] = false"
    >
      <section class="flex flex-row w-6/7 justify-between">
        <label class="flex flex-wrap gap-3 items-center">
          <ckb 
            type="checkbox" 
            :checked="item.IsCompleted" 
            @change="() => props.updateTask(item, !item.IsCompleted)" 
          />
          <span class="text-md text-base-content" :class="[item.IsCompleted ? 'line-through' : '']">
            {{ item.Title }}
          </span>
        </label>
      </section>
      <section class="flex flex-row items-center">
        <btn 
          item 
          size="sm" 
          class="hover:text-primary" 
          @click="() => delTask(item)" 
          v-if="showDeleteButtons[item.TaskId || index]"
        >
          <icn name="trash-can" light lg></icn>
        </btn>
      </section>
    </li>
    <!-- 空状态提示 -->
    <li v-if="taskList.length === 0" class="flex items-center justify-center py-20 text-base-content/60">
      <div class="text-center">
        <icn name="tasks" light xl class="mb-4 mx-auto"></icn>
        <p>暂无任务，在下方输入框中添加新任务</p>
      </div>
    </li>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TaskInfo } from './Task.vue'

interface Props {
  taskList: TaskInfo[]
  deleteTask: (task: TaskInfo) => void | Promise<void>
  updateTask: (task: TaskInfo, isCompleted: boolean) => void | Promise<void>
  isHideCompleted: boolean
}

const props = defineProps<Props>()

// 控制每个任务项的删除按钮显示（使用任务ID作为key）
const showDeleteButtons = ref<Record<number | string, boolean>>({})

const delTask = (task: TaskInfo) => {
  if (window.confirm('确定要删除该任务吗？')) {
    props.deleteTask(task)
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>

