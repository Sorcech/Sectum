import type { ContactItem } from './Contact'

// 获取初始联系人列表
export function getInitialContactList(): ContactItem[] {
  return [
    {
      id: 1,
      name: 'John Doe',
      position: '产品经理',
      department: '产品部',
      email: 'john.doe@example.com',
      phone: '010-1234-5678',
      mobile: '138-0000-0001',
      office: 'A座 301',
      isOnline: true,
      tags: ['核心成员', '产品'],
      notes: '负责产品规划和设计，有丰富的产品经验。'
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: '前端开发工程师',
      department: '技术部',
      email: 'jane.smith@example.com',
      phone: '010-1234-5679',
      mobile: '138-0000-0002',
      office: 'B座 205',
      isOnline: true,
      tags: ['技术', '前端'],
      notes: '擅长 Vue.js 和 React 开发。'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      position: '后端开发工程师',
      department: '技术部',
      email: 'mike.johnson@example.com',
      phone: '010-1234-5680',
      mobile: '138-0000-0003',
      office: 'B座 206',
      isOnline: false,
      tags: ['技术', '后端'],
      notes: '专注于 Node.js 和 Python 开发。'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      position: 'UI/UX 设计师',
      department: '设计部',
      email: 'sarah.williams@example.com',
      phone: '010-1234-5681',
      mobile: '138-0000-0004',
      office: 'C座 102',
      isOnline: true,
      tags: ['设计', 'UI'],
      notes: '专注于用户体验设计和界面设计。'
    },
    {
      id: 5,
      name: 'David Brown',
      position: '项目经理',
      department: '项目管理部',
      email: 'david.brown@example.com',
      phone: '010-1234-5682',
      mobile: '138-0000-0005',
      office: 'A座 201',
      isOnline: false,
      tags: ['管理', '项目'],
      notes: '负责项目进度管理和团队协调。'
    },
    {
      id: 6,
      name: 'Emily Davis',
      position: '测试工程师',
      department: '质量保证部',
      email: 'emily.davis@example.com',
      phone: '010-1234-5683',
      mobile: '138-0000-0006',
      office: 'B座 301',
      isOnline: true,
      tags: ['测试', 'QA'],
      notes: '负责产品质量测试和bug修复验证。'
    }
  ]
}

