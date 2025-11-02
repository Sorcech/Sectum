# Modal 模态框组件

Modal 模态框组件是一个功能完整的弹窗组件，支持多种尺寸、样式和交互方式。适用于确认对话框、表单弹窗、信息展示等场景。

## 特性

- 📏 **多种尺寸** - 支持预设尺寸（sm/md/lg）和自定义尺寸
- 🎨 **灵活样式** - 支持圆角、阴影、背景模糊等样式
- 🎯 **多种关闭方式** - 支持点击外部关闭、关闭按钮、ESC 键关闭
- 🔘 **插槽支持** - 提供 header、body、footer 三个插槽
- 🌙 **深色模式** - 完全支持深色模式
- 📱 **响应式** - 自适应不同屏幕尺寸
- ♿ **无障碍** - 支持键盘导航和焦点管理

## 安装

```ts
import { Modal } from 'sectum'
// 或者
import Modal from 'sectum'
```

<div class="flex flex-wrap items-center gap-3">
  <btn @click="modal.basic = true">基础模态框</btn>
  <Modal v-model:active="modal.basic">
    <template #header>基础模态框</template>
    <template #body>
      <p>这是一个基础的模态框示例。您可以在这里放置任何内容。</p>
    </template>
    <template #footer="footerProps">
      <btn @click="modal.basic = false">关闭</btn>
    </template>
  </Modal>
</div>

```vue
<template>
  <div class="flex flex-wrap items-center gap-3">
    <btn @click="modal.basic = true">基础模态框</btn>
    <Modal v-model:active="modal.basic">
      <template #header>基础模态框</template>
      <template #body>
        <p>这是一个基础的模态框示例。您可以在这里放置任何内容。</p>
      </template>
      <template #footer="footerProps">
        <btn @click="modal.basic = false">关闭</btn>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modal = ref({
  basic: false
})
</script>
```

## 快速开始

### 基本结构

```vue
<Modal v-model:active="isOpen">
  <template #header>标题</template>
  <template #body>内容</template>
  <template #footer="{ dismiss }">
    <btn @click="dismiss">关闭</btn>
  </template>
</Modal>
```

### 状态管理

```vue
<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}
</script>
```

## 示例展示

### 不同尺寸

<div class="flex flex-wrap items-center gap-3">
  <btn @click="modal.small = true">小尺寸 (sm)</btn>
  <btn @click="modal.medium = true">中尺寸 (md)</btn>
  <btn @click="modal.large = true">大尺寸 (lg)</btn>
  <Modal v-model:active="modal.small">
    <template #header>小尺寸模态框</template>
    <template #body>这是小尺寸的模态框内容</template>
    <template #footer="footerProps">
      <btn @click="modal.small = false">关闭</btn>
    </template>
  </Modal>
  <Modal v-model:active="modal.medium" size="md">
    <template #header>中尺寸模态框</template>
    <template #body>这是中尺寸的模态框内容</template>
    <template #footer="footerProps">
      <btn @click="modal.medium = false">关闭</btn>
    </template>
  </Modal>
  <Modal v-model:active="modal.large" size="lg">
    <template #header>大尺寸模态框</template>
    <template #body>这是大尺寸的模态框内容</template>
    <template #footer="footerProps">
      <btn @click="modal.large = false">关闭</btn>
    </template>
  </Modal>
</div>

```vue
<template>
  <div class="flex flex-wrap items-center gap-3">
    <btn @click="modal.small = true">小尺寸 (sm)</btn>
    <btn @click="modal.medium = true">中尺寸 (md)</btn>
    <btn @click="modal.large = true">大尺寸 (lg)</btn>
    <Modal v-model:active="modal.small">
      <template #header>小尺寸模态框</template>
      <template #body>这是小尺寸的模态框内容</template>
      <template #footer="footerProps">
        <btn @click="modal.small = false">关闭</btn>
      </template>
    </Modal>
    <Modal v-model:active="modal.medium" size="md">
      <template #header>中尺寸模态框</template>
      <template #body>这是中尺寸的模态框内容</template>
      <template #footer="footerProps">
        <btn @click="modal.medium = false">关闭</btn>
      </template>
    </Modal>
    <Modal v-model:active="modal.large" size="lg">
      <template #header>大尺寸模态框</template>
      <template #body>这是大尺寸的模态框内容</template>
      <template #footer="footerProps">
        <btn @click="modal.large = false">关闭</btn>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modal = ref({
  small: false,
  medium: false,
  large: false
})
</script>
```

### 关闭按钮

<div class="flex flex-wrap items-center gap-3">
  <btn @click="modal.closeBtn = true">带关闭按钮</btn>
  <Modal v-model:active="modal.closeBtn" closeBtn>
    <template #header>带关闭按钮的模态框</template>
    <template #body>这个模态框右上角有关闭按钮</template>
    <template #footer="footerProps">
      <btn @click="modal.closeBtn = false">确定</btn>
    </template>
  </Modal>
</div>

```vue
<template>
  <div class="flex flex-wrap items-center gap-3">
    <btn @click="modal.closeBtn = true">带关闭按钮</btn>
    <Modal v-model:active="modal.closeBtn" closeBtn>
      <template #header>带关闭按钮的模态框</template>
      <template #body>这个模态框右上角有关闭按钮</template>
      <template #footer="footerProps">
        <btn @click="modal.closeBtn = false">确定</btn>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modal = ref({
  closeBtn: false
})
</script>
```

### 无背景遮罩

<div class="flex flex-wrap items-center gap-3">
  <btn @click="modal.noBackdrop = true">无背景遮罩</btn>
  <Modal v-model:active="modal.noBackdrop" :backdrop="false">
    <template #header>无背景遮罩模态框</template>
    <template #body>这个模态框没有背景遮罩</template>
    <template #footer="footerProps">
      <btn @click="modal.noBackdrop = false">关闭</btn>
    </template>
  </Modal>
</div>

```vue
<template>
  <div class="flex flex-wrap items-center gap-3">
    <btn @click="modal.noBackdrop = true">无背景遮罩</btn>
    <Modal v-model:active="modal.noBackdrop" :backdrop="false">
      <template #header>无背景遮罩模态框</template>
      <template #body>这个模态框没有背景遮罩</template>
      <template #footer="footerProps">
        <btn @click="modal.noBackdrop = false">关闭</btn>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modal = ref({
  noBackdrop: false
})
</script>
```

### 禁止点击外部关闭

<div class="flex flex-wrap items-center gap-3">
  <btn @click="modal.noOutside = true">禁止外部点击关闭</btn>
  <Modal v-model:active="modal.noOutside" :outside="false">
    <template #header>禁止外部点击关闭</template>
    <template #body>这个模态框不能通过点击外部区域关闭</template>
    <template #footer="footerProps">
      <btn @click="modal.noOutside = false">关闭</btn>
    </template>
  </Modal>
</div>

```vue
<template>
  <div class="flex flex-wrap items-center gap-3">
    <btn @click="modal.noOutside = true">禁止外部点击关闭</btn>
    <Modal v-model:active="modal.noOutside" :outside="false">
      <template #header>禁止外部点击关闭</template>
      <template #body>这个模态框不能通过点击外部区域关闭</template>
      <template #footer="footerProps">
        <btn @click="modal.noOutside = false">关闭</btn>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modal = ref({
  noOutside: false
})
</script>
```

### 无头模态框（Headless）

<div class="flex flex-wrap items-center gap-3">
  <btn @click="modal.headless = true">无头模态框</btn>
  <Modal v-model:active="modal.headless">
    <div class="bg-primary-200 px-6 py-14 text-center">
      <div class="text-2xl font-bold text-white">自定义模态框</div>
      <p class="text-white mt-2">完全自定义的模态框内容</p>
      <btn @click="modal.headless = false" class="mt-4">关闭</btn>
    </div>
  </Modal>
</div>

```vue
<template>
  <div class="flex flex-wrap items-center gap-3">
    <btn @click="modal.headless = true">无头模态框</btn>
    <Modal v-model:active="modal.headless">
      <div class="bg-primary-200 px-6 py-14 text-center">
        <div class="text-2xl font-bold text-white">自定义模态框</div>
        <p class="text-white mt-2">完全自定义的模态框内容</p>
        <btn @click="modal.headless = false" class="mt-4">关闭</btn>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modal = ref({
  headless: false
})
</script>
```

### 背景模糊效果

<div class="flex flex-wrap items-center gap-3">
  <btn @click="modal.backdropBlur = true">背景模糊</btn>
  <Modal v-model:active="modal.backdropBlur">
    <template #header>背景模糊模态框</template>
    <template #body>这个模态框有背景模糊效果</template>
    <template #footer="footerProps">
      <btn @click="modal.backdropBlur = false">关闭</btn>
    </template>
  </Modal>
</div>

```vue
<template>
  <div class="flex flex-wrap items-center gap-3">
    <btn @click="modal.backdropBlur = true">背景模糊</btn>
    <Modal v-model:active="modal.backdropBlur">
      <template #header>背景模糊模态框</template>
      <template #body>这个模态框有背景模糊效果</template>
      <template #footer="footerProps">
        <btn @click="modal.backdropBlur = false">关闭</btn>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modal = ref({
  backdropBlur: false
})
</script>
```

### 圆角样式

<div class="flex flex-wrap items-center gap-3">
  <btn @click="modal.rounded = true">圆角模态框</btn>
  <Modal v-model:active="modal.rounded" rounded>
    <template #header>圆角模态框</template>
    <template #body>这个模态框有圆角样式</template>
    <template #footer="footerProps">
      <btn @click="modal.rounded = false">关闭</btn>
    </template>
  </Modal>
</div>

```vue
<template>
  <div class="flex flex-wrap items-center gap-3">
    <btn @click="modal.rounded = true">圆角模态框</btn>
    <Modal v-model:active="modal.rounded" rounded>
      <template #header>圆角模态框</template>
      <template #body>这个模态框有圆角样式</template>
      <template #footer="footerProps">
        <btn @click="modal.rounded = false">关闭</btn>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modal = ref({
  rounded: false
})
</script>
```

### 自定义尺寸

<div class="flex flex-wrap items-center gap-3">
  <btn @click="modal.custom = true">自定义尺寸</btn>
  <Modal v-model:active="modal.custom" width="w-96" height="h-80">
    <template #header>自定义尺寸模态框</template>
    <template #body>这个模态框使用了自定义的宽度和高度</template>
    <template #footer="footerProps">
      <btn @click="modal.custom = false">关闭</btn>
    </template>
  </Modal>
</div>

```vue
<template>
  <div class="flex flex-wrap items-center gap-3">
    <btn @click="modal.custom = true">自定义尺寸</btn>
    <Modal v-model:active="modal.custom" width="w-96" height="h-80">
      <template #header>自定义尺寸模态框</template>
      <template #body>这个模态框使用了自定义的宽度和高度</template>
      <template #footer="footerProps">
        <btn @click="modal.custom = false">关闭</btn>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modal = ref({
  custom: false
})
</script>
```

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| `active` | `Boolean` | - | 是 | 控制模态框显示/隐藏 |
| `backdrop` | `Boolean` | `true` | 否 | 是否显示背景遮罩 |
| `outside` | `Boolean` | `true` | 否 | 是否允许点击外部关闭 |
| `closeBtn` | `Boolean` | `false` | 否 | 是否显示关闭按钮 |
| `rounded` | `Boolean` | `false` | 否 | 是否使用圆角样式 |
| `width` | `String` | `'w-200'` | 否 | 自定义宽度 |
| `height` | `String` | `'h-150'` | 否 | 自定义高度 |
| `size` | `String` | - | 否 | 预设尺寸 |

### size 可选值

| 值 | 说明 | 宽度 | 高度 |
|----|------|------|------|
| `'sm'` | 小尺寸 | 25% | 20% |
| `'md'` | 中尺寸 | 33.33% | 25% |
| `'lg'` | 大尺寸 | 50% | 33.33% |

### Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| `header` | - | 模态框头部内容 |
| `body` | - | 模态框主体内容 |
| `footer` | `{ dismiss: Function }` | 模态框底部内容 |

### 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:active` | `Boolean` | 模态框显示状态变化时触发 |
| `close` | - | 模态框关闭时触发 |

## 样式类名

### 容器样式

- `fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` - 居中定位
- `transform z-25 bg-base-100 flex flex-col justify-between` - 基础容器样式
- `max-h-4/5 max-w-4/5` - 最大尺寸限制

### 尺寸样式

- `w-1/4 h-1/5` - 小尺寸 (sm)
- `w-1/3 h-1/4` - 中尺寸 (md)
- `w-1/2 h-1/3` - 大尺寸 (lg)

### 头部样式

- `flex flex-row justify-between pl-3 pr-5 border-1 py-3` - 头部基础样式
- `rounded-t-$rounded-btn` - 头部圆角样式

### 主体样式

- `p-1 overflow-y-auto` - 主体基础样式

### 底部样式

- `flex justify-end px-3 pb-3 mt-1.5 space-x-3 items-center align-middle` - 底部样式

## 自定义样式

### 使用 UnoCSS 原子类

```vue
<Modal v-model:active="isOpen" class="border-2 border-blue-500">
  <template #header>
    <div class="bg-blue-500 text-white p-4">
      自定义头部样式
    </div>
  </template>
  <template #body>
    <div class="p-6 bg-gray-50">
      自定义主体样式
    </div>
  </template>
</Modal>
```

### 响应式设计

```vue
<Modal v-model:active="isOpen" width="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
  <template #header>响应式模态框</template>
  <template #body>根据屏幕尺寸调整宽度</template>
</Modal>
```

## Dark 模式支持

Modal 组件完全支持 Dark 模式，会自动适应主题变化：

- **背景色**：使用 `bg-base-100` 主题变量
- **文本色**：使用 `text-base-content` 主题变量
- **边框色**：使用 `border-base-300` 主题变量
- **主题变量**：使用 `$rounded-btn` 等主题变量确保一致性

## 注意事项

1. **状态管理**：必须使用 `v-model:active` 或 `:active` 绑定状态
2. **插槽内容**：`header`、`body`、`footer` 插槽都是可选的
3. **关闭方式**：支持点击外部关闭、关闭按钮、ESC 键关闭
4. **z-index 层级**：模态框使用 `z-25` 确保显示在其他元素之上
5. **滚动处理**：主体内容区域支持滚动，超出高度时显示滚动条

## 最佳实践

1. **合理使用尺寸**：根据内容选择合适的 `size` 值
2. **提供关闭方式**：确保用户有多种方式关闭模态框
3. **保持一致性**：在同一应用中使用相同的模态框样式
4. **考虑移动端**：在移动设备上使用合适的尺寸
5. **无障碍访问**：为屏幕阅读器用户提供适当的标签和描述

## 完整示例

```vue
<template>
  <div class="p-4 space-y-4">
    <!-- 基础模态框 -->
    <btn @click="openBasicModal">基础模态框</btn>
    <Modal v-model:active="modals.basic">
      <template #header>基础模态框</template>
      <template #body>
        <p>这是一个基础的模态框示例。</p>
        <p>您可以在这里放置任何内容。</p>
      </template>
      <template #footer="{ dismiss }">
        <btn @click="dismiss">关闭</btn>
      </template>
    </Modal>

    <!-- 确认对话框 -->
    <btn @click="openConfirmModal" color="error">删除确认</btn>
    <Modal v-model:active="modals.confirm" size="sm" closeBtn>
      <template #header>确认删除</template>
      <template #body>
        <p>您确定要删除这个项目吗？此操作无法撤销。</p>
      </template>
      <template #footer="{ dismiss }">
        <btn @click="dismiss" variant="outline">取消</btn>
        <btn @click="handleDelete" color="error">删除</btn>
      </template>
    </Modal>

    <!-- 表单模态框 -->
    <btn @click="openFormModal" color="primary">编辑表单</btn>
    <Modal v-model:active="modals.form" size="md" rounded>
      <template #header>编辑用户信息</template>
      <template #body>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">姓名</label>
            <input v-model="form.name" class="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">邮箱</label>
            <input v-model="form.email" type="email" class="w-full px-3 py-2 border rounded" />
          </div>
        </form>
      </template>
      <template #footer="{ dismiss }">
        <btn @click="dismiss" variant="outline">取消</btn>
        <btn @click="handleSubmit" color="primary">保存</btn>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const modals = ref({
  basic: false,
  confirm: false,
  form: false
})

const form = reactive({
  name: '',
  email: ''
})

const openBasicModal = () => {
  modals.value.basic = true
}

const openConfirmModal = () => {
  modals.value.confirm = true
}

const openFormModal = () => {
  modals.value.form = true
}

const handleDelete = () => {
  console.log('删除项目')
  modals.value.confirm = false
}

const handleSubmit = () => {
  console.log('保存表单', form)
  modals.value.form = false
}
</script>
```

## 使用场景

- **确认对话框**：删除确认、操作确认等
- **表单弹窗**：编辑表单、新增数据等
- **信息展示**：详情查看、帮助信息等
- **设置面板**：用户设置、系统配置等
- **媒体查看器**：图片预览、视频播放等

---

<script setup>
import { ref } from 'vue'

// 示例数据
const modal = ref({
  basic: false,
  small: false,
  medium: false,
  large: false,
  closeBtn: false,
  noBackdrop: false,
  noOutside: false,
  headless: false,
  backdropBlur: false,
  rounded: false,
  custom: false
})
</script>