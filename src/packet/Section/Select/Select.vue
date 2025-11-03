<template>
  <div :class="containerClasses" ref="selectRef">
    <label v-if="label" :class="labelClasses">
      <span :class="labelTextClasses">{{ label }}</span>
    </label>
    <div ref="selectContainerRef" :class="selectContainerClasses">
      <ipt type="text" readonly :modelValue="selectValue" :placeholder="placedisabled" :disabled="disabled"
        :size="size"
        class="w-full [&_input]:w-full"
        @click="toggleShow" />
      <div :class="arrowContainerClasses" v-show="!disabled">
        <span v-show="!positionShow">
          <icn name="angle-down" light xl></icn>
        </span>
        <span v-show="positionShow">
          <icn name="angle-up" light xl></icn>
        </span>
      </div>
      <tst name="downward" v-if="positionShow && !disabled" :class="tstClasses" :style="positionStyle">
        <Menu compact shadow rounded :class="menuClasses" style="width: 100%; min-width: 0; max-width: 100%;">
          <btn clean v-for="(item, index) in options" :key="index" @click="selectData(item, index)">{{ item[fieldLabel || 'label']
          }}
          </btn>
        </Menu>
      </tst>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch, computed, nextTick } from 'vue'
import { useClickOutside } from '~/packet/Config/useClickOutside'
import { usePosition } from '~/packet/Config/usePosition'

// 定义选项接口
interface SelectOption {
  [key: string]: any
}

const selectRef = ref(null)
const selectContainerRef = ref<HTMLElement | null>(null)
const props = withDefaults(defineProps<{
  direction?: string
  options: SelectOption[]
  placeholder?: string
  fieldLabel?: string
  fieldValue?: string
  label?: string
  labelWidth?: string
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  selected?: string
}>(), {
  size: 'md',
  disabled: false
})

// 容器方向样式类
const containerClasses = computed(() => {
  const baseClasses = props.direction === 'col' ? 'flex flex-col' : 'flex flex-row justify-between items-center'
  const widthClass = 'max-w-96'
  if (!props.label) return widthClass
  return [baseClasses, widthClass].filter(Boolean).join(' ')
})

// 标签样式类
const labelClasses = computed(() => {
  return [
    'select-none py-2',
    props.label ? props.labelWidth : ''
  ].filter(Boolean).join(' ')
})

// 标签文本大小样式类
const labelTextClasses = computed(() => {
  const sizeMap = {
    xs: 'text-xs',
    sm: 'text-sm', 
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  return sizeMap[props.size as keyof typeof sizeMap] || 'text-base'
})

// 选择器容器样式类
const selectContainerClasses = computed(() => {
  return 'relative w-64 max-w-64'
})

// 下拉箭头容器样式类
const arrowContainerClasses = computed(() => {
  return 'absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-50 pointer-events-none'
})

const hAuto = ref(false)

// 位置计算
const { placement, positionStyle, calculatePosition } = usePosition(selectContainerRef, {
  panelHeight: 300,
  panelWidth: 256,
  gap: 4
})

// tst 容器样式类
const tstClasses = computed(() => {
  const baseClasses = ['absolute z-99']
  if (placement.value === 'top') {
    baseClasses.push('bottom-full mb-1')
  } else {
    baseClasses.push('top-full mt-1')
  }
  return baseClasses.join(' ')
})

// 菜单样式类
const menuClasses = computed(() => {
  const baseClasses = []
  
  if (hAuto.value) {
    baseClasses.push('h-64 overflow-y-auto')
  } else {
    baseClasses.push('h-auto')
  }
  
  return baseClasses.join(' ')
})
const placedisabled = ref('')
onMounted(() => {
  if (props.disabled) {
    placedisabled.value = ''
  } else {
    placedisabled.value = props.placeholder || 'Please Select'
  }
  if (props.selected) {
    selectValue.value = props.selected
  }
})
const emit = defineEmits(['select', 'selectIndex'])
const positionShow = ref(false)
const toggleShow = () => {
  positionShow.value = true
  if (props.options.length > 10) {
    hAuto.value = true
  }
  nextTick(() => {
    calculatePosition()
  })
}
const selectValue = ref<string>('')
watch(() => props.selected, async () => {
  if (props.selected) {
    selectValue.value = props.selected
  }
})
const selectData = (item: SelectOption, index: number) => {
  selectValue.value = item[props.fieldLabel || 'label']
  positionShow.value = !positionShow.value
  emit('select', item[props.fieldValue || 'value'])
  emit('selectIndex', index)
}
useClickOutside(selectRef, () => {
  if (positionShow.value)
    positionShow.value = false
})
</script>
