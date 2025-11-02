# Icon 图标组件

Icon 组件基于 FontAwesome 图标库，提供了丰富的图标样式、尺寸、颜色和动画效果支持。

## 特性

- 🎨 **多种图标样式**：支持 Solid、Regular、Light、Thin、Duotone、Brand 等样式
- 📏 **灵活尺寸**：5 种预设尺寸，满足不同场景需求
- 🎨 **主题颜色**：支持主题系统中的所有颜色
- ✨ **动画效果**：8 种内置动画效果
- 🔧 **自定义颜色**：支持自定义颜色值和透明度
- ⚡ **按需加载**：FontAwesome 库动态加载，优化性能

## 基本用法

```vue
<template>
  <icn name="bell" />
</template>
```

## 图标样式类型

Icon 组件支持 FontAwesome 的多种图标样式，默认使用 Solid 样式。

<div class="flex flex-wrap items-center gap-5 my-5">
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xl></icn>
    <span class="text-sm">Solid</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" regular xl></icn>
    <span class="text-sm">Regular</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" light xl></icn>
    <span class="text-sm">Light</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" thin xl></icn>
    <span class="text-sm">Thin</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" duotone xl></icn>
    <span class="text-sm">Duotone</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="github" brand xl></icn>
    <span class="text-sm">Brand</span>
  </div>
</div>

```vue
<!-- Solid 样式（默认） -->
<icn name="bell" solid />

<!-- Regular 样式 -->
<icn name="bell" regular />

<!-- Light 样式 -->
<icn name="bell" light />

<!-- Thin 样式 -->
<icn name="bell" thin />

<!-- Duotone 样式 -->
<icn name="bell" duotone />

<!-- Brand 样式（品牌图标） -->
<icn name="github" brand />
```

### 样式属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `solid` | `Boolean` | `true` | Solid 实心样式（默认） |
| `regular` | `Boolean` | `false` | Regular 常规样式 |
| `light` | `Boolean` | `false` | Light 细线样式 |
| `thin` | `Boolean` | `false` | Thin 超细样式 |
| `duotone` | `Boolean` | `false` | Duotone 双色样式 |
| `brand` | `Boolean` | `false` | Brand 品牌图标样式 |

## 尺寸

Icon 组件支持 5 种预设尺寸，默认使用 `base`（基础尺寸）。

<div class="flex flex-wrap items-center gap-5 my-5">
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xs></icn>
    <span class="text-sm">xs</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid sm></icn>
    <span class="text-sm">sm</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid></icn>
    <span class="text-sm">base (默认)</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid lg></icn>
    <span class="text-sm">lg</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xl></icn>
    <span class="text-sm">xl</span>
  </div>
</div>

```vue
<icn name="bell" xs />    <!-- 超小 -->
<icn name="bell" sm />    <!-- 小 -->
<icn name="bell" />       <!-- 默认 -->
<icn name="bell" lg />    <!-- 大 -->
<icn name="bell" xl />    <!-- 超大 -->
```

### 尺寸对应关系

| 属性 | Tailwind CSS 类 | 字体大小 |
|------|----------------|----------|
| `xs` | `text-xs` | 0.75rem (12px) |
| `sm` | `text-sm` | 0.875rem (14px) |
| `base`（默认） | `text-base` | 1rem (16px) |
| `lg` | `text-lg` | 1.125rem (18px) |
| `xl` | `text-xl` | 1.25rem (20px) |

## 颜色

Icon 组件支持主题系统中的所有颜色，也支持自定义颜色。

### 主题颜色

<div class="flex flex-wrap items-center gap-5 my-5">
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xl color="primary"></icn>
    <span class="text-sm">primary</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xl color="secondary"></icn>
    <span class="text-sm">secondary</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xl color="success"></icn>
    <span class="text-sm">success</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xl color="warning"></icn>
    <span class="text-sm">warning</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xl color="error"></icn>
    <span class="text-sm">error</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xl color="base"></icn>
    <span class="text-sm">base</span>
  </div>
</div>

```vue
<icn name="bell" color="primary" />
<icn name="bell" color="secondary" />
<icn name="bell" color="success" />
<icn name="bell" color="warning" />
<icn name="bell" color="error" />
<icn name="bell" color="info" />
<icn name="bell" color="base" />
<icn name="bell" color="neutral" />
```

### 自定义颜色

使用 `customColor` 属性可以设置任意颜色值。

```vue
<!-- 使用十六进制颜色 -->
<icn name="bell" custom-color="#ff6b6b" />

<!-- 使用 RGB 颜色 -->
<icn name="bell" custom-color="rgb(255, 107, 107)" />

<!-- 使用 CSS 变量 -->
<icn name="bell" custom-color="var(--primary)" />
```

### 颜色属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `String` | `''` | 主题颜色：`primary`、`secondary`、`success`、`warning`、`error`、`info`、`base`、`neutral` |
| `customColor` | `String` | `''` | 自定义颜色值，可以是任何有效的 CSS 颜色值 |

## 动画效果

Icon 组件支持多种动画效果，可以增强用户体验。

<div class="flex flex-wrap items-center gap-5 my-5">
  <div class="flex flex-col items-center gap-2">
    <icn name="spinner" solid xl spin></icn>
    <span class="text-sm">spin</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="spinner" solid xl spinpulse></icn>
    <span class="text-sm">spinpulse</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" light xl beat></icn>
    <span class="text-sm">beat</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" thin xl flip></icn>
    <span class="text-sm">flip</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" duotone xl fade></icn>
    <span class="text-sm">fade</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xl shake></icn>
    <span class="text-sm">shake</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" duotone xl beatfade></icn>
    <span class="text-sm">beatfade</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" duotone xl bounce></icn>
    <span class="text-sm">bounce</span>
  </div>
</div>

```vue
<!-- 旋转动画 -->
<icn name="spinner" spin />

<!-- 旋转脉冲动画 -->
<icn name="spinner" spinpulse />

<!-- 跳动动画 -->
<icn name="bell" beat />

<!-- 翻转动画 -->
<icn name="bell" flip />

<!-- 淡入淡出动画 -->
<icn name="bell" fade />

<!-- 抖动动画 -->
<icn name="bell" shake />

<!-- 跳动淡入淡出动画 -->
<icn name="bell" beatfade />

<!-- 弹跳动画 -->
<icn name="bell" bounce />
```

### 动画属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `spin` | `Boolean` | `false` | 持续旋转动画 |
| `spinpulse` | `Boolean` | `false` | 旋转脉冲动画 |
| `beat` | `Boolean` | `false` | 跳动动画 |
| `flip` | `Boolean` | `false` | 翻转动画 |
| `fade` | `Boolean` | `false` | 淡入淡出动画 |
| `shake` | `Boolean` | `false` | 抖动动画 |
| `beatfade` | `Boolean` | `false` | 跳动淡入淡出动画 |
| `bounce` | `Boolean` | `false` | 弹跳动画 |

**注意**：多个动画属性同时设置时，只有一个会生效，优先级从高到低：`beat`/`bounce` > `fade` > `beatfade` > `flip` > `shake` > `spin` > `spinpulse`。

## 透明度

使用 `opacity` 属性可以设置图标的透明度，取值范围为 `0` 到 `1`。

<div class="flex flex-wrap items-center gap-5 my-5">
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xl :opacity="1"></icn>
    <span class="text-sm">opacity: 1</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xl :opacity="0.75"></icn>
    <span class="text-sm">opacity: 0.75</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xl :opacity="0.5"></icn>
    <span class="text-sm">opacity: 0.5</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <icn name="bell" solid xl :opacity="0.25"></icn>
    <span class="text-sm">opacity: 0.25</span>
  </div>
</div>

```vue
<icn name="bell" :opacity="1" />    <!-- 完全不透明 -->
<icn name="bell" :opacity="0.75" /> <!-- 75% 不透明 -->
<icn name="bell" :opacity="0.5" />  <!-- 50% 不透明 -->
<icn name="bell" :opacity="0.25" />  <!-- 25% 不透明 -->
<icn name="bell" :opacity="0" />    <!-- 完全透明 -->
```

## 组合使用

可以将多个属性组合使用，创建更丰富的效果。

```vue
<!-- 大尺寸的淡入淡出警告图标 -->
<icn name="exclamation-triangle" light xl color="warning" fade />

<!-- 旋转加载图标 -->
<icn name="spinner" solid xl color="primary" spin />

<!-- 带颜色的翻转图标 -->
<icn name="sync" duotone lg color="success" flip />
```

## 实际应用示例

### 加载状态

```vue
<template>
  <div v-if="loading">
    <icn name="spinner" solid xl spin color="primary" />
    <span>加载中...</span>
  </div>
</template>
```

### 通知图标

```vue
<template>
  <div class="notification">
    <icn name="bell" light xl color="primary" :class="{ 'animate-pulse': hasNotification }" />
    <span v-if="hasNotification" class="badge">3</span>
  </div>
</template>
```

### 按钮图标

```vue
<template>
  <btn>
    <icn name="plus" light lg />
    添加
  </btn>
  
  <btn variant="outline">
    <icn name="edit" regular lg />
    编辑
  </btn>
  
  <btn variant="transparent" color="error">
    <icn name="trash-can" light lg />
    删除
  </btn>
</template>
```

### 菜单图标

```vue
<template>
  <menu>
    <menuitem>
      <icn name="user" light lg />
      <span>个人资料</span>
    </menuitem>
    <menuitem>
      <icn name="settings" light lg />
      <span>设置</span>
    </menuitem>
    <menuitem>
      <icn name="sign-out" light lg color="error" />
      <span>退出登录</span>
    </menuitem>
  </menu>
</template>
```

## API 参考

### Props

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| `name` | `String` | `''` | ✅ | 图标名称（FontAwesome 图标名称，如 `bell`、`user` 等） |
| `solid` | `Boolean` | `false` | ❌ | Solid 实心样式 |
| `regular` | `Boolean` | `false` | ❌ | Regular 常规样式 |
| `light` | `Boolean` | `false` | ❌ | Light 细线样式 |
| `thin` | `Boolean` | `false` | ❌ | Thin 超细样式 |
| `duotone` | `Boolean` | `false` | ❌ | Duotone 双色样式 |
| `brand` | `Boolean` | `false` | ❌ | Brand 品牌图标样式 |
| `xs` | `Boolean` | `false` | ❌ | 超小尺寸 |
| `sm` | `Boolean` | `false` | ❌ | 小尺寸 |
| `lg` | `Boolean` | `false` | ❌ | 大尺寸 |
| `xl` | `Boolean` | `false` | ❌ | 超大尺寸 |
| `color` | `String` | `''` | ❌ | 主题颜色：`primary`、`secondary`、`success`、`warning`、`error`、`info`、`base`、`neutral` |
| `customColor` | `String` | `''` | ❌ | 自定义颜色值 |
| `opacity` | `Number` | `1` | ❌ | 透明度（0-1） |
| `spin` | `Boolean` | `false` | ❌ | 旋转动画 |
| `spinpulse` | `Boolean` | `false` | ❌ | 旋转脉冲动画 |
| `beat` | `Boolean` | `false` | ❌ | 跳动动画 |
| `flip` | `Boolean` | `false` | ❌ | 翻转动画 |
| `fade` | `Boolean` | `false` | ❌ | 淡入淡出动画 |
| `shake` | `Boolean` | `false` | ❌ | 抖动动画 |
| `beatfade` | `Boolean` | `false` | ❌ | 跳动淡入淡出动画 |
| `bounce` | `Boolean` | `false` | ❌ | 弹跳动画 |

### 默认行为

- 如果未指定样式属性（`solid`、`regular`、`light` 等），默认使用 `solid` 样式
- 如果未指定尺寸属性（`xs`、`sm`、`lg`、`xl`），默认使用 `base` 尺寸
- 如果未指定颜色，图标颜色继承父元素的文字颜色

## 图标名称查找

Icon 组件使用 FontAwesome 图标库，你可以访问以下资源查找可用的图标名称：

- [FontAwesome 图标库](https://fontawesome.com/icons)
- [FontAwesome 图标搜索](https://fontawesome.com/search)

常用的图标名称示例：

- 用户相关：`user`、`user-circle`、`user-group`
- 操作相关：`plus`、`minus`、`edit`、`trash-can`、`copy`、`save`
- 导航相关：`home`、`arrow-left`、`arrow-right`、`angle-up`、`angle-down`
- 状态相关：`check`、`xmark`、`exclamation-triangle`、`info`
- 媒体相关：`play`、`pause`、`stop`、`volume-high`、`image`
- 系统相关：`settings`、`cog`、`bell`、`search`、`filter`

## 注意事项

1. **FontAwesome 加载**：组件会自动加载 FontAwesome 库（`/icon.js`）
   
   **推荐方式（自动加载）**：使用 `sectumIconLoader` Vite 插件，无需手动配置：
   
   ```typescript
   // vite.config.ts
   import { sectumIconLoader } from 'sectum'
   
   export default defineConfig({
     plugins: [
       // ... 其他插件
       sectumIconLoader()  // 自动将 /icon.js 映射到 node_modules/sectum/lib/icon.js
     ]
   })
   ```
   
   **备选方式（手动配置）**：将 `node_modules/sectum/lib/icon.js` 复制到项目的 `public` 目录。

2. **图标名称**：使用 FontAwesome 的原生图标名称，不需要 `fa-` 前缀（组件会自动添加）
3. **动画性能**：过多动画可能影响性能，建议谨慎使用
4. **样式优先级**：多个样式属性同时设置时，优先级从高到低：`brand` > `duotone` > `thin` > `light` > `regular` > `solid`（默认）
5. **颜色继承**：如果未设置 `color` 或 `customColor`，图标颜色会继承父元素的文字颜色

## 最佳实践

1. **选择合适的样式**：根据设计需求选择合适的图标样式，Light 和 Thin 适合轻量级界面
2. **尺寸一致性**：在同一界面中保持图标尺寸的一致性
3. **颜色语义化**：使用主题颜色时，遵循颜色语义（如成功用 `success`，警告用 `warning`）
4. **动画适度**：只在必要时使用动画，避免过度动画影响用户体验
5. **加载状态**：使用 `spin` 动画表示加载状态，使用 `beat` 或 `fade` 表示需要关注的状态
