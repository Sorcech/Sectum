<script setup lang="ts">
import { onMounted } from 'vue';
import { Store } from '../../Config/storage'

// 从全局对象获取 I18n（由使用 sectum 的项目提供）
const getI18n = () => {
  if (typeof window !== 'undefined' && (window as any).globalUtils?.I18n) {
    return (window as any).globalUtils.I18n
  }
  console.warn('I18n not found. Please ensure vue-i18n is configured and globalUtils.I18n is set in window.globalUtils.')
  return null
}

const setLanguage = (locale: 'zh-CN' | 'en-US') => {
  const I18n = getI18n()
  if (!I18n) return false
  
  if (locale !== I18n.global.locale.value) {
    Store.setLocalStorage('locale', locale)
    I18n.global.locale.value = locale
    return true
  }
  return false
}

onMounted(() => {
  const I18n = getI18n()
  if (I18n && Store.getLocalStorage('locale')) {
    I18n.global.locale.value = Store.getLocalStorage('locale')
  }
})

</script>
<template>
  <Dropdown placement="bottom" hover>
    <template #trigger>
      <btn item class="hover:text-primary">
        <icn name="language" light xl></icn>
      </btn>
    </template>
    <Menu rounded shadow class="bg-base-300 dark:bg-base-100 w-auto min-w-32 mt-5">
      <btn clean @click="setLanguage('en-US')">
        English
      </btn>
      <btn clean @click="setLanguage('zh-CN')">
        中文
      </btn>
    </Menu>
  </Dropdown>
</template>
