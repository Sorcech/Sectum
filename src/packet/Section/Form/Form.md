# Form 表单组件

Form 表单组件用于快速创建表单字段，支持信息收集和验证。Form 组件是表单容器，FormItem 是表单项组件，两者配合使用可以构建完整的表单结构。

## 特性

- 📋 **表单容器** - Form 组件提供表单容器和布局
- 🏷️ **标签支持** - FormItem 支持标签显示
- ✅ **验证规则** - 支持表单验证规则（基于 async-validator）
- 📏 **灵活布局** - 支持行内布局和标签对齐
- 🎨 **样式定制** - 基于 UnoCSS，易于定制样式
- ⚡ **轻量级** - 简洁的实现，无额外依赖

## 安装

```ts
import Form from "sectum"
import FormItem from "sectum"
```

## 基础用法

### 最简单的表单

```vue
<template>
  <Form>
    <FormItem label="用户名">
      <ipt placeholder="请输入用户名" />
    </FormItem>
    <FormItem label="密码">
      <ipt type="password" placeholder="请输入密码" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import Form from "sectum"
import FormItem from "sectum"
</script>
```

### 使用 model 绑定数据

```vue
<template>
  <Form :model="model">
    <FormItem label="用户名" prop="name">
      <ipt v-model="model.name" placeholder="请输入用户名" />
    </FormItem>
    <FormItem label="邮箱" prop="email">
      <ipt v-model="model.email" placeholder="请输入邮箱" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Form from "sectum"
import FormItem from "sectum"

interface Model {
  name: string
  email: string
}

const model = reactive({
  name: '',
  email: ''
} as Model)
</script>
```

## 表单验证

### 基础验证规则

```vue
<template>
  <Form :model="model" :rules="rules">
    <FormItem label="用户名" prop="name" :rules="rules.name">
      <ipt v-model="model.name" placeholder="请输入用户名" />
    </FormItem>
    <FormItem label="邮箱" prop="email" :rules="rules.email">
      <ipt v-model="model.email" placeholder="请输入邮箱" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({
  name: '',
  email: ''
})

const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}
</script>
```

### 验证规则类型

Form 组件支持以下验证规则类型（基于 async-validator）：

- **required**: 必填验证
- **type**: 类型验证（string、number、boolean、method、regexp、integer、float、array、object、enum、date、url、hex、email）
- **min/max**: 数值范围验证
- **len**: 长度验证
- **pattern**: 正则表达式验证
- **validator**: 自定义验证函数
- **asyncValidator**: 异步验证函数

```vue
<template>
  <Form :model="model" :rules="rules">
    <FormItem label="年龄" prop="age">
      <ipt v-model="model.age" type="number" placeholder="请输入年龄" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({
  age: null
})

const rules = {
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', min: 18, max: 100, message: '年龄必须在 18-100 之间', trigger: 'blur' }
  ]
}
</script>
```

### 自定义验证

```vue
<template>
  <Form :model="model" :rules="rules">
    <FormItem label="密码" prop="password">
      <ipt v-model="model.password" type="password" placeholder="请输入密码" />
    </FormItem>
    <FormItem label="确认密码" prop="confirmPassword">
      <ipt v-model="model.confirmPassword" type="password" placeholder="请确认密码" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({
  password: '',
  confirmPassword: ''
})

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 6) {
    callback(new Error('密码长度不能少于 6 位'))
  } else {
    callback()
  }
}

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== model.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  password: [
    { validator: validatePassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}
</script>
```

## 布局选项

### 标签宽度

```vue
<template>
  <Form :model="model" label-width="120px">
    <FormItem label="用户名">
      <ipt v-model="model.name" />
    </FormItem>
  </Form>
</template>
```

### 标签对齐

```vue
<template>
  <Form :model="model" label-align="right">
    <FormItem label="用户名">
      <ipt v-model="model.name" />
    </FormItem>
  </Form>
</template>
```

### 行内表单

```vue
<template>
  <Form :model="model" inline>
    <FormItem label="用户名">
      <ipt v-model="model.name" />
    </FormItem>
    <FormItem label="邮箱">
      <ipt v-model="model.email" />
    </FormItem>
  </Form>
</template>
```

## API 参考

### Form Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `model` | `Object` | `{}` | 表单数据对象，用于双向数据绑定 |
| `rules` | `Object` | `{}` | 表单验证规则 |
| `inline` | `Boolean` | `false` | 是否行内表单 |
| `labelWidth` | `String \| Number` | - | 标签宽度 |
| `labelAlign` | `'left' \| 'right'` | `'left'` | 标签对齐方式 |
| `labelPlacement` | `'top' \| 'left'` | `'top'` | 标签位置 |
| `disabled` | `Boolean` | `false` | 是否禁用表单 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 表单尺寸 |
| `showFeedback` | `Boolean` | `true` | 是否显示验证反馈 |
| `showLabel` | `Boolean` | `true` | 是否显示标签 |
| `showRequireMark` | `Boolean` | - | 是否显示必填标记 |
| `requireMarkPlacement` | `'left' \| 'right' \| 'right-hanging'` | `'right'` | 必填标记位置 |

### FormItem Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `prop` | `String` | - | 表单域 model 字段 |
| `label` | `String` | `''` | 标签文本 |
| `rules` | `Object \| Array` | - | 表单验证规则 |
| `showMessage` | `Boolean` | `true` | 是否显示验证错误信息 |
| `isShow` | `Boolean` | `false` | 是否显示表单项（暂未使用） |
| `icon` | `String` | `''` | 图标名称（暂未使用） |

### FormItemRule

验证规则对象，继承自 `async-validator` 的 `RuleItem`：

```typescript
interface FormItemRule {
  required?: boolean                    // 是否必填
  type?: string                         // 字段类型
  min?: number                          // 最小值（数值类型）
  max?: number                          // 最大值（数值类型）
  len?: number                          // 长度（字符串/数组类型）
  pattern?: RegExp                      // 正则表达式
  message?: string                      // 错误提示信息
  trigger?: string | string[]           // 触发方式：'blur' | 'change'
  validator?: (rule: any, value: any, callback: any) => void      // 自定义验证函数
  asyncValidator?: (rule: any, value: any, callback: any) => Promise<void>  // 异步验证函数
}
```

## 使用示例

### 登录表单

```vue
<template>
  <Form :model="loginForm" :rules="rules" @submit.prevent="handleSubmit">
    <FormItem label="用户名" prop="username">
      <ipt v-model="loginForm.username" placeholder="请输入用户名" />
    </FormItem>
    <FormItem label="密码" prop="password">
      <ipt v-model="loginForm.password" type="password" placeholder="请输入密码" />
    </FormItem>
    <FormItem>
      <btn type="submit" color="primary">登录</btn>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 位', trigger: 'blur' }
  ]
}

const handleSubmit = () => {
  console.log('提交表单:', loginForm)
}
</script>
```

### 注册表单

```vue
<template>
  <Form :model="registerForm" :rules="rules">
    <FormItem label="用户名" prop="username">
      <ipt v-model="registerForm.username" placeholder="请输入用户名" />
    </FormItem>
    <FormItem label="邮箱" prop="email">
      <ipt v-model="registerForm.email" placeholder="请输入邮箱" />
    </FormItem>
    <FormItem label="密码" prop="password">
      <ipt v-model="registerForm.password" type="password" placeholder="请输入密码" />
    </FormItem>
    <FormItem label="确认密码" prop="confirmPassword">
      <ipt v-model="registerForm.confirmPassword" type="password" placeholder="请确认密码" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value !== registerForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}
</script>
```

### 动态表单

```vue
<template>
  <Form :model="dynamicForm">
    <FormItem 
      v-for="(field, index) in formFields" 
      :key="index"
      :label="field.label"
      :prop="field.prop"
    >
      <ipt 
        v-if="field.type === 'text'"
        v-model="dynamicForm[field.prop]"
        :placeholder="field.placeholder"
      />
      <txa 
        v-else-if="field.type === 'textarea'"
        v-model="dynamicForm[field.prop]"
        :placeholder="field.placeholder"
      />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formFields = [
  { label: '姓名', prop: 'name', type: 'text', placeholder: '请输入姓名' },
  { label: '简介', prop: 'bio', type: 'textarea', placeholder: '请输入简介' }
]

const dynamicForm = reactive({
  name: '',
  bio: ''
})
</script>
```

## 最佳实践

1. **使用 model 绑定**: 始终使用 `v-model` 绑定表单数据到 `model` 对象
2. **合理设置 prop**: 为每个 FormItem 设置 `prop` 属性，确保验证规则正确应用
3. **验证规则**: 根据字段类型选择合适的验证规则
4. **用户体验**: 合理设置 `trigger`，建议必填项使用 `'blur'`，实时验证使用 `'change'`
5. **错误提示**: 提供清晰明确的错误提示信息
6. **表单提交**: 在提交前进行表单验证

## 注意事项

1. **Form 组件**: 目前 Form 组件是一个简单的容器组件，主要提供布局功能
2. **FormItem 组件**: FormItem 组件提供标签显示和布局功能
3. **验证功能**: 完整的表单验证功能需要配合验证库（如 async-validator）使用
4. **响应式**: model 对象需要使用 `reactive` 或 `ref` 包装，确保响应式更新
5. **兼容性**: 组件基于 Vue 3 Composition API，需要 Vue 3.0+ 版本

## 技术实现

### 组件结构

```
Form/
├── Form.vue          # 表单容器组件
└── FormItem.vue      # 表单项组件
```

### 样式定制

Form 组件使用 UnoCSS 原子类，可以通过以下方式定制样式：

```vue
<template>
  <Form class="custom-form">
    <FormItem class="custom-form-item">
      <!-- 表单项内容 -->
    </FormItem>
  </Form>
</template>

<style>
.custom-form {
  /* 自定义表单样式 */
}

.custom-form-item {
  /* 自定义表单项样式 */
}
</style>
```

## 更新日志

### v1.0.0
- 初始版本
- 支持基础表单布局
- 支持标签显示
- 支持 model 数据绑定
