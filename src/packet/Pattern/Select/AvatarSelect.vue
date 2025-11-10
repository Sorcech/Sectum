<template>
  <div :class="containerClasses" ref="selectRef">
    <label v-if="label" :class="labelClasses">
      <span :class="labelTextClasses">{{ label }}</span>
    </label>
    <div ref="selectContainerRef" class="relative w-auto flex items-center">
      <!-- 显示选中的用户 - 使用 Avatar 组件作为触发器 -->
      <div class="relative flex items-center">
        <avt
          :src="selectedUser?.avatar"
          :name="selectedUser?.name"
          :text="selectedUser?.text"
          :icon="selectedUser?.icon"
          :size="avatarSize"
          :status="selectedUser?.status"
          :clickable="!disabled"
          :custom-class="displayClasses"
          @click="toggleShow"
        />
        
        <!-- 下拉箭头 - 定位在头像右侧中心 -->
        <div 
          class="absolute flex items-center justify-center pointer-events-none z-10 left-full top-1/2 -translate-y-1/2 -ml-3"
          v-show="!disabled"
        >
          <span v-show="!positionShow">
            <icn name="angle-down" light sm></icn>
          </span>
          <span v-show="positionShow">
            <icn name="angle-up" light sm></icn>
          </span>
        </div>
      </div>
      
      <!-- 下拉菜单 -->
      <tst name="downward" v-if="positionShow && !disabled" :class="tstClasses" :style="positionStyle">
        <Menu compact shadow rounded :class="menuClasses" style="min-width: 200px;">
          <btn 
            clean 
            v-for="(user, index) in users" 
            :key="index" 
            @click="selectUser(user, index)"
            class="flex items-center gap-2 p-2"
          >
            <avt
              :src="user.avatar"
              :name="user.name"
              :text="user.text"
              :icon="user.icon"
              :size="avatarSize"
              :status="user.status"
              :clickable="false"
            />
            <span>{{ user.name || user.text || user.label }}</span>
          </btn>
        </Menu>
      </tst>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useClickOutside } from '~/packet/Config/useClickOutside'
import { usePosition } from '~/packet/Config/usePosition'

// 用户选项接口
export interface AvatarOption {
  id?: string | number
  name?: string
  text?: string
  avatar?: string
  icon?: string
  status?: 'online' | 'offline' | 'away' | 'busy' | ''
  label?: string
  value?: string | number
  [key: string]: any
}

const selectRef = ref(null)
const selectContainerRef = ref<HTMLElement | null>(null)

const props = withDefaults(defineProps<{
  direction?: string
  users: AvatarOption[]
  placeholder?: string
  label?: string
  labelWidth?: string
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  modelValue?: string | number | null
  fieldValue?: string
}>(), {
  size: 'md',
  avatarSize: 'sm',
  disabled: false,
  fieldValue: 'id'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null | undefined]
  select: [user: AvatarOption]
}>()

// 容器方向样式类
const containerClasses = computed(() => {
  const baseClasses = props.direction === 'col' ? 'flex flex-col' : 'flex flex-row justify-between items-center'
  // 如果没有 label，容器宽度自适应内容；如果有 label，容器占据全宽
  const widthClass = props.label ? 'w-full max-w-full min-w-0' : 'w-auto'
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


// 显示区域样式类
const displayClasses = computed(() => {
  return [
    props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  ].filter(Boolean).join(' ')
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

const positionShow = ref(false)

const toggleShow = () => {
  if (props.disabled) return
  positionShow.value = true
  if (props.users.length > 10) {
    hAuto.value = true
  }
  nextTick(() => {
    calculatePosition()
  })
}

// 选中的用户
const selectedUser = computed<AvatarOption | null>(() => {
  if (!props.modelValue) return null
  
  const field = props.fieldValue || 'id'
  return props.users.find(user => {
    const value = user[field] ?? user.id ?? user.value
    return value === props.modelValue || String(value) === String(props.modelValue)
  }) || null
})

const selectUser = (user: AvatarOption, index: number) => {
  const field = props.fieldValue || 'id'
  const value = user[field] ?? user.id ?? user.value
  positionShow.value = false
  emit('update:modelValue', value)
  emit('select', user)
}

useClickOutside(selectRef, () => {
  if (positionShow.value)
    positionShow.value = false
})
</script>

