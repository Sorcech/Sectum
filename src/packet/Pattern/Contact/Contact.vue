<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n'
import Drawer from '../../Section/Drawer/Drawer.vue'
import Card from '../../Section/Card/Card.vue'
import Toast from '../../Element/Toast/Toast'
import Avatar from '../../Element/Avatar/Avatar.vue'
import type { ContactProfile } from './Contact'

const { t } = useI18n()

const props = withDefaults(defineProps<{
  buttonClass?: string
  onNoticeClick?: () => void
  contactList?: ContactProfile[]
  autoLoad?: boolean
}>(), {
  buttonClass: 'hover:text-primary',
  autoLoad: false
})

const isShowDrawer = ref(false)
const selectedContactId = ref<number | null>(null)
const searchQuery = ref('')
const isLoading = ref(false)
const contactList = ref<ContactProfile[]>([])

watch(() => props.contactList, (newList) => {
  if (newList && newList.length > 0) {
    contactList.value = [...newList]
  }
}, { deep: true })

const handleCompanyChange = () => {}

const selectedContact = computed(() => {
  if (!selectedContactId.value) return null
  return contactList.value.find(contact => contact.Passport === selectedContactId.value) || null
})

// Drawer 宽度（根据是否选中联系人动态调整）
const drawerWidth = computed(() => {
  return selectedContactId.value ? 'w-[48rem]' : 'w-96'
})

// Drawer 标题
const drawerTitle = computed(() => {
  return selectedContact.value?.Name || t('common.contact')
})

// 过滤后的联系人列表
const filteredContactList = computed(() => {
  if (!searchQuery.value) {
    return contactList.value
  }
  const query = searchQuery.value.toLowerCase()
  return contactList.value.filter(contact =>
    (contact.Name && contact.Name.toLowerCase().includes(query)) ||
    (contact.Phone && contact.Phone.toLowerCase().includes(query)) ||
    (contact.Email && contact.Email.toLowerCase().includes(query)) ||
    (contact.Address && contact.Address.toLowerCase().includes(query))
  )
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
    if (props.contactList && props.contactList.length > 0) {
      contactList.value = [...props.contactList]
    }
  }
}

const selectContact = (contact: ContactProfile) => {
  selectedContactId.value = contact.Passport
}

// 返回联系人列表
const backToContactList = () => {
  selectedContactId.value = null
}

// 发送邮件
const sendEmail = (email: string) => {
  if (!email) {
    Toast({ message: '该联系人没有邮箱地址', type: 'error' })
    return
  }
  window.location.href = `mailto:${email}`
  Toast({ message: `正在打开邮件客户端...`, type: 'message' })
}

// 拨打电话
const makeCall = (phone: string) => {
  if (!phone) {
    Toast({ message: '该联系人没有电话号码', type: 'error' })
    return
  }
  window.location.href = `tel:${phone}`
  Toast({ message: `正在拨打电话...`, type: 'message' })
}

const sendMessage = (contact: ContactProfile) => {
  Toast({ message: `正在打开与 ${contact.Name} 的聊天...`, type: 'message' })
}

onMounted(() => {
  if (props.contactList && props.contactList.length > 0) {
    contactList.value = [...props.contactList]
  }
  window.addEventListener('company-changed', handleCompanyChange)
})

onUnmounted(() => {
  window.removeEventListener('company-changed', handleCompanyChange)
})

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
            <!-- 加载状态 -->
            <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
              <icn name="spinner" spin xl class="mb-4 text-base-content/60"></icn>
              <p class="text-base-content/60 text-sm">加载中...</p>
            </div>

            <!-- 联系人列表 -->
            <template v-else-if="filteredContactList.length > 0">
                <div 
                v-for="contact in filteredContactList" 
                :key="contact.Passport"
                  :class="[
                  'cursor-pointer hover:bg-base-200 transition-colors border-b-1 border-b-solid border-base-200 p-3',
                  selectedContactId === contact.Passport ? 'bg-base-200' : ''
                  ]"
                  @click="selectContact(contact)"
                >
                  <div class="flex items-center gap-3">
                    <!-- 头像 -->
                  <Avatar
                    :label="contact.Name"
                    size="md"
                    :clickable="false"
                  />

                    <!-- 联系人信息 -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-1">
                      <span class="font-medium text-sm truncate">{{ contact.Name || '--' }}</span>
                    </div>
                    <p class="text-xs text-base-content/60 truncate">
                      {{ contact.Phone || contact.Email || '--' }}
                    </p>
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
          <div class="p-4 bg-base-150">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-4 flex-1">
                <btn variant="transparent" size="sm" @click="backToContactList" class="md:hidden">
                  <icn name="arrow-left" light sm></icn>
                </btn>
                <Avatar
                  :label="selectedContact.Name"
                  size="xl"
                  :clickable="false"
                />
                <div class="flex-1 min-w-0">
                  <h2 class="text-xl font-bold mb-1">{{ selectedContact.Name || '--' }}</h2>
                  <p class="text-base-content/70 mb-2">
                    {{ selectedContact.Phone || selectedContact.Email || '--' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 快捷操作 -->
            <div class="flex items-center gap-2">
              <btn variant="outline" size="sm" @click="sendMessage(selectedContact)">
                <icn name="messages" light sm class="mr-2"></icn>
                发消息
              </btn>
              <btn 
                v-if="selectedContact.Email" 
                variant="outline" 
                size="sm" 
                @click="sendEmail(selectedContact.Email)"
              >
                <icn name="envelope" light sm class="mr-2"></icn>
                发邮件
              </btn>
              <btn 
                v-if="selectedContact.Phone" 
                variant="outline" 
                size="sm" 
                @click="makeCall(selectedContact.Phone)"
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
                    <div v-if="selectedContact.Email" class="flex items-center gap-3">
                      <icn name="envelope" light sm class="text-base-content/60"></icn>
                      <div class="flex-1">
                        <p class="text-xs text-base-content/60">邮箱</p>
                        <a 
                          :href="`mailto:${selectedContact.Email}`" 
                          class="text-sm text-primary hover:underline"
                        >
                          {{ selectedContact.Email }}
                        </a>
                      </div>
                    </div>
                    <div v-if="selectedContact.Phone" class="flex items-center gap-3">
                      <icn name="phone" light sm class="text-base-content/60"></icn>
                      <div class="flex-1">
                        <p class="text-xs text-base-content/60">电话</p>
                        <a 
                          :href="`tel:${selectedContact.Phone}`" 
                          class="text-sm text-primary hover:underline"
                        >
                          {{ selectedContact.Phone }}
                        </a>
                      </div>
                    </div>
                    <div v-if="selectedContact.Address" class="flex items-center gap-3">
                      <icn name="map-marker-alt" light sm class="text-base-content/60"></icn>
                      <div class="flex-1">
                        <p class="text-xs text-base-content/60">地址</p>
                        <p class="text-sm text-base-content">{{ selectedContact.Address }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 基本信息 -->
                <div>
                  <h3 class="text-sm font-semibold text-base-content/70 mb-3">基本信息</h3>
                  <div class="space-y-3">
                    <div class="flex items-center gap-3">
                      <icn name="id-card" light sm class="text-base-content/60"></icn>
                      <div class="flex-1">
                        <p class="text-xs text-base-content/60">用户ID</p>
                        <p class="text-sm text-base-content">{{ selectedContact.Passport }}</p>
                      </div>
                    </div>
                    <div v-if="selectedContact.Gender !== undefined && selectedContact.Gender !== null && selectedContact.Gender !== ''" class="flex items-center gap-3">
                      <icn name="user" light sm class="text-base-content/60"></icn>
                      <div class="flex-1">
                        <p class="text-xs text-base-content/60">性别</p>
                        <p class="text-sm text-base-content">
                          {{ selectedContact.Gender === '0' || selectedContact.Gender === '男' ? '男' : 
                             selectedContact.Gender === '1' || selectedContact.Gender === '女' ? '女' : 
                             selectedContact.Gender }}
                        </p>
                      </div>
                    </div>
                    <div v-if="selectedContact.Birthday" class="flex items-center gap-3">
                      <icn name="calendar" light sm class="text-base-content/60"></icn>
                      <div class="flex-1">
                        <p class="text-xs text-base-content/60">生日</p>
                        <p class="text-sm text-base-content">
                          {{ typeof selectedContact.Birthday === 'string' ? selectedContact.Birthday : new Date(selectedContact.Birthday).toLocaleDateString() }}
                        </p>
                      </div>
                    </div>
                    <div v-if="selectedContact.CreateAt" class="flex items-center gap-3">
                      <icn name="clock" light sm class="text-base-content/60"></icn>
                      <div class="flex-1">
                        <p class="text-xs text-base-content/60">创建时间</p>
                        <p class="text-sm text-base-content">
                          {{ typeof selectedContact.CreateAt === 'string' ? selectedContact.CreateAt : new Date(selectedContact.CreateAt).toLocaleString() }}
                        </p>
                      </div>
                    </div>
                  </div>
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

