# Upload 文件上传组件

Upload 文件上传组件用于处理文件选择和上传功能，支持单文件和多文件上传，提供文件列表展示和删除功能。适用于表单上传、批量上传、文件管理等场景。

## 特性

- 📁 **多文件支持** - 支持单文件和多文件选择
- 📋 **文件列表** - 支持显示已选择文件和已上传文件列表
- 🗑️ **文件管理** - 支持删除已选择的文件
- 🎨 **灵活布局** - 支持水平（row）和垂直（col）布局
- 📏 **多种尺寸** - 支持 xs/sm/md/lg/xl 多种标签尺寸
- 🌙 **深色模式** - 完全支持深色模式
- 🎯 **图标支持** - 可选的上传图标显示

## 安装

```ts
import { Upload } from 'sectum'
// 或者
import Upload from 'sectum'
```

## 基础用法

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
| `fileIds` | `Array<number>` | - | 已上传文件ID数组 |
| `fileNames` | `Array<string>` | - | 已上传文件名数组 |
| `fileLinks` | `Array<string>` | - | 已上传文件链接数组 |

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `change` | `files: File[]` | 文件选择变化时触发，返回选择的文件数组 |
| `delete` | `fileId: number` | 删除已上传文件时触发，返回被删除的文件ID |

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
    :fileIds="fileIds"
    :fileNames="fileNames"
    :fileLinks="fileLinks"
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

// 已上传文件数据（三个数组需要保持相同的长度和顺序）
const fileIds = ref<number[]>([1, 2, 3])
const fileNames = ref<string[]>([
  'example.pdf',
  'document.docx',
  'image.jpg'
])
const fileLinks = ref<string[]>([
  '/files/example.pdf',
  '/files/document.docx',
  '/files/image.jpg'
])

const handleFileChange = (files: File[]) => {
  // 处理新选择的文件
  console.log('新文件:', files)
  // 上传成功后，更新三个数组
  // fileIds.value.push(newFileId)
  // fileNames.value.push(newFileName)
  // fileLinks.value.push(newFileLink)
}

const handleFileDelete = (fileId: number) => {
  // 处理文件删除
  const index = fileIds.value.indexOf(fileId)
  if (index > -1) {
    fileIds.value.splice(index, 1)
    fileNames.value.splice(index, 1)
    fileLinks.value.splice(index, 1)
  }
}
</script>
```

## 样式定制

组件使用UnoCSS原子类实现样式，支持主题色彩变量：

- 按钮样式：使用主题色彩变量
- 文件列表：支持深色模式
- 响应式布局：支持不同屏幕尺寸

## 数据格式说明

### 已上传文件数据

已上传文件通过三个独立的数组 props 传递：

- `fileIds`: 文件ID数组，类型为 `number[]`
- `fileNames`: 文件名数组，类型为 `string[]`
- `fileLinks`: 文件链接数组，类型为 `string[]`

**重要提示**：
- 三个数组必须保持相同的长度
- 相同索引位置的元素对应同一个文件
- 删除文件时需要同时从三个数组中移除对应索引的元素

### 示例数据结构

```typescript
// 三个数组，索引对应关系
const fileIds = [1, 2, 3]
const fileNames = ['file1.pdf', 'file2.jpg', 'file3.docx']
const fileLinks = ['/files/1', '/files/2', '/files/3']

// 索引 0: fileId=1, fileName='file1.pdf', fileLink='/files/1'
// 索引 1: fileId=2, fileName='file2.jpg', fileLink='/files/2'
// 索引 2: fileId=3, fileName='file3.docx', fileLink='/files/3'
```

## 注意事项

1. **文件上传**：文件上传需要配合后端API实现，组件只负责文件选择
2. **文件验证**：建议在上传前进行文件类型和大小验证
3. **大文件上传**：大文件上传建议使用分片上传
4. **数据格式**：组件内部使用FormData处理文件数据
5. **数组同步**：使用 `fileIds`、`fileNames`、`fileLinks` 时，确保三个数组保持同步
6. **删除操作**：删除文件时，`delete` 事件会传递文件ID，需要根据ID找到对应索引并同时更新三个数组