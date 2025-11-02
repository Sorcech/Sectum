# Markdown 组件

Markdown 组件提供完整的 Markdown 文档渲染功能，支持自动目录生成、响应式布局、深色主题适配等特性。适用于文档展示、博客文章、帮助文档等场景。

## 特性

- 📑 **自动目录生成** - 根据标题层级自动生成目录结构
- 📱 **响应式布局** - 支持桌面和移动端适配
- 🌙 **深色主题支持** - 自动适配明暗主题切换
- 🎯 **平滑滚动** - 目录链接支持平滑滚动到对应位置
- 📊 **层级缩进** - 目录项根据标题层级自动缩进
- 🔗 **锚点导航** - 自动为标题生成锚点ID
- 🎨 **美观样式** - 使用 GitHub 风格的 Markdown 样式
- ⚡ **性能优化** - 支持 KeepAlive 缓存，优化渲染性能

## 安装

```ts
import { Markdown } from 'sectum'
// 或者
import Markdown from 'sectum'
```

## 基础用法

### 导入组件

```typescript
import Markdown from '~/packet/Pattern/Markdown/Markdown.vue'
```

### 基础示例

```vue
<template>
  <Markdown>
    <h1>Markdown 文档标题</h1>
    <p>这是一个段落内容。</p>
    <h2>二级标题</h2>
    <ul>
      <li>列表项 1</li>
      <li>列表项 2</li>
    </ul>
  </Markdown>
</template>

<script setup lang="ts">
import Markdown from '~/packet/Pattern/Markdown/Markdown.vue'
</script>
```

### 使用内容属性

```vue
<template>
  <Markdown :content="markdownContent" />
</template>

<script setup lang="ts">
import Markdown from '~/packet/Pattern/Markdown/Markdown.vue'

const markdownContent = `
# 文档标题

这是一个 **粗体** 和 *斜体* 的示例。

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, World!')
}
\`\`\`

## 表格

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
`
</script>
```

## 组件特性

### 核心功能

- **自动目录生成**：根据标题层级自动生成目录结构
- **响应式布局**：支持桌面和移动端适配
- **深色主题支持**：自动适配明暗主题切换
- **平滑滚动**：目录链接支持平滑滚动到对应位置
- **层级缩进**：目录项根据标题层级自动缩进
- **锚点导航**：自动为标题生成锚点ID

### 技术实现

#### 1. 标题解析机制

组件支持两种标题解析方式：

**方式一：内容解析**
```typescript
// 从传入的content字符串中解析标题
function parseHeaders(content: string): TocItem[] {
  const lines = content.split('\n')
  const headers: TocItem[] = []
  const stack: TocItem[] = []

  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const title = match[2].trim()
      const slug = title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

      // 构建层级结构...
    }
  })
  return headers
}
```

**方式二：DOM解析**
```typescript
// 从渲染后的DOM中解析标题
function parseDOMHeaders() {
  addHeaderIds() // 为标题添加ID
  
  const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const headerData: TocItem[] = []
  const stack: TocItem[] = []

  headers.forEach((header, index) => {
    const level = parseInt(header.tagName.charAt(1))
    const title = header.textContent || ''
    const slug = header.id || ''

    // 构建层级结构...
  })
}
```

#### 2. 目录生成算法

```typescript
// 构建层级目录结构
function buildTocStructure(headers: TocItem[]): TocItem[] {
  const toc: TocItem[] = []
  const stack: TocItem[] = []

  headers.forEach((header) => {
    // 找到合适的父级
    while (stack.length > 0 && stack[stack.length - 1].level >= header.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      toc.push(header)
    } else {
      if (!stack[stack.length - 1].children) {
        stack[stack.length - 1].children = []
      }
      stack[stack.length - 1].children!.push(header)
    }

    stack.push(header)
  })

  return toc
}
```

#### 3. 锚点ID生成

```typescript
// 为标题生成唯一的锚点ID
function generateSlug(title: string): string {
  return title.toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-')     // 空格替换为连字符
    .replace(/-+/g, '-')      // 合并多个连字符
    .replace(/^-|-$/g, '')    // 移除首尾连字符
}
```

## 属性配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `content` | `String` | - | Markdown内容字符串（可选） |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| `default` | Markdown内容区域 |

## 使用示例

### 文档页面

```vue
<template>
  <div class="document-page">
    <Markdown>
      <h1>API 文档</h1>
      
      <h2>快速开始</h2>
      <p>本API提供了完整的RESTful接口。</p>
      
      <h3>认证</h3>
      <p>所有API请求都需要在请求头中包含认证令牌：</p>
      
      <pre><code>Authorization: Bearer your-token-here</code></pre>
      
      <h2>端点列表</h2>
      <table>
        <thead>
          <tr>
            <th>方法</th>
            <th>路径</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GET</td>
            <td>/api/users</td>
            <td>获取用户列表</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>/api/users</td>
            <td>创建新用户</td>
          </tr>
        </tbody>
      </table>
    </Markdown>
  </div>
</template>
```

### 博客文章

```vue
<template>
  <div class="blog-post">
    <Markdown :content="articleContent" />
  </div>
</template>

<script setup lang="ts">
import Markdown from '~/packet/Pattern/Markdown/Markdown.vue'

const articleContent = `
# Vue 3 组合式API最佳实践

## 引言

Vue 3 引入了组合式API，为开发者提供了更灵活的代码组织方式。

## 核心概念

### 响应式数据

\`\`\`javascript
import { ref, reactive } from 'vue'

// 使用 ref 创建响应式引用
const count = ref(0)

// 使用 reactive 创建响应式对象
const state = reactive({
  name: 'Vue 3',
  version: '3.0.0'
})
\`\`\`

### 生命周期钩子

\`\`\`javascript
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
})

onUnmounted(() => {
  console.log('组件已卸载')
})
\`\`\`

## 总结

组合式API让代码更加模块化和可复用。
`
</script>
```

### 技术文档

```vue
<template>
  <div class="tech-docs">
    <Markdown>
      <h1>组件开发指南</h1>
      
      <h2>组件结构</h2>
      <p>每个组件都应该遵循以下结构：</p>
      
      <ol>
        <li><strong>Props定义</strong>：使用TypeScript接口定义属性</li>
        <li><strong>事件定义</strong>：使用defineEmits定义事件</li>
        <li><strong>样式定义</strong>：使用UnoCSS原子类</li>
        <li><strong>文档编写</strong>：提供完整的使用说明</li>
      </ol>
      
      <h3>示例代码</h3>
      <pre><code>&lt;template&gt;
  &lt;div :class="containerClasses"&gt;
    &lt;slot /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
interface Props {
  direction?: 'row' | 'col'
}

const props = withDefaults(defineProps&lt;Props&gt;(), {
  direction: 'row'
})

const containerClasses = computed(() =&gt; {
  return props.direction === 'col' 
    ? 'flex flex-col w-full'
    : 'flex flex-row justify-between items-center w-full'
})
&lt;/script&gt;</code></pre>
      
      <h2>最佳实践</h2>
      <blockquote>
        <p>始终使用TypeScript进行类型检查，确保代码的健壮性。</p>
      </blockquote>
    </Markdown>
  </div>
</template>
```

## 样式系统

### CSS变量支持

组件使用CSS变量实现主题适配：

```css
/* 基础样式变量 */
:root {
  --base-content: #1f2937;
  --base-100: #ffffff;
  --base-200: #f3f4f6;
  --base-300: #e5e7eb;
  --primary: #3b82f6;
}

/* 深色主题变量 */
.dark {
  --base-content: #f9fafb;
  --base-100: #1f2937;
  --base-200: #374151;
  --base-300: #4b5563;
  --primary: #60a5fa;
}
```

### 响应式设计

```css
/* 移动端适配 */
@media (max-width: 768px) {
  .markdown-container {
    padding: 1rem;
    margin: 0.5rem;
  }
  
  .toc-sidebar {
    position: static;
    width: 100%;
    margin-top: 1rem;
  }
}

/* 桌面端布局 */
@media (min-width: 1024px) {
  .markdown-layout {
    display: flex;
    gap: 2rem;
  }
  
  .toc-sidebar {
    position: sticky;
    top: 2.5rem;
    width: 12.5rem;
  }
}
```

## 高级功能

### 自定义目录样式

```vue
<template>
  <Markdown>
    <template #toc="{ toc }">
      <div class="custom-toc">
        <h3>目录</h3>
        <nav>
          <ul>
            <li v-for="item in toc" :key="item.slug">
              <a :href="`#${item.slug}`" :class="`level-${item.level}`">
                {{ item.title }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </template>
    
    <!-- Markdown内容 -->
  </Markdown>
</template>

<style>
.custom-toc {
  background: var(--base-100);
  border: 1px solid var(--base-200);
  border-radius: 0.5rem;
  padding: 1rem;
}

.custom-toc .level-1 { font-weight: 600; }
.custom-toc .level-2 { margin-left: 1rem; }
.custom-toc .level-3 { margin-left: 2rem; }
</style>
```

### 代码高亮

```vue
<template>
  <Markdown>
    <h1>代码示例</h1>
    
    <pre><code class="language-javascript">
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}
    </code></pre>
    
    <pre><code class="language-python">
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
    </code></pre>
  </Markdown>
</template>
```

### 数学公式支持

```vue
<template>
  <Markdown>
    <h1>数学公式</h1>
    
    <p>行内公式：$E = mc^2$</p>
    
    <p>块级公式：</p>
    <div class="math-block">
      $$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
    </div>
  </Markdown>
</template>
```

## 性能优化

### 懒加载目录

```typescript
// 延迟解析DOM标题，避免阻塞渲染
onMounted(async () => {
  if (props.content) {
    // 内容解析，立即执行
    const parsedToc = parseHeaders(props.content)
    toc.value = convertTocToMarkdownItHeaders(parsedToc)
  } else {
    // DOM解析，延迟执行
    await nextTick()
    parseDOMHeaders()
    
    // 多次重试确保DOM已渲染
    if (toc.value.length === 0) {
      setTimeout(() => parseDOMHeaders(), 100)
      setTimeout(() => parseDOMHeaders(), 500)
      setTimeout(() => parseDOMHeaders(), 1000)
    }
  }
})
```

### 虚拟滚动

```vue
<template>
  <div class="markdown-container">
    <div class="content-area" ref="contentRef">
      <slot />
    </div>
    <div class="toc-area" v-if="toc.length > 0">
      <Catalog :toc="toc" :current-index="currentIndex" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const contentRef = ref<HTMLElement>()
const currentIndex = ref('')

// 监听滚动事件，更新当前激活的目录项
const handleScroll = () => {
  const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let current = ''
  
  headers.forEach(header => {
    const rect = header.getBoundingClientRect()
    if (rect.top <= 100) {
      current = header.id
    }
  })
  
  currentIndex.value = current
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
```

## 依赖要求

- Vue 3 Composition API
- UnoCSS主题系统
- 项目Catalog组件
- 项目Button组件
- 项目Icon组件（可选）

## 注意事项

1. **标题层级**：建议使用连续的标题层级（如h1→h2→h3）
2. **ID唯一性**：确保标题文本能生成唯一的锚点ID
3. **性能考虑**：大量内容时建议使用懒加载或虚拟滚动
4. **样式覆盖**：自定义样式时注意CSS优先级
5. **深色主题**：确保自定义样式支持深色主题切换

## 故障排除

### 目录不显示

```typescript
// 检查标题是否正确解析
const debugInfo = ref({
  headerCount: 0,
  domStatus: '未初始化',
  containerContent: '未检查'
})

// 在parseDOMHeaders中添加调试信息
function parseDOMHeaders() {
  debugInfo.value.domStatus = '正在解析...'
  
  const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  debugInfo.value.headerCount = headers.length
  
  console.log('找到标题数量:', headers.length)
  console.log('标题列表:', Array.from(headers).map(h => h.textContent))
}
```

### 锚点链接不工作

```typescript
// 确保标题有正确的ID
function addHeaderIds() {
  const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  
  headers.forEach((header, index) => {
    const text = header.textContent || ''
    let slug = generateSlug(text)
    
    // 如果slug为空，使用fallback
    if (!slug) {
      slug = `header-${index}`
    }
    
    header.id = slug
  })
}
```

这个Markdown组件提供了完整的文档渲染解决方案，特别适合技术文档、博客文章、API文档等场景使用。