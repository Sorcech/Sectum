<template>
  <div class="flex flex-row items-center">
    <label v-if="label" class="w-15">{{ label }}</label>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  isShow: { type: Boolean, default: false },
  label: { type: String, default: '' },
  icon: { type: String, default: '' }
})
</script>