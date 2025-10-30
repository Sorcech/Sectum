import { definePreset } from 'unocss'
import type { Preset } from 'unocss'
import { getTheme } from './generator'

/**
 * Sectum Theme UnoCSS 预设
 */
const SectumTheme = definePreset((): Preset => {
  return {
    name: 'sectum-theme',
    preflights: [
      {
        getCSS: () => {
          // 添加基础样式
          let css = ''
          
          // 全局字体设置（本地字体优先，零网络请求）
          css += `* {\n`
          css += `  font-family: 'HarmonyOS Sans', 'HarmonyOS Sans SC', 'HarmonyOS Sans UI', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif;\n`
          css += `}\n\n`
          
          // 全局背景色设置，防止白框
          css += `html, body {\n`
          css += `  margin: 0;\n`
          css += `  padding: 0;\n`
          css += `  height: 100%;\n`
          css += `  background-color: var(--base-300);\n`
          css += `}\n\n`
          
          css += `#app {\n`
          css += `  height: 100%;\n`
          css += `  background-color: var(--base-300);\n`
          css += `}\n\n`
          
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

export default SectumTheme
