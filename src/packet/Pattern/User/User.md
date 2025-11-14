# User 用户管理模块

User 模块提供完整的用户管理功能，包括用户登录、注册、登出、个人信息管理、密码修改等操作。所有用户相关的类型定义、API 服务和组件都统一管理在 `User.ts` 中。

## 特性

- 🔐 **用户认证** - 支持用户登录、登出、Token 刷新
- 👤 **用户管理** - 支持用户注册、个人信息查看和更新
- 🔑 **密码管理** - 支持密码修改功能
- 📋 **用户列表** - 支持获取用户列表
- 🎨 **用户菜单** - 提供用户操作菜单组件（登出、设置等）
- 💾 **状态管理** - 自动管理登录状态和本地存储
- 🔄 **路由跳转** - 支持登出后的路由跳转
- 🌐 **国际化支持** - 支持多语言显示
- 🌙 **深色模式** - 完全支持深色模式

## 安装

```typescript
// 导入 API 服务
import { User } from '~/packet/Pattern/User/User'

// 导入类型定义
import type { 
  UserLoginInfo, 
  UserInfo,
  UserProfile,
  SettingsForm 
} from '~/packet/Pattern/User/User'

// 导入组件
import User from '~/packet/Pattern/User/User.vue'
import UserLogin from '~/packet/Pattern/User/UserLogin.vue'  // 登录表单组件（也称为 LoginForm）
import UserCreate from '~/packet/Pattern/User/UserCreate.vue'
import ProfileEdit from '~/packet/Pattern/User/ProfileEdit.vue'
import PasswordChange from '~/packet/Pattern/User/PasswordChange.vue'
```

## API 服务

### User 类

`User` 类提供直接调用后端 API 的方法：

```typescript
import { User } from '~/packet/Pattern/User/User'

// 用户登录
const loginResponse = await User.Login({
  Passport: 'username',
  Password: 'password'
})

// 刷新 Token
const refreshResponse = await User.Refresh()

// 用户登出
await User.Logout()

// 检查登录状态
const isLoginResponse = await User.IsLogin()

// 获取 Token
const tokenResponse = await User.GetToken()

// 获取用户信息
const profileResponse = await User.GetProfile()

// 用户注册
const registerResponse = await User.Register({
  Passport: 'newuser',
  Password: 'password123'
})

// 修改密码
await User.ChangePassword({
  OldPassword: 'oldpassword',
  NewPassword: 'newpassword'
})

// 更新个人信息
await User.UpdateProfile({
  name: '新名称',
  email: 'newemail@example.com',
  phone: '138-0000-0000'
})

// 获取用户列表
const userListResponse = await User.List()
```

## 类型定义

### 用户登录信息

```typescript
// 用户登录信息接口（匹配后端 LoginReq）
interface UserLoginInfo {
  Passport: string  // 用户名或邮箱
  Password: string  // 密码
}
```

### 用户信息

```typescript
// 用户详细信息接口（用于用户资料页面）
interface UserProfile {
  name: string        // 用户名称
  email: string      // 邮箱
  avatar?: string    // 头像URL
  role: string       // 角色
  department: string // 部门
  phone: string      // 电话
  joinDate: string   // 加入日期
  lastLogin: string  // 最后登录时间
}

// 用户信息接口（用于任务等场景的简单用户信息）
interface UserInfo {
  id: string | number  // 用户ID
  name: string        // 用户名称
  avatar?: string     // 头像URL
  status?: 'online' | 'offline' | 'away' | 'busy' | ''  // 在线状态
}
```

### 设置表单

```typescript
// 设置表单接口
interface SettingsForm {
  // 个人资料
  name: string
  email: string
  phone: string
  // 通知设置
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  // 隐私设置
  profileVisibility: 'public' | 'private' | 'friends'
  showEmail: boolean
  showPhone: boolean
  // 账户设置
  language: string
  theme: string
  timezone: string
}
```

## 组件使用

### User.vue - 用户菜单组件

用户菜单组件，提供登出和设置等用户相关操作：

```vue
<template>
  <User 
    button-class="hover:text-primary flex items-center justify-center w-full h-12"
    :on-logout="handleLogout"
    :on-setting-click="handleSettingClick"
    :on-navigate="handleNavigate"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { User as UserService } from '~/packet/Pattern/User/User'
import User from '~/packet/Pattern/User/User.vue'
import Toast from '~/packet/Element/Toast/Toast'

const router = useRouter()

// 登出处理
const handleLogout = async () => {
  try {
    await UserService.Logout()
    Toast({ type: 'success', message: '登出成功' })
  } catch (error) {
    Toast({ type: 'error', message: '登出失败' })
  }
}

// 设置点击处理
const handleSettingClick = () => {
  router.push('/settings')
}

// 路由跳转处理
const handleNavigate = (path: string) => {
  router.push(path)
}
</script>
```

**Props:**

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `buttonClass` | `String` | `'hover:text-primary'` | 按钮的 CSS 类名 |
| `onLogout` | `Function` | `undefined` | 登出回调函数 |
| `onSettingClick` | `Function` | `undefined` | 设置点击回调函数 |
| `onNavigate` | `Function` | `undefined` | 路由跳转回调函数，接收路径参数 |

### UserLogin.vue / LoginForm - 用户登录组件

用户登录表单组件，提供用户名（Passport）和密码输入框，支持双向数据绑定和表单提交事件。

#### 特性

- 📝 **登录表单** - 包含 Passport 和 Password 两个输入字段
- 🔄 **双向绑定** - 支持 v-model 双向数据绑定
- ✅ **表单验证** - 可以轻松集成表单验证逻辑
- 🎨 **样式定制** - 使用自定义样式，标签和输入框横向排列
- 📱 **响应式** - 适配不同屏幕尺寸
- 🔒 **密码隐藏** - 密码字段自动使用 password 类型

#### 基础用法

最简单的用法：

```vue
<template>
  <UserLogin 
    @login="handleLogin"
  />
</template>

<script setup lang="ts">
import { User } from '~/packet/Pattern/User/User'
import type { UserLoginInfo } from '~/packet/Pattern/User/User'
import UserLogin from '~/packet/Pattern/User/UserLogin.vue'
import Toast from '~/packet/Element/Toast/Toast'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogin = async (loginInfo: UserLoginInfo) => {
  try {
    const response = await User.Login(loginInfo) as any
    if (response?.data?.code === 0) {
      Toast({ type: 'success', message: '登录成功' })
      router.push('/console')
    } else {
      Toast({ type: 'error', message: response?.data?.message || '登录失败' })
    }
  } catch (error) {
    Toast({ type: 'error', message: '登录失败' })
  }
}
</script>
```

#### 使用 v-model 双向绑定

如果组件支持 v-model，可以这样使用：

```vue
<template>
  <UserLogin 
    v-model="account" 
    @login="handleLogin" 
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { User } from '~/packet/Pattern/User/User'
import type { UserLoginInfo } from '~/packet/Pattern/User/User'
import UserLogin from '~/packet/Pattern/User/UserLogin.vue'
import Toast from '~/packet/Element/Toast/Toast'
import { useRouter } from 'vue-router'

const router = useRouter()

interface AccountInfo {
  Passport: string
  Password: string
}

const account = reactive<AccountInfo>({
  Passport: '',
  Password: ''
})

const handleLogin = async () => {
  try {
    const response = await User.Login(account) as any
    if (response?.data?.code === 0) {
      // 保存 Token
      if (response.data.data?.Token) {
        localStorage.setItem('Token', response.data.data.Token)
      }
      if (response.data.data?.Expire) {
        localStorage.setItem('Expire', response.data.data.Expire)
      }
      
      Toast({ type: 'success', message: '登录成功' })
      router.push('/console')
    } else {
      Toast({ type: 'error', message: response?.data?.message || '登录失败' })
    }
  } catch (error) {
    Toast({ type: 'error', message: '登录失败' })
  }
}
</script>
```

#### 完整登录页面示例

一个完整的登录页面示例：

```vue
<template>
  <div class="flex justify-center items-center h-screen bg-base-200">
    <div class="w-full max-w-md p-8 bg-base-100 rounded-lg shadow-lg">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-2">欢迎登录</h2>
        <p class="text-base-content/70">请输入您的账号和密码</p>
      </div>
      
      <UserLogin 
        @login="handleLogin" 
      />
      
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
import { User } from '~/packet/Pattern/User/User'
import type { UserLoginInfo } from '~/packet/Pattern/User/User'
import UserLogin from '~/packet/Pattern/User/UserLogin.vue'
import Toast from '~/packet/Element/Toast/Toast'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogin = async (loginInfo: UserLoginInfo) => {
  // 表单验证
  if (!loginInfo.Passport || !loginInfo.Password) {
    Toast({ type: 'warning', message: '请输入用户名和密码' })
    return
  }
  
  try {
    const response = await User.Login(loginInfo) as any
    if (response?.data?.code === 0) {
      // 保存 Token
      if (response.data.data?.Token) {
        localStorage.setItem('Token', response.data.data.Token)
      }
      if (response.data.data?.Expire) {
        localStorage.setItem('Expire', response.data.data.Expire)
      }
      
      Toast({ type: 'success', message: '登录成功' })
      router.push('/console')
    } else {
      Toast({ type: 'error', message: response?.data?.message || '登录失败' })
    }
  } catch (error: any) {
    Toast({ 
      type: 'error', 
      message: error.message || '登录失败，请检查用户名和密码' 
    })
  }
}
</script>
```

#### 表单验证

可以在提交时添加表单验证：

```vue
<template>
  <UserLogin 
    @login="handleLogin" 
  />
</template>

<script setup lang="ts">
import { User } from '~/packet/Pattern/User/User'
import type { UserLoginInfo } from '~/packet/Pattern/User/User'
import UserLogin from '~/packet/Pattern/User/UserLogin.vue'
import Toast from '~/packet/Element/Toast/Toast'

const validateForm = (loginInfo: UserLoginInfo) => {
  if (!loginInfo.Passport.trim()) {
    Toast({ type: 'warning', message: '请输入用户名' })
    return false
  }
  
  if (!loginInfo.Password) {
    Toast({ type: 'warning', message: '请输入密码' })
    return false
  }
  
  if (loginInfo.Password.length < 6) {
    Toast({ type: 'warning', message: '密码长度至少为6位' })
    return false
  }
  
  return true
}

const handleLogin = async (loginInfo: UserLoginInfo) => {
  if (!validateForm(loginInfo)) {
    return
  }
  
  // 执行登录逻辑
  try {
    const response = await User.Login(loginInfo) as any
    if (response?.data?.code === 0) {
      Toast({ type: 'success', message: '登录成功' })
    }
  } catch (error) {
    Toast({ type: 'error', message: '登录失败' })
  }
}
</script>
```

#### 数据格式

登录表单使用的数据格式：

```typescript
interface UserLoginInfo {
  Passport: string  // 用户名/通行证
  Password: string  // 密码
}
```

#### Props

如果组件支持 props，可能包含：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `UserLoginInfo` | - | 双向绑定的登录信息对象（如果支持 v-model） |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| login | `UserLoginInfo` | 当用户提交登录表单时触发 |
| update:modelValue | `UserLoginInfo` | 当表单数据更新时触发（如果支持 v-model） |

#### 注意事项

1. **数据格式**：必须使用 `UserLoginInfo` 接口定义的数据格式
2. **表单提交**：组件内部已经处理了表单提交的默认行为（preventDefault）
3. **Token 管理**：登录成功后需要将 Token 保存到本地存储
4. **错误处理**：建议在登录回调中添加完整的错误处理逻辑

### UserCreate.vue - 用户注册组件

用户注册表单组件：

```vue
<template>
  <UserCreate 
    @register="handleRegister"
  />
</template>

<script setup lang="ts">
import { User } from '~/packet/Pattern/User/User'
import type { UserLoginInfo } from '~/packet/Pattern/User/User'
import UserCreate from '~/packet/Pattern/User/UserCreate.vue'
import Toast from '~/packet/Element/Toast/Toast'

const handleRegister = async (registerInfo: UserLoginInfo) => {
  try {
    const response = await User.Register(registerInfo) as any
    if (response?.data?.code === 0) {
      Toast({ type: 'success', message: '注册成功' })
    } else {
      Toast({ type: 'error', message: response?.data?.message || '注册失败' })
    }
  } catch (error) {
    Toast({ type: 'error', message: '注册失败' })
  }
}
</script>
```

### ProfileEdit.vue - 个人信息编辑组件

个人信息编辑表单组件：

```vue
<template>
  <ProfileEdit 
    @update="handleUpdateProfile"
  />
</template>

<script setup lang="ts">
import { User } from '~/packet/Pattern/User/User'
import ProfileEdit from '~/packet/Pattern/User/ProfileEdit.vue'
import Toast from '~/packet/Element/Toast/Toast'

const handleUpdateProfile = async (profile: any) => {
  try {
    const response = await User.UpdateProfile(profile) as any
    if (response?.data?.code === 0) {
      Toast({ type: 'success', message: '个人信息更新成功' })
    } else {
      Toast({ type: 'error', message: response?.data?.message || '更新失败' })
    }
  } catch (error) {
    Toast({ type: 'error', message: '更新失败' })
  }
}
</script>
```

### PasswordChange.vue - 密码修改组件

密码修改表单组件：

```vue
<template>
  <PasswordChange 
    @change="handleChangePassword"
  />
</template>

<script setup lang="ts">
import { User } from '~/packet/Pattern/User/User'
import PasswordChange from '~/packet/Pattern/User/PasswordChange.vue'
import Toast from '~/packet/Element/Toast/Toast'

const handleChangePassword = async (params: { OldPassword: string; NewPassword: string }) => {
  try {
    const response = await User.ChangePassword(params) as any
    if (response?.data?.code === 0) {
      Toast({ type: 'success', message: '密码修改成功' })
    } else {
      Toast({ type: 'error', message: response?.data?.message || '密码修改失败' })
    }
  } catch (error) {
    Toast({ type: 'error', message: '密码修改失败' })
  }
}
</script>
```

## 数据函数

### getInitialUserInfo

获取初始用户信息（用于开发和测试的默认数据）：

```typescript
import { getInitialUserInfo } from '~/packet/Pattern/User/User'

const userInfo = getInitialUserInfo()
// 返回: {
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   avatar: '',
//   role: '管理员',
//   department: '技术部',
//   phone: '138-0000-0000',
//   joinDate: '2023-01-15',
//   lastLogin: '2024-01-20 10:30:00'
// }
```

### getInitialSettingsForm

获取初始设置表单（基于用户信息）：

```typescript
import { getInitialSettingsForm, getInitialUserInfo } from '~/packet/Pattern/User/User'

const userInfo = getInitialUserInfo()
const settingsForm = getInitialSettingsForm(userInfo)
// 返回包含个人资料、通知设置、隐私设置、账户设置的完整表单对象
```

## 后端 API 接口

### 用户登录

```http
POST /login
Content-Type: application/json

{
  "Passport": "username",
  "Password": "password"
}
```

**响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "Expire": "2025-11-14T10:55:52.0963233+08:00"
  }
}
```

### 刷新 Token

```http
GET /user/refresh
```

**响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "Expire": "2025-11-14T10:55:52.0963233+08:00"
  }
}
```

### 用户登出

```http
GET /user/logout
```

**响应:**

```json
{
  "code": 0,
  "message": "success"
}
```

### 检查登录状态

```http
GET /user/islogin
```

**响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "IsLogin": true,
    "Expire": "2025-11-14T10:55:52.0963233+08:00"
  }
}
```

### 获取 Token

```http
GET /user/token
```

**响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "Expire": "2025-11-14T10:55:52.0963233+08:00"
  }
}
```

### 获取用户信息

```http
GET /user/profile
```

**响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "role": "管理员",
    "department": "技术部",
    "phone": "138-0000-0000",
    "joinDate": "2023-01-15",
    "lastLogin": "2024-01-20 10:30:00"
  }
}
```

### 用户注册

```http
POST /user/register
Content-Type: application/json

{
  "Passport": "newuser",
  "Password": "password123"
}
```

**响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "UserId": 1,
    "Passport": "newuser"
  }
}
```

### 修改密码

```http
PUT /user/password
Content-Type: application/json

{
  "OldPassword": "oldpassword",
  "NewPassword": "newpassword"
}
```

**响应:**

```json
{
  "code": 0,
  "message": "success"
}
```

### 更新个人信息

```http
PUT /user/update
Content-Type: application/json

{
  "name": "新名称",
  "email": "newemail@example.com",
  "phone": "138-0000-0000"
}
```

**响应:**

```json
{
  "code": 0,
  "message": "success"
}
```

### 获取用户列表

```http
GET /user/list
```

**响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "UserId": 1,
      "Passport": "user1",
      "Name": "用户1",
      "Email": "user1@example.com",
      "Role": "管理员"
    }
  ]
}
```

## 使用示例

### 完整示例：用户认证流程

```vue
<template>
  <div>
    <!-- 登录页面 -->
    <UserLogin 
      v-if="!isLoggedIn"
      @login="handleLogin"
    />
    
    <!-- 主界面 -->
    <div v-else>
      <!-- 用户菜单 -->
      <User 
        :on-logout="handleLogout"
        :on-setting-click="handleSettingClick"
        :on-navigate="handleNavigate"
      />
      
      <!-- 用户信息 -->
      <div v-if="userInfo">
        <p>用户名: {{ userInfo.name }}</p>
        <p>邮箱: {{ userInfo.email }}</p>
        <p>角色: {{ userInfo.role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { User } from '~/packet/Pattern/User/User'
import type { UserLoginInfo, UserProfile } from '~/packet/Pattern/User/User'
import UserLogin from '~/packet/Pattern/User/UserLogin.vue'
import User from '~/packet/Pattern/User/User.vue'
import Toast from '~/packet/Element/Toast/Toast'

const router = useRouter()
const isLoggedIn = ref(false)
const userInfo = ref<UserProfile | null>(null)

// 检查登录状态
const checkLoginStatus = async () => {
  try {
    const response = await User.IsLogin() as any
    if (response?.data?.code === 0 && response?.data?.data?.IsLogin) {
      isLoggedIn.value = true
      await loadUserProfile()
    } else {
      isLoggedIn.value = false
    }
  } catch (error) {
    isLoggedIn.value = false
  }
}

// 加载用户信息
const loadUserProfile = async () => {
  try {
    const response = await User.GetProfile() as any
    if (response?.data?.code === 0) {
      userInfo.value = response.data.data
    }
  } catch (error) {
    console.error('加载用户信息失败:', error)
  }
}

// 用户登录
const handleLogin = async (loginInfo: UserLoginInfo) => {
  try {
    const response = await User.Login(loginInfo) as any
    if (response?.data?.code === 0) {
      // 保存 Token
      if (response.data.data?.Token) {
        localStorage.setItem('Token', response.data.data.Token)
      }
      if (response.data.data?.Expire) {
        localStorage.setItem('Expire', response.data.data.Expire)
      }
      
      Toast({ type: 'success', message: '登录成功' })
      isLoggedIn.value = true
      await loadUserProfile()
      router.push('/console')
    } else {
      Toast({ type: 'error', message: response?.data?.message || '登录失败' })
    }
  } catch (error) {
    Toast({ type: 'error', message: '登录失败' })
  }
}

// 用户登出
const handleLogout = async () => {
  try {
    await User.Logout()
    // 清除本地存储
    localStorage.removeItem('Token')
    localStorage.removeItem('Expire')
    localStorage.clear()
    
    Toast({ type: 'success', message: '登出成功' })
    isLoggedIn.value = false
    userInfo.value = null
    router.push('/')
  } catch (error) {
    Toast({ type: 'error', message: '登出失败' })
  }
}

// 设置点击
const handleSettingClick = () => {
  router.push('/settings')
}

// 路由跳转
const handleNavigate = (path: string) => {
  router.push(path)
}

// 组件挂载时检查登录状态
onMounted(() => {
  checkLoginStatus()
})
</script>
```

## 注意事项

1. **Token 管理**：登录成功后需要将 Token 保存到本地存储，后续请求会自动携带 Token
2. **登录状态**：使用 `User.IsLogin()` 检查登录状态，建议在应用启动时调用
3. **Token 刷新**：Token 过期前可以使用 `User.Refresh()` 刷新 Token
4. **登出处理**：登出时需要清除本地存储的 Token 和 Expire
5. **错误处理**：所有 API 调用都应该包含错误处理逻辑
6. **路由守卫**：建议在路由守卫中使用 `User.IsLogin()` 检查登录状态

## 相关组件

- [Drawer](../../Section/Drawer/Drawer.md) - 抽屉组件（User 组件使用）
- [Menu](../../Section/Menu/Menu.md) - 菜单组件（User 组件使用）
- [Input](../../Element/Input/Input.md) - 输入框组件（UserLogin 组件使用）
- [Form](../../Section/Form/Form.md) - 表单组件
- [Button](../../Element/Button/Button.md) - 按钮组件
- [Icon](../../Element/Icon/Icon.md) - 图标组件
- [Avatar](../../Element/Avatar/Avatar.md) - 头像组件

## 文件结构

```
src/packet/Pattern/User/
├── User.ts          # 类型定义和 API 服务（核心文件）
├── User.vue         # 用户菜单组件
├── UserLogin.vue    # 用户登录组件
├── UserCreate.vue   # 用户注册组件
├── UserEdit.vue     # 用户编辑组件
├── UserSelect.vue   # 用户选择组件
├── UserPassword.vue # 密码修改组件
├── ProfileEdit.vue # 个人信息编辑组件（如果存在）
├── PasswordChange.vue # 密码修改组件（如果存在）
└── User.md          # 本文档
