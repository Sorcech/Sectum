# Footer 页脚组件

Footer 组件是一个功能丰富的页脚组件，用于显示网站地图链接、版权信息、ICP 备案号等。适用于各种 Web 应用的底部布局。

## 特性

- 📄 **网站地图** - 支持分组显示网站地图链接，包含主标题、副标题和链接列表
- 🔗 **智能链接** - 自动识别内部路由和外部链接，使用不同的导航方式
- 📝 **版权信息** - 支持自定义版权持有者、ICP 备案号和额外信息
- 🌓 **暗色模式** - 自动适配暗色主题
- 📱 **响应式** - 自适应不同屏幕尺寸
- 🎨 **可定制** - 通过 UnoCSS 类名轻松自定义样式
- 🎯 **视觉层次** - 清晰的标题、副标题和链接层次结构

## 安装

```ts
import Footer from '~/packet/Model/Footer/Footer.vue'
// 或者
import { Footer } from 'sectum'
```

## 基础用法

最简单的 Footer 用法：

```vue
<template>
  <Footer />
</template>

<script setup>
import Footer from '~/packet/Model/Footer/Footer.vue'
</script>
```

## 完整示例

### 带网站地图和版权信息

```vue
<template>
  <Footer 
    :copyright-holder="'Cumulu'"
    :icp-number="'京ICP备XXXXXXXX号'"
    :additional-info="'MIT Licensed | Copyright © 2025-Present Cumulu'"
    :sitemap-links="sitemapLinks"
  />
</template>

<script setup>
import { computed } from 'vue'
import Footer from '~/packet/Model/Footer/Footer.vue'
import type { SitemapLinkGroup } from '~/packet/Model/Footer/Footer.vue'

const sitemapLinks = computed<SitemapLinkGroup[]>(() => [
  {
    title: 'Drive Section',
    subtitle: 'REVER',
    subtitleLink: 'https://rever.run',
    links: [
      { title: 'Encoder/Sensor', path: 'https://rever.run/encoder' },
      { title: 'Servo/Driver', path: 'https://rever.run/servo' },
      { title: 'Converter/Inverter', path: 'https://rever.run/converter' }
    ]
  },
  {
    title: 'Motion Module',
    subtitle: 'ROVOR',
    subtitleLink: 'https://rovor.cc',
    links: [
      { title: 'Rotating/Linear Solenoid', path: 'https://rovor.cc/solenoid' },
      { title: 'Brushless/Servo Motor', path: 'https://rovor.cc/motor' }
    ]
  }
])
</script>
```

### 完整页面布局

```vue
<template>
  <div class="min-h-screen flex flex-col">
    <Header project-name="Cumulu" />
    <main class="flex-1">
      <!-- 页面内容 -->
    </main>
    <Footer 
      :copyright-holder="config.footer.copyrightHolder"
      :icp-number="config.footer.icpNumber"
      :additional-info="config.footer.additionalInfo"
      :sitemap-links="sitemapLinks"
    />
  </div>
</template>

<script setup>
import { Header } from 'sectum'
import Footer from '~/packet/Model/Footer/Footer.vue'
import config from '~/config/config'
</script>
```

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `sitemapLinks` | `SitemapLinkGroup[]` | `[]` | 网站地图链接组数组 |
| `copyrightHolder` | `string` | `'Cesar.Studio'` | 版权持有者名称 |
| `icpNumber` | `string` | - | ICP 备案号 |
| `additionalInfo` | `string` | - | 额外的信息（如许可证、联系方式等） |
| `copyright` | `string` | - | 自定义版权信息（暂未使用） |

### 类型定义

#### SitemapLinkGroup

```typescript
interface SitemapLinkGroup {
  title?: string        // 分组标题（可选）
  subtitle?: string     // 副标题（可选）
  subtitleLink?: string // 副标题链接（可选）
  links: SitemapLink[]  // 链接列表
}
```

#### SitemapLink

```typescript
interface SitemapLink {
  title: string  // 链接标题
  path: string   // 链接路径（支持内部路由和外部链接）
}
```

### 链接处理

Footer 组件会自动识别链接类型：

- **内部路由**：以 `/` 开头且不以 `http://`、`https://` 或 `//` 开头的路径，使用 `RouterLink` 组件
- **外部链接**：以 `http://`、`https://` 或 `//` 开头的 URL，使用 `<a>` 标签并在新窗口打开

## 样式说明

### 布局结构

- **容器**：`w-full bg-base-100` - 全宽，使用基础背景色
- **内容区域**：`px-5 lg:px-30 mx-auto w-full pb-5` - 响应式内边距
- **网站地图区域**：`flex flex-wrap justify-center gap-6 md:gap-8` - 居中对齐，响应式间距
- **分组容器**：`border-l-2 border-l-solid border-base-300 pl-4` - 左侧边框，左侧内边距

### 文本样式

- **主标题**：`text-sm font-semibold text-base-content mb-3` - 小号字体，半粗体，基础内容色
- **副标题**：`text-sm font-medium text-base-content mb-2` - 小号字体，中等粗细，基础内容色，可点击链接
- **链接**：`text-sm text-base-content/70 hover:text-primary` - 小号字体，70% 透明度，悬停时显示主题色
- **版权信息**：`text-sm text-base-content` - 小号字体，基础内容色
- **ICP 备案号**：`text-xs text-base-content/70` - 超小号字体，70% 透明度

### 版权信息区域

版权信息区域独立于网站地图区域，在整个页面宽度上居中显示，包含：
- 版权信息（动态年份）
- ICP 备案号
- 额外信息

## 最佳实践

1. **数据组织**：将网站地图数据组织成逻辑分组，每个分组包含主标题、副标题和链接列表
2. **链接管理**：使用内部路由路径（如 `/about`）用于站内导航，使用完整 URL（如 `https://example.com`）用于外部链接
3. **响应式设计**：Footer 会自动适配不同屏幕尺寸，在小屏幕上链接居中显示，在大屏幕上左对齐
4. **版权信息**：建议同时提供 `copyrightHolder`、`icpNumber` 和 `additionalInfo` 以提供完整的法律信息
5. **视觉层次**：利用主标题、副标题和链接的层次结构，使信息组织更清晰

## 注意事项

- 副标题如果提供了 `subtitleLink`，会自动渲染为可点击的链接
- 外部链接会在新窗口打开（`target="_blank"`），并包含安全属性（`rel="noopener noreferrer"`）
- 版权信息的年份会自动使用当前年份（`new Date().getFullYear()`）
- 如果 `sitemapLinks` 为空数组，网站地图区域不会显示
- 如果所有版权相关字段都为空，版权信息区域不会显示

## 示例数据格式

```typescript
const sitemapLinks: SitemapLinkGroup[] = [
  {
    title: 'Drive Section',           // 主标题
    subtitle: 'REVER',                // 副标题
    subtitleLink: 'https://rever.run', // 副标题链接
    links: [                          // 链接列表
      { title: 'Encoder/Sensor', path: 'https://rever.run/encoder' },
      { title: 'Servo/Driver', path: 'https://rever.run/servo' },
      { title: 'Converter/Inverter', path: 'https://rever.run/converter' }
    ]
  },
  {
    title: 'Motion Module',
    subtitle: 'ROVOR',
    subtitleLink: 'https://rovor.cc',
    links: [
      { title: 'Rotating/Linear Solenoid', path: 'https://rovor.cc/solenoid' },
      { title: 'Brushless/Servo Motor', path: 'https://rovor.cc/motor' }
    ]
  }
]
```
