# Avatar 头像组件

一个功能丰富的头像组件，支持图片、文字、图标三种显示方式，并提供状态指示功能。

## 特性

- 🖼️ **多种显示方式**: 图片、文字、图标
- 📏 **5种尺寸**: xs, sm, md, lg, xl
- 🔘 **3种形状**: circle (圆形), square (方形), rounded (圆角)
- 🟢 **状态指示**: online, offline, away, busy
- 🎨 **主题色支持**: primary, secondary, success, warning, error
- 🖱️ **可点击**: 支持点击事件
- ♿ **无障碍**: 完整的 alt 文本支持

## 安装

```ts
import { Avatar } from 'sectum'
// 或者
import Avatar from 'sectum'
```

## 基础用法

### 图片头像

```vue
<Avatar src="https://via.placeholder.com/100" alt="用户头像" />
```

### 文字头像

```vue
<Avatar name="张三" />
<Avatar text="AB" />
```

### 图标头像

```vue
<Avatar icon="user" />
<Avatar icon="github" icon-brand />
```

## 尺寸

支持 5 种尺寸：xs, sm, md, lg, xl

```vue
<Avatar src="..." size="xs" />
<Avatar src="..." size="sm" />
<Avatar src="..." size="md" />
<Avatar src="..." size="lg" />
<Avatar src="..." size="xl" />
```

## 形状

支持 3 种形状：circle (圆形), square (方形), rounded (圆角)

```vue
<Avatar src="..." shape="circle" />
<Avatar src="..." shape="square" />
<Avatar src="..." shape="rounded" />
```

## 状态指示

支持 4 种状态：online, offline, away, busy

```vue
<Avatar src="..." status="online" />
<Avatar src="..." status="offline" />
<Avatar src="..." status="away" />
<Avatar src="..." status="busy" />
```

### 状态位置

可以自定义状态指示器的位置：

```vue
<Avatar src="..." status="online" status-position="top-right" />
<Avatar src="..." status="online" status-position="top-left" />
<Avatar src="..." status="online" status-position="bottom-right" />
<Avatar src="..." status="online" status-position="bottom-left" />
```

## 主题色

当使用文字或图标头像时，可以设置背景色：

```vue
<Avatar name="张三" color="primary" />
<Avatar name="李四" color="secondary" />
<Avatar name="王五" color="success" />
<Avatar icon="user" color="warning" />
```

## 可点击

设置 `clickable` 属性后，头像可以点击：

```vue
<Avatar 
  src="..." 
  clickable 
  @click="handleAvatarClick" 
/>
```

## 事件

- `click` - 点击头像时触发（需要设置 `clickable`）
- `error` - 图片加载失败时触发

```vue
<Avatar 
  src="..." 
  clickable 
  @click="handleClick"
  @error="handleError"
/>
```

## API 参考

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | `string` | `undefined` | 图片源地址 |
| `alt` | `string` | `undefined` | 图片替代文本 |
| `name` | `string` | `undefined` | 名称（用于文字头像，显示首字母） |
| `text` | `string` | `undefined` | 自定义文字（用于文字头像） |
| `icon` | `string` | `undefined` | 图标名称（用于图标头像） |
| `iconLight` | `boolean` | `false` | 图标是否为 light 样式 |
| `iconBrand` | `boolean` | `false` | 图标是否为 brand 样式 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 尺寸 |
| `shape` | `'circle' \| 'square' \| 'rounded'` | `'circle'` | 形状 |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy' \| ''` | `''` | 状态 |
| `statusPosition` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'bottom-right'` | 状态位置 |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'default'` | `'default'` | 背景色（文字/图标头像） |
| `clickable` | `boolean` | `false` | 是否可点击 |
| `customClass` | `string` | `undefined` | 自定义类名 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `click` | `event: MouseEvent` | 点击头像时触发 |
| `error` | `error: Event` | 图片加载失败时触发 |

## 使用示例

### 用户列表

```vue
<template>
  <div class="flex flex-col gap-4">
    <div v-for="user in users" :key="user.id" class="flex items-center gap-3">
      <Avatar 
        :src="user.avatar" 
        :name="user.name"
        :status="user.status"
        size="md"
        clickable
        @click="handleUserClick(user)"
      />
      <div>
        <p class="font-semibold">{{ user.name }}</p>
        <p class="text-sm text-base-content/60">{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Avatar } from 'sectum'

const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', avatar: '...', status: 'online' },
  { id: 2, name: '李四', email: 'lisi@example.com', avatar: '...', status: 'away' }
]

const handleUserClick = (user) => {
  console.log('点击了用户:', user)
}
</script>
```

### 头像组

```vue
<template>
  <div class="flex -space-x-2">
    <Avatar 
      v-for="(user, index) in users" 
      :key="user.id"
      :src="user.avatar"
      :name="user.name"
      size="sm"
      :style="{ zIndex: users.length - index }"
    />
  </div>
</template>
```

## 注意事项

1. **优先级**: 图片 > 文字 > 图标 > 默认图标
2. **文字头像**: 如果提供了 `text`，优先使用 `text`；否则使用 `name` 的首字母
3. **图片加载失败**: 如果图片加载失败，会自动回退到文字或图标显示
4. **状态指示器**: 只在设置了 `status` 属性时显示
5. **点击事件**: 需要设置 `clickable` 属性才能触发点击事件

