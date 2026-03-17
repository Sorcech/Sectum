// 联系人接口（列表项，用于 ContactData 等）
export interface ContactItem {
  id: number
  name: string
  avatar?: string
  position: string
  department: string
  email: string
  phone?: string
  mobile?: string
  office?: string
  isOnline?: boolean
  tags?: string[]
  notes?: string
}

// 联系人详情（与 User 解耦后的展示用）
export interface ContactProfile {
  Passport: number
  Name: string
  Phone?: string
  Email?: string
  Gender?: string
  Birthday?: string | Date | null
  Address?: string
  CreateAt?: string | Date | null
}

