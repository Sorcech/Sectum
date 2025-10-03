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

- **多主题支持**：提供5种预设主题色彩
- **可视化选择**：每个主题都有对应的色彩预览
- **下拉菜单**：使用Dropdown组件提供优雅的选择界面
- **状态持久化**：自动保存用户选择到本地存储
- **自动初始化**：组件挂载时自动读取保存的主题设置
- **国际化支持**：主题名称支持多语言显示
- **响应式设计**：支持hover效果和主题色彩变量

## 支持的主题

| 主题代码 | 显示名称 | 色彩预览 | 说明 |
|----------|----------|----------|------|
| `theme-default` | 蓝色主题 | 🔵 | 默认蓝色主题 |
| `theme-teal` | 青色主题 | 🟢 | 青绿色主题 |
| `theme-rose` | 玫瑰主题 | 🌹 | 玫瑰红色主题 |
| `theme-violet` | 紫色主题 | 🟣 | 紫罗兰主题 |
| `theme-orange` | 橙色主题 | 🟠 | 橙色主题 |

## 组件结构

### 模板结构

```vue
<template>
  <Dropdown placement="bottom-end" hover>
    <template #trigger="{ active }">
      <btn item class="hover:text-primary">
        <icn name="swatchbook" light xl></icn>
      </btn>
    </template>
    <Menu shadow rounded class="bg-base-300 dark:bg-base-100 w-30">
      <btn clean @click="changeTheme('theme-default')">
        <span class="theme-blue rounded-$rounded-btn bg-blue-700 h-6 w-6"></span>
        {{ t("theme.blue") }}
      </btn>
      <!-- 其他主题选项... -->
    </Menu>
  </Dropdown>
</template>
```

### 核心功能

1. **主题切换**：调用`changeTheme`方法切换界面主题
2. **DOM操作**：动态添加/移除主题类到`document.documentElement`
3. **状态同步**：实时更新组件内部状态和DOM类名
4. **持久化存储**：使用`Store.setLocalStorage`保存用户选择
5. **国际化显示**：使用vue-i18n显示本地化的主题名称

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
      <DarkChange />
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeSelect from '~/packet/Pattern/Theme/ThemeSelect.vue'
import LanguageSelect from '~/packet/Pattern/Language/LanguageSelect.vue'
import DarkChange from '~/packet/Pattern/Dark/DarkChange.vue'
</script>
```

### 设置页面

```vue
<template>
  <div class="settings-page">
    <h2>{{ $t('settings.title') }}</h2>
    
    <div class="setting-section">
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
        <DarkChange />
      </div>
    </div>
  </div>
</template>
```

## 技术实现

### 主题切换逻辑

```typescript
const isTheme = ref<string>('theme-blue')

function changeTheme(color: string) {
  // 移除当前主题类
  document.documentElement.classList.remove(isTheme.value)
  
  // 更新主题
  isTheme.value = color
  
  // 添加新主题类
  document.documentElement.classList.add(isTheme.value)
  
  // 保存到本地存储
  Store.setLocalStorage('theme', isTheme.value)
}
```

### 自动初始化

```typescript
onMounted(() => {
  // 读取本地存储的主题设置
  if (Store.getLocalStorage('theme'))
    isTheme.value = Store.getLocalStorage('theme')
  
  // 应用主题到DOM
  document.documentElement.classList.add(isTheme.value)
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

2. **更新组件**：

```vue
<template>
  <Menu shadow rounded class="bg-base-300 dark:bg-base-100 w-30">
    <!-- 现有主题... -->
    <btn clean @click="changeTheme('theme-green')">
      <span class="theme-green rounded-$rounded-btn bg-green-700 h-6 w-6"></span>
      {{ t("theme.green") }}
    </btn>
  </Menu>
</template>
```

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

1. 确保项目中已正确配置UnoCSS主题系统
2. 主题CSS变量需要在全局样式中定义
3. 组件依赖项目的Store工具类进行本地存储
4. 图标组件需要支持`swatchbook`图标
5. 主题名称需要配置对应的国际化文本
6. 建议在应用启动时初始化主题设置