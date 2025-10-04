# Upload 文件上传组件

文件上传组件用于处理文件选择和上传功能，支持单文件和多文件上传，提供文件列表展示和删除功能。

## 基本用法

### 导入组件

```typescript
import Upload from '~/packet/Section/Upload/Upload.vue'
```

### 基础示例

```vue
<template>
  <div class="h-screen w-full">
    <h2>Upload 文件选择上传</h2>
    <Upload 
      multiple 
      @change="handleFileChange" 
      label="上传文件" 
      icon 
      list 
    />
  </div>
</template>

<script setup lang="ts">
import Upload from '~/packet/Section/Upload/Upload.vue'
import Message from '~/packet/Element/Message/Message'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const handleFileChange = (files: File[]) => {
  // 处理文件上传逻辑
  let formData = new FormData()
  if (files && files.length > 0) {
    files.forEach((file: File) => {
      formData.append('File', file)
    })
  }
  
  // 这里应该调用你的上传API
  // 示例：uploadFiles(formData).then(...)
  console.log('准备上传文件:', files)
  Message({ type: 'info', message: '请实现文件上传逻辑' })
}
</script>
```

## 属性配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `direction` | `String` | `'row'` | 布局方向，可选值：`'row'` \| `'col'` |
| `multiple` | `Boolean` | `false` | 是否支持多文件选择 |
| `button` | `String` | `'Upload'` | 上传按钮文本 |
| `icon` | `Boolean` | `false` | 是否显示上传图标 |
| `list` | `Boolean` | `false` | 是否显示文件列表 |
| `size` | `String` | `'md'` | 组件尺寸，可选值：`'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` |
| `label` | `String` | - | 标签文本 |
| `labelWidth` | `String` | `'w-4/9'` | 标签宽度 |
| `files` | `Array<FileItem>` | - | 已上传文件列表 |

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `change` | `files: File[]` | 文件选择变化时触发 |
| `delete` | `index: number` | 删除文件时触发 |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| 默认插槽 | 按钮内容区域 |

## 使用示例

### 单文件上传

```vue
<template>
  <Upload 
    @change="handleSingleFile" 
    label="选择文件" 
    button="上传文件"
  />
</template>

<script setup lang="ts">
const handleSingleFile = (files: File[]) => {
  if (files.length > 0) {
    console.log('选择的文件:', files[0])
  }
}
</script>
```

### 多文件上传

```vue
<template>
  <Upload 
    multiple 
    @change="handleMultipleFiles" 
    label="批量上传" 
    button="选择多个文件"
    icon
    list
  />
</template>

<script setup lang="ts">
const handleMultipleFiles = (files: File[]) => {
  console.log('选择的文件数量:', files.length)
  files.forEach((file, index) => {
    console.log(`文件 ${index + 1}:`, file.name)
  })
}
</script>
```

### 垂直布局

```vue
<template>
  <Upload 
    direction="col"
    @change="handleFileChange" 
    label="文件上传" 
    button="选择文件"
    icon
  />
</template>
```

### 带已上传文件列表

```vue
<template>
  <Upload 
    :files="uploadedFiles"
    @change="handleFileChange"
    @delete="handleFileDelete"
    label="文件管理" 
    button="添加文件"
    icon
    list
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FileItem {
  Link: string
  Name: string
  AppendixId: number
}

const uploadedFiles = ref<FileItem[]>([
  {
    Link: '/files/example.pdf',
    Name: 'example.pdf',
    AppendixId: 1
  }
])

const handleFileChange = (files: File[]) => {
  // 处理新选择的文件
  console.log('新文件:', files)
}

const handleFileDelete = (index: number) => {
  // 处理文件删除
  uploadedFiles.value.splice(index, 1)
}
</script>
```

## 样式定制

组件使用UnoCSS原子类实现样式，支持主题色彩变量：

- 按钮样式：使用主题色彩变量
- 文件列表：支持深色模式
- 响应式布局：支持不同屏幕尺寸

## 注意事项

1. 文件上传需要配合后端API实现
2. 建议在上传前进行文件类型和大小验证
3. 大文件上传建议使用分片上传
4. 组件内部使用FormData处理文件数据