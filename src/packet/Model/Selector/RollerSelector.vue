<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import Select from '~/packet/Section/Select/Select.vue'
import Toast from '~/packet/Element/Toast/Toast'
import { createCascadeConfig, FIELD_CONFIG, TYPE_DIAMETER_MAP, TYPE_MATERIAL_MAP, TYPE_BELT_MAP, TYPE_SHAFT_MAP, DIAMETER_MATERIAL_MAP, DIAMETER_BELT_MAP, DIAMETER_LOAD_MAP, DIAMETER_LENGTH_MAP, MATERIAL_BELT_MAP, BELT_SHAFT_MAP, BELT_LOAD_MAP, LOAD_SPEED_MAP, BELT_CODE_MAP, SHAFT_CODE_MAP, LOAD_CODE_MAP, generateProductNumber, calculatePipeLength } from './RollerSelector'
import { calculateGearRatio } from './RollerSelector'

// 获取 i18n 实例
const { locale } = useI18n()

// 定义 props
const props = defineProps<{
  layoutMode?: 'horizontal' | 'vertical'
}>()

// 布局模式：横向或纵向，默认从 props 获取
const layoutMode = computed(() => props.layoutMode || 'horizontal')

// 选项接口
interface SelectOption {
  label: string
  value: string
  [key: string]: any
}

// 级联配置节点接口
interface CascadeNode {
  field: string
  label: string
  componentType?: string
  code?: number | string
  value?: string | number
  options?: Record<string, any> | SelectOption[]
  [key: string]: any
}

// 选择级别信息
interface SelectLevel {
  field: string
  label: string
  options: SelectOption[]
  selectedValue: string
  disabled: boolean
  node?: CascadeNode
  width?: string
}

// 获取级联配置
const cascadeConfig = createCascadeConfig()

// 表单数据（存储每一级的选择值）
const formData = ref<Record<string, string>>({})

// 控制每个 Select 是否自动打开
const autoOpenFlags = ref<Record<number, boolean>>({})

// 获取选中项的标签文本
const getSelectedLabel = (options: SelectOption[], value: string, field?: string): string => {
  if (!value) return ''
  const option = options.find(opt => opt.value === value)
  // 特殊处理：长度字段如果值不在选项中，直接返回输入的值
  if (field === 'Length' && !option) {
    return value
  }
  return option?.label || ''
}

/**
 * 根据当前表单数据，获取指定字段的可用选项
 * 这个函数会根据已选择的路径，从树形配置中提取对应的选项
 */
const getAvailableOptions = (field: string, config: CascadeNode): { options: SelectOption[], node: CascadeNode | null } => {
  // 如果是第一级（根节点的字段），直接返回根节点的所有选项
  if (config.field === field) {
    if (config.options && !Array.isArray(config.options)) {
      const options: SelectOption[] = Object.keys(config.options as Record<string, any>).map(key => ({
        label: key,
        value: key
      }))
      return { options, node: config }
    }
    return { options: [], node: config }
  }
  
  // 递归查找目标字段的配置节点
  const findNode = (node: CascadeNode, path: Array<{ field: string, value: string }> = []): CascadeNode | null => {
    // 如果当前节点就是目标字段，检查路径是否匹配
    if (node.field === field) {
      // 检查路径是否匹配当前表单数据（路径中的所有字段都必须有值且匹配）
      const pathMatches = path.every(({ field, value }) => {
        const formValue = formData.value[field]
        return formValue && formValue === value
      })
      
      if (pathMatches) {
        return node
      }
    }
    
    // 如果当前节点是分支节点，继续递归查找
    if (Array.isArray(node.options)) {
      // 叶子节点，不匹配
      return null
    }
    
    // 遍历所有子节点
    if (node.options && !Array.isArray(node.options)) {
      const currentPathValue = formData.value[node.field]
      
      // 如果当前字段有值，只遍历匹配的子节点
      if (currentPathValue) {
        const childNode = (node.options as Record<string, any>)[currentPathValue]
        if (childNode) {
          const found = findNode(childNode, [...path, { field: node.field, value: currentPathValue }])
          if (found) {
            return found
          }
        }
      } else {
        // 如果当前字段没有值，需要遍历所有子节点，但只返回第一个匹配的（用于获取字段配置）
        for (const [value, childNode] of Object.entries(node.options as Record<string, any>)) {
          const found = findNode(childNode, [...path, { field: node.field, value }])
          if (found) {
            return found
          }
        }
      }
    }
    
    return null
  }
  
  const foundNode = findNode(config)
  
  if (!foundNode) {
    return { options: [], node: null }
  }
  
  // 如果找到的节点是叶子节点（options 是数组），直接返回
  if (Array.isArray(foundNode.options)) {
    return { options: foundNode.options, node: foundNode }
  }
  
  // 如果是分支节点，提取所有键作为选项，并包含节点的 code 和 value 信息
  if (foundNode.options && !Array.isArray(foundNode.options)) {
    let options: SelectOption[] = Object.keys(foundNode.options as Record<string, any>).map(key => {
      const childNode = (foundNode.options as Record<string, any>)[key] as CascadeNode
      return {
        label: key,
        value: key,
        code: childNode?.code,
        nodeValue: childNode?.value
      }
    })
    
    // 特殊处理：如果是 Diameter 字段，且已选择了 Type，则根据映射表过滤选项
    if (field === 'Diameter' && formData.value['Type']) {
      const typeValue = formData.value['Type']
      const allowedDiameters = TYPE_DIAMETER_MAP[typeValue]
      if (allowedDiameters && allowedDiameters.length > 0) {
        // 只保留映射表中允许的直径选项（元组格式：[code, value, enabled]），过滤掉 enabled: false 的项
        const allowedValues = allowedDiameters.filter(([code, value, enabled]) => enabled !== false).map(([code, value]) => value)
        options = options.filter(opt => allowedValues.includes(opt.value))
      }
    }
    
    // 特殊处理：如果是 Material 字段，需要同时考虑 type 和 diameter 的映射
    if (field === 'Material') {
      let allowedMaterials: string[] | null = null
      
      // 先根据类型过滤（优先级最高，如福轮只有柔性套胶）
      if (formData.value['Type']) {
        const typeValue = formData.value['Type']
        const typeMaterials = TYPE_MATERIAL_MAP[typeValue]
        if (typeMaterials && typeMaterials.length > 0) {
          // 从元组格式中提取 value，过滤掉 enabled: false 的项
          allowedMaterials = typeMaterials.filter(([code, value, enabled]) => enabled !== false).map(([code, value]) => value)
        }
      }
      
      // 再根据直径进一步过滤（取交集）
      if (formData.value['Diameter']) {
        const diameterValue = formData.value['Diameter']
        const diameterMaterials = DIAMETER_MATERIAL_MAP[diameterValue]
        if (diameterMaterials && diameterMaterials.length > 0) {
          // 从元组格式中提取 value，过滤掉 enabled: false 的项
          const diameterMaterialValues = diameterMaterials.filter(([code, value, enabled]) => enabled !== false).map(([code, value]) => value)
          if (allowedMaterials) {
            // 取交集
            allowedMaterials = allowedMaterials.filter(material => diameterMaterialValues.includes(material))
          } else {
            allowedMaterials = diameterMaterialValues
          }
        }
      }
      
      if (allowedMaterials && allowedMaterials.length > 0) {
        // 只保留映射表中允许的材质选项
        options = options.filter(opt => allowedMaterials!.includes(opt.value))
      }
    }
    
    // 特殊处理：如果是 Belt 字段，需要同时考虑 type、diameter 和 material 的映射
    if (field === 'Belt') {
      let allowedBelts: string[] | null = null
      
      // 先根据类型过滤（优先级最高，如福轮只有塑料楔带轮和圆带）
      if (formData.value['Type']) {
        const typeValue = formData.value['Type']
        const typeBelts = TYPE_BELT_MAP[typeValue]
        if (typeBelts && typeBelts.length > 0) {
          // 从元组格式中提取 value，过滤掉 enabled: false 的项
          allowedBelts = typeBelts.filter(([code, value, enabled]) => enabled !== false).map(([code, value]) => value)
        }
      }
      
      // 如果没有类型限制，再根据直径过滤
      if (!allowedBelts && formData.value['Diameter']) {
        const diameterValue = formData.value['Diameter']
        const diameterBelts = DIAMETER_BELT_MAP[diameterValue]
        if (diameterBelts && diameterBelts.length > 0) {
          // 从元组格式中提取 value，过滤掉 enabled: false 的项
          allowedBelts = diameterBelts.filter(([code, value, enabled]) => enabled !== false).map(([code, value]) => value)
        }
      }
      
      // 再根据材质进一步过滤（取交集）
      if (formData.value['Material']) {
        const materialValue = formData.value['Material']
        const materialBelts = MATERIAL_BELT_MAP[materialValue]
        if (materialBelts && materialBelts.length > 0) {
          // 从元组格式中提取 value，过滤掉 enabled: false 的项
          const materialBeltValues = materialBelts.filter(([code, value, enabled]) => enabled !== false).map(([code, value]) => value)
          if (allowedBelts) {
            // 取交集
            allowedBelts = allowedBelts.filter(belt => materialBeltValues.includes(belt))
          } else {
            allowedBelts = materialBeltValues
          }
        }
      }
      
      if (allowedBelts && allowedBelts.length > 0) {
        // 只保留映射表中允许的带型选项
        options = options.filter(opt => allowedBelts!.includes(opt.value))
      }
    }
    
    // 特殊处理：如果是 Shaft 字段，需要同时考虑 type 和 belt 的映射
    if (field === 'Shaft') {
      let allowedShafts: string[] | null = null
      
      // 先根据类型过滤（优先级最高，如麦轮只有内螺纹）
      if (formData.value['Type']) {
        const typeValue = formData.value['Type']
        const typeShafts = TYPE_SHAFT_MAP[typeValue]
        if (typeShafts && typeShafts.length > 0) {
          // 从元组格式中提取 value，过滤掉 enabled: false 的项
          allowedShafts = typeShafts.filter(([code, value, enabled]) => enabled !== false).map(([code, value]) => value)
        }
      }
      
      // 如果没有类型限制，再根据带型过滤
      if (!allowedShafts && formData.value['Belt']) {
        const beltValue = formData.value['Belt']
        const beltShafts = BELT_SHAFT_MAP[beltValue]
        if (beltShafts && beltShafts.length > 0) {
          // 从元组格式中提取 value，过滤掉 enabled: false 的项
          allowedShafts = beltShafts.filter(([code, value, enabled]) => enabled !== false).map(([code, value]) => value)
        }
      }
      
      if (allowedShafts && allowedShafts.length > 0) {
        // 只保留映射表中允许的轴型选项
        options = options.filter(opt => allowedShafts!.includes(opt.value))
      }
    }
    
    // 特殊处理：如果是 Load 字段，需要同时考虑 diameter 和 belt 的映射
    if (field === 'Load') {
      let allowedLoads: string[] | null = null
      
      // 先根据直径过滤（优先级最高）
      if (formData.value['Diameter']) {
        const diameterValue = formData.value['Diameter']
        const diameterLoads = DIAMETER_LOAD_MAP[diameterValue]
        if (diameterLoads && diameterLoads.length > 0) {
          // 从元组格式中提取 value，过滤掉 enabled: false 的项
          allowedLoads = diameterLoads.filter(([code, value, enabled]) => enabled !== false).map(([code, value]) => value)
        }
      }
      
      // 如果没有直径限制，再根据带型过滤
      if (!allowedLoads && formData.value['Belt']) {
        const beltValue = formData.value['Belt']
        const beltLoads = BELT_LOAD_MAP[beltValue]
        if (beltLoads && beltLoads.length > 0) {
          // 从元组格式中提取 value，过滤掉 enabled: false 的项
          allowedLoads = beltLoads.filter(([code, value, enabled]) => enabled !== false).map(([code, value]) => value)
        }
      }
      
      if (allowedLoads && allowedLoads.length > 0) {
        // 只保留映射表中允许的负载选项
        options = options.filter(opt => allowedLoads!.includes(opt.value))
      }
    }
    
    // 特殊处理：如果是 Speed 字段，且已选择了 load，则根据映射表过滤选项
    if (field === 'Speed' && formData.value['Load']) {
      const loadValue = formData.value['Load']
      const allowedSpeeds = LOAD_SPEED_MAP[loadValue]
      if (allowedSpeeds && allowedSpeeds.length > 0) {
        // 从元组格式中提取 value，只保留映射表中允许的转速选项，过滤掉 enabled: false 的项
        const allowedValues = allowedSpeeds.filter(([code, value, enabled]) => enabled !== false).map(([code, value]) => value)
        options = options.filter(opt => allowedValues.includes(opt.value))
      }
    }
    
    // 特殊处理：如果是 Length 字段，且已选择了 diameter，则根据映射表过滤选项
    if (field === 'Length' && formData.value['Diameter']) {
      const diameterValue = formData.value['Diameter']
      const allowedLengths = DIAMETER_LENGTH_MAP[diameterValue]
      if (allowedLengths && allowedLengths.length > 0) {
        // 只保留映射表中允许的长度选项
        options = options.filter(opt => allowedLengths.includes(opt.value))
      }
    }
    
    return { options, node: foundNode }
  }
  
  return { options: [], node: foundNode }
}

/**
 * 获取字段顺序（从配置中提取）
 */
const getFieldOrder = (config: CascadeNode): string[] => {
  const fields: string[] = []
  const traverse = (node: CascadeNode) => {
    if (!fields.includes(node.field)) {
      fields.push(node.field)
    }
    if (node.options && !Array.isArray(node.options)) {
      Object.values(node.options as Record<string, any>).forEach((child: any) => {
        traverse(child)
      })
    }
  }
  traverse(config)
  return fields
}

/**
 * 计算每一级的 Select 配置
 * 根据当前表单数据，动态计算每一级可用的选项
 */
const selectLevels = computed<SelectLevel[]>(() => {
  const fieldOrder = getFieldOrder(cascadeConfig)
  const levels: SelectLevel[] = []
  
  fieldOrder.forEach((field, index) => {
    // 检查前面的字段是否都已选择
    const previousFieldsSelected = fieldOrder.slice(0, index).every(f => formData.value[f])
    
    // 获取可用选项
    const { options, node } = getAvailableOptions(field, cascadeConfig)
    
    // 获取当前选中的值
    let selectedValue = formData.value[field] || ''
    
    // 特殊处理：长度字段允许手动输入，即使值不在选项中也要保留
    if (field === 'Length' && selectedValue) {
      // 长度字段的值直接保留，不检查是否在选项中
    } else {
      // 检查当前选中的值是否还在可用选项中
      if (selectedValue && !options.some(opt => opt.value === selectedValue)) {
        // 如果当前选中的值不在可用选项中，需要更新
        if (options.length === 1) {
          // 如果只有一个选项，自动选中
          selectedValue = options[0].value
          // 更新表单数据
          formData.value[field] = selectedValue
        } else {
          // 如果有多个选项，清空选择
          selectedValue = ''
          delete formData.value[field]
        }
      } else if (!selectedValue && options.length === 1 && previousFieldsSelected) {
        // 如果当前没有选中值，且只有一个选项，且前置字段都已选择，自动选中
        selectedValue = options[0].value
        formData.value[field] = selectedValue
      }
    }
    
    // 根据系统语言选择标签：中文时显示 label，英文时显示 field（首字母大写）
    const fieldConfig = FIELD_CONFIG[field as keyof typeof FIELD_CONFIG]
    const isChinese = locale.value === 'zh-CN' || locale.value.startsWith('zh')
    const displayLabel = isChinese 
      ? (fieldConfig?.label || field)
      : (fieldConfig?.field || field)
    
    levels.push({
      field,
      label: displayLabel,
      options,
      selectedValue,
      disabled: !previousFieldsSelected,
      node: node || undefined,
      width: fieldConfig?.width
    })
  })
  
  return levels
})

/**
 * 监听 formData 变化，自动更新后续字段
 * 当上一级字段更新后，检查下一级字段：
 * - 如果只有一个选项，自动选中
 * - 如果有多个选项，清空选择
 */
watch(() => formData.value, (newData, oldData) => {
  const fieldOrder = getFieldOrder(cascadeConfig)
  
  // 找出哪个字段发生了变化
  for (let i = 0; i < fieldOrder.length; i++) {
    const field = fieldOrder[i]
    const newValue = newData[field]
    const oldValue = oldData?.[field]
    
    // 如果字段值发生变化，检查后续字段
    if (newValue !== oldValue) {
      // 使用 nextTick 确保 selectLevels 已经更新
      nextTick(() => {
        const updatedLevels = selectLevels.value
        
        // 检查后续字段
        for (let j = i + 1; j < updatedLevels.length; j++) {
          const nextLevel = updatedLevels[j]
          if (!nextLevel || nextLevel.disabled) continue
          
          const currentValue = formData.value[nextLevel.field]
          const isCurrentValueValid = currentValue && nextLevel.options.some(opt => opt.value === currentValue)
          
          // 如果当前值无效或不存在
          if (!isCurrentValueValid) {
            if (nextLevel.options.length === 1) {
              // 如果只有一个选项，自动选中
              formData.value[nextLevel.field] = nextLevel.options[0].value
            } else if (nextLevel.options.length > 1) {
              // 如果有多个选项，清空选择
              delete formData.value[nextLevel.field]
            }
          } else if (!currentValue && nextLevel.options.length === 1) {
            // 如果当前没有选中值，且只有一个选项，自动选中
            formData.value[nextLevel.field] = nextLevel.options[0].value
          }
        }
      })
      break // 只处理第一个变化的字段
    }
  }
}, { deep: true })

/**
 * 根据当前选择路径，获取节点的 value 或 code
 * 用于生成产品型号
 */
const getNodeValue = (field: string, selectedValue: string, config: CascadeNode): string => {
  // 特殊处理：带型和轴型使用编码映射表
  if (field === 'Belt' && BELT_CODE_MAP[selectedValue]) {
    return BELT_CODE_MAP[selectedValue].value
  }
  if (field === 'Shaft' && SHAFT_CODE_MAP[selectedValue]) {
    return SHAFT_CODE_MAP[selectedValue].value
  }
  // 特殊处理：负载使用编码映射表
  if (field === 'Load' && LOAD_CODE_MAP[selectedValue]) {
    return LOAD_CODE_MAP[selectedValue].value
  }
  
  // 递归查找节点
  const findNode = (node: CascadeNode, path: Array<{ field: string, value: string }> = []): CascadeNode | null => {
    if (node.field === field) {
      const pathMatches = path.every(({ field, value }) => formData.value[field] === value)
      if (pathMatches) {
        // 如果当前节点匹配，检查其子节点中是否有选中的值
        if (node.options && !Array.isArray(node.options)) {
          const childNode = (node.options as Record<string, any>)[selectedValue] as CascadeNode
          if (childNode) {
            return childNode
          }
        }
        return node
      }
    }
    
    if (Array.isArray(node.options)) {
      return null
    }
    
    if (node.options && !Array.isArray(node.options)) {
      for (const [value, childNode] of Object.entries(node.options as Record<string, any>)) {
        const currentPathValue = formData.value[node.field]
        if (currentPathValue === value) {
          const found = findNode(childNode, [...path, { field: node.field, value }])
          if (found) {
            return found
          }
        }
      }
    }
    
    return null
  }
  
  const node = findNode(config)
  if (node) {
    // 优先使用 value，其次使用 code，最后使用选中的值
    if (node.value !== undefined) {
      return String(node.value)
    }
    if (node.code !== undefined) {
      return String(node.code)
    }
  }
  
  return selectedValue
}

/**
 * 计算产品型号
 * 根据配置中的 code 和 value 自动生成产品型号
 * 格式：R + Type.value + diameter.value + "-" + material.value + belt.value + shaft.value + load.value + speed.value + "-" + length
 */
const productCode = computed(() => {
  const parts: string[] = []
  
  // 添加前缀
  if (cascadeConfig.value) {
    parts.push(cascadeConfig.value)
  }
  
  // 根据字段顺序添加编码
  const fieldOrder = getFieldOrder(cascadeConfig)
  fieldOrder.forEach((field, index) => {
    const value = formData.value[field]
    if (value) {
      // 特殊处理：长度字段直接使用原始值，不使用编码
      if (field === 'Length') {
        // 在长度前添加分隔符
        parts.push('-')
        parts.push(value)
      } else {
        // 获取节点的 value 或 code
        const codeValue = getNodeValue(field, value, cascadeConfig)
        parts.push(codeValue)
        
        // 在 Diameter 和 Material 之间添加分隔符
        if (field === 'Diameter' && index < fieldOrder.length - 1) {
          parts.push('-')
        }
      }
    }
  })
  
  return parts.join('')
})

/**
 * 计算产品编号
 * 使用 RollerSelect.ts 中的 generateProductNumber 函数
 */
const productNumber = computed(() => {
  return generateProductNumber(formData.value)
})

/**
 * 计算钢管长度
 * 使用 RollerSelector.ts 中的 calculatePipeLength 函数
 */
const pipeLength = computed(() => {
  const { Type, Diameter, Belt, Length } = formData.value
  if (!Type || !Diameter || !Belt || !Length) {
    return null
  }
  return calculatePipeLength(Type, Diameter, Belt, Length)
})

/**
 * 计算速比
 * 使用 RollerSelector.ts 中的 calculateGearRatio 函数
 */
const gearRatio = computed(() => {
  const { Diameter, Speed, Load } = formData.value
  if (!Diameter || !Speed) {
    return null
  }
  return calculateGearRatio(Diameter, Speed, Load)
})

/**
 * 复制产品编号
 */
const handleCopyNumber = async () => {
  if (!productNumber.value) {
    Toast({ type: 'warning', message: '产品编号为空，无法复制' })
    return
  }

  try {
    await navigator.clipboard.writeText(productNumber.value)
    Toast({ type: 'success', message: '产品编号已复制到剪贴板' })
  } catch (error) {
    // 降级方案：使用传统方法
    const textArea = document.createElement('textarea')
    textArea.value = productNumber.value
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      Toast({ type: 'success', message: '产品编号已复制到剪贴板' })
    } catch (err) {
      Toast({ type: 'error', message: '复制失败，请手动复制' })
    }
    document.body.removeChild(textArea)
  }
}

/**
 * 处理级别选择
 * 当用户选择某一级时，更新表单数据并清空后续字段
 * 同时检查后续字段，如果只有一个选项则自动选中
 */
const handleLevelSelect = (levelIndex: number, value: string) => {
  const level = selectLevels.value[levelIndex]
  if (!level) return
  
  // 更新当前字段的值（确保是字符串）
  // 先更新当前字段
  formData.value[level.field] = value
  
  // 清空后续字段的值
  const fieldOrder = getFieldOrder(cascadeConfig)
  const currentFieldIndex = fieldOrder.indexOf(level.field)
  if (currentFieldIndex >= 0) {
    // 创建新对象，确保响应式更新
    const newFormData = { ...formData.value }
    for (let i = currentFieldIndex + 1; i < fieldOrder.length; i++) {
      delete newFormData[fieldOrder[i]]
    }
    formData.value = newFormData
  }
  
  // 清空所有自动打开标志
  autoOpenFlags.value = {}
  
  // 检查后续字段，如果只有一个选项则自动选中
  // 使用 nextTick 确保在响应式更新后执行
  setTimeout(() => {
    const updatedLevels = selectLevels.value
    for (let i = levelIndex + 1; i < updatedLevels.length; i++) {
      const nextLevel = updatedLevels[i]
      if (nextLevel && nextLevel.options.length === 1 && !nextLevel.disabled) {
        // 如果只有一个选项且未禁用，自动选中
        formData.value[nextLevel.field] = nextLevel.options[0].value
      } else if (nextLevel && nextLevel.options.length > 1 && !nextLevel.disabled) {
        // 如果有多个选项，确保清空（可能已经被清空了，但确保一下）
        if (formData.value[nextLevel.field]) {
          delete formData.value[nextLevel.field]
        }
        // 自动打开下一个 Select 的下拉菜单
        autoOpenFlags.value[i] = true
        // 立即触发响应式更新
        autoOpenFlags.value = { ...autoOpenFlags.value }
        break // 只打开第一个可用的 Select
      }
    }
  }, 0)
}

/**
 * 重置表单
 * 清空所有选择，将所有 Select 组件设置为未选择状态
 */
const handleReset = () => {
  // 清空所有表单数据，确保所有 Select 组件都重置为未选择状态
  const fieldOrder = getFieldOrder(cascadeConfig)
  fieldOrder.forEach(field => {
    if (formData.value[field]) {
      delete formData.value[field]
    }
  })
  // 确保 formData 是一个全新的空对象，触发响应式更新
  formData.value = {}
  Toast({ type: 'success', message: '表单已重置' })
}

/**
 * 复制产品型号
 */
const handleCopy = async () => {
  if (!productCode.value) {
    Toast({ type: 'warning', message: '产品型号为空，无法复制' })
    return
  }

  try {
    await navigator.clipboard.writeText(productCode.value)
    Toast({ type: 'success', message: '产品型号已复制到剪贴板' })
  } catch (error) {
    // 降级方案：使用传统方法
    const textArea = document.createElement('textarea')
    textArea.value = productCode.value
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      Toast({ type: 'success', message: '产品型号已复制到剪贴板' })
    } catch (err) {
      Toast({ type: 'error', message: '复制失败，请手动复制' })
    }
    document.body.removeChild(textArea)
  }
}
</script>

<template>
  <div :class="[
    'roller-select-container p-4 bg-base-200 rounded-lg box-border',
    layoutMode === 'vertical' ? 'w-[20%]' : 'w-full max-w-full'
  ]">
    <div class="flex flex-col gap-6 justify-center">
      <!-- 多级 Select 布局 -->
      <!-- 横向模式：多个 Select 横向排列在一行，label 在上 -->
      <div v-if="layoutMode === 'horizontal'" class="flex flex-nowrap gap-4 items-center w-full">
        <!-- 动态渲染每一级的 Select 或 Input -->
        <div
          v-for="(level, index) in selectLevels"
          :key="index"
          class="flex-1 min-w-0"
        >
          <Select
            :options="level.options"
            field-label="label"
            field-value="value"
            :placeholder="`请选择${level.label}`"
            :selected="getSelectedLabel(level.options, level.selectedValue, level.field)"
            :allow-input="level.field === 'Length'"
            :auto-open="autoOpenFlags[index] || false"
            :input-width="level.width"
            @select="(value: any) => {
              // 确保传递的是字符串值
              let actualValue: string
              if (typeof value === 'object' && value !== null) {
                // 如果是对象，优先使用 value 字段，其次使用 label
                actualValue = value.value !== undefined ? String(value.value) : (value.label !== undefined ? String(value.label) : String(value))
              } else {
                actualValue = String(value)
              }
              handleLevelSelect(index, actualValue)
            }"
            :disabled="level.disabled"
            size="md"
            :label="level.label"
            direction="column"
            label-width="w-auto"
          />
        </div>
      </div>

      <!-- 纵向模式：多个 Select 纵向排列，label 和 input 在一行 -->
      <div v-else class="flex flex-col gap-4">
        <!-- 动态渲染每一级的 Select 或 Input -->
        <div
          v-for="(level, index) in selectLevels"
          :key="index"
          class="w-full"
        >
          <Select
            :options="level.options"
            field-label="label"
            field-value="value"
            :placeholder="`请选择${level.label}`"
            :selected="getSelectedLabel(level.options, level.selectedValue, level.field)"
            :allow-input="level.field === 'Length'"
            :auto-open="autoOpenFlags[index] || false"
            :input-width="level.width"
            @select="(value: any) => {
              // 确保传递的是字符串值
              let actualValue: string
              if (typeof value === 'object' && value !== null) {
                // 如果是对象，优先使用 value 字段，其次使用 label
                actualValue = value.value !== undefined ? String(value.value) : (value.label !== undefined ? String(value.label) : String(value))
              } else {
                actualValue = String(value)
              }
              handleLevelSelect(index, actualValue)
            }"
            :disabled="level.disabled"
            size="md"
            :label="level.label"
            direction="row"
            label-width="w-24"
            full-width
          />
        </div>
      </div>

      <!-- 产品信息汇总显示 -->
      <div class="p-5 bg-base-200 rounded-lg border border-base-300 shadow-sm flex-shrink-0">
        <div :class="[
          'grid gap-6',
          layoutMode === 'vertical' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        ]">
          <!-- 产品型号 -->
          <div class="flex flex-col p-3 bg-base-100 rounded border border-base-300">
            <div class="text-xs text-base-content/60 mb-2 uppercase tracking-wide">产品型号</div>
            <div class="text-lg font-mono font-bold text-base-content break-all">{{ productCode || '--' }}</div>
          </div>

          <!-- 产品编号 -->
          <div class="flex flex-col p-3 bg-base-100 rounded border border-base-300">
            <div class="text-xs text-base-content/60 mb-2 uppercase tracking-wide">产品编号</div>
            <div class="text-lg font-mono font-bold text-base-content break-all">{{ productNumber || '--' }}</div>
          </div>

          <!-- 钢管长度 -->
          <div class="flex flex-col p-3 bg-base-100 rounded border border-base-300">
            <div class="text-xs text-base-content/60 mb-2 uppercase tracking-wide">钢管长度</div>
            <div class="text-lg font-mono font-bold text-base-content">{{ pipeLength !== null ? pipeLength.toFixed(1) + 'mm' : '--' }}</div>
          </div>

          <!-- 速比 -->
          <div class="flex flex-col p-3 bg-base-100 rounded border border-base-300">
            <div class="text-xs text-base-content/60 mb-2 uppercase tracking-wide">速比</div>
            <div class="text-lg font-mono font-bold text-base-content">{{ gearRatio !== null ? gearRatio : '--' }}</div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-center gap-3 flex-shrink-0">
        <btn @click="handleReset" size="md">重置</btn>
        <btn @click="handleCopy" color="primary" size="md" :disabled="!productCode">复制型号</btn>
        <btn @click="handleCopyNumber" color="primary" size="md" :disabled="!productNumber">复制编号</btn>
      </div>
    </div>
  </div>
</template>
