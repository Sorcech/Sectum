<template>
  <div :class="dateContainerClasses">
    <!-- 标签 -->
    <label v-if="label" :class="labelClasses">
      <span :class="labelTextClasses">{{ label }}</span>
      <span v-if="required" class="text-error ml-1">*</span>
    </label>
    
    <!-- 日期选择器容器 -->
    <div ref="dateRef" :class="datePickerClasses">
      <!-- 输入框 -->
      <div :class="inputContainerClasses" @click="toggleShow">
        <ipt
          ref="inputRef"
          type="text"
          :class="inputClasses"
          :modelValue="displayValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
        />
        <div :class="iconContainerClasses">
          <icn :name="iconName" :size="iconSize" :class="iconClasses"></icn>
        </div>
      </div>
      
      <!-- 日期选择面板 -->
      <tst name="fade">
        <div v-if="positionShow" :class="panelClasses">
          <!-- 头部导航 -->
          <div :class="headerClasses">
            <div :class="navButtonClasses" @click="yearDecrease" title="上一年">
              <icn name="angles-left" light lg color="primary"></icn>
            </div>
            <div :class="navButtonClasses" @click="monthDecrease" title="上一月">
              <icn name="angle-left" light lg color="primary"></icn>
            </div>
            <div :class="yearMonthClasses">
              <span :class="yearClasses">{{ currentYear }}</span>
              <span :class="monthClasses">{{ MonthName[currentMonth] }}</span>
            </div>
            <div :class="navButtonClasses" @click="monthIncrease" title="下一月">
              <icn name="angle-right" light lg color="primary"></icn>
            </div>
            <div :class="navButtonClasses" @click="yearIncrease" title="下一年">
              <icn name="angles-right" light lg color="primary"></icn>
            </div>
          </div>
          
          <!-- 星期标题 -->
          <div :class="weekHeaderClasses">
            <div v-for="day in WeekName" :key="day" :class="weekDayClasses">
              {{ day }}
            </div>
          </div>
          
          <!-- 日期网格 -->
          <div :class="dateGridClasses">
            <div
              v-for="date in dateList"
              :key="`${date.year}-${date.month}-${date.day}`"
              :class="getDateClasses(date)"
              @click="selectDate(date)"
            >
              {{ date.day }}
            </div>
          </div>
          
          <!-- 底部操作按钮 -->
          <div :class="footerClasses">
            <btn 
              :size="buttonSize" 
              :color="buttonColor" 
              variant="transparent" 
              @click="today"
            >
              {{ t('date.today') }}
            </btn>
            <btn 
              :size="buttonSize" 
              :color="buttonColor" 
              variant="transparent" 
              @click="clear"
            >
              {{ t('date.clear') }}
            </btn>
            <btn 
              v-if="showNow"
              :size="buttonSize" 
              :color="buttonColor" 
              variant="transparent" 
              @click="selectNow"
            >
              {{ t('date.now') }}
            </btn>
          </div>
        </div>
      </tst>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useClickOutside } from '~/packet/Config/useClickOutside'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface DateItem {
  day: number
  year: number
  month: number
  value: number
  isSelected: boolean
  isToday: boolean
  isDisabled: boolean
  type: 'prev' | 'current' | 'next'
}

interface Props {
  // 基础属性
  modelValue?: string | Date
  placeholder?: string
  label?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  
  // 布局属性
  direction?: 'row' | 'column'
  labelWidth?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  // 日期属性
  format?: string
  minDate?: string | Date
  maxDate?: string | Date
  showToday?: boolean
  showNow?: boolean
  allowClear?: boolean
  
  // 样式属性
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  variant?: 'outline' | 'filled' | 'ghost'
  shape?: 'rounded' | 'square' | 'circle'
  
  // 功能属性
  range?: boolean
  multiple?: boolean
  showWeekNumbers?: boolean
  showTime?: boolean
  timeFormat?: '12h' | '24h'
  
  // 自定义属性
  customClass?: string
  inputClass?: string
  panelClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择日期',
  required: false,
  disabled: false,
  readonly: false,
  direction: 'row',
  labelWidth: 'w-32',
  size: 'md',
  format: 'YYYY-MM-DD',
  showToday: true,
  showNow: false,
  allowClear: true,
  color: 'primary',
  variant: 'outline',
  shape: 'rounded',
  range: false,
  multiple: false,
  showWeekNumbers: false,
  showTime: false,
  timeFormat: '24h',
  customClass: '',
  inputClass: '',
  panelClass: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string | Date | null]
  'change': [value: string | Date | null]
  'select': [value: string | Date | null]
  'clear': []
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()

// 引用
const dateRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()

// 状态
const positionShow = ref(false)
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth())
const selectedDate = ref<string | Date | null>(null)
const focused = ref(false)

// 计算属性
const displayValue = computed(() => {
  if (!selectedDate.value) return ''
  
  if (typeof selectedDate.value === 'string') {
    return selectedDate.value
  }
  
  return formatDate(selectedDate.value, props.format)
})

const iconName = computed(() => {
  return props.showTime ? 'clock' : 'calendar-day'
})

const iconSize = computed(() => {
  const sizes = { xs: 'sm', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }
  return sizes[props.size] || 'md'
})

const buttonSize = computed(() => {
  const sizes = { xs: 'xs', sm: 'sm', md: 'sm', lg: 'md', xl: 'md' }
  return sizes[props.size] || 'sm'
})

const buttonColor = computed(() => props.color)

// 样式计算
const dateContainerClasses = computed(() => {
  return [
    'w-full',
    props.direction === 'column' ? 'flex flex-col space-y-2' : 'flex flex-row items-center space-x-4',
    props.customClass
  ].filter(Boolean).join(' ')
})

const labelClasses = computed(() => {
  return [
    'select-none py-2',
    props.labelWidth,
    props.required ? 'required' : ''
  ].filter(Boolean).join(' ')
})

const labelTextClasses = computed(() => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  return [sizes[props.size] || 'text-base', 'font-medium'].join(' ')
})

const datePickerClasses = computed(() => {
  return [
    'w-full relative'
  ].join(' ')
})

const inputContainerClasses = computed(() => {
  return [
    'flex flex-row items-center relative w-full cursor-pointer',
    props.disabled ? 'opacity-50 cursor-not-allowed' : '',
    props.readonly ? 'cursor-default' : ''
  ].filter(Boolean).join(' ')
})

const inputClasses = computed(() => {
  const baseClasses = [
    'w-full border-0 outline-none bg-transparent',
    'placeholder-gray-400',
    props.disabled ? 'cursor-not-allowed' : '',
    props.readonly ? 'cursor-default' : ''
  ]
  
  const sizeClasses = {
    xs: 'h-6 px-2 text-xs min-w-20',
    sm: 'h-8 px-3 text-sm min-w-24',
    md: 'h-10 px-4 text-base min-w-32',
    lg: 'h-12 px-5 text-lg min-w-36',
    xl: 'h-14 px-6 text-xl min-w-40'
  }
  
  const variantClasses = {
    outline: 'border border-gray-300 rounded hover:border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary',
    filled: 'bg-gray-100 rounded hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-primary',
    ghost: 'border-b border-gray-300 rounded-none hover:border-gray-400 focus:border-primary'
  }
  
  const shapeClasses = {
    rounded: 'rounded',
    square: 'rounded-none',
    circle: 'rounded-full'
  }
  
  return [
    ...baseClasses,
    sizeClasses[props.size] || sizeClasses.md,
    variantClasses[props.variant] || variantClasses.outline,
    shapeClasses[props.shape] || shapeClasses.rounded,
    props.inputClass
  ].filter(Boolean).join(' ')
})

const iconContainerClasses = computed(() => {
  return [
    'absolute right-2 opacity-50 hover:opacity-70 transition-opacity',
    props.disabled ? 'opacity-30' : ''
  ].filter(Boolean).join(' ')
})

const iconClasses = computed(() => {
  return [
    'text-gray-500',
    `text-${props.color}`
  ].join(' ')
})

const panelClasses = computed(() => {
  return [
    'absolute w-auto bg-base-100 border border-base-300 rounded-lg shadow-lg z-50',
    'min-w-80 max-w-96',
    props.panelClass
  ].filter(Boolean).join(' ')
})

const headerClasses = computed(() => {
  return [
    'flex flex-row justify-between items-center border-b border-base-300 p-4'
  ].join(' ')
})

const navButtonClasses = computed(() => {
  return [
    'flex items-center justify-center min-w-8 min-h-8 rounded-md transition-all duration-200 ease-in-out',
    'hover:opacity-70 active:scale-95 cursor-pointer p-2'
  ].join(' ')
})

const yearMonthClasses = computed(() => {
  return [
    'min-w-32 text-center flex flex-col items-center space-y-1'
  ].join(' ')
})

const yearClasses = computed(() => {
  return [
    'text-lg font-semibold text-primary'
  ].join(' ')
})

const monthClasses = computed(() => {
  return [
    'text-sm text-base-content'
  ].join(' ')
})

const weekHeaderClasses = computed(() => {
  return [
    'grid grid-cols-7 gap-1 p-2'
  ].join(' ')
})

const weekDayClasses = computed(() => {
  return [
    'flex justify-center items-center text-sm text-base-content opacity-70 font-medium h-8'
  ].join(' ')
})

const dateGridClasses = computed(() => {
  return [
    'grid grid-cols-7 gap-1 p-2'
  ].join(' ')
})

const footerClasses = computed(() => {
  return [
    'flex flex-row justify-center items-center space-x-2 p-4 border-t border-base-300'
  ].join(' ')
})

// 日期相关计算
const dateList = computed((): DateItem[] => {
  return setDateList(currentYear.value, currentMonth.value)
})

const WeekName = computed(() => [
  t('date.sunday'),
  t('date.monday'),
  t('date.tuesday'),
  t('date.wednesday'),
  t('date.thursday'),
  t('date.friday'),
  t('date.saturday')
])

const MonthName = computed(() => [
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
])

// 方法
const setDateList = (year: number, month: number): DateItem[] => {
  const curDays = new Date(year, month + 1, 0).getDate()
  const prevDays = new Date(year, month, 0).getDate()
  const curFirstDayWeek = new Date(year, month, 1).getDay()
  const list: DateItem[] = []
  
  // 填充上月天数
  for (let i = prevDays - curFirstDayWeek + 1; i <= prevDays; i++) {
    const date = new Date(year, month - 1, i)
    list.push({
      day: i,
      year: year,
      month: month - 1,
      value: +date,
      isSelected: false,
      isToday: isToday(date),
      isDisabled: isDateDisabled(date),
      type: 'prev'
    })
  }
  
  // 填充当月天数
  for (let i = 1; i <= curDays; i++) {
    const date = new Date(year, month, i)
    list.push({
      day: i,
      year: year,
      month: month,
      value: +date,
      isSelected: isDateSelected(date),
      isToday: isToday(date),
      isDisabled: isDateDisabled(date),
      type: 'current'
    })
  }
  
  // 填充下月天数
  const nextDays = 7 - (list.length % 7)
  if (nextDays !== 7) {
    for (let i = 1; i <= nextDays; i++) {
      const date = new Date(year, month + 1, i)
      list.push({
        day: i,
        year: year,
        month: month + 1,
        value: +date,
        isSelected: false,
        isToday: isToday(date),
        isDisabled: isDateDisabled(date),
        type: 'next'
      })
    }
  }
  
  return list
}

const isToday = (date: Date): boolean => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isDateSelected = (date: Date): boolean => {
  if (!selectedDate.value) return false
  
  const selected = typeof selectedDate.value === 'string' 
    ? new Date(selectedDate.value) 
    : selectedDate.value
    
  return date.toDateString() === selected.toDateString()
}

const isDateDisabled = (date: Date): boolean => {
  if (props.minDate) {
    const min = typeof props.minDate === 'string' ? new Date(props.minDate) : props.minDate
    if (date < min) return true
  }
  
  if (props.maxDate) {
    const max = typeof props.maxDate === 'string' ? new Date(props.maxDate) : props.maxDate
    if (date > max) return true
  }
  
  return false
}

const getDateClasses = (date: DateItem): string => {
  const classes = [
    'flex justify-center items-center text-lg h-8 rounded cursor-pointer transition-colors',
    'hover:bg-base-200'
  ]
  
  if (date.type === 'current') {
    classes.push('text-base-content')
  } else {
    classes.push('text-base-content opacity-50')
  }
  
  if (date.isSelected) {
    classes.push(`bg-${props.color} text-${props.color}-content hover:bg-${props.color}-focus`)
  } else if (date.isToday) {
    classes.push(`text-${props.color} font-semibold`)
  }
  
  if (date.isDisabled) {
    classes.push('opacity-50 cursor-not-allowed hover:bg-transparent')
  }
  
  return classes.join(' ')
}

const formatDate = (date: Date, format: string): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
}

const parseDate = (dateString: string): Date | null => {
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? null : date
}

// 事件处理
const toggleShow = () => {
  if (props.disabled || props.readonly) return
  positionShow.value = !positionShow.value
}

const selectDate = (date: DateItem) => {
  if (date.isDisabled) return
  
  const selected = new Date(date.year, date.month, date.day)
  selectedDate.value = selected
  
  positionShow.value = false
  emit('update:modelValue', selected)
  emit('change', selected)
  emit('select', selected)
}

const yearDecrease = () => {
  currentYear.value -= 1
}

const monthDecrease = () => {
  if (currentMonth.value <= 0) {
    currentMonth.value = 11
    currentYear.value -= 1
  } else {
    currentMonth.value -= 1
  }
}

const yearIncrease = () => {
  currentYear.value += 1
}

const monthIncrease = () => {
  if (currentMonth.value >= 11) {
    currentMonth.value = 0
    currentYear.value += 1
  } else {
    currentMonth.value += 1
  }
}

const today = () => {
  const today = new Date()
  selectedDate.value = today
  positionShow.value = false
  emit('update:modelValue', today)
  emit('change', today)
  emit('select', today)
}

const selectNow = () => {
  const now = new Date()
  selectedDate.value = now
  positionShow.value = false
  emit('update:modelValue', now)
  emit('change', now)
  emit('select', now)
}

const clear = () => {
  selectedDate.value = null
  emit('update:modelValue', null)
  emit('change', null)
  emit('clear')
}

const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  focused.value = false
  emit('blur', event)
}

const handleInput = (value: string) => {
  if (value) {
    const date = parseDate(value)
    if (date) {
      selectedDate.value = date
      emit('update:modelValue', date)
      emit('change', date)
    }
  } else {
    selectedDate.value = null
    emit('update:modelValue', null)
    emit('change', null)
  }
}

// 监听器
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    if (typeof newValue === 'string') {
      const date = parseDate(newValue)
      if (date) {
        selectedDate.value = date
        currentYear.value = date.getFullYear()
        currentMonth.value = date.getMonth()
      }
    } else {
      selectedDate.value = newValue
      currentYear.value = newValue.getFullYear()
      currentMonth.value = newValue.getMonth()
    }
  } else {
    selectedDate.value = null
  }
}, { immediate: true })

// 点击外部关闭
useClickOutside(dateRef, () => {
  if (positionShow.value) {
    positionShow.value = false
  }
})

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  clear: () => clear(),
  getValue: () => selectedDate.value,
  setValue: (value: string | Date) => {
    selectedDate.value = value
    emit('update:modelValue', value)
  }
})
</script>

<style scoped>
/* 必填标签样式 */
.required::after {
  content: '*';
  color: var(--error);
  margin-left: 0.25rem;
}

/* 导航按钮内图标颜色 */
.nav-button i {
  color: var(--primary) !important;
  transition: color 0.2s ease-in-out;
}

.nav-button:hover i {
  color: var(--primary-focus) !important;
}

/* 日期面板动画 */
.date-panel {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 日期项悬停效果 */
.date-item:hover:not(.opacity-50) {
  background-color: var(--primary);
  color: white;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .date-panel {
    min-width: 100%;
    max-width: 100%;
  }
  
  .date-container.flex-row {
    flex-direction: column;
    align-items: flex-start;
    space-x: 0;
  }
}
</style>