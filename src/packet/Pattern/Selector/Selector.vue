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
      <FormItem label="产品型号">
        <ipt
          :model-value="productCode"
          readonly
          placeholder="产品型号将自动生成"
          class="font-mono"
        />
      </FormItem>

      <div class="flex justify-end mt-4">
        <btn @click="handleReset">重置</btn>
        <btn @click="handleCopy" class="ml-2">复制型号</btn>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Form from '../../Section/Form/Form.vue'
import FormItem from '../../Section/Form/FormItem.vue'
import Select from '../../Section/Select/Select.vue'
import {
  type ProductFormData,
  type ProductCodeConfig,
  formFields,
  createDefaultFormData,
  calculateProductCode,
  getSelectedLabel
} from './Selector'

// 表单数据
const formData = ref<ProductFormData>(createDefaultFormData())

// 产品型号配置（可以通过 props 传入自定义配置）
const props = defineProps<{
  productCodeConfig?: Partial<ProductCodeConfig>
}>()

// 计算产品型号
const productCode = computed(() => {
  return calculateProductCode(formData.value, props.productCodeConfig)
})

// 统一的字段选择处理函数
const handleFieldSelect = (key: keyof ProductFormData, value: string) => {
  formData.value[key] = value as any
}

// 重置表单
const handleReset = () => {
  formData.value = createDefaultFormData()
}

// 复制产品型号
const handleCopy = async () => {
  if (!productCode.value) {
    alert('请先完成所有必填项')
    return
  }

  try {
    await navigator.clipboard.writeText(productCode.value)
    alert('产品型号已复制到剪贴板')
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
      alert('产品型号已复制到剪贴板')
    } catch (err) {
      alert('复制失败，请手动复制')
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
