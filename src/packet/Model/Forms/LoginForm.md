# LoginForm 登录表单组件

LoginForm 组件是一个专门用于用户登录的表单组件，提供了用户名（Passport）和密码输入框，支持双向数据绑定和表单提交事件。

## 特性

- 📝 **登录表单** - 包含 Passport 和 Password 两个输入字段
- 🔄 **双向绑定** - 支持 v-model 双向数据绑定
- ✅ **表单验证** - 可以轻松集成表单验证逻辑
- 🎨 **样式定制** - 使用自定义样式，标签和输入框横向排列
- 📱 **响应式** - 适配不同屏幕尺寸
- 🔒 **密码隐藏** - 密码字段自动使用 password 类型

## 安装

```ts
import { LoginForm } from 'sectum'
// 或者
import LoginForm from 'sectum'
```

## 基础用法

最简单的 LoginForm 用法：

```vue
<template>
  <LoginForm v-model="account" @submit="handleLogin" />
</template>

<script setup>
import { reactive } from 'vue'
import { LoginForm } from 'sectum'

interface AccountInfo {
  Passport: string
  Password: string
}

const account = reactive<AccountInfo>({
  Passport: '',
  Password: ''
})

const handleLogin = () => {
  console.log('登录信息:', account)
  // 实现登录逻辑
}
</script>
```

## 数据绑定

LoginForm 使用 v-model 进行双向数据绑定，数据格式为：

```typescript
interface AccountInfo {
  Passport: string  // 用户名/通行证
  Password: string  // 密码
}
```

### 使用 reactive

```vue
<template>
  <LoginForm v-model="account" @submit="login" />
</template>

<script setup>
import { reactive } from 'vue'
import { LoginForm } from 'sectum'

const account = reactive({
  Passport: '',
  Password: ''
})

const login = () => {
  // 登录逻辑
  console.log('登录:', account.Passport, account.Password)
}
</script>
```

### 使用 ref

```vue
<template>
  <LoginForm v-model="account" @submit="login" />
</template>

<script setup>
import { ref } from 'vue'
import { LoginForm } from 'sectum'

const account = ref({
  Passport: '',
  Password: ''
})

const login = () => {
  // 登录逻辑
  console.log('登录:', account.value.Passport, account.value.Password)
}
</script>
```

## 表单提交

LoginForm 会在用户点击"Login"按钮或按 Enter 键时触发 `submit` 事件：

```vue
<template>
  <LoginForm v-model="account" @submit="handleSubmit" />
</template>

<script setup>
import { reactive } from 'vue'
import { LoginForm } from 'sectum'
import { useRouter } from 'vue-router'
import { Store } from 'sectum'

const router = useRouter()
const account = reactive({
  Passport: '',
  Password: ''
})

const handleSubmit = async () => {
  try {
    // 调用登录 API
    const response = await loginAPI(account)
    
    // 保存 Token
    Store.setLocalStorage('Token', response.data.Token)
    Store.setLocalStorage('Expire', response.data.Expire)
    
    // 跳转到首页或控制台
    router.push('/dashboard')
  } catch (error) {
    console.error('登录失败:', error)
    // 显示错误提示
  }
}
</script>
```

## 完整登录页面示例

一个完整的登录页面示例：

```vue
<template>
  <div class="flex justify-center items-center h-screen bg-base-200">
    <div class="w-full max-w-md p-8 bg-base-100 rounded-lg shadow-lg">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-2">欢迎登录</h2>
        <p class="text-base-content/70">请输入您的账号和密码</p>
      </div>
      
      <LoginForm v-model="account" @submit="handleLogin" />
      
      <div class="mt-6 text-center">
        <a href="/forgot-password" class="text-sm text-primary hover:underline">
          忘记密码？
        </a>
      </div>
      
      <div class="mt-4 text-center text-sm text-base-content/60">
        还没有账号？
        <RouterLink to="/register" class="text-primary hover:underline">
          立即注册
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { LoginForm } from 'sectum'
import { Store } from 'sectum'
import { Message } from 'sectum'

interface AccountInfo {
  Passport: string
  Password: string
}

const router = useRouter()
const account = reactive<AccountInfo>({
  Passport: '',
  Password: ''
})

const handleLogin = async () => {
  // 表单验证
  if (!account.Passport || !account.Password) {
    Message({ type: 'warning', message: '请输入用户名和密码' })
    return
  }
  
  try {
    // 调用登录 API（示例）
    // const response = await Account.Login(account)
    
    // 模拟登录成功
    // Store.setLocalStorage('Token', response.data.Token)
    // Store.setLocalStorage('Expire', response.data.Expire)
    
    Message({ type: 'success', message: '登录成功' })
    
    // 跳转到控制台
    router.push('/console/dashboard')
  } catch (error: any) {
    Message({ 
      type: 'error', 
      message: error.message || '登录失败，请检查用户名和密码' 
    })
  }
}
</script>
```

## 表单验证

可以在提交时添加表单验证：

```vue
<template>
  <LoginForm v-model="account" @submit="handleLogin" />
</template>

<script setup>
import { reactive } from 'vue'
import { LoginForm } from 'sectum'
import { Message } from 'sectum'

const account = reactive({
  Passport: '',
  Password: ''
})

const validateForm = () => {
  if (!account.Passport.trim()) {
    Message({ type: 'warning', message: '请输入用户名' })
    return false
  }
  
  if (!account.Password) {
    Message({ type: 'warning', message: '请输入密码' })
    return false
  }
  
  if (account.Password.length < 6) {
    Message({ type: 'warning', message: '密码长度至少为6位' })
    return false
  }
  
  return true
}

const handleLogin = () => {
  if (!validateForm()) {
    return
  }
  
  // 执行登录逻辑
  console.log('登录:', account)
}
</script>
```

## 样式定制

LoginForm 使用自定义样式，标签和输入框横向排列。如果需要自定义样式，可以通过覆盖 CSS 类：

```vue
<template>
  <div class="custom-login-form">
    <LoginForm v-model="account" @submit="handleLogin" />
  </div>
</template>

<style scoped>
.custom-login-form :deep(.login-form-item label) {
  width: 8rem; /* 自定义标签宽度 */
  color: #333; /* 自定义标签颜色 */
}

.custom-login-form :deep(.login-form-item input) {
  border-color: #ccc; /* 自定义边框颜色 */
  border-radius: 0.5rem; /* 自定义圆角 */
}
</style>
```

## 组件结构

LoginForm 组件包含以下部分：

- **Passport 输入框** - 文本类型，用于输入用户名/通行证
- **Password 输入框** - 密码类型，用于输入密码
- **Login 按钮** - 提交按钮，触发 submit 事件

## Props

LoginForm 组件接受以下 props：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `AccountInfo` | - | 双向绑定的账户信息对象 |

```typescript
interface AccountInfo {
  Passport: string  // 用户名/通行证
  Password: string  // 密码
}
```

## Events

LoginForm 组件触发以下事件：

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `AccountInfo` | 当表单数据更新时触发 |
| submit | - | 当用户提交表单时触发（点击按钮或按 Enter） |

## 注意事项

1. **数据格式**：必须使用 `AccountInfo` 接口定义的数据格式
2. **双向绑定**：必须使用 `v-model` 进行双向绑定
3. **表单提交**：组件内部已经处理了表单提交的默认行为（preventDefault）
4. **样式依赖**：组件依赖自定义 CSS 类 `.login-form-item`，不要随意修改
5. **输入组件**：组件内部使用 `ipt`（Input）组件，确保已正确导入

## 相关组件

- [Input](../Element/Input.md) - 输入框组件
- [Form](../Section/Form.md) - 表单组件
- [Button](../Element/Button.md) - 按钮组件

## 使用场景

LoginForm 适用于以下场景：

- 用户登录页面
- 管理员登录
- 系统认证
- 需要用户名和密码验证的场景

