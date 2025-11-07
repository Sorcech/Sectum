# Task 任务管理组件

Task 组件是一个完整的任务管理组件，参考了实际项目中的实现，提供了任务列表、添加、删除、更新等完整功能。它适用于待办事项、项目管理、任务跟踪等场景。

## 特性

- 📋 **完整功能** - 支持任务的增删改查、完成状态切换
- 🏷️ **任务分类** - 内置多种任务分类菜单（Total、Today、Project 等）
- 📊 **统计信息** - 显示任务总数和已完成数量
- 👁️ **隐藏已完成** - 支持隐藏/显示已完成的任务
- 📝 **快速添加** - 底部输入框快速添加任务
- 🎨 **主题适配** - 自动适配暗色模式和主题切换
- 🔄 **自动刷新** - 支持自动刷新任务列表
- 📱 **响应式设计** - 适配不同屏幕尺寸

## 安装

```ts
import { Task } from 'sectum'
// 或者
import Task from 'sectum'
```

## 基础用法

最简单的 Task 用法（需要提供数据加载函数）：

```vue
<template>
  <Task :on-load="loadTasks" />
</template>

<script setup>
import { Task } from 'sectum'

const loadTasks = async () => {
  // 从 API 加载任务列表
  const response = await fetch('/api/tasks')
  const data = await response.json()
  return data.tasks || []
}
</script>
```

## 使用外部数据

如果已经有任务数据，可以直接传入：

```vue
<template>
  <Task :tasks="tasks" />
</template>

<script setup>
import { ref } from 'vue'
import { Task } from 'sectum'

const tasks = ref([
  { TaskId: 1, Title: '完成项目文档', IsCompleted: false },
  { TaskId: 2, Title: '代码审查', IsCompleted: true },
  { TaskId: 3, Title: '团队会议', IsCompleted: false }
])
</script>
```

## 完整功能示例

一个完整的使用示例，包含所有回调函数：

```vue
<template>
  <Task 
    :on-load="loadTasks"
    :on-task-add="handleTaskAdd"
    :on-task-delete="handleTaskDelete"
    :on-task-update="handleTaskUpdate"
    :on-menu-change="handleMenuChange"
    :auto-refresh="30000"
    @task-add="onTaskAdd"
    @task-delete="onTaskDelete"
    @task-update="onTaskUpdate"
    @task-list-change="onTaskListChange"
  />
</template>

<script setup lang="ts">
import { Task } from 'sectum'
import type { TaskInfo, TaskCreate } from 'sectum'
import { Message } from 'sectum'

// 加载任务列表
const loadTasks = async (): Promise<TaskInfo[]> => {
  try {
    const response = await fetch('/api/tasks')
    const data = await response.json()
    return data.tasks || []
  } catch (error) {
    console.error('加载任务失败:', error)
    return []
  }
}

// 添加任务
const handleTaskAdd = async (task: TaskCreate) => {
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
    const data = await response.json()
    if (data.code === 0) {
      Message({ type: 'success', message: '任务创建成功' })
    }
  } catch (error) {
    Message({ type: 'error', message: '任务创建失败' })
  }
}

// 删除任务
const handleTaskDelete = async (task: TaskInfo) => {
  try {
    const response = await fetch(`/api/tasks/${task.TaskId}`, {
      method: 'DELETE'
    })
    const data = await response.json()
    if (data.code === 0) {
      Message({ type: 'success', message: '任务删除成功' })
    }
  } catch (error) {
    Message({ type: 'error', message: '任务删除失败' })
  }
}

// 更新任务
const handleTaskUpdate = async (task: TaskInfo, isCompleted: boolean) => {
  try {
    const response = await fetch(`/api/tasks/${task.TaskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, IsCompleted: isCompleted })
    })
    const data = await response.json()
    if (data.code === 0) {
      Message({ type: 'success', message: '任务更新成功' })
    }
  } catch (error) {
    Message({ type: 'error', message: '任务更新失败' })
  }
}

// 菜单切换
const handleMenuChange = (key: string) => {
  console.log('切换到菜单:', key)
  // 可以根据菜单类型过滤任务
}

// 事件监听
const onTaskAdd = (task: TaskCreate) => {
  console.log('任务已添加:', task)
}

const onTaskDelete = (task: TaskInfo) => {
  console.log('任务已删除:', task)
}

const onTaskUpdate = (task: TaskInfo, isCompleted: boolean) => {
  console.log('任务已更新:', task, isCompleted)
}

const onTaskListChange = (tasks: TaskInfo[]) => {
  console.log('任务列表已更新:', tasks)
}
</script>
```

## 自定义菜单

可以自定义任务分类菜单：

```vue
<template>
  <Task 
    :on-load="loadTasks"
    :menu-items="customMenuItems"
  />
</template>

<script setup>
import { Task } from 'sectum'

const customMenuItems = [
  { key: 'all', name: '全部', icon: 'list' },
  { key: 'today', name: '今天', icon: 'calendar-day' },
  { key: 'week', name: '本周', icon: 'calendar-week' },
  { key: 'important', name: '重要', icon: 'star' }
]

const loadTasks = async () => {
  // 加载任务
}
</script>
```

## 组件结构

Task 组件由以下子组件组成：

- **Task.vue** - 主组件，负责数据管理和状态控制
- **TaskPage.vue** - 页面布局组件，包含菜单和任务列表
- **TaskList.vue** - 任务列表容器
- **TaskItem.vue** - 单个任务项
- **TaskHeader.vue** - 任务头部，显示统计信息
- **TaskInput.vue** - 任务输入框

## Props

### Task 组件 Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| tasks | `TaskInfo[]` | `undefined` | 外部提供的任务列表（如果提供，则使用外部数据） |
| title | `string` | `'任务'` | 任务标题 |
| menuItems | `MenuItem[]` | 默认菜单 | 菜单项配置 |
| viewport | `string` | `'0'` | 视口高度调整（rem） |
| onLoad | `() => Promise<TaskInfo[]> \| TaskInfo[]` | - | 任务加载函数 |
| onTaskAdd | `(task: TaskCreate) => Promise<void> \| void` | - | 任务添加回调 |
| onTaskDelete | `(task: TaskInfo) => Promise<void> \| void` | - | 任务删除回调 |
| onTaskUpdate | `(task: TaskInfo, isCompleted: boolean) => Promise<void> \| void` | - | 任务更新回调 |
| onMenuChange | `(key: string) => void` | - | 菜单切换回调 |
| autoRefresh | `number` | `0` | 自动刷新间隔（毫秒，0 表示不自动刷新） |

## Events

Task 组件触发以下事件：

| 事件名 | 参数 | 说明 |
|--------|------|------|
| task-add | `TaskCreate` | 当任务添加时触发 |
| task-delete | `TaskInfo` | 当任务删除时触发 |
| task-update | `TaskInfo, boolean` | 当任务更新时触发 |
| menu-change | `string` | 当菜单切换时触发 |
| task-list-change | `TaskInfo[]` | 当任务列表变化时触发 |

## 类型定义

### TaskInfo

```typescript
interface TaskInfo {
  TaskId?: number      // 任务ID
  Title: string       // 任务标题
  IsCompleted: boolean // 是否完成
  [key: string]: any   // 其他自定义字段
}
```

### TaskCreate

```typescript
interface TaskCreate {
  Name: string        // 任务名称
  Project?: number    // 项目ID
  EndAt?: string      // 截止日期（ISO 字符串）
  [key: string]: any  // 其他自定义字段
}
```

### MenuItem

```typescript
interface MenuItem {
  key: string   // 菜单标识
  name: string  // 菜单名称
  icon?: string // 图标名称（可选）
}
```

## 使用 ref 访问组件方法

可以通过 ref 访问组件的方法：

```vue
<template>
  <Task ref="taskRef" :on-load="loadTasks" />
</template>

<script setup>
import { ref } from 'vue'
import { Task } from 'sectum'

const taskRef = ref(null)

// 手动刷新任务列表
const refreshTasks = () => {
  taskRef.value?.refresh()
}

// 访问任务列表
const getTasks = () => {
  return taskRef.value?.taskList || []
}
</script>
```

## 样式定制

Task 组件使用 UnoCSS 类名，可以通过覆盖样式来自定义外观：

```vue
<style scoped>
/* 自定义任务项样式 */
.task-item {
  border-radius: 0.5rem;
}

/* 自定义输入框样式 */
.task-input {
  background-color: #f5f5f5;
}
</style>
```

## 注意事项

1. **数据格式**：任务数据必须符合 `TaskInfo` 接口定义
2. **回调函数**：所有回调函数都是可选的，但建议至少提供 `onLoad` 来加载数据
3. **自动刷新**：如果设置了 `autoRefresh`，组件会在指定间隔自动刷新任务列表
4. **外部数据**：如果提供了 `tasks` prop，组件会使用外部数据而不是调用 `onLoad`
5. **任务排序**：组件会自动按完成状态排序（未完成的在前）

## 相关组件

- [Menu](../Section/Menu.md) - 菜单组件（用于分类列表）
- [Input](../Element/Input.md) - 输入框组件（用于任务输入）
- [Checkbox](../Element/Checkbox.md) - 复选框组件（用于任务完成状态）
- [Button](../Element/Button.md) - 按钮组件

## 使用场景

Task 组件适用于以下场景：

- 待办事项管理
- 项目管理中的任务跟踪
- 个人任务列表
- 团队协作任务管理
- 任何需要任务管理功能的场景
