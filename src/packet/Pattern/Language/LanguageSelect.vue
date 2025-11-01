<script setup lang="ts">
import { onMounted } from 'vue';
import I18n from '~/locale'
import { Store } from '~/packet/Config/storage'

const setLanguage = (locale: 'zh-CN' | 'en-US') => {
  if (locale !== I18n.global.locale.value) {
    Store.setLocalStorage('locale', locale)
    I18n.global.locale.value = locale
    return true
  } {
    return false
  }
}

onMounted(() => {
  if (Store.getLocalStorage('locale')) {
    I18n.global.locale.value = Store.getLocalStorage('locale')
  }
})

</script>
<template>
  <Dropdown placement="bottom" hover>
    <template #trigger="{ active }">
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
