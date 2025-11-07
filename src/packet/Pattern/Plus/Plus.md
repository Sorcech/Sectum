# Plus 创建菜单组件

Plus 创建菜单组件提供快速创建功能，包括任务创建和账户创建等操作。组件使用 Drawer 抽屉模式，提供优雅的用户体验。

## 特性

- ➕ **快速创建** - 提供任务和账户等快速创建功能
- 📱 **Drawer 模式** - 使用侧边抽屉提供操作界面
- 🎨 **动态宽度** - Drawer 宽度根据内容动态调整
- 📋 **表单集成** - 集成 TaskCreate 和 AccountCreate 表单组件
- 🎯 **状态管理** - 自动管理表单显示状态
- 🎨 **自定义样式** - 支持自定义按钮样式
- 🌐 **国际化支持** - 支持多语言显示
- 🌙 **深色模式** - 完全支持深色模式

## 安装

```ts
import { Plus } from 'sectum'
// 或者
import Plus from 'sectum'
```

## 基础用法

### 导入组件

```typescript
import Plus from '~/packet/Pattern/Plus/Plus.vue'
```

### 基础示例

```vue
<template>
  <Plus 
    button-class="hover:text-primary flex items-center justify-center w-full h-12"
    :on-task-create="handleTaskCreate"
    :on-account-create="handleAccountCreate"
  />
</template>

<script setup lang="ts">
import Plus from '~/packet/Pattern/Plus/Plus.vue'

const handleTaskCreate = (formData?: any) => {
  if (formData) {
    console.log('创建任务:', formData)
    // 处理任务创建逻辑
  } else {
    console.log('打开任务创建表单')
  }
}

const handleAccountCreate = (formData?: any) => {
  if (formData) {
    console.log('创建账户:', formData)
    // 处理账户创建逻辑
  } else {
    console.log('打开账户创建表单')
  }
}
</script>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `buttonClass` | `String` | `'hover:text-primary'` | 按钮的 CSS 类名 |
| `onTaskCreate` | `Function` | `undefined` | 任务创建回调函数，接收可选的 formData 参数 |
| `onAccountCreate` | `Function` | `undefined` | 账户创建回调函数，接收可选的 formData 参数 |

### 事件

组件不直接暴露事件，通过回调函数与父组件通信。

## 使用场景

### 工具栏集成

```vue
<template>
  <Toolbar>
    <Plus 
      button-class="hover:text-primary flex items-center justify-center w-full h-12"
      :on-task-create="handleTaskCreate"
      :on-account-create="handleAccountCreate"
    />
  </Toolbar>
</template>

<script setup lang="ts">
import Plus from '~/packet/Pattern/Plus/Plus.vue'

const handleTaskCreate = async (formData?: any) => {
  if (formData) {
    // 提交任务创建
    await createTask(formData)
  }
}

const handleAccountCreate = async (formData?: any) => {
  if (formData) {
    // 提交账户创建
    await createAccount(formData)
  }
}
</script>
```

## 功能说明

### Drawer 宽度管理

组件会根据显示的内容动态调整 Drawer 宽度：

- **初始状态**：`w-32` - 仅显示菜单时
- **显示表单**：`w-100` - 显示表单时自动扩展

### 表单状态管理

组件自动管理表单的显示状态：

1. 点击任务按钮：显示 TaskCreate 表单，隐藏 AccountCreate 表单
2. 点击账户按钮：显示 AccountCreate 表单，隐藏 TaskCreate 表单
3. 关闭 Drawer：自动重置所有表单状态

### 表单回调

组件集成了表单的提交、成功和错误回调：

- **onSubmit**：表单提交时调用 `onTaskCreate` 或 `onAccountCreate`
- **onSuccess**：表单提交成功时输出日志
- **onError**：表单提交失败时输出错误信息

## 技术实现

### Drawer 状态管理

```typescript
const isShowDrawer = ref(false)
const isShowTaskForm = ref(false)
const isShowAccountForm = ref(false)
const drawerWidth = ref('w-32')

const toggleDrawer = () => {
  isShowDrawer.value = !isShowDrawer.value
  if (!isShowDrawer.value) {
    // 关闭 Drawer 时重置表单状态
    isShowTaskForm.value = false
    isShowAccountForm.value = false
    drawerWidth.value = 'w-32'
  }
}
```

### 任务点击处理

```typescript
const handleTaskClick = () => {
  isShowTaskForm.value = true
  isShowAccountForm.value = false
  drawerWidth.value = 'w-100'
  props.onTaskCreate?.()
}
```

### 表单回调处理

```typescript
const handleTaskSubmit = async (formData: any) => {
  props.onTaskCreate?.(formData)
}

const handleTaskSuccess = (response: any) => {
  console.log('任务创建成功:', response)
}

const handleTaskError = (error: any, response?: any) => {
  console.error('任务创建失败:', error)
  if (response?.data?.message) {
    console.error('错误信息:', response.data.message)
  }
}
```

## 样式定制

组件使用 UnoCSS 原子类和主题色彩变量：

- **按钮样式**：通过 `buttonClass` 属性自定义
- **Drawer 宽度**：动态调整（`w-32` 或 `w-100`）
- **菜单样式**：左侧固定宽度菜单（`w-36`）
- **表单区域**：右侧自适应宽度
- **图标尺寸**：`lg` - 中等尺寸图标

## 依赖要求

- **Vue 3** - 使用 Composition API
- **vue-i18n** - 国际化支持
- **sectum/Drawer** - 抽屉组件
- **sectum/Menu** - 菜单组件
- **sectum/Button** - 按钮组件
- **sectum/Icon** - 图标组件
- **TaskCreate** - 任务创建表单组件
- **AccountCreate** - 账户创建表单组件

## 注意事项

1. **表单组件**：确保 TaskCreate 和 AccountCreate 组件已正确导入
2. **回调函数**：建议提供回调函数以处理表单提交
3. **国际化**：确保国际化文件中包含 `toolbar.plus`、`task.task` 和 `toolbar.account` 的翻译
4. **表单状态**：关闭 Drawer 时会自动重置表单状态

## 扩展功能

### 添加新的创建选项

可以通过修改组件添加新的创建选项：

1. 在 Menu 中添加新的按钮
2. 添加对应的表单显示状态
3. 添加对应的点击处理函数
4. 在 Drawer 中添加对应的表单组件

## 最佳实践

1. **统一使用**：在应用中使用统一的创建菜单组件
2. **回调处理**：在回调函数中处理业务逻辑，保持组件简洁
3. **表单验证**：在表单组件中处理验证逻辑
4. **错误处理**：在回调函数中添加错误处理逻辑

## 相关组件

- **[User](./User.md)** - 用户菜单组件
- **[Notice](./Notice.md)** - 通知菜单组件
- **[Toolbar](../Layout/Toolbar.md)** - 工具栏组件（通常包含 Plus 组件）
- **[TaskCreate](../Model/Forms/TaskCreate.md)** - 任务创建表单组件
- **[AccountCreate](../Model/Forms/AccountCreate.md)** - 账户创建表单组件

