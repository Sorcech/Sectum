<template>
    <bkd :show="isShow && backdrop" @click="closeDrawer" blur/>
    <tst :name="animationName">
      <div v-if="isShow" class="fixed z-15 flex-none bg-base-200" :class="[positionClasses, sizeClasses]">
        <div class="flex items-center justify-between bg-base-100 px-2 border-b h-10" :class="borderClass">
          <span class="text-base-content font-medium text-lg">{{ title }}</span>
          <btn item class="hover:text-primary" @click="closeDrawer">
            <icn name="xmark" regular xl />
          </btn>
        </div>
        <div :class="[height, overflow ? 'overflow-y-auto' : '']">
          <slot></slot>
        </div>
      </div>
    </tst>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  isShow: { type: Boolean, default: false, required: false }, 
  title: { type: String, default: 'Title', required: false },
  width: { type: String, default: 'w-32', required: false },
  height: { type: String, required: false },
  overflow: { type: Boolean, default: false, required: false },
  backdrop: { type: Boolean, default: true, required: false },
  position: { 
    type: String, 
    default: 'right',
    validator: (value: string) => ['top', 'right', 'bottom', 'left'].includes(value)
  }
})

// 支持 v-model
const isShow = computed({
  get: () => props.isShow,
  set: (value: boolean) => emit('update:isShow', value)
})
const emit = defineEmits(['update:isShow'])

// 动画名称
const animationName = computed(() => {
  const animationMap = {
    top: 'downward',
    right: 'leftward', 
    bottom: 'upward',
    left: 'rightward'
  }
  return animationMap[props.position as keyof typeof animationMap] || 'leftward'
})

// 位置样式类
const positionClasses = computed(() => {
  const positionMap = {
    top: 'top-0 left-0 right-0 h-screen',
    right: 'top-0 right-14 h-screen',
    bottom: 'bottom-0 left-0 right-0 h-screen',
    left: 'top-0 left-14 h-screen'
  }
  return positionMap[props.position as keyof typeof positionMap] || 'top-0 right-14 h-screen'
})

// 尺寸样式类
const sizeClasses = computed(() => {
  if (props.position === 'top' || props.position === 'bottom') {
    return props.height || 'h-96'
  } else {
    return props.width
  }
})

// 边框样式类
const borderClass = computed(() => {
  const borderMap = {
    top: 'border-b',
    right: 'border-l',
    bottom: 'border-t', 
    left: 'border-r'
  }
  return borderMap[props.position as keyof typeof borderMap] || 'border-l'
})

const closeDrawer = () => {
  emit('update:isShow', false)
}
</script>