# Sectum UI

<div align="center">
  <img src="https://img.shields.io/badge/Version-0.3.8-blue?style=for-the-badge" alt="Version" />
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
- 🛠️ **自动修复** - 自动处理 UnoCSS 在浏览器环境中的 process 对象问题
- 📦 **自动资源加载** - 内置 Vite 插件，自动加载 icon.js，无需手动配置

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

### 2. 配置 Vite

在你的 `vite.config.ts` 中配置 UnoCSS 和 Icon 加载插件：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { UnoConfig, sectumIconLoader } from 'sectum'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(UnoConfig),
    sectumIconLoader()  // 自动加载 icon.js（推荐）
  ]
})
```

> **💡 自动加载 icon.js**
>
> `sectumIconLoader()` 插件会自动将 `/icon.js` 请求映射到 `node_modules/sectum/lib/icon.js`，无需手动复制文件。开发环境自动服务，生产构建时自动复制到 `dist` 目录。

#### 方法一：使用 sectum 提供的配置（推荐）

创建 `uno.config.ts`：

```typescript
import { defineConfig } from 'unocss'
import { UnoConfig } from 'sectum'

export default defineConfig({
  ...UnoConfig,
  // 你的自定义配置
})
```

> **💡 自动处理 process 对象**
> 
> sectum 组件库已经内置了 `process` 对象的自动定义，解决了 UnoCSS 在浏览器环境中的 `process is not defined` 错误。你不需要在项目中手动配置 `define` 或安装额外的 polyfill 插件，组件库会在初始化时自动处理这个问题。

#### 方法二：复制配置文件

将 `node_modules/sectum/dist/uno.config.ts` 复制到你的项目根目录，然后根据需要修改：

```bash
cp node_modules/sectum/dist/uno.config.ts uno.config.ts
```

然后你可以直接使用或修改这个配置文件。

### 3. 引入样式

在你的 `main.ts` 中引入样式：

```typescript
import 'sectum/dist/style.css'
import 'uno.css'  // 引入 UnoCSS
```

### 4. 使用组件

#### 全局引入

```typescript
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

```typescript
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

| 组件           | 标签名           | 描述              |
| -------------- | ---------------- | ----------------- |
| ThemeSelect    | `ThemeSelect`    | 主题选择组件      |
| LanguageSelect | `LanguageSelect` | 语言选择组件      |
| DarkChange     | `DarkChange`     | 深色模式切换组件  |
| Markdown       | `Markdown`       | Markdown 渲染组件 |
| Catalog        | `Catalog`        | 目录组件          |
| FullScreen     | `FullScreen`     | 全屏组件          |

### 工具函数
内置工具函数，提供常用功能。

| 函数/类                 | 描述                                               |
| ----------------------- | -------------------------------------------------- |
| `Store`                 | 存储工具类（localStorage、sessionStorage、Cookie） |
| `setRouterPushCallback` | 设置路由跳转回调函数                               |

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
      logo-icon="section"
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

<script setup lang="ts">
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

<script setup lang="ts">
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

```typescript
// 主题会自动注入到页面中，无需额外配置
// 支持的主题：blue, teal, rose, violet, orange
// 深色模式会自动应用对应的深色主题变量
```

### 存储工具高级用法

```typescript
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
    logo-icon="section"
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

<script setup lang="ts">
// 你的组件逻辑
</script>
```

### 路由配置

Sidebar 组件支持自定义路由配置：

```typescript
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

## ⚙️ 项目配置 (config.ts)

`config.ts` 文件用于统一管理项目的基本信息和展示内容。本文档说明如何在项目中使用这些配置。

### 配置结构

配置文件包含以下部分：

- **project**: 项目基本信息（名称、描述、版本等）
- **carousel**: 轮播图配置（自动播放、间隔、轮播图数据等）
- **footer**: 页脚配置（版权持有者、备案号、额外信息等）
- **user**: 用户配置（用户中心链接等）

### 使用方法

#### 1. 在主布局组件中使用（index.vue）

在主布局组件中，可以这样使用配置：

```vue
<template>
  <div>
    <Header 
      :project-name="config.project.name"
      :icon-buttons="iconButtons"
    />
    <Footer 
      :copyright-holder="config.footer.copyrightHolder"
      :additional-info="config.footer.additionalInfo"
    />
  </div>
</template>

<script setup lang="ts">
import { Header, Footer } from 'sectum'
import config from '~/config/config'

// 图标按钮配置（从 config 中读取用户链接）
const iconButtons = [
  {
    link: config.user.profileLink,
    icon: 'user',
    light: true,
    brand: false
  },
  {
    link: 'https://github.com/Sorcech/Sectum',
    icon: 'github',
    light: false,
    brand: true
  }
]
</script>
```

#### 2. 在首页组件中使用轮播图配置（HomePage.vue）

如果需要在首页使用轮播图，可以这样配置：

```vue
<template>
  <div class="space-y-0">
    <!-- Hero 轮播图区域 -->
    <section class="mb-16">
      <Carousel 
        :autoplay="config.carousel.autoplay" 
        :interval="config.carousel.interval"
        :pause-on-hover="config.carousel.pauseOnHover"
        :height="config.carousel.height"
        class="rounded-lg overflow-hidden"
      >
        <div 
          v-for="(slide, index) in heroSlides" 
          :key="index"
          class="relative h-full flex items-center justify-center bg-gradient-to-r from-primary/90 to-secondary/90"
          :style="slide.image ? { backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
        >
          <div class="absolute inset-0 bg-black/20"></div>
          <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h2 class="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              {{ t(slide.title) }}
            </h2>
            <p class="text-xl md:text-2xl text-white/90 mb-8">
              {{ t(slide.description) }}
            </p>
            <btn 
              v-if="slide.link"
              color="primary" 
              size="lg"
              class="text-lg px-8 py-3"
              @click="router.push(slide.link)"
            >
              {{ t('home.learnMore') }}
            </btn>
          </div>
        </div>
      </Carousel>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Carousel } from '~/packet/Section/Carousel/Carousel.vue'
import config from '~/config/config'

const { t } = useI18n()
const router = useRouter()

// Hero 轮播图数据（从配置文件读取）
const heroSlides = computed(() => config.carousel.slides)
</script>
```

#### 3. 在其他组件中使用项目信息

```vue
<script setup lang="ts">
import config from '~/config/config'

// 使用项目名称
console.log(config.project.name) // 'Sectum'

// 使用项目描述
console.log(config.project.description) // 'A modern Vue 3 component library...'

// 使用项目版本
console.log(config.project.version) // '0.2.10'
</script>
```

### 配置项说明

#### ProjectInfo（项目信息）

- `name`: 项目名称，用于 Header 组件的 `project-name` 属性
- `description`: 项目描述
- `version`: 项目版本号
- `homepage`: 项目主页地址
- `author`: 作者名称
- `keywords`: 项目关键词数组
- `license`: 许可证类型

#### CarouselConfig（轮播图配置）

- `autoplay`: 是否自动播放（boolean）
- `interval`: 自动播放间隔（毫秒，number）
- `pauseOnHover`: 鼠标悬停时是否暂停（boolean）
- `height`: 轮播图高度（CSS 字符串，如 '600px'）
- `slides`: 轮播图数据数组，每个元素包含：
  - `image`: 图片链接
  - `title`: 标题（支持国际化 key）
  - `description`: 描述（支持国际化 key）
  - `link`: 链接（可选，string | null）

#### FooterConfig（页脚配置）

- `copyrightHolder`: 版权持有者名称，用于 Footer 组件的 `copyright-holder` 属性
- `icpNumber`: ICP 备案号
- `additionalInfo`: 额外信息，用于 Footer 组件的 `additional-info` 属性

#### UserConfig（用户配置）

- `profileLink`: 用户中心链接，用于 Header 组件的图标按钮配置

### 注意事项

1. **国际化支持**: 轮播图的 `title` 和 `description` 支持国际化 key，需要在 `locale` 文件中定义对应的翻译
2. **类型安全**: 所有配置项都有完整的 TypeScript 类型定义，确保类型安全
3. **统一管理**: 所有项目相关的配置都应该在 `config.ts` 中统一管理，避免硬编码
4. **版本同步**: 项目版本号应该与 `package.json` 中的版本号保持一致

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

### package.json
- dev: vite --port 3000 --open
  - 启动本地开发服务器，端口 3000，启动后自动在浏览器打开。
- dev:http: vite --host localhost --port 3000
  - 启动 HTTP 开发服务器，显式绑定到 localhost:3000（便于网络/Host 相关调试）。
- dev:https: cross-env VITE_HTTPS=true vite --host localhost --port 3000
  - 通过环境变量 VITE_HTTPS=true 启动 HTTPS 开发服务器，主机 localhost，端口 3000。
- dev:secure: vite --https --host localhost --port 3000
  - 使用 Vite 自带的 --https 开关启动 HTTPS 开发服务器（与上面等价但不依赖环境变量）。
- build: rimraf dist && vite build
  - 先用 rimraf 删除旧的 dist（跨平台 rm -rf），再执行 Vite 生产构建，产出打包文件到 dist/。
- preview: vite preview
  - 以“生产模式”预览 dist（启动本地静态服务器查看打包结果）。
- prepublishOnly: npm run build:lib
  - 在执行 npm publish 之前自动触发（npm 的发布前钩子）。这里会调用库打包命令（需在项目里实现 build:lib 脚本）。
- publish:patch: npm version patch && npm publish
  - 版本号自增补丁位（x.y.z → x.y.(z+1)），打标签并提交，然后发布到 npm。
- publish:minor: npm version minor && npm publish
  - 版本号自增次要位（x.y.z → x.(y+1).0），然后发布到 npm。
- publish:major: npm version major && npm publish
  - 版本号自增主要位（x.y.z → (x+1).0.0），然后发布到 npm。

## ❓ 常见问题

### Q: Icon 组件无法显示（Failed to load FontAwesome）？

**A:** 如果遇到 `Failed to load FontAwesome` 错误，请确保：

1. **使用 sectumIconLoader 插件（推荐）**
   
   在 `vite.config.ts` 中添加插件：
   
   ```typescript
   import { sectumIconLoader } from 'sectum'
   
   export default defineConfig({
     plugins: [
       // ... 其他插件
       sectumIconLoader()
     ]
   })
   ```
   
   该插件会自动将 `/icon.js` 请求映射到 `node_modules/sectum/lib/icon.js`，无需手动复制文件。

2. **手动配置（备选方案）**
   
   如果不想使用插件，可以手动将 `node_modules/sectum/lib/icon.js` 复制到项目的 `public` 目录。

3. **检查路径**
   
   确保 Icon 组件能够访问到 `/icon.js` 路径（开发环境或生产环境的 `dist/icon.js`）。

### Q: Icon 组件重复注册警告？

**A:** 如果看到 `Component "icn" has already been registered` 警告，说明 Icon 组件被重复注册了。Sectum 插件已经自动注册了 `icn` 组件，无需在 `main.ts` 中手动注册：

```typescript
// ❌ 不需要这样做
import { Icon } from 'sectum'
app.component('icn', Icon)

// ✅ Sectum 插件已自动注册
app.use(Sectum)  // 这已经包含了 Icon 组件的注册
```

### Q: 出现 `process is not defined` 错误怎么办？

**A:** sectum 组件库已经内置了 process 对象的自动定义，无需手动配置。如果仍然出现此错误，请确保：

1. 使用的是最新版本的 sectum
2. 正确导入了组件库的 CSS 文件
3. 在 `main.ts` 中正确调用了 `app.use(Sectum)`

### Q: 主题切换不生效怎么办？

**A:** 请确保：

1. 正确导入了 `sectum/dist/style.css`
2. 在 UnoCSS 配置中使用了 `UnoConfig` 或 sectum 的主题预设
3. 组件使用了正确的 CSS 类名（如 `bg-primary`、`text-primary` 等）

### Q: 组件样式显示异常怎么办？

**A:** 请检查：

1. UnoCSS 是否正确配置
2. 是否导入了必要的 CSS 文件
3. 浏览器开发者工具中是否有 CSS 加载错误

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