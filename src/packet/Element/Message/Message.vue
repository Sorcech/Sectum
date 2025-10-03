<template>
  <Transition name="slide-fade">
    <div
      class="msg fixed left-1/2 transform -translate-x-1/2 h-8 w-64 z-100 text-center text-lg rounded-md shadow-lg text-white opacity-90"
      :class="bgClass"
      :style="bgStyle"
      v-show="visible">
      {{ message }}
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import { reactive, toRefs, computed } from 'vue';
import { MessageTypes } from './Message'
const state = reactive({ visible: false, top: 20 })
let timer: any = null

const props = defineProps({
  type: {
    type: String, default: 'message', required: true,
    validator: (value: any) => {
      return Object.values(MessageTypes).includes(value)
    },
  },
  message: { type: String, default: 'message' },
})

// 计算背景色类名和样式
const bgClass = computed(() => {
  const typeMap = {
    'success': 'bg-success',
    'message': 'bg-primary',
    'warning': 'bg-warning', 
    'error': 'bg-error'
  }
  return typeMap[props.type as keyof typeof typeMap] || 'bg-primary'
})

// 计算背景色样式
const bgStyle = computed(() => {
  const colorMap = {
    'success': 'var(--success)',
    'message': 'var(--primary)',
    'warning': 'var(--warning)',
    'error': 'var(--error)'
  }
  return {
    top: top.value + 'rem',
    backgroundColor: colorMap[props.type as keyof typeof colorMap] || '#2563eb'
  }
})
const setVisible = (isVisible: boolean) => {
  return new Promise(resolve => {
    state.visible = isVisible
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      resolve('')
    }, 300)
  })
}
const setTop = (top: number) => {
  state.top = top
  return top
}
defineExpose({ setVisible, setTop, height: 8, margin: 2 })
const { visible, top } = toRefs(state)
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-in;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.msg {
  transition: all .3s ease-out;
}

</style>
