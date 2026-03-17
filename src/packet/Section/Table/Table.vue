<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted, onUnmounted, toRef } from 'vue'
import { useI18n } from 'vue-i18n'
import usePagination, {
  useSorter,
  useFilter,
  convertLegacyData,
  getColumnKey,
  getNestedValue,
  convertWidth,
  type ColumnsType,
  type ColumnType,
  type LegacyTableData,
  type TablePaginationConfig,
  type Key,
  type SortOrder,
  type FilterValue,
  type SorterResult,
} from './Table'

const { t } = useI18n()


// Props 定义
const props = withDefaults(defineProps<{
  // 数据配置（推荐使用新 API）
  dataSource?: any[]
  columns?: ColumnsType
  data?: LegacyTableData
  // 通用配置
  rowKey?: string | ((record: any, index: number) => Key)
  pagination?: false | TablePaginationConfig
  loading?: boolean
  size?: 'small' | 'middle' | 'large'
  bordered?: boolean
  striped?: boolean
  scroll?: { x?: number | string | true; y?: number | string }
  title?: any
  footer?: any
  emptyText?: string
  showHeader?: boolean
}>(), {
  rowKey: 'id',
  size: 'middle',
  bordered: true,
  striped: false,
  loading: false,
  showHeader: true,
  emptyText: '',
})

const emit = defineEmits<{
  change: [
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: any,
    extra: { currentDataSource: any[]; action: 'paginate' | 'sort' | 'filter' }
  ]
  'row-click': [record: any, index: number]
  'sort-change': [sorter: any]
  'filter-change': [filters: Record<string, FilterValue | null>]
  'page-change': [page: number, pageSize: number]
  'cell-edit': [record: any, columnKey: Key, value: any, oldValue: any, index: number]
  'cell-edit-start': [record: any, columnKey: Key, index: number]
  'cell-edit-end': [record: any, columnKey: Key, value: any, index: number]
}>()

// Refs
const tableHeaderRef = ref<HTMLElement | null>(null)
const tableBodyRef = ref<HTMLElement | null>(null)

// 数据转换：兼容旧 API
const normalizedData = computed(() => {
  if (props.data) {
    // 旧 API: { tableHead, tableBody }
    return convertLegacyData(props.data)
  }
  // 新 API: { columns, dataSource }
  return {
    columns: props.columns || [],
    dataSource: props.dataSource || [],
  }
})

const columnsRef = computed(() => normalizedData.value.columns)
const dataSourceRef = computed(() => normalizedData.value.dataSource)

// 扁平化列（处理列分组）
const flattenColumns = computed(() => {
  const flatten = (cols: ColumnsType): ColumnType[] => {
    const result: ColumnType[] = []
    cols.forEach((col) => {
      if ('children' in col && Array.isArray(col.children)) {
        result.push(...flatten(col.children))
      } else {
        result.push(col)
      }
    })
    return result
  }
  return flatten(columnsRef.value)
})

// 排序 Hook
const { sortStates, sortedData } = useSorter({
  columns: columnsRef,
  onSorterChange: (sorterResult, sortStates) => {
    emit('sort-change', sorterResult)
    handleChange('sort', sorterResult)
  },
})

// 筛选 Hook
const { filterStates, triggerFilter, filteredData } = useFilter({
  columns: columnsRef,
  onFilterChange: (filters, filterStates) => {
    emit('filter-change', filters)
    handleChange('filter', filters)
  },
})

// 分页 Hook
const totalRef = computed(() => {
  const filtered = filteredData.value(sortedData.value(dataSourceRef.value))
  return filtered.length
})

const { pagination: mergedPagination, onInternalChange, paginatedData } = usePagination({
  total: totalRef,
  pagination: toRef(props, 'pagination'),
  onChange: (current, pageSize) => {
    emit('page-change', current, pageSize)
    handleChange('paginate', { current, pageSize })
  },
})

// 合并分页配置值
const mergedPaginationValue = computed(() => {
  const pagination = mergedPagination.value
  if (pagination === false) return null
  if (!pagination || typeof pagination !== 'object') return null
  return pagination
})

// 内部分页状态（用于 UI 控制）
// 从 props.pagination 获取初始值，如果没有则使用 pageSizeOptions 的第一个值
const getInitialPageSize = (): number => {
  const pagination = props.pagination
  // 优先使用传入的 pageSize
  if (pagination && typeof pagination === 'object' && pagination.pageSize !== undefined && pagination.pageSize !== null) {
    return pagination.pageSize
  }
  // 如果没有传入 pageSize，使用 pageSizeOptions 的第一个值
  if (pagination && typeof pagination === 'object' && pagination.pageSizeOptions && pagination.pageSizeOptions.length > 0) {
    return Number(pagination.pageSizeOptions[0])
  }
  // 如果都没有，使用默认值（但这种情况不应该发生）
  return 25
}

const innerPagination = reactive({
  current: 1,
  pageSize: getInitialPageSize(),
})

watch(mergedPaginationValue, (pagination) => {
  if (pagination) {
    innerPagination.current = pagination.current || 1
    // 优先使用传入的 pageSize，否则使用 pageSizeOptions 的第一个值
    if (pagination.pageSize !== undefined && pagination.pageSize !== null) {
      innerPagination.pageSize = pagination.pageSize
    } else if (pagination.pageSizeOptions && pagination.pageSizeOptions.length > 0) {
      innerPagination.pageSize = Number(pagination.pageSizeOptions[0])
    }
  }
}, { immediate: true, deep: true })

const totalPages = computed(() => {
  const pagination = mergedPaginationValue.value
  if (!pagination) return 1
  const total = pagination.total || 0
  const pageSize = pagination.pageSize || 10
  return Math.ceil(total / pageSize) || 1
})

// 判断是否使用简单分页模式（总页数 <= 9）
const useSimplePagination = computed(() => {
  return totalPages.value <= 9
})

// 判断是否只有一页（数据不足一页）
const isSinglePage = computed(() => {
  const pagination = mergedPaginationValue.value
  if (!pagination) return true
  const total = pagination.total || 0
  const pageSize = pagination.pageSize || 10
  return total <= pageSize
})

// 分页统计文本
const paginationText = computed(() => {
  const pagination = mergedPaginationValue.value
  if (!pagination) return ''
  const total = pagination.total || 0
  const current = pagination.current || 1
  return `${t('table.pagination.total')} ${total} ${t('table.pagination.items')}，${t('table.pagination.current')} ${current} ${t('table.pagination.of')} ${totalPages.value} ${t('table.pagination.page')}`
})

const pageSizeOptions = computed(() => {
  const pagination = mergedPaginationValue.value
  if (pagination?.pageSizeOptions) {
    return pagination.pageSizeOptions
  }
  return ['25', '50', '100']
})

// 将 pageSizeOptions 转换为 slct 组件需要的格式
const pageSizeSelectOptions = computed(() => {
  return pageSizeOptions.value.map(size => ({
    label: String(size),
    value: Number(size)
  }))
})

const jumpPage = ref(1)

// 编辑状态
const editingCell = ref<{ columnKey: Key; rowIndex: number } | null>(null)
const editInputValue = ref<string>('')

// 筛选 UI 状态
const showFilterDropdown = reactive<Record<Key, boolean>>({})
const filterInputValues = reactive<Record<Key, any>>({})
const filterSelectedKeys = reactive<Record<Key, Key[]>>({})

// 列宽状态
const columnWidths = reactive<Record<Key, number>>({})
const isResizing = ref<Key | null>(null)
const resizeStartX = ref(0)
const resizeStartWidth = ref(0)
const resizeColumnKey = ref<Key | null>(null)
const resizeNextColumnKey = ref<Key | null>(null)
const resizeNextStartWidth = ref(0)

// 同步横向滚动
const syncHorizontalScroll = () => {
  if (tableBodyRef.value && tableHeaderRef.value) {
    // 表头跟随表体的横向滚动
    tableHeaderRef.value.scrollLeft = tableBodyRef.value.scrollLeft
  }
}

// 初始化列宽
onMounted(() => {
  flattenColumns.value.forEach((col, index) => {
    const key = getColumnKey(col, index)
    if (!columnWidths[key]) {
      const width = convertWidth(col.width)
      if (width) {
        columnWidths[key] = width
      }
    }
  })
  
  // 监听表体的横向滚动，同步表头
  if (tableBodyRef.value) {
    tableBodyRef.value.addEventListener('scroll', syncHorizontalScroll)
  }
})

// 数据处理流程：数据源 → 筛选 → 排序 → 分页
const processedData = computed(() => {
  let data = [...dataSourceRef.value]
  
  // 1. 筛选
  data = filteredData.value(data)
  
  // 2. 排序
  data = sortedData.value(data)
  
  return data
})

// 显示数据（分页后）
const displayedData = computed(() => {
  const pagination = mergedPagination.value
  if (pagination === false) {
    return processedData.value
  }
  
  // 判断是否为服务端分页：如果数据长度等于 pageSize 且 total 大于数据长度，则认为是服务端分页
  // 服务端分页时，后端已经返回了分页后的数据，不需要再进行客户端分页
  const dataLength = processedData.value.length
  const pageSize = pagination.pageSize || 10
  const total = pagination.total || 0
  
  // 如果数据长度等于 pageSize 且 total 大于 pageSize，认为是服务端分页
  // 或者数据长度小于 pageSize 但 total 大于数据长度，也认为是服务端分页
  const isServerSidePagination = total > 0 && (
    (dataLength === pageSize && total > pageSize) ||
    (dataLength < pageSize && total > dataLength)
  )
  
  if (isServerSidePagination) {
    // 服务端分页：直接返回所有数据，不进行客户端分页
    return processedData.value
  }
  
  // 客户端分页：对数据进行分页
  return paginatedData.value(processedData.value)
})

// 工具函数
function getColumnTitle(col: ColumnType): string {
  if (typeof col.title === 'string') {
    return col.title
  }
  if (typeof col.title === 'function') {
    return col.title({}) as string
  }
  return ''
}

function getCellValue(record: any, col: ColumnType): any {
  const dataIndex = col.dataIndex || col.key
  if (!dataIndex) return ''
  
  if (col.customRender) {
    const value = getNestedValue(record, dataIndex)
    const result = col.customRender({
      value,
      record,
      index: 0,
      column: col,
    })
    return result
  }
  
  const dataIndexKey = Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex
  return getNestedValue(record, dataIndexKey)
}

function getRowKey(record: any, index: number): Key {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(record, index)
  }
  return record[props.rowKey] ?? index
}

function getColumnWidth(col: ColumnType): string {
  const key = col.key || (Array.isArray(col.dataIndex) ? col.dataIndex.join('.') : col.dataIndex)
  if (key && columnWidths[key]) {
    return `${columnWidths[key]}px`
  }
  const width = convertWidth(col.width)
  if (width) {
    return `${width}px`
  }
  return 'auto'
}

// 排序相关
function isSortable(col: ColumnType): boolean {
  return !!(col.sorter || col.sortable)
}

function hasSortOrFilter(col: ColumnType): boolean {
  return isSortable(col) || isFilterable(col)
}

function handleSortClickWithOrder(col: ColumnType, columnKey: Key, order: SortOrder) {
  const sortState = sortStates.find((s) => s.key === columnKey)
  // 如果点击的是当前排序方向，则取消排序；否则设置为该方向
  const newSortOrder = sortState?.sortOrder === order ? null : order
  
  // 如果是单列排序，清除其他排序
  if (!col.sorter || (typeof col.sorter === 'object' && !col.sorter.multiple)) {
    sortStates.forEach((state) => {
      if (state.key !== columnKey) {
        state.sortOrder = null
      }
    })
  }
  
  if (sortState) {
    sortState.sortOrder = newSortOrder
  } else if (newSortOrder) {
    // 只有在有排序方向时才添加新状态
    sortStates.push({
      column: col,
      key: columnKey,
      multiplePriority: typeof col.sorter === 'object' && typeof col.sorter.multiple === 'number' ? col.sorter.multiple : false,
      sortOrder: newSortOrder,
    })
  }
  
  // 触发排序变化事件
  const sorterResult: SorterResult[] = sortStates
    .filter((state) => state.sortOrder)
    .map((state) => ({
      column: state.column,
      order: state.sortOrder,
      field: state.key,
      columnKey: state.key,
    }))
  
  emit('sort-change', sorterResult.length === 1 ? sorterResult[0] : sorterResult)
  handleChange('sort', sorterResult.length === 1 ? sorterResult[0] : sorterResult)
}

function getSortIconClass(col: ColumnType, columnKey: Key, order: SortOrder): string {
  const sortState = sortStates.find((s) => s.key === columnKey)
  if (!sortState?.sortOrder) return 'text-base-content/30'
  // 映射：asc -> ascend, desc -> descend
  const orderMap: Record<string, SortOrder> = {
    'asc': 'ascend',
    'desc': 'descend',
  }
  const normalizedOrder = orderMap[sortState.sortOrder] || sortState.sortOrder
  return normalizedOrder === order ? 'text-primary' : 'text-base-content/30'
}

// 筛选相关
function isFilterable(col: ColumnType): boolean {
  return !!(col.filters || col.filterable || col.onFilter)
}

function getFilterType(col: ColumnType): 'text' | 'select' | 'menu' {
  if (col.filters) return 'menu'
  if (col.filterType === 'select') return 'select'
  return 'text'
}

function getFilterOptions(col: ColumnType): any[] {
  if (col.filterOptions) {
    return col.filterOptions
  }
  if (col.filters) {
    return col.filters.map((f) => f.value)
  }
  // 从数据中提取唯一值
  const values = new Set<string>()
  const dataIndex = col.dataIndex || col.key
  if (dataIndex) {
    dataSourceRef.value.forEach((row) => {
      const value = getNestedValue(row, dataIndex)
      if (value !== null && value !== undefined && value !== '') {
        values.add(String(value))
      }
    })
  }
  return Array.from(values).sort()
}

function toggleFilter(col: ColumnType, columnKey: Key) {
  Object.keys(showFilterDropdown).forEach((k) => {
    if (k !== columnKey) showFilterDropdown[k] = false
  })
  showFilterDropdown[columnKey] = !showFilterDropdown[columnKey]
  if (!showFilterDropdown[columnKey]) {
    filterInputValues[columnKey] = ''
    filterSelectedKeys[columnKey] = []
  }
}

function isFilterActive(col: ColumnType, columnKey: Key): boolean {
  const filterState = filterStates.find((f) => f.key === columnKey)
  return !!(filterState?.filteredKeys && filterState.filteredKeys.length > 0)
}

function getFilterKeys(col: ColumnType, columnKey: Key): Key[] {
  return filterSelectedKeys[columnKey] || []
}

function setFilterKeys(col: ColumnType, columnKey: Key, keys: Key[]) {
  filterSelectedKeys[columnKey] = keys
}

function confirmFilter(col: ColumnType, columnKey: Key) {
  const keys = filterSelectedKeys[columnKey] || []
  if (col.filters) {
    triggerFilter(col, columnKey, keys.length > 0 ? keys : null)
  } else {
    const value = filterInputValues[columnKey]
    triggerFilter(col, columnKey, value ? [value] : null)
  }
  showFilterDropdown[columnKey] = false
}

function clearFilter(col: ColumnType, columnKey: Key) {
  filterInputValues[columnKey] = ''
  filterSelectedKeys[columnKey] = []
  triggerFilter(col, columnKey, null)
  showFilterDropdown[columnKey] = false
}

function closeFilter(col: ColumnType, columnKey: Key) {
  showFilterDropdown[columnKey] = false
}

function handleFilterInput(col: ColumnType, columnKey: Key) {
  // 实时筛选（可选）
}

function handleFilterSelectChange(col: ColumnType, columnKey: Key) {
  // 下拉选择变化
}

function toggleFilterItem(col: ColumnType, columnKey: Key, value: string | number | boolean) {
  const keys = filterSelectedKeys[columnKey] || []
  const keyValue = value as Key
  const index = keys.indexOf(keyValue)
  if (index > -1) {
    keys.splice(index, 1)
  } else {
    keys.push(keyValue)
  }
  filterSelectedKeys[columnKey] = keys
}

function isFilterItemSelected(col: ColumnType, columnKey: Key, value: string | number | boolean): boolean {
  const keys = filterSelectedKeys[columnKey] || []
  return keys.includes(value as Key)
}

function getFilterDropdown(col: ColumnType) {
  if (typeof col.filterDropdown === 'function') {
    return col.filterDropdown
  }
  return col.filterDropdown
}

// 列宽调整
function isResizable(col: ColumnType): boolean {
  return col.resizable !== false
}

function startResize(event: MouseEvent, col: ColumnType, columnKey: Key) {
  isResizing.value = columnKey
  resizeColumnKey.value = columnKey
  resizeStartX.value = event.clientX
  resizeStartWidth.value = columnWidths[columnKey] || convertWidth(col.width) || 100

  // 找到当前列在 flattenColumns 中的索引
  const currentIndex = flattenColumns.value.findIndex((c, idx) => {
    const key = getColumnKey(c, idx)
    return key === columnKey
  })

  // 找到右侧相邻的列
  if (currentIndex >= 0 && currentIndex < flattenColumns.value.length - 1) {
    const nextCol = flattenColumns.value[currentIndex + 1]
    const nextKey = getColumnKey(nextCol, currentIndex + 1)
    resizeNextColumnKey.value = nextKey
    resizeNextStartWidth.value = columnWidths[nextKey] || convertWidth(nextCol.width) || 100
  } else {
    resizeNextColumnKey.value = null
    resizeNextStartWidth.value = 0
  }

  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  event.preventDefault()
  event.stopPropagation()
}

function handleResize(event: MouseEvent) {
  if (!resizeColumnKey.value) return

  const diff = event.clientX - resizeStartX.value
  const newWidth = Math.max(50, resizeStartWidth.value + diff)
  
  // 如果存在右侧相邻列，同时调整两列的宽度
  if (resizeNextColumnKey.value) {
    const nextNewWidth = Math.max(50, resizeNextStartWidth.value - diff)
    columnWidths[resizeColumnKey.value] = newWidth
    columnWidths[resizeNextColumnKey.value] = nextNewWidth
  } else {
    // 如果没有右侧列（最后一列），只调整当前列
    columnWidths[resizeColumnKey.value] = newWidth
  }
}

function stopResize() {
  isResizing.value = null
  resizeColumnKey.value = null
  resizeNextColumnKey.value = null
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
}

// 分页控制
function goToPage(page: number) {
  const pagination = mergedPaginationValue.value
  if (page >= 1 && page <= totalPages.value && pagination) {
    onInternalChange(page, pagination.pageSize || 10)
    jumpPage.value = page
  }
}

function handlePageSizeChange() {
  if (mergedPaginationValue) {
    onInternalChange(1, innerPagination.pageSize)
    jumpPage.value = 1
  }
}

// 处理 slct 组件的选择事件
function handlePageSizeSelect(item: { value: number; label: string }) {
  innerPagination.pageSize = item.value
  handlePageSizeChange()
}

function handleJumpPage() {
  goToPage(jumpPage.value)
}

// 行点击
function handleRowClick(record: any, index: number) {
  emit('row-click', record, index)
}

// 可编辑相关
function isEditable(col: ColumnType): boolean {
  return col.editable === true
}

function handleCellClick(record: any, col: ColumnType, columnKey: Key, index: number) {
  if (!isEditable(col)) {
    return
  }
  
  // 如果已经在编辑这个单元格，不重复触发
  if (editingCell.value?.columnKey === columnKey && editingCell.value?.rowIndex === index) {
    return
  }
  
  // 设置编辑状态和初始值
  const currentValue = String(getCellValue(record, col) ?? '')
  editInputValue.value = currentValue
  editingCell.value = { columnKey, rowIndex: index }
  
  // 触发编辑开始事件
  emit('cell-edit-start', record, columnKey, index)
  
  // 聚焦输入框（使用 nextTick 确保 DOM 已更新）
  setTimeout(() => {
    // 通过事件目标或查询选择器找到输入框
    const input = document.querySelector(`.table-td.editing input`) as HTMLInputElement
    if (input) {
      input.focus()
      input.select()
    }
  }, 0)
}

function handleCellInput(e: Event, record: any, col: ColumnType, columnKey: Key, index: number) {
  const target = e.target as HTMLInputElement
  editInputValue.value = target.value.trim()
}

function handleCellBlur(e: Event, record: any, col: ColumnType, columnKey: Key, index: number) {
  handleCellEdit(record, col, columnKey, editInputValue.value, index)
}

function handleCellEnter(e: KeyboardEvent, record: any, col: ColumnType, columnKey: Key, index: number) {
  e.preventDefault()
  handleCellEdit(record, col, columnKey, editInputValue.value, index)
}

function handleCellEsc() {
  // 取消编辑，恢复原值
  editingCell.value = null
  editInputValue.value = ''
}

function handleCellEdit(record: any, col: ColumnType, columnKey: Key, newValue: string, index: number) {
  const oldValue = getCellValue(record, col)
  
  // 清除编辑状态
  editingCell.value = null
  editInputValue.value = ''
  
  // 触发编辑结束事件
  emit('cell-edit-end', record, columnKey, newValue, index)
  
  // 如果值发生变化，触发编辑事件
  if (String(oldValue) !== String(newValue)) {
    emit('cell-edit', record, columnKey, newValue, oldValue, index)
  }
}

// 变化处理
function handleChange(action: 'paginate' | 'sort' | 'filter', data: any) {
  const basePagination = mergedPagination.value
  if (basePagination === false || !basePagination) {
    emit('change', {} as TablePaginationConfig, {}, null, {
      currentDataSource: processedData.value,
      action,
    })
    return
  }

  // 构建分页对象，如果是分页操作，使用最新的分页值
  let paginationConfig: TablePaginationConfig = { ...basePagination }
  if (action === 'paginate' && data) {
    paginationConfig = {
      ...paginationConfig,
      current: data.current ?? paginationConfig.current ?? 1,
      pageSize: data.pageSize ?? paginationConfig.pageSize ?? 10,
    }
  }

  const filters: Record<string, FilterValue | null> = {}
  filterStates.forEach((state) => {
    filters[String(state.key)] = state.filteredKeys || null
  })

  const sorter = sortStates.filter((s) => s.sortOrder).map((s) => ({
    column: s.column,
    order: s.sortOrder,
    field: s.key,
    columnKey: s.key,
  }))

  emit('change', paginationConfig, filters, sorter.length === 1 ? sorter[0] : sorter, {
    currentDataSource: processedData.value,
    action,
  })
}

// 样式计算
const wrapperClass = computed(() => {
  return [
    props.bordered && 'table-bordered',
    props.striped && 'table-striped',
    `table-size-${props.size}`,
  ].filter(Boolean)
})

const tableClass = computed(() => {
  return []
})

const tableStyle = computed(() => {
  return {
    tableLayout: 'fixed' as const, // 使用 fixed 布局，确保表头和表体列宽一致
    width: '100%',
    borderCollapse: 'separate' as const, // 使用 separate 模式，确保边框显示
    borderSpacing: '0' as const,
  }
})

const tableContentStyle = computed(() => {
  return {}
})

const bodyScrollStyle = computed(() => {
  if (props.scroll?.y) {
    const y = typeof props.scroll.y === 'number' ? `${props.scroll.y}px` : props.scroll.y
    return { maxHeight: y, overflowY: 'auto' as const }
  }
  // 不设置 maxHeight，让 flex 布局自动处理高度
  return {}
})

function getHeaderClass(col: ColumnType): string {
  return [
    col.align && `text-${col.align}`,
    'font-medium',
  ].filter(Boolean).join(' ')
}

function getHeaderStyle(col: ColumnType): Record<string, any> {
  const width = getColumnWidth(col)
  return {
    width: width,
    minWidth: width === 'auto' ? '0' : width, // auto 时设置 minWidth 为 0，允许收缩
    borderBottom: '1px solid var(--base-300)', // 使用内联样式确保边框显示
  }
}

function getRowClass(record: any, index: number): string {
  return [
    'hover:bg-base-200 transition-colors',
    props.striped && index % 2 === 0 && 'bg-base-50',
  ].filter(Boolean).join(' ')
}

function getCellClass(col: ColumnType, record?: any, index?: number, colIndex?: number): string {
  const baseClasses = [
    col.align && `text-${col.align}`,
    (col.ellipsis || col.truncate) && 'truncate',
  ]
  
  // 可编辑单元格样式
  if (isEditable(col) && colIndex !== undefined && index !== undefined) {
    baseClasses.push('editable-cell')
    const columnKey = getColumnKey(col, colIndex)
    if (editingCell.value?.columnKey === columnKey && editingCell.value?.rowIndex === index) {
      baseClasses.push('editing')
    }
  }
  
  return baseClasses.filter(Boolean).join(' ')
}

function getCellStyle(col: ColumnType): Record<string, any> {
  const width = getColumnWidth(col)
  return {
    width: width,
    minWidth: width === 'auto' ? '0' : width, // 确保与表头列宽一致
    borderBottom: '1px solid var(--base-300)', // 使用内联样式确保边框显示
  }
}

// 清理
onUnmounted(() => {
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  // 移除滚动监听
  if (tableBodyRef.value) {
    tableBodyRef.value.removeEventListener('scroll', syncHorizontalScroll)
  }
})
</script>
<template>
  <div class="w-full h-full flex flex-col" :class="wrapperClass">
    <!-- 加载状态 -->
    <div v-if="loading" class="absolute inset-0 z-10 bg-base-100/80 flex items-center justify-center">
      <div class="flex items-center gap-2 text-base-content/70">
        <icn name="spinner" light xl class="animate-spin text-primary mr-2"></icn>
        <span>加载中...</span>
      </div>
    </div>
    
    <!-- 表格容器 -->
    <div class="relative w-full flex-1 flex flex-col min-h-0" ref="tableContainerRef" :class="{ 'opacity-50 pointer-events-none': loading }">

      <!-- 表格主体 -->
      <div class="relative w-full flex-1 flex flex-col min-h-0" :style="tableContentStyle">
        <!-- 表头（横向滚动） -->
        <div class="w-full bg-base-200 flex-shrink-0 overflow-x-auto" ref="tableHeaderRef">
          <table class="w-full border-separate border-spacing-0" :class="tableClass" :style="tableStyle">
            <colgroup>
              <col
                v-for="(col, index) in flattenColumns"
                :key="getColumnKey(col, index)"
                :style="{ width: getColumnWidth(col) }"
              />
            </colgroup>
            <thead class="bg-base-200">
              <tr>
                <th
                  v-for="(col, index) in flattenColumns"
                  :key="getColumnKey(col, index)"
                  :class="getHeaderClass(col)"
                  :style="getHeaderStyle(col)"
                  class="table-th px-2 border-l-1 border-r-1 border-solid border-base-300 text-base-content/80 relative select-none"
                  :colspan="col.colSpan"
                  :rowspan="col.rowSpan"
                >
                  <slot
                    :name="`header-${getColumnKey(col, index)}`"
                    :column="col"
                    :index="index"
                  >
                    <div class="flex items-center justify-between gap-2">
                      <span class="flex-1">
                        {{ getColumnTitle(col) }}
                      </span>
                    <div class="flex items-center" v-if="hasSortOrFilter(col)">
                      <!-- 排序 -->
                      <Group v-if="isSortable(col)" direction="vertical" clean size="sm" spacing="none" class="p-0 min-w-0 h-auto">
                        <btn clean size="sm" class="p-0 min-w-0 h-auto flex items-center justify-center"
                          :class="getSortIconClass(col, getColumnKey(col, index), 'ascend')"
                          @click.stop="handleSortClickWithOrder(col, getColumnKey(col, index), 'ascend')"
                        >
                          <icn name="chevron-up" light sm></icn>
                        </btn>
                        <btn clean size="sm" class="p-0 min-w-0 h-auto flex items-center justify-center"
                          :class="getSortIconClass(col, getColumnKey(col, index), 'descend')"
                          @click.stop="handleSortClickWithOrder(col, getColumnKey(col, index), 'descend')"
                        >
                          <icn name="chevron-down" light sm></icn>
                        </btn>
                      </Group>
                      <!-- 筛选 -->
                      <btn v-if="isFilterable(col)" @click.stop="toggleFilter(col, getColumnKey(col, index))" variant="transparent" size="xs" class="p-0 min-w-0 h-auto" :class="{ 'text-primary': isFilterActive(col, getColumnKey(col, index)) }">
                        <icn name="filter" light sm></icn>
                      </btn>
                    </div>
                  </div>
                  </slot>
                  <!-- 筛选下拉框 -->
                  <div
                    v-if="showFilterDropdown[getColumnKey(col, index)]"
                    @click.stop
                    class="absolute top-full left-0 z-50 mt-1 bg-base-100 border border-base-300 rounded shadow-lg p-2 min-w-48"
                  >
                    <component
                      :is="getFilterDropdown(col)"
                      v-if="col.filterDropdown"
                      :column="col"
                      :setSelectedKeys="(keys: any[]) => setFilterKeys(col, getColumnKey(col, index), keys)"
                      :selectedKeys="getFilterKeys(col, getColumnKey(col, index))"
                      :confirm="() => confirmFilter(col, getColumnKey(col, index))"
                      :clearFilters="() => clearFilter(col, getColumnKey(col, index))"
                      :close="() => closeFilter(col, getColumnKey(col, index))"
                      :visible="showFilterDropdown[getColumnKey(col, index)]"
                    />
                    <div v-else class="w-full">
                      <ipt
                        v-if="getFilterType(col) === 'text'"
                        v-model="filterInputValues[getColumnKey(col, index)]"
                        @input="handleFilterInput(col, getColumnKey(col, index))"
                        type="text"
                        :placeholder="`筛选 ${getColumnTitle(col)}`"
                        class="input input-sm input-bordered w-full mb-2"
                      />
                      <slct
                        v-else-if="getFilterType(col) === 'select'"
                        v-model="filterInputValues[getColumnKey(col, index)]"
                        @change="handleFilterSelectChange(col, getColumnKey(col, index))"
                        class="select select-sm select-bordered w-full mb-2"
                      >
                        <option value="">全部</option>
                        <option v-for="option in getFilterOptions(col)" :key="option" :value="option">
                          {{ option }}
                        </option>
                      </slct>
                      <div v-else-if="col.filters" class="max-h-48 overflow-y-auto mb-2">
                        <div
                          v-for="filter in col.filters"
                          :key="String(filter.value)"
                          class="flex items-center p-3 hover:bg-base-200 cursor-pointer"
                          @click="toggleFilterItem(col, getColumnKey(col, index), filter.value)"
                        >
                          <ipt
                            type="checkbox"
                            :checked="isFilterItemSelected(col, getColumnKey(col, index), filter.value)"
                            class="checkbox checkbox-sm mr-2"
                          />
                          <span>{{ filter.text }}</span>
                        </div>
                      </div>
                      <div class="flex gap-2 mt-2">
                        <btn size="sm" @click="clearFilter(col, getColumnKey(col, index))">清除</btn>
                        <btn size="sm" color="primary" @click="confirmFilter(col, getColumnKey(col, index))">确定</btn>
                      </div>
                    </div>
                  </div>
                  <!-- 列宽调整手柄 -->
                  <div
                    v-if="isResizable(col)"
                    @mousedown.stop="startResize($event, col, getColumnKey(col, index))"
                    class="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/50 transition-colors"
                    :class="{ 'bg-primary': isResizing === getColumnKey(col, index) }"
                  ></div>
            </th>
          </tr>
            </thead>
          </table>
        </div>
        
        <!-- 表格内容（横向和纵向滚动） -->
        <div class="w-full flex-1 overflow-auto" ref="tableBodyRef" :style="bodyScrollStyle">
          <table class="w-full border-separate border-spacing-0" :class="tableClass" :style="tableStyle">
            <colgroup>
              <col
                v-for="(col, index) in flattenColumns"
                :key="getColumnKey(col, index)"
                :style="{ width: getColumnWidth(col) }"
              />
            </colgroup>
            <tbody class="bg-base-100 text-base-content/80">
              <tr
                v-for="(record, index) in displayedData"
                :key="getRowKey(record, index)"
                :class="getRowClass(record, index)"
                @click="handleRowClick(record, index)"
              >
                <td
                  v-for="(col, colIndex) in flattenColumns"
                  :key="getColumnKey(col, colIndex)"
                  :class="getCellClass(col, record, index, colIndex)"
                  :style="getCellStyle(col)"
                  class="table-td p-2"
                  :colspan="col.colSpan"
                  :rowspan="col.rowSpan"
                  @click.stop="handleCellClick(record, col, getColumnKey(col, colIndex), index)"
                >
                  <slot
                    :name="`cell-${getColumnKey(col, colIndex)}`"
                    :record="record"
                    :column="col"
                    :index="index"
                    :value="getCellValue(record, col)"
                    :editing="editingCell?.columnKey === getColumnKey(col, colIndex) && editingCell?.rowIndex === index"
                  >
                    <!-- 可编辑单元格 -->
                    <div v-if="isEditable(col)" class="relative">
                      <ipt
                        v-if="editingCell?.columnKey === getColumnKey(col, colIndex) && editingCell?.rowIndex === index"
                        type="text"
                        :value="editInputValue"
                        @input="(e: any) => handleCellInput(e, record, col, getColumnKey(col, colIndex), index)"
                        @blur="(e: any) => handleCellBlur(e, record, col, getColumnKey(col, colIndex), index)"
                        @click.stop
                        @keyup.enter="(e: any) => handleCellEnter(e, record, col, getColumnKey(col, colIndex), index)"
                        @keyup.esc="handleCellEsc"
                        class="absolute top-0 left-0 w-full h-full box-border border-1 border-base-300 text-center outline-none bg-base-300 dark:bg-base-700 text-base-content shadow shadow-md"
                      />
                      <span
                        v-else
                        :class="{ 'truncate': col.ellipsis || col.truncate }"
                        class="cursor-pointer hover:bg-base-200 rounded px-1 py-0.5 transition-colors"
                      >
                        {{ getCellValue(record, col) ?? '' }}
                      </span>
                    </div>
                    <!-- 不可编辑单元格 -->
                    <div v-else>
                      <span v-if="String(getColumnKey(col, colIndex)) === 'actions'" v-html="getCellValue(record, col)"></span>
                      <span v-else :class="{ 'truncate': col.ellipsis || col.truncate }">{{ getCellValue(record, col) ?? '' }}</span>
                    </div>
                  </slot>
            </td>
            </tr>
                <tr v-if="displayedData.length === 0">
                  <td :colspan="flattenColumns.length" class="text-center py-12">
                    <div class="flex flex-col items-center justify-center text-base-content/60 gap-2">
                      <icn name="inbox" light xl class="text-base-content/30 mb-2"></icn>
                      <span>{{ emptyText || '暂无数据' }}</span>
                    </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 表格底部（分页器） -->
      <div v-if="mergedPaginationValue" class="w-full bg-base-200 py-3 table-pagination">
        <div class="flex items-center justify-between px-4">
          <!-- 每页显示部分：始终显示 -->
          <div class="flex items-center gap-2">
            <span class="text-base-content/70">{{ $t('table.pagination.perPage') }}</span>
            <slct :options="pageSizeSelectOptions" v-model="innerPagination.pageSize" @select="handlePageSizeSelect" size="sm" :trigger-width="'w-20'" />
            <span class="text-base-content/70">{{ $t('table.pagination.items') }}</span>
          </div>
          <!-- 右侧部分：根据页面数量显示 -->
          <div v-if="isSinglePage" class="flex items-center gap-2">
            <!-- 当数据不足一页时，只显示统计信息 -->
            <span class="text-base-content/70" v-if="mergedPaginationValue.showTotal">
              {{ mergedPaginationValue.showTotal(mergedPaginationValue.total || 0, [
                (mergedPaginationValue.current! - 1) * mergedPaginationValue.pageSize! + 1,
                Math.min(mergedPaginationValue.current! * mergedPaginationValue.pageSize!, mergedPaginationValue.total || 0)
              ]) }}
            </span>
            <span v-else class="text-base-content/70">{{ paginationText }}</span>
          </div>
          <div v-else class="flex items-center gap-2">
            <!-- 当数据超过一页时，显示完整的分页控件 -->
            <span class="text-base-content/70" v-if="mergedPaginationValue.showTotal">
              {{ mergedPaginationValue.showTotal(mergedPaginationValue.total || 0, [
                (mergedPaginationValue.current! - 1) * mergedPaginationValue.pageSize! + 1,
                Math.min(mergedPaginationValue.current! * mergedPaginationValue.pageSize!, mergedPaginationValue.total || 0)
              ]) }}
            </span>
            <span v-else class="text-base-content/70">{{ paginationText }}</span>
            <!-- 简单分页模式：总页数 <= 9 时显示页码按钮 -->
            <Group v-if="useSimplePagination" size="sm" spacing="none" rounded>
              <btn size="sm" color="primary" variant="outline" :disabled="mergedPaginationValue.current === 1" @click="goToPage(mergedPaginationValue.current! - 1)">
                <icn name="chevron-left" light sm></icn>
              </btn>
              <btn v-for="page in totalPages" :key="page" size="sm" color="primary" :variant="mergedPaginationValue.current === page ? 'solid' : 'outline'" @click="goToPage(page)">
                {{ page }}
              </btn>
              <btn size="sm" color="primary" variant="outline" :disabled="mergedPaginationValue.current === totalPages" @click="goToPage(mergedPaginationValue.current! + 1)">
                <icn name="chevron-right" light sm></icn>
              </btn>
            </Group>
            <!-- 完整分页模式：总页数 > 9 时显示首页+上一页+下一页+末尾+跳转 -->
            <template v-else>
              <Group size="sm" spacing="none" rounded>
                <btn size="sm" color="primary" variant="outline" :disabled="mergedPaginationValue.current === 1" 
                @click="goToPage(1)">{{ $t('table.pagination.first') }}</btn>
                <btn size="sm" color="primary" variant="outline" :disabled="mergedPaginationValue.current === 1" 
                @click="goToPage(mergedPaginationValue.current! - 1)">{{ $t('table.pagination.prev') }}</btn>
                <btn size="sm" color="primary" variant="outline" :disabled="mergedPaginationValue.current === totalPages" 
                @click="goToPage(mergedPaginationValue.current! + 1)">{{ $t('table.pagination.next') }}</btn>
                <btn size="sm" color="primary" variant="outline" :disabled="mergedPaginationValue.current === totalPages" 
                @click="goToPage(totalPages)">{{ $t('table.pagination.last') }}</btn>
              </Group>
              <div v-if="mergedPaginationValue.showQuickJumper" class="flex items-center gap-2">
                <span class="text-base-content/70">{{ $t('table.pagination.jumpTo') }}</span>
                <ipt v-model.number="jumpPage" @keyup.enter="handleJumpPage" type="number" :min="1" :max="totalPages" 
                :disabled="totalPages <= 1" size="sm" class="w-20" />
                <span class="text-base-content/70">{{ $t('table.pagination.page') }}</span>
                <btn size="sm" :disabled="totalPages <= 1" @click="handleJumpPage">{{ $t('table.pagination.jump') }}</btn>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 表头固定定位 */
.table-th {
  position: sticky;
  top: 0;
  z-index: 5;
}

/* 尺寸样式 */
.table-size-small .table-th,
.table-size-small .table-td {
  padding: 0.25rem 0.5rem;
  font-size: 0.5rem;
}

.table-size-middle .table-th,
.table-size-middle .table-td {
  padding: 0.35rem 0.5rem;
  font-size: 1rem;
}

.table-size-large .table-th,
.table-size-large .table-td {
  padding: 1rem 1.25rem;
  font-size: 1rem;
}

/* 分页器字体大小与表头一致 */
.table-size-small .table-pagination {
  font-size: 0.5rem;
}

.table-size-middle .table-pagination {
  font-size: 1rem;
}

.table-size-large .table-pagination {
  font-size: 1rem;
}

/* 隐藏表头滚动条 */
.overflow-x-auto {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.overflow-x-auto::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 可编辑单元格样式 */
.editable-cell {
  position: relative;
  cursor: pointer;
}

.editable-cell:hover {
  background-color: var(--base-200);
}

.editable-cell.editing {
  background-color: var(--base-300);
}

</style>