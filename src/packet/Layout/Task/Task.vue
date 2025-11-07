<template>
  <div class="w-full h-full flex flex-row">
    <!-- 任务菜单 - 左侧 -->
    <div class="w-36 h-full flex-shrink-0 border-r bg-base-200">
      <Menu class="pt-3">
        <btn 
          v-for="(item, index) in menuItems" 
          :key="index"
          item
          :class="[
            activeMenu === item.key 
              ? 'bg-primary text-primary-content' 
              : 'hover:bg-base-300'
          ]"
          @click="handleMenuClick(item.key)"
        >
          <icn v-if="item.icon" :name="item.icon" light lg class="mr-2"></icn>
          {{ item.name }}
        </btn>
      </Menu>
    </div>
    
    <!-- 任务内容区域 - 右侧 -->
    <div class="flex-1 h-full overflow-hidden flex flex-col min-w-0 relative">
      <div class="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
        <TaskHeader 
          :task-list="state.taskList" 
          :hide-completed="hideCompleted" 
          :is-hide="isHideCompleted"
          @toggle-hide="handleToggleHide"
        />
        <TaskList 
          :task-list="state.taskList" 
          :delete-task="handleTaskDelete"
          :update-task="handleTaskUpdate"
          :is-hide-completed="isHideCompleted"
        />
      </div>
      <TaskInput :task-input="handleTaskAdd" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, computed, watch } from 'vue'
import Menu from '~/packet/Section/Menu/Menu.vue'
import TaskList from './TaskList.vue'
import TaskInput from './TaskInput.vue'
import TaskHeader from './TaskHeader.vue'
import { TaskService } from './task'
import Message from '~/packet/Element/Message/Message'

// 任务信息接口
export interface TaskInfo {
  TaskId?: number
  Title: string
  IsCompleted: boolean
  [key: string]: any
}

// 任务创建接口
export interface TaskCreate {
  Name: string
  Project?: number
  EndAt?: string
  [key: string]: any
}

// 菜单项接口
export interface MenuItem {
  key: string
  name: string
  icon?: string
}

interface Props {
  // 任务列表数据源（如果提供，则使用外部数据）
  tasks?: TaskInfo[]
  // 标题
  title?: string
  // 菜单项配置
  menuItems?: MenuItem[]
  // 视口高度调整（rem）
  viewport?: string
  // 任务加载函数
  onLoad?: () => Promise<TaskInfo[]> | TaskInfo[]
  // 任务添加回调
  onTaskAdd?: (task: TaskCreate) => Promise<void> | void
  // 任务删除回调
  onTaskDelete?: (task: TaskInfo) => Promise<void> | void
  // 任务更新回调
  onTaskUpdate?: (task: TaskInfo, isCompleted: boolean) => Promise<void> | void
  // 菜单切换回调
  onMenuChange?: (key: string) => void
  // 自动刷新间隔（毫秒，0 表示不自动刷新）
  autoRefresh?: number
}

const props = withDefaults(defineProps<Props>(), {
  tasks: undefined,
  title: '任务',
  menuItems: undefined,
  viewport: '0',
  autoRefresh: 0
})

const emit = defineEmits<{
  'task-add': [task: TaskCreate]
  'task-delete': [task: TaskInfo]
  'task-update': [task: TaskInfo, isCompleted: boolean]
  'menu-change': [key: string]
  'task-list-change': [tasks: TaskInfo[]]
}>()

const state = reactive<{ taskList: TaskInfo[] }>({
  taskList: []
})

// viewport 保留用于未来扩展
// const viewport = ref(props.viewport)

// 默认菜单项
const menuItems = ref<MenuItem[]>(props.menuItems || [
  { key: 'total', name: 'Total', icon: 'bars' },
  { key: 'today', name: 'Today', icon: 'calendar-day' },
  { key: 'week', name: 'Week', icon: 'calendar-week' },
  { key: 'important', name: 'Important', icon: 'star' },
  { key: 'urgent', name: 'Urgent', icon: 'clock' },
  { key: 'assigned', name: 'Assume', icon: 'user' },
  { key: 'sponsor', name: 'Sponsor', icon: 'money' },
  { key: 'starred', name: 'Starred', icon: 'star' },
  { key: 'completed', name: 'Completed', icon: 'check' },
])

// 菜单和隐藏状态
const activeMenu = ref<string>(menuItems.value[0]?.key || 'total')
const isHideCompleted = ref(true)

const hideCompleted = computed({
  get: () => isHideCompleted.value,
  set: (val: boolean) => {
    isHideCompleted.value = val
  }
})

// 处理菜单点击
const handleMenuClick = (key: string) => {
  activeMenu.value = key
  if (props.onMenuChange) {
    props.onMenuChange(key)
  }
  emit('menu-change', key)
}

// 处理隐藏已完成任务
const handleToggleHide = () => {
  isHideCompleted.value = !isHideCompleted.value
}

// 任务刷新函数
const TaskRefresh = async () => {
  if (props.onLoad) {
    // 使用外部提供的加载函数
    try {
      const tasks = await props.onLoad()
      state.taskList = Array.isArray(tasks) ? tasks : []
      // 按完成状态排序：未完成的在前
      state.taskList.sort((a, b) => Number(a.IsCompleted) - Number(b.IsCompleted))
      emit('task-list-change', state.taskList)
    } catch (error) {
      state.taskList = []
    }
  } else if (props.tasks) {
    // 使用外部提供的任务列表
    state.taskList = [...props.tasks]
    state.taskList.sort((a, b) => Number(a.IsCompleted) - Number(b.IsCompleted))
  } else {
    // 使用默认的 TaskService 加载任务
    try {
      const response = await TaskService.List()
      
      if (response?.data?.code === 0) {
        const tasks = response.data.data || []
        
        // 确保数据格式正确
        state.taskList = tasks.map((task: any) => {
          // 如果任务已经有 Title，直接使用；否则从 Name 转换
          const title = task.Title || task.Name || ''
          return {
            ...task,
            // 确保关键字段存在
            TaskId: task.TaskId,
            Title: title,
            IsCompleted: task.IsCompleted || false,
            Project: task.Project,
            EndAt: task.EndAt,
            CreatedAt: task.CreatedAt
          }
        })
        // 按完成状态排序：未完成的在前
        state.taskList.sort((a, b) => Number(a.IsCompleted) - Number(b.IsCompleted))
        emit('task-list-change', state.taskList)
      } else {
        state.taskList = []
      }
    } catch (error) {
      state.taskList = []
    }
  }
}

// 处理任务添加
const handleTaskAdd = async (task: TaskCreate) => {
  if (props.onTaskAdd) {
    // 使用外部提供的添加函数
    await props.onTaskAdd(task)
  } else {
    // 使用默认的 TaskService 添加任务
    try {
      const response = await TaskService.Create(task)
      
      if (response?.data?.code === 0) {
        Message({ 
          type: 'success', 
          message: response.data.message || '任务创建成功' 
        })
        // 添加成功后，立即刷新列表
        await TaskRefresh()
      } else {
        Message({ 
          type: 'error', 
          message: response?.data?.message || '任务创建失败' 
        })
      }
    } catch (error) {
      Message({ type: 'error', message: '任务创建失败' })
    }
  }
  emit('task-add', task)
  // 如果使用外部函数，也需要刷新列表
  if (props.onTaskAdd) {
    await TaskRefresh()
  }
}

// 处理任务删除
const handleTaskDelete = async (task: TaskInfo) => {
  if (props.onTaskDelete) {
    // 使用外部提供的删除函数
    await props.onTaskDelete(task)
  } else {
    // 使用默认的 TaskService 删除任务
    try {
      const response = await TaskService.Delete(task)
      if (response.data?.code === 0) {
        Message({ 
          type: 'success', 
          message: response.data.message || '任务删除成功' 
        })
      } else {
        Message({ 
          type: 'error', 
          message: response.data?.message || '任务删除失败' 
        })
      }
    } catch (error) {
      Message({ type: 'error', message: '任务删除失败' })
    }
  }
  emit('task-delete', task)
  // 刷新任务列表
  await TaskRefresh()
}

// 处理任务更新
const handleTaskUpdate = async (task: TaskInfo, isCompleted: boolean) => {
  // 如果所有任务都完成了，自动隐藏已完成的任务
  const count = state.taskList.reduce((pre, t) => pre + (t.IsCompleted ? 1 : 0), 0)
  if (count === state.taskList.length) {
    isHideCompleted.value = true
  }
  
  if (props.onTaskUpdate) {
    // 使用外部提供的更新函数
    await props.onTaskUpdate(task, isCompleted)
  } else {
    // 使用默认的 TaskService 更新任务
    try {
      const updatedTask = { ...task, IsCompleted: isCompleted }
      const response = await TaskService.Update(updatedTask)
      if (response.data?.code === 0) {
        Message({ 
          type: 'success', 
          message: response.data.message || '任务更新成功' 
        })
      } else {
        Message({ 
          type: 'error', 
          message: response.data?.message || '任务更新失败' 
        })
      }
    } catch (error) {
      Message({ type: 'error', message: '任务更新失败' })
    }
  }
  emit('task-update', task, isCompleted)
  // 更新本地状态
  const index = state.taskList.findIndex(t => t.TaskId === task.TaskId)
  if (index > -1) {
    state.taskList[index].IsCompleted = isCompleted
    // 重新排序
    setTimeout(() => {
      state.taskList.sort((a, b) => Number(a.IsCompleted) - Number(b.IsCompleted))
    }, 200)
  }
}

// 监听外部任务列表变化
watch(() => props.tasks, (newTasks) => {
  if (newTasks) {
    state.taskList = [...newTasks]
    state.taskList.sort((a, b) => Number(a.IsCompleted) - Number(b.IsCompleted))
  }
}, { deep: true })

// 自动刷新定时器
let refreshTimer: number | null = null

onMounted(() => {
  // 初始化加载任务
  TaskRefresh()
  
  // 设置自动刷新
  if (props.autoRefresh > 0) {
    refreshTimer = window.setInterval(() => {
      TaskRefresh()
    }, props.autoRefresh)
  }
})

// 清理定时器
onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
})

// 暴露给父组件的方法
defineExpose({
  refresh: TaskRefresh,
  taskList: state.taskList,
  activeMenu,
  isHideCompleted
})
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
