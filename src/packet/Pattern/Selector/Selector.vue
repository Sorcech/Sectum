<script lang="ts" setup>
import { ref, computed } from 'vue'
import Form from '../../Section/Form/Form.vue'
import FormItem from '../../Section/Form/FormItem.vue'
import Select from '../../Section/Select/Select.vue'
import Toast from '../../Element/Toast/Toast'
import type { FormFieldConfig, SelectOption } from './Selector'

// 表单数据类型（泛型，支持任意字段）
type FormData = Record<string, any>

// Props 定义
const props = withDefaults(defineProps<{
  // 表单字段配置数组
  formFields: FormFieldConfig[]
  // 创建默认表单数据的函数
  createDefaultFormData: () => FormData
  // 计算产品型号/结果的函数
  calculateResult: (formData: FormData) => string
  // 获取选中项标签的函数（可选，有默认实现）
  getSelectedLabel?: (options: SelectOption[], value: string) => string
  // 结果标签文本
  resultLabel?: string
  // 结果占位符
  resultPlaceholder?: string
  // 重置按钮文本
  resetButtonText?: string
  // 复制按钮文本
  copyButtonText?: string
  // 复制成功提示文本
  copySuccessMessage?: string
  // 复制失败提示文本
  copyErrorMessage?: string
  // 结果为空时的提示文本
  emptyResultMessage?: string
}>(), {
  resultLabel: '产品型号',
  resultPlaceholder: '产品型号将自动生成',
  resetButtonText: '重置',
  copyButtonText: '复制型号',
  copySuccessMessage: '产品型号已复制到剪贴板',
  copyErrorMessage: '复制失败，请手动复制',
  emptyResultMessage: '请先完成所有必填项'
})

// 默认的 getSelectedLabel 实现
const defaultGetSelectedLabel = (options: SelectOption[], value: string): string => {
  if (!value) return ''
  const option = options.find(opt => opt.value === value)
  return option?.label || ''
}

// 使用传入的 getSelectedLabel 或默认实现
const getSelectedLabel = props.getSelectedLabel || defaultGetSelectedLabel

// 表单数据
const formData = ref<FormData>(props.createDefaultFormData())

// 计算产品型号/结果
const productCode = computed(() => {
  return props.calculateResult(formData.value)
})

// 统一的字段选择处理函数
const handleFieldSelect = (key: string, value: string) => {
  formData.value[key] = value
}

// 重置表单
const handleReset = () => {
  formData.value = props.createDefaultFormData()
}

// 复制产品型号
const handleCopy = async () => {
  if (!productCode.value) {
    Toast({ message: props.emptyResultMessage, type: 'warning' })
    return
  }

  try {
    await navigator.clipboard.writeText(productCode.value)
    Toast({ message: props.copySuccessMessage, type: 'success' })
  } catch (err) {
    // 降级方案
    const textarea = document.createElement('textarea')
    textarea.value = productCode.value
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
      Toast({ message: props.copySuccessMessage, type: 'success' })
    } catch (err) {
      Toast({ message: props.copyErrorMessage, type: 'error' })
    }
    document.body.removeChild(textarea)
  }
}

// 暴露表单数据和方法，方便外部调用
defineExpose({
  formData,
  productCode,
  handleReset,
  handleCopy
})
</script>

<style scoped>
.product-selector-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>

<template>
  <div class="product-selector-container p-4 w-full">
    <Form>
      <!-- 动态生成表单字段 -->
      <FormItem 
        v-for="field in formFields" 
        :key="field.key"
        :label="field.label"
      >
        <!-- 下拉选择类型 -->
        <Select
          v-if="field.type === 'select'"
          :options="field.options || []"
          field-label="label"
          field-value="value"
          :placeholder="field.placeholder || ''"
          :selected="getSelectedLabel(field.options || [], formData[field.key] as string)"
          @select="(value: string) => handleFieldSelect(field.key, value)"
        />
        
        <!-- 输入框类型 -->
        <ipt
          v-else-if="field.type === 'input'"
          v-model.number="formData[field.key]"
          :type="field.inputType || 'text'"
          :placeholder="field.placeholder || ''"
        />
      </FormItem>

      <!-- 产品型号显示 -->
      <FormItem :label="resultLabel">
        <ipt
          :model-value="productCode"
          readonly
          :placeholder="resultPlaceholder"
          class="font-mono"
        />
      </FormItem>

      <div class="flex justify-end mt-4">
        <btn @click="handleReset">{{ resetButtonText }}</btn>
        <btn @click="handleCopy" class="ml-2" :disabled="!productCode">{{ copyButtonText }}</btn>
      </div>
    </Form>
  </div>
</template>
