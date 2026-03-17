# Select 选择器组件

Select 选择器组件用于在多个选项中进行选择，支持三种模式：默认模式、用户模式和项目模式。适用于表单选择、数据筛选、用户选择、项目选择等场景。

## 特性

- 📋 **下拉选择** - 优雅的下拉菜单选择界面
- 🎯 **三种模式** - 支持默认模式、用户模式、项目模式
- 🎨 **灵活配置** - 支持自定义字段名、占位符、标签等
- 📏 **多种尺寸** - 支持 xs/sm/md/lg/xl 多种尺寸
- 🎨 **多种布局** - 支持水平（row）和垂直（col）布局
- 📐 **宽度控制** - 支持自定义标签宽度、输入宽度和全宽模式
- 🔒 **禁用状态** - 支持禁用状态
- 💾 **预设值** - 支持预设选中值
- 🌙 **深色模式** - 完全支持深色模式
- 📱 **响应式** - 自适应不同屏幕尺寸
- ♿ **无障碍** - 支持键盘导航

## 安装

组件已全局注册为 `slct`，可直接在模板中使用，无需导入。

## 快速开始

### 基本结构

```vue
<slct 
  :options="options"
  mode="default"
  placeholder="请选择"
/>
```

### 数据格式

所有模式统一使用 `SelectOption` 类型：

```typescript
// 统一选项类型（所有模式通用）
interface SelectOption {
  // 必需：唯一标识和值绑定
  value?: string | number
  // 必需：显示文本
  label?: string
  // 允许其他任意字段
  [key: string]: any
}
```

**字段说明**：
- `value`: 唯一标识和值绑定（必需）
- `label`: 显示文本（必需）
- 其他字段：可根据模式需要添加，如用户模式的 `user`（头像图片）、`icon`（图标）、`status`（状态）等

## 模式说明

### 默认模式 (default)

默认模式使用输入框样式显示选中的值，适合常规的选项选择。

### 用户模式 (user)

用户模式使用 User 组件显示选中的用户，适合用户选择场景。触发器使用统一的样式设定，与项目模式保持一致。

**触发器样式**：
- 外层容器：`relative flex items-center bg-base-100 rounded-$rounded-btn`
- 宽度：根据 `showPlaceholder` 属性动态设置（`w-full` 或 `w-16`）
- 内层触发器：统一的 `triggerBaseClasses`，包含边框、圆角、悬停效果等

### 项目模式 (project)

项目模式使用图标和文本显示选中的项目，支持从本地存储加载项目列表或通过 `projects` 属性注入数据，适合项目选择场景。触发器使用统一的样式设定，与用户模式保持一致。

**触发器样式**：
- 外层容器：`relative flex items-center bg-base-100 rounded-$rounded-btn w-full`
- 内层触发器：统一的 `triggerBaseClasses`，包含边框、圆角、悬停效果等

**样式统一**：用户模式和项目模式现在使用相同的 `modeContainerClasses` 和 `triggerBaseClasses` 计算属性，确保样式参数一致，便于维护和统一。

## 示例展示

### 默认模式

<div class="flex flex-wrap items-center gap-3">
  <slct :options="[
    { label: '中国', value: 'china' },
    { label: '美国', value: 'america' },
    { label: '日本', value: 'japan' },
    { label: '英国', value: 'england' },
    { label: '俄罗斯', value: 'russia' }
  ]" />
</div>

```vue
<template>
  <slct :options="options" />
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' },
  { label: '英国', value: 'england' },
  { label: '俄罗斯', value: 'russia' }
]
</script>
```

### 默认模式 - 带标签

<div class="flex flex-wrap items-center gap-3">
  <slct 
    label="国籍" 
    :options="[
      { label: '中国', value: 'china' },
      { label: '美国', value: 'america' },
      { label: '日本', value: 'japan' },
      { label: '英国', value: 'england' },
      { label: '俄罗斯', value: 'russia' }
    ]" 
  />
</div>

```vue
<template>
  <slct label="国籍" :options="options" />
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' },
  { label: '英国', value: 'england' },
  { label: '俄罗斯', value: 'russia' }
]
</script>
```

### 用户模式 - 基础示例

<div class="flex flex-wrap items-center gap-3">
  <slct 
    mode="user"
    label="选择用户"
    :options="[
      { value: 1, label: '张三', user: '...', status: 'online' },
      { value: 2, label: '李四', user: '...', status: 'away' },
      { value: 3, label: '王五', icon: 'user', status: 'offline' }
    ]"
  />
</div>

```vue
<template>
  <slct 
    mode="user"
    :options="users"
    v-model="selectedUserId"
    @select="handleUserSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedUserId = ref(null)

const users = [
  { 
    value: 1, 
    label: '张三', 
    user: 'https://...',
    status: 'online'
  },
  { 
    value: 2, 
    label: '李四', 
    user: 'https://...',
    status: 'away'
  },
  { 
    value: 3, 
    label: '王五', 
    icon: 'user',
    status: 'offline'
  }
]

const handleUserSelect = (user) => {
  console.log('选中的用户:', user)
}
</script>
```

### 用户模式 - 不同用户尺寸

<div class="flex flex-wrap items-center gap-3">
  <div class="space-y-4">
    <slct 
      mode="user"
      user-size="xs"
      label="小头像"
      :options="[
        { value: 1, label: '张三', user: '...', status: 'online' },
        { value: 2, label: '李四', user: '...', status: 'away' }
      ]"
    />
    <slct 
      mode="user"
      user-size="sm"
      label="标准头像"
      :options="[
        { value: 1, label: '张三', user: '...', status: 'online' },
        { value: 2, label: '李四', user: '...', status: 'away' }
      ]"
    />
    <slct 
      mode="user"
      user-size="md"
      label="大头像"
      :options="[
        { value: 1, label: '张三', user: '...', status: 'online' },
        { value: 2, label: '李四', user: '...', status: 'away' }
      ]"
    />
  </div>
</div>

```vue
<template>
  <div class="space-y-4">
    <slct 
      mode="user"
      user-size="xs"
      :options="users"
      label="小头像"
    />
    <slct 
      mode="user"
      user-size="sm"
      :options="users"
      label="标准头像"
    />
    <slct 
      mode="user"
      user-size="md"
      :options="users"
      label="大头像"
    />
  </div>
</template>

<script setup lang="ts">
const users = [
  { value: 1, label: '张三', user: 'https://...', status: 'online' },
  { value: 2, label: '李四', user: 'https://...', status: 'away' },
  { value: 3, label: '王五', icon: 'user', status: 'offline' }
]
</script>
```

### 用户模式 - 带状态指示

<div class="flex flex-wrap items-center gap-3">
  <slct 
    mode="user"
    label="在线用户"
    :options="[
      { value: 1, label: '在线用户', user: '...', status: 'online' },
      { value: 2, label: '离开用户', user: '...', status: 'away' },
      { value: 3, label: '忙碌用户', user: '...', status: 'busy' },
      { value: 4, label: '离线用户', user: '...', status: 'offline' }
    ]"
  />
</div>

```vue
<template>
  <slct 
    mode="user"
    label="在线用户"
    :options="users"
  />
</template>

<script setup lang="ts">
const users = [
  { value: 1, label: '在线用户', user: 'https://...', status: 'online' },
  { value: 2, label: '离开用户', user: 'https://...', status: 'away' },
  { value: 3, label: '忙碌用户', user: 'https://...', status: 'busy' },
  { value: 4, label: '离线用户', user: 'https://...', status: 'offline' }
]
</script>
```

### 用户模式 - 隐藏占位符

<div class="flex flex-wrap items-center gap-3">
  <slct 
    mode="user"
    label="选择用户（无占位符）"
    :show-placeholder="false"
    :options="[
      { value: 1, label: '张三', user: '...', status: 'online' },
      { value: 2, label: '李四', user: '...', status: 'away' },
      { value: 3, label: '王五', user: '...', status: 'offline' }
    ]"
  />
</div>

```vue
<template>
  <slct 
    mode="user"
    label="选择用户"
    :show-placeholder="false"
    :options="users"
    v-model="selectedUserId"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedUserId = ref(null)

const users = [
  { 
    value: 1, 
    label: '张三', 
    user: 'https://...',
    status: 'online'
  },
  { 
    value: 2, 
    label: '李四', 
    user: 'https://...',
    status: 'away'
  },
  { 
    value: 3, 
    label: '王五', 
    icon: 'user',
    status: 'offline'
  }
]
</script>
```

### 项目模式 - 从本地存储加载

<div class="flex flex-wrap items-center gap-3">
  <slct 
    mode="project"
    label="选择项目"
    :load-projects="true"
  />
</div>

```vue
<template>
  <slct 
    mode="project"
    v-model="selectedProjectName"
    :load-projects="true"
    @select="handleProjectSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedProjectName = ref(null)

const handleProjectSelect = (project) => {
  console.log('选中的项目:', project)
}
</script>
```

**注意**：项目模式支持从本地存储（localStorage）加载项目列表，通过 `loadProjects` 属性控制。如果需要使用自定义数据，请使用 `projects` 属性直接注入。

### 项目模式 - 自定义项目列表

<div class="flex flex-wrap items-center gap-3">
  <slct 
    mode="project"
    label="我的项目"
    :load-projects="false"
    :projects="[
      { value: 1, label: 'Web项目' },
      { value: 2, label: '移动应用' },
      { value: 3, label: '桌面应用' }
    ]"
  />
</div>

```vue
<template>
  <slct 
    mode="project"
    :projects="customProjects"
    :load-projects="false"
    v-model="selectedProjectName"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedProjectName = ref(null)

const customProjects = [
  {
    value: 1,
    label: '我的项目1'
  },
  {
    value: 2,
    label: '我的项目2'
  }
]
</script>
```

### 不同尺寸

<div class="flex flex-wrap items-center gap-3">
  <div class="space-y-4">
    <slct size="xs" placeholder="超小尺寸" :options="[
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]" />
    <slct size="sm" placeholder="小尺寸" :options="[
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]" />
    <slct size="md" placeholder="中等尺寸" :options="[
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]" />
    <slct size="lg" placeholder="大尺寸" :options="[
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]" />
    <slct size="xl" placeholder="超大尺寸" :options="[
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]" />
  </div>
</div>

```vue
<template>
  <div class="space-y-4">
    <slct size="xs" placeholder="超小尺寸" :options="options" />
    <slct size="sm" placeholder="小尺寸" :options="options" />
    <slct size="md" placeholder="中等尺寸" :options="options" />
    <slct size="lg" placeholder="大尺寸" :options="options" />
    <slct size="xl" placeholder="超大尺寸" :options="options" />
  </div>
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>
```

### 禁用状态

<div class="flex flex-wrap items-center gap-3">
  <slct 
    :options="[
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]" 
    disabled 
    placeholder="禁用状态" 
  />
</div>

```vue
<template>
  <slct :options="options" disabled placeholder="禁用状态" />
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>
```

### 自定义字段名

<div class="flex flex-wrap items-center gap-3">
  <slct 
    :options="[
      { id: 1, name: '张三' },
      { id: 2, name: '李四' },
      { id: 3, name: '王五' }
    ]" 
    field-label="name" 
    field-value="id"
    placeholder="选择用户"
  />
</div>

```vue
<template>
  <slct 
    :options="options" 
    field-label="name" 
    field-value="id"
    placeholder="选择用户"
  />
</template>

<script setup lang="ts">
const options = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' }
]
</script>
```

### 使用 v-model

<div class="flex flex-wrap items-center gap-3">
  <slct 
    :options="[
      { label: '中国', value: 'china' },
      { label: '美国', value: 'america' },
      { label: '日本', value: 'japan' }
    ]" 
    selected="china"
  />
</div>

```vue
<template>
  <slct 
    :options="options" 
    v-model="selectedValue"
    @select="handleSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' }
]

const selectedValue = ref('china')

const handleSelect = (item) => {
  console.log('选中的项:', item)
}
</script>
```

### 单行布局（水平布局）

单行布局时，标签和选择器在同一行显示，标签在左侧，选择器在右侧。可以通过 `label-width` 限制标签宽度，通过 `input-width` 或 `trigger-width` 限制触发器宽度。

<div class="flex flex-wrap items-center gap-3">
  <div class="w-full max-w-md space-y-4">
    <slct 
      label="选择国家" 
      direction="row"
      label-width="w-1/3"
      input-width="w-48"
      :options="[
        { label: '中国', value: 'china' },
        { label: '美国', value: 'america' },
        { label: '日本', value: 'japan' }
      ]" 
    />
    <slct 
      label="选择城市" 
      direction="row"
      label-width="w-1/4"
      input-width="w-56"
      :options="[
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' }
      ]" 
    />
  </div>
</div>

```vue
<template>
  <div class="space-y-4">
    <slct 
      label="选择国家" 
      direction="row"
      label-width="w-1/3"
      input-width="w-48"
      :options="options" 
    />
    <slct 
      label="选择城市" 
      direction="row"
      label-width="w-1/4"
      input-width="w-56"
      :options="cityOptions" 
    />
  </div>
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' }
]

const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' }
]
</script>
```

### 垂直布局

垂直布局时，标签在选择器上方显示。

<div class="flex flex-wrap items-center gap-3">
  <div class="w-full max-w-md space-y-4">
    <slct 
      label="选择国家" 
      direction="col"
      :options="[
        { label: '中国', value: 'china' },
        { label: '美国', value: 'america' },
        { label: '日本', value: 'japan' }
      ]" 
    />
    <slct 
      label="选择城市" 
      direction="col"
      :options="[
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' }
      ]" 
    />
  </div>
</div>

```vue
<template>
  <div class="space-y-4">
    <slct 
      label="选择国家" 
      direction="col"
      :options="options" 
    />
    <slct 
      label="选择城市" 
      direction="col"
      :options="cityOptions" 
    />
  </div>
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' }
]

const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' }
]
</script>
```

### 整行布局

整行布局时，标签和触发器在同一行显示，并占据整行宽度，适合表单场景。使用 `direction="row"` 和 `full-width` 属性实现。

<div class="flex flex-wrap items-center gap-3">
  <div class="w-full max-w-2xl space-y-4">
    <slct 
      label="选择国家" 
      direction="row"
      full-width
      :options="[
        { label: '中国', value: 'china' },
        { label: '美国', value: 'america' },
        { label: '日本', value: 'japan' },
        { label: '英国', value: 'england' },
        { label: '法国', value: 'france' }
      ]" 
    />
    <slct 
      label="选择城市" 
      direction="row"
      full-width
      label-width="w-1/4"
      :options="[
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' }
      ]" 
    />
  </div>
</div>

```vue
<template>
  <div class="space-y-4 max-w-2xl">
    <slct 
      label="选择国家" 
      direction="row"
      full-width
      :options="options" 
    />
    <slct 
      label="选择城市" 
      direction="row"
      full-width
      label-width="w-1/4"
      :options="cityOptions" 
    />
  </div>
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' },
  { label: '英国', value: 'england' },
  { label: '法国', value: 'france' }
]

const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' }
]
</script>
```

### 自定义标签宽度

<div class="flex flex-wrap items-center gap-3">
  <div class="space-y-4">
    <slct 
      label="短标签" 
      label-width="w-1/4"
      :options="[
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
        { label: '选项3', value: 3 }
      ]" 
    />
    <slct 
      label="这是一个很长的标签文本" 
      label-width="w-1/2"
      :options="[
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
        { label: '选项3', value: 3 }
      ]" 
    />
  </div>
</div>

```vue
<template>
  <div class="space-y-4">
    <slct 
      label="短标签" 
      label-width="w-1/4"
      :options="options" 
    />
    <slct 
      label="这是一个很长的标签文本" 
      label-width="w-1/2"
      :options="options" 
    />
  </div>
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>
```

### 自定义输入宽度

<div class="flex flex-wrap items-center gap-3">
  <div class="space-y-4">
    <slct 
      label="输入宽度" 
      input-width="w-48"
      :options="[
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
        { label: '选项3', value: 3 }
      ]" 
    />
    <slct 
      label="输入宽度" 
      input-width="w-80"
      :options="[
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
        { label: '选项3', value: 3 }
      ]" 
    />
  </div>
</div>

```vue
<template>
  <div class="space-y-4">
    <slct 
      label="输入宽度" 
      input-width="w-48"
      :options="options" 
    />
    <slct 
      label="输入宽度" 
      input-width="w-80"
      :options="options" 
    />
  </div>
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>
```

### 全宽模式

<div class="flex flex-wrap items-center gap-3">
  <slct 
    label="全宽选择器" 
    full-width
    :options="[
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]" 
  />
</div>

```vue
<template>
  <slct 
    label="全宽选择器" 
    full-width
    :options="options" 
  />
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>
```

### 自定义宽度

<div class="flex flex-wrap items-center gap-3">
  <slct 
    label="自定义宽度"
    trigger-width="w-80"
    menu-width="w-96"
    :options="[
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]" 
  />
</div>

```vue
<template>
  <slct 
    label="自定义宽度"
    trigger-width="w-80"
    menu-width="w-96"
    :options="options" 
  />
</template>

<script setup lang="ts">
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>
```

### 菜单宽度可大于触发器

<div class="flex flex-wrap items-center gap-3">
  <slct 
    label="菜单可扩展"
    trigger-width="w-48"
    :menu-can-exceed-trigger="true"
    :options="[
      { label: '这是一个很长的选项文本', value: 1 },
      { label: '另一个很长的选项文本', value: 2 },
      { label: '第三个很长的选项文本', value: 3 }
    ]" 
  />
</div>

```vue
<template>
  <slct 
    label="菜单可扩展"
    trigger-width="w-48"
    :menu-can-exceed-trigger="true"
    :options="options" 
  />
</template>

<script setup lang="ts">
const options = [
  { label: '这是一个很长的选项文本', value: 1 },
  { label: '另一个很长的选项文本', value: 2 },
  { label: '第三个很长的选项文本', value: 3 }
]
</script>
```

## API 参考

### Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `mode` | `'default' \| 'user' \| 'project'` | `'default'` | 选择器模式 |
| `options` | `SelectOption[]` | `[]` | 选项数组（所有模式通用） |
| `projects` | `SelectOption[]` | `[]` | 项目列表（项目模式，与 options 结构相同） |
| `label` | `string` | - | 标签文本 |
| `labelWidth` | `string` | `'w-1/3'` | 标签宽度，支持 Tailwind CSS 宽度类 |
| `inputWidth` | `string` | - | 输入区域宽度，支持 Tailwind CSS 宽度类 |
| `fullWidth` | `boolean` | `false` | 是否全宽显示 |
| `direction` | `string` | `'row'` | 布局方向，可选 `'row'` 或 `'col'` |
| `placeholder` | `string` | `'Please Select'` | 占位符文本 |
| `fieldLabel` | `string` | `'label'` | 选项对象中用于显示的字段名 |
| `fieldValue` | `string` | `'value'` | 选项对象中用于值的字段名 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 组件尺寸 |
| `selected` | `string` | - | 预设选中的值（已废弃，建议使用 v-model） |
| `modelValue` | `string \| number \| null` | - | v-model 绑定值 |
| `userSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` | 头像尺寸（用户模式） |
| `iconStyle` | `'solid' \| 'regular' \| 'light' \| 'thin' \| 'duotone' \| 'brand'` | `'light'` | 图标样式（用户模式，用于 Avatar 组件） |
| `showPlaceholder` | `boolean` | `true` | 是否显示占位符文本（用户模式） |
| `loadProjects` | `boolean` | `true` | 是否从本地存储加载项目列表（项目模式） |
| `triggerWidth` | `string` | - | 触发器宽度，支持 UnoCSS 类名（如 'w-64', 'w-full'）或 CSS 值（如 '300px'） |
| `menuWidth` | `string` | - | 菜单宽度，支持 UnoCSS 类名（如 'w-64', 'w-full'）或 CSS 值（如 '300px'），默认与触发器宽度一致 |
| `menuCanExceedTrigger` | `boolean` | `false` | 菜单宽度是否可以大于触发器宽度 |

### 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `(value: string \| number \| null) => void` | v-model 更新事件 |
| `select` | `(item: any) => void` | 选择选项时触发，返回选中的项 |
| `selectIndex` | `(index: number) => void` | 选择选项时触发，返回选中项的索引 |

### 类型定义

```typescript
// 统一选项类型（所有模式通用）
interface SelectOption {
  // 必需：唯一标识和值绑定
  value?: string | number
  // 必需：显示文本
  label?: string
  // 允许其他任意字段
  [key: string]: any
}

```

**字段说明**：
- `value`: 唯一标识和值绑定（必需），用于 v-model 绑定和选项匹配
- `label`: 显示文本（必需），用于在界面上显示
- 其他字段：可根据模式需要添加
  - 用户模式：`user`（头像图片 URL）、`icon`（图标名称）、`status`（在线状态：'online' | 'offline' | 'away' | 'busy'）
  - 项目模式：可添加项目相关的其他字段

## 样式定制

slct 组件使用 UnoCSS 原子类进行样式设置，支持以下主题变量：

- `--primary`: 主题色
- `--primary-content`: 主题色文字
- `--base-250`: 背景色
- `--base-content`: 文字颜色

### 触发器样式统一

用户模式和项目模式使用统一的触发器样式设定：

**外层容器样式** (`modeContainerClasses`)：
- 基础样式：`relative flex items-center bg-base-100 rounded-$rounded-btn`
- 用户模式宽度：根据 `showPlaceholder` 动态设置（`w-full` 或 `w-16`）
- 项目模式宽度：固定为 `w-full`

**内层触发器样式** (`triggerBaseClasses`)：
- 基础样式：`flex items-center gap-2 px-2 py-1 rounded-$rounded-btn border border-base-300 cursor-pointer transition-colors relative w-full`
- 禁用状态：`opacity-50 cursor-not-allowed bg-base-200`
- 正常状态：`hover:bg-base-200`

这种统一的设计确保了两种模式在视觉上的一致性，同时保持了各自的特性（如用户模式的占位符控制）。

## 注意事项

1. **模式选择**：根据使用场景选择合适的模式，默认模式适合常规选择，用户模式适合用户选择，项目模式适合项目选择。组件已全局注册为 `slct`，可直接使用
2. **选项数据格式**：不同模式需要不同的数据格式，请参考类型定义
3. **项目模式**：项目模式支持从本地存储（localStorage）加载项目列表，或通过 `projects` 属性直接注入数据。通过 `loadProjects` 属性控制是否从本地存储加载
4. **宽度控制**：
   - `labelWidth`：控制标签宽度，默认 `w-1/3`
   - `inputWidth`：控制输入区域宽度，优先级高于默认宽度配置
   - `fullWidth`：设置为 `true` 时，组件占据全宽
   - `triggerWidth`：控制触发器宽度
5. **响应式**：组件支持响应式设计，在不同屏幕尺寸下自动调整
6. **无障碍访问**：组件支持键盘导航和屏幕阅读器
7. **性能优化**：当选项超过 10 个时，下拉菜单会自动启用滚动功能
8. **用户模式无占位符**：当 `showPlaceholder` 为 `false` 时，触发器宽度为 `w-16`，菜单宽度为 `min-w-36`，且不显示用户名
9. **样式统一**：用户模式和项目模式使用统一的触发器样式设定（`modeContainerClasses` 和 `triggerBaseClasses`），确保视觉一致性
10. **圆角适配**：触发器使用 `rounded-$rounded-btn` 类，会自动适配系统的圆角设置

## 最佳实践

1. **模式选择**：
   - 常规选项选择使用 `default` 模式
   - 用户选择使用 `user` 模式
   - 项目选择使用 `project` 模式

2. **选项数量**：建议单个选择器选项不超过 50 个，过多选项考虑使用搜索功能

3. **标签文本**：标签文本应简洁明了，避免过长

4. **占位符**：占位符应提示用户预期的输入内容

5. **错误处理**：在表单中使用时，建议配合验证组件使用

6. **项目模式**：
   - 如果已有项目列表，通过 `projects` 属性传入（推荐方式）
   - 如果需要从本地存储加载，设置 `loadProjects` 为 `true`
   - 项目数据会从本地存储（localStorage）加载，键名为 `sectum_projects`

7. **宽度设置**：
   - 使用 UnoCSS 类名（如 `w-64`）优先于 CSS 值（如 `300px`）
   - 当 `menuCanExceedTrigger` 为 `true` 时，菜单可以使用 `min-width` 来适应内容

## 使用场景

- **表单选择**：在表单中选择选项值
- **数据筛选**：通过下拉选择筛选数据
- **用户选择**：选择用户（用户模式）
- **项目选择**：选择项目（项目模式）
- **配置选择**：选择配置项
