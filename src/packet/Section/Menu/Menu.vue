<script lang="ts" setup>
import { computed, useSlots, Slots, VNode } from 'vue'

const slots = useSlots() as Slots

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

// 检测 slot 中的子元素数量（用于 v-for 情况）
const getDirectChildren = (slot: VNode[] | VNode | undefined): VNode[] => {
  if (!slot) return []
  
  // 如果 slot 是数组，直接返回
  if (Array.isArray(slot)) {
    return slot.filter((node): node is VNode => 
      node && typeof node === 'object' && 'type' in node
    )
  }
  
  // 单个 slot，检查是否有多个 children（v-for 会创建 Fragment）
  const node = slot as VNode
  if (node.children && Array.isArray(node.children)) {
    // 过滤出有效的 VNode（排除文本节点）
    return node.children.filter((child: any): child is VNode =>
      child && typeof child === 'object' && 'type' in child
    )
  }
  
  // 单个元素
  return [node]
}

// 获取菜单项样式（用于 v-for 情况）
const getMenuItemStyle = (index: number, total: number) => {
  if (!props.rounded) return {}
  
  // 第一个选项：只有顶部圆角
  if (index === 0) {
    return {
      borderTopLeftRadius: 'var(--rounded-btn)',
      borderTopRightRadius: 'var(--rounded-btn)',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0'
    }
  }
  // 最后一个选项：只有底部圆角
  if (index === total - 1) {
    return {
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
      borderBottomLeftRadius: 'var(--rounded-btn)',
      borderBottomRightRadius: 'var(--rounded-btn)'
    }
  }
  // 中间选项：完全无圆角
  return {
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0'
  }
}

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
    <template v-if="slots.default">
      <template v-for="(slot, key) in slots.default()" :key="key">
        <!-- 检测 slot 是否包含多个直接子元素（v-for 情况） -->
        <template v-if="props.rounded && getDirectChildren(slot).length > 1">
          <template v-for="(child, childIndex) in getDirectChildren(slot)" :key="childIndex">
            <li class="menu-item list-none p-0 m-0">
              <component 
                :is="child" 
                :style="getMenuItemStyle(childIndex, getDirectChildren(slot).length)"
              />
            </li>
          </template>
        </template>
        <!-- 单个 slot 情况（手动添加），使用原有的 CSS 选择器 -->
        <li v-else class="menu-item list-none p-0 m-0">
        <component :is="slot" />
      </li>
      </template>
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
