<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import Drawer from '../../Section/Drawer/Drawer.vue'
import Card from '../../Section/Card/Card.vue'
import Toast from '../../Element/Toast/Toast'
import type { ContactItem } from './Contact'
import { getInitialContactList } from './ContactData'

const { t } = useI18n()

// Props 定义
const props = withDefaults(defineProps<{
  buttonClass?: string
  onNoticeClick?: () => void
  contactList?: ContactItem[]
}>(), {
  buttonClass: 'hover:text-primary'
})

const isShowDrawer = ref(false)
const selectedContactId = ref<number | null>(null)
const searchQuery = ref('')

// 联系人列表（从 props 注入或使用默认数据）
const contactList = ref<ContactItem[]>(
  props.contactList && props.contactList.length > 0 
    ? [...props.contactList] 
    : getInitialContactList()
)

// 监听 props 变化，同步更新内部数据
watch(() => props.contactList, (newList) => {
  if (newList && newList.length > 0) {
    contactList.value = [...newList]
  }
}, { deep: true })

// 选中的联系人
const selectedContact = computed(() => {
  if (!selectedContactId.value) return null
  return contactList.value.find(contact => contact.id === selectedContactId.value) || null
})

// Drawer 宽度（根据是否选中联系人动态调整）
const drawerWidth = computed(() => {
  return selectedContactId.value ? 'w-[48rem]' : 'w-96'
})

// Drawer 标题
const drawerTitle = computed(() => {
  return selectedContact.value?.name || t('common.contact')
})

// 过滤后的联系人列表
const filteredContactList = computed(() => {
  if (!searchQuery.value) {
    return contactList.value
  }
  const query = searchQuery.value.toLowerCase()
  return contactList.value.filter(contact =>
    contact.name.toLowerCase().includes(query) ||
    contact.position.toLowerCase().includes(query) ||
    contact.department.toLowerCase().includes(query) ||
    contact.email.toLowerCase().includes(query)
  )
})

// 按部门分组的联系人
const groupedContacts = computed(() => {
  const groups: Record<string, ContactItem[]> = {}
  filteredContactList.value.forEach(contact => {
    if (!groups[contact.department]) {
      groups[contact.department] = []
    }
    groups[contact.department].push(contact)
  })
  return groups
})

// 切换 Drawer 显示状态
const toggleDrawer = () => {
  isShowDrawer.value = !isShowDrawer.value
  if (!isShowDrawer.value) {
    // 关闭时重置选中状态
    selectedContactId.value = null
    searchQuery.value = ''
  }
  // 调用父组件传入的通知点击回调
  if (isShowDrawer.value) {
    props.onNoticeClick?.()
  }
}

// 选择联系人
const selectContact = (contact: ContactItem) => {
  selectedContactId.value = contact.id
}

// 返回联系人列表
const backToContactList = () => {
  selectedContactId.value = null
}

// 发送邮件
const sendEmail = (email: string) => {
  window.location.href = `mailto:${email}`
  Toast({ message: `正在打开邮件客户端...`, type: 'message' })
}

// 拨打电话
const makeCall = (phone: string) => {
  window.location.href = `tel:${phone}`
  Toast({ message: `正在拨打电话...`, type: 'message' })
}

// 发送消息
const sendMessage = (contact: ContactItem) => {
  Toast({ message: `正在打开与 ${contact.name} 的聊天...`, type: 'message' })
  // TODO: 打开消息窗口
}

// 获取姓名首字母（用于头像）
const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

</script>
<template>
  <div key="contact-drawer" style="padding: 0; margin: 0;">
    <btn item :class="buttonClass" @click="toggleDrawer">
      <icn name="address-book" light lg></icn>
    </btn>
    <Drawer 
      :title="drawerTitle" 
      :width="drawerWidth" 
      :isShow="isShowDrawer" 
      @update:isShow="isShowDrawer = $event"
      :overflow="true"
    >
      <div class="flex h-full">
        <!-- 联系人列表 -->
        <div 
          :class="[
            'flex flex-col',
            selectedContactId ? 'w-80 flex-shrink-0' : 'w-full'
          ]"
        >
          <!-- 搜索框 -->
          <div class="p-3 bg-base-150">
            <ipt 
              v-model="searchQuery"
              placeholder="搜索联系人..." 
              class="w-full"
            >
              <icn name="search" light sm slot="prefix"></icn>
            </ipt>
          </div>

          <!-- 联系人列表 -->
          <div class="flex-1 overflow-y-auto">
            <template v-if="filteredContactList.length > 0">
              <div 
                v-for="(contacts, department) in groupedContacts" 
                :key="department"
              >
                <!-- 部门标题 -->
                <div class="px-3 py-2 bg-base-250 text-xs font-medium text-base-content/60 sticky top-0">
                  {{ department }} ({{ contacts.length }})
                </div>
                <!-- 部门联系人 -->
                <div 
                  v-for="contact in contacts" 
                  :key="contact.id"
                  :class="[
                    'cursor-pointer hover:bg-base-200 transition-colors border-b-1 border-b-solid border-base-200',
                    selectedContactId === contact.id ? 'bg-base-200' : ''
                  ]"
                  @click="selectContact(contact)"
                >
                  <div class="flex items-center gap-3">
                    <!-- 头像 -->
                    <div class="relative flex-shrink-0">
                      <div class="w-12 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span v-if="!contact.avatar" class="text-primary font-medium text-sm">
                          {{ getInitials(contact.name) }}
                        </span>
                        <img v-else :src="contact.avatar" :alt="contact.name" class="w-full h-full rounded-full object-cover" />
                      </div>
                      <span 
                        v-if="contact.isOnline" 
                        class="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-200"
                      ></span>
                    </div>

                    <!-- 联系人信息 -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-1">
                        <span class="font-medium text-sm truncate">{{ contact.name }}</span>
                        <span v-if="contact.isOnline" class="text-xs text-base-content/60">在线</span>
                      </div>
                      <p class="text-xs text-base-content/60 truncate">{{ contact.position }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- 空状态 -->
            <div v-else class="flex flex-col items-center justify-center py-20">
              <icn name="address-book" light xl class="mb-4 text-base-content/30"></icn>
              <p class="text-base-content/60 text-sm">未找到联系人</p>
            </div>
          </div>
        </div>

        <!-- 联系人详情 -->
        <div v-if="selectedContactId && selectedContact" class="flex-1 flex flex-col border-l border-l-solid border-base-300">
          <!-- 详情头部 -->
          <div class="p-4  bg-base-150">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-4 flex-1">
                <btn variant="transparent" size="sm" @click="backToContactList" class="md:hidden">
                  <icn name="arrow-left" light sm></icn>
                </btn>
                <div class="relative">
                  <div class="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <span v-if="!selectedContact.avatar" class="text-primary font-bold text-2xl">
                      {{ getInitials(selectedContact.name) }}
                    </span>
                    <img 
                      v-else 
                      :src="selectedContact.avatar" 
                      :alt="selectedContact.name" 
                      class="w-full h-full rounded-full object-cover" 
                    />
                  </div>
                  <span 
                    v-if="selectedContact.isOnline" 
                    class="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-base-200"
                  ></span>
                </div>
                <div class="flex-1 min-w-0">
                  <h2 class="text-xl font-bold mb-1">{{ selectedContact.name }}</h2>
                  <p class="text-base-content/70 mb-2">{{ selectedContact.position }}</p>
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-1 rounded bg-base-200 text-base-content/60">
                      {{ selectedContact.department }}
                    </span>
                    <span v-if="selectedContact.isOnline" class="text-xs text-success">
                      在线
                    </span>
                    <span v-else class="text-xs text-base-content/60">
                      离线
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 快捷操作 -->
            <div class="flex items-center gap-2">
              <btn variant="outline" size="sm" @click="sendMessage(selectedContact)">
                <icn name="messages" light sm class="mr-2"></icn>
                发消息
              </btn>
              <btn variant="outline" size="sm" @click="sendEmail(selectedContact.email)">
                <icn name="envelope" light sm class="mr-2"></icn>
                发邮件
              </btn>
              <btn 
                v-if="selectedContact.phone" 
                variant="outline" 
                size="sm" 
                @click="makeCall(selectedContact.phone)"
              >
                <icn name="phone" light sm class="mr-2"></icn>
                打电话
              </btn>
            </div>
          </div>

          <!-- 联系人详细信息 -->
          <div class="flex-1 overflow-y-auto p-6 bg-base-200">
            <Card shadow rounded>
              <div class="space-y-6">
                <!-- 联系方式 -->
                <div>
                  <h3 class="text-sm font-semibold text-base-content/70 mb-3">联系方式</h3>
                  <div class="space-y-3">
                    <div class="flex items-center gap-3">
                      <icn name="envelope" light sm class="text-base-content/60"></icn>
                      <div class="flex-1">
                        <p class="text-xs text-base-content/60">邮箱</p>
                        <a 
                          :href="`mailto:${selectedContact.email}`" 
                          class="text-sm text-primary hover:underline"
                        >
                          {{ selectedContact.email }}
                        </a>
                      </div>
                    </div>
                    <div v-if="selectedContact.phone" class="flex items-center gap-3">
                      <icn name="phone" light sm class="text-base-content/60"></icn>
                      <div class="flex-1">
                        <p class="text-xs text-base-content/60">电话</p>
                        <a 
                          :href="`tel:${selectedContact.phone}`" 
                          class="text-sm text-primary hover:underline"
                        >
                          {{ selectedContact.phone }}
                        </a>
                      </div>
                    </div>
                    <div v-if="selectedContact.mobile" class="flex items-center gap-3">
                      <icn name="mobile-alt" light sm class="text-base-content/60"></icn>
                      <div class="flex-1">
                        <p class="text-xs text-base-content/60">手机</p>
                        <a 
                          :href="`tel:${selectedContact.mobile}`" 
                          class="text-sm text-primary hover:underline"
                        >
                          {{ selectedContact.mobile }}
                        </a>
                      </div>
                    </div>
                    <div v-if="selectedContact.office" class="flex items-center gap-3">
                      <icn name="building" light sm class="text-base-content/60"></icn>
                      <div class="flex-1">
                        <p class="text-xs text-base-content/60">办公室</p>
                        <p class="text-sm text-base-content">{{ selectedContact.office }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 标签 -->
                <div v-if="selectedContact.tags && selectedContact.tags.length > 0">
                  <h3 class="text-sm font-semibold text-base-content/70 mb-3">标签</h3>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="tag in selectedContact.tags" 
                      :key="tag"
                      class="text-xs px-2 py-1 rounded bg-primary/20 text-primary"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <!-- 备注 -->
                <div v-if="selectedContact.notes">
                  <h3 class="text-sm font-semibold text-base-content/70 mb-3">备注</h3>
                  <p class="text-sm text-base-content/80 leading-relaxed">
                    {{ selectedContact.notes }}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <!-- 未选中联系人时的提示 -->
        <div v-else class="flex-1 flex flex-col items-center justify-center py-20 px-3 bg-base-100">
          <icn name="address-book" light xl class="mb-4 text-base-content/30"></icn>
          <p class="text-base-content/60 text-lg">选择一个联系人查看详情</p>
        </div>
      </div>
    </Drawer>
  </div>
</template>

