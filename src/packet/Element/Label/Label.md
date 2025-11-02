# Label 组件

一个功能丰富、高度可定制的标签组件，基于UnoCSS动态样式系统，支持多种颜色、尺寸、变体和交互效果。

## 特性

- 🎨 **5种颜色变体**: primary, secondary, success, error, warning
- 🎭 **4种样式变体**: default, outline, transparent, link
- 📏 **5种尺寸**: xs, sm, md, lg, xl
- 🔘 **形状选项**: pills (圆角), circle (圆形)
- 🚀 **完整动效**: hover缩放、点击反馈、弹出动画
- 📱 **响应式支持**: sm, md, lg, xl断点
- ♿ **无障碍**: 完整的keyboard和screen reader支持
- ⚡ **高性能**: 基于UnoCSS的动态样式系统
- 🎯 **无边框**: 默认无边框设计，更加简洁

## 安装

```ts
import { Label } from 'sectum'
// 或者
import lab from 'sectum'
```
## Basic
<div class="flex flex-wrap items-center gap-3">
  <lab>Primary</lab>
  <lab loading>Loading</lab>
  <lab disabled>Disabled</lab>
  <lab pills>Primary pills</lab>
  <lab variant="outline">Outline</lab>
  <lab variant="link">Link</lab>
</div>

```vue
  <lab>Primary</lab>
  <lab loading>Loading</lab>
  <lab disabled>Disabled</lab>
  <lab pills>Primary pills</lab>
  <lab variant="outline">Outline</lab>
  <lab variant="link">Link</lab>
```

## Colors

<div class="flex flex-wrap items-center gap-3">
  <lab color="primary">Primary </lab>
  <lab color="secondary">Secondary </lab>
  <lab color="success">Success </lab>
  <lab color="error">Error </lab>
  <lab color="warning">Warning </lab>
</div>

```vue
  <lab color="primary">Primary </lab>
  <lab color="secondary">Secondary </lab>
  <lab color="success">Success </lab>
  <lab color="error">Error </lab>
  <lab color="warning">Warning </lab>
```

## Outline

<div class="flex flex-wrap items-center gap-3">
  <lab color="primary" variant="outline">Primary </lab>
  <lab color="secondary" variant="outline">Secondary </lab>
  <lab color="success" variant="outline">Success </lab>
  <lab color="error" variant="outline">Error</lab>
  <lab color="warning" variant="outline">Warning </lab>
</div>

```vue
  <lab color="primary" variant="outline">Primary </lab>
  <lab color="secondary" variant="outline">Secondary </lab>
  <lab color="success" variant="outline">Success </lab>
  <lab color="error" variant="outline">Error </lab>
  <lab color="warning" variant="outline">Warning </lab>
```

## Transparent

<div class="flex flex-wrap items-center gap-3">
  <lab color="primary" variant="transparent">Primary </lab>
  <lab color="secondary" variant="transparent">Secondary </lab>
  <lab color="success" variant="transparent">Success </lab>
  <lab color="error" variant="transparent">Error </lab>
  <lab color="warning" variant="transparent">Warning </lab>
</div>

```vue
  <lab color="primary" variant="transparent">Primary </lab>
  <lab color="secondary" variant="transparent">Secondary </lab>
  <lab color="success" variant="transparent">Success </lab>
  <lab color="error" variant="transparent">Error </lab>
  <lab color="warning" variant="transparent">Warning </lab>
```

## Pills

<div class="flex flex-wrap items-center gap-3">
  <lab color="primary" pills>Primary </lab>
  <lab color="secondary" pills>Secondary </lab>
  <lab color="success" pills>Success </lab>
  <lab color="error" pills>Error </lab>
  <lab color="warning" pills>Warning </lab>
</div>

```vue
  <lab color="primary" pills>Primary </lab>
  <lab color="secondary" pills>Secondary </lab>
  <lab color="success" pills>Success </lab>
  <lab color="error" pills>Error </lab>
  <lab color="warning" pills>Warning </lab>
```

## Sizes

<div class="flex flex-wrap items-center gap-3">
  <lab size="xs">Extra-small </lab>
  <lab size="sm">Small </lab>
  <lab>Normal </lab>
  <lab size="lg">Large </lab>
  <lab size="xl">Extra-large </lab>
</div>

```vue
  <lab size="xs">Extra-small </lab>
  <lab size="sm">Small </lab>
  <lab>normal </lab>
  <lab size="lg">Large </lab>
  <lab size="xl">Extra-large </lab>
```

## Responsive 

<div class="flex flex-wrap items-center gap-3">
  <lab size="sm" md="lg">Default(sm) md(lg)</lab>
  <lab size="lg" md="xs">Default(lg) md(xs)</lab>
</div>

```vue
  <lab size="sm" md="lg">Default(sm) md(lg)</lab>
  <lab size="lg" md="xs">Default(lg) md(xs)</lab>
```

## Link

<div class="flex flex-wrap items-center gap-3">
  <lab color="primary" variant="link">Primary </lab>
  <lab color="secondary" variant="link">Secondary </lab>
  <lab color="success" variant="link">Success </lab>
  <lab color="error" variant="link">Error </lab>
  <lab color="warning" variant="link">Warning </lab>
</div>

```vue
  <lab color="primary" variant="link">Primary </lab>
  <lab color="secondary" variant="link">Secondary </lab>
  <lab color="success" variant="link">Success </lab>
  <lab color="error" variant="link">Error </lab>
  <lab color="warning" variant="link">Warning </lab>
```

## Circle

<div class="flex flex-wrap items-center gap-3">
  <lab circle>
    <icn name="bell" solid xl/>
  </lab>
  <lab circle variant="outline">
    <icn name="bell" solid xl/>
  </lab>
</div>

```vue
  <lab circle>
    <icn name="bell" solid xl/>
  </lab>
  <lab circle variant="outline">
    <icn name="bell" solid xl/>
  </lab>
```



## API

### Props

| 属性名     | 类型                                                            | 默认值      | 说明                                 |
| ---------- | --------------------------------------------------------------- | ----------- | ------------------------------------ |
| `color`    | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | 标签颜色主题                         |
| `variant`  | `'default' \| 'outline' \| 'transparent' \| 'link'`             | `'default'` | 标签样式变体                         |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                          | `'md'`      | 标签尺寸                             |
| `disabled` | `boolean`                                                       | `false`     | 是否禁用标签（保持原色但降低透明度） |
| `loading`  | `boolean`                                                       | `false`     | 是否显示加载状态                     |
| `pills`    | `boolean`                                                       | `false`     | 是否使用圆角样式                     |
| `circle`   | `boolean`                                                       | `false`     | 是否使用圆形样式                     |
| `active`   | `boolean`                                                       | `false`     | 是否为激活状态                       |
| `clean`    | `boolean`                                                       | `false`     | 是否使用简洁样式（无背景、边框）     |
| `item`     | `boolean`                                                       | `false`     | 是否为菜单项样式                     |
| `sm`       | `string`                                                        | -           | 小屏幕断点尺寸                       |
| `md`       | `string`                                                        | -           | 中等屏幕断点尺寸                     |
| `lg`       | `string`                                                        | -           | 大屏幕断点尺寸                       |
| `xl`       | `string`                                                        | -           | 超大屏幕断点尺寸                     |

### Slots

| 插槽名    | 说明     |
| --------- | -------- |
| `default` | 标签内容 |

## 使用示例

### 基础用法

```vue
<template>
  <!-- 基础标签 -->
  <Label>基础标签</Label>
  
  <!-- 带颜色 -->
  <Label color="success">成功标签</Label>
  
  <!-- 不同变体 -->
  <Label variant="outline">轮廓标签</Label>
  <Label variant="transparent">透明标签</Label>
  <Label variant="link">链接标签</Label>
</template>
```

### 颜色变体

```vue
<template>
  <!-- 所有颜色变体 -->
  <Label color="primary">主要</Label>
  <Label color="secondary">次要</Label>
  <Label color="success">成功</Label>
  <Label color="warning">警告</Label>
  <Label color="error">错误</Label>
</template>
```

### 尺寸和形状

```vue
<template>
  <!-- 不同尺寸 -->
  <Label size="xs">超小</Label>
  <Label size="sm">小</Label>
  <Label size="md">中等</Label>
  <Label size="lg">大</Label>
  <Label size="xl">超大</Label>
  
  <!-- 圆角标签 -->
  <Label pills>圆角标签</Label>
  
  <!-- 圆形标签 -->
  <Label circle>●</Label>
</template>
```

### 状态控制

```vue
<template>
  <!-- 加载状态 -->
  <Label loading>加载中...</Label>
  
  <!-- 禁用状态 -->
  <Label disabled>禁用标签</Label>
  
  <!-- 激活状态 -->
  <Label active>激活标签</Label>
</template>
```

### 响应式设计

```vue
<template>
  <!-- 响应式尺寸 -->
  <Label size="sm" md="lg" lg="xl">
    响应式标签
  </Label>
</template>
```

### 组合使用

```vue
<template>
  <!-- 复杂组合 -->
  <Label 
    color="success" 
    variant="outline" 
    size="lg" 
    pills 
    active
  >
    成功圆角标签
  </Label>
  
  <!-- 圆形图标标签 -->
  <Label 
    color="primary" 
    circle 
    size="lg"
  >
    <Icon name="star" />
  </Label>
</template>
```

## 主题定制

Label组件基于UnoCSS动态样式系统，支持通过以下方式进行主题定制：

### 1. CSS变量定制

```css
:root {
  --primary: #2563eb;
  --primary-focus: #1d4ed8;
  --primary-content: #ffffff;
  --secondary: #374151;
  --secondary-focus: #1f2937;
  --secondary-content: #ffffff;
  --success: #059669;
  --success-focus: #047857;
  --success-content: #ffffff;
  --warning: #f97316;
  --warning-focus: #ea580c;
  --warning-content: #ffffff;
  --error: #dc2626;
  --error-focus: #b91c1c;
  --error-content: #ffffff;
  --rounded-lab: 0.5rem;
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
        focus: '#1d4ed8',
        content: '#ffffff'
      },
      secondary: {
        DEFAULT: '#374151',
        focus: '#1f2937',
        content: '#ffffff'
      }
    }
  }
})
```

### 3. 动态样式类

Label组件使用UnoCSS类名，支持所有UnoCSS功能：
- 颜色变体：`bg-primary`, `text-primary-content`
- 尺寸控制：`h-10`, `px-4`, `text-sm`
- 状态效果：`hover:scale-105`, `active:scale-95`
- 响应式：`sm:h-8`, `md:h-10`, `lg:h-12`

## 动画效果

Label组件基于UnoCSS实现以下动画效果：

- **弹出动画**: 组件出现时的缩放动画（`lab-pop`）
- **悬停效果**: 鼠标悬停时的缩放效果（`hover:scale-105`）
- **点击反馈**: 点击时的缩放反馈（`active:scale-95`）
- **状态过渡**: 颜色和样式的平滑过渡（`transition-all duration-200`）

## 无障碍支持

- 支持键盘导航（Tab键切换）
- 支持Enter和Space键激活
- 自动添加适当的ARIA属性
- 支持屏幕阅读器
- 禁用状态时自动阻止交互

## 技术特性

### UnoCSS动态样式系统

- **动态类生成**: 所有样式通过computed属性动态生成
- **按需加载**: 只生成使用的样式类
- **类型安全**: 完整的TypeScript类型支持
- **性能优化**: 避免静态CSS文件，减少包体积

### 样式架构

```ts
// 基础样式
baseClasses: 'font-semibold inline-flex items-center justify-center...'

// 尺寸样式  
sizeClasses: 'h-10 px-4 text-sm' // 根据size prop动态生成

// 颜色变体样式
colorVariantClasses: 'bg-primary text-primary-content...' // 根据color和variant动态生成

// 状态样式
stateClasses: 'opacity-70' // 根据disabled/loading/active状态动态生成

// 响应式样式
responsiveClasses: 'sm:h-8 md:h-10 lg:h-12' // 根据响应式props动态生成
```

## 注意事项

1. **加载状态**: 当`loading`为true时，标签会自动禁用并显示加载状态
2. **禁用状态**: 禁用状态下标签保持原色但降低透明度（`opacity-70`）
3. **无边框设计**: 默认无边框，只有outline变体显示边框
4. **响应式**: 响应式属性只在对应断点及以上生效
5. **圆形标签**: 圆形标签建议只放置图标或单个字符
6. **UnoCSS依赖**: 确保项目中已正确配置UnoCSS
7. **性能**: 大量标签时建议使用虚拟滚动优化性能

## 最佳实践

1. **语义化使用**: 根据内容选择合适的颜色和变体
2. **一致性**: 在同一个界面中保持标签样式的一致性
3. **可访问性**: 确保标签有足够的对比度和可读性
4. **响应式**: 在移动设备上适当调整标签尺寸
5. **UnoCSS优化**: 利用UnoCSS的按需加载特性，避免未使用的样式
6. **性能考虑**: 大量标签时考虑使用虚拟滚动或分页
7. **主题一致性**: 确保标签颜色与整体设计系统保持一致
8. **状态反馈**: 合理使用loading和disabled状态提供用户反馈