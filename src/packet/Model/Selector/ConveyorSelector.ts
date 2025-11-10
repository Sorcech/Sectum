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
  type: string      // F2 - 类型
  material: string  // K2 - 材质
  belt: string      // L2 - 带型
  power: string     // I2 - 功率
  speed: string     // J2 - 转速
  dimensionP: string | number  // P2 - 尺寸P
  dimensionQ: string | number  // Q2 - 尺寸Q
  dimensionS: string | number  // S2 - 尺寸S
}

// 类型选项 (F2)
export const typeOptions: SelectOption[] = [
  { label: '直线', value: 'L' },
  { label: '斜口', value: 'M' },
  { label: '转弯', value: 'C' },
  { label: '翻转', value: 'F' },
  { label: '归边', value: 'A' }
]

// 材质选项 (K2)
export const materialOptions: SelectOption[] = [
  { label: '钢制镀锌', value: 'Z' },
  { label: '不锈钢304', value: 'S' },
  { label: '其他', value: 'P' }
]

// 带型选项 (L2)
export const beltOptions: SelectOption[] = [
  { label: '圆带', value: 'R' },
  { label: '塑料楔带', value: 'W' },
  { label: '平带', value: 'F' },
  { label: '金属楔带', value: 'M' },
  { label: '链条', value: 'C' }
]

// 功率选项 (I2)
export const powerOptions: SelectOption[] = [
  { label: '50', value: '2' },
  { label: '100', value: '3' },
  { label: '250', value: '4' },
  { label: '500', value: '5' },
  { label: '750', value: '6' },
  { label: '1000', value: '7' },
  { label: '1250', value: '8' },
  { label: '其他', value: '9' }
]

// 转速选项 (J2)
export const speedOptions: SelectOption[] = [
  { label: '60', value: '6' },
  { label: '12', value: '1' },
  { label: '18', value: '3' },
  { label: '15', value: '2' }
]

// 创建默认表单数据
export const createDefaultFormData = (): ProductFormData => ({
  type: '',
  material: '',
  belt: '',
  power: '',
  speed: '',
  dimensionP: '',
  dimensionQ: '',
  dimensionS: ''
})

// 产品型号计算规则配置
export interface ProductCodeConfig {
  prefix: string              // 产品型号前缀，默认为 'CR'
  typeDefault: string          // 类型默认值，默认为 '#'
  materialDefault: string      // 材质默认值，默认为 'P'
  beltDefault: string         // 带型默认值，默认为 '#'
  separator: string            // 分隔符，默认为 '-'
  dimensionSeparator: string   // 尺寸分隔符，默认为 'x'
  emptyPatterns: string[]      // 空值模式，用于判断是否为空结果
}

// 默认产品型号配置
export const defaultProductCodeConfig: ProductCodeConfig = {
  prefix: 'CR',
  typeDefault: '#',
  materialDefault: 'P',
  beltDefault: '#',
  separator: '-',
  dimensionSeparator: 'x',
  emptyPatterns: ['CR#', 'CR#-P#', 'CR#-P#-']
}

/**
 * 计算产品型号
 * 根据Excel公式："CR"&类型&"-"&材质&带型&功率&转速&"-"&P2&"x"&Q2&"x"&S2
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

  // 类型编码 (F2)
  const typeCode = formData.type || finalConfig.typeDefault
  parts.push(typeCode)

  // 分隔符和材质编码 (K2)
  const materialCode = formData.material || finalConfig.materialDefault
  parts.push(finalConfig.separator, materialCode)

  // 带型编码 (L2) - 紧跟在材质后面，无分隔符
  const beltCode = formData.belt || finalConfig.beltDefault
  parts.push(beltCode)

  // 功率编码 (I2) - 紧跟在带型后面，无分隔符
  const powerCode = formData.power || ''
  if (powerCode) {
    parts.push(powerCode)
  }

  // 转速编码 (J2) - 紧跟在功率后面，无分隔符
  const speedCode = formData.speed || ''
  if (speedCode) {
    parts.push(speedCode)
  }

  // 尺寸部分 (P2, Q2, S2)
  const dimensionP = formData.dimensionP !== '' && formData.dimensionP !== null && formData.dimensionP !== undefined 
    ? String(formData.dimensionP) 
    : ''
  const dimensionQ = formData.dimensionQ !== '' && formData.dimensionQ !== null && formData.dimensionQ !== undefined 
    ? String(formData.dimensionQ) 
    : ''
  const dimensionS = formData.dimensionS !== '' && formData.dimensionS !== null && formData.dimensionS !== undefined 
    ? String(formData.dimensionS) 
    : ''

  // 只要有一个尺寸值，就添加尺寸部分
  if (dimensionP || dimensionQ || dimensionS) {
    parts.push(finalConfig.separator, [dimensionP || '', dimensionQ || '', dimensionS || ''].join(finalConfig.dimensionSeparator))
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

