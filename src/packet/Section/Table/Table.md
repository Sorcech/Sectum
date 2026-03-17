# Table 表格组件

一个功能强大的数据表格组件，支持内联编辑、动态样式配置和响应式布局。基于 UnoCSS 原子类构建，提供现代化的表格体验。

## 功能特性

- ✅ **内联编辑** - 点击单元格即可直接编辑内容，支持 Enter 确认、Escape 取消
- ✅ **动态样式** - 支持列宽、对齐方式、文本截断等配置
- ✅ **响应式设计** - 自适应不同屏幕尺寸
- ✅ **固定表头** - 滚动时表头保持可见
- ✅ **表头排序** - 支持升序/降序/取消排序，点击表头图标即可排序
- ✅ **列筛选** - 支持文本筛选和下拉选择筛选
- ✅ **列宽拖拽** - 通过拖拽列边界调整列宽
- ✅ **分页功能** - 支持自定义每页条数、页码跳转、快速跳转，智能切换分页器模式（≤9页显示页码按钮，>9页显示完整控件）
- ✅ **UnoCSS 集成** - 使用原子类，性能优异
- ✅ **类型安全** - 完整的 TypeScript 支持
- ✅ **新旧 API 兼容** - 支持新 API（dataSource + columns）和旧 API（data）

## 基础用法

### 新 API（推荐）

```vue
<template>
  <Table :dataSource="dataSource" :columns="columns" />
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/packet/Section/Table/Table.vue'
import type { ColumnsType } from '@/packet/Section/Table/Table'

const columns: ColumnsType = [
  { key: 'id', title: 'ID', dataIndex: 'id', width: 80, align: 'center' },
  { key: 'name', title: '姓名', dataIndex: 'name', width: 120, align: 'left', ellipsis: true },
  { key: 'email', title: '邮箱', dataIndex: 'email', width: 200, align: 'left', ellipsis: true },
  { key: 'status', title: '状态', dataIndex: 'status', width: 100, align: 'center' }
]

const dataSource = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', status: '活跃' },
  { id: 2, name: '李四', email: 'lisi@example.com', status: '离线' },
  { id: 3, name: '王五', email: 'wangwu@example.com', status: '活跃' }
])
</script>
```

### 旧 API（兼容）

```vue
<template>
  <Table :data="tableData" />
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
</script>
```

## Props 属性

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| `dataSource` | `Array` | `[]` | ❌ | 数据源数组（新 API，推荐使用） |
| `columns` | `ColumnsType` | `[]` | ❌ | 列配置数组（新 API，推荐使用） |
| `data` | `LegacyTableData` | `undefined` | ❌ | 旧 API 数据对象（兼容旧代码） |
| `rowKey` | `string \| Function` | `'id'` | ❌ | 行键，用于标识每一行 |
| `pagination` | `TablePaginationConfig \| false` | `undefined` | ❌ | 分页配置对象，设置为 `false` 可禁用分页 |
| `loading` | `boolean` | `false` | ❌ | 是否显示加载状态 |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` | ❌ | 表格尺寸 |
| `bordered` | `boolean` | `true` | ❌ | 是否显示边框 |
| `striped` | `boolean` | `false` | ❌ | 是否显示斑马纹 |
| `scroll` | `Object` | `undefined` | ❌ | 滚动配置 `{ x?: number \| string \| true, y?: number \| string }` |
| `title` | `any` | `undefined` | ❌ | 表格标题 |
| `footer` | `any` | `undefined` | ❌ | 表格底部自定义内容 |
| `emptyText` | `string` | `''` | ❌ | 空数据提示文本 |
| `showHeader` | `boolean` | `true` | ❌ | 是否显示表头 |

### Columns 列配置（新 API）

```typescript
interface ColumnType {
  // 基础配置
  key?: string                    // 列的唯一标识
  dataIndex?: string | string[]   // 数据字段名，支持嵌套路径
  title?: string | Function       // 列标题
  width?: number | string         // 列宽（数字为像素，字符串为 CSS 值）
  align?: 'left' | 'center' | 'right'  // 文本对齐方式
  ellipsis?: boolean | { showTitle?: boolean }  // 是否启用文本截断
  truncate?: boolean              // 兼容旧 API：是否启用文本截断
  
  // 编辑配置
  editable?: boolean              // 是否可编辑
  
  // 排序配置
  sorter?: boolean | CompareFn | { compare?: CompareFn; multiple?: number }
  sortable?: boolean              // 兼容旧 API：是否可排序
  sortOrder?: SortOrder
  defaultSortOrder?: SortOrder
  sortDirections?: SortOrder[]
  
  // 筛选配置
  filters?: ColumnFilterItem[]
  filterable?: boolean            // 兼容旧 API：是否可筛选
  filterType?: 'text' | 'select'  // 兼容旧 API：筛选类型
  filterOptions?: any[]           // 兼容旧 API：筛选选项
  onFilter?: (value: any, record: any) => boolean
  
  // 固定列
  fixed?: 'left' | 'right' | boolean
  
  // 列宽调整
  resizable?: boolean             // 是否可调整列宽
  
  // 自定义渲染
  customRender?: (props: { value: any; record: any; index: number; column: ColumnType }) => any
  
  // 其他
  className?: string
  colSpan?: number
  rowSpan?: number
}
```

### LegacyTableData 旧 API 结构

```typescript
interface LegacyTableData {
  tableHead: LegacyColumnType[]  // 表头配置
  tableBody: any[]               // 表格数据
}

interface LegacyColumnType {
  key: string
  text: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  truncate?: boolean
  sortable?: boolean
  filterable?: boolean
  filterType?: 'text' | 'select'
  filterOptions?: any[]
  resizable?: boolean
  fixed?: 'left' | 'right'
  editable?: boolean
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
5. **事件通知** - 编辑开始、结束和值变化时触发相应事件

### 编辑行为说明

- 只有配置了 `editable: true` 的列才支持编辑
- 可编辑单元格在样式上会有区分（hover 效果和编辑状态样式）
- 编辑时会显示输入框，自动聚焦并选中文本
- 点击表格外部区域或按 Escape 键会自动退出编辑模式
- 编辑功能已集成到 Table 组件中，无需额外组件

### 可编辑列配置示例

```vue
<template>
  <Table 
    :dataSource="dataSource" 
    :columns="columns"
    @cell-edit="handleCellEdit"
    @cell-edit-start="handleCellEditStart"
    @cell-edit-end="handleCellEditEnd"
  />
</template>

<script setup>
import { ref } from 'vue'
import type { ColumnsType } from '@/packet/Section/Table/Table'

const columns: ColumnsType = [
  { 
    key: 'id', 
    title: 'ID', 
    dataIndex: 'id',
    editable: false  // 不可编辑
  },
  { 
    key: 'name', 
    title: '姓名', 
    dataIndex: 'name',
    editable: true   // 可编辑
  },
  { 
    key: 'email', 
    title: '邮箱', 
    dataIndex: 'email',
    editable: true   // 可编辑
  }
]

const dataSource = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
])

// 处理单元格编辑事件
function handleCellEdit(record: any, columnKey: string | number, newValue: any, oldValue: any, index: number) {
  console.log('单元格值已更改:', { record, columnKey, newValue, oldValue, index })
  // 更新数据源
  record[columnKey] = newValue
}

function handleCellEditStart(record: any, columnKey: string | number, index: number) {
  console.log('开始编辑:', { record, columnKey, index })
}

function handleCellEditEnd(record: any, columnKey: string | number, value: any, index: number) {
  console.log('结束编辑:', { record, columnKey, value, index })
}
</script>
```

### 编辑事件说明

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `cell-edit` | `(record, columnKey, newValue, oldValue, index)` | 单元格值发生变化时触发 |
| `cell-edit-start` | `(record, columnKey, index)` | 开始编辑单元格时触发 |
| `cell-edit-end` | `(record, columnKey, value, index)` | 结束编辑单元格时触发（无论值是否变化） |

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

- `Table.vue` - 主表格组件（包含所有功能，包括内联编辑）
- `Table.ts` - 类型定义、工具函数和 Hooks（分页、排序、筛选）
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
// 编辑状态管理
const editingCell = ref<{ columnKey: Key; rowIndex: number } | null>(null)
const editInputValue = ref<string>('')

// 处理单元格点击
function handleCellClick(record: any, col: ColumnType, columnKey: Key, index: number) {
  if (!isEditable(col)) return
  
  const currentValue = String(getCellValue(record, col) ?? '')
  editInputValue.value = currentValue
  editingCell.value = { columnKey, rowIndex: index }
  
  emit('cell-edit-start', record, columnKey, index)
  
  // 聚焦输入框
  setTimeout(() => {
    const input = document.querySelector(`.table-td.editing input`) as HTMLInputElement
    if (input) {
      input.focus()
      input.select()
    }
  }, 0)
}

// 处理编辑完成
function handleCellEdit(record: any, col: ColumnType, columnKey: Key, newValue: string, index: number) {
  const oldValue = getCellValue(record, col)
  editingCell.value = null
  editInputValue.value = ''
  
  emit('cell-edit-end', record, columnKey, newValue, index)
  
  if (String(oldValue) !== String(newValue)) {
    emit('cell-edit', record, columnKey, newValue, oldValue, index)
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

### 2. 表头排序

```vue
<template>
  <Table :data="tableData" :pagination="{ enabled: true, pageSize: 10 }" />
</template>

<script setup>
const tableData = ref({
  tableHead: [
    { 
      key: 'id', 
      text: 'ID', 
      width: 'w-20', 
      align: 'center',
      sortable: true  // 启用排序（默认启用）
    },
    { 
      key: 'name', 
      text: '姓名', 
      width: 'w-32', 
      align: 'left',
      sortable: true,
      filterable: true  // 启用筛选
    },
    { 
      key: 'status', 
      text: '状态', 
      width: 'w-24', 
      align: 'center',
      sortable: true,
      filterable: true,
      filterType: 'select',  // 使用下拉选择筛选
      filterOptions: ['活跃', '离线', '待审核']  // 筛选选项
    }
  ],
  tableBody: [
    { id: 1, name: '张三', status: '活跃' },
    { id: 2, name: '李四', status: '离线' },
    { id: 3, name: '王五', status: '活跃' }
  ]
})
</script>
```

**排序使用说明：**
- 点击表头的排序图标（上下箭头）进行排序
- 第一次点击：升序（↑）
- 第二次点击：降序（↓）
- 第三次点击：取消排序

**筛选使用说明：**
- 点击表头的筛选图标（漏斗图标）打开筛选面板
- 文本筛选：输入关键词进行模糊匹配
- 下拉筛选：从预设选项中选择
- 点击"确定"应用筛选，点击"清除"移除筛选

### 3. 列宽拖拽

```vue
<template>
  <Table :data="tableData" />
</template>

<script setup>
const tableData = ref({
  tableHead: [
    { 
      key: 'name', 
      text: '姓名', 
      resizable: true  // 启用列宽拖拽（默认启用）
    }
  ],
  tableBody: [
    { id: 1, name: '张三' }
  ]
})
</script>
```

**列宽拖拽使用说明：**
- 将鼠标悬停在列边界上，光标会变为调整大小图标
- 按住鼠标左键并拖拽即可调整列宽
- 最小列宽为 50px
- 拖拽时列边界会高亮显示

### 4. 分页功能

Table 组件支持两种分页器显示模式，会根据总页数自动切换：

#### 分页器显示模式

1. **简单分页模式**（总页数 ≤ 9）：
   - 显示格式：`← 1 2 3 4 5 6 7 8 9 →`
   - 左侧箭头：上一页（第一页时禁用）
   - 页码按钮：显示所有页码，当前页高亮显示
   - 右侧箭头：下一页（最后一页时禁用）
   - 适合页数较少的情况，可以快速跳转到任意页面

2. **完整分页模式**（总页数 > 9）：
   - 显示格式：`首页 | 上一页 | 下一页 | 末尾 | 跳转到 [输入框] 页`
   - 包含首页、上一页、下一页、末尾按钮
   - 支持快速跳转到指定页面（如果启用了 `showQuickJumper`）
   - 适合页数较多的情况，提供更精确的导航控制

#### 前端分页（客户端分页）

当数据已经在客户端时，可以使用 Table 组件内置的分页功能：

```vue
<template>
  <Table 
    :dataSource="dataSource" 
    :columns="columns"
    :pagination="{
      current: 1,
      pageSize: 20,
      total: 100,
      pageSizeOptions: ['20', '50', '100'],
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, size) => {
        console.log('Page changed:', page, size)
      }
    }"
  />
</template>

<script setup>
import type { ColumnsType } from '@/packet/Section/Table/Table'

const columns: ColumnsType = [
  { key: 'id', title: 'ID', dataIndex: 'id' },
  { key: 'name', title: '姓名', dataIndex: 'name' }
]

const dataSource = ref([
  // 大量数据（所有数据都在客户端）
])
</script>
```

#### 后端分页（服务端分页）

当数据由后端分页时，应该禁用 Table 组件的客户端分页，使用 `footer` 属性自定义分页控件：

```vue
<template>
  <Table 
    :data="tableData" 
    :quantity="totalItems"
    :pagination="false"
    :footer="paginationFooter"
  />
</template>

<script setup>
import { ref, computed, h } from 'vue'
import Btn from '~/packet/Element/Button/Button.vue'

const currentPage = ref(1)
const pageSize = ref(20)
const totalItems = ref(0)
const totalPages = ref(0)

// 分页表尾组件
const paginationFooter = computed(() => {
  return () => {
    // 如果总数少于20条，只显示数量
    if (totalItems.value < 20) {
      return h('div', {
        class: 'px-4 py-2 text-center text-sm text-base-content/70'
      }, `共 ${totalItems.value} 条`)
    }
    
    // 如果总数多于20条，显示完整的分页控件
    return h('div', {
      class: 'w-full bg-base-200 py-3'
    }, [
      h('div', {
        class: 'flex items-center justify-between px-4'
      }, [
        // 分页控件内容...
      ])
    ])
  }
})

// 加载数据
const loadData = async () => {
  const res = await fetchData({
    page: currentPage.value,
    pageSize: pageSize.value
  })
  // 更新数据...
}
</script>
```

**分页功能说明：**

- **分页器模式切换**：
  - 总页数 ≤ 9：自动使用简单分页模式（显示所有页码按钮）
  - 总页数 > 9：自动使用完整分页模式（显示首页/上一页/下一页/末尾按钮）

- **前端分页**：适用于数据量较小，所有数据都在客户端的情况
  - `current`: 当前页码，默认 `1`
  - `pageSize`: 每页显示条数，默认 `10`
  - `total`: 总记录数
  - `pageSizeOptions`: 每页条数选项，如 `['20', '50', '100']`
  - `showSizeChanger`: 是否显示每页条数选择器
  - `showQuickJumper`: 是否显示快速跳转（仅在完整分页模式下显示）
  - `onChange`: 页码或每页条数改变时的回调
  - `onShowSizeChange`: 每页条数改变时的回调

- **后端分页**：适用于数据量大，需要从服务端获取分页数据的情况
  - 设置 `pagination: false` 禁用客户端分页
  - 使用 `footer` 属性传入自定义分页控件
  - 分页控件应该使用 `py-3` 作为上下 padding，`px-4` 作为左右 padding（在子元素中）
  - 当总数少于20条时，建议只显示数量；当总数多于20条时，显示完整的分页控件

**分页器使用示例：**

```vue
<template>
  <!-- 简单分页模式示例（总页数 ≤ 9） -->
  <Table 
    :dataSource="smallDataSource" 
    :columns="columns"
    :pagination="{ current: 1, pageSize: 10, total: 50 }"
  />
  
  <!-- 完整分页模式示例（总页数 > 9） -->
  <Table 
    :dataSource="largeDataSource" 
    :columns="columns"
    :pagination="{ 
      current: 1, 
      pageSize: 10, 
      total: 200,
      showQuickJumper: true 
    }"
  />
</template>
```

### 5. 性能优化

```javascript
// 对于大量数据，启用分页功能
const tableData = {
  tableHead: [...],
  tableBody: [...大量数据...]
}

// 在组件中使用分页
<Table 
  :data="tableData" 
  :pagination="{ enabled: true, pageSize: 20 }"
/>
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

## Events 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `change` | `(pagination, filters, sorter, extra)` | 分页、筛选、排序变化时触发 |
| `row-click` | `(record, index)` | 点击行时触发 |
| `sort-change` | `(sorter)` | 排序变化时触发 |
| `filter-change` | `(filters)` | 筛选变化时触发 |
| `page-change` | `(page, pageSize)` | 分页变化时触发 |
| `cell-edit` | `(record, columnKey, newValue, oldValue, index)` | 单元格值发生变化时触发 |
| `cell-edit-start` | `(record, columnKey, index)` | 开始编辑单元格时触发 |
| `cell-edit-end` | `(record, columnKey, value, index)` | 结束编辑单元格时触发 |

## 注意事项

1. **数据格式** - 确保每行数据都有唯一的标识（通过 `rowKey` 配置）
2. **编辑权限** - 只有配置了 `editable: true` 的列才支持编辑
3. **样式兼容** - 组件使用 UnoCSS 原子类，确保项目中已正确配置
4. **事件处理** - 编辑时会阻止事件冒泡，避免意外触发其他点击事件
5. **API 选择** - 推荐使用新 API（`dataSource` + `columns`），旧 API（`data`）仅用于兼容
6. **类型安全** - 使用 TypeScript 时，建议从 `Table.ts` 导入类型定义

## 完整示例

### 带排序、筛选、分页的完整表格

```vue
<template>
  <Table 
    :data="tableData" 
    :pagination="paginationConfig"
  />
</template>

<script setup>
import { ref } from 'vue'

const paginationConfig = ref({
  enabled: true,
  pageSize: 10,
  current: 1
})

const tableData = ref({
  tableHead: [
    { 
      key: 'id', 
      text: 'ID', 
      width: 'w-20', 
      align: 'center',
      sortable: true,
      resizable: true
    },
    { 
      key: 'name', 
      text: '姓名', 
      width: 'w-32', 
      align: 'left',
      truncate: true,
      sortable: true,
      filterable: true,
      filterType: 'text',
      resizable: true
    },
    { 
      key: 'email', 
      text: '邮箱', 
      width: 'w-48', 
      align: 'left',
      truncate: true,
      sortable: true,
      filterable: true,
      filterType: 'text',
      resizable: true
    },
    { 
      key: 'status', 
      text: '状态', 
      width: 'w-24', 
      align: 'center',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['活跃', '离线', '待审核'],
      resizable: true
    },
    { 
      key: 'actions', 
      text: '操作', 
      width: 'w-32', 
      align: 'center',
      sortable: false,  // 操作列通常不需要排序
      filterable: false,  // 操作列通常不需要筛选
      resizable: false  // 操作列通常不需要调整宽度
    }
  ],
  tableBody: [
    { 
      id: 1, 
      name: '张三', 
      email: 'zhangsan@example.com', 
      status: '活跃',
      actions: '<button class="btn btn-sm">编辑</button>'
    },
    { 
      id: 2, 
      name: '李四', 
      email: 'lisi@example.com', 
      status: '离线',
      actions: '<button class="btn btn-sm">编辑</button>'
    },
    // ... 更多数据
  ]
})
</script>
```

## Footer 自定义表尾

Table 组件支持通过 `footer` 属性自定义表格底部内容，常用于实现自定义分页控件。

### 基础用法

```vue
<template>
  <Table 
    :data="tableData" 
    :footer="customFooter"
  />
</template>

<script setup>
import { h } from 'vue'

const customFooter = () => {
  return h('div', {
    class: 'px-4 py-2 text-center text-sm text-base-content/70'
  }, '自定义表尾内容')
}
</script>
```

### 响应式 Footer

Footer 可以是函数，支持响应式数据：

```vue
<script setup>
import { ref, computed, h } from 'vue'

const totalItems = ref(0)

const paginationFooter = computed(() => {
  return () => {
    // 根据 totalItems 动态显示内容
    if (totalItems.value < 20) {
      return h('div', {
        class: 'px-4 py-2 text-center text-sm text-base-content/70'
      }, `共 ${totalItems.value} 条`)
    }
    
    // 显示完整分页控件
    return h('div', {
      class: 'w-full bg-base-200 py-3'
    }, [
      h('div', {
        class: 'flex items-center justify-between px-4'
      }, [
        // 分页控件内容
      ])
    ])
  }
})
</script>
```

### 样式规范

Footer 容器的样式规范：
- 外层容器：使用 `py-3` 作为上下 padding（避免水平溢出）
- 内层内容：使用 `px-4` 作为左右 padding（在子元素中设置）
- 背景色：使用 `bg-base-200` 保持与表格风格一致

```vue
// ✅ 正确：外层 py-3，内层 px-4
h('div', {
  class: 'w-full bg-base-200 py-3'
}, [
  h('div', {
    class: 'flex items-center justify-between px-4'
  }, [
    // 内容
  ])
])

// ❌ 错误：外层使用 p-4 会导致水平溢出
h('div', {
  class: 'w-full bg-base-200 p-4'  // 会导致溢出
}, [
  // 内容
])
```

## 更新日志

### v3.1.0
- ✨ 新增智能分页器模式切换
  - 总页数 ≤ 9：显示简单分页模式（← 1 2 3 4 5 6 7 8 9 →）
  - 总页数 > 9：显示完整分页模式（首页+上一页+下一页+末尾+跳转）
- 🎨 优化分页器用户体验，简单模式下可直接点击页码跳转

### v3.0.0
- ✨ 新增新 API（`dataSource` + `columns`），推荐使用
- ✨ 优化可编辑单元格功能，支持 Enter 确认、Escape 取消
- ✨ 新增可编辑单元格事件（`cell-edit`、`cell-edit-start`、`cell-edit-end`）
- ✨ 合并 EditInput 组件到 Table.vue，简化依赖
- ✨ 合并所有类型定义、工具函数和 Hooks 到 Table.ts
- 🎨 优化可编辑单元格样式，添加 hover 效果和编辑状态样式
- 🗑️ 移除 `quantity` prop（未使用）
- 📝 更新文档，完善新 API 使用说明

### v2.1.0
- ✨ 新增 `footer` 属性，支持自定义表格底部内容
- ✨ 优化后端分页支持，可通过 `pagination: false` 禁用客户端分页
- 🎨 优化分页控件样式，修复水平溢出问题
- 📝 完善分页功能文档，区分前端分页和后端分页

### v2.0.0
- ✨ 新增表头排序功能（升序/降序/取消）
- ✨ 新增列筛选功能（文本筛选、下拉选择筛选）
- ✨ 新增列宽拖拽调整功能
- ✨ 新增分页功能（支持自定义每页条数、页码跳转）
- 🎨 优化表头交互体验
- 🐛 修复内联编辑在分页场景下的索引问题

### v1.0.0
- ✨ 初始版本发布
- ✨ 支持基础表格显示
- ✨ 支持内联编辑功能
- ✨ 支持动态样式配置
- ✨ 集成 UnoCSS 原子类
- ✨ 完整的 TypeScript 支持

---

## 功能设计文档

### 一、核心功能

#### 1. 基础功能
- ✅ **数据展示**：支持数组数据源，自动渲染表格
- ✅ **列配置**：通过 `columns` 配置列定义
- ✅ **行键**：支持自定义行键（`rowKey`）
- ✅ **空状态**：数据为空时显示空状态提示
- ✅ **加载状态**：支持加载中状态显示

#### 2. 排序功能
- ✅ **单列排序**：点击表头进行升序/降序/取消排序
- ✅ **多列排序**：支持多个列同时排序（优先级）
- ✅ **自定义排序**：支持自定义排序函数
- ✅ **排序方向**：可配置排序方向（ascend/descend/null）
- ✅ **排序提示**：支持排序工具提示

#### 3. 筛选功能
- ✅ **下拉筛选**：支持下拉菜单筛选
- ✅ **树形筛选**：支持树形结构筛选
- ✅ **搜索筛选**：支持筛选项搜索
- ✅ **多选筛选**：支持多选筛选
- ✅ **自定义筛选**：支持自定义筛选下拉框
- ✅ **筛选状态**：显示筛选激活状态

#### 4. 分页功能
- ✅ **前端分页**：支持前端数据分页（客户端分页）
- ✅ **后端分页**：支持后端分页（通过 `pagination: false` 禁用客户端分页，使用 `footer` 自定义分页控件）
- ✅ **分页配置**：可配置每页条数、当前页、总记录数等
- ✅ **分页位置**：支持分页器位置配置（上/下/上下）
- ✅ **快速跳转**：支持页码快速跳转
- ✅ **自定义分页**：通过 `footer` 属性实现完全自定义的分页控件
- ✅ **智能显示**：根据数据总量自动切换显示模式（少于20条显示数量，多于20条显示完整分页控件）

#### 5. 固定列功能
- ✅ **固定左侧列**：支持固定左侧列
- ✅ **固定右侧列**：支持固定右侧列
- ✅ **固定表头**：支持固定表头
- ✅ **固定展开列**：支持固定展开列位置

#### 6. 展开功能
- ✅ **行展开**：支持行展开显示详情
- ✅ **树形展开**：支持树形数据展开
- ✅ **自定义展开**：支持自定义展开内容
- ✅ **展开图标**：支持自定义展开图标
- ✅ **展开触发**：支持点击行或图标展开

#### 7. 选择功能
- ✅ **单选**：支持单行选择（radio）
- ✅ **多选**：支持多行选择（checkbox）
- ✅ **全选**：支持全选/取消全选
- ✅ **反选**：支持反选功能
- ✅ **选择状态**：支持受控/非受控选择状态
- ✅ **选择禁用**：支持禁用某些行的选择

#### 8. 列宽调整
- ✅ **拖拽调整**：支持拖拽列边界调整列宽
- ✅ **最小宽度**：支持设置列最小宽度
- ✅ **固定宽度**：支持固定列宽

#### 9. 响应式功能
- ✅ **响应式列**：支持根据断点显示/隐藏列
- ✅ **自适应宽度**：支持列宽自适应

#### 10. 自定义渲染
- ✅ **自定义单元格**：支持自定义单元格内容（slot）
- ✅ **自定义表头**：支持自定义表头内容
- ✅ **自定义行**：支持自定义行样式和属性
- ✅ **自定义空状态**：支持自定义空状态显示

### 二、API 设计

#### Props

```typescript
interface TableProps {
  // 数据源
  dataSource?: any[]
  columns?: ColumnsType[]
  
  // 行配置
  rowKey?: string | ((record: any, index: number) => string | number)
  rowClassName?: string | ((record: any, index: number) => string)
  customRow?: (record: any, index: number) => Record<string, any>
  
  // 分页
  pagination?: false | PaginationConfig
  
  // 加载
  loading?: boolean | SpinProps
  
  // 样式
  size?: 'small' | 'middle' | 'large'
  bordered?: boolean
  striped?: boolean
  
  // 滚动
  scroll?: {
    x?: number | string | true
    y?: number | string
    scrollToFirstRowOnChange?: boolean
  }
  
  // 固定
  sticky?: boolean | StickyConfig
  
  // 展开
  expandedRowKeys?: Key[]
  defaultExpandedRowKeys?: Key[]
  expandedRowRender?: (record: any, index: number) => VNode
  expandRowByClick?: boolean
  expandIcon?: (props: ExpandIconProps) => VNode
  
  // 选择
  rowSelection?: RowSelectionConfig
  
  // 事件
  onChange?: (pagination: PaginationConfig, filters: Record<string, any>, sorter: SorterResult, extra: TableCurrentDataSource) => void
  onRowClick?: (record: any, index: number, event: Event) => void
  onExpand?: (expanded: boolean, record: any) => void
  onExpandedRowsChange?: (expandedKeys: Key[]) => void
  
  // 其他
  showHeader?: boolean
  title?: () => VNode
  footer?: (() => VNode) | Component  // 表格底部自定义内容
  locale?: TableLocale
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
}
```

#### Column 配置

```typescript
interface ColumnType {
  // 基础
  key?: string
  dataIndex?: string | string[]
  title?: string | ((props: ColumnTitleProps) => VNode)
  width?: number | string
  align?: 'left' | 'center' | 'right'
  ellipsis?: boolean | { showTitle?: boolean }
  
  // 排序
  sorter?: boolean | CompareFn | { compare?: CompareFn; multiple?: number }
  sortOrder?: SortOrder
  defaultSortOrder?: SortOrder
  sortDirections?: SortOrder[]
  showSorterTooltip?: boolean | TooltipProps
  
  // 筛选
  filters?: ColumnFilterItem[]
  filterDropdown?: VNode | ((props: FilterDropdownProps) => VNode)
  filterMultiple?: boolean
  filteredValue?: FilterValue | null
  defaultFilteredValue?: FilterValue | null
  filterIcon?: VNode | ((opt: { filtered: boolean; column: ColumnType }) => VNode)
  filterMode?: 'menu' | 'tree'
  filterSearch?: boolean | ((input: string, record: any) => boolean)
  onFilter?: (value: any, record: any) => boolean
  
  // 固定
  fixed?: 'left' | 'right' | boolean
  
  // 响应式
  responsive?: Breakpoint[]
  
  // 自定义渲染
  customRender?: (props: { value: any; record: any; index: number; column: ColumnType }) => VNode
  customHeaderCell?: (column: ColumnType) => Record<string, any>
  customCell?: (record: any, index: number) => Record<string, any>
  
  // 其他
  className?: string
  colSpan?: number
  rowSpan?: number
  onCell?: (record: any, index: number) => Record<string, any>
  onHeaderCell?: (column: ColumnType) => Record<string, any>
}
```

#### Events

```typescript
// onChange 事件参数
interface ChangeEventInfo {
  pagination: {
    current?: number
    pageSize?: number
    total?: number
  }
  filters: Record<string, FilterValue | null>
  sorter: SorterResult | SorterResult[]
  filterStates: FilterState[]
  sorterStates: SortState[]
  resetPagination: Function
}

// SorterResult
interface SorterResult {
  column?: ColumnType
  order?: SortOrder
  field?: Key | Key[]
  columnKey?: Key
}
```

### 三、实现要点

#### 1. 数据流
- 数据源 → 筛选 → 排序 → 分页 → 显示
- 支持受控和非受控模式

#### 2. 状态管理
- 使用 Vue 3 Composition API
- 分离关注点：排序、筛选、分页各自独立管理
- 使用 computed 实现响应式数据流

#### 3. 性能优化
- 虚拟滚动（大数据量）
- 懒加载（展开行）
- 防抖（筛选输入）

#### 4. 兼容性
- 保持与现有 API 的兼容（tableHead/tableBody）
- 支持渐进式迁移

### 四、实现计划

#### Phase 1: 核心功能
1. 基础表格渲染
2. 排序功能
3. 筛选功能
4. 分页功能

#### Phase 2: 高级功能
1. 固定列
2. 展开行
3. 行选择
4. 列宽调整

#### Phase 3: 优化
1. 性能优化
2. 响应式支持
3. 自定义渲染增强
4. 文档完善

### 五、参考实现

- Ant Design Vue Table: `../Source/ant-design-vue-main/components/table/`
- VcTable (底层实现): `../Source/ant-design-vue-main/components/vc-table/`

### 六、注意事项

1. **保持兼容性**：现有代码使用 `tableHead`/`tableBody`，需要保持兼容
2. **样式系统**：使用 UnoCSS，保持与项目风格一致
3. **类型安全**：完整的 TypeScript 类型定义
4. **可访问性**：支持键盘导航和屏幕阅读器
5. **国际化**：支持多语言