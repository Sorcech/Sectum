/**
 * 滚轮选型配置 - 优化版本（集成所有特殊规则）
 * 
 * 基于原配置分析，提取所有级联规则和特殊配置
 */

// ==================== 文档注释 ====================

//产品编号生成公式：
// A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|
//Id|Code|Ver|Name|Model|Type|Size|Material|Driven|Weight|Speed|Length|Install|Mandrel|Voltage|PipeLength
//="300"
//第四位数字—— &IF(F2="电动无刷减速","0",IF(F2="电驱无刷减速","1",IF(F2="电动伺服减速","2",IF(F2="电驱伺服减速","3",IF(OR(F2="电动无刷直驱",F2="电驱无刷直驱"),"4",IF(OR(F2="电动伺服直驱",F2="电驱伺服直驱"),"5",IF(OR(F2="福轮",F2="麦轮"),"6",IF(F2="从动","7",IF(F2="阻尼","8","#")))))))))
//第五位数字—— &IF(G2="50x1.5",IF(OR(H2="ZAM钢管",H2="",H2="A",H2="B"),IF(OR(F2="电驱无刷直驱",F2="电驱伺服直驱"),"4","0"),IF(H2="不锈钢304",IF(OR(F2="电驱无刷直驱",F2="电驱伺服直驱"),"5","1"),IF(H2="柔性套胶",IF(OR(F2="电驱无刷直驱",F2="电驱伺服直驱"),"6","2"),IF(OR(H2="套塑胶锥套",H2="橡胶胶圈"),IF(OR(F2="电驱无刷直驱",F2="电驱伺服直驱"),"7","3"),"x")))),IF(G2="60x2.0","4",IF(G2="76x3.0","5",IF(G2="80x3.0","6",IF(OR(G2="80x6.0",G2="100x6.0",G2="120x6.0"),"7",IF(G2=54,"0","x"))))))
// &IF(G2="50x1.5",IF(I2="塑料楔带轮","0",IF(I2="圆带","1",IF(I2="齿带","2",IF(I2="平带",IF(OR(H2="套塑胶锥套",F2="阻尼"),"2","3"),IF(I2="金属楔带轮",IF(H2="","0","4"),"x"))))),IF(I2="单链",IF(H2="ZAM钢管","0","3"),IF(I2="双链",IF(H2="ZAM钢管","1","4"),IF(I2="双排链",IF(H2="ZAM钢管","2","5"),IF(G2="80x6.0",IF(I2="鼓形","0","1"),IF(G2="100x6.0",IF(F2="从动","2","1"),IF(G2="120x6.0",IF(F2="从动","3","2"),IF(G2=54,IF(H2="A","2",IF(H2="B","3","x")),"x"))))))))
// &IF(INT(L2/100)+IF(OR(M2="六角轴梭",AND(I2="双排链",OR(J2=1000,F2="从动"))),0,IF(OR(M2="六角光轴",AND(I2="双排链",J2=1250),M2="内螺纹+六角轴",AND(M2="键轴",I2="鼓形")),20,IF(OR(M2="内螺纹",AND(I2="双排链",J2=1500)),IF(OR(I2="单链",I2="双链",F2="麦轮"),0,40),IF(M2="内螺纹+键轴",40,0))))<10,"0"
// &INT(L2/100)+IF(OR(M2="六角轴梭",AND(I2="双排链",OR(J2=1000,F2="从动"))),0,IF(OR(M2="六角光轴",AND(I2="双排链",J2=1250),M2="内螺纹+六角轴",AND(M2="键轴",I2="鼓形")),20,IF(OR(M2="内螺纹",AND(I2="双排链",J2=1500)),IF(OR(I2="单链",I2="双链",F2="麦轮"),0,40),IF(M2="内螺纹+键轴",40,0)))),INT(L2/100)+IF(OR(M2="六角轴梭",AND(I2="双排链",OR(J2=1000,F2="从动"))),0,IF(OR(M2="六角光轴",AND(I2="双排链",J2=1250),M2="内螺纹+六角轴",AND(M2="键轴",I2="鼓形")),20,IF(OR(M2="内螺纹",AND(I2="双排链",J2=1500)),IF(OR(I2="单链",I2="双链",F2="麦轮"),0,40),IF(M2="内螺纹+键轴",40,0)))))
// &MOD(L2,100)

//产品型号生成公式
//="R"
// &IF(F2="电动无刷减速","A",IF(F2="电驱无刷减速","B",IF(F2="电动伺服减速","C",IF(F2="电驱伺服减速","D",IF(F2="电动无刷直驱","E",IF(F2="电驱无刷直驱","F",IF(F2="电动伺服直驱","G",IF(F2="电驱伺服直驱","H",IF(F2="从动","S",IF(F2="阻尼","Z",IF(F2="福轮","U",IF(F2="麦轮","M","#"))))))))))))
// &IF(G2="50x1.5",50,IF(OR(G2="80x3.0",G2="80x6.0"),80,IF(G2="76x3.0",76,IF(G2="60x2.0",60,IF(G2="100x6.0",100,IF(G2="120x6.0",120,IF(G2=54,54,"#")))))))
// &"-"
// &IF(H2="ZAM钢管","Z",IF(H2="柔性套胶","P",IF(H2="不锈钢304","S",IF(H2="套塑胶锥套","C",IF(H2="橡胶胶圈","R",IF(H2="套塑料胶圈","B",IF(OR(H2="",H2="A",H2="B"),H2,"#")))))))
// &IF(I2="平带","F",IF(I2="圆带","R",IF(I2="塑料楔带轮","W",IF(I2="金属楔带轮","M",IF(I2="齿带","T",IF(I2="单链","S",IF(I2="双排链","C",IF(I2="双链","D",IF(I2="角带","V",IF(I2="鼓形","G","#"))))))))))&IF(M2="六角轴梭","S",IF(M2="内螺纹","T",IF(M2="外螺纹","E",IF(M2="键轴","K",IF(M2="方轴","A","#")))))
// &IF(J2=10,0,IF(J2=30,1,IF(J2=50,2,IF(J2=100,3,IF(J2=250,4,IF(J2=500,5,IF(J2=750,6,IF(J2=1000,7,IF(J2=1250,8,IF(J2=1500,9,"#"))))))))))
// &IF(K2=12,1,IF(K2=15,2,IF(K2=18,3,IF(K2=45,4,IF(K2=60,6,IF(K2=75,7,IF(K2=90,9,"#")))))))
// &"-"&L2

// ==================== 类型定义 ====================

interface ProductRow {
  Type: string
  Diameter: string
  Material: string
  Belt: string
  Shaft: string
  Load: string
  Speed: string
  Length: string
  ProductModel: string
  ProductNumber: string
  GearRatio?: number // 速比
  PipeLength?: number | null // 钢管长度
}

// ==================== 字段配置 ====================

export const FIELD_CONFIG = {
  Type: { field: 'Type', label: '类型', componentType: 'Select', width: 'w-36' },
  Diameter: { field: 'Diameter', label: '直径', componentType: 'Select', width: 'w-36' },
  Material: { field: 'Material', label: '材质', componentType: 'Select', width: 'w-36' },
  Belt: { field: 'Belt', label: '带型', componentType: 'Select', width: 'w-36' },
  Shaft: { field: 'Shaft', label: '轴型', componentType: 'Select', width: 'w-36' },
  Load: { field: 'Load', label: '负载', componentType: 'Select', width: 'w-36' },
  Speed: { field: 'Speed', label: '转速', componentType: 'Select', width: 'w-36' },
  Length: { field: 'Length', label: '长度', componentType: 'Select', width: 'w-36' }
} as const

// ==================== 基础编码映射 ====================

// 类型编码映射
export const TYPE_CODE_MAP: Record<string, { code: number, value: string, enabled: boolean }> = {
  '电动无刷减速': { code: 0, value: 'A', enabled: true  },
  '电驱无刷减速': { code: 1, value: 'B' , enabled: true },
  '电动伺服减速': { code: 2, value: 'C' , enabled: true },
  '电驱伺服减速': { code: 3, value: 'D' , enabled: true },
  '电动无刷直驱': { code: 4, value: 'E' , enabled: true },
  '电驱无刷直驱': { code: 4, value: 'F' , enabled: true },
  '电动伺服直驱': { code: 5, value: 'G' , enabled: true },
  '电驱伺服直驱': { code: 5, value: 'H' , enabled: true },
  '福轮': { code: 6, value: 'U' , enabled: true },
  '麦轮': { code: 6, value: 'M' , enabled: true },
  '从动': { code: 7, value: 'S' , enabled: true },
  '阻尼': { code: 8, value: 'Z' , enabled: true },
}

// 直径编码映射（code 用于产品编号生成，value 用于产品型号生成，enabled 用于判断该参数是否可用）
export const DIAMETER_CODE_MAP: Record<string, { code: number, value: string, enabled: boolean }> = {
  '50x1.5': { code: 0, value: '50', enabled: true },
  '60x2.0': { code: 4, value: '60', enabled: true },
  '76x3.0': { code: 5, value: '76', enabled: true },
  '80x3.0': { code: 6, value: '80', enabled: true },
  '80x6.0': { code: 7, value: '80', enabled: true },
  '100x6.0': { code: 7, value: '100', enabled: true },
  '120x6.0': { code: 7, value: '120', enabled: false },
}

// 材质编码映射（code 用于产品编号生成，value 用于产品型号生成，enabled 用于判断该参数是否可用）
export const MATERIAL_CODE_MAP: Record<string, { code: number, value: string, enabled: boolean }> = {
  'ZAM钢管': { code: 0, value: 'Z', enabled: true },
  '不锈钢304': { code: 1, value: 'S', enabled: true },
  '柔性套胶': { code: 2, value: 'P', enabled: true },
  '套塑胶锥套': { code: 3, value: 'C', enabled: true },
  '橡胶胶圈': { code: 3, value: 'R', enabled: true },
  'A方向': { code: 0, value: 'A', enabled: true },
  'B方向': { code: 0, value: 'B', enabled: true },
}

// 带型编码映射（code 用于产品编号生成，value 用于产品型号生成，enabled 用于判断该参数是否可用）
export const BELT_CODE_MAP: Record<string, { code: number, value: string, enabled: boolean }> = {
  '塑料楔带轮': { code: 0, value: 'W', enabled: true },
  '圆带': { code: 1, value: 'R', enabled: true },
  '齿带': { code: 2, value: 'T', enabled: true },
  '平带': { code: 3, value: 'F', enabled: true },
  '金属楔带轮': { code: 4, value: 'M', enabled: true },
  '单链': { code: 0, value: 'S', enabled: true },
  '双链': { code: 1, value: 'D', enabled: true },
  '双排链': { code: 2, value: 'C', enabled: true },
  '角带': { code: 0, value: 'V', enabled: true },
  '鼓形': { code: 0, value: 'G', enabled: true },
}

// 轴型编码映射（code 用于产品编号生成，value 用于产品型号生成，enabled 用于判断该参数是否可用）
export const SHAFT_CODE_MAP: Record<string, { code: number, value: string, enabled: boolean }> = {
  '六角轴梭': { code: 0, value: 'S', enabled: true },
  '内螺纹': { code: 1, value: 'T', enabled: true },
  '外螺纹': { code: 2, value: 'E', enabled: true },
  '键轴': { code: 3, value: 'K', enabled: true },
  '方轴': { code: 4, value: 'A', enabled: true },
}

// 转速编码映射（code 用于产品编号生成，value 用于产品型号生成，enabled 用于判断该参数是否可用）
export const SPEED_CODE_MAP: Record<string, { code: number, value: string, enabled: boolean }> = {
  '12': { code: 0, value: '0', enabled: true },
  '15': { code: 1, value: '1', enabled: true },
  '18': { code: 2, value: '2', enabled: true },
  '30': { code: 3, value: '3', enabled: true },
  '45': { code: 4, value: '4', enabled: true },
  '60': { code: 5, value: '5', enabled: true },
  '75': { code: 6, value: '6', enabled: true },
  '90': { code: 7, value: '7', enabled: true },
}

// 负载编码映射（code 用于产品编号生成，value 用于产品型号生成，enabled 用于判断该参数是否可用）
// 根据产品编号生成公式：10->0, 30->1, 50->2, 100->3, 250->4, 500->5, 750->6, 1000->7, 1250->8, 1500->9
export const LOAD_CODE_MAP: Record<string, { code: number, value: string, enabled: boolean }> = {
  '10': { code: 0, value: '0', enabled: true },
  '30': { code: 1, value: '1', enabled: true },
  '50': { code: 2, value: '2', enabled: true },
  '100': { code: 3, value: '3', enabled: true },
  '250': { code: 4, value: '4', enabled: true },
  '500': { code: 5, value: '5', enabled: true },
  '750': { code: 6, value: '6', enabled: true },
  '1000': { code: 7, value: '7', enabled: true },
  '1250': { code: 8, value: '8', enabled: true },
  '1500': { code: 9, value: '9', enabled: true },
}

// 长度选项映射（enabled 用于判断该参数是否可用）
export const LENGTH_OPTIONS: Record<string, { enabled: boolean }> = {
  '450': { enabled: true },
  '550': { enabled: true },
  '650': { enabled: true },
  '750': { enabled: true },
  '850': { enabled: true },
  '950': { enabled: true },
  '1050': { enabled: true },
  '1150': { enabled: true },
  '1250': { enabled: true },
  '1350': { enabled: true },
  '1450': { enabled: true },
}

// ==================== 选项提取 ====================

export const TYPE_OPTIONS = Object.keys(TYPE_CODE_MAP).filter(
  key => TYPE_CODE_MAP[key]?.enabled !== false
) as readonly string[]
export const DIAMETER_OPTIONS = Object.keys(DIAMETER_CODE_MAP).filter(
  key => DIAMETER_CODE_MAP[key]?.enabled !== false
) as readonly string[]
export const MATERIAL_OPTIONS = Object.keys(MATERIAL_CODE_MAP).filter(
  key => key !== 'A方向' && key !== 'B方向' && MATERIAL_CODE_MAP[key]?.enabled !== false
) as readonly string[]
export const BELT_OPTIONS = Object.keys(BELT_CODE_MAP).filter(
  key => BELT_CODE_MAP[key]?.enabled !== false
) as readonly string[]
export const SHAFT_OPTIONS = Object.keys(SHAFT_CODE_MAP).filter(
  key => SHAFT_CODE_MAP[key]?.enabled !== false
) as readonly string[]
export const SPEED_OPTIONS = Object.keys(SPEED_CODE_MAP).filter(
  key => SPEED_CODE_MAP[key]?.enabled !== false
) as readonly string[]
export const LOAD_OPTIONS = Object.keys(LOAD_CODE_MAP).filter(
  key => LOAD_CODE_MAP[key]?.enabled !== false
) as readonly string[]

// ==================== 级联规则映射 ====================

/**
 * 类型 -> 直径选项映射
 * 格式：Array<[code, value, enabled]>，code 用于产品编号生成，value 为直径值，enabled 用于判断该参数是否可用
 */
export const TYPE_DIAMETER_MAP: Record<string, Array<[number, string, boolean]>> = {
  '电动无刷减速': [[0, '50x1.5', true], [4, '60x2.0', true], [5, '76x3.0', true], [6, '80x3.0', true], [7, '80x6.0', true], [7, '100x6.0', true], [7, '120x6.0', true]],
  '电驱无刷减速': [[0, '50x1.5', true], [4, '60x2.0', true], [5, '76x3.0', true], [6, '80x3.0', true], [7, '80x6.0', true], [7, '100x6.0', true], [7, '120x6.0', true]],
  '电动伺服减速': [[0, '50x1.5', true], [4, '60x2.0', true], [5, '76x3.0', true], [6, '80x3.0', true], [7, '80x6.0', true], [7, '100x6.0', true], [7, '120x6.0', true]],
  '电驱伺服减速': [[0, '50x1.5', true], [4, '60x2.0', true], [5, '76x3.0', true], [6, '80x3.0', true], [7, '80x6.0', true], [7, '100x6.0', true], [7, '120x6.0', true]],
  '电动无刷直驱': [[0, '50x1.5', true]],
  '电驱无刷直驱': [[0, '50x1.5', true]],
  '电动伺服直驱': [[0, '50x1.5', true]],
  '电驱伺服直驱': [[0, '50x1.5', true]],
  '福轮': [[0, '50x1.5', true]],
  '麦轮': [[0, '50x1.5', true]],
  '从动': [[0, '50x1.5', true], [4, '60x2.0', true], [5, '76x3.0', true], [6, '80x3.0', true], [7, '80x6.0', true], [7, '100x6.0', true], [7, '120x6.0', true]],
  '阻尼': [[0, '50x1.5', true], [4, '60x2.0', true], [5, '76x3.0', true], [6, '80x3.0', true]],
}

/**
 * 类型 -> 材质选项映射
 */
export const TYPE_MATERIAL_MAP: Record<string, Array<[number, string, boolean]>> = {
  '福轮': [[2, '柔性套胶', true]],
  '麦轮': [[0, 'A方向', true], [0, 'B方向', true]],
}

/**
 * 类型 -> 带型选项映射
 */
export const TYPE_BELT_MAP: Record<string, Array<[number, string, boolean]>> = {
  '福轮': [[0, '塑料楔带轮', true], [1, '圆带', true]],
  '麦轮': [[4, '金属楔带轮', true]],
}

/**
 * 类型 -> 轴型选项映射
 */
export const TYPE_SHAFT_MAP: Record<string, Array<[number, string, boolean]>> = {
  '麦轮': [[0, '内螺纹', true]],
}

/**
 * 直径 -> 负载选项映射
 */
export const DIAMETER_LOAD_MAP: Record<string, Array<[number, string, boolean]>> = {
  '50x1.5': [[0, '10', true], [0, '30', true], [0, '50', true], [0, '100', true], [0, '250', true]],
  '60x2.0': [[0, '500', true], [0, '750', true]],
  '76x3.0': [[0, '750', true], [0, '1000', true], [0, '1250', true], [0, '1500', true]],
  '80x3.0': [[0, '750', true], [0, '1000', true], [0, '1250', true], [0, '1500', true]],
  '80x6.0': [[0, '10', true], [0, '30', true], [0, '50', true], [0, '100', true]],
  '100x6.0': [[0, '10', true], [0, '30', true], [0, '50', true], [0, '100', true]],
  '120x6.0': [[0, '10', true], [0, '30', true], [0, '50', true], [0, '100', true]],
}

/**
 * 直径 -> 长度选项映射
 */
export const DIAMETER_LENGTH_MAP: Record<string, string[]> = {
  '50x1.5': ['450', '550', '650', '750', '850'],
  '60x2.0': ['450', '550', '650', '750', '850'],
  '76x3.0': ['950', '1050', '1150', '1250', '1350', '1450'],
  '80x3.0': ['950', '1050', '1150', '1250', '1350', '1450'],
  '80x6.0': ['450', '550', '650', '750', '850'],
  '100x6.0': ['450', '550', '650', '750', '850'],
  '120x6.0': ['450', '550', '650', '750', '850'],
}

/**
 * 直径 -> 材质选项映射
 */
export const DIAMETER_MATERIAL_MAP: Record<string, Array<[number, string, boolean]>> = {
  '50x1.5': [[0, 'ZAM钢管', true], [1, '不锈钢304', true], [2, '柔性套胶', true], [3, '套塑胶锥套', true], [3, '橡胶胶圈', true]],
  '60x2.0': [[0, 'ZAM钢管', true], [1, '不锈钢304', true]],
  '76x3.0': [[0, 'ZAM钢管', true], [1, '不锈钢304', true]],
  '80x3.0': [[0, 'ZAM钢管', true], [1, '不锈钢304', true]],
  '80x6.0': [[0, 'ZAM钢管', true]],
  '100x6.0': [[0, 'ZAM钢管', true]],
  '120x6.0': [[0, 'ZAM钢管', true]],
}

/**
 * 直径 -> 带型选项映射
 */
export const DIAMETER_BELT_MAP: Record<string, Array<[number, string, boolean]>> = {
  '50x1.5': [[0, '塑料楔带轮', true], [1, '圆带', true], [2, '齿带', true], [3, '平带', true], [4, '金属楔带轮', true]],
  '60x2.0': [[0, '单链', true], [2, '双排链', true], [1, '双链', true]],
  '76x3.0': [[0, '单链', true], [2, '双排链', true], [1, '双链', true]],
  '80x3.0': [[0, '单链', true], [2, '双排链', true], [1, '双链', true]],
  '80x6.0': [[0, '鼓形', true]],
  '100x6.0': [[0, '鼓形', true]],
  '120x6.0': [[0, '鼓形', true]],
}

/**
 * 材质 -> 带型选项映射
 */
export const MATERIAL_BELT_MAP: Record<string, Array<[number, string, boolean]>> = {
  'ZAM钢管': [[0, '塑料楔带轮', true], [1, '圆带', true], [2, '齿带', true], [3, '平带', true], [4, '金属楔带轮', true], [0, '单链', true], [2, '双排链', true], [1, '双链', true], [0, '角带', true], [0, '鼓形', true]],
  '不锈钢304': [[0, '塑料楔带轮', true], [1, '圆带', true], [2, '齿带', true], [3, '平带', true], [4, '金属楔带轮', true], [0, '单链', true], [2, '双排链', true], [1, '双链', true], [0, '角带', true], [0, '鼓形', true]],
  '柔性套胶': [[0, '塑料楔带轮', true], [1, '圆带', true], [2, '齿带', true], [3, '平带', true], [4, '金属楔带轮', true]],
  '套塑胶锥套': [[0, '塑料楔带轮', true], [1, '圆带', true], [3, '平带', true]],
  '橡胶胶圈': [[3, '平带', true]],
}

/**
 * 带型 -> 轴型选项映射
 * 轴型编码：六角轴梭=0, 内螺纹=1, 外螺纹=2, 键轴=3, 方轴=4
 */
export const BELT_SHAFT_MAP: Record<string, Array<[number, string, boolean]>> = {
  '塑料楔带轮': [[0, '六角轴梭', true], [1, '内螺纹', true]],
  '圆带': [[0, '六角轴梭', true], [1, '内螺纹', true]],
  '齿带': [[0, '六角轴梭', true], [1, '内螺纹', true]],
  '平带': [[0, '六角轴梭', true], [1, '内螺纹', true]],
  '金属楔带轮': [[0, '六角轴梭', true], [1, '内螺纹', true]],
  '单链': [[1, '内螺纹', true]],
  '双链': [[1, '内螺纹', true]],
  '双排链': [[2, '外螺纹', true]],
  '角带': [[4, '方轴', true]],
  '鼓形': [[4, '方轴', true]],
}

/**
 * 带型-轴型组合到编号编码的映射表
 * 根据BELT_SHAFT_MAP中实际存在的组合，为每个组合分配唯一的0-9编码
 * 格式：'带型名称|轴型名称' -> 编码(0-9)
 * 
 * 编码分配策略（基于带型code和轴型code的组合，确保唯一性）：
 * - 塑料楔带轮(code=0): 六角轴梭(0) -> 0, 内螺纹(1) -> 1
 * - 圆带(code=1): 六角轴梭(0) -> 2, 内螺纹(1) -> 3
 * - 齿带(code=2): 六角轴梭(0) -> 4, 内螺纹(1) -> 5
 * - 平带(code=3): 六角轴梭(0) -> 6, 内螺纹(1) -> 7
 * - 金属楔带轮(code=4): 六角轴梭(0) -> 8, 内螺纹(1) -> 9
 * - 单链(code=0): 内螺纹(1) -> 0 (与塑料楔带轮|六角轴梭共享，但带型code相同，通过其他字段区分)
 * - 双链(code=1): 内螺纹(1) -> 1 (与塑料楔带轮|内螺纹共享，但带型code不同，通过其他字段区分)
 * - 双排链(code=2): 外螺纹(2) -> 2 (与圆带|六角轴梭共享，但带型code不同，通过其他字段区分)
 * - 角带(code=0): 方轴(4) -> 3 (与圆带|内螺纹共享，但带型code不同，通过其他字段区分)
 * - 鼓形(code=0): 方轴(4) -> 4 (与齿带|六角轴梭共享，但带型code不同，通过其他字段区分)
 * 
 * 注意：由于只有10个数字，部分组合会共享编码，但通过带型code和其他字段可以区分
 */
const BELT_SHAFT_COMBINATION_CODE_MAP: Record<string, number> = {
  // 塑料楔带轮组合 (带型code=0)
  '塑料楔带轮|六角轴梭': 0,
  '塑料楔带轮|内螺纹': 1,
  // 圆带组合 (带型code=1)
  '圆带|六角轴梭': 2,
  '圆带|内螺纹': 3,
  // 齿带组合 (带型code=2)
  '齿带|六角轴梭': 4,
  '齿带|内螺纹': 5,
  // 平带组合 (带型code=3)
  '平带|六角轴梭': 6,
  '平带|内螺纹': 7,
  // 金属楔带轮组合 (带型code=4)
  '金属楔带轮|六角轴梭': 8,
  '金属楔带轮|内螺纹': 9,
  // 单链组合 (带型code=0, 与塑料楔带轮共享code，但轴型不同)
  '单链|内螺纹': 0,
  // 双链组合 (带型code=1, 与圆带共享code，但轴型不同)
  '双链|内螺纹': 1,
  // 双排链组合 (带型code=2, 与齿带共享code，但轴型不同)
  '双排链|外螺纹': 2,
  // 角带组合 (带型code=0, 与塑料楔带轮共享code，但轴型不同)
  '角带|方轴': 3,
  // 鼓形组合 (带型code=0, 与塑料楔带轮共享code，但轴型不同)
  '鼓形|方轴': 4,
}

/**
 * 带型 -> 负载选项映射
 */
export const BELT_LOAD_MAP: Record<string, Array<[number, string, boolean]>> = {
  '圆带': [[0, '10', true], [0, '30', true], [0, '50', true]],
  '齿带': [[0, '10', true], [0, '30', true], [0, '50', true], [0, '100', true], [0, '250', true]],
  '金属楔带轮': [[0, '250', true], [0, '500', true]],
}

/**
 * 负载 -> 转速选项映射
 */
export const LOAD_SPEED_MAP: Record<string, Array<[number, string, boolean]>> = {
  '10': [[5, '60', true], [6, '75', true], [7, '90', true]],
  '30': [[4, '45', true], [5, '60', true], [6, '75', true]],
  '50': [[3, '30', true], [4, '45', true], [5, '60', true]],
  '100': [[2, '18', true], [3, '30', true], [4, '45', true]],
  '250': [[1, '15', true], [2, '18', true], [3, '30', true]],
  '500': [[0, '12', true], [1, '15', true], [2, '18', true]],
  '750': [[0, '12', true], [1, '15', true], [2, '18', true]],
  '1000': [[0, '12', true], [1, '15', true], [2, '18', true]],
  '1250': [[0, '12', true], [1, '15', true], [2, '18', true]],
  '1500': [[0, '12', true], [1, '15', true], [2, '18', true]],
}

// ==================== 特殊规则配置 ====================

/**
 * 材质编号代码特殊规则
 * 当基础映射表的 code 值需要根据直径、类型变化时，在此数组中添加规则
 */
export const MATERIAL_CODE_OVERRIDES: Array<{
  diameter?: string
  material: string
  type?: string
  code: string
}> = [
  // 50x1.5 直径的特殊规则
  { diameter: '50x1.5', material: 'ZAM钢管', type: '电驱无刷直驱', code: '4' },
  { diameter: '50x1.5', material: 'ZAM钢管', type: '电驱伺服直驱', code: '4' },
  { diameter: '50x1.5', material: '', type: '电驱无刷直驱', code: '4' },
  { diameter: '50x1.5', material: '', type: '电驱伺服直驱', code: '4' },
  { diameter: '50x1.5', material: 'A', type: '电驱无刷直驱', code: '4' },
  { diameter: '50x1.5', material: 'A', type: '电驱伺服直驱', code: '4' },
  { diameter: '50x1.5', material: 'B', type: '电驱无刷直驱', code: '4' },
  { diameter: '50x1.5', material: 'B', type: '电驱伺服直驱', code: '4' },
  { diameter: '50x1.5', material: '不锈钢304', type: '电驱无刷直驱', code: '5' },
  { diameter: '50x1.5', material: '不锈钢304', type: '电驱伺服直驱', code: '5' },
  { diameter: '50x1.5', material: '柔性套胶', type: '电驱无刷直驱', code: '6' },
  { diameter: '50x1.5', material: '柔性套胶', type: '电驱伺服直驱', code: '6' },
  { diameter: '50x1.5', material: '套塑胶锥套', type: '电驱无刷直驱', code: '7' },
  { diameter: '50x1.5', material: '套塑胶锥套', type: '电驱伺服直驱', code: '7' },
  { diameter: '50x1.5', material: '橡胶胶圈', type: '电驱无刷直驱', code: '7' },
  { diameter: '50x1.5', material: '橡胶胶圈', type: '电驱伺服直驱', code: '7' },
  // 非 50x1.5 直径使用直径的 code
  { diameter: '60x2.0', material: 'default', code: '4' },
  { diameter: '76x3.0', material: 'default', code: '5' },
  { diameter: '80x3.0', material: 'default', code: '6' },
  { diameter: '80x6.0', material: 'default', code: '7' },
  { diameter: '100x6.0', material: 'default', code: '7' },
  { diameter: '120x6.0', material: 'default', code: '7' },
]

/**
 * 带型编号代码特殊规则
 * 当基础映射表的 code 值需要根据直径、材质、类型变化时，在此数组中添加规则
 */
export const BELT_CODE_OVERRIDES: Array<{
  diameter?: string
  belt: string
  material?: string
  type?: string
  code: string
}> = [
  // 50x1.5 直径的特殊规则
  { diameter: '50x1.5', belt: '平带', material: '套塑胶锥套', code: '2' },
  { diameter: '50x1.5', belt: '平带', type: '阻尼', code: '2' },
  { diameter: '50x1.5', belt: '金属楔带轮', material: '', code: '0' },
  // 链类带型的特殊规则
  { belt: '单链', material: 'ZAM钢管', code: '0' },
  { belt: '双链', material: 'ZAM钢管', code: '1' },
  { belt: '双排链', material: 'ZAM钢管', code: '2' },
  // 80x6.0 直径的特殊规则
  { diameter: '80x6.0', belt: 'default', code: '1' },
  // 100x6.0 直径的特殊规则
  { diameter: '100x6.0', belt: 'default', type: '从动', code: '2' },
  { diameter: '100x6.0', belt: 'default', code: '1' },
  // 120x6.0 直径的特殊规则
  { diameter: '120x6.0', belt: 'default', type: '从动', code: '3' },
  { diameter: '120x6.0', belt: 'default', code: '2' },
]

// ==================== 工具函数 ====================

/**
 * 从元组数组中提取启用的值
 */
function extractEnabledValues(items: Array<[number, string, boolean]>): string[] {
  return items.filter(([code, value, enabled]) => enabled !== false).map(([code, value]) => value)
}

/**
 * 从 CODE_MAP 生成元组数组
 */
function generateItemsFromCodeMap<T extends Record<string, { code: number, enabled?: boolean }>>(
  codeMap: T,
  options: readonly string[]
): Array<[number, string, boolean]> {
  return options.map(key => [
    codeMap[key]?.code || 0,
    key,
    codeMap[key]?.enabled !== false
  ])
}

/**
 * 长度编码映射（用于产品编号生成）
 * 将长度值转换为3位编码
 * - 长度 450-999mm：编码 = 长度 - 450（000-549）
 * - 长度 1000-1450mm：编码 = (长度 - 1000) / 10 + 550（550-595，精度10mm）
 */
export const getLengthNumberCode = (length: string | number): string => {
  const lengthNum = typeof length === 'string' ? parseFloat(length) : length
  if (isNaN(lengthNum) || lengthNum < 450) {
    return '000'
  }
  if (lengthNum > 1450) {
    return '595' // 最大编码：(1450 - 1000) / 10 + 550 = 595
  }
  
  let code: number
  if (lengthNum < 1000) {
    // 450-999：编码 = 长度 - 450
    code = Math.floor(lengthNum - 450)
  } else {
    // 1000-1450：编码 = (长度 - 1000) / 10 + 550，精度10mm
    code = Math.floor((lengthNum - 1000) / 10) + 550
  }
  
  const codeStr = String(Math.min(Math.max(code, 0), 595))
  return codeStr.padStart(3, '0')
}

/**
 * 计算钢管长度
 * 规则：
 * 1. 福轮、麦轮：无钢管，返回 null
 * 2. 50x1.5 + 楔带/圆带/齿带：长度 - 45
 * 3. 50x1.5 + 平带：长度 - 20
 * 4. 50x1.5 + 双链：长度 - 70
 * 5. 76x3.0/80x3.0 + 单链：长度 - 65.5
 * 6. 76x3.0/80x3.0 + 双排链：长度 - 152
 * 7. 80x6.0/100x6.0/120x6.0：长度 - 20
 * 8. 其他情况：返回原始长度
 */
export const calculatePipeLength = (
  type: string,
  diameter: string,
  belt: string,
  length: string | number
): number | null => {
  if (type === '福轮' || type === '麦轮') {
    return null
  }

  const lengthNum = typeof length === 'string' ? parseFloat(length) : length
  if (isNaN(lengthNum)) {
    return null
  }

  // 50x1.5 直径的特殊规则
  if (diameter === '50x1.5') {
    if (belt === '塑料楔带轮' || belt === '圆带' || belt === '齿带') {
      return lengthNum - 45
    }
    if (belt === '平带') {
      return lengthNum - 20
    }
    if (belt === '双链') {
      return lengthNum - 70
    }
  }

  // 76x3.0 和 80x3.0 使用相同的规则
  if (diameter === '76x3.0' || diameter === '80x3.0') {
    if (belt === '单链') {
      return lengthNum - 65.5
    }
    if (belt === '双排链') {
      return lengthNum - 152
    }
  }

  // 80x6.0、100x6.0、120x6.0：长度 - 20
  if (diameter === '80x6.0' || diameter === '100x6.0' || diameter === '120x6.0') {
    return lengthNum - 20
  }

  return lengthNum
}

/**
 * 计算材质编号代码
 * 优先检查特殊规则，如果没有则使用 MATERIAL_CODE_MAP 的 code
 */
export const getMaterialNumberCode = (diameter: string, material: string, type: string): string => {
  const override = MATERIAL_CODE_OVERRIDES.find(rule => {
    if (rule.diameter && rule.diameter !== diameter) return false
    if (rule.material === 'default') return true
    if (rule.material !== material) return false
    if (rule.type && rule.type !== type) return false
    return true
  })

  if (override) {
    return override.code
  }

  if (diameter !== '50x1.5') {
    const diameterCode = DIAMETER_CODE_MAP[diameter]?.code
    return diameterCode !== undefined ? String(diameterCode) : 'x'
  }

  const materialCode = MATERIAL_CODE_MAP[material]?.code
  return materialCode !== undefined ? String(materialCode) : 'x'
}

/**
 * 计算带型编号代码
 * 优先检查特殊规则，如果没有则使用 BELT_CODE_MAP 的 code
 */
export const getBeltNumberCode = (diameter: string, belt: string, material: string, type: string): string => {
  const override = BELT_CODE_OVERRIDES.find(rule => {
    if (rule.diameter && rule.diameter !== diameter) return false
    if (rule.belt !== belt) return false
    if (rule.material && rule.material !== material) return false
    if (rule.type && rule.type !== type) return false
    return true
  })

  if (override) {
    return override.code
  }

  const beltCode = BELT_CODE_MAP[belt]?.code
  return beltCode !== undefined ? String(beltCode) : 'x'
}

/**
 * 生成产品编号
 * 格式：30 + 类型直径合并code(2位) + 材质带型轴型合并code(1位) + 负载转速合并code(2位) + 长度code(3位)
 * 总长度：10位
 * 类型直径合并：类型code × 10 + 直径code（00-99）
 * 材质带型轴型合并：材质code × 10 + 带型轴型合并code，压缩为1位（0-9，使用模10运算）
 * 负载转速合并：负载code × 10 + 转速code（00-99）
 * 长度编码：3位（000-595）
 * 带型轴型合并规则：使用BELT_SHAFT_COMBINATION_CODE_MAP查找带型-轴型组合的唯一编码(0-9)
 */
export const generateProductNumber = (formData: {
  Type?: string
  Diameter?: string
  Material?: string
  Belt?: string
  Shaft?: string
  Load?: string
  Speed?: string
  Length?: string
}): string => {
  const { Type: type, Diameter: diameter, Material: material, Belt: belt, Shaft: shaft, Load: load, Speed: speed, Length: length } = formData

  if (!type || !diameter || !material || !belt || !shaft || !load || !speed || !length) {
    return ''
  }

  const getCode = (map: Record<string, { code: number }>, key: string): string | null => {
    const code = map[key]?.code
    return code !== undefined ? String(code) : null
  }

  const parts: string[] = ['30']
  
  const typeCode = getCode(TYPE_CODE_MAP, type)
  const diameterCode = getCode(DIAMETER_CODE_MAP, diameter)
  const materialCode = getMaterialNumberCode(diameter, material, type)
  const beltCode = getBeltNumberCode(diameter, belt, material, type)
  const shaftCode = getCode(SHAFT_CODE_MAP, shaft)
  const loadCode = getCode(LOAD_CODE_MAP, load)
  const speedCode = getCode(SPEED_CODE_MAP, speed)

  if (!typeCode || !diameterCode || materialCode === 'x' || beltCode === 'x' || !shaftCode || !loadCode || !speedCode) {
    return ''
  }

  // 合并带型和轴型：使用映射表查找带型-轴型组合的唯一编码
  const combinationKey = `${belt}|${shaft}`
  let beltShaftCombinedCodeStr: string
  
  const beltShaftCombinedCode = BELT_SHAFT_COMBINATION_CODE_MAP[combinationKey]
  
  if (beltShaftCombinedCode === undefined) {
    // 如果映射表中没有找到，回退到原来的算法
    const beltCodeNum = parseInt(beltCode)
    const shaftCodeNum = parseInt(shaftCode)
    beltShaftCombinedCodeStr = String((beltCodeNum * 5 + shaftCodeNum) % 10)
  } else {
    beltShaftCombinedCodeStr = String(beltShaftCombinedCode)
  }

  // 合并类型和直径：类型code × 10 + 直径code
  const typeDiameterCombinedCode = parseInt(typeCode) * 10 + parseInt(diameterCode)
  const typeDiameterCombinedCodeStr = String(typeDiameterCombinedCode).padStart(2, '0')

  // 合并材质和带型轴型：材质code × 10 + 带型轴型合并code，压缩为1位（使用模10运算）
  const materialBeltShaftCombinedCode = parseInt(materialCode) * 10 + parseInt(beltShaftCombinedCodeStr)
  const materialBeltShaftCombinedCodeStr = String(materialBeltShaftCombinedCode % 10)

  // 合并负载和转速：负载code × 10 + 转速code
  const loadSpeedCombinedCode = parseInt(loadCode) * 10 + parseInt(speedCode)
  const loadSpeedCombinedCodeStr = String(loadSpeedCombinedCode).padStart(2, '0')

  parts.push(typeDiameterCombinedCodeStr, materialBeltShaftCombinedCodeStr, loadSpeedCombinedCodeStr, getLengthNumberCode(length))

  const result = parts.join('')
  return result.length > 10 ? result.substring(0, 10) : result
}

// ==================== 速比计算器 ====================

/**
 * 转速到速比的映射表（适用于直径50和60，电机转速6100）
 */
const SPEED_TO_GEAR_RATIO_MAP_50_60: Record<string, number> = {
  '60': 16, '75': 12, '90': 9, '45': 18, '30': 27, '18': 54, '15': 64, '12': 0,
}

/**
 * 转速到速比的映射表（适用于直径76和80，电机转速3000）
 */
const SPEED_TO_GEAR_RATIO_MAP_76_80: Record<string, number> = {
  '12': 56, '15': 48, '18': 40,
}

/**
 * 负载+转速到速比的映射表（适用于直径80x6.0、100x6.0、120x6.0，电机转速3000）
 */
const LOAD_SPEED_TO_GEAR_RATIO_MAP_80_100_120: Record<string, number> = {
  '10,60': 12, '10,75': 10, '10,90': 8,
  '30,45': 16, '30,60': 12, '30,75': 10,
  '50,30': 25, '50,45': 16, '50,60': 12,
  '100,18': 40, '100,30': 25, '100,45': 16,
}

/**
 * 计算速比
 */
export function calculateGearRatio(diameter: string, speed: string, load?: string): number | null {
  const outputSpeed = parseFloat(speed)
  if (isNaN(outputSpeed) || outputSpeed === 0) {
    return null
  }
  
  if (diameter === '50x1.5' || diameter === '60x2.0') {
    const gearRatio = SPEED_TO_GEAR_RATIO_MAP_50_60[speed]
    return gearRatio !== undefined && gearRatio !== 0 ? gearRatio : null
  }
  
  if (diameter === '76x3.0' || diameter === '80x3.0') {
    return SPEED_TO_GEAR_RATIO_MAP_76_80[speed] ?? null
  }
  
  if (diameter === '80x6.0' || diameter === '100x6.0' || diameter === '120x6.0') {
    if (!load) return null
    return LOAD_SPEED_TO_GEAR_RATIO_MAP_80_100_120[`${load},${speed}`] ?? null
  }
  
  return null
}

// ==================== 产品生成器 ====================

/**
 * 根据级联规则获取可用的选项
 */
export function getAvailableOptions(
  field: string,
  currentData: Partial<Record<string, string>>
): string[] {
  const { Type: type, Diameter: diameter, Material: material, Belt: belt, Load: load } = currentData

  switch (field) {
    case 'Type':
      return TYPE_OPTIONS as string[]
    
    case 'Diameter':
      return type && TYPE_DIAMETER_MAP[type] ? extractEnabledValues(TYPE_DIAMETER_MAP[type]) : []
    
    case 'Material':
      if (type && TYPE_MATERIAL_MAP[type]) {
        return extractEnabledValues(TYPE_MATERIAL_MAP[type])
      }
      return diameter && DIAMETER_MATERIAL_MAP[diameter] ? extractEnabledValues(DIAMETER_MATERIAL_MAP[diameter]) : []
    
    case 'Belt':
      if (type && TYPE_BELT_MAP[type]) {
        return extractEnabledValues(TYPE_BELT_MAP[type])
      }
      let beltOptions: string[] = []
      if (diameter && DIAMETER_BELT_MAP[diameter]) {
        beltOptions = extractEnabledValues(DIAMETER_BELT_MAP[diameter])
      }
      if (material && MATERIAL_BELT_MAP[material]) {
        const materialBelts = extractEnabledValues(MATERIAL_BELT_MAP[material])
        beltOptions = beltOptions.length > 0 
          ? beltOptions.filter(b => materialBelts.includes(b))
          : materialBelts
      }
      return beltOptions
    
    case 'Shaft':
      if (type && TYPE_SHAFT_MAP[type]) {
        return extractEnabledValues(TYPE_SHAFT_MAP[type])
      }
      return belt && BELT_SHAFT_MAP[belt] ? extractEnabledValues(BELT_SHAFT_MAP[belt]) : []
    
    case 'Load':
      if (diameter && DIAMETER_LOAD_MAP[diameter]) {
        return extractEnabledValues(DIAMETER_LOAD_MAP[diameter])
      }
      return belt && BELT_LOAD_MAP[belt] ? extractEnabledValues(BELT_LOAD_MAP[belt]) : []
    
    case 'Speed':
      return load && LOAD_SPEED_MAP[load] ? extractEnabledValues(LOAD_SPEED_MAP[load]) : []
    
    case 'Length':
      return diameter && DIAMETER_LENGTH_MAP[diameter] ? DIAMETER_LENGTH_MAP[diameter] : []
    
    default:
      return []
  }
}

/**
 * 生成产品型号
 */
export function generateProductModel(formData: Record<string, string>): string {
  const parts: string[] = ['R']
  
  parts.push(
    TYPE_CODE_MAP[formData.Type]?.value || '',
    DIAMETER_CODE_MAP[formData.Diameter]?.value || '',
    '-',
    MATERIAL_CODE_MAP[formData.Material]?.value || '',
    BELT_CODE_MAP[formData.Belt]?.value || '',
    SHAFT_CODE_MAP[formData.Shaft]?.value || '',
    LOAD_CODE_MAP[formData.Load]?.value || '',
    SPEED_CODE_MAP[formData.Speed]?.value || '',
    '-',
    formData.Length
  )
  
  return parts.join('')
}

/**
 * 递归生成所有有效的组合
 */
export function generateAllCombinations(
  fields: string[],
  currentIndex: number,
  currentData: Partial<Record<string, string>>,
  allCombinations: ProductRow[]
): void {
  if (currentIndex >= fields.length) {
    const completeData = currentData as Record<string, string>
    const productModel = generateProductModel(completeData)
    const productNumber = generateProductNumber(completeData)
    const gearRatio = calculateGearRatio(completeData.Diameter, completeData.Speed, completeData.Load)
    const pipeLength = calculatePipeLength(completeData.Type, completeData.Diameter, completeData.Belt, completeData.Length)
    
    const row: ProductRow = {
      Type: completeData.Type,
      Diameter: completeData.Diameter,
      Material: completeData.Material,
      Belt: completeData.Belt,
      Shaft: completeData.Shaft,
      Load: completeData.Load,
      Speed: completeData.Speed,
      Length: completeData.Length,
      ProductModel: productModel,
      ProductNumber: productNumber,
}

    if (gearRatio !== null) row.GearRatio = gearRatio
    if (pipeLength !== null) row.PipeLength = pipeLength
    
    allCombinations.push(row)
    return
  }
  
  const field = fields[currentIndex]
  const availableOptions = getAvailableOptions(field, currentData)
  
  if (availableOptions.length === 0) {
    return
  }
  
  for (const option of availableOptions) {
    generateAllCombinations(fields, currentIndex + 1, { ...currentData, [field]: option }, allCombinations)
  }
}

/**
 * 生成CSV格式的完整遍历表
 */
export function generateFullCombinationsCSV(): string {
  const fields = ['Type', 'Diameter', 'Material', 'Belt', 'Shaft', 'Load', 'Speed', 'Length']
  const allCombinations: ProductRow[] = []
  
  console.log('开始生成所有组合...')
  const startTime = Date.now()
  
  generateAllCombinations(fields, 0, {}, allCombinations)
  
  const endTime = Date.now()
  console.log(`生成完成，共 ${allCombinations.length} 条记录，耗时 ${endTime - startTime}ms`)
  
  const headers = [
    'ID', '产品编号', '产品型号', '类型', '直径', '材质', '带型', '轴型', '负载', '转速', '速比', '长度', '钢管长度',
  ]
  
  const rows = allCombinations.map((combo, index) => [
    (index + 1).toString(),
    combo.ProductNumber,
    combo.ProductModel,
    combo.Type,
    combo.Diameter,
    combo.Material,
    combo.Belt,
    combo.Shaft,
    combo.Load,
    combo.Speed,
    combo.GearRatio !== undefined ? combo.GearRatio.toString() : '',
    combo.Length,
    combo.PipeLength !== undefined && combo.PipeLength !== null ? combo.PipeLength.toFixed(1) : '',
  ])
  
  const csvRows = [headers, ...rows].map(row => 
    row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
  )
  
  return csvRows.join('\n')
}

// ==================== 级联配置生成器 ====================

/**
 * 创建节点
 */
function createNode(
  field: keyof typeof FIELD_CONFIG,
  options: Record<string, any> | any[],
  code?: number | string,
  value?: string | number
): any {
  const config = FIELD_CONFIG[field]
  return {
    field: config.field,
    label: config.label,
    componentType: config.componentType,
    ...(code !== undefined && { code }),
    ...(value !== undefined && { value }),
    options
  }
}

/**
 * 创建长度节点（叶子节点）
 */
function createLengthNode(diameterValue?: string): any {
  let lengthOptions: string[] = diameterValue && DIAMETER_LENGTH_MAP[diameterValue]
    ? DIAMETER_LENGTH_MAP[diameterValue]
    : Object.keys(LENGTH_OPTIONS)
  
  lengthOptions = lengthOptions.filter(length => LENGTH_OPTIONS[length]?.enabled !== false)
  
  const options: any[] = lengthOptions.map(length => ({
    field: FIELD_CONFIG.Length.field,
    label: length,
    componentType: FIELD_CONFIG.Length.componentType,
    value: length
  }))
  
  return createNode('Length', options)
}

/**
 * 创建转速节点
 */
function createSpeedNode(loadValue: string, diameterValue?: string): any {
  let speedItems: Array<[number, string, boolean]> = LOAD_SPEED_MAP[loadValue]
    ? LOAD_SPEED_MAP[loadValue]
    : generateItemsFromCodeMap(SPEED_CODE_MAP, SPEED_OPTIONS)
  
  speedItems = speedItems.filter(([code, speed, enabled]) => enabled !== false)
  
  const options: Record<string, any> = {}
  speedItems.forEach(([code, speed]) => {
    options[speed] = {
      ...createLengthNode(diameterValue),
      code: code,
      value: SPEED_CODE_MAP[speed]?.value || speed
    }
  })
  
  return createNode('Speed', options)
}

/**
 * 创建负载节点
 */
function createLoadNode(beltValue?: string, diameterValue?: string): any {
  let loadItems: Array<[number, string, boolean]>
  if (diameterValue && DIAMETER_LOAD_MAP[diameterValue]) {
    loadItems = DIAMETER_LOAD_MAP[diameterValue]
  } else if (beltValue && BELT_LOAD_MAP[beltValue]) {
    loadItems = BELT_LOAD_MAP[beltValue]
  } else {
    loadItems = generateItemsFromCodeMap(LOAD_CODE_MAP, LOAD_OPTIONS)
  }
  
  loadItems = loadItems.filter(([code, load, enabled]) => enabled !== false)
  
  const options: Record<string, any> = {}
  loadItems.forEach(([code, load]) => {
    options[load] = createSpeedNode(load, diameterValue)
  })
  return createNode('Load', options)
}

/**
 * 创建轴型节点
 */
function createShaftNode(beltValue?: string, typeValue?: string, diameterValue?: string): any {
  let shaftItems: Array<[number, string, boolean]>
  if (typeValue && TYPE_SHAFT_MAP[typeValue]) {
    shaftItems = TYPE_SHAFT_MAP[typeValue]
  } else if (beltValue && BELT_SHAFT_MAP[beltValue]) {
    shaftItems = BELT_SHAFT_MAP[beltValue]
  } else {
    shaftItems = generateItemsFromCodeMap(SHAFT_CODE_MAP, SHAFT_OPTIONS)
  }
  
  shaftItems = shaftItems.filter(([code, shaft, enabled]) => enabled !== false)
  
  const options: Record<string, any> = {}
  shaftItems.forEach(([code, shaft]) => {
    options[shaft] = createLoadNode(beltValue, diameterValue)
  })
  return createNode('Shaft', options)
}

/**
 * 创建带型节点
 */
function createBeltNode(diameterValue?: string, materialValue?: string, typeValue?: string): any {
  let beltItems: Array<[number, string, boolean]>
  
  if (typeValue && TYPE_BELT_MAP[typeValue]) {
    beltItems = TYPE_BELT_MAP[typeValue]
  } else {
    beltItems = diameterValue && DIAMETER_BELT_MAP[diameterValue]
      ? DIAMETER_BELT_MAP[diameterValue]
      : generateItemsFromCodeMap(BELT_CODE_MAP, BELT_OPTIONS)
    
    if (materialValue && MATERIAL_BELT_MAP[materialValue]) {
      const materialBeltValues = extractEnabledValues(MATERIAL_BELT_MAP[materialValue])
      beltItems = beltItems.filter(([code, belt, enabled]) => enabled !== false && materialBeltValues.includes(belt))
    } else {
      beltItems = beltItems.filter(([code, belt, enabled]) => enabled !== false)
    }
  }
  
  beltItems = beltItems.filter(([code, belt, enabled]) => enabled !== false)
  
  const options: Record<string, any> = {}
  beltItems.forEach(([code, belt]) => {
    options[belt] = createShaftNode(belt, typeValue, diameterValue)
  })
  return createNode('Belt', options)
}

/**
 * 创建材质节点
 */
function createMaterialNode(diameterValue?: string, typeValue?: string): any {
  let materialItems: Array<[number, string, boolean]>
  if (typeValue && TYPE_MATERIAL_MAP[typeValue]) {
    materialItems = TYPE_MATERIAL_MAP[typeValue]
  } else if (diameterValue && DIAMETER_MATERIAL_MAP[diameterValue]) {
    materialItems = DIAMETER_MATERIAL_MAP[diameterValue]
  } else {
    materialItems = generateItemsFromCodeMap(MATERIAL_CODE_MAP, MATERIAL_OPTIONS)
  }
  
  materialItems = materialItems.filter(([code, material, enabled]) => enabled !== false)
  
  const options: Record<string, any> = {}
  materialItems.forEach(([code, material]) => {
    options[material] = {
      ...createBeltNode(diameterValue, material, typeValue),
      code: code,
      value: MATERIAL_CODE_MAP[material]?.value || material
    }
  })
  return createNode('Material', options)
}

/**
 * 创建直径节点
 */
function createDiameterNode(typeValue?: string): any {
  let diameterItems: Array<[number, string, boolean]> = typeValue && TYPE_DIAMETER_MAP[typeValue]
    ? TYPE_DIAMETER_MAP[typeValue]
    : generateItemsFromCodeMap(DIAMETER_CODE_MAP, DIAMETER_OPTIONS)
  
  diameterItems = diameterItems.filter(([code, diameter, enabled]) => enabled !== false)
  
  const options: Record<string, any> = {}
  diameterItems.forEach(([code, diameter]) => {
    options[diameter] = {
      ...createMaterialNode(diameter, typeValue),
      code: code,
      value: DIAMETER_CODE_MAP[diameter]?.value || diameter
    }
  })
  return createNode('Diameter', options)
}

/**
 * 创建类型节点
 */
function createTypeNode(): any {
  const options: Record<string, any> = {}
  TYPE_OPTIONS.forEach(type => {
    const typeCode = TYPE_CODE_MAP[type]
    options[type] = {
      ...createDiameterNode(type),
      code: typeCode?.code || 0,
      value: typeCode?.value || type
    }
  })
  return createNode('Type', options)
}

/**
 * 创建级联配置
 */
export const createCascadeConfig = () => {
  return {
    field: FIELD_CONFIG.Type.field,
    label: FIELD_CONFIG.Type.label,
    code: 300,
    value: 'R',
    componentType: FIELD_CONFIG.Type.componentType,
    options: createTypeNode().options
  }
}
