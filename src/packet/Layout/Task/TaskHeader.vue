<template>
  <div class="flex flex-row justify-between items-center w-full text-left py-2 bg-base-200">
    <div class="flex flex-row justify-between items-center w-full px-5">
    <span class="text-2xl font-bold text-gray-500 dark:text-gray-400 flex-shrink truncate">
      {{ title || '总任务' }}
    </span>
    <section class="flex flex-row items-center flex-shrink-0">
      <label class="flex flex-col items-center text-gray-500 dark:text-gray-400">
        <span>
          <span :class="[locale === 'zh-CN' ? '' : 'px-1']">
            {{ isHide ? (hideText || '隐藏') : (showText || '显示') }}
          </span>
          <span>{{ completedText || '已完成' }}</span>
        </span>
        <tgl 
          :checked="isHideCompleted" 
          @change="handleToggle"
          :disabled="!taskList || taskList.length === count || count == 0"
        ></tgl>
      </label>
      <label 
        class="flex flex-col text-gray-500 dark:text-gray-400"
        :class="[locale === 'zh-CN' ? 'w-28' : 'w-36']"
      >
        <label class="flex flex-row justify-between items-center gap-2">
          <span class="flex-shrink-0">{{ completedText || '已完成' }}</span>
          <span 
            class="text-xl font-bold whitespace-nowrap inline-block" 
            style="min-width: 2rem; color: #1f2937; display: inline-block;"
          >{{ count }}</span>
        </label>
        <label class="flex flex-row justify-between items-center gap-2">
          <span class="flex-shrink-0">{{ totalText || '总计' }}</span>
          <span 
            class="text-xl font-bold whitespace-nowrap inline-block" 
            style="min-width: 2rem; color: #1f2937; display: inline-block;"
          >{{ totalCount }}</span>
        </label>
      </label>
    </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TaskInfo } from './Task.vue'

interface Props {
  taskList: TaskInfo[]
  hideCompleted: boolean
  isHide: boolean
  title?: string
  hideText?: string
  showText?: string
  completedText?: string
  totalText?: string
  locale?: string
}

const props = withDefaults(defineProps<Props>(), {
  taskList: () => [],
  hideCompleted: false,
  isHide: false,
  locale: 'zh-CN'
})

const emit = defineEmits<{
  'toggle-hide': []
}>()

const { locale: i18nLocale } = useI18n()
const locale = computed(() => props.locale || i18nLocale.value || 'zh-CN')

const count = computed(() => {
  if (!props.taskList) return 0
  return props.taskList.reduce((pre, task) => pre + (task.IsCompleted ? 1 : 0), 0)
})

const totalCount = computed(() => {
  const length = props.taskList?.length ?? 0
  // 确保返回数字，即使为 0 也要显示
  return length
})

const isHideCompleted = computed({
  get: () => props.hideCompleted,
  set: () => {
    emit('toggle-hide')
  }
})

const handleToggle = () => {
  emit('toggle-hide')
}
</script>

