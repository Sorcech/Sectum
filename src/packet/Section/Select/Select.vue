<template>
  <div :class="containerClasses" ref="selectRef">
    <label v-if="label" :class="labelClasses">
      <span :class="labelTextClasses">{{ label }}</span>
    </label>
    <div :class="selectContainerClasses">
      <ipt type="text" readonly :modelValue="selectValue" :placeholder="placedisabled" :disabled="disabled"
        @click="toggleShow" />
      <div :class="arrowContainerClasses" v-show="!disabled">
        <span v-show="!positionShow">
          <icn name="angle-down" light xl></icn>
        </span>
        <span v-show="positionShow">
          <icn name="angle-up" light xl></icn>
        </span>
      </div>
      <tst name="downward" v-if="positionShow && !disabled" :class="tstClasses">
        <Menu compact shadow :class="menuClasses" style="width: 100%; min-width: 0; max-width: 100%;">
          <btn clean v-for="(item, index) in options" :key="index" @click="selectData(item, index)">{{ item[fieldLabel || 'label']
          }}
          </btn>
        </Menu>
      </tst>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useClickOutside } from '~/packet/Config/useClickOutside'

// 定义选项接口
interface SelectOption {
  [key: string]: any
}

const selectRef = ref(null)
const props = defineProps<{
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
}>()

// 容器方向样式类
const containerClasses = computed(() => {
  if (!props.label) return ''
  return props.direction === 'col' ? 'flex flex-col' : 'flex flex-row justify-between items-center'
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
  return 'relative'
})

// 下拉箭头容器样式类
const arrowContainerClasses = computed(() => {
  return 'absolute right-3 top-1/2 transform -translate-y-1/2 opacity-50 pointer-events-none'
})

// tst 容器样式类
const tstClasses = computed(() => {
  return 'absolute z-99 top-8 w-full'
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
const hAuto = ref(false)
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
