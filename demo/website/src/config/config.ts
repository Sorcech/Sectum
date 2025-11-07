/**
 * 项目配置文件
 * 用于统一管理项目的基本信息和展示内容
 */

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

// 配置文件
const config: AppConfig = {
  // 项目基本信息
  project: { 
    name: 'Sectum', // 项目名称
    description: 'Sectum BAND WEB STATION', // 项目描述
    version: '0.0.1' // 项目版本
  },

  // 轮播图配置
  carousel: {
    autoplay: true, // 是否自动播放
    interval: 5000, // 自动播放间隔（毫秒）
    pauseOnHover: true, // 鼠标悬停时是否暂停
    height: '600px', // 轮播图高度
    slides: [
      {
        image: 'https://via.placeholder.com/1920x600/4A90E2/FFFFFF?text=Banner+1', // 图片链接
        title: 'home.hero1.title', // 标题（支持国际化 key）
        description: 'home.hero1.description', // 描述（支持国际化 key）
        link: null // 链接（可选）
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
    copyrightHolder: 'Sectum', // 版权持有者
    icpNumber: '京ICP备XXXXXXXX号', // ICP 备案号
    additionalInfo: '京ICP备XXXXXXXX号' // 额外信息
  },

  // 用户链接
  user: {
    profileLink: '/profile' // 用户中心链接
  }
}

export default config
