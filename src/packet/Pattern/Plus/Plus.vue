<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n'
import Drawer from '../../Section/Drawer/Drawer.vue'
import Card from '../../Section/Card/Card.vue'
import TaskCreate from '../../Model/Forms/TaskCreate.vue'
import ProjectCreate from '../../Model/Forms/ProjectCreate.vue'
import AccountCreate from '../../Model/Forms/AccountCreate.vue'
import Toast from '../../Element/Toast/Toast'
import type { CreateType, CreateOption } from './Plus'
import { getCreateOptions } from './PlusData'

const { t } = useI18n();

// Props 定义
const props = withDefaults(defineProps<{
  buttonClass?: string
  onTaskCreate?: (formData?: any) => void
  onProjectCreate?: (formData?: any) => void
  onAccountCreate?: (formData?: any) => void
  onUserCreate?: (formData?: any) => void
  onProductCreate?: (formData?: any) => void
  onDocumentCreate?: (formData?: any) => void
  createOptions?: CreateOption[]
}>(), {
  buttonClass: 'hover:text-primary'
})

const isShowDrawer = ref(false)
const selectedCreateType = ref<CreateType>(null)

// 创建选项列表（从 props 注入或使用默认数据，并处理国际化）
const createOptions = computed<CreateOption[]>(() => {
  const baseOptions = props.createOptions && props.createOptions.length > 0 
    ? props.createOptions 
    : getCreateOptions()
  
  return baseOptions.map(option => {
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
    case 'account':
  props.onAccountCreate?.()
      break
    case 'user':
      props.onUserCreate?.()
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

// 任务表单回调函数
const handleTaskSubmit = async (formData: any) => {
  props.onTaskCreate?.(formData)
}

const handleTaskSuccess = (response: any) => {
  Toast({ message: '任务创建成功', type: 'success' })
  selectedCreateType.value = null
}

const handleTaskError = (error: any, response?: any) => {
  const errorMessage = error?.response?.data?.message || error?.data?.message || '任务创建失败'
  Toast({ message: errorMessage, type: 'error' })
}

// 项目表单回调函数
const handleProjectSubmit = async (formData: any) => {
  props.onProjectCreate?.(formData)
}

const handleProjectSuccess = (response: any) => {
  Toast({ message: '项目创建成功', type: 'success' })
  selectedCreateType.value = null
}

const handleProjectError = (error: any, response?: any) => {
  const errorMessage = error?.response?.data?.message || error?.data?.message || '项目创建失败'
  Toast({ message: errorMessage, type: 'error' })
}

// 账户表单回调函数
const handleAccountSubmit = async (formData: any) => {
  props.onAccountCreate?.(formData)
}

const handleAccountSuccess = (response: any) => {
  Toast({ message: '账户创建成功', type: 'success' })
  selectedCreateType.value = null
}

const handleAccountError = (error: any, response?: any) => {
  const errorMessage = error?.response?.data?.message || error?.data?.message || '账户创建失败'
  Toast({ message: errorMessage, type: 'error' })
}

// 用户创建表单（简单示例）
const userForm = ref({
  name: '',
  email: '',
  role: 'user',
  department: ''
})

const handleUserSubmit = () => {
  if (!userForm.value.name || !userForm.value.email) {
    Toast({ message: '请填写姓名和邮箱', type: 'warning' })
    return
  }
  props.onUserCreate?.(userForm.value)
  Toast({ message: '用户创建成功', type: 'success' })
  // 重置表单
  userForm.value = { name: '', email: '', role: 'user', department: '' }
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
      <div class="flex h-full">
        <!-- 创建选项列表 -->
        <div :class="['flex flex-col',selectedCreateType ? 'w-80 flex-shrink-0' : 'w-full']">
          <!-- 选项列表 -->
          <div class="flex-1 overflow-y-auto p-4 space-y-2">
            <div 
              v-for="option in createOptions" 
              :key="option.key || ''"
              :class="[
                'px-4 rounded-lg cursor-pointer  hover:shadow-md',
                selectedCreateType === option.key ? 'bg-base-200' : 'bg-base-100'
              ]"
              @click="handleCreateTypeClick(option.key)"
            >
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
        <div v-if="selectedCreateType" class="flex-1 flex flex-col border-l-2 border-l-solid border-base-200">
          <!-- 表单头部 -->
          <div class="p-4 border-b border-base-300 bg-base-150 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <btn clean size="xl" @click="backToCreateList">
                <icn name="arrow-left" light xl class="hover:text-primary"></icn>
              </btn>
              <h2 class="text-lg font-bold">
                {{ createOptions.find(opt => opt.key === selectedCreateType)?.name }}
              </h2>
            </div>
          </div>

          <!-- 表单内容 -->
          <div class="flex-1 overflow-y-auto p-6 bg-base-250 ">
            <Card shadow rounded>
              <!-- 任务创建表单 -->
              <TaskCreate 
                      v-if="selectedCreateType === 'task'"
                :onSubmit="handleTaskSubmit"
                :onSuccess="handleTaskSuccess"
                :onError="handleTaskError"
              />

              <!-- 项目创建表单 -->
              <ProjectCreate 
                v-else-if="selectedCreateType === 'project'"
                :onSubmit="handleProjectSubmit"
                :onSuccess="handleProjectSuccess"
                :onError="handleProjectError"
              />

              <!-- 账户创建表单 -->
        <AccountCreate 
                v-else-if="selectedCreateType === 'account'"
          :onSubmit="handleAccountSubmit"
          :onSuccess="handleAccountSuccess"
          :onError="handleAccountError"
        />

              <!-- 用户创建表单 -->
              <div v-else-if="selectedCreateType === 'user'" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1">姓名</label>
                  <ipt 
                    v-model="userForm.name" 
                    placeholder="输入姓名" 
                    class="w-full"
                  ></ipt>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">邮箱</label>
                  <ipt 
                    v-model="userForm.email" 
                    type="email"
                    placeholder="输入邮箱" 
                    class="w-full"
                  ></ipt>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">角色</label>
                  <select 
                    v-model="userForm.role"
                    class="select select-bordered w-full"
                  >
                    <option value="user">普通用户</option>
                    <option value="admin">管理员</option>
                    <option value="editor">编辑</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">部门</label>
                  <ipt 
                    v-model="userForm.department" 
                    placeholder="输入部门" 
                    class="w-full"
                  ></ipt>
                </div>
                <btn color="primary" class="w-full" @click="handleUserSubmit">
                  <icn name="check" light sm class="mr-2"></icn>
                  创建用户
                </btn>
              </div>

              <!-- 产品创建表单 -->
              <div v-else-if="selectedCreateType === 'product'" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1">产品名称</label>
                  <ipt 
                    v-model="productForm.name" 
                    placeholder="输入产品名称" 
                    class="w-full"
                  ></ipt>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">分类</label>
                  <select 
                    v-model="productForm.category"
                    class="select select-bordered w-full"
                  >
                    <option value="">选择分类</option>
                    <option value="phone">手机</option>
                    <option value="computer">电脑</option>
                    <option value="headphone">耳机</option>
                    <option value="electronics">其他电子</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">价格</label>
                  <ipt 
                    v-model="productForm.price" 
                    type="number"
                    placeholder="输入价格" 
                    class="w-full"
                  ></ipt>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">库存</label>
                  <ipt 
                    v-model="productForm.stock" 
                    type="number"
                    placeholder="输入库存数量" 
                    class="w-full"
                  ></ipt>
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
                  <ipt 
                    v-model="documentForm.title" 
                    placeholder="输入文档标题" 
                    class="w-full"
                  ></ipt>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">分类</label>
                  <select 
                    v-model="documentForm.category"
                    class="select select-bordered w-full"
                  >
                    <option value="">选择分类</option>
                    <option value="tech">技术</option>
                    <option value="design">设计</option>
                    <option value="product">产品</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">内容</label>
                  <textarea 
                    v-model="documentForm.content" 
                    placeholder="输入文档内容"
                    class="w-full min-h-48 p-2 border border-base-300 rounded"
                    rows="10"
                  ></textarea>
                </div>
                <btn color="primary" class="w-full" @click="handleDocumentSubmit">
                  <icn name="check" light sm class="mr-2"></icn>
                  创建文档
                </btn>
              </div>
            </Card>
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

