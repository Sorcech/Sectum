<template>
  <div :class="containerClasses" ref="selectRef">
      <label v-if="label" :class="labelClasses">
        <span :class="textSizeClasses">{{ label }}</span>
      </label>
    <div ref="selectContainerRef" :class="containerWidthClasses" :style="triggerStyle" class="relative flex items-center">
      <!-- 默认模式：输入框样式 -->
      <template v-if="mode === 'default'">
        <ipt 
          type="text" 
          readonly 
          :modelValue="selectValue" 
          :placeholder="placedisabled" 
          :disabled="disabled"
          :size="size"
          class="w-full"
          @click="toggleShow" 
        />
        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-50 pointer-events-none" v-show="!disabled">
          <span v-show="!positionShow">
            <icn name="angle-down" light xl class="text-base-content"></icn>
          </span>
          <span v-show="positionShow">
            <icn name="angle-up" light xl class="text-base-content"></icn>
          </span>
        </div>
      </template>

      <!-- 头像模式：使用 Avatar 组件 -->
      <template v-else-if="mode === 'user'">
        <div :class="modeContainerClasses">
          <div :class="triggerBaseClasses" @click.stop="toggleShow">
            <avt
              :key="selectedUser ? (selectedUser.value ?? '') : 'empty'"
              :src="selectedUser?.user"
              :label="selectedUser?.label"
              :icon="selectedUser ? (selectedUser.icon || undefined) : 'users'"
              :icon-light="iconMode === 'light'"
              :icon-brand="iconMode === 'brand'"
              :size="computedUserSize"
              :status="selectedUser?.status"
              :clickable="false"
            />
            <span 
              v-if="selectedUser && props.showPlaceholder" 
              :class="textSizeClasses"
              class="text-base-content whitespace-nowrap flex-1 min-w-0 truncate pr-8"
            >
              {{ selectedUser.label }}
            </span>
            <span 
              v-else-if="props.showPlaceholder && !selectedUser"
              :class="textSizeClasses"
              class="text-base-content/60 whitespace-nowrap pr-8"
            >
              {{ props.placeholder || t('common.pleaseSelect') }}
            </span>
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-50 pointer-events-none" v-show="!disabled">
              <span v-show="!positionShow">
                <icn name="angle-down" light xl class="text-base-content"></icn>
              </span>
              <span v-show="positionShow">
                <icn name="angle-up" light xl class="text-base-content"></icn>
              </span>
            </div>
          </div>
        </div>
      </template>

      <!-- 项目模式：使用图标和文本 -->
      <template v-else-if="mode === 'project'">
        <div :class="modeContainerClasses">
          <div :class="triggerBaseClasses" @click.stop="toggleShow">
            <icn 
              name="layer-group" 
              light 
              :size="iconSize"
              class="text-primary flex-shrink-0"
            />
            <span 
              v-if="selectedProject" 
              :class="textSizeClasses"
              class="text-base-content whitespace-nowrap max-w-32 truncate pr-8"
            >
              {{ selectedProject.label }}
            </span>
            <span 
              v-else 
              :class="textSizeClasses"
              class="text-base-content/60 whitespace-nowrap pr-8"
            >
              {{ props.placeholder || t('project.selectProject') }}
            </span>
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-50 pointer-events-none" v-show="!disabled">
              <span v-show="!positionShow">
                <icn name="angle-down" light xl class="text-base-content"></icn>
              </span>
              <span v-show="positionShow">
                <icn name="angle-up" light xl class="text-base-content"></icn>
              </span>
            </div>
          </div>
        </div>
      </template>

      <!-- 下拉菜单 -->
      <template v-if="positionShow && !disabled">
        <!-- 项目模式 - 有数据 -->
        <tst 
          v-if="mode === 'project' && projects.length > 0" 
          name="downward" 
          :class="tstClasses" 
          :style="finalPositionStyle"
        >
          <Menu ref="menuRef" compact shadow rounded :class="[menuClasses, menuWidthClass]" :style="menuStyle">
            <btn 
              clean 
              v-for="(project, index) in projects" 
              :key="getOptionKey(project, index, 'project')" 
              @click.stop="handleSelect(project, index)"
              :class="[
                'flex items-center gap-2 p-2 w-full',
                selectedProject?.value === project.value ? 'bg-primary/10' : ''
              ]"
            >
              <icn name="folder" light sm class="text-primary flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-base-content truncate">
                  {{ project.label }}
                </div>
              </div>
              <icn 
                v-if="selectedProject?.value === project.value"
                name="circle-check" 
                light 
                :size="iconSize"
                class="text-primary flex-shrink-0"
              />
            </btn>
          </Menu>
        </tst>

        <!-- 项目模式 - 空状态 -->
        <tst 
          v-else-if="mode === 'project' && projects.length === 0" 
          name="downward" 
          :class="tstClasses" 
          :style="finalPositionStyle"
        >
          <Menu compact shadow rounded class="p-2" :style="menuStyle">
            <div class="text-sm text-base-content/60 text-center py-2">
              {{ t('project.noProjects') }}
            </div>
          </Menu>
        </tst>

        <!-- 默认模式 -->
        <tst 
          v-else-if="mode === 'default'" 
          name="downward" 
          :class="tstClasses" 
          :style="finalPositionStyle"
        >
          <Menu compact shadow rounded :class="[menuClasses, menuWidthClass]" :style="menuStyle">
            <btn clean v-for="(item, index) in displayOptions" :key="getOptionKey(item, index, 'item', props.fieldValue || 'value')" @click="handleSelect(item, index)">
              {{ item[fieldLabel || 'label'] }}
            </btn>
          </Menu>
        </tst>

        <!-- 头像模式 -->
        <tst 
          v-else-if="mode === 'user'" 
          name="downward" 
          :class="tstClasses" 
          :style="finalPositionStyle"
        >
          <Menu compact shadow rounded :class="[menuClasses, menuWidthClass]" :style="menuStyle">
            <btn 
              clean 
              v-for="(user, index) in (props.options || [])" 
              :key="getOptionKey(user, index, 'user')" 
              @click="handleSelect(user, index)"
              class="flex items-center gap-2 p-2 w-full"
            >
              <avt
                :src="user.user"
                :label="user.label"
                :icon="user.icon"
                :size="computedUserSize"
                :status="user.status"
                :clickable="false"
              />
              <span>{{ user.label }}</span>
            </btn>
          </Menu>
        </tst>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, computed, onUnmounted, onBeforeUnmount, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClickOutside } from '~/packet/Config/useClickOutside'
import { usePosition } from '~/packet/Config/usePosition'
import { loadProjectList  } from './Select'
const { t } = useI18n()

// ==================== 类型定义 ====================
type SelectOption = { 
  value?: string | number // 必需：唯一标识和值绑定
  label?: string // 必需：显示文本
  [key: string]: any // 允许其他任意字段
}

// 尺寸映射 - 与 Input (ipt) 组件的尺寸配置保持一致，Input 组件的尺寸：xs: h-6, sm: h-8, md: h-10, lg: h-12, xl: h-14
const SIZE_MAP = {
  xs: { text: 'text-xs', icon: 'xs', height: 'h-6'},
  sm: { text: 'text-sm', icon: 'sm', height: 'h-8'}, // 与 ipt sm 一致：32px
  md: { text: 'text-base', icon: 'md', height: 'h-10'}, // 与 ipt md 一致：40px
  lg: { text: 'text-lg', icon: 'lg', height: 'h-12'}, // 与 ipt lg 一致：48px
  xl: { text: 'text-xl', icon: 'xl', height: 'h-14'} // 与 ipt xl 一致：56px
} as const

const WIDTH_CONFIG = { // 宽度配置
  default: 'w-48 max-w-48',
  user: {
    withPlaceholder: 'w-48 max-w-48',
    withoutPlaceholder: 'w-16 max-w-16'
  },
  project: 'w-48 max-w-48',
  menu: {
    user: {
      withPlaceholder: 'min-w-30',
      withoutPlaceholder: 'w-30 min-w-30'
    },
    project: 'min-w-48',
    default: 'min-w-48'
  }
} as const


// ==================== 组件逻辑 ====================
const selectRef = ref(null)
const selectContainerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const props = withDefaults(defineProps<{
  mode?: 'default' | 'user' | 'project'
  direction?: string
  options?: SelectOption[]
  projects?: SelectOption[]
  placeholder?: string
  fieldLabel?: string
  fieldValue?: string
  label?: string
  labelWidth?: string
  inputWidth?: string
  fullWidth?: boolean
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  selected?: string
  modelValue?: string | number | null
  userSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  iconMode?: string
  showPlaceholder?: boolean
  loadProjects?: boolean
  triggerWidth?: string
  menuWidth?: string
  menuCanExceedTrigger?: boolean
}>(), {
  mode: 'default',
  size: 'md',
  userSize: 'sm',
  iconMode: 'light',
  disabled: false,
  fieldValue: 'value',
  loadProjects: true,
  showPlaceholder: true,
  menuCanExceedTrigger: false,
  labelWidth: 'w-1/3',
  fullWidth: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null | undefined]
  select: [value: any]
  selectIndex: [index: number]
}>()

// ==================== 响应式数据 ====================
const projects = ref<SelectOption[]>(props.projects || [])
const selectValue = ref<string>('')
const placedisabled = ref('')
const positionShow = ref(false)
const hAuto = ref(false)
const menuWidthValue = ref<string | null>(null)
const internalSelectedUser = ref<SelectOption | null>(null)
const internalSelectedProject = ref<SelectOption | null>(null)
const isMounted = ref(false) // 添加组件挂载状态管理
const isDestroyed = ref(false)

// ==================== 工具函数 ====================
const isUnoCSSClass = (value: string): boolean => {
  return value.startsWith('w-') || 
         value.startsWith('min-w-') || 
         value.startsWith('max-w-') ||
         value.includes('w-full') ||
         value.includes('w-auto')
}

const getTriggerWidth = (): string | null => {
  if (!selectContainerRef.value || !isMounted.value || isDestroyed.value) return null
  try {
    const width = (selectContainerRef.value as HTMLElement).offsetWidth
    return width ? `${width}px` : null
  } catch (error) {
    return null
  }
}

// 获取触发器的实际宽度（像素值）
const getTriggerWidthPx = (): number | null => {
  if (menuWidthValue.value) { // 优先使用缓存的宽度值
    return parseFloat(menuWidthValue.value.replace('px', ''))
  } else if (selectContainerRef.value && isMounted.value) { // 如果缓存中没有，尝试从 DOM 获取
    try {
      const width = (selectContainerRef.value as HTMLElement).offsetWidth
      if (width > 0) return width
    } catch (error) { /* 忽略错误 */ }
  }
  return null
}

function findItemByValue<T extends { [key: string]: any }>( // 通用的查找函数
  items: T[],
  value: string | number | null | undefined,
  field: string,
  fallbackFields: string[] = []
): T | null {
  if (!value || !items || items.length === 0) return null
  
  return items.find(item => {
    const itemValue = item[field] ?? fallbackFields.map(f => item[f]).find(v => v !== undefined)
    if (itemValue === value) return true
    if (String(itemValue) === String(value)) return true
    if (Number(itemValue) === Number(value) && !isNaN(Number(itemValue)) && !isNaN(Number(value))) {
      return true
    }
    return false
  }) || null
}

const getOptionKey = (item: SelectOption, index: number, prefix: string = 'item', field?: string) => { // 通用的键生成函数
  const value = field ? item[field] : item.value
  return value ? `${prefix}-${value}-${index}` : `${prefix}-${index}`
}

const safeSetPositionShow = (value: boolean) => { // 安全的状态更新函数
  if (!isDestroyed.value && isMounted.value) {
    positionShow.value = value
  }
}

// ==================== 计算属性 ====================
const displayOptions = computed(() => {
  return props.mode === 'project' ? projects.value : (props.options || [])
})

const containerClasses = computed(() => {
  const classes: string[] = []
  classes.push('relative') // 容器需要相对定位，以便下拉菜单可以绝对定位
  if (props.label) {
    if (props.direction === 'row') { // 根据 direction 设置布局方向
      classes.push('flex', 'flex-row', 'items-center')
    } else {
      classes.push('flex', 'flex-col')
    }
    if (props.fullWidth) { // 如果设置了 fullWidth，强制使用 w-full；否则默认 w-full
      classes.push('w-full')
    } else {
      classes.push('w-full')
    }
  } else { // 没有 label 时
    if (props.fullWidth) {
      classes.push('w-full')
    }
  }
  
  return classes.filter(Boolean).join(' ')
})

const containerWidthClasses = computed(() => {
  const classes: string[] = []
  if (props.fullWidth) {
    classes.push('w-full')// 如果设置了 fullWidth，强制使用 w-full
  } else if (props.inputWidth) {
    classes.push(props.inputWidth)// 如果指定了 inputWidth，使用指定的宽度
  } else if (props.triggerWidth && isUnoCSSClass(props.triggerWidth)) {
    classes.push(props.triggerWidth)// 如果设置了 triggerWidth 且是 UnoCSS 类，使用它
  } else if (props.label && props.direction === 'row') {
    classes.push('flex-1', 'min-w-0')// 如果有 label 且是 row 布局，select 占据剩余空间
    } else { // 默认情况下，根据模式设置宽度
    if (props.mode === 'default') {
      classes.push(WIDTH_CONFIG.default)
    } else if (props.mode === 'user') {
      classes.push(props.showPlaceholder ? WIDTH_CONFIG.user.withPlaceholder : WIDTH_CONFIG.user.withoutPlaceholder)
    } else if (props.mode === 'project') {
      classes.push(WIDTH_CONFIG.project)
    } else {
      classes.push('w-auto')
    }
  }
  
  return classes.filter(Boolean).join(' ')
})

const triggerStyle = computed(() => {
  return props.triggerWidth && !isUnoCSSClass(props.triggerWidth) 
    ? { width: props.triggerWidth } 
    : {}
})

const labelClasses = computed(() => {
  const classes = ['select-none']
  if (props.label) {
    if (props.direction === 'row') { // 根据 direction 设置不同的样式
      classes.push('pr-2') // 水平布局时，右边距
    } else {
      classes.push('py-2') // 垂直布局时，上下边距
    }
    classes.push(props.labelWidth || 'w-1/3')
  }
  
  return classes.filter(Boolean).join(' ')
})

const textSizeClasses = computed(() => {
  return SIZE_MAP[props.size]?.text || 'text-base'
})

const iconSize = computed(() => {
  return SIZE_MAP[props.size]?.icon || 'sm'
})

const computedUserSize = computed(() => { // 根据 size 计算对应的 userSize（Avatar 尺寸），确保 user 模式的高度与 size 匹配，与 ipt 组件的高度一致
  if (props.userSize) return props.userSize // 如果明确指定了 userSize，使用它
  // 否则根据 size 自动映射，使 Avatar 高度与 ipt 组件高度匹配，ipt: xs=h-6, sm=h-8, md=h-10, lg=h-12, xl=h-14，Avatar: xs=24px, sm=32px, md=40px, lg=48px, xl=64px
  const sizeToUserSizeMap: Record<string, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> = {
    xs: 'xs', // 24px
    sm: 'sm', // 32px，与 ipt sm (h-8) 一致
    md: 'md', // 40px，与 ipt md (h-10) 一致
    lg: 'lg', // 48px，与 ipt lg (h-12) 一致
    xl: 'xl'  // 64px，与 ipt xl (h-14) 接近
  }
  return sizeToUserSizeMap[props.size] || 'md'
})

const displayClasses = computed(() => {
  return props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
})

const modeContainerClasses = computed(() => { // 统一的外层容器样式（用于 user 和 project 模式）
  const baseClasses = [
    'relative',
    'bg-base-100',
    'rounded-$rounded-btn',
    'hover:bg-base-150',
    'transition-colors',
    'box-border',
    'overflow-hidden'
  ]
  if (props.mode === 'user') { // 根据模式设置宽度和布局
    baseClasses.push(props.showPlaceholder ? 'w-full' : 'w-16')
  } else if (props.mode === 'project') {
    baseClasses.push('w-full')
  }
  const sizeConfig = SIZE_MAP[props.size] || SIZE_MAP.md // 确保容器高度与触发器高度一致
  baseClasses.push(sizeConfig.height)
  
  return baseClasses.filter(Boolean).join(' ')
})

const triggerBaseClasses = computed(() => {
  const sizeConfig = SIZE_MAP[props.size] || SIZE_MAP.md // 根据 size 获取对应的高度（与 ipt 组件一致）
  const height = sizeConfig.height // h-6, h-8, h-10, h-12, h-14
  const classes = [
    'flex items-center gap-2 px-2',
    height, // 固定高度，与 ipt 组件一致（h-6, h-8, h-10, h-12, h-14）
    'rounded-$rounded-btn border border-base-300 cursor-pointer transition-colors relative w-full',
    'box-border',
    props.disabled ? 'opacity-50 cursor-not-allowed bg-base-200' : 'hover:bg-base-200',
    displayClasses.value
  ]
  
  return classes.filter(Boolean).join(' ')
})

// 当 showPlaceholder 为 true 时，不计算左右偏移，菜单宽度与触发器一致
const shouldAlignWithTrigger = computed(() => {
  return props.showPlaceholder && (props.mode === 'default' || props.mode === 'project' || props.mode === 'user')
})

const { placement, positionStyle, calculatePosition } = usePosition(selectContainerRef, {
  panelHeight: 300,
  panelWidth: 256,
  gap: 4
})

// 当需要对齐触发器时，覆盖 positionStyle，移除左右偏移
const finalPositionStyle = computed(() => {
  if (shouldAlignWithTrigger.value) {
    const style = { ...positionStyle.value }
    delete style.left
    delete style.right
    delete style.maxWidth
    return style
  }
  return positionStyle.value
})

const tstClasses = computed(() => {
  return [
    'absolute z-99',
    placement.value === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
  ].join(' ')
})

const menuClasses = computed(() => {
  if (hAuto.value) return 'h-64 overflow-y-auto'
  // usePosition 设置了 panelHeight: 300，会在 positionStyle 中设置 max-height
  // 当有 max-height 限制时，需要添加 overflow-y-auto 以确保可以滚动，并且背景色能正确应用到所有选项
  // 由于 usePosition 总是设置 panelHeight，所以默认添加 overflow-y-auto
  return props.mode === 'project' ? 'h-auto max-h-64 overflow-y-auto' : 'h-auto overflow-y-auto'
})

const getMenuWidthConfig = () => { // 获取菜单宽度配置
  if (props.mode === 'user') {
    return props.showPlaceholder 
      ? WIDTH_CONFIG.menu.user.withPlaceholder 
      : WIDTH_CONFIG.menu.user.withoutPlaceholder
  }
  if (props.mode === 'project') return WIDTH_CONFIG.menu.project
  return WIDTH_CONFIG.menu.default
}

const getMinWidthFromConfig = (config: string): number | null => { // 从配置字符串中提取最小宽度值（像素）
  const minWidthMatch = config.match(/min-w-(\d+)/)
  if (!minWidthMatch) return null
  const value = parseInt(minWidthMatch[1], 10)
  return value * 4 // UnoCSS: w-30 = 30 * 0.25rem = 7.5rem = 120px (假设 1rem = 16px)，转换为像素值
}

const pxToUnoCSSWidth = (px: number): string => { // 将像素值转换为最接近的 UnoCSS 宽度类，UnoCSS 宽度类：w-N = N * 0.25rem = N * 4px
  const value = Math.round(px / 4)
  if (value < 1) return 'w-1' // 确保值在合理范围内
  if (value > 96) return 'w-96'
  return `w-${value}`
}

const menuWidthClass = computed(() => {
  if (props.menuWidth && isUnoCSSClass(props.menuWidth)) { // 如果指定了 menuWidth 且是 UnoCSS 类，直接使用
    return props.menuWidth
  }
  
  // 当 showPlaceholder 为 true 时，菜单宽度与触发器一致
  if (shouldAlignWithTrigger.value) {
    const triggerWidthPx = getTriggerWidthPx()
    if (triggerWidthPx !== null) {
      return pxToUnoCSSWidth(triggerWidthPx)
    }
    return getMenuWidthConfig() // 如果无法获取触发器宽度，使用配置的默认宽度
  }
  
  if (props.menuCanExceedTrigger) {
    if (props.triggerWidth && isUnoCSSClass(props.triggerWidth) && props.triggerWidth.startsWith('w-')) {
      return props.triggerWidth.replace('w-', 'min-w-')
    }
    return getMenuWidthConfig()
  }
  if (props.mode === 'user') { // User 模式：当触发器宽度小于 Menu 最小宽度时，使用最小宽度；否则使用触发器宽度
    const config = getMenuWidthConfig()
    const minWidth = getMinWidthFromConfig(config)
    if (minWidth !== null) {
      const triggerWidthPx = getTriggerWidthPx()
      if (triggerWidthPx !== null && triggerWidthPx < minWidth) {
        return config
      } else if (triggerWidthPx !== null) {
        return pxToUnoCSSWidth(triggerWidthPx)
      }
    }
    return config
  }
  
  // Project 和 Default 模式：Menu 的宽度与触发器保持一致
  if (props.mode === 'project' || props.mode === 'default') {
    if (props.triggerWidth && isUnoCSSClass(props.triggerWidth)) {
      return props.triggerWidth
    }
    const triggerWidthPx = getTriggerWidthPx()
    if (triggerWidthPx !== null) {
      return pxToUnoCSSWidth(triggerWidthPx)
    }
    return props.mode === 'project' ? getMenuWidthConfig() : WIDTH_CONFIG.default
  }
  
  return getMenuWidthConfig()
})

const menuStyle = computed(() => {
  // 当 showPlaceholder 为 true 时，菜单宽度与触发器一致
  if (shouldAlignWithTrigger.value) {
    const triggerWidth = menuWidthValue.value || getTriggerWidth()
    if (triggerWidth) {
      return `width: ${triggerWidth};`
    }
    return ''
  }
  
  const styles: string[] = []
  if (props.menuWidth && !isUnoCSSClass(props.menuWidth)) { // 只有在 menuWidth 是 CSS 值（非 UnoCSS 类）时才使用内联样式
    styles.push(`${props.menuCanExceedTrigger ? 'min-width' : 'width'}: ${props.menuWidth};`)
    return styles.join(' ')
  }
  
  if (props.triggerWidth && !isUnoCSSClass(props.triggerWidth)) {
    const width = props.menuWidth || props.triggerWidth
    styles.push(`${props.menuCanExceedTrigger ? 'min-width' : 'width'}: ${width};`)
    return styles.join(' ')
  }
  
  if (!props.triggerWidth && !props.menuWidth) {
    const triggerWidth = menuWidthValue.value || getTriggerWidth()
    if (triggerWidth) {
      styles.push(`${props.menuCanExceedTrigger ? 'min-width' : 'width'}: ${triggerWidth};`)
      return styles.join(' ')
    }
  }
  
  return ''
})

const selectedProject = computed<SelectOption | null>(() => {
  if (props.mode !== 'project') return null
  if (internalSelectedProject.value) { // 直接返回内部缓存的值，优先使用缓存
    return internalSelectedProject.value
  }
  if (props.modelValue === null || props.modelValue === undefined) { // 如果没有缓存，根据 modelValue 查找
    return null
  }
  const found = findItemByValue(projects.value, props.modelValue, props.fieldValue || 'value', ['value'])
  if (found) internalSelectedProject.value = found
  return found
})

const selectedUser = computed<SelectOption | null>(() => {
  if (props.mode !== 'user') return null
  if (internalSelectedUser.value) { // 直接返回内部缓存的值，优先使用缓存
    return internalSelectedUser.value
  }
  if (props.modelValue === null || props.modelValue === undefined) { // 如果没有缓存，根据 modelValue 查找
    return null
  }
  const users = (props.options || []) as SelectOption[]
  const found = findItemByValue(users, props.modelValue, props.fieldValue || 'value', ['value'])
  if (found) {
    internalSelectedUser.value = found
  }
  return found
})

// ==================== 方法 ====================
const toggleShow = (e?: Event) => {
  if (isDestroyed.value) return
  
  try {
    e?.stopPropagation()
    if (props.disabled) return
    
    const newShowState = !positionShow.value
    safeSetPositionShow(newShowState)
    
    if (newShowState) {
      const optionsLength = props.mode === 'project' ? projects.value.length : (props.options?.length || 0)
      hAuto.value = optionsLength > 10
      setTimeout(() => { // 使用 setTimeout 而不是 nextTick 来避免微任务队列的问题
        if (!isMounted.value || isDestroyed.value) return
        
        if (!props.menuWidth) {
          menuWidthValue.value = getTriggerWidth()
        }
        
        try {
          calculatePosition()
        } catch (error) {
          console.warn('Calculate position error:', error)
        }
      }, 10)
    }
  } catch (error) {
    console.warn('Toggle show error:', error)
  }
}

const handleSelect = (item: any, index: number) => { // 统一的选择处理函数
  if (isDestroyed.value) return
  try {
    const field = props.fieldValue || 'value' // 根据模式确定字段和值
    const value = item[field] ?? item.value
    if (props.mode === 'default') { // Default 模式需要更新 selectValue
      const labelField = props.fieldLabel || 'label'
      selectValue.value = item[labelField]
    }
    safeSetPositionShow(false) // 先关闭菜单
    if (props.mode === 'user') { // 立即更新状态（同步更新，确保触发器立即响应）
      internalSelectedUser.value = item
    } else if (props.mode === 'project') {
      internalSelectedProject.value = item
    }
    emit('update:modelValue', value) // 触发事件
    emit('select', item)
    emit('selectIndex', index)
  } catch (error) {
    console.warn('Handle select error:', error)
    safeSetPositionShow(false) // 即使出错也确保菜单关闭
  }
}


// ==================== 监听器 ====================
watch(() => props.projects, (newProjects) => {
  if (newProjects && newProjects.length > 0) {
    projects.value = [...newProjects]
  }
}, { deep: true, immediate: true })

watch(() => props.placeholder, (newPlaceholder) => {
  placedisabled.value = props.disabled ? '' : (newPlaceholder || t('common.pleaseSelect'))
}, { immediate: true })

watch(() => props.disabled, (newDisabled) => {
  placedisabled.value = newDisabled ? '' : (props.placeholder || t('common.pleaseSelect'))
})

watch(() => props.selected, () => {
  if (props.selected) {
    selectValue.value = props.selected
  }
})

watch(() => props.options, () => {
  if (props.mode === 'user') {
    void selectedUser.value
  }
}, { deep: true })

watch(() => props.modelValue, (newValue, oldValue) => {
  if (props.mode === 'default' && newValue) {
    const field = props.fieldLabel || 'label'
    const item = displayOptions.value.find(opt => {
      const value = opt[props.fieldValue || 'value']
      return value === newValue || String(value) === String(newValue)
    })
    selectValue.value = item ? item[field] : ''
  }
  if (props.mode === 'user' || props.mode === 'project') {
    if (newValue !== oldValue) {
      nextTick(() => { // 使用 nextTick 确保在 DOM 更新后再更新状态
      if (isDestroyed.value) return
        // 如果 newValue 为 null 或 undefined，清空内部状态
        if (newValue === null || newValue === undefined) {
          if (props.mode === 'user') {
            internalSelectedUser.value = null
          } else {
            internalSelectedProject.value = null
          }
        } else {
          // 否则根据 modelValue 查找并更新
          const fieldValue = props.fieldValue || 'value'
          const found = props.mode === 'user' 
            ? findItemByValue((props.options || []) as SelectOption[], newValue, fieldValue, ['value'])
            : findItemByValue(projects.value, newValue, fieldValue, ['value'])
          if (props.mode === 'user') {
        internalSelectedUser.value = found
      } else {
        internalSelectedProject.value = found
          }
      }
    })
    }
  }
}, { immediate: true, deep: true })

// ==================== 生命周期 ====================
onMounted(async () => {
  isMounted.value = true
  isDestroyed.value = false
  
  try {
    placedisabled.value = props.disabled ? '' : (props.placeholder || t('common.pleaseSelect'))
    if (props.selected) {
      selectValue.value = props.selected
    }
    if (props.mode === 'project' && (!props.projects || props.projects.length === 0)) {
      projects.value = await loadProjectList(props.projects, props.mode, props.loadProjects)
    }
    if (props.mode === 'default' && props.modelValue) {
      const field = props.fieldLabel || 'label'
      const item = displayOptions.value.find(opt => {
        const value = opt[props.fieldValue || 'value']
        return value === props.modelValue || String(value) === String(props.modelValue)
      })
      if (item) {
        selectValue.value = item[field]
      }
    }
  } catch (error) {
    console.warn('Select component mounted error:', error)
  }
})

onBeforeUnmount(() => {
  isDestroyed.value = true // 在卸载前先标记为已销毁
})

onUnmounted(() => {
  isMounted.value = false
  isDestroyed.value = true
  selectContainerRef.value = null // 清理引用
  menuRef.value = null
})

// ==================== 点击外部关闭 ====================
useClickOutside(selectRef, (event) => {
  if (isDestroyed.value) return
  try {
    if (menuRef.value) {
      const menuElement = (menuRef.value as any).$el || menuRef.value
      if (menuElement && menuElement instanceof HTMLElement) {
        const target = event.target as Node
        if (target === menuElement || menuElement.contains(target) || event.composedPath().includes(menuElement)) {
          return
        }
      }
    }
    if (positionShow.value) {
      safeSetPositionShow(false)
    }
  } catch (error) {
    console.warn('Click outside error:', error)
  }
})
</script>