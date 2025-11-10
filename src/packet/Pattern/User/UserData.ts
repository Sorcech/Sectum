import type { UserInfo, SettingsForm } from './User'

// 获取初始用户信息
export function getInitialUserInfo(): UserInfo {
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '',
    role: '管理员',
    department: '技术部',
    phone: '138-0000-0000',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-20 10:30:00'
  }
}

// 获取初始设置表单（基于用户信息）
export function getInitialSettingsForm(userInfo: UserInfo): SettingsForm {
  return {
    // 个人资料
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    // 通知设置
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    // 隐私设置
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    // 账户设置
    language: 'zh-CN',
    theme: 'auto',
    timezone: 'Asia/Shanghai'
  }
}

