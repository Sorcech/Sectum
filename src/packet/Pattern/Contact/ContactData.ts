import type { ContactProfile } from './Contact'

// 获取初始联系人列表（ContactProfile 格式，供 Contact.vue 使用）
export function getInitialContactList(): ContactProfile[] {
  return [
    { Passport: 1, Name: 'John Doe', Phone: '010-1234-5678', Email: 'john.doe@example.com', Address: 'A座 301' },
    { Passport: 2, Name: 'Jane Smith', Phone: '010-1234-5679', Email: 'jane.smith@example.com', Address: 'B座 205' },
    { Passport: 3, Name: 'Mike Johnson', Phone: '010-1234-5680', Email: 'mike.johnson@example.com', Address: 'B座 206' },
    { Passport: 4, Name: 'Sarah Williams', Phone: '010-1234-5681', Email: 'sarah.williams@example.com', Address: 'C座 102' },
    { Passport: 5, Name: 'David Brown', Phone: '010-1234-5682', Email: 'david.brown@example.com', Address: 'A座 201' },
    { Passport: 6, Name: 'Emily Davis', Phone: '010-1234-5683', Email: 'emily.davis@example.com', Address: 'B座 301' }
  ]
}

