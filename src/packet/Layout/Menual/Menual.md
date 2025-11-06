# Menual 文档布局组件

Menual 组件是一个集成了侧边栏导航和文档内容展示的布局组件。它结合了 Sidebar 组件和动态组件加载功能，为文档网站提供完整的布局方案。组件支持路由驱动的动态内容加载、组件缓存和自动导航。

## 特性

- 📚 **文档布局** - 集成了侧边栏导航和主内容区域的完整布局
- 🗺️ **路由驱动** - 根据路由配置自动加载对应的文档组件
- ⚡ **性能优化** - 使用 KeepAlive 缓存组件实例，最多缓存 10 个
- 🔄 **动态加载** - 支持异步组件加载，按需加载文档内容
- 🎯 **智能路由** - 递归查找路由配置，自动匹配当前路径对应的组件
- 🔗 **导航集成** - 内置路由跳转处理，支持自定义导航逻辑

## 安装

```ts
import { Menual } from 'sectum'
// 或者
import Menual from 'sectum'
```

## 基础用法

最基本的用法，传入路由配置：

```vue
<template>
  <Menual :routes="routeConfig" />
</template>

<script setup>
import Menual from '~/packet/Layout/Menual/Menual.vue'
import routeConfig from '~/router/SectumRoute'

// routeConfig 包含完整的路由配置或子路由数组
</script>
```

### 传入子路由数组

如果传入的是子路由数组（推荐方式），Menual 会自动处理：

```vue
<template>
  <Menual :routes="currentRouteChildren" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Menual from '~/packet/Layout/Menual/Menual.vue'
import routeConfig from '~/router/SectumRoute'

const route = useRoute()

// 提取当前路由的子路由
const currentRouteChildren = computed(() => {
  const sectumRoute = routeConfig.find(r => r.path === '/sectum')
  return sectumRoute?.children || []
})
</script>
```

## 路由配置格式

Menual 组件支持两种路由配置格式：

### 格式 1：完整路由配置（向后兼容）

```typescript
const routeConfig = [
  {
    path: '/sectum',
    component: () => import('~/view/index.vue'),
    children: [
      {
        path: '/sectum/',
        meta: { title: 'Element' },
        children: [
          {
            path: '/sectum/button',
            component: () => import('~/packet/Element/Button/Button.md'),
            meta: { title: 'Button' }
          },
          {
            path: '/sectum/input',
            component: () => import('~/packet/Element/Input/Input.md'),
            meta: { title: 'Input' }
          }
        ]
      }
    ]
  }
]
```

### 格式 2：子路由数组（推荐）

直接传入子路由数组，更简洁：

```typescript
const routeConfig = [
  {
    path: '/sectum/',
    meta: { title: 'Element' },
    children: [
      {
        path: '/sectum/button',
        component: () => import('~/packet/Element/Button/Button.md'),
        meta: { title: 'Button' }
      },
      {
        path: '/sectum/input',
        component: () => import('~/packet/Element/Input/Input.md'),
        meta: { title: 'Input' }
      }
    ]
  },
  {
    path: '/sectum/',
    meta: { title: 'Section' },
    children: [
      {
        path: '/sectum/card',
        component: () => import('~/packet/Section/Card/Card.md'),
        meta: { title: 'Card' }
      }
    ]
  }
]
```

### 路由配置说明

- **path** (string): 路由路径，必须唯一
- **component** (Function): 组件加载函数，返回 Promise，用于动态加载文档组件
- **meta** (Object): 路由元信息，通常包含 `title`，用于显示在导航菜单中
- **children** (Array): 子路由数组（可选），支持嵌套路由结构

## 组件结构

Menual 组件内部结构如下：

```
Menual
├── Sidebar (侧边栏导航)
│   └── 根据 routes 自动生成导航菜单
└── Main (主内容区域)
    └── KeepAlive
        └── 动态组件 (根据当前路由加载)
```

## 工作原理

1. **路由匹配**：组件根据当前路由路径，递归查找路由配置中匹配的 `component`
2. **组件加载**：使用 `defineAsyncComponent` 异步加载匹配的组件
3. **组件缓存**：使用 `KeepAlive` 缓存已加载的组件，最多缓存 10 个实例
4. **导航处理**：Sidebar 的导航事件通过 `handleNavigate` 处理，使用 `vue-router` 进行路由跳转

## Props

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| `routes` | `Array` | `undefined` | ❌ | 路由配置数组，用于生成导航菜单和加载文档组件 |

### routes 配置说明

路由配置数组中的每个路由项应包含：

- `path` (string): 路由路径
- `component` (Function): 组件加载函数，返回 Promise
- `meta` (Object): 路由元信息，通常包含 `title`
- `children` (Array): 子路由数组（可选）

## 使用场景

Menual 组件特别适用于：

- 📖 **文档网站** - 技术文档、API 文档、使用手册等
- 🎓 **教程网站** - 在线教程、学习平台
- 📚 **知识库** - Wiki、知识管理系统
- 📝 **博客系统** - 技术博客、内容管理系统

## 实际应用示例

### 在文档网站中使用

```vue
<template>
  <div class="flex flex-col h-screen">
    <Header project-name="Sectum" />
    <div class="flex flex-1 min-h-0">
      <!-- 首页内容 -->
      <template v-if="isHomePage">
        <HomePage />
      </template>
      <!-- 文档页面内容（包含 Sidebar） -->
      <template v-else>
        <Menual :routes="currentRouteChildren" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '~/packet/Layout/Header/Header.vue'
import Menual from '~/packet/Layout/Menual/Menual.vue'
import HomePage from './HomePage.vue'
import routeConfig from '~/router/SectumRoute'

const route = useRoute()

// 提取子路由（推荐方式）
const currentRouteChildren = computed(() => {
  const sectumRoute = routeConfig.find(r => r.path === '/sectum')
  return sectumRoute?.children || []
})

const isHomePage = computed(() => route.path === '/' || route.path === '/index')
</script>
```

### 自定义路由配置

```vue
<template>
  <Menual :routes="customRoutes" />
</template>

<script setup>
import Menual from '~/packet/Layout/Menual/Menual.vue'

const customRoutes = [
  {
    path: '/docs',
    children: [
      {
        path: '/docs/getting-started',
        component: () => import('./docs/GettingStarted.md'),
        meta: { title: 'Getting Started' }
      },
      {
        path: '/docs/api',
        component: () => import('./docs/API.md'),
        meta: { title: 'API Reference' }
      }
    ]
  }
]
</script>
```

## 组件缓存

Menual 组件使用 Vue 的 `KeepAlive` 组件缓存已加载的文档组件：

- **缓存数量**：最多缓存 10 个组件实例
- **缓存策略**：基于路由路径 (`route.path`) 进行缓存
- **性能优化**：避免重复加载相同路径的组件，提升用户体验

## 错误处理

当找不到对应的组件时，组件会显示错误信息：

```vue
<div v-else style="padding: 20px;">
  <p>组件未找到</p>
  <p>当前路径: {{ route.path }}</p>
</div>
```

## 注意事项

1. **路由配置格式**：支持完整路由配置或子路由数组两种格式，推荐使用子路由数组
2. **路径匹配**：组件会递归查找路由配置，确保路径格式正确
3. **Sidebar 显示**：Sidebar 只在 `routes` 存在时显示，如果 `routes` 为 `undefined`，Sidebar 不会渲染
4. **组件加载**：组件使用异步加载，确保组件文件路径正确且可访问
5. **缓存限制**：组件最多缓存 10 个实例，超出限制的组件会被销毁
6. **子路由传递**：当传入子路由数组时，Menual 会自动处理并传递给 Sidebar 组件

## 与 Sidebar 的关系

Menual 组件内部集成了 Sidebar 组件：

- Sidebar 负责显示导航菜单
- Menual 负责加载和显示文档内容
- 两者共享同一个 `routes` 配置
- 导航事件由 Menual 统一处理

## 最佳实践

1. **路由配置**：将路由配置集中管理，统一导入使用
2. **组件拆分**：将文档内容拆分为独立的 Markdown 或 Vue 组件文件
3. **路径规范**：使用统一的路径命名规范，便于维护
4. **性能优化**：合理使用组件缓存，避免缓存过多不必要的组件
5. **错误处理**：为组件加载添加错误处理逻辑，提升用户体验

