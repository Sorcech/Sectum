# ThemeSelect 主题选择组件

主题选择组件提供多主题色彩切换功能，支持下拉菜单选择界面主题，自动保存用户偏好设置。

## 基本用法

### 导入组件

```typescript
import ThemeSelect from '~/packet/Pattern/Theme/ThemeSelect.vue'
```

### 基础示例

```vue
<template>
  <div class="flex items-center gap-4">
    <h3>主题设置</h3>
    <ThemeSelect />
  </div>
</template>

<script setup lang="ts">
import ThemeSelect from '~/packet/Pattern/Theme/ThemeSelect.vue'
</script>
```

## 功能特性

- 🎨 **多主题支持** - 提供5种预设主题色彩
- 🖼️ **可视化选择** - 每个主题都有对应的色彩预览方块
- 📋 **下拉菜单** - 使用 Dropdown 组件提供优雅的选择界面
- 💾 **状态持久化** - 自动保存用户选择到本地存储
- 🔄 **自动初始化** - 组件挂载时自动读取保存的主题设置
- 🌐 **国际化支持** - 主题名称支持多语言显示
- 🎯 **智能显示** - 当前主题自动禁用并高亮显示
- 🎨 **响应式设计** - 支持 hover 效果和主题色彩变量
- 🌙 **深色模式** - 完全支持深色模式

## 支持的主题

| 主题代码        | 显示名称 | 色彩预览 | 说明         |
| --------------- | -------- | -------- | ------------ |
| `theme-default` | 蓝色主题 | 🔵        | 默认蓝色主题 |
| `theme-teal`    | 青色主题 | 🟢        | 青绿色主题   |
| `theme-rose`    | 玫瑰主题 | 🌹        | 玫瑰红色主题 |
| `theme-violet`  | 紫色主题 | 🟣        | 紫罗兰主题   |
| `theme-orange`  | 橙色主题 | 🟠        | 橙色主题     |

## 组件结构

### 模板结构

```vue
<template>
  <Dropdown placement="bottom" hover>
    <template #trigger>
      <btn item class="hover:text-primary">
        <icn name="swatchbook" light xl></icn>
      </btn>
    </template>
    <Menu shadow rounded class="bg-base-300 dark:bg-base-100 w-auto min-w-32">
      <btn 
        v-for="item in themes" 
        :key="item.theme"
        clean 
        :disabled="isCurrentTheme(item)"
        @click="changeTheme(item.theme)" 
        :class="[
          'w-full flex items-center gap-3 whitespace-nowrap',
          isCurrentTheme(item) ? 'text-primary font-semibold' : ''
        ]"
      >
        <span :class="[item.class, 'rounded-$rounded-btn', item.bg, 'h-6 w-6 flex-shrink-0']"></span>
        {{ t(item.key) }}
      </btn>
    </Menu>
  </Dropdown>
</template>
```

### 核心功能特性

1. **使用 v-for 循环**：通过 `themes` 数组循环生成所有主题选项
2. **当前主题标识**：
   - 当前主题会被禁用（`:disabled="isCurrentTheme(item)"`）
   - 当前主题会高亮显示（`text-primary font-semibold`）
   - 禁用状态不会影响选项的尺寸和位置
3. **主题切换**：调用 `changeTheme` 方法切换界面主题
4. **DOM 操作**：动态添加/移除主题类到 `document.documentElement`
5. **状态同步**：实时更新组件内部状态和 DOM 类名
6. **持久化存储**：使用 `Store.setLocalStorage` 保存用户选择


## 使用场景

### 导航栏集成

```vue
<template>
  <header class="navbar bg-base-100 shadow-lg">
    <div class="flex-1">
      <h1 class="text-xl font-bold">我的应用</h1>
    </div>
    <div class="flex-none gap-2">
      <ThemeSelect />
      <LanguageSelect />
      <DarkToggle />
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeSelect from '~/packet/Pattern/Theme/ThemeSelect.vue'
import LanguageSelect from '~/packet/Pattern/Language/LanguageSelect.vue'
import DarkToggle from '~/packet/Pattern/Dark/DarkToggle.vue'
</script>
```

### 设置页面

```vue
<template>
  <div class="settings-page">
    <h2>{{ $t('settings.title') }}</h2>
    
    <div class="setting-sectum">
      <h3>{{ $t('settings.appearance') }}</h3>
      <div class="setting-item">
        <span>{{ $t('settings.theme') }}</span>
        <ThemeSelect />
      </div>
    </div>
  </div>
</template>
```

### 个性化面板

```vue
<template>
  <div class="personalization-panel">
    <h3>{{ $t('personalization.title') }}</h3>
    
    <div class="theme-grid">
      <div class="theme-option">
        <label>{{ $t('personalization.colorTheme') }}</label>
        <ThemeSelect />
      </div>
      
      <div class="theme-option">
        <label>{{ $t('personalization.darkMode') }}</label>
        <DarkToggle />
      </div>
    </div>
  </div>
</template>
```

### 当前主题显示效果

当用户打开下拉菜单时：

- ✅ **当前主题**：会被禁用（不可点击），并使用 `text-primary font-semibold` 高亮显示
- ✅ **其他主题**：正常可点击，鼠标悬停时显示悬停效果
- ✅ **尺寸一致**：所有选项保持相同的尺寸和位置，禁用状态不会影响布局

```vue
<!-- 组件会自动处理，无需额外配置 -->
<ThemeSelect />
```

下拉菜单会自动显示：
- 蓝色主题 ✅（当前，已禁用并高亮）
- 青色主题
- 玫瑰主题
- 紫色主题
- 橙色主题

## 技术实现

### 主题列表配置

```typescript
const themes = [
  { theme: 'theme-default', class: 'theme-blue', bg: 'bg-blue-700', key: 'theme.blue' },
  { theme: 'theme-teal', class: 'theme-teal', bg: 'bg-teal-700', key: 'theme.teal' },
  { theme: 'theme-rose', class: 'theme-rose', bg: 'bg-rose-700', key: 'theme.rose' },
  { theme: 'theme-violet', class: 'theme-violet', bg: 'bg-violet-700', key: 'theme.violet' },
  { theme: 'theme-orange', class: 'theme-orange', bg: 'bg-orange-700', key: 'theme.orange' }
]
```

### 主题切换逻辑

```typescript
const isTheme = ref<string>('theme-default')

// 获取主题对应的 CSS 类名
function getThemeClass(theme: string): string {
  const themeItem = themes.find(t => t.theme === theme || t.class === theme)
  return themeItem?.class || 'theme-blue'
}

function changeTheme(color: string) {
  // 获取旧主题的 CSS 类名并移除
  const oldThemeClass = getThemeClass(isTheme.value)
  document.documentElement.classList.remove(oldThemeClass)
  
  // 更新主题
  isTheme.value = color
  
  // 获取新主题的 CSS 类名并添加
  const newThemeClass = getThemeClass(isTheme.value)
  document.documentElement.classList.add(newThemeClass)
  
  // 保存到本地存储
  Store.setLocalStorage('theme', isTheme.value)
}
```

### 当前主题检测

```typescript
// 检查是否为当前主题
function isCurrentTheme(item: typeof themes[0]): boolean {
  // 直接匹配 theme 值
  if (item.theme === isTheme.value) {
    return true
  }
  // 兼容旧版本的存储值（可能存储的是 class 值）
  if (item.class === isTheme.value) {
    return true
  }
  return false
}
```

组件会自动检测当前主题，并在下拉菜单中：

1. **禁用当前主题**：使用 `:disabled="isCurrentTheme(item)"` 禁用当前主题选项
2. **高亮显示**：使用 `text-primary font-semibold` 类高亮显示当前主题
3. **保持尺寸**：禁用状态不会影响选项的尺寸和位置

### 自动初始化

```typescript
onMounted(() => {
  // 读取本地存储的主题设置
  const savedTheme = Store.getLocalStorage('theme')
  if (savedTheme) {
    isTheme.value = savedTheme
  }
  
  // 获取主题对应的 CSS 类名并应用
  const themeClass = getThemeClass(isTheme.value)
  document.documentElement.classList.add(themeClass)
})
```

## 主题配置

### CSS主题定义

```css
/* 蓝色主题 */
.theme-blue {
  --primary: #3b82f6;
  --primary-content: #ffffff;
  --secondary: #64748b;
  --accent: #06b6d4;
  --neutral: #1e293b;
  --base-100: #ffffff;
  --base-200: #f1f5f9;
  --base-300: #e2e8f0;
}

/* 青色主题 */
.theme-teal {
  --primary: #14b8a6;
  --primary-content: #ffffff;
  --secondary: #64748b;
  --accent: #06b6d4;
  --neutral: #1e293b;
  --base-100: #ffffff;
  --base-200: #f1f5f9;
  --base-300: #e2e8f0;
}

/* 玫瑰主题 */
.theme-rose {
  --primary: #f43f5e;
  --primary-content: #ffffff;
  --secondary: #64748b;
  --accent: #ec4899;
  --neutral: #1e293b;
  --base-100: #ffffff;
  --base-200: #f1f5f9;
  --base-300: #e2e8f0;
}
```

### 国际化配置

```typescript
// locale/zh-CN.ts
export default {
  theme: {
    blue: '蓝色主题',
    teal: '青色主题',
    rose: '玫瑰主题',
    violet: '紫色主题',
    orange: '橙色主题'
  }
}

// locale/en-US.ts
export default {
  theme: {
    blue: 'Blue Theme',
    teal: 'Teal Theme',
    rose: 'Rose Theme',
    violet: 'Violet Theme',
    orange: 'Orange Theme'
  }
}
```

## 样式定制

组件使用UnoCSS原子类和主题色彩变量：

- **触发器按钮**：`btn item` - 使用项目按钮组件
- **悬停效果**：`hover:text-primary` - 使用主题主色
- **下拉菜单**：`Menu shadow rounded` - 圆角阴影菜单
- **主题适配**：`bg-base-300 dark:bg-base-100` - 支持深色模式
- **色彩预览**：`rounded-$rounded-btn bg-{color}-700 h-6 w-6` - 圆角色彩方块
- **图标尺寸**：`xl` - 大尺寸调色板图标

## 扩展主题支持

### 添加新主题

1. **定义CSS变量**：

```css
/* 绿色主题 */
.theme-green {
  --primary: #22c55e;
  --primary-content: #ffffff;
  --secondary: #64748b;
  --accent: #84cc16;
  --neutral: #1e293b;
  --base-100: #ffffff;
  --base-200: #f1f5f9;
  --base-300: #e2e8f0;
}
```

2. **更新组件**（添加到 themes 数组）：

```typescript
const themes = [
  // 现有主题...
  { theme: 'theme-green', class: 'theme-green', bg: 'bg-green-700', key: 'theme.green' }
]
```

组件会自动通过 v-for 渲染新主题，无需修改模板代码。

3. **添加国际化**：

```typescript
// locale/zh-CN.ts
export default {
  theme: {
    // 现有主题...
    green: '绿色主题'
  }
}
```

## 高级用法

### 主题预览

```vue
<template>
  <div class="theme-preview">
    <h3>{{ $t('theme.preview') }}</h3>
    <div class="preview-cards">
      <div 
        v-for="theme in themes" 
        :key="theme.code"
        class="preview-card"
        :class="{ active: currentTheme === theme.code }"
        @click="changeTheme(theme.code)"
      >
        <div class="theme-preview-colors">
          <div class="color primary" :style="{ backgroundColor: theme.colors.primary }"></div>
          <div class="color secondary" :style="{ backgroundColor: theme.colors.secondary }"></div>
          <div class="color accent" :style="{ backgroundColor: theme.colors.accent }"></div>
        </div>
        <span>{{ t(`theme.${theme.name}`) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const themes = [
  { code: 'theme-blue', name: 'blue', colors: { primary: '#3b82f6', secondary: '#64748b', accent: '#06b6d4' } },
  { code: 'theme-teal', name: 'teal', colors: { primary: '#14b8a6', secondary: '#64748b', accent: '#06b6d4' } },
  // 其他主题...
]

const currentTheme = ref('theme-blue')
</script>
```

## 依赖要求

- Vue 3 Composition API
- vue-i18n 国际化库
- 项目Store工具类（用于本地存储）
- 项目Dropdown组件
- 项目Menu组件
- 项目Button组件
- 项目Icon组件
- UnoCSS主题系统

## 注意事项

1. **主题系统**：确保项目中已正确配置 UnoCSS 主题系统
2. **CSS 变量**：主题 CSS 变量需要在全局样式中定义（通常在 `theme.ts` 文件中）
3. **本地存储**：组件依赖项目的 Store 工具类进行本地存储
4. **图标支持**：图标组件需要支持 `swatchbook` 图标
5. **国际化**：主题名称需要配置对应的国际化文本（在 locale 文件中）
6. **初始化**：建议在应用启动时初始化主题设置
7. **当前主题**：当前主题会被自动禁用并高亮显示，用户无法重复选择当前主题
8. **圆角功能**：Menu 组件的 `rounded` 属性会自动为第一个和最后一个选项添加圆角