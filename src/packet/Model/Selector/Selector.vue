<template>
  <div class="product-selector-container p-4 w-full">
    <!-- 产品体系选择器 -->
    <div class="mb-6 flex items-center gap-4">
      <label class="text-base font-medium text-base-content">产品体系：</label>
      <Select
        :options="productTypeOptions"
        field-label="label"
        field-value="value"
        placeholder="请选择产品体系"
        :selected="getSelectedLabel(productTypeOptions, currentProductType)"
        @select="handleProductTypeChange"
        class="w-48"
      />
    </div>

    <!-- 动态加载对应的选型组件 -->
    <component
      :is="currentSelectorComponent"
      v-if="currentSelectorComponent"
      :model-value="props.modelValue"
      @update:modelValue="handleFormDataUpdate"
      @product-code-change="handleCodeChange"
      @roller-code-change="handleCodeChange"
      @roller-id-change="handleIdChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, markRaw, type Component } from 'vue'
import Select from '~/packet/Section/Select/Select.vue'
import ConveyorSelector from './ConveyorSelector.vue'
import RollerSelector from './RollerSelector.vue'
import type { ProductFormData } from './ConveyorSelector'
import type { RollerFormData } from './RollerSelector'
import { getSelectedLabel } from './ConveyorSelector'

// 产品体系类型
export type ProductType = 'conveyor' | 'roller'

// 产品体系选项
export interface ProductTypeOption {
  label: string
  value: ProductType
  component: Component
  icon?: string
}

// 创建默认产品体系选项
const createDefaultProductTypeOptions = (): ProductTypeOption[] => [
  {
    label: '输送带',
    value: 'conveyor' as ProductType,
    component: markRaw(ConveyorSelector),
    icon: 'conveyor-belt'
  },
  {
    label: '滚轮',
    value: 'roller' as ProductType,
    component: markRaw(RollerSelector),
    icon: 'cog'
  }
]

// Props
const props = withDefaults(defineProps<{
  productType?: ProductType
  productTypeOptions?: ProductTypeOption[]
  modelValue?: ProductFormData | RollerFormData | Record<string, any>
}>(), {
  productType: 'conveyor',
  productTypeOptions: undefined,
  modelValue: undefined
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: ProductFormData | RollerFormData | Record<string, any>]
  'product-type-change': [type: ProductType]
  'product-code-change': [code: string]
  'product-id-change': [id: string]
}>()

// 当前产品体系选项（使用 props 或默认值）
const currentProductTypeOptions = computed<ProductTypeOption[]>(() => {
  return props.productTypeOptions || createDefaultProductTypeOptions()
})

// 当前产品体系
const currentProductType = ref<ProductType>(props.productType)

// 监听外部 productType 变化
watch(() => props.productType, (newType) => {
  if (newType && newType !== currentProductType.value) {
    currentProductType.value = newType
  }
})

// 当前选型组件
const currentSelectorComponent = computed<Component | null>(() => {
  const option = currentProductTypeOptions.value.find(opt => opt.value === currentProductType.value)
  return option?.component || null
})


// 产品体系选项（用于 Select 组件）
const productTypeOptions = computed(() => {
  return currentProductTypeOptions.value.map(opt => ({
    label: opt.label,
    value: opt.value
  }))
})

// 处理产品体系切换
const handleProductTypeChange = (type: string) => {
  currentProductType.value = type as ProductType
  emit('product-type-change', type as ProductType)
}

// 处理表单数据更新
const handleFormDataUpdate = (value: ProductFormData | RollerFormData | Record<string, any>) => {
  emit('update:modelValue', value)
}

// 处理产品型号变化
const handleCodeChange = (code: string) => {
  emit('product-code-change', code)
}

// 处理产品ID号变化（仅 Roller 使用）
const handleIdChange = (id: string) => {
  emit('product-id-change', id)
}
</script>

<style scoped>
.product-selector-container {
  max-width: 1000px;
  margin: 0 auto;
}
</style>

