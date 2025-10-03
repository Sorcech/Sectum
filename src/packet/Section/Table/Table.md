# Table 表格组件

一个功能强大的数据表格组件，支持内联编辑、动态样式配置和响应式布局。基于 UnoCSS 原子类构建，提供现代化的表格体验。

## 功能特性

- ✅ **内联编辑** - 点击单元格即可直接编辑内容
- ✅ **动态样式** - 支持列宽、对齐方式、文本截断等配置
- ✅ **响应式设计** - 自适应不同屏幕尺寸
- ✅ **固定表头** - 滚动时表头保持可见
- ✅ **UnoCSS 集成** - 使用原子类，性能优异
- ✅ **类型安全** - 完整的 TypeScript 支持

## 基础用法

```vue
<template>
  <Table :data="tableData" :quantity="totalCount" />
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/packet/Section/Table/Table.vue'

const tableData = ref({
  tableHead: [
    { key: 'id', text: 'ID', width: 'w-20', align: 'center', truncate: false },
    { key: 'name', text: '姓名', width: 'w-32', align: 'left', truncate: true },
    { key: 'email', text: '邮箱', width: 'w-48', align: 'left', truncate: true },
    { key: 'status', text: '状态', width: 'w-24', align: 'center', truncate: false }
  ],
  tableBody: [
    { id: 1, name: '张三', email: 'zhangsan@example.com', status: '活跃' },
    { id: 2, name: '李四', email: 'lisi@example.com', status: '离线' },
    { id: 3, name: '王五', email: 'wangwu@example.com', status: '活跃' }
  ]
})

const totalCount = ref(3)
</script>
```

## Props 属性

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| `data` | `Object` | `{ tableHead: [], tableBody: [] }` | ✅ | 表格数据对象 |
| `quantity` | `Number` | `0` | ❌ | 数据总数量，显示在表尾 |

### data 对象结构

#### tableHead 表头配置

```typescript
interface TableHeadItem {
  key: string        // 列的唯一标识
  text: string       // 列显示文本
  width?: string     // 列宽 (UnoCSS 类名，如 'w-32', 'w-1/3')
  align?: 'left' | 'center' | 'right'  // 文本对齐方式
  truncate?: boolean // 是否启用文本截断
  editable?: boolean // 是否可编辑 (默认根据列配置)
}
```

#### tableBody 表格数据

```typescript
interface TableBodyItem {
  id: string | number  // 行的唯一标识
  [key: string]: any   // 其他数据字段，key 对应 tableHead 中的 key
}
```

## 高级用法

### 自定义列配置

```vue
<template>
  <Table :data="customTableData" :quantity="items.length" />
</template>

<script setup>
const customTableData = ref({
  tableHead: [
    { 
      key: 'avatar', 
      text: '头像', 
      width: 'w-16', 
      align: 'center',
      truncate: false 
    },
    { 
      key: 'username', 
      text: '用户名', 
      width: 'w-40', 
      align: 'left',
      truncate: true 
    },
    { 
      key: 'role', 
      text: '角色', 
      width: 'w-24', 
      align: 'center',
      truncate: false 
    },
    { 
      key: 'lastLogin', 
      text: '最后登录', 
      width: 'w-36', 
      align: 'center',
      truncate: false 
    }
  ],
  tableBody: [
    { 
      id: 1, 
      avatar: '👤', 
      username: 'admin', 
      role: '管理员', 
      lastLogin: '2024-01-15' 
    },
    { 
      id: 2, 
      avatar: '👥', 
      username: 'user001', 
      role: '普通用户', 
      lastLogin: '2024-01-14' 
    }
  ]
})
</script>
```

### 动态数据更新

```vue
<template>
  <div>
    <button @click="addItem" class="btn btn-primary mb-4">添加数据</button>
    <Table :data="tableData" :quantity="tableData.tableBody.length" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref({
  tableHead: [
    { key: 'id', text: 'ID', width: 'w-20', align: 'center' },
    { key: 'name', text: '名称', width: 'w-48', align: 'left', truncate: true },
    { key: 'price', text: '价格', width: 'w-24', align: 'right' }
  ],
  tableBody: [
    { id: 1, name: '商品A', price: '¥99.00' },
    { id: 2, name: '商品B', price: '¥199.00' }
  ]
})

const addItem = () => {
  const newId = Math.max(...tableData.value.tableBody.map(item => item.id)) + 1
  tableData.value.tableBody.push({
    id: newId,
    name: `商品${String.fromCharCode(65 + newId - 1)}`,
    price: `¥${(Math.random() * 1000 + 50).toFixed(2)}`
  })
}
</script>
```

## 内联编辑功能

表格支持点击单元格进行内联编辑：

1. **点击可编辑单元格** - 自动切换到编辑模式
2. **输入框自动聚焦** - 文本自动选中，方便快速编辑
3. **确认修改** - 失去焦点时自动保存，或按 Enter 键确认
4. **取消修改** - 按 Escape 键取消编辑
5. **修改确认** - 数据变更时会弹出确认对话框

### 编辑行为说明

- 只有配置了 `editable: true` 的列才支持编辑
- 编辑时会临时创建 `EditInput` 组件实例
- 修改数据前会显示确认对话框
- 点击表格外部区域会自动退出编辑模式

## 样式定制

### 列宽设置

使用 UnoCSS 宽度类名：

```javascript
const widthOptions = [
  'w-16',    // 4rem (64px)
  'w-20',    // 5rem (80px)
  'w-24',    // 6rem (96px)
  'w-32',    // 8rem (128px)
  'w-48',    // 12rem (192px)
  'w-64',    // 16rem (256px)
  'w-1/3',   // 33.333333%
  'w-1/2',   // 50%
  'w-2/3',   // 66.666667%
  'w-full'   // 100%
]
```

### 文本对齐

```javascript
const alignOptions = [
  'left',    // 左对齐
  'center',  // 居中对齐
  'right'    // 右对齐
]
```

### 文本截断

```javascript
const truncateOptions = [
  true,   // 启用截断，超长文本显示省略号
  false   // 不截断，文本可能换行
]
```

## 组件架构

### 主要文件

- `Table.vue` - 主表格组件
- `EditInput.vue` - 内联编辑输入组件
- `Table.md` - 组件文档

### 核心功能实现

#### 1. 动态样式管理

```typescript
// 使用 computed 属性管理样式类
const bodyCellClasses = computed(() => {
  return (key: any) => {
    return [
      'relative border-1 hover:bg-base-300 font-thin text-current text-base whitespace-nowrap p-4 align-middle',
      checkTruncate(key),
      checkAlign(key),
      checkWidth(key)
    ].filter(Boolean).join(' ')
  }
})
```

#### 2. 内联编辑系统

```typescript
// 动态创建编辑组件
function showEditInput(event: { target: any; }, key: any, index: any) {
  editInputApp && removeEditInputApp()
  if (!checkEditable(key)) return
  
  const target = event.target
  editInputApp = createApp(EditInput, {
    value: target.textContent,
    setValue
  })
  
  if (editInputApp) {
    editInputApp.mount(target)
    target.querySelector('input').select()
  }
}
```

#### 3. 数据验证与更新

```typescript
// 数据修改确认机制
const editData = ({ index, key, value, text }: any, removeInput: () => void) => {
  removeInput()
  if (props.data.tableBody[index][key] != value) {
    const cfm = window.confirm(`
    您确定将数据下表第${index}项${text}字段的内容修改为${value}吗？`)
    if (cfm) {
      props.data.tableBody = props.data.tableBody.map((item: { [x: string]: any; }, idx: any) => {
        index === idx && (item[key] = value)
        return item
      })
    }
  }
}
```

## 最佳实践

### 1. 数据准备

```javascript
// 确保每行数据都有唯一的 id
const tableData = {
  tableHead: [
    { key: 'id', text: 'ID', width: 'w-20', align: 'center' },
    // ... 其他列配置
  ],
  tableBody: [
    { id: 1, name: '数据1' },  // ✅ 有唯一 id
    { id: 2, name: '数据2' },  // ✅ 有唯一 id
    // ❌ 避免没有 id 的数据
  ]
}
```

### 2. 性能优化

```javascript
// 对于大量数据，考虑分页或虚拟滚动
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return allData.value.slice(start, end)
})
```

### 3. 响应式设计

```javascript
// 根据屏幕尺寸调整列宽
const responsiveWidths = {
  mobile: 'w-20',
  tablet: 'w-32',
  desktop: 'w-48'
}
```

## 注意事项

1. **数据格式** - 确保 `tableBody` 中的每项都有唯一的 `id` 字段
2. **编辑权限** - 只有配置了 `editable: true` 的列才支持编辑
3. **样式兼容** - 组件使用 UnoCSS 原子类，确保项目中已正确配置
4. **事件处理** - 编辑时会阻止事件冒泡，避免意外触发其他点击事件
5. **内存管理** - 编辑组件会在适当时机自动销毁，避免内存泄漏

## 更新日志

### v1.0.0
- ✨ 初始版本发布
- ✨ 支持基础表格显示
- ✨ 支持内联编辑功能
- ✨ 支持动态样式配置
- ✨ 集成 UnoCSS 原子类
- ✨ 完整的 TypeScript 支持