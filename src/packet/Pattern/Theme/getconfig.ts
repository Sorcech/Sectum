import fs from 'fs'
import path from 'path'

const defaultConfigNames = [
  'uno.config.js',
  'uno.config.ts',
  'unocss.config.js',
  'unocss.config.ts',
]

const getConfigPath = () => {
  let configPath = null
  let configFilePath: string | undefined

  for (const name of defaultConfigNames) {
    configPath = path.resolve(process.cwd(), name)
    if (fs.existsSync(configPath)) {
      configFilePath = configPath
      break
    }
  }
  if (!configFilePath)
    throw new Error('uno.config file not found')

  return configFilePath
}

/**
 * Get Section user configuration in `uno.config`
 *
 * @returns The Section user configuration
 */
async function getConfig() {
  try {
    const themePath = getConfigPath()
    const config = await import(themePath)
    return config.default.SectionThemes
  } catch (error) {
    // 如果配置文件不存在或没有SectionThemes配置，返回undefined
    return undefined
  }
}

/**
 * Check if given string is keyof given object
 *
 * @param key
 * @param obj
 */
function isObjKey<T extends object>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj
}

export { isObjKey, getConfig }

