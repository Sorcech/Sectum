# 主题系统

本项目采用基于 CSS 变量的动态主题系统，支持多种预设主题和深色模式切换。通过 UnoCSS 集成实现高效的主题管理和运行时切换。

## 主题切换控制

<div class="flex flex-col gap-19 mb-8 p-6 bg-base-100 rounded-lg border border-base-300">
  <!-- 主题模式切换 -->
  <div class="flex items-center gap-4">
    <span class="text-sm font-medium min-w-20">主题模式：</span>
    <div class="flex gap-2">
      <btn  @click="setThemeMode('light')" >
        <icn name="sun-bright" light lg></icn>
        Light
      </btn>
      <btn @click="setThemeMode('dark')" >
        <icn name="moon-stars" light lg></icn>
        Dark
      </btn>
    </div>
  </div>

  <!-- 主题颜色切换 -->
  <div class="flex items-center gap-4">
    <span class="text-sm font-medium min-w-20">主题颜色：</span>
    <div class="flex gap-2 flex-wrap">
      <btn 
        v-for="theme in themeColors" 
        :key="theme.name"
        @click="setThemeColor(theme.name)" 
          >
        <div 
          class="w-3 h-3 rounded-full border border-white/20" 
          :style="{ backgroundColor: theme.color }"
        ></div>
        {{ theme.label }}
      </btn>
    </div>
  </div>

  <!-- 当前主题信息 -->
  <div class="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
    <span class="text-sm font-medium">当前主题：</span>
    <div class="flex items-center gap-2">
      <div 
        class="w-4 h-4 rounded-full border border-white/20" 
        :style="{ backgroundColor: currentThemeInfo.color }"
      ></div>
      <span class="text-sm">{{ currentThemeInfo.label }} - {{ currentThemeMode === 'dark' ? '深色模式' : '浅色模式' }}</span>
    </div>
  </div>
</div>

## 特性

- 🎨 **多主题支持** - 5 种预设主题（Blue、Teal、Rose、Violet、Orange）
- 🌙 **深色模式** - 完整的深色模式支持
- ⚡ **运行时切换** - 无需重新编译，动态切换主题
- 🔧 **CSS 变量驱动** - 基于 CSS 变量的主题系统
- 📱 **响应式设计** - 适配不同屏幕尺寸
- 🎯 **语义化命名** - 直观的颜色命名系统
- 💾 **本地存储** - 自动保存用户主题偏好

## 预设主题

### 1. Blue（默认主题）
- **主色调**: 蓝色系 (#2563eb)
- **特点**: 专业、稳重、商务风格
- **适用场景**: 企业应用、管理系统、专业工具

### 2. Teal（青绿主题）
- **主色调**: 青绿色系 (#0d9488)
- **特点**: 清新、现代、科技感
- **适用场景**: 创意设计、年轻化产品、科技应用

### 3. Rose（玫瑰主题）
- **主色调**: 玫瑰色系 (#e11d48)
- **特点**: 温暖、优雅、女性化
- **适用场景**: 女性产品、艺术类应用、时尚品牌

### 4. Violet（紫色主题）
- **主色调**: 紫色系 (#7c3aed)
- **特点**: 神秘、高端、创意
- **适用场景**: 科技产品、高端应用、创意平台

### 5. Orange（橙色主题）
- **主色调**: 橙色系 (#ea580c)
- **特点**: 活力、热情、积极
- **适用场景**: 运动类、娱乐类、活力品牌

## 主题切换

### 1. 组件方式切换

项目提供了主题切换组件，可以在界面中直接使用：

```vue
<template>
  <!-- 主题选择器 -->
  <ThemeSelect />
  
  <!-- 深色模式切换器 -->
  <DarkChange />
</template>
```

### 2. 编程方式切换

#### 切换主题
```javascript
// 切换主题
function changeTheme(themeName) {
  document.documentElement.classList.remove('theme-blue', 'theme-teal', 'theme-rose', 'theme-violet', 'theme-orange');
  document.documentElement.classList.add(`theme-${themeName}`);
  
  // 保存到本地存储
  localStorage.setItem('theme', `theme-${themeName}`);
}

// 使用示例
changeTheme('rose');  // 切换到玫瑰主题
changeTheme('violet'); // 切换到紫色主题
```

#### 切换深色模式
```javascript
// 切换深色模式
function toggleDarkMode() {
  const isDark = document.documentElement.classList.contains('dark');
  
  if (isDark) {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  }
  
  // 保存到本地存储
  localStorage.setItem('dark', isDark ? 'light' : 'dark');
}
```

### 3. 初始化主题

```javascript
// 页面加载时初始化主题
function initTheme() {
  // 获取保存的主题
  const savedTheme = localStorage.getItem('theme') || 'theme-blue';
  const savedDark = localStorage.getItem('dark') || 'light';
  
  // 应用主题
  document.documentElement.classList.add(savedTheme);
  document.documentElement.classList.add(savedDark);
}

// 页面加载时调用
initTheme();
```

## 主题配置

### 1. 主题文件结构

```
src/plugin/theme/
├── theme.ts          # 主题颜色定义
├── generateTheme.ts  # 主题生成逻辑
├── functions.ts      # 颜色处理函数
└── getconfig.ts      # 配置获取
```

### 2. 主题颜色定义

```typescript
// src/plugin/theme/theme.ts
const themes = {
  blue: {
    'primary': '#2563eb',
    'primary-focus': '#1d4ed8',
    'primary-content': '#ffffff',
    'secondary': '#374151',
    'secondary-focus': '#1f2937',
    'secondary-content': '#ffffff',
    'success': '#059669',
    'success-focus': '#047857',
    'success-content': '#ffffff',
    'warning': '#f97316',
    'warning-focus': '#ea580c',
    'warning-content': '#ffffff',
    'error': '#dc2626',
    'error-focus': '#b91c1c',
    'error-content': '#ffffff',
    'base-100': '#fcfcfc',
    'base-200': '#f8f8f8',
    'base-300': '#e8e8e8',
    'base-content': '#1f2937',
    'dark-base-100': '#374151',
    'dark-base-200': '#1f2937',
    'dark-base-300': '#111827',
    'dark-base-content': '#f9fafb',
    'rounded-box': '0.5rem',
    'rounded-btn': '0.5rem',
    'rounded-badge': '2.0rem',
  },
  // ... 其他主题
}
```

### 3. UnoCSS 集成

```typescript
// uno.config.ts
import { defineConfig, presetUno } from 'unocss'
import { getTheme } from './src/plugin/theme/generateTheme'

export default defineConfig({
  presets: [presetUno()],
  preflights: [
    {
      getCSS: () => {
        const theme = getTheme()
        let css = ''
        
        for (const [selector, variables] of Object.entries(theme)) {
          css += `${selector} {\n`
          for (const [property, value] of Object.entries(variables)) {
            css += `  ${property}: ${value};\n`
          }
          css += `}\n`
        }
        return css
      }
    }
  ],
  rules: [
    // 自定义颜色规则
    [/^bg-(primary|secondary|success|warning|error)$/, ([, color]) => {
      return { 'background-color': `var(--${color})` }
    }],
    [/^text-(primary|secondary|success|warning|error)-content$/, ([, color]) => {
      return { 'color': `var(--${color}-content)` }
    }],
    // ... 更多规则
  ]
})
```

## 使用方法

### 1. 在组件中使用主题

```vue
<template>
  <div class="bg-primary text-primary-content">
    <h1>主题化标题</h1>
    <p class="text-secondary">次要文字</p>
    <btn class="bg-success hover:bg-success-focus">
      成功按钮
    </btn>
  </div>
</template>
```

### 2. 响应式主题

```vue
<template>
  <div class="bg-base-100 dark:bg-dark-base-100">
    <p class="text-base-content dark:text-dark-base-content">
      自适应主题文字
    </p>
  </div>
</template>
```

### 3. 自定义主题样式

```css
/* 自定义组件样式 */
.custom-component {
  background-color: var(--primary);
  color: var(--primary-content);
  border-radius: var(--rounded-btn);
}

/* 深色模式适配 */
.dark .custom-component {
  background-color: var(--dark-base-100);
  color: var(--dark-base-content);
}
```

### 4. JavaScript 中获取主题颜色

```javascript
// 获取当前主题颜色
function getThemeColor(colorName) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${colorName}`)
    .trim();
}

// 使用示例
const primaryColor = getThemeColor('primary');
const successColor = getThemeColor('success');
```

## 主题变量

### 1. 颜色变量

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `--primary` | 主题主色 | #2563eb |
| `--primary-focus` | 主题主色焦点状态 | #1d4ed8 |
| `--primary-content` | 主题主色文字色 | #ffffff |
| `--secondary` | 次要颜色 | #374151 |
| `--secondary-focus` | 次要颜色焦点状态 | #1f2937 |
| `--secondary-content` | 次要颜色文字色 | #ffffff |
| `--success` | 成功颜色 | #059669 |
| `--success-focus` | 成功颜色焦点状态 | #047857 |
| `--success-content` | 成功颜色文字色 | #ffffff |
| `--warning` | 警告颜色 | #f97316 |
| `--warning-focus` | 警告颜色焦点状态 | #ea580c |
| `--warning-content` | 警告颜色文字色 | #ffffff |
| `--error` | 错误颜色 | #dc2626 |
| `--error-focus` | 错误颜色焦点状态 | #b91c1c |
| `--error-content` | 错误颜色文字色 | #ffffff |

### 2. 基础颜色变量

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `--base-100` | 主要背景色 | #fcfcfc |
| `--base-200` | 次要背景色 | #f8f8f8 |
| `--base-300` | 边框和分割线色 | #e8e8e8 |
| `--base-content` | 主要文字色 | #1f2937 |
| `--dark-base-100` | 深色模式主要背景 | #374151 |
| `--dark-base-200` | 深色模式次要背景 | #1f2937 |
| `--dark-base-300` | 深色模式边框色 | #111827 |
| `--dark-base-content` | 深色模式文字色 | #f9fafb |

### 3. 圆角变量

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `--rounded-box` | 容器圆角 | 0.5rem |
| `--rounded-btn` | 按钮圆角 | 0.5rem |
| `--rounded-badge` | 徽章圆角 | 2.0rem |

## 深色模式

### 1. 自动检测系统偏好

```javascript
// 检测系统深色模式偏好
function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (e.matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});
```

### 2. 手动切换深色模式

```javascript
// 切换深色模式
function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  
  if (isDark) {
    html.classList.remove('dark');
    html.classList.add('light');
  } else {
    html.classList.remove('light');
    html.classList.add('dark');
  }
  
  // 保存用户偏好
  localStorage.setItem('darkMode', !isDark);
}
```

### 3. 深色模式样式

```css
/* 浅色模式（默认） */
:root {
  --primary: #2563eb;
  --base-100: #fcfcfc;
  --base-content: #1f2937;
}

/* 深色模式 */
.dark {
  --primary: #3b82f6;
  --base-100: #374151;
  --base-content: #f9fafb;
}

/* 主题特定深色模式 */
.dark.theme-rose {
  --primary: #f43f5e;
  --base-100: #1f1f23;
}
```

## 自定义主题

### 1. 创建新主题

```typescript
// 在 theme.ts 中添加新主题
const themes = {
  // ... 现有主题
  custom: {
    'primary': '#your-color',
    'primary-focus': '#your-focus-color',
    'primary-content': '#ffffff',
    // ... 其他颜色定义
  }
}
```

### 2. 主题继承

```typescript
// 基于现有主题创建新主题
const themes = {
  // ... 现有主题
  'custom-blue': {
    ...themes.blue,  // 继承蓝色主题
    'primary': '#1e40af',  // 覆盖特定颜色
    'primary-focus': '#1e3a8a',
  }
}
```

### 3. 动态主题生成

```typescript
// 动态生成主题
function generateCustomTheme(baseColor: string) {
  return {
    'primary': baseColor,
    'primary-focus': brighten(baseColor, -10),
    'primary-content': mostReadable(baseColor),
    // ... 其他颜色
  }
}
```

## 最佳实践

### 1. 主题选择原则

- **品牌一致性**: 选择与品牌形象一致的主题
- **用户体验**: 考虑目标用户群体的偏好
- **可访问性**: 确保颜色对比度符合 WCAG 标准
- **功能适配**: 根据应用功能选择合适的主题

### 2. 性能优化

- **按需加载**: 只加载使用的主题
- **缓存策略**: 合理使用本地存储
- **CSS 变量**: 利用 CSS 变量的高效性
- **避免频繁切换**: 减少不必要的主题切换

### 3. 开发建议

- **语义化命名**: 使用有意义的颜色名称
- **文档维护**: 及时更新主题文档
- **测试覆盖**: 在所有主题下测试应用
- **向后兼容**: 保持主题 API 的稳定性

## 技术实现

### 1. CSS 变量系统

```css
/* 主题变量定义 */
:root {
  --primary: #2563eb;
  --primary-focus: #1d4ed8;
  --primary-content: #ffffff;
}

/* 主题特定变量 */
.theme-rose {
  --primary: #e11d48;
  --primary-focus: #be123c;
  --primary-content: #ffffff;
}

/* 深色模式变量 */
.dark {
  --base-100: #374151;
  --base-content: #f9fafb;
}
```

### 2. UnoCSS 规则

```typescript
// 颜色规则
rules: [
  [/^bg-(primary|secondary|success|warning|error)$/, ([, color]) => {
    return { 'background-color': `var(--${color})` }
  }],
  [/^text-(primary|secondary|success|warning|error)-content$/, ([, color]) => {
    return { 'color': `var(--${color}-content)` }
  }],
  [/^border-(primary|secondary|success|warning|error)$/, ([, color]) => {
    return { 'border-color': `var(--${color})` }
  }]
]
```

### 3. 主题生成逻辑

```typescript
// 主题生成函数
function generateTheme(themeConfig: Theme) {
  const lightTheme = {}
  const darkTheme = {}
  
  // 生成浅色主题变量
  for (const [key, value] of Object.entries(themeConfig)) {
    if (key.startsWith('dark-')) {
      darkTheme[key.replace('dark-', '')] = value
    } else {
      lightTheme[key] = value
    }
  }
  
  return {
    ':root': lightTheme,
    '.dark': darkTheme
  }
}
```

## 注意事项

1. **浏览器兼容性**: CSS 变量需要现代浏览器支持
2. **性能考虑**: 避免频繁的主题切换
3. **存储管理**: 合理使用本地存储空间
4. **测试覆盖**: 在所有主题下测试应用功能
5. **文档同步**: 保持主题文档与实际实现同步

## 更新日志

### v1.0.0
- 初始主题系统建立
- 支持 5 种预设主题
- 集成深色模式支持
- 完整的主题切换功能
- UnoCSS 集成和优化

---

<script setup>
import { ref, computed, onMounted } from 'vue'

// 主题状态
const currentThemeMode = ref('light')
const currentThemeColor = ref('blue')

// 主题颜色配置
const themeColors = ref([
  { name: 'blue', label: 'Blue', color: '#2563eb' },
  { name: 'teal', label: 'Teal', color: '#0d9488' },
  { name: 'rose', label: 'Rose', color: '#e11d48' },
  { name: 'violet', label: 'Violet', color: '#7c3aed' },
  { name: 'orange', label: 'Orange', color: '#ea580c' }
])

// 当前主题信息
const currentThemeInfo = computed(() => {
  return themeColors.value.find(theme => theme.name === currentThemeColor.value) || themeColors.value[0]
})

// 设置主题模式
const setThemeMode = (mode) => {
  currentThemeMode.value = mode
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(mode)
  localStorage.setItem('theme-mode', mode)
}

// 设置主题颜色
const setThemeColor = (color) => {
  currentThemeColor.value = color
  document.documentElement.classList.remove('theme-blue', 'theme-teal', 'theme-rose', 'theme-violet', 'theme-orange')
  document.documentElement.classList.add(`theme-${color}`)
  localStorage.setItem('theme-color', color)
}

// 初始化主题
onMounted(() => {
  const savedMode = localStorage.getItem('theme-mode') || 'light'
  const savedColor = localStorage.getItem('theme-color') || 'blue'
  
  setThemeMode(savedMode)
  setThemeColor(savedColor)
})
</script>
