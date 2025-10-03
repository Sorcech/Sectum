<script setup lang="ts">
defineProps({
  show: { type: Boolean, required: false, default: false },
  blur: { type: Boolean, required: false },
  loading: { type: Boolean, required: false }
})
</script>
<template>
  <tst name="bloom">
    <div v-show="show" class="fixed inset-0 z-10 flex place-content-center h-screen backdrop-filter items-center"
      :class="[blur ? 'backdrop-brightness-60 backdrop-blur-1' : 'bg-gray-500 opacity-30']">
      <div v-show="show && loading">
        <icn name="spinner" solid xl spinpulse></icn>
      </div>
    </div>
  </tst>
</template>