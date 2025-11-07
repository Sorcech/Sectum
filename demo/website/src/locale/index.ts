import { createI18n } from 'vue-i18n'

const messages = {
  'zh-CN': {
    theme: {
      blue: '蓝色',
      teal: '青色',
      rose: '玫瑰色',
      violet: '紫色',
      orange: '橙色'
    },
    nav: {
      home: '首页',
      product: '产品',
      solution: '方案',
      service: '服务',
      about: '关于'
    },
    footer: {
      product: '产品',
      solution: '解决方案',
      service: '服务支持',
      about: '关于我们',
      productSelection: '产品选型',
      electricRoller: '电动辊筒',
      drivenRoller: '从动辊筒',
      driveModule: '驱动模块',
      gatewayModule: '网关模块',
      enterpriseSolution: '企业方案',
      smbSolution: '中小企业方案',
      support: '技术支持',
      training: '培训服务',
      maintenance: '维护服务',
      companyIntro: '公司简介',
      contact: '联系我们'
    },
    home: {
      hero1: {
        title: '创新驱动，引领未来',
        description: '为您提供专业的工业自动化解决方案，助力企业数字化转型'
      },
      hero2: {
        title: '高质量产品，值得信赖',
        description: '多年行业经验，为全球客户提供优质的产品和服务'
      },
      hero3: {
        title: '专业团队，全程支持',
        description: '7x24小时技术支持，确保您的系统稳定运行'
      },
      learnMore: '了解更多',
      features: '产品特色',
      featuresDesc: '我们的产品具有以下核心优势',
      feature1: {
        title: '高性能',
        desc: '采用最新技术，提供卓越的性能表现'
      },
      feature2: {
        title: '高可靠性',
        desc: '经过严格测试，确保产品质量和稳定性'
      },
      feature3: {
        title: '易维护',
        desc: '设计简洁，易于维护和升级'
      },
      stat1: '客户',
      stat2: '国家',
      stat3: '支持',
      stat4: '满意度',
      solutions: '解决方案',
      solutionsDesc: '为不同规模的企业提供定制化解决方案',
      solution1: {
        title: '企业级解决方案',
        desc: '为大型企业提供完整的工业自动化解决方案，满足复杂业务需求'
      },
      solution2: {
        title: '中小企业方案',
        desc: '经济实用的解决方案，快速部署，助力中小企业快速发展'
      },
      ctaTitle: '准备开始了吗？',
      ctaDesc: '联系我们，获取专业的咨询和解决方案',
      viewProducts: '查看产品',
      contactUs: '联系我们'
    }
  },
  'en-US': {
    theme: {
      blue: 'Blue',
      teal: 'Teal',
      rose: 'Rose',
      violet: 'Violet',
      orange: 'Orange'
    },
    nav: {
      home: 'Home',
      product: 'Product',
      solution: 'Solution',
      service: 'Service',
      about: 'About'
    },
    footer: {
      product: 'Product',
      solution: 'Solutions',
      service: 'Service Support',
      about: 'About Us',
      productSelection: 'Product Selection',
      electricRoller: 'Electric Roller',
      drivenRoller: 'Driven Roller',
      driveModule: 'Drive Module',
      gatewayModule: 'Gateway Module',
      enterpriseSolution: 'Enterprise Solution',
      smbSolution: 'SMB Solution',
      support: 'Technical Support',
      training: 'Training Service',
      maintenance: 'Maintenance Service',
      companyIntro: 'Company Introduction',
      contact: 'Contact Us'
    },
    home: {
      hero1: {
        title: 'Innovation Driven, Leading the Future',
        description: 'Providing professional industrial automation solutions to help enterprises with digital transformation'
      },
      hero2: {
        title: 'High Quality Products, Trustworthy',
        description: 'Years of industry experience, providing quality products and services to global customers'
      },
      hero3: {
        title: 'Professional Team, Full Support',
        description: '7x24 hours technical support to ensure your system runs smoothly'
      },
      learnMore: 'Learn More',
      features: 'Product Features',
      featuresDesc: 'Our products have the following core advantages',
      feature1: {
        title: 'High Performance',
        desc: 'Using the latest technology to deliver outstanding performance'
      },
      feature2: {
        title: 'High Reliability',
        desc: 'Rigorously tested to ensure product quality and stability'
      },
      feature3: {
        title: 'Easy Maintenance',
        desc: 'Simple design, easy to maintain and upgrade'
      },
      stat1: 'Customers',
      stat2: 'Countries',
      stat3: 'Support',
      stat4: 'Satisfaction',
      solutions: 'Solutions',
      solutionsDesc: 'Providing customized solutions for enterprises of different scales',
      solution1: {
        title: 'Enterprise Solution',
        desc: 'Complete industrial automation solutions for large enterprises to meet complex business needs'
      },
      solution2: {
        title: 'SMB Solution',
        desc: 'Cost-effective solutions, rapid deployment, helping small and medium enterprises grow fast'
      },
      ctaTitle: 'Ready to Get Started?',
      ctaDesc: 'Contact us for professional consultation and solutions',
      viewProducts: 'View Products',
      contactUs: 'Contact Us'
    }
  }
}

const i18n = createI18n({
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  legacy: false,
  messages
})

export default i18n
