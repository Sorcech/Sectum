# DarkChange 深色模式切换组件

深色模式切换组件提供一键切换明暗主题的功能，支持本地存储用户偏好设置。

## 基本用法

### 导入组件

```typescript
import DarkChange from '~/packet/Pattern/Dark/DarkChange.vue'
```

### 基础示例

```vue
<template>
  <div class="flex items-center gap-4">
    <h3>主题切换</h3>
    <DarkChange />
  </div>
</template>

<script setup lang="ts">
import DarkChange from '~/packet/Pattern/Dark/DarkChange.vue'
</script>
```

## 功能特性

- **一键切换**：点击按钮即可在明暗主题间切换
- **状态持久化**：自动保存用户选择到本地存储
- **图标指示**：使用太阳/月亮图标直观显示当前主题
- **响应式**：支持hover效果和主题色彩变量
- **自动初始化**：组件挂载时自动读取保存的主题设置

## 组件结构

### 模板结构

```vue
<template>
  <btn item @click="setDark" class="hover:text-primary">
    <span v-show="!isDark">
      <icn name="sun-bright" light xl></icn>
    </span>
    <span v-show="isDark">
      <icn name="moon-stars" light xl></icn>
    </span>
  </btn>
</template>
```

### 核心功能

1. **主题检测**：组件挂载时检查本地存储中的主题设置
2. **DOM操作**：动态添加/移除`dark`和`light`类到`document.documentElement`
3. **状态同步**：实时更新组件内部状态和DOM类名
4. **持久化存储**：使用`Store.setLocalStorage`保存用户选择

## 使用场景

### 导航栏集成

```vue
<template>
  <header class="navbar bg-base-100 shadow-lg">
    <div class="flex-1">
      <h1 class="text-xl font-bold">我的应用</h1>
    </div>
    <div class="flex-none gap-2">
      <DarkChange />
    </div>
  </header>
</template>
```

### 设置面板

```vue
<template>
  <div class="settings-panel">
    <h3>外观设置</h3>
    <div class="setting-item">
      <span>深色模式</span>
      <DarkChange />
    </div>
  </div>
</template>
```

### 工具栏

```vue
<template>
  <div class="toolbar flex gap-2">
    <btn>保存</btn>
    <btn>编辑</btn>
    <DarkChange />
  </div>
</template>
```

## 技术实现

### 状态管理

```typescript
const isDark = ref<boolean>(false)

// 初始化时读取本地存储
onMounted(() => {
  if (Store.getLocalStorage('dark'))
    isDark.value = Store.getLocalStorage('dark') === 'dark'
  document.documentElement.classList.add(isDark.value ? 'dark' : 'light')
})
```

### 主题切换逻辑

```typescript
function setDark() {
  // 移除当前主题类
  document.documentElement.classList.remove(isDark.value ? 'dark' : 'light')
  
  // 切换状态
  isDark.value = !isDark.value
  
  // 添加新主题类
  document.documentElement.classList.add(isDark.value ? 'dark' : 'light')
  
  // 保存到本地存储
  Store.setLocalStorage('dark', isDark.value ? 'dark' : 'light')
}
```

## 样式定制

组件使用UnoCSS原子类和主题色彩变量：

- **按钮样式**：`btn item` - 使用项目按钮组件
- **悬停效果**：`hover:text-primary` - 使用主题主色
- **图标尺寸**：`xl` - 大尺寸图标
- **主题色彩**：自动适配当前主题色彩变量

## 依赖要求

- Vue 3 Composition API
- 项目Store工具类（用于本地存储）
- 项目Icon组件
- 项目Button组件
- UnoCSS主题系统

## 注意事项

1. 确保项目中已正确配置UnoCSS主题系统
2. 深色模式样式需要在CSS中定义`.dark`类
3. 组件依赖项目的Store工具类进行本地存储
4. 图标组件需要支持`sun-bright`和`moon-stars`图标