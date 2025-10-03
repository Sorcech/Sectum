<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  compact: {    // Menu compact if set true or responsive
    type: [Boolean, String], default: false, required: false,
    validator: (value: boolean | string) => {
      return ['sm', 'md', 'lg', 'xl', true, false].includes(value)
    },
  },
  horizontal: {// Menu horizontal if set true or responsive
    type: [Boolean, String], default: false, required: false,
    validator: (value: boolean | string) => {
      return ['sm', 'md', 'lg', 'xl', true, false].includes(value)
    },
  },
  shadow: { type: Boolean, default: false, required: false },
  rounded: { type: Boolean, default: false, required: false }, // Menu with rounded borders
  padding: { type: Boolean, default: false, required: false },// Menu with padding and list with rounded border
  hoverBorder: { type: Boolean, default: false, required: false }, // List with left border colored on hover
})

// 基础菜单样式
const baseClasses = computed(() => {
  return [
    'w-auto select-none list-none p-0 m-0',
    'flex flex-col',
    props.shadow ? 'shadow-md' : '',
    props.padding ? 'p-2' : '',
    props.rounded ? 'rounded-$rounded-btn' : '',
    props.hoverBorder ? 'hover-border' : ''
  ].filter(Boolean).join(' ')
})

// 紧凑样式类名（用于CSS选择器）
const compactClasses = computed(() => {
  if (!props.compact) return ''
  
  if (props.compact === true) {
    return 'compact'
  }
  
  return `compact-${props.compact}`
})

// 水平样式类名（用于CSS选择器）
const horizontalClasses = computed(() => {
  if (!props.horizontal) return ''
  
  if (props.horizontal === true) {
    return 'horizontal'
  }
  
  return `horizontal-${props.horizontal}`
})

// 最终样式组合
const menuClasses = computed(() => {
  return [
    'menu bg-base-200',
    baseClasses.value,
    compactClasses.value,
    horizontalClasses.value
  ].filter(Boolean).join(' ')
})
</script>

<template>
  <ul :class="menuClasses">
    <template v-if="$slots.default">
      <li v-for="(slot, key) in $slots.default()" :key="key" class="menu-item list-none p-0 m-0">
        <component :is="slot" />
      </li>
    </template>
  </ul>
</template>

<style scoped>
/* 只保留 UnoCSS 无法实现的复杂样式 */

/* 悬停边框效果 - 使用 CSS 变量 */
.menu.hover-border li > * {
  border-left: 4px solid transparent;
}

.menu.hover-border li > *:hover {
  border-left-color: var(--primary);
}

/* 菜单项样式 - 复杂的 :not() 选择器 */
.menu li > *:not(.disabled, .menu-title) {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
  transition: all 200ms ease-in-out;
  font-size: 1rem;
  text-decoration: none !important;
  color: var(--base-content);
  padding: 0.5rem 1rem;
  margin: 0.125rem 0;
}

.menu li > *:not(.disabled, .menu-title):hover {
  background-color: rgba(0, 0, 0, 0.07);
  text-decoration: none !important;
}

.dark .menu li > *:not(.disabled, .menu-title):hover {
  background-color: rgba(255, 255, 255, 0.07);
  text-decoration: none !important;
}

.menu li > *:not(.disabled, .menu-title):active {
  background-color: var(--primary) !important;
  color: var(--primary-content) !important;
  text-decoration: none !important;
}

/* 禁用状态 */
.menu li .disabled {
  color: rgba(var(--base-content), 0.2);
}

.menu li .disabled:hover {
  background-color: transparent;
}

/* 圆角继承 - 复杂的 :where() 选择器 */
.menu > :where(li:first-child) {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  border-bottom-left-radius: unset;
  border-bottom-right-radius: unset;
}

.menu > :where(li:first-child) > :where(:not(ul)) {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  border-bottom-left-radius: unset;
  border-bottom-right-radius: unset;
}

.menu > :where(li:last-child) {
  border-top-left-radius: unset;
  border-top-right-radius: unset;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.menu > :where(li:last-child) > :where(:not(ul)) {
  border-top-left-radius: unset;
  border-top-right-radius: unset;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.menu > :where(li) > :where(ul) {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.menu.padding li > * {
  border-radius: var(--rounded-btn);
}

/* 水平布局的圆角 - 复杂的响应式选择器 */
.menu.horizontal > :where(li:first-child) {
  border-top-left-radius: inherit;
  border-top-right-radius: unset;
  border-bottom-right-radius: unset;
  border-bottom-left-radius: inherit;
}

.menu.horizontal > :where(li:first-child) > :where(*:not(ul)) {
  border-top-left-radius: inherit;
  border-top-right-radius: unset;
  border-bottom-right-radius: unset;
  border-bottom-left-radius: inherit;
}

.menu.horizontal > :where(li:last-child) {
  border-top-left-radius: unset;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: unset;
}

.menu.horizontal > :where(li:last-child) > :where(*:not(ul)) {
  border-top-left-radius: unset;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: unset;
}

/* 响应式水平布局的圆角 */
.menu.horizontal-sm > :where(li:first-child) {
  @media (min-width: 640px) {
    border-top-left-radius: inherit;
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
    border-bottom-left-radius: inherit;
  }
}

.menu.horizontal-sm > :where(li:first-child) > :where(*:not(ul)) {
  @media (min-width: 640px) {
    border-top-left-radius: inherit;
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
    border-bottom-left-radius: inherit;
  }
}

.menu.horizontal-sm > :where(li:last-child) {
  @media (min-width: 640px) {
    border-top-left-radius: unset;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: unset;
  }
}

.menu.horizontal-sm > :where(li:last-child) > :where(*:not(ul)) {
  @media (min-width: 640px) {
    border-top-left-radius: unset;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: unset;
  }
}

.menu.horizontal-md > :where(li:first-child) {
  @media (min-width: 768px) {
    border-top-left-radius: inherit;
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
    border-bottom-left-radius: inherit;
  }
}

.menu.horizontal-md > :where(li:first-child) > :where(*:not(ul)) {
  @media (min-width: 768px) {
    border-top-left-radius: inherit;
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
    border-bottom-left-radius: inherit;
  }
}

.menu.horizontal-md > :where(li:last-child) {
  @media (min-width: 768px) {
    border-top-left-radius: unset;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: unset;
  }
}

.menu.horizontal-md > :where(li:last-child) > :where(*:not(ul)) {
  @media (min-width: 768px) {
    border-top-left-radius: unset;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: unset;
  }
}

.menu.horizontal-lg > :where(li:first-child) {
  @media (min-width: 1024px) {
    border-top-left-radius: inherit;
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
    border-bottom-left-radius: inherit;
  }
}

.menu.horizontal-lg > :where(li:first-child) > :where(*:not(ul)) {
  @media (min-width: 1024px) {
    border-top-left-radius: inherit;
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
    border-bottom-left-radius: inherit;
  }
}

.menu.horizontal-lg > :where(li:last-child) {
  @media (min-width: 1024px) {
    border-top-left-radius: unset;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: unset;
  }
}

.menu.horizontal-lg > :where(li:last-child) > :where(*:not(ul)) {
  @media (min-width: 1024px) {
    border-top-left-radius: unset;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: unset;
  }
}

.menu.horizontal-xl > :where(li:first-child) {
  @media (min-width: 1280px) {
    border-top-left-radius: inherit;
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
    border-bottom-left-radius: inherit;
  }
}

.menu.horizontal-xl > :where(li:first-child) > :where(*:not(ul)) {
  @media (min-width: 1280px) {
    border-top-left-radius: inherit;
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
    border-bottom-left-radius: inherit;
  }
}

.menu.horizontal-xl > :where(li:last-child) {
  @media (min-width: 1280px) {
    border-top-left-radius: unset;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: unset;
  }
}

.menu.horizontal-xl > :where(li:last-child) > :where(*:not(ul)) {
  @media (min-width: 1280px) {
    border-top-left-radius: unset;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: unset;
  }
}

/* 菜单标题样式 */
.menu .menu-title {
  list-style: none;
  padding: 0.75rem 1rem 0.5rem 1rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: rgba(75, 85, 99, 0.7);
  margin-bottom: 0.25rem;
}

.dark .menu .menu-title {
  color: rgba(255, 255, 255, 1);
}

/* Dark 模式下的菜单项文字颜色优化 */
.dark .menu li > *:not(.disabled, .menu-title) {
  color: var(--base-content);
}

/* Dark 模式下的菜单项悬停状态优化 */
.dark .menu li > *:not(.disabled, .menu-title):hover {
  color: var(--base-content);
}
</style>
