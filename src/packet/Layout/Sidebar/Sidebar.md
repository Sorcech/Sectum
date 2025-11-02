# Sidebar 侧边栏组件

Sidebar 组件是一个功能丰富的侧边栏导航组件，支持多级路由展示、响应式布局、移动端适配等功能。它可以从路由配置自动生成导航菜单，并支持与 Header 组件联动。

## 特性

- 🗺️ **路由驱动** - 自动从路由配置生成导航菜单
- 📱 **响应式** - 移动端自动折叠，支持抽屉式展示
- 🎯 **路由高亮** - 自动高亮当前路由对应的菜单项
- 🔗 **导航集成** - 支持自定义导航处理函数
- 🎨 **主题适配** - 自动适配暗色模式
- 💫 **平滑动画** - 支持平滑的展开/收起动画

## 安装

```ts
import { Sidebar } from 'sectum'
// 或者
import Sidebar from 'sectum'
```

## 基础用法

最简单的 Sidebar 用法，传入路由配置：

```vue
<template>
  <Sidebar :routes="routes" />
</template>

<script setup>
import { Sidebar } from 'sectum'
import { routes } from './router'

const routes = [
  {
    path: '/sectum',
    children: [
      {
        path: '/sectum/',
        meta: { title: 'Element' },
        children: [
          {
            path: '/sectum/button',
            meta: { title: 'Button' }
          },
          {
            path: '/sectum/input',
            meta: { title: 'Input' }
          }
        ]
      }
    ]
  }
]
</script>
```

## 自定义导航处理

使用 `on-navigate` 属性自定义导航行为：

```vue
<template>
  <Sidebar 
    :routes="routes"
    :on-navigate="handleNavigate"
  />
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleNavigate = (path) => {
  // 自定义导航逻辑
  router.push(path)
  // 可以添加额外的逻辑，如埋点、权限检查等
  console.log('导航到:', path)
}
</script>
```

## 路由配置格式

Sidebar 组件需要特定的路由配置格式：

```typescript
const routes = [
  {
    path: '/sectum',
    children: [
      {
        path: '/sectum/',  // 父级路由
        meta: { title: '分组名称' },
        children: [        // 子路由列表
          {
            path: '/sectum/button',
            meta: { title: 'Button' }
          },
          {
            path: '/sectum/input',
            meta: { title: 'Input' }
          }
        ]
      },
      {
        path: '/sectum/',
        meta: { title: '另一个分组' },
        children: [
          {
            path: '/sectum/modal',
            meta: { title: 'Modal' }
          }
        ]
      }
    ]
  }
]
```

### 路由结构说明

- 根路由：包含 `children` 数组的路由对象
- 分组路由：`meta.title` 作为分组标题显示
- 菜单项路由：`meta.title` 作为菜单项文本显示

## 与 Header 联动

Sidebar 组件会自动监听来自 Header 组件的 `toggle-sidebar` 事件：

```vue
<template>
  <div>
    <Header project-name="Sectum" />
    <Sidebar :routes="routes" />
  </div>
</template>

<script setup>
import { Header, Sidebar } from 'sectum'
</script>
```

在移动端，点击 Header 的菜单按钮会自动切换 Sidebar 的显示/隐藏状态。

## 响应式行为

- **桌面端（≥lg）**：Sidebar 始终显示，宽度固定为 `w-70`（280px）
- **移动端（<lg）**：
  - Sidebar 默认隐藏
  - 点击 Header 菜单按钮后以抽屉形式显示
  - 显示遮罩层（Backdrop）
  - 可以通过遮罩层或关闭按钮关闭

## 样式自定义

Sidebar 组件使用 UnoCSS 类名，支持通过主题配置自定义样式：

- 容器：`fixed lg:relative flex flex-col flex-none w-70 bg-base-200 border-r`
- 标题：`menu-title block text-base text-md font-bold bg-base-100 p-3`
- 菜单项：`block w-full text-left px-3`
- 选中状态：`!border-l-2 !border-primary bg-base-100`
- 未选中状态：`!border-l-2 !border-transparent`

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `routes` | `Array` | `[]` | 路由配置数组，用于生成导航菜单 |
| `on-navigate` | `Function` | `undefined` | 导航处理函数，接收路径作为参数 |

### 插槽

Sidebar 组件不提供插槽。

### 事件

Sidebar 组件监听以下全局事件：

- `toggle-sidebar` - 切换侧边栏显示/隐藏状态（由 Header 组件触发）

## 最佳实践

1. **路由配置**：确保路由配置的格式符合 Sidebar 的要求，特别是 `meta.title` 属性
2. **导航处理**：如果需要在导航时执行额外逻辑（如权限检查、埋点等），使用 `on-navigate` prop
3. **响应式测试**：在不同屏幕尺寸下测试 Sidebar 的显示效果
4. **首页处理**：在首页时，Sidebar 会自动隐藏（仅限移动端）

## 注意事项

- Sidebar 组件会自动查找 `path === '/sectum'` 的路由作为根路由
- 如果路由配置中没有 `/sectum` 路由，Sidebar 将不会显示任何菜单
- 只有包含 `meta.title` 和 `children` 的分组才会显示
- 移动端的遮罩层会阻止用户与页面其他部分交互
- Sidebar 的 z-index 会根据显示状态自动调整

