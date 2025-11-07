/**
 * Task 服务使用示例
 * 展示如何在 Task 组件中使用 TaskService
 */

import { TaskService } from './task'
import type { TaskInfo, TaskCreate } from './Task.vue'
import Message from '~/packet/Element/Message/Message'

/**
 * 示例：在 Task 组件中使用 TaskService
 * 
 * 在 Vue 组件中这样使用：
 * 
 * <template>
 *   <Task 
 *     :on-load="loadTasks"
 *     :on-task-add="handleTaskAdd"
 *     :on-task-delete="handleTaskDelete"
 *     :on-task-update="handleTaskUpdate"
 *   />
 * </template>
 * 
 * <script setup lang="ts">
 * import { Task } from 'sectum'
 * import { TaskService } from '~/packet/Layout/Task/task'
 * import { Message } from 'sectum'
 * 
 * // 加载任务列表
 * const loadTasks = async (): Promise<TaskInfo[]> => {
 *   try {
 *     const response = await TaskService.List()
 *     if (response.data?.code === 0 && response.data?.data) {
 *       return response.data.data.map((task: any) => ({
 *         TaskId: task.TaskId,
 *         Title: task.Title || task.Name,
 *         IsCompleted: task.IsCompleted || false,
 *         ...task
 *       }))
 *     }
 *     return []
 *   } catch (error) {
 *     console.error('加载任务失败:', error)
 *     Message({ type: 'error', message: '加载任务失败' })
 *     return []
 *   }
 * }
 * 
 * // 添加任务
 * const handleTaskAdd = async (task: TaskCreate) => {
 *   try {
 *     const response = await TaskService.Create(task)
 *     if (response.data?.code === 0) {
 *       Message({ type: 'success', message: response.data.message || '任务创建成功' })
 *     } else {
 *       Message({ type: 'error', message: response.data?.message || '任务创建失败' })
 *     }
 *   } catch (error) {
 *     console.error('创建任务失败:', error)
 *     Message({ type: 'error', message: '任务创建失败' })
 *   }
 * }
 * 
 * // 删除任务
 * const handleTaskDelete = async (task: TaskInfo) => {
 *   try {
 *     const response = await TaskService.Delete(task)
 *     if (response.data?.code === 0) {
 *       Message({ type: 'success', message: response.data.message || '任务删除成功' })
 *     } else {
 *       Message({ type: 'error', message: response.data?.message || '任务删除失败' })
 *     }
 *   } catch (error) {
 *     console.error('删除任务失败:', error)
 *     Message({ type: 'error', message: '任务删除失败' })
 *   }
 * }
 * 
 * // 更新任务
 * const handleTaskUpdate = async (task: TaskInfo, isCompleted: boolean) => {
 *   try {
 *     const updatedTask = { ...task, IsCompleted: isCompleted }
 *     const response = await TaskService.Update(updatedTask)
 *     if (response.data?.code === 0) {
 *       Message({ type: 'success', message: response.data.message || '任务更新成功' })
 *     } else {
 *       Message({ type: 'error', message: response.data?.message || '任务更新失败' })
 *     }
 *   } catch (error) {
 *     console.error('更新任务失败:', error)
 *     Message({ type: 'error', message: '任务更新失败' })
 *   }
 * }
 * </script>
 */

/**
 * 完整的任务管理函数集合
 * 可以直接在组件中使用
 */
export const useTaskService = () => {
  /**
   * 加载任务列表
   */
  const loadTasks = async (): Promise<TaskInfo[]> => {
    try {
      const response = await TaskService.List()
      if (response.data?.code === 0 && response.data?.data) {
        // 转换数据格式，确保符合 TaskInfo 接口
        return response.data.data.map((task: any) => ({
          TaskId: task.TaskId,
          Title: task.Title || task.Name,
          IsCompleted: task.IsCompleted || false,
          Project: task.Project,
          EndAt: task.EndAt,
          CreatedAt: task.CreatedAt,
          ...task
        }))
      }
      return []
    } catch (error) {
      console.error('加载任务失败:', error)
      Message({ type: 'error', message: '加载任务失败' })
      return []
    }
  }

  /**
   * 添加任务
   */
  const handleTaskAdd = async (task: TaskCreate): Promise<void> => {
    try {
      const response = await TaskService.Create(task)
      if (response.data?.code === 0) {
        Message({ 
          type: 'success', 
          message: response.data.message || '任务创建成功' 
        })
      } else {
        Message({ 
          type: 'error', 
          message: response.data?.message || '任务创建失败' 
        })
      }
    } catch (error) {
      console.error('创建任务失败:', error)
      Message({ type: 'error', message: '任务创建失败' })
      throw error
    }
  }

  /**
   * 删除任务
   */
  const handleTaskDelete = async (task: TaskInfo): Promise<void> => {
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
      console.error('删除任务失败:', error)
      Message({ type: 'error', message: '任务删除失败' })
      throw error
    }
  }

  /**
   * 更新任务
   */
  const handleTaskUpdate = async (
    task: TaskInfo, 
    isCompleted: boolean
  ): Promise<void> => {
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
      console.error('更新任务失败:', error)
      Message({ type: 'error', message: '任务更新失败' })
      throw error
    }
  }

  return {
    loadTasks,
    handleTaskAdd,
    handleTaskDelete,
    handleTaskUpdate
  }
}

// 导出默认使用函数
export default useTaskService

