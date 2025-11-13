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
      <div ref="inputContainerRef" :class="inputContainerClasses" @click="toggleShow">
        <ipt
          ref="inputRef"
          type="text"
          :size="size"
          :class="[inputClasses, iptClasses]"
          :modelValue="displayValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
        />
        <div :class="['absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-50 hover:opacity-70 transition-opacity pointer-events-none', props.disabled ? 'opacity-30' : '']">
          <icn :name="iconName" :size="iconSize" v-bind="iconStyleProps"></icn>
        </div>
      </div>
      
      <!-- 日期选择面板 -->
      <tst name="fade">
        <div v-if="positionShow" :class="panelClasses" :style="positionStyle">
          <!-- 头部导航 -->
          <div class="flex flex-row items-center border-b border-base-250 p-3 gap-1 h-12 flex-shrink-0">
            <div class="flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ease-in-out hover:opacity-70 active:scale-95 cursor-pointer flex-shrink-0 [&_i]:text-primary [&_i]:transition-colors [&_i]:duration-200 hover:[&_i]:text-primary-focus" @click="yearDecrease" :title="t('date.previousYear')">
              <icn name="angles-left" light lg class="hover:text-primary"></icn>
            </div>
            <div class="flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ease-in-out hover:opacity-70 active:scale-95 cursor-pointer flex-shrink-0 [&_i]:text-primary [&_i]:transition-colors [&_i]:duration-200 hover:[&_i]:text-primary-focus" @click="monthDecrease" :title="t('date.previousMonth')">
              <icn name="angle-left" light lg class="hover:text-primary"></icn>
            </div>
            <div class="flex-1 text-center flex flex-col items-center space-y-1 min-w-0">
              <span class="text-lg font-semibold text-primary">{{ currentYear }}</span>
              <span class="text-sm text-primary">{{ MonthName[currentMonth] }}</span>
            </div>
            <div class="flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ease-in-out hover:opacity-70 active:scale-95 cursor-pointer flex-shrink-0 [&_i]:text-primary [&_i]:transition-colors [&_i]:duration-200 hover:[&_i]:text-primary-focus" @click="monthIncrease" :title="t('date.nextMonth')">
              <icn name="angle-right" light lg class="hover:text-primary"></icn>
            </div>
            <div class="flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ease-in-out hover:opacity-70 active:scale-95 cursor-pointer flex-shrink-0 [&_i]:text-primary [&_i]:transition-colors [&_i]:duration-200 hover:[&_i]:text-primary-focus" @click="yearIncrease" :title="t('date.nextYear')">
              <icn name="angles-right" light lg class="hover:text-primary"></icn>
            </div>
          </div>
          
          <!-- 星期标题 -->
          <div class="grid grid-cols-7 gap-1 h-8 flex-shrink-0">
            <div v-for="day in WeekName" :key="day" class="flex justify-center items-center text-sm text-base-content opacity-70 font-medium h-8">
              {{ day }}
            </div>
          </div>
          
          <!-- 日期网格 -->
          <div class="grid grid-cols-7 gap-1 p-2 h-48 flex-shrink-0">
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
          <div class="flex flex-row justify-center items-center gap-4 p-4  border-base-250 h-12 flex-shrink-0">
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
import { ref, computed, watch, nextTick } from 'vue'
import { useClickOutside } from '~/packet/Config/useClickOutside'
import { usePosition } from '~/packet/Config/usePosition'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

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
  direction?: 'row' | 'col'
  labelWidth?: string
  inputWidth?: string
  fullWidth?: boolean
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
  iconStyle?: 'solid' | 'regular' | 'light' | 'thin' | 'brand'
  
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
  labelWidth: 'w-1/3',
  fullWidth: false,
  size: 'md',
  format: 'YYYY-MM-DD',
  showToday: true,
  showNow: false,
  allowClear: true,
  color: 'primary',
  variant: 'outline',
  shape: 'rounded',
  iconStyle: 'light',
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
const inputContainerRef = ref<HTMLElement | null>(null)

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

// 图标样式属性
const iconStyleProps = computed(() => {
  const style = props.iconStyle || 'light'
  return {
    solid: style === 'solid',
    regular: style === 'regular',
    light: style === 'light',
    thin: style === 'thin',
    brand: style === 'brand'
  }
})

const buttonSize = computed(() => {
  const sizes = { xs: 'xs', sm: 'sm', md: 'sm', lg: 'md', xl: 'md' }
  return sizes[props.size] || 'sm'
})

const buttonColor = computed(() => props.color)

// 样式计算
const dateContainerClasses = computed(() => {
  const classes: string[] = []
  
  // 容器需要相对定位，以便下拉面板可以绝对定位
  classes.push('relative')
  
  if (props.label) {
    // 根据 direction 设置布局方向
    if (props.direction === 'row') {
      classes.push('flex', 'flex-row', 'items-center')
    } else {
      classes.push('flex', 'flex-col')
    }
    
    // 如果设置了 fullWidth，强制使用 w-full；否则默认 w-full
    if (props.fullWidth) {
      classes.push('w-full')
    } else {
      classes.push('w-full')
    }
  } else {
    // 没有 label 时
    if (props.fullWidth) {
      classes.push('w-full')
    }
  }
  
  return classes.filter(Boolean).join(' ')
})

const labelClasses = computed(() => {
  const classes = ['select-none']
  
  if (props.label) {
    // 根据 direction 设置不同的样式
    if (props.direction === 'row') {
      classes.push('pr-2') // 水平布局时，右边距
    } else {
      classes.push('py-2') // 垂直布局时，上下边距
    }
    classes.push(props.labelWidth || 'w-1/3')
  }
  
  return classes.filter(Boolean).join(' ')
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
  const classes: string[] = []
  
  classes.push('relative')
  
  // 如果设置了 fullWidth，强制使用 w-full
  if (props.fullWidth) {
    classes.push('w-full')
  } else if (props.inputWidth) {
    // 如果指定了 inputWidth，使用指定的宽度
    classes.push(props.inputWidth)
  } else if (props.label && props.direction === 'row') {
    // 如果有 label 且是 row 布局，datePicker 占据剩余空间
    classes.push('flex-1', 'min-w-0')
  } else {
    // 默认情况下，使用固定宽度
    classes.push('w-96', 'max-w-96')
  }
  
  return classes.filter(Boolean).join(' ')
})

const inputContainerClasses = computed(() => {
  return [
    'flex flex-row items-center relative cursor-pointer',
    props.disabled ? 'opacity-50 cursor-not-allowed' : '',
    props.readonly ? 'cursor-default' : ''
  ].filter(Boolean).join(' ')
})
const inputClasses = computed(() => {
  const baseClasses = [
    ' outline-none bg-transparent box-border',
    'placeholder-gray-400',
    'px-2', // 增加左右内边距
    '[&_input]:',
    props.disabled ? 'cursor-not-allowed' : '',
    props.readonly ? 'cursor-default' : ''
  ]
  const sizeClasses = {
    xs: 'h-6  text-xs ',
    sm: 'h-8  text-sm ',
    md: 'h-10  text-base ',
    lg: 'h-12  text-lg ',
    xl: 'h-14  text-xl '
  }
  const variantClasses = {
    outline: 'border border-gray-300 hover:border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary',
    filled: 'bg-gray-100 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-primary',
    ghost: 'border-b border-gray-300 hover:border-gray-400 focus:border-primary'
  }
  const shapeClasses = {
    rounded: 'rounded',
    square: 'rounded-none',
    circle: 'rounded-full'
  }
  // 确定圆角类：优先使用 shape 属性，如果没有则根据 variant 决定
  const roundedClass = props.shape 
    ? shapeClasses[props.shape] 
    : (props.variant === 'ghost' ? 'rounded-none' : 'rounded')
  
  return [
    ...baseClasses,
    sizeClasses[props.size] || sizeClasses.md,
    variantClasses[props.variant] || variantClasses.outline,
    roundedClass,
    props.inputClass
  ].filter(Boolean).join(' ')
})

// Input 组件的 class（支持宽度设定）
const iptClasses = computed(() => {
  const classes: string[] = []
  // 提取宽度相关类的辅助函数
  const extractWidthClasses = (classString: string): string[] => {
    return classString.split(' ').filter(cls => 
      cls.includes('w-') || cls.includes('min-w-') || cls.includes('max-w-') || 
      cls.includes('flex-') || cls.includes('flex-grow') || cls.includes('flex-shrink')
    )
  }
  // 提取圆角类（直接应用到 Input 组件）
  const extractRoundedClasses = (classString: string): string[] => {
    return classString.split(' ').filter(cls => cls.includes('rounded'))
  }
  // 优先使用 inputClass 中的宽度类
  if (props.inputClass) {
    const widthClasses = extractWidthClasses(props.inputClass)
    if (widthClasses.length > 0) {
      classes.push(...widthClasses)
    }
    // 也提取圆角类
    const roundedClasses = extractRoundedClasses(props.inputClass)
    if (roundedClasses.length > 0) {
      classes.push(...roundedClasses)
    }
  }
  // 如果 inputClass 没有宽度类，则使用 customClass 中的宽度类
  if (classes.length === 0 && props.customClass) {
    const widthClasses = extractWidthClasses(props.customClass)
    if (widthClasses.length > 0) {
      classes.push(...widthClasses)
    }
  }
  // 默认情况下，如果没有指定宽度，使用 w-full
  if (classes.length === 0) {
    classes.push('w-full')
  }
  // 确保 input 元素也占据全宽（除非已经指定了具体的宽度类）
  if (!classes.some(cls => cls.startsWith('w-') && cls !== 'w-full')) {
    classes.push('[&_input]:w-full')
  }
  return classes.join(' ')
})

// 位置计算
const { placement, positionStyle, calculatePosition } = usePosition(inputContainerRef, {
  panelHeight: 400,
  panelWidth: 320, // 使用最小宽度 320px 进行计算
  gap: 4
})

const panelClasses = computed(() => {
  const baseClasses = [
    'absolute bg-base-100 border border-base-250 rounded-lg shadow-lg z-[9999]',
    'w-full min-w-[320px]', // 最小宽度 320px（20rem），确保包含所有导航按钮和日期网格
    'date-panel',
    'overflow-hidden', // 确保内容不超出面板边界
  ]
  
  // 根据位置调整样式
  if (placement.value === 'top') {
    baseClasses.push('bottom-full mb-1')
  } else {
    baseClasses.push('top-full mt-1')
  }
  
  baseClasses.push(props.panelClass)
  return baseClasses.filter(Boolean).join(' ')
})


// 日期相关计算
const dateList = computed((): DateItem[] => {
  return setDateList(currentYear.value, currentMonth.value)
})

const WeekName = computed(() => {
  const currentLocale = locale.value
  // 中文显示大写的一到七
  if (currentLocale.startsWith('zh')) {
    return ['一', '二', '三', '四', '五', '六', '七']
  }
  // 英文显示简写
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
})

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
  } else {
    // 非禁用状态的悬停效果（当不是半透明时）
    if (!date.isSelected && date.type === 'current') {
      classes.push('hover:bg-primary hover:text-white')
    }
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
  if (positionShow.value) {
    nextTick(() => {
      calculatePosition()
    })
  }
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
/* 日期面板淡入动画 */
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
</style>
