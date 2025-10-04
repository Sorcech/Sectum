// 主题颜色名称列表
export const colorNames = [
  'primary',
  'primary-focus',
  'primary-content',
  'secondary',
  'secondary-focus',
  'secondary-content',
  'accent',
  'accent-focus',
  'accent-content',
  'success',
  'success-focus',
  'success-content',
  'error',
  'error-focus',
  'error-content',
  'warning',
  'warning-focus',
  'warning-content',
  'base-100',
  'base-200',
  'base-300',
  'base-content',
  'dark-base-100',
  'dark-base-200',
  'dark-base-300',
  'dark-base-content',
]

// 主题配置
const themes = {
  blue: {
    'default': '#1f2937',//gray-800
    'default-focus': '#111827',//gray-900
    'default-content': '#ffffff',
    'primary': '#2563eb',//blue-600
    'primary-focus': '#1d4ed8',//blue-700
    'primary-content': '#ffffff',
    'secondary': '#374151',//gray-700
    'secondary-focus': '#1f2937',//gray-800
    'secondary-content': '#ffffff',
    'accent': '#fef3c7',//yellow-100
    'accent-focus': '#fde68e',//yellow-200
    'accent-content': '#ffffff',
    'success': '#059669',//green-600
    'success-focus': '#047857',//green-700
    'success-content': '#ffffff',
    'warning': '#f97316',//orange-500
    'warning-focus': '#ea580c',//orange-600
    'warning-content': '#ffffff',
    'error': '#dc2626',//red-600
    'error-focus': '#b91c1c',//red-700
    'error-content': '#ffffff',
    'base-100': '#fcfcfc',
    'base-200': '#f8f8f8',
    'base-300': '#e8e8e8',
    'base-content': '#1f2937',//gray-800
    'dark-base-100': '#374151',//gray-700
    'dark-base-200': '#1f2937',//gray-800
    'dark-base-300': '#111827',//gray-900
    'dark-base-content': '#f9fafb',//gray-50
    'rounded-box': '0.5rem',
    'rounded-btn': '0.5rem',
    'rounded-badge': '2.0rem',
  },

  teal: {
    'primary': '#0d9488',//teal-600
    'primary-focus': '#0f766e',//teal-700
    'primary-content': '#ffffff',
    'secondary': '#374151',//gray-700
    'secondary-focus': '#1f2937',//gray-800
    'secondary-content': '#ffffff',
    'accent': '#fef3c7',//yellow-100
    'accent-focus': '#fde68e',//yellow-200
    'accent-content': '#ffffff',
    'default': '#1f2937',//gray-800
    'default-focus': '#111827',//gray-900
    'default-content': '#ffffff',
    'success': '#059669',//green-600
    'success-focus': '#047857',//green-700
    'success-content': '#ffffff',
    'warning': '#f97316',//orange-500
    'warning-focus': '#ea580c',//orange-600
    'warning-content': '#ffffff',
    'error': '#dc2626',//red-600
    'error-focus': '#b91c1c',//red-700
    'error-content': '#ffffff',
    'base-100': '#fcfcfc',
    'base-200': '#f8f8f8',
    'base-300': '#e8e8e8',
    'base-content': '#1f2937',//gray-800
    'dark-base-100': '#374151',//gray-700
    'dark-base-200': '#1f2937',//gray-800
    'dark-base-300': '#111827',//gray-900
    'dark-base-content': '#f9fafb',//gray-50
    'rounded-box': '0rem',
    'rounded-btn': '0rem',
    'rounded-badge': '1rem',
  },

  rose: {
    'default': '#3d4451',
    'default-content': '#ffffff',
    'primary': '#e11d48',//rose-600
    'primary-content': '#ffffff',
    'secondary': '#374151',
    'secondary-content': '#ffffff',
    'accent': '#ffe999',
    'success': '#15803d',
    'success-content': '#ffffff',
    'warning': '#a16207',
    'warning-content': '#ffffff',
    'error': '#b91c1c',
    'error-content': '#ffffff',
    'base-100': '#fcfcfc',
    'base-200': '#fafafa',
    'base-300': '#f8f9fa',
    'base-content': '#1f2937',
    'dark-base-100': '#181818',
    'dark-base-200': '#151414',
    'dark-base-300': '#0f0f0f',
    'dark-base-content': '#f3f4f6',
    'rounded-box': '1.0rem',
    'rounded-btn': '0.5rem',
    'rounded-badge': '1.9rem'
  },

  violet: {
    'default': '#3d4451',
    'default-focus': '#1f2937',
    'default-content': '#ffffff',
    'primary': '#7c3aed',//violet-600
    'primary-focus': '#6d28d9',//violet-700
    'primary-content': '#ffffff',
    'secondary': '#374151',
    'secondary-focus': '#1f2937',
    'secondary-content': '#ffffff',
    'accent': '#ffe999',
    'accent-focus': '#fde68e',
    'accent-content': '#ffffff',
    'success': '#15803d',
    'success-focus': '#166534',
    'success-content': '#ffffff',
    'warning': '#a16207',
    'warning-focus': '#ca8a04',
    'warning-content': '#ffffff',
    'error': '#b91c1c',
    'error-focus': '#991b1b',
    'error-content': '#ffffff',
    'base-100': '#fcfcfc',
    'base-200': '#f8f8f8',
    'base-300': '#e8e8e8',
    'base-content': '#1f2937',
    'dark-base-100': '#181818',
    'dark-base-200': '#111827',
    'dark-base-300': '#0f0f0f',
    'dark-base-content': '#f3f4f6',
    'rounded-box': '0.5rem',
    'rounded-btn': '0.5rem',
    'rounded-badge': '1.9rem'
  },
  orange: {
    'default': '#3d4451',
    'default-focus': '#1f2937',
    'default-content': '#ffffff',
    'primary': '#ea580C',//orange-600
    'primary-focus': '#c2410c',//orange-700
    'primary-content': '#ffffff',
    'secondary': '#374151',
    'secondary-focus': '#1f2937',
    'secondary-content': '#ffffff',
    'accent': '#ffe999',
    'accent-focus': '#fde68e',
    'accent-content': '#ffffff',
    'success': '#15803d',
    'success-focus': '#166534',
    'success-content': '#ffffff',
    'error': '#b91c1c',
    'error-focus': '#991b1b',
    'error-content': '#ffffff',
    'warning': '#a16207',
    'warning-focus': '#ca8a04',
    'warning-content': '#ffffff',
    'base-100': '#f8fafc',
    'base-200': '#f1f5f9',
    'base-300': '#e2e8f0',
    'base-content': '#1f2937',
    'dark-base-100': '#111827',
    'dark-base-200': '#0f172a',
    'dark-base-300': '#0c1426',
    'dark-base-content': '#f3f4f6',
    'rounded-box': '1.0rem',
    'rounded-btn': '0.5rem',
    'rounded-badge': '1.9rem'
  }
}

// 生成 CSS 变量的函数
export const generateCSSVariables = (themeName: string = 'blue') => {
  const theme = themes[themeName as keyof typeof themes] || themes.blue
  let css = ''
  
  // 生成 :root 选择器的变量
  css += ':root {\n'
  for (const [key, value] of Object.entries(theme)) {
    if (!key.includes('dark-') && !key.includes('rounded-')) {
      css += `  --${key}: ${value};\n`
    }
  }
  css += '}\n\n'
  
  // 生成主题类选择器
  for (const [themeKey, themeData] of Object.entries(themes)) {
    css += `.theme-${themeKey} {\n`
    for (const [key, value] of Object.entries(themeData)) {
      if (!key.includes('dark-') && !key.includes('rounded-')) {
        css += `  --${key}: ${value};\n`
      }
    }
    css += '}\n\n'
  }
  
  // 生成深色模式变量
  css += '.dark {\n'
  for (const [key, value] of Object.entries(theme)) {
    if (key.includes('dark-')) {
      const baseKey = key.replace('dark-', '')
      css += `  --${baseKey}: ${value};\n`
    }
  }
  css += '}\n\n'
  
  // 生成深色模式主题类
  for (const [themeKey, themeData] of Object.entries(themes)) {
    css += `.dark.theme-${themeKey} {\n`
    for (const [key, value] of Object.entries(themeData)) {
      if (key.includes('dark-')) {
        const baseKey = key.replace('dark-', '')
        css += `  --${baseKey}: ${value};\n`
      }
    }
    css += '}\n\n'
  }
  
  return css
}

export { themes }
