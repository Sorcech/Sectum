# Editor 富文本编辑器

基于 DOM 的富文本编辑器组件，采用类似 Tiptap 的命令架构，支持丰富的文本编辑功能，包括格式化、列表、任务列表、代码块等。所有编辑操作都通过命令系统执行，确保状态同步和光标位置精确保持。

## 特性

- 📝 **富文本编辑** - 支持多种文本格式和样式
- 📋 **列表支持** - 无序列表、有序列表、任务列表
- ✅ **任务列表** - 使用 ckb 组件的任务列表功能
- 💻 **代码块** - 支持代码块和行内代码
- 🎨 **文本格式** - 粗体、斜体、删除线、下划线、上标、下标
- 🔗 **链接和图片** - 支持插入链接和内联图片上传（带进度条）
- 📊 **表格** - 支持插入表格，带完整边框样式
- 📐 **对齐方式** - 左对齐、居中、右对齐、两端对齐
- 🎨 **文本颜色** - 支持自定义文本颜色和高亮颜色
- ↩️ **撤销/重做** - 完整的操作历史记录
- 🌙 **深色模式** - 完全支持深色模式
- 📱 **响应式** - 自适应不同屏幕尺寸

## 基础用法

```vue
<template>
  <Editor v-model="content" placeholder="开始输入..." />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Editor from '~/packet/Pattern/Editor/Editor.vue'

const content = ref('<p>初始内容</p>')
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `string \| EditorJSON` | `''` | 编辑器内容（支持 HTML、Markdown 或 JSON 格式） |
| `placeholder` | `string` | `'开始输入...'` | 占位符文本 |
| `showToolbar` | `boolean` | `true` | 是否显示工具栏 |
| `showCharCount` | `boolean` | `false` | 是否显示字符计数 |
| `minHeight` | `string` | `'min-h-64'` | 最小高度 |
| `maxHeight` | `string` | `''` | 最大高度 |
| `wrapperClass` | `string` | `''` | 包装器自定义类名 |
| `contentClass` | `string` | `''` | 内容区域自定义类名 |
| `editable` | `boolean` | `true` | 是否可编辑 |

## 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `(value: string \| EditorJSON)` | 内容更新时触发（输出 JSON 格式） |
| `change` | `(value: string \| EditorJSON)` | 内容变化时触发（输出 JSON 格式） |
| `focus` | - | 获得焦点时触发 |
| `blur` | - | 失去焦点时触发 |

## 方法

通过 `ref` 可以访问编辑器实例的方法：

```vue
<template>
  <Editor ref="editorRef" v-model="content" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Editor from '~/packet/Pattern/Editor/Editor.vue'

const editorRef = ref<InstanceType<typeof Editor>>()
const content = ref('')

// 获取 HTML 内容
const getHTML = () => {
  return editorRef.value?.getHTML() || ''
}

// 获取 JSON 内容
const getJSON = () => {
  return editorRef.value?.getJSON() || { type: 'doc', content: [] }
}

// 获取 Markdown 内容
const getMarkdown = () => {
  return editorRef.value?.getMarkdown() || ''
}

// 获取纯文本
const getText = () => {
  return editorRef.value?.getText() || ''
}

// 设置内容（支持 HTML、Markdown 或 JSON 格式）
const setContent = (content: string | EditorJSON) => {
  editorRef.value?.setContent(content)
}

// 清空内容
const clear = () => {
  editorRef.value?.clear()
}

// 聚焦编辑器
const focus = () => {
  editorRef.value?.focus()
}
</script>
```

## 工具栏功能

编辑器工具栏包含以下功能：

### 文本格式
- **粗体** (Ctrl+B) - 加粗文本
- **斜体** (Ctrl+I) - 斜体文本
- **删除线** (Ctrl+Shift+X) - 删除线文本
- **下划线** (Ctrl+U) - 下划线文本
- **行内代码** - 行内代码格式
- **上标** - 上标文本
- **下标** - 下标文本

### 标题
- **H1** - 一级标题
- **H2** - 二级标题
- **H3** - 三级标题
- **H4** - 四级标题
- **H5** - 五级标题
- **H6** - 六级标题

### 列表
- **无序列表** - 项目符号列表
- **有序列表** - 数字列表
- **任务列表** - 带复选框的任务列表（使用 ckb 组件，xs 尺寸）

### 引用和代码块
- **引用块** - 引用文本块（支持切换，光标位置精确保持）
- **代码块** - 代码块格式（支持切换，光标位置精确保持）
- **行内代码** - 行内代码格式
  - 浅色模式：浅灰背景（#f0f0f0），浅灰边框（#e0e0e0）
  - 暗色模式：深灰背景（#2a2a2a），深灰边框（#3a3a3a）
  - 等宽字体，圆角边框，适当内边距

### 链接和图片
- **插入链接** - 添加超链接
- **插入图片** - 内联图片上传功能
  - 点击插入图片按钮，在编辑器中显示上传占位符
  - 支持点击上传和拖拽上传
  - 显示上传进度条（文件名、大小、进度百分比）
  - 支持最多 3 个文件，每个文件最大 5MB
  - 上传完成后，图片自动替换占位符并显示在编辑器中

### 其他功能
- **插入表格** - 插入表格（带边框样式）
- **分隔线** - 水平分隔线
- **撤销/重做** - 操作历史
- **文本颜色** - 自定义文本颜色（包括白色选项）
- **高亮颜色** - 文本高亮颜色（包括白色选项）

## 任务列表

任务列表使用 ckb 组件实现，具有以下特性：

- ✅ 使用 `ckb-xs` 尺寸的复选框
- ✅ 支持切换任务完成状态
- ✅ 自动隐藏列表圆点
- ✅ 与项目其他 checkbox 样式保持一致

```vue
<template>
  <Editor v-model="content" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const content = ref(`
  <ul>
    <li>
      <input type="checkbox" class="ckb ckb-xs ckb-primary mr-2">
      任务项 1
    </li>
    <li>
      <input type="checkbox" class="ckb ckb-xs ckb-primary mr-2" checked>
      已完成的任务项
    </li>
  </ul>
`)
</script>
```

## 内容规范化

编辑器会自动规范化内容，确保：

- 所有文本都被包裹在块级元素（如 `<p>`）中
- 空编辑器会自动创建空的 `<p>` 标签（使用 `<br>` 或零宽空格保持高度）
- 移除 blockquote 或 codeBlock 后，内容会被正确包裹为段落
- 输入时自动确保内容结构正确
- **保留用户意图**：不会删除用户通过回车键创建的空段落

## 自定义样式

可以通过 `wrapperClass` 和 `contentClass` 自定义样式：

```vue
<Editor
  v-model="content"
  wrapper-class="custom-wrapper"
  content-class="custom-content"
/>
```

## 只读模式

设置 `editable` 为 `false` 可以进入只读模式：

```vue
<Editor
  v-model="content"
  :editable="false"
  :show-toolbar="false"
/>
```

## 隐藏工具栏

```vue
<Editor
  v-model="content"
  :show-toolbar="false"
/>
```

## 显示字符计数

```vue
<Editor
  v-model="content"
  :show-char-count="true"
/>
```

## 中文输入支持

编辑器完全支持中文输入法（IME），包括：

- 输入过程中不会干扰中文输入
- 输入完成后自动规范化内容
- 光标位置正确保持

## 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Z` | 撤销 |
| `Ctrl+Y` / `Ctrl+Shift+Z` | 重做 |
| `Ctrl+B` | 粗体 |
| `Ctrl+I` | 斜体 |
| `Ctrl+U` | 下划线 |
| `Ctrl+Shift+X` | 删除线 |
| `Enter` | 换行（自动创建新段落，光标位置保持） |

## 技术实现

### 新架构：基于 Tiptap 模式的命令系统

编辑器采用类似 Tiptap 的命令架构，具有以下特点：

#### 核心模块
- **CommandManager** - 命令管理器，负责注册和执行命令
- **StateManager** - 状态管理器，维护编辑器的内部状态
- **DOMManager** - DOM 管理器，统一处理 DOM 操作
- **EventHandler** - 事件处理器，集中处理所有编辑器事件

#### 命令系统
所有编辑操作都封装为独立的命令：
- **EnterKeyCommand** - 处理回车键，分割段落
- **FormatCommand** - 处理文本格式（粗体、斜体、下划线等）
- **HeadingCommand** - 处理标题样式
- **ListCommand** - 处理有序和无序列表
- **TaskListCommand** - 处理任务列表
- **BlockquoteCommand** - 处理块引用
- **CodeBlockCommand** - 处理代码块
- **CodeCommand** - 处理行内代码
- **AlignCommand** - 处理文本对齐
- **TextColorCommand** - 处理文本颜色
- **HighlightColorCommand** - 处理高亮颜色
- **HorizontalRuleCommand** - 处理水平分隔线
- **TableCommand** - 处理表格
- **ImageCommand** - 处理图片插入和内联上传

#### 光标位置管理
所有命令都实现了精确的光标位置保持：
- 在 DOM 操作前保存光标相对位置
- 使用 `TreeWalker` 和 `Range` API 精确计算文本偏移量
- 在 DOM 操作后准确恢复光标位置
- 使用 `requestAnimationFrame` 确保 DOM 更新完成后再恢复光标

#### DOM 操作
编辑器使用原生 DOM API 进行操作：
- 命令直接修改 DOM，不依赖 `document.execCommand`
- 使用 `Range` API 进行精确的文本操作
- 使用 `TreeWalker` 遍历和查找 DOM 节点
- 使用 `DocumentFragment` 进行批量 DOM 操作

#### 命令执行流程
1. **事件捕获**：EventHandler 捕获用户操作（点击、键盘等）
2. **命令执行**：CommandManager 执行对应的命令
3. **DOM 修改**：命令直接修改 DOM 结构
4. **状态更新**：StateManager 更新内部 JSON 状态
5. **光标恢复**：使用保存的相对位置恢复光标
6. **事件触发**：通过 `emit` 通知外部组件内容已更新

#### 状态同步机制
- **isUpdating 标志**：防止在命令执行期间触发 `watch` 和 `handleInput`
- **延迟清除**：使用 `setTimeout` 延长 `isUpdating` 标志，确保所有异步操作完成
- **选择信息保存**：命令执行后立即保存选择信息，确保 EventHandler 能正确恢复光标

### 内容规范化
编辑器会自动规范化内容结构：
- 确保所有文本都在块级元素中
- 处理空编辑器和边界情况
- 维护正确的 DOM 结构
- 保留用户有意创建的空段落（通过回车键创建）

## 样式定制

编辑器使用 UnoCSS 和 CSS 变量进行样式设置：

- **主题变量**：`--primary`, `--base-content`, `--base-200` 等
- **ckb 组件样式**：任务列表中的 checkbox 使用完整的 ckb 组件样式
- **响应式设计**：支持不同屏幕尺寸

### 行内代码样式

行内代码具有独特的视觉样式，使其在文本中易于识别：

**浅色模式**：
- 背景色：`#f0f0f0`（浅灰色）
- 边框：`#e0e0e0`（浅灰色边框）
- 文本颜色：深灰色
- 圆角：`0.25rem`
- 内边距：`0.125rem 0.375rem`
- 等宽字体：monospace

**暗色模式**：
- 背景色：`#2a2a2a`（深灰色）
- 边框：`#3a3a3a`（稍浅的深灰色）
- 文本颜色：`#e0e0e0`（浅色）
- 其他样式与浅色模式相同

样式定义在 `Editor.css` 中，使用 `.dark` 和 `[data-theme="dark"]` 选择器支持暗色模式。

### 图片上传功能

图片上传采用内联方式，直接在编辑器中显示上传界面：

**上传界面**：
- 虚线边框的上传占位符（紫色主题色）
- 文档图标和上传图标
- "Click to upload or drag and drop" 提示文本
- "Maximum 3 files, 5MB each" 限制说明

**上传流程**：
1. 点击插入图片按钮，在光标位置插入上传占位符
2. 点击占位符或拖拽文件到占位符区域
3. 显示文件列表和上传进度条
4. 每个文件显示：文件名、大小、进度百分比、取消按钮
5. 上传完成后，占位符自动替换为图片

**图片位置**：
- 图片上传后直接显示在编辑器中，位于原占位符的位置
- 图片被包裹在 `<p>` 标签中
- 支持多图片上传，按顺序插入

### 表格样式

插入的表格具有完整的边框样式：

**边框样式**：
- 表格外边框：1px 实线边框
- 单元格边框：1px 实线边框（所有单元格）
- 表头边框：2px 实线下边框（更粗，突出表头）
- 行边框：每行之间有 1px 下边框
- 最后一行：无下边框

**其他样式**：
- 表头背景色：浅灰色背景（`rgb(var(--base-200))`）
- 偶数行背景：交替行背景色（`rgb(var(--base-50))`）
- 单元格内边距：`0.5rem`
- 表格宽度：100%

## 注意事项

1. **内容结构**：编辑器会自动规范化内容，确保所有文本都在块级元素中
2. **任务列表**：任务列表使用 ckb 组件，样式与项目其他 checkbox 保持一致
3. **中文输入**：完全支持中文输入法，不会干扰输入过程
4. **光标位置**：所有命令都实现了精确的光标位置保持，确保在 DOM 操作后光标位置正确
5. **浏览器兼容性**：基于原生 DOM API，支持现代浏览器
6. **命令执行**：所有编辑操作都通过命令系统执行，确保状态同步和光标位置正确
7. **空段落保留**：编辑器会保留用户通过回车键创建的空段落，不会自动删除
8. **图片上传**：支持内联图片上传，带进度条显示，上传完成后自动插入到编辑器
9. **表格样式**：插入的表格带有完整的边框样式，包括外边框、单元格边框和表头边框

## 数据格式支持

Editor 组件支持多种数据格式的输入和输出：

### 支持的输入格式

1. **HTML 字符串** - 传统的 HTML 格式
   ```vue
   <Editor v-model="htmlContent" />
   <!-- htmlContent: '<p>这是内容</p>' -->
   ```

2. **Markdown 字符串** - Markdown 格式
   ```vue
   <Editor v-model="markdownContent" />
   <!-- markdownContent: '# 标题\n\n这是内容' -->
   ```

3. **JSON 格式** - 结构化 JSON 格式（推荐）
   ```vue
   <Editor v-model="jsonContent" />
   <!-- jsonContent: { type: 'doc', content: [...] } -->
   ```

### 输出格式

组件内部统一使用 **JSON 格式**存储数据，通过事件和方法可以获取不同格式：

- **`update:modelValue` / `change` 事件**：输出 JSON 格式
- **`getHTML()` 方法**：获取 HTML 格式
- **`getJSON()` 方法**：获取 JSON 格式
- **`getMarkdown()` 方法**：获取 Markdown 格式
- **`getText()` 方法**：获取纯文本格式

### 格式自动检测

组件会自动检测输入格式：
- 包含 HTML 标签 → 识别为 HTML
- 包含 Markdown 语法特征（如 `#`、`-`、`*` 等）→ 识别为 Markdown
- 符合 JSON 结构（`{ type: 'doc', content: [...] }`）→ 识别为 JSON

## 前后端交互数据格式

### 推荐方案：使用 JSON 格式

**原因**：
1. **数据验证**：JSON 格式可以使用 JSON Schema 进行验证
2. **安全性**：结构化数据更容易进行安全检查和清理
3. **可查询性**：便于后端进行结构化查询和操作
4. **可扩展性**：易于添加新的字段和属性
5. **格式转换**：可以轻松转换为 HTML、Markdown、DOCX 等格式

### JSON 格式示例

```typescript
// Editor 输出的 JSON 格式
{
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "这是第一段"
        }
      ]
    },
    {
      "type": "heading",
      "attrs": { "level": 1 },
      "content": [
        {
          "type": "text",
          "text": "这是标题"
        }
      ]
    },
    {
      "type": "bulletList",
      "content": [
        {
          "type": "listItem",
          "content": [
            {
              "type": "text",
              "text": "列表项 1"
            }
          ]
        }
      ]
    }
  ]
}
```

### 后端 API 设计示例

```typescript
// 保存内容
POST /api/content
{
  "content": {
    "type": "doc",
    "content": [...]
  },
  "title": "文章标题",
  "author": "作者"
}

// 获取内容
GET /api/content/:id
Response: {
  "id": "123",
  "content": {
    "type": "doc",
    "content": [...]
  },
  "createdAt": "2025-12-01T00:00:00Z",
  "updatedAt": "2025-12-01T00:00:00Z"
}
```

### 数据存储建议

**关系型数据库（如 PostgreSQL）**：
```sql
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content JSONB,  -- 使用 JSONB 类型存储 JSON 格式内容
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**NoSQL 数据库（如 MongoDB）**：
```javascript
{
  _id: ObjectId("..."),
  title: "文章标题",
  content: {
    type: "doc",
    content: [...]
  },
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

### 格式转换

如果需要转换为其他格式，可以使用组件提供的方法：

```typescript
// 获取 HTML 格式（用于显示）
const html = editorRef.value?.getHTML()

// 获取 Markdown 格式（用于导出）
const markdown = editorRef.value?.getMarkdown()

// 获取 JSON 格式（用于存储）
const json = editorRef.value?.getJSON()
```

### 兼容性处理

如果后端需要 HTML 格式，可以在前端转换：

```typescript
// 监听内容变化，转换为 HTML 发送给后端
watch(() => editorRef.value?.getJSON(), (json) => {
  if (json) {
    const html = jsonToHTML(json)  // 需要导入 jsonToHTML
    // 发送 HTML 到后端
    saveToBackend(html)
  }
})
```

## 最佳实践

1. **内容初始化**：优先使用 JSON 格式，也支持 HTML 或 Markdown
2. **数据存储**：后端存储使用 JSON 格式（推荐）或 HTML 格式
3. **事件处理**：监听 `update:modelValue` 或 `change` 事件获取 JSON 格式内容
4. **格式转换**：需要其他格式时使用 `getHTML()`、`getMarkdown()` 等方法
5. **只读模式**：显示内容时使用只读模式，避免意外编辑
6. **工具栏控制**：根据使用场景决定是否显示工具栏
7. **字符计数**：需要限制内容长度时启用字符计数

## 相关组件

- **[Checkbox](../Element/Checkbox/Checkbox.md)** - 任务列表中使用的复选框组件
- **[Button](../Element/Button/Button.md)** - 工具栏按钮组件
- **[Dropdown](../Section/Dropdown/Dropdown.md)** - 下拉菜单组件
