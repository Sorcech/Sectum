import { presetUno } from 'unocss'
import SectumTheme from '../Pattern/Theme'

// 定义规则函数的参数类型
type RuleParams = [string, string, string?]

export const UnoConfig = {
  presets: [
    presetUno(),
    SectumTheme,
  ],

  rules: [
    // 自定义颜色规则 - 处理项目特有的颜色名
    [/^bg-(primary|secondary|success|warning|error)$/, ([, color]: RuleParams) => {
      return { 'background-color': `var(--${color})` }
    }],
    [/^bg-(primary|secondary|success|warning|error)-focus$/, ([, color]: RuleParams) => {
      return { 'background-color': `var(--${color}-focus)` }
    }],
    [/^text-(primary|secondary|success|warning|error)$/, ([, color]: RuleParams) => {
      return { 'color': `var(--${color})` }
    }],
    [/^text-(primary|secondary|success|warning|error)-content$/, ([, color]: RuleParams) => {
      return { 'color': `var(--${color}-content)` }
    }],
    [/^border-(primary|secondary|success|warning|error)$/, ([, color]: RuleParams) => {
      return { 'border-color': `var(--${color})` }
    }],
    [/^border-(primary|secondary|success|warning|error)-focus$/, ([, color]: RuleParams) => {
      return { 'border-color': `var(--${color}-focus)` }
    }],
    // 透明度支持
    [/^bg-(primary|secondary|success|warning|error)\/([0-9]+)$/, ([, color, opacity]: RuleParams) => {
      return { 'background-color': `rgba(var(--${color}), ${parseInt(opacity!) / 100})` }
    }],
    [/^text-(primary|secondary|success|warning|error)\/([0-9]+)$/, ([, color, opacity]: RuleParams) => {
      return { 'color': `rgba(var(--${color}), ${parseInt(opacity!) / 100})` }
    }],
    // 阴影规则
    [/^shadow-(primary|secondary|success|warning|error)\/([0-9]+)$/, ([, color, opacity]: RuleParams) => {
      return { 'box-shadow': `0 4px 6px -1px rgba(var(--${color}), ${parseInt(opacity!) / 100})` }
    }],
    // 悬停状态支持 - UnoCSS 会自动处理 hover: 前缀
    [/^hover:bg-(primary|secondary|success|warning|error)$/, ([, color]: RuleParams) => {
      return { 'background-color': `var(--${color})` }
    }],
    [/^hover:bg-(primary|secondary|success|warning|error)-focus$/, ([, color]: RuleParams) => {
      return { 'background-color': `var(--${color}-focus)` }
    }],
    [/^hover:text-(primary|secondary|success|warning|error)$/, ([, color]: RuleParams) => {
      return { 'color': `var(--${color})` }
    }],
    [/^hover:text-(primary|secondary|success|warning|error)-content$/, ([, color]: RuleParams) => {
      return { 'color': `var(--${color}-content)` }
    }],
    // Base 颜色规则
    [/^bg-base-(\d+)$/, ([, num]: RuleParams) => {
      return { 'background-color': `var(--base-${num})` }
    }],
    [/^bg-dark-base-(\d+)$/, ([, num]: RuleParams) => {
      return { 'background-color': `var(--dark-base-${num})` }
    }],
    [/^text-base-(\d+)$/, ([, num]: RuleParams) => {
      return { 'color': `var(--base-${num})` }
    }],
    [/^text-dark-base-(\d+)$/, ([, num]: RuleParams) => {
      return { 'color': `var(--dark-base-${num})` }
    }],
    [/^color-base-content$/, () => {
      return { 'color': `var(--base-content)` }
    }],
    [/^color-dark-base-content$/, () => {
      return { 'color': `var(--dark-base-content)` }
    }],
    [/^border-base-(\d+)$/, ([, num]: RuleParams) => {
      return { 'border-color': `var(--base-${num})` }
    }],
    [/^border-dark-base-(\d+)$/, ([, num]: RuleParams) => {
      return { 'border-color': `var(--dark-base-${num})` }
    }],
    [/^text-base-content$/, () => {
      return { 'color': `var(--base-content)` }
    }],
    [/^text-dark-base-content$/, () => {
      return { 'color': `var(--dark-base-content)` }
    }],
  ],

  theme: {
    fontFamily: {
      'harmony': '"HarmonyOS Sans", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
      'sans': '"HarmonyOS Sans", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    },
    borderRadius: {
      '$rounded-box': 'var(--rounded-box)',
      '$rounded-btn': 'var(--rounded-btn)', 
      '$rounded-badge': 'var(--rounded-badge)',
    }
  },
  
  content: {
    pipeline: {
      include: [
        /\.(vue|js|ts)($|\?)/,
        'src/**/*.html'
      ]
    }
  },
  
  // 智能生成 safelist - 基于组件中实际使用的颜色和变体
  safelist: (() => {
    const colors = ['primary', 'secondary', 'success', 'warning', 'error']
    const variants = ['', '-focus']
    const states = ['', 'hover:']
    const types = ['bg', 'text', 'border']
    const contentTypes = ['', '-content']
    const opacityVariants = ['/5', '/10', '/15']
    const classes = []
    
    // 生成所有可能的类名组合
    for (const color of colors) {
      for (const variant of variants) {
        for (const state of states) {
          for (const type of types) {
            for (const contentType of contentTypes) {
              if (type === 'text' && contentType === '-content') {
                classes.push(`${state}${type}-${color}${contentType}`)// text-{color}-content
              } else if (type === 'text' && contentType === '') {             
                classes.push(`${state}${type}-${color}`)// text-{color}
              } else if (type !== 'text' && variant === '') {
                classes.push(`${state}${type}-${color}`)                // bg-{color}, border-{color}
              } else if (type !== 'text' && variant === '-focus') {
                classes.push(`${state}${type}-${color}${variant}`)                // bg-{color}-focus, border-{color}-focus
              }
            }
          }
        }
      }
    }
    
    // 添加透明度变体类名
    for (const color of colors) {
      for (const opacity of opacityVariants) {
        classes.push(`bg-${color}${opacity}`)
        classes.push(`hover:bg-${color}${opacity}`)
      }
    }
    
    // 添加阴影类
    for (const color of colors) {
      classes.push(`shadow-${color}/15`)
    }
    
    // 添加边框变体
    for (const color of colors) {
      classes.push(`border-2`, `border-${color}`, `border-solid`)
    }
    
    // 添加 base 颜色类
    const baseNumbers = ['100', '200', '300']
    for (const num of baseNumbers) {
      classes.push(`bg-base-${num}`, `bg-dark-base-${num}`, `text-base-${num}`, `text-dark-base-${num}`, `border-base-${num}`, `border-dark-base-${num}`)
    }
    classes.push('color-base-content', 'color-dark-base-content')
    
    // 添加表格相关的边框类
    classes.push('border-2', 'border-collapse', 'border-solid')
    
    // 添加字体相关类
    classes.push('font-harmony', 'font-sans', 'font-mono')
    
    // 添加动画类
    const animationClasses = ['animate-bounce', 'animate-pulse', 'animate-spin', 'opacity-50']
    classes.push(...animationClasses)
    
    // 添加透明度类
    for (let i = 10; i <= 100; i += 10) {
      classes.push(`opacity-${i}`)
    }
    
    return classes
  })(),
}
