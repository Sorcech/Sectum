<template>
  <!-- 单按钮模式（只有两种语言时） -->
  <btn 
    v-if="isTwoLanguagesMode"
    item 
    @click="toggleLanguage" 
    class="hover:text-primary hover:border-primary relative p-0 border border-solid  border-base-content/20 rounded-md overflow-visible"
    style="min-width: 1.5rem; width: 1.5rem; height: 1.5rem;"
  >
    <span class="relative inline-flex items-center justify-center w-full h-full">
      <!-- 非当前语言的字符（左上角，小尺寸，默认颜色，可以重叠） -->
      <template v-for="locale in availableLocales" :key="`top-${locale}`">
        <span 
          v-if="locale !== currentLocale"
          class="absolute text-base-content/60 leading-none pointer-events-none"
          :style="getTopCharStyle(locale)"
        >
          {{ getLocaleChar(locale) }}
        </span>
      </template>
      
      <!-- 当前语言的字符（右下角，大尺寸，主题色，可以重叠） -->
      <template v-for="locale in availableLocales" :key="`bottom-${locale}`">
        <span 
          v-if="locale === currentLocale"
          class="absolute text-primary font-bold leading-none pointer-events-none"
          :style="getBottomCharStyle(locale)"
        >
          {{ getLocaleChar(locale) }}
        </span>
      </template>
    </span>
  </btn>

  <!-- 下拉列表模式（多于两种语言时） -->
  <Dropdown v-else placement="bottom" hover>
    <template #trigger>
      <btn item class="hover:text-primary relative group">
        <icn name="globe" light xl></icn>
        <!-- 当前语言字符显示在图标右上方，鼠标悬停时隐藏 -->
        <span
          class="absolute text-primary font-bold leading-none pointer-events-none bg-base-100 rounded-xs p-0.1 group-hover:opacity-0 transition-opacity duration-200"
          :style="{right: '0.03rem',bottom: '0.03rem',fontSize: '0.75rem',zIndex: 2,transform: 'translate(0, 0)'}"
        >
          {{ getLocaleChar(currentLocale) }}
        </span>
      </btn>
    </template>
    <Menu shadow rounded class="bg-base-300 dark:bg-base-100 w-auto min-w-32">
      <btn 
        v-for="locale in availableLocales" 
        :key="locale"
        clean 
        :disabled="currentLocale === locale"
        @click="setLanguage(locale)"
        :class="[
          'w-full flex items-center gap-3 whitespace-nowrap',
          currentLocale === locale ? 'text-primary font-semibold' : ''
        ]"
      >
        {{ getLocaleName(locale) }}
      </btn>
    </Menu>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Store } from '../../Config/storage'
import Dropdown from '../../Section/Dropdown/Dropdown.vue'
import Menu from '../../Section/Menu/Menu.vue'

// 从全局对象获取 I18n（由使用 sectum 的项目提供）
const getI18n = () => {
  if (typeof window !== 'undefined' && (window as any).globalUtils?.I18n) {
    return (window as any).globalUtils.I18n
  }
  console.warn('I18n not found. Please ensure vue-i18n is configured and globalUtils.I18n is set in window.globalUtils.')
  return null
}


const currentLocale = ref<string>('zh-CN')// 当前语言
const availableLocales = ref<string[]>([])// 可用语言列表
const isTwoLanguagesMode = computed(() => availableLocales.value.length === 2)// 判断是否为两种语言模式

// 获取所有可用语言
const getAvailableLocales = (): string[] => {
  const I18n = getI18n()
  if (!I18n) return ['zh-CN', 'en-US']
  
  // 尝试从 I18n 实例获取可用语言
  if (I18n.global?.availableLocales && Array.isArray(I18n.global.availableLocales)) {
    return I18n.global.availableLocales
  }
  
  // 如果没有 availableLocales，从 messages 获取
  if (I18n.global?.messages?.value && typeof I18n.global.messages.value === 'object') {
    return Object.keys(I18n.global.messages.value)
  }
  
  // 默认返回两种语言
  return ['zh-CN', 'en-US']
}

// 获取语言显示名称
const getLocaleName = (locale: string): string => {
  const localeNames: Record<string, string> = {
    'zh-CN': '中文',
    'zh': '中文',
    'en-US': 'English',
    'en': 'English',
    'ja-JP': '日本語',
    'ja': '日本語',
    'ko-KR': '한국어',
    'ko': '한국어',
    'fr-FR': 'Français',
    'fr': 'Français',
    'de-DE': 'Deutsch',
    'de': 'Deutsch',
    'es-ES': 'Español',
    'es': 'Español',
    'ru-RU': 'Русский',
    'ru': 'Русский'
  }
  return localeNames[locale] || locale
}

// 获取语言字符（用于单按钮模式显示）
const getLocaleChar = (locale: string): string => {
  const localeLower = locale.toLowerCase()
  if (localeLower.startsWith('zh')) {return '文' }// 中文
  if (localeLower.startsWith('en')) {return 'A' }// 英文
  if (localeLower.startsWith('ja')) {return '日' }// 日语
  if (localeLower.startsWith('ko')) {return '한' }// 韩语
  if (localeLower.startsWith('fr')) {return 'F' }// 法语
  if (localeLower.startsWith('de')) {return 'D' }// 德语
  if (localeLower.startsWith('es')) {return 'S' }// 西班牙语
  if (localeLower.startsWith('ru')) {return 'Р' }// 俄语
  return locale.charAt(0).toUpperCase()// 默认返回首字母大写
}

// 判断是否为中日韩语言（CJK）
const isCJKLocale = (locale: string): boolean => {
  const localeLower = locale.toLowerCase()
  return localeLower.startsWith('zh') || 
         localeLower.startsWith('ja') || 
         localeLower.startsWith('ko')
}

// 获取左上角字符的样式（根据语言类型）
const getTopCharStyle = (locale: string) => {
  const isCJK = isCJKLocale(locale)
  
  if (isCJK) {
    // 中日韩语言样式：较小的字体，较小偏移
    return {
      left: '0.1rem',
      top: '0.1rem',
      fontSize: '0.5rem',
      zIndex: 1,
      transform: 'translate(10%, -10%)'
    }
  } else {
    // 拉丁语言样式：较大的字体，较大偏移
    return {
      left: '0.03rem',
      top: '0.03rem',
      fontSize: '0.75rem',
      zIndex: 1,
      transform: 'translate(10%, -10%)'
    }
  }
}


// 获取右下角字符的样式（根据语言类型）- 用于双语言模式
const getBottomCharStyle = (locale: string) => {
  const isCJK = isCJKLocale(locale)
  
  if (isCJK) {
    // 中日韩语言样式：相对较小的字体
    return {
      right: '0.03rem',
      bottom: '0.03rem',
      fontSize: '0.875rem',
      zIndex: 2,
      transform: 'translate(0, 0)'
    }
  } else {
    // 拉丁语言样式：较大的字体
    return {
      right: '0.03rem',
      bottom: '0.03rem',
      fontSize: '1rem',
      zIndex: 2,
      transform: 'translate(0, 0)'
    }
  }
}

// 切换语言（两种语言模式下）
const toggleLanguage = () => {
  const I18n = getI18n()
  if (!I18n || availableLocales.value.length !== 2) return
  
  // 获取另一种语言
  const otherLocale = availableLocales.value.find(locale => locale !== currentLocale.value)
  if (otherLocale) {
    setLanguage(otherLocale)
  }
}

// 设置语言
const setLanguage = (locale: string) => {
  const I18n = getI18n()
  if (!I18n) return false
  if (locale !== I18n.global.locale.value) {
    Store.setLocalStorage('locale', locale)
    I18n.global.locale.value = locale
    currentLocale.value = locale
    return true
  }
  return false
}

// 初始化
onMounted(() => {
  const I18n = getI18n()
  if (I18n) {
    // 获取可用语言列表
    availableLocales.value = getAvailableLocales()
    
    // 从存储或当前设置获取语言
    const savedLocale = Store.getLocalStorage('locale')
    if (savedLocale && availableLocales.value.includes(savedLocale)) {
      I18n.global.locale.value = savedLocale
      currentLocale.value = savedLocale
    } else {
      currentLocale.value = I18n.global.locale.value
    }
    
    // 监听语言变化
    watch(() => I18n.global.locale.value, (newLocale) => {
      currentLocale.value = newLocale
    })
  } else {
    // 如果 I18n 不可用，使用默认值
    availableLocales.value = ['zh-CN', 'en-US']
    const savedLocale = Store.getLocalStorage('locale') || 'zh-CN'
    currentLocale.value = savedLocale
  }
})
</script>
