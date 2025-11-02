<template>
  <btn item @click="setDark" class="hover:text-primary">
    <span v-show="!isDark">
      <icn name="sun-bright" light xl></icn>
    </span>
    <span v-show="isDark">
      <icn name="moon-stars" light xl></icn>
    </span>
  </btn>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { Store } from '../../Config/storage'
const isDark = ref<boolean>(false)
onMounted(() => {
  if (Store.getLocalStorage('dark'))
    isDark.value = Store.getLocalStorage('dark') === 'dark'
  document.documentElement.classList.add(isDark.value ? 'dark' : 'light')
})

// 监听isDark的变化，确保DOM类名正确更新
watch(isDark, (newVal) => {
  document.documentElement.classList.remove(newVal ? 'light' : 'dark');
  document.documentElement.classList.add(newVal ? 'dark' : 'light');
  Store.setLocalStorage('dark', newVal ? 'dark' : 'light');
})

function setDark() {
  isDark.value = !isDark.value;
}
</script>

