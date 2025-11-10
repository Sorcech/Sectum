<template>
  <div class="roller-selector-container p-4 w-full">
    <Form label-placement="left" :label-width="100">
      <!-- 驱动类型选择 -->
      <FormItem label="驱动类型" prop="type">
        <Select
          :options="typeOptions"
          field-label="label"
          field-value="value"
          placeholder="请选择驱动类型"
          :selected="getSelectedLabel(typeOptions, formData.type)"
          @select="(value: string) => handleFieldSelect('type', value)"
        />
      </FormItem>

      <!-- 直径规格选择 -->
      <FormItem label="直径规格" prop="diameter">
        <Select
          :options="diameterOptions"
          field-label="label"
          field-value="value"
          placeholder="请选择直径规格"
          :selected="getSelectedLabel(diameterOptions, formData.diameter)"
          @select="(value: string) => handleFieldSelect('diameter', value)"
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

      <!-- 轴型选择 -->
      <FormItem label="轴型" prop="shaft">
        <Select
          :options="shaftOptions"
          field-label="label"
          field-value="value"
          placeholder="请选择轴型"
          :selected="getSelectedLabel(shaftOptions, formData.shaft)"
          @select="(value: string) => handleFieldSelect('shaft', value)"
        />
      </FormItem>

      <!-- 功率选择 -->
      <FormItem label="功率" prop="power">
        <Select
          :options="powerOptions"
          field-label="label"
          field-value="value"
          placeholder="请选择功率"
          :selected="getSelectedLabel(powerOptions, String(formData.power || ''))"
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
          :selected="getSelectedLabel(speedOptions, String(formData.speed || ''))"
          @select="(value: string) => handleFieldSelect('speed', value)"
        />
      </FormItem>

      <!-- 尺寸输入 -->
      <FormItem label="尺寸" prop="dimension">
        <ipt
          v-model.number="formData.dimension"
          type="number"
          placeholder="请输入尺寸"
        />
      </FormItem>

      <!-- 产品型号显示 -->
      <FormItem label="产品型号">
        <ipt
          :model-value="rollerCode"
          readonly
          placeholder="产品型号将自动生成"
          class="font-mono"
        />
      </FormItem>

      <!-- 产品ID号显示 -->
      <FormItem label="产品ID号">
        <ipt
          :model-value="rollerId"
          readonly
          placeholder="产品ID号将自动生成"
          class="font-mono"
        />
      </FormItem>

      <div class="flex justify-end mt-4 gap-2">
        <btn @click="handleReset">重置</btn>
        <btn @click="handleCopyCode" color="primary">复制型号</btn>
        <btn @click="handleCopyId" color="primary">复制ID</btn>
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
  type RollerFormData,
  type RollerCodeConfig,
  typeOptions,
  diameterOptions,
  materialOptions,
  beltOptions,
  shaftOptions,
  powerOptions,
  speedOptions,
  createDefaultFormData,
  calculateRollerCode,
  calculateRollerId,
  getSelectedLabel
} from './RollerSelector'

// Props
const props = withDefaults(defineProps<{
  rollerCodeConfig?: Partial<RollerCodeConfig>
  modelValue?: RollerFormData
}>(), {
  rollerCodeConfig: () => ({}),
  modelValue: undefined
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: RollerFormData]
  'roller-code-change': [code: string]
  'roller-id-change': [id: string]
}>()

// 表单数据
const formData = ref<RollerFormData>(
  props.modelValue || createDefaultFormData()
)

// 监听外部数据变化
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    formData.value = { ...newValue }
  }
}, { deep: true })

// 计算产品型号
const rollerCode = computed(() => {
  return calculateRollerCode(formData.value, props.rollerCodeConfig)
})

// 计算产品ID号
const rollerId = computed(() => {
  return calculateRollerId(formData.value)
})

// 监听产品型号变化
watch(rollerCode, (newCode) => {
  emit('roller-code-change', newCode)
})

// 监听产品ID号变化
watch(rollerId, (newId) => {
  emit('roller-id-change', newId)
})

// 处理字段选择
const handleFieldSelect = (key: keyof RollerFormData, value: string) => {
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
const handleCopyCode = async () => {
  if (!rollerCode.value) {
    Toast({ type: 'warning', message: '产品型号为空，无法复制' })
    return
  }

  try {
    await navigator.clipboard.writeText(rollerCode.value)
    Toast({ type: 'success', message: '产品型号已复制到剪贴板' })
  } catch (error) {
    // 降级方案：使用传统方法
    const textArea = document.createElement('textarea')
    textArea.value = rollerCode.value
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

// 复制产品ID号
const handleCopyId = async () => {
  if (!rollerId.value) {
    Toast({ type: 'warning', message: '产品ID号为空，无法复制' })
    return
  }

  try {
    await navigator.clipboard.writeText(rollerId.value)
    Toast({ type: 'success', message: '产品ID号已复制到剪贴板' })
  } catch (error) {
    // 降级方案：使用传统方法
    const textArea = document.createElement('textarea')
    textArea.value = rollerId.value
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      Toast({ type: 'success', message: '产品ID号已复制到剪贴板' })
    } catch (err) {
      Toast({ type: 'error', message: '复制失败，请手动复制' })
    }
    document.body.removeChild(textArea)
  }
}
</script>

<style scoped>
.roller-selector-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>

