<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String,default: ''},// 卡片标题
  subtitle: { type: String,default: ''},// 卡片副标题
  shadow: { type: Boolean,default: true},// 是否显示阴影
  shadowSize: { type: String as () => 'sm' | 'md' | 'lg' | 'xl',default: 'md',validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)},// 阴影大小
  bordered: { type: Boolean,default: false},// 是否显示边框
  rounded: { type: Boolean,default: true},// 是否显示圆角
  bg: { type: String,default: 'base-150'},// 背景颜色
  image: { type: String,default: ''},// 卡片图片
  imagePosition: { type: String as () => 'top' | 'bottom',default: 'top',validator: (value: string) => ['top', 'bottom'].includes(value)},// 图片位置
  actions: { type: Boolean,default: false},// 卡片动作区域（footer）
  hover: { type: Boolean,default: false},// 是否可悬停
})

// 基础卡片样式
const baseClasses = computed(() => {
  return [
    'card',
    'w-full',
    `bg-${props.bg} dark:bg-dark-${props.bg}`,
    props.bordered ? 'border border-base-250 dark:border-dark-base-250' : '',
    props.rounded ? 'rounded-$rounded-box' : '',
    props.shadow ? `shadow-${props.shadowSize}` : '',
    props.hover ? 'transition-all duration-300 hover:shadow-lg hover:scale-[1.02]' : ''
  ].filter(Boolean).join(' ')
})

</script>

<template>
  <div :class="baseClasses">
    <!-- 顶部图片 -->
    <div v-if="image && imagePosition === 'top'" class="card-image-top w-full overflow-hidden rounded-t-$rounded-box">
      <img :src="image" alt="" class="w-full h-auto object-cover" />
    </div>
    
    <!-- 标题区域 -->
    <div v-if="title || subtitle" class="card-header p-4 border-b border-base-250 dark:border-dark-base-250">
      <h3 v-if="title" class="card-title text-lg font-bold text-base-content dark:text-dark-base-content">
        {{ title }}
      </h3>
      <p v-if="subtitle" class="card-subtitle text-sm text-base-content/70 dark:text-dark-base-content/70 mt-1">
        {{ subtitle }}
      </p>
    </div>
    
    <!-- 内容区域 -->
    <div class="card-body p-4">
      <slot />
    </div>
    
    <!-- 底部图片 -->
    <div v-if="image && imagePosition === 'bottom'" class="card-image-bottom w-full overflow-hidden rounded-b-$rounded-box">
      <img :src="image" alt="" class="w-full h-auto object-cover" />
    </div>
    
    <!-- 动作区域 -->
    <div v-if="actions || $slots.footer" class="card-footer p-4 border-t border-base-250 dark:border-dark-base-250 flex justify-end gap-2">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card-body {
  flex: 1;
}

.card-title {
  margin: 0;
  line-height: 1.5;
}

.card-subtitle {
  margin: 0;
  line-height: 1.5;
}

.card-image-top,
.card-image-bottom {
  flex-shrink: 0;
}

.card-image-top img,
.card-image-bottom img {
  display: block;
}
</style>
