/**
 * 项目配置文件
 * 用于统一管理项目的基本信息和展示内容
 */

import type { AppConfig } from '~/type'

// 配置文件
const config: AppConfig = {
  // 项目基本信息
  project: {
    name: 'Sectum', // 项目名称（与 Header 中的 project-name 一致）
    description: 'A modern Vue 3 component library built with UnoCSS, featuring beautiful UI components and layouts', // 项目描述
    version: '0.3.5', // 项目版本
    homepage: 'github.com/Sorcech/Sectum', // 项目主页
    author: 'Cesar.Studio', // 作者
    keywords: ['vue3', 'unocss', 'component-library', 'ui', 'typescript', 'vite', 'modern', 'responsive', 'accessibility'], // 关键词
    license: 'MIT', // 许可证
    logoIcon: 'section' // Logo 图标名称（FontAwesome 图标名），用于设置 favicon
  },

  // 轮播图配置
  carousel: {
    autoplay: true, // 是否自动播放
    interval: 5000, // 自动播放间隔（毫秒）
    pauseOnHover: true, // 鼠标悬停时是否暂停
    height: '600px', // 轮播图高度
    slides: [
      {
        image: 'https://via.placeholder.com/1920x600/4A90E2/FFFFFF?text=Sectum+Banner+1', // 图片链接
        title: 'home.hero1.title', // 标题（支持国际化 key）
        description: 'home.hero1.description', // 描述（支持国际化 key）
        link: null // 链接（可选）
      },
      {
        image: 'https://via.placeholder.com/1920x600/E74C3C/FFFFFF?text=Sectum+Banner+2',
        title: 'home.hero2.title',
        description: 'home.hero2.description',
        link: null
      },
      {
        image: 'https://via.placeholder.com/1920x600/2ECC71/FFFFFF?text=Sectum+Banner+3',
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
    additionalInfo: 'MIT Licensed | Copyright © 2025-Present Sectum' // 额外信息
  },

  // 用户链接
  user: {
    profileLink: '/login' // 登录页面链接
  }
}

export default config

