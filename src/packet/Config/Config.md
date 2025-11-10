# 配置系统文档

本文档介绍 Sectum 项目中的配置系统，包括项目配置、Favicon 管理、存储工具、UnoCSS 配置和 Vite 插件等。

## 目录

- [项目配置 (config.ts)](#项目配置-configts)
- [Favicon 管理 (favicon.ts)](#favicon-管理-faviconts)
- [存储工具 (storage.ts)](#存储工具-storagets)
- [UnoCSS 配置 (uno.config.ts)](#unocss-配置-unoconfigts)
- [Vite 图标加载插件 (vite-icon-plugin.ts)](#vite-图标加载插件-vite-icon-plugints)
- [配置导出 (index.ts)](#配置导出-indexts)

---

## 项目配置 (config.ts)

项目配置文件位于 `src/config/config.ts`，用于统一管理项目的基本信息和展示内容。

### 配置结构

```typescript
interface AppConfig {
  project: ProjectInfo      // 项目基本信息
  carousel: CarouselConfig  // 轮播图配置
  footer: FooterConfig      // 页脚配置
  user: UserConfig          // 用户链接配置
}
```

### 项目基本信息 (project)

```typescript
project: {
  name: string           // 项目名称
  description: string    // 项目描述
  version: string        // 项目版本
  homepage: string      // 项目主页
  author: string        // 作者
  keywords: string[]    // 关键词
  license: string       // 许可证
  logoIcon?: string     // Logo 图标名称（FontAwesome 图标名），用于设置 favicon
}
```

### 使用示例

```typescript
// src/config/config.ts
import type { AppConfig } from '~/type'

const config: AppConfig = {
  project: {
    name: 'Sectum',
    description: 'A modern Vue 3 component library',
    version: '0.2.10',
    homepage: 'github.com/Sorcech/Sectum',
    author: 'Cesar.Studio',
    keywords: ['vue3', 'unocss', 'component-library'],
    license: 'MIT',
    logoIcon: 'section'  // FontAwesome 图标名
  },
  carousel: {
    autoplay: true,
    interval: 5000,
    pauseOnHover: true,
    height: '600px',
    slides: [
      {
        image: 'https://example.com/banner1.jpg',
        title: 'home.hero1.title',
        description: 'home.hero1.description',
        link: null
      }
    ]
  },
  footer: {
    copyrightHolder: 'Cesar.Studio',
    icpNumber: '京ICP备XXXXXXXX号',
    additionalInfo: 'MIT Licensed | Copyright © 2025-Present'
  },
  user: {
    profileLink: '/login'
  }
}

export default config
```

### 在组件中使用

```typescript
import config from '~/config/config'

// 获取项目名称
const projectName = config.project.name

// 获取 Logo 图标
const logoIcon = config.project.logoIcon

// 获取轮播图配置
const carouselConfig = config.carousel
```

---

## Favicon 管理 (favicon.ts)

动态 Favicon 管理模块位于 `src/packet/Config/favicon.ts`，用于根据配置的图标名称自动设置页面 favicon。

### 功能特性

- ✅ 自动从全局配置读取 `logoIcon` 并设置 favicon
- ✅ 支持 FontAwesome 图标（solid、regular、light、brand 等样式）
- ✅ 动态生成 SVG favicon，无需静态文件
- ✅ 独立于组件，应用启动时自动初始化

### API 接口

#### `FaviconConfig`

```typescript
interface FaviconConfig {
  iconName?: string   // 图标名称（FontAwesome 图标名）
  iconPrefix?: string  // 图标前缀，默认 'fas' (solid)
  size?: number       // 图标尺寸，默认 32
}
```

#### `setFavicon(config: FaviconConfig): Promise<void>`

设置 favicon。

```typescript
import { setFavicon } from '~/packet/Config/favicon'

// 设置 favicon
await setFavicon({
  iconName: 'section',
  iconPrefix: 'fas',
  size: 32
})
```

#### `initFavicon(): void`

从全局配置中初始化 favicon（自动读取 `config.project.logoIcon`）。

```typescript
import { initFavicon } from '~/packet/Config/favicon'

// 在 main.ts 中调用
initFavicon()
```

#### `initFaviconFromConfig(config: FaviconConfig): void`

从配置对象中初始化 favicon。

```typescript
import { initFaviconFromConfig } from '~/packet/Config/favicon'

initFaviconFromConfig({
  iconName: 'user',
  iconPrefix: 'far',  // regular 样式
  size: 32
})
```

### 使用示例

#### 方式一：自动初始化（推荐）

在 `main.ts` 中调用 `initFavicon()`，会自动从 `config.ts` 读取 `logoIcon`：

```typescript
// src/main.ts
import { initFavicon } from './packet/Config/favicon'

// 初始化 favicon（从配置中读取）
initFavicon()

createApp(App).use(Router).use(Sectum).use(I18n).mount('#app')
```

确保在 `config.ts` 中配置了 `logoIcon`：

```typescript
// src/config/config.ts
const config: AppConfig = {
  project: {
    // ... 其他配置
    logoIcon: 'section'  // FontAwesome 图标名
  }
}
```

#### 方式二：手动设置

```typescript
import { setFavicon } from '~/packet/Config/favicon'

// 在组件中动态设置
setFavicon({
  iconName: 'home',
  iconPrefix: 'fas',
  size: 32
})
```

#### 方式三：在 Header 组件中使用

Header 组件会自动监听 `logoIcon` prop 的变化并更新 favicon：

```vue
<template>
  <Header logo-icon="section" />
</template>
```

### 注意事项

1. **FontAwesome 加载**：favicon 设置会等待 FontAwesome 加载完成，如果未加载会自动重试
2. **图标前缀**：默认使用 `fas` (solid)，也可以使用 `far` (regular)、`fal` (light)、`fab` (brand) 等
3. **图标名称**：必须是有效的 FontAwesome 图标名（如 `section`、`user`、`home` 等）
4. **独立运行**：favicon 功能独立于 Header 组件，即使 Header 不在页面中也能正常工作

---

## 存储工具 (storage.ts)

存储工具类 `Store` 提供了 Cookie、localStorage 和 sessionStorage 的统一操作接口。

### API 接口

#### Cookie 操作

```typescript
// 获取 Cookie
Store.getCookie(key: string): string

// 设置 Cookie（默认保存 2 小时）
Store.setCookie(key: string, value: any, exhours?: number): void

// 删除 Cookie
Store.removeCookie(key: string): void

// 清除所有 Cookie
Store.clearCookie(): void
```

#### localStorage 操作

```typescript
// 设置 localStorage
Store.setLocalStorage(key: string, value: any): void

// 获取 localStorage
Store.getLocalStorage(key: string): any

// 删除 localStorage
Store.removeLocalStorage(key: string): void

// 清除所有 localStorage
Store.clearLocalStorage(): void
```

#### sessionStorage 操作

```typescript
// 设置 sessionStorage
Store.setSessionStorage(key: string, value: any): void

// 获取 sessionStorage
Store.getSessionStorage(key: string): any

// 删除 sessionStorage
Store.removeSessionStorage(key: string): void

// 清除所有 sessionStorage
Store.clearSessionStorage(): void
```

### 使用示例

```typescript
import { Store } from '~/packet/Config/storage'

// Cookie 操作
Store.setCookie('token', 'abc123', 24)  // 保存 24 小时
const token = Store.getCookie('token')
Store.removeCookie('token')

// localStorage 操作
Store.setLocalStorage('user', { name: 'John', age: 30 })
const user = Store.getLocalStorage('user')
Store.removeLocalStorage('user')

// sessionStorage 操作
Store.setSessionStorage('tempData', { id: 1 })
const tempData = Store.getSessionStorage('tempData')
Store.removeSessionStorage('tempData')
```

### 注意事项

1. **自动序列化**：`setLocalStorage` 和 `setSessionStorage` 会自动使用 `JSON.stringify` 序列化数据
2. **自动反序列化**：`getLocalStorage` 和 `getSessionStorage` 会自动使用 `JSON.parse` 反序列化数据
3. **错误处理**：如果 JSON 解析失败，`getLocalStorage` 会返回原始字符串
4. **Cookie 时区**：Cookie 的过期时间会自动处理 UTC+8 时区（北京时间）

---

## UnoCSS 配置 (uno.config.ts)

UnoCSS 配置文件位于 `src/packet/Config/uno.config.ts`，提供了 Sectum 组件库所需的 UnoCSS 预设和规则。

### 配置内容

- **预设**：`presetUno` 和 `SectumTheme`
- **暗色模式**：使用 `class` 策略
- **自定义规则**：主题颜色、透明度、边框等规则

### 使用方式

#### 方式一：在项目中使用（推荐）

在你的项目根目录创建 `uno.config.ts`：

```typescript
import { defineConfig } from 'unocss'
import { UnoConfig } from 'sectum/dist/uno.config'

export default defineConfig({
  ...UnoConfig,
  // 你可以在这里添加自己的自定义配置
})
```

#### 方式二：在内部开发中使用

```typescript
import { defineConfig } from 'unocss'
import { UnoConfig } from '~/packet/Config/uno.config'

export default defineConfig({
  ...UnoConfig,
  // 自定义配置
})
```

### 自定义规则示例

UnoCSS 配置包含以下自定义规则：

- `bg-primary`、`bg-secondary`、`bg-success`、`bg-warning`、`bg-error`
- `text-primary`、`text-secondary`、`text-success`、`text-warning`、`text-error`
- `border-primary`、`border-secondary`、`border-success`、`border-warning`、`border-error`
- 透明度支持：`bg-primary/10`、`text-primary/50` 等

### 使用示例

```vue
<template>
  <div class="bg-primary text-primary-content p-4">
    <h1 class="text-2xl font-bold">标题</h1>
    <p class="text-base">内容</p>
  </div>
</template>
```

---

## Vite 图标加载插件 (vite-icon-plugin.ts)

Vite 图标加载插件 `sectumIconLoader` 用于自动将 `/icon.js` 请求映射到 `node_modules/sectum/lib/icon.js`。

### 功能特性

- ✅ 开发环境：自动拦截 `/icon.js` 请求并返回图标文件
- ✅ 生产构建：自动复制 `icon.js` 到 `dist` 目录
- ✅ 无需手动复制文件到 `public` 目录
- ✅ 支持缓存控制

### 使用方式

在 `vite.config.ts` 中配置：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { sectumIconLoader } from 'sectum'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    sectumIconLoader()  // 自动加载 icon.js
  ]
})
```

### 工作原理

1. **开发环境**：插件拦截 `/icon.js` 请求，从 `node_modules/sectum/lib/icon.js` 读取内容并返回
2. **生产构建**：在构建时自动将 `icon.js` 复制到 `dist` 目录

### 注意事项

1. **仅限 Node.js 环境**：此插件只能在 `vite.config.ts` 中使用，不能在前端代码中使用
2. **项目根目录**：默认使用 `process.cwd()` 作为项目根目录，也可以手动指定
3. **错误处理**：如果找不到 `icon.js` 文件，会在控制台输出错误信息

### 手动方式（不推荐）

如果你不想使用插件，可以手动将 `icon.js` 复制到 `public` 目录：

```bash
cp node_modules/sectum/lib/icon.js public/icon.js
```

---

## 配置导出 (index.ts)

`index.ts` 文件统一导出所有配置相关的模块，方便外部使用。

### 导出内容

```typescript
// UnoCSS 配置
export { UnoConfig } from './uno.config'

// Vite 插件
export { sectumIconLoader } from './vite-icon-plugin'

// Favicon 管理
export { setFavicon, initFavicon, initFaviconFromConfig } from './favicon'
export type { FaviconConfig } from './favicon'

// 配置说明
export const configInfo = { ... }
```

### 使用示例

```typescript
// 从 sectum 包中导入
import { UnoConfig, sectumIconLoader, initFavicon } from 'sectum'

// 或从内部路径导入
import { UnoConfig, sectumIconLoader, initFavicon } from '~/packet/Config'
```

---

## 完整使用示例

### 1. 项目配置文件

```typescript
// src/config/config.ts
import type { AppConfig } from '~/type'

const config: AppConfig = {
  project: {
    name: 'My Project',
    description: 'A great project',
    version: '1.0.0',
    homepage: 'example.com',
    author: 'Author',
    keywords: ['vue3', 'typescript'],
    license: 'MIT',
    logoIcon: 'section'  // 设置 favicon
  },
  // ... 其他配置
}

export default config
```

### 2. 主入口文件

```typescript
// src/main.ts
import App from './App.vue'
import { createApp } from 'vue'
import Sectum, { Store } from './packet'
import Router from './router'
import I18n from './locale'
import { initFavicon } from './packet/Config/favicon'
import 'uno.css'

// 创建全局对象
const globalUtils = {
  Store,
  I18n
}

if (typeof window !== 'undefined') {
  (window as any).globalUtils = globalUtils
}

// 初始化 favicon（从配置中读取）
initFavicon()

createApp(App).use(Router).use(Sectum).use(I18n).mount('#app')
```

### 3. Vite 配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { UnoConfig, sectumIconLoader } from 'sectum'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(UnoConfig),
    sectumIconLoader()
  ]
})
```

### 4. UnoCSS 配置

```typescript
// uno.config.ts
import { defineConfig } from 'unocss'
import { UnoConfig } from 'sectum/dist/uno.config'

export default defineConfig({
  ...UnoConfig,
  // 自定义配置
})
```

---

## 最佳实践

1. **统一配置管理**：将所有项目配置集中在 `config.ts` 中管理
2. **自动初始化**：在 `main.ts` 中调用 `initFavicon()` 自动设置 favicon
3. **使用存储工具**：使用 `Store` 类统一管理 Cookie 和 Storage
4. **插件配置**：在 `vite.config.ts` 中使用 `sectumIconLoader()` 自动加载图标
5. **类型安全**：使用 TypeScript 类型定义确保配置的正确性

---

## 常见问题

### Q: favicon 没有显示？

A: 确保：
1. 在 `config.ts` 中配置了 `logoIcon`
2. 在 `main.ts` 中调用了 `initFavicon()`
3. FontAwesome 已正确加载

### Q: 图标文件找不到？

A: 确保在 `vite.config.ts` 中添加了 `sectumIconLoader()` 插件

### Q: 存储工具无法使用？

A: 确保已导入 `Store` 类：
```typescript
import { Store } from '~/packet/Config/storage'
```

### Q: UnoCSS 规则不生效？

A: 确保：
1. 使用了 Sectum 提供的 `UnoConfig`
2. 在 `vite.config.ts` 中正确配置了 UnoCSS 插件
3. 引入了 `uno.css` 样式文件

---

## 相关文档

- [快速开始](../Started.md)
- [Header 组件文档](../Layout/Header/Header.md)
- [主题配置](../Pattern/Theme/Theme.md)

