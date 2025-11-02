# Footer 页脚组件

Footer 组件是一个简洁的页脚组件，用于显示版权信息和许可证信息。适用于各种 Web 应用的底部布局。

## 特性

- 📄 **简洁设计** - 轻量级、无依赖的页脚组件
- 🌓 **暗色模式** - 自动适配暗色主题
- 📱 **响应式** - 自适应不同屏幕尺寸
- 🎨 **可定制** - 通过 UnoCSS 类名轻松自定义样式

## 安装

```ts
import { Footer } from 'sectum'
// 或者
import Footer from 'sectum'
```

## 基础用法

最简单的 Footer 用法：

```vue
<template>
  <Footer />
</template>

<script setup>
import { Footer } from 'sectum'
</script>
```

**注意**：Footer 组件会显示固定的版权信息，适合放在页面底部。

## 完整布局示例

在完整页面布局中使用 Footer：

```vue
<template>
  <div class="min-h-screen flex flex-col">
    <Header project-name="Sectum" />
    <main class="flex-1">
      <!-- 页面内容 -->
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { Header, Footer } from 'sectum'
</script>
```

## API 参考

### Props

Footer 组件不接受任何 props，内容固定显示版权信息。

### 插槽

Footer 组件不提供插槽。

## 样式自定义

Footer 组件使用 UnoCSS 类名，支持通过主题配置自定义样式。主要样式类：

- 容器：`mx-auto container !max-w-screen-2xl px-6`
- 文本：`text-center text-sm text-gray-600 dark:text-gray-400`
- 内边距：`px-6 pb-9 sm:(px-6 pb-18)`

如果需要自定义内容，可以通过 CSS 覆盖或修改组件源码。

## 最佳实践

1. **布局位置**：Footer 通常放在页面最底部，使用 flexbox 布局确保它始终在底部
2. **内容更新**：如需修改版权信息，直接编辑组件源码
3. **样式定制**：通过主题配置或 CSS 覆盖来匹配你的设计系统

## 注意事项

- Footer 组件内容固定为 "MIT Licensed | Copyright © 2025-Present Cesar.Studio"
- 如需自定义内容，需要修改组件源码或使用 CSS 覆盖
- 组件会自动适配暗色模式，文本颜色会根据主题自动调整

