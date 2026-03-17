// 创建类型
export type CreateType =  'user' |'task' | 'project' | 'matter' | 'upload' | 'product' | 'document' | null

// 创建选项接口
export interface CreateOption {
  key: CreateType
  nameKey?: string  // 国际化 key
  name?: string     // 直接名称（如果不需要国际化）
  icon: string
  description: string
}

// 获取创建选项列表（返回基础配置，name 需要在组件中通过国际化获取）
export function getCreateOptions(): Omit<CreateOption, 'name'>[] {
  return [
    { 
      key: 'task' as CreateType, 
      nameKey: 'task.task',
      icon: 'calendar-check',
      description: '创建新任务'
    },
    { 
      key: 'project' as CreateType, 
      nameKey: 'project.project',
      icon: 'layer-group',
      description: '创建新项目'
    },
    { 
      key: 'user' as CreateType, 
      nameKey: 'toolbar.account',
      icon: 'user-plus',
      description: '创建新账户'
    },
    { 
      key: 'matter' as CreateType, 
      nameKey: 'matter.matter',
      icon: 'puzzle-piece',
      description: '创建新物料'
    },
    { 
      key: 'upload' as CreateType, 
      nameKey: 'matter.upload',
      icon: 'upload',
      description: '上传新物料'
    },
    { 
      key: 'product' as CreateType, 
      nameKey: 'nav.product',
      icon: 'atom',
      description: '创建新产品'
    },
    { 
      key: 'document' as CreateType, 
      nameKey: 'document.document',
      icon: 'file',
      description: '创建新文档'
    }
  ]
}

