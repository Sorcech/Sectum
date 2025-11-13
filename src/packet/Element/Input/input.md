# Input 组件

一个功能丰富、高度可定制的输入框组件，基于UnoCSS动态样式系统，支持多种颜色、尺寸、变体和交互效果。

## 特性

- 🎨 **5种颜色变体**: primary, secondary, success, error, warning
- 🎭 **多种样式变体**: default, ghost, clean
- 📏 **5种尺寸**: xs, sm, md, lg, xl
- 🔘 **形状选项**: pills (圆角), circle (圆形)
- 🚀 **完整动效**: focus缩放动画、状态过渡
- 📱 **响应式支持**: sm, md, lg, xl断点
- ♿ **无障碍**: 完整的keyboard和screen reader支持
- ⚡ **高性能**: 基于UnoCSS的动态样式系统
- 🎯 **无边框设计**: 默认无边框，更加简洁
- 🏷️ **标签支持**: 内置标签和验证文本，支持自定义宽度
- 🎛️ **Flex 布局支持**: 支持外部传入 class，完美适配 flex 布局
- 🎨 **图标支持**: 支持在输入框左右两侧显示图标，支持多种图标样式
- 🧹 **清除功能**: 清除图标（xmark、times等）自动变为可点击按钮，hover显示primary颜色
- 👁️ **密码切换**: 密码输入框的eye图标可点击切换显示/隐藏密码
- 📐 **宽度控制**: 支持通过属性设置label和input的宽度，支持整行显示
- 🔄 **布局方向**: 支持label和input在同一行（row）或垂直排列（column）

## 安装

```ts
import { ipt } from 'sectum'
// 或者
import ipt from 'sectum'
```

## Basic

<div class="flex flex-wrap items-center gap-3">
  <ipt placeholder="Type here..." />
  <ipt loading placeholder="Loading..." />
  <ipt disabled placeholder="Disabled" />
  <ipt pills placeholder="Pills style" />
  <ipt ghost placeholder="Ghost style" />
  <ipt clean placeholder="Clean style" />
</div>

```vue
<ipt placeholder="Type here..." />
<ipt loading placeholder="Loading..." />
<ipt disabled placeholder="Disabled" />
<ipt pills placeholder="Pills style" />
<ipt ghost placeholder="Ghost style" />
<ipt clean placeholder="Clean style" />
```

### Full Width

<div class="flex flex-col gap-3">
  <ipt full-width placeholder="占据整行" />
  <ipt full-width label="Username" placeholder="带标签的整行输入框" />
  <ipt full-width label="Email" type="email" placeholder="邮箱输入框" />
</div>

```vue
<!-- 无标签，占据整行 -->
<ipt full-width placeholder="占据整行" />

<!-- 带标签，占据整行 -->
<ipt full-width label="Username" placeholder="带标签的整行输入框" />
<ipt full-width label="Email" type="email" placeholder="邮箱输入框" />
```

## Colors

<div class="flex flex-wrap items-center gap-3">
  <ipt color="primary" placeholder="Primary" />
  <ipt color="secondary" placeholder="Secondary" />
  <ipt color="success" placeholder="Success" />
  <ipt color="warning" placeholder="Warning" />
  <ipt color="error" placeholder="Error" />
</div>

```vue
<ipt color="primary" placeholder="Primary" />
<ipt color="secondary" placeholder="Secondary" />
<ipt color="success" placeholder="Success" />
<ipt color="warning" placeholder="Warning" />
<ipt color="error" placeholder="Error" />
```

## Sizes

<div class="flex flex-wrap gap-2 items-center">
  <ipt size="xs" placeholder="Extra small" />
  <ipt size="sm" placeholder="Small" />
  <ipt size="md" placeholder="Medium" />
  <ipt size="lg" placeholder="Large" />
  <ipt size="xl" placeholder="Extra large" />
</div>

```vue
<ipt size="xs" placeholder="Extra small" />
<ipt size="sm" placeholder="Small" />
<ipt size="md" placeholder="Medium" />
<ipt size="lg" placeholder="Large" />
<ipt size="xl" placeholder="Extra large" />
```

## Variants

### Default (Bordered)

<div class="flex flex-wrap items-center gap-3">
  <ipt placeholder="Default bordered" />
  <ipt color="primary" placeholder="Primary bordered" />
</div>

```vue
<ipt placeholder="Default bordered" />
<ipt color="primary" placeholder="Primary bordered" />
```

### Ghost

<div class="flex flex-wrap items-center gap-3 bg-base-200/20 p-4 rounded-lg">
  <ipt ghost placeholder="Ghost input" />
  <ipt ghost color="primary" placeholder="Primary ghost" />
</div>

```vue
<ipt ghost placeholder="Ghost input" />
<ipt ghost color="primary" placeholder="Primary ghost" />
```

### Clean

<div class="flex flex-wrap items-center gap-3">
  <ipt clean placeholder="Clean input" />
  <ipt clean color="primary" placeholder="Primary clean" />
</div>

```vue
<ipt clean placeholder="Clean input" />
<ipt clean color="primary" placeholder="Primary clean" />
```

## Shapes

### Pills

<div class="flex flex-wrap items-center gap-3">
  <ipt pills placeholder="Pills input" />
  <ipt pills color="primary" placeholder="Primary pills" />
</div>

```vue
<ipt pills placeholder="Pills input" />
<ipt pills color="primary" placeholder="Primary pills" />
```

### Circle

<div class="flex flex-wrap items-center gap-3">
  <ipt circle placeholder="●" />
  <ipt circle color="primary" placeholder="●" />
</div>

```vue
<ipt circle placeholder="●" />
<ipt circle color="primary" placeholder="●" />
```

## With Label

<div class="flex flex-wrap items-center gap-3">
  <ipt label="Your name" placeholder="Enter your name" />
  <ipt label="Email" type="email" placeholder="Enter your email" />
  <ipt label="Password" type="password" placeholder="Enter password" />
</div>

```vue
<ipt label="Your name" placeholder="Enter your name" />
<ipt label="Email" type="email" placeholder="Enter your email" />
<ipt label="Password" type="password" placeholder="Enter password" />
```

### Required Field Indicator (必填字段标识)

标签中的 `*` 号会自动显示为红色，用于标识必填字段：

<div class="flex flex-wrap items-center gap-3">
  <ipt label="姓名 *" placeholder="请输入姓名" />
  <ipt label="手机号 *" type="tel" placeholder="请输入手机号" />
  <ipt label="密码 *" type="password" placeholder="请输入密码" />
</div>

```vue
<!-- 标签中的 * 号会自动显示为红色 -->
<ipt label="姓名 *" placeholder="请输入姓名" />
<ipt label="手机号 *" type="tel" placeholder="请输入手机号" />
<ipt label="密码 *" type="password" placeholder="请输入密码" />
```

### Format Validation (格式验证)

组件支持自动验证手机号、邮箱和密码格式。设置 `validate` 属性后，组件会在输入时自动验证格式：

<div class="flex flex-col gap-3">
  <ipt label="手机号 *" validate="phone" placeholder="请输入手机号" />
  <ipt label="邮箱" validate="email" type="email" placeholder="请输入邮箱" />
  <ipt label="密码 *" validate="password" type="password" placeholder="请输入密码" />
</div>

```vue
<!-- 手机号格式验证 -->
<ipt 
  label="手机号 *" 
  validate="phone" 
  placeholder="请输入手机号" 
  @validate="handleValidate"
/>

<!-- 邮箱格式验证 -->
<ipt 
  label="邮箱" 
  validate="email" 
  type="email" 
  placeholder="请输入邮箱"
  @validate="handleValidate"
/>

<!-- 密码格式验证 -->
<ipt 
  label="密码 *" 
  validate="password" 
  type="password" 
  placeholder="请输入密码"
  @validate="handleValidate"
/>

<script setup>
const handleValidate = (result) => {
  console.log('验证结果:', result)
  // result: { valid: boolean, error: string, type: 'phone' | 'email' | 'password' }
}
</script>
```

**验证规则：**
- **手机号** (`validate="phone"`): 11位数字，以1开头，第二位是3-9
- **邮箱** (`validate="email"`): 标准邮箱格式（包含@和域名）
- **密码** (`validate="password"`): 8-20位，至少包含字母和数字，可包含特殊字符

**注意事项：**
- 当值为空时，不会显示验证错误（由外部处理必填验证）
- 可以通过 `autoValidate` 属性控制是否在输入时自动验证（默认 `true`）
- 验证错误会通过 `error` 属性显示，也可以通过 `@validate` 事件获取验证结果

### Label Direction (布局方向)

<div class="flex flex-col gap-3">
  <div class="flex flex-wrap items-center gap-3">
    <ipt label="Username" direction="row" placeholder="Row layout (默认)" />
    <ipt label="Email" direction="row" type="email" placeholder="同一行显示" />
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <ipt label="Username" direction="column" placeholder="Column layout" />
    <ipt label="Email" direction="column" type="email" placeholder="垂直排列" />
  </div>
</div>

```vue
<!-- Row 布局：label 和 input 在同一行（默认） -->
<ipt label="Username" direction="row" placeholder="Row layout (默认)" />
<ipt label="Email" direction="row" type="email" placeholder="同一行显示" />

<!-- Column 布局：label 在 input 上方 -->
<ipt label="Username" direction="column" placeholder="Column layout" />
<ipt label="Email" direction="column" type="email" placeholder="垂直排列" />
```

### Label and Input Width

<div class="flex flex-wrap items-center gap-3">
  <ipt label="Username" label-width="w-24" placeholder="Enter username" />
  <ipt label="Email" label-width="w-32" input-width="w-64" placeholder="Enter email" />
  <ipt label="Password" label-width="w-20" input-width="flex-1" placeholder="Enter password" />
</div>

```vue
<!-- 设置 label 宽度 -->
<ipt label="Username" label-width="w-24" placeholder="Enter username" />

<!-- 同时设置 label 和 input 宽度 -->
<ipt label="Email" label-width="w-32" input-width="w-64" placeholder="Enter email" />

<!-- input 使用 flex-1 占据剩余空间 -->
<ipt label="Password" label-width="w-20" input-width="flex-1" placeholder="Enter password" />
```

## With Error

<div class="flex flex-wrap items-center gap-3">
  <ipt error="This field is required" placeholder="Error input" />
  <ipt color="error" error="Invalid email format" placeholder="Error with color" />
</div>

```vue
<ipt error="This field is required" placeholder="Error input" />
<ipt color="error" error="Invalid email format" placeholder="Error with color" />
```

## States

<div class="flex flex-wrap items-center gap-3">
  <ipt loading placeholder="Loading..." />
  <ipt disabled placeholder="Disabled" />
  <ipt disabled value="Disabled with value" />
</div>

```vue
<ipt loading placeholder="Loading..." />
<ipt disabled placeholder="Disabled" />
<ipt disabled value="Disabled with value" />
```

## Responsive

<div class="flex flex-wrap items-center gap-3">
  <ipt size="sm" md="lg" placeholder="Small on mobile, large on desktop" />
  <ipt size="lg" md="xs" placeholder="Large on mobile, small on desktop" />
</div>

```vue
<ipt size="sm" md="lg" placeholder="Small on mobile, large on desktop" />
<ipt size="lg" md="xs" placeholder="Large on mobile, small on desktop" />
```

## Input Types

<div class="flex flex-wrap items-center gap-3">
  <ipt type="text" placeholder="Text input" />
  <ipt type="email" placeholder="Email input" />
  <ipt type="password" placeholder="Password input" />
  <ipt type="number" placeholder="Number input" />
  <ipt type="tel" placeholder="Phone input" />
  <ipt type="url" placeholder="URL input" />
</div>

```vue
<ipt type="text" placeholder="Text input" />
<ipt type="email" placeholder="Email input" />
<ipt type="password" placeholder="Password input" />
<ipt type="number" placeholder="Number input" />
<ipt type="tel" placeholder="Phone input" />
<ipt type="url" placeholder="URL input" />
```

## With Icons

> **注意**: 图标默认使用 `light` 样式。可以通过 `leftIconStyle` 和 `rightIconStyle` 属性来改变图标样式，可选值：`'solid'`、`'regular'`、`'light'`、`'thin'`、`'brand'`。

### Left Icon

<div class="flex flex-wrap items-center gap-3">
  <ipt left-icon="user" placeholder="Username (默认 light)" />
  <ipt left-icon="envelope" placeholder="Email (默认 light)" />
  <ipt left-icon="search" color="primary" placeholder="Search..." />
</div>

```vue
<ipt left-icon="user" placeholder="Username (默认 light)" />
<ipt left-icon="envelope" placeholder="Email (默认 light)" />
<ipt left-icon="search" color="primary" placeholder="Search..." />
```

### Icon Styles

<div class="flex flex-wrap items-center gap-3">
  <ipt left-icon="user" left-icon-style="solid" placeholder="Solid style" />
  <ipt left-icon="user" left-icon-style="regular" placeholder="Regular style" />
  <ipt left-icon="user" placeholder="Light style (默认)" />
  <ipt left-icon="user" left-icon-style="thin" placeholder="Thin style" />
  <ipt left-icon="github" left-icon-style="brand" placeholder="Brand style" />
</div>

```vue
<ipt left-icon="user" left-icon-style="solid" placeholder="Solid style" />
<ipt left-icon="user" left-icon-style="regular" placeholder="Regular style" />
<ipt left-icon="user" placeholder="Light style (默认)" />
<ipt left-icon="user" left-icon-style="thin" placeholder="Thin style" />
<ipt left-icon="github" left-icon-style="brand" placeholder="Brand style" />
```

### Right Icon

<div class="flex flex-wrap items-center gap-3">
  <ipt right-icon="eye" placeholder="Password (默认 light)" />
  <ipt right-icon="check" color="success" placeholder="Verified (默认 light)" />
  <ipt right-icon="times" color="error" placeholder="Clear (默认 light)" />
</div>

```vue
<ipt right-icon="eye" placeholder="Password (默认 light)" />
<ipt right-icon="check" color="success" placeholder="Verified (默认 light)" />
<ipt right-icon="times" color="error" placeholder="Clear (默认 light)" />
```

### Password Toggle (密码显示/隐藏)

当输入框类型为 `password` 且右侧图标为 `eye` 时，图标会自动变为可点击按钮，点击可以在 `eye` 和 `eye-slash` 之间切换，同时 input 的 type 会在 `password` 和 `text` 之间切换。

> **注意**: 
> - 默认状态：图标显示 `eye`，input type 为 `password`（隐藏密码）
> - 点击后：图标切换为 `eye-slash`，input type 切换为 `text`（显示密码）
> - 再次点击：恢复默认状态

<div class="flex flex-wrap items-center gap-3">
  <ipt type="password" right-icon="eye" placeholder="点击图标切换显示/隐藏" />
  <ipt type="password" right-icon="eye" label="Password" placeholder="带标签的密码输入框" />
  <ipt type="password" right-icon="eye" left-icon="lock" placeholder="带左侧图标的密码输入框" />
</div>

```vue
<template>
  <!-- 基础密码切换 -->
  <ipt type="password" right-icon="eye" placeholder="点击图标切换显示/隐藏" />
  
  <!-- 带标签的密码切换 -->
  <ipt type="password" right-icon="eye" label="Password" placeholder="带标签的密码输入框" />
  
  <!-- 带左侧图标的密码切换 -->
  <ipt type="password" right-icon="eye" left-icon="lock" placeholder="带左侧图标的密码输入框" />
</template>
```

<div class="flex flex-col gap-3">
  <ipt type="password" right-icon="eye" full-width placeholder="占据整行的密码输入框" />
  <ipt type="password" right-icon="eye" full-width label="Password" placeholder="带标签的整行密码输入框" />
  <ipt type="password" right-icon="eye" left-icon="lock" full-width label="Password" placeholder="带左侧图标和标签的整行密码输入框" />
</div>

```vue
<template>
  <!-- 占据整行的密码切换 -->
  <ipt type="password" right-icon="eye" full-width placeholder="占据整行的密码输入框" />
  
  <!-- 带标签的整行密码切换 -->
  <ipt type="password" right-icon="eye" full-width label="Password" placeholder="带标签的整行密码输入框" />
  
  <!-- 带左侧图标和标签的整行密码切换 -->
  <ipt type="password" right-icon="eye" left-icon="lock" full-width label="Password" placeholder="带左侧图标和标签的整行密码输入框" />
</template>
```

### Clear Icon (可点击清除)

当右侧图标为清除图标（`xmark`、`times`、`close`、`x`、`remove`）时，图标会自动变为可点击按钮，hover 时显示 primary 颜色，点击可清空输入框内容。

<div class="flex flex-wrap items-center gap-3">
  <ipt right-icon="xmark" placeholder="点击右侧图标清除" />
  <ipt right-icon="times" placeholder="可清除输入框" />
  <ipt right-icon="close" placeholder="支持多种清除图标" />
</div>

```vue
<template>
  <ipt v-model="value" right-icon="xmark" placeholder="点击右侧图标清除" />
  <ipt v-model="value" right-icon="times" placeholder="可清除输入框" />
  <ipt v-model="value" right-icon="close" placeholder="支持多种清除图标" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```

### Right Icon with Different Styles

<div class="flex flex-wrap items-center gap-3">
  <ipt right-icon="check" right-icon-style="solid" color="success" placeholder="Solid" />
  <ipt right-icon="check" right-icon-style="regular" color="success" placeholder="Regular" />
  <ipt right-icon="check" color="success" placeholder="Light (默认)" />
  <ipt right-icon="check" right-icon-style="thin" color="success" placeholder="Thin" />
</div>

```vue
<ipt right-icon="check" right-icon-style="solid" color="success" placeholder="Solid" />
<ipt right-icon="check" right-icon-style="regular" color="success" placeholder="Regular" />
<ipt right-icon="check" color="success" placeholder="Light (默认)" />
<ipt right-icon="check" right-icon-style="thin" color="success" placeholder="Thin" />
```

### Both Icons

<div class="flex flex-wrap items-center gap-3">
  <ipt left-icon="user" right-icon="check" placeholder="Username" />
  <ipt left-icon="search" right-icon="filter" color="primary" placeholder="Search and filter" />
</div>

```vue
<ipt left-icon="user" right-icon="check" placeholder="Username" />
<ipt left-icon="search" right-icon="filter" color="primary" placeholder="Search and filter" />
```

### Icon with Different Sizes

<div class="flex flex-wrap items-center gap-3">
  <ipt size="xs" left-icon="user" placeholder="Extra small" />
  <ipt size="sm" left-icon="user" placeholder="Small" />
  <ipt size="md" left-icon="user" placeholder="Medium" />
  <ipt size="lg" left-icon="user" placeholder="Large" />
  <ipt size="xl" left-icon="user" placeholder="Extra large" />
</div>

```vue
<ipt size="xs" left-icon="user" placeholder="Extra small" />
<ipt size="sm" left-icon="user" placeholder="Small" />
<ipt size="md" left-icon="user" placeholder="Medium" />
<ipt size="lg" left-icon="user" placeholder="Large" />
<ipt size="xl" left-icon="user" placeholder="Extra large" />
```

### Icon with Label

<div class="flex flex-wrap items-center gap-3">
  <ipt label="Username" left-icon="user" placeholder="Enter username" class="w-64" />
  <ipt label="Email" left-icon="envelope" type="email" placeholder="Enter email" class="w-64" />
  <ipt label="Password" left-icon="lock" right-icon="eye" type="password" placeholder="Enter password (点击图标切换显示/隐藏)" class="w-64" />
</div>

```vue
<ipt label="Username" left-icon="user" placeholder="Enter username" class="w-64" />
<ipt label="Email" left-icon="envelope" type="email" placeholder="Enter email" class="w-64" />
<ipt label="Password" left-icon="lock" right-icon="eye" type="password" placeholder="Enter password (点击图标切换显示/隐藏)" class="w-64" />
```

<div class="flex flex-col gap-3">
  <ipt label="Username" left-icon="user" full-width placeholder="Enter username" />
  <ipt label="Email" left-icon="envelope" type="email" full-width placeholder="Enter email" />
  <ipt label="Password" left-icon="lock" right-icon="eye" type="password" full-width placeholder="Enter password (点击图标切换显示/隐藏)" />
</div>

```vue
<ipt label="Username" left-icon="user" full-width placeholder="Enter username" />
<ipt label="Email" left-icon="envelope" type="email" full-width placeholder="Enter email" />
<ipt label="Password" left-icon="lock" right-icon="eye" type="password" full-width placeholder="Enter password (点击图标切换显示/隐藏)" />
```

### Icon with Colors

<div class="flex flex-wrap items-center gap-3">
  <ipt left-icon="user" color="primary" placeholder="Primary" />
  <ipt left-icon="check" color="success" placeholder="Success" />
  <ipt left-icon="exclamation-triangle" color="warning" placeholder="Warning" />
  <ipt left-icon="times" color="error" placeholder="Error" />
</div>

```vue
<ipt left-icon="user" color="primary" placeholder="Primary" />
<ipt left-icon="check" color="success" placeholder="Success" />
<ipt left-icon="exclamation-triangle" color="warning" placeholder="Warning" />
<ipt left-icon="times" color="error" placeholder="Error" />
```

### Icon with Variants

<div class="flex flex-wrap items-center gap-3">
  <ipt left-icon="search" ghost placeholder="Ghost with icon" />
  <ipt left-icon="user" pills color="primary" placeholder="Pills with icon" />
  <ipt left-icon="search" clean placeholder="Clean with icon" />
</div>

```vue
<ipt left-icon="search" ghost placeholder="Ghost with icon" />
<ipt left-icon="user" pills color="primary" placeholder="Pills with icon" />
<ipt left-icon="search" clean placeholder="Clean with icon" />
```

### Icon with States

<div class="flex flex-wrap items-center gap-3">
  <ipt left-icon="user" loading placeholder="Loading..." />
  <ipt left-icon="user" disabled placeholder="Disabled" />
  <ipt left-icon="user" error="This field is required" placeholder="Error state" />
</div>

```vue
<ipt left-icon="user" loading placeholder="Loading..." />
<ipt left-icon="user" disabled placeholder="Disabled" />
<ipt left-icon="user" error="This field is required" placeholder="Error state" />
```

### Icon with Error Message

<div class="flex flex-wrap items-center gap-3">
  <ipt left-icon="envelope" error="Invalid email format" placeholder="Email" />
  <ipt left-icon="user" color="error" error="Username already exists" placeholder="Username" />
  <ipt left-icon="lock" right-icon="eye" error="Password too weak" type="password" placeholder="Password (点击图标切换显示/隐藏)" />
</div>

```vue
<ipt left-icon="envelope" error="Invalid email format" placeholder="Email" />
<ipt left-icon="user" color="error" error="Username already exists" placeholder="Username" />
<ipt left-icon="lock" right-icon="eye" error="Password too weak" type="password" placeholder="Password (点击图标切换显示/隐藏)" />
```


## API

### Props

| 属性名        | 类型                                                            | 默认值      | 说明                             |
| ------------- | --------------------------------------------------------------- | ----------- | -------------------------------- |
| `modelValue`  | `string \| number`                                              | -           | 输入框的值（v-model）            |
| `direction`   | `string`                                                        | `'row'`     | 标签和输入框的布局方向           |
| `label`       | `string`                                                        | -           | 标签文本（标签中的 `*` 号会自动显示为红色，用于标识必填字段） |
| `labelWidth`  | `string`                                                        | `'w-1/3'`   | 标签宽度（支持 Tailwind 宽度类） |
| `inputWidth`  | `string`                                                        | -           | 输入框宽度（支持 Tailwind 宽度类，如未设置则根据布局自动计算） |
| `fullWidth`   | `boolean`                                                       | `false`     | 是否占据整行宽度（设置为 true 时强制使用 w-full） |
| `placeholder` | `string`                                                        | -           | 占位符文本                       |
| `type`        | `string`                                                        | `'text'`    | 输入框类型                       |
| `name`        | `string`                                                        | -           | 输入框名称                       |
| `disabled`    | `boolean`                                                       | `false`     | 是否禁用                         |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                          | `'md'`      | 输入框尺寸                       |
| `bordered`    | `boolean`                                                       | `true`      | 是否显示边框                     |
| `ghost`       | `boolean`                                                       | `false`     | 是否使用透明背景                 |
| `color`       | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'warning'` | `'default'` | 输入框颜色主题                   |
| `error`       | `string`                                                        | -           | 错误信息文本                     |
| `pills`       | `boolean`                                                       | `false`     | 是否使用圆角样式                 |
| `circle`      | `boolean`                                                       | `false`     | 是否使用圆形样式                 |
| `clean`       | `boolean`                                                       | `false`     | 是否使用简洁样式（无背景、边框） |
| `loading`     | `boolean`                                                       | `false`     | 是否显示加载状态                 |
| `leftIcon`    | `string`                                                        | -           | 左侧图标名称                     |
| `leftIconStyle` | `'solid' \| 'regular' \| 'light' \| 'thin' \| 'brand'`        | `'light'`   | 左侧图标样式（默认 light）        |
| `rightIcon`   | `string`                                                        | -           | 右侧图标名称                     |
| `rightIconStyle` | `'solid' \| 'regular' \| 'light' \| 'thin' \| 'brand'`        | `'light'`   | 右侧图标样式（默认 light）        |
| `sm`          | `string`                                                        | -           | 小屏幕断点尺寸                   |
| `md`          | `string`                                                        | -           | 中等屏幕断点尺寸                 |
| `lg`          | `string`                                                        | -           | 大屏幕断点尺寸                   |
| `xl`          | `string`                                                        | -           | 超大屏幕断点尺寸                 |
| `validate`    | `'phone' \| 'email' \| 'password'`                            | -           | 格式验证类型（phone: 手机号, email: 邮箱, password: 密码） |
| `autoValidate`| `boolean`                                                       | `true`      | 是否在输入时自动验证格式         |

### Events

| 事件名              | 参数                      | 说明           |
| ------------------- | ------------------------- | -------------- |
| `update:modelValue` | `value: string \| number` | 值变化时触发   |
| `focus`             | `event: FocusEvent`       | 获得焦点时触发 |
| `blur`              | `event: FocusEvent`       | 失去焦点时触发 |
| `clear`             | -                         | 点击清除图标时触发 |
| `validate`          | `{ valid: boolean, error: string, type: 'phone' \| 'email' \| 'password' }` | 格式验证结果（当设置了 validate 属性时触发） |

### Slots

| 插槽名    | 说明                     |
| --------- | ------------------------ |
| `default` | 输入框内容（通常不需要） |

## 使用示例

### 基础用法

```vue
<template>
  <!-- 基础输入框 -->
  <ipt v-model="value" placeholder="请输入内容" />
  
  <!-- 带标签 -->
  <ipt v-model="name" label="姓名" placeholder="请输入姓名" />
  
  <!-- 带验证 -->
  <ipt 
    v-model="email" 
    label="邮箱" 
    type="email" 
    placeholder="请输入邮箱"
    :error="emailError"
  />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
const name = ref('')
const email = ref('')
const emailError = ref('')
</script>
```

### 颜色变体

```vue
<template>
  <ipt color="primary" placeholder="主要输入框" />
  <ipt color="success" placeholder="成功输入框" />
  <ipt color="warning" placeholder="警告输入框" />
  <ipt color="error" placeholder="错误输入框" />
</template>
```

### 尺寸和形状

```vue
<template>
  <!-- 不同尺寸 -->
  <ipt size="xs" placeholder="超小" />
  <ipt size="sm" placeholder="小" />
  <ipt size="md" placeholder="中等" />
  <ipt size="lg" placeholder="大" />
  <ipt size="xl" placeholder="超大" />
  
  <!-- 圆角输入框 -->
  <ipt pills placeholder="圆角输入框" />
  
  <!-- 圆形输入框 -->
  <ipt circle placeholder="●" />
</template>
```

### 状态控制

```vue
<template>
  <!-- 加载状态 -->
  <ipt loading placeholder="加载中..." />
  
  <!-- 禁用状态 -->
  <ipt disabled placeholder="禁用输入框" />
  
  <!-- 错误状态 -->
  <ipt 
    color="error" 
    error="此字段为必填项" 
    placeholder="错误输入框" 
  />
</template>
```

### 响应式设计

```vue
<template>
  <!-- 响应式尺寸 -->
  <ipt 
    size="sm" 
    md="lg" 
    lg="xl" 
    placeholder="响应式输入框"
  />
</template>
```

### 图标使用

```vue
<template>
  <!-- 左侧图标 -->
  <ipt 
    v-model="username"
    left-icon="user"
    placeholder="请输入用户名"
  />
  
  <!-- 右侧图标（密码切换） -->
  <ipt 
    v-model="password"
    type="password"
    right-icon="eye"
    placeholder="请输入密码（点击图标切换显示/隐藏）"
  />
  
  <!-- 左右都有图标 -->
  <ipt 
    v-model="search"
    left-icon="search"
    right-icon="filter"
    placeholder="搜索..."
  />
  
  <!-- 图标样式 -->
  <ipt 
    left-icon="user"
    left-icon-style="solid"
    placeholder="Solid 样式"
  />
  
  <ipt 
    left-icon="envelope"
    left-icon-style="regular"
    placeholder="Regular 样式"
  />
  
  <ipt 
    left-icon="search"
    placeholder="Light 样式（默认）"
  />
  
  <ipt 
    left-icon="user"
    left-icon-style="thin"
    placeholder="Thin 样式"
  />
  
  <ipt 
    right-icon="github"
    right-icon-style="brand"
    placeholder="Brand 样式"
  />
  
  <!-- 清除图标（可点击清除） -->
  <ipt 
    v-model="clearValue"
    right-icon="xmark"
    placeholder="点击右侧图标清除"
    @clear="handleClear"
  />
  
  <!-- 密码切换（eye 图标自动切换显示/隐藏） -->
  <ipt 
    v-model="password"
    type="password"
    right-icon="eye"
    placeholder="点击图标切换显示/隐藏密码"
  />
</template>

<script setup>
import { ref } from 'vue'
const clearValue = ref('')
const password = ref('')
const handleClear = () => {
  console.log('输入框已清除')
}
</script>
```

### 宽度控制

```vue
<template>
  <!-- 设置 label 宽度 -->
  <ipt label="Username" label-width="w-24" placeholder="Enter username" />
  
  <!-- 同时设置 label 和 input 宽度 -->
  <ipt label="Email" label-width="w-32" input-width="w-64" placeholder="Enter email" />
  
  <!-- input 使用 flex-1 占据剩余空间 -->
  <ipt label="Password" label-width="w-20" input-width="flex-1" placeholder="Enter password" />
  
  <!-- 占据整行 -->
  <ipt full-width label="Full Width" placeholder="占据整行宽度" />
</template>
```

### 组合使用

```vue
<template>
  <!-- 复杂组合 -->
  <ipt 
    v-model="search"
    color="primary" 
    size="lg" 
    pills 
    ghost
    left-icon="search"
    right-icon="xmark"
    placeholder="搜索..."
    @clear="handleSearchClear"
  />
  
  <!-- 表单组合 -->
  <div class="space-y-4">
    <ipt 
      v-model="form.name"
      label="姓名" 
      label-width="w-24"
      direction="row"
      left-icon="user"
      placeholder="请输入姓名"
      :error="errors.name"
    />
    <ipt 
      v-model="form.email"
      label="邮箱" 
      label-width="w-24"
      direction="row"
      type="email"
      left-icon="envelope"
      placeholder="请输入邮箱（默认 light 样式）"
      :error="errors.email"
    />
    <ipt 
      v-model="form.password"
      label="密码" 
      label-width="w-24"
      direction="row"
      type="password"
      right-icon="eye"
      placeholder="请输入密码（点击图标切换显示/隐藏）"
      :error="errors.password"
    />
  </div>
  
  <!-- 整行表单 -->
  <div class="space-y-4">
    <ipt 
      v-model="form.username"
      full-width
      label="用户名"
      left-icon="user"
      right-icon="xmark"
      placeholder="请输入用户名"
    />
    <ipt 
      v-model="form.email"
      full-width
      label="邮箱"
      left-icon="envelope"
      right-icon="xmark"
      type="email"
      placeholder="请输入邮箱"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const search = ref('')
const form = ref({
  name: '',
  email: '',
  password: '',
  username: ''
})
const errors = ref({
  name: '',
  email: '',
  password: ''
})
const handleSearchClear = () => {
  console.log('搜索框已清除')
}
</script>
```

### Flex 布局支持

Input 组件支持通过 `class` 属性传入外部样式类，完美适配 flex 布局：

```vue
<template>
  <!-- 在 flex 容器中占据剩余空间 -->
  <div class="flex flex-row items-center gap-2">
    <span class="flex-shrink-0">标签</span>
    <ipt 
      class="flex-1 min-w-0" 
      placeholder="占据剩余空间"
    />
    <button class="flex-shrink-0">按钮</button>
  </div>
  
  <!-- 在 flex 容器中固定宽度 -->
  <div class="flex flex-row items-center gap-2">
    <ipt 
      class="w-64" 
      placeholder="固定宽度"
    />
    <ipt 
      class="flex-1" 
      placeholder="占据剩余空间"
    />
  </div>
</template>
```

**说明**：
- 当没有 `label` 时，外部传入的 `class` 会同时应用到容器和 input 元素
- 支持所有 flex 相关类：`flex-1`, `flex-grow`, `flex-shrink`, `w-*`, `min-w-*`, `max-w-*` 等
- 当传入 `flex-1` 时，容器会自动应用 flex 布局，确保正确扩展

## 主题定制

Input组件基于UnoCSS动态样式系统，支持通过以下方式进行主题定制：

### 1. CSS变量定制

```css
:root {
  --primary: #2563eb;
  --primary-focus: #1d4ed8;
  --secondary: #374151;
  --secondary-focus: #1f2937;
  --success: #059669;
  --success-focus: #047857;
  --warning: #f97316;
  --warning-focus: #ea580c;
  --error: #dc2626;
  --error-focus: #b91c1c;
  --base-150: #ffffff;
  --base-250: #f3f4f6;
  --base-250: #e5e7eb;
  --base-content: #111827;
  --rounded-btn: 0.5rem;
}
```

### 2. UnoCSS配置定制

```ts
// uno.config.ts
export default defineConfig({
  theme: {
    colors: {
      primary: {
        DEFAULT: '#2563eb',
        focus: '#1d4ed8'
      },
      secondary: {
        DEFAULT: '#374151',
        focus: '#1f2937'
      }
    }
  }
})
```

### 3. 动态样式类

Input组件使用UnoCSS类名，支持所有UnoCSS功能：
- 颜色变体：`bg-primary`, `border-primary`, `text-primary`
- 尺寸控制：`h-10`, `px-4`, `text-sm`
- 状态效果：`focus:outline-2`, `focus:outline-primary`
- 响应式：`sm:h-8`, `md:h-10`, `lg:h-12`

## 动画效果

Input组件基于UnoCSS实现以下动画效果：

- **聚焦动画**: 输入框获得焦点时的缩放动画（`input-focus`）
- **状态过渡**: 颜色和样式的平滑过渡（`transition-all duration-200`）
- **悬停效果**: 鼠标悬停时的视觉反馈

## 技术特性

### UnoCSS动态样式系统

- **动态类生成**: 所有样式通过computed属性动态生成
- **按需加载**: 只生成使用的样式类
- **类型安全**: 完整的TypeScript类型支持
- **性能优化**: 避免静态CSS文件，减少包体积

### 样式架构

```ts
// 基础样式
baseClasses: 'w-full bg-base-100 transition-all duration-200...'

// 尺寸样式  
sizeClasses: 'h-10 px-4 text-sm' // 根据size prop动态生成

// 颜色变体样式
colorVariantClasses: 'border-primary focus:outline-primary...' // 根据color动态生成

// 状态样式
stateClasses: 'opacity-70' // 根据disabled/loading/error状态动态生成

// 响应式样式
responsiveClasses: 'sm:h-8 md:h-10 lg:h-12' // 根据响应式props动态生成
```

## 无障碍支持

- 支持键盘导航（Tab键切换）
- 支持Enter和Space键激活
- 自动添加适当的ARIA属性
- 支持屏幕阅读器
- 禁用状态时自动阻止交互
- 错误状态时提供清晰的错误信息

## 注意事项

1. **加载状态**: 当`loading`为true时，输入框会自动禁用
2. **禁用状态**: 禁用状态下输入框不会响应任何交互事件
3. **无边框设计**: 默认无边框，只有bordered为true时显示边框
4. **响应式**: 响应式属性只在对应断点及以上生效
5. **圆形输入框**: 圆形输入框建议只放置单个字符或图标
6. **UnoCSS依赖**: 确保项目中已正确配置UnoCSS
7. **表单验证**: 建议配合表单验证库使用
8. **性能**: 大量输入框时考虑使用虚拟滚动优化性能
9. **外部 class**: 通过 `class` 属性传入的样式类会合并到 input 元素，同时 flex 相关类也会应用到容器
10. **Flex 布局**: 当传入 `flex-1` 且没有 `label` 时，容器会自动应用 flex 布局以确保正确扩展

## 最佳实践

1. **语义化使用**: 根据内容选择合适的type和placeholder
2. **一致性**: 在同一个界面中保持输入框样式的一致性
3. **可访问性**: 确保输入框有足够的对比度和可读性
4. **响应式**: 在移动设备上适当调整输入框尺寸
5. **UnoCSS优化**: 利用UnoCSS的按需加载特性，避免未使用的样式
6. **性能考虑**: 大量输入框时考虑使用虚拟滚动或分页
7. **主题一致性**: 确保输入框颜色与整体设计系统保持一致
8. **状态反馈**: 合理使用loading、disabled和error状态提供用户反馈
9. **表单验证**: 提供清晰的错误信息和成功反馈
10. **键盘导航**: 确保表单可以通过键盘完整操作