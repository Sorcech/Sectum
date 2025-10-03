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
import { onMounted, ref } from 'vue'
import { Store } from '~/packet/Util/storage'
const isDark = ref<boolean>(false)
onMounted(() => {
  if (Store.getLocalStorage('dark'))
    isDark.value = Store.getLocalStorage('dark') === 'dark'
  document.documentElement.classList.add(isDark.value ? 'dark' : 'light')
})
function setDark() {
  document.documentElement.classList.remove(isDark.value ? 'dark' : 'light');
  isDark.value = !isDark.value;
  document.documentElement.classList.add(isDark.value ? 'dark' : 'light');
  Store.setLocalStorage('dark', isDark.value ? 'dark' : 'light');
}
</script>