# Select 选择器组件

Select 选择器组件用于在多个选项中进行选择，当选项较多或不确定时特别有用。适用于表单选择、数据筛选、配置选择等场景。

## 特性

- 📋 **下拉选择** - 优雅的下拉菜单选择界面
- 🎯 **灵活配置** - 支持自定义字段名、占位符、标签等
- 📏 **多种尺寸** - 支持 xs/sm/md/lg/xl 多种尺寸
- 🎨 **多种布局** - 支持水平（row）和垂直（col）布局
- 🔒 **禁用状态** - 支持禁用状态
- 💾 **预设值** - 支持预设选中值
- 🌙 **深色模式** - 完全支持深色模式
- 📱 **响应式** - 自适应不同屏幕尺寸
- ♿ **无障碍** - 支持键盘导航

## 安装

```ts
import { Select } from 'sectum'
// 或者
import Select from 'sectum'
```

## 基础用法

```vue
<template>
  <Select :options="options" />
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' },
  { label: '英国', value: 'england' },
  { label: '俄罗斯', value: 'russia' }
]
</script>
```

## 带标签的选择器

```vue
<template>
  <Select label="国籍" :options="options" />
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' },
  { label: '英国', value: 'england' },
  { label: '俄罗斯', value: 'russia' }
]
</script>
```

## 不同尺寸

```vue
<template>
  <div class="space-y-4">
    <Select size="xs" placeholder="超小尺寸" :options="options" />
    <Select size="sm" placeholder="小尺寸" :options="options" />
    <Select size="md" placeholder="中等尺寸" :options="options" />
    <Select size="lg" placeholder="大尺寸" :options="options" />
    <Select size="xl" placeholder="超大尺寸" :options="options" />
  </div>
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>
```

## 禁用状态

```vue
<template>
  <Select :options="options" disabled placeholder="禁用状态" />
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>
```

## 自定义字段名

```vue
<template>
  <Select 
    :options="options" 
    field-label="name" 
    field-value="id"
    placeholder="选择用户"
  />
</template>

<script setup lang="ts">
const options = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' }
]
</script>
```

## 预设选中值

```vue
<template>
  <Select 
    :options="options" 
    :selected="selectedValue"
    @select="handleSelect"
  />
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' }
]

const selectedValue = ref('china')

const handleSelect = (value: string) => {
  console.log('选中的值:', value)
}
</script>
```

## 垂直布局

```vue
<template>
  <Select 
    label="选择国家" 
    direction="col"
    :options="options" 
  />
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' }
]
</script>
```

## 自定义标签宽度

```vue
<template>
  <div class="space-y-4">
    <Select 
      label="短标签" 
      label-width="w-1/4"
      :options="options" 
    />
    <Select 
      label="这是一个很长的标签文本" 
      label-width="w-1/2"
      :options="options" 
    />
  </div>
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>
```

## 事件处理

```vue
<template>
  <Select 
    :options="options" 
    @select="handleSelect"
    @select-index="handleSelectIndex"
  />
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]

const handleSelect = (value: any) => {
  console.log('选中的值:', value)
}

const handleSelectIndex = (index: number) => {
  console.log('选中的索引:', index)
}
</script>
```

## 实际使用示例

### 基础选择器

<Select :options="[
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' },
  { label: '英国', value: 'england' },
  { label: '俄罗斯', value: 'russia' }
]" />

### 带标签的选择器

<Select 
  label="国籍" 
  :options="[
    { label: '中国', value: 'china' },
    { label: '美国', value: 'america' },
    { label: '日本', value: 'japan' },
    { label: '英国', value: 'england' },
    { label: '俄罗斯', value: 'russia' }
  ]" 
/>

### 不同尺寸

<div class="space-y-4">
  <Select size="xs" placeholder="超小尺寸" :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ]" />
  
  <Select size="sm" placeholder="小尺寸" :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ]" />
  
  <Select size="md" placeholder="中等尺寸" :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ]" />
  
  <Select size="lg" placeholder="大尺寸" :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ]" />
  
  <Select size="xl" placeholder="超大尺寸" :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ]" />
</div>

### 禁用状态

<Select 
  :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ]" 
  disabled 
  placeholder="禁用状态" 
/>

### 垂直布局

<Select 
  label="选择国家" 
  direction="col"
  :options="[
    { label: '中国', value: 'china' },
    { label: '美国', value: 'america' },
    { label: '日本', value: 'japan' }
  ]" 
/>

### 自定义字段名

<Select 
  :options="[
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' }
  ]" 
  field-label="name" 
  field-value="id"
  placeholder="选择用户"
/>

### 预设选中值

<Select 
  :options="[
    { label: '中国', value: 'china' },
    { label: '美国', value: 'america' },
    { label: '日本', value: 'japan' }
  ]" 
  selected="china"
/>

### 自定义标签宽度

<div class="space-y-4">
  <Select 
    label="短标签" 
    label-width="w-1/4"
    :options="[
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]" 
  />
  
  <Select 
    label="这是一个很长的标签文本" 
    label-width="w-1/2"
    :options="[
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]" 
  />
</div>

## 代码示例

### 基础用法

```vue
<template>
  <Select :options="options"></Select>
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' },
  { label: '英国', value: 'england' },
  { label: '俄罗斯', value: 'russia' }
]
</script>
```

### 带标签的选择器

```vue
<template>
  <Select label="国籍" :options="options"></Select>
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' },
  { label: '英国', value: 'england' },
  { label: '俄罗斯', value: 'russia' }
]
</script>
```

### 不同尺寸

```vue
<template>
  <div class="space-y-4">
    <Select size="xs" placeholder="超小尺寸" :options="options" />
    <Select size="sm" placeholder="小尺寸" :options="options" />
    <Select size="md" placeholder="中等尺寸" :options="options" />
    <Select size="lg" placeholder="大尺寸" :options="options" />
    <Select size="xl" placeholder="超大尺寸" :options="options" />
  </div>
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>
```

### 禁用状态

```vue
<template>
  <Select :options="options" disabled placeholder="禁用状态" />
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>
```

### 自定义字段名

```vue
<template>
  <Select 
    :options="options" 
    field-label="name" 
    field-value="id"
    placeholder="选择用户"
  />
</template>

<script setup lang="ts">
const options = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' }
]
</script>
```

### 预设选中值

```vue
<template>
  <Select 
    :options="options" 
    :selected="selectedValue"
    @select="handleSelect"
  />
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' }
]

const selectedValue = ref('china')

const handleSelect = (value: string) => {
  console.log('选中的值:', value)
}
</script>
```

### 垂直布局

```vue
<template>
  <Select 
    label="选择国家" 
    direction="col"
    :options="options" 
  />
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' }
]
</script>
```

### 自定义标签宽度

```vue
<template>
  <div class="space-y-4">
    <Select 
      label="短标签" 
      label-width="w-1/4"
      :options="options" 
    />
    <Select 
      label="这是一个很长的标签文本" 
      label-width="w-1/2"
      :options="options" 
    />
  </div>
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>
```

### 事件处理

```vue
<template>
  <Select 
    :options="options" 
    @select="handleSelect"
    @select-index="handleSelectIndex"
  />
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]

const handleSelect = (value: any) => {
  console.log('选中的值:', value)
}

const handleSelectIndex = (index: number) => {
  console.log('选中的索引:', index)
}
</script>
```

## API 参考

### Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `options` | `SelectOption[]` | `[]` | 选项数组，必需 |
| `label` | `string` | - | 标签文本 |
| `labelWidth` | `string` | `'w-4/9'` | 标签宽度，支持 Tailwind CSS 宽度类 |
| `direction` | `string` | `'row'` | 布局方向，可选 `'row'` 或 `'col'` |
| `placeholder` | `string` | `'Please Select'` | 占位符文本 |
| `fieldLabel` | `string` | `'label'` | 选项对象中用于显示的字段名 |
| `fieldValue` | `string` | `'value'` | 选项对象中用于值的字段名 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 组件尺寸 |
| `selected` | `string` | - | 预设选中的值 |

### 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `select` | `(value: any) => void` | 选择选项时触发，返回选中项的值 |
| `selectIndex` | `(index: number) => void` | 选择选项时触发，返回选中项的索引 |

### 类型定义

```typescript
interface SelectOption {
  [key: string]: any
}
```

## 样式定制

Select 组件使用 UnoCSS 原子类进行样式设置，支持以下主题变量：

- `--primary`: 主题色
- `--primary-content`: 主题色文字
- `--base-200`: 背景色
- `--base-content`: 文字颜色

## 注意事项

1. **选项数据格式**：选项数组中的每个对象必须包含 `label` 和 `value` 字段（或通过 `fieldLabel` 和 `fieldValue` 自定义）
2. **响应式**：组件支持响应式设计，在不同屏幕尺寸下自动调整
3. **无障碍访问**：组件支持键盘导航和屏幕阅读器
4. **性能优化**：当选项超过 10 个时，下拉菜单会自动启用滚动功能

## 最佳实践

1. **选项数量**：建议单个选择器选项不超过 50 个，过多选项考虑使用搜索功能
2. **标签文本**：标签文本应简洁明了，避免过长
3. **占位符**：占位符应提示用户预期的输入内容
4. **错误处理**：在表单中使用时，建议配合验证组件使用