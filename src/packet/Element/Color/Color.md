# 项目颜色体系

本项目采用基于 CSS 变量的主题颜色系统，支持多种主题切换和动态颜色管理。通过 UnoCSS 原子类实现高效的颜色应用和主题切换。

## 特性

- 🎨 **主题切换** - 支持多种预设主题（Blue、Teal、Rose、Violet、Orange）
- 🌙 **深色模式** - 内置深色模式支持
- 🔧 **CSS 变量** - 基于 CSS 变量的动态颜色系统
- ⚡ **UnoCSS 集成** - 原子类方式快速应用颜色
- 📱 **响应式** - 适配不同屏幕尺寸
- 🎯 **语义化** - 语义化的颜色命名系统

## 基本用法

<Palette/>

<div>
  <h2 class="font-semibold text-sm mt-10 mb-4">主题颜色展示</h2>
  <div class="box-component">
    <div class="flex flex-wrap gap-3">
      <div class="flex flex-col">
        <div class="h-12 w-32 bg-primary flex justify-center items-center rounded-t-lg">
          <div class="text-primary-content text-sm font-medium">primary</div>
        </div>
        <div class="h-12 w-32 bg-primary-focus flex justify-center items-center">
          <div class="text-primary-content text-sm font-medium">primary-focus</div>
        </div>
        <div class="h-12 w-32 bg-primary-focus flex justify-center items-center rounded-b-lg">
          <div class="text-primary-content text-sm font-medium">primary-content</div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="h-12 w-32 bg-secondary flex justify-center items-center rounded-t-lg">
          <div class="text-secondary-content text-sm font-medium">secondary</div>
        </div>
        <div class="h-12 w-32 bg-secondary-focus flex justify-center items-center">
          <div class="text-secondary-content text-sm font-medium">secondary-focus</div>
        </div>
        <div class="h-12 w-32 bg-secondary-focus flex justify-center items-center rounded-b-lg">
          <div class="text-secondary-content text-sm font-medium">secondary-content</div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="h-12 w-32 bg-success flex justify-center items-center rounded-t-lg">
          <div class="text-success-content text-sm font-medium">success</div>
        </div>
        <div class="h-12 w-32 bg-success-focus flex justify-center items-center">
          <div class="text-success-content text-sm font-medium">success-focus</div>
        </div>
        <div class="h-12 w-32 bg-success-focus flex justify-center items-center rounded-b-lg">
          <div class="text-success-content text-sm font-medium">success-content</div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="h-12 w-32 bg-error flex justify-center items-center rounded-t-lg">
          <div class="text-error-content text-sm font-medium">error</div>
        </div>
        <div class="h-12 w-32 bg-error-focus flex justify-center items-center">
          <div class="text-error-content text-sm font-medium">error-focus</div>
        </div>
        <div class="h-12 w-32 bg-error-focus flex justify-center items-center rounded-b-lg">
          <div class="text-error-content text-sm font-medium">error-content</div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="h-12 w-32 bg-warning flex justify-center items-center rounded-t-lg">
          <div class="text-warning-content text-sm font-medium">warning</div>
        </div>
        <div class="h-12 w-32 bg-warning-focus flex justify-center items-center">
          <div class="text-warning-content text-sm font-medium">warning-focus</div>
        </div>
        <div class="h-12 w-32 bg-warning-focus flex justify-center items-center rounded-b-lg">
          <div class="text-warning-content text-sm font-medium">warning-content</div>
        </div>
      </div>
      <div class="flex flex-col border-solid border-2 rounded-lg">
        <div class="h-12 w-32 bg-base-100 flex justify-center items-center rounded-t-lg border border-base-300">
          <div class="text-base-content text-sm font-medium">base-100</div>
        </div>
        <div class="h-12 w-32 bg-base-200 flex justify-center items-center border-x border-base-300">
          <div class="text-base-content text-sm font-medium">base-200</div>
        </div>
        <div class="h-12 w-32 bg-base-300 flex justify-center items-center rounded-b-lg border border-base-300">
          <div class="text-base-content text-sm font-medium">base-300</div>
        </div>
      </div>
    </div>
  </div>
</div>

## 颜色分类

### 1. 主题颜色 (Theme Colors)

#### 主要颜色
- **Primary** - 主题主色，用于主要操作和重要元素
- **Secondary** - 次要颜色，用于辅助元素

#### 状态颜色
- **Success** - 成功状态，表示操作成功、完成等
- **Warning** - 警告状态，表示需要注意的情况
- **Error** - 错误状态，表示错误、失败等

### 2. 基础颜色 (Base Colors)

#### 背景色
- **base-100** - 主要背景色（最浅）
- **base-200** - 次要背景色
- **base-300** - 边框和分割线颜色（最深）

#### 深色模式背景
- **dark-base-100** - 深色模式主要背景
- **dark-base-200** - 深色模式次要背景
- **dark-base-300** - 深色模式边框颜色

#### 文字颜色
- **base-content** - 主要文字颜色
- **dark-base-content** - 深色模式文字颜色

## 使用方法

### 1. UnoCSS 原子类

#### 背景色
```html
<!-- 主题颜色 -->
<div class="bg-primary">主要背景</div>
<div class="bg-secondary">次要背景</div>

<!-- 状态颜色 -->
<div class="bg-success">成功背景</div>
<div class="bg-warning">警告背景</div>
<div class="bg-error">错误背景</div>

<!-- 基础颜色 -->
<div class="bg-base-100">浅色背景</div>
<div class="bg-base-200">中等背景</div>
<div class="bg-base-300">深色背景</div>
```

#### 文字颜色
```html
<!-- 主题文字颜色 -->
<div class="text-primary">主要文字</div>
<div class="text-secondary">次要文字</div>

<!-- 状态文字颜色 -->
<div class="text-success">成功文字</div>
<div class="text-warning">警告文字</div>
<div class="text-error">错误文字</div>

<!-- 基础文字颜色 -->
<div class="text-base-content">主要文字</div>
```

#### 边框颜色
```html
<!-- 主题边框 -->
<div class="border border-primary">主要边框</div>
<div class="border border-secondary">次要边框</div>

<!-- 状态边框 -->
<div class="border border-success">成功边框</div>
<div class="border border-warning">警告边框</div>
<div class="border border-error">错误边框</div>
```

### 2. CSS 变量

#### 在 CSS 中使用
```css
.custom-element {
  background-color: var(--primary);
  color: var(--primary-content);
  border-color: var(--primary-focus);
}

.custom-success {
  background-color: var(--success);
  color: var(--success-content);
}
```

#### 在 JavaScript 中使用
```javascript
// 获取当前主题颜色
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary');

// 动态设置颜色
document.documentElement.style.setProperty('--primary', '#ff0000');
```

### 3. 透明度支持

```html
<!-- 透明度变体 -->
<div class="bg-primary/50">50% 透明度</div>
<div class="bg-primary/20">20% 透明度</div>
<div class="text-primary/80">80% 透明度文字</div>
```

### 4. 悬停状态

```html
<!-- 悬停效果 -->
<btn class="bg-primary hover:bg-primary-focus">
  悬停按钮
</btn>

<div class="text-primary hover:text-primary-focus">
  悬停文字
</div>
```

## 主题配置

### 预设主题

| 主题名称 | 主色调 | 特点 | 适用场景 |
|---------|--------|------|----------|
| **Blue** | 蓝色系 | 专业、稳重 | 企业应用、管理系统 |
| **Teal** | 青绿色 | 清新、现代 | 创意设计、年轻化产品 |
| **Rose** | 玫瑰色 | 温暖、优雅 | 女性产品、艺术类应用 |
| **Violet** | 紫色系 | 神秘、高端 | 科技产品、高端应用 |
| **Orange** | 橙色系 | 活力、热情 | 运动类、娱乐类应用 |

### 主题切换

```javascript
// 切换主题
setTheme('rose')  // 切换到玫瑰主题
setTheme('violet') // 切换到紫色主题

// 切换深色模式
toggleDarkMode()  // 切换深色/浅色模式
```

## 主题颜色对照表

| Name              | Blue               | Teal             | Rose             | Violet             | Orange             |
| ----------------- | ------------------ | ---------------- | ---------------- | ------------------ | ------------------ |
| primary           | #0284c7/sky-600    | #0d9488/teal-600 | #e11d48/rose-600 | #7c3aed/violet-600 | #ea580c/orange-600 |
| primary-focus     | #1e40af/sky-700    | #0f766e/teal-700 | #be123c/rose-700 | #6d28d9/violet-700 | #c2410c/orange-700 |
| primary-content   | #ffffff            | #ffffff          | #ffffff          | #ffffff            | #ffffff            |
| secondary         | #374151/gray-700   | #374151/gray-700 | #374151/gray-700 | #374151/gray-700   | #374151/gray-700   |
| secondary-focus   | #1f2937/gray-800   | #1f2937/gray-800 | #1f2937/gray-800 | #1f2937/gray-800   | #1f2937/gray-800   |
| secondary-content | #ffffff            | #ffffff          | #ffffff          | #ffffff            | #ffffff            |
| success           | #059669/green-600  | #059669          | #059669          | #059669            | #059669            |
| success-focus     | #047857/green-700  | #047857          | #047857          | #047857            | #047857            |
| success-content   | #ffffff            | #ffffff          | #ffffff          | #ffffff            | #ffffff            |
| warning           | #f97316/orange-500 | #f97316          | #f97316          | #f97316            | #f97316            |
| warning-focus     | #ea580c/orange-600 | #ea580c          | #ea580c          | #ea580c            | #ea580c            |
| warning-content   | #ffffff            | #ffffff          | #ffffff          | #ffffff            | #ffffff            |
| error             | #dc2626/red-600    | #dc2626          | #dc2626          | #dc2626            | #dc2626            |
| error-focus       | #b91c1c/red-700    | #b91c1c          | #b91c1c          | #b91c1c            | #b91c1c            |
| error-content     | #ffffff            | #ffffff          | #ffffff          | #ffffff            | #ffffff            |
| base-100          | #fcfcfc            | #fcfcfc          | #fcfcfc          | #fcfcfc            | #f8fafc            |
| base-200          | #f8f8f8            | #f8f8f8          | #f8f8f8          | #f8f8f8            | #f1f5f9            |
| base-300          | #e8e8e8            | #e8e8e8          | #e8e8e8          | #e8e8e8            | #e2e8f0            |
| base-content      | #1f2937            | #1f2937          | #1f2937          | #1f2937            | #1f2937            |
| dark-base-100     | #374151            | #374151          | #374151          | #374151            | #111827            |
| dark-base-200     | #1f2937            | #1f2937          | #1f2937          | #1f2937            | #0f172a            |
| dark-base-300     | #111827            | #111827          | #111827          | #111827            | #020617            |
| dark-base-content | #f9fafb            | #f9fafb          | #f9fafb          | #f9fafb            | #f3f4f6            |
| rounded-box       | 1rem               | 0rem             | 1rem             | 1rem              | 1rem              |
| rounded-btn       | 0.5rem             | 0.15rem          | 0.5rem           | 0.5rem            | 0.5rem            |
| rounded-badge     | 1.9rem             | 0rem             | 1.9rem           | 1.9rem            | 1.9rem            |

## 颜色系统参考

### Tailwind CSS 颜色对照

| CSS 变量 | Hex 值 | Tailwind 类名 | RAL 色号 | 中文名称 | 对应 Hex |
| --------- | ------- | ------- | ------ | ------- | ------- |
| slate-500 | #64748B | slate-500 | RAL5014 | 鸽蓝色 | #637D96 |
| slate-600 | #475569 | slate-600 | RAL7024 | 石墨灰 | #45494E |
| slate-700 | #334155 | slate-700 | RAL5008 | 灰蓝色 | #2B3A44 |
| slate-800 | #1E293B | slate-800 | RAL5011 | 钢蓝色 | #1A2B3C |
| gray-500  | #6B7280 | gray-500  | RAL7031 | 蓝灰色 | #5B686D |
| gray-600  | #4B5563 | gray-600  | RAL7015 | 板岩灰 | #4F5358 |
| gray-700  | #374151 | gray-700  | RAL5008 | 灰蓝色 | #2B3A44 |
| gray-800  | #1F2937 | gray-800  | RAL5003 | 宝石蓝 | #1F3855 |
| zinc-500  | #71717A | zinc-500  | -      | -       | -       |
| zinc-600  | #52525B | zinc-600  | -      | -       | -       |
| zinc-700  | #3F3F46 | zinc-700  | RAL7016 | 煤灰色 | #383E42 |
| zinc-800  | #27272A | zinc-800  | RAL9011 | 石墨黑 | #27292B |

## 最佳实践

### 1. 颜色选择原则

- **主色调**：选择与品牌形象一致的颜色
- **对比度**：确保文字与背景有足够的对比度（WCAG 2.1 AA 标准）
- **语义化**：使用语义化的颜色名称，如 success、error、warning
- **一致性**：在整个应用中保持颜色使用的一致性

### 2. 深色模式适配

```css
/* 深色模式样式 */
@media (prefers-color-scheme: dark) {
  .custom-element {
    background-color: var(--dark-base-100);
    color: var(--dark-base-content);
  }
}

/* 或者使用 .dark 类 */
.dark .custom-element {
  background-color: var(--dark-base-100);
  color: var(--dark-base-content);
}
```

### 3. 响应式颜色

```html
<!-- 不同屏幕尺寸使用不同颜色 -->
<div class="bg-primary sm:bg-secondary">
  响应式颜色
</div>
```

### 4. 无障碍设计

- 确保颜色不是传达信息的唯一方式
- 提供足够的颜色对比度
- 支持键盘导航和高对比度模式

## 技术实现

### CSS 变量定义

```css
:root {
  --primary: #2563eb;
  --primary-focus: #1d4ed8;
  --primary-content: #ffffff;
  /* ... 其他颜色变量 */
}

.dark {
  --dark-base-100: #374151;
  --dark-base-content: #f9fafb;
  /* ... 深色模式变量 */
}
```

### UnoCSS 规则

```javascript
// uno.config.ts
rules: [
  [/^bg-(primary|secondary|success|warning|error)$/, ([, color]) => {
    return { 'background-color': `var(--${color})` }
  }],
  [/^text-(primary|secondary|success|warning|error)-content$/, ([, color]) => {
    return { 'color': `var(--${color}-content)` }
  }]
]
```

## 注意事项

1. **主题依赖**：确保所有主题变量都已正确定义
2. **浏览器兼容**：CSS 变量需要现代浏览器支持
3. **性能考虑**：避免频繁的主题切换，可能影响性能
4. **测试覆盖**：在不同主题和深色模式下测试应用
5. **文档维护**：及时更新颜色文档，保持与实际实现同步

## 更新日志

### v1.0.0
- 初始颜色体系建立
- 支持 5 种预设主题
- 集成 UnoCSS 原子类
- 支持深色模式
- 完整的颜色文档