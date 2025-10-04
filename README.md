# Sectum UI

<div align="center">
  <img src="https://img.shields.io/badge/Version-0.1.2-blue?style=for-the-badge" alt="Version" />
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
- 🌈 **动态主题** - 运行时动态生成 CSS 变量，支持多主题切换
- 🌙 **深色模式** - 内置深色模式支持，可动态切换
- 🌍 **国际化** - 内置多语言支持
- 💾 **存储工具** - 内置 localStorage、sessionStorage、Cookie 管理工具
- 🔄 **路由集成** - 与 Vue Router 无缝集成，支持路由跳转回调

## 📦 安装

```bash
# npm
npm install sectum

# yarn
yarn add sectum

# pnpm
pnpm add sectum
```

## 🔧 环境要求

- Vue 3.0+
- Node.js 16.0+ (必需)
- TypeScript 4.5+ (必需)
- UnoCSS 0.50+

> **注意**: 由于组件库使用了动态主题生成功能，用户项目必须是 Node.js 和 TypeScript 环境。

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install sectum unocss vue@^3.0.0 vue-router@^4.0.0 vue-i18n@^11.0.0
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

#### 方法一：使用 sectum 提供的配置（推荐）

创建 `uno.config.ts`：

```typescript
import { defineConfig } from 'unocss'
import { sectumUnoConfig } from 'sectum'

export default defineConfig({
  presets: [
    presetUno(),
    ...sectumUnoConfig.presets
  ],
  rules: [
    ...sectumUnoConfig.rules,
    // 你的自定义规则
  ],
  safelist: [
    ...sectumUnoConfig.safelist,
    // 你的其他类名
  ],
  theme: {
    ...sectumUnoConfig.theme,
    // 你的主题扩展
  }
})
```

#### 方法二：复制配置文件

将 `node_modules/sectum/dist/sectum-uno.config.ts` 复制到你的项目根目录，重命名为 `uno.config.ts`：

```bash
cp node_modules/sectum/dist/sectum-uno.config.ts uno.config.ts
```

#### 方法三：手动配置

如果你需要自定义配置，可以参考以下配置：

```javascript
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno()
  ],
  rules: [
    // 支持 sectum 组件的 CSS 变量
    [/^bg-(primary|secondary|success|warning|error)$/, ([, color]) => {
      return { 'background-color': `var(--${color})` }
    }],
    [/^text-(primary|secondary|success|warning|error)-content$/, ([, color]) => {
      return { 'color': `var(--${color}-content)` }
    }],
    [/^border-(primary|secondary|success|warning|error)$/, ([, color]) => {
      return { 'border-color': `var(--${color})` }
    }],
    [/^bg-base-(\d+)$/, ([, num]) => {
      return { 'background-color': `var(--base-${num})` }
    }],
    [/^text-base-content$/, () => {
      return { 'color': `var(--base-content)` }
    }]
  ],
  safelist: [
    // 确保 sectum 组件相关的类名被生成
    'bg-primary', 'bg-secondary', 'bg-success', 'bg-warning', 'bg-error',
    'text-primary-content', 'text-secondary-content', 'text-success-content',
    'text-warning-content', 'text-error-content', 'text-base-content',
    'border-primary', 'border-secondary', 'border-success', 'border-warning', 'border-error',
    'bg-base-100', 'bg-base-200', 'bg-base-300'
  ]
})
```

### 3. 引入样式

在你的 `main.js` 中引入样式：

```javascript
import 'sectum/dist/style.css'
import 'uno.css'  // 引入 UnoCSS
```

### 4. 使用组件

#### 全局引入

```javascript
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import Sectum, { Store, setRouterPushCallback } from 'sectum'
import 'sectum/dist/style.css'
import 'uno.css'
import App from './App.vue'

// 配置路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/Home.vue') }
  ]
})

// 配置国际化
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

// 设置路由跳转回调（用于组件库内部的路由跳转）
setRouterPushCallback((path) => {
  router.push(path)
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

#### 按需引入

```javascript
import { createApp } from 'vue'
import { 
  Button, Input, Header, Sidebar, 
  ThemeSelect, DarkChange, LanguageSelect,
  Store, setRouterPushCallback 
} from 'sectum'
import App from './App.vue'

const app = createApp(App)

// 注册组件
app.component('Button', Button)
app.component('Input', Input)
app.component('Header', Header)
app.component('Sidebar', Sidebar)
app.component('ThemeSelect', ThemeSelect)
app.component('DarkChange', DarkChange)
app.component('LanguageSelect', LanguageSelect)

// 设置全局工具
if (typeof window !== 'undefined') {
  window.Store = Store
}

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
| Markdown       | `Markdown`       | Markdown 渲染组件 |
| Catalog        | `Catalog`        | 目录组件         |
| FullScreen     | `FullScreen`     | 全屏组件         |

### 工具函数
内置工具函数，提供常用功能。

| 函数/类        | 描述                     |
| -------------- | ------------------------ |
| `Store`        | 存储工具类（localStorage、sessionStorage、Cookie） |
| `setRouterPushCallback` | 设置路由跳转回调函数 |

## 📖 使用示例

### 基础按钮

```vue
<template>
  <div>
    <btn>默认按钮</btn>
    <btn color="primary">主要按钮</btn>
    <btn color="secondary">次要按钮</btn>
    <btn color="outline">轮廓按钮</btn>
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

### 存储工具使用

```vue
<template>
  <div>
    <btn @click="saveData">保存数据</btn>
    <btn @click="loadData">加载数据</btn>
    <btn @click="clearData">清除数据</btn>
    <p>当前数据: {{ data }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Store } from 'sectum'

const data = ref('')

const saveData = () => {
  Store.setLocalStorage('myData', { message: 'Hello World', timestamp: Date.now() })
  data.value = '数据已保存'
}

const loadData = () => {
  const saved = Store.getLocalStorage('myData')
  data.value = saved ? JSON.stringify(saved) : '没有数据'
}

const clearData = () => {
  Store.removeLocalStorage('myData')
  data.value = '数据已清除'
}
</script>
```

### 路由集成

```vue
<template>
  <div>
    <Header 
      project-name="My App"
      :theme-component="ThemeSelect"
      :dark-component="DarkChange"
      :language-component="LanguageSelect"
      :on-navigate="handleNavigate"
    />
    <div class="flex">
      <Sidebar :routes="routes" :on-navigate="handleNavigate" />
      <main class="flex-1">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { Header, Sidebar, ThemeSelect, DarkChange, LanguageSelect } from 'sectum'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleNavigate = (path) => {
  router.push(path)
}

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

## 🎯 高级用法

### 动态主题系统

Sectum 内置了动态主题系统，支持运行时主题切换：

```javascript
// 主题会自动注入到页面中，无需额外配置
// 支持的主题：blue, teal, rose, violet, orange
// 深色模式会自动应用对应的深色主题变量
```

### 存储工具高级用法

```javascript
import { Store } from 'sectum'

// localStorage 操作
Store.setLocalStorage('user', { name: 'John', age: 30 })
const user = Store.getLocalStorage('user')
Store.removeLocalStorage('user')

// sessionStorage 操作
Store.setSessionStorage('temp', 'temporary data')
const temp = Store.getSessionStorage('temp')

// Cookie 操作
Store.setCookie('token', 'abc123', 24) // 24小时过期
const token = Store.getCookie('token')
Store.removeCookie('token')
```

### 组件属性配置

许多组件支持通过 props 进行灵活配置：

```vue
<template>
  <Header 
    project-name="自定义项目名"
    :theme-component="CustomThemeComponent"
    :dark-component="CustomDarkComponent"
    :language-component="CustomLanguageComponent"
    :on-navigate="handleNavigate"
    user-link="/custom-profile"
  />
  <Sidebar 
    :routes="customRoutes" 
    :on-navigate="handleNavigate"
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