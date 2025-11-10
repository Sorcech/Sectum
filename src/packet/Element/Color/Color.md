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
        <div class="h-12 w-32 bg-base-100 flex justify-center items-center rounded-t-lg border border-base-250">
          <div class="text-base-content text-sm font-medium">base-100</div>
        </div>
        <div class="h-12 w-32 bg-base-200 flex justify-center items-center border-x border-base-250">
          <div class="text-base-content text-sm font-medium">base-200</div>
        </div>
        <div class="h-12 w-32 bg-base-300 flex justify-center items-center rounded-b-lg border border-base-250">
          <div class="text-base-content text-sm font-medium">base-300</div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="h-12 w-32 bg-accent flex justify-center items-center rounded-t-lg">
          <div class="text-accent-content text-sm font-medium">accent</div>
        </div>
        <div class="h-12 w-32 bg-accent-focus flex justify-center items-center">
          <div class="text-accent-content text-sm font-medium">accent-focus</div>
        </div>
        <div class="h-12 w-32 bg-accent-focus flex justify-center items-center rounded-b-lg">
          <div class="text-accent-content text-sm font-medium">accent-content</div>
        </div>
      </div>
    </div>
  </div>
</div>

## 颜色分类

### 1. 主题颜色 (Theme Colors)

#### 主要颜色
- **Primary** - 主题主色，用于主要操作和重要元素
- **Primary-focus** - 主色聚焦状态，用于悬停和聚焦效果
- **Primary-content** - 主色文字颜色，确保在主色背景上的可读性
- **Secondary** - 次要颜色，用于辅助元素
- **Secondary-focus** - 次要颜色聚焦状态
- **Secondary-content** - 次要颜色文字颜色
- **Accent** - 强调色，用于突出显示特殊元素
- **Accent-focus** - 强调色聚焦状态
- **Accent-content** - 强调色文字颜色

#### 状态颜色
- **Success** - 成功状态，表示操作成功、完成等
- **Success-focus** - 成功状态聚焦效果
- **Success-content** - 成功状态文字颜色
- **Warning** - 警告状态，表示需要注意的情况
- **Warning-focus** - 警告状态聚焦效果
- **Warning-content** - 警告状态文字颜色
- **Error** - 错误状态，表示错误、失败等
- **Error-focus** - 错误状态聚焦效果
- **Error-content** - 错误状态文字颜色

### 2. 基础颜色 (Base Colors)

#### 背景色
- **base-100** - 最浅背景色（对应各主题的 50 色阶）
- **base-150** - 浅色背景（对应各主题的 100 色阶）
- **base-200** - 中等浅色背景（对应各主题的 150 色阶）
- **base-250** - 中等背景（对应各主题的 200 色阶）
- **base-300** - 较深背景（对应各主题的 250 色阶）

#### 深色模式背景
- **dark-base-100** - 深色模式最浅背景（对应各主题的 700 色阶）
- **dark-base-150** - 深色模式浅色背景（对应各主题的 750 色阶）
- **dark-base-200** - 深色模式中等背景（对应各主题的 800 色阶）
- **dark-base-250** - 深色模式较深背景（对应各主题的 850 色阶）
- **dark-base-300** - 深色模式最深背景（对应各主题的 900 色阶）

#### 文字颜色
- **base-content** - 主要文字颜色（浅色模式下使用）
- **dark-base-content** - 深色模式文字颜色（深色模式下使用）

## 使用方法

### 1. UnoCSS 原子类

#### 背景色
```vue
<!-- 主题颜色 -->
<div class="bg-primary">主要背景</div>
<div class="bg-secondary">次要背景</div>

<!-- 状态颜色 -->
<div class="bg-success">成功背景</div>
<div class="bg-warning">警告背景</div>
<div class="bg-error">错误背景</div>

<!-- 基础颜色 -->
<div class="bg-base-100">最浅背景</div>
<div class="bg-base-150">浅色背景</div>
<div class="bg-base-200">中等浅色背景</div>
<div class="bg-base-250">中等背景</div>
<div class="bg-base-300">较深背景</div>

<!-- 强调色 -->
<div class="bg-accent">强调背景</div>
<div class="bg-accent-focus">强调聚焦背景</div>
```

#### 文字颜色
```vue
<!-- 主题文字颜色 -->
<div class="text-primary">主要文字</div>
<div class="text-primary-content">主色内容文字</div>
<div class="text-secondary">次要文字</div>
<div class="text-secondary-content">次要内容文字</div>
<div class="text-accent">强调文字</div>
<div class="text-accent-content">强调内容文字</div>

<!-- 状态文字颜色 -->
<div class="text-success">成功文字</div>
<div class="text-success-content">成功内容文字</div>
<div class="text-warning">警告文字</div>
<div class="text-warning-content">警告内容文字</div>
<div class="text-error">错误文字</div>
<div class="text-error-content">错误内容文字</div>

<!-- 基础文字颜色 -->
<div class="text-base-content">主要文字（浅色模式）</div>
<div class="dark:text-base-content">主要文字（深色模式）</div>
```

#### 边框颜色
```vue
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

```vue
<!-- 透明度变体 -->
<div class="bg-primary/50">50% 透明度</div>
<div class="bg-primary/20">20% 透明度</div>
<div class="text-primary/80">80% 透明度文字</div>
```

### 4. 悬停状态

```vue
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

### 主题颜色

| Name              | Blue               | Teal             | Rose             | Violet             | Orange             |
| ----------------- | ------------------ | ---------------- | ---------------- | ------------------ | ------------------ |
| primary           | #2563eb/blue-600   | #0d9488/teal-600 | #e11d48/rose-600 | #7c3aed/violet-600 | #ea580c/orange-600 |
| primary-focus     | #1d4ed8/blue-700   | #0f766e/teal-700 | -                | #6d28d9/violet-700 | #c2410c/orange-700 |
| primary-content   | #ffffff            | #ffffff          | #ffffff          | #ffffff            | #ffffff            |
| secondary         | #374151/gray-700   | #374151/gray-700 | #374151/gray-700 | #374151/gray-700   | #374151/gray-700   |
| secondary-focus   | #1f2937/gray-800   | #1f2937/gray-800 | -                | #1f2937/gray-800   | #1f2937/gray-800   |
| secondary-content | #ffffff            | #ffffff          | #ffffff          | #ffffff            | #ffffff            |
| accent            | #fef3c7/yellow-100 | #fef3c7/yellow-100 | #ffe999 | #ffe999 | #ffe999 |
| accent-focus      | #fde68e/yellow-200 | #fde68e/yellow-200 | - | #fde68e/yellow-200 | #fde68e/yellow-200 |
| accent-content    | #ffffff            | #ffffff          | #ffffff          | #ffffff            | #ffffff            |
| success           | #059669/green-600  | #059669/green-600 | #15803d/green-700 | #15803d/green-700 | #15803d/green-700 |
| success-focus     | #047857/green-700  | #047857/green-700 | - | #166534/green-800 | #166534/green-800 |
| success-content   | #ffffff            | #ffffff          | #ffffff          | #ffffff            | #ffffff            |
| warning           | #f97316/orange-500 | #f97316/orange-500 | #a16207 | #a16207 | #a16207 |
| warning-focus     | #ea580c/orange-600 | #ea580c/orange-600 | - | #ca8a04 | #ca8a04 |
| warning-content   | #ffffff            | #ffffff          | #ffffff          | #ffffff            | #ffffff            |
| error             | #dc2626/red-600    | #dc2626/red-600  | #b91c1c/red-700  | #b91c1c/red-700    | #b91c1c/red-700    |
| error-focus       | #b91c1c/red-700    | #b91c1c/red-700  | - | #991b1b/red-800    | #991b1b/red-800    |
| error-content     | #ffffff            | #ffffff          | #ffffff          | #ffffff            | #ffffff            |

### 基础颜色

| Name              | Blue               | Teal             | Rose             | Violet             | Orange             |
| ----------------- | ------------------ | ---------------- | ---------------- | ------------------ | ------------------ |
| base-100          | #f8fafc/slate-50   | #f9fafb/gray-50  | #fafaf9/stone-50 | #fafafa/neutral-50 | #fafafa/zinc-50    |
| base-150          | #f1f5f9/slate-100  | #f3f4f6/gray-100 | #f5f5f4/stone-100 | #f5f5f5/neutral-100 | #f4f4f5/zinc-100   |
| base-200          | #eaeff5/slate-150  | #e2e4e9/gray-150 | #eeedec/stone-150 | #ededed/neutral-150 | #ececee/zinc-150  |
| base-250          | #e2e8f0/slate-200 | #d1d5db/gray-200 | #e7e5e4/stone-200 | #e5e5e5/neutral-200 | #e4e4e7/zinc-200   |
| base-300          | #d7dfe9/slate-250  | #c4c8d0/gray-250 | #dfdcdb/stone-250 | #dcdcdc/neutral-250 | #dcdce0/zinc-250   |
| base-content      | #1e293b/slate-800  | #1f2937/gray-800 | #292524/stone-800 | #262626/neutral-800 | #27272a/zinc-800   |
| dark-base-100     | #334155/slate-700  | #374151/gray-700 | #44403c/stone-700 | #404040/neutral-700 | #3f3f46/zinc-700   |
| dark-base-150     | #293548/slate-750  | #2b3544/gray-750 | #373330/stone-750 | #333333/neutral-750 | #333338/zinc-750   |
| dark-base-200     | #1e293b/slate-800  | #1f2937/gray-800 | #292524/stone-800 | #262626/neutral-800 | #27272a/zinc-800   |
| dark-base-250     | #172033/slate-850  | #18212f/gray-850 | #231f1e/stone-850 | #1d1d1d/neutral-850 | #202023/zinc-850   |
| dark-base-300     | #0f172a/slate-900  | #111827/gray-900 | #1c1917/stone-900 | #171717/neutral-900 | #18181b/zinc-900   |
| dark-base-content | #f8fafc/slate-50   | #f9fafb/gray-50  | #fafaf9/stone-50 | #fafafa/neutral-50 | #fafafa/zinc-50    |
| rounded-box       | 0.5rem             | 0rem             | 1.0rem           | 0.5rem             | 1.0rem             |
| rounded-btn       | 0.5rem             | 0rem             | 0.5rem            | 0.5rem             | 0.5rem             |
| rounded-badge     | 2.0rem             | 1rem             | 1.9rem            | 1.9rem             | 1.9rem             |

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
    background-color: var(--base-100); /* 在深色模式下自动切换为 dark-base-100 */
    color: var(--base-content); /* 在深色模式下自动切换为 dark-base-content */
  }
}

/* 或者使用 .dark 类 */
.dark .custom-element {
  background-color: var(--base-100); /* 系统会自动使用 dark-base-100 */
  color: var(--base-content); /* 系统会自动使用 dark-base-content */
}

/* 如果需要明确指定深色模式颜色 */
.dark .custom-element {
  background-color: var(--dark-base-100);
  color: var(--dark-base-content);
}
```

### 3. 响应式颜色

```vue
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
  --base-100: #f8fafc;
  --base-150: #f1f5f9;
  --base-200: #eaeff5;
  --base-250: #e2e8f0;
  --base-300: #d7dfe9;
  --base-content: #1e293b;
  /* ... 其他颜色变量 */
}

.dark {
  --base-100: #334155; /* 自动切换为 dark-base-100 */
  --base-150: #293548; /* 自动切换为 dark-base-150 */
  --base-200: #1e293b; /* 自动切换为 dark-base-200 */
  --base-250: #172033; /* 自动切换为 dark-base-250 */
  --base-300: #0f172a; /* 自动切换为 dark-base-300 */
  --base-content: #f8fafc; /* 自动切换为 dark-base-content */
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