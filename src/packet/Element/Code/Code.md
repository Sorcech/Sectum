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

## 样式定制

组件使用 CSS 变量，可以通过覆盖以下变量来自定义样式：

```css
.sectum-code {
  --base-200: /* 代码背景色 */
  --base-100: /* 边框颜色 */
  --base-content: /* 文字颜色 */
  --dark-base-200: /* 暗色模式背景色 */
  --dark-base-100: /* 暗色模式边框颜色 */
  --dark-base-content: /* 暗色模式文字颜色 */
}
```

## 注意事项

- 行号功能仅在代码块模式（`inline: false`）下生效
- 自动换行可能会影响代码的可读性，建议仅在必要时使用
- 组件会保留代码中的空白字符（如果 `trim: false`）

