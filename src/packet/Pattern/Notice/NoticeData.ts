import type { NoticeItem } from './Notice'

// 获取初始通知列表
export function getInitialNoticeList(): NoticeItem[] {
  return [
    {
      id: 1,
      title: '系统更新通知',
      content: '系统将在今晚 22:00 进行维护更新，预计持续 2 小时。请提前保存您的工作。',
      type: 'system',
      time: new Date().toISOString(),
      read: false,
      important: true,
      category: '系统',
      actionText: '查看详情',
      icon: 'cog'
    },
    {
      id: 2,
      title: '任务完成提醒',
      content: '您的任务 "项目文档编写" 已完成，请及时查看。',
      type: 'success',
      time: new Date(Date.now() - 1800000).toISOString(),
      read: false,
      category: '任务',
      actionText: '查看任务',
      icon: 'check-circle'
    },
    {
      id: 3,
      title: '待办事项提醒',
      content: '您有 3 个待办事项即将到期，请及时处理。',
      type: 'warning',
      time: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      important: true,
      category: '待办',
      actionText: '查看待办',
      icon: 'exclamation-triangle'
    },
    {
      id: 4,
      title: '新消息提醒',
      content: '您收到了来自 John Doe 的新消息，请及时查看。',
      type: 'info',
      time: new Date(Date.now() - 7200000).toISOString(),
      read: true,
      category: '消息',
      actionText: '查看消息',
      icon: 'envelope'
    },
    {
      id: 5,
      title: '账户安全提醒',
      content: '检测到您的账户在异地登录，如非本人操作，请立即修改密码。',
      type: 'error',
      time: new Date(Date.now() - 86400000).toISOString(),
      read: false,
      important: true,
      category: '安全',
      actionText: '修改密码',
      icon: 'shield-alt'
    },
    {
      id: 6,
      title: '项目进度更新',
      content: '项目 "新功能开发" 的进度已更新至 75%，请查看最新进展。',
      type: 'info',
      time: new Date(Date.now() - 172800000).toISOString(),
      read: true,
      category: '项目',
      actionText: '查看项目',
      icon: 'chart-line'
    }
  ]
}

