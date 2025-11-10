// 创建类型
export type CreateType = 'task' | 'project' | 'account' | 'user' | 'product' | 'document' | null

// 创建选项接口
export interface CreateOption {
  key: CreateType
  nameKey?: string  // 国际化 key
  name?: string     // 直接名称（如果不需要国际化）
  icon: string
  description: string
}

