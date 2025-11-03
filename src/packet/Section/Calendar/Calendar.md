# Calendar 日历组件

Calendar 是一个功能完整的日历展示组件，用于显示和选择日期。提供直观的月视图界面和灵活的配置选项。

## 特性

- 📅 **月视图展示** - 清晰展示整月的日期
- 🎯 **日期选择** - 支持点击选择日期
- 🔄 **月份导航** - 轻松切换不同月份
- 🎨 **主题定制** - 支持自定义样式和主题
- 🌍 **国际化支持** - 内置多语言支持
- ⚡ **高性能** - 优化的渲染性能
- 🔧 **高度可定制** - 支持插槽和自定义样式
- 🎯 **无障碍访问** - 完整的键盘导航和屏幕阅读器支持

## 基本用法

### 基础用法

一个普通的日历。

<Calendar />

### 受控模式

使用 `v-model` 来控制选中的日期。

<Calendar v-model="calendarValue1" />

### 默认值

设置 `default-value` 来指定默认选中的日期。

<Calendar :default-value="defaultCalendarValue" />

## 高级功能

### 禁用日期

通过 `is-date-disabled` 属性可以禁用某些日期。

<div class="mb-6">
  <Calendar 
    :is-date-disabled="(date) => {
      const d = new Date(date)
      const day = d.getDay()
      return day === 0 || day === 6 // 禁用周末
    }"
  />
</div>

### 自定义头部

通过 `header` 插槽自定义日历头部。

<Calendar>
  <template #header="{ year, month }">
    <span class="text-lg font-bold">{{ year }}年{{ month }}月</span>
  </template>
</Calendar>

### 自定义日期内容

通过默认插槽自定义每个日期单元格的内容。

<Calendar v-model="calendarValue2">
  <template #default="{ year, month, date }">
    <div v-if="date % 7 === 0" class="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></div>
  </template>
</Calendar>

### 监听面板变化

监听 `panel-change` 事件来响应月份切换。

<Calendar @panel-change="handlePanelChange" />

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | `number` | - | 绑定值，时间戳（timestamp） |
| defaultValue | `number \| null` | `null` | 默认值，时间戳（timestamp） |
| isDateDisabled | `(date: number) => boolean \| undefined` | - | 判断日期是否禁用，参数为时间戳 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| customClass | `string` | `''` | 自定义类名 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:value | `value: number, time: { year: number; month: number; date: number }` | 值变化时触发 |
| update-value | `value: number, time: { year: number; month: number; date: number }` | 值变化时触发（kebab-case） |
| panel-change | `info: { year: number; month: number }` | 面板切换时触发 |

### Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| default | `{ year: number; month: number; date: number }` | 自定义日期单元格内容 |
| header | `{ year: number; month: number }` | 自定义日历头部 |

## 使用示例

### 基础用法

```vue
<template>
  <Calendar 
    v-model="selectedDate"
    @update-value="handleDateChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedDate = ref(Date.now())

const handleDateChange = (value, time) => {
  console.log('选择的日期:', value, time)
}
</script>
```

### 禁用日期

```vue
<template>
  <Calendar 
    :is-date-disabled="isDateDisabled"
  />
</template>

<script setup>
const isDateDisabled = (date) => {
  const d = new Date(date)
  const day = d.getDay()
  // 禁用周末
  return day === 0 || day === 6
}
</script>
```

### 自定义头部

```vue
<template>
  <Calendar>
    <template #header="{ year, month }">
      <div class="flex items-center gap-2">
        <span class="text-xl font-bold">{{ year }}</span>
        <span class="text-sm">{{ month }}月</span>
      </div>
    </template>
  </Calendar>
</template>
```

### 监听面板变化

```vue
<template>
  <Calendar 
    @panel-change="handlePanelChange"
  />
</template>

<script setup>
const handlePanelChange = (info) => {
  console.log('切换到:', info.year, '年', info.month, '月')
}
</script>
```

### 自定义日期标记

```vue
<template>
  <Calendar v-model="selectedDate">
    <template #default="{ year, month, date }">
      <!-- 标记特殊日期 -->
      <div 
        v-if="isSpecialDate(year, month, date)"
        class="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full"
      />
    </template>
  </Calendar>
</template>

<script setup>
import { ref } from 'vue'

const selectedDate = ref(Date.now())

const isSpecialDate = (year, month, date) => {
  // 判断是否为特殊日期
  return date % 7 === 0
}
</script>
```

### 结合日期范围选择

```vue
<template>
  <div class="space-y-4">
    <Calendar 
      v-model="startDate"
      :is-date-disabled="(date) => date < Date.now()"
    />
    <Calendar 
      v-model="endDate"
      :is-date-disabled="(date) => date < startDate"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const startDate = ref(null)
const endDate = ref(null)
</script>
```

## 样式定制

组件使用 CSS 变量来控制样式，你可以通过覆盖这些变量来自定义外观：

```css
.calendar {
  --n-bezier: cubic-bezier(0.4, 0, 0.2, 1);
  --n-border-color: #e5e7eb;
  --n-border-radius: 0.5rem;
  --n-text-color: #1f2937;
  --n-title-font-weight: 600;
  --n-title-font-size: 1.25rem;
  --n-title-text-color: #1f2937;
  --n-day-text-color: #9ca3af;
  --n-font-size: 0.875rem;
  --n-line-height: 1.5;
  --n-date-color-current: #3b82f6;
  --n-date-text-color-current: #ffffff;
  --n-cell-color-hover: #f3f4f6;
  --n-bar-color: #3b82f6;
}
```

## 最佳实践

### 1. 日期处理
- 使用时间戳（timestamp）作为值，便于处理和比较
- 使用 `date-fns` 等库来处理日期格式化

### 2. 禁用日期
- 提供清晰的视觉反馈，让用户知道哪些日期不可选
- 考虑使用工具提示说明禁用的原因

### 3. 用户体验
- 在切换月份时提供平滑的过渡动画
- 当前日期应该清晰可见
- 选中的日期应该有明显的标识

### 4. 性能优化
- 避免在 `isDateDisabled` 函数中进行复杂计算
- 考虑缓存日期计算结果

## 注意事项

1. **时间戳**: 组件使用时间戳（number）作为日期值，而不是 Date 对象
2. **时区处理**: 组件内部使用本地时区，如需处理不同时区请自行转换
3. **日期格式**: 确保传入的时间戳格式正确
4. **浏览器兼容性**: 某些旧版浏览器可能不支持某些日期 API
5. **国际化**: 确保已正确配置 date-fns 的 locale 以支持多语言

## 更新日志

### v2.0.0
- 完全重写组件架构，基于 naive-ui Calendar 组件
- 简化 API，专注于日历展示和选择
- 新增自定义插槽支持
- 新增禁用日期功能
- 优化样式系统，使用 CSS 变量
- 新增面板变化事件
- 优化响应式设计

---

<script setup>
import { ref } from 'vue'

// 示例数据
const calendarValue1 = ref(Date.now())
const calendarValue2 = ref(Date.now())
const defaultCalendarValue = ref(new Date(2025, 10, 1).getTime())

const handlePanelChange = (info) => {
  console.log('面板切换:', info)
}
</script>