<script setup>
import { inject } from 'vue'
const Message = inject('message')
</script>

# Message 消息组件

Message 是一个轻量级的消息提示组件，用于向用户显示各种类型的通知信息。支持成功、警告、错误和普通消息四种类型，具有优雅的动画效果和主题色彩支持。

## 特性

- 🎨 **主题色彩** - 支持四种消息类型，每种都有独特的主题颜色
- 🎭 **动画效果** - 平滑的滑入滑出动画，提升用户体验
- 📱 **响应式设计** - 自适应不同屏幕尺寸
- 🎯 **精确定位** - 消息显示在窗体中间的中上方位置
- ⏱️ **自动消失** - 可配置的显示时长，默认3秒
- 🔄 **堆叠显示** - 支持多个消息同时显示，自动堆叠
- 🎨 **主题变量** - 使用项目主题颜色变量，支持主题切换

## 使用方式

### 1. 全局注册（推荐，无需导入）
由于 Message 已在全局注册，可以直接使用：

#### 在 Vue 3 Composition API 中
```javascript
// 无需导入，直接使用
const Message = inject('message')
Message.success({ message: '操作成功！' })
```

#### 在模板中
```javascript
// 在模板中直接使用
Message.success({ message: '操作成功！' })
```

#### 在 Options API 中
```javascript
// 通过 this.$message 访问
this.$message.success({ message: '操作成功！' })
```

### 2. 直接导入（可选）
如果需要类型提示或明确依赖，也可以直接导入：
```javascript
import Message from '~/packet/Element/Message/Message'
```

## 基本用法

<div class="flex flex-wrap items-center gap-3">
  <btn @click="Message({ type: 'message', message: 'This is a Message' })">Show Message</btn>
  <btn @click="Message.success({ message: 'This is a Success Message' })">Show Success</btn>
  <btn @click="Message.warning({ message: 'This is a Warning Message' })">Show Warning</btn>
  <btn @click="Message({ type: 'error', message: 'This is Error Message' })">Show ERROR</btn>
</div>

## 使用示例

### 在 Vue 3 Composition API 中使用（推荐）

```vue
<template>
  <div>
    <btn @click="showSuccess">显示成功消息</btn>
    <btn @click="showError">显示错误消息</btn>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// 通过依赖注入获取 Message（无需导入）
const Message = inject('message')

const showSuccess = () => {
  Message.success({ message: '操作成功！' })
}

const showError = () => {
  Message.error({ message: '操作失败，请重试！' })
}
</script>
```

### 在 Options API 中使用

```vue
<template>
  <div>
    <btn @click="showSuccess">显示成功消息</btn>
    <btn @click="showError">显示错误消息</btn>
  </div>
</template>

<script>
export default {
  methods: {
    showSuccess() {
      this.$message.success({ message: '操作成功！' })
    },
    showError() {
      this.$message.error({ message: '操作失败，请重试！' })
    }
  }
}
</script>
```

### 在模板中直接使用

```vue
<template>
  <div>
    <btn @click="Message.success({ message: '操作成功！' })">成功</btn>
    <btn @click="Message.error({ message: '操作失败！' })">失败</btn>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const Message = inject('message')
</script>
```

## 消息类型

### 成功消息 (Success)
```javascript
Message.success({ message: '操作成功！' })
```

### 警告消息 (Warning)
```javascript
Message.warning({ message: '请注意相关风险！' })
```

### 普通消息 (Message)
```javascript
Message({ type: 'message', message: '这是一条普通消息' })
```

### 错误消息 (Error)
```javascript
Message({ type: 'error', message: '操作失败，请重试！' })
```

## 高级用法

### 自定义显示时长
```javascript
// 显示5秒
Message.success({ 
  message: '操作成功！', 
  duration: 5000 
})

// 显示1秒
Message.warning({ 
  message: '快速提示', 
  duration: 1000 
})
```

### 链式调用
```javascript
// 连续显示多个消息
Message.success({ message: '第一步完成' })
setTimeout(() => {
  Message.warning({ message: '第二步进行中...' })
}, 1000)
setTimeout(() => {
  Message.success({ message: '全部完成！' })
}, 2000)
```

## API

### Message 函数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| options | MessageOptions | - | 消息配置对象 |

### MessageOptions

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | string | 'message' | 消息类型：'success' \| 'warning' \| 'message' \| 'error' |
| message | string | 'message' | 消息内容 |
| duration | number | 3000 | 显示时长（毫秒） |

### 快捷方法

| 方法 | 参数 | 说明 |
|------|------|------|
| Message.success | MessageOptions | 显示成功消息 |
| Message.warning | MessageOptions | 显示警告消息 |
| Message.error | MessageOptions | 显示错误消息 |

## 样式定制

### 主题颜色

Message 组件使用项目主题颜色变量：

- **Success**: `var(--success)` - 绿色
- **Primary**: `var(--primary)` - 主题主色（蓝色）
- **Warning**: `var(--warning)` - 橙色
- **Error**: `var(--error)` - 红色

### 自定义样式

```css
/* 自定义消息样式 */
.msg {
  border-radius: 8px; /* 自定义圆角 */
  font-size: 16px;    /* 自定义字体大小 */
  padding: 12px 24px; /* 自定义内边距 */
}
```

## 技术实现

### 核心特性

1. **Vue 3 Composition API** - 使用 `<script setup>` 和响应式 API
2. **UnoCSS 原子类** - 使用原子 CSS 类进行样式管理
3. **CSS 变量** - 支持主题切换和动态颜色
4. **Transition 组件** - 内置 Vue 过渡动画
5. **动态定位** - 支持多个消息堆叠显示
6. **多种导入方式** - 支持直接导入、依赖注入和全局属性

### 文件结构

```
src/packet/Element/Message/
├── Message.vue      # 组件文件
├── Message.ts       # 主要逻辑和类型定义
└── Message.md       # 文档文件
```

### 全局注册说明

Message 组件已在 `src/packet/Element/index.ts` 中全局注册：

```javascript
// 全局注册 Message 函数
app.config.globalProperties.$message = Message
app.provide('message', Message)
```

**优势**：
- ✅ **无需导入** - 在任何组件中都可以直接使用
- ✅ **类型安全** - 通过 `inject('message')` 获取类型提示
- ✅ **全局访问** - 通过 `this.$message` 在 Options API 中使用
- ✅ **依赖注入** - 通过 `inject('message')` 在 Composition API 中使用

### 动画效果

```css
.slide-fade-enter-active {
  transition: all 0.3s ease-in;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
```

### 响应式设计

- 消息宽度固定为 `16rem` (256px)
- 高度固定为 `2rem` (32px)
- 水平居中显示
- 垂直位置在窗体中间的中上方

## 最佳实践

### 1. 消息内容
- 保持消息简洁明了
- 使用积极正面的语言
- 避免技术术语，使用用户友好的表达

### 2. 显示时机
- 在用户操作完成后立即显示
- 避免频繁显示消息，防止干扰用户
- 重要消息可以延长显示时间

### 3. 消息类型选择
- **Success**: 操作成功、数据保存完成等
- **Warning**: 需要注意但不影响操作的情况
- **Message**: 一般性提示信息
- **Error**: 操作失败、网络错误等

### 4. 性能优化
- 避免同时显示过多消息
- 合理设置显示时长
- 及时清理已隐藏的消息实例

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 注意事项

1. **全局注册**: Message 已全局注册，无需在每个组件中导入
2. **使用方式**: 推荐使用 `inject('message')` 或 `this.$message` 访问
3. **z-index 层级**: 消息组件使用 `z-100` 确保显示在最上层
4. **主题依赖**: 需要确保项目主题变量正确定义
5. **内存管理**: 组件会自动清理定时器和 DOM 节点
6. **响应式**: 消息位置会根据屏幕尺寸自动调整

## 更新日志

### v1.0.0
- 初始版本发布
- 支持四种消息类型
- 实现主题色彩支持
- 添加动画效果和响应式设计