# Date 日期选择器组件

Date 是一个功能完整的日期选择器组件，支持多种日期格式、时间选择、日期范围选择等高级功能。提供直观的日历界面和灵活的配置选项。


## 特性

- 📅 **多种日期格式** - 支持 YYYY-MM-DD、MM/DD/YYYY 等常用格式
- 🎨 **多种样式变体** - 支持 outline、filled、ghost 三种输入框样式
- 📱 **响应式设计** - 自适应不同屏幕尺寸
- 🌍 **国际化支持** - 内置多语言支持
- ⚡ **高性能** - 虚拟滚动和智能渲染
- 🔧 **高度可定制** - 支持自定义样式、验证规则等
- 🎯 **无障碍访问** - 完整的键盘导航和屏幕阅读器支持

## 基本用法

### 基础日期选择

<div class="flex flex-wrap items-end gap-4 mb-6">
  <Date 
    v-model="selectedDate1" 
    placeholder="请选择日期"
    label="选择日期"
  />
  
  <Date 
    v-model="selectedDate2" 
    placeholder="请选择日期"
    label="带标签"
    required
  />
</div>

### 不同尺寸

<div class="flex flex-wrap items-end gap-4 mb-6">
  <Date size="xs" placeholder="XS 尺寸" />
  <Date size="sm" placeholder="SM 尺寸" />
  <Date size="md" placeholder="MD 尺寸" />
  <Date size="lg" placeholder="LG 尺寸" />
  <Date size="xl" placeholder="XL 尺寸" />
</div>

### 不同样式变体

<div class="flex flex-wrap items-end gap-4 mb-6">
  <Date variant="outline" placeholder="Outline 样式" />
  <Date variant="filled" placeholder="Filled 样式" />
  <Date variant="ghost" placeholder="Ghost 样式" />
</div>

### 不同颜色主题

<div class="flex flex-wrap items-end gap-4 mb-6">
  <Date color="primary" placeholder="Primary 主题" />
  <Date color="secondary" placeholder="Secondary 主题" />
  <Date color="success" placeholder="Success 主题" />
  <Date color="warning" placeholder="Warning 主题" />
  <Date color="error" placeholder="Error 主题" />
</div>

## 高级功能

### 日期范围限制

<div class="flex flex-wrap items-end gap-4 mb-6">
  <Date 
    placeholder="最小日期限制"
    :minDate="new Date()"
    label="今天之后"
  />
  
  <Date 
    placeholder="最大日期限制"
    :maxDate="new Date(2024, 11, 31)"
    label="2024年内"
  />
</div>

### 时间选择

<div class="flex flex-wrap items-end gap-4 mb-6">
  <Date 
    placeholder="选择日期和时间"
    showTime
    timeFormat="24h"
    label="24小时制"
  />
  
  <Date 
    placeholder="选择日期和时间"
    showTime
    timeFormat="12h"
    label="12小时制"
  />
</div>

### 自定义格式

<div class="flex flex-wrap items-end gap-4 mb-6">
  <Date 
    placeholder="YYYY-MM-DD"
    format="YYYY-MM-DD"
    label="标准格式"
  />
  
  <Date 
    placeholder="MM/DD/YYYY"
    format="MM/DD/YYYY"
    label="美式格式"
  />
  
  <Date 
    placeholder="DD/MM/YYYY"
    format="DD/MM/YYYY"
    label="欧式格式"
  />
</div>

### 禁用和只读状态

<div class="flex flex-wrap items-end gap-4 mb-6">
  <Date 
    placeholder="禁用状态"
    disabled
    label="禁用"
  />
  
  <Date 
    placeholder="只读状态"
    readonly
    label="只读"
  />
</div>

### 布局方向

<div class="flex flex-wrap items-end gap-4 mb-6">
  <Date 
    placeholder="水平布局"
    direction="row"
    label="水平布局"
  />
  
  <Date 
    placeholder="垂直布局"
    direction="column"
    label="垂直布局"
  />
</div>

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string \| Date` | - | 绑定值 |
| placeholder | `string` | `'请选择日期'` | 占位符文本 |
| label | `string` | - | 标签文本 |
| required | `boolean` | `false` | 是否必填 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| direction | `'row' \| 'column'` | `'row'` | 布局方向 |
| labelWidth | `string` | `'w-32'` | 标签宽度 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 尺寸 |
| format | `string` | `'YYYY-MM-DD'` | 日期格式 |
| minDate | `string \| Date` | - | 最小日期 |
| maxDate | `string \| Date` | - | 最大日期 |
| showToday | `boolean` | `true` | 是否显示今天按钮 |
| showNow | `boolean` | `false` | 是否显示现在按钮 |
| allowClear | `boolean` | `true` | 是否允许清空 |
| color | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | 主题颜色 |
| variant | `'outline' \| 'filled' \| 'ghost'` | `'outline'` | 输入框样式 |
| shape | `'rounded' \| 'square' \| 'circle'` | `'rounded'` | 形状 |
| range | `boolean` | `false` | 是否支持范围选择 |
| multiple | `boolean` | `false` | 是否支持多选 |
| showWeekNumbers | `boolean` | `false` | 是否显示周数 |
| showTime | `boolean` | `false` | 是否显示时间选择 |
| timeFormat | `'12h' \| '24h'` | `'24h'` | 时间格式 |
| customClass | `string` | `''` | 自定义类名 |
| inputClass | `string` | `''` | 输入框自定义类名 |
| panelClass | `string` | `''` | 面板自定义类名 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `value: string \| Date \| null` | 值变化时触发 |
| change | `value: string \| Date \| null` | 值变化时触发 |
| select | `value: string \| Date \| null` | 选择日期时触发 |
| clear | - | 清空时触发 |
| focus | `event: FocusEvent` | 获得焦点时触发 |
| blur | `event: FocusEvent` | 失去焦点时触发 |

### Methods

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| focus | - | - | 聚焦输入框 |
| blur | - | - | 失焦输入框 |
| clear | - | - | 清空值 |
| getValue | - | `string \| Date \| null` | 获取当前值 |
| setValue | `value: string \| Date` | - | 设置值 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义输入框内容 |

## 使用示例

### 基础用法

```vue
<template>
  <Date 
    v-model="selectedDate" 
    placeholder="请选择日期"
    @change="handleDateChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedDate = ref('')

const handleDateChange = (value) => {
  console.log('选择的日期:', value)
}
</script>
```

### 带标签和验证

```vue
<template>
  <Date 
    v-model="formData.birthday"
    label="出生日期"
    placeholder="请选择出生日期"
    required
    :maxDate="new Date()"
    @change="validateBirthday"
  />
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  birthday: ''
})

const validateBirthday = (value) => {
  if (value && new Date(value) > new Date()) {
    console.error('出生日期不能是未来日期')
  }
}
</script>
```

### 自定义样式

```vue
<template>
  <Date 
    v-model="selectedDate"
    placeholder="自定义样式"
    color="success"
    variant="filled"
    shape="rounded"
    size="lg"
    customClass="my-date-picker"
    inputClass="custom-input"
    panelClass="custom-panel"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedDate = ref('')
</script>
```

### 时间选择

```vue
<template>
  <Date 
    v-model="selectedDateTime"
    placeholder="选择日期和时间"
    showTime
    timeFormat="24h"
    format="YYYY-MM-DD HH:mm:ss"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedDateTime = ref('')
</script>
```

### 日期范围限制

```vue
<template>
  <Date 
    v-model="selectedDate"
    placeholder="选择日期"
    :minDate="minDate"
    :maxDate="maxDate"
    label="可选日期范围"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedDate = ref('')
const minDate = ref(new Date())
const maxDate = ref(new Date(2024, 11, 31))
</script>
```

### 编程式控制

```vue
<template>
  <div>
    <Date 
      ref="dateRef"
      v-model="selectedDate"
      placeholder="编程式控制"
    />
    <div class="mt-4 space-x-2">
      <btn @click="focusDate">聚焦</btn>
      <btn @click="clearDate">清空</btn>
      <btn @click="setToday">设为今天</btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dateRef = ref()
const selectedDate = ref('')

const focusDate = () => {
  dateRef.value?.focus()
}

const clearDate = () => {
  dateRef.value?.clear()
}

const setToday = () => {
  dateRef.value?.setValue(new Date())
}
</script>
```

## 最佳实践

### 1. 日期格式选择
- 根据用户地区选择合适的日期格式
- 使用 `YYYY-MM-DD` 作为标准格式
- 考虑使用时间选择器时包含时间格式

### 2. 验证规则
- 设置合理的日期范围限制
- 提供清晰的错误提示
- 考虑时区问题

### 3. 用户体验
- 提供默认值和占位符
- 支持键盘导航
- 在移动端优化触摸体验

### 4. 性能优化
- 避免频繁的日期计算
- 使用防抖处理输入事件
- 合理设置日期范围

## 注意事项

1. **时区处理**: 组件内部使用本地时区，如需处理不同时区请自行转换
2. **日期格式**: 确保传入的日期字符串格式正确
3. **浏览器兼容性**: 某些旧版浏览器可能不支持某些日期格式
4. **国际化**: 确保已正确配置 i18n 以支持多语言
5. **无障碍访问**: 为屏幕阅读器用户提供适当的标签和描述

## 更新日志

### v2.0.0
- 完全重写组件架构
- 合并 CSS 文件到 Vue 组件
- 新增多种样式变体和颜色主题
- 新增时间选择功能
- 新增日期范围限制
- 新增多种日期格式支持
- 优化响应式设计
- 新增无障碍访问支持

---

<script setup>
import { ref } from 'vue'

// 示例数据
const selectedDate1 = ref('')
const selectedDate2 = ref('')
const selectedDate3 = ref('')
const selectedDate4 = ref('')
const selectedDate5 = ref('')
const selectedDate6 = ref('')
const selectedDate7 = ref('')
const selectedDate8 = ref('')
const selectedDate9 = ref('')
const selectedDate10 = ref('')
const selectedDate11 = ref('')
const selectedDate12 = ref('')
const selectedDate13 = ref('')
const selectedDate14 = ref('')
const selectedDate15 = ref('')
const selectedDate16 = ref('')
const selectedDate17 = ref('')
const selectedDate18 = ref('')
const selectedDate19 = ref('')
const selectedDate20 = ref('')
const selectedDate21 = ref('')
const selectedDate22 = ref('')
const selectedDate23 = ref('')
const selectedDate24 = ref('')
const selectedDate25 = ref('')
const selectedDate26 = ref('')
const selectedDate27 = ref('')
const selectedDate28 = ref('')
const selectedDate29 = ref('')
const selectedDate30 = ref('')
const selectedDate31 = ref('')
const selectedDate32 = ref('')
const selectedDate33 = ref('')
const selectedDate34 = ref('')
const selectedDate35 = ref('')
const selectedDate36 = ref('')
const selectedDate37 = ref('')
const selectedDate38 = ref('')
const selectedDate39 = ref('')
const selectedDate40 = ref('')
const selectedDate41 = ref('')
const selectedDate42 = ref('')
const selectedDate43 = ref('')
const selectedDate44 = ref('')
const selectedDate45 = ref('')
const selectedDate46 = ref('')
const selectedDate47 = ref('')
const selectedDate48 = ref('')
const selectedDate49 = ref('')
const selectedDate50 = ref('')
</script>
- 新增编程式控制方法