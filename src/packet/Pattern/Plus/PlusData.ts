import type { CreateType, CreateOption } from './Plus'

// 获取创建选项列表（返回基础配置，name 或 nameKey 需要在组件中通过国际化获取）
export function getCreateOptions(): Array<Omit<CreateOption, 'name'> & { name?: string }> {
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
      key: 'account' as CreateType, 
      nameKey: 'toolbar.account',
      icon: 'user-plus',
      description: '创建新账户'
    },
    { 
      key: 'user' as CreateType, 
      name: '用户',
      icon: 'user',
      description: '创建新用户'
    },
    { 
      key: 'product' as CreateType, 
      name: '产品',
      icon: 'atom',
      description: '创建新产品'
    },
    { 
      key: 'document' as CreateType, 
      name: '文档',
      icon: 'file',
      description: '创建新文档'
    }
  ]
}

