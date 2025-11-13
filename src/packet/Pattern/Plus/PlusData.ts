import type { CreateType, CreateOption } from './Plus'

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
      key: 'account' as CreateType, 
      nameKey: 'toolbar.account',
      icon: 'user-plus',
      description: '创建新账户'
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

