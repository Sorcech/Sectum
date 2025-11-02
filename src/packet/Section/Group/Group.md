# Group 按钮组组件

Group 是一个用于将多个按钮组合在一起的容器组件，提供统一的样式、间距和交互效果。支持多种布局方向、尺寸、颜色和变体。

## 特性

- 🎨 **多种变体** - 支持 solid、outline、transparent 三种变体
- 📐 **灵活布局** - 支持水平和垂直两种方向
- 🎯 **多种尺寸** - 提供 xs、sm、md、lg、xl 五种尺寸
- 🌈 **主题色彩** - 支持 primary、secondary、success、warning、error 五种颜色
- 📱 **响应式设计** - 自适应不同屏幕尺寸
- 🔧 **高度可定制** - 支持形状、间距、状态等多种自定义选项
- ⚡ **性能优化** - 支持最大按钮数量限制和折叠功能

## 基本用法

### 水平按钮组

<div class="flex flex-wrap gap-4 mb-6">
  <Group>
    <btn color="primary">1</btn>
    <btn color="primary">2</btn>
    <btn color="primary" active>3</btn>
    <btn color="primary">4</btn>
  </Group>
  
  <Group variant="outline">
    <btn variant="outline" color="primary">1</btn>
    <btn variant="outline" color="primary">2</btn>
    <btn variant="outline" color="primary" active>3</btn>
    <btn variant="outline" color="primary">4</btn>
  </Group>
  
  <Group variant="transparent">
    <btn variant="transparent" color="primary">1</btn>
    <btn variant="transparent" color="primary">2</btn>
    <btn variant="transparent" color="primary" active>3</btn>
    <btn variant="transparent" color="primary">4</btn>
  </Group>
</div>

### 垂直按钮组

<div class="flex flex-wrap gap-4 mb-6">
  <Group direction="vertical">
    <btn color="primary">1</btn>
    <btn color="primary">2</btn>
    <btn color="primary" active>3</btn>
    <btn color="primary">4</btn>
  </Group>
  
  <Group direction="vertical" variant="outline">
    <btn variant="outline" color="primary">1</btn>
    <btn variant="outline" color="primary">2</btn>
    <btn variant="outline" color="primary" active>3</btn>
    <btn variant="outline" color="primary">4</btn>
  </Group>
</div>

## 尺寸变体

<div class="flex flex-wrap gap-4 mb-6">
  <Group size="xs">
    <btn color="primary" size="xs">XS</btn>
    <btn color="primary" size="xs">按钮</btn>
  </Group>
  
  <Group size="sm">
    <btn color="primary" size="sm">SM</btn>
    <btn color="primary" size="sm">按钮</btn>
  </Group>
  
  <Group size="md">
    <btn color="primary" size="md">MD</btn>
    <btn color="primary" size="md">按钮</btn>
  </Group>
  
  <Group size="lg">
    <btn color="primary" size="lg">LG</btn>
    <btn color="primary" size="lg">按钮</btn>
  </Group>
  
  <Group size="xl">
    <btn color="primary" size="xl">XL</btn>
    <btn color="primary" size="xl">按钮</btn>
  </Group>
</div>

## 颜色变体

<div class="flex flex-wrap gap-4 mb-6">
  <Group color="primary">
    <btn color="primary">Primary</btn>
    <btn color="primary">按钮</btn>
  </Group>
  
  <Group color="secondary">
    <btn color="secondary">Secondary</btn>
    <btn color="secondary">按钮</btn>
  </Group>
  
  <Group color="success">
    <btn color="success">Success</btn>
    <btn color="success">按钮</btn>
  </Group>
  
  <Group color="warning">
    <btn color="warning">Warning</btn>
    <btn color="warning">按钮</btn>
  </Group>
  
  <Group color="error">
    <btn color="error">Error</btn>
    <btn color="error">按钮</btn>
  </Group>
</div>

## 形状变体

<div class="flex flex-wrap gap-4 mb-6">
  <Group shape="rounded">
    <btn color="primary">Rounded</btn>
    <btn color="primary">按钮</btn>
  </Group>
  
  <Group shape="square">
    <btn color="primary">Square</btn>
    <btn color="primary">按钮</btn>
  </Group>
  
  <Group shape="circle">
    <btn color="primary">●</btn>
    <btn color="primary">●</btn>
  </Group>
</div>

## 间距变体

<div class="flex flex-wrap gap-4 mb-6">
  <Group spacing="none">
    <btn color="primary">无间距</btn>
    <btn color="primary">按钮</btn>
  </Group>
  
  <Group spacing="xs">
    <btn color="primary">XS间距</btn>
    <btn color="primary">按钮</btn>
  </Group>
  
  <Group spacing="sm">
    <btn color="primary">SM间距</btn>
    <btn color="primary">按钮</btn>
  </Group>
  
  <Group spacing="md">
    <btn color="primary">MD间距</btn>
    <btn color="primary">按钮</btn>
  </Group>
  
  <Group spacing="lg">
    <btn color="primary">LG间距</btn>
    <btn color="primary">按钮</btn>
  </Group>
</div>

## 高级功能

### 最大按钮数量限制

<div class="flex flex-wrap gap-4 mb-6">
  <Group :maxButtons="3">
    <btn color="primary">1</btn>
    <btn color="primary">2</btn>
    <btn color="primary">3</btn>
    <btn color="primary">4</btn>
    <btn color="primary">5</btn>
  </Group>
</div>

### 分隔线

<div class="flex flex-wrap gap-4 mb-6">
  <Group showDivider>
    <btn color="primary">选项1</btn>
    <btn color="primary">选项2</btn>
    <btn color="primary">选项3</btn>
  </Group>
</div>

### 可折叠（响应式）

<div class="flex flex-wrap gap-4 mb-6">
  <Group collapsible>
    <btn color="primary">首页</btn>
    <btn color="primary">产品</btn>
    <btn color="primary">服务</btn>
    <btn color="primary">关于</btn>
    <btn color="primary">联系</btn>
  </Group>
</div>

### 禁用状态

<div class="flex flex-wrap gap-4 mb-6">
  <Group disabled>
    <btn color="primary">禁用</btn>
    <btn color="primary">按钮组</btn>
  </Group>
</div>

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 按钮组方向 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 按钮尺寸 |
| color | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | 按钮颜色 |
| variant | `'solid' \| 'outline' \| 'transparent'` | `'solid'` | 按钮变体 |
| shape | `'rounded' \| 'square' \| 'circle'` | `'rounded'` | 按钮形状 |
| spacing | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'none'` | 按钮间距 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| maxButtons | `number` | `0` | 最大按钮数量（0表示无限制） |
| showDivider | `boolean` | `false` | 是否显示分隔线 |
| collapsible | `boolean` | `false` | 是否可折叠（响应式） |
| showCount | `boolean` | `false` | 是否显示按钮数量 |
| customClass | `string` | `''` | 自定义类名 |

### Methods

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getButtonCount | - | `number` | 获取当前按钮数量 |
| isOverMaxButtons | - | `boolean` | 检查是否超过最大按钮数量 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |

## 使用示例

### 基础用法

```vue
<template>
  <Group>
    <btn color="primary">选项1</btn>
    <btn color="primary">选项2</btn>
    <btn color="primary" active>选项3</btn>
    <btn color="primary">选项4</btn>
  </Group>
</template>
```

### 垂直布局

```vue
<template>
  <Group direction="vertical" spacing="sm">
    <btn color="primary">上</btn>
    <btn color="primary">中</btn>
    <btn color="primary">下</btn>
  </Group>
</template>
```

### 自定义样式

```vue
<template>
  <Group 
    size="lg" 
    color="success" 
    shape="square" 
    spacing="md"
    showDivider
  >
    <btn color="success" size="lg">保存</btn>
    <btn color="success" size="lg">发布</btn>
    <btn color="success" size="lg">分享</btn>
  </Group>
</template>
```

### 响应式折叠

```vue
<template>
  <Group 
    collapsible 
    :maxButtons="3"
    customClass="my-button-group"
  >
    <btn color="primary">首页</btn>
    <btn color="primary">产品</btn>
    <btn color="primary">服务</btn>
    <btn color="primary">关于</btn>
    <btn color="primary">联系</btn>
  </Group>
</template>
```

### 编程式控制

```vue
<template>
  <Group ref="buttonGroupRef">
    <btn 
      v-for="(option, index) in options" 
      :key="index"
      :color="selectedIndex === index ? 'primary' : 'secondary'"
      @click="selectOption(index)"
    >
      {{ option }}
    </btn>
  </Group>
</template>

<script setup>
import { ref } from 'vue'

const buttonGroupRef = ref()
const selectedIndex = ref(0)
const options = ['选项1', '选项2', '选项3', '选项4']

const selectOption = (index) => {
  selectedIndex.value = index
}

// 获取按钮数量
const getCount = () => {
  return buttonGroupRef.value?.getButtonCount() || 0
}

// 检查是否超过最大数量
const checkMaxButtons = () => {
  return buttonGroupRef.value?.isOverMaxButtons() || false
}
</script>
```

## 最佳实践

### 1. 按钮数量控制
- 建议单个按钮组不超过 7 个按钮
- 使用 `maxButtons` 属性限制显示数量
- 考虑使用 `collapsible` 属性实现响应式折叠

### 2. 间距使用
- 紧密相关的按钮使用 `spacing="none"`
- 需要视觉分离的按钮使用 `spacing="sm"` 或 `spacing="md"`
- 垂直布局时适当增加间距

### 3. 颜色搭配
- 保持按钮组内颜色一致
- 使用 `active` 状态突出当前选中项
- 根据功能选择合适的颜色主题

### 4. 响应式设计
- 移动端使用 `collapsible` 属性
- 考虑使用垂直布局适配小屏幕
- 合理设置 `maxButtons` 避免溢出

## 注意事项

1. **按钮一致性**: 确保按钮组内的按钮使用相同的尺寸和变体
2. **可访问性**: 为按钮提供适当的 `aria-label` 和键盘导航支持
3. **性能考虑**: 大量按钮时考虑使用虚拟滚动或分页
4. **状态管理**: 合理管理按钮的激活状态和禁用状态
5. **响应式测试**: 在不同屏幕尺寸下测试按钮组的显示效果

## 更新日志

### v2.0.0
- 合并 CSS 文件到 Vue 组件
- 新增多种尺寸、颜色、形状变体
- 新增间距控制和状态管理
- 新增最大按钮数量限制
- 新增分隔线和折叠功能
- 优化响应式设计
- 新增编程式控制方法