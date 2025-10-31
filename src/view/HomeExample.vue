<script setup lang="ts">

const themes = [
  'theme-blue',
  'theme-teal',
  'theme-rose',
  'theme-violet',
  'theme-orange'
]
</script>
<template>
    <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-10 ">
      <div v-for="theme in themes" :class="[theme]"
        class="shadow-sm h-auto rounded-lg flex flex-wrap bg-base-200 dark:bg-base-200 (w-full px-5 py-5) md:(px-5 py-5)   py-3">
        <div class="flex w-full justify-between my-2">
          <btn circle size="xs">
            <icn name="xmark" regular xl></icn>
          </btn>
          <tgl checked />
          <ckb checked />
        </div>
        <btn size="sm" class="w-full my-2"> Primary </btn>
        <btn size="sm" variant="transparent" class="w-full my-2"> Transparent </btn>
        <btn size="sm" variant="outline" class="w-full my-2"> Outline </btn>
      </div>
    </div>
</template>