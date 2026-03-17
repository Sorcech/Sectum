// 导出 UnoCSS 配置
export { UnoConfig } from './uno.config'

// 注意：sectumIconLoader 仅用于 vite.config.ts（Node），不可从此处导出，否则会被前端打包并报错 node:path 等。
// 若需在 vite 配置中使用，请直接：import { sectumIconLoader } from '~/packet/Config/vite-icon-plugin'

// 导出 Favicon 和页面标题管理
export { setFavicon, initFavicon, initFaviconFromConfig, setPageTitle, initPageMeta } from './favicon'
export type { FaviconConfig } from './favicon'

// 导出配置说明
export const configInfo = {
  name: 'Sectum UI UnoCSS Configuration',
  version: '0.1.6',
  description: 'UnoCSS configuration for Sectum UI component library, including presets, rules, theme extensions, and safelist.',
  usage: `
    // In your uno.config.js / uno.config.ts:
    import { defineConfig } from 'unocss'
    import { UnoConfig } from '~/packet/Config'

    export default defineConfig({
      ...UnoConfig,
      // Your other configurations
    })
  `
}
