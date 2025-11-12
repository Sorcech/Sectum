<template>
  <div :class="containerClasses" ref="selectRef">
    <label v-if="label" :class="labelClasses">
      <span :class="labelTextClasses">{{ label }}</span>
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
          class="w-full [&_input]:w-full"
          @click="toggleShow" 
        />
        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-50 pointer-events-none" v-show="!disabled">
          <span v-show="!positionShow">
            <icn name="angle-down" light xl></icn>
          </span>
          <span v-show="positionShow">
            <icn name="angle-up" light xl></icn>
          </span>
        </div>
      </template>

      <!-- 头像模式：使用 Avatar 组件 -->
      <template v-else-if="mode === 'avatar'">
        <div class="relative flex items-center bg-base-100 rounded-md ">
          <div 
            :class="[
              'flex items-center gap-2 px-2 py-1 rounded-md border border-base-300 cursor-pointer transition-colors relative',
              props.disabled ? 'opacity-50 cursor-not-allowed bg-base-200' : 'hover:bg-base-200',
              displayClasses,
              // 当没有文本时，添加右边距为箭头留出空间
              (!selectedUser && !props.showPlaceholder) ? 'pr-10' : ''
            ]"
            @click.stop="toggleShow"
          >
            <avt
              :src="selectedUser?.avatar"
              :name="selectedUser?.name"
              :text="selectedUser?.text"
              :icon="selectedUser ? (selectedUser.icon || undefined) : 'users'"
              :icon-light="iconMode === 'light'"
              :icon-brand="iconMode === 'brand'"
              :size="avatarSize"
              :status="selectedUser?.status"
              :clickable="false"
            />
            <span 
              v-if="selectedUser" 
              :class="textSizeClasses"
              class="text-base-content whitespace-nowrap max-w-32 truncate pr-8"
            >
              {{ selectedUser.name || selectedUser.text || selectedUser.label }}
            </span>
            <span 
              v-else-if="props.showPlaceholder"
              :class="textSizeClasses"
              class="text-base-content/60 whitespace-nowrap pr-8"
            >
              {{ props.placeholder || t('common.pleaseSelect') }}
            </span>
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-50 pointer-events-none" v-show="!disabled">
              <span v-show="!positionShow">
                <icn name="angle-down" light xl></icn>
              </span>
              <span v-show="positionShow">
                <icn name="angle-up" light xl></icn>
              </span>
            </div>
          </div>
        </div>
      </template>

      <!-- 项目模式：使用图标和文本 -->
      <template v-else-if="mode === 'project'">
        <div class="relative flex items-center bg-base-100 rounded-md">
          <div 
            :class="[
              'flex items-center gap-2 px-2 py-1 rounded-md border border-base-300 cursor-pointer transition-colors',
              props.disabled ? 'opacity-50 cursor-not-allowed bg-base-200' : 'hover:bg-base-200',
              displayClasses
            ]"
            @click.stop="toggleShow"
          >
            <span 
              v-if="selectedProject" 
              :class="textSizeClasses"
              class="text-base-content whitespace-nowrap max-w-32 truncate pr-8"
            >
              {{ selectedProject.Name }}
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
                <icn name="angle-down" light xl></icn>
              </span>
              <span v-show="positionShow">
                <icn name="angle-up" light xl></icn>
              </span>
            </div>
          </div>
        </div>
      </template>

      <!-- 下拉菜单 - 项目模式 -->
      <tst name="downward" v-if="positionShow && !disabled && mode === 'project' && projects.length > 0" :class="tstClasses" :style="positionStyle">
        <Menu ref="menuRef" compact shadow rounded :class="[menuClasses, menuWidthClass]" :style="menuStyle">
          <btn 
            clean 
            v-for="(project, index) in projects" 
            :key="project.Name || index" 
            @click.stop="selectProject(project, index)"
            :class="[
              'flex items-center gap-2 p-2 w-full',
              selectedProject?.Name === project.Name ? 'bg-primary/10' : ''
            ]"
          >
            <icn 
              name="folder" 
              light 
              sm
              class="text-primary flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-base-content truncate">
                {{ project.Name }}
              </div>
            </div>
            <icn 
              v-if="selectedProject?.Name === project.Name"
              name="circle-check" 
              light 
              sm
              class="text-primary flex-shrink-0"
            />
          </btn>
        </Menu>
      </tst>
      <!-- 空状态提示 - 项目模式 -->
      <tst name="downward" v-if="positionShow && !disabled && mode === 'project' && projects.length === 0" :class="tstClasses" :style="positionStyle">
        <Menu compact shadow rounded class="p-2" :style="menuStyle">
          <div class="text-sm text-base-content/60 text-center py-2">
            {{ t('project.noProjects') }}
          </div>
        </Menu>
      </tst>
      <!-- 下拉菜单 - 默认模式 -->
      <tst name="downward" v-if="positionShow && !disabled && mode === 'default'" :class="tstClasses" :style="positionStyle">
        <Menu compact shadow rounded :class="[menuClasses, menuWidthClass]" :style="menuStyle">
          <btn clean v-for="(item, index) in displayOptions" :key="index" @click="selectData(item, index)">
            {{ item[fieldLabel || 'label'] }}
          </btn>
        </Menu>
      </tst>
      <!-- 下拉菜单 - 头像模式 -->
      <tst name="downward" v-if="positionShow && !disabled && mode === 'avatar'" :class="tstClasses" :style="positionStyle">
        <Menu compact shadow rounded :class="[menuClasses, menuWidthClass]" :style="menuStyle">
          <btn 
            clean 
            v-for="(user, index) in (props.options || [])" 
            :key="index" 
            @click="selectUser(user, index)"
            class="flex items-center gap-2 p-2 w-full"
          >
            <avt
              :src="user.avatar"
              :name="user.name"
              :text="user.text"
              :icon="user.icon"
              :size="avatarSize"
              :status="user.status"
              :clickable="false"
            />
            <span>{{ user.name || user.text || user.label }}</span>
          </btn>
        </Menu>
      </tst>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClickOutside } from '~/packet/Config/useClickOutside'
import { usePosition } from '~/packet/Config/usePosition'
import { Store } from '~/packet/Config/storage'

const { t } = useI18n()

// ==================== 类型定义 ====================

// 定义选项接口
interface SelectOption {
  [key: string]: any
}

// 头像选项接口
export interface AvatarOption {
  id?: string | number
  name?: string
  text?: string
  avatar?: string
  icon?: string
  status?: 'online' | 'offline' | 'away' | 'busy' | ''
  label?: string
  value?: string | number
  [key: string]: any
}

// 项目信息接口（内联定义）
interface ProjectInfo {
  Name?: string
  [key: string]: any
}

// ==================== 项目数据相关（内联实现） ====================

// API 基础配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888'
// 默认使用本地存储，除非明确配置使用远程API
const USE_LOCAL_STORAGE = import.meta.env.VITE_USE_LOCAL_STORAGE !== 'false'
// 本地存储键名
const STORAGE_KEY = 'sectum_projects'

/**
 * 获取初始项目列表（默认数据）
 */
function getInitialProjectList(): ProjectInfo[] {
  return [
    {
      Name: '示例项目1',
    },
    {
      Name: '示例项目2',
    },
    {
      Name: '示例项目3',
    }
  ]
}

/**
 * 从本地存储获取项目列表
 */
function getLocalProjects(): ProjectInfo[] {
  try {
    const stored = Store.getLocalStorage(STORAGE_KEY)
    return stored ? (Array.isArray(stored) ? stored : []) : []
  } catch (error) {
    return []
  }
}

/**
 * 远程获取项目列表
 */
async function listRemoteProjects(): Promise<any> {
  try {
    const token = Store.getLocalStorage('Token')
    const response = await fetch(`${API_BASE_URL}/project/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    })
    
    const data = await response.json()
    return { data }
  } catch (error) {
    throw error
  }
}

/**
 * 本地获取项目列表
 */
async function listLocalProjects(): Promise<any> {
  try {
    const projects = getLocalProjects()
    return {
      data: {
        code: 0,
        message: '获取成功',
        data: projects
      }
    }
  } catch (error) {
    throw error
  }
}

/**
 * 加载项目列表（内联实现）
 */
async function loadProjectList(): Promise<void> {
  if (props.projects && props.projects.length > 0) {
    projects.value = [...props.projects]
    return
  }
  
  if (props.loadProjects && props.mode === 'project') {
    try {
      let response
      if (USE_LOCAL_STORAGE) {
        response = await listLocalProjects()
      } else {
        response = await listRemoteProjects()
      }
      
      if (response?.data?.code === 0) {
        const loadedProjects = response.data.data || []
        if (loadedProjects.length === 0) {
          projects.value = getInitialProjectList()
        } else {
          projects.value = loadedProjects
        }
      } else {
        projects.value = getInitialProjectList()
      }
    } catch (error) {
      console.error('加载项目列表失败:', error)
      projects.value = getInitialProjectList()
    }
  } else if (props.mode === 'project') {
    projects.value = getInitialProjectList()
  }
  
  // 项目列表加载完成后，如果有modelValue，确保能正确显示
  // selectedItem计算属性会自动响应projects.value的变化
}

// ==================== 组件逻辑 ====================

const selectRef = ref(null)
const selectContainerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const props = withDefaults(defineProps<{
  // 模式：default（默认）、avatar（头像）、project（项目）
  mode?: 'default' | 'avatar' | 'project'
  direction?: string
  options?: SelectOption[] | AvatarOption[]
  // 项目模式专用
  projects?: ProjectInfo[]
  placeholder?: string
  fieldLabel?: string
  fieldValue?: string
  label?: string
  labelWidth?: string
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  selected?: string
  modelValue?: string | number | null
  // 头像模式专用
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  iconMode?: string // 图标模式，支持 'light', 'solid', 'regular', 'thin', 'duotone', 'brand'，默认为 'light'
  showPlaceholder?: boolean // 头像模式下是否显示占位符文本（如 "Please Select"），默认为 true
  // 项目模式专用
  loadProjects?: boolean
  // 宽度设置（默认使用 UnoCSS 类名）
  triggerWidth?: string // 触发器宽度，支持 UnoCSS 类名（如 'w-64', 'w-full'）或 CSS 值（如 '300px'）
  menuWidth?: string // 菜单宽度，支持 UnoCSS 类名（如 'w-64', 'w-full'）或 CSS 值（如 '300px'），默认与触发器宽度一致
}>(), {
  mode: 'default',
  size: 'md',
  avatarSize: 'sm',
  iconMode: 'light',
  disabled: false,
  fieldValue: 'value',
  loadProjects: true,
  showPlaceholder: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null | undefined]
  select: [value: any]
  selectIndex: [index: number]
}>()

// 项目列表（项目模式）
const projects = ref<ProjectInfo[]>(props.projects || [])

// 监听 props.projects 变化
watch(() => props.projects, (newProjects) => {
  if (newProjects && newProjects.length > 0) {
    projects.value = [...newProjects]
  }
}, { deep: true, immediate: true })

// 监听项目列表加载完成，确保能正确显示已选中的项目
watch(() => projects.value, () => {
  // 当项目列表更新后，如果已有modelValue，确保能正确显示
  if (props.mode === 'project' && props.modelValue && projects.value.length > 0) {
    // 触发selectedItem重新计算
  }
}, { deep: true })

// 显示选项列表
const displayOptions = computed(() => {
  if (props.mode === 'project') {
    return projects.value
  }
  return props.options || []
})

// 容器方向样式类
const containerClasses = computed(() => {
  const baseClasses = props.direction === 'col' ? 'flex flex-col' : 'flex flex-row justify-between items-center'
  const widthClass = props.label ? 'w-full max-w-full min-w-0' : 'w-auto'
  if (!props.label) return widthClass
  return [baseClasses, widthClass].filter(Boolean).join(' ')
})

// 判断是否为 UnoCSS 类名
const isUnoCSSClass = (value: string): boolean => {
  return value.startsWith('w-') || 
         value.startsWith('min-w-') || 
         value.startsWith('max-w-') ||
         value.includes('w-full') ||
         value.includes('w-auto')
}

// 触发器宽度样式类（默认使用 UnoCSS）
const containerWidthClasses = computed(() => {
  // 如果指定了 triggerWidth
  if (props.triggerWidth) {
    // 如果是 UnoCSS 类名，直接返回
    if (isUnoCSSClass(props.triggerWidth)) {
      return props.triggerWidth
    }
    // CSS 值，需要内联样式处理
    return ''
  }
  
  // 默认宽度（使用 UnoCSS 类名）
  if (props.mode === 'default') {
    return 'w-64 max-w-64'
  }
  return 'w-auto'
})

// 触发器内联样式（仅在传入 CSS 值时使用）
const triggerStyle = computed(() => {
  if (props.triggerWidth && !isUnoCSSClass(props.triggerWidth)) {
    return { width: props.triggerWidth }
  }
  return {}
})

// 标签样式类
const labelClasses = computed(() => {
  return [
    'select-none py-2',
    props.label ? props.labelWidth : ''
  ].filter(Boolean).join(' ')
})

// 标签文本大小样式类
const labelTextClasses = computed(() => {
  const sizeMap = {
    xs: 'text-xs',
    sm: 'text-sm', 
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  return sizeMap[props.size as keyof typeof sizeMap] || 'text-base'
})

// 文本大小样式类
const textSizeClasses = computed(() => {
  const sizeMap = {
    xs: 'text-xs',
    sm: 'text-sm', 
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  return sizeMap[props.size as keyof typeof sizeMap] || 'text-base'
})

// 图标大小
const iconSize = computed(() => {
  const sizeMap = {
    xs: 'xs',
    sm: 'sm', 
    md: 'md',
    lg: 'lg',
    xl: 'xl'
  }
  return sizeMap[props.size as keyof typeof sizeMap] || 'sm'
})

// 显示区域样式类
const displayClasses = computed(() => {
  return [
    props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  ].filter(Boolean).join(' ')
})

const hAuto = ref(false)

// 位置计算
const { placement, positionStyle, calculatePosition } = usePosition(selectContainerRef, {
  panelHeight: 300,
  panelWidth: 256,
  gap: 4
})

// tst 容器样式类
const tstClasses = computed(() => {
  const baseClasses = ['absolute z-99']
  if (placement.value === 'top') {
    baseClasses.push('bottom-full mb-1')
  } else {
    baseClasses.push('top-full mt-1')
  }
  return baseClasses.join(' ')
})

// 菜单样式类
const menuClasses = computed(() => {
  const baseClasses = []
  
  if (hAuto.value) {
    baseClasses.push('h-64 overflow-y-auto')
  } else {
    if (props.mode === 'project') {
      baseClasses.push('h-auto max-h-64 overflow-y-auto')
    } else {
      baseClasses.push('h-auto')
    }
  }
  
  return baseClasses.join(' ')
})

// 菜单宽度类名（默认使用 UnoCSS）
const menuWidthClass = computed(() => {
  // 如果指定了 menuWidth
  if (props.menuWidth) {
    // 如果是 UnoCSS 类名，直接返回
    if (isUnoCSSClass(props.menuWidth)) {
      return props.menuWidth
    }
    // CSS 值，不使用类名
    return ''
  }
  
  // 默认：菜单宽度与触发器宽度一致（使用相同的 UnoCSS 类名）
  if (props.triggerWidth && isUnoCSSClass(props.triggerWidth)) {
    return props.triggerWidth
  }
  
  // 如果触发器使用默认宽度，菜单也使用默认宽度
  if (props.mode === 'default') {
    return 'w-64 max-w-64'
  }
  
  // 其他模式，使用 min-w- 确保最小宽度
  if (props.mode === 'avatar') {
    return 'min-w-50'
  } else if (props.mode === 'project') {
    return 'min-w-60'
  }
  return 'min-w-50'
})

// 菜单内联样式（仅在传入 CSS 值或需要动态宽度时使用）
const menuWidthValue = ref<string | null>(null)

// 获取触发器实际宽度（用于动态宽度）
const getTriggerWidth = () => {
  if (!selectContainerRef.value) return null
  const width = (selectContainerRef.value as HTMLElement).offsetWidth
  return width ? `${width}px` : null
}

// 菜单样式（内联样式，仅在必要时使用）
const menuStyle = computed(() => {
  const styles: string[] = []
  
  // 如果指定了 menuWidth 且是 CSS 值
  if (props.menuWidth && !isUnoCSSClass(props.menuWidth)) {
    styles.push(`min-width: ${props.menuWidth};`)
    return styles.join(' ')
  }
  
  // 如果触发器使用 CSS 值，菜单也需要使用相同的 CSS 值
  if (props.triggerWidth && !isUnoCSSClass(props.triggerWidth)) {
    // 如果指定了 menuWidth，使用 menuWidth；否则使用 triggerWidth
    const width = props.menuWidth || props.triggerWidth
    styles.push(`min-width: ${width};`)
    return styles.join(' ')
  }
  
  // 如果都没有指定，且需要动态获取宽度（仅在触发器宽度为 w-auto 等动态值时）
  if (!props.triggerWidth && !props.menuWidth) {
    const triggerWidth = menuWidthValue.value || getTriggerWidth()
    if (triggerWidth) {
      styles.push(`min-width: ${triggerWidth};`)
      return styles.join(' ')
    }
    // 如果没有触发器宽度，设置默认最小宽度（兜底）
    if (props.mode === 'avatar') {
      styles.push(`min-width: 200px;`)
    } else if (props.mode === 'project') {
      styles.push(`min-width: 240px;`)
    } else {
      styles.push(`min-width: 256px;`)
    }
    return styles.join(' ')
  }
  
  // 默认情况下使用 UnoCSS 类名，不需要内联样式
  return ''
})

const placedisabled = ref('')
const positionShow = ref(false)

// 监听 placeholder 变化，更新 placedisabled
watch(() => props.placeholder, (newPlaceholder) => {
  if (props.disabled) {
    placedisabled.value = ''
  } else {
    placedisabled.value = newPlaceholder || t('common.pleaseSelect')
  }
}, { immediate: true })

// 监听 disabled 变化，更新 placedisabled
watch(() => props.disabled, (newDisabled) => {
  if (newDisabled) {
    placedisabled.value = ''
  } else {
    placedisabled.value = props.placeholder || t('common.pleaseSelect')
  }
})

onMounted(async () => {
  if (props.disabled) {
    placedisabled.value = ''
  } else {
    placedisabled.value = props.placeholder || t('common.pleaseSelect')
  }
  if (props.selected) {
    selectValue.value = props.selected
  }
  if (props.mode === 'project' && (!props.projects || props.projects.length === 0)) {
    await loadProjectList()
  }
  
  // 初始化时，如果有modelValue，确保能正确显示
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
})

const toggleShow = (e?: Event) => {
  if (e) {
    e.stopPropagation()
  }
  if (props.disabled) return
  positionShow.value = !positionShow.value
  if (positionShow.value) {
    const optionsLength = props.mode === 'project' ? projects.value.length : (props.options?.length || 0)
    if (optionsLength > 10) {
      hAuto.value = true
    }
    nextTick(() => {
      // 获取触发器宽度，用于设置菜单宽度
      if (!props.menuWidth) {
        menuWidthValue.value = getTriggerWidth()
      }
      calculatePosition()
    })
  }
}

const selectValue = ref<string>('')

// 内部状态：存储当前选中的用户和项目（用于立即更新显示）
const internalSelectedUser = ref<AvatarOption | null>(null)
const internalSelectedProject = ref<ProjectInfo | null>(null)

// 选中的项 - 项目模式（对应 ProjectSelect 的 selectedProject）
const selectedProject = computed<ProjectInfo | null>(() => {
  if (props.mode !== 'project') return null
  
  // 优先使用内部状态（选择后立即显示）
  // 如果内部状态存在，直接使用它，不进行验证
  // 这样可以确保选择后立即显示，不等待 modelValue 更新
  if (internalSelectedProject.value) {
    return internalSelectedProject.value
  }
  
  // 如果 modelValue 为 null 或 undefined，返回 null
  if (props.modelValue === null || props.modelValue === undefined) {
    return null
  }
  
  // 如果没有内部状态，从 modelValue 计算
  const field = props.fieldValue || 'Name'
  const projectList = projects.value
  if (!projectList || projectList.length === 0) {
    return null
  }
  
  // 使用 find 方法查找匹配的项目
  const found = projectList.find(project => {
    const value = project[field] ?? project.Name
    if (value === props.modelValue) return true
    if (String(value) === String(props.modelValue)) return true
    return false
  })
  
  // 更新内部状态
  if (found) {
    internalSelectedProject.value = found
  }
  
  return found || null
})

// 选中的项 - 头像模式（对应 AvatarSelect 的 selectedUser）
const selectedUser = computed<AvatarOption | null>(() => {
  if (props.mode !== 'avatar') return null
  
  // 优先使用内部状态（选择后立即显示）
  // 如果内部状态存在，直接使用它，不进行验证
  // 这样可以确保选择后立即显示，不等待 modelValue 更新
  if (internalSelectedUser.value) {
    return internalSelectedUser.value
  }
  
  // 如果 modelValue 为 null 或 undefined，返回 null
  if (props.modelValue === null || props.modelValue === undefined) {
    return null
  }
  
  // 如果没有内部状态，从 modelValue 计算
  const field = props.fieldValue || 'id'
  const users = (props.options || []) as AvatarOption[]
  if (!users || users.length === 0) {
    return null
  }
  
  // 使用 find 方法查找匹配的用户
  const found = users.find(user => {
    const value = user[field] ?? user.id ?? user.value
    if (value === props.modelValue) return true
    if (String(value) === String(props.modelValue)) return true
    if (Number(value) === Number(props.modelValue) && !isNaN(Number(value)) && !isNaN(Number(props.modelValue))) {
      return true
    }
    return false
  })
  
  // 更新内部状态
  if (found) {
    internalSelectedUser.value = found
  }
  
  return found || null
})

watch(() => props.selected, async () => {
  if (props.selected) {
    selectValue.value = props.selected
  }
})

// 监听 props.options 变化，确保头像模式的计算属性能够响应
watch(() => props.options, () => {
  if (props.mode === 'avatar') {
    // 强制触发 selectedUser 重新计算
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
    if (item) {
      selectValue.value = item[field]
    } else {
      selectValue.value = ''
    }
  }
  // 对于 avatar 和 project 模式，只有当 modelValue 真正变化时才触发重新计算
  // 如果 modelValue 是 undefined 但内部状态存在，不触发重新计算，避免清空内部状态
  if (props.mode === 'avatar') {
    // 只有当 modelValue 有值时才触发重新计算
    if (newValue !== undefined && newValue !== null) {
      void selectedUser.value
    }
  } else if (props.mode === 'project') {
    // 只有当 modelValue 有值时才触发重新计算
    if (newValue !== undefined && newValue !== null) {
      void selectedProject.value
    }
  }
}, { immediate: true, deep: true })


// 选择用户（头像模式）
const selectUser = (user: AvatarOption, index: number) => {
  const field = props.fieldValue || 'id'
  const value = user[field] ?? user.id ?? user.value
  // 立即更新内部状态，确保触发器立即显示选中的用户
  internalSelectedUser.value = user
  positionShow.value = false
  emit('update:modelValue', value)
  emit('select', user)
  emit('selectIndex', index)
}

// 选择项目（项目模式）
const selectProject = (project: ProjectInfo, index: number) => {
  const field = props.fieldValue || 'Name'
  const value = project[field] ?? project.Name
  // 立即更新内部状态，确保触发器立即显示选中的项目
  internalSelectedProject.value = project
  positionShow.value = false
  emit('update:modelValue', value)
  emit('select', project)
  emit('selectIndex', index)
}

// 选择数据（默认模式）
const selectData = (item: SelectOption, index: number) => {
  const field = props.fieldValue || 'value'
  const value = item[field] ?? item.value
  const labelField = props.fieldLabel || 'label'
  selectValue.value = item[labelField]
  
  positionShow.value = false
  emit('update:modelValue', value)
  emit('select', item)
  emit('selectIndex', index)
}

// 点击外部关闭菜单
useClickOutside(selectRef, (event) => {
  // 检查点击是否在菜单内（如果菜单使用了 portal，需要单独检查）
  if (menuRef.value) {
    // menuRef.value 是组件实例，需要获取其 DOM 元素
    const menuElement = (menuRef.value as any).$el || menuRef.value
    if (menuElement && menuElement instanceof HTMLElement) {
      const target = event.target as Node
      // 检查点击是否在菜单的 DOM 元素内
      if (target === menuElement || menuElement.contains(target)) {
        return
      }
      // 检查点击是否在菜单的 composedPath 中
      if (event.composedPath().includes(menuElement)) {
        return
      }
    }
  }
  if (positionShow.value) {
    positionShow.value = false
  }
})
</script>


