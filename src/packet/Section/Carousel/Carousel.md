# Carousel 轮播图组件

Carousel 轮播图组件用于在有限空间内展示多个内容项，支持自动播放、手动导航、触摸滑动等功能。适用于图片展示、广告横幅、内容轮播等场景。

## 特性

- 🎠 **自动播放** - 支持自动轮播，可设置播放间隔
- 🎯 **多种导航** - 支持箭头导航和指示器导航
- 📱 **触摸支持** - 支持移动端触摸滑动切换
- 🔄 **循环播放** - 支持无限循环播放
- ⏸️ **悬停暂停** - 鼠标悬停时自动暂停播放
- 🎨 **灵活配置** - 支持多种自定义选项
- 📐 **响应式** - 自适应不同屏幕尺寸
- ♿ **无障碍** - 完整的键盘导航和 ARIA 支持
- 🖼️ **图片数组** - 支持通过图片链接数组快速创建轮播图

## 安装

```ts
import { Carousel } from 'sectum'
// 或者
import Carousel from 'sectum'
```

## 基础用法

最简单的轮播图用法：

<Carousel>
  <div class="h-64 bg-primary flex items-center justify-center text-primary-content text-2xl font-bold">Slide 1</div>
  <div class="h-64 bg-secondary flex items-center justify-center text-secondary-content text-2xl font-bold">Slide 2</div>
  <div class="h-64 bg-success flex items-center justify-center text-success-content text-2xl font-bold">Slide 3</div>
</Carousel>

```vue
<template>
  <Carousel>
    <div class="h-64 bg-primary flex items-center justify-center text-primary-content text-2xl font-bold">
      Slide 1
    </div>
    <div class="h-64 bg-secondary flex items-center justify-center text-secondary-content text-2xl font-bold">
      Slide 2
    </div>
    <div class="h-64 bg-success flex items-center justify-center text-success-content text-2xl font-bold">
      Slide 3
    </div>
  </Carousel>
</template>

<script setup>
import { Carousel } from 'sectum'
</script>
```

## 自动播放

使用 `autoplay` 属性启用自动播放：

<Carousel :autoplay="true" :interval="2000">
  <div class="h-48 bg-primary/80 flex items-center justify-center text-primary-content text-xl">自动播放 1</div>
  <div class="h-48 bg-secondary/80 flex items-center justify-center text-secondary-content text-xl">自动播放 2</div>
  <div class="h-48 bg-success/80 flex items-center justify-center text-success-content text-xl">自动播放 3</div>
</Carousel>

```vue
<template>
  <Carousel :autoplay="true" :interval="2000">
    <div class="h-48 bg-primary/80 flex items-center justify-center text-primary-content text-xl">
      自动播放 1
    </div>
    <div class="h-48 bg-secondary/80 flex items-center justify-center text-secondary-content text-xl">
      自动播放 2
    </div>
    <div class="h-48 bg-success/80 flex items-center justify-center text-success-content text-xl">
      自动播放 3
    </div>
  </Carousel>
</template>
```

## 隐藏导航元素

### 隐藏箭头

<Carousel :showArrows="false">
  <div class="h-40 bg-warning/80 flex items-center justify-center text-warning-content">无箭头 1</div>
  <div class="h-40 bg-error/80 flex items-center justify-center text-error-content">无箭头 2</div>
</Carousel>

```vue
<Carousel :showArrows="false">
  <div>内容 1</div>
  <div>内容 2</div>
</Carousel>
```

### 隐藏指示器

<Carousel :showIndicators="false">
  <div class="h-40 bg-primary/80 flex items-center justify-center text-primary-content">无指示器 1</div>
  <div class="h-40 bg-secondary/80 flex items-center justify-center text-secondary-content">无指示器 2</div>
</Carousel>

```vue
<Carousel :showIndicators="false">
  <div>内容 1</div>
  <div>内容 2</div>
</Carousel>
```

## 指示器位置

### 底部（默认）

<Carousel indicatorsPosition="bottom">
  <div class="h-32 bg-primary/80 flex items-center justify-center text-primary-content">底部指示器</div>
  <div class="h-32 bg-secondary/80 flex items-center justify-center text-secondary-content">底部指示器</div>
</Carousel>

### 顶部

<Carousel indicatorsPosition="top">
  <div class="h-32 bg-primary/80 flex items-center justify-center text-primary-content">顶部指示器</div>
  <div class="h-32 bg-secondary/80 flex items-center justify-center text-secondary-content">顶部指示器</div>
</Carousel>

```vue
<!-- 底部指示器（默认） -->
<Carousel indicatorsPosition="bottom">
  <div>内容 1</div>
  <div>内容 2</div>
</Carousel>

<!-- 顶部指示器 -->
<Carousel indicatorsPosition="top">
  <div>内容 1</div>
  <div>内容 2</div>
</Carousel>
```

## 自定义高度

<Carousel height="300px">
  <div class="bg-primary/80 flex items-center justify-center text-primary-content" style="height: 300px;">
    固定高度 300px
  </div>
  <div class="bg-secondary/80 flex items-center justify-center text-secondary-content" style="height: 300px;">
    固定高度 300px
  </div>
</Carousel>

```vue
<Carousel height="300px">
  <div style="height: 300px;">内容 1</div>
  <div style="height: 300px;">内容 2</div>
</Carousel>
```

## 循环播放

默认情况下，轮播图支持循环播放。可以通过 `loop` 属性禁用：

<Carousel :loop="false">
  <div class="h-40 bg-primary/80 flex items-center justify-center text-primary-content">非循环 1</div>
  <div class="h-40 bg-secondary/80 flex items-center justify-center text-secondary-content">非循环 2</div>
  <div class="h-40 bg-success/80 flex items-center justify-center text-success-content">非循环 3</div>
</Carousel>

```vue
<Carousel :loop="false">
  <div>内容 1</div>
  <div>内容 2</div>
  <div>内容 3</div>
</Carousel>
```

## 图片轮播

### 方式一：使用图片数组（推荐）

通过 `images` prop 传入图片链接数组，组件会自动渲染图片轮播：

```vue
<template>
  <Carousel 
    :images="imageList"
    :autoplay="true"
    :interval="3000"
    height="400px"
  />
</template>

<script setup>
import { ref } from 'vue'

const imageList = ref([
  'https://via.placeholder.com/800x400?text=Image+1',
  'https://via.placeholder.com/800x400?text=Image+2',
  'https://via.placeholder.com/800x400?text=Image+3'
])
</script>
```

使用图片数组的优势：
- ✅ 简洁：无需手动编写模板代码
- ✅ 灵活：可以动态更新图片列表
- ✅ 自动：组件自动处理图片渲染和布局

### 方式二：使用 slot（自定义内容）

如果需要自定义每张幻灯片的内容（如图片 + 文字叠加），可以使用 slot：

```vue
<template>
  <Carousel :autoplay="true" :interval="3000" height="400px">
    <div v-for="(item, index) in slides" :key="index" class="relative w-full h-full">
      <img 
        :src="item.image" 
        :alt="item.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 flex items-center justify-center bg-black/30">
        <h2 class="text-white text-4xl font-bold">{{ item.title }}</h2>
      </div>
    </div>
  </Carousel>
</template>

<script setup>
const slides = [
  { image: '/image1.jpg', title: '标题 1' },
  { image: '/image2.jpg', title: '标题 2' },
  { image: '/image3.jpg', title: '标题 3' }
]
</script>
```

## 响应式轮播

结合响应式设计，在不同屏幕尺寸下显示不同内容：

```vue
<template>
  <Carousel :autoplay="true" height="auto">
    <!-- 移动端内容 -->
    <div class="block md:hidden">
      <div class="h-48 bg-primary">移动端内容</div>
    </div>
    <!-- 桌面端内容 -->
    <div class="hidden md:block">
      <div class="h-64 bg-secondary">桌面端内容</div>
    </div>
  </Carousel>
</template>
```

## 事件监听

监听轮播切换事件：

```vue
<template>
  <Carousel @change="handleChange">
    <div>内容 1</div>
    <div>内容 2</div>
    <div>内容 3</div>
  </Carousel>
</template>

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)

const handleChange = (index) => {
  currentIndex.value = index
  console.log('当前索引:', index)
}
</script>
```

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `initialIndex` | `number` | `0` | 初始显示的索引 |
| `autoplay` | `boolean` | `false` | 是否自动播放 |
| `interval` | `number` | `3000` | 自动播放间隔（毫秒） |
| `loop` | `boolean` | `true` | 是否循环播放 |
| `showArrows` | `boolean` | `true` | 是否显示箭头导航 |
| `showIndicators` | `boolean` | `true` | 是否显示指示器 |
| `indicatorsPosition` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | 指示器位置 |
| `height` | `string` | `'20rem'` | 轮播图高度（默认约20行，320px） |
| `duration` | `number` | `500` | 过渡动画时长（毫秒） |
| `touchable` | `boolean` | `true` | 是否支持触摸滑动 |
| `pauseOnHover` | `boolean` | `true` | 鼠标悬停时是否暂停播放 |
| `images` | `string[]` | `undefined` | 图片链接数组，如果提供则自动渲染图片轮播 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `change` | `(index: number)` | 轮播切换时触发，返回当前索引 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 轮播内容，每个直接子元素作为一张幻灯片。当未提供 `images` prop 时使用 |

> **注意**: 如果同时提供了 `images` prop 和 slot 内容，`images` 优先级更高，slot 内容将被忽略。

## 使用示例

### 基础轮播

```vue
<template>
  <Carousel>
    <div class="h-64 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl">
      第一张
    </div>
    <div class="h-64 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white text-2xl">
      第二张
    </div>
    <div class="h-64 bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl">
      第三张
    </div>
  </Carousel>
</template>
```

### 使用图片数组的自动播放轮播

```vue
<template>
  <Carousel 
    :images="imageUrls"
    :autoplay="true" 
    :interval="4000"
    :pause-on-hover="true"
    height="500px"
  />
</template>

<script setup>
import { ref } from 'vue'

const imageUrls = ref([
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner3.jpg'
])
</script>
```

### 带文字叠加的自定义轮播

如果需要图片 + 文字叠加效果，使用 slot 方式：

```vue
<template>
  <Carousel 
    :autoplay="true" 
    :interval="4000"
    :pause-on-hover="true"
    height="500px"
  >
    <div v-for="(item, index) in slides" :key="index" class="relative w-full h-full">
      <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
      <div class="absolute inset-0 flex items-center justify-center bg-black/30">
        <div class="text-center">
          <h2 class="text-white text-4xl font-bold mb-4">{{ item.title }}</h2>
          <p class="text-white text-xl">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </Carousel>
</template>

<script setup>
import { ref } from 'vue'

const slides = ref([
  { image: '/image1.jpg', title: '标题 1', description: '描述 1' },
  { image: '/image2.jpg', title: '标题 2', description: '描述 2' },
  { image: '/image3.jpg', title: '标题 3', description: '描述 3' }
])
</script>
```

### 动态内容轮播

```vue
<template>
  <Carousel 
    :autoplay="true"
    :initialIndex="selectedIndex"
    @change="handleSlideChange"
  >
    <div v-for="(slide, index) in slides" :key="index" class="p-8">
      <h3 class="text-2xl font-bold mb-4">{{ slide.title }}</h3>
      <p class="text-base-content/70">{{ slide.content }}</p>
    </div>
  </Carousel>
</template>

<script setup>
import { ref } from 'vue'

const selectedIndex = ref(0)

const slides = ref([
  { title: '幻灯片 1', content: '这是第一张幻灯片的内容...' },
  { title: '幻灯片 2', content: '这是第二张幻灯片的内容...' },
  { title: '幻灯片 3', content: '这是第三张幻灯片的内容...' }
])

const handleSlideChange = (index) => {
  selectedIndex.value = index
  console.log('切换到:', slides.value[index].title)
}
</script>
```

### 无导航轮播

```vue
<template>
  <Carousel 
    :showArrows="false"
    :showIndicators="false"
    :autoplay="true"
    :loop="true"
  >
    <div>内容 1</div>
    <div>内容 2</div>
    <div>内容 3</div>
  </Carousel>
</template>
```

## 最佳实践

1. **图片优化**: 使用适当大小的图片，避免加载过慢
2. **内容一致性**: 保持所有幻灯片的高度一致，获得更好的视觉效果
3. **自动播放**: 在重要内容上避免使用自动播放，以免用户错过信息
4. **触摸支持**: 在移动端确保启用触摸滑动功能
5. **指示器**: 在幻灯片数量较多时，始终显示指示器
6. **无障碍**: 为图片添加 alt 属性，为导航按钮添加 aria-label
7. **图片数组**: 对于纯图片轮播，优先使用 `images` prop，代码更简洁
8. **自定义内容**: 需要图片 + 文字叠加等复杂布局时，使用 slot 方式

## 注意事项

1. **子元素宽度**: 每个直接子元素会占据 100% 宽度，确保正确布局
2. **高度设置**: 如果内容高度不一致，建议设置固定高度（使用 `height` prop）
3. **自动播放**: 自动播放时建议启用 `pauseOnHover`，提升用户体验
4. **触摸事件**: 触摸滑动功能在移动端表现更好
5. **循环播放**: 循环播放时，从最后一张到第一张会有平滑过渡
6. **性能**: 避免在轮播中包含过多复杂组件，可能影响性能
7. **图片数组**: 使用 `images` prop 时，图片会自动应用 `object-cover` 样式，确保正确填充
8. **优先级**: 如果同时提供 `images` 和 slot，`images` 优先级更高
9. **响应式更新**: `images` 数组变化时会自动更新轮播图内容

## 技术实现

### 核心特性

- **Transform 动画**: 使用 CSS `transform: translateX()` 实现平滑滑动
- **触摸支持**: 监听 touch 事件，检测滑动方向
- **自动播放**: 使用 `setInterval` 实现定时切换
- **响应式**: 基于 Vue 3 Composition API，完全响应式

### 样式系统

组件使用 UnoCSS 原子类：
- 定位: `relative`, `absolute`
- 布局: `flex`
- 变换: `translateX`, `translate-y`
- 过渡: `transition-transform`, `duration-500`
- 圆角: `rounded-$rounded-box`

## 更新日志

### v1.1.0
- ✨ 新增 `images` prop，支持通过图片链接数组快速创建图片轮播
- 🐛 修复循环模式下左箭头不显示的问题
- 🐛 修复轮播图高度继承问题，确保子元素正确显示高度
- 📚 完善文档，添加图片数组使用说明和示例

### v1.0.0
- 初始版本发布
- 支持基础轮播功能
- 支持自动播放
- 支持箭头导航和指示器
- 支持触摸滑动
- 支持循环播放
- 支持悬停暂停

