

/**
 * 用户登录信息接口（匹配后端 LoginReq）
 */
export interface UserLoginInfo {
  Passport: string
  Password: string
}


// 用户详细信息接口（用于用户资料页面）
export interface UserProfile {
  name: string
  email: string
  avatar?: string
  role: string
  department: string
  phone: string
  joinDate: string
  lastLogin: string
}

// 用户信息接口（用于任务等场景的简单用户信息）
export interface UserInfo {
  id: string | number
  name: string
  avatar?: string
  status?: 'online' | 'offline' | 'away' | 'busy' | ''
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

/**
 * 获取初始用户列表（用于开发和测试的默认数据）
 * @returns UserInfo[]
 */
export function getInitialUserList(): UserInfo[] {
  return [
    { id: 1, name: '张三', avatar: '', status: 'online' },
    { id: 2, name: '李四', avatar: '', status: 'away' },
    { id: 3, name: '王五', avatar: '', status: 'offline' },
    { id: 4, name: '赵六', avatar: '', status: 'busy' },
    { id: 5, name: '钱七', avatar: '', status: 'online' },
    { id: 6, name: '孙八', avatar: '', status: 'online' },
    { id: 7, name: '周九', avatar: '', status: 'away' },
    { id: 8, name: '吴十', avatar: '', status: 'offline' }
  ]
}

// 获取初始用户信息
export function getInitialUserInfo(): UserProfile {
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
export function getInitialSettingsForm(userInfo: UserProfile): SettingsForm {
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
