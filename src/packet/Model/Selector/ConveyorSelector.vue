<template>
  <div class="conveyor-selector-container p-4 w-full">
    <Form label-placement="left" :label-width="100">
      <!-- 类型选择 -->
      <FormItem label="类型" prop="type">
        <Select
          :options="typeOptions"
          field-label="label"
          field-value="value"
          placeholder="请选择类型"
          :selected="getSelectedLabel(typeOptions, formData.type)"
          @select="(value: string) => handleFieldSelect('type', value)"
        />
      </FormItem>

      <!-- 材质选择 -->
      <FormItem label="材质" prop="material">
        <Select
          :options="materialOptions"
          field-label="label"
          field-value="value"
          placeholder="请选择材质"
          :selected="getSelectedLabel(materialOptions, formData.material)"
          @select="(value: string) => handleFieldSelect('material', value)"
        />
      </FormItem>

      <!-- 带型选择 -->
      <FormItem label="带型" prop="belt">
        <Select
          :options="beltOptions"
          field-label="label"
          field-value="value"
          placeholder="请选择带型"
          :selected="getSelectedLabel(beltOptions, formData.belt)"
          @select="(value: string) => handleFieldSelect('belt', value)"
        />
      </FormItem>

      <!-- 功率选择 -->
      <FormItem label="功率" prop="power">
        <Select
          :options="powerOptions"
          field-label="label"
          field-value="value"
          placeholder="请选择功率"
          :selected="getSelectedLabel(powerOptions, formData.power)"
          @select="(value: string) => handleFieldSelect('power', value)"
        />
      </FormItem>

      <!-- 转速选择 -->
      <FormItem label="转速" prop="speed">
        <Select
          :options="speedOptions"
          field-label="label"
          field-value="value"
          placeholder="请选择转速"
          :selected="getSelectedLabel(speedOptions, formData.speed)"
          @select="(value: string) => handleFieldSelect('speed', value)"
        />
      </FormItem>

      <!-- 尺寸P -->
      <FormItem label="尺寸P" prop="dimensionP">
        <ipt
          v-model.number="formData.dimensionP"
          type="number"
          placeholder="请输入尺寸P"
        />
      </FormItem>

      <!-- 尺寸Q -->
      <FormItem label="尺寸Q" prop="dimensionQ">
        <ipt
          v-model.number="formData.dimensionQ"
          type="number"
          placeholder="请输入尺寸Q"
        />
      </FormItem>

      <!-- 尺寸S -->
      <FormItem label="尺寸S" prop="dimensionS">
        <ipt
          v-model.number="formData.dimensionS"
          type="number"
          placeholder="请输入尺寸S"
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

      <div class="flex justify-end mt-4 gap-2">
        <btn @click="handleReset">重置</btn>
        <btn @click="handleCopy" color="primary">复制型号</btn>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import Form from '~/packet/Section/Form/Form.vue'
import FormItem from '~/packet/Section/Form/FormItem.vue'
import Select from '~/packet/Section/Select/Select.vue'
import Toast from '~/packet/Element/Toast/Toast'
import {
  type ProductFormData,
  type ProductCodeConfig,
  typeOptions,
  materialOptions,
  beltOptions,
  powerOptions,
  speedOptions,
  createDefaultFormData,
  calculateProductCode,
  getSelectedLabel
} from './ConveyorSelector'

// Props
const props = withDefaults(defineProps<{
  productCodeConfig?: Partial<ProductCodeConfig>
  modelValue?: ProductFormData
}>(), {
  productCodeConfig: () => ({}),
  modelValue: undefined
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: ProductFormData]
  'product-code-change': [code: string]
}>()

// 表单数据
const formData = ref<ProductFormData>(
  props.modelValue || createDefaultFormData()
)

// 监听外部数据变化
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    formData.value = { ...newValue }
  }
}, { deep: true })

// 计算产品型号
const productCode = computed(() => {
  return calculateProductCode(formData.value, props.productCodeConfig)
})

// 监听产品型号变化
watch(productCode, (newCode) => {
  emit('product-code-change', newCode)
})

// 处理字段选择
const handleFieldSelect = (key: keyof ProductFormData, value: string) => {
  formData.value[key] = value as any
  emit('update:modelValue', { ...formData.value })
}

// 重置表单
const handleReset = () => {
  formData.value = createDefaultFormData()
  emit('update:modelValue', { ...formData.value })
  Toast({ type: 'success', message: '表单已重置' })
}

// 复制产品型号
const handleCopy = async () => {
  if (!productCode.value) {
    Toast({ type: 'warning', message: '产品型号为空，无法复制' })
    return
  }

  try {
    await navigator.clipboard.writeText(productCode.value)
    Toast({ type: 'success', message: '产品型号已复制到剪贴板' })
  } catch (error) {
    // 降级方案：使用传统方法
    const textArea = document.createElement('textarea')
    textArea.value = productCode.value
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      Toast({ type: 'success', message: '产品型号已复制到剪贴板' })
    } catch (err) {
      Toast({ type: 'error', message: '复制失败，请手动复制' })
    }
    document.body.removeChild(textArea)
  }
}
</script>

<style scoped>
.conveyor-selector-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>

