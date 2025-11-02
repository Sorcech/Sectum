# Toolbar 工具栏组件

Toolbar 组件是一个功能丰富的侧边工具栏组件，提供了多种常用功能的快捷入口，包括创建任务/账户、用户管理、主题切换、语言切换、通知、搜索、全屏等功能。所有功能都通过回调函数实现，便于与业务逻辑集成。

## 特性

- 🛠️ **多功能集成** - 集成了多种常用功能入口
- 📝 **表单集成** - 内置任务和账户创建表单
- 🎨 **主题切换** - 支持多主题切换
- 🌍 **国际化** - 支持语言切换
- 🔍 **搜索功能** - 可配置的搜索入口
- 📱 **抽屉式展示** - 功能以抽屉形式展开
- ⚙️ **完全可定制** - 所有功能通过回调函数实现

## 安装

```ts
import { Toolbar } from 'sectum'
// 或者
import Toolbar from 'sectum'
```

## 基础用法

最简单的 Toolbar 用法：

<Toolbar />

```vue
<template>
  <Toolbar />
</template>

<script setup>
import { Toolbar } from 'sectum'
</script>
```

## 完整功能配置

配置所有回调函数以使用完整功能：

```vue
<template>
  <Toolbar 
    :on-logout="handleLogout"
    :on-theme-change="handleThemeChange"
    :on-language-change="handleLanguageChange"
    :on-navigate="handleNavigate"
    :on-task-create="handleTaskCreate"
    :on-account-create="handleAccountCreate"
    :on-notice-click="handleNoticeClick"
    :on-search-click="handleSearchClick"
    :on-setting-click="handleSettingClick"
  />
</template>

<script setup>
import { Toolbar } from 'sectum'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = async () => {
  // 处理登出逻辑
  await logout()
  console.log('用户已登出')
}

const handleThemeChange = (theme) => {
  console.log('切换主题:', theme)
  // 应用主题
}

const handleLanguageChange = (locale) => {
  console.log('切换语言:', locale)
  // 更新语言
}

const handleNavigate = (path) => {
  router.push(path)
}

const handleTaskCreate = (formData) => {
  console.log('创建任务:', formData)
  // 提交任务数据
}

const handleAccountCreate = (formData) => {
  console.log('创建账户:', formData)
  // 提交账户数据
}

const handleNoticeClick = () => {
  console.log('查看通知')
}

const handleSearchClick = () => {
  console.log('打开搜索')
}

const handleSettingClick = () => {
  router.push('/settings')
}
</script>
```

## 功能说明

### 1. 创建功能（Plus）

点击加号按钮打开创建抽屉，可以创建任务或账户：

```vue
<Toolbar :on-task-create="handleTaskCreate" :on-account-create="handleAccountCreate" />
```

### 2. 用户管理（User）

用户相关操作，包括登出和设置：

```vue
<Toolbar 
  :on-logout="handleLogout"
  :on-setting-click="handleSettingClick"
/>
```

### 3. 主题切换（Theme）

切换应用主题颜色：

```vue
<Toolbar :on-theme-change="handleThemeChange" />
```

支持的主题：
- `theme-default` - 默认主题（蓝色）
- `theme-teal` - 青色主题
- `theme-rose` - 玫瑰色主题
- `theme-violet` - 紫色主题
- `theme-orange` - 橙色主题

### 4. 语言切换（Language）

切换应用语言：

```vue
<Toolbar :on-language-change="handleLanguageChange" />
```

支持的语言：
- `zh-CN` - 中文
- `en-US` - 英文

### 5. 通知（Notice）

查看通知：

```vue
<Toolbar :on-notice-click="handleNoticeClick" />
```

### 6. 搜索（Search）

打开搜索功能：

```vue
<Toolbar :on-search-click="handleSearchClick" />
```

### 7. 全屏（FullScreen）

切换全屏模式，内置支持，无需额外配置。

## 表单集成

Toolbar 组件内置了任务和账户创建表单（TaskCreate 和 AccountCreate），这些组件需要通过业务逻辑提供。

### 任务创建

```vue
<Toolbar :on-task-create="handleTaskCreate" />

<script setup>
const handleTaskCreate = (formData) => {
  // formData 包含任务表单数据
  return fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(formData)
  })
}
</script>
```

### 账户创建

```vue
<Toolbar :on-account-create="handleAccountCreate" />

<script setup>
const handleAccountCreate = (formData) => {
  // formData 包含账户表单数据
  return fetch('/api/accounts', {
    method: 'POST',
    body: JSON.stringify(formData)
  })
}
</script>
```

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `on-logout` | `Function` | `undefined` | 登出回调函数 |
| `on-theme-change` | `Function` | `undefined` | 主题切换回调函数，接收主题名称作为参数 |
| `on-language-change` | `Function` | `undefined` | 语言切换回调函数，接收语言代码（`'zh-CN' \| 'en-US'`）作为参数 |
| `on-navigate` | `Function` | `undefined` | 导航回调函数，接收路径作为参数，用于登出后的跳转 |
| `on-task-create` | `Function` | `undefined` | 任务创建回调函数，接收表单数据作为参数 |
| `on-account-create` | `Function` | `undefined` | 账户创建回调函数，接收表单数据作为参数 |
| `on-notice-click` | `Function` | `undefined` | 通知点击回调函数 |
| `on-search-click` | `Function` | `undefined` | 搜索点击回调函数 |
| `on-setting-click` | `Function` | `undefined` | 设置点击回调函数 |

### 插槽

Toolbar 组件不提供插槽。

### 本地存储

Toolbar 组件使用以下本地存储：

- `locale` - 存储当前语言设置
- `theme` - 存储当前主题设置
- `Token` - 存储用户令牌（登出时清除）
- `Expire` - 存储令牌过期时间（登出时清除）

## 样式自定义

Toolbar 组件使用 UnoCSS 类名，主要样式：

- 容器：`flex flex-row`
- 工具栏：`flex flex-col h-screen w-16 bg-base-100 dark:bg-gray-800`
- 按钮：`hover:text-primary flex items-center justify-center w-full h-12`

## 最佳实践

1. **回调函数**：所有功能都通过回调函数实现，确保与业务逻辑解耦
2. **错误处理**：在回调函数中添加适当的错误处理逻辑
3. **导航处理**：使用 `on-navigate` 统一处理路由跳转，便于维护
4. **表单验证**：确保 TaskCreate 和 AccountCreate 组件包含适当的表单验证
5. **权限控制**：根据用户权限显示/隐藏某些功能按钮

## 注意事项

- Toolbar 组件宽度固定为 `w-16`（64px）
- 所有抽屉的显示/隐藏由组件内部管理
- 主题切换会自动保存到本地存储，并在页面刷新后恢复
- 语言切换会自动保存到本地存储，并在页面刷新后恢复
- 登出时会清除 Token 和 Expire，但不会清除其他本地存储数据
- TaskCreate 和 AccountCreate 组件需要从业务模块导入，Sectum 不提供这些组件
- 如果未提供 `on-navigate` 且触发登出，会在控制台输出警告信息

