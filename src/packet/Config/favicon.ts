/**
 * 动态 Favicon 管理
 * 根据配置的图标名称自动设置页面 favicon
 * 
 * 注意：外部项目使用时应传入配置参数，不要依赖默认配置导入
 */

// Favicon 配置接口
export interface FaviconConfig {
  iconName?: string  // 图标名称（FontAwesome 图标名）
  iconPrefix?: string  // 图标前缀，默认 'regular' (regular)
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
    if (!fa || !fa.findIconDefinition) {
      // FontAwesome 未完全加载，等待后重试
      setTimeout(() => setFavicon(config), 100)
      return
    }
    
    // 确定图标前缀（默认使用 regular）
    const prefix = config.iconPrefix || 'regular'
    
    // 检查请求的前缀是否已注册（等待样式注册完成）
    if (prefix && fa.styles && !fa.styles[prefix]) {
      // 如果请求的前缀还未注册，等待后重试
      setTimeout(() => setFavicon(config), 100)
      return
    }
    
    // 获取图标定义
    let iconDefinition = fa.findIconDefinition({ prefix, iconName })
    
    // 如果找不到指定前缀的图标，尝试回退到其他前缀
    if (!iconDefinition || !iconDefinition.icon) {
      // 尝试的前缀顺序：regular -> solid -> light -> thin -> duotone -> brands
      const fallbackPrefixes = ['regular', 'solid', 'light', 'thin', 'duotone', 'brands']
      const currentIndex = fallbackPrefixes.indexOf(prefix)
      
      // 从当前前缀的下一个开始尝试
      for (let i = currentIndex + 1; i < fallbackPrefixes.length; i++) {
        const fallbackPrefix = fallbackPrefixes[i]
        iconDefinition = fa.findIconDefinition({ prefix: fallbackPrefix, iconName })
        if (iconDefinition && iconDefinition.icon) {
          break
        }
      }
    }
    
    // 如果所有前缀都找不到，直接返回
    if (!iconDefinition || !iconDefinition.icon) {
      return
    }
    
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
 * 初始化 favicon（从配置中读取）
 * @param appConfig 配置对象（必需），包含 project.logoIcon 等信息
 */
export function initFavicon(appConfig: any): void {
  if (!appConfig) {
    console.warn('initFavicon: Config is required')
    return
  }
  
  // 检查是否有配置的 logoIcon
  const logoIcon = appConfig.project?.logoIcon
  
  if (logoIcon) {
    setFavicon({
      iconName: logoIcon,
      iconPrefix: 'regular',
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

/**
 * 设置页面标题
 * @param title 页面标题
 */
export function setPageTitle(title: string): void {
  if (typeof document !== 'undefined' && title) {
    document.title = title
  }
}

/**
 * 初始化页面元信息（favicon 和 title）
 * @param appConfig 配置对象（必需），包含 project.logoIcon 和 project.name 等信息
 */
export function initPageMeta(appConfig: any): void {
  if (!appConfig) {
    console.warn('initPageMeta: Config is required')
    return
  }
  
  // 设置页面标题
  const projectName = appConfig.project?.name
  if (projectName) {
    setPageTitle(projectName)
  }
  
  // 初始化 favicon
  initFavicon(appConfig)
}

