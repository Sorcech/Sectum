# File 文件列表组件

## 安装

```ts
import File from "~/packet/Section/File/File.vue"
```

## 基础用法

File 组件用于显示文件列表，支持多种布局方向和文本大小配置。

<div class="flex flex-col gap-4">
  <File 
    label="文件列表" 
    :files="[
      { Name: '文档.pdf', Link: '/files/document.pdf' },
      { Name: '图片.jpg', Link: '/files/image.jpg' },
      { Name: '表格.xlsx', Link: '/files/spreadsheet.xlsx' }
    ]" 
  />
</div>

```vue
<File 
  label="文件列表" 
  :files="[
    { Name: '文档.pdf', Link: '/files/document.pdf' },
    { Name: '图片.jpg', Link: '/files/image.jpg' },
    { Name: '表格.xlsx', Link: '/files/spreadsheet.xlsx' }
  ]" 
/>
```

## 快速开始

### 基本结构

```vue
<File 
  :files="fileList"
  label="我的文件"
  direction="row"
  size="md"
/>
```

### 文件数据格式

```typescript
interface FileItem {
  Name: string;    // 文件显示名称
  Link: string;    // 文件链接地址
}

const fileList: FileItem[] = [
  { Name: '报告.docx', Link: '/downloads/report.docx' },
  { Name: '数据.csv', Link: '/downloads/data.csv' }
]
```

## 示例展示

### 不同布局方向

<div class="flex flex-col gap-4">
  <div>
    <h4 class="text-sm font-medium mb-2">水平布局 (row)</h4>
    <File 
      label="水平文件列表" 
      direction="row"
      :files="[
        { Name: '文件1.pdf', Link: '/files/1.pdf' },
        { Name: '文件2.jpg', Link: '/files/2.jpg' }
      ]" 
    />
  </div>
  
  <div>
    <h4 class="text-sm font-medium mb-2">垂直布局 (col)</h4>
    <File 
      label="垂直文件列表" 
      direction="col"
      :files="[
        { Name: '文件1.pdf', Link: '/files/1.pdf' },
        { Name: '文件2.jpg', Link: '/files/2.jpg' }
      ]" 
    />
  </div>
</div>

```vue
<!-- 水平布局 -->
<File 
  label="水平文件列表" 
  direction="row"
  :files="fileList" 
/>

<!-- 垂直布局 -->
<File 
  label="垂直文件列表" 
  direction="col"
  :files="fileList" 
/>
```

### 不同文本大小

<div class="flex flex-col gap-4">
  <div>
    <h4 class="text-sm font-medium mb-2">小号文本 (xs)</h4>
    <File 
      label="小号文件列表" 
      size="xs"
      :files="[
        { Name: '小文件.txt', Link: '/files/small.txt' }
      ]" 
    />
  </div>
  
  <div>
    <h4 class="text-sm font-medium mb-2">大号文本 (lg)</h4>
    <File 
      label="大号文件列表" 
      size="lg"
      :files="[
        { Name: '大文件.pdf', Link: '/files/large.pdf' }
      ]" 
    />
  </div>
</div>

```vue
<!-- 小号文本 -->
<File 
  label="小号文件列表" 
  size="xs"
  :files="fileList" 
/>

<!-- 大号文本 -->
<File 
  label="大号文件列表" 
  size="lg"
  :files="fileList" 
/>
```

### 自定义标签宽度

<div class="flex flex-col gap-4">
  <div>
    <h4 class="text-sm font-medium mb-2">默认宽度 (w-4/9)</h4>
    <File 
      label="默认宽度标签" 
      :files="[{ Name: '文件.pdf', Link: '/files/file.pdf' }]" 
    />
  </div>
  
  <div>
    <h4 class="text-sm font-medium mb-2">自定义宽度 (w-1/3)</h4>
    <File 
      label="自定义宽度" 
      labelWidth="w-1/3"
      :files="[{ Name: '文件.pdf', Link: '/files/file.pdf' }]" 
    />
  </div>
</div>

```vue
<!-- 默认宽度 -->
<File 
  label="默认宽度标签" 
  :files="fileList" 
/>

<!-- 自定义宽度 -->
<File 
  label="自定义宽度" 
  labelWidth="w-1/3"
  :files="fileList" 
/>
```

### 无标签模式

<div class="flex flex-col gap-4">
  <File 
    :files="[
      { Name: '无标签文件1.pdf', Link: '/files/1.pdf' },
      { Name: '无标签文件2.jpg', Link: '/files/2.jpg' }
    ]" 
  />
</div>

```vue
<File 
  :files="fileList" 
/>
```

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| `direction` | `String` | `'row'` | 否 | 布局方向 |
| `size` | `String` | `'md'` | 否 | 标签文本大小 |
| `label` | `String` | - | 否 | 标签文本 |
| `labelWidth` | `String` | `'w-4/9'` | 否 | 标签宽度 |
| `files` | `Array<FileItem>` | - | 否 | 文件列表数据 |

### direction 可选值

| 值 | 说明 |
|----|------|
| `'row'` | 水平布局（默认） |
| `'col'` | 垂直布局 |

### size 可选值

| 值 | 说明 | 对应 CSS 类 |
|----|------|-------------|
| `'xs'` | 超小号 | `text-xs` |
| `'sm'` | 小号 | `text-sm` |
| `'md'` | 中号（默认） | `text-base` |
| `'lg'` | 大号 | `text-lg` |
| `'xl'` | 超大号 | `text-xl` |

### FileItem 接口

```typescript
interface FileItem {
  Name: string;    // 文件显示名称
  Link: string;    // 文件链接地址
}
```

## 样式类名

### 容器样式

- `flex flex-row w-full` - 水平布局容器
- `flex flex-col` - 垂直布局容器

### 标签样式

- `select-none py-2 px-1` - 标签基础样式
- `text-xs` 到 `text-xl` - 文本大小样式

### 文件项样式

- `flex pl-3 p-1 rounded-$rounded-btn` - 文件项基础样式
- `bg-gray-100 dark:bg-gray-700` - 文件项背景色
- `hover:bg-base-300 dark:hover:bg-gray-600` - 悬停状态

### 文件链接样式

- `text-sm truncate hover:underline` - 链接文本样式

## 自定义样式

### 使用 UnoCSS 原子类

```vue
<File 
  label="自定义样式文件列表" 
  :files="fileList"
  class="border border-gray-300 rounded-lg p-4"
/>
```

### 响应式设计

```vue
<File 
  label="响应式文件列表" 
  :files="fileList"
  class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
/>
```

## Dark 模式支持

File 组件完全支持 Dark 模式，会自动适应主题变化：

- **文件项背景**：浅色模式使用 `bg-gray-100`，深色模式使用 `dark:bg-gray-700`
- **悬停状态**：浅色模式使用 `hover:bg-base-300`，深色模式使用 `dark:hover:bg-gray-600`
- **主题变量**：使用 `$rounded-btn` 等主题变量确保一致性

## 注意事项

1. **文件数据格式**：`files` 数组中的每个对象必须包含 `Name` 和 `Link` 属性
2. **标签显示**：只有当 `label` 属性有值时才会显示标签
3. **文件列表显示**：只有当 `files` 数组有数据时才会显示文件列表
4. **链接行为**：文件链接会在新标签页中打开
5. **文本截断**：长文件名会自动截断并显示省略号

## 最佳实践

1. **合理使用布局**：根据页面空间选择合适的 `direction` 值
2. **保持一致性**：在同一页面中使用相同的 `size` 和 `labelWidth` 设置
3. **提供有意义的文件名**：确保 `Name` 属性包含清晰的文件描述
4. **处理空状态**：当没有文件时，考虑显示提示信息
5. **考虑文件类型**：可以根据文件类型添加图标或颜色区分

## 完整示例

```vue
<template>
  <div class="p-4 space-y-6">
    <!-- 基础文件列表 -->
    <File 
      label="项目文档" 
      :files="projectFiles"
      direction="row"
      size="md"
    />

    <!-- 垂直布局的文件列表 -->
    <File 
      label="下载文件" 
      :files="downloadFiles"
      direction="col"
      size="lg"
      labelWidth="w-1/2"
    />

    <!-- 无标签的紧凑文件列表 -->
    <File 
      :files="recentFiles"
      size="sm"
    />

    <!-- 自定义样式的文件列表 -->
    <div class="border border-gray-200 rounded-lg p-4">
      <File 
        label="重要文件" 
        :files="importantFiles"
        class="bg-blue-50 dark:bg-blue-900/20"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projectFiles = ref([
  { Name: '需求文档.pdf', Link: '/docs/requirements.pdf' },
  { Name: '设计稿.fig', Link: '/designs/mockup.fig' },
  { Name: '测试报告.docx', Link: '/reports/test-report.docx' }
])

const downloadFiles = ref([
  { Name: '软件安装包.exe', Link: '/downloads/software.exe' },
  { Name: '用户手册.pdf', Link: '/downloads/manual.pdf' }
])

const recentFiles = ref([
  { Name: '最近文件1.txt', Link: '/recent/file1.txt' },
  { Name: '最近文件2.jpg', Link: '/recent/file2.jpg' }
])

const importantFiles = ref([
  { Name: '重要合同.pdf', Link: '/important/contract.pdf' },
  { Name: '财务报告.xlsx', Link: '/important/finance.xlsx' }
])
</script>
```

## 使用场景

- **文件管理器**：显示文件夹中的文件列表
- **下载页面**：展示可下载的文件
- **文档中心**：列出各种文档和资料
- **媒体库**：显示图片、视频等媒体文件
- **附件列表**：在表单或邮件中显示附件