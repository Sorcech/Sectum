/**
 * 滚轮产品选型配置
 * 
 * 通过调整此文件中的参数实现不同产品的选型规则
 */

// 选项接口
export interface SelectOption {
  label: string
  value: string
}

// 表单数据类型定义
export interface RollerFormData {
  type: string           // F2 - 驱动类型
  diameter: string       // G2 - 直径规格
  material: string       // H2 - 材质
  belt: string          // I2 - 带型
  shaft: string         // M2 - 轴型
  power: string | number // J2 - 功率
  speed: string | number // K2 - 转速
  dimension: string | number // L2 - 尺寸
}

// 选项数组
export const typeOptions: SelectOption[] = [
  { label: '电动无刷减速', value: '电动无刷减速' },
  { label: '电驱无刷减速', value: '电驱无刷减速' },
  { label: '电动伺服减速', value: '电动伺服减速' },
  { label: '电驱伺服减速', value: '电驱伺服减速' },
  { label: '电动无刷直驱', value: '电动无刷直驱' },
  { label: '电驱无刷直驱', value: '电驱无刷直驱' },
  { label: '电动伺服直驱', value: '电动伺服直驱' },
  { label: '电驱伺服直驱', value: '电驱伺服直驱' },
  { label: '从动', value: '从动' },
  { label: '阻尼', value: '阻尼' },
  { label: '福轮', value: '福轮' },
  { label: '麦轮', value: '麦轮' }
]

export const diameterOptions: SelectOption[] = [
  { label: '50x1.5', value: '50x1.5' },
  { label: '80x3.0', value: '80x3.0' },
  { label: '80x6.0', value: '80x6.0' },
  { label: '76x3.0', value: '76x3.0' },
  { label: '60x2.0', value: '60x2.0' },
  { label: '100x6.0', value: '100x6.0' },
  { label: '120x6.0', value: '120x6.0' },
  { label: '54', value: '54' }
]

export const materialOptions: SelectOption[] = [
  { label: 'ZAM钢管', value: 'ZAM钢管' },
  { label: '柔性套胶', value: '柔性套胶' },
  { label: '不锈钢304', value: '不锈钢304' },
  { label: '套塑胶锥套', value: '套塑胶锥套' },
  { label: '橡胶胶圈', value: '橡胶胶圈' },
  { label: '套塑料胶圈', value: '套塑料胶圈' },
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' }
]

export const beltOptions: SelectOption[] = [
  { label: '平带', value: '平带' },
  { label: '圆带', value: '圆带' },
  { label: '塑料楔带轮', value: '塑料楔带轮' },
  { label: '金属楔带轮', value: '金属楔带轮' },
  { label: '齿带', value: '齿带' },
  { label: '单链', value: '单链' },
  { label: '双排链', value: '双排链' },
  { label: '双链', value: '双链' },
  { label: '角带', value: '角带' },
  { label: '鼓形', value: '鼓形' }
]

export const shaftOptions: SelectOption[] = [
  { label: '六角轴梭', value: '六角轴梭' },
  { label: '内螺纹', value: '内螺纹' },
  { label: '外螺纹', value: '外螺纹' },
  { label: '六角光轴', value: '六角光轴' },
  { label: '内螺纹+六角轴', value: '内螺纹+六角轴' },
  { label: '内螺纹+键轴', value: '内螺纹+键轴' },
  { label: '外螺纹+键轴', value: '外螺纹+键轴' },
  { label: '键轴', value: '键轴' },
  { label: '方轴', value: '方轴' }
]

export const powerOptions: SelectOption[] = [
  { label: '10', value: '10' },
  { label: '30', value: '30' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
  { label: '250', value: '250' },
  { label: '500', value: '500' },
  { label: '750', value: '750' },
  { label: '1000', value: '1000' },
  { label: '1250', value: '1250' },
  { label: '1500', value: '1500' }
]

export const speedOptions: SelectOption[] = [
  { label: '12', value: '12' },
  { label: '15', value: '15' },
  { label: '18', value: '18' },
  { label: '45', value: '45' },
  { label: '60', value: '60' },
  { label: '75', value: '75' },
  { label: '90', value: '90' }
]

// 编码映射表
const TYPE_CODE_MAP: Record<string, { model: string; id: string }> = {
  '电动无刷减速': { model: 'A', id: '0' },
  '电驱无刷减速': { model: 'B', id: '1' },
  '电动伺服减速': { model: 'C', id: '2' },
  '电驱伺服减速': { model: 'D', id: '3' },
  '电动无刷直驱': { model: 'E', id: '4' },
  '电驱无刷直驱': { model: 'F', id: '4' },
  '电动伺服直驱': { model: 'G', id: '5' },
  '电驱伺服直驱': { model: 'H', id: '5' },
  '从动': { model: 'S', id: '7' },
  '阻尼': { model: 'Z', id: '8' },
  '福轮': { model: 'U', id: '6' },
  '麦轮': { model: 'M', id: '6' }
}

const DIAMETER_CODE_MAP: Record<string, string> = {
  '50x1.5': '50',
  '80x3.0': '80',
  '80x6.0': '80',
  '76x3.0': '76',
  '60x2.0': '60',
  '100x6.0': '100',
  '120x6.0': '120',
  '54': '54'
}

const MATERIAL_CODE_MAP: Record<string, string> = {
  'ZAM钢管': 'Z',
  '柔性套胶': 'P',
  '不锈钢304': 'S',
  '套塑胶锥套': 'C',
  '橡胶胶圈': 'R',
  '套塑料胶圈': 'B',
  'A': 'A',
  'B': 'B'
}

const BELT_CODE_MAP: Record<string, string> = {
  '平带': 'F',
  '圆带': 'R',
  '塑料楔带轮': 'W',
  '金属楔带轮': 'M',
  '齿带': 'T',
  '单链': 'S',
  '双排链': 'C',
  '双链': 'D',
  '角带': 'V',
  '鼓形': 'G'
}

const SHAFT_CODE_MAP: Record<string, string> = {
  '六角轴梭': 'S',
  '内螺纹': 'T',
  '外螺纹': 'E',
  '六角光轴': 'H',
  '内螺纹+六角轴': 'H',
  '内螺纹+键轴': 'K',
  '外螺纹+键轴': 'K',
  '键轴': 'K',
  '方轴': 'A'
}

const POWER_CODE_MAP: Record<number, string> = {
  10: '0', 30: '1', 50: '2', 100: '3', 250: '4',
  500: '5', 750: '6', 1000: '7', 1250: '8', 1500: '9'
}

const SPEED_CODE_MAP: Record<number, string> = {
  12: '1', 15: '2', 18: '3', 45: '4', 60: '6', 75: '7', 90: '9'
}

// 工具函数
export const createDefaultFormData = (): RollerFormData => ({
  type: '', diameter: '', material: '', belt: '', shaft: '', power: '', speed: '', dimension: ''
})

export const getSelectedLabel = (options: SelectOption[], value: string): string => {
  return options.find(opt => opt.value === value)?.label || ''
}

const parseNumber = (val: string | number): number => {
  return typeof val === 'number' ? val : parseFloat(String(val))
}

// Model 编码函数
const getTypeCode = (type: string, forId = false): string => {
  const code = TYPE_CODE_MAP[type]
  return code ? (forId ? code.id : code.model) : '#'
}

const getDiameterCode = (diameter: string): string => {
  return DIAMETER_CODE_MAP[diameter] || '#'
}

const getMaterialCode = (material: string): string => {
  if (!material || material === 'A' || material === 'B') return material
  return MATERIAL_CODE_MAP[material] || '#'
}

const getBeltCode = (belt: string): string => {
  return BELT_CODE_MAP[belt] || '#'
}

const getShaftCode = (shaft: string): string => {
  return SHAFT_CODE_MAP[shaft] || '#'
}

const getPowerCode = (power: string | number): string => {
  const val = parseNumber(power)
  return isNaN(val) ? '#' : (POWER_CODE_MAP[val] || '#')
}

const getSpeedCode = (speed: string | number): string => {
  const val = parseNumber(speed)
  return isNaN(val) ? '#' : (SPEED_CODE_MAP[val] || '#')
}

// ID 编码函数
const getTypeIdCode = (type: string): string => getTypeCode(type, true)

const getDiameterMaterialIdCode = (diameter: string, material: string, type: string): string => {
  if (diameter === '50x1.5') {
    const isElectricDrive = type === '电驱无刷直驱' || type === '电驱伺服直驱'
    const materialMap: Record<string, { electric: string; normal: string }> = {
      'ZAM钢管': { electric: '4', normal: '0' },
      '': { electric: '4', normal: '0' },
      'A': { electric: '4', normal: '0' },
      'B': { electric: '4', normal: '0' },
      '不锈钢304': { electric: '5', normal: '1' },
      '柔性套胶': { electric: '6', normal: '2' },
      '套塑胶锥套': { electric: '7', normal: '3' },
      '橡胶胶圈': { electric: '7', normal: '3' }
    }
    const code = materialMap[material]
    return code ? (isElectricDrive ? code.electric : code.normal) : 'x'
  }
  const map: Record<string, string> = {
    '60x2.0': '4', '76x3.0': '5', '80x3.0': '6',
    '80x6.0': '7', '100x6.0': '7', '120x6.0': '7', '54': '0'
  }
  return map[diameter] || 'x'
}

const getBeltIdCode = (belt: string, diameter: string, material: string, type: string): string => {
  if (diameter === '50x1.5') {
    const map: Record<string, string> = {
      '塑料楔带轮': '0', '圆带': '1', '齿带': '2',
      '平带': (material === '套塑胶锥套' || type === '阻尼') ? '2' : '3',
      '金属楔带轮': material === '' ? '0' : '4'
    }
    return map[belt] || 'x'
  }
  if (belt === '单链') return material === 'ZAM钢管' ? '0' : '3'
  if (belt === '双链') return material === 'ZAM钢管' ? '1' : '4'
  if (belt === '双排链') return material === 'ZAM钢管' ? '2' : '5'
  if (diameter === '80x6.0') return belt === '鼓形' ? '0' : '1'
  if (diameter === '100x6.0') return type === '从动' ? '2' : '1'
  if (diameter === '120x6.0') return type === '从动' ? '3' : '2'
  if (diameter === '54') {
    if (material === 'A') return '2'
    if (material === 'B') return '3'
    return 'x'
  }
  return 'x'
}

const getDimensionAdjustment = (shaft: string, belt: string, power: string | number, type: string): number => {
  const powerVal = parseNumber(power)
  if (shaft === '六角轴梭' || (belt === '双排链' && (powerVal === 1000 || type === '从动'))) return 0
  if (shaft === '六角光轴' || (belt === '双排链' && powerVal === 1250) || shaft === '内螺纹+六角轴' || (shaft === '键轴' && belt === '鼓形')) return 20
  if (shaft === '内螺纹' || (belt === '双排链' && powerVal === 1500)) {
    return (belt === '单链' || belt === '双链' || type === '麦轮') ? 0 : 40
  }
  if (shaft === '内螺纹+键轴') return 40
  return 0
}

// 产品型号配置
export interface RollerCodeConfig {
  prefix: string
  typeDefault: string
  diameterDefault: string
  materialDefault: string
  beltDefault: string
  shaftDefault: string
  powerDefault: string
  speedDefault: string
  separator: string
  emptyPatterns: string[]
}

export const defaultRollerCodeConfig: RollerCodeConfig = {
  prefix: 'R',
  typeDefault: '#',
  diameterDefault: '#',
  materialDefault: '#',
  beltDefault: '#',
  shaftDefault: '#',
  powerDefault: '#',
  speedDefault: '#',
  separator: '-',
  emptyPatterns: ['R#', 'R##', 'R###', 'R####']
}

// 计算产品型号
export const calculateRollerCode = (
  formData: RollerFormData,
  config: Partial<RollerCodeConfig> = {}
): string => {
  const cfg = { ...defaultRollerCodeConfig, ...config }
  const parts = [cfg.prefix]
  
  parts.push(formData.type ? getTypeCode(formData.type) : cfg.typeDefault)
  parts.push(formData.diameter ? getDiameterCode(formData.diameter) : cfg.diameterDefault)
  parts.push(cfg.separator)
  parts.push(formData.material ? getMaterialCode(formData.material) : cfg.materialDefault)
  parts.push(formData.belt ? getBeltCode(formData.belt) : cfg.beltDefault)
  parts.push(formData.shaft ? getShaftCode(formData.shaft) : cfg.shaftDefault)
  parts.push(formData.power ? getPowerCode(formData.power) : cfg.powerDefault)
  parts.push(formData.speed ? getSpeedCode(formData.speed) : cfg.speedDefault)
  
  const dimension = formData.dimension !== '' && formData.dimension != null && formData.dimension !== undefined
    ? String(formData.dimension) : ''
  if (dimension) parts.push(cfg.separator, dimension)
  
  const result = parts.join('')
  const isEmpty = cfg.emptyPatterns.some(p => result === p || (p.endsWith('-') && result.startsWith(p) && !result.includes(cfg.separator)))
  return isEmpty ? '' : result
}

// 计算滚轮ID号
export const calculateRollerId = (formData: RollerFormData): string => {
  const typeCode = getTypeIdCode(formData.type)
  if (typeCode === '#') return ''
  
  const diameterMaterialCode = getDiameterMaterialIdCode(formData.diameter, formData.material, formData.type)
  if (diameterMaterialCode === 'x') return ''
  
  const beltCode = getBeltIdCode(formData.belt, formData.diameter, formData.material, formData.type)
  if (beltCode === 'x') return ''
  
  const dimension = parseNumber(formData.dimension)
  if (isNaN(dimension) || dimension <= 0) return ''
  
  const adjustment = getDimensionAdjustment(formData.shaft, formData.belt, formData.power, formData.type)
  const dimensionPart = Math.floor(dimension / 100) + adjustment
  const dimensionCode = dimensionPart < 10 ? `0${dimensionPart}` : String(dimensionPart)
  const remainder = dimension % 100
  const remainderCode = remainder < 10 ? `0${remainder}` : String(remainder)
  
  return `300${typeCode}${diameterMaterialCode}${beltCode}${dimensionCode}${remainderCode}`
}
