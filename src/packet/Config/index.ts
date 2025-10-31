// 导出 UnoCSS 配置
export { UnoConfig } from './uno.config'

// 导出配置说明
export const configInfo = {
  name: 'Sectum UI UnoCSS Configuration',
  version: '0.1.6',
  description: 'UnoCSS configuration for Sectum UI component library, including presets, rules, theme extensions, and safelist.',
  usage: `
    // In your uno.config.js:
    import { defineConfig } from 'unocss'
    import { UnoConfig } from 'sectum/dist/uno.config.js' // For JS projects

    export default defineConfig({
      ...UnoConfig,
      // Your other configurations
    })

    // In your uno.config.ts (for internal development or TS projects):
    import { defineConfig } from 'unocss'
    import { UnoConfig } from 'sectum/src/packet/Config' // For TS projects

    export default defineConfig({
      ...UnoConfig,
      // Your other configurations
    })
  `
}
