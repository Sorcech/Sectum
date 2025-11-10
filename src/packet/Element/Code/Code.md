# Code 组件

一个用于展示代码的组件，支持行内代码和代码块两种模式，可以用于包装 markdown 解析出来的 `pre` 和 `code` 元素。

## 特性

- 📝 **行内代码和代码块**：支持两种显示模式
- 🔢 **行号显示**：可选择显示行号（仅代码块模式）
- 📏 **自动换行**：支持代码自动换行
- 🎨 **主题适配**：自动适配明暗主题
- 🖱️ **代码选择**：支持代码选择和复制

## 基本用法

### 行内代码

```vue
<template>
  <cod>console.log('Hello World')</cod>
</template>

<script setup>
import { Code } from 'sectum'
</script>
```

或者使用 `inline` 属性：

```vue
<template>
  <cod inline code="const x = 1"></cod>
</template>
```

### 代码块

```vue
<template>
  <cod 
    code="function hello() {
  console.log('Hello World')
}"
    language="javascript"
  />
</template>
```

### 显示行号

```vue
<template>
  <cod 
    code="function hello() {
  console.log('Hello World')
}"
    language="javascript"
    :show-line-numbers="true"
  />
</template>
```

### 自动换行

```vue
<template>
  <cod 
    code="这是一段非常长的代码，需要自动换行显示..."
    :word-wrap="true"
  />
</template>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `code` | `String` | `''` | 代码内容 |
| `language` | `String` | `''` | 编程语言（用于语法高亮，暂未实现） |
| `inline` | `Boolean` | `false` | 是否为行内代码 |
| `wordWrap` | `Boolean` | `false` | 是否自动换行 |
| `showLineNumbers` | `Boolean` | `false` | 是否显示行号（仅代码块模式） |
| `trim` | `Boolean` | `true` | 是否去除首尾空白 |

### 样式类

组件会自动应用以下 CSS 类：

- `sectum-code`：基础样式
- `sectum-code--inline`：行内代码样式
- `sectum-code--block`：代码块样式
- `sectum-code--word-wrap`：自动换行样式
- `sectum-code--show-line-numbers`：显示行号样式
- `sectum-code--{language}`：语言特定样式（如 `sectum-code--javascript`）

## 在 Markdown 中使用

Code 组件可以用于包装 markdown 解析出来的 `pre` 和 `code` 元素：

```vue
<template>
  <Markdown>
    <cod inline code="行内代码"></cod>
    
    <cod 
      code="// 代码块示例
function hello() {
  console.log('Hello World')
}"
      language="javascript"
      :show-line-numbers="true"
    />
  </Markdown>
</template>
```

## Vite 插件配置

### codePlugin

`codePlugin` 是一个 Vite 插件，用于自动将 Markdown 文件中渲染后的 `<pre>` 和 `<code>` 元素转换为 Code 组件。这样可以确保所有代码块都使用统一的 Code 组件进行渲染。

#### 导入

```typescript
import { codePlugin } from 'sectum'
```

#### 使用方法

在 `vite.config.ts` 中配置插件：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import { codePlugin } from 'sectum'

export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      // 自定义代码块渲染
      markdownItSetup(md) {
        // 覆盖代码块的渲染函数
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
          const token = tokens[idx]
          const info = token.info ? token.info.trim() : ''
          const langName = info.split(/\s+/g)[0]
          const code = token.content
          
          // 转义 HTML 特殊字符
          const escapedCode = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
          
          return `<cod code="${escapedCode}" ${langName ? `language="${langName}"` : ''} :trim="false"></cod>\n`
        }
        
        // 覆盖行内代码的渲染函数
        md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
          const token = tokens[idx]
          const code = token.content.trim()
          
          const escapedCode = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
          
          return `<code class="inline-code">${escapedCode}</code>`
        }
      }
    }),
    codePlugin(), // 必须在 Markdown 插件之后
  ],
})
```

#### 工作原理

1. **Markdown 插件**：将 Markdown 代码块（`` ``` ``）转换为 `<cod>` 组件
2. **codePlugin**：将剩余的 `<pre>` 和 `<code>` 元素转换为 Code 组件

#### 插件特性

- ✅ 自动识别 Markdown 文件（`.md`, `.md.vue` 等）
- ✅ 将 `<pre><code>` 代码块转换为 Code 组件
- ✅ 将行内 `<code>` 元素转换为 Code 组件
- ✅ 自动提取语言信息（从 `class="language-xxx"`）
- ✅ 智能跳过已转换的 Code 组件
- ✅ 在 Markdown 处理之后运行（`enforce: 'post'`）

#### 注意事项

- 插件必须在 `Markdown` 插件之后配置
- 插件会自动转义 HTML 特殊字符
- 如果代码块已经是 `<cod>` 组件，插件会跳过处理
- 插件会保留代码的原始格式（包括换行和缩进）

## 样式定制

组件使用 CSS 变量，可以通过覆盖以下变量来自定义样式：

```css
.sectum-code {
  --base-250: /* 代码背景色 */
  --base-150: /* 边框颜色 */
  --base-content: /* 文字颜色 */
  --dark-base-250: /* 暗色模式背景色 */
  --dark-base-150: /* 暗色模式边框颜色 */
  --dark-base-content: /* 暗色模式文字颜色 */
}
```

## 注意事项

- 行号功能仅在代码块模式（`inline: false`）下生效
- 自动换行可能会影响代码的可读性，建议仅在必要时使用
- 组件会保留代码中的空白字符（如果 `trim: false`）

