<script setup lang="ts">
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const colors = [
  'pink',
  'rose',
  'red',
  'orange',
  'yellow',
  'amber',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',//light-blue
  'blue',
  'indigo',
  'purple',
  'violet',
  'fuchsia',
  'gray',//cool-gray
  'slate',//blue-gray
  'stone',//warm-gray
  'neutral',//true-gray
  'zinc',
  'light',
  'dark'
]
</script>

<template>
  <div class="my-8">
    <div v-for="color in colors" :key="color">
      <div class="mb-3 mt-8">
        <span class="font-bold">
          {{ color }}
        </span>
      </div>
      <div class="flex gap-2 mb-2">
        <Color v-for="level in levels" :key="level" :color="`bg-${color}-${level}`" />
      </div>
    </div>
  </div>
</template>