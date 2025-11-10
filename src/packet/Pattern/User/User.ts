// 用户信息接口
export interface UserInfo {
  name: string
  email: string
  avatar?: string
  role: string
  department: string
  phone: string
  joinDate: string
  lastLogin: string
}

// 设置表单接口
export interface SettingsForm {
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

