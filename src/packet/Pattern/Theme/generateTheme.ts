import { brighten, mostReadable } from './functions'
import { colorNames, themes } from './theme'
import { getConfig } from './getconfig'
type Themes = string[] | string
interface SectionConfig {
  themes: Themes
}
interface Theme { [key: string]: string }
interface GeneratedTheme { [key: string]: { [key: string]: string } }
const defaultTheme = 'blue'

/**
 * Check if given string is keyof given object
 * @param key
 * @param obj
 */
function isObjKey<T extends object>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj
}


/**
 *  Override theme vars for defined theme or base theme if they exist
 * @param themes
 * @param setTheme
 */
const overrideTheme = (themes: Themes, setTheme: Theme) => {
  for (const definedItem of themes) {
    if (typeof definedItem === 'object') {
      for (const definedKey in definedItem as any) {
        // if this key exists in defined theme or baseTheme then replace value
        if (isObjKey(definedKey as string, setTheme))
          setTheme[definedKey] = definedItem[definedKey]
      }
    }
  }
  return setTheme
}

// generate missing colors from theme
const generateMissingColors = (setTheme: Theme) => {
  const difference = colorNames.filter(name => !Object.keys(setTheme).includes(name))
  for (const key in difference) {
    const difName = difference[key]
    if (difName.includes('focus')) {
      const index = Object.keys(setTheme).find(name => name.includes(difName.replace('-focus', '')))
      const color = setTheme[index as keyof typeof setTheme]
      setTheme[difName] = brighten(color, -10)
    }
    if (difName.includes('content')) {
      const index = Object.keys(setTheme).find(name => name.includes(difName.replace('-content', '')))
      const color = setTheme[index as keyof typeof setTheme]
      setTheme[difName] = mostReadable(color)
    }
    if (difName.includes('base-200') || difName.includes('dark-base-200')) {
      const index = Object.keys(setTheme).find(name => name.includes(difName.replace('-200', '')))
      const color = setTheme[index as keyof typeof setTheme]
      setTheme[difName] = brighten(color, -5)
    }
    if (difName.includes('base-300') || difName.includes('dark-base-300')) {
      const index = Object.keys(setTheme).find(name => name.includes(difName.replace('-300', '')))
      const color = setTheme[index as keyof typeof setTheme]
      setTheme[difName] = brighten(color, -10)
    }
  }
  return setTheme
}

// generate theme with hex colors and separate light from dark
const generateTheme = (theme: Theme) => {
  const generatedTheme: GeneratedTheme = { light: {}, dark: {} }
  const themeColor = Object.assign({}, theme)
  for (const key in themeColor) {
    // 保持原始 hex 颜色值，不转换为 RGB
    // separate light colors  from dark
    if (key.includes('dark'))
      generatedTheme.dark[`--${key.replace('dark-', '')}`] = themeColor[key]
    else
      generatedTheme.light[`--${key}`] = themeColor[key]
  }

  return generatedTheme
}

/**
 * @returns formated theme using default theme without user configuration
 * 直接使用默认主题，不依赖外部配置文件
 */
function getTheme() {
  let setTheme: Theme = {}
  let generatedTheme: GeneratedTheme = { light: {}, dark: {} }
  
  // 使用默认主题
  setTheme = themes[defaultTheme]
  
  // 生成缺失的颜色
  setTheme = generateMissingColors(setTheme)
  generatedTheme = generateTheme(setTheme)
  
  // 生成其他主题的CSS变量
  const generatedOthers: { [key: string]: { [key: string]: string } } = {}
  const otherThemeNames = Object.keys(themes).filter(name => name !== defaultTheme)
  
  for (const themeName of otherThemeNames) {
    const tempTheme = generateMissingColors(themes[themeName as keyof typeof themes])
    const tempGenerated = generateTheme(tempTheme)
    generatedOthers[`.theme-${themeName}`] = tempGenerated.light
    generatedOthers[`.dark.theme-${themeName}`] = tempGenerated.dark
  }
  
  return {
    ':root': generatedTheme.light,
    '.dark': generatedTheme.dark,
    ...generatedOthers,
  }
}

/**
 * 支持用户配置的主题生成函数
 * @returns formated theme using user configuration from uno.config
 */
async function getThemeWithConfig() {
  const sectionConfig: SectionConfig = await getConfig()

  let setTheme: Theme = {}
  let generatedTheme: GeneratedTheme = { light: {}, dark: {} }
  const otherThemes = []
  // include other themes
  const generatedOthers: { [key: string]: { [key: string]: string } } = {}

  //  if no section config defined in `uno.config` then defaultTheme is set
  if (sectionConfig === undefined || sectionConfig.themes === undefined)
    setTheme = themes[defaultTheme]

  // if section config is set in `uno.config`
  if (Object.keys(setTheme).length === 0) {
    let definedTheme: string | null = null
    // get first theme defined
    for (const theme of sectionConfig.themes) {
      if (typeof theme == 'string') {
        if (!definedTheme)
          definedTheme = theme
        else
          otherThemes.push(theme)
      }
    }
    // check if defined theme is keyof `themes`
    if (!isObjKey(definedTheme as string, themes))
      definedTheme = defaultTheme

    setTheme = themes[definedTheme as keyof typeof themes]
  }

  // replace theme vars for defined theme vars if they exist
  if (sectionConfig !== undefined && sectionConfig.themes !== undefined)
    setTheme = overrideTheme(sectionConfig.themes, setTheme)

  setTheme = generateMissingColors(setTheme)
  generatedTheme = generateTheme(setTheme)

  for (const theme of otherThemes) {
    const tempTheme: { [key: string]: { [key: string]: string } } = {}
    // check if other theme is present in Section themes
    if (isObjKey(theme, themes)) {
      tempTheme[theme] = generateMissingColors(themes[theme])

      let tempGenerated: GeneratedTheme = {}

      tempGenerated = generateTheme(tempTheme[theme])
      generatedOthers[`.theme-${theme}`] = tempGenerated.light
      generatedOthers[`.dark.theme-${theme}`] = tempGenerated.dark
    }
  }

  return {
    ':root': generatedTheme.light,
    '.dark': generatedTheme.dark,
    ...generatedOthers,
  }
}

export { getTheme, getThemeWithConfig }

