<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { Store } from '../../Config/storage'
const { t } = useI18n();

const isTheme = ref<string>('theme-default')

// 主题列表配置
const themes = [
  { theme: 'theme-default', class: 'theme-blue', bg: 'bg-blue-700', key: 'theme.blue' },
  { theme: 'theme-teal', class: 'theme-teal', bg: 'bg-teal-700', key: 'theme.teal' },
  { theme: 'theme-rose', class: 'theme-rose', bg: 'bg-rose-700', key: 'theme.rose' },
  { theme: 'theme-violet', class: 'theme-violet', bg: 'bg-violet-700', key: 'theme.violet' },
  { theme: 'theme-orange', class: 'theme-orange', bg: 'bg-orange-700', key: 'theme.orange' }
]

// 获取主题对应的 CSS 类名
function getThemeClass(theme: string): string {
  const themeItem = themes.find(t => t.theme === theme || t.class === theme)
  return themeItem?.class || 'theme-blue'
}

onMounted(() => {
  const savedTheme = Store.getLocalStorage('theme')
  if (savedTheme) {
    isTheme.value = savedTheme
  }
  const themeClass = getThemeClass(isTheme.value)
  document.documentElement.classList.add(themeClass);
})

function changeTheme(color: string) {
  const oldThemeClass = getThemeClass(isTheme.value)
  document.documentElement.classList.remove(oldThemeClass);
  isTheme.value = color;
  const newThemeClass = getThemeClass(isTheme.value)
  document.documentElement.classList.add(newThemeClass);
  Store.setLocalStorage('theme', isTheme.value);
}

// 检查是否为当前主题
function isCurrentTheme(item: typeof themes[0]): boolean {
  // 直接匹配 theme 值
  if (item.theme === isTheme.value) {
    return true
  }
  // 兼容旧版本的存储值（可能存储的是 class 值）
  if (item.class === isTheme.value) {
    return true
  }
  return false
}

</script>
<template>
  <Dropdown placement="bottom" hover>
    <template #trigger>
      <btn item class="hover:text-primary">
        <icn name="swatchbook" light xl></icn>
      </btn>
    </template>
    <Menu shadow rounded class="bg-base-300 dark:bg-base-100 w-auto min-w-32">
      <btn 
        v-for="item in themes" 
        :key="item.theme"
        clean 
        :disabled="isCurrentTheme(item)"
        @click="changeTheme(item.theme)" 
        :class="[
          'w-full flex items-center gap-3 whitespace-nowrap',
          isCurrentTheme(item) ? 'text-primary font-semibold' : ''
        ]"
      >
        <span :class="[item.class, 'rounded-$rounded-btn', item.bg, 'h-6 w-6 flex-shrink-0']"></span>{{ t(item.key) }}
      </btn>
    </Menu>
  </Dropdown>
</template>
