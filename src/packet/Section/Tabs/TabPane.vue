<script lang="ts" setup>
defineProps<{
  name: string
  tab: string
}>()
</script>
<template>
  <div class="flex-1 w-full min-h-0">
    <slot />
  </div>
</template>