import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { UnoConfig, sectumIconLoader } from 'sectum'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(UnoConfig),
    // 自动将 /icon.js 链接到 node_modules/sectum/lib/icon.js
    sectumIconLoader()
  ]
})
