# Header 顶部导航栏组件

Header 组件是一个功能丰富的顶部导航栏，适用于各种 Web 应用。它提供了项目 Logo、主题切换、暗色模式切换、语言切换、用户链接等功能，并且支持背景透明度控制和响应式设计。

## 特性

- 🎨 **主题集成** - 内置主题、暗色模式、语言切换组件支持
- 📱 **响应式设计** - 自动适配移动端和桌面端
- 🔗 **灵活链接** - 支持内部路由和外部链接
- 🎭 **背景透明** - 支持背景透明度控制和毛玻璃效果
- 🖼️ **Logo 支持** - 可选的 Logo 图标显示
- 👤 **用户入口** - 可配置的用户图标和链接
- 🎯 **粘性定位** - 支持固定在页面顶部
- 📋 **导航菜单** - 中间位置支持多个页面切换按钮，可通过配置文件或路由自动导入

## 安装

```ts
import { Header } from 'sectum'
// 或者
import Header from 'sectum'
```

## 基础用法

最简单的 Header 用法：

<Header project-name="Sectum" />

```vue
<template>
  <Header project-name="Sectum" />
</template>

<script setup>
import { Header } from 'sectum'
</script>
```

## 带 Logo 图标

使用 `logo-icon` 属性添加 Logo 图标：

<Header project-name="Sectum" logo-icon="section" />

```vue
<template>
  <Header 
    project-name="Sectum" 
    logo-icon="section" 
  />
</template>
```

## 导航菜单

在 Header 中间位置添加导航菜单，支持页面切换：

### 方式一：通过配置文件导入（推荐）

首先创建导航配置文件 `header-nav.ts`：

```typescript
// header-nav.ts
export default [
  {
    title: '产品中心',
    path: '/products',
  },
  {
    title: '解决方案',
    path: '/solutions',
  },
  {
    title: '关于我们',
    path: '/about',
  },
  {
    title: '联系我们',
    path: '/contact',
  }
]
```

然后在组件中使用：

```vue
<template>
  <Header 
    project-name="Sectum"
    :nav-items="navItems"
  />
</template>

<script setup>
import { Header } from 'sectum'
import navItems from './header-nav'

// 或者直接定义
const navItems = [
  { title: '产品中心', path: '/products' },
  { title: '解决方案', path: '/solutions' },
  { title: '关于我们', path: '/about' },
  { title: '联系我们', path: '/contact' }
]
</script>
```

### 方式二：从路由配置自动提取

如果你已经定义了路由配置，可以直接传入路由数组，Header 会自动提取导航项：

```vue
<template>
  <Header 
    project-name="Sectum"
    :routes="routes"
  />
</template>

<script setup>
import { Header } from 'sectum'
import routes from './router'

// Header 会自动从路由配置中提取有 meta.title 的路由作为导航项
</script>
```

### 支持外部链接

导航菜单项也支持外部链接：

```vue
<script setup>
const navItems = [
  { title: '产品中心', path: '/products' },
  { title: '官网', path: 'https://example.com' },  // 外部链接
  { title: '关于我们', path: '/about' }
]
</script>
```

## 完整功能

包含主题切换、暗色模式、语言切换、导航菜单和用户链接：

```vue
<template>
  <Header 
    project-name="Sectum"
    logo-icon="section"
    :nav-items="navItems"
    :theme-component="ThemeSelect"
    :dark-component="DarkToggle"
    :language-component="LanguageSelect"
    user-link="/profile"
    user-icon="user"
  />
</template>

<script setup>
import { Header, ThemeSelect, DarkToggle, LanguageSelect } from 'sectum'

const navItems = [
  { title: '产品中心', path: '/products' },
  { title: '解决方案', path: '/solutions' },
  { title: '关于我们', path: '/about' },
  { title: '联系我们', path: '/contact' }
]
</script>
```

## 外部链接

使用外部链接作为用户入口：

```vue
<template>
  <Header 
    project-name="Sectum"
    user-link="https://github.com/username"
    user-icon="github"
    :user-icon-brand="true"
  />
</template>
```

## 背景透明度

使用 `background-opacity` 属性控制背景透明度（0-1 之间）：

<Header project-name="Sectum" :background-opacity="0.5" />

```vue
<template>
  <Header 
    project-name="Sectum"
    :background-opacity="0.5"
  />
</template>
```

## 自定义图标样式

自定义用户图标的样式：

```vue
<template>
  <Header 
    project-name="Sectum"
    user-link="/profile"
    user-icon="user-circle"
    :user-icon-light="false"
    :user-icon-brand="false"
  />
</template>
```

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `project-name` | `string` | `'Cloud'` | 项目名称，显示在 Logo 旁边 |
| `logo-icon` | `string` | `undefined` | Logo 图标名称，如果未提供则不显示图标 |
| `nav-items` | `NavItem[]` | `undefined` | 导航菜单项数组，用于在中间位置显示页面切换按钮。格式：`[{ title: string, path: string }]` |
| `routes` | `Array` | `undefined` | 路由配置数组，如果提供，将从路由中自动提取导航项（需要有 `meta.title` 的路由） |
| `theme-component` | `Component` | `undefined` | 主题切换组件 |
| `dark-component` | `Component` | `undefined` | 暗色模式切换组件 |
| `language-component` | `Component` | `undefined` | 语言切换组件 |
| `user-link` | `string` | `undefined` | 用户链接，支持内部路由（如 `/profile`）或外部链接（如 `https://github.com`） |
| `user-icon` | `string` | `'user'` | 用户图标名称 |
| `user-icon-light` | `boolean` | `true` | 图标样式是否为 light |
| `user-icon-brand` | `boolean` | `false` | 图标样式是否为 brand（品牌图标） |
| `background-opacity` | `number` | `1` | 背景透明度，范围 0-1，默认 1（完全不透明） |

### 类型定义

```typescript
interface NavItem {
  title: string  // 导航项标题（显示文字）
  path: string   // 路由路径或外部链接
}
```

### 事件

Header 组件会发送全局事件来与 Sidebar 组件通信：

- `toggle-sidebar` - 当移动端的菜单按钮被点击时触发，用于切换侧边栏显示状态

### 插槽

Header 组件不提供插槽，所有内容通过 props 配置。

## 样式自定义

Header 组件使用 UnoCSS 类名，支持通过主题配置自定义样式：

- 背景色：`bg-base-200 dark:bg-dark-base-200`
- 主色调：`text-primary`
- 边框：`border-b`

## 最佳实践

1. **Logo 图标**：如果项目有品牌 Logo，建议使用 `logo-icon` 属性显示
2. **导航菜单**：推荐使用 `nav-items` prop 传入导航配置，或通过 `routes` prop 自动提取，支持配置文件导入
3. **用户入口**：根据应用需求配置 `user-link`，支持路由跳转或外部链接
4. **背景透明度**：在大屏设备上，可以设置较低透明度（如 0.8）以获得毛玻璃效果
5. **组件集成**：将主题、暗色模式、语言切换组件作为 props 传入，实现完整的功能集成
6. **响应式**：Header 会自动在移动端显示菜单按钮，导航菜单在移动端自动隐藏（`hidden md:flex`）

## 注意事项

- Header 使用 `sticky` 定位，会固定在页面顶部
- 在首页时，移动端菜单按钮会自动隐藏
- 导航菜单在移动端（<md）会自动隐藏，仅在桌面端显示
- 当前路由匹配的导航项会自动高亮显示（`text-primary`）
- 外部链接会自动在新标签页打开，并包含安全属性（`rel="noopener noreferrer"`）
- 背景透明度小于 1 时会自动应用毛玻璃效果（`backdrop-filter: blur(10px)`）
- 背景颜色会根据暗色模式自动调整
- 导航菜单项优先级：`nav-items` > `routes`（自动提取）> 无导航菜单
- 从路由提取导航项时，只会提取有 `meta.title` 且无动态参数（如 `/:`）的路由

