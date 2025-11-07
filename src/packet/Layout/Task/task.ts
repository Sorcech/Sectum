/**
 * 任务管理服务
 * 提供任务的增删改查功能
 */

import { Store } from '~/packet/Config/storage'
import type { TaskInfo, TaskCreate } from './Task.vue'

// API 基础配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888'
// 默认使用本地存储，除非明确配置使用远程API
const USE_LOCAL_STORAGE = import.meta.env.VITE_USE_LOCAL_STORAGE !== 'false'

// 本地存储键名
const STORAGE_KEY = 'sectum_tasks'

/**
 * 任务管理类
 */
export class TaskService {
  /**
   * 创建新任务
   * @param params 任务创建参数
   * @returns Promise<any>
   */
  static async Create(params: TaskCreate): Promise<any> {
    if (USE_LOCAL_STORAGE) {
      return this.createLocal(params)
    }
    return this.createRemote(params)
  }

  /**
   * 获取任务列表
   * @returns Promise<any>
   */
  static async List(): Promise<any> {
    if (USE_LOCAL_STORAGE) {
      return this.listLocal()
    }
    return this.listRemote()
  }

  /**
   * 更新任务
   * @param params 任务信息
   * @returns Promise<any>
   */
  static async Update(params: TaskInfo): Promise<any> {
    if (USE_LOCAL_STORAGE) {
      return this.updateLocal(params)
    }
    return this.updateRemote(params)
  }

  /**
   * 删除任务
   * @param params 任务信息
   * @returns Promise<any>
   */
  static async Delete(params: TaskInfo): Promise<any> {
    if (USE_LOCAL_STORAGE) {
      return this.deleteLocal(params)
    }
    return this.deleteRemote(params)
  }

  // ========== 远程 API 方法 ==========

  /**
   * 远程创建任务
   */
  private static async createRemote(params: TaskCreate): Promise<any> {
    try {
      const token = Store.getLocalStorage('Token')
      const response = await fetch(`${API_BASE_URL}/task/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(params)
      })
      
      const data = await response.json()
      return { data }
    } catch (error) {
      throw error
    }
  }

  /**
   * 远程获取任务列表
   */
  private static async listRemote(): Promise<any> {
    try {
      const token = Store.getLocalStorage('Token')
      const response = await fetch(`${API_BASE_URL}/task/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      })
      
      const data = await response.json()
      return { data }
    } catch (error) {
      throw error
    }
  }

  /**
   * 远程更新任务
   */
  private static async updateRemote(params: TaskInfo): Promise<any> {
    try {
      const token = Store.getLocalStorage('Token')
      const response = await fetch(`${API_BASE_URL}/task/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(params)
      })
      
      const data = await response.json()
      return { data }
    } catch (error) {
      throw error
    }
  }

  /**
   * 远程删除任务
   */
  private static async deleteRemote(params: TaskInfo): Promise<any> {
    try {
      const token = Store.getLocalStorage('Token')
      const response = await fetch(`${API_BASE_URL}/task/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(params)
      })
      
      const data = await response.json()
      return { data }
    } catch (error) {
      throw error
    }
  }

  // ========== 本地存储方法 ==========

  /**
   * 本地创建任务
   */
  private static async createLocal(params: TaskCreate): Promise<any> {
    try {
      const tasks = this.getLocalTasks()
      const newTask: TaskInfo = {
        TaskId: Date.now(), // 使用时间戳作为 ID
        Title: params.Name,
        IsCompleted: false,
        Project: params.Project,
        EndAt: params.EndAt,
        CreatedAt: new Date().toISOString()
      }
      
      tasks.push(newTask)
      this.saveLocalTasks(tasks)
      
      return {
        data: {
          code: 0,
          message: '任务创建成功',
          data: newTask
        }
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * 本地获取任务列表
   */
  private static async listLocal(): Promise<any> {
    try {
      const tasks = this.getLocalTasks()
      return {
        data: {
          code: 0,
          message: '获取成功',
          data: tasks
        }
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * 本地更新任务
   */
  private static async updateLocal(params: TaskInfo): Promise<any> {
    try {
      const tasks = this.getLocalTasks()
      const index = tasks.findIndex(t => t.TaskId === params.TaskId)
      
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...params }
        this.saveLocalTasks(tasks)
        
        return {
          data: {
            code: 0,
            message: '任务更新成功',
            data: tasks[index]
          }
        }
      } else {
        throw new Error('任务不存在')
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * 本地删除任务
   */
  private static async deleteLocal(params: TaskInfo): Promise<any> {
    try {
      const tasks = this.getLocalTasks()
      const index = tasks.findIndex(t => t.TaskId === params.TaskId)
      
      if (index > -1) {
        tasks.splice(index, 1)
        this.saveLocalTasks(tasks)
        
        return {
          data: {
            code: 0,
            message: '任务删除成功'
          }
        }
      } else {
        throw new Error('任务不存在')
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * 从本地存储获取任务列表
   */
  private static getLocalTasks(): TaskInfo[] {
    try {
      const stored = Store.getLocalStorage(STORAGE_KEY)
      // Store.getLocalStorage 已经自动解析 JSON，直接返回
      return stored ? (Array.isArray(stored) ? stored : []) : []
    } catch (error) {
      return []
    }
  }

  /**
   * 保存任务列表到本地存储
   */
  private static saveLocalTasks(tasks: TaskInfo[]): void {
    try {
      // Store.setLocalStorage 已经会自动进行 JSON.stringify，所以直接传递数组
      Store.setLocalStorage(STORAGE_KEY, tasks)
    } catch (error) {
      throw error
    }
  }

  /**
   * 清空本地任务（用于测试或重置）
   */
  static clearLocalTasks(): void {
    Store.removeLocalStorage(STORAGE_KEY)
  }
}

// 导出默认实例（保持向后兼容）
export default TaskService

