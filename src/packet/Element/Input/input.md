# Input 组件

一个功能丰富、高度可定制的输入框组件，基于UnoCSS动态样式系统，支持多种颜色、尺寸、变体和交互效果。

## 特性

- 🎨 **5种颜色变体**: primary, secondary, success, error, warning
- 🎭 **多种样式变体**: default, ghost, clean
- 📏 **5种尺寸**: xs, sm, md, lg, xl
- 🔘 **形状选项**: pills (圆角), circle (圆形)
- 🚀 **完整动效**: focus缩放动画、状态过渡
- 📱 **响应式支持**: sm, md, lg, xl断点
- ♿ **无障碍**: 完整的keyboard和screen reader支持
- ⚡ **高性能**: 基于UnoCSS的动态样式系统
- 🎯 **无边框设计**: 默认无边框，更加简洁
- 🏷️ **标签支持**: 内置标签和验证文本

## 安装

```ts
import { ipt } from 'sectum'
// 或者
import ipt from 'sectum'
```

## Basic

<div class="flex flex-wrap items-center gap-3">
  <ipt placeholder="Type here..." />
  <ipt loading placeholder="Loading..." />
  <ipt disabled placeholder="Disabled" />
  <ipt pills placeholder="Pills style" />
  <ipt ghost placeholder="Ghost style" />
  <ipt clean placeholder="Clean style" />
</div>

```vue
<ipt placeholder="Type here..." />
<ipt loading placeholder="Loading..." />
<ipt disabled placeholder="Disabled" />
<ipt pills placeholder="Pills style" />
<ipt ghost placeholder="Ghost style" />
<ipt clean placeholder="Clean style" />
```

## Colors

<div class="flex flex-wrap items-center gap-3">
  <ipt color="primary" placeholder="Primary" />
  <ipt color="secondary" placeholder="Secondary" />
  <ipt color="success" placeholder="Success" />
  <ipt color="warning" placeholder="Warning" />
  <ipt color="error" placeholder="Error" />
</div>

```vue
<ipt color="primary" placeholder="Primary" />
<ipt color="secondary" placeholder="Secondary" />
<ipt color="success" placeholder="Success" />
<ipt color="warning" placeholder="Warning" />
<ipt color="error" placeholder="Error" />
```

## Sizes

<div class="flex flex-wrap gap-2 items-center">
  <ipt size="xs" placeholder="Extra small" />
  <ipt size="sm" placeholder="Small" />
  <ipt size="md" placeholder="Medium" />
  <ipt size="lg" placeholder="Large" />
  <ipt size="xl" placeholder="Extra large" />
</div>

```vue
<ipt size="xs" placeholder="Extra small" />
<ipt size="sm" placeholder="Small" />
<ipt size="md" placeholder="Medium" />
<ipt size="lg" placeholder="Large" />
<ipt size="xl" placeholder="Extra large" />
```

## Variants

### Default (Bordered)

<div class="flex flex-wrap items-center gap-3">
  <ipt placeholder="Default bordered" />
  <ipt color="primary" placeholder="Primary bordered" />
</div>

```vue
<ipt placeholder="Default bordered" />
<ipt color="primary" placeholder="Primary bordered" />
```

### Ghost

<div class="flex flex-wrap items-center gap-3 bg-base-200/20 p-4 rounded-lg">
  <ipt ghost placeholder="Ghost input" />
  <ipt ghost color="primary" placeholder="Primary ghost" />
</div>

```vue
<ipt ghost placeholder="Ghost input" />
<ipt ghost color="primary" placeholder="Primary ghost" />
```

### Clean

<div class="flex flex-wrap items-center gap-3">
  <ipt clean placeholder="Clean input" />
  <ipt clean color="primary" placeholder="Primary clean" />
</div>

```vue
<ipt clean placeholder="Clean input" />
<ipt clean color="primary" placeholder="Primary clean" />
```

## Shapes

### Pills

<div class="flex flex-wrap items-center gap-3">
  <ipt pills placeholder="Pills input" />
  <ipt pills color="primary" placeholder="Primary pills" />
</div>

```vue
<ipt pills placeholder="Pills input" />
<ipt pills color="primary" placeholder="Primary pills" />
```

### Circle

<div class="flex flex-wrap items-center gap-3">
  <ipt circle placeholder="●" />
  <ipt circle color="primary" placeholder="●" />
</div>

```vue
<ipt circle placeholder="●" />
<ipt circle color="primary" placeholder="●" />
```

## With Label

<div class="flex flex-wrap items-center gap-3">
  <ipt label="Your name" placeholder="Enter your name" />
  <ipt label="Email" type="email" placeholder="Enter your email" />
  <ipt label="Password" type="password" placeholder="Enter password" />
</div>

```vue
<ipt label="Your name" placeholder="Enter your name" />
<ipt label="Email" type="email" placeholder="Enter your email" />
<ipt label="Password" type="password" placeholder="Enter password" />
```

## With Error

<div class="flex flex-wrap items-center gap-3">
  <ipt error="This field is required" placeholder="Error input" />
  <ipt color="error" error="Invalid email format" placeholder="Error with color" />
</div>

```vue
<ipt error="This field is required" placeholder="Error input" />
<ipt color="error" error="Invalid email format" placeholder="Error with color" />
```

## States

<div class="flex flex-wrap items-center gap-3">
  <ipt loading placeholder="Loading..." />
  <ipt disabled placeholder="Disabled" />
  <ipt disabled value="Disabled with value" />
</div>

```vue
<ipt loading placeholder="Loading..." />
<ipt disabled placeholder="Disabled" />
<ipt disabled value="Disabled with value" />
```

## Responsive

<div class="flex flex-wrap items-center gap-3">
  <ipt size="sm" md="lg" placeholder="Small on mobile, large on desktop" />
  <ipt size="lg" md="xs" placeholder="Large on mobile, small on desktop" />
</div>

```vue
<ipt size="sm" md="lg" placeholder="Small on mobile, large on desktop" />
<ipt size="lg" md="xs" placeholder="Large on mobile, small on desktop" />
```

## Input Types

<div class="flex flex-wrap items-center gap-3">
  <ipt type="text" placeholder="Text input" />
  <ipt type="email" placeholder="Email input" />
  <ipt type="password" placeholder="Password input" />
  <ipt type="number" placeholder="Number input" />
  <ipt type="tel" placeholder="Phone input" />
  <ipt type="url" placeholder="URL input" />
</div>

```vue
<ipt type="text" placeholder="Text input" />
<ipt type="email" placeholder="Email input" />
<ipt type="password" placeholder="Password input" />
<ipt type="number" placeholder="Number input" />
<ipt type="tel" placeholder="Phone input" />
<ipt type="url" placeholder="URL input" />
```

## API

### Props

| 属性名        | 类型                                                            | 默认值      | 说明                             |
| ------------- | --------------------------------------------------------------- | ----------- | -------------------------------- |
| `modelValue`  | `string \| number`                                              | -           | 输入框的值（v-model）            |
| `direction`   | `string`                                                        | `'row'`     | 标签和输入框的布局方向           |
| `label`       | `string`                                                        | -           | 标签文本                         |
| `labelWidth`  | `string`                                                        | `'w-4/9'`   | 标签宽度                         |
| `placeholder` | `string`                                                        | -           | 占位符文本                       |
| `type`        | `string`                                                        | `'text'`    | 输入框类型                       |
| `name`        | `string`                                                        | -           | 输入框名称                       |
| `disabled`    | `boolean`                                                       | `false`     | 是否禁用                         |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                          | `'md'`      | 输入框尺寸                       |
| `bordered`    | `boolean`                                                       | `true`      | 是否显示边框                     |
| `ghost`       | `boolean`                                                       | `false`     | 是否使用透明背景                 |
| `color`       | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'warning'` | `'default'` | 输入框颜色主题                   |
| `error`       | `string`                                                        | -           | 错误信息文本                     |
| `pills`       | `boolean`                                                       | `false`     | 是否使用圆角样式                 |
| `circle`      | `boolean`                                                       | `false`     | 是否使用圆形样式                 |
| `clean`       | `boolean`                                                       | `false`     | 是否使用简洁样式（无背景、边框） |
| `loading`     | `boolean`                                                       | `false`     | 是否显示加载状态                 |
| `sm`          | `string`                                                        | -           | 小屏幕断点尺寸                   |
| `md`          | `string`                                                        | -           | 中等屏幕断点尺寸                 |
| `lg`          | `string`                                                        | -           | 大屏幕断点尺寸                   |
| `xl`          | `string`                                                        | -           | 超大屏幕断点尺寸                 |

### Events

| 事件名              | 参数                      | 说明           |
| ------------------- | ------------------------- | -------------- |
| `update:modelValue` | `value: string \| number` | 值变化时触发   |
| `focus`             | `event: FocusEvent`       | 获得焦点时触发 |
| `blur`              | `event: FocusEvent`       | 失去焦点时触发 |

### Slots

| 插槽名    | 说明                     |
| --------- | ------------------------ |
| `default` | 输入框内容（通常不需要） |

## 使用示例

### 基础用法

```vue
<template>
  <!-- 基础输入框 -->
  <ipt v-model="value" placeholder="请输入内容" />
  
  <!-- 带标签 -->
  <ipt v-model="name" label="姓名" placeholder="请输入姓名" />
  
  <!-- 带验证 -->
  <ipt 
    v-model="email" 
    label="邮箱" 
    type="email" 
    placeholder="请输入邮箱"
    :error="emailError"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const name = ref('')
const email = ref('')
const emailError = ref('')
</script>
```

### 颜色变体

```vue
<template>
  <ipt color="primary" placeholder="主要输入框" />
  <ipt color="success" placeholder="成功输入框" />
  <ipt color="warning" placeholder="警告输入框" />
  <ipt color="error" placeholder="错误输入框" />
</template>
```

### 尺寸和形状

```vue
<template>
  <!-- 不同尺寸 -->
  <ipt size="xs" placeholder="超小" />
  <ipt size="sm" placeholder="小" />
  <ipt size="md" placeholder="中等" />
  <ipt size="lg" placeholder="大" />
  <ipt size="xl" placeholder="超大" />
  
  <!-- 圆角输入框 -->
  <ipt pills placeholder="圆角输入框" />
  
  <!-- 圆形输入框 -->
  <ipt circle placeholder="●" />
</template>
```

### 状态控制

```vue
<template>
  <!-- 加载状态 -->
  <ipt loading placeholder="加载中..." />
  
  <!-- 禁用状态 -->
  <ipt disabled placeholder="禁用输入框" />
  
  <!-- 错误状态 -->
  <ipt 
    color="error" 
    error="此字段为必填项" 
    placeholder="错误输入框" 
  />
</template>
```

### 响应式设计

```vue
<template>
  <!-- 响应式尺寸 -->
  <ipt 
    size="sm" 
    md="lg" 
    lg="xl" 
    placeholder="响应式输入框"
  />
</template>
```

### 组合使用

```vue
<template>
  <!-- 复杂组合 -->
  <ipt 
    v-model="search"
    color="primary" 
    size="lg" 
    pills 
    ghost
    placeholder="搜索..."
  />
  
  <!-- 表单组合 -->
  <div class="space-y-4">
    <ipt 
      v-model="form.name"
      label="姓名" 
      placeholder="请输入姓名"
      :error="errors.name"
    />
    <ipt 
      v-model="form.email"
      label="邮箱" 
      type="email"
      placeholder="请输入邮箱"
      :error="errors.email"
    />
    <ipt 
      v-model="form.password"
      label="密码" 
      type="password"
      placeholder="请输入密码"
      :error="errors.password"
    />
  </div>
</template>
```

## 主题定制

Input组件基于UnoCSS动态样式系统，支持通过以下方式进行主题定制：

### 1. CSS变量定制

```css
:root {
  --primary: #2563eb;
  --primary-focus: #1d4ed8;
  --secondary: #374151;
  --secondary-focus: #1f2937;
  --success: #059669;
  --success-focus: #047857;
  --warning: #f97316;
  --warning-focus: #ea580c;
  --error: #dc2626;
  --error-focus: #b91c1c;
  --base-100: #ffffff;
  --base-200: #f3f4f6;
  --base-300: #e5e7eb;
  --base-content: #111827;
  --rounded-btn: 0.5rem;
}
```

### 2. UnoCSS配置定制

```ts
// uno.config.ts
export default defineConfig({
  theme: {
    colors: {
      primary: {
        DEFAULT: '#2563eb',
        focus: '#1d4ed8'
      },
      secondary: {
        DEFAULT: '#374151',
        focus: '#1f2937'
      }
    }
  }
})
```

### 3. 动态样式类

Input组件使用UnoCSS类名，支持所有UnoCSS功能：
- 颜色变体：`bg-primary`, `border-primary`, `text-primary`
- 尺寸控制：`h-10`, `px-4`, `text-sm`
- 状态效果：`focus:outline-2`, `focus:outline-primary`
- 响应式：`sm:h-8`, `md:h-10`, `lg:h-12`

## 动画效果

Input组件基于UnoCSS实现以下动画效果：

- **聚焦动画**: 输入框获得焦点时的缩放动画（`input-focus`）
- **状态过渡**: 颜色和样式的平滑过渡（`transition-all duration-200`）
- **悬停效果**: 鼠标悬停时的视觉反馈

## 技术特性

### UnoCSS动态样式系统

- **动态类生成**: 所有样式通过computed属性动态生成
- **按需加载**: 只生成使用的样式类
- **类型安全**: 完整的TypeScript类型支持
- **性能优化**: 避免静态CSS文件，减少包体积

### 样式架构

```ts
// 基础样式
baseClasses: 'w-full bg-base-100 transition-all duration-200...'

// 尺寸样式  
sizeClasses: 'h-10 px-4 text-sm' // 根据size prop动态生成

// 颜色变体样式
colorVariantClasses: 'border-primary focus:outline-primary...' // 根据color动态生成

// 状态样式
stateClasses: 'opacity-70' // 根据disabled/loading/error状态动态生成

// 响应式样式
responsiveClasses: 'sm:h-8 md:h-10 lg:h-12' // 根据响应式props动态生成
```

## 无障碍支持

- 支持键盘导航（Tab键切换）
- 支持Enter和Space键激活
- 自动添加适当的ARIA属性
- 支持屏幕阅读器
- 禁用状态时自动阻止交互
- 错误状态时提供清晰的错误信息

## 注意事项

1. **加载状态**: 当`loading`为true时，输入框会自动禁用
2. **禁用状态**: 禁用状态下输入框不会响应任何交互事件
3. **无边框设计**: 默认无边框，只有bordered为true时显示边框
4. **响应式**: 响应式属性只在对应断点及以上生效
5. **圆形输入框**: 圆形输入框建议只放置单个字符或图标
6. **UnoCSS依赖**: 确保项目中已正确配置UnoCSS
7. **表单验证**: 建议配合表单验证库使用
8. **性能**: 大量输入框时考虑使用虚拟滚动优化性能

## 最佳实践

1. **语义化使用**: 根据内容选择合适的type和placeholder
2. **一致性**: 在同一个界面中保持输入框样式的一致性
3. **可访问性**: 确保输入框有足够的对比度和可读性
4. **响应式**: 在移动设备上适当调整输入框尺寸
5. **UnoCSS优化**: 利用UnoCSS的按需加载特性，避免未使用的样式
6. **性能考虑**: 大量输入框时考虑使用虚拟滚动或分页
7. **主题一致性**: 确保输入框颜色与整体设计系统保持一致
8. **状态反馈**: 合理使用loading、disabled和error状态提供用户反馈
9. **表单验证**: 提供清晰的错误信息和成功反馈
10. **键盘导航**: 确保表单可以通过键盘完整操作