<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import Drawer from '../../Section/Drawer/Drawer.vue'
import Card from '../../Section/Card/Card.vue'
import Toast from '../../Element/Toast/Toast'
import type { NoticeItem, NoticeType } from './Notice'
import { getInitialNoticeList } from './NoticeData'

const { t } = useI18n()

// Props 定义
const props = withDefaults(defineProps<{
  buttonClass?: string
  onNoticeClick?: () => void
  noticeList?: NoticeItem[]
}>(), {
  buttonClass: 'hover:text-primary'
})

const isShowDrawer = ref(false)
const selectedNoticeId = ref<number | null>(null)

// 通知列表（从 props 注入或使用默认数据）
const noticeList = ref<NoticeItem[]>(
  props.noticeList && props.noticeList.length > 0 
    ? [...props.noticeList] 
    : getInitialNoticeList()
)

// 监听 props 变化，同步更新内部数据
watch(() => props.noticeList, (newList) => {
  if (newList && newList.length > 0) {
    noticeList.value = [...newList]
  }
}, { deep: true })

// 选中的通知
const selectedNotice = computed(() => {
  if (!selectedNoticeId.value) return null
  return noticeList.value.find(notice => notice.id === selectedNoticeId.value) || null
})

// Drawer 宽度（根据是否选中通知动态调整）
const drawerWidth = computed(() => {
  return selectedNoticeId.value ? 'w-[48rem]' : 'w-96'
})

// Drawer 标题
const drawerTitle = computed(() => {
  return selectedNotice.value?.title || t('common.notice')
})

// 未读通知数量
const unreadCount = computed(() => {
  return noticeList.value.filter(notice => !notice.read).length
})

// 切换 Drawer 显示状态
const toggleDrawer = () => {
  isShowDrawer.value = !isShowDrawer.value
  if (!isShowDrawer.value) {
    // 关闭时重置选中状态
    selectedNoticeId.value = null
  }
  // 调用父组件传入的通知点击回调
  if (isShowDrawer.value) {
    props.onNoticeClick?.()
  }
}

// 选择通知
const selectNotice = (notice: NoticeItem) => {
  selectedNoticeId.value = notice.id
  // 标记为已读
  if (!notice.read) {
    notice.read = true
  }
}

// 返回通知列表
const backToNoticeList = () => {
  selectedNoticeId.value = null
}

// 标记所有为已读
const markAllAsRead = () => {
  noticeList.value.forEach(notice => {
    notice.read = true
  })
  Toast({ message: '已标记所有通知为已读', type: 'success' })
}

// 删除通知
const deleteNotice = (notice: NoticeItem) => {
  const index = noticeList.value.findIndex(n => n.id === notice.id)
  if (index > -1) {
    noticeList.value.splice(index, 1)
    if (selectedNoticeId.value === notice.id) {
      selectedNoticeId.value = null
    }
    Toast({ message: '通知已删除', type: 'success' })
  }
}

// 处理通知操作
const handleNoticeAction = (notice: NoticeItem) => {
  Toast({ message: `执行操作: ${notice.actionText || '查看详情'}`, type: 'message' })
  // TODO: 根据 actionUrl 跳转或执行相应操作
}

// 获取通知类型样式
const getNoticeTypeClass = (type: NoticeType): string => {
  const classMap: Record<NoticeType, string> = {
    info: 'bg-info/20 text-info',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    error: 'bg-error/20 text-error',
    system: 'bg-primary/20 text-primary'
  }
  return classMap[type] || 'bg-base-200 text-base-content'
}

// 获取通知类型图标
const getNoticeTypeIcon = (type: NoticeType): string => {
  const iconMap: Record<NoticeType, string> = {
    info: 'info-circle',
    success: 'check-circle',
    warning: 'exclamation-triangle',
    error: 'times-circle',
    system: 'cog'
  }
  return iconMap[type] || 'bell'
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

// 格式化详细时间
const formatDetailTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

</script>
<template>
  <div key="notice-drawer" style="padding: 0; margin: 0;">
    <btn item :class="buttonClass" @click="toggleDrawer" class="relative">
      <icn name="bell" light lg></icn>
      <span v-if="unreadCount > 0" 
        class="absolute -top-0.1 -right-0.1 bg-error text-error-content text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </btn>
    <Drawer 
      :title="drawerTitle" 
      :width="drawerWidth" 
      :isShow="isShowDrawer" 
      @update:isShow="isShowDrawer = $event"
      :overflow="true"
    >
      <div class="flex h-full">
        <!-- 通知列表 -->
        <div 
          :class="[
            'flex flex-col',
            selectedNoticeId ? 'w-80 flex-shrink-0' : 'w-full'
          ]"
        >
          <!-- 工具栏 -->
          <div class="p-3 flex items-center justify-between bg-base-150">
            <span class="text-sm font-medium">
              通知 ({{ unreadCount }} 条未读)
            </span>
            <btn clean size="xl" @click="markAllAsRead" :disabled="unreadCount === 0">
              <icn name="broom" light xl :class="unreadCount === 0 ? 'opacity-50' : 'hover:text-primary'"></icn>
            </btn>
          </div>

          <!-- 通知列表 -->
          <div :class="['flex-1 overflow-y-auto']">
            <div 
              v-for="notice in noticeList" 
              :key="notice.id"
              :class="[
                'p-3 cursor-pointer hover:bg-base-200 transition-colors border-b border-base-200',
                selectedNoticeId === notice.id ? 'bg-base-200' : '',
                !notice.read ? 'bg-base-50' : ''
              ]"
              @click="selectNotice(notice)"
            >
              <div class="flex items-start gap-3">
                <!-- 通知图标 -->
                <div :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                  getNoticeTypeClass(notice.type)
                ]">
                  <icn :name="notice.icon || getNoticeTypeIcon(notice.type)" light sm></icn>
                </div>

                <!-- 通知信息 -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-1">
                    <div class="flex items-center gap-2 flex-1 min-w-0">
                      <span class="font-medium text-sm truncate">{{ notice.title }}</span>
                      <span v-if="notice.important" class="text-warning flex-shrink-0">
                        <icn name="star" light xs></icn>
                      </span>
                    </div>
                    <span v-if="!notice.read" class="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2"></span>
                  </div>
                  <p class="text-sm text-base-content line-clamp-2 mb-1">{{ notice.content }}</p>
                  <div class="flex items-center gap-2">
                    <span v-if="notice.category" class="text-xs px-2 py-0.5 rounded bg-base-200 text-base-content">
                      {{ notice.category }}
                    </span>
                    <span class="text-xs text-base-content">
                      {{ formatTime(notice.time) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 空状态 -->
            <div v-if="noticeList.length === 0" class="flex flex-col items-center justify-center py-20">
              <icn name="bell" light xl class="mb-4 text-base-content/30"></icn>
              <p class="text-base-content/60 text-sm">暂无通知</p>
            </div>
          </div>
        </div>

        <!-- 通知详情 -->
        <div v-if="selectedNoticeId && selectedNotice" class="flex-1 flex flex-col border-l-2 border-solid border-base-200">
          <!-- 详情头部 -->
          <div class="bg-base-150">
            <div class="flex items-center justify-between m-3">
              <div class="flex items-center gap-3 flex-1">
                <btn clean size="xl" @click="backToNoticeList" class="md:hidden">
                  <icn name="arrow-left" light sm></icn>
                </btn>
                <div :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0',
                  getNoticeTypeClass(selectedNotice.type)
                ]">
                  <icn :name="selectedNotice.icon || getNoticeTypeIcon(selectedNotice.type)" light md></icn>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h2 class="text-lg font-bold truncate">{{ selectedNotice.title }}</h2>
                    <span v-if="selectedNotice.important" class="text-warning flex-shrink-0">
                      <icn name="star" light sm></icn>
                    </span>
                  </div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span :class="[
                      'text-xs px-2 py-1 rounded',
                      getNoticeTypeClass(selectedNotice.type)
                    ]">
                      {{ selectedNotice.category || selectedNotice.type }}
                    </span>
                    <span class="text-xs text-base-content/60">
                      {{ formatDetailTime(selectedNotice.time) }}
                    </span>
                  </div>
                </div>
              </div>
              <btn clean size="xl" @click="deleteNotice(selectedNotice)">
                <icn name="trash" light lg class="hover:text-error"></icn>
              </btn>
            </div>
          </div>

          <!-- 通知内容 -->
          <div class="flex-1 overflow-y-auto p-6 bg-base-250">
            <Card shadow rounded>
              <div class="space-y-4">
                <!-- 通知正文 -->
                <div class="prose max-w-none">
                  <p class="text-base-content leading-relaxed whitespace-pre-wrap">
                    {{ selectedNotice.content }}
                  </p>
                </div>

                <!-- 操作按钮 -->
                <div v-if="selectedNotice.actionText" class="pt-4 border-t border-base-200">
                  <btn 
                    color="primary" 
                    @click="handleNoticeAction(selectedNotice)"
                  >
                    <icn name="arrow-right" light sm class="mr-2"></icn>
                    {{ selectedNotice.actionText }}
                  </btn>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <!-- 未选中通知时的提示 -->
        <div v-else class="flex-1 flex flex-col items-center justify-center py-20 px-3 bg-base-100">
          <icn name="bell" light xl class="mb-4 text-base-content"></icn>
          <p class="text-base-content text-lg">选择一个通知查看详情</p>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.75;
}
</style>

