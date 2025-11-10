// 通知类型
export type NoticeType = 'info' | 'success' | 'warning' | 'error' | 'system'

// 通知接口
export interface NoticeItem {
  id: number
  title: string
  content: string
  type: NoticeType
  time: string
  read: boolean
  important?: boolean
  category?: string
  actionUrl?: string
  actionText?: string
  icon?: string
}

