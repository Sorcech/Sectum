<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  checked: { type: Boolean, default: false, required: false },
  color: {
    type: String, default: 'primary',
    validator: (value: string) => {
      return ['primary', 'secondary', 'success', 'error', 'warning'].includes(value)
    }
  },
  size: {
    type: String, default: 'md', required: false,
    validator: (value: string) => {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    }
  },
  disabled: { type: Boolean, default: false, required: false }
})

const emits = defineEmits(['change'])
const isChecked = computed({
  get: () => props.checked,
  set: (val) => emits("change", val)
})

// 基础开关样式
const baseClasses = computed(() => {
  return [
    'appearance-none',
    'cursor-pointer',
    'border',
    'border-solid',
    'border-gray-300',
    'bg-gray-300/60',
    'rounded-full',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'inline-block',
    'relative',
    'focus-visible:outline-2',
    'focus-visible:outline-primary',
    'focus-visible:outline-offset-2'
  ].join(' ')
})

// 尺寸样式
const sizeClasses = computed(() => {
  const sizes = {
    xs: 'w-6 h-4',
    sm: 'w-8 h-5', 
    md: 'w-12 h-6',
    lg: 'w-16 h-8',
    xl: 'w-20 h-10'
  }
  return sizes[props.size as keyof typeof sizes] || sizes.md
})

// 颜色样式
const colorClasses = computed(() => {
  if (!props.checked) return ''
  
  const colors = {
    primary: 'border-primary bg-primary text-primary',
    secondary: 'border-secondary bg-secondary text-secondary',
    success: 'border-success bg-success text-success',
    error: 'border-error bg-error text-error',
    warning: 'border-warning bg-warning text-warning'
  }
  return colors[props.color as keyof typeof colors] || colors.primary
})

// 状态样式
const stateClasses = computed(() => {
  const classes = []
  if (props.disabled) {
    classes.push('cursor-not-allowed border-transparent bg-gray-300/20')
  }
  return classes.join(' ')
})

// 最终样式组合
const toggleClasses = computed(() => {
  return [
    baseClasses.value,
    sizeClasses.value,
    colorClasses.value,
    stateClasses.value
  ].filter(Boolean).join(' ')
})
</script>

<template>
  <input 
    type="checkbox" 
    v-model="isChecked" 
    :disabled="disabled" 
    :class="toggleClasses"
  >
</template>

<style scoped>
/* 开关滑块效果 - 使用CSS变量和box-shadow实现 */
input[type="checkbox"] {
  --handleoffset-xs: 0.5rem;
  --handleoffset-sm: 0.75rem;
  --handleoffset-md: 1.5rem;
  --handleoffset-lg: 2rem;
  --handleoffset-xl: 2.5rem;
}

/* 默认滑块位置（未选中） */
input[type="checkbox"] {
  box-shadow: calc(var(--handleoffset-md) * -1) 0 0 2px #fcfcfc inset,
    0 0 0 2px #fcfcfc inset;
}

/* 选中状态滑块位置 */
input[type="checkbox"]:checked {
  box-shadow: var(--handleoffset-md) 0 0 2px #fcfcfc inset,
    0 0 0 2px #fcfcfc inset;
}

/* 不同尺寸的滑块偏移量 */
input[type="checkbox"].w-6 { --handleoffset: var(--handleoffset-xs); }
input[type="checkbox"].w-8 { --handleoffset: var(--handleoffset-sm); }
input[type="checkbox"].w-12 { --handleoffset: var(--handleoffset-md); }
input[type="checkbox"].w-16 { --handleoffset: var(--handleoffset-lg); }
input[type="checkbox"].w-20 { --handleoffset: var(--handleoffset-xl); }

/* 应用动态偏移量 */
input[type="checkbox"] {
  box-shadow: calc(var(--handleoffset) * -1) 0 0 2px #fcfcfc inset,
    0 0 0 2px #fcfcfc inset;
}

input[type="checkbox"]:checked {
  box-shadow: var(--handleoffset) 0 0 2px #fcfcfc inset,
    0 0 0 2px #fcfcfc inset;
}
</style>

