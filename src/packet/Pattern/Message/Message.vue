<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import Drawer from '../../Section/Drawer/Drawer.vue'
import Toast from '../../Element/Toast/Toast'
import type { MessageItem, ConversationMessage } from './Message'
import { getInitialMessageList, getInitialConversations } from './MessageData'

const { t } = useI18n()

// Props 定义
const props = withDefaults(defineProps<{
  buttonClass?: string
  onNoticeClick?: () => void
  messageList?: MessageItem[]
  conversations?: Record<number, ConversationMessage[]>
}>(), {
  buttonClass: 'hover:text-primary'
})

const isShowDrawer = ref(false)
const selectedMessageId = ref<number | null>(null)
const newMessageText = ref('')

// 消息列表（从 props 注入或使用默认数据）
const messageList = ref<MessageItem[]>(
  props.messageList && props.messageList.length > 0 
    ? [...props.messageList] 
    : getInitialMessageList()
)

// 对话记录（从 props 注入或使用默认数据）
const conversations = ref<Record<number, ConversationMessage[]>>(
  props.conversations && Object.keys(props.conversations).length > 0
    ? { ...props.conversations }
    : getInitialConversations()
)

// 监听 props 变化，同步更新内部数据
watch(() => props.messageList, (newList) => {
  if (newList && newList.length > 0) {
    messageList.value = [...newList]
  }
}, { deep: true })

watch(() => props.conversations, (newConversations) => {
  if (newConversations && Object.keys(newConversations).length > 0) {
    conversations.value = { ...newConversations }
  }
}, { deep: true })

// 当前对话记录
const currentConversation = computed(() => {
  if (!selectedMessageId.value) return []
  return conversations.value[selectedMessageId.value] || []
})

// 选中的消息
const selectedMessage = computed(() => {
  if (!selectedMessageId.value) return null
  return messageList.value.find(msg => msg.id === selectedMessageId.value) || null
})

// Drawer 宽度（根据是否选中消息动态调整）
const drawerWidth = computed(() => {
  return selectedMessageId.value ? 'w-[48rem]' : 'w-96'
})

// 切换 Drawer 显示状态
const toggleDrawer = () => {
  isShowDrawer.value = !isShowDrawer.value
  if (!isShowDrawer.value) {
    // 关闭时重置选中状态
    selectedMessageId.value = null
    newMessageText.value = ''
  }
  // 调用父组件传入的通知点击回调
  if (isShowDrawer.value) {
    props.onNoticeClick?.()
  }
}

// 选择消息
const selectMessage = (message: MessageItem) => {
  selectedMessageId.value = message.id
  // 标记为已读
  message.unread = 0
  // 如果对话记录不存在，初始化
  if (!conversations.value[message.id]) {
    conversations.value[message.id] = []
  }
}

// 返回消息列表
const backToMessageList = () => {
  selectedMessageId.value = null
  newMessageText.value = ''
}

// 发送消息
const sendMessage = () => {
  if (!newMessageText.value.trim() || !selectedMessageId.value) {
    return
  }

  const message: ConversationMessage = {
    id: Date.now(),
    content: newMessageText.value.trim(),
    time: new Date().toISOString(),
    isMe: true
  }

  if (!conversations.value[selectedMessageId.value]) {
    conversations.value[selectedMessageId.value] = []
  }
  conversations.value[selectedMessageId.value].push(message)

  // 更新消息列表的最后一条消息
  const messageItem = messageList.value.find(msg => msg.id === selectedMessageId.value)
  if (messageItem) {
    messageItem.lastMessage = message.content
    messageItem.lastTime = message.time
  }

  newMessageText.value = ''
  Toast({ message: '消息已发送', type: 'success' })
}

// 全部已读
const markAllAsRead = () => {
  const unreadCount = messageList.value.reduce((sum, msg) => sum + msg.unread, 0)
  if (unreadCount === 0) {
    Toast({ message: '所有消息已读', type: 'message' })
    return
  }
  messageList.value.forEach(msg => {
    msg.unread = 0
  })
  Toast({ message: '全部消息已标记为已读', type: 'success' })
}

// 格式化时间
const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) {
    return '刚刚'
  } else if (minutes < 60) {
    return `${minutes}分钟前`
  } else if (hours < 24) {
    return `${hours}小时前`
  } else if (days === 1) {
    return '昨天'
  } else if (days < 7) {
    return `${days}天前`
  } else {
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }
}

// 格式化对话时间
const formatConversationTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))

  if (minutes < 1) {
    return '刚刚'
  } else if (minutes < 60) {
    return `${minutes}分钟前`
  } else {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }
}

</script>
<template>
  <div key="message-drawer" style="padding: 0; margin: 0;">
    <btn item :class="buttonClass" @click="toggleDrawer" class="relative">
      <icn name="messages" light lg></icn>
      <span v-if="messageList.reduce((sum, msg) => sum + msg.unread, 0) > 0" 
        class="absolute -top-0.1 -right-0.1 bg-error text-error-content text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {{ messageList.reduce((sum, msg) => sum + msg.unread, 0) > 99 ? '99+' : messageList.reduce((sum, msg) => sum + msg.unread, 0) }}
      </span>
    </btn>
    <Drawer 
      :title="selectedMessage ? selectedMessage.from : t('common.message')" 
      :width="drawerWidth" 
      :isShow="isShowDrawer" 
      @update:isShow="isShowDrawer = $event"
      :overflow="true"
    >
      <div class="flex h-full">
        <!-- 消息列表 -->
        <div :class="['flex flex-col ',selectedMessageId ? 'w-80 flex-shrink-0' : 'w-full']">
          <!-- 搜索框和全部已读 -->
          <div class="p-3 space-y-2 border-b-1 border-b-solid border-base-200">
            <div class="flex items-center gap-2">
              <ipt placeholder="搜索消息..." class="flex-1">
                <icn name="search" light sm slot="prefix"></icn>
              </ipt>
              <btn clean
                size="xl" 
                @click="markAllAsRead"
                :disabled="messageList.reduce((sum, msg) => sum + msg.unread, 0) === 0"
                :class="messageList.reduce((sum, msg) => sum + msg.unread, 0) === 0 ? 'cursor-not-allowed' : ''"
                title="全部已读"
              >
                <icn name="broom" light xl class="hover:text-primary"></icn>
              </btn>
            </div>
          </div>

          <!-- 消息列表 -->
          <div class="flex-1 overflow-y-auto">
            <div v-for="message in messageList" :key="message.id"
              :class="['p-2 cursor-pointer  hover:bg-base-200 transition-colors border-b-1 border-b-solid border-base-200',
                selectedMessageId === message.id ? 'bg-base-200' : '']" @click="selectMessage(message)">
              <div class="flex items-start gap-3">
                <!-- 头像 -->
                <div class="relative flex-shrink-0">
                  <div class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <icn name="user" light sm class="text-primary"></icn>
                  </div>
                  <span 
                    v-if="message.isOnline" 
                    class="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-200"
                  ></span>
                </div>

                <!-- 消息信息 -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-medium text-sm truncate">{{ message.from }}</span>
                    <span class="text-xs text-base-content/60 flex-shrink-0 ml-2">
                      {{ formatTime(message.lastTime) }}
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <p class="text-sm text-base-content/70 truncate flex-1">{{ message.lastMessage }}</p>
                    <span v-if="message.unread > 0" 
                      class="bg-error text-error-content text-xs rounded-full px-2 py-0.5 flex-shrink-0">
                      {{ message.unread > 99 ? '99+' : message.unread }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 空状态 -->
            <div v-if="messageList.length === 0" class="flex flex-col items-center justify-center py-20">
              <icn name="messages" light xl class="mb-4 text-base-content/30"></icn>
              <p class="text-base-content/60 text-sm">暂无消息</p>
            </div>
          </div>
        </div>

        <!-- 对话详情 -->
        <div v-if="selectedMessageId && selectedMessage" class="flex-1 flex flex-col border-l-2 border-l-solid border-base-200">
          <!-- 对话头部 -->
          <div class="p-3 flex items-center justify-between bg-base-200">
            <div class="flex items-center gap-3">
              <btn variant="transparent" size="sm" @click="backToMessageList" class="md:hidden">
                <icn name="arrow-left" light sm></icn>
              </btn>
              <div class="relative">
                <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <icn name="user" light sm class="text-primary"></icn>
                </div>
                <span 
                  v-if="selectedMessage.isOnline" 
                  class="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-200"
                ></span>
              </div>
              <div>
                <div class="font-medium">{{ selectedMessage.from }}</div>
                <div class="text-xs text-base-content/60">
                  {{ selectedMessage.isOnline ? '在线' : '离线' }}
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <btn variant="transparent" size="sm">
                <icn name="message" light sm></icn>
              </btn>
            </div>
          </div>

          <!-- 对话记录 -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-base-250">
            <div v-for="msg in currentConversation" 
              :key="msg.id"
              :class="['flex',msg.isMe ? 'justify-end' : 'justify-start']">
              <div :class="['max-w-[70%] rounded-lg p-2',
                msg.isMe ? 'bg-primary text-primary-content' : 'bg-base-100 text-base-content'
              ]">
                <p class="text-sm whitespace-pre-wrap">{{ msg.content }}</p>
                <p :class="['text-xs mt-1', msg.isMe ? 'text-primary-content/70' : 'text-base-content/60']">
                  {{ formatConversationTime(msg.time) }}
                </p>
              </div>
            </div>

            <!-- 空对话状态 -->
            <div v-if="currentConversation.length === 0" class="flex flex-col items-center justify-center py-20">
              <icn name="comment" light xl class="mb-4 text-base-content/30"></icn>
              <p class="text-base-content/60 text-sm">暂无对话记录</p>
            </div>
          </div>

          <!-- 发送框 -->
          <div class="p-3 bg-base-100">
            <div class="flex items-center gap-2">
              <btn variant="transparent" size="sm">
                <icn name="paperclip" light sm></icn>
              </btn>
                <textarea 
                  v-model="newMessageText"
                  placeholder="输入消息..."
                  class="w-full p-2 border border-base-300 rounded resize-none"
                  rows="2"
                  @keydown.enter.exact.prevent="sendMessage"
                  @keydown.enter.shift.exact=""
                ></textarea>
              <btn 
                color="primary" 
                size="sm"
                @click="sendMessage"
                :disabled="!newMessageText.trim()"
              >
                <icn name="paper-plane" light sm></icn>
              </btn>
            </div>
          </div>
        </div>

        <!-- 未选中消息时的提示 -->
        <div v-else class="flex-1 flex flex-col items-center justify-center py-20 px-3 bg-base-100">
          <icn name="message" light xl class="mb-4 text-base-content/30"></icn>
          <p class="text-base-content/60 text-lg">选择一个对话开始聊天</p>
        </div>
      </div>
    </Drawer>
  </div>
</template>

