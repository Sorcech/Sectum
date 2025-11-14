<template>
  <div class="flex flex-row">
    <div class="flex flex-col h-screen w-16 bg-base-100 dark:bg-gray-800 dark:border-gray-600">
      <Menu class="flex flex-col h-full">
        <component 
          v-if="props.plusComponent !== null"
          :is="props.plusComponent || defaultPlusComponent"
          button-class="hover:text-primary flex items-center justify-center w-full h-12"
          :on-task-create="props.onTaskCreate"
          :on-account-create="props.onAccountCreate"
          :create-options="plusCreateOptions"
        />
        <component 
          v-if="props.userComponent !== null"
          :is="props.userComponent || defaultUserComponent"
          button-class="hover:text-primary flex items-center justify-center w-full h-12"
          :on-logout="props.onLogout"
          :on-setting-click="props.onSettingClick"
          :on-navigate="props.onNavigate"
          :user-info="userInfo"
        />
        <component 
          v-if="props.contactComponent !== null"
          :is="props.contactComponent || defaultContactComponent"
          button-class="hover:text-primary flex items-center justify-center w-full h-12"
          :on-notice-click="props.onContactClick"
          :contact-list="contactList"
        />
        <component 
          v-if="props.fullScreenComponent !== null"
          :is="props.fullScreenComponent || defaultFullScreenComponent"
          class="flex items-center justify-center w-full h-12"
        />
        <component 
          v-if="props.darkComponent !== null"
          :is="props.darkComponent || defaultDarkComponent"
          class="hover:text-primary flex items-center justify-center h-12"
        />
        <component 
          v-if="props.themeComponent !== null"
          :is="props.themeComponent || defaultThemeComponent"
          mode="drawer"
          button-class="hover:text-primary flex items-center justify-center w-full h-12"
        />
        <component 
          v-if="props.languageComponent !== null"
          :is="props.languageComponent || defaultLanguageComponent"
          mode="drawer"
          button-class="hover:text-primary flex items-center justify-center w-full h-12"
        />
        <component 
          v-if="props.noticeComponent !== null"
          :is="props.noticeComponent || defaultNoticeComponent"
          button-class="hover:text-primary flex items-center justify-center w-full h-12"
          :on-notice-click="props.onNoticeClick"
          :notice-list="noticeList"
        />
        <component 
          v-if="props.messageComponent !== null"
          :is="props.messageComponent || defaultMessageComponent"
          button-class="hover:text-primary flex items-center justify-center w-full h-12"
          :on-notice-click="props.onMessageClick"
          :message-list="messageList"
          :conversations="conversations"
        />
        <component 
          v-if="props.cartComponent !== null"
          :is="props.cartComponent || defaultCartComponent"
          button-class="hover:text-primary flex items-center justify-center w-full h-12"
          :on-notice-click="props.onCartClick"
          :cart-items="cartItems"
        />
      </Menu>
    </div>
  </div>
</template>  
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import I18n from '~/locale'
import { Store } from '~/packet/Config/storage'
import Theme from '~/packet/Pattern/Theme/Theme.vue'
import Language from '~/packet/Pattern/Language/Language.vue'
import User from '~/packet/Pattern/User/User.vue'
import Plus from '~/packet/Pattern/Plus/Plus.vue'
import Notice from '~/packet/Pattern/Notice/Notice.vue'
import Dark from '~/packet/Pattern/Dark/DarkToggle.vue'
import FullScreen from '~/packet/Pattern/FullScreen/FullScreen.vue'
import Message from '~/packet/Pattern/Message/Message.vue'
import Contact from '~/packet/Pattern/Contact/Contact.vue'
import Cart from '~/packet/Pattern/Cart/Cart.vue'
import { getInitialMessageList, getInitialConversations } from '~/packet/Pattern/Message/MessageData'
import type { MessageItem, ConversationMessage } from '~/packet/Pattern/Message/Message'
import { getInitialNoticeList } from '~/packet/Pattern/Notice/NoticeData'
import type { NoticeItem } from '~/packet/Pattern/Notice/Notice'
import { getInitialContactList } from '~/packet/Pattern/Contact/ContactData'
import type { ContactItem } from '~/packet/Pattern/Contact/Contact'
import { getCreateOptions } from '~/packet/Pattern/Plus/PlusData'
import type { CreateOption } from '~/packet/Pattern/Plus/Plus'
import { getInitialUserInfo } from '~/packet/Pattern/User/User'
import type { UserInfo } from '~/packet/Pattern/User/User'
import { getInitialCartItems } from '~/packet/Pattern/Cart/CartData'
import type { CartItem } from '~/packet/Pattern/Cart/Cart'

// 默认组件（作为 fallback）
const defaultPlusComponent = Plus
const defaultUserComponent = User
const defaultDarkComponent = Dark
const defaultThemeComponent = Theme
const defaultLanguageComponent = Language
const defaultNoticeComponent = Notice
const defaultFullScreenComponent = FullScreen
const defaultMessageComponent = Message
const defaultContactComponent = Contact
const defaultCartComponent = Cart

// Message 组件数据源（从 MessageData.ts 注入）
const messageList = ref<MessageItem[]>(getInitialMessageList())
const conversations = ref<Record<number, ConversationMessage[]>>(getInitialConversations())

// Notice 组件数据源（从 NoticeData.ts 注入）
const noticeList = ref<NoticeItem[]>(getInitialNoticeList())

// Contact 组件数据源（从 ContactData.ts 注入）
const contactList = ref<ContactItem[]>(getInitialContactList())

// Plus 组件数据源（从 PlusData.ts 注入）
const plusCreateOptions = ref<CreateOption[]>(getCreateOptions() as CreateOption[])

// User 组件数据源（从 UserData.ts 注入）
// @ts-ignore - getInitialUserInfo 返回 UserProfile，但 UserInfo 需要 id 属性
const userInfo = ref<UserInfo>(getInitialUserInfo() as any)

// Cart 组件数据源（从 CartData.ts 注入）
const cartItems = ref<CartItem[]>(getInitialCartItems())

// Props 定义
const props = withDefaults(defineProps<{
  // 组件注入（传入 null 可隐藏该组件，传入组件实例可替换默认组件，不传则使用默认组件）
  plusComponent?: any
  userComponent?: any
  darkComponent?: any
  themeComponent?: any
  languageComponent?: any
  noticeComponent?: any
  fullScreenComponent?: any
  messageComponent?: any
  contactComponent?: any
  cartComponent?: any
  // 回调函数
  onLogout?: () => void | Promise<void>
  onThemeChange?: (theme: string) => void
  onLanguageChange?: (locale: 'zh-CN' | 'en-US') => void
  onNavigate?: (path: string) => void
  onTaskCreate?: (formData?: any) => void
  onAccountCreate?: (formData?: any) => void
  onNoticeClick?: () => void
  onMessageClick?: () => void
  onContactClick?: () => void
  onCartClick?: () => void
  onSearchClick?: () => void
  onSettingClick?: () => void
}>(), {
  // 默认显示所有组件（undefined 表示使用默认组件）
})

onMounted(() => {
  if (Store.getLocalStorage('locale')) {
    I18n.global.locale.value = Store.getLocalStorage('locale')
  }
})
</script>

