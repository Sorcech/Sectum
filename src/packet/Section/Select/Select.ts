import { Store } from '~/packet/Config/storage'

// 存储键名
const STORAGE_KEY = 'sectum_projects'

/**
 * 获取初始项目列表（用于开发和测试的默认数据）
 * @returns ProjectInfo[]
 */
export function getInitialProjectList(): Array<{ value?: string | number; label?: string; [key: string]: any }> {
  return []
}

/**
 * 从本地存储获取项目列表
 * @returns ProjectInfo[]
 */
export function getLocalProjects(): Array<{ value?: string | number; label?: string; [key: string]: any }> {
  try {
    const stored = Store.getLocalStorage(STORAGE_KEY)
    return stored ? (Array.isArray(stored) ? stored : []) : []
  } catch (error) {
    return []
  }
}

/**
 * 获取本地项目列表（返回 API 响应格式）
 * @returns Promise<any>
 */
export async function listLocalProjects(): Promise<any> {
  try {
    const projects = getLocalProjects()
    return {
      data: {
        code: 0,
        message: '获取成功',
        data: projects
      }
    }
  } catch (error) {
    throw error
  }
}

/**
 * 加载项目列表
 * @param providedProjects 通过 props 提供的项目列表
 * @param mode 选择器模式
 * @param loadProjects 是否加载项目
 * @returns 项目列表
 */
export async function loadProjectList(
  providedProjects?: Array<{ value?: string | number; label?: string; [key: string]: any }>,
  mode?: string,
  loadProjects?: boolean
): Promise<Array<{ value?: string | number; label?: string; [key: string]: any }>> {
  // 如果提供了项目列表，直接返回
  if (providedProjects && providedProjects.length > 0) {
    return [...providedProjects]
  }
  
  // 如果需要加载项目且模式为 project
  if (loadProjects && mode === 'project') {
    try {
      const response = await listLocalProjects()
      const loadedProjects = response?.data?.Code === 0 ? (response.data.Data || []) : []
      return loadedProjects.length > 0 ? loadedProjects : getInitialProjectList()
    } catch (error) {
      console.error('加载项目列表失败:', error)
      return getInitialProjectList()
    }
  } else if (mode === 'project') {
    return getInitialProjectList()
  }
  
  return []
}

