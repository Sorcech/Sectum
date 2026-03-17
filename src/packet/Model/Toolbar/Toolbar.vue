<script setup lang="ts">
import { onMounted, ref } from 'vue'
import I18n from '~/locale'
import { Store } from '~/packet/Config/storage'
import Theme from '~/packet/Pattern/Theme/Theme.vue'
import Language from '~/packet/Pattern/Language/Language.vue'
import Plus from '~/packet/Pattern/Plus/Plus.vue'
import Dark from '~/packet/Pattern/Dark/DarkToggle.vue'
import FullScreen from '~/packet/Pattern/FullScreen/FullScreen.vue'
import Contact from '~/packet/Pattern/Contact/Contact.vue'
import { getInitialContactList } from '~/packet/Pattern/Contact/ContactData'
import type { ContactProfile } from '~/packet/Pattern/Contact/Contact'
import { getCreateOptions } from '~/packet/Pattern/Plus/Plus'
import type { CreateOption } from '~/packet/Pattern/Plus/Plus'

const defaultPlusComponent = Plus
const defaultDarkComponent = Dark
const defaultThemeComponent = Theme
const defaultLanguageComponent = Language
const defaultFullScreenComponent = FullScreen
const defaultContactComponent = Contact

const contactList = ref<ContactProfile[]>(getInitialContactList())
const plusCreateOptions = ref<CreateOption[]>(getCreateOptions() as CreateOption[])

const props = withDefaults(defineProps<{
  plusComponent?: any
  darkComponent?: any
  themeComponent?: any
  languageComponent?: any
  fullScreenComponent?: any
  contactComponent?: any
  onThemeChange?: (theme: string) => void
  onLanguageChange?: (locale: 'zh-CN' | 'en-US') => void
  onNavigate?: (path: string) => void
  onTaskCreate?: (formData?: any) => void
  onAccountCreate?: (formData?: any) => void
  onContactClick?: () => void
  onSearchClick?: () => void
  onSettingClick?: () => void
}>(), {})

onMounted(() => {
  if (Store.getLocalStorage('locale')) {
    I18n.global.locale.value = Store.getLocalStorage('locale')
  }
})
</script>

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
      </Menu>
    </div>
  </div>
</template>  