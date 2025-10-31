# Menu 菜单组件

Menu 是一个灵活的菜单组件，支持垂直和水平布局、响应式设计、多种样式变体等功能。

## 安装

```bash
npm install sectionui
```

## 基础用法

```javascript
import { Menu } from 'sectionui'
```

## 快速开始

Menu 组件的基本用法非常简单，只需要在 `<Menu>` 标签内添加菜单项即可：

```vue
<Menu>
  <btn clean>菜单项 1</btn>
  <btn clean>菜单项 2</btn>
  <btn clean>菜单项 3</btn>
</Menu>
```

## 示例展示

### Basic

<div class="flex flex-wrap items-center gap-3">
  <Menu shadow>
    <btn clean>Item 1</btn>
    <btn clean>Item 2</btn>
    <btn clean>Item 3</btn>
  </Menu>
</div>

```
  <Menu shadow>
    <btn clean>Item 1</btn>
    <btn clean>Item 2</btn>
    <btn clean>Item 3</btn>
  </Menu>
```

### Hover border

<div class="flex flex-wrap items-center gap-3">
  <Menu hover-border rounded shadow>
    <btn clean>Item 1</btn>
    <btn clean>Item 2</btn>
    <btn clean>Item 3</btn>
  </Menu>
</div>

```
  <Menu hover-border rounded shadow>
    <btn clean>Item 1</btn>
    <btn clean>Item 2</btn>
    <btn clean>Item 3</btn>
  </Menu>
```

### Rounded

<div class="flex flex-wrap items-center gap-3">
  <Menu rounded shadow>
    <btn clean>
      <icn name="user" light lg />
      Item 1
    </btn>
    <btn clean>
      <icn name="timer" light lg />
      Item 2
    </btn>
    <btn clean>
      <icn name="gem" light lg />
      Item 3
    </btn>
  </Menu>
</div>

```
  <Menu rounded padding shadow>
    <btn clean>
      <icn name="user" light lg />
        Item 1
    </btn>
    <btn clean>
      <icn name="timer" light lg />
        Item 2
    </btn>
    <btn clean>
      <icn name="gem" light lg />
        Item 3
    </btn>
  </Menu>
```

### Compact

<div class="flex flex-wrap items-center gap-3">
  <Menu compact rounded shadow>
    <btn clean>Item 1</btn>
    <btn clean>Item 2</btn>
    <btn clean>Item 3</btn>
  </Menu>
</div>

```
  <Menu compact rounded shadow>
    <btn clean>Item 1</btn>
    <btn clean>Item 2</btn>
    <btn clean>Item 3</btn>
  </Menu>
```
### Compact responsive

Compact if screen is smaller then large screen (lg).

<div class="flex flex-wrap items-center gap-3">
  <Menu compact="lg" rounded shadow>
    <btn clean>Responsive 1</btn>
    <btn clean>Responsive 2</btn>
    <btn clean>Responsive 3</btn>
  </Menu>
</div>

```
  <Menu compact="lg" rounded shadow>
    <btn clean>Responsive 1</btn>
    <btn clean>Responsive 2</btn>
    <btn clean>Responsive 3</btn>
  </Menu>
```
### Horizontal

<div class="flex flex-wrap items-center gap-3">
  <Menu horizontal rounded class="w-auto" shadow>
    <btn clean>Item 1</btn>
    <btn clean>Item 2</btn>
    <btn clean>Item 3</btn>
  </Menu>
</div>

```
  <Menu horizontal rounded class="w-auto">
    <btn clean>Item 1</btn>
    <btn clean>Item 2</btn>
    <btn clean>Item 3</btn>
  </Menu>
```

### Horizontal responsive

Horizontal by default and vertical on small screen (sm).


  <div class="flex flex-wrap items-center gap-3">
    <Menu horizontal="sm" rounded class="w-auto" shadow>
      <btn clean>Responsive 1</btn>
      <btn clean>Responsive 2</btn>
      <btn clean>Responsive 3</btn>
    </Menu>
  </div>


```
  <Menu horizontal="sm" rounded class="w-auto">
    <btn clean>Responsive 1</btn>
    <btn clean>Responsive 2</btn>
    <btn clean>Responsive 3</btn>
  </Menu>
```

### Only icons

  <div class="flex flex-wrap items-center gap-3">
    <Menu rounded class="w-auto" shadow>
      <btn clean>
        <icn name="user" light lg />
      </btn>
      <btn clean>
        <icn name="timer" light lg />
      </btn>
      <btn clean>
        <icn name="gem" light lg />
      </btn>
    </Menu>
  </div>

```
  <Menu rounded padding class="w-auto" shadow>
    <btn clean>
      <icn name="user" light lg />
    </btn>
    <btn clean>
      <icn name="timer" light lg />
    </btn>
    <btn clean>
      <icn name="gem" light lg />
    </btn>
  </Menu>
```

### Menu title

  <div class="flex flex-wrap items-center gap-3">
    <Menu padding shadow>
      <span class="menu-title">Category</span>
      <btn clean>Item 1</btn>
      <btn clean>Item 2</btn>
      <span class="menu-title">Other Category</span>
      <btn clean>Item 3</btn>
      <btn clean>Item 4</btn>
    </Menu>
  </div>

```
  <Menu padding shadow>
    <span class="menu-title">Category</span>
    <btn clean>Item 1</btn>
    <btn clean>Item 2</btn>
    <span class="menu-title">Other Category</span>
    <btn clean>Item 3</btn>
    <btn clean>Item 4</btn>
  </Menu>
```

### Disabled

<div class="flex flex-wrap items-center gap-3">
  <Menu rounded>
    <btn clean class="disabled">Disabled 1</btn>
    <btn clean class="disabled">Disabled 2</btn>
    <btn clean class="disabled">Disabled 3</btn>
  </Menu>
</div>

```
  <Menu rounded shadow>
    <btn clean class="disabled">Disabled 1</btn>
    <btn clean class="disabled">Disabled 2</btn>
    <btn clean class="disabled">Disabled 3</btn>
  </Menu>
```

## API 参考

### Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `compact` | `Boolean \| String` | `false` | 紧凑模式，支持响应式断点 `sm`、`md`、`lg`、`xl` |
| `horizontal` | `Boolean \| String` | `false` | 水平布局，支持响应式断点 `sm`、`md`、`lg`、`xl` |
| `shadow` | `Boolean` | `false` | 是否显示阴影效果 |
| `rounded` | `Boolean` | `false` | 是否显示圆角边框 |
| `padding` | `Boolean` | `false` | 是否添加内边距，并为菜单项添加圆角 |
| `hoverBorder` | `Boolean` | `false` | 是否在悬停时显示左侧边框 |

### 响应式断点

Menu 组件支持以下响应式断点：

- `sm`: 640px 及以上
- `md`: 768px 及以上  
- `lg`: 1024px 及以上
- `xl`: 1280px 及以上

### 使用示例

#### 基础菜单

```vue
<Menu>
  <btn clean>首页</btn>
  <btn clean>关于我们</btn>
  <btn clean>联系我们</btn>
</Menu>
```

#### 带图标的菜单

```vue
<Menu rounded shadow>
  <btn clean>
    <icn name="home" light lg />
    首页
  </btn>
  <btn clean>
    <icn name="user" light lg />
    用户中心
  </btn>
  <btn clean>
    <icn name="settings" light lg />
    设置
  </btn>
</Menu>
```

#### 水平菜单

```vue
<Menu horizontal rounded shadow>
  <btn clean>首页</btn>
  <btn clean>产品</btn>
  <btn clean>服务</btn>
  <btn clean>关于</btn>
</Menu>
```

#### 响应式菜单

```vue
<!-- 在小屏幕上紧凑，大屏幕上正常 -->
<Menu compact="lg" horizontal="sm" rounded shadow>
  <btn clean>首页</btn>
  <btn clean>产品</btn>
  <btn clean>服务</btn>
</Menu>
```

#### 带标题的分组菜单

```vue
<Menu padding shadow>
  <span class="menu-title">主要功能</span>
  <btn clean>仪表板</btn>
  <btn clean>项目管理</btn>
  <span class="menu-title">系统设置</span>
  <btn clean>用户管理</btn>
  <btn clean>系统配置</btn>
</Menu>
```

#### 悬停边框效果

```vue
<Menu hover-border rounded shadow>
  <btn clean>选项 1</btn>
  <btn clean>选项 2</btn>
  <btn clean>选项 3</btn>
</Menu>
```

### 样式类名

Menu 组件会自动应用以下 CSS 类名：

- `.menu`: 基础菜单样式
- `.menu.compact`: 紧凑模式
- `.menu.compact-{breakpoint}`: 响应式紧凑模式
- `.menu.horizontal`: 水平布局
- `.menu.horizontal-{breakpoint}`: 响应式水平布局
- `.menu.shadow`: 阴影效果
- `.menu.rounded`: 圆角边框
- `.menu.padding`: 内边距
- `.menu.hover-border`: 悬停边框效果

### 自定义样式

你可以通过 CSS 变量来自定义菜单的样式：

```css
.menu {
  --menu-bg: #ffffff;
  --menu-text: #333333;
  --menu-hover-bg: #f5f5f5;
  --menu-active-bg: #007bff;
  --menu-active-text: #ffffff;
}
```

### Dark 模式支持

Menu 组件完全支持 Dark 模式，会自动适配主题颜色：

- **菜单项文字**：使用 `var(--base-content)` 确保在 Light/Dark 模式下都有良好的对比度
- **菜单标题**：在 Dark 模式下使用半透明白色，提供层次感
- **悬停效果**：在 Dark 模式下使用半透明白色背景
- **激活状态**：使用主题色变量，自动适配当前主题

```vue
<!-- Dark 模式会自动应用，无需额外配置 -->
<Menu shadow rounded>
  <span class="menu-title">导航菜单</span>
  <btn clean>首页</btn>
  <btn clean>产品</btn>
  <btn clean>关于我们</btn>
</Menu>
```

### 事件

Menu 组件本身不触发事件，但菜单项（如 `<btn>` 组件）可以绑定点击事件：

```vue
<Menu>
  <btn clean @click="handleClick('home')">首页</btn>
  <btn clean @click="handleClick('about')">关于我们</btn>
</Menu>
```

### 注意事项

1. **菜单项内容**: 建议使用 `<btn clean>` 组件作为菜单项，以获得最佳的用户体验
2. **响应式设计**: 使用响应式断点时，确保在不同屏幕尺寸下测试效果
3. **无障碍访问**: 菜单项应该具有适当的 `aria-label` 或文本内容
4. **键盘导航**: 菜单支持键盘导航，用户可以使用方向键在菜单项之间移动

### 最佳实践

1. **保持简洁**: 避免在单个菜单中放置过多项目
2. **合理分组**: 使用标题来组织相关的菜单项
3. **响应式考虑**: 在移动设备上考虑使用紧凑模式
4. **视觉层次**: 使用图标和文字来增强菜单的可读性
5. **交互反馈**: 确保菜单项有适当的悬停和激活状态






