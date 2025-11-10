# Image 图片组件

Image 组件是一个功能丰富的图片显示组件，支持懒加载、占位符、错误处理、遮罩层等功能。适用于各种图片展示场景。

## 特性

- 🖼️ **基础图片显示** - 支持标准图片显示
- ⚡ **懒加载** - 支持图片懒加载，提升页面性能
- 📦 **占位符** - 支持加载状态和错误状态的占位符
- 🎨 **多种尺寸** - 支持预设尺寸和自定义尺寸
- 🔘 **圆角样式** - 支持多种圆角样式
- 📐 **对象适配** - 支持多种对象适配模式（contain, cover, fill 等）
- 🖱️ **交互功能** - 支持点击事件和遮罩层显示
- ♿ **无障碍** - 完整的 alt 文本支持

## 安装

```ts
import { Image } from 'sectum'
// 或者
import Image from '~/packet/Element/Image/Image.vue'
```

## 基础用法

### 简单图片

使用组件标签：

```vue
<template>
  <Image src="https://via.placeholder.com/300" alt="示例图片" />
</template>

<script setup>
import Image from '~/packet/Element/Image/Image.vue'
</script>
```

或使用全局注册的 `imag` 标签：

```vue
<template>
  <imag src="https://via.placeholder.com/300" alt="示例图片" />
</template>
```

### 带尺寸的图片

```vue
<template>
  <Image src="https://via.placeholder.com/300" alt="示例图片" size="lg" />
</template>
```

### 自定义尺寸

```vue
<template>
  <Image 
    src="https://via.placeholder.com/300" 
    alt="示例图片" 
    :width="400"
    :height="300"
  />
</template>
```

## 尺寸预设

支持 6 种预设尺寸：xs, sm, md, lg, xl, full

```vue
<Image src="..." size="xs" />
<Image src="..." size="sm" />
<Image src="..." size="md" />
<Image src="..." size="lg" />
<Image src="..." size="xl" />
<Image src="..." size="full" />
```

## 圆角样式

支持 6 种圆角样式：none, sm, md, lg, xl, full

```vue
<Image src="..." rounded="none" />
<Image src="..." rounded="sm" />
<Image src="..." rounded="md" />
<Image src="..." rounded="lg" />
<Image src="..." rounded="xl" />
<Image src="..." rounded="full" />
```

## 对象适配模式

支持 5 种对象适配模式：

- `contain` - 保持宽高比，完整显示图片
- `cover` - 保持宽高比，填充整个容器（默认）
- `fill` - 拉伸图片以填充容器
- `none` - 不缩放
- `scale-down` - 缩小以适应容器

```vue
<Image src="..." fit="contain" />
<Image src="..." fit="cover" />
<Image src="..." fit="fill" />
<Image src="..." fit="none" />
<Image src="..." fit="scale-down" />
```

## 懒加载

使用 `lazy` 属性启用懒加载：

```vue
<template>
  <Image 
    src="https://via.placeholder.com/300" 
    alt="示例图片" 
    lazy
  />
</template>
```

## 占位符

### 加载占位符

```vue
<template>
  <Image 
    src="https://via.placeholder.com/300" 
    alt="示例图片"
    :loading="true"
    placeholder-icon="spinner"
    placeholder-icon-light
  />
</template>
```

### 自定义占位符文字

```vue
<template>
  <Image 
    src="https://via.placeholder.com/300" 
    alt="示例图片"
    placeholder-text="加载中..."
  />
</template>
```

### 错误占位符

```vue
<template>
  <Image 
    src="invalid-url" 
    alt="示例图片"
    error-icon="exclamation-triangle"
    error-icon-light
  />
</template>
```

### 自定义错误文字

```vue
<template>
  <Image 
    src="invalid-url" 
    alt="示例图片"
    error-text="图片加载失败"
  />
</template>
```

## 遮罩层

### 悬停显示遮罩

```vue
<template>
  <Image 
    src="https://via.placeholder.com/300" 
    alt="示例图片"
    show-overlay
    overlay-icon="search-plus"
    overlay-icon-light
  />
</template>
```

### 点击显示遮罩

```vue
<template>
  <Image 
    src="https://via.placeholder.com/300" 
    alt="示例图片"
    show-overlay
    show-overlay-on-click
    overlay-icon="expand"
    overlay-icon-light
  />
</template>
```

### 自定义遮罩内容

```vue
<template>
  <Image 
    src="https://via.placeholder.com/300" 
    alt="示例图片"
    show-overlay
  >
    <template #overlay>
      <div class="text-white">
        <p>自定义遮罩内容</p>
      </div>
    </template>
  </Image>
</template>
```

## 可点击

设置 `clickable` 属性后，图片可以点击：

```vue
<template>
  <Image 
    src="https://via.placeholder.com/300" 
    alt="示例图片"
    clickable
    @click="handleImageClick"
  />
</template>

<script setup>
const handleImageClick = (event) => {
  console.log('图片被点击', event)
}
</script>
```

## 事件

- `load` - 图片加载成功时触发
- `error` - 图片加载失败时触发
- `click` - 点击图片时触发（需要设置 `clickable`）

```vue
<template>
  <Image 
    src="https://via.placeholder.com/300" 
    alt="示例图片"
    clickable
    @load="handleLoad"
    @error="handleError"
    @click="handleClick"
  />
</template>

<script setup>
const handleLoad = (event) => {
  console.log('图片加载成功', event)
}

const handleError = (error) => {
  console.log('图片加载失败', error)
}

const handleClick = (event) => {
  console.log('图片被点击', event)
}
</script>
```

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `src` | `string` | - | 图片源地址（必需） |
| `alt` | `string` | `''` | 图片替代文本 |
| `width` | `string \| number` | - | 自定义宽度 |
| `height` | `string \| number` | - | 自定义高度 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | 尺寸预设 |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | 圆角样式 |
| `fit` | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | 对象适配模式 |
| `lazy` | `boolean` | `false` | 是否懒加载 |
| `loading` | `boolean` | `true` | 是否显示加载状态 |
| `placeholderIcon` | `string` | - | 占位符图标名称 |
| `placeholderIconLight` | `boolean` | `false` | 占位符图标是否为 light 样式 |
| `placeholderIconBrand` | `boolean` | `false` | 占位符图标是否为 brand 样式 |
| `placeholderText` | `string` | - | 占位符文字 |
| `errorIcon` | `string` | - | 错误图标名称 |
| `errorIconLight` | `boolean` | `false` | 错误图标是否为 light 样式 |
| `errorIconBrand` | `boolean` | `false` | 错误图标是否为 brand 样式 |
| `errorText` | `string` | - | 错误文字 |
| `showOverlay` | `boolean` | `false` | 是否显示遮罩层 |
| `overlayIcon` | `string` | - | 遮罩层图标名称 |
| `overlayIconLight` | `boolean` | `false` | 遮罩层图标是否为 light 样式 |
| `overlayIconBrand` | `boolean` | `false` | 遮罩层图标是否为 brand 样式 |
| `clickable` | `boolean` | `false` | 是否可点击 |
| `showOverlayOnClick` | `boolean` | `false` | 点击时是否显示遮罩 |
| `customClass` | `string` | - | 自定义类名 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `load` | `event: Event` | 图片加载成功时触发 |
| `error` | `error: Event` | 图片加载失败时触发 |
| `click` | `event: MouseEvent` | 点击图片时触发 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `overlay` | 自定义遮罩层内容 |

## 使用示例

### 图片画廊

```vue
<template>
  <div class="grid grid-cols-3 gap-4">
    <Image
      v-for="(image, index) in images"
      :key="index"
      :src="image.src"
      :alt="image.alt"
      size="lg"
      rounded="lg"
      show-overlay
      overlay-icon="search-plus"
      overlay-icon-light
      clickable
      @click="openPreview(image)"
    />
  </div>
</template>

<script setup>
import Image from '~/packet/Element/Image/Image.vue'

const images = [
  { src: 'https://via.placeholder.com/400', alt: '图片 1' },
  { src: 'https://via.placeholder.com/400', alt: '图片 2' },
  { src: 'https://via.placeholder.com/400', alt: '图片 3' }
]

const openPreview = (image) => {
  // 打开图片预览
  console.log('预览图片', image)
}
</script>
```

### 响应式图片列表

```vue
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <Image
      v-for="(item, index) in items"
      :key="index"
      :src="item.image"
      :alt="item.title"
      size="full"
      rounded="md"
      fit="cover"
      lazy
    />
  </div>
</template>
```

### 头像图片

```vue
<template>
  <Image
    src="https://via.placeholder.com/100"
    alt="用户头像"
    size="md"
    rounded="full"
    fit="cover"
  />
</template>
```

## 最佳实践

1. **性能优化**：对于长列表中的图片，使用 `lazy` 属性启用懒加载
2. **错误处理**：始终提供 `alt` 文本，并考虑使用错误占位符
3. **尺寸控制**：优先使用预设尺寸，需要精确控制时使用自定义 `width` 和 `height`
4. **对象适配**：根据图片内容选择合适的 `fit` 模式
5. **无障碍**：确保所有图片都有有意义的 `alt` 文本

## 注意事项

1. **图片加载**：图片加载失败时会自动显示错误占位符
2. **懒加载**：懒加载使用浏览器原生的 `loading="lazy"` 属性
3. **遮罩层**：遮罩层默认在悬停时显示，可以通过 `showOverlayOnClick` 改为点击显示
4. **尺寸优先级**：如果同时设置了 `size` 和 `width`/`height`，`width`/`height` 优先级更高
5. **占位符优先级**：如果同时设置了 `placeholderIcon` 和 `placeholderText`，`placeholderIcon` 优先级更高

