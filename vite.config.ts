import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import VuePlugin from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import { createAutoWrapPlugin } from './src/packet/Pattern/Markdown/auto-wrap-plugin'
import { resolve as pathResolve } from 'path'

export default defineConfig(({ mode }) => {
  // 根据环境变量决定是否使用HTTPS
  const useHttps = process.env.VITE_HTTPS === 'true'
  
  // 组件库构建配置
  if (mode === 'library') {
    return {
      build: {
        lib: {
          entry: pathResolve(__dirname, 'src/index.ts'),
          name: 'Sectum',
          fileName: (format) => `sectum.${format}.js`,
          formats: ['es', 'umd']
        },
        rollupOptions: {
          // 排除 markdown 文件、路由配置和外部依赖
          external: (id) => {
            if (id.includes('.md')) return true
            return ['vue', 'vue-router'].includes(id)
          },
          output: {
            exports: 'named',
            globals: {
              vue: 'Vue',
              'vue-router': 'VueRouter'
            }
          }
        },
        cssCodeSplit: false,
        sourcemap: true,
        minify: 'terser'
      },
      resolve: {
        alias: {
          '~/': `${resolve(dirname(fileURLToPath(import.meta.url)), 'src')}/`,
        },
      },
      plugins: [
        UnoCSS(),
        VuePlugin({
          include: [/\.vue$/],
        }),
      ],
    }
  }
  
  // 开发环境配置
  return {
    server: {
      ...(useHttps ? {
        https: {
          // 使用更兼容的SSL配置
          minVersion: 'TLSv1.2',
          maxVersion: 'TLSv1.3',
        }
      } : {}),
      port: 3000,
      open: true,
      host: 'localhost',
      // 添加CORS配置
      cors: true
    },
    build: {
      chunkSizeWarningLimit: 1000,
      //copyPublicDir: false// 忽略 public 文件夹，不复制到 dist 目录
    },
    resolve: {
      alias: {
        '~/': `${resolve(dirname(fileURLToPath(import.meta.url)), 'src')}/`,
      },
    },
    plugins: [
      UnoCSS(), // UnoCSS插件
      createAutoWrapPlugin(), // 自动包装Markdown文件
      VuePlugin({
        include: [/\.vue$/, /\.md$/],
      }),
      Markdown({}),// 移除wrapperComponent，因为我们使用自定义的auto-wrap-plugin
      Components({
        resolvers: [ElementPlusResolver()],
        include: [/\.vue$/, /\.vue\?vue/],
      })
    ],
  }
})