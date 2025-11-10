/**
 * 动态 Favicon 管理
 * 根据配置的图标名称自动设置页面 favicon
 */

import config from '~/config/config'

// Favicon 配置接口
export interface FaviconConfig {
  iconName?: string  // 图标名称（FontAwesome 图标名）
  iconPrefix?: string  // 图标前缀，默认 'fas' (solid)
  size?: number  // 图标尺寸，默认 32
}

/**
 * 构建图标 SVG
 */
function buildIconSVG(iconDefinition: any, size: number = 32): string {
  const icon = iconDefinition.icon
  if (!icon) return ''
  
  const viewBox = `0 0 ${icon[0]} ${icon[1]}`
  const iconElement = icon[4]
  
  let paths = ''
  if (Array.isArray(iconElement)) {
    // Duotone 图标（多个路径）
    iconElement.forEach((path: string) => {
      paths += `<path fill="currentColor" d="${path}"/>`
    })
  } else {
    // 普通图标（单个路径）
    paths = `<path fill="currentColor" d="${iconElement}"/>`
  }
  
  // 使用主题色（可以通过 CSS 变量控制）
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${size}" height="${size}">
    ${paths}
  </svg>`
}

/**
 * 设置 favicon
 * @param config Favicon 配置
 */
export async function setFavicon(config: FaviconConfig = {}): Promise<void> {
  const iconName = config.iconName
  if (!iconName) return
  
  try {
    // 等待 FontAwesome 加载
    if (typeof window === 'undefined' || !(window as any).FontAwesome) {
      // 如果 FontAwesome 未加载，等待一段时间后重试
      setTimeout(() => setFavicon(config), 100)
      return
    }
    
    const fa = (window as any).FontAwesome
    if (!fa || !fa.findIconDefinition) return
    
    // 确定图标前缀（默认使用 solid）
    const prefix = config.iconPrefix || 'fas'
    
    // 获取图标定义
    const iconDefinition = fa.findIconDefinition({ prefix, iconName })
    
    if (!iconDefinition || !iconDefinition.icon) return
    
    // 构建 SVG
    const svg = buildIconSVG(iconDefinition, config.size || 32)
    
    // 创建 data URI
    const dataUri = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
    
    // 查找或创建 favicon link
    let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement
    if (!faviconLink) {
      faviconLink = document.createElement('link')
      faviconLink.rel = 'icon'
      document.head.appendChild(faviconLink)
    }
    
    // 设置 favicon
    faviconLink.href = dataUri
    faviconLink.type = 'image/svg+xml'
  } catch (error) {
    console.warn('Failed to set dynamic favicon:', error)
  }
}

/**
 * 初始化 favicon（从全局配置中读取）
 * 如果 config.project 中有 logoIcon 配置，会自动设置
 */
export function initFavicon(): void {
  // 检查是否有全局配置的 logoIcon
  const logoIcon = (config as any).project?.logoIcon
  
  if (logoIcon) {
    setFavicon({
      iconName: logoIcon,
      iconPrefix: 'fas',
      size: 32
    })
  }
}

/**
 * 从配置对象中初始化 favicon
 * @param faviconConfig Favicon 配置对象
 */
export function initFaviconFromConfig(faviconConfig: FaviconConfig): void {
  if (faviconConfig.iconName) {
    setFavicon(faviconConfig)
  }
}

