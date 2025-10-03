# Toggle 组件

一个现代化的开关组件，支持多种颜色、尺寸和状态，使用 UnoCSS 原子类实现。

## 特性

- 🎨 **5种颜色变体**: primary, secondary, success, error, warning
- 📏 **5种尺寸**: xs, sm, md, lg, xl
- 🎭 **状态支持**: 选中/未选中、禁用状态
- 🚀 **流畅动画**: 滑块移动动画和颜色过渡
- ♿ **无障碍**: 完整的键盘导航和屏幕阅读器支持
- ⚡ **UnoCSS**: 使用原子化CSS类，零运行时开销
- 🎯 **Vue 3**: 完全支持 Composition API

## 安装

```ts
import { Toggle } from 'sectum'
// 或者
import tgl from 'sectum'
```

## 基础用法

<div class="flex flex-wrap items-center gap-3">
  <tgl checked />
  <tgl checked color="secondary" />
  <tgl checked color="success" />
  <tgl checked color="warning" />
  <tgl checked color="error" />
</div>

```ts
<tgl checked />
<tgl checked color="secondary" />
<tgl checked color="success" />
<tgl checked color="warning" />
<tgl checked color="error" />
```

## 尺寸

<div class="flex flex-wrap items-center gap-3">
  <tgl checked size="xs" />
  <tgl checked size="sm" />
  <tgl checked />
  <tgl checked size="lg" />
  <tgl checked size="xl" />
</div>

```ts
<tgl checked size="xs" />
<tgl checked size="sm" />
<tgl checked />
<tgl checked size="lg" />
<tgl checked size="xl" />
```

## 禁用状态

<div class="flex flex-wrap items-center gap-3">
  <tgl disabled />
  <tgl disabled checked />
</div>

```ts
<tgl disabled />
<tgl disabled checked />
```

## 带标签

<div class="flex flex-wrap items-center gap-3">
  <div class="flex flex-col w-32">
    <label class="cursor-pointer flex select-none content-center py-2 px-1 justify-between">
      <span class="label-text">Label</span>
      <tgl checked />
    </label>
  </div>
</div>

```ts
<div class="flex flex-col w-32">
  <label class="cursor-pointer flex select-none content-center py-2 px-1 justify-between">
    <span class="label-text">Label</span>
    <tgl checked />
  </label>
</div>
```

## API

### Props

| 属性       | 类型                                                            | 默认值      | 说明             |
| ---------- | --------------------------------------------------------------- | ----------- | ---------------- |
| `checked`  | `boolean`                                                       | `false`     | 开关状态（必填） |
| `color`    | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning'` | `'primary'` | 颜色主题         |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                          | `'md'`      | 尺寸大小         |
| `disabled` | `boolean`                                                       | `false`     | 是否禁用         |

### Events

| 事件名   | 参数               | 说明               |
| -------- | ------------------ | ------------------ |
| `change` | `(value: boolean)` | 开关状态改变时触发 |

### 尺寸规格

| 尺寸 | 宽度   | 高度    | 滑块偏移量 |
| ---- | ------ | ------- | ---------- |
| `xs` | 1.5rem | 1rem    | 0.5rem     |
| `sm` | 2rem   | 1.25rem | 0.75rem    |
| `md` | 3rem   | 1.5rem  | 1.5rem     |
| `lg` | 4rem   | 2rem    | 2rem       |
| `xl` | 5rem   | 2.5rem  | 2.5rem     |

## 技术实现

### UnoCSS 原子类

组件使用 UnoCSS 原子类实现样式，提供更好的性能和可维护性：

- **基础样式**: `appearance-none`, `cursor-pointer`, `border`, `rounded-full`
- **过渡动画**: `transition-all`, `duration-300`, `ease-in-out`
- **焦点状态**: `focus-visible:outline-2`, `focus-visible:outline-primary`
- **尺寸控制**: `w-6 h-4`, `w-8 h-5`, `w-12 h-6`, `w-16 h-8`, `w-20 h-10`

### 滑块动画

使用 CSS `box-shadow` 和 CSS 变量实现滑块移动效果：

```css
/* 未选中状态 - 滑块在左侧 */
box-shadow: calc(var(--handleoffset) * -1) 0 0 2px #fcfcfc inset,
  0 0 0 2px #fcfcfc inset;

/* 选中状态 - 滑块在右侧 */
box-shadow: var(--handleoffset) 0 0 2px #fcfcfc inset,
  0 0 0 2px #fcfcfc inset;
```

### 响应式设计

组件完全支持响应式设计，可以配合 UnoCSS 的响应式前缀使用：

```ts
<tgl class="sm:w-16 md:w-20 lg:w-24" />
```

## 无障碍支持

- 支持键盘导航（Tab 键聚焦，Space 键切换）
- 提供焦点指示器
- 支持屏幕阅读器
- 语义化的 HTML 结构

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+