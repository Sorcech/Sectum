<script lang="ts" setup>
import { computed, ref, watch, nextTick } from 'vue'

const props = defineProps({
  active: { type: Boolean, required: true },
  backdrop: { type: Boolean, default: true, required: false },// show backdrop
  outside: { type: Boolean, default: true, required: false },// click outside to close
  closeBtn: { type: Boolean, default: false, required: false }, // btn for close modal
  rounded: { type: Boolean, default: true, required: false },
  width: { type: String, default: 'w-200', required: false },
  height: { type: String, default: 'h-150', required: false },
  size: {
    type: String, required: false,
    validator: (value: string) => { return ['sm', 'md', 'lg'].includes(value) },
  },
  backdropClass: { type: String, required: false }, // custom backdrop class
  bgColor: { type: String, default: 'bg-base-100', required: false }, // custom background color
})

const emits = defineEmits(['update:active', 'close', 'size-change'])

const modalRef = ref<HTMLElement | null>(null)

// 获取 Modal 的尺寸和位置信息
const getModalSize = () => {
  if (!modalRef.value) return null
  
  const rect = modalRef.value.getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom
  }
}

// 监听 active 变化，当打开时传递尺寸信息
watch(() => props.active, async (isActive) => {
  if (isActive) {
    // 等待 DOM 更新完成
    await nextTick()
    // 再等待一帧确保动画开始后获取准确尺寸
    requestAnimationFrame(() => {
      const size = getModalSize()
      if (size) {
        emits('size-change', size)
      }
    })
  }
})

// 模态框容器样式类
const modalClasses = computed(() => {
  const baseClasses = [
    'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'transform z-25 flex flex-col justify-between',
    'max-h-9/10 max-w-9/10',
    props.bgColor // 使用自定义背景色
  ]
  
  // 圆角样式 - 使用系统配置的box圆角
  if (props.rounded) {
    baseClasses.push('rounded-$rounded-box')
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
    'flex flex-row justify-between pl-2 pr-3 border-1'
  ]
  
  // 圆角样式 - 头部使用box圆角
  if (props.rounded) {
    baseClasses.push('rounded-t-$rounded-box')
  }
  
  return baseClasses.join(' ')
})

// 主体样式类
const bodyClasses = computed(() => {
  return 'p-1 flex-1 min-h-0 flex flex-col'
})

// 底部样式类
const footerClasses = computed(() => {
  return 'flex justify-end px-2 pb-2 mt-1 space-x-2 items-center align-middle'
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
  <msk v-if="backdrop && !backdropClass" :show="active" blur @click="clickOutside" />
  <tst v-if="backdrop && backdropClass" name="bloom">
    <div v-show="active" 
      class="fixed inset-0 z-10 flex place-content-center backdrop-filter items-center"
      :class="backdropClass"
      @click="clickOutside">
    </div>
  </tst>
  <tst name="bloom">
    <div v-if="active" ref="modalRef" :class="modalClasses">
      <div :class="headerClasses">
        <h2 v-show="$slots.header" class="font-semibold text-lg">
          <slot name="header" />
        </h2>
        <div class="flex items-center gap-2">
          <slot name="headerActions" />
          <btn item v-show="closeBtn" @click="dismiss" class="hover:text-primary">
            <icn name="xmark" regular lg />
          </btn>
        </div>
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
