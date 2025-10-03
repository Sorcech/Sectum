# Textarea 文本域

多行文本输入组件，支持字符计数、尺寸变体、颜色主题等功能。

## 基本用法

```vue
<template>
  <txa placeholder="请输入内容..." />
</template>

<script setup>
import txa from 'sectum'
</script>
```

## 基础示例

<div class="flex flex-wrap gap-3 items-start">
  <txa placeholder="请输入内容..." />
  <txa loading placeholder="加载中..." />
  <txa disabled placeholder="禁用状态" />
  <txa readonly placeholder="只读状态" />
  <txa ghost placeholder="透明背景" />
  <txa :show-counter="false" placeholder="隐藏计数器" />
</div>

```ts
<txa placeholder="请输入内容..." />
<txa loading placeholder="加载中..." />
<txa disabled placeholder="禁用状态" />
<txa readonly placeholder="只读状态" />
<txa ghost placeholder="透明背景" />
<txa :show-counter="false" placeholder="隐藏计数器" />
```

## 颜色主题

<div class="flex flex-wrap gap-3 items-start">
  <txa color="primary" placeholder="Primary" />
  <txa color="secondary" placeholder="Secondary" />
  <txa color="success" placeholder="Success" />
  <txa color="warning" placeholder="Warning" />
  <txa color="error" placeholder="Error" />
</div>

```ts
<txa color="primary" placeholder="Primary" />
<txa color="secondary" placeholder="Secondary" />
<txa color="success" placeholder="Success" />
<txa color="warning" placeholder="Warning" />
<txa color="error" placeholder="Error" />
```

## 尺寸变体

<div class="flex flex-wrap gap-3 items-start">
  <txa size="xs" placeholder="Extra small" />
  <txa size="sm" placeholder="Small" />
  <txa size="md" placeholder="Medium" />
  <txa size="lg" placeholder="Large" />
  <txa size="xl" placeholder="Extra large" />
</div>

```ts
<txa size="xs" placeholder="Extra small" />
<txa size="sm" placeholder="Small" />
<txa size="md" placeholder="Medium" />
<txa size="lg" placeholder="Large" />
<txa size="xl" placeholder="Extra large" />
```

## 变体样式

### 默认边框

<div class="flex flex-wrap gap-3 items-start">
  <txa placeholder="默认边框" />
  <txa color="primary" placeholder="Primary边框" />
</div>

```ts
<txa placeholder="默认边框" />
<txa color="primary" placeholder="Primary边框" />
```

### 透明背景

<div class="flex flex-wrap gap-3 items-start bg-base-200/20 p-4 rounded-lg">
  <txa ghost placeholder="透明背景" />
  <txa ghost color="primary" placeholder="Primary透明" />
</div>

```ts
<txa ghost placeholder="透明背景" />
<txa ghost color="primary" placeholder="Primary透明" />
```

## 调整大小

<div class="flex flex-wrap gap-3 items-start">
  <txa resize="resize" placeholder="可调整大小" />
  <txa resize="resize-x" placeholder="水平调整" />
  <txa resize="resize-y" placeholder="垂直调整" />
  <txa resize="resize-none" placeholder="不可调整" />
</div>

```ts
<txa resize="resize" placeholder="可调整大小" />
<txa resize="resize-x" placeholder="水平调整" />
<txa resize="resize-y" placeholder="垂直调整" />
<txa resize="resize-none" placeholder="不可调整" />
```

## 字符计数

<div class="flex flex-wrap gap-3 items-start">
  <txa :maxlength="100" placeholder="最大100字符" />
  <txa :maxlength="50" :show-counter="true" placeholder="显示计数器" />
  <txa :maxlength="200" :show-counter="false" placeholder="隐藏计数器" />
</div>

```ts
<txa :maxlength="100" placeholder="最大100字符" />
<txa :maxlength="50" :show-counter="true" placeholder="显示计数器" />
<txa :maxlength="200" :show-counter="false" placeholder="隐藏计数器" />
```

## 状态管理

<div class="flex flex-wrap gap-3 items-start">
  <txa loading placeholder="加载中..." />
  <txa disabled placeholder="禁用状态" />
  <txa readonly placeholder="只读状态" />
  <txa disabled value="禁用且有值" />
</div>

```ts
<txa loading placeholder="加载中..." />
<txa disabled placeholder="禁用状态" />
<txa readonly placeholder="只读状态" />
<txa disabled value="禁用且有值" />
```

## 响应式尺寸

<div class="flex flex-wrap gap-3 items-start">
  <txa sm="md" md="lg" lg="xl" placeholder="响应式尺寸" />
  <txa :rows="3" :cols="40" placeholder="自定义行列" />
</div>

```ts
<txa sm="md" md="lg" lg="xl" placeholder="响应式尺寸" />
<txa :rows="3" :cols="40" placeholder="自定义行列" />
```

## 事件处理

```vue
<template>
  <txa 
    v-model="content"
    @focus="handleFocus"
    @blur="handleBlur"
    placeholder="支持事件处理"
  />
</template>

<script setup>
import { ref } from 'vue'

const content = ref('')

const handleFocus = (value) => {
  console.log('聚焦:', value)
}

const handleBlur = (value) => {
  console.log('失焦:', value)
}
</script>
```

## 属性

| 属性          | 类型      | 默认值           | 说明                                                                             |
| ------------- | --------- | ---------------- | -------------------------------------------------------------------------------- |
| `modelValue`  | `String`  | -                | 绑定值                                                                           |
| `rows`        | `Number`  | `5`              | 行数                                                                             |
| `cols`        | `Number`  | `30`             | 列数                                                                             |
| `disabled`    | `Boolean` | `false`          | 是否禁用                                                                         |
| `readonly`    | `Boolean` | `false`          | 是否只读                                                                         |
| `loading`     | `Boolean` | `false`          | 是否加载中                                                                       |
| `placeholder` | `String`  | `'Please Input'` | 占位符                                                                           |
| `maxlength`   | `Number`  | `150`            | 最大字符数                                                                       |
| `showCounter` | `Boolean` | `true`           | 是否显示字符计数                                                                 |
| `size`        | `String`  | `'md'`           | 尺寸：`xs` \| `sm` \| `md` \| `lg` \| `xl`                                       |
| `color`       | `String`  | `'default'`      | 颜色：`default` \| `primary` \| `secondary` \| `success` \| `error` \| `warning` |
| `bordered`    | `Boolean` | `true`           | 是否显示边框                                                                     |
| `ghost`       | `Boolean` | `false`          | 是否透明背景                                                                     |
| `resize`      | `String`  | `'resize'`       | 调整大小：`resize` \| `resize-x` \| `resize-y` \| `resize-none`                  |
| `sm`          | `String`  | -                | 小屏幕尺寸                                                                       |
| `md`          | `String`  | -                | 中等屏幕尺寸                                                                     |
| `lg`          | `String`  | -                | 大屏幕尺寸                                                                       |
| `xl`          | `String`  | -                | 超大屏幕尺寸                                                                     |

## 事件

| 事件名              | 说明         | 回调参数          |
| ------------------- | ------------ | ----------------- |
| `update:modelValue` | 值改变时触发 | `(value: string)` |
| `focus`             | 聚焦时触发   | `(value: string)` |
| `blur`              | 失焦时触发   | `(value: string)` |

## 尺寸规格

| 尺寸 | 高度           | 内边距      | 字体大小    |
| ---- | -------------- | ----------- | ----------- |
| `xs` | `h-20` (5rem)  | `px-2 py-1` | `text-xs`   |
| `sm` | `h-24` (6rem)  | `px-3 py-2` | `text-sm`   |
| `md` | `h-32` (8rem)  | `px-4 py-3` | `text-sm`   |
| `lg` | `h-40` (10rem) | `px-5 py-4` | `text-base` |
| `xl` | `h-48` (12rem) | `px-6 py-5` | `text-xl`   |

## 颜色主题

| 颜色        | 边框颜色                  | 聚焦轮廓                |
| ----------- | ------------------------- | ----------------------- |
| `default`   | `border-base-gray-300/60` | `outline-base-gray-300` |
| `primary`   | `border-primary`          | `outline-primary`       |
| `secondary` | `border-secondary`        | `outline-secondary`     |
| `success`   | `border-success`          | `outline-success`       |
| `error`     | `border-error`            | `outline-error`         |
| `warning`   | `border-warning`          | `outline-warning`       |

## 调整大小选项

| 选项          | 说明             |
| ------------- | ---------------- |
| `resize`      | 可调整宽度和高度 |
| `resize-x`    | 只能调整宽度     |
| `resize-y`    | 只能调整高度     |
| `resize-none` | 不可调整大小     |

## 状态样式

| 状态       | 样式类                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------- |
| `disabled` | `cursor-not-allowed pointer-events-none bg-base-100/70 border-base-100/50 text-base-content/80` |
| `loading`  | `pointer-events-none`                                                                           |
| `readonly` | `cursor-default`                                                                                |
| `ghost`    | `bg-transparent`                                                                                |

## 响应式设计

支持在不同屏幕尺寸下使用不同的尺寸：

```vue
<template>
  <txa 
    sm="xs" 
    md="sm" 
    lg="md" 
    xl="lg" 
    placeholder="响应式文本域"
  />
</template>
```

## 最佳实践

### 1. 合理设置字符限制
```vue
<txa :maxlength="500" placeholder="最多500字符" />
```

### 2. 根据内容调整高度
```vue
<txa :rows="8" placeholder="多行内容" />
```

### 3. 禁用调整大小
```vue
<txa resize="resize-none" placeholder="固定大小" />
```

### 4. 使用合适的颜色主题
```vue
<txa color="error" placeholder="错误提示" />
<txa color="success" placeholder="成功信息" />
```

### 5. 响应式设计
```vue
<txa 
  size="sm" 
  sm="md" 
  md="lg" 
  lg="xl" 
  placeholder="响应式文本域"
/>
```

## 技术实现

### UnoCSS 动态类生成

Textarea 组件使用 UnoCSS 原子类进行样式管理，通过计算属性动态生成类名：

```typescript
// 基础样式
const baseClasses = computed(() => {
  return [
    'w-full bg-base-100 transition-all duration-200 ease-in-out',
    'outline-none focus:outline-1 focus:outline-base-gray-300 focus:outline-offset-1',
    'min-w-0 flex-shrink-0',
    'rounded-$rounded-btn'
  ].join(' ')
})

// 尺寸样式
const sizeClasses = computed(() => {
  const sizes = {
    xs: 'h-20 px-2 py-1 text-xs',
    sm: 'h-24 px-3 py-2 text-sm',
    md: 'h-32 px-4 py-3 text-sm',
    lg: 'h-40 px-5 py-4 text-base',
    xl: 'h-48 px-6 py-5 text-xl'
  }
  return sizes[props.size as keyof typeof sizes] || sizes.md
})
```

### 动画效果

组件包含聚焦时的微动画效果：

```css
@keyframes textarea-focus {
  0% { transform: scale(1); }
  50% { transform: scale(1.01); }
  100% { transform: scale(1); }
}

textarea:focus {
  animation: textarea-focus 0.2s ease-out;
}
```

### 字符计数功能

自动计算和显示字符数量，支持最大长度限制：

```typescript
const input = (e: any) => {
  quantity.value = e.target.value.length
  if (quantity.value > props.maxlength) {
    quantity.value = props.maxlength
  }
  emit('update:modelValue', e.target.value)
}
```

## 注意事项

1. **性能优化**：大量文本时建议使用虚拟滚动
2. **可访问性**：确保有合适的标签和描述
3. **移动端适配**：在移动设备上测试调整大小功能
4. **字符限制**：合理设置最大字符数，避免用户体验问题
5. **响应式设计**：在不同屏幕尺寸下测试组件表现