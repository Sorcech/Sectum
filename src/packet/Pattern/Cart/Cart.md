# Notice 通知菜单组件

Notice 通知菜单组件提供通知消息的显示功能。组件使用 Drawer 抽屉模式，提供优雅的用户体验。

## 特性

- 🔔 **通知显示** - 提供通知消息的显示功能
- 📱 **Drawer 模式** - 使用侧边抽屉提供操作界面
- 🎨 **自定义样式** - 支持自定义按钮样式
- 🔔 **点击回调** - 支持通知点击回调
- 🌙 **深色模式** - 完全支持深色模式

## 安装

```ts
import { Notice } from 'sectum'
// 或者
import Notice from 'sectum'
```

## 基础用法

### 导入组件

```typescript
import Notice from '~/packet/Pattern/Notice/Notice.vue'
```

### 基础示例

```vue
<template>
  <Notice 
    button-class="hover:text-primary flex items-center justify-center h-12"
    :on-notice-click="handleNoticeClick"
  />
</template>

<script setup lang="ts">
import Notice from '~/packet/Pattern/Notice/Notice.vue'

const handleNoticeClick = () => {
  console.log('通知被点击')
  // 处理通知点击逻辑，例如加载通知列表
}
</script>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `buttonClass` | `String` | `'hover:text-primary'` | 按钮的 CSS 类名 |
| `onNoticeClick` | `Function` | `undefined` | 通知点击回调函数 |

### 事件

组件不直接暴露事件，通过回调函数与父组件通信。

## 使用场景

### 工具栏集成

```vue
<template>
  <Toolbar>
    <Notice 
      button-class="hover:text-primary flex items-center justify-center h-12"
      :on-notice-click="handleNoticeClick"
    />
  </Toolbar>
</template>

<script setup lang="ts">
import Notice from '~/packet/Pattern/Notice/Notice.vue'

const handleNoticeClick = () => {
  // 加载通知列表
  loadNotifications()
  // 标记通知为已读
  markNotificationsAsRead()
}
</script>
```

### 自定义通知内容

可以通过修改组件内容来自定义通知显示：

```vue
<template>
  <Notice :on-notice-click="handleNoticeClick">
    <template #content>
      <div class="notice-list">
        <div v-for="notice in notices" :key="notice.id" class="notice-item">
          <h3>{{ notice.title }}</h3>
          <p>{{ notice.content }}</p>
          <span>{{ notice.time }}</span>
        </div>
      </div>
    </template>
  </Notice>
</template>
```

## 功能说明

### 通知点击

点击通知按钮后，组件会：

1. 打开 Drawer 显示通知内容
2. 调用 `onNoticeClick` 回调函数

### Drawer 内容

当前 Drawer 中显示简单的通知内容，可以根据需要自定义：

- 显示通知列表
- 显示未读通知数量
- 显示通知详情

## 技术实现

### Drawer 状态管理

```typescript
const isShowDrawer = ref(false)

const toggleDrawer = () => {
  isShowDrawer.value = !isShowDrawer.value
  // 调用父组件传入的通知点击回调
  if (isShowDrawer.value) {
    props.onNoticeClick?.()
  }
}
```

## 样式定制

组件使用 UnoCSS 原子类和主题色彩变量：

- **按钮样式**：通过 `buttonClass` 属性自定义
- **Drawer 宽度**：固定为 `w-64`
- **图标尺寸**：`lg` - 中等尺寸通知图标
- **深色模式**：完全支持深色模式

## 依赖要求

- **Vue 3** - 使用 Composition API
- **sectum/Drawer** - 抽屉组件
- **sectum/Button** - 按钮组件
- **sectum/Icon** - 图标组件

## 注意事项

1. **内容自定义**：当前组件显示简单内容，可以根据需要扩展
2. **回调函数**：建议提供回调函数以处理通知点击逻辑
3. **通知数据**：需要在父组件或通过其他方式管理通知数据

## 扩展功能

### 添加通知列表

可以通过修改组件添加通知列表功能：

1. 添加通知数据状态
2. 在 Drawer 中显示通知列表
3. 添加通知操作（标记已读、删除等）

### 添加未读数量徽章

可以在按钮上添加未读数量徽章：

```vue
<template>
  <div class="relative">
    <btn item :class="buttonClass" @click="toggleDrawer">
      <icn name="bell" light lg></icn>
      <span v-if="unreadCount > 0" class="badge">
        {{ unreadCount }}
      </span>
    </btn>
  </div>
</template>
```

## 最佳实践

1. **统一使用**：在应用中使用统一的通知菜单组件
2. **回调处理**：在回调函数中处理通知加载逻辑
3. **数据管理**：使用状态管理工具管理通知数据
4. **实时更新**：使用 WebSocket 或轮询实时更新通知

## 相关组件

- **[User](./User.md)** - 用户菜单组件
- **[Plus](./Plus.md)** - 创建菜单组件
- **[Toolbar](../Layout/Toolbar.md)** - 工具栏组件（通常包含 Notice 组件）

