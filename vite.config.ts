import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import VuePlugin from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import { autoWrapPlugin } from './src/packet/Pattern/Markdown/Markdown'
import { codePlugin } from './src/packet/Element/Code/Code'
import { resolve as pathResolve } from 'node:path'
import { copyFileSync, existsSync } from 'node:fs'
import { UnoConfig } from './src/packet/Config'

// 获取当前文件的目录路径（ES 模块中的 __dirname 替代方案）
const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  // 根据环境变量决定是否使用HTTPS
  const useHttps = process.env.VITE_HTTPS === 'true'
  
  // 定义 process 对象，解决 UnoCSS 在浏览器环境中的 process is not defined 错误
  const define = {
    'process.env': '{}',
    'process': '{}'
  }
  
  // 组件库构建配置
  if (mode === 'library') {
    return {
      define,
      build: {
        outDir: 'lib', // 组件库输出到 lib 目录
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
            if (id.includes('node:')) return true
            if (id.includes('fs')) return true
            if (id.includes('path')) return true
            if (id.includes('util')) return true
            if (id.includes('stream')) return true
            if (id.includes('child_process')) return true
            if (id.includes('readline')) return true
            if (id.includes('tinyexec')) return true
            if (id.includes('local-pkg')) return true
            if (id.includes('mlly')) return true
            if (id.includes('@antfu/install-pkg')) return true
            if (id.includes('pkg-types')) return true
            if (id.includes('package-manager-detector')) return true
            if (id.includes('@iconify/utils')) return true
            if (id.includes('store/')) return true  // 排除 store 目录
            return ['vue', 'vue-router'].includes(id)
          },
          onwarn(warning, warn) {
            // 忽略 CSS Tree 的重新导出警告
            if (warning.code === 'AMBIGUOUS_EXTERNAL_NAMESPACE_RESOLUTION') {
              return
            }
            // 忽略未使用的导入警告
            if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
              return
            }
            warn(warning)
          },
          output: {
            exports: 'named',
            globals: {
              vue: 'Vue',
              'vue-router': 'VueRouter',
              '@unocss/rule-utils': 'ruleUtils',
              '@unocss/preset-mini/utils': 'presetMiniUtils'
            },
            // 在输出时添加 process 对象定义
            intro: `
              // 定义 process 对象，解决 UnoCSS 在浏览器环境中的 process is not defined 错误
              if (typeof process === 'undefined') {
                window.process = { env: {} };
                globalThis.process = { env: {} };
              }
            `
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
        UnoCSS({ configFile: false, ...UnoConfig } as any),
        VuePlugin({
          include: [/\.vue$/],
        }),
        // 复制配置文件到 lib 目录
        {
          name: 'copy-config',
          writeBundle() {
            const configSource = 'src/packet/Config/uno.config.ts'
            const configDest = 'lib/uno.config.ts'
            if (existsSync(configSource)) {
              copyFileSync(configSource, configDest)
            }
          }
        }
      ],
    }
  }
  
  // 网页构建配置（非 library 模式）
  return {
    define,
    base: mode === 'production' ? './' : '/', // 生产模式使用相对路径，开发模式使用绝对路径
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
      outDir: 'dist', // 网页版本输出到 dist 目录
      assetsDir: 'assets',
      sourcemap: false, // 生产环境不生成 sourcemap，减小体积
      minify: 'terser', // 使用 terser 压缩
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // 手动分割代码块，优化加载性能
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'vue-i18n'],
            'markdown-vendor': ['unplugin-vue-markdown', 'markdown-it'],
          }
        },
        onwarn(warning, warn) {
          // 忽略 Node.js 模块外部化的警告（这些模块只被构建时插件使用，不应该出现在最终 bundle 中）
          if (warning.code === 'EXTERNALIZED_MODULE') {
            return
          }
          // 忽略无法解析的 Node.js 内置模块（它们只被构建时插件使用）
          if (warning.code === 'UNRESOLVED_IMPORT' && (
            warning.id?.startsWith('node:') ||
            warning.id === 'fs' || warning.id === 'path' || warning.id === 'util' ||
            warning.id === 'stream' || warning.id === 'child_process' || warning.id === 'readline' ||
            warning.id?.includes('tinyexec') || warning.id?.includes('local-pkg') ||
            warning.id?.includes('mlly') || warning.id?.includes('@antfu/install-pkg') ||
            warning.id?.includes('pkg-types') || warning.id?.includes('package-manager-detector') ||
            warning.id?.includes('@iconify/utils')
          )) {
            return
          }
          warn(warning)
        }
      },
      commonjsOptions: {
        // 排除这些 Node.js 专用的模块，它们不应该被打包
        exclude: [
          'tinyexec',
          'local-pkg',
          'mlly',
          '@antfu/install-pkg',
          'pkg-types',
          'package-manager-detector',
          '@iconify/utils'
        ]
      },
      //copyPublicDir: false// 忽略 public 文件夹，不复制到 dist 目录
    },
    resolve: {
      alias: {
        '~/': `${resolve(dirname(fileURLToPath(import.meta.url)), 'src')}/`,
        // 在生产构建时，将 Node.js 专用模块替换为虚拟模块（这些模块只被构建时插件使用，不应该出现在最终 bundle 中）
        ...(mode === 'production' ? {
          'tinyexec': pathResolve(__dirname, 'vite.virtual.empty.js'),
          'local-pkg': pathResolve(__dirname, 'vite.virtual.empty.js'),
          'mlly': pathResolve(__dirname, 'vite.virtual.empty.js'),
          '@antfu/install-pkg': pathResolve(__dirname, 'vite.virtual.empty.js'),
          'pkg-types': pathResolve(__dirname, 'vite.virtual.empty.js'),
          'package-manager-detector': pathResolve(__dirname, 'vite.virtual.empty.js'),
          '@iconify/utils/lib/loader/fs': pathResolve(__dirname, 'vite.virtual.empty.js'),
          '@iconify/utils/lib/loader/install-pkg': pathResolve(__dirname, 'vite.virtual.empty.js'),
          // 也替换 @iconify/utils 使用的其他依赖
          '@antfu/utils': pathResolve(__dirname, 'vite.virtual.empty.js'),
          'kolorist': pathResolve(__dirname, 'vite.virtual.empty.js'),
          // 替换 Node.js 内置模块 fs（包含 promises API）
          'fs': pathResolve(__dirname, 'vite.virtual.empty.js'),
          'fs/promises': pathResolve(__dirname, 'vite.virtual.empty.js'),
        } : {}),
      },
    },
    plugins: [
      UnoCSS({ configFile: false, ...UnoConfig } as any), // UnoCSS插件，使用配置
      autoWrapPlugin(), // 自动包装Markdown文件
      VuePlugin({
        include: [/\.vue$/, /\.md$/],
      }),
      Markdown({
        // 自定义代码块渲染
        markdownItSetup(md) {
          // 覆盖代码块的渲染函数
          md.renderer.rules.fence = (tokens, idx, options, env, self) => {
            const token = tokens[idx]
            const info = token.info ? token.info.trim() : ''
            const langName = info.split(/\s+/g)[0]
            const code = token.content
            
            // 转义 HTML 特殊字符，保持代码的原始格式（包括换行和缩进）
            const escapedCode = code
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;')
            
            // 使用普通属性传递代码，Vue 会自动处理字符串
            // 使用 v-text 或直接在组件内部处理
            return `<cod code="${escapedCode}" ${langName ? `language="${langName}"` : ''} :trim="false"></cod>\n`
          }
          
          // 覆盖行内代码的渲染函数
          md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
            const token = tokens[idx]
            const code = token.content.trim()
            
            // 转义 HTML 特殊字符
            const escapedCode = code
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;')
            
            // 对于行内代码，直接使用 HTML code 标签，不转换为 Vue 组件
            // 这样可以确保在表格单元格中也能正常渲染
            return `<code class="inline-code">${escapedCode}</code>`
          }
        }
      }),// 移除wrapperComponent，因为我们使用自定义的auto-wrap-plugin
      codePlugin(), // Code组件插件，将pre和code转换为Code组件（必须在Markdown之后）
      Components({
        resolvers: [ElementPlusResolver()],
        include: [/\.vue$/, /\.vue\?vue/],
      })
    ],
  }
})