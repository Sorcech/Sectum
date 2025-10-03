# Drawer 抽屉组件

Drawer 抽屉组件是一个从屏幕右侧滑出的面板，用于显示额外的内容或操作。它通常用于设置面板、详情页面或辅助功能。

## 基础用法

```vue
<template>
  <div>
    <btn @click="showDrawer = true" class="btn btn-primary">打开抽屉</btn>
    
    <Drawer 
      :isShow="showDrawer" @update:isShow="showDrawer = $event" 
      title="设置面板"
    >
      <div class="p-4">
        <p>这里是抽屉的内容</p>
      </div>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showDrawer = ref(false)
</script>
```

## 不同位置

Drawer 组件支持从四个方向滑出：

- **上方 (top)**：适合显示通知、提示信息等
- **右侧 (right)**：默认位置，适合显示设置面板、详情信息等
- **下方 (bottom)**：适合显示操作面板、工具栏等
- **左侧 (left)**：适合显示导航菜单、侧边栏等


## 不同宽度

Drawer 组件支持多种宽度设置：

- **小宽度 (w-64)**：适合简单的设置项或快捷操作
- **中等宽度 (w-96)**：适合一般的设置面板或详情信息
- **大宽度 (w-1/2)**：适合复杂的表单或详细内容


## 自定义高度

Drawer 组件支持自定义高度设置，特别适用于上下位置的抽屉。


## 可滚动内容

当抽屉内容较多时，可以设置 `overflow="true"` 来允许内容滚动。


## 无背景遮罩

通过设置 `backdrop="false"` 可以移除抽屉的背景遮罩。


## 实际使用示例

### 设置面板

```vue
<template>
  <div>
    <btn @click="showSettings = true" class="btn btn-outline">
      <icn name="cog" light lg />
      设置
    </btn>
    
    <Drawer 
      :isShow="showSettings" 
      @update:isShow="showSettings = $event"
      title="系统设置"
      width="w-80"
      :overflow="true"
    >
      <div class="p-4 space-y-6">
        <div>
          <h3 class="font-semibold mb-3">主题设置</h3>
          <div class="space-y-2">
            <label class="flex items-center">
              <input type="radio" name="theme" value="light" class="mr-2" />
              浅色模式
            </label>
            <label class="flex items-center">
              <input type="radio" name="theme" value="dark" class="mr-2" />
              深色模式
            </label>
          </div>
        </div>
        
        <div>
          <h3 class="font-semibold mb-3">语言设置</h3>
          <select class="select select-bordered w-full">
            <option>简体中文</option>
            <option>English</option>
            <option>日本語</option>
          </select>
        </div>
        
        <div class="flex justify-end space-x-2">
          <btn @click="showSettings = false" class="btn btn-outline">取消</btn>
          <btn @click="saveSettings" class="btn btn-primary">保存</btn>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showSettings = ref(false)

const saveSettings = () => {
  console.log('保存设置')
  showSettings.value = false
}
</script>
```

### 详情面板

```vue
<template>
  <div>
    <btn @click="showDetails = true" class="btn btn-primary">查看详情</btn>
    
    <Drawer 
      :isShow="showDetails" 
      @update:isShow="showDetails = $event"
      title="用户详情"
      width="w-96"
      :overflow="true"
    >
      <div class="p-4">
        <div class="flex items-center space-x-4 mb-6">
          <div class="avatar">
            <div class="w-16 rounded-full">
              <img src="/avatar.jpg" alt="用户头像" />
            </div>
          </div>
          <div>
            <h2 class="text-xl font-bold">张三</h2>
            <p class="text-base-content/70">高级开发工程师</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium text-base-content/70">邮箱</label>
            <p class="text-base-content">zhangsan@example.com</p>
          </div>
          
          <div>
            <label class="text-sm font-medium text-base-content/70">电话</label>
            <p class="text-base-content">+86 138 0013 8000</p>
          </div>
          
          <div>
            <label class="text-sm font-medium text-base-content/70">部门</label>
            <p class="text-base-content">技术部</p>
          </div>
          
          <div>
            <label class="text-sm font-medium text-base-content/70">入职时间</label>
            <p class="text-base-content">2023年1月15日</p>
          </div>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showDetails = ref(false)
</script>
```

### 表单面板

```vue
<template>
  <div>
    <btn @click="showForm = true" class="btn btn-primary">新建项目</btn>
    
    <Drawer 
      :isShow="showForm" 
      @update:isShow="showForm = $event"
      title="新建项目"
      width="w-1/2"
      :overflow="true"
    >
      <form @submit.prevent="handleSubmit" class="p-4">
        <div class="space-y-4">
          <div>
            <label class="label">
              <span class="label-text">项目名称</span>
            </label>
            <input 
              v-model="form.name" 
              type="text" 
              class="input input-bordered w-full" 
              placeholder="请输入项目名称"
            />
          </div>
          
          <div>
            <label class="label">
              <span class="label-text">项目描述</span>
            </label>
            <textarea 
              v-model="form.description" 
              class="textarea textarea-bordered w-full" 
              placeholder="请输入项目描述"
              rows="4"
            ></textarea>
          </div>
          
          <div>
            <label class="label">
              <span class="label-text">项目类型</span>
            </label>
            <select v-model="form.type" class="select select-bordered w-full">
              <option value="">请选择项目类型</option>
              <option value="web">Web应用</option>
              <option value="mobile">移动应用</option>
              <option value="desktop">桌面应用</option>
            </select>
          </div>
          
          <div>
            <label class="label">
              <span class="label-text">优先级</span>
            </label>
            <div class="flex space-x-4">
              <label class="flex items-center">
                <input type="radio" v-model="form.priority" value="low" class="mr-2" />
                低
              </label>
              <label class="flex items-center">
                <input type="radio" v-model="form.priority" value="medium" class="mr-2" />
                中
              </label>
              <label class="flex items-center">
                <input type="radio" v-model="form.priority" value="high" class="mr-2" />
                高
              </label>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-2 mt-6">
          <btn type="btn" @click="showForm = false" class="btn btn-outline">取消</btn>
          <btn type="submit" class="btn btn-primary">创建项目</btn>
        </div>
      </form>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showForm = ref(false)
const form = ref({
  name: '',
  description: '',
  type: '',
  priority: 'medium'
})

const handleSubmit = () => {
  console.log('提交表单:', form.value)
  showForm.value = false
}
</script>
```

## API 参考

### Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `isShow` | `boolean` | `false` | 是否显示抽屉，支持 v-model |
| `title` | `string` | `'Title'` | 抽屉标题 |
| `width` | `string` | `'w-32'` | 抽屉宽度，支持 Tailwind CSS 宽度类（仅左右位置有效） |
| `height` | `string` | - | 抽屉高度，支持 Tailwind CSS 高度类（仅上下位置有效） |
| `overflow` | `boolean` | `false` | 是否允许内容滚动 |
| `backdrop` | `boolean` | `true` | 是否显示背景遮罩 |
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | 抽屉出现位置 |

### 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:isShow` | `(value: boolean) => void` | 显示状态变化时触发 |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| `default` | 抽屉内容区域 |

## 样式定制

Drawer 组件使用 UnoCSS 原子类进行样式设置，支持以下主题变量：

- `--base-200`: 抽屉背景色
- `--base-100`: 标题栏背景色
- `--base-content`: 文字颜色

## 注意事项

1. **定位**：抽屉固定定位在屏幕指定位置
   - 上方：`top-0 left-0 right-0`
   - 右侧：`top-0 right-14`（距离右边 56px）
   - 下方：`bottom-0 left-0 right-0`
   - 左侧：`top-0 left-14`（距离左边 56px）

2. **层级**：抽屉的 z-index 为 15，确保在其他内容之上

3. **尺寸控制**：
   - 左右位置使用 `width` 属性控制宽度
   - 上下位置使用 `height` 属性控制高度
   - 上下位置默认高度为 `h-96`

4. **动画效果**：不同位置使用不同的滑入动画
   - 上方：`downward`（向下滑入）
   - 右侧：`leftward`（向左滑入）
   - 下方：`upward`（向上滑入）
   - 左侧：`rightward`（向右滑入）

5. **响应式**：建议在不同屏幕尺寸下调整尺寸

6. **无障碍访问**：组件支持键盘导航和屏幕阅读器

## 最佳实践

1. **位置选择**：根据使用场景选择合适的位置
   - **上方 (top)**：适合通知、提示信息、状态栏
   - **右侧 (right)**：适合设置面板、详情信息、辅助功能（默认）
   - **下方 (bottom)**：适合操作面板、工具栏、键盘
   - **左侧 (left)**：适合导航菜单、侧边栏、目录

2. **尺寸设置**：根据位置和内容类型选择合适的尺寸
   - **左右位置**：使用 `width` 属性
     - 设置面板：`w-80` 或 `w-96`
     - 详情页面：`w-96` 或 `w-1/2`
     - 表单页面：`w-1/2` 或 `w-2/3`
   - **上下位置**：使用 `height` 属性
     - 通知栏：`h-32` 或 `h-40`
     - 操作面板：`h-64` 或 `h-96`
     - 全屏模式：`h-screen`

3. **内容滚动**：当内容较多时，建议设置 `overflow="true"`

4. **标题设计**：使用简洁明了的标题，便于用户理解

5. **操作按钮**：在抽屉底部放置主要操作按钮，提高可用性

6. **响应式设计**：考虑在不同屏幕尺寸下的表现，适当调整尺寸