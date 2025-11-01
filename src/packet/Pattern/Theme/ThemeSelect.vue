<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { Store } from '~/packet/Config/storage'
const { t } = useI18n();

const isTheme = ref<string>('theme-blue')

onMounted(() => {
  if (Store.getLocalStorage('theme'))
    isTheme.value = Store.getLocalStorage('theme')
  document.documentElement.classList.add(isTheme.value);
})

function changeTheme(color: string) {
  document.documentElement.classList.remove(isTheme.value);
  isTheme.value = color;
  document.documentElement.classList.add(isTheme.value);
  Store.setLocalStorage('theme', isTheme.value);
}

</script>
<template>
  <Dropdown placement="bottom" hover>
    <template #trigger>
      <btn item class="hover:text-primary">
        <icn name="swatchbook" light xl></icn>
      </btn>
    </template>
    <Menu shadow rounded class="bg-base-300 dark:bg-base-100 w-auto min-w-32 mt-5" style="transform: translateX(-50%); left: 50%;">
      <btn clean @click="changeTheme('theme-default')" class="w-full flex items-center gap-3 whitespace-nowrap">
        <span class="theme-blue rounded-$rounded-btn bg-blue-700 h-6 w-6 flex-shrink-0"></span>{{ t("theme.blue") }}
      </btn>
      <btn clean @click="changeTheme('theme-teal')" class="w-full flex items-center gap-3 whitespace-nowrap">
        <span class="theme-teal rounded-$rounded-btn bg-teal-700 h-6 w-6 flex-shrink-0"></span>{{ t("theme.teal") }}
      </btn>
      <btn clean @click="changeTheme('theme-rose')" class="w-full flex items-center gap-3 whitespace-nowrap">
        <span class="theme-rose rounded-$rounded-btn bg-rose-700 h-6 w-6 flex-shrink-0"></span>{{ t("theme.rose") }}
      </btn>
      <btn clean @click="changeTheme('theme-violet')" class="w-full flex items-center gap-3 whitespace-nowrap">
        <span class="theme-violet rounded-$rounded-btn bg-violet-700 h-6 w-6 flex-shrink-0"></span>{{ t("theme.violet") }}
      </btn>
      <btn clean @click="changeTheme('theme-orange')" class="w-full flex items-center gap-3 whitespace-nowrap">
        <span class="theme-orange rounded-$rounded-btn bg-orange-700 h-6 w-6 flex-shrink-0"></span>{{ t("theme.orange") }}
      </btn>
    </Menu>
  </Dropdown>
</template>
