# Dropdown 下拉菜单组件

Dropdown 下拉菜单组件提供灵活的下拉菜单功能，支持点击和悬停两种触发方式，可自定义位置和内容，适用于导航菜单、操作菜单、用户菜单等场景。

## 特性

- 🎯 **多种位置** - 支持上下左右四个方向，每个方向支持起始和结束对齐
- 🖱️ **触发方式** - 支持点击触发和悬停触发两种模式
- 🎨 **动画效果** - 流畅的过渡动画，提升用户体验
- 📱 **响应式** - 自动适配不同屏幕尺寸
- 🎭 **灵活内容** - 通过插槽自定义触发器和菜单内容
- 🔒 **外部点击关闭** - 自动检测外部点击并关闭菜单
- 🌙 **深色模式** - 完全支持深色模式

## 安装

```ts
import { Dropdown } from 'sectum'
// 或者
import Dropdown from 'sectum'
```

<div class="flex flex-wrap items-center gap-3">
  <Dropdown placement="bottom-start">
    <template #trigger="{ active }">
      <btn :active="active">Bottom-start</btn>
    </template>
    <Menu rounded padding>
      <btn item>Item 1</btn>
      <btn item>Item 2</btn>
      <btn item>Item 3</btn>
    </Menu>
  </Dropdown>
  <Dropdown placement="bottom-end">
    <template #trigger="{ active }">
      <btn :active="active">Bottom-end</btn>
    </template>
    <Menu rounded padding>
      <btn item>Item 1</btn>
      <btn item>Item 2</btn>
      <btn item>Item 3</btn>
    </Menu>
  </Dropdown>
  <Dropdown placement="top-start">
    <template #trigger="{ active }">
      <btn :active="active">Top-start</btn>
    </template>
    <Menu rounded padding>
      <btn item>Item 1</btn>
      <btn item>Item 2</btn>
      <btn item>Item 3</btn>
    </Menu>
  </Dropdown>
  <Dropdown placement="top-end">
    <template #trigger="{ active }">
      <btn :active="active">Top-end</btn>
    </template>
    <Menu rounded padding>
      <btn item>Item 1</btn>
      <btn item>Item 2</btn>
      <btn item>Item 3</btn>
    </Menu>
  </Dropdown>
</div>

```vue
<Dropdown placement="bottom-start">
  <template #trigger="{ active }">
    <btn :active="active">Bottom-start</btn>
  </template>
  <Menu rounded padding>
    <btn item>Item 1</btn>
    <btn item>Item 2</btn>
    <btn item>Item 3</btn>
  </Menu>
</Dropdown>
```

## 快速开始

### 基本结构

```vue
<Dropdown>
  <template #trigger="{ active }">
    <!-- 触发器内容 -->
    <btn :active="active">点击我</btn>
  </template>
  <!-- 下拉内容 -->
  <Menu>
    <btn item>选项 1</btn>
    <btn item>选项 2</btn>
  </Menu>
</Dropdown>
```

### 自定义触发器

触发器可以是任何元素，不仅仅是按钮：

<div class="flex flex-wrap items-center gap-3">
  <Dropdown>
    <template #trigger="{ active }">
      <div class="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
        自定义触发器
      </div>
    </template>
    <Menu rounded padding>
      <btn item>选项 1</btn>
      <btn item>选项 2</btn>
    </Menu>
  </Dropdown>
</div>

```vue
<Dropdown>
  <template #trigger="{ active }">
    <div class="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
      自定义触发器
    </div>
  </template>
  <Menu rounded padding>
    <btn item>选项 1</btn>
    <btn item>选项 2</btn>
  </Menu>
</Dropdown>
```

## 示例展示

### 悬停触发

使用 `hover` 属性可以启用悬停触发模式：

<div class="flex flex-wrap items-center gap-3">
  <Dropdown hover>
    <template #trigger="{ active }">
      <btn :active="active">悬停触发</btn>
    </template>
    <Menu rounded padding>
      <btn item>悬停选项 1</btn>
      <btn item>悬停选项 2</btn>
      <btn item>悬停选项 3</btn>
    </Menu>
  </Dropdown>
</div>

```vue
<Dropdown hover>
  <template #trigger="{ active }">
    <btn :active="active">悬停触发</btn>
  </template>
  <Menu rounded padding>
    <btn item>悬停选项 1</btn>
    <btn item>悬停选项 2</btn>
    <btn item>悬停选项 3</btn>
  </Menu>
</Dropdown>
```

### 不同位置的下拉菜单

<div class="flex flex-wrap items-center gap-3">
  <Dropdown placement="bottom-start">
    <template #trigger="{ active }">
      <btn :active="active">左下</btn>
    </template>
    <Menu rounded padding>
      <btn item>左下位置</btn>
    </Menu>
  </Dropdown>
  <Dropdown placement="bottom-end">
    <template #trigger="{ active }">
      <btn :active="active">右下</btn>
    </template>
    <Menu rounded padding>
      <btn item>右下位置</btn>
    </Menu>
  </Dropdown>
  <Dropdown placement="top-start">
    <template #trigger="{ active }">
      <btn :active="active">左上</btn>
    </template>
    <Menu rounded padding>
      <btn item>左上位置</btn>
    </Menu>
  </Dropdown>
  <Dropdown placement="top-end">
    <template #trigger="{ active }">
      <btn :active="active">右上</btn>
    </template>
    <Menu rounded padding>
      <btn item>右上位置</btn>
    </Menu>
  </Dropdown>
</div>

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| `placement` | `String` | `'bottom-start'` | 否 | 下拉菜单的位置 |
| `hover` | `Boolean` | `false` | 否 | 是否启用悬停触发 |

### placement 可选值

| 值 | 说明 |
|----|------|
| `'bottom-start'` | 在触发器下方，左对齐 |
| `'bottom-end'` | 在触发器下方，右对齐 |
| `'top-start'` | 在触发器上方，左对齐 |
| `'top-end'` | 在触发器上方，右对齐 |

### Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| `trigger` | `{ active: Boolean }` | 触发器内容插槽 |
| `default` | - | 下拉菜单内容插槽 |

### 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `@mouseenter` | - | 鼠标进入触发器时触发 |
| `@mouseleave` | - | 鼠标离开触发器时触发 |
| `@pointerenter` | - | 指针进入触发器时触发 |

## 样式类名

### 基础样式

- `relative flex inline-block` - 容器基础样式
- `absolute block z-50 p-1 mt-1` - 下拉菜单基础样式

### 位置样式

- `left-0 top-full` - bottom-start 位置
- `right-0 top-full` - bottom-end 位置  
- `bottom-full left-0` - top-start 位置
- `bottom-full right-0` - top-end 位置

### 过渡动画

- `transition-all duration-150 ease-out` - 进入动画
- `scale-95 opacity-0` - 进入起始状态
- `scale-100 opacity-100` - 进入结束状态
- `transition-all duration-75 ease-in` - 离开动画

## 自定义样式

### 使用 UnoCSS 原子类

```vue
<Dropdown>
  <template #trigger="{ active }">
    <btn :active="active" class="bg-blue-500 text-white">
      自定义样式按钮
    </btn>
  </template>
  <Menu class="bg-white shadow-lg border rounded-lg">
    <btn item class="hover:bg-blue-50">选项 1</btn>
    <btn item class="hover:bg-blue-50">选项 2</btn>
  </Menu>
</Dropdown>
```

### 响应式设计

```vue
<Dropdown>
  <template #trigger="{ active }">
    <btn :active="active" class="sm:text-sm md:text-base lg:text-lg">
      响应式按钮
    </btn>
  </template>
  <Menu class="w-48 sm:w-32 md:w-48 lg:w-64">
    <btn item>响应式菜单</btn>
  </Menu>
</Dropdown>
```

## Dark 模式支持

Dropdown 组件完全支持 Dark 模式，会自动适应主题变化：

```vue
<Dropdown>
  <template #trigger="{ active }">
    <btn :active="active" class="bg-base-100 text-base-content">
      Dark 模式按钮
    </btn>
  </template>
  <Menu class="bg-base-200 text-base-content">
    <btn item class="hover:bg-base-300">Dark 模式选项</btn>
  </Menu>
</Dropdown>
```

## 注意事项

1. **触发器插槽**：必须使用 `#trigger` 插槽来定义触发器内容
2. **active 状态**：触发器插槽会接收 `active` 参数，可用于显示激活状态
3. **点击外部关闭**：组件会自动处理点击外部区域关闭下拉菜单
4. **z-index 层级**：下拉菜单使用 `z-50` 确保显示在其他元素之上
5. **悬停模式**：启用 `hover` 模式时，点击触发器不会切换状态

## 最佳实践

1. **合理使用位置**：根据页面布局选择合适的 `placement` 值
2. **保持一致性**：在同一页面中使用相同的触发器样式
3. **提供视觉反馈**：使用 `active` 状态为触发器提供视觉反馈
4. **考虑移动端**：在移动设备上考虑使用点击模式而非悬停模式
5. **无障碍访问**：确保触发器有适当的键盘导航支持

## 完整示例

```vue
<template>
  <div class="p-4 space-y-4">
    <!-- 基础下拉菜单 -->
    <Dropdown placement="bottom-start">
      <template #trigger="{ active }">
        <btn :active="active" variant="outline">
          基础菜单
        </btn>
      </template>
      <Menu rounded padding>
        <btn item @click="handleAction('edit')">编辑</btn>
        <btn item @click="handleAction('delete')">删除</btn>
        <btn item @click="handleAction('share')">分享</btn>
      </Menu>
    </Dropdown>

    <!-- 悬停触发菜单 -->
    <Dropdown hover placement="bottom-end">
      <template #trigger="{ active }">
        <btn :active="active" color="primary">
          悬停菜单
        </btn>
      </template>
      <Menu rounded padding>
        <btn item>快速操作 1</btn>
        <btn item>快速操作 2</btn>
      </Menu>
    </Dropdown>

    <!-- 自定义样式菜单 -->
    <Dropdown placement="top-start">
      <template #trigger="{ active }">
        <div :class="[
          'px-4 py-2 rounded-lg border-2 transition-all',
          active ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        ]">
          自定义触发器
        </div>
      </template>
      <Menu class="bg-white shadow-xl border rounded-xl p-2">
        <btn item class="w-full text-left hover:bg-gray-100">
          自定义选项 1
        </btn>
        <btn item class="w-full text-left hover:bg-gray-100">
          自定义选项 2
        </btn>
      </Menu>
    </Dropdown>
  </div>
</template>

<script setup>
const handleAction = (action) => {
  console.log('执行操作:', action)
}
</script>
```