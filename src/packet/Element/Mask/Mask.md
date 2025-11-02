# Backdrop 组件

一个用于创建模态背景遮罩的组件，支持模糊效果和加载状态显示。

## 特性

- 🎭 **模态遮罩**: 创建全屏背景遮罩层
- 🌫️ **模糊效果**: 支持背景模糊和亮度调整
- ⏳ **加载状态**: 内置加载指示器支持
- 🎨 **灵活样式**: 支持透明度和模糊度自定义
- ♿ **无障碍**: 完整的键盘导航和屏幕阅读器支持
- ⚡ **UnoCSS**: 使用原子化CSS类，零运行时开销
- 🎯 **Vue 3**: 完全支持 Composition API

## 安装

```ts
import { Backdrop } from 'sectum'
// 或者
import bkd from 'sectum'
```

## 基础用法

<div class="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
  <div class="p-4">
    <p>页面内容</p>
    <bkd :show="true" />
  </div>
</div>

```vue
<bkd :show="true" />
```

**注意**: 在实际使用中，Backdrop 组件通常需要配合其他组件使用，单独使用时会覆盖整个屏幕。

## 模糊效果

<div class="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
  <div class="p-4">
    <p>页面内容</p>
    <bkd :show="true" :blur="true" />
  </div>
</div>

```vue
<bkd :show="true" :blur="true" />
```

## 加载状态

<div class="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
  <div class="p-4">
    <p>页面内容</p>
    <bkd :show="true" :loading="true" />
  </div>
</div>

```vue
<bkd :show="true" :loading="true" />
```

## 组合使用

<div class="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
  <div class="p-4">
    <p>页面内容</p>
    <bkd :show="true" :blur="true" :loading="true" />
  </div>
</div>

```vue
<bkd :show="true" :blur="true" :loading="true" />
```

## 实际应用示例

### 模态对话框

```vue
<template>
  <div>
    <!-- 页面内容 -->
    <btn @click="showModal = true">打开模态框</btn>
    <!-- 模态对话框 -->
    <div v-if="showModal" class="fixed inset-0 z-20 flex items-center justify-center">
      <bkd :show="true" :blur="true" @click="showModal = false" />
      <div class="relative z-30 bg-white p-6 rounded-lg shadow-lg">
        <h2>模态对话框</h2>
        <p>这是模态对话框的内容</p>
        <btn @click="showModal = false">关闭</btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>
```

### 加载遮罩

```vue
<template>
  <div>
    <btn @click="loadData" :disabled="loading">
      {{ loading ? '加载中...' : '加载数据' }}
    </btn>
    <bkd :show="loading" :loading="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)

const loadData = async () => {
  loading.value = true
  try {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 2000))
  } finally {
    loading.value = false
  }
}
</script>
```

## API

### Props

| 属性      | 类型      | 默认值  | 说明                 |
| --------- | --------- | ------- | -------------------- |
| `show`    | `boolean` | -       | 是否显示遮罩（必填） |
| `blur`    | `boolean` | `false` | 是否启用模糊效果     |
| `loading` | `boolean` | `false` | 是否显示加载指示器   |

### 样式变体

| 变体 | 效果                | CSS 类                                   |
| ---- | ------------------- | ---------------------------------------- |
| 默认 | 半透明灰色遮罩      | `bg-gray-500 opacity-30`                 |
| 模糊 | 背景模糊 + 亮度调整 | `backdrop-brightness-60 backdrop-blur-1` |

## 技术实现

### UnoCSS 原子类

组件使用 UnoCSS 原子类实现样式：

- **定位**: `fixed inset-0` - 全屏固定定位
- **层级**: `z-10` - 设置合适的 z-index
- **布局**: `flex place-content-center items-center` - 居中对齐
- **模糊效果**: `backdrop-brightness-60 backdrop-blur-1` - 背景模糊和亮度
- **透明度**: `opacity-30` - 半透明效果

### 动画效果

使用 `tst` 组件提供过渡动画：

```vue
<tst name="bloom">
  <!-- 遮罩内容 -->
</tst>
```

### 加载指示器

集成 `icn` 组件显示加载状态：

```vue
<icn name="spinner" solid xl spinpulse></icn>
```

## 最佳实践

### 1. 配合模态框使用

```vue
<template>
  <div class="relative">
    <!-- 触发按钮 -->
    <btn @click="openModal">打开模态框</btn>
    <!-- 模态框 -->
    <teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-50">
        <bkd :show="true" :blur="true" @click="closeModal" />
        <div class="relative z-10 flex items-center justify-center h-full">
          <div class="bg-white rounded-lg shadow-xl p-6">
            <!-- 模态框内容 -->
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
```

### 2. 全局加载状态

```vue
// 在根组件中使用
<template>
  <div id="app">
    <router-view />
    <bkd :show="globalLoading" :loading="true" />
  </div>
</template>
```

### 3. 条件渲染优化

```vue
<template>
  <!-- 使用 v-show 而不是 v-if 来避免重复创建/销毁 -->
  <bkd v-show="show" :blur="blur" :loading="loading" />
</template>
```

## 无障碍支持

- 支持键盘导航（ESC 键关闭）
- 提供焦点管理
- 支持屏幕阅读器
- 语义化的 HTML 结构

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 注意事项

1. **z-index 层级**: 确保遮罩的 z-index 值合适，避免被其他元素覆盖
2. **性能优化**: 使用 `v-show` 而不是 `v-if` 来避免频繁的 DOM 操作
3. **事件处理**: 记得处理点击遮罩关闭的逻辑
4. **移动端适配**: 在移动设备上测试触摸交互