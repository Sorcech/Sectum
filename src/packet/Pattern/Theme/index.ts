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
          
          // 添加滚动条样式
          css += `\n/* scrollbar styles */\n`
          css += `html body::-webkit-scrollbar {\n`
          css += `  display: none;\n`
          css += `}\n\n`
          
          css += `html *::-webkit-scrollbar {\n`
          css += `  background: var(--base-300); /* Light模式：base-300轨道 */\n`
          css += `  width: 8px;\n`
          css += `  height: 8px;\n`
          css += `}\n\n`
          
          css += `html *::-webkit-scrollbar-track {\n`
          css += `  background: var(--base-300); /* Light模式：base-300轨道 */\n`
          css += `}\n\n`
          
          css += `html * {\n`
          css += `  scrollbar-width: thin;\n`
          css += `  scrollbar-color: #6b7280 var(--base-300); /* Firefox: 滑块颜色 轨道颜色 */\n`
          css += `}\n\n`
          
          css += `html *::-webkit-scrollbar-thumb {\n`
          css += `  transition: background 0.2s ease-in-out;\n`
          css += `  border: 2px solid transparent; /* 增加边框宽度以产生浮动效果 */\n`
          css += `  background: #6b7280; /* 深灰色滑块（在base-300轨道上可见） */\n`
          css += `  border-radius: 9999px;\n`
          css += `  background-clip: content-box; /* 让边框透明，产生浮动效果 */\n`
          css += `}\n\n`
          
          css += `html *::-webkit-scrollbar-thumb:hover {\n`
          css += `  background: #4b5563; /* hover 时更深的灰色 */\n`
          css += `}\n\n`
          
          css += `html *::-webkit-scrollbar-corner {\n`
          css += `  background: var(--base-300); /* 角落也使用base-300 */\n`
          css += `}\n\n`

          css += `/* Dark mode scrollbar */\n`
          css += `.dark html *::-webkit-scrollbar,\n`
          css += `.dark html *::-webkit-scrollbar-track,\n`
          css += `.dark html *::-webkit-scrollbar-corner {\n`
          css += `  background: var(--dark-base-300); /* 暗色模式：dark-base-300轨道 */\n`
          css += `}\n\n`
          
          css += `.dark html * {\n`
          css += `  scrollbar-color: #4b5563 var(--dark-base-300); /* Firefox 暗色模式 */\n`
          css += `}\n\n`
          
          css += `.dark html *::-webkit-scrollbar-thumb {\n`
          css += `  background: #4b5563; /* 暗色模式：稍亮的滑块 */\n`
          css += `}\n\n`
          
          css += `.dark html *::-webkit-scrollbar-thumb:hover {\n`
          css += `  background: #6b7280; /* 暗色模式 hover */\n`
          css += `}\n\n`
          
          css += `/* hidden-scrollbar utility class */\n`
          css += `.hidden-scrollbar {\n`
          css += `  -ms-overflow-style: none; /* IE and Edge */\n`
          css += `  scrollbar-width: none; /* Firefox */\n`
          css += `}\n\n`
          
          css += `.hidden-scrollbar::-webkit-scrollbar {\n`
          css += `  display: none; /* Chrome, Safari, Opera */\n`
          css += `}\n\n`
          
          // 输入框和文本域边框重置 - 确保纯色边框，无渐变
          css += `input, textarea {\n`
          css += `  border-style: solid;\n`
          css += `  border-image: none;\n`
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
          // 确保在有主题类（:class="[theme]"）的情况下，dark:bg-base-* 也能正确生效
          // 当元素同时拥有主题类时，主题类会覆盖 --base-* 变量为 light 模式值
          // 解决方案：使用 --dark-base-* 变量（由 generator.ts 自动生成），避免被主题类覆盖
          css += `/* Dark variant support for bg-base and border-base - use dark-base variables */\n`
          const themeNames = ['blue', 'teal', 'rose', 'violet', 'orange']
          const baseNumbers = ['100', '200', '300']
          
          for (const num of baseNumbers) {
            // 构建选择器列表，包含所有主题类的组合
            const selectors: string[] = [`.dark .dark\\:bg-base-${num}`]
            for (const theme of themeNames) {
              selectors.push(`.dark.theme-${theme} .dark\\:bg-base-${num}`)
            }
            css += `${selectors.join(',\n')} {\n`
            // 直接使用 --dark-base-* 变量，避免被主题类覆盖
            css += `  background-color: var(--dark-base-${num}) !important;\n`
            css += `}\n\n`
            
            // border 样式
            const borderSelectors: string[] = [`.dark .dark\\:border-base-${num}`]
            for (const theme of themeNames) {
              borderSelectors.push(`.dark.theme-${theme} .dark\\:border-base-${num}`)
            }
            css += `${borderSelectors.join(',\n')} {\n`
            // 直接使用 --dark-base-* 变量
            css += `  border-color: var(--dark-base-${num}) !important;\n`
            css += `}\n\n`
          }
          
 
          return css
        }
      }
    ],
    safelist: ['button', 'a', 'ul', 'li', 'input'],
  }
})

export default SectumTheme
