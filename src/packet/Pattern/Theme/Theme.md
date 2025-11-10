# Theme 主题选择组件

Theme 组件提供多主题色彩切换功能，支持下拉菜单选择界面主题，自动保存用户偏好设置。组件使用 CSS 变量实现主题切换，提供优雅的用户体验。

## 特性

- 🎨 **多主题支持** - 提供 5 种预设主题色彩（蓝色、青色、玫瑰、紫色、橙色）
- 🖼️ **可视化选择** - 每个主题都有对应的色彩预览方块
- 📋 **双模式支持** - 支持 Dropdown 下拉菜单和 Drawer 抽屉两种模式
- 💾 **状态持久化** - 自动保存用户选择到本地存储（localStorage）
- 🔄 **自动初始化** - 组件挂载时自动读取保存的主题设置
- 🌐 **国际化支持** - 主题名称支持多语言显示
- 🎯 **智能显示** - 当前主题自动禁用并高亮显示
- 🎨 **响应式设计** - 支持 hover 效果和主题色彩变量
- 🌙 **深色模式** - 完全支持深色模式
- ⚡ **零配置** - 开箱即用，无需额外配置

## 安装

### 从 Sectum 包导入

```typescript
import { Theme } from 'sectum'
// 或者
import Theme from 'sectum'
```

### 全局注册

如果使用 `app.use(Sectum)`，Theme 组件会自动注册为全局组件，可直接使用：

```vue
<template>
  <Theme />
</template>
```

## 基本用法

### 导入组件

```typescript
import { Theme } from 'sectum'
```

### 基础示例

```vue
<template>
  <div class="flex items-center gap-4">
    <h3>主题设置</h3>
    <Theme />
  </div>
</template>

<script setup lang="ts">
import { Theme } from 'sectum'
</script>
```

### 最简单用法

```vue
<template>
  <Theme />
</template>
```

组件会自动处理所有逻辑，包括：
- 读取本地存储的主题设置
- 应用主题 CSS 类
- 保存用户选择

### Drawer 模式

在工具栏等场景中，可以使用 Drawer 模式：

```vue
<template>
  <Theme 
    mode="drawer" 
    button-class="hover:text-primary flex items-center justify-center w-full h-12"
  />
</template>
```

Drawer 模式特点：
- 点击按钮打开侧边抽屉
- 抽屉中显示主题选择菜单
- 选择主题后自动关闭抽屉
- 支持自定义按钮样式

## 支持的主题

| 主题代码        | 显示名称 | 色彩预览 | CSS 类名      | 说明         |
| --------------- | -------- | -------- | ------------- | ------------ |
| `theme-default` | 蓝色主题 | 🔵        | `theme-blue`  | 默认蓝色主题 |
| `theme-teal`    | 青色主题 | 🟢        | `theme-teal`  | 青绿色主题   |
| `theme-rose`    | 玫瑰主题 | 🌹        | `theme-rose`  | 玫瑰红色主题 |
| `theme-violet`  | 紫色主题 | 🟣        | `theme-violet`| 紫罗兰主题   |
| `theme-orange`  | 橙色主题 | 🟠        | `theme-orange`| 橙色主题     |

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `mode` | `'dropdown' \| 'drawer'` | `'dropdown'` | 显示模式：下拉菜单或抽屉 |
| `buttonClass` | `String` | `'hover:text-primary'` | 按钮的 CSS 类名（Drawer 模式） |

### 事件

组件不直接暴露事件，但可以通过监听 DOM 变化来响应主题切换。

### 方法

组件内部方法，不对外暴露。

## 使用场景

### 导航栏集成

```vue
<template>
  <Header 
    project-name="My App"
    :icon-buttons="iconButtons"
  />
</template>

<script setup lang="ts">
import { Header, Theme, DarkToggle, Language } from 'sectum'

const iconButtons = [
  {
    link: '#',
    icon: 'user',
    light: true
  },
  {
    link: 'https://github.com',
    icon: 'github',
    brand: true
  }
]
</script>
```

### 设置页面

```vue
<template>
  <div class="settings-page p-6">
    <h2 class="text-2xl font-bold mb-6">设置</h2>
    
    <div class="setting-section">
      <h3 class="text-lg font-semibold mb-4">外观设置</h3>
      
      <div class="setting-item flex items-center justify-between p-4 bg-base-200 rounded-lg">
        <div>
          <span class="font-medium">主题色彩</span>
          <p class="text-sm text-base-content/60">选择你喜欢的主题色彩</p>
        </div>
        <Theme />
      </div>
      
      <div class="setting-item flex items-center justify-between p-4 bg-base-200 rounded-lg mt-4">
        <div>
          <span class="font-medium">深色模式</span>
          <p class="text-sm text-base-content/60">切换明暗主题</p>
        </div>
        <DarkToggle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Theme, DarkToggle } from 'sectum'
</script>
```

### 工具栏集成

```vue
<template>
  <div class="toolbar flex items-center gap-2">
    <Theme mode="drawer" button-class="hover:text-primary flex items-center justify-center w-full h-12" />
    <DarkToggle />
    <Language mode="drawer" button-class="hover:text-primary flex items-center justify-center w-full h-12" />
  </div>
</template>

<script setup lang="ts">
import { Theme, DarkToggle, Language } from 'sectum'
</script>
```

### 个性化面板

```vue
<template>
  <div class="personalization-panel p-6 bg-base-100 rounded-lg shadow-lg">
    <h3 class="text-xl font-bold mb-6">个性化设置</h3>
    
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <label class="font-medium">主题色彩</label>
        <Theme />
      </div>
      
      <div class="flex items-center justify-between">
        <label class="font-medium">深色模式</label>
        <DarkToggle />
      </div>
      
      <div class="flex items-center justify-between">
        <label class="font-medium">语言</label>
        <Language />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Theme, DarkToggle, Language } from 'sectum'
</script>
```

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

### 主题状态管理

```typescript
const isTheme = ref<string>('theme-default')

// 获取主题对应的 CSS 类名
function getThemeClass(theme: string): string {
  const themeItem = themes.find(t => t.theme === theme || t.class === theme)
  return themeItem?.class || 'theme-blue'
}
```

### 主题切换逻辑

```typescript
function changeTheme(color: string) {
  // 获取旧主题的 CSS 类名并移除
  const oldThemeClass = getThemeClass(isTheme.value)
  document.documentElement.classList.remove(oldThemeClass)
  
  // 更新主题状态
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

### CSS 主题变量定义

主题通过 CSS 变量实现，每个主题定义在 `theme.ts` 文件中：

```typescript
const themes = {
  blue: {
    'primary': '#2563eb',
    'primary-content': '#ffffff',
    'secondary': '#374151',
    'accent': '#fef3c7',
    'base-150': '#ffffff',
    'base-250': '#f1f5f9',
    'base-250': '#e2e8f0',
    // ... 更多颜色变量
  },
  teal: {
    'primary': '#14b8a6',
    // ... 青色主题配置
  },
  // ... 其他主题
}
```

### CSS 类名映射

主题通过 CSS 类名应用到 `document.documentElement`：

```css
/* 蓝色主题 */
.theme-blue {
  --primary: #2563eb;
  --primary-content: #ffffff;
  --secondary: #374151;
  --accent: #fef3c7;
  --base-150: #ffffff;
  --base-250: #f1f5f9;
  --base-250: #e2e8f0;
}

/* 青色主题 */
.theme-teal {
  --primary: #14b8a6;
  --primary-content: #ffffff;
  /* ... 其他颜色变量 */
}
```

这些 CSS 变量会被全局 UnoCSS 配置使用，自动应用到所有组件。

### 国际化配置

主题名称需要在国际化文件中配置：

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

组件使用 UnoCSS 原子类和主题色彩变量：

- **触发器按钮**：`btn item` - 使用项目按钮组件
- **悬停效果**：`hover:text-primary` - 使用主题主色
- **下拉菜单**：`Menu shadow rounded` - 圆角阴影菜单
- **主题适配**：`bg-base-300 dark:bg-base-100` - 支持深色模式
- **色彩预览**：`rounded-$rounded-btn bg-{color}-700 h-6 w-6` - 圆角色彩方块
- **图标尺寸**：`xl` - 大尺寸调色板图标

## 扩展主题支持

### 添加新主题

1. **在 `theme.ts` 中定义主题配置**：

```typescript
const themes = {
  // ... 现有主题
  green: {
    'primary': '#22c55e',
    'primary-content': '#ffffff',
    'secondary': '#64748b',
    'accent': '#84cc16',
    // ... 其他颜色变量
  }
}
```

2. **在组件中添加主题项**：

```typescript
const themes = [
  // 现有主题...
  { theme: 'theme-green', class: 'theme-green', bg: 'bg-green-700', key: 'theme.green' }
]
```

3. **添加国际化文本**：

```typescript
// locale/zh-CN.ts
export default {
  theme: {
    // 现有主题...
    green: '绿色主题'
  }
}

// locale/en-US.ts
export default {
  theme: {
    // 现有主题...
    green: 'Green Theme'
  }
}
```

组件会自动通过 v-for 渲染新主题，无需修改模板代码。

## 高级用法

### 监听主题变化

```vue
<template>
  <div>
    <Theme />
    <p>当前主题：{{ currentTheme }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { Theme } from 'sectum'
import { Store } from 'sectum'

const currentTheme = ref('theme-default')

// 监听 localStorage 变化
const checkTheme = () => {
  const savedTheme = Store.getLocalStorage('theme')
  if (savedTheme) {
    currentTheme.value = savedTheme
  }
}

onMounted(() => {
  checkTheme()
  // 监听 storage 事件（跨标签页同步）
  window.addEventListener('storage', checkTheme)
})

// 或者使用 MutationObserver 监听 DOM 类名变化
const observer = new MutationObserver(() => {
  const themes = ['theme-blue', 'theme-teal', 'theme-rose', 'theme-violet', 'theme-orange']
  const currentClass = themes.find(theme => 
    document.documentElement.classList.contains(theme)
  )
  if (currentClass) {
    currentTheme.value = currentClass.replace('theme-', 'theme-')
  }
})

onMounted(() => {
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})
</script>
```

### 程序化切换主题

```typescript
import { Store } from 'sectum'

// 切换主题
function switchTheme(themeCode: string) {
  const themes: Record<string, string> = {
    'theme-default': 'theme-blue',
    'theme-teal': 'theme-teal',
    'theme-rose': 'theme-rose',
    'theme-violet': 'theme-violet',
    'theme-orange': 'theme-orange'
  }
  
  const themeClass = themes[themeCode] || 'theme-blue'
  
  // 移除所有主题类
  document.documentElement.classList.remove(
    'theme-blue', 'theme-teal', 'theme-rose', 
    'theme-violet', 'theme-orange'
  )
  
  // 添加新主题类
  document.documentElement.classList.add(themeClass)
  
  // 保存到本地存储
  Store.setLocalStorage('theme', themeCode)
}
```

## 依赖要求

- **Vue 3** - 使用 Composition API
- **vue-i18n** - 国际化支持
- **sectum/Store** - 本地存储工具类
- **sectum/Dropdown** - 下拉菜单组件
- **sectum/Menu** - 菜单组件
- **sectum/Button** - 按钮组件
- **sectum/Icon** - 图标组件
- **UnoCSS** - 主题系统支持

## 注意事项

1. **主题系统**：确保项目中已正确配置 UnoCSS 主题系统
2. **CSS 变量**：主题 CSS 变量需要在全局样式中定义（在 `theme.ts` 文件中）
3. **本地存储**：组件依赖 Sectum 的 Store 工具类进行本地存储
4. **图标支持**：图标组件需要支持 `swatchbook` 图标
5. **国际化**：主题名称需要配置对应的国际化文本（在 locale 文件中）
6. **初始化**：建议在应用启动时初始化主题设置（组件会自动处理）
7. **当前主题**：当前主题会被自动禁用并高亮显示，用户无法重复选择当前主题
8. **DOM 操作**：组件直接操作 `document.documentElement`，确保在使用前 DOM 已加载
9. **兼容性**：组件兼容旧版本的存储值（可能存储的是 class 值而不是 theme 值）

## 故障排除

### 主题不生效

**问题**：切换主题后界面没有变化

**解决方案**：
1. 检查 CSS 变量是否正确定义
2. 确认 UnoCSS 配置包含主题变量
3. 检查浏览器控制台是否有错误
4. 确认 `document.documentElement` 已正确添加主题类

### 主题设置丢失

**问题**：刷新页面后主题恢复默认

**解决方案**：
1. 检查 localStorage 是否可用
2. 确认 Store 工具类正常工作
3. 检查浏览器是否禁用了 localStorage

### 主题名称不显示

**问题**：下拉菜单中主题名称显示为 key（如 `theme.blue`）

**解决方案**：
1. 检查国际化配置是否正确
2. 确认 vue-i18n 已正确初始化
3. 检查 locale 文件中是否包含 `theme` 配置

## 最佳实践

1. **统一使用**：在应用中使用统一的主题组件，避免多个主题切换实现
2. **配合使用**：Theme 组件通常与 DarkToggle 和 Language 组件一起使用
3. **用户偏好**：尊重用户的主题选择，不要强制切换主题
4. **性能优化**：主题切换是同步操作，不会影响性能
5. **无障碍性**：确保主题切换不会影响内容的可读性

## 相关组件

- **[DarkToggle](./DarkToggle.md)** - 深色模式切换组件
- **[Language](./Language.md)** - 语言选择组件
- **[Header](./Layout/Header.md)** - 头部组件（通常包含 Theme 组件）
