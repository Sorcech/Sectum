import type { Plugin } from 'vite'
import { resolve as pathResolve } from 'node:path'

async function loadNodeModules() {
  if (typeof window !== 'undefined') {
    throw new Error('sectumIconLoader can only be used in Node.js environment (vite.config.ts)')
  }
  const fs = await import('node:fs')
  return { ...fs }
}

/**
 * Cumulu Icon Loader Plugin
 * 将 /icon.js 请求映射到项目 src/packet/Element/Icon/icon.js（与 Sectum 已分离）
 *
 * @param projectRoot - 项目根目录路径，默认为 process.cwd()
 * @returns Vite 插件
 */
export function sectumIconLoader(projectRoot?: string): Plugin {
  let nodeModules: Awaited<ReturnType<typeof loadNodeModules>> | null = null
  const initNodeModules = async () => {
    if (!nodeModules) nodeModules = await loadNodeModules()
    return nodeModules
  }
  const getIconPath = (root: string) => pathResolve(root, 'src/packet/Element/Icon/icon.js')

  return {
    name: 'cumulu-icon-loader',
    enforce: 'pre',
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          const url = req.url?.split('?')[0]
          if (url === '/icon.js') {
            try {
              const { readFileSync, existsSync } = await initNodeModules()
              const root = projectRoot || process.cwd()
              const iconPath = getIconPath(root)
              if (existsSync(iconPath)) {
                const content = readFileSync(iconPath, 'utf-8')
                res.setHeader('Content-Type', 'application/javascript')
                res.setHeader('Cache-Control', 'public, max-age=31536000')
                res.statusCode = 200
                res.end(content)
                return
              }
            } catch (e) {
              console.error('[cumulu-icon-loader] Failed to serve icon.js:', e)
            }
          }
          next()
        })
      }
    },
    async writeBundle(options) {
      try {
        const { copyFileSync, existsSync } = await initNodeModules()
        const root = projectRoot || process.cwd()
        const source = getIconPath(root)
        const dest = pathResolve(root, options.dir || 'dist', 'icon.js')
        if (existsSync(source)) {
          copyFileSync(source, dest)
        }
      } catch (e) {
        console.error('[cumulu-icon-loader] Failed to copy icon.js:', e)
      }
    }
  }
}

