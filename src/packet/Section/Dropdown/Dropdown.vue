<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'
import { useClickOutside } from '~/packet/Config/useClickOutside'
import { usePosition } from '~/packet/Config/usePosition'

const props = defineProps({
  placement: {
    type: String, default: 'auto', required: false,
    validator: (value: string) => {
      return ['auto', 'bottom', 'bottom-start', 'bottom-end', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'left', 'left-start', 'left-end'].includes(value)
    }
  },
  hover: { type: Boolean, default: false, required: false },
  fitContent: { type: Boolean, default: false, required: false } // Dropdown menu width fits content
})

const dropdownRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const isActive = ref(false)

// 位置计算（自动检测位置，但如果指定了 placement 且不是 auto，则使用指定的）
const useAutoPosition = !props.placement || props.placement === 'auto'
const { placement: autoPlacement, positionStyle, calculatePosition } = usePosition(
  triggerRef, 
  {
    panelHeight: 200,
    panelWidth: 200,
    gap: 4
  }
)


// 下拉菜单样式类
const menuClasses = computed(() => {
  const base = ['absolute block z-50 p-1']
  
  // 如果使用 fitContent，默认居中显示
  if (props.fitContent) {
    if (useAutoPosition && autoPlacement.value === 'top') {
      base.push('bottom-full mb-1')
    } else {
      base.push('top-full mt-1')
    }
    // fitContent 模式下始终居中
    base.push('left-1/2 transform -translate-x-1/2')
  } else if (useAutoPosition) {
    // 如果使用自动位置，根据计算的位置设置样式
    if (autoPlacement.value === 'top') {
      base.push('bottom-full mb-1')
    } else {
      base.push('top-full mt-1')
    }
    // 水平对齐
    if (props.placement?.includes('end')) {
      base.push('right-0 left-auto')
    } else if (props.placement?.includes('start') || props.placement === 'bottom') {
      base.push('left-0 right-auto')
    } else {
      base.push('left-1/2 transform -translate-x-1/2')
    }
  } else {
    // 使用指定的位置
    if (props.placement === 'bottom') {
      base.push('mt-1 left-1/2 transform -translate-x-1/2 top-full')
    } else if (props.placement === 'bottom-start') {
      base.push('mt-1 left-0 top-full')
    } else if (props.placement === 'bottom-end') {
      base.push('mt-1 right-0 top-full')
    } else if (props.placement === 'top-start') {
      base.push('mb-1 bottom-full left-0')
    } else if (props.placement === 'top-end') {
      base.push('mb-1 bottom-full right-0')
    } else if (props.placement === 'right') {
      base.push('ml-1 left-full top-1/2 transform -translate-y-1/2')
    } else if (props.placement === 'right-start') {
      base.push('ml-1 left-full top-0')
    } else if (props.placement === 'right-end') {
      base.push('ml-1 left-full bottom-0')
    } else if (props.placement === 'left') {
      base.push('mr-1 right-full top-1/2 transform -translate-y-1/2')
    } else if (props.placement === 'left-start') {
      base.push('mr-1 right-full top-0')
    } else if (props.placement === 'left-end') {
      base.push('mr-1 right-full bottom-0')
    }
  }
  
  return base.filter(Boolean).join(' ')
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
  if (!props.hover) {
    isActive.value = !isActive.value
    if (isActive.value && useAutoPosition) {
      nextTick(() => {
        calculatePosition()
      })
    }
  }
}
const mouseEnter = () => {
  if (props.hover) {
    isActive.value = true
    if (useAutoPosition) {
      nextTick(() => {
        calculatePosition()
      })
    }
  }
}
function mouseLeave() {
  if (props.hover)
    isActive.value = false
}
useClickOutside(dropdownRef, () => {
  if (isActive.value)
    isActive.value = false
})

const close = () => {
  isActive.value = false
}

// 处理菜单内容区域的点击事件，点击菜单项时自动关闭
const handleMenuClick = (e: Event) => {
  // 如果点击的是 trigger，不关闭（由 toggle 处理）
  if (triggerRef.value?.contains(e.target as Node)) {
    return
  }
  // 点击菜单内容区域时，关闭下拉菜单（无论是否是 hover 模式）
  // hover 模式只影响鼠标悬停行为，不影响点击关闭行为
  close()
}

defineExpose({
  close,
  isActive
})
</script>

<template>
  <div ref="dropdownRef" class="relative flex inline-block" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @pointerenter="mouseEnter">
    <div ref="triggerRef" class="dropdown-trigger" @click="toggle">
      <slot name="trigger" :active="isActive" />
    </div>
    <transition 
      :enter-active-class="transitionClasses['enter-active-class']"
      :enter-from-class="transitionClasses['enter-from-class']"
      :enter-to-class="transitionClasses['enter-to-class']"
      :leave-active-class="transitionClasses['leave-active-class']"
      :leave-from-class="transitionClasses['leave-from-class']"
      :leave-to-class="transitionClasses['leave-to-class']">
      <div v-show="isActive" :class="menuClasses" :style="{ ...(useAutoPosition && !props.fitContent ? positionStyle : {}),
          ...(props.fitContent ? { maxWidth: 'none', width: 'auto' } : {})}" @click="handleMenuClick" >
        <slot />
      </div>
    </transition>
  </div>
</template>

