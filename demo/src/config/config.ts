/**
 * 项目配置文件
 * 用于统一管理项目的基本信息和展示内容
 */

// 轮播图单页配置类型
export interface CarouselSlide {
  // 图片链接
  image: string
  // 标题（支持国际化 key）
  title: string
  // 描述（支持国际化 key）
  description: string
  // 链接（可选）
  link: string | null
}

// 轮播图配置类型
export interface CarouselConfig {
  // 是否自动播放
  autoplay: boolean
  // 自动播放间隔（毫秒）
  interval: number
  // 鼠标悬停时是否暂停
  pauseOnHover: boolean
  // 轮播图高度
  height: string
  // 轮播图数据
  slides: CarouselSlide[]
}

// 项目基本信息类型
export interface ProjectInfo {
  // 项目名称
  name: string
  // 项目描述
  description: string
  // 项目版本
  version: string
}

// 页脚配置类型
export interface FooterConfig {
  // 版权持有者
  copyrightHolder: string
  // ICP 备案号
  icpNumber: string
  // 额外信息
  additionalInfo: string
}

// 用户配置类型
export interface UserConfig {
  // 用户中心链接
  profileLink: string
}

// 完整配置类型
export interface AppConfig {
  // 项目基本信息
  project: ProjectInfo
  // 轮播图配置
  carousel: CarouselConfig
  // 页脚配置
  footer: FooterConfig
  // 用户链接
  user: UserConfig
}

// 配置文件
const config: AppConfig = {
  // 项目基本信息
  project: {
    // 项目名称
    name: 'ROTOЯ',
    // 项目描述
    description: 'ROTOR BAND WEB STATION',
    // 项目版本
    version: '0.0.1'
  },

  // 轮播图配置
  carousel: {
    // 是否自动播放
    autoplay: true,
    // 自动播放间隔（毫秒）
    interval: 5000,
    // 鼠标悬停时是否暂停
    pauseOnHover: true,
    // 轮播图高度
    height: '600px',
    // 轮播图数据
    slides: [
      {
        // 图片链接
        image: 'https://via.placeholder.com/1920x600/4A90E2/FFFFFF?text=Banner+1',
        // 标题（支持国际化 key）
        title: 'home.hero1.title',
        // 描述（支持国际化 key）
        description: 'home.hero1.description',
        // 链接（可选）
        link: null
      },
      {
        image: 'https://via.placeholder.com/1920x600/E74C3C/FFFFFF?text=Banner+2',
        title: 'home.hero2.title',
        description: 'home.hero2.description',
        link: null
      },
      {
        image: 'https://via.placeholder.com/1920x600/2ECC71/FFFFFF?text=Banner+3',
        title: 'home.hero3.title',
        description: 'home.hero3.description',
        link: null
      }
    ]
  },

  // 页脚配置
  footer: {
    // 版权持有者
    copyrightHolder: 'ROTOЯ',
    // ICP 备案号
    icpNumber: '京ICP备XXXXXXXX号',
    // 额外信息
    additionalInfo: '京ICP备XXXXXXXX号'
  },

  // 用户链接
  user: {
    // 用户中心链接
    profileLink: '/profile'
  }
}

export default config
