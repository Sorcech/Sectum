// 虚拟空模块，用于在网页构建时替换 Node.js 专用模块
// 这些模块只被构建时插件使用，不应该出现在最终的 bundle 中

// 导出默认空对象
export default {}

// 导出 @antfu/install-pkg 的常见导出
export const installPackage = async () => Promise.resolve()
export const installPackageSync = () => {}

// 导出 @antfu/utils 的常见导出
export const sleep = () => Promise.resolve()

// 导出 kolorist 的常见导出（颜色函数）
export const cyan = (str) => str
export const yellow = (str) => str
export const red = (str) => str
export const green = (str) => str
export const blue = (str) => str
export const magenta = (str) => str
export const white = (str) => str
export const gray = (str) => str
export const dim = (str) => str
export const bold = (str) => str

// 导出 pkg-types 的常见导出
export const readPackageJSON = () => ({})
export const writePackageJSON = () => {}
export const resolvePackageJSON = () => null

// 导出 local-pkg 的常见导出
export const findPackage = () => null
export const isPackageExists = () => false
export const importModule = async () => null

// 导出 package-manager-detector 的常见导出
export const detectPackageManager = () => null

// 导出 mlly 的常见导出
export const resolveModule = () => null
export const resolvePath = () => null
export const createResolve = () => () => null

// 导出 Node.js fs 模块的常见导出（promises API）
export const promises = {
  readFile: async () => '',
  writeFile: async () => {},
  readdir: async () => [],
  stat: async () => ({ isFile: () => false, isDirectory: () => false }),
  mkdir: async () => {},
  rm: async () => {},
  access: async () => {}
}
