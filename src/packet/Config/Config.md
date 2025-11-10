# 配置系统文档

本文档介绍 Sectum 项目中的配置系统，包括项目配置、Favicon 管理、存储工具、UnoCSS 配置和 Vite 插件等。

## 目录

- [项目配置 (config.ts)](#项目配置-configts)
- [Favicon 管理 (favicon.ts)](#favicon-管理-faviconts)
- [存储工具 (storage.ts)](#存储工具-storagets)
- [UnoCSS 配置 (uno.config.ts)](#unocss-配置-unoconfigts)
- [Vite 图标加载插件 (vite-icon-plugin.ts)](#vite-图标加载插件-vite-icon-plugints)
- [全局组件类型声明自动生成](#全局组件类型声明自动生成)
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

动态 Favicon 和页面标题管理模块位于 `src/packet/Config/favicon.ts`，用于根据配置自动设置页面 favicon 和标题。

### 功能特性

- ✅ 自动从全局配置读取 `logoIcon` 并设置 favicon
- ✅ 自动从全局配置读取 `project.name` 并设置页面标题
- ✅ 支持 FontAwesome 图标（solid、regular、light、brand 等样式）
- ✅ 动态生成 SVG favicon，无需静态文件
- ✅ 统一初始化页面元信息（favicon + title）
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

#### `setPageTitle(title: string): void`

设置页面标题。

```typescript
import { setPageTitle } from '~/packet/Config/favicon'

// 设置页面标题
setPageTitle('My Project')
```

#### `initPageMeta(): void`

统一初始化页面元信息（favicon 和 title）。从全局配置中读取 `config.project.logoIcon` 和 `config.project.name`。

```typescript
import { initPageMeta } from '~/packet/Config/favicon'

// 在 main.ts 中调用（推荐）
initPageMeta()
```

**功能说明：**
- 自动设置页面标题为 `config.project.name`
- 自动设置 favicon 为 `config.project.logoIcon`
- 一次调用完成所有页面元信息的初始化

### 使用示例

#### 方式一：统一初始化（推荐）

在 `main.ts` 中调用 `initPageMeta()`，会自动从 `config.ts` 读取 `logoIcon` 和 `project.name`：

```typescript
// src/main.ts
import { initPageMeta } from './packet/Config/favicon'

// 初始化页面元信息（favicon 和 title，从配置中读取）
initPageMeta()

createApp(App).use(Router).use(Sectum).use(I18n).mount('#app')
```

确保在 `config.ts` 中配置了 `logoIcon` 和 `name`：

```typescript
// src/config/config.ts
const config: AppConfig = {
  project: {
    name: 'Sectum',  // 页面标题
    // ... 其他配置
    logoIcon: 'section'  // FontAwesome 图标名，用于 favicon
  }
}
```

#### 方式一（旧版）：单独初始化 favicon

如果只需要初始化 favicon，可以单独调用 `initFavicon()`：

```typescript
// src/main.ts
import { initFavicon } from './packet/Config/favicon'

// 初始化 favicon（从配置中读取）
initFavicon()

createApp(App).use(Router).use(Sectum).use(I18n).mount('#app')
```

#### 方式二：手动设置

```typescript
import { setFavicon, setPageTitle } from '~/packet/Config/favicon'

// 在组件中动态设置 favicon
setFavicon({
  iconName: 'home',
  iconPrefix: 'fas',
  size: 32
})

// 在组件中动态设置页面标题
setPageTitle('New Page Title')
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
5. **统一初始化**：推荐使用 `initPageMeta()` 同时初始化 favicon 和页面标题，代码更简洁
6. **配置依赖**：`initPageMeta()` 需要 `config.project.name` 和 `config.project.logoIcon` 配置

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

## 全局组件类型声明自动生成

Sectum 在构建时会自动分析所有模块的组件注册代码，生成全局组件类型声明文件 `lib/global-components.d.ts`，无需手动维护。

### 功能特性

- ✅ **自动分析** - 自动读取 `src/packet/*/index.ts` 文件
- ✅ **自动提取** - 自动提取组件导出和注册信息
- ✅ **自动匹配** - 自动匹配注册名和导出名
- ✅ **自动分类** - 按 Element、Pattern、Section、Model、Layout 自动分类
- ✅ **自动生成** - 自动生成完整的 TypeScript 类型声明
- ✅ **零维护** - 添加新组件后重新构建即可，无需手动更新

### 工作原理

构建过程（`npm run build:lib`）会自动执行以下步骤：

1. **读取模块文件**
   - 读取 `src/packet/Element/index.ts`
   - 读取 `src/packet/Pattern/index.ts`
   - 读取 `src/packet/Section/index.ts`
   - 读取 `src/packet/Model/index.ts`
   - 读取 `src/packet/Layout/index.ts`

2. **解析导出语句**
   ```typescript
   // 自动解析 export { Component1, Component2, ... }
   export { Button, Input, Label }
   ```

3. **解析注册语句**
   ```typescript
   // 自动解析 app.component('注册名', 组件变量)
   app.component('btn', Button)
   app.component('Button', Button)
   ```

4. **匹配和分类**
   - 匹配注册名和导出名
   - 自动判断是否为短名称（长度 <= 4 且全小写）
   - 按模块分类（Element、Pattern、Section、Model、Layout）

5. **生成类型声明**
   ```typescript
   // 自动生成 lib/global-components.d.ts
   declare module 'vue' {
     export interface GlobalComponents {
       // Element 组件（短名称）
       btn: Sectum.Button
       lab: Sectum.Label
       // ...
     }
   }
   ```

### 使用方式

#### 1. 在项目中使用类型声明

在你的项目的 `env.d.ts` 或 `src/env.d.ts` 文件中添加：

```typescript
/// <reference types="sectum/global-components" />
```

这样，你就可以在 Vue 模板中使用全局组件时获得完整的 TypeScript 类型支持：

```vue
<template>
  <!-- 全局组件自动获得类型提示 -->
  <Header :theme-component="Theme" :dark-component="DarkToggle" />
  <btn>按钮</btn>
  <ipt v-model="value" />
</template>

<script setup lang="ts">
// 如果需要将组件作为 prop 传递，可以按需导入
import { Theme, DarkToggle } from 'sectum'
// 或者只导入类型
import type { Theme, DarkToggle } from 'sectum'

const value = ref('')
</script>
```

#### 2. 添加新组件

添加新组件时，只需在对应的 `index.ts` 中完成以下步骤：

**步骤 1：导入组件**
```typescript
// src/packet/Element/index.ts
import NewComponent from './NewComponent/NewComponent.vue'
```

**步骤 2：导出组件**
```typescript
// src/packet/Element/index.ts
export {
  Button, Label, Input, NewComponent  // 添加新组件
}
```

**步骤 3：注册组件**
```typescript
// src/packet/Element/index.ts
const install = (app: App) => {
  app.component('NewComponent', NewComponent)  // 注册新组件
  // 或者使用短名称
  app.component('newc', NewComponent)
}
```

**步骤 4：重新构建**
```bash
npm run build:lib
```

构建完成后，`lib/global-components.d.ts` 会自动更新，包含新组件的类型声明。

### 生成的文件结构

构建后会在 `lib/global-components.d.ts` 生成如下结构：

```typescript
/**
 * Sectum 全局组件类型声明
 * 此文件在构建时自动生成，声明所有全局注册的组件类型
 * 
 * 使用方式：在项目的 env.d.ts 中添加：
 * /// <reference types="sectum/global-components" />
 * 
 * 注意：此文件通过自动分析 src/packet 目录下各模块的 index.ts 中的组件注册代码生成
 * 无需手动维护，添加新组件后重新构建即可自动更新
 */

import type * as Sectum from './index'

declare module 'vue' {
  export interface GlobalComponents {
    // Element 组件（短名称）
    btn: Sectum.Button
    lab: Sectum.Label
    // ...
    
    // Element 组件（完整名称）
    Button: Sectum.Button
    Label: Sectum.Label
    // ...
    
    // Pattern 组件
    Theme: Sectum.Theme
    Language: Sectum.Language
    // ...
    
    // Section 组件
    Group: Sectum.Group
    Menu: Sectum.Menu
    // ...
    
    // Model 组件
    Footer: Sectum.Footer
    Header: Sectum.Header
    // ...
    
    // Layout 组件
    Menual: Sectum.Menual
  }
}
```

### 配置说明

类型声明文件通过 `package.json` 的 `exports` 字段导出：

```json
{
  "exports": {
    "./global-components": {
      "types": "./lib/global-components.d.ts"
    }
  }
}
```

这样，其他项目可以通过 `/// <reference types="sectum/global-components" />` 引用类型声明。

### 注意事项

1. **构建时机**：类型声明文件在 `npm run build:lib` 时自动生成
2. **发布流程**：`npm publish` 前会自动执行 `prepublishOnly` 钩子，确保类型声明文件已生成
3. **无需手动维护**：不要手动编辑 `lib/global-components.d.ts`，它会在每次构建时重新生成
4. **组件命名**：确保组件导出名和注册名保持一致，系统会自动匹配
5. **短名称规则**：长度 <= 4 且全小写的注册名会被识别为短名称

### 常见问题

#### Q: 构建时没有生成类型声明文件？

**A:** 请检查：
1. 是否执行了 `npm run build:lib`（不是 `npm run build`）
2. 检查构建日志，确认 `[copy-config]` 插件已执行
3. 确认 `src/packet/*/index.ts` 文件存在且格式正确

#### Q: 新组件没有被检测到？

**A:** 请确保：
1. 组件已正确导出：`export { NewComponent }`
2. 组件已正确注册：`app.component('NewComponent', NewComponent)`
3. 导出名和注册名匹配（注册名可以不同，但导出名必须匹配变量名）

#### Q: 类型声明文件有语法错误？

**A:** 这通常不会发生，因为文件是自动生成的。如果出现错误：
1. 检查组件导出和注册代码是否有语法错误
2. 重新构建：`npm run build:lib`
3. 检查构建日志中的错误信息

---

## 配置导出 (index.ts)

`index.ts` 文件统一导出所有配置相关的模块，方便外部使用。

### 导出内容

```typescript
// UnoCSS 配置
export { UnoConfig } from './uno.config'

// Vite 插件
export { sectumIconLoader } from './vite-icon-plugin'

// Favicon 和页面标题管理
export { setFavicon, initFavicon, initFaviconFromConfig, setPageTitle, initPageMeta } from './favicon'
export type { FaviconConfig } from './favicon'

// 配置说明
export const configInfo = { ... }
```

### 使用示例

```typescript
// 从 sectum 包中导入
import { UnoConfig, sectumIconLoader, initPageMeta } from 'sectum'

// 或从内部路径导入
import { UnoConfig, sectumIconLoader, initPageMeta } from '~/packet/Config'
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
import { initPageMeta } from './packet/Config/favicon'
import 'uno.css'

// 创建全局对象
const globalUtils = {
  Store,
  I18n
}

if (typeof window !== 'undefined') {
  (window as any).globalUtils = globalUtils
}

// 初始化页面元信息（favicon 和 title，从配置中读取）
initPageMeta()

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
2. **统一初始化**：在 `main.ts` 中调用 `initPageMeta()` 自动设置 favicon 和页面标题
3. **使用存储工具**：使用 `Store` 类统一管理 Cookie 和 Storage
4. **插件配置**：在 `vite.config.ts` 中使用 `sectumIconLoader()` 自动加载图标
5. **类型安全**：使用 TypeScript 类型定义确保配置的正确性
6. **配置完整性**：确保 `config.project.name` 和 `config.project.logoIcon` 都已配置

---

## 常见问题

### Q: favicon 没有显示？

A: 确保：
1. 在 `config.ts` 中配置了 `logoIcon`
2. 在 `main.ts` 中调用了 `initPageMeta()` 或 `initFavicon()`
3. FontAwesome 已正确加载

### Q: 页面标题没有更新？

A: 确保：
1. 在 `config.ts` 中配置了 `project.name`
2. 在 `main.ts` 中调用了 `initPageMeta()`（推荐）或 `setPageTitle()`

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

