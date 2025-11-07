# User 用户菜单组件

User 用户菜单组件提供用户相关的操作功能，包括登出和设置等操作。组件使用 Drawer 抽屉模式，提供优雅的用户体验。

## 特性

- 👤 **用户操作** - 提供登出和设置等用户相关操作
- 📱 **Drawer 模式** - 使用侧边抽屉提供操作界面
- 💾 **状态管理** - 自动清除本地存储的用户数据
- 🔄 **路由跳转** - 支持登出后的路由跳转
- 🎨 **自定义样式** - 支持自定义按钮样式
- 🌐 **国际化支持** - 支持多语言显示
- 🌙 **深色模式** - 完全支持深色模式

## 安装

```ts
import { User } from 'sectum'
// 或者
import User from 'sectum'
```

## 基础用法

### 导入组件

```typescript
import User from '~/packet/Pattern/User/User.vue'
```

### 基础示例

```vue
<template>
  <User 
    button-class="hover:text-primary flex items-center justify-center w-full h-12"
    :on-logout="handleLogout"
    :on-setting-click="handleSettingClick"
    :on-navigate="handleNavigate"
  />
</template>

<script setup lang="ts">
import User from '~/packet/Pattern/User/User.vue'

const handleLogout = () => {
  console.log('用户登出')
}

const handleSettingClick = () => {
  console.log('打开设置')
}

const handleNavigate = (path: string) => {
  // 处理路由跳转
  router.push(path)
}
</script>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `buttonClass` | `String` | `'hover:text-primary'` | 按钮的 CSS 类名 |
| `onLogout` | `Function` | `undefined` | 登出回调函数 |
| `onSettingClick` | `Function` | `undefined` | 设置点击回调函数 |
| `onNavigate` | `Function` | `undefined` | 路由跳转回调函数，接收路径参数 |

### 事件

组件不直接暴露事件，通过回调函数与父组件通信。

## 使用场景

### 工具栏集成

```vue
<template>
  <Toolbar>
    <User 
      button-class="hover:text-primary flex items-center justify-center w-full h-12"
      :on-logout="handleLogout"
      :on-setting-click="handleSettingClick"
      :on-navigate="handleNavigate"
    />
  </Toolbar>
</template>

<script setup lang="ts">
import User from '~/packet/Pattern/User/User.vue'

const handleLogout = async () => {
  // 执行登出逻辑
  await logout()
  // 清除用户数据
}

const handleSettingClick = () => {
  router.push('/settings')
}

const handleNavigate = (path: string) => {
  router.push(path)
}
</script>
```

### 导航栏集成

```vue
<template>
  <Header>
    <User 
      :on-logout="handleLogout"
      :on-setting-click="handleSettingClick"
      :on-navigate="handleNavigate"
    />
  </Header>
</template>
```

## 功能说明

### 登出功能

点击登出按钮后，组件会：

1. 调用 `onLogout` 回调函数
2. 清除本地存储的 Token 和 Expire
3. 清除所有本地存储数据
4. 调用 `onNavigate` 回调函数跳转到首页（默认 `/`）
5. 自动关闭 Drawer

### 设置功能

点击设置按钮后，组件会：

1. 调用 `onSettingClick` 回调函数
2. 自动关闭 Drawer

## 技术实现

### Drawer 状态管理

```typescript
const isShowDrawer = ref(false)

const toggleDrawer = () => {
  isShowDrawer.value = !isShowDrawer.value
}
```

### 登出处理

```typescript
const handleLogout = () => {
  // 调用父组件传入的登出回调
  props.onLogout?.()
  
  // 清除本地存储
  Store.removeLocalStorage('Token')
  Store.removeLocalStorage('Expire')
  Store.clearLocalStorage()
  
  // 路由跳转
  if (props.onNavigate) {
    props.onNavigate('/')
  } else {
    console.warn('Navigation callback not provided')
  }
  
  // 关闭 Drawer
  isShowDrawer.value = false
}
```

## 样式定制

组件使用 UnoCSS 原子类和主题色彩变量：

- **按钮样式**：通过 `buttonClass` 属性自定义
- **Drawer 宽度**：固定为 `w-48`
- **图标尺寸**：`lg` - 中等尺寸用户图标
- **深色模式**：完全支持深色模式

## 依赖要求

- **Vue 3** - 使用 Composition API
- **vue-i18n** - 国际化支持
- **sectum/Store** - 本地存储工具类
- **sectum/Drawer** - 抽屉组件
- **sectum/Menu** - 菜单组件
- **sectum/Button** - 按钮组件
- **sectum/Icon** - 图标组件

## 注意事项

1. **回调函数**：建议提供所有回调函数以确保完整的功能
2. **路由跳转**：如果不提供 `onNavigate`，会在控制台输出警告
3. **本地存储**：组件会自动清除 Token 和 Expire，但不会清除其他业务数据
4. **国际化**：确保国际化文件中包含 `toolbar.logout` 和 `toolbar.setting` 的翻译

## 最佳实践

1. **统一使用**：在应用中使用统一的用户菜单组件
2. **回调处理**：在回调函数中处理业务逻辑，保持组件简洁
3. **路由管理**：使用 `onNavigate` 回调统一管理路由跳转
4. **错误处理**：在 `onLogout` 回调中添加错误处理逻辑

## 相关组件

- **[Plus](./Plus.md)** - 创建菜单组件
- **[Notice](./Notice.md)** - 通知菜单组件
- **[Toolbar](../Layout/Toolbar.md)** - 工具栏组件（通常包含 User 组件）

