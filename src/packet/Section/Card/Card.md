# Card 卡片组件

Card 是一个功能丰富的卡片组件，支持标题、副标题、图片、动作区域等多种内容。适用于展示信息卡片、产品卡片、用户卡片等场景。

## 特性

- 🎨 **丰富内容** - 支持标题、副标题、图片、自定义内容
- 🖼️ **图片支持** - 支持顶部和底部图片位置
- 🎯 **样式变体** - 支持阴影、边框、圆角等多种样式
- 🎭 **动作区域** - 支持底部操作按钮区域
- 🌙 **深色模式** - 完全支持深色模式，自动适配主题
- ✨ **悬停效果** - 支持悬停放大和阴影效果
- 🎭 **灵活配置** - 通过 props 轻松配置各种样式和行为

## 安装

```ts
import { Card } from 'sectum'
// 或者
import Card from 'sectum'
```

## 快速开始

Card 组件的基本用法非常简单：

```vue
<Card title="卡片标题">
  卡片内容
</Card>
```

## 示例展示

### Basic

<div class="flex flex-wrap items-center gap-3">
  <Card title="卡片标题" class="w-80">
    这是卡片的基本内容。你可以在这里放置任何内容。
  </Card>
</div>

```
  <Card title="卡片标题" class="w-80">
    这是卡片的基本内容。你可以在这里放置任何内容。
  </Card>
```

### With Subtitle

<div class="flex flex-wrap items-center gap-3">
  <Card title="卡片标题" subtitle="这是副标题" class="w-80">
    这是卡片的基本内容。你可以在这里放置任何内容。
  </Card>
</div>

```
  <Card title="卡片标题" subtitle="这是副标题" class="w-80">
    这是卡片的基本内容。你可以在这里放置任何内容。
  </Card>
```

### With Image

<div class="flex flex-wrap items-center gap-3">
  <Card 
    title="卡片标题" 
    subtitle="这是副标题"
    image="https://via.placeholder.com/400x200"
    class="w-80"
  >
    这是卡片的基本内容。图片显示在顶部。
  </Card>
</div>

```
  <Card 
    title="卡片标题" 
    subtitle="这是副标题"
    image="https://via.placeholder.com/400x200"
    class="w-80"
  >
    这是卡片的基本内容。图片显示在顶部。
  </Card>
```

### Image Bottom

<div class="flex flex-wrap items-center gap-3">
  <Card 
    title="卡片标题" 
    subtitle="这是副标题"
    image="https://via.placeholder.com/400x200"
    image-position="bottom"
    class="w-80"
  >
    这是卡片的基本内容。图片显示在底部。
  </Card>
</div>

```
  <Card 
    title="卡片标题" 
    subtitle="这是副标题"
    image="https://via.placeholder.com/400x200"
    image-position="bottom"
    class="w-80"
  >
    这是卡片的基本内容。图片显示在底部。
  </Card>
```

### With Actions

<div class="flex flex-wrap items-center gap-3">
  <Card title="卡片标题" :actions="true" class="w-80">
    这是卡片的基本内容。底部有操作按钮区域。
    <template #footer>
      <btn size="sm">取消</btn>
      <btn size="sm" type="primary">确认</btn>
    </template>
  </Card>
</div>

```
  <Card title="卡片标题" :actions="true" class="w-80">
    这是卡片的基本内容。底部有操作按钮区域。
    <template #footer>
      <btn size="sm">取消</btn>
      <btn size="sm" type="primary">确认</btn>
    </template>
  </Card>
```

### Bordered

<div class="flex flex-wrap items-center gap-3">
  <Card title="卡片标题" bordered shadow-size="lg" class="w-80">
    这是带边框的卡片，阴影大小为大。
  </Card>
</div>

```
  <Card title="卡片标题" bordered shadow-size="lg" class="w-80">
    这是带边框的卡片，阴影大小为大。
  </Card>
```

### No Shadow

<div class="flex flex-wrap items-center gap-3">
  <Card title="卡片标题" :shadow="false" bordered class="w-80">
    这是没有阴影的卡片。
  </Card>
</div>

```
  <Card title="卡片标题" :shadow="false" bordered class="w-80">
    这是没有阴影的卡片。
  </Card>
```

### Hover Effect

<div class="flex flex-wrap items-center gap-3">
  <Card title="卡片标题" hover class="w-80">
    悬停时会有放大和阴影效果。
  </Card>
</div>

```
  <Card title="卡片标题" hover class="w-80">
    悬停时会有放大和阴影效果。
  </Card>
```

### Shadow Sizes

<div class="flex flex-wrap items-center gap-3">
  <Card title="小阴影" shadow-size="sm" class="w-60">
    小阴影
  </Card>
  <Card title="中阴影" shadow-size="md" class="w-60">
    中阴影（默认）
  </Card>
  <Card title="大阴影" shadow-size="lg" class="w-60">
    大阴影
  </Card>
  <Card title="超大阴影" shadow-size="xl" class="w-60">
    超大阴影
  </Card>
</div>

```
  <Card title="小阴影" shadow-size="sm" class="w-60">
    小阴影
  </Card>
  <Card title="中阴影" shadow-size="md" class="w-60">
    中阴影（默认）
  </Card>
  <Card title="大阴影" shadow-size="lg" class="w-60">
    大阴影
  </Card>
  <Card title="超大阴影" shadow-size="xl" class="w-60">
    超大阴影
  </Card>
```

### Complex Content

<div class="flex flex-wrap items-center gap-3">
  <Card 
    title="用户卡片" 
    subtitle="用户信息展示"
    image="https://via.placeholder.com/400x200"
    hover
    class="w-80"
  >
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <icn name="user" light />
        <span>用户名：John Doe</span>
      </div>
      <div class="flex items-center gap-2">
        <icn name="mail" light />
        <span>邮箱：john@example.com</span>
      </div>
      <div class="flex items-center gap-2">
        <icn name="phone" light />
        <span>电话：123-456-7890</span>
      </div>
    </div>
    <template #footer>
      <btn size="sm">查看</btn>
      <btn size="sm" type="primary">编辑</btn>
    </template>
  </Card>
</div>

```
  <Card 
    title="用户卡片" 
    subtitle="用户信息展示"
    image="https://via.placeholder.com/400x200"
    hover
    class="w-80"
  >
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <icn name="user" light />
        <span>用户名：John Doe</span>
      </div>
      <div class="flex items-center gap-2">
        <icn name="mail" light />
        <span>邮箱：john@example.com</span>
      </div>
      <div class="flex items-center gap-2">
        <icn name="phone" light />
        <span>电话：123-456-7890</span>
      </div>
    </div>
    <template #footer>
      <btn size="sm">查看</btn>
      <btn size="sm" type="primary">编辑</btn>
    </template>
  </Card>
```

## API 参考

### Props 属性

| 属性名          | 类型                                    | 默认值      | 说明                         |
| --------------- | --------------------------------------- | ----------- | ---------------------------- |
| `title`         | `String`                                | `''`        | 卡片标题                     |
| `subtitle`      | `String`                                | `''`        | 卡片副标题                   |
| `shadow`        | `Boolean`                               | `true`      | 是否显示阴影                 |
| `shadowSize`    | `'sm' \| 'md' \| 'lg' \| 'xl'`          | `'md'`      | 阴影大小                     |
| `bordered`      | `Boolean`                               | `false`     | 是否显示边框                 |
| `rounded`       | `Boolean`                               | `true`      | 是否显示圆角                 |
| `bg`            | `String`                                | `'base-100'` | 背景颜色类名                 |
| `image`         | `String`                                | `''`        | 卡片图片 URL                 |
| `imagePosition` | `'top' \| 'bottom'`                     | `'top'`     | 图片位置                     |
| `actions`       | `Boolean`                               | `false`     | 是否显示动作区域（footer）   |
| `hover`         | `Boolean`                               | `false`     | 是否启用悬停效果             |

### Slots 插槽

| 插槽名   | 说明                 |
| -------- | -------------------- |
| `default` | 卡片主要内容区域     |
| `footer`  | 卡片底部动作区域     |

### 使用示例

#### 基础卡片

```vue
<Card title="卡片标题">
  卡片内容
</Card>
```

#### 带标题和副标题的卡片

```vue
<Card title="卡片标题" subtitle="这是副标题">
  卡片内容
</Card>
```

#### 带图片的卡片

```vue
<Card 
  title="卡片标题" 
  image="https://example.com/image.jpg"
>
  卡片内容
</Card>
```

#### 带动作区域的卡片

```vue
<Card title="卡片标题" :actions="true">
  卡片内容
  <template #footer>
    <btn size="sm">取消</btn>
    <btn size="sm" type="primary">确认</btn>
  </template>
</Card>
```

#### 带悬停效果的卡片

```vue
<Card title="卡片标题" hover>
  悬停时会有效果
</Card>
```

#### 不同背景颜色的卡片

```vue
<Card title="卡片标题" bg="base-200">
  背景颜色为 base-200
</Card>

<Card title="卡片标题" bg="primary">
  背景颜色为 primary
</Card>
```

#### 完整示例

```vue
<Card 
  title="产品卡片" 
  subtitle="产品信息"
  image="https://example.com/product.jpg"
  hover
  bordered
  shadow-size="lg"
  class="w-80"
>
  <div class="space-y-2">
    <p>产品描述信息</p>
    <p class="text-2xl font-bold">¥999</p>
  </div>
  <template #footer>
    <btn size="sm">加入购物车</btn>
    <btn size="sm" type="primary">立即购买</btn>
  </template>
</Card>
```

## 注意事项

- 卡片默认宽度为 `100%`，建议使用 `class` 属性设置合适的宽度
- 图片会自动适配宽度，保持原始比例
- 使用 `hover` 属性时，悬停会有轻微放大效果
- 底部动作区域（footer）可以通过 `actions` 属性或 `footer` 插槽来显示
- 建议在卡片内容较多时使用合适的间距和内边距
