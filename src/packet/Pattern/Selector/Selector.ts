/**
 * 产品选型配置
 * 
 * 通过调整此文件中的参数实现不同产品的选型规则
 * 
 * 使用方法：
 * 1. 修改对应的选项数组（typeOptions, materialOptions 等）来更改可选值
 * 2. 修改 defaultProductCodeConfig 来更改产品型号的生成规则
 * 3. 在组件中通过 props 传入 productCodeConfig 来覆盖默认配置
 * 
 * 示例：修改产品型号前缀
 * ```ts
 * // 在组件中使用时
 * <Selector :product-code-config="{ prefix: 'PR' }" />
 * ```
 * 
 * 示例：修改选项
 * ```ts
 * // 在 config.ts 中
 * export const typeOptions: SelectOption[] = [
 *   { label: '新类型1', value: 'X' },
 *   { label: '新类型2', value: 'Y' }
 * ]
 * ```
 */

// 选项接口
export interface SelectOption {
  label: string
  value: string
}

// 表单数据类型定义
export interface ProductFormData {
  type1: string            // 类型1
  type2: string            // 类型2
  type3: string            // 类型3
  type4: string            // 类型4
  type5: string            // 类型5
  parameters: string | number  // 参数
}

// 类型选项 (F2)
export const typeOptions: SelectOption[] = [
  { label: '产品A', value: 'A' },
  { label: '产品B', value: 'B' },
  { label: '产品C', value: 'C' },
  { label: '产品D', value: 'D' },
  { label: '产品E', value: 'E' }
]

// 材质选项 (K2)
export const materialOptions: SelectOption[] = [
  { label: '材质A', value: 'A' },
  { label: '材质B', value: 'B' },
  { label: '材质C', value: 'C' },
  { label: '材质D', value: 'D' },
  { label: '材质E', value: 'E' }
]

// 功率选项 (I2)
export const powerOptions: SelectOption[] = [
  { label: '50', value: '1' },
  { label: '100', value: '2' },
  { label: '200', value: '3' },
  { label: '400', value: '4' },
  { label: '750', value: '5' },
  { label: '1000', value: '6' }
]

// 转速选项 (J2)
export const speedOptions: SelectOption[] = [
  { label: '10', value: '1' },
  { label: '20', value: '2' },
  { label: '30', value: '3' },
  { label: '40', value: '4' }
]

// 表单字段配置接口
export interface FormFieldConfig {
  key: keyof ProductFormData    // 字段键名
  label: string                  // 字段标签
  type: 'select' | 'input'       // 字段类型：下拉选择或输入框
  options?: SelectOption[]       // 选项列表（select类型需要）
  placeholder?: string           // 占位符
  inputType?: string             // 输入框类型（input类型需要，如 'number', 'text'）
}

// 表单字段配置数组
export const formFields: FormFieldConfig[] = [
  {
    key: 'type1',
    label: '类型1',
    type: 'select',
    options: typeOptions,
    placeholder: '请选择类型1'
  },
  {
    key: 'type2',
    label: '类型2',
    type: 'select',
    options: typeOptions,
    placeholder: '请选择类型2'
  },
  {
    key: 'type3',
    label: '类型3',
    type: 'select',
    options: materialOptions,
    placeholder: '请选择类型3'
  },
  {
    key: 'type4',
    label: '类型4',
    type: 'select',
    options: powerOptions,
    placeholder: '请选择类型4'
  },
  {
    key: 'type5',
    label: '类型5',
    type: 'select',
    options: speedOptions,
    placeholder: '请选择类型5'
  },
  {
    key: 'parameters',
    label: '参数',
    type: 'input',
    inputType: 'number',
    placeholder: '请输入参数'
  }
]

// 创建默认表单数据
export const createDefaultFormData = (): ProductFormData => ({
  type1: '',
  type2: '',
  type3: '',
  type4: '',
  type5: '',
  parameters: '',
})

// 产品型号计算规则配置
export interface ProductCodeConfig {
  prefix: string              // 产品型号前缀，默认为 'CR'
  typeDefault: string          // 类型默认值，默认为 '#'
  materialDefault: string      // 材质默认值，默认为 'P'
  separator: string            // 分隔符，默认为 '-'
  dimensionSeparator: string   // 尺寸分隔符，默认为 'x'
  emptyPatterns: string[]      // 空值模式，用于判断是否为空结果
}

// 默认产品型号配置
export const defaultProductCodeConfig: ProductCodeConfig = {
  prefix: 'X',
  typeDefault: '#',
  materialDefault: '#',
  separator: '-',
  dimensionSeparator: 'x',
  emptyPatterns: ['X#', 'X#-#', 'X#-#-#', 'X#-#-#-']
}

/**
 * 计算产品型号
 * 根据表单数据动态生成产品型号
 * 
 * @param formData 表单数据
 * @param config 产品型号配置（可选）
 * @returns 计算后的产品型号
 */
export const calculateProductCode = (
  formData: ProductFormData,
  config: Partial<ProductCodeConfig> = {}
): string => {
  const finalConfig = { ...defaultProductCodeConfig, ...config }
  const parts: string[] = [finalConfig.prefix]

  // 类型1编码
  const type1Code = formData.type1 || finalConfig.typeDefault
  parts.push(type1Code)

  // 类型2编码 - 添加分隔符
  const type2Code = formData.type2 || finalConfig.typeDefault
  parts.push(finalConfig.separator, type2Code)

  // 类型3编码 - 紧跟在类型2后面，无分隔符
  const type3Code = formData.type3 || finalConfig.materialDefault
  parts.push(type3Code)

  // 类型4编码 - 紧跟在类型3后面，无分隔符
  const type4Code = formData.type4 || ''
  if (type4Code) {
    parts.push(type4Code)
  }

  // 类型5编码 - 紧跟在类型4后面，无分隔符
  const type5Code = formData.type5 || ''
  if (type5Code) {
    parts.push(type5Code)
  }

  // 参数部分
  const parameters = formData.parameters !== '' && formData.parameters !== null && formData.parameters !== undefined 
    ? String(formData.parameters) 
    : ''
  
  // 如果参数有值，添加参数部分
  if (parameters) {
    parts.push(finalConfig.separator, parameters)
  }

  const result = parts.join('')
  
  // 如果结果匹配空值模式，返回空字符串提示用户填写
  const isEmpty = finalConfig.emptyPatterns.some(pattern => {
    if (result === pattern) return true
    if (pattern.endsWith('-') && result.startsWith(pattern) && !result.includes(finalConfig.dimensionSeparator)) return true
    return false
  })
  
  if (isEmpty) {
    return ''
  }

  return result
}

/**
 * 获取选中项的标签文本
 * 
 * @param options 选项列表
 * @param value 选中的值
 * @returns 对应的标签文本
 */
export const getSelectedLabel = (options: SelectOption[], value: string): string => {
  if (!value) return ''
  const option = options.find(opt => opt.value === value)
  return option?.label || ''
}

