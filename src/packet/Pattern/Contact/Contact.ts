// 联系人接口
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

