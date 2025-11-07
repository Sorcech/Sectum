# Console 控制台布局组件

Console 组件是一个完整的控制台布局组件，适用于后台管理系统、仪表盘等场景。它提供了三栏布局：左侧导航栏、中间内容区域和右侧工具栏，集成了多种常用功能组件。

## 特性

- 🎯 **三栏布局** - 左侧导航栏、中间内容区、右侧工具栏的经典控制台布局
- 📋 **导航集成** - 内置 Navbar 组件，支持配置化的导航菜单
- 🛠️ **工具栏集成** - 内置 Toolbar 组件，集成多种常用功能
- 🔄 **路由驱动** - 中间内容区域通过 router-view 展示，支持动态路由切换
- 🎨 **主题适配** - 自动适配暗色模式和主题切换
- 📱 **响应式设计** - 全屏布局，适配不同屏幕尺寸
- 🔧 **灵活配置** - 支持自定义导航项和工具栏组件

## 安装

```ts
import { Console } from 'sectum'
// 或者
import Console from 'sectum'
```

## 基础用法

最简单的 Console 用法（使用默认配置）：

```vue
<template>
  <Console />
</template>

<script setup>
import { Console } from 'sectum'
</script>
```

## 路由配置

Console 组件需要配合 Vue Router 使用。在路由配置中，将 Console 作为父路由：

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Console from '~/packet/Layout/Console/Console.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/console',
      component: Console,
      redirect: '/console/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('~/view/Dashboard.vue'),
          meta: { title: 'Dashboard' }
        },
        {
          path: 'task',
          component: () => import('~/view/Task.vue'),
          meta: { title: 'Task' }
        },
        {
          path: 'project',
          component: () => import('~/view/Project.vue'),
          meta: { title: 'Project' }
        }
      ]
    }
  ]
})
```

## 布局结构

Console 组件采用三栏布局结构：

```
┌─────────────────────────────────────────┐
│  Navbar  │  Router View  │   Toolbar   │
│  (w-20)  │   (flex-1)     │   (w-16)    │
│          │               │             │
│  导航    │   主要内容    │   工具栏    │
│          │               │             │
└─────────────────────────────────────────┘
```

### 左侧导航栏（Navbar）

左侧导航栏宽度为 `w-20`（80px），显示项目 Logo 和导航菜单。导航项会自动添加 `/console` 前缀。

### 中间内容区域（Router View）

中间内容区域使用 `flex-1` 占据剩余空间，通过 `<router-view>` 展示子路由对应的组件。使用 `:key="$route.fullPath"` 确保路由切换时组件正确更新。

### 右侧工具栏（Toolbar）

右侧工具栏宽度为 `w-16`（64px），集成了以下功能组件：

- **Plus** - 创建菜单组件（任务创建、账户创建等）
- **User** - 用户菜单组件（登出、设置等）
- **Dark** - 暗色模式切换组件
- **Theme** - 主题切换组件
- **Language** - 语言切换组件
- **Notice** - 通知菜单组件
- **FullScreen** - 全屏切换组件

## 自定义导航项

Console 组件会自动将导航项的路径转换为 `/console` 前缀。如果你需要自定义导航项，可以通过修改 `navbarItems` 配置：

```vue
<template>
  <Console />
</template>

<script setup>
import { Console } from 'sectum'
import { navbarItems } from 'sectum'

// Console 内部会自动处理路径转换
// 例如：/dashboard -> /console/dashboard
</script>
```

或者直接修改 `Navbar.ts` 中的默认配置：

```typescript
// packet/Layout/Navbar/Navbar.ts
const defaultNavbarItems: NavbarItem[] = [
  {
    title: 'Dashboard',
    icon: 'gauge',
    path: '/dashboard',  // Console 会自动转换为 /console/dashboard
  },
  {
    title: 'Task',
    icon: 'calendar-check',
    path: '/task',  // Console 会自动转换为 /console/task
  }
  // ... 更多导航项
]
```

## 自定义工具栏组件

Console 组件已经内置了所有 Pattern 组件，如果你需要自定义某些组件的行为，可以创建包装组件：

```vue
<template>
  <Console />
</template>

<script setup>
import { Console } from 'sectum'
import CustomPlus from '~/components/CustomPlus.vue'
import CustomUser from '~/components/CustomUser.vue'

// 注意：Console 组件内部已经硬编码了组件导入
// 如果需要完全自定义，需要修改 Console.vue 源码
</script>
```

## 配置项目信息

Console 组件会从配置文件中读取项目名称和 Logo 图标：

```typescript
// config/config.ts
const config = {
  project: {
    name: 'Sectum',  // 显示在导航栏顶部
  }
}
```

在 Console 组件中，Logo 图标默认为 `section`，可以通过修改 Console.vue 源码来更改。

## 样式定制

Console 组件使用 UnoCSS 类名，你可以通过覆盖样式来自定义外观：

```vue
<style scoped>
/* 自定义背景色 */
.console-container {
  background-color: #f5f5f5;
}

/* 自定义导航栏宽度 */
.navbar {
  width: 100px;
}
</style>
```

或者直接修改 Console.vue 中的类名。

## 完整示例

一个完整的使用示例：

```vue
<template>
  <Console />
</template>

<script setup lang="ts">
import { Console } from 'sectum'
</script>
```

对应的路由配置：

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import Console from '~/packet/Layout/Console/Console.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/console',
      component: Console,
      redirect: '/console/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('~/view/console/Dashboard.vue'),
          meta: { title: 'Dashboard' }
        },
        {
          path: 'task',
          component: () => import('~/view/console/Task.vue'),
          meta: { title: 'Task' }
        },
        {
          path: 'project',
          component: () => import('~/view/console/Project.vue'),
          meta: { title: 'Project' }
        },
        {
          path: 'product',
          component: () => import('~/view/console/Product.vue'),
          meta: { title: 'Product' }
        },
        {
          path: 'data',
          component: () => import('~/view/console/Data.vue'),
          meta: { title: 'Data' }
        },
        {
          path: 'website',
          component: () => import('~/view/console/Website.vue'),
          meta: { title: 'Website' }
        }
      ]
    }
  ]
})
```

## 注意事项

1. **路由配置**：Console 组件必须作为父路由使用，子路由通过 `children` 配置
2. **路径转换**：导航项的路径会自动添加 `/console` 前缀，确保路由配置一致
3. **全屏布局**：Console 使用 `w-screen h-screen`，占据整个视口
4. **组件导入**：Console 内部硬编码了 Pattern 组件的导入，如需自定义需要修改源码
5. **路由键值**：使用 `:key="$route.fullPath"` 确保路由切换时组件正确更新

## 相关组件

- [Navbar](./Navbar.md) - 导航栏组件
- [Toolbar](./Toolbar.md) - 工具栏组件
- [Plus](../Pattern/Plus.md) - 创建菜单组件
- [User](../Pattern/User.md) - 用户菜单组件
- [Notice](../Pattern/Notice.md) - 通知菜单组件

