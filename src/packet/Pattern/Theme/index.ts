import { definePreset } from 'unocss'
import type { Preset } from 'unocss'
import { getTheme } from './generateTheme'

/**
 * Section Theme UnoCSS 预设
 */
const SectionTheme = definePreset((): Preset => {
  return {
    name: 'section-theme',
    preflights: [
      {
        getCSS: () => {
          // 添加基础样式
          let css = ''
          // 添加主题CSS变量
          const theme = getTheme()
          for (const [selector, variables] of Object.entries(theme)) {
            css += `${selector} {\n`
            for (const [property, value] of Object.entries(variables)) {
              css += `  ${property}: ${value};\n`
            }
            css += `}\n`
          }   
          return css
        }
      }
    ],
    safelist: ['button', 'a', 'ul', 'li', 'input'],
  }
})

export default SectionTheme
