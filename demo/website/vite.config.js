import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { UnoConfig, sectumIconLoader } from 'sectum'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(UnoConfig),
    sectumIconLoader(), // 必须在最前面，确保优先执行
  ]
})
