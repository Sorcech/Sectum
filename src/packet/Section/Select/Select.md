# Select 选择器组件

Select 选择器组件用于在多个选项中进行选择，支持三种模式：默认模式、头像模式和项目模式。适用于表单选择、数据筛选、用户选择、项目选择等场景。

## 特性

- 📋 **下拉选择** - 优雅的下拉菜单选择界面
- 🎯 **三种模式** - 支持默认模式、头像模式、项目模式
- 🎨 **灵活配置** - 支持自定义字段名、占位符、标签等
- 📏 **多种尺寸** - 支持 xs/sm/md/lg/xl 多种尺寸
- 🎨 **多种布局** - 支持水平（row）和垂直（col）布局
- 🔒 **禁用状态** - 支持禁用状态
- 💾 **预设值** - 支持预设选中值
- 🌙 **深色模式** - 完全支持深色模式
- 📱 **响应式** - 自适应不同屏幕尺寸
- ♿ **无障碍** - 支持键盘导航

## 安装

```ts
import { Select } from 'sectum'
// 或者
import Select from 'sectum'
```

## 快速开始

### 基本结构

```vue
<Select 
  :options="options"
  mode="default"
  placeholder="请选择"
/>
```

### 数据格式

```typescript
// 默认模式
interface SelectOption {
  label: string
  value: any
  [key: string]: any
}

// 头像模式
interface AvatarOption {
  id?: string | number
  name?: string
  text?: string
  avatar?: string
  icon?: string
  status?: 'online' | 'offline' | 'away' | 'busy' | ''
  label?: string
  value?: string | number
  [key: string]: any
}

// 项目模式
interface ProjectInfo {
  Name?: string
}
```

## 模式说明

### 默认模式 (default)

默认模式使用输入框样式显示选中的值，适合常规的选项选择。

### 头像模式 (avatar)

头像模式使用 Avatar 组件显示选中的用户，适合用户选择场景。

### 项目模式 (project)

项目模式使用图标和文本显示选中的项目，支持自动加载项目列表，适合项目选择场景。

## 基础用法

### 默认模式

```vue
<template>
  <Select :options="options" />
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

### 头像模式

```vue
<template>
  <Select 
    mode="avatar"
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
    id: 1, 
    name: '张三', 
    avatar: 'https://via.placeholder.com/40',
    status: 'online'
  },
  { 
    id: 2, 
    name: '李四', 
    avatar: 'https://via.placeholder.com/40',
    status: 'away'
  },
  { 
    id: 3, 
    name: '王五', 
    text: 'WW',
    status: 'offline'
  }
]

const handleUserSelect = (user) => {
  console.log('选中的用户:', user)
}
</script>
```

### 项目模式

```vue
<template>
  <Select 
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

## 示例展示

### 默认模式 - 带标签

```vue
<template>
  <Select label="国籍" :options="options" />
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

### 头像模式 - 不同头像尺寸

```vue
<template>
  <div class="space-y-4">
    <Select 
      mode="avatar"
      avatar-size="xs"
      :options="users"
      label="小头像"
    />
    <Select 
      mode="avatar"
      avatar-size="sm"
      :options="users"
      label="标准头像"
    />
    <Select 
      mode="avatar"
      avatar-size="md"
      :options="users"
      label="大头像"
    />
  </div>
</template>

<script setup lang="ts">
const users = [
  { id: 1, name: '张三', avatar: 'https://via.placeholder.com/40', status: 'online' },
  { id: 2, name: '李四', text: 'LS', status: 'away' },
  { id: 3, name: '王五', icon: 'user', status: 'offline' }
]
</script>
```

### 项目模式 - 自定义项目列表

```vue
<template>
  <Select 
    mode="project"
    :projects="customProjects"
    :load-projects="false"
    v-model="selectedProjectId"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedProjectName = ref(null)

const customProjects = [
  {
    Name: '我的项目1'
  },
  {
    Name: '我的项目2'
  }
]
</script>
```

### 不同尺寸

```vue
<template>
  <div class="space-y-4">
    <Select size="xs" placeholder="超小尺寸" :options="options" />
    <Select size="sm" placeholder="小尺寸" :options="options" />
    <Select size="md" placeholder="中等尺寸" :options="options" />
    <Select size="lg" placeholder="大尺寸" :options="options" />
    <Select size="xl" placeholder="超大尺寸" :options="options" />
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

```vue
<template>
  <Select :options="options" disabled placeholder="禁用状态" />
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

```vue
<template>
  <Select 
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

### 预设选中值

```vue
<template>
  <Select 
    :options="options" 
    :selected="selectedValue"
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

const handleSelect = (value: string) => {
  console.log('选中的值:', value)
}
</script>
```

### 使用 v-model

```vue
<template>
  <Select 
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

### 垂直布局

```vue
<template>
  <Select 
    label="选择国家" 
    direction="col"
    :options="options" 
  />
</template>

<script setup lang="ts">
const options = [
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' }
]
</script>
```

### 自定义标签宽度

```vue
<template>
  <div class="space-y-4">
    <Select 
      label="短标签" 
      label-width="w-1/4"
      :options="options" 
    />
    <Select 
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

## 实际使用示例

### 基础选择器

<Select :options="[
  { label: '中国', value: 'china' },
  { label: '美国', value: 'america' },
  { label: '日本', value: 'japan' },
  { label: '英国', value: 'england' },
  { label: '俄罗斯', value: 'russia' }
]" />

### 带标签的选择器

<Select 
  label="国籍" 
  :options="[
    { label: '中国', value: 'china' },
    { label: '美国', value: 'america' },
    { label: '日本', value: 'japan' },
    { label: '英国', value: 'england' },
    { label: '俄罗斯', value: 'russia' }
  ]" 
/>

### 不同尺寸

<div class="space-y-4">
  <Select size="xs" placeholder="超小尺寸" :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ]" />
  
  <Select size="sm" placeholder="小尺寸" :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ]" />
  
  <Select size="md" placeholder="中等尺寸" :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ]" />
  
  <Select size="lg" placeholder="大尺寸" :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ]" />
  
  <Select size="xl" placeholder="超大尺寸" :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ]" />
</div>

### 禁用状态

<Select 
  :options="[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ]" 
  disabled 
  placeholder="禁用状态" 
/>

### 垂直布局

<Select 
  label="选择国家" 
  direction="col"
  :options="[
    { label: '中国', value: 'china' },
    { label: '美国', value: 'america' },
    { label: '日本', value: 'japan' }
  ]" 
/>

### 自定义字段名

<Select 
  :options="[
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' }
  ]" 
  field-label="name" 
  field-value="id"
  placeholder="选择用户"
/>

### 预设选中值

<Select 
  :options="[
    { label: '中国', value: 'china' },
    { label: '美国', value: 'america' },
    { label: '日本', value: 'japan' }
  ]" 
  selected="china"
/>

### 自定义标签宽度

<div class="space-y-4">
  <Select 
    label="短标签" 
    label-width="w-1/4"
    :options="[
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]" 
  />
  
  <Select 
    label="这是一个很长的标签文本" 
    label-width="w-1/2"
    :options="[
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]" 
  />
</div>

### 头像模式 - 基础示例

<Select 
  mode="avatar"
  label="选择用户"
  :options="[
    { id: 1, name: '张三', avatar: 'https://via.placeholder.com/40', status: 'online' },
    { id: 2, name: '李四', text: 'LS', status: 'away' },
    { id: 3, name: '王五', icon: 'user', status: 'offline' }
  ]"
/>

### 头像模式 - 不同头像尺寸

<div class="space-y-4">
  <Select 
    mode="avatar"
    avatar-size="xs"
    label="小头像"
    :options="[
      { id: 1, name: '张三', text: 'ZS', status: 'online' },
      { id: 2, name: '李四', text: 'LS', status: 'away' }
    ]"
  />
  
  <Select 
    mode="avatar"
    avatar-size="sm"
    label="标准头像"
    :options="[
      { id: 1, name: '张三', text: 'ZS', status: 'online' },
      { id: 2, name: '李四', text: 'LS', status: 'away' }
    ]"
  />
  
  <Select 
    mode="avatar"
    avatar-size="md"
    label="大头像"
    :options="[
      { id: 1, name: '张三', text: 'ZS', status: 'online' },
      { id: 2, name: '李四', text: 'LS', status: 'away' }
    ]"
  />
</div>

### 头像模式 - 带状态指示

<Select 
  mode="avatar"
  label="在线用户"
  :options="[
    { id: 1, name: '在线用户', text: 'ON', status: 'online' },
    { id: 2, name: '离开用户', text: 'AW', status: 'away' },
    { id: 3, name: '忙碌用户', text: 'BU', status: 'busy' },
    { id: 4, name: '离线用户', text: 'OF', status: 'offline' }
  ]"
/>

### 项目模式 - 自动加载

<Select 
  mode="project"
  label="选择项目"
  :load-projects="true"
/>

### 项目模式 - 自定义项目列表

<Select 
  mode="project"
  label="我的项目"
  :load-projects="false"
  :projects="[
    { Name: 'Web项目' },
    { Name: '移动应用' },
    { Name: '桌面应用' }
  ]"
/>

### 项目模式 - 自定义项目列表

<Select 
  mode="project"
  label="项目选择"
  :load-projects="false"
  :projects="[
    { Name: '前端开发项目' },
    { Name: '移动端项目' },
    { Name: '后端服务项目' }
  ]"
/>

## API 参考

### Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `mode` | `'default' \| 'avatar' \| 'project'` | `'default'` | 选择器模式 |
| `options` | `SelectOption[] \| AvatarOption[]` | `[]` | 选项数组（默认模式和头像模式） |
| `projects` | `ProjectInfo[]` | `[]` | 项目列表（项目模式） |
| `label` | `string` | - | 标签文本 |
| `labelWidth` | `string` | - | 标签宽度，支持 Tailwind CSS 宽度类 |
| `direction` | `string` | `'row'` | 布局方向，可选 `'row'` 或 `'col'` |
| `placeholder` | `string` | `'Please Select'` | 占位符文本 |
| `fieldLabel` | `string` | `'label'` | 选项对象中用于显示的字段名 |
| `fieldValue` | `string` | `'value'` | 选项对象中用于值的字段名 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 组件尺寸 |
| `selected` | `string` | - | 预设选中的值（已废弃，建议使用 v-model） |
| `modelValue` | `string \| number \| null` | - | v-model 绑定值 |
| `avatarSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` | 头像尺寸（头像模式） |
| `loadProjects` | `boolean` | `true` | 是否自动加载项目列表（项目模式） |

### 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `(value: string \| number \| null) => void` | v-model 更新事件 |
| `select` | `(item: any) => void` | 选择选项时触发，返回选中的项 |
| `selectIndex` | `(index: number) => void` | 选择选项时触发，返回选中项的索引 |

### 类型定义

```typescript
// 默认模式选项
interface SelectOption {
  [key: string]: any
}

// 头像模式选项
interface AvatarOption {
  id?: string | number
  name?: string
  text?: string
  avatar?: string
  icon?: string
  status?: 'online' | 'offline' | 'away' | 'busy' | ''
  label?: string
  value?: string | number
  [key: string]: any
}

// 项目模式选项
interface ProjectInfo {
  Name?: string
}
```

## 样式定制

Select 组件使用 UnoCSS 原子类进行样式设置，支持以下主题变量：

- `--primary`: 主题色
- `--primary-content`: 主题色文字
- `--base-250`: 背景色
- `--base-content`: 文字颜色

## 注意事项

1. **模式选择**：根据使用场景选择合适的模式，默认模式适合常规选择，头像模式适合用户选择，项目模式适合项目选择
2. **选项数据格式**：不同模式需要不同的数据格式，请参考类型定义
3. **项目模式**：项目模式支持自动从本地存储或远程 API 加载项目列表，可通过 `loadProjects` 属性控制
4. **响应式**：组件支持响应式设计，在不同屏幕尺寸下自动调整
5. **无障碍访问**：组件支持键盘导航和屏幕阅读器
6. **性能优化**：当选项超过 10 个时，下拉菜单会自动启用滚动功能

## 最佳实践

1. **模式选择**：
   - 常规选项选择使用 `default` 模式
   - 用户选择使用 `avatar` 模式
   - 项目选择使用 `project` 模式

2. **选项数量**：建议单个选择器选项不超过 50 个，过多选项考虑使用搜索功能

3. **标签文本**：标签文本应简洁明了，避免过长

4. **占位符**：占位符应提示用户预期的输入内容

5. **错误处理**：在表单中使用时，建议配合验证组件使用

6. **项目模式**：
   - 如果已有项目列表，通过 `projects` 属性传入
   - 如果需要自动加载，设置 `loadProjects` 为 `true`
   - 项目数据会自动从本地存储或远程 API 加载

## 使用场景

- **表单选择**：在表单中选择选项值
- **数据筛选**：通过下拉选择筛选数据
- **用户选择**：选择用户（头像模式）
- **项目选择**：选择项目（项目模式）
- **配置选择**：选择配置项
