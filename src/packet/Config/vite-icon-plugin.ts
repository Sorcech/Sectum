import type { Plugin } from 'vite'

// 延迟加载 Node.js 模块的函数，避免在浏览器环境中执行
async function loadNodeModules() {
  if (typeof window !== 'undefined') {
    // 浏览器环境，不应该执行
    throw new Error('sectumIconLoader can only be used in Node.js environment (vite.config.ts)')
  }
  const fs = await import('node:fs')
  const path = await import('node:path')
  return { ...fs, ...path }
}

/**
 * Sectum Icon Loader Plugin
 * 自动将 /icon.js 请求映射到 node_modules/sectum/lib/icon.js
 * 
 * 注意：此插件只能在 Node.js 环境中使用（如在 vite.config.ts 中），不能在前端代码中使用。
 * 
 * @param projectRoot - 项目根目录路径，默认为 process.cwd()
 * @returns Vite 插件
 * 
 * @example
 * ```ts
 * import { defineConfig } from 'vite'
 * import { sectumIconLoader } from 'sectum'
 * 
 * export default defineConfig({
 *   plugins: [
 *     sectumIconLoader()
 *   ]
 * })
 * ```
 */
export function sectumIconLoader(projectRoot?: string): Plugin {
  // 使用立即执行的异步函数来初始化模块
  let nodeModules: Awaited<ReturnType<typeof loadNodeModules>> | null = null
  
  // 初始化 Node.js 模块（仅在服务端环境）
  const initNodeModules = async () => {
    if (!nodeModules) {
      nodeModules = await loadNodeModules()
    }
    return nodeModules
  }
  
  return {
    name: 'sectum-icon-loader',
    // 开发服务器：拦截 /icon.js 请求
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/icon.js') {
          try {
            const { readFileSync, existsSync, resolve } = await initNodeModules()
            const root = projectRoot || process.cwd()
            const iconPath = resolve(root, 'node_modules/sectum/lib/icon.js')
            
            if (existsSync(iconPath)) {
              const content = readFileSync(iconPath, 'utf-8')
              res.setHeader('Content-Type', 'application/javascript')
              res.setHeader('Cache-Control', 'public, max-age=31536000')
              res.end(content)
              return
            }
          } catch (error) {
            console.error('[sectum-icon-loader] Failed to read icon.js:', error)
          }
        }
        next()
      })
    },
    // 构建时：复制到 dist 目录
    async writeBundle(options) {
      try {
        const { copyFileSync, existsSync, resolve } = await initNodeModules()
        const root = projectRoot || process.cwd()
        const source = resolve(root, 'node_modules/sectum/lib/icon.js')
        const dest = resolve(root, options.dir || 'dist', 'icon.js')
        
        if (existsSync(source)) {
          copyFileSync(source, dest)
          console.log('[sectum-icon-loader] ✓ Copied icon.js to dist/')
        }
      } catch (error) {
        console.error('[sectum-icon-loader] Failed to copy icon.js:', error)
      }
    }
  }
}

