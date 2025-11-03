# Form 表单组件

Form 表单组件用于快速创建表单字段，支持信息收集和验证。Form 组件是表单容器，FormItem 是表单项组件，两者配合使用可以构建完整的表单结构。

## 特性

- 📋 **表单容器** - Form 组件提供表单容器和布局
- 🏷️ **标签支持** - FormItem 支持标签显示和图标
- ✅ **表单验证** - 支持完整的表单验证规则（基于 async-validator）
- 📏 **灵活布局** - 支持行内布局、标签对齐和位置控制
- 🎨 **样式定制** - 基于 UnoCSS，易于定制样式
- ⚡ **响应式** - 支持表单状态反馈和动画过渡
- 🔍 **必填标记** - 自动显示必填字段标记
- 💬 **错误提示** - 实时显示验证错误和成功信息

## 安装

```ts
import { Form, FormItem } from "sectum"
```

## 基础用法

### 最简单的表单

<Form>
  <FormItem label="用户名">
    <ipt placeholder="请输入用户名" />
  </FormItem>
  <FormItem label="密码">
    <ipt type="password" placeholder="请输入密码" />
  </FormItem>
</Form>

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
import { Form, FormItem } from "sectum"
</script>
```

### 使用 model 绑定数据

<Form :model="model">
  <FormItem label="用户名" prop="name">
    <ipt v-model="model.name" placeholder="请输入用户名" />
  </FormItem>
  <FormItem label="邮箱" prop="email">
    <ipt v-model="model.email" placeholder="请输入邮箱" />
  </FormItem>
</Form>

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
import { Form, FormItem } from "sectum"

const model = reactive({
  name: '',
  email: ''
})
</script>
```

## 表单验证

### 基础验证规则

```vue
<template>
  <Form :model="model" :rules="rules">
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

### 手动验证

```vue
<template>
  <Form ref="formRef" :model="model" :rules="rules">
    <FormItem label="用户名" prop="name">
      <ipt v-model="model.name" placeholder="请输入用户名" />
    </FormItem>
    <FormItem>
      <btn @click="handleValidate">验证表单</btn>
      <btn @click="handleReset">重置验证</btn>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const formRef = ref()
const model = reactive({
  name: ''
})

const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ]
}

const handleValidate = async () => {
  const valid = await formRef.value.validate((isValid: boolean) => {
    if (isValid) {
      console.log('验证通过')
    } else {
      console.log('验证失败')
    }
  })
}

const handleReset = () => {
  formRef.value.resetFields()
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

### 标签位置

```vue
<template>
  <Form :model="model" label-placement="left">
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

### 表单尺寸

```vue
<template>
  <Form :model="model" size="large">
    <FormItem label="用户名">
      <ipt v-model="model.name" />
    </FormItem>
  </Form>
</template>
```

## 必填标记

### 显示必填标记

```vue
<template>
  <Form :model="model" :rules="rules" show-require-mark>
    <FormItem label="用户名" prop="name">
      <ipt v-model="model.name" />
    </FormItem>
  </Form>
</template>
```

### 必填标记位置

```vue
<template>
  <Form 
    :model="model" 
    :rules="rules" 
    show-require-mark
    require-mark-placement="left"
  >
    <FormItem label="用户名" prop="name">
      <ipt v-model="model.name" />
    </FormItem>
  </Form>
</template>
```

## 表单项特性

### 图标支持

```vue
<template>
  <Form :model="model">
    <FormItem label="用户名" icon="user" prop="name">
      <ipt v-model="model.name" />
    </FormItem>
    <FormItem label="邮箱" icon="mail" prop="email">
      <ipt v-model="model.email" />
    </FormItem>
  </Form>
</template>
```

### 隐藏表单项

```vue
<template>
  <Form :model="model">
    <FormItem label="用户名" prop="name">
      <ipt v-model="model.name" />
    </FormItem>
    <FormItem label="隐藏字段" prop="hidden" :is-show="false">
      <ipt v-model="model.hidden" />
    </FormItem>
  </Form>
</template>
```

### 自定义错误提示

```vue
<template>
  <Form :model="model" :rules="rules">
    <FormItem label="用户名" prop="name" :show-message="true">
      <ipt v-model="model.name" />
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
| `labelAlign` | `'left' \| 'right' \| 'center'` | `'left'` | 标签对齐方式 |
| `labelPlacement` | `'top' \| 'left'` | `'top'` | 标签位置 |
| `disabled` | `Boolean` | `false` | 是否禁用表单 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 表单尺寸 |
| `showFeedback` | `Boolean` | `true` | 是否显示验证反馈 |
| `showLabel` | `Boolean` | `true` | 是否显示标签 |
| `showRequireMark` | `Boolean` | - | 是否显示必填标记（默认根据验证规则自动判断） |
| `requireMarkPlacement` | `'left' \| 'right' \| 'right-hanging'` | `'right'` | 必填标记位置 |

### Form Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `submit` | `event: Event` | 表单提交事件 |
| `validate` | `prop: string, isValid: boolean, message: string` | 字段验证事件 |

### Form Methods

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `validate` | `callback?: (valid: boolean) => void` | `Promise<boolean>` | 验证整个表单 |
| `validateField` | `prop: string` | `Promise<boolean>` | 验证指定字段 |
| `resetFields` | - | `void` | 重置所有字段的验证状态 |
| `clearValidate` | - | `void` | 清除所有字段的验证状态 |

### FormItem Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `prop` | `String` | - | 表单域 model 字段 |
| `label` | `String` | `''` | 标签文本 |
| `rules` | `Object \| Array` | - | 表单验证规则（会与 Form 的 rules 合并） |
| `showMessage` | `Boolean` | `true` | 是否显示验证错误信息 |
| `isShow` | `Boolean` | `true` | 是否显示表单项 |
| `icon` | `String` | `''` | 图标名称 |

### FormItem Methods

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `validate` | `trigger?: string` | `Promise<boolean>` | 验证字段 |
| `clearValidate` | - | `void` | 清除验证状态 |

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
  <Form ref="formRef" :model="loginForm" :rules="rules" @submit="handleSubmit">
    <FormItem label="用户名" prop="username">
      <ipt v-model="loginForm.username" placeholder="请输入用户名" />
    </FormItem>
    <FormItem label="密码" prop="password">
      <ipt v-model="loginForm.password" type="password" placeholder="请输入密码" />
    </FormItem>
    <FormItem>
      <btn color="primary" @click="handleSubmit">登录</btn>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const formRef = ref()
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

const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    console.log('提交表单:', loginForm)
  }
}
</script>
```

### 注册表单

```vue
<template>
  <Form ref="formRef" :model="registerForm" :rules="rules">
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
    <FormItem>
      <btn color="primary" @click="handleSubmit">注册</btn>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const formRef = ref()
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

const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    console.log('提交表单:', registerForm)
  }
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
      :icon="field.icon"
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
  { label: '姓名', prop: 'name', type: 'text', placeholder: '请输入姓名', icon: 'user' },
  { label: '简介', prop: 'bio', type: 'textarea', placeholder: '请输入简介', icon: 'info' }
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
7. **性能优化**: 对于大型表单，考虑使用懒加载和虚拟滚动

## 注意事项

1. **依赖**: 表单验证功能需要 `async-validator` 库支持
2. **响应式**: model 对象需要使用 `reactive` 或 `ref` 包装，确保响应式更新
3. **兼容性**: 组件基于 Vue 3 Composition API，需要 Vue 3.0+ 版本
4. **验证时机**: 验证会在字段值变化时自动触发，也可以在提交时手动触发
5. **表单上下文**: FormItem 必须嵌套在 Form 组件内才能正常工作

## 技术实现

### 组件结构

```
Form/
├── Form.vue          # 表单容器组件
├── FormItem.vue      # 表单项组件
├── FormItem.ts       # 类型定义导出
└── types.ts          # 类型定义
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

### v2.0.0
- 完全重写组件架构
- 添加完整的表单验证功能
- 支持 provide/inject 模式
- 添加必填标记支持
- 优化布局和样式系统
- 添加错误提示和成功反馈
- 支持图标和自定义显示控制

---

<script setup>
import { reactive } from 'vue'

const model = reactive({
  name: '',
  email: ''
})
</script>