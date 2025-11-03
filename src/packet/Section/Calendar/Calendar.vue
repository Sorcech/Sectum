<template>
  <div 
    :class="['calendar', calendarClasses]" 
    :style="cssVars"
    class="leading-[var(--n-line-height)] text-[var(--n-font-size)] text-[var(--n-text-color)] h-[720px] flex flex-col"
  >
    <!-- 头部 -->
    <div class="calendar-header flex items-center leading-none text-[var(--n-title-font-size)] pb-[18px] justify-between">
      <div class="calendar-header__title text-[var(--n-title-text-color)] font-[var(--n-title-font-weight)] transition-colors duration-300">
        <slot name="header" :year="year" :month="calendarMonth">
          {{ monthBeforeYear ? `${localeMonth} ${year}` : `${year} ${localeMonth}` }}
        </slot>
      </div>
      <div class="calendar-header__extra flex items-center">
        <btn-group>
          <btn size="small" @click="handlePrevClick" class="calendar-prev-btn cursor-pointer">
            <icn name="chevron-left" />
          </btn>
          <btn size="small" @click="handleTodayClick">
            {{ todayText }}
          </btn>
          <btn size="small" @click="handleNextClick" class="calendar-next-btn cursor-pointer">
            <icn name="chevron-right" />
          </btn>
        </btn-group>
      </div>
    </div>
    
    <!-- 日期网格 -->
    <div 
      class="calendar-dates grid grid-cols-7 flex-1 border-t border-l border-[var(--n-border-color)] rounded-[var(--n-border-radius)] transition-[border-color] duration-300"
    >
      <div
        v-for="(dateItem, index) in dateItems"
        :key="`${dateItem.ts}-${index}`"
        :class="['calendar-cell', getCellClasses(dateItem)]"
        @click="handleCellClick(dateItem)"
        class="box-border p-[10px] border-r border-b border-[var(--n-border-color)] cursor-pointer relative transition-all duration-300"
      >
        <div class="calendar-date relative leading-none flex items-center h-[1em] justify-between pb-[0.75em] transition-all duration-300 text-[var(--n-text-color)]">
          <div 
            :title="formatDate(dateItem.ts)"
            class="calendar-date__date text-[var(--n-text-color)] rounded-full flex items-center justify-center -ml-[0.4em] w-[1.8em] h-[1.8em] transition-all duration-300"
            :class="getDateDateClasses(dateItem)"
          >
            {{ dateItem.dateObject.date }}
          </div>
          <div
            v-if="index < 7"
            :title="formatDate(dateItem.ts)"
            class="calendar-date__day text-[var(--n-day-text-color)] transition-colors duration-300"
          >
            {{ formatDay(dateItem.ts) }}
          </div>
        </div>
        <slot
          :year="dateItem.dateObject.year"
          :month="dateItem.dateObject.month + 1"
          :date="dateItem.dateObject.date"
        />
        <div 
          class="calendar-cell__bar absolute left-0 right-0 -bottom-[1px] h-[3px] bg-transparent transition-[background-color] duration-300"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface DateItem {
  dateObject: {
    date: number
    month: number
  year: number
  }
  inCurrentMonth: boolean
  isCurrentDate: boolean
  ts: number
}

interface Props {
  // 基础属性
  value?: number // timestamp
  defaultValue?: number | null
  // 禁用日期
  isDateDisabled?: (date: number) => boolean | undefined
  // 样式属性
  size?: 'small' | 'medium' | 'large'
  // 自定义属性
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: null,
  size: 'medium',
  customClass: ''
})

const emit = defineEmits<{
  'update:value': [value: number, time: { year: number; month: number; date: number }]
  'update-value': [value: number, time: { year: number; month: number; date: number }]
  'panel-change': [info: { year: number; month: number }]
}>()

const now = Date.now()

// 辅助函数
function startOfMonth(ts: number): Date {
  const date = new Date(ts)
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function startOfDay(ts: number): Date {
  const date = new Date(ts)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function addMonths(ts: number, months: number): number {
  const date = new Date(ts)
  date.setMonth(date.getMonth() + months)
  return date.getTime()
}

function getYear(ts: number): number {
  return new Date(ts).getFullYear()
}

function getMonth(ts: number): number {
  return new Date(ts).getMonth()
}

function isSameMonth(ts1: number, ts2: number): boolean {
  const d1 = new Date(ts1)
  const d2 = new Date(ts2)
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
}

// 初始化月份时间戳
const initialMonthTs = props.defaultValue 
  ? startOfMonth(props.defaultValue).getTime() 
  : startOfMonth(now).getTime()

const monthTsRef = ref(initialMonthTs)
const uncontrolledValueRef = ref<number | null>(props.defaultValue || null)
const mergedValueRef = computed(() => props.value ?? uncontrolledValueRef.value)

// 生成日期数组 - 使用缓存避免无限循环
const dateItems = computed((): DateItem[] => {
  // 确保依赖稳定，避免循环更新
  const monthTs = monthTsRef.value
  const valueTs = mergedValueRef.value
  return dateArray(
    monthTs,
    valueTs,
    now,
    1 // firstDayOfWeek: 1 = Monday
  )
})

const year = computed(() => getYear(monthTsRef.value))
const calendarMonth = computed(() => getMonth(monthTsRef.value) + 1)

// 月份名称 - 支持多语言
const localeMonth = computed(() => {
  const monthIndex = getMonth(monthTsRef.value)
  const months = [
    t('date.january'),
    t('date.february'),
    t('date.march'),
    t('date.april'),
    t('date.may'),
    t('date.june'),
    t('date.july'),
    t('date.august'),
    t('date.september'),
    t('date.october'),
    t('date.november'),
    t('date.december')
  ]
  return months[monthIndex] || ''
})

// 事件处理
function doUpdateValue(value: number, time: { year: number; month: number; date: number }): void {
  emit('update:value', value, time)
  emit('update-value', value, time)
  uncontrolledValueRef.value = value
}

function handlePrevClick(): void {
  const monthTs = addMonths(monthTsRef.value, -1)
  monthTsRef.value = monthTs
  emit('panel-change', {
    year: getYear(monthTs),
    month: getMonth(monthTs) + 1
  })
}

function handleNextClick(): void {
  const monthTs = addMonths(monthTsRef.value, 1)
  monthTsRef.value = monthTs
  emit('panel-change', {
    year: getYear(monthTs),
    month: getMonth(monthTs) + 1
  })
}

function handleTodayClick(): void {
  const { value: monthTs } = monthTsRef
  const oldYear = getYear(monthTs)
  const oldMonth = getMonth(monthTs)
  const newMonthTs = startOfMonth(now).getTime()
  monthTsRef.value = newMonthTs
  const newYear = getYear(newMonthTs)
  const newMonth = getMonth(newMonthTs)
  if (oldYear !== newYear || oldMonth !== newMonth) {
    emit('panel-change', {
      year: newYear,
      month: newMonth + 1
    })
  }
}

function handleCellClick(dateItem: DateItem): void {
  const disabled = props.isDateDisabled?.(dateItem.ts) === true
  if (disabled) return

  const monthTs = startOfMonth(dateItem.ts).getTime()
  if (!isSameMonth(monthTsRef.value, monthTs)) {
    monthTsRef.value = monthTs
    emit('panel-change', {
      year: getYear(monthTs),
      month: getMonth(monthTs) + 1
    })
  }

  doUpdateValue(dateItem.ts, {
    year: dateItem.dateObject.year,
    month: dateItem.dateObject.month + 1,
    date: dateItem.dateObject.date
  })
}

function getCellClasses(dateItem: DateItem): string {
  const classes: string[] = []
  
  const notInCurrentMonth = !dateItem.inCurrentMonth
  const disabled = props.isDateDisabled?.(dateItem.ts) === true
  
  // 避免在函数中访问响应式数据，只在需要时计算
  let selected = false
  const currentValue = mergedValueRef.value
  if (currentValue) {
    const normalizedValue = startOfDay(currentValue).getTime()
    selected = normalizedValue === startOfDay(dateItem.ts).getTime()
  }

  if (disabled) {
    classes.push('cursor-not-allowed text-[var(--n-day-text-color)]')
  }
  if (notInCurrentMonth) {
    classes.push('text-[var(--n-day-text-color)]')
  }
  if (selected) {
    classes.push('calendar-cell--selected')
  }

  return classes.join(' ')
}

// 生成日期数组
function dateArray(
  monthTs: number,
  valueTs: number | null,
  currentTs: number,
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
): DateItem[] {
  const displayMonth = getMonth(monthTs)
  const displayYear = getYear(monthTs)
  const calendarDays: DateItem[] = []
  
  // 获取当月第一天
  const firstDay = new Date(displayYear, displayMonth, 1)
  let firstDayWeek = firstDay.getDay()
  // 将周日(0)转换为7，使其在周一(1)之后
  if (firstDayWeek === 0) firstDayWeek = 7
  
  // 计算需要显示的上月日期 (周一为1，需要调整为0-6)
  const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek
  const prevMonthDays = (firstDayWeek - adjustedFirstDayOfWeek + 7) % 7
  const prevMonth = displayMonth === 0 ? 11 : displayMonth - 1
  const prevYear = displayMonth === 0 ? displayYear - 1 : displayYear
  const prevMonthDaysCount = new Date(prevYear, prevMonth + 1, 0).getDate()
  
  // 添加上月日期
  for (let i = prevMonthDaysCount - prevMonthDays + 1; i <= prevMonthDaysCount; i++) {
    const date = new Date(prevYear, prevMonth, i)
    calendarDays.push({
      dateObject: {
        date: i,
        month: prevMonth,
        year: prevYear
      },
      inCurrentMonth: false,
      isCurrentDate: matchDate(currentTs, date.getTime()),
      ts: date.getTime()
    })
  }
  
  // 添加当月日期
  const currentMonthDays = new Date(displayYear, displayMonth + 1, 0).getDate()
  for (let i = 1; i <= currentMonthDays; i++) {
    const date = new Date(displayYear, displayMonth, i)
    calendarDays.push({
      dateObject: {
        date: i,
        month: displayMonth,
        year: displayYear
      },
      inCurrentMonth: true,
      isCurrentDate: matchDate(currentTs, date.getTime()),
      ts: date.getTime()
    })
  }
  
  // 添加下月日期以填满42天
  const remainingDays = Math.max(0, 42 - calendarDays.length)
  const nextMonth = displayMonth === 11 ? 0 : displayMonth + 1
  const nextYear = displayMonth === 11 ? displayYear + 1 : displayYear
  
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(nextYear, nextMonth, i)
    calendarDays.push({
      dateObject: {
        date: i,
        month: nextMonth,
        year: nextYear
      },
      inCurrentMonth: false,
      isCurrentDate: matchDate(currentTs, date.getTime()),
      ts: date.getTime()
    })
  }
  
  return calendarDays
}

function matchDate(ts1: number, ts2: number): boolean {
  const d1 = new Date(ts1)
  const d2 = new Date(ts2)
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

function formatDate(ts: number): string {
  const date = new Date(ts)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 星期名称 - 支持多语言
function formatDay(ts: number): string {
  const date = new Date(ts)
  const dayIndex = date.getDay()
  const days = [
    t('date.sunday'),
    t('date.monday'),
    t('date.tuesday'),
    t('date.wednesday'),
    t('date.thursday'),
    t('date.friday'),
    t('date.saturday')
  ]
  return days[dayIndex] || ''
}

// 样式计算
const calendarClasses = computed(() => {
  return [props.customClass].filter(Boolean).join(' ')
})

function getDateDateClasses(dateItem: DateItem): string {
  const classes: string[] = []
  
  const notInCurrentMonth = !dateItem.inCurrentMonth
  const disabled = props.isDateDisabled?.(dateItem.ts) === true
  
  if (disabled || notInCurrentMonth) {
    classes.push('text-[var(--n-day-text-color)]')
  }
  
  if (dateItem.isCurrentDate) {
    classes.push('text-[var(--n-date-text-color-current)] bg-[var(--n-date-color-current)]')
  }
  
  return classes.join(' ')
}

const todayText = computed(() => t('date.today'))
const monthBeforeYear = computed(() => false)

// CSS 变量
const cssVars = computed(() => ({
  '--n-bezier': 'cubic-bezier(0.4, 0, 0.2, 1)',
  '--n-border-color': 'var(--base-300)',
  '--n-border-radius': 'var(--rounded-box, 0.5rem)',
  '--n-text-color': 'var(--base-content)',
  '--n-title-font-weight': '600',
  '--n-title-font-size': '1.25rem',
  '--n-title-text-color': 'var(--base-content)',
  '--n-day-text-color': 'var(--base-content)',
  '--n-font-size': '0.875rem',
  '--n-line-height': '1.5',
  '--n-date-color-current': 'var(--primary)',
  '--n-date-text-color-current': 'var(--primary-content)',
  '--n-cell-color-hover': 'var(--base-200)',
  '--n-bar-color': 'var(--primary)'
}))

// 监听 value 变化 - 使用深度比较和防抖避免循环
let isUpdating = false
watch(
  () => props.value,
  (newValue, oldValue) => {
    // 防止循环更新
    if (isUpdating) return
    
    if (newValue !== undefined && newValue !== null) {
      const monthTs = startOfMonth(newValue).getTime()
      // 只在月份真正改变时才更新，避免循环更新
      if (monthTs !== monthTsRef.value) {
        isUpdating = true
        monthTsRef.value = monthTs
        // 使用 nextTick 确保更新完成后再允许下一次更新
        nextTick(() => {
          isUpdating = false
        })
      }
    }
  },
  { flush: 'post', immediate: false }
)
</script>

<style scoped>
/* 使用 CSS 变量和复杂选择器的情况保留在 style 中 */

/* 日历单元格圆角 */
.calendar-dates .calendar-cell:nth-child(7) {
  border-top-right-radius: var(--n-border-radius);
}

.calendar-dates .calendar-cell:nth-last-child(7) {
  border-bottom-left-radius: var(--n-border-radius);
}

.calendar-dates .calendar-cell:last-child {
  border-bottom-right-radius: var(--n-border-radius);
}

/* 悬停状态 */
.calendar-dates .calendar-cell:hover {
  background-color: var(--n-cell-color-hover);
}

/* 选中状态下的 bar */
.calendar-cell--selected .calendar-cell__bar {
  background-color: var(--n-bar-color);
}

/* 禁用和跨月日期的日期显示 */
.calendar-cell--disabled .calendar-date__date,
.calendar-cell--other-month .calendar-date__date {
  color: var(--n-day-text-color);
}
</style>