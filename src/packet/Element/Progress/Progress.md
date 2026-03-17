# Progress 进度条组件

参考 Ant Design Progress 组件设计，从零实现的进度条组件，支持多种类型和自定义样式。

## 基本用法

<div class="flex flex-col gap-4">
  <prog :percent="50" />
  <prog :percent="75" />
  <prog :percent="100" />
</div>

```vue
<template>
  <prog :percent="50" />
  <prog :percent="75" />
  <prog :percent="100" />
</template>
```

## 不同状态

<div class="flex flex-col gap-4">
  <prog :percent="100" status="success" />
  <prog :percent="50" status="exception" />
  <prog :percent="50" status="active" />
  <prog :percent="50" status="normal" />
</div>

```vue
<template>
  <!-- 成功状态 -->
  <prog :percent="100" status="success" />
  
  <!-- 异常状态 -->
  <prog :percent="50" status="exception" />
  
  <!-- 进行中状态 -->
  <prog :percent="50" status="active" />
  
  <!-- 正常状态 -->
  <prog :percent="50" status="normal" />
</template>
```

## 不同类型

### Line 类型（默认）

<div class="flex flex-col gap-4">
  <prog :percent="30" type="line" />
  <prog :percent="60" type="line" />
  <prog :percent="90" type="line" />
</div>

```vue
<template>
  <prog :percent="30" type="line" />
  <prog :percent="60" type="line" />
  <prog :percent="90" type="line" />
</template>
```

### Circle 类型

<div class="flex flex-wrap items-center gap-6">
  <prog :percent="30" type="circle" />
  <prog :percent="60" type="circle" />
  <prog :percent="90" type="circle" />
  <prog :percent="100" type="circle" status="success" />
</div>

```vue
<template>
  <prog :percent="30" type="circle" />
  <prog :percent="60" type="circle" />
  <prog :percent="90" type="circle" />
  <prog :percent="100" type="circle" status="success" />
</template>
```

### Dashboard 类型

<div class="flex flex-wrap items-center gap-6">
  <prog :percent="30" type="dashboard" />
  <prog :percent="60" type="dashboard" />
  <prog :percent="90" type="dashboard" />
  <prog :percent="100" type="dashboard" status="success" />
</div>

```vue
<template>
  <prog :percent="30" type="dashboard" />
  <prog :percent="60" type="dashboard" />
  <prog :percent="90" type="dashboard" />
  <prog :percent="100" type="dashboard" status="success" />
</template>
```

## 自定义颜色

<div class="flex flex-col gap-4">
  <prog :percent="50" stroke-color="#52c41a" />
  <prog :percent="70" stroke-color="#ff4d4f" />
  <prog :percent="80" stroke-color="#1890ff" />
</div>

```vue
<template>
  <!-- 单色 -->
  <prog :percent="50" stroke-color="#52c41a" />
  <prog :percent="70" stroke-color="#ff4d4f" />
  <prog :percent="80" stroke-color="#1890ff" />
</template>
```

### 渐变色

<div class="flex flex-col gap-4">
  <prog :percent="60" :stroke-color="{ '0%': '#108ee9', '100%': '#87d068' }" />
  <prog :percent="80" :stroke-color="{ '0%': '#ff4d4f', '50%': '#ff7a45', '100%': '#ffa940' }" />
</div>

```vue
<template>
  <!-- 渐变色 -->
  <prog 
    :percent="60" 
    :stroke-color="{ '0%': '#108ee9', '100%': '#87d068' }" 
  />
  <prog 
    :percent="80" 
    :stroke-color="{ '0%': '#ff4d4f', '50%': '#ff7a45', '100%': '#ffa940' }" 
  />
</template>
```

## 不同尺寸

### Line 类型尺寸

<div class="flex flex-col gap-4">
  <prog :percent="50" size="small" />
  <prog :percent="50" size="default" />
  <prog :percent="50" :size="12" />
</div>

```vue
<template>
  <prog :percent="50" size="small" />
  <prog :percent="50" size="default" />
  <prog :percent="50" :size="12" />
</template>
```

### Circle/Dashboard 类型尺寸

<div class="flex flex-wrap items-center gap-6">
  <prog :percent="60" type="circle" size="small" />
  <prog :percent="60" type="circle" size="default" />
  <prog :percent="60" type="circle" :size="150" />
</div>

```vue
<template>
  <prog :percent="60" type="circle" size="small" />
  <prog :percent="60" type="circle" size="default" />
  <prog :percent="60" type="circle" :size="150" />
</template>
```

## 隐藏百分比信息

<div class="flex flex-col gap-4">
  <prog :percent="50" :show-info="false" />
  <prog :percent="75" :show-info="false" status="active" />
</div>

```vue
<template>
  <prog :percent="50" :show-info="false" />
  <prog :percent="75" :show-info="false" status="active" />
</template>
```

## 自定义格式化

<div class="flex flex-col gap-4">
  <prog :percent="50" :format="(p) => `${p}/100`" />
  <prog :percent="75" :format="(p) => `已完成 ${p}%`" />
</div>

```vue
<template>
  <prog :percent="50" :format="(p) => `${p}/100`" />
  <prog :percent="75" :format="(p) => `已完成 ${p}%`" />
</template>
```

## 嵌入 Header 下方

<div class="border border-base-300 rounded-lg p-4">
  <div class="mb-2 text-sm text-base-content/70">固定在 Header 下方的进度条示例：</div>
  <prog :percent="65" :fixed="true" position="bottom" />
</div>

```vue
<template>
  <div>
    <ConsoleHeader>
      <!-- Header 内容 -->
    </ConsoleHeader>
    
    <!-- 固定在 Header 下方的进度条 -->
    <prog 
      :percent="loadingProgress" 
      :fixed="true"
      position="bottom"
      stroke-color="#1890ff"
    />
    
    <!-- 其他内容 -->
  </div>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| percent | 百分比 (0-100) | number | 0 |
| status | 状态 | 'success' \| 'exception' \| 'active' \| 'normal' | 'normal' |
| strokeColor | 自定义颜色 | string \| Record<string, string> | - |
| showInfo | 是否显示百分比信息 | boolean | true |
| size | 大小 | number \| 'small' \| 'default' | 'default' |
| type | 类型 | 'line' \| 'circle' \| 'dashboard' | 'line' |
| format | 自定义格式化函数 | (percent?: number) => string | - |
| strokeWidth | 进度条线宽 | number | - |
| class | 自定义类名 | string | '' |
| fixed | 是否固定在 Header 下方 | boolean | false |
| position | 固定位置 | 'top' \| 'bottom' | 'bottom' |

### 事件

无

### 插槽

无
