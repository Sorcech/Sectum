<template>
  <form
    :class="formClasses"
    :style="formStyles"
    @submit.prevent="handleSubmit"
  >
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import { computed, provide, reactive } from 'vue'
import type { FormRules } from './types'

interface Props {
  model?: Record<string, any>
  rules?: FormRules
  inline?: boolean
  labelWidth?: string | number
  labelAlign?: 'left' | 'right' | 'center'
  labelPlacement?: 'top' | 'left'
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  showFeedback?: boolean
  showLabel?: boolean
  showRequireMark?: boolean
  requireMarkPlacement?: 'left' | 'right' | 'right-hanging'
}

const props = withDefaults(defineProps<Props>(), {
  model: () => ({}),
  rules: () => ({}),
  inline: false,
  labelAlign: 'left',
  labelPlacement: 'top',
  disabled: false,
  size: 'medium',
  showFeedback: true,
  showLabel: true,
  showRequireMark: undefined,
  requireMarkPlacement: 'right'
})

const emit = defineEmits<{
  submit: [event: Event]
  validate: [prop: string, isValid: boolean, message: string]
}>()

// 存储所有 FormItem 实例
const formItems = reactive<Map<string, any>>(new Map())

// 注册 FormItem
const registerFormItem = (prop: string, formItem: any) => {
  if (prop) {
    formItems.set(prop, formItem)
  }
}

// 注销 FormItem
const unregisterFormItem = (prop: string) => {
  if (prop) {
    formItems.delete(prop)
  }
}

// 验证单个字段
const validateField = async (prop: string): Promise<boolean> => {
  const formItem = formItems.get(prop)
  if (formItem) {
    return await formItem.validate()
  }
  return true
}

// 验证整个表单
const validate = async (callback?: (valid: boolean, fields?: any) => void): Promise<boolean> => {
  const promises: Promise<boolean>[] = []
  formItems.forEach((formItem) => {
    if (formItem.prop) {
      promises.push(formItem.validate())
    }
  })

  try {
    const results = await Promise.all(promises)
    const valid = results.every((result) => result)
    
    if (callback) {
      callback(valid)
    }
    
    return valid
  } catch (error) {
    if (callback) {
      callback(false)
    }
    return false
  }
}

// 重置表单验证
const resetFields = () => {
  formItems.forEach((formItem) => {
    formItem.clearValidate()
  })
}

// 清除验证状态
const clearValidate = () => {
  formItems.forEach((formItem) => {
    formItem.clearValidate()
  })
}

// 提供表单上下文
provide('formContext', {
  props,
  registerFormItem,
  unregisterFormItem,
  validateField
})

// 暴露方法给父组件
defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate
})

// 表单样式
const formClasses = computed(() => {
  const baseClasses = 'w-full'
  const inlineClasses = props.inline 
    ? 'flex flex-wrap items-center gap-4' 
    : 'space-y-4'
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }[props.size] || 'text-base'
  
  return [baseClasses, inlineClasses, sizeClasses].filter(Boolean).join(' ')
})

const formStyles = computed(() => {
  const styles: Record<string, string> = {}
  if (props.labelWidth) {
    styles['--form-label-width'] = typeof props.labelWidth === 'number' 
      ? `${props.labelWidth}px` 
      : props.labelWidth
  }
  return styles
})

// 表单提交处理
const handleSubmit = (event: Event) => {
  emit('submit', event)
}
</script>