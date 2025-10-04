import { brighten, mostReadable } from './color'
import { colorNames, themes } from './theme'
interface Theme { [key: string]: string }
interface GeneratedTheme { [key: string]: { [key: string]: string } }
const defaultTheme = 'blue'


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

export { getTheme }

