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
        <div :class="avatarContainerClasses">
          <div :class="triggerBaseClasses" @click.stop="toggleShow">
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
              v-if="selectedUser && props.showPlaceholder" 
              :class="textSizeClasses"
              class="text-base-content whitespace-nowrap flex-1 min-w-0 truncate pr-8"
            >
              {{ selectedUser.name || selectedUser.text || selectedUser.label }}
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
        <div class="relative flex items-center bg-base-100 rounded-md w-full">
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

      <!-- 下拉菜单 -->
      <template v-if="positionShow && !disabled">
        <!-- 项目模式 - 有数据 -->
        <tst 
          v-if="mode === 'project' && projects.length > 0" 
          name="downward" 
          :class="tstClasses" 
          :style="positionStyle"
        >
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
              <icn name="folder" light sm class="text-primary flex-shrink-0" />
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

        <!-- 项目模式 - 空状态 -->
        <tst 
          v-else-if="mode === 'project' && projects.length === 0" 
          name="downward" 
          :class="tstClasses" 
          :style="positionStyle"
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
          :style="positionStyle"
        >
          <Menu compact shadow rounded :class="[menuClasses, menuWidthClass]" :style="menuStyle">
            <btn clean v-for="(item, index) in displayOptions" :key="index" @click="selectData(item, index)">
              {{ item[fieldLabel || 'label'] }}
            </btn>
          </Menu>
        </tst>

        <!-- 头像模式 -->
        <tst 
          v-else-if="mode === 'avatar'" 
          name="downward" 
          :class="tstClasses" 
          :style="positionStyle"
        >
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
      </template>
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

interface SelectOption {
  [key: string]: any
}

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

interface ProjectInfo {
  Name?: string
  [key: string]: any
}

// ==================== 常量定义 ====================

const STORAGE_KEY = 'sectum_projects'

// 尺寸映射
const SIZE_MAP = {
  xs: { text: 'text-xs', icon: 'xs' },
  sm: { text: 'text-sm', icon: 'sm' },
  md: { text: 'text-base', icon: 'md' },
  lg: { text: 'text-lg', icon: 'lg' },
  xl: { text: 'text-xl', icon: 'xl' }
} as const

// 宽度配置
const WIDTH_CONFIG = {
  default: 'w-64 max-w-64',
  avatar: {
    withPlaceholder: 'w-64 max-w-64',
    withoutPlaceholder: 'w-16 max-w-16'
  },
  project: 'w-64 max-w-64',
  menu: {
    avatar: {
      withPlaceholder: { class: 'min-w-50', style: '200px' },
      withoutPlaceholder: { class: 'min-w-36', style: '144px' }
    },
    project: { class: 'min-w-60', style: '240px' },
    default: { class: 'min-w-64', style: '256px' }
  }
} as const

// ==================== 项目数据相关 ====================

function getInitialProjectList(): ProjectInfo[] {
  return [
    { Name: '示例项目1' },
    { Name: '示例项目2' },
    { Name: '示例项目3' }
  ]
}

function getLocalProjects(): ProjectInfo[] {
  try {
    const stored = Store.getLocalStorage(STORAGE_KEY)
    return stored ? (Array.isArray(stored) ? stored : []) : []
  } catch (error) {
    return []
  }
}

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

async function loadProjectList(): Promise<void> {
  if (props.projects && props.projects.length > 0) {
    projects.value = [...props.projects]
    return
  }
  
  if (props.loadProjects && props.mode === 'project') {
    try {
      const response = await listLocalProjects()
      const loadedProjects = response?.data?.code === 0 ? (response.data.data || []) : []
      projects.value = loadedProjects.length > 0 ? loadedProjects : getInitialProjectList()
    } catch (error) {
      console.error('加载项目列表失败:', error)
      projects.value = getInitialProjectList()
    }
  } else if (props.mode === 'project') {
    projects.value = getInitialProjectList()
  }
}

// ==================== 组件逻辑 ====================

const selectRef = ref(null)
const selectContainerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const props = withDefaults(defineProps<{
  mode?: 'default' | 'avatar' | 'project'
  direction?: string
  options?: SelectOption[] | AvatarOption[]
  projects?: ProjectInfo[]
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
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  iconMode?: string
  showPlaceholder?: boolean
  loadProjects?: boolean
  triggerWidth?: string
  menuWidth?: string
  menuCanExceedTrigger?: boolean
}>(), {
  mode: 'default',
  size: 'md',
  avatarSize: 'sm',
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

const projects = ref<ProjectInfo[]>(props.projects || [])
const selectValue = ref<string>('')
const placedisabled = ref('')
const positionShow = ref(false)
const hAuto = ref(false)
const menuWidthValue = ref<string | null>(null)
const internalSelectedUser = ref<AvatarOption | null>(null)
const internalSelectedProject = ref<ProjectInfo | null>(null)

// ==================== 工具函数 ====================

const isUnoCSSClass = (value: string): boolean => {
  return value.startsWith('w-') || 
         value.startsWith('min-w-') || 
         value.startsWith('max-w-') ||
         value.includes('w-full') ||
         value.includes('w-auto')
}

const getTriggerWidth = (): string | null => {
  if (!selectContainerRef.value) return null
  const width = (selectContainerRef.value as HTMLElement).offsetWidth
  return width ? `${width}px` : null
}

// 通用的查找函数
function findItemByValue<T extends { [key: string]: any }>(
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

// ==================== 计算属性 ====================

const displayOptions = computed(() => {
  return props.mode === 'project' ? projects.value : (props.options || [])
})

const containerClasses = computed(() => {
  const classes: string[] = []
  
  // 容器需要相对定位，以便下拉菜单可以绝对定位
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

const containerWidthClasses = computed(() => {
  const classes: string[] = []
  
  // 如果设置了 fullWidth，强制使用 w-full
  if (props.fullWidth) {
    classes.push('w-full')
  } else if (props.inputWidth) {
    // 如果指定了 inputWidth，使用指定的宽度
    classes.push(props.inputWidth)
  } else if (props.triggerWidth && isUnoCSSClass(props.triggerWidth)) {
    // 如果设置了 triggerWidth 且是 UnoCSS 类，使用它
    classes.push(props.triggerWidth)
  } else if (props.label && props.direction === 'row') {
    // 如果有 label 且是 row 布局，select 占据剩余空间
    classes.push('flex-1', 'min-w-0')
  } else {
    // 默认情况下，根据模式设置宽度
    if (props.mode === 'default') {
      classes.push(WIDTH_CONFIG.default)
    } else if (props.mode === 'avatar') {
      classes.push(props.showPlaceholder ? WIDTH_CONFIG.avatar.withPlaceholder : WIDTH_CONFIG.avatar.withoutPlaceholder)
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
  return SIZE_MAP[props.size]?.text || 'text-base'
})

const textSizeClasses = computed(() => {
  return SIZE_MAP[props.size]?.text || 'text-base'
})

const iconSize = computed(() => {
  return SIZE_MAP[props.size]?.icon || 'sm'
})

const displayClasses = computed(() => {
  return props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
})

const avatarContainerClasses = computed(() => {
  return [
    'relative flex items-center bg-base-100 rounded-md',
    props.showPlaceholder ? 'w-full' : 'w-16'
  ]
})

const triggerBaseClasses = computed(() => {
  return [
    'flex items-center gap-2 px-2 py-1 rounded-md border border-base-300 cursor-pointer transition-colors relative w-full',
    props.disabled ? 'opacity-50 cursor-not-allowed bg-base-200' : 'hover:bg-base-200',
    displayClasses.value
  ]
})

const { placement, positionStyle, calculatePosition } = usePosition(selectContainerRef, {
  panelHeight: 300,
  panelWidth: 256,
  gap: 4
})

const tstClasses = computed(() => {
  return [
    'absolute z-99',
    placement.value === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
  ].join(' ')
})

const menuClasses = computed(() => {
  if (hAuto.value) return 'h-64 overflow-y-auto'
  return props.mode === 'project' ? 'h-auto max-h-64 overflow-y-auto' : 'h-auto'
})

// 获取菜单宽度配置
const getMenuWidthConfig = () => {
  if (props.mode === 'avatar') {
    return props.showPlaceholder 
      ? WIDTH_CONFIG.menu.avatar.withPlaceholder 
      : WIDTH_CONFIG.menu.avatar.withoutPlaceholder
  }
  if (props.mode === 'project') return WIDTH_CONFIG.menu.project
  return WIDTH_CONFIG.menu.default
}

const menuWidthClass = computed(() => {
  if (props.menuWidth && isUnoCSSClass(props.menuWidth)) {
    return props.menuWidth
  }
  
  if (props.menuCanExceedTrigger) {
    if (props.triggerWidth && isUnoCSSClass(props.triggerWidth) && props.triggerWidth.startsWith('w-')) {
      return props.triggerWidth.replace('w-', 'min-w-')
    }
    return getMenuWidthConfig().class
  }
  
  if (props.triggerWidth && isUnoCSSClass(props.triggerWidth)) {
    return props.triggerWidth
  }
  
  if (props.mode === 'default') return WIDTH_CONFIG.default
  return getMenuWidthConfig().class
})

const menuStyle = computed(() => {
  const styles: string[] = []
  
  // 如果指定了 menuWidth 且是 CSS 值
  if (props.menuWidth && !isUnoCSSClass(props.menuWidth)) {
    styles.push(`${props.menuCanExceedTrigger ? 'min-width' : 'width'}: ${props.menuWidth};`)
    return styles.join(' ')
  }
  
  // 如果触发器使用 CSS 值
  if (props.triggerWidth && !isUnoCSSClass(props.triggerWidth)) {
    const width = props.menuWidth || props.triggerWidth
    styles.push(`${props.menuCanExceedTrigger ? 'min-width' : 'width'}: ${width};`)
    return styles.join(' ')
  }
  
  // 如果都没有指定，尝试动态获取宽度
  if (!props.triggerWidth && !props.menuWidth) {
    const triggerWidth = menuWidthValue.value || getTriggerWidth()
    if (triggerWidth) {
      styles.push(`${props.menuCanExceedTrigger ? 'min-width' : 'width'}: ${triggerWidth};`)
      return styles.join(' ')
    }
    // 兜底：使用默认最小宽度
    const config = getMenuWidthConfig()
    styles.push(`min-width: ${config.style};`)
    return styles.join(' ')
  }
  
  return ''
})

const selectedProject = computed<ProjectInfo | null>(() => {
  if (props.mode !== 'project') return null
  if (internalSelectedProject.value) return internalSelectedProject.value
  if (props.modelValue === null || props.modelValue === undefined) return null
  
  const found = findItemByValue(projects.value, props.modelValue, props.fieldValue || 'Name', ['Name'])
  if (found) internalSelectedProject.value = found
  return found
})

const selectedUser = computed<AvatarOption | null>(() => {
  if (props.mode !== 'avatar') return null
  if (internalSelectedUser.value) return internalSelectedUser.value
  if (props.modelValue === null || props.modelValue === undefined) {
    internalSelectedUser.value = null
    return null
  }
  
  const users = (props.options || []) as AvatarOption[]
  const found = findItemByValue(users, props.modelValue, props.fieldValue || 'id', ['id', 'value'])
  if (found) {
    internalSelectedUser.value = found
  } else {
    internalSelectedUser.value = null
  }
  return found
})

// ==================== 方法 ====================

const toggleShow = (e?: Event) => {
  e?.stopPropagation()
  if (props.disabled) return
  positionShow.value = !positionShow.value
  if (positionShow.value) {
    const optionsLength = props.mode === 'project' ? projects.value.length : (props.options?.length || 0)
    hAuto.value = optionsLength > 10
    nextTick(() => {
      if (!props.menuWidth) {
        menuWidthValue.value = getTriggerWidth()
      }
      calculatePosition()
    })
  }
}

const selectUser = (user: AvatarOption, index: number) => {
  const field = props.fieldValue || 'id'
  const value = user[field] ?? user.id ?? user.value
  // 先关闭菜单，避免 DOM 更新冲突
  positionShow.value = false
  // 使用 nextTick 确保 DOM 稳定后再更新状态
  nextTick(() => {
    internalSelectedUser.value = user
    emit('update:modelValue', value)
    emit('select', user)
    emit('selectIndex', index)
  })
}

const selectProject = (project: ProjectInfo, index: number) => {
  const field = props.fieldValue || 'Name'
  const value = project[field] ?? project.Name
  // 先关闭菜单，避免 DOM 更新冲突
  positionShow.value = false
  // 使用 nextTick 确保 DOM 稳定后再更新状态
  nextTick(() => {
    internalSelectedProject.value = project
    emit('update:modelValue', value)
    emit('select', project)
    emit('selectIndex', index)
  })
}

const selectData = (item: SelectOption, index: number) => {
  const field = props.fieldValue || 'value'
  const value = item[field] ?? item.value
  const labelField = props.fieldLabel || 'label'
  // 先关闭菜单，避免 DOM 更新冲突
  positionShow.value = false
  // 使用 nextTick 确保 DOM 稳定后再更新状态
  nextTick(() => {
    selectValue.value = item[labelField]
    emit('update:modelValue', value)
    emit('select', item)
    emit('selectIndex', index)
  })
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
  if (props.mode === 'avatar') {
    void selectedUser.value
  }
}, { deep: true })

watch(() => props.modelValue, (newValue) => {
  if (props.mode === 'default' && newValue) {
    const field = props.fieldLabel || 'label'
    const item = displayOptions.value.find(opt => {
      const value = opt[props.fieldValue || 'value']
      return value === newValue || String(value) === String(newValue)
    })
    selectValue.value = item ? item[field] : ''
  }
  if (props.mode === 'avatar' && newValue !== undefined && newValue !== null) {
    void selectedUser.value
  }
  if (props.mode === 'project' && newValue !== undefined && newValue !== null) {
    void selectedProject.value
  }
}, { immediate: true, deep: true })

// ==================== 生命周期 ====================

onMounted(async () => {
  placedisabled.value = props.disabled ? '' : (props.placeholder || t('common.pleaseSelect'))
  if (props.selected) {
    selectValue.value = props.selected
  }
  if (props.mode === 'project' && (!props.projects || props.projects.length === 0)) {
    await loadProjectList()
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
})

// ==================== 点击外部关闭 ====================

useClickOutside(selectRef, (event) => {
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
    positionShow.value = false
  }
})
</script>
