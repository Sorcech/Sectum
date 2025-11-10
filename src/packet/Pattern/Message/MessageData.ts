import type { MessageItem, ConversationMessage } from './Message'

// 获取初始消息列表
export function getInitialMessageList(): MessageItem[] {
  return [
    {
      id: 1,
      from: 'John Doe',
      lastMessage: '你好，请问项目进展如何？',
      lastTime: new Date().toISOString(),
      unread: 2,
      isOnline: true
    },
    {
      id: 2,
      from: 'Jane Smith',
      lastMessage: '会议时间改到明天下午3点',
      lastTime: new Date(Date.now() - 3600000).toISOString(),
      unread: 0,
      isOnline: true
    },
    {
      id: 3,
      from: 'Mike Johnson',
      lastMessage: '谢谢你的帮助！',
      lastTime: new Date(Date.now() - 86400000).toISOString(),
      unread: 1,
      isOnline: false
    },
    {
      id: 4,
      from: 'Sarah Williams',
      lastMessage: '文件已发送，请查收',
      lastTime: new Date(Date.now() - 172800000).toISOString(),
      unread: 0,
      isOnline: true
    }
  ]
}

// 获取初始对话记录
export function getInitialConversations(): Record<number, ConversationMessage[]> {
  return {
    1: [
      {
        id: 1,
        content: '你好，请问项目进展如何？',
        time: new Date(Date.now() - 3600000).toISOString(),
        isMe: false
      },
      {
        id: 2,
        content: '项目进展顺利，目前已完成80%的工作',
        time: new Date(Date.now() - 3300000).toISOString(),
        isMe: true
      },
      {
        id: 3,
        content: '太好了！期待看到最终成果',
        time: new Date(Date.now() - 3000000).toISOString(),
        isMe: false
      },
      {
        id: 4,
        content: '预计下周可以完成',
        time: new Date().toISOString(),
        isMe: true
      }
    ],
    2: [
      {
        id: 1,
        content: '会议时间改到明天下午3点',
        time: new Date(Date.now() - 3600000).toISOString(),
        isMe: false
      },
      {
        id: 2,
        content: '收到，我会准时参加',
        time: new Date(Date.now() - 3000000).toISOString(),
        isMe: true
      }
    ],
    3: [
      {
        id: 1,
        content: '谢谢你的帮助！',
        time: new Date(Date.now() - 86400000).toISOString(),
        isMe: false
      }
    ],
    4: [
      {
        id: 1,
        content: '文件已发送，请查收',
        time: new Date(Date.now() - 172800000).toISOString(),
        isMe: false
      },
      {
        id: 2,
        content: '已收到，谢谢！',
        time: new Date(Date.now() - 170000000).toISOString(),
        isMe: true
      }
    ]
  }
}

