/**
 * Table 组件类型定义、工具函数和 Hooks
 */

import { ref, reactive, computed, watch } from 'vue'
import type { Ref } from 'vue'

// ==================== 类型定义 ====================

export type Key = string | number

export type SortOrder = 'ascend' | 'descend' | null

export type FilterValue = (Key | boolean)[]

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type SizeType = 'small' | 'middle' | 'large'

export interface ColumnFilterItem {
  text: string
  value: string | number | boolean
  children?: ColumnFilterItem[]
}

export interface ColumnTitleProps<RecordType = any> {
  sortOrder?: SortOrder
  sortColumn?: ColumnType<RecordType>
  sortColumns?: { column: ColumnType<RecordType>; order: SortOrder }[]
  filters?: Record<string, FilterValue>
}

export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number

export interface FilterDropdownProps<RecordType = any> {
  setSelectedKeys: (selectedKeys: Key[]) => void
  selectedKeys: Key[]
  confirm: (param?: { closeDropdown?: boolean }) => void
  clearFilters?: (param?: { confirm?: boolean; closeDropdown?: boolean }) => void
  filters?: ColumnFilterItem[]
  close: () => void
  visible: boolean
  column: ColumnType<RecordType>
}

export interface ColumnType<RecordType = any> {
  // 基础配置
  key?: string
  dataIndex?: string | string[]
  title?: string | ((props: ColumnTitleProps<RecordType>) => any)
  width?: number | string
  align?: 'left' | 'center' | 'right'
  ellipsis?: boolean | { showTitle?: boolean }
  truncate?: boolean // 兼容旧 API
  
  // 排序配置
  sorter?: boolean | CompareFn<RecordType> | {
    compare?: CompareFn<RecordType>
    multiple?: number
  }
  sortable?: boolean // 兼容旧 API
  sortOrder?: SortOrder
  defaultSortOrder?: SortOrder
  sortDirections?: SortOrder[]
  showSorterTooltip?: boolean
  
  // 筛选配置
  filters?: ColumnFilterItem[]
  filterDropdown?: any | ((props: FilterDropdownProps<RecordType>) => any)
  filterMultiple?: boolean
  filteredValue?: FilterValue | null
  defaultFilteredValue?: FilterValue | null
  filterIcon?: any | ((opt: { filtered: boolean; column: ColumnType<RecordType> }) => any)
  filterMode?: 'menu' | 'tree'
  filterSearch?: boolean | ((input: string, record: RecordType) => boolean)
  onFilter?: (value: string | number | boolean, record: RecordType) => boolean
  filterable?: boolean // 兼容旧 API
  filterType?: 'text' | 'select' // 兼容旧 API
  filterOptions?: any[] // 兼容旧 API
  
  // 固定列
  fixed?: 'left' | 'right' | boolean
  
  // 响应式
  responsive?: Breakpoint[]
  
  // 列宽调整
  resizable?: boolean
  
  // 自定义渲染
  customRender?: (props: {
    value: any
    record: RecordType
    index: number
    column: ColumnType<RecordType>
  }) => any
  
  // 编辑配置
  editable?: boolean
  
  // 其他
  className?: string
  colSpan?: number
  rowSpan?: number
  onCell?: (record: RecordType, index: number) => Record<string, any>
  onHeaderCell?: (column: ColumnType<RecordType>) => Record<string, any>
}

export interface ColumnGroupType<RecordType = any> extends Omit<ColumnType<RecordType>, 'dataIndex'> {
  children: ColumnsType<RecordType>
}

export type ColumnsType<RecordType = any> = (
  | ColumnGroupType<RecordType>
  | ColumnType<RecordType>
)[]

// 兼容旧 API 的列配置
export interface LegacyColumnType {
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

export interface SortState<RecordType = any> {
  column: ColumnType<RecordType>
  key: Key
  sortOrder: SortOrder | null
  multiplePriority: number | false
}

export interface FilterState<RecordType = any> {
  column: ColumnType<RecordType>
  key: Key
  filteredKeys?: Key[] | null
  forceFiltered?: boolean
}

export interface SorterResult<RecordType = any> {
  column?: ColumnType<RecordType>
  order?: SortOrder
  field?: Key | readonly Key[]
  columnKey?: Key
}

export interface TablePaginationConfig {
  current?: number
  pageSize?: number
  total?: number
  defaultCurrent?: number
  defaultPageSize?: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: (total: number, range: [number, number]) => string
  pageSizeOptions?: string[]
  position?: ('topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight')[]
  onChange?: (page: number, pageSize: number) => void
  onShowSizeChange?: (current: number, size: number) => void
}

export interface TableRowSelection<RecordType = any> {
  type?: 'checkbox' | 'radio'
  selectedRowKeys?: Key[]
  defaultSelectedRowKeys?: Key[]
  onChange?: (selectedRowKeys: Key[], selectedRows: RecordType[]) => void
  onSelect?: (record: RecordType, selected: boolean, selectedRows: RecordType[]) => void
  onSelectAll?: (selected: boolean, selectedRows: RecordType[], changeRows: RecordType[]) => void
  getCheckboxProps?: (record: RecordType) => Record<string, any>
  fixed?: 'left' | 'right' | boolean
  columnWidth?: string | number
  columnTitle?: string
  checkStrictly?: boolean
}

export interface TableCurrentDataSource<RecordType = any> {
  currentDataSource: RecordType[]
  action: 'paginate' | 'sort' | 'filter'
}

export interface ChangeEventInfo<RecordType = any> {
  pagination: {
    current?: number
    pageSize?: number
    total?: number
  }
  filters: Record<string, FilterValue | null>
  sorter: SorterResult<RecordType> | SorterResult<RecordType>[]
  filterStates: FilterState<RecordType>[]
  sorterStates: SortState<RecordType>[]
  resetPagination: () => void
}

// 兼容旧 API 的数据结构
export interface LegacyTableData {
  tableHead: LegacyColumnType[]
  tableBody: any[]
}

// ==================== 工具函数 ====================

/**
 * 将旧 API (tableHead/tableBody) 转换为新 API (columns/dataSource)
 */
export function convertLegacyData(legacyData: LegacyTableData): {
  columns: ColumnsType
  dataSource: any[]
} {
  const columns: ColumnsType = legacyData.tableHead.map((col) => ({
    key: col.key,
    dataIndex: col.key,
    title: col.text,
    width: col.width,
    align: col.align,
    ellipsis: col.truncate,
    truncate: col.truncate, // 兼容
    sorter: col.sortable,
    sortable: col.sortable, // 兼容
    filterable: col.filterable, // 兼容
    filterType: col.filterType, // 兼容
    filterOptions: col.filterOptions, // 兼容
    resizable: col.resizable,
    fixed: col.fixed,
  }))

  return {
    columns,
    dataSource: legacyData.tableBody || [],
  }
}

/**
 * 获取列键值
 */
export function getColumnKey(column: ColumnType, index: number): string | number {
  if (column.key) {
    return column.key
  }
  if (column.dataIndex) {
    // 如果是数组，转换为字符串（用点连接）
    if (Array.isArray(column.dataIndex)) {
      return column.dataIndex.join('.')
    }
    return column.dataIndex
  }
  return index
}

/**
 * 获取嵌套值
 */
export function getNestedValue(obj: any, path: string | string[]): any {
  if (typeof path === 'string') {
    return obj[path]
  }
  let value = obj
  for (const key of path) {
    value = value?.[key]
  }
  return value
}

/**
 * 转换宽度值
 * 支持：
 * - 数字：直接作为像素值（如 100 -> 100px）
 * - 数字（Tailwind 模式）：如果数字 <= 256，按 Tailwind 规则转换（如 16 -> 64px，因为 w-16 = 4rem = 64px）
 * - 字符串 'w-{n}'：解析为 Tailwind 宽度（如 'w-16' -> 64px）
 * - 字符串 '{n}px'：解析为像素值（如 '100px' -> 100px）
 * - 其他字符串：尝试查找预设映射
 */
export function convertWidth(width: string | number | undefined): number | null {
  if (width === undefined) {
    return null
  }
  
  if (typeof width === 'number') {
    // 如果数字较小（<= 128），按 Tailwind 规则转换：w-{n} = n * 0.25rem = n * 4px
    // 例如：16 -> 64px (w-16), 20 -> 80px (w-20), 32 -> 128px (w-32)
    // 如果数字 > 128，直接作为像素值（因为 w-32 = 128px 是常见的最大宽度值）
    if (width > 0 && width <= 128) {
      return width * 4
    }
    // 如果数字较大，直接作为像素值
    return width
  }
  
  if (typeof width === 'string') {
    // 匹配 Tailwind 类名格式：w-{数字}
    const tailwindMatch = width.match(/^w-(\d+)$/)
    if (tailwindMatch) {
      const n = parseInt(tailwindMatch[1], 10)
      return n * 4 // Tailwind: w-{n} = n * 0.25rem = n * 4px
    }
    
    // 转换预设的 Tailwind 类名（保留作为备用）
    const widthMap: Record<string, number> = {
      'w-16': 64,
      'w-20': 80,
      'w-24': 96,
      'w-28': 112,
      'w-32': 128,
      'w-40': 160,
      'w-48': 192,
      'w-64': 256,
    }
    if (widthMap[width]) {
      return widthMap[width]
    }
    
    // 尝试解析像素值：{数字}px
    const pxMatch = width.match(/^(\d+)px$/)
    if (pxMatch) {
      return parseInt(pxMatch[1], 10)
    }
  }
  
  return null
}

// ==================== 分页 Hook ====================

export const DEFAULT_PAGE_SIZE = 10

export default function usePagination<RecordType = any>({
  total,
  pagination,
  onChange,
}: {
  total: Ref<number>
  pagination: Ref<TablePaginationConfig | false | undefined>
  onChange?: (current: number, pageSize: number) => void
}) {
  // 初始化 innerPagination，优先使用传入的 pageSize
  const getInitialPageSize = (): number => {
    const paginationObj = pagination.value && typeof pagination.value === 'object' ? pagination.value : {}
    if (paginationObj.pageSize !== undefined && paginationObj.pageSize !== null) {
      return paginationObj.pageSize
    }
    // 如果没有传入 pageSize，使用 pageSizeOptions 的第一个值
    if (paginationObj.pageSizeOptions && paginationObj.pageSizeOptions.length > 0) {
      return Number(paginationObj.pageSizeOptions[0])
    }
    return DEFAULT_PAGE_SIZE
  }

  const innerPagination = ref<{
    current?: number
    pageSize?: number
  }>({
    current: 1,
    pageSize: getInitialPageSize(),
  })

  // 合并分页配置
  const mergedPagination = computed(() => {
    if (pagination.value === false) {
      return false
    }

    const paginationObj = pagination.value && typeof pagination.value === 'object' ? pagination.value : {}

    // 优先使用传入的 pageSize，如果没有则使用内部状态，最后使用默认值
    // 如果传入的 pageSizeOptions 存在但没有 pageSize，使用 pageSizeOptions 的第一个值
    let defaultPageSize = DEFAULT_PAGE_SIZE
    if (paginationObj.pageSizeOptions && paginationObj.pageSizeOptions.length > 0 && !paginationObj.pageSize) {
      defaultPageSize = Number(paginationObj.pageSizeOptions[0])
    }

    const merged = {
      current: innerPagination.value.current ?? paginationObj.current ?? 1,
      pageSize: paginationObj.pageSize ?? innerPagination.value.pageSize ?? defaultPageSize,
      total: paginationObj.total ?? total.value,
      ...paginationObj,
    }

    // 计算总页数
    const maxPage = Math.ceil((merged.total || 0) / merged.pageSize)
    if (merged.current > maxPage && maxPage > 0) {
      merged.current = maxPage
    }

    return merged
  })

  // 刷新分页
  const refreshPagination = (current?: number, pageSize?: number) => {
    if (pagination.value === false) return

    innerPagination.value = {
      current: current ?? innerPagination.value.current ?? 1,
      pageSize: pageSize ?? innerPagination.value.pageSize ?? DEFAULT_PAGE_SIZE,
    }
  }

  // 内部变化处理
  const onInternalChange = (current: number, pageSize: number) => {
    if (pagination.value === false) return

    const merged = mergedPagination.value
    if (typeof merged === 'object' && merged.onChange) {
      merged.onChange(current, pageSize)
    }

    refreshPagination(current, pageSize)
    onChange?.(current, pageSize)
  }

  // 监听外部 total 变化
  watch(
    () => total.value,
    () => {
      if (pagination.value === false) return
      const merged = mergedPagination.value
      if (typeof merged === 'object') {
        const maxPage = Math.ceil((merged.total || 0) / merged.pageSize)
        if (merged.current > maxPage && maxPage > 0) {
          refreshPagination(maxPage)
        }
      }
    },
  )

  // 获取分页数据
  const paginatedData = computed(() => {
    return (data: RecordType[]) => {
      if (pagination.value === false) {
        return data
      }

      const merged = mergedPagination.value
      if (typeof merged === 'object') {
        const { current = 1, pageSize = DEFAULT_PAGE_SIZE } = merged
        const start = (current - 1) * pageSize
        const end = start + pageSize
        return data.slice(start, end)
      }

      return data
    }
  })

  return {
    pagination: mergedPagination,
    refreshPagination,
    onInternalChange,
    paginatedData,
  }
}

// ==================== 筛选 Hook ====================

function getColumnKeyForFilter(column: ColumnType, index: number): Key {
  if (column.key) {
    return column.key
  }
  if (column.dataIndex) {
    // 如果是数组，转换为字符串（用点连接）
    if (Array.isArray(column.dataIndex)) {
      return column.dataIndex.join('.')
    }
    return column.dataIndex
  }
  return index
}

function collectFilterStates<RecordType>(
  columns: ColumnsType<RecordType>,
  init: boolean,
): FilterState<RecordType>[] {
  const filterStates: FilterState<RecordType>[] = []

  function traverse(cols: ColumnsType<RecordType>, parentIndex = '') {
    cols.forEach((column, index) => {
      const columnKey = getColumnKeyForFilter(column, index)
      const columnPos = parentIndex ? `${parentIndex}-${index}` : String(index)

      if ('children' in column && Array.isArray(column.children)) {
        traverse(column.children, columnPos)
      } else if (
        column.filters ||
        column.filterable ||
        column.onFilter ||
        'filteredValue' in column
      ) {
        if ('filteredValue' in column && column.filteredValue !== undefined) {
          // Controlled
          filterStates.push({
            column,
            key: columnKey,
            filteredKeys: column.filteredValue as Key[],
            forceFiltered: column.filteredValue !== null && column.filteredValue.length > 0,
          })
        } else if (init && column.defaultFilteredValue) {
          // Default filter
          filterStates.push({
            column,
            key: columnKey,
            filteredKeys: column.defaultFilteredValue as Key[],
            forceFiltered: false,
          })
        }
      }
    })
  }

  traverse(columns)
  return filterStates
}

export function getFilterData<RecordType>(
  data: RecordType[],
  filterStates: FilterState<RecordType>[],
  childrenColumnName: string = 'children',
): RecordType[] {
  if (filterStates.length === 0) {
    return data
  }

  return data.filter((record) => {
    return filterStates.every(({ column, filteredKeys, forceFiltered }) => {
      if (!filteredKeys || filteredKeys.length === 0) {
        return !forceFiltered
      }

      const dataIndex = column.dataIndex || column.key
      if (!dataIndex) return true

      const value = getNestedValue(record, dataIndex)

      // 使用自定义筛选函数
      if (column.onFilter) {
        return filteredKeys.some((key) => column.onFilter!(key, record))
      }

      // 默认筛选逻辑
      return filteredKeys.includes(value)
    })
  })
}

export function useFilter<RecordType = any>({
  columns,
  onFilterChange,
}: {
  columns: Ref<ColumnsType<RecordType>>
  onFilterChange?: (filters: Record<string, FilterValue | null>, filterStates: FilterState<RecordType>[]) => void
}) {
  const filterStates = reactive<FilterState<RecordType>[]>([])

  // 初始化筛选状态
  watch(
    columns,
    (newColumns) => {
      const states = collectFilterStates(newColumns, true)
      filterStates.splice(0, filterStates.length, ...states)
    },
    { immediate: true, deep: true },
  )

  // 触发筛选
  const triggerFilter = (column: ColumnType<RecordType>, columnKey: Key, filteredKeys: Key[] | null) => {
    const filterState = filterStates.find((state) => state.key === columnKey)

    if (filterState) {
      filterState.filteredKeys = filteredKeys
      filterState.forceFiltered = filteredKeys !== null && filteredKeys.length > 0
    } else {
      filterStates.push({
        column,
        key: columnKey,
        filteredKeys: filteredKeys || undefined,
        forceFiltered: filteredKeys !== null && filteredKeys.length > 0,
      })
    }

    // 构建筛选结果
    const filters: Record<string, FilterValue | null> = {}
    filterStates.forEach((state) => {
      filters[String(state.key)] = state.filteredKeys || null
    })

    onFilterChange?.(filters, [...filterStates])
  }

  // 获取筛选后的数据
  const filteredData = computed(() => {
    return (data: RecordType[]) => {
      return getFilterData(data, filterStates)
    }
  })

  return {
    filterStates,
    triggerFilter,
    filteredData,
  }
}

// ==================== 排序 Hook ====================

const ASCEND = 'ascend'
const DESCEND = 'descend'

function getMultiplePriority<RecordType>(column: ColumnType<RecordType>): number | false {
  if (typeof column.sorter === 'object' && typeof column.sorter.multiple === 'number') {
    return column.sorter.multiple
  }
  return false
}

function getSortFunction<RecordType>(
  sorter: ColumnType<RecordType>['sorter'],
): CompareFn<RecordType> | false {
  if (typeof sorter === 'function') {
    return sorter
  }
  if (sorter && typeof sorter === 'object' && sorter.compare) {
    return sorter.compare
  }
  return false
}

function nextSortDirection(sortDirections: SortOrder[], current: SortOrder | null): SortOrder {
  if (!current) {
    return sortDirections[0] || ASCEND
  }
  const index = sortDirections.indexOf(current)
  return sortDirections[index + 1] || null
}

function getColumnKeyForSorter(column: ColumnType, index: number): Key {
  if (column.key) {
    return column.key
  }
  if (column.dataIndex) {
    // 如果是数组，转换为字符串（用点连接）
    if (Array.isArray(column.dataIndex)) {
      return column.dataIndex.join('.')
    }
    return column.dataIndex
  }
  return index
}

function collectSortStates<RecordType>(
  columns: ColumnsType<RecordType>,
  init: boolean,
): SortState<RecordType>[] {
  const sortStates: SortState<RecordType>[] = []

  function traverse(cols: ColumnsType<RecordType>, parentIndex = '') {
    cols.forEach((column, index) => {
      const columnKey = getColumnKeyForSorter(column, index)
      const columnPos = parentIndex ? `${parentIndex}-${index}` : String(index)

      if ('children' in column && Array.isArray(column.children)) {
        traverse(column.children, columnPos)
      } else if (column.sorter || column.sortable) {
        if ('sortOrder' in column && column.sortOrder !== undefined) {
          // Controlled
          sortStates.push({
            column,
            key: columnKey,
            multiplePriority: getMultiplePriority(column),
            sortOrder: column.sortOrder,
          })
        } else if (init && column.defaultSortOrder) {
          // Default sorter
          sortStates.push({
            column,
            key: columnKey,
            multiplePriority: getMultiplePriority(column),
            sortOrder: column.defaultSortOrder,
          })
        }
      }
    })
  }

  traverse(columns)
  return sortStates
}

export function getSortData<RecordType>(
  data: RecordType[],
  sortStates: SortState<RecordType>[],
  childrenColumnName: string = 'children',
): RecordType[] {
  const sortedData = [...data]

  if (sortStates.length === 0) {
    return sortedData
  }

  // 按优先级排序
  const sortedStates = [...sortStates].sort((a, b) => {
    if (a.multiplePriority !== false && b.multiplePriority !== false) {
      return a.multiplePriority - b.multiplePriority
    }
    if (a.multiplePriority !== false) return -1
    if (b.multiplePriority !== false) return 1
    return 0
  })

  sortedData.sort((a, b) => {
    for (const { column, sortOrder } of sortedStates) {
      if (!sortOrder) continue

      const sorterFn = getSortFunction(column.sorter || column.sortable)
      if (sorterFn) {
        const compareResult = sorterFn(a, b, sortOrder)
        if (compareResult !== 0) {
          return sortOrder === ASCEND ? compareResult : -compareResult
        }
        continue
      }

      // 默认排序逻辑
      const dataIndex = column.dataIndex || column.key
      if (!dataIndex) continue

      const aValue = getNestedValue(a, dataIndex)
      const bValue = getNestedValue(b, dataIndex)

      let compareResult = 0
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        compareResult = aValue - bValue
      } else {
        const aStr = String(aValue || '').toLowerCase()
        const bStr = String(bValue || '').toLowerCase()
        compareResult = aStr.localeCompare(bStr)
      }

      if (compareResult !== 0) {
        return sortOrder === ASCEND ? compareResult : -compareResult
      }
    }
    return 0
  })

  // 处理树形数据
  if (childrenColumnName) {
    sortedData.forEach(record => {
      const children = (record as any)[childrenColumnName]
      if (Array.isArray(children) && children.length > 0) {
        ;(record as any)[childrenColumnName] = getSortData(children, sortStates, childrenColumnName)
      }
    })
  }

  return sortedData
}

export function useSorter<RecordType = any>({
  columns,
  onSorterChange,
}: {
  columns: Ref<ColumnsType<RecordType>>
  onSorterChange?: (
    sorterResult: SorterResult<RecordType> | SorterResult<RecordType>[],
    sortStates: SortState<RecordType>[],
  ) => void
}) {
  const sortStates = reactive<SortState<RecordType>[]>([])
  const sortDirections: SortOrder[] = [ASCEND, DESCEND, null]

  // 初始化排序状态
  watch(
    columns,
    (newColumns) => {
      const states = collectSortStates(newColumns, true)
      sortStates.splice(0, sortStates.length, ...states)
    },
    { immediate: true, deep: true },
  )

  // 触发排序
  const triggerSorter = (column: ColumnType<RecordType>, columnKey: Key) => {
    const sortState = sortStates.find((state) => state.key === columnKey)
    const newSortOrder = nextSortDirection(
      column.sortDirections || sortDirections,
      sortState?.sortOrder || null,
    )

    // 如果是单列排序，清除其他排序
    if (!column.sorter || (typeof column.sorter === 'object' && !column.sorter.multiple)) {
      sortStates.forEach((state) => {
        if (state.key !== columnKey) {
          state.sortOrder = null
        }
      })
    }

    if (sortState) {
      sortState.sortOrder = newSortOrder
    } else {
      sortStates.push({
        column,
        key: columnKey,
        multiplePriority: getMultiplePriority(column),
        sortOrder: newSortOrder,
      })
    }

    // 触发回调
    const sorterResult: SorterResult<RecordType>[] = sortStates
      .filter((state) => state.sortOrder)
      .map((state) => ({
        column: state.column,
        order: state.sortOrder,
        field: state.key,
        columnKey: state.key,
      }))

    onSorterChange?.(
      sorterResult.length === 1 ? sorterResult[0] : sorterResult,
      [...sortStates],
    )
  }

  // 获取排序后的数据
  const sortedData = computed(() => {
    return (data: RecordType[]) => {
      return getSortData(data, sortStates.filter((state) => state.sortOrder))
    }
  })

  return {
    sortStates,
    triggerSorter,
    sortedData,
  }
}

