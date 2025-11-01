<template>
  <div class="flex flex-col items-center h-screen w-20 bg-base-100 border-r dark:bg-gray-800 dark:border-gray-500 text-center">
    <h2 class="font-medium text-primary text-xl pt-3"><a href="/" class="no-underline">Cloud</a></h2>
    <nav class="flex flex-col mt-6 gap-y-2">
      <btn size="md" item v-for="(item, index) in Nav" :key="index" tag="RouterLink"
        class="flex flex-col items-center py-2 no-underline hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 w-20"
        :class="[ind === index ? 'bg-gray-200 text-blue-500 dark:bg-gray-800 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400']"
        :to="item.path" @click="setNav(index)">
        <icn :name="item.icon" light xl></icn>
        <span class="mx-2 text-sm font-normal">{{ item.title }}</span>
      </btn>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Store } from '~/packet/Config/storage'
import navbar from '~/packet/Layout/Navbar/navbar'

let ind = ref(0)
onMounted(() => {
  if (Store.getLocalStorage('Nav')) {
    ind.value = Store.getLocalStorage('Nav')
  } else {
    ind.value = 0
  }
})

const Nav = ref(navbar)
const setNav = (index: number) => {
  ind.value = index
  Store.setLocalStorage('Nav', index)
}

</script>
