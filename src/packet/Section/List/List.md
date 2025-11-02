# List 列表组件

List 是一个灵活的列表组件，支持垂直和水平布局、分割线、边框、阴影等多种样式。适用于展示数据列表、导航列表等场景。

## 特性

- 🎨 **多种布局** - 支持垂直和水平布局
- 📏 **灵活间距** - 支持多种间距大小配置
- 🔲 **分割线** - 可选择显示列表项之间的分割线
- 🎯 **样式变体** - 支持边框、阴影、圆角等多种样式
- 🌙 **深色模式** - 完全支持深色模式，自动适配主题
- 🎭 **灵活配置** - 通过 props 轻松配置各种样式和行为

## 安装

```ts
import { List } from 'sectum'
// 或者
import List from 'sectum'
```

## 快速开始

List 组件的基本用法非常简单，只需要在 `<List>` 标签内添加列表项即可：

```vue
<List>
  <li>列表项 1</li>
  <li>列表项 2</li>
  <li>列表项 3</li>
</List>
```

## 示例展示

### Basic

<div class="flex flex-wrap items-center gap-3">
  <List>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
  </List>
</div>

```
  <List>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
  </List>
```

### With Shadow

<div class="flex flex-wrap items-center gap-3">
  <List shadow rounded>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
  </List>
</div>

```
  <List shadow rounded>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
  </List>
```

### With Border

<div class="flex flex-wrap items-center gap-3">
  <List bordered rounded>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
  </List>
</div>

```
  <List bordered rounded>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
  </List>
```

### With Divider

<div class="flex flex-wrap items-center gap-3">
  <List divider shadow rounded>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
  </List>
</div>

```
  <List divider shadow rounded>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
  </List>
```

### Horizontal

<div class="flex flex-wrap items-center gap-3">
  <List direction="horizontal" divider shadow rounded class="w-auto">
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
  </List>
</div>

```
  <List direction="horizontal" divider shadow rounded class="w-auto">
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
  </List>
```

### Spacing

<div class="flex flex-wrap items-center gap-3">
  <List spacing="xs" shadow rounded>
    <li>间距 xs</li>
    <li>间距 xs</li>
    <li>间距 xs</li>
  </List>
  <List spacing="sm" shadow rounded>
    <li>间距 sm</li>
    <li>间距 sm</li>
    <li>间距 sm</li>
  </List>
  <List spacing="lg" shadow rounded>
    <li>间距 lg</li>
    <li>间距 lg</li>
    <li>间距 lg</li>
  </List>
</div>

```
  <List spacing="xs" shadow rounded>
    <li>间距 xs</li>
    <li>间距 xs</li>
    <li>间距 xs</li>
  </List>
  <List spacing="sm" shadow rounded>
    <li>间距 sm</li>
    <li>间距 sm</li>
    <li>间距 sm</li>
  </List>
  <List spacing="lg" shadow rounded>
    <li>间距 lg</li>
    <li>间距 lg</li>
    <li>间距 lg</li>
  </List>
```

### With Buttons

<div class="flex flex-wrap items-center gap-3">
  <List shadow rounded>
    <li>
      <btn clean class="w-full text-left">操作 1</btn>
    </li>
    <li>
      <btn clean class="w-full text-left">操作 2</btn>
    </li>
    <li>
      <btn clean class="w-full text-left">操作 3</btn>
    </li>
  </List>
</div>

```
  <List shadow rounded>
    <li>
      <btn clean class="w-full text-left">操作 1</btn>
    </li>
    <li>
      <btn clean class="w-full text-left">操作 2</btn>
    </li>
    <li>
      <btn clean class="w-full text-left">操作 3</btn>
    </li>
  </List>
```

### Complex Content

<div class="flex flex-wrap items-center gap-3">
  <List shadow rounded class="w-80">
    <li class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content">
        <icn name="user" light />
      </div>
      <div class="flex-1">
        <div class="font-semibold">用户名</div>
        <div class="text-sm text-base-content/70">user@example.com</div>
      </div>
    </li>
    <li class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-content">
        <icn name="user" light />
      </div>
      <div class="flex-1">
        <div class="font-semibold">用户名</div>
        <div class="text-sm text-base-content/70">user@example.com</div>
      </div>
    </li>
    <li class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-content">
        <icn name="user" light />
      </div>
      <div class="flex-1">
        <div class="font-semibold">用户名</div>
        <div class="text-sm text-base-content/70">user@example.com</div>
      </div>
    </li>
  </List>
</div>

```
  <List shadow rounded class="w-80">
    <li class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content">
        <icn name="user" light />
      </div>
      <div class="flex-1">
        <div class="font-semibold">用户名</div>
        <div class="text-sm text-base-content/70">user@example.com</div>
      </div>
    </li>
    <li class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-content">
        <icn name="user" light />
      </div>
      <div class="flex-1">
        <div class="font-semibold">用户名</div>
        <div class="text-sm text-base-content/70">user@example.com</div>
      </div>
    </li>
    <li class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-content">
        <icn name="user" light />
      </div>
      <div class="flex-1">
        <div class="font-semibold">用户名</div>
        <div class="text-sm text-base-content/70">user@example.com</div>
      </div>
    </li>
  </List>
```

## API 参考

### Props 属性

| 属性名      | 类型                                    | 默认值      | 说明                           |
| ---------- | --------------------------------------- | ----------- | ------------------------------ |
| `direction` | `'vertical' \| 'horizontal'`            | `'vertical'` | 列表方向                       |
| `spacing`   | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`        | 列表项间距                     |
| `divider`   | `Boolean`                               | `false`     | 是否显示分割线                 |
| `bordered`  | `Boolean`                               | `false`     | 是否显示边框                   |
| `shadow`    | `Boolean`                               | `false`     | 是否显示阴影                   |
| `rounded`   | `Boolean`                               | `false`     | 是否显示圆角                   |
| `bg`        | `String`                                | `'base-200'` | 背景颜色类名                   |

### 使用示例

#### 基础列表

```vue
<List>
  <li>项目 1</li>
  <li>项目 2</li>
  <li>项目 3</li>
</List>
```

#### 带分割线的列表

```vue
<List divider shadow rounded>
  <li>项目 1</li>
  <li>项目 2</li>
  <li>项目 3</li>
</List>
```

#### 水平列表

```vue
<List direction="horizontal" divider class="w-auto">
  <li>项目 1</li>
  <li>项目 2</li>
  <li>项目 3</li>
</List>
```

#### 不同间距

```vue
<List spacing="xs" shadow rounded>
  <li>紧凑间距</li>
  <li>紧凑间距</li>
</List>

<List spacing="lg" shadow rounded>
  <li>宽松间距</li>
  <li>宽松间距</li>
</List>
```

#### 带边框的列表

```vue
<List bordered rounded>
  <li>项目 1</li>
  <li>项目 2</li>
  <li>项目 3</li>
</List>
```

## 注意事项

- List 组件会自动移除默认的列表样式（`list-style: none`）
- 列表项可以使用任何内容，包括按钮、图标、图片等
- 建议使用 `shadow` 和 `rounded` 组合以获得更好的视觉效果
- 水平列表需要设置合适的宽度（使用 `class="w-auto"` 或自定义宽度）
