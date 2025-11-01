<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useClickOutside } from '~/packet/Config/useClickOutside'

const props = defineProps({
  placement: {
    type: String, default: 'bottom-start', required: false,
    validator: (value: string) => {
      return ['bottom', 'bottom-start', 'bottom-end', 'top-start', 'top-end'].includes(value)
    }
  },
  hover: { type: Boolean, default: false, required: false }
})

const dropdownRef = ref(null)
const isActive = ref(false)

// 基础样式类
const baseClasses = computed(() => {
  return 'relative flex inline-block'
})

// 下拉菜单样式类
const menuClasses = computed(() => {
  return [
    'absolute block z-50 p-1 mt-1',
    // 位置样式
    props.placement === 'bottom' ? 'left-1/2 transform -translate-x-1/2 top-full' : '',
    props.placement === 'bottom-start' ? 'left-0 top-full' : '',
    props.placement === 'bottom-end' ? 'right-0 top-full' : '',
    props.placement === 'top-start' ? 'bottom-full left-0' : '',
    props.placement === 'top-end' ? 'bottom-full right-0' : ''
  ].filter(Boolean).join(' ')
})

// 过渡动画样式类
const transitionClasses = computed(() => {
  return {
    'enter-active-class': 'transition-all duration-150 ease-out',
    'enter-from-class': 'scale-95 opacity-0',
    'enter-to-class': 'scale-100 opacity-100',
    'leave-active-class': 'transition-all duration-75 ease-in',
    'leave-from-class': 'scale-100 opacity-100',
    'leave-to-class': 'scale-100 opacity-100'
  }
})

const toggle = () => {
  if (!props.hover)
    isActive.value = !isActive.value
}
const mouseEnter = () => {
  if (props.hover)
    isActive.value = true
}
function mouseLeave() {
  if (props.hover)
    isActive.value = false
}
useClickOutside(dropdownRef, () => {
  if (isActive.value)
    isActive.value = false
})
</script>

<template>
  <div ref="dropdownRef" :class="baseClasses" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @pointerenter="mouseEnter">
    <div class="dropdown-trigger" @click="toggle">
      <slot name="trigger" :active="isActive" />
    </div>
    <transition 
      :enter-active-class="transitionClasses['enter-active-class']"
      :enter-from-class="transitionClasses['enter-from-class']"
      :enter-to-class="transitionClasses['enter-to-class']"
      :leave-active-class="transitionClasses['leave-active-class']"
      :leave-from-class="transitionClasses['leave-from-class']"
      :leave-to-class="transitionClasses['leave-to-class']">
      <div v-show="isActive" :class="menuClasses">
        <slot />
      </div>
    </transition>
  </div>
</template>

