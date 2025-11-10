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
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import { UnoConfig } from './src/packet/Config'
import dts from 'vite-plugin-dts'

// 获取当前文件的目录路径（ES 模块中的 __dirname 替代方案）
const __dirname = dirname(fileURLToPath(import.meta.url))

// 开发环境服务 icon.js 的插件
const iconServerPlugin = (): Plugin => {
  return {
    name: 'icon-server',
    enforce: 'pre', // 确保在其他插件之前执行
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url === '/icon.js') {
          try {
            const iconPath = pathResolve(__dirname, 'src/packet/Element/Icon/icon.js')
            if (existsSync(iconPath)) {
              const content = readFileSync(iconPath, 'utf-8')
              res.setHeader('Content-Type', 'application/javascript')
              res.setHeader('Cache-Control', 'public, max-age=31536000')
              res.statusCode = 200
              res.end(content)
              return
            } else {
              console.error('[icon-server] icon.js not found at:', iconPath)
            }
          } catch (error) {
            console.error('[icon-server] Failed to serve icon.js:', error)
          }
        }
        next()
      })
    }
  }
}

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
      resolve: {alias: {'~/': `${resolve(dirname(fileURLToPath(import.meta.url)), 'src')}/`}},
      plugins: [
        UnoCSS({ configFile: false, ...UnoConfig } as any),
        VuePlugin({include: [/\.vue$/]}),
        // 生成 TypeScript 类型声明文件
        dts({
          outDir: 'lib',
          include: ['src/**/*.ts', 'src/**/*.vue'],
          exclude: [
            'src/**/*.md', 
            'src/**/route.ts', 
            'src/**/*.test.ts'
          ],
          copyDtsFiles: true,
          insertTypesEntry: true,
          logLevel: 'info',  // 日志级别：'silent' | 'error' | 'warn' | 'info'
          compilerOptions: {
            baseUrl: '.',
            paths: {'~/*': ['src/*']},
          }
        }),
        // 复制配置文件和 icon.js 到 lib 目录
        {
          name: 'copy-config',
          writeBundle() {
            console.log('[copy-config] Starting to copy files to lib/...')
            
            // 复制 uno.config.ts
            const configSource = pathResolve(__dirname, 'src/packet/Config/uno.config.ts')
            const configDest = pathResolve(__dirname, 'lib/uno.config.ts')
            if (existsSync(configSource)) {
              copyFileSync(configSource, configDest)
              console.log('[copy-config] ✓ Copied uno.config.ts to lib/')
            } else {
              console.warn('[copy-config] ⚠ uno.config.ts not found at:', configSource)
            }
            
            // 复制 icon.js
            const iconSource = pathResolve(__dirname, 'src/packet/Element/Icon/icon.js')
            const iconDest = pathResolve(__dirname, 'lib/icon.js')
            if (existsSync(iconSource)) {
              copyFileSync(iconSource, iconDest)
              console.log('[copy-config] ✓ Copied icon.js to lib/')
            } else {
              console.warn('[copy-config] ⚠ icon.js not found at:', iconSource)
            }
            
            // 自动生成全局组件类型声明文件到 lib 目录（重要：发布时自动执行）
            const globalDtsDest = pathResolve(__dirname, 'lib/global-components.d.ts')
            try {
              console.log('[copy-config] Analyzing component registrations...')
              
              // 定义要分析的模块
              const modules = [
                { path: 'src/packet/Element/index.ts', category: 'element', name: 'Element' },
                { path: 'src/packet/Pattern/index.ts', category: 'pattern', name: 'Pattern' },
                { path: 'src/packet/Section/index.ts', category: 'section', name: 'Section' },
                { path: 'src/packet/Model/index.ts', category: 'model', name: 'Model' },
                { path: 'src/packet/Layout/index.ts', category: 'layout', name: 'Layout' }
              ]
              
              const allComponents: Array<{
                registeredName: string
                exportName: string
                category: string
                isShortName: boolean
              }> = []
              
              // 分析每个模块
              for (const module of modules) {
                const modulePath = pathResolve(__dirname, module.path)
                if (!existsSync(modulePath)) {
                  console.warn(`[copy-config] ⚠ Module not found: ${module.path}`)
                  continue
                }
                
                const content = readFileSync(modulePath, 'utf-8')
                
                // 1. 提取所有导出的组件名称（支持多行和注释）
                const exportedComponents = new Set<string>()
                
                // 匹配 export { ... } 块（支持多行）
                const exportBlockRegex = /export\s*{\s*([\s\S]*?)\s*}/g
                let exportBlockMatch
                while ((exportBlockMatch = exportBlockRegex.exec(content)) !== null) {
                  const exportList = exportBlockMatch[1]
                  // 移除注释
                  const cleanList = exportList.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '')
                  // 分割并提取组件名
                  const componentNames = cleanList
                    .split(',')
                    .map(s => s.trim().split(/\s+/)[0])
                    .filter(name => name && name !== 'exportExcel' && name !== 'codePlugin' && !name.startsWith('type'))
                  
                  componentNames.forEach(name => {
                    exportedComponents.add(name)
                  })
                }
                
                // 2. 提取所有导入的组件变量名
                const importMap = new Map<string, string>() // 变量名 -> 组件名
                const importRegex = /import\s+(\w+)\s+from\s+['"][^'"]+['"]/g
                let importMatch
                while ((importMatch = importRegex.exec(content)) !== null) {
                  const varName = importMatch[1]
                  // 尝试从导入路径推断组件名，或使用变量名
                  const componentName = varName
                  importMap.set(varName, componentName)
                }
                
                // 3. 提取所有 app.component() 注册
                const componentRegex = /app\.component\(['"]([^'"]+)['"]\s*,\s*(\w+)/g
                let compMatch
                const registeredComponents = new Map<string, string>() // 注册名 -> 导出名
                
                while ((compMatch = componentRegex.exec(content)) !== null) {
                  const registeredName = compMatch[1]
                  const varName = compMatch[2]
                  
                  // 变量名通常就是导出名，直接使用变量名作为导出名
                  const exportName = varName
                  
                  // 只添加在导出列表中的组件（确保组件确实被导出）
                  if (exportedComponents.has(exportName)) {
                    registeredComponents.set(registeredName, exportName)
                    
                    // 判断是否为短名称（长度 <= 4 且全小写）
                    const isShortName = registeredName.length <= 4 && /^[a-z]+$/.test(registeredName)
                    
                    allComponents.push({
                      registeredName,
                      exportName,
                      category: module.category,
                      isShortName
                    })
                  }
                }
                
                console.log(`[copy-config]   Found ${registeredComponents.size} components in ${module.name}`)
              }
              
              // 按分类分组
              const grouped = allComponents.reduce((acc: Record<string, any[]>, comp: any) => {
                const cat = comp.category || 'other'
                if (!acc[cat]) acc[cat] = []
                acc[cat].push(comp)
                return acc
              }, {})
              
              // 生成类型声明内容
              const categoryNames: Record<string, string> = {
                element: 'Element',
                pattern: 'Pattern',
                section: 'Section',
                model: 'Model',
                layout: 'Layout'
              }
              
              let componentsDeclarations = ''
              
              // 按分类生成声明
              Object.keys(categoryNames).forEach(category => {
                if (!grouped[category] || grouped[category].length === 0) return
                
                const categoryName = categoryNames[category]
                const shortNames = grouped[category].filter((c: any) => c.isShortName)
                const fullNames = grouped[category].filter((c: any) => !c.isShortName)
                
                if (shortNames.length > 0) {
                  componentsDeclarations += `    // ${categoryName} 组件（短名称）\n`
                  shortNames.forEach((comp: any) => {
                    componentsDeclarations += `    ${comp.registeredName}: Sectum.${comp.exportName}\n`
                  })
                  componentsDeclarations += '\n'
                }
                
                if (fullNames.length > 0) {
                  componentsDeclarations += `    // ${categoryName} 组件${shortNames.length > 0 ? '（完整名称）' : ''}\n`
                  fullNames.forEach((comp: any) => {
                    componentsDeclarations += `    ${comp.registeredName}: Sectum.${comp.exportName}\n`
                  })
                  componentsDeclarations += '\n'
                }
              })
              
              const globalDtsContent = `/**
 * Sectum 全局组件类型声明
 * 此文件在构建时自动生成，声明所有全局注册的组件类型
 * 
 * 使用方式：在项目的 env.d.ts 中添加：
 * /// <reference types="sectum/global-components" />
 * 
 * 注意：此文件通过自动分析 src/packet 目录下各模块的 index.ts 中的组件注册代码生成
 * 无需手动维护，添加新组件后重新构建即可自动更新
 */

// 使用相对路径引用，构建时会自动解析为正确的路径
import type * as Sectum from './index'

declare module 'vue' {
  export interface GlobalComponents {
${componentsDeclarations.trimEnd()}
  }
}
`
              // 写入到 lib 目录
              writeFileSync(globalDtsDest, globalDtsContent, 'utf-8')
              console.log('[copy-config] ✓ Generated global-components.d.ts to lib/')
              console.log('[copy-config]   Total components:', allComponents.length)
              console.log('[copy-config]   Dest:', globalDtsDest)
            } catch (error) {
              console.error('[copy-config] ✗ Failed to generate global-components.d.ts:', error)
              throw error
            }
            
            console.log('[copy-config] All files copied successfully!')
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
      iconServerPlugin(), // 开发环境服务 icon.js
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
      }),
      // 构建时复制 icon.js 到 dist 目录
      {
        name: 'copy-icon',
        writeBundle() {
          const iconSource = pathResolve(__dirname, 'src/packet/Element/Icon/icon.js')
          const iconDest = pathResolve(__dirname, 'dist/icon.js')
          if (existsSync(iconSource)) {
            copyFileSync(iconSource, iconDest)
            console.log('[copy-icon] ✓ Copied icon.js to dist/')
          }
        }
      }
    ],
  }
})