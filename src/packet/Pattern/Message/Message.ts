// 消息接口
export interface MessageItem {
  id: number
  from: string
  fromAvatar?: string
  lastMessage: string
  lastTime: string
  unread: number
  isOnline?: boolean
}

// 对话消息接口
export interface ConversationMessage {
  id: number
  content: string
  time: string
  isMe: boolean
  type?: 'text' | 'image' | 'file'
}

