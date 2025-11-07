# FullScreen 全屏功能组件

FullScreen 全屏功能组件提供完整的全屏 API 封装，支持原生全屏和模拟全屏两种模式，兼容所有主流浏览器。适用于视频播放器、图片查看器、文档编辑器等需要全屏体验的场景。

## 特性

- 🖥️ **原生全屏** - 支持浏览器原生全屏 API
- 🎭 **模拟全屏** - 支持通过 CSS 样式模拟全屏效果
- 🌐 **浏览器兼容** - 自动适配 Chrome、Firefox、Safari、Edge 等主流浏览器
- ⌨️ **键盘支持** - 支持 ESC 键退出全屏，F11 键切换全屏
- 🎯 **灵活控制** - 提供进入、退出、切换三种全屏控制方法
- 📱 **响应式** - 支持任意元素全屏，不限于根元素
- 🎨 **自定义样式** - 模拟全屏模式支持自定义定位和层级
- 🎨 **内置按钮** - 提供默认全屏切换按钮，包含自动切换的图标
- ⚡ **开箱即用** - 无需自定义插槽即可使用，支持通过 `class` 属性自定义样式

## 安装

```ts
import { FullScreen } from 'sectum'
// 或者
import FullScreen from 'sectum'
```

## 基础用法

### 导入组件

```typescript
import FullScreen from '~/packet/Pattern/FullScreen/FullScreen.vue'
```

### 基础示例 - 使用默认按钮

组件内置了默认的全屏切换按钮，包含 expand/compress 图标，可以直接使用：

```vue
<template>
  <FullScreen 
    class="hover:text-primary flex items-center justify-center w-full h-12"
    @fullscreenchange="handleFullscreenChange"
  />
</template>

<script setup lang="ts">
import FullScreen from '~/packet/Pattern/FullScreen/FullScreen.vue'

const handleFullscreenChange = (isFullscreen: boolean) => {
  console.log('全屏状态变化:', isFullscreen)
}
</script>
```

### 自定义内容示例

如果需要自定义按钮样式或内容，可以使用插槽：

```vue
<template>
  <FullScreen @fullscreenchange="handleFullscreenChange">
    <template #default="{ isFullscreen, enter, exit, toggle }">
      <div class="flex gap-2">
        <btn @click="enter">进入全屏</btn>
        <btn @click="exit">退出全屏</btn>
        <btn @click="toggle">切换全屏</btn>
        <span>状态: {{ isFullscreen ? '全屏' : '窗口' }}</span>
      </div>
    </template>
  </FullScreen>
</template>

<script setup lang="ts">
import FullScreen from '~/packet/Pattern/FullScreen/FullScreen.vue'

const handleFullscreenChange = (isFullscreen: boolean) => {
  console.log('全屏状态变化:', isFullscreen)
}
</script>
```

## 属性配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `target` | `HTMLElement` | `document.documentElement` | 要全屏显示的目标元素 |
| `immersive` | `Boolean` | `true` | 是否使用原生全屏API |
| `position` | `String` | - | 模拟全屏时的定位样式 |
| `zIndex` | `String` | - | 模拟全屏时的层级样式 |
| `item` | `Boolean \| String` | `true` | 按钮的 item 属性，用于样式控制 |
| `class` | `String` | `'hover:text-primary flex items-center justify-center w-full h-12'` | 默认按钮的 CSS 类名 |

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `fullscreenchange` | `isFullscreen: boolean` | 全屏状态变化时触发 |

## 插槽

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| `default` | `{ isFullscreen, enter, exit, toggle }` | 默认插槽，提供全屏控制方法。如果不提供插槽内容，组件会使用内置的默认按钮 |

### 插槽参数说明

- `isFullscreen`: 当前是否处于全屏状态
- `enter`: 进入全屏的方法
- `exit`: 退出全屏的方法  
- `toggle`: 切换全屏状态的方法

### 默认按钮

当不使用插槽时，组件会自动渲染一个默认按钮，包含：
- **图标**: 根据全屏状态自动切换 `expand`（展开）和 `compress`（压缩）图标
- **样式**: 可通过 `class` 属性自定义按钮样式
- **行为**: 点击按钮自动切换全屏状态

## 使用示例

### 工具栏中的全屏按钮（推荐）

在工具栏中使用默认按钮，简洁高效：

```vue
<template>
  <Menu>
    <FullScreen class="hover:text-primary flex items-center justify-center w-full h-12" />
  </Menu>
</template>

<script setup lang="ts">
import FullScreen from '~/packet/Pattern/FullScreen/FullScreen.vue'
</script>
```

### 视频播放器全屏

```vue
<template>
  <FullScreen :target="videoElement" @fullscreenchange="onFullscreenChange">
    <template #default="{ isFullscreen, toggle }">
      <div class="video-container">
        <video ref="videoElement" controls>
          <source src="video.mp4" type="video/mp4">
        </video>
        <div class="video-controls">
          <btn @click="toggle" class="fullscreen-btn">
            <icn :name="isFullscreen ? 'compress' : 'expand'" />
          </btn>
        </div>
      </div>
    </template>
  </FullScreen>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FullScreen from '~/packet/Pattern/FullScreen/FullScreen.vue'

const videoElement = ref<HTMLVideoElement>()

const onFullscreenChange = (isFullscreen: boolean) => {
  if (isFullscreen) {
    console.log('视频进入全屏模式')
  } else {
    console.log('视频退出全屏模式')
  }
}
</script>
```

### 图片查看器全屏

```vue
<template>
  <FullScreen :target="imageElement" :immersive="false">
    <template #default="{ isFullscreen, toggle }">
      <div class="image-viewer">
        <img ref="imageElement" :src="imageUrl" alt="图片" />
        <div class="overlay">
          <btn @click="toggle" class="absolute top-4 right-4">
            <icn :name="isFullscreen ? 'compress' : 'expand'" />
          </btn>
        </div>
      </div>
    </template>
  </FullScreen>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FullScreen from '~/packet/Pattern/FullScreen/FullScreen.vue'

const imageElement = ref<HTMLImageElement>()
const imageUrl = ref('/path/to/image.jpg')
</script>
```

### 文档编辑器全屏

```vue
<template>
  <FullScreen @fullscreenchange="onFullscreenChange">
    <template #default="{ isFullscreen, toggle }">
      <div class="editor-container">
        <div class="editor-toolbar">
          <btn @click="toggle" class="fullscreen-toggle">
            {{ isFullscreen ? '退出全屏' : '进入全屏' }}
          </btn>
        </div>
        <textarea 
          ref="editorElement"
          v-model="content"
          class="editor-content"
          placeholder="开始编写文档..."
        />
      </div>
    </template>
  </FullScreen>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FullScreen from '~/packet/Pattern/FullScreen/FullScreen.vue'

const editorElement = ref<HTMLTextAreaElement>()
const content = ref('')

const onFullscreenChange = (isFullscreen: boolean) => {
  // 全屏时隐藏其他UI元素
  document.querySelector('.sidebar')?.classList.toggle('hidden', isFullscreen)
}
</script>
```

## 技术特性

### 浏览器兼容性

组件自动检测并适配不同浏览器的全屏API：

- **标准API**: `requestFullscreen`, `exitFullscreen`
- **WebKit**: `webkitRequestFullscreen`, `webkitExitFullscreen`
- **Mozilla**: `mozRequestFullScreen`, `mozCancelFullScreen`
- **IE/Edge**: `msRequestFullscreen`, `msExitFullscreen`

### 两种全屏模式

#### 1. 原生全屏模式 (`immersive: true`)

- 使用浏览器原生全屏API
- 真正的全屏体验，隐藏所有浏览器UI
- 支持ESC键退出全屏
- 支持F11键切换（仅根元素全屏时）

#### 2. 模拟全屏模式 (`immersive: false`)

- 通过CSS样式模拟全屏效果
- 保持浏览器UI可见
- 可自定义定位和层级样式
- 适合需要保持部分UI可见的场景

### 键盘支持

- **ESC键**: 退出全屏（原生模式）
- **F11键**: 切换全屏（仅根元素全屏时）

## 高级用法

### 自定义默认按钮样式

通过 `class` 属性自定义默认按钮的样式：

```vue
<template>
  <FullScreen 
    class="custom-btn-class hover:bg-blue-500 rounded-lg p-2"
    @fullscreenchange="onFullscreenChange"
  />
</template>
```

### 自定义全屏样式

```vue
<template>
  <FullScreen 
    :immersive="false"
    position="fixed"
    z-index="9999"
    @fullscreenchange="onFullscreenChange"
  >
    <template #default="{ isFullscreen, toggle }">
      <div class="custom-fullscreen">
        <btn @click="toggle">自定义全屏</btn>
      </div>
    </template>
  </FullScreen>
</template>
```

### 条件全屏

```vue
<template>
  <FullScreen v-if="allowFullscreen" @fullscreenchange="onFullscreenChange">
    <template #default="{ isFullscreen, toggle }">
      <btn @click="toggle" :disabled="!canFullscreen">
        全屏切换
      </btn>
    </template>
  </FullScreen>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const allowFullscreen = ref(true)
const canFullscreen = computed(() => {
  // 检查是否支持全屏API
  return !!(document.fullscreenEnabled || 
           document.webkitFullscreenEnabled || 
           document.mozFullScreenEnabled)
})
</script>
```

## 注意事项

1. **用户交互要求**: 全屏API必须在用户交互事件中调用
2. **HTTPS要求**: 某些浏览器要求HTTPS环境才能使用全屏API
3. **元素限制**: 不是所有元素都支持全屏，建议使用div容器
4. **样式重置**: 全屏时某些CSS样式可能被重置
5. **事件监听**: 组件会自动处理全屏状态变化事件

## 依赖要求

- Vue 3 Composition API
- 现代浏览器支持全屏API
- 项目 Button 组件 (`btn`)
- 项目 Icon 组件 (`icn`)

## 最佳实践

1. **使用默认按钮**: 在大多数场景下，直接使用默认按钮即可，无需自定义插槽内容
2. **自定义样式**: 通过 `class` 属性调整按钮样式，保持组件简洁
3. **插槽自定义**: 仅在需要完全自定义按钮行为时使用插槽
4. **图标说明**: 默认按钮已内置 `expand` 和 `compress` 图标，会根据全屏状态自动切换