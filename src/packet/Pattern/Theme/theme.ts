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
  'base-150',
  'base-200',
  'base-250',
  'base-300',
  'base-content',
  'dark-base-100',
  'dark-base-150',
  'dark-base-200',
  'dark-base-250',
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
    'base-100': '#f8fafc',//slate-50
    'base-150': '#f1f5f9',//slate-100
    'base-200': '#eaeff5',//slate-150
    'base-250': '#e2e8f0',//slate-200
    'base-300': '#d7dfe9',//slate-250
    'base-content': '#1e293b',//slate-800
    'dark-base-100': '#334155',//slate-700
    'dark-base-150': '#293548',//slate-750
    'dark-base-200': '#1e293b',//slate-800
    'dark-base-250': '#172033',//slate-850
    'dark-base-300': '#0f172a',//slate-900
    'dark-base-content': '#f8fafc',//slate-50
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
    'base-100': '#f9fafb',//gray-50
    'base-150': '#f3f4f6',//gray-100
    'base-200': '#e2e4e9',//gray-150
    'base-250': '#d1d5db',//gray-200
    'base-300': '#c4c8d0',//gray-250
    'base-content': '#1f2937',//gray-800
    'dark-base-100': '#374151',//gray-700
    'dark-base-150': '#2b3544',//gray-750
    'dark-base-200': '#1f2937',//gray-800
    'dark-base-250': '#18212f',//gray-850
    'dark-base-300': '#111827',//gray-900
    'dark-base-content': '#f9fafb',//gray-50
    'rounded-box': '0rem',
    'rounded-btn': '0rem',
    'rounded-badge': '1rem',
  },

  rose: {
    'default': '#3d4451',
    'default-focus': '#1f2937',
    'default-content': '#ffffff',
    'primary': '#e11d48',//rose-600
    'primary-focus': '#be123c',//rose-700
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
    'base-100': '#fafaf9',//stone-50
    'base-150': '#f5f5f4',//stone-100
    'base-200': '#eeedec',//stone-150
    'base-250': '#e7e5e4',//stone-200
    'base-300': '#dfdcdb',//stone-250
    'base-content': '#292524',//slate-800
    'dark-base-100': '#44403c',//stone-700
    'dark-base-150': '#373330',//stone-750
    'dark-base-200': '#292524',//stone-800
    'dark-base-250': '#231f1e',//stone-850
    'dark-base-300': '#1c1917',//stone-900
    'dark-base-content': '#fafaf9',//stone-50
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
    'base-100': '#fafafa',//neutral-50
    'base-150': '#f5f5f5',//neutral-100
    'base-200': '#ededed',//neutral-150
    'base-250': '#e5e5e5',//neutral-200
    'base-300': '#dcdcdc',//neutral-250
    'base-content': '#262626',//neutral-800
    'dark-base-100': '#404040',//neutral-700
    'dark-base-150': '#333333',//neutral-750
    'dark-base-200': '#262626',//neutral-800
    'dark-base-250': '#1d1d1d',//neutral-850
    'dark-base-300': '#171717',//neutral-900
    'dark-base-content': '#fafafa',//neutral-50
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
    'base-100': '#fafafa',//zinc-50
    'base-150': '#f4f4f5',//zinc-100
    'base-200': '#ececee',//zinc-150
    'base-250': '#e4e4e7',//zinc-200
    'base-300': '#dcdce0',//zinc-250
    'base-content': '#27272a',//zinc-800
    'dark-base-100': '#3f3f46',//zinc-700
    'dark-base-150': '#333338',//zinc-750
    'dark-base-200': '#27272a',//zinc-800
    'dark-base-250': '#202023',//zinc-850
    'dark-base-300': '#18181b',//zinc-900
    'dark-base-content': '#fafafa',//zinc-50
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
