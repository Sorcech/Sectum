// ==================== Config 相关类型 ====================

// 轮播图单页配置类型
export interface CarouselSlide {
  image: string  // 图片链接
  title: string  // 标题（支持国际化 key）
  description: string  // 描述（支持国际化 key）
  link: string | null  // 链接（可选）
}

// 轮播图配置类型
export interface CarouselConfig {
  autoplay: boolean  // 是否自动播放
  interval: number  // 自动播放间隔（毫秒）
  pauseOnHover: boolean  // 鼠标悬停时是否暂停
  height: string  // 轮播图高度
  slides: CarouselSlide[]  // 轮播图数据
}

// 项目基本信息类型
export interface ProjectInfo {
  name: string  // 项目名称
  description: string  // 项目描述
  version: string  // 项目版本
  homepage: string  // 项目主页
  author: string  // 作者
  keywords: string[]  // 关键词
  license: string  // 许可证
  logoIcon?: string  // Logo 图标名称（FontAwesome 图标名），用于设置 favicon
}

// 页脚配置类型
export interface FooterConfig {
  copyrightHolder: string  // 版权持有者
  icpNumber: string  // ICP 备案号
  additionalInfo: string  // 额外信息
}

// 用户配置类型
export interface UserConfig {
  profileLink: string  // 用户中心链接
}

// 完整配置类型
export interface AppConfig {
  project: ProjectInfo  // 项目基本信息
  carousel: CarouselConfig  // 轮播图配置
  footer: FooterConfig  // 页脚配置
  user: UserConfig  // 用户链接
}

