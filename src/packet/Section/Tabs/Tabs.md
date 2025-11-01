# Tabs 标签页组件

一个功能强大、易于使用的标签页组件，用于在不同内容区域之间进行切换。支持多个标签页、默认激活标签、响应式布局和流畅的切换动画。

## 特性

- 📑 **多标签支持**: 支持任意数量的标签页
- 🎯 **默认激活**: 可设置默认激活的标签页
- 📱 **响应式布局**: 标签栏自动横向滚动，适配移动端
- 🎨 **简洁样式**: 基于 UnoCSS 的现代化设计
- ⚡ **高性能**: 使用 Vue 3 组合式 API，零运行时开销
- 🔄 **平滑切换**: 内置状态管理和切换动画
- ♿ **无障碍支持**: 使用原生 radio 按钮，支持键盘导航

## 安装

```ts
import { Tabs, TabPane } from 'sectum'
// 或者
import Tabs from 'sectum'
import TabPane from 'sectum'
```

## Basic 基础用法

最简单的用法，创建一个包含多个标签页的组件。

<Tabs name="basic-tabs">
  <TabPane name="tab1" tab="标签页 1">
    <div class="p-4">
      <h3 class="text-xl font-bold mb-2">这是第一个标签页</h3>
      <p class="text-base-content/70">这里是标签页 1 的内容。你可以在这里放置任何内容。</p>
    </div>
  </TabPane>
  <TabPane name="tab2" tab="标签页 2">
    <div class="p-4">
      <h3 class="text-xl font-bold mb-2">这是第二个标签页</h3>
      <p class="text-base-content/70">这里是标签页 2 的内容。支持丰富的 HTML 结构和组件。</p>
    </div>
  </TabPane>
  <TabPane name="tab3" tab="标签页 3">
    <div class="p-4">
      <h3 class="text-xl font-bold mb-2">这是第三个标签页</h3>
      <p class="text-base-content/70">这里是标签页 3 的内容。可以放置表单、列表、图片等任何元素。</p>
    </div>
  </TabPane>
</Tabs>

```vue
<template>
  <Tabs name="basic-tabs">
    <TabPane name="tab1" tab="标签页 1">
      <div class="p-4">
        <h3 class="text-xl font-bold mb-2">这是第一个标签页</h3>
        <p>这里是标签页 1 的内容。</p>
      </div>
    </TabPane>
    <TabPane name="tab2" tab="标签页 2">
      <div class="p-4">
        <h3 class="text-xl font-bold mb-2">这是第二个标签页</h3>
        <p>这里是标签页 2 的内容。</p>
      </div>
    </TabPane>
    <TabPane name="tab3" tab="标签页 3">
      <div class="p-4">
        <h3 class="text-xl font-bold mb-2">这是第三个标签页</h3>
        <p>这里是标签页 3 的内容。</p>
      </div>
    </TabPane>
  </Tabs>
</template>
```

## Default Tab 默认激活标签

使用 `default` 属性设置默认激活的标签页。如果不设置，默认显示第一个标签页。

<Tabs name="default-tabs" default="tab2">
  <TabPane name="tab1" tab="第一个">
    <div class="p-4">
      <p class="text-base-content/70">这是第一个标签页（默认不会激活）</p>
    </div>
  </TabPane>
  <TabPane name="tab2" tab="第二个">
    <div class="p-4">
      <p class="text-primary font-semibold">这是第二个标签页（默认激活）</p>
    </div>
  </TabPane>
  <TabPane name="tab3" tab="第三个">
    <div class="p-4">
      <p class="text-base-content/70">这是第三个标签页</p>
    </div>
  </TabPane>
</Tabs>

```vue
<template>
  <Tabs name="default-tabs" default="tab2">
    <TabPane name="tab1" tab="第一个">
      这是第一个标签页
    </TabPane>
    <TabPane name="tab2" tab="第二个">
      这是第二个标签页（默认激活）
    </TabPane>
    <TabPane name="tab3" tab="第三个">
      这是第三个标签页
    </TabPane>
  </Tabs>
</template>
```

## Multiple Tabs 多个标签页

支持创建多个独立的标签页组，通过不同的 `name` 属性区分。

<div class="space-y-6">
  <div>
    <h4 class="mb-2 font-semibold">第一个标签页组</h4>
    <Tabs name="tabs-group-1">
      <TabPane name="g1-tab1" tab="用户">
        <div class="p-4 bg-base-200 rounded-lg">
          <p>用户管理内容</p>
        </div>
      </TabPane>
      <TabPane name="g1-tab2" tab="设置">
        <div class="p-4 bg-base-200 rounded-lg">
          <p>设置管理内容</p>
        </div>
      </TabPane>
    </Tabs>
  </div>
  
  <div>
    <h4 class="mb-2 font-semibold">第二个标签页组</h4>
    <Tabs name="tabs-group-2" default="g2-tab2">
      <TabPane name="g2-tab1" tab="文档">
        <div class="p-4 bg-base-200 rounded-lg">
          <p>文档内容</p>
        </div>
      </TabPane>
      <TabPane name="g2-tab2" tab="帮助">
        <div class="p-4 bg-base-200 rounded-lg">
          <p>帮助内容</p>
        </div>
      </TabPane>
    </Tabs>
  </div>
</div>

```vue
<template>
  <div class="space-y-6">
    <div>
      <h4>第一个标签页组</h4>
      <Tabs name="tabs-group-1">
        <TabPane name="g1-tab1" tab="用户">
          用户管理内容
        </TabPane>
        <TabPane name="g1-tab2" tab="设置">
          设置管理内容
        </TabPane>
      </Tabs>
    </div>
    
    <div>
      <h4>第二个标签页组</h4>
      <Tabs name="tabs-group-2" default="g2-tab2">
        <TabPane name="g2-tab1" tab="文档">
          文档内容
        </TabPane>
        <TabPane name="g2-tab2" tab="帮助">
          帮助内容
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
```

## Rich Content 丰富内容

标签页内容可以包含任何 Vue 组件和 HTML 元素，包括表单、列表、图片等。

<Tabs name="rich-content">
  <TabPane name="form" tab="表单">
    <div class="p-4 space-y-4">
      <div>
        <label class="block mb-2 text-sm font-medium">用户名</label>
        <input type="text" class="w-full px-3 py-2 border border-base-300 rounded-lg" placeholder="请输入用户名" />
      </div>
      <div>
        <label class="block mb-2 text-sm font-medium">邮箱</label>
        <input type="email" class="w-full px-3 py-2 border border-base-300 rounded-lg" placeholder="请输入邮箱" />
      </div>
      <button class="px-4 py-2 bg-primary text-white rounded-lg">提交</button>
    </div>
  </TabPane>
  <TabPane name="list" tab="列表">
    <div class="p-4">
      <ul class="space-y-2">
        <li class="p-3 bg-base-200 rounded-lg">列表项 1</li>
        <li class="p-3 bg-base-200 rounded-lg">列表项 2</li>
        <li class="p-3 bg-base-200 rounded-lg">列表项 3</li>
      </ul>
    </div>
  </TabPane>
  <TabPane name="info" tab="信息">
    <div class="p-4">
      <div class="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <p class="text-primary font-semibold mb-2">重要提示</p>
        <p class="text-base-content/70">这里可以放置重要信息或通知内容。</p>
      </div>
    </div>
  </TabPane>
</Tabs>

```vue
<template>
  <Tabs name="rich-content">
    <TabPane name="form" tab="表单">
      <div class="p-4 space-y-4">
        <input type="text" placeholder="用户名" />
        <input type="email" placeholder="邮箱" />
        <button>提交</button>
      </div>
    </TabPane>
    <TabPane name="list" tab="列表">
      <ul>
        <li>列表项 1</li>
        <li>列表项 2</li>
        <li>列表项 3</li>
      </ul>
    </TabPane>
    <TabPane name="info" tab="信息">
      <div class="p-4">
        <p>重要提示：这里可以放置重要信息。</p>
      </div>
    </TabPane>
  </Tabs>
</template>
```

## Long Tabs 长标签

当标签页数量较多或标签文本较长时，标签栏会自动启用横向滚动功能。

<Tabs name="long-tabs">
  <TabPane name="tab1" tab="这是一个非常长的标签页名称">
    <div class="p-4">
      <p>第一个标签页的内容</p>
    </div>
  </TabPane>
  <TabPane name="tab2" tab="另一个长标签名称">
    <div class="p-4">
      <p>第二个标签页的内容</p>
    </div>
  </TabPane>
  <TabPane name="tab3" tab="第三个标签">
    <div class="p-4">
      <p>第三个标签页的内容</p>
    </div>
  </TabPane>
  <TabPane name="tab4" tab="第四个标签页">
    <div class="p-4">
      <p>第四个标签页的内容</p>
    </div>
  </TabPane>
  <TabPane name="tab5" tab="第五个标签">
    <div class="p-4">
      <p>第五个标签页的内容</p>
    </div>
  </TabPane>
</Tabs>

```vue
<template>
  <Tabs name="long-tabs">
    <TabPane name="tab1" tab="这是一个非常长的标签页名称">
      第一个标签页的内容
    </TabPane>
    <TabPane name="tab2" tab="另一个长标签名称">
      第二个标签页的内容
    </TabPane>
    <TabPane name="tab3" tab="第三个标签">
      第三个标签页的内容
    </TabPane>
    <TabPane name="tab4" tab="第四个标签页">
      第四个标签页的内容
    </TabPane>
    <TabPane name="tab5" tab="第五个标签">
      第五个标签页的内容
    </TabPane>
  </Tabs>
</template>
```

## API 文档

### Tabs Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| `name` | 标签页组的唯一标识符，用于区分不同的标签页组 | `string` | - | ✅ |
| `default` | 默认激活的标签页名称（对应 TabPane 的 name 属性） | `string` | `''` | ❌ |

### TabPane Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| `name` | 标签页的唯一标识符，在同一 Tabs 组件内必须唯一 | `string` | - | ✅ |
| `tab` | 标签页的显示文本 | `string` | - | ✅ |

### Tabs 工作原理

1. **标签页切换**: Tabs 组件使用 Vue 的响应式系统管理当前激活的标签页
2. **内容渲染**: 只渲染当前激活的标签页内容，其他标签页内容被隐藏
3. **样式管理**: 激活的标签页会有下划线边框标识（`border-b-2`）
4. **响应式**: 标签栏支持横向滚动，在移动端和桌面端都能良好显示

### 注意事项

- 每个 `Tabs` 组件的 `name` 属性必须是唯一的，用于区分不同的标签页组
- 每个 `TabPane` 的 `name` 属性在其父 `Tabs` 组件内必须唯一
- 如果设置了 `default` 属性，确保对应的 `TabPane` 存在，否则会显示第一个标签页
- 标签页内容支持任何 Vue 组件和 HTML 元素，包括嵌套的 Tabs 组件

## 最佳实践

1. **命名规范**: 使用有意义的 `name` 值，如 `"user-tabs"` 而不是 `"123"`
2. **默认标签**: 合理设置 `default` 属性，提升用户体验
3. **内容组织**: 将相关内容组织到同一个标签页中，避免标签页过多
4. **响应式设计**: 考虑移动端显示，标签文本不宜过长
5. **无障碍**: 组件已支持键盘导航，确保使用语义化的标签文本
