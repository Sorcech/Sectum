<template>
  <div 
    v-if="!isShow || isShow === true"
    :class="formItemClasses"
    :style="formItemStyles"
  >
    <!-- 标签区域 -->
    <label 
      v-if="showLabel && label"
      :class="labelClasses"
      :style="labelStyles"
    >
      <span v-if="showRequireMark && required" :class="requireMarkClasses">
        *
      </span>
      <icn v-if="icon" :name="icon" :class="labelIconClasses" />
      <span :class="labelTextClasses">{{ label }}</span>
    </label>

    <!-- 内容区域 -->
    <div :class="contentClasses">
      <slot></slot>
      
      <!-- 验证错误信息 -->
      <transition name="form-item-error">
        <div 
          v-if="showMessage && validateMessage && validateState === 'error'"
          :class="errorMessageClasses"
        >
          {{ validateMessage }}
        </div>
      </transition>

      <!-- 验证成功提示 -->
      <transition name="form-item-success">
        <div 
          v-if="showSuccessMessage && validateState === 'success'"
          :class="successMessageClasses"
        >
          {{ successMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, onMounted, onUnmounted, watch } from 'vue'
import type { FormItemRule } from './FormItem'
import Validator from 'async-validator'

interface Props {
  prop?: string
  label?: string
  rules?: FormItemRule | FormItemRule[]
  showMessage?: boolean
  isShow?: boolean
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  showMessage: true,
  isShow: true,
  icon: ''
})

// 注入表单上下文
const formContext = inject<{
  props: any
  registerFormItem: (prop: string, formItem: any) => void
  unregisterFormItem: (prop: string) => void
  validateField: (prop: string) => Promise<boolean>
} | null>('formContext', null)

// 验证状态
const validateState = ref<'success' | 'error' | ''>('')
const validateMessage = ref('')
const successMessage = ref('')

// 表单数据
const formModel = computed(() => formContext?.props.model || {})

// 表单项规则
const itemRules = computed<FormItemRule[]>(() => {
  if (props.rules) {
    return Array.isArray(props.rules) ? props.rules : [props.rules]
  }
  
  // 从表单规则中获取
  if (formContext && props.prop) {
    const formRules = formContext.props.rules || {}
    const propRules = formRules[props.prop]
    if (propRules) {
      return Array.isArray(propRules) ? propRules : [propRules]
    }
  }
  
  return []
})

// 是否必填
const required = computed(() => {
  return itemRules.value.some(rule => rule.required === true)
})

// 是否显示标签
const showLabel = computed(() => {
  return formContext?.props.showLabel !== false && props.label
})

// 是否显示必填标记
const showRequireMark = computed(() => {
  if (formContext?.props.showRequireMark !== undefined) {
    return formContext.props.showRequireMark
  }
  return required.value
})

// 必填标记位置
const requireMarkPlacement = computed(() => {
  return formContext?.props.requireMarkPlacement || 'right'
})

// 标签宽度
const labelWidth = computed(() => {
  return formContext?.props.labelWidth
})

// 标签对齐
const labelAlign = computed(() => {
  return formContext?.props.labelAlign || 'left'
})

// 标签位置
const labelPlacement = computed(() => {
  return formContext?.props.labelPlacement || 'top'
})

// 是否显示成功消息
const showSuccessMessage = computed(() => {
  return formContext?.props.showFeedback && validateState.value === 'success'
})

// 验证方法
const validate = async (trigger?: string): Promise<boolean> => {
  if (!props.prop) {
    return true
  }

  const rules = itemRules.value.filter(rule => {
    if (trigger && rule.trigger) {
      const triggers = Array.isArray(rule.trigger) ? rule.trigger : [rule.trigger]
      return triggers.includes(trigger)
    }
    return true
  })

  if (rules.length === 0) {
    validateState.value = ''
    validateMessage.value = ''
    return true
  }

  const fieldValue = formModel.value[props.prop]
  const descriptor: Record<string, any> = {
    [props.prop]: rules
  }

  const validator = new Validator(descriptor)

  try {
    await validator.validate({ [props.prop]: fieldValue })
    validateState.value = 'success'
    validateMessage.value = ''
    successMessage.value = '验证通过'
    return true
  } catch (errors: any) {
    if (errors && errors.errors && errors.errors.length > 0) {
      validateState.value = 'error'
      validateMessage.value = errors.errors[0].message || '验证失败'
      successMessage.value = ''
      return false
    }
    validateState.value = 'error'
    validateMessage.value = '验证失败'
    successMessage.value = ''
    return false
  }
}

// 清除验证状态
const clearValidate = () => {
  validateState.value = ''
  validateMessage.value = ''
  successMessage.value = ''
}

// 监听字段值变化
watch(
  () => {
    if (props.prop) {
      return formModel.value[props.prop]
    }
    return undefined
  },
  () => {
    if (props.prop && formContext?.props.showFeedback) {
      // 如果已经有错误，重新验证
      if (validateState.value === 'error') {
        validate('change')
      }
    }
  }
)

// 注册到表单
onMounted(() => {
  if (props.prop && formContext) {
    formContext.registerFormItem(props.prop, {
      prop: props.prop,
      validate,
      clearValidate
    })
  }
})

// 注销
onUnmounted(() => {
  if (props.prop && formContext) {
    formContext.unregisterFormItem(props.prop)
  }
})

// 样式类
const formItemClasses = computed(() => {
  const baseClasses = 'mb-4'
  const placementClasses = labelPlacement.value === 'top' 
    ? 'flex flex-col' 
    : 'flex flex-row items-start'
  const inlineClasses = formContext?.props.inline ? 'inline-block mr-4 mb-0' : ''
  
  return [baseClasses, placementClasses, inlineClasses].filter(Boolean).join(' ')
})

const labelClasses = computed(() => {
  const baseClasses = 'text-base font-medium mb-2 flex items-center'
  const alignMap: Record<string, string> = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center'
  }
  const alignClasses = alignMap[labelAlign.value] || 'justify-start'
  
  // 如果是左侧布局，需要特殊处理
  const leftLayoutClasses = labelPlacement.value === 'left' 
    ? 'mb-0 mr-3 flex-shrink-0' 
    : ''
  
  return [baseClasses, alignClasses, leftLayoutClasses].filter(Boolean).join(' ')
})

const requireMarkClasses = computed(() => {
  const baseClasses = 'text-error'
  const placementClasses = requireMarkPlacement.value === 'left'
    ? 'mr-1'
    : requireMarkPlacement.value === 'right-hanging'
    ? 'ml-1 absolute -right-2'
    : 'ml-1'
  
  return [baseClasses, placementClasses].filter(Boolean).join(' ')
})

const contentClasses = computed(() => {
  return 'flex-1 flex flex-col'
})

const errorMessageClasses = computed(() => {
  return 'text-sm text-error mt-1'
})

const successMessageClasses = computed(() => {
  return 'text-sm text-success mt-1'
})

const labelIconClasses = computed(() => {
  return 'mr-1'
})

// 标签文本样式类
const labelTextClasses = computed(() => {
  return 'flex-1'
})

// 样式
const formItemStyles = computed(() => {
  return {}
})

const labelStyles = computed(() => {
  const styles: Record<string, string> = {}
  if (labelWidth.value) {
    const width = typeof labelWidth.value === 'number' 
      ? `${labelWidth.value}px` 
      : labelWidth.value
    styles.width = width
    styles.flexShrink = '0'
  }
  // 添加颜色变量
  styles.color = 'var(--base-content)'
  // 如果是左侧布局，添加特殊的 padding-top
  if (labelPlacement.value === 'left') {
    styles.paddingTop = 'calc(var(--form-input-height, 2.5rem) / 2 - 0.5rem)'
  }
  return styles
})

// 暴露方法
defineExpose({
  validate,
  clearValidate,
  prop: props.prop
})
</script>

<style scoped>
/* 过渡动画 */
.form-item-error-enter-active,
.form-item-error-leave-active {
  transition: all 0.3s ease;
}

.form-item-error-enter-from,
.form-item-error-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.form-item-success-enter-active,
.form-item-success-leave-active {
  transition: all 0.3s ease;
}

.form-item-success-enter-from,
.form-item-success-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>