# Sectum UI

<div align="center">
  <img src="https://img.shields.io/badge/Vue-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/UnoCSS-66.x-333333?style=for-the-badge&logo=unocss&logoColor=white" alt="UnoCSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</div>

<div align="center">
  <h3>一个现代化的 Vue 3 组件库</h3>
  <p>基于 UnoCSS 构建，提供美观、响应式、可访问的 UI 组件</p>
</div>

## ✨ 特性

- 🎨 **现代化设计** - 基于 UnoCSS 的原子化 CSS 框架
- 📱 **响应式** - 完美适配各种屏幕尺寸
- ♿ **可访问性** - 遵循 WAI-ARIA 标准
- 🚀 **高性能** - 基于 Vue 3 Composition API
- 📦 **Tree-shaking** - 支持按需引入
- 🔧 **TypeScript** - 完整的类型定义
- 🎯 **灵活配置** - 支持主题定制和组件属性配置
- 📚 **丰富组件** - 包含 Element、Section、Model、Pattern、Layout 五大类组件

## 📦 安装

```bash
# npm
npm install sectum

# yarn
yarn add sectum

# pnpm
pnpm add sectum
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install sectum unocss vue@^3.0.0
```

### 2. 配置 UnoCSS

在你的 `vite.config.js` 中配置 UnoCSS：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS()
  ]
})
```

创建 `uno.config.js`：

```javascript
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno()
  ]
})
```

### 3. 引入样式

在你的 `main.js` 中引入样式：

```javascript
import 'sectum/dist/style.css'
```

### 4. 使用组件

#### 全局引入

```javascript
import { createApp } from 'vue'
import Sectum from 'sectum'
import App from './App.vue'

const app = createApp(App)
app.use(Sectum)
app.mount('#app')
```

#### 按需引入

```javascript
import { createApp } from 'vue'
import { Button, Input, Header, Sidebar } from 'sectum'
import App from './App.vue'

const app = createApp(App)
app.component('Button', Button)
app.component('Input', Input)
app.component('Header', Header)
app.component('Sidebar', Sidebar)
app.mount('#app')
```

## 🎨 组件分类

### Element 组件
基础 UI 元素，提供最常用的交互组件。

| 组件       | 标签名 | 描述         |
| ---------- | ------ | ------------ |
| Button     | `btn`  | 按钮组件     |
| Input      | `ipt`  | 输入框组件   |
| Checkbox   | `ckb`  | 复选框组件   |
| Toggle     | `tgl`  | 开关组件     |
| Icon       | `icn`  | 图标组件     |
| Label      | `lab`  | 标签组件     |
| Textarea   | `txa`  | 文本域组件   |
| Backdrop   | `bkd`  | 背景遮罩组件 |
| Transition | `tst`  | 过渡动画组件 |

### Section 组件
复合组件，提供更复杂的 UI 功能。

| 组件        | 标签名        | 描述           |
| ----------- | ------------- | -------------- |
| ButtonGroup | `ButtonGroup` | 按钮组组件     |
| Menu        | `Menu`        | 菜单组件       |
| Dropdown    | `Dropdown`    | 下拉菜单组件   |
| Modal       | `Modal`       | 模态框组件     |
| Drawer      | `Drawer`      | 抽屉组件       |
| Table       | `Table`       | 表格组件       |
| Form        | `Form`        | 表单组件       |
| FormItem    | `FormItem`    | 表单项组件     |
| Select      | `Select`      | 选择器组件     |
| Date        | `Date`        | 日期选择器组件 |
| Tabs        | `Tabs`        | 标签页组件     |
| TabPane     | `TabPane`     | 标签页面板组件 |
| Upload      | `Upload`      | 上传组件       |
| File        | `File`        | 文件组件       |

### Layout 组件
布局组件，提供页面结构。

| 组件    | 标签名    | 描述       |
| ------- | --------- | ---------- |
| Header  | `Header`  | 头部组件   |
| Sidebar | `Sidebar` | 侧边栏组件 |

### Pattern 组件
模式组件，提供特定功能模式。

| 组件           | 标签名           | 描述             |
| -------------- | ---------------- | ---------------- |
| ThemeSelect    | `ThemeSelect`    | 主题选择组件     |
| LanguageSelect | `LanguageSelect` | 语言选择组件     |
| DarkChange     | `DarkChange`     | 深色模式切换组件 |

## 📖 使用示例

### 基础按钮

```vue
<template>
  <div>
    <btn>默认按钮</btn>
    <btn variant="primary">主要按钮</btn>
    <btn variant="secondary">次要按钮</btn>
    <btn variant="outline">轮廓按钮</btn>
  </div>
</template>
```

### 表单组件

```vue
<template>
  <Form>
    <FormItem>
      <ipt v-model="username" placeholder="请输入用户名" />
    </FormItem>
    <FormItem>
      <txa v-model="description" placeholder="请输入描述" />
    </FormItem>
    <FormItem>
      <btn @click="submit">提交</btn>
    </FormItem>
  </Form>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const description = ref('')

const submit = () => {
  console.log('提交表单', { username: username.value, description: description.value })
}
</script>
```

### 布局组件

```vue
<template>
  <div class="min-h-screen">
    <Header 
      project-name="My App"
      :theme-component="ThemeSelect"
      :dark-component="DarkChange"
      :language-component="LanguageSelect"
      user-link="/profile"
    />
    <div class="flex">
      <Sidebar :routes="routes" />
      <main class="flex-1">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { Header, Sidebar, ThemeSelect, DarkChange, LanguageSelect } from 'sectum'

const routes = [
  {
    path: '/',
    meta: { title: '首页' },
    children: [
      {
        path: '/dashboard',
        meta: { title: '仪表盘' }
      }
    ]
  }
]
</script>
```

### 主题定制

```vue
<template>
  <div>
    <ThemeSelect />
    <DarkChange />
    <LanguageSelect />
  </div>
</template>
```

## 🎯 高级用法

### 组件属性配置

许多组件支持通过 props 进行灵活配置：

```vue
<template>
  <Header 
    project-name="自定义项目名"
    :theme-component="CustomThemeComponent"
    :dark-component="CustomDarkComponent"
    :language-component="CustomLanguageComponent"
    user-link="/custom-profile"
  />
</template>
```

### 路由配置

Sidebar 组件支持自定义路由配置：

```javascript
const routes = [
  {
    path: '/',
    meta: { title: '首页' },
    children: [
      {
        path: '/dashboard',
        component: () => import('./Dashboard.vue'),
        meta: { title: '仪表盘' }
      },
      {
        path: '/settings',
        meta: { title: '设置' },
        children: [
          {
            path: '/settings/profile',
            component: () => import('./Profile.vue'),
            meta: { title: '个人资料' }
          }
        ]
      }
    ]
  }
]
```

## 🔧 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/sorcecloud/sectum.git

# 进入目录
cd sectum

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建组件库

```bash
# 构建组件库
npm run build:lib

# 预览构建结果
npm run preview
```

### 发布

```bash
# 发布补丁版本
npm run publish:patch

# 发布次要版本
npm run publish:minor

# 发布主要版本
npm run publish:major
```

## 📄 许可证

[MIT License](LICENSE)

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](CONTRIBUTING.md) 了解详细信息。

## 📞 支持

- 📧 邮箱：contact@cesar.studio
- 🐛 问题反馈：[GitHub Issues](https://github.com/sorcecloud/sectum/issues)
- 💬 讨论：[GitHub Discussions](https://github.com/sorcecloud/sectum/discussions)

## 🙏 致谢

感谢以下开源项目的支持：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [UnoCSS](https://unocss.dev/) - 即时原子化 CSS 引擎
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

---

<div align="center">
  <p>由 <a href="https://cesar.studio">Cesar.Studio</a> 开发</p>
</div>