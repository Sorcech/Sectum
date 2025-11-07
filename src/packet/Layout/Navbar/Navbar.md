# Navbar 导航栏组件

Navbar 组件是一个垂直导航栏组件，适用于侧边栏导航场景。它支持通过配置定义导航项，支持图标、标题和路由跳转，并且会自动保存当前选中的导航项到本地存储。

## 特性

- 📋 **配置驱动** - 通过配置文件或 props 定义导航项
- 🎯 **路由集成** - 支持 Vue Router 路由跳转
- 💾 **状态持久化** - 自动保存和恢复选中的导航项
- 🎨 **主题适配** - 自动适配暗色模式
- 📱 **响应式** - 自适应不同屏幕尺寸
- 🔧 **TypeScript 支持** - 完整的类型定义和导出

## 安装

```typescript
import { Navbar, navbarItems, navbarConfig, type NavbarItem } from 'sectum'
// 或者单独导入组件
import { Navbar } from 'sectum'
```

## 基础用法

### 使用默认配置

最简单的 Navbar 用法（使用内置的默认配置）：

```vue
<template>
  <Navbar />
</template>

<script setup lang="ts">
import { Navbar } from 'sectum'
</script>
```

Navbar 组件会自动读取内置的导航配置（`navbar.ts`），显示导航项列表。

**注意**：默认配置中的路由路径（如 `/dashboard`, `/task` 等）需要在使用该组件的项目中定义，否则 Vue Router 会发出警告。

### 使用自定义配置（推荐）

推荐使用 `items` prop 传入自定义的导航配置，这样可以确保路由路径与你的项目路由配置一致：

```vue
<template>
  <Navbar :items="navItems" />
</template>

<script setup lang="ts">
import { Navbar, type NavbarItem } from 'sectum'

const navItems: NavbarItem[] = [
  {
    title: '首页',
    icon: 'home',
    path: '/',
  },
  {
    title: '文档',
    icon: 'book',
    path: '/docs',
  },
  {
    title: '关于',
    icon: 'info-circle',
    path: '/about',
  }
]
</script>
```

### 基于默认配置扩展

你可以导入默认配置并基于它进行扩展：

```vue
<template>
  <Navbar :items="customNavItems" />
</template>

<script setup lang="ts">
import { Navbar, navbarItems, type NavbarItem } from 'sectum'
import { computed } from 'vue'

// 基于默认配置添加新项
const customNavItems = computed<NavbarItem[]>(() => [
  ...navbarItems,
  {
    title: '设置',
    icon: 'gear',
    path: '/settings',
  }
])
</script>
```

### 动态配置

支持响应式配置，可以根据条件动态生成导航项：

```vue
<template>
  <Navbar :items="dynamicNavItems" />
</template>

<script setup lang="ts">
import { Navbar, type NavbarItem } from 'sectum'
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const dynamicNavItems = computed<NavbarItem[]>(() => {
  const items: NavbarItem[] = [
    { title: '首页', icon: 'home', path: '/' },
    { title: '产品', icon: 'box', path: '/products' },
  ]
  
  // 根据用户权限动态添加
  if (userStore.isAdmin) {
    items.push({ title: '管理', icon: 'shield', path: '/admin' })
  }
  
  return items
})
</script>
```

## 类型定义

### NavbarItem 接口

```typescript
interface NavbarItem {
  title: string  // 导航项标题
  icon: string   // 图标名称（FontAwesome 图标）
  path: string   // 路由路径
}
```

### 导入类型

```typescript
import type { NavbarItem } from 'sectum'
// 或者
import { type NavbarItem } from 'sectum'
```

## 配置导出

Navbar 组件提供了多种配置导出方式：

```typescript
// 导入默认配置（命名导出）
import { navbarItems } from 'sectum'

// 导入默认配置（默认导出别名）
import { navbarConfig } from 'sectum'

// 直接导入配置文件
import navbarItems from '~/packet/Layout/Navbar/navbar'
import { navbarItems as defaultNavbarItems } from '~/packet/Layout/Navbar/navbar'
```

## 配置项说明

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `string` | ✅ | 导航项标题，显示在图标下方 |
| `icon` | `string` | ✅ | 图标名称，使用 FontAwesome 图标库 |
| `path` | `string` | ✅ | 路由路径，需要与 Vue Router 配置一致 |

## 默认配置

Navbar 组件的默认配置位于 `~/packet/Layout/Navbar/navbar.ts`：

```typescript
export default [{
  title: 'Dashboard',
  icon: 'gauge',
  path: '/dashboard',
}, {
  title: 'Task',
  icon: 'calendar-check',
  path: '/task',
}, {
  title: 'Project',
  icon: 'layer-group',
  path: '/project'
}, {
  title: 'Product',
  icon: 'atom',
  path: '/product'
}, {
  title: 'Data',
  icon: 'database',
  path: '/data'
}, {
  title: 'Website',
  icon: 'globe',
  path: '/website'
}, {
  title: 'Blog',
  icon: 'blog',
  path: '/blog'
}]
```

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `items` | `NavbarItem[]` | `undefined` | 自定义导航项配置数组。如果未提供，则使用默认的 `navbar.ts` 配置 |

### 插槽

Navbar 组件不提供插槽。

### 事件

Navbar 组件不对外暴露事件。

### 本地存储

Navbar 组件会自动使用本地存储保存当前选中的导航项索引：

- **存储键名**：`Nav`
- **存储类型**：`localStorage`
- **存储内容**：选中的导航项索引（数字，从 0 开始）

刷新页面后会自动恢复上次选中的导航项。

## 样式自定义

Navbar 组件使用 UnoCSS 类名，支持通过主题配置自定义样式：

### 容器样式
- 基础容器：`flex flex-col items-center h-screen w-20 bg-base-100 border-r`
- 暗色模式：`dark:bg-gray-800 dark:border-gray-500`

### 标题样式
- 基础样式：`font-medium text-primary text-xl pt-3`

### 导航项样式
- 基础样式：`flex flex-col items-center py-2 no-underline w-20`
- 悬停效果：`hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200`
- 选中状态：`bg-gray-200 text-blue-500 dark:bg-gray-800 dark:text-blue-400`
- 未选中状态：`text-gray-600 dark:text-gray-400`

### 自定义样式示例

如果需要自定义样式，可以通过覆盖 CSS 类或使用深度选择器：

```vue
<style scoped>
/* 自定义导航栏宽度 */
:deep(.navbar-container) {
  width: 100px;
}

/* 自定义选中颜色 */
:deep(.nav-item.active) {
  background-color: #3b82f6;
  color: white;
}
</style>
```

## 最佳实践

1. **路由配置**：确保导航配置中的 `path` 在 Vue Router 中已正确配置
2. **图标选择**：使用 FontAwesome 图标库中的图标名称，确保图标已正确引入
3. **类型安全**：使用 `NavbarItem` 类型确保配置的正确性
4. **配置管理**：对于大型项目，建议将导航配置集中管理，便于维护
5. **响应式设计**：在移动端可能需要配合 Sidebar 组件使用，通过 Header 的菜单按钮切换
6. **权限控制**：根据用户权限动态生成导航项，隐藏无权限访问的页面

## 完整示例

```vue
<template>
  <div class="flex h-screen">
    <Navbar :items="navItems" />
    <main class="flex-1 p-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Navbar, navbarItems, type NavbarItem } from 'sectum'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 基于默认配置，根据当前路由动态高亮
const navItems = computed<NavbarItem[]>(() => {
  return navbarItems.map(item => ({
    ...item,
    // 可以根据需要添加额外属性
  }))
})
</script>
```

## 注意事项

- ⚠️ Navbar 组件宽度固定为 `w-20`（80px），如需修改需要覆盖样式
- ⚠️ 组件会自动保存用户选中的导航项，刷新页面后会恢复选中状态
- ⚠️ 确保使用的图标在 FontAwesome 图标库中存在
- ⚠️ 路由路径需要与 Vue Router 配置保持一致，否则会显示路由警告
- ⚠️ 组件使用 `localStorage` 存储选中状态，清除浏览器缓存会重置状态

## 相关组件

- [Header](./Header.md) - 页眉组件
- [Sidebar](./Sidebar.md) - 侧边栏组件
- [Menual](./Menual.md) - 文档组件
