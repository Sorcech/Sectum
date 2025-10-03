# Button 组件

一个功能丰富、高度可定制的按钮组件，支持多种颜色、尺寸、变体和交互效果。

## 特性

- 🎨 **5种颜色变体**: primary, secondary, success, error, warning
- 🎭 **4种样式变体**: default, outline, transparent, link
- 📏 **5种尺寸**: xs, sm, md, lg, xl
- 🔘 **形状选项**: pills (圆角), circle (圆形)
- 🚀 **完整动效**: hover缩放、点击反馈、波纹效果
- 📱 **响应式支持**: sm, md, lg, xl断点
- ♿ **无障碍**: 完整的keyboard和screen reader支持
- ⚡ **UnoCSS**: 使用原子化CSS类，零运行时开销

## 安装

```ts
import { Button } from 'sectum'
// 或者
import btn from 'sectum'
```

## Basic
<div class="flex flex-wrap items-center gap-3">
  <btn>Primary</btn>
  <btn loading>Loading</btn>
  <btn disabled>Disabled</btn>
  <btn pills>Primary pills</btn>
  <btn variant="outline">Outline</btn>
  <btn variant="link">Link</btn>
</div>

```ts
  <btn>Primary</btn>
  <btn loading>Loading</btn>
  <btn disabled>Disabled</btn>
  <btn pills>Primary pills</btn>
  <btn variant="outline">Outline</btn>
  <btn variant="link">Link</btn>
```

## Colors

<div class="flex flex-wrap items-center gap-3">
  <btn color="primary">Primary </btn>
  <btn color="secondary">Secondary </btn>
  <btn color="success">Success </btn>
  <btn color="error">Error </btn>
  <btn color="warning">Warning </btn>
</div>

```ts
  <btn color="primary">Primary </btn>
  <btn color="secondary">Secondary </btn>
  <btn color="success">Success </btn>
  <btn color="error">Error </btn>
  <btn color="warning">Warning </btn>
```

## Outline

<div class="flex flex-wrap items-center gap-3">
  <btn color="primary" variant="outline">Primary </btn>
  <btn color="secondary" variant="outline">Secondary </btn>
  <btn color="success" variant="outline">Success </btn>
  <btn color="error" variant="outline">Error</btn>
  <btn color="warning" variant="outline">Warning </btn>
</div>

```ts
  <btn color="primary" variant="outline">Primary </btn>
  <btn color="secondary" variant="outline">Secondary </btn>
  <btn color="success" variant="outline">Success </btn>
  <btn color="error" variant="outline">Error </btn>
  <btn color="warning" variant="outline">Warning </btn>
```

## Transparent

<div class="flex flex-wrap items-center gap-3">
  <btn color="primary" variant="transparent">Primary </btn>
  <btn color="secondary" variant="transparent">Secondary </btn>
  <btn color="success" variant="transparent">Success </btn>
  <btn color="error" variant="transparent">Error </btn>
  <btn color="warning" variant="transparent">Warning </btn>
</div>

```ts
  <btn color="primary" variant="transparent">Primary </btn>
  <btn color="secondary" variant="transparent">Secondary </btn>
  <btn color="success" variant="transparent">Success </btn>
  <btn color="error" variant="transparent">Error </btn>
  <btn color="warning" variant="transparent">Warning </btn>
```

## Pills

<div class="flex flex-wrap items-center gap-3">
  <btn color="primary" pills>Primary </btn>
  <btn color="secondary" pills>Secondary </btn>
  <btn color="success" pills>Success </btn>
  <btn color="error" pills>Error </btn>
  <btn color="warning" pills>Warning </btn>
</div>

```ts
  <btn color="primary" pills>Primary </btn>
  <btn color="secondary" pills>Secondary </btn>
  <btn color="success" pills>Success </btn>
  <btn color="error" pills>Error </btn>
  <btn color="warning" pills>Warning </btn>
```

## Sizes

<div class="flex flex-wrap items-center gap-3">
  <btn size="xs">Extra-small </btn>
  <btn size="sm">Small </btn>
  <btn>Normal </btn>
  <btn size="lg">Large </btn>
  <btn size="xl">Extra-large </btn>
</div>

```ts
  <btn size="xs">Extra-small </btn>
  <btn size="sm">Small </btn>
  <btn>normal </btn>
  <btn size="lg">Large </btn>
  <btn size="xl">Extra-large </btn>
```

## Responsive 

<div class="flex flex-wrap items-center gap-3">
  <btn size="sm" md="lg">Default(sm) md(lg)</btn>
  <btn size="lg" md="xs">Default(lg) md(xs)</btn>
</div>

```ts
  <btn size="sm" md="lg">Default(sm) md(lg)</btn>
  <btn size="lg" md="xs">Default(lg) md(xs)</btn>
```

## Link

<div class="flex flex-wrap items-center gap-3">
  <btn color="primary" variant="link">Primary </btn>
  <btn color="secondary" variant="link">Secondary </btn>
  <btn color="success" variant="link">Success </btn>
  <btn color="error" variant="link">Error </btn>
  <btn color="warning" variant="link">Warning </btn>
</div>

```ts
  <btn color="primary" variant="link">Primary </btn>
  <btn color="secondary" variant="link">Secondary </btn>
  <btn color="success" variant="link">Success </btn>
  <btn color="error" variant="link">Error </btn>
  <btn color="warning" variant="link">Warning </btn>
```

## Circle

<div class="flex flex-wrap items-center gap-3">
  <btn circle>
    <icn name="bell" solid xl/>
  </btn>
  <btn circle variant="outline">
    <icn name="bell" solid xl/>
  </btn>
</div>

```ts
  <btn circle>
    <icn name="bell" solid xl/>
  </btn>
  <btn circle variant="outline">
    <icn name="bell" solid xl/>
  </btn>
```



## API

### Props

| 属性名     | 类型                                                            | 默认值      | 说明                                           |
| ---------- | --------------------------------------------------------------- | ----------- | ---------------------------------------------- |
| `tag`      | `string`                                                        | `'button'`  | 渲染的HTML标签，支持 `button`、`a`、`input` 等 |
| `color`    | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | 按钮颜色主题                                   |
| `variant`  | `'default' \| 'outline' \| 'transparent' \| 'link'`             | `'default'` | 按钮样式变体                                   |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                          | `'md'`      | 按钮尺寸                                       |
| `type`     | `'button' \| 'submit' \| 'reset'`                               | `'button'`  | 按钮类型（仅当tag为button或input时有效）       |
| `loading`  | `boolean`                                                       | `false`     | 是否显示加载状态                               |
| `disabled` | `boolean`                                                       | `false`     | 是否禁用按钮                                   |
| `pills`    | `boolean`                                                       | `false`     | 是否使用圆角样式                               |
| `circle`   | `boolean`                                                       | `false`     | 是否使用圆形样式                               |
| `active`   | `boolean`                                                       | `false`     | 是否为激活状态                                 |
| `clean`    | `boolean`                                                       | `false`     | 是否使用简洁样式（无背景、边框）               |
| `item`     | `boolean`                                                       | `false`     | 是否为菜单项样式                               |
| `sm`       | `string`                                                        | -           | 小屏幕断点尺寸                                 |
| `md`       | `string`                                                        | -           | 中等屏幕断点尺寸                               |
| `lg`       | `string`                                                        | -           | 大屏幕断点尺寸                                 |
| `xl`       | `string`                                                        | -           | 超大屏幕断点尺寸                               |

### Events

| 事件名  | 参数                          | 说明     |
| ------- | ----------------------------- | -------- |
| `click` | `(event: MouseEvent) => void` | 点击事件 |

### Slots

| 插槽名    | 说明     |
| --------- | -------- |
| `default` | 按钮内容 |

## 使用示例

### 基础用法

```vue
<template>
  <!-- 基础按钮 -->
  <Button>点击我</Button>
  
  <!-- 带颜色 -->
  <Button color="success">成功</Button>
  
  <!-- 不同变体 -->
  <Button variant="outline">轮廓按钮</Button>
  <Button variant="transparent">透明按钮</Button>
  <Button variant="link">链接按钮</Button>
</template>
```

### 尺寸和形状

```vue
<template>
  <!-- 不同尺寸 -->
  <Button size="xs">超小</Button>
  <Button size="sm">小</Button>
  <Button size="md">中等</Button>
  <Button size="lg">大</Button>
  <Button size="xl">超大</Button>
  
  <!-- 圆角按钮 -->
  <Button pills>圆角按钮</Button>
  
  <!-- 圆形按钮 -->
  <Button circle>
    <Icon name="plus" />
  </Button>
</template>
```

### 状态控制

```vue
<template>
  <!-- 加载状态 -->
  <Button loading>加载中...</Button>
  
  <!-- 禁用状态 -->
  <Button disabled>禁用按钮</Button>
  
  <!-- 激活状态 -->
  <Button active>激活按钮</Button>
</template>
```

### 响应式设计

```vue
<template>
  <!-- 响应式尺寸 -->
  <Button size="sm" md="lg" lg="xl">
    响应式按钮
  </Button>
</template>
```

### 自定义标签

```vue
<template>
  <!-- 链接按钮 -->
  <Button tag="a" href="/home">
    首页链接
  </Button>
  
  <!-- 输入按钮 -->
  <Button tag="input" type="submit" value="提交" />
</template>
```

### 事件处理

```vue
<template>
  <Button @click="handleClick">
    点击处理
  </Button>
</template>

<script setup>
const handleClick = (event) => {
  console.log('按钮被点击了', event)
}
</script>
```

## 主题定制

Button组件支持通过CSS变量进行主题定制：

```css
:root {
  --primary: #3b82f6;
  --primary-content: #ffffff;
  --secondary: #6b7280;
  --secondary-content: #ffffff;
  --success: #10b981;
  --success-content: #ffffff;
  --warning: #f59e0b;
  --warning-content: #ffffff;
  --error: #ef4444;
  --error-content: #ffffff;
  --rounded-btn: 0.5rem;
}
```

## 无障碍支持

- 支持键盘导航（Tab键切换）
- 支持Enter和Space键激活
- 自动添加适当的ARIA属性
- 支持屏幕阅读器
- 禁用状态时自动阻止交互

## 注意事项

1. **加载状态**: 当`loading`为true时，按钮会自动禁用并显示加载图标
2. **禁用状态**: 禁用状态下按钮不会响应任何交互事件
3. **响应式**: 响应式属性只在对应断点及以上生效
4. **圆形按钮**: 圆形按钮建议只放置图标，文字可能显示不完整
5. **链接按钮**: 使用`tag="a"`时，需要手动设置`href`属性