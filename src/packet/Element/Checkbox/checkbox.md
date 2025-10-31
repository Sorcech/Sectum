# Checkbox 复选框组件

Checkbox 复选框组件提供了美观的复选框样式，支持多种颜色、尺寸和状态，具有良好的可访问性和交互体验。

## 特性

- 🎨 **主题颜色**：支持 5 种主题颜色（primary、secondary、success、warning、error）
- 📏 **灵活尺寸**：5 种预设尺寸，满足不同场景需求
- ✅ **状态管理**：支持受控和非受控状态
- ♿ **可访问性**：支持键盘导航和焦点管理
- 🎭 **动画效果**：选中时有平滑的动画过渡
- 🚫 **禁用状态**：支持禁用状态，并提供视觉反馈
- 🎯 **事件处理**：提供 change 事件，方便状态管理

## 基本用法

最简单的使用方式：

```vue
<template>
  <ckb />
</template>
```

使用受控模式（推荐）：

```vue
<template>
  <ckb :checked="isChecked" @change="handleChange" />
</template>

<script setup>
import { ref } from 'vue'

const isChecked = ref(false)

const handleChange = (value) => {
  isChecked.value = value
  console.log('Checkbox changed:', value)
}
</script>
```

## 颜色变体

Checkbox 组件支持 5 种主题颜色，默认使用 `primary`。

<div class="flex flex-wrap items-center gap-5 my-5">
  <div class="flex flex-col items-center gap-2">
    <ckb checked />
    <span class="text-sm">primary</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <ckb checked color="secondary" />
    <span class="text-sm">secondary</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <ckb checked color="success" />
    <span class="text-sm">success</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <ckb checked color="warning" />
    <span class="text-sm">warning</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <ckb checked color="error" />
    <span class="text-sm">error</span>
  </div>
</div>

```vue
<ckb checked />
<ckb checked color="secondary" />
<ckb checked color="success" />
<ckb checked color="warning" />
<ckb checked color="error" />
```

### 未选中状态的颜色

<div class="flex flex-wrap items-center gap-5 my-5">
  <ckb color="primary" />
  <ckb color="secondary" />
  <ckb color="success" />
  <ckb color="warning" />
  <ckb color="error" />
</div>

```vue
<ckb color="primary" />
<ckb color="secondary" />
<ckb color="success" />
<ckb color="warning" />
<ckb color="error" />
```

## 尺寸

Checkbox 组件支持 5 种预设尺寸，默认使用 `md`（中等尺寸）。

<div class="flex flex-wrap items-center gap-5 my-5">
  <div class="flex flex-col items-center gap-2">
    <ckb checked size="xs" />
    <span class="text-sm">xs</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <ckb checked size="sm" />
    <span class="text-sm">sm</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <ckb checked size="md" />
    <span class="text-sm">md (默认)</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <ckb checked size="lg" />
    <span class="text-sm">lg</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <ckb checked size="xl" />
    <span class="text-sm">xl</span>
  </div>
</div>

```vue
<ckb checked size="xs" />
<ckb checked size="sm" />
<ckb checked size="md" />
<ckb checked size="lg" />
<ckb checked size="xl" />
```

### 尺寸对应关系

| 属性值 | 尺寸 | 宽度 × 高度 |
|--------|------|-------------|
| `xs` | 超小 | 1rem × 1rem (16px × 16px) |
| `sm` | 小 | 1.25rem × 1.25rem (20px × 20px) |
| `md`（默认） | 中等 | 1.5rem × 1.5rem (24px × 24px) |
| `lg` | 大 | 2rem × 2rem (32px × 32px) |
| `xl` | 超大 | 2.5rem × 2.5rem (40px × 40px) |

## 禁用状态

使用 `disabled` 属性可以禁用复选框。

<div class="flex flex-wrap items-center gap-5 my-5">
  <div class="flex flex-col items-center gap-2">
    <ckb disabled />
    <span class="text-sm">未选中禁用</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <ckb checked disabled />
    <span class="text-sm">选中禁用</span>
  </div>
</div>

```vue
<!-- 未选中的禁用状态 -->
<ckb disabled />

<!-- 选中状态的禁用 -->
<ckb checked disabled />

<!-- 不同颜色的禁用状态 -->
<ckb checked disabled color="success" />
<ckb checked disabled color="warning" />
<ckb checked disabled color="error" />
```

禁用状态的特性：
- 无法通过鼠标或键盘交互
- 视觉上显示为灰色半透明状态
- 仍然可以通过 `checked` 属性控制显示状态

## 状态管理

### 受控模式（推荐）

受控模式通过 `checked` 属性和 `@change` 事件来控制状态：

```vue
<template>
  <div>
    <ckb :checked="isChecked" @change="handleChange" />
    <p>当前状态: {{ isChecked ? '已选中' : '未选中' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isChecked = ref(false)

const handleChange = (value) => {
  isChecked.value = value
  console.log('Checkbox 状态变更:', value)
}
</script>
```

### 非受控模式

非受控模式使用 `checked` 属性设置初始状态：

```vue
<template>
  <div>
    <!-- 初始选中 -->
    <ckb checked />
    
    <!-- 初始未选中 -->
    <ckb />
  </div>
</template>
```

### 状态同步

组件使用 `v-model` 模式，通过 `change` 事件通知父组件状态变化：

```vue
<template>
  <ckb :checked="checked" @change="checked = $event" />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

## 实际应用示例

### 表单中使用

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-item">
      <label>
        <ckb 
          :checked="formData.agree" 
          @change="formData.agree = $event"
          color="primary"
        />
        <span>我已阅读并同意《用户协议》</span>
      </label>
    </div>
    
    <div class="form-item">
      <label>
        <ckb 
          :checked="formData.subscribe" 
          @change="formData.subscribe = $event"
          color="success"
        />
        <span>订阅邮件通知</span>
      </label>
    </div>
    
    <btn type="submit" :disabled="!formData.agree">
      提交
    </btn>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  agree: false,
  subscribe: false
})

const handleSubmit = () => {
  console.log('提交数据:', formData.value)
}
</script>
```

### 列表选择

```vue
<template>
  <div class="checkbox-list">
    <h3>选择您喜欢的选项：</h3>
    
    <div 
      v-for="item in items" 
      :key="item.id"
      class="checkbox-item"
    >
      <ckb 
        :checked="selectedItems.includes(item.id)"
        @change="toggleItem(item.id, $event)"
        color="primary"
      />
      <label>{{ item.label }}</label>
    </div>
    
    <p>已选择: {{ selectedItems.length }} 项</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, label: '选项一' },
  { id: 2, label: '选项二' },
  { id: 3, label: '选项三' },
  { id: 4, label: '选项四' }
])

const selectedItems = ref([])

const toggleItem = (id, checked) => {
  if (checked) {
    selectedItems.value.push(id)
  } else {
    const index = selectedItems.value.indexOf(id)
    if (index > -1) {
      selectedItems.value.splice(index, 1)
    }
  }
}
</script>
```

### 全选/取消全选

```vue
<template>
  <div class="checkbox-group">
    <div class="select-all">
      <ckb 
        :checked="isAllSelected"
        @change="toggleSelectAll"
        color="primary"
        size="lg"
      />
      <label>全选</label>
    </div>
    
    <div class="checkbox-list">
      <div 
        v-for="item in items" 
        :key="item.id"
        class="checkbox-item"
      >
        <ckb 
          :checked="selectedItems.includes(item.id)"
          @change="toggleItem(item.id, $event)"
        />
        <label>{{ item.label }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { id: 1, label: '项目一' },
  { id: 2, label: '项目二' },
  { id: 3, label: '项目三' }
])

const selectedItems = ref([])

const isAllSelected = computed(() => {
  return items.value.length > 0 && 
         selectedItems.value.length === items.value.length
})

const toggleSelectAll = (checked) => {
  if (checked) {
    selectedItems.value = items.value.map(item => item.id)
  } else {
    selectedItems.value = []
  }
}

const toggleItem = (id, checked) => {
  if (checked) {
    selectedItems.value.push(id)
  } else {
    const index = selectedItems.value.indexOf(id)
    if (index > -1) {
      selectedItems.value.splice(index, 1)
    }
  }
}
</script>
```

### 条件显示

```vue
<template>
  <div>
    <ckb 
      :checked="showAdvanced" 
      @change="showAdvanced = $event"
      color="primary"
    />
    <label>显示高级选项</label>
    
    <div v-if="showAdvanced" class="advanced-options">
      <h4>高级选项</h4>
      <p>这里是高级选项内容...</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showAdvanced = ref(false)
</script>
```

### 表格中使用

```vue
<template>
  <table>
    <thead>
      <tr>
        <th>
          <ckb 
            :checked="isAllSelected"
            @change="toggleSelectAll"
            size="sm"
          />
        </th>
        <th>名称</th>
        <th>状态</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>
          <ckb 
            :checked="selectedItems.includes(item.id)"
            @change="toggleItem(item.id, $event)"
            size="sm"
          />
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.status }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { id: 1, name: '项目 A', status: '活跃' },
  { id: 2, name: '项目 B', status: '暂停' },
  { id: 3, name: '项目 C', status: '活跃' }
])

const selectedItems = ref([])

const isAllSelected = computed(() => {
  return items.value.length > 0 && 
         selectedItems.value.length === items.value.length
})

const toggleSelectAll = (checked) => {
  selectedItems.value = checked ? items.value.map(i => i.id) : []
}

const toggleItem = (id, checked) => {
  if (checked) {
    selectedItems.value.push(id)
  } else {
    const index = selectedItems.value.indexOf(id)
    if (index > -1) selectedItems.value.splice(index, 1)
  }
}
</script>
```

## 组合使用

可以将多个属性组合使用，创建更丰富的效果：

```vue
<!-- 大尺寸的成功颜色复选框 -->
<ckb checked size="lg" color="success" />

<!-- 小尺寸的警告颜色复选框 -->
<ckb checked size="sm" color="warning" />

<!-- 超大尺寸的主要颜色复选框 -->
<ckb checked size="xl" color="primary" />
```

## API 参考

### Props

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| `checked` | `Boolean` | `false` | ❌ | 是否选中 |
| `color` | `String` | `'primary'` | ❌ | 颜色变体：`primary`、`secondary`、`success`、`warning`、`error` |
| `size` | `String` | `'md'` | ❌ | 尺寸：`xs`、`sm`、`md`、`lg`、`xl` |
| `disabled` | `Boolean` | `false` | ❌ | 是否禁用 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `change` | `(value: boolean)` | 选中状态改变时触发，参数为新的选中状态 |

### 样式类名

组件会自动添加以下 CSS 类：

- `ckb` - 基础样式类
- `ckb-{color}` - 颜色变体类（如 `ckb-primary`、`ckb-success`）
- `ckb-{size}` - 尺寸变体类（如 `ckb-md`、`ckb-lg`）

## 样式特性

### 选中动画

复选框在选中时会有一个平滑的动画效果，使用 CSS 渐变和关键帧动画实现：

- 动画时长：`0.2s`（可通过 CSS 变量 `--animation-input` 自定义）
- 动画缓动：`ease-in-out`

### 悬停效果

未禁用的复选框在悬停时会有视觉反馈：

- 边框颜色加深
- 背景色变为半透明的主题色

### 焦点样式

支持键盘导航，焦点状态下会显示轮廓线：

- 轮廓颜色：主题色
- 轮廓宽度：`2px`
- 轮廓偏移：`2px`

### 禁用样式

禁用状态的视觉特征：

- 背景色：`var(--base-200)`
- 透明度：`0.2`
- 边框：透明
- 光标：`not-allowed`

## 可访问性

### 键盘支持

- `Space` / `Enter` - 切换选中状态
- `Tab` - 导航到下一个可聚焦元素
- `Shift + Tab` - 导航到上一个可聚焦元素

### 语义化

组件使用原生的 `<input type="checkbox">` 元素，保证：

- 屏幕阅读器正确识别
- 表单提交时正确包含值
- 符合 HTML 语义规范

### 最佳实践

1. **使用标签**：始终为复选框提供关联的标签文本

```vue
<template>
  <label>
    <ckb :checked="agree" @change="agree = $event" />
    <span>我同意条款</span>
  </label>
</template>
```

2. **清晰的视觉反馈**：确保选中和未选中状态有明确的视觉区别

3. **合理的尺寸**：根据使用场景选择合适的尺寸

4. **语义化颜色**：使用合适的颜色传达含义（如成功用 `success`，警告用 `warning`）

## 注意事项

1. **受控模式**：推荐使用受控模式（`checked` + `@change`），这样可以完全控制组件状态

2. **状态同步**：如果不使用受控模式，确保通过 `checked` 属性正确设置初始状态

3. **事件处理**：`change` 事件的参数是布尔值，表示新的选中状态

4. **禁用状态**：禁用状态下，复选框不会触发 `change` 事件

5. **颜色选择**：不同颜色适用于不同的使用场景：
   - `primary` - 默认选项、主要操作
   - `success` - 确认、同意
   - `warning` - 需要注意的选项
   - `error` - 危险操作、不同意
   - `secondary` - 次要选项

## 与其他组件配合

### 与 Label 组件配合

```vue
<template>
  <label class="flex items-center gap-2">
    <ckb :checked="checked" @change="checked = $event" />
    <span>选项文本</span>
  </label>
</template>
```

### 与 Button 组件配合

```vue
<template>
  <div class="flex items-center gap-2">
    <ckb :checked="enableFeature" @change="enableFeature = $event" />
    <btn :disabled="!enableFeature">
      启用功能
    </btn>
  </div>
</template>
```

## 最佳实践

1. **表单验证**：在表单提交前验证必选的复选框是否已选中

2. **用户体验**：
   - 使用合适的尺寸，避免过小导致点击困难
   - 提供清晰的标签说明
   - 在列表中使用一致的尺寸和颜色

3. **性能优化**：
   - 大量复选框时考虑虚拟滚动
   - 使用 `v-show` 而非 `v-if` 来切换条件显示

4. **响应式设计**：
   - 在移动设备上考虑使用稍大的尺寸
   - 确保触摸区域足够大（至少 44px × 44px）
