# 快速开始

在开始使用 Sectum 之前，请确保你的项目满足以下要求：

👉 **前置条件**
- [Vue 3](https://vuejs.org) (^3.0.0)
- [UnoCSS](https://unocss.dev) (^0.50.0)
- [Vue Router](https://router.vuejs.org) (^4.0.0) - 可选，仅在使用路由相关组件时需要
- [Vue I18n](https://vue-i18n.intlify.dev) (^11.0.0) - 可选，仅在使用国际化功能时需要

> **注意**: 由于组件库使用了动态主题生成功能，你的项目必须是 Node.js 和 TypeScript 环境。

## 安装

使用 npm、yarn 或 pnpm 安装 Sectum：

```bash
# npm
npm install sectum unocss vue@^3.0.0 vue-router@^4.0.0 vue-i18n@^11.0.0

# yarn
yarn add sectum unocss vue@^3.0.0 vue-router@^4.0.0 vue-i18n@^11.0.0

# pnpm
pnpm add sectum unocss vue@^3.0.0 vue-router@^4.0.0 vue-i18n@^11.0.0
```

## 配置

### 1. 配置 UnoCSS

Sectum 需要 UnoCSS 才能正常工作。你有两种方式配置 UnoCSS：

#### 方法一：使用 Sectum 提供的配置（推荐）

在你的项目根目录创建 `uno.config.ts` 文件：

```typescript
import { defineConfig } from 'unocss'
import { UnoConfig } from 'sectum/dist/uno.config'

export default defineConfig({
  ...UnoConfig,
  // 你可以在这里添加自己的自定义配置
})
```

#### 方法二：复制配置文件

将 Sectum 提供的配置文件复制到你的项目根目录：

```bash
cp node_modules/sectum/dist/uno.config.ts uno.config.ts
```

然后根据需要进行修改。

### 2. 配置 Vite

在你的 `vite.config.ts` 中引入 UnoCSS 插件和 Icon 加载插件：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { UnoConfig, sectumIconLoader } from 'sectum'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(UnoConfig),  // 或 UnoCSS()，如果你已经创建了 uno.config.ts
    sectumIconLoader()  // 自动加载 icon.js（推荐）
  ]
})
```

> **💡 自动处理 process 对象**
>
> Sectum 组件库已经内置了 `process` 对象的自动定义，解决了 UnoCSS 在浏览器环境中的 `process is not defined` 错误。你不需要在项目中手动配置 `define` 或安装额外的 polyfill 插件。

> **💡 自动加载 icon.js**
>
> `sectumIconLoader()` 插件会自动将 `/icon.js` 请求映射到 `node_modules/sectum/lib/icon.js`，无需手动复制文件到 `public` 目录。该插件在开发环境和生产构建时都会自动工作。

### 3. 引入样式

在你的 `main.ts` 或 `main.js` 文件中引入样式（**必须**在 UnoCSS 样式之前引入）：

```typescript
import { createApp } from 'vue'
import Sectum from 'sectum'
import 'sectum/dist/style.css'  // Sectum 样式
import 'uno.css'               // UnoCSS 样式
import App from './App.vue'

const app = createApp(App)
app.use(Sectum)
app.mount('#app')
```

## 使用组件

### 全局引入（推荐）

```typescript
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import Sectum, { Store } from 'sectum'
import 'sectum/dist/style.css'
import 'uno.css'
import App from './App.vue'

// 配置路由（如果使用路由组件）
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/Home.vue') }
  ]
})

// 配置国际化（如果使用国际化功能）
const i18n = createI18n({
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  legacy: false,
  messages: {
    'zh-CN': {
      theme: {
        blue: '蓝色',
        teal: '青色',
        rose: '玫瑰色',
        violet: '紫色',
        orange: '橙色'
      }
    },
    'en-US': {
      theme: {
        blue: 'Blue',
        teal: 'Teal',
        rose: 'Rose',
        violet: 'Violet',
        orange: 'Orange'
      }
    }
  }
})

// 创建全局对象供组件库使用
if (typeof window !== 'undefined') {
  window.Store = Store
  window.I18n = i18n
}

const app = createApp(App)
app.use(i18n)
app.use(Sectum)
app.use(router)
app.mount('#app')
```

### 按需引入

如果你只想使用部分组件，可以按需引入：

```typescript
import { createApp } from 'vue'
import { 
  Button, Input, Header, Sidebar, 
  ThemeSelect, DarkToggle, LanguageSelect,
  Store
} from 'sectum'
import 'sectum/dist/style.css'
import 'uno.css'
import App from './App.vue'

const app = createApp(App)

// 注册需要的组件
app.component('Button', Button)
app.component('Input', Input)
app.component('Header', Header)
app.component('Sidebar', Sidebar)
app.component('ThemeSelect', ThemeSelect)
app.component('DarkToggle', DarkToggle)
app.component('LanguageSelect', LanguageSelect)

// 设置全局工具（如果需要）
if (typeof window !== 'undefined') {
  window.Store = Store
}

app.mount('#app')
```

## 基本使用示例

配置完成后，你就可以在 Vue 组件中使用 Sectum 组件了：

```vue
<template>
  <div class="p-5">
    <btn color="primary" size="lg">点击我</btn>
    <ipt placeholder="请输入内容" />
    <Header 
      project-name="我的项目"
      :theme-component="ThemeSelect"
      :dark-component="DarkToggle"
    />
  </div>
</template>

<script setup lang="ts">
import { Header, ThemeSelect, DarkToggle } from 'sectum'
</script>
```

## 下一步

- 查看 [主题配置](./theme.md) 了解如何自定义主题
- 查看 [组件使用](./usage.md) 了解各组件的详细用法
- 查看 [颜色系统](./color.md) 了解如何使用主题颜色

## 常见问题

### 样式没有生效？

1. 确保已正确引入 `sectum/dist/style.css` 和 `uno.css`
2. 检查 UnoCSS 配置是否正确
3. 确认 `uno.css` 在 `sectum/dist/style.css` **之后**引入

### process is not defined 错误？

Sectum 已经内置了 `process` 对象的处理，如果你仍然遇到此错误，请确保：
1. 使用 Sectum 提供的 UnoConfig
2. 或确保你的项目中已定义 `process` 对象

### 主题颜色不生效？

确保你使用的是 UnoCSS 类名（如 `text-primary`、`bg-primary`），而不是直接的 CSS 属性。这些类名会从 CSS 变量中读取主题颜色。

### 组件未注册？

确保你已经调用 `app.use(Sectum)` 或在组件中正确导入了需要的组件。

### Icon 组件无法显示（Failed to load FontAwesome）？

1. 确保已在 `vite.config.ts` 中添加 `sectumIconLoader()` 插件
2. 或者在项目的 `public` 目录中手动放置 `icon.js` 文件
3. 检查浏览器控制台是否有相关错误信息
