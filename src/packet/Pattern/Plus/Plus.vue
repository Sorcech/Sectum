<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import type { CreateType, CreateOption } from './Plus'
import { getCreateOptions } from './Plus'
import Toast from '~/packet/Element/Toast/Toast';

const { t } = useI18n();

// Props 定义
const props = withDefaults(defineProps<{
  buttonClass?: string
  onTaskCreate?: (formData?: any) => void
  onProjectCreate?: (formData?: any) => void
  onUserCreate?: (formData?: any) => void
  onMatterCreate?: (formData?: any) => void
  onUploadCreate?: (formData?: any) => void
  onProductCreate?: (formData?: any) => void
  onDocumentCreate?: (formData?: any) => void
  createOptions?: CreateOption[]
}>(), {
  buttonClass: 'hover:text-primary'
})

const isShowDrawer = ref(false)
const selectedCreateType = ref<CreateType>(null)

// 创建选项列表（已移除依赖 store 的 User，仅保留 product、document）
const createOptions = computed<CreateOption[]>(() => {
  const baseOptions = props.createOptions && props.createOptions.length > 0 
    ? props.createOptions 
    : getCreateOptions()
  const allowedKeys: CreateType[] = ['product', 'document']
  const filtered = baseOptions.filter((opt: CreateOption) => opt.key && allowedKeys.includes(opt.key))
  return filtered.map(option => {
    const baseOption = option as CreateOption
    return {
      ...baseOption,
      name: baseOption.nameKey ? t(baseOption.nameKey) : baseOption.name || ''
    }
  })
})

// Drawer 宽度（根据是否选中创建类型动态调整）
const drawerWidth = computed(() => {
  return selectedCreateType.value ? 'w-[48rem]' : 'w-96'
})

// Drawer 标题
const drawerTitle = computed(() => {
  if (selectedCreateType.value) {
    const option = createOptions.value.find((opt: CreateOption) => opt.key === selectedCreateType.value)
    return option ? `创建${option.name}` : t('toolbar.plus')
  }
  return t('toolbar.plus')
})

// 切换 Drawer 显示状态
const toggleDrawer = () => {
  isShowDrawer.value = !isShowDrawer.value
  if (!isShowDrawer.value) {
    // 关闭 Drawer 时重置表单状态
    selectedCreateType.value = null
  }
}

// 监听 Drawer 关闭，刷新页面
watch(isShowDrawer, (newVal, oldVal) => {
  // 当 Drawer 从打开变为关闭时，刷新页面
  if (oldVal === true && newVal === false) {
    window.location.reload()
  }
})

// 处理创建类型点击
const handleCreateTypeClick = (type: CreateType) => {
  selectedCreateType.value = type
  // 调用对应的回调
  switch (type) {
    case 'task':
  props.onTaskCreate?.()
      break
    case 'project':
      props.onProjectCreate?.()
      break
    case 'user':
      props.onUserCreate?.()
      break
    case 'matter':
      props.onMatterCreate?.()
      break
    case 'upload':
      props.onUploadCreate?.()
      break
    case 'product':
      props.onProductCreate?.()
      break
    case 'document':
      props.onDocumentCreate?.()
      break
  }
}

// 返回创建选项列表
const backToCreateList = () => {
  selectedCreateType.value = null
}

// 产品创建表单（简单示例）
const productForm = ref({
  name: '',
  category: '',
  price: '',
  stock: ''
})

const handleProductSubmit = () => {
  if (!productForm.value.name || !productForm.value.price) {
    Toast({ message: '请填写产品名称和价格', type: 'warning' })
    return
  }
  props.onProductCreate?.(productForm.value)
  Toast({ message: '产品创建成功', type: 'success' })
  // 重置表单
  productForm.value = { name: '', category: '', price: '', stock: '' }
  selectedCreateType.value = null
}

// 文档创建表单（简单示例）
const documentForm = ref({
  title: '',
  category: '',
  content: ''
})

const handleDocumentSubmit = () => {
  if (!documentForm.value.title || !documentForm.value.content) {
    Toast({ message: '请填写文档标题和内容', type: 'warning' })
    return
  }
  props.onDocumentCreate?.(documentForm.value)
  Toast({ message: '文档创建成功', type: 'success' })
  // 重置表单
  documentForm.value = { title: '', category: '', content: '' }
  selectedCreateType.value = null
}

</script>
<template>
  <div key="plus-drawer" style="padding: 0; margin: 0;">
    <btn item :class="buttonClass" @click="toggleDrawer">
      <icn name="plus" light lg></icn>
    </btn>
    <Drawer 
      :title="drawerTitle" 
      :width="drawerWidth" 
      :isShow="isShowDrawer" 
      @update:isShow="isShowDrawer = $event"
      :overflow="true"
    >
      <div class="flex h-full min-w-0 max-w-full overflow-hidden">
        <!-- 创建选项列表 -->
        <div :class="['flex flex-col',selectedCreateType ? 'w-80 flex-shrink-0' : 'w-full']" style="min-width: 0; max-width: 100%;">
          <!-- 选项列表 -->
          <div class="flex-1 overflow-y-auto p-4 space-y-2">
            <div v-for="option in createOptions" :key="option.key || ''" @click="handleCreateTypeClick(option.key)"
            :class="['px-4 rounded-lg cursor-pointer  hover:shadow-md', selectedCreateType === option.key ? 'bg-base-200' : 'bg-base-100']" >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <icn :name="option.icon" light sm class="text-primary"></icn>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-base text-base-content mb-1">{{ option.name }}</h3>
                  <p class="text-xs text-base-content">{{ option.description }}</p>
                </div>
                <icn name="angle-right" light sm class="text-base-content flex-shrink-0"></icn>
              </div>
            </div>
          </div>
        </div>

        <!-- 创建表单区域 -->
        <div v-if="selectedCreateType" class="flex-1 flex flex-col border-l-2 border-l-solid border-base-200 min-w-0 max-w-full overflow-hidden">
          <!-- 表单头部 -->
          <div class="p-4 border-b border-base-300 bg-base-150 flex items-center justify-between flex-shrink-0 min-w-0 max-w-full overflow-hidden">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <btn clean size="xl" @click="backToCreateList" class="flex-shrink-0">
                <icn name="arrow-left" light xl class="hover:text-primary"></icn>
              </btn>
              <h2 class="text-lg font-bold truncate min-w-0">
                {{ createOptions.find(opt => opt.key === selectedCreateType)?.name }}
              </h2>
            </div>
          </div>

          <!-- 表单内容 -->
          <div :class="[ 'flex-1 p-3 bg-base-250 min-w-0 max-w-full',
            selectedCreateType === 'matter' ? 'overflow-y-auto overflow-x-hidden' : 'overflow-y-auto overflow-x-hidden']" 
            style="position: relative;">
            <!-- 产品创建表单 -->
            <div v-if="selectedCreateType === 'product'" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">产品名称</label>
                <ipt  v-model="productForm.name"  placeholder="输入产品名称"  class="w-full"></ipt>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">分类</label>
                <select  v-model="productForm.category" class="select select-bordered w-full">
                  <option value="">选择分类</option>
                  <option value="phone">手机</option>
                  <option value="computer">电脑</option>
                  <option value="headphone">耳机</option>
                  <option value="electronics">其他电子</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">价格</label>
                <ipt v-model="productForm.price" type="number" placeholder="输入价格" class="w-full"></ipt>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">库存</label>
                <ipt v-model="productForm.stock" type="number" placeholder="输入库存数量"  class="w-full"></ipt>
              </div>
              <btn color="primary" class="w-full" @click="handleProductSubmit">
                <icn name="check" light sm class="mr-2"></icn>
                创建产品
              </btn>
            </div>

            <!-- 文档创建表单 -->
            <div v-else-if="selectedCreateType === 'document'" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">文档标题</label>
                <ipt v-model="documentForm.title"  placeholder="输入文档标题"  class="w-full"></ipt>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">分类</label>
                <select  v-model="documentForm.category" class="select select-bordered w-full">
                  <option value="">选择分类</option>
                  <option value="tech">技术</option>
                  <option value="design">设计</option>
                  <option value="product">产品</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">内容</label>
                <textarea  v-model="documentForm.content" placeholder="输入文档内容"
                  class="w-full min-h-48 p-2 border border-base-300 rounded" rows="10"></textarea>
              </div>
              <btn color="primary" class="w-full" @click="handleDocumentSubmit">
                <icn name="check" light sm class="mr-2"></icn>
                创建文档
              </btn>
            </div>
          </div>
        </div>

        <!-- 未选择创建类型时的提示 -->
        <div v-else class="flex-1 flex flex-col items-center justify-center py-20 px-3 bg-base-100">
          <icn name="plus" light xl class="mb-4 text-base-content"></icn>
          <p class="text-base-content text-lg">选择一个选项开始创建</p>
        </div>
      </div>
    </Drawer>
  </div>
</template>

