# LanguageSelect 语言选择组件

LanguageSelect 语言选择组件提供多语言切换功能，支持下拉菜单选择界面语言，自动保存用户偏好设置。与 vue-i18n 完美集成，提供流畅的语言切换体验。

## 特性

- 🌍 **多语言支持** - 支持中文和英文切换，可扩展更多语言
- 📋 **下拉菜单** - 使用 Dropdown 组件提供优雅的选择界面
- 💾 **状态持久化** - 自动保存用户选择到本地存储
- 🔄 **自动初始化** - 组件挂载时自动读取保存的语言设置
- 🌐 **国际化集成** - 与 vue-i18n 完美集成
- 🎨 **响应式设计** - 支持 hover 效果和主题色彩变量
- 🌙 **深色模式** - 完全支持深色模式

## 安装

```ts
import { LanguageSelect } from 'sectum'
// 或者
import LanguageSelect from 'sectum'
```

## 基础用法

### 导入组件

```typescript
import LanguageSelect from '~/packet/Pattern/Language/LanguageSelect.vue'
```

### 基础示例

```vue
<template>
  <div class="flex items-center gap-4">
    <h3>语言设置</h3>
    <LanguageSelect />
  </div>
</template>

<script setup lang="ts">
import LanguageSelect from '~/packet/Pattern/Language/LanguageSelect.vue'
</script>
```

## 功能特性

- **多语言支持**：支持中文和英文切换
- **下拉菜单**：使用Dropdown组件提供优雅的选择界面
- **状态持久化**：自动保存用户选择到本地存储
- **自动初始化**：组件挂载时自动读取保存的语言设置
- **国际化集成**：与vue-i18n完美集成
- **响应式设计**：支持hover效果和主题色彩变量

## 支持的语言

| 语言代码 | 显示名称 | 说明     |
| -------- | -------- | -------- |
| `zh-CN`  | 中文     | 简体中文 |
| `en-US`  | English  | 美式英语 |

## 组件结构

### 模板结构

```vue
<template>
  <Dropdown placement="bottom-end" hover>
    <template #trigger="{ active }">
      <btn item class="hover:text-primary">
        <icn name="language" light xl></icn>
      </btn>
    </template>
    <Menu rounded shadow class="bg-base-300 dark:bg-base-100">
      <btn clean @click="setLanguage('en-US')">
        English
      </btn>
      <btn clean @click="setLanguage('zh-CN')">
        中文
      </btn>
    </Menu>
  </Dropdown>
</template>
```

### 核心功能

1. **语言切换**：调用`setLanguage`方法切换界面语言
2. **状态同步**：实时更新vue-i18n的locale值
3. **持久化存储**：使用`Store.setLocalStorage`保存用户选择
4. **自动初始化**：组件挂载时读取本地存储的语言设置

## 使用场景

### 导航栏集成

```vue
<template>
  <header class="navbar bg-base-100 shadow-lg">
    <div class="flex-1">
      <h1 class="text-xl font-bold">{{ $t('app.title') }}</h1>
    </div>
    <div class="flex-none gap-2">
      <LanguageSelect />
      <DarkChange />
    </div>
  </header>
</template>

<script setup lang="ts">
import LanguageSelect from '~/packet/Pattern/Language/LanguageSelect.vue'
import DarkChange from '~/packet/Pattern/Dark/DarkChange.vue'
</script>
```

### 设置页面

```vue
<template>
  <div class="settings-page">
    <h2>{{ $t('settings.title') }}</h2>
    
    <div class="setting-sectum">
      <h3>{{ $t('settings.language') }}</h3>
      <div class="setting-item">
        <span>{{ $t('settings.currentLanguage') }}</span>
        <LanguageSelect />
      </div>
    </div>
  </div>
</template>
```

### 用户偏好设置

```vue
<template>
  <div class="user-preferences">
    <div class="preference-item">
      <label>{{ $t('preferences.language') }}</label>
      <LanguageSelect />
    </div>
    
    <div class="preference-item">
      <label>{{ $t('preferences.theme') }}</label>
      <ThemeSelect />
    </div>
  </div>
</template>
```

## 技术实现

### 语言切换逻辑

```typescript
const setLanguage = (locale: 'zh-CN' | 'en-US') => {
  if (locale !== I18n.global.locale.value) {
    // 保存到本地存储
    Store.setLocalStorage('locale', locale)
    
    // 更新vue-i18n语言
    I18n.global.locale.value = locale
    
    return true
  } else {
    return false
  }
}
```

### 自动初始化

```typescript
onMounted(() => {
  // 读取本地存储的语言设置
  if (Store.getLocalStorage('locale')) {
    I18n.global.locale.value = Store.getLocalStorage('locale')
  }
})
```

## 国际化配置

### 语言文件结构

```typescript
// locale/zh-CN.ts
export default {
  common: {
    save: '保存',
    cancel: '取消',
    confirm: '确认'
  },
  settings: {
    title: '设置',
    language: '语言',
    currentLanguage: '当前语言'
  }
}

// locale/en-US.ts
export default {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    currentLanguage: 'Current Language'
  }
}
```

### 使用翻译

```vue
<template>
  <div>
    <!-- 使用 $t 函数 -->
    <h1>{{ $t('app.title') }}</h1>
    
    <!-- 在脚本中使用 -->
    <p>{{ welcomeMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const welcomeMessage = computed(() => t('app.welcome'))
</script>
```

## 样式定制

组件使用UnoCSS原子类和主题色彩变量：

- **触发器按钮**：`btn item` - 使用项目按钮组件
- **悬停效果**：`hover:text-primary` - 使用主题主色
- **下拉菜单**：`Menu rounded shadow` - 圆角阴影菜单
- **主题适配**：`bg-base-300 dark:bg-base-100` - 支持深色模式
- **图标尺寸**：`xl` - 大尺寸语言图标

## 扩展语言支持

### 添加新语言

1. **创建语言文件**：

```typescript
// locale/ja-JP.ts
export default {
  common: {
    save: '保存',
    cancel: 'キャンセル',
    confirm: '確認'
  }
}
```

2. **更新组件**：

```vue
<template>
  <Dropdown placement="bottom-end" hover>
    <template #trigger="{ active }">
      <btn item class="hover:text-primary">
        <icn name="language" light xl></icn>
      </btn>
    </template>
    <Menu rounded shadow class="bg-base-300 dark:bg-base-100">
      <btn clean @click="setLanguage('en-US')">English</btn>
      <btn clean @click="setLanguage('zh-CN')">中文</btn>
      <btn clean @click="setLanguage('ja-JP')">日本語</btn>
    </Menu>
  </Dropdown>
</template>

<script setup lang="ts">
const setLanguage = (locale: 'zh-CN' | 'en-US' | 'ja-JP') => {
  // 语言切换逻辑
}
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

## 注意事项

1. 确保项目中已正确配置vue-i18n
2. 语言文件需要与组件中定义的语言代码一致
3. 组件依赖项目的Store工具类进行本地存储
4. 图标组件需要支持`language`图标
5. 建议在应用启动时初始化语言设置