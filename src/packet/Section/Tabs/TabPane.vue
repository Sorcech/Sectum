<script lang="ts" setup>
defineProps<{
  name: string
  tab: string
}>()
</script>
<template>
  <div>
    <slot />
  </div>
</template>