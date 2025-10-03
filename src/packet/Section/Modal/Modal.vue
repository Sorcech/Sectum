<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  active: { type: Boolean, required: true },
  backdrop: { type: Boolean, default: true, required: false },// show backdrop
  outside: { type: Boolean, default: true, required: false },// click outside to close
  closeBtn: { type: Boolean, default: false, required: false }, // btn for close modal
  rounded: { type: Boolean, default: false, required: false },
  width: { type: String, default: 'w-200', required: false },
  height: { type: String, default: 'h-150', required: false },
  size: {
    type: String, required: false,
    validator: (value: string) => { return ['sm', 'md', 'lg'].includes(value) },
  },
})

const emits = defineEmits(['update:active', 'close'])

// 模态框容器样式类
const modalClasses = computed(() => {
  const baseClasses = [
    'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'transform z-25 bg-base-100 flex flex-col justify-between',
    'max-h-4/5 max-w-4/5'
  ]
  
  // 圆角样式
  if (props.rounded) {
    baseClasses.push('rounded-$rounded-btn')
  }
  
  // 尺寸样式
  if (props.width === 'w-200' || props.height === 'h-150') {
    // 使用预设尺寸
    const sizeMap = {
      sm: 'w-1/4 h-1/5',
      md: 'w-1/3 h-1/4', 
      lg: 'w-1/2 h-1/3'
    }
    const sizeClass = sizeMap[props.size as keyof typeof sizeMap]
    if (sizeClass) {
      baseClasses.push(sizeClass)
    }
  } else {
    // 使用自定义尺寸
    baseClasses.push(props.height, props.width)
  }
  
  return baseClasses.join(' ')
})

// 头部样式类
const headerClasses = computed(() => {
  const baseClasses = [
    'flex flex-row justify-between pl-3 pr-5 border-1 py-3'
  ]
  
  // 圆角样式
  if (props.rounded) {
    baseClasses.push('rounded-t-$rounded-btn')
  }
  
  return baseClasses.join(' ')
})

// 主体样式类
const bodyClasses = computed(() => {
  return 'p-1 overflow-y-auto'
})

// 底部样式类
const footerClasses = computed(() => {
  return 'flex justify-end px-3 pb-3 mt-1.5 space-x-3 items-center align-middle'
})

const dismiss = () => {
  emits('update:active', false)
}

// this function clickOutside() is not necessary since div is set to `pointer-events-none`
const clickOutside = () => {
  if (props.outside)
    emits('update:active', false)
}
</script>

<template>
  <bkd :show="active" blur @click="clickOutside" />
  <tst name="bloom">
    <div v-if="active" :class="modalClasses">
      <div :class="headerClasses">
        <h2 v-show="$slots.header" class="font-semibold text-xl">
          <slot name="header" />
        </h2>
        <btn item v-show="closeBtn" @click="dismiss" class="hover:text-primary">
          <icn name="xmark" regular xl />
        </btn>
      </div>
      <div v-show="$slots.body" :class="bodyClasses">
        <slot name="body" />
      </div>
      <div v-show="$slots.footer" :class="footerClasses">
        <slot name="footer" :dismiss="dismiss" />
      </div>
    </div>
  </tst>
</template>
<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
