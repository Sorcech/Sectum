<template>
  <div 
    class="relative w-full overflow-hidden rounded-$rounded-box" 
    :style="wrapperStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 轮播容器 -->
    <div 
      ref="carouselRef"
      class="w-full h-full flex transition-transform duration-500 ease-in-out [&>*]:flex-shrink-0 [&>*]:w-full [&>*]:h-full"
      :style="containerStyle"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <!-- 如果提供了图片数组，自动渲染图片 -->
      <template v-if="images && images.length > 0">
        <div 
          v-for="(image, index) in images" 
          :key="index"
          class="relative w-full h-full"
        >
          <img 
            :src="image" 
            :alt="`轮播图 ${index + 1}`"
            class="w-full h-full object-cover"
          />
        </div>
      </template>
      <!-- 否则使用 slot 内容 -->
      <slot v-else />
    </div>

    <!-- 导航按钮 - 左右箭头 -->
    <template v-if="showArrows && itemsCount > 1">
      <button
        v-if="loop || currentIndex > 0"
        class="cursor-pointer left-4"
        :class="arrowClasses"
        @click="goToPrev"
        aria-label="上一张"
      >
        <icn name="angle-left" light xl class="text-base-content dark:text-dark-base-content" />
      </button>
      <button
        v-if="loop || currentIndex < itemsCount - 1"
        class="cursor-pointer right-4"
        :class="arrowClasses"
        @click="goToNext"
        aria-label="下一张"
      >
        <icn name="angle-right" light xl class="text-base-content dark:text-dark-base-content" />
      </button>
    </template>

    <!-- 指示器 - 小圆点 -->
    <div v-if="showIndicators && itemsCount > 1" class="absolute z-10" :class="indicatorsClasses">
      <button
        v-for="index in itemsCount"
        :key="index - 1"
        class="border-none outline-none w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-300 p-0 bg-white/50 border-white/80 hover:bg-white/70 dark:bg-white/30 dark:border-white/50 dark:hover:bg-white/50"
        :class="{ 
          '!bg-white !w-6 !rounded-md dark:!bg-white/90': currentIndex === index - 1 
        }"
        @click="goTo(index - 1)"
        :aria-label="`跳转到第 ${index} 张`"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

interface Props {
  initialIndex?: number  // 初始显示的索引
  autoplay?: boolean  // 是否自动播放
  interval?: number  // 自动播放间隔（毫秒）
  loop?: boolean  // 是否循环播放
  showArrows?: boolean  // 是否显示箭头导航
  showIndicators?: boolean  // 是否显示指示器
  indicatorsPosition?: 'bottom' | 'top' | 'left' | 'right'  // 指示器位置
  height?: string  // 高度
  duration?: number  // 过渡动画时长（毫秒）
  touchable?: boolean  // 是否支持触摸滑动
  pauseOnHover?: boolean  // 是否暂停悬停
  images?: string[]  // 图片链接数组，如果提供则自动渲染图片
}

const props = withDefaults(defineProps<Props>(), {
  initialIndex: 0,
  autoplay: false,
  interval: 3000,
  loop: true,
  showArrows: true,
  showIndicators: true,
  indicatorsPosition: 'bottom',
  height: '20rem', // 默认高度约20行 (320px)
  duration: 500,
  touchable: true,
  pauseOnHover: true
})

const emit = defineEmits<{
  change: [index: number]
}>()

const carouselRef = ref<HTMLElement>()
const currentIndex = ref(props.initialIndex)
const itemsCount = ref(0)
let autoplayTimer: ReturnType<typeof setInterval> | null = null
let isHovering = false

// 触摸相关
const touchStartX = ref(0)
const touchStartY = ref(0)
const touchEndX = ref(0)
const touchEndY = ref(0)
const isDragging = ref(false)

// 计算样式
const wrapperStyle = computed(() => {
  return {
    height: props.height
  }
})

const containerStyle = computed(() => {
  return {
    transform: `translateX(-${currentIndex.value * 100}%)`,
    transitionDuration: `${props.duration}ms`
  }
})

const arrowClasses = computed(() => {
  return [
    'absolute top-1/2 -translate-y-1/2',
    'bg-base-200 dark:bg-dark-base-200',
    'hover:bg-base-300 dark:hover:bg-dark-base-300',
    'text-base-content dark:text-dark-base-content',
    'rounded-full p-2',
    'shadow-lg',
    'transition-all duration-200',
    'z-10',
    // 重置浏览器默认按钮样式
    'border-none outline-none'
  ].join(' ')
})

const indicatorsClasses = computed(() => {
  const positionClasses = {
    bottom: 'bottom-4 left-1/2 -translate-x-1/2',
    top: 'top-4 left-1/2 -translate-x-1/2',
    left: 'left-4 top-1/2 -translate-y-1/2 flex-col',
    right: 'right-4 top-1/2 -translate-y-1/2 flex-col'
  }
  
  return [
    'flex gap-2',
    positionClasses[props.indicatorsPosition]
  ].join(' ')
})

// 计算子元素数量
const updateItemsCount = () => {
  nextTick(() => {
    // 如果提供了图片数组，使用数组长度
    if (props.images && props.images.length > 0) {
      itemsCount.value = props.images.length
    } else if (carouselRef.value) {
      // 否则从 DOM 子元素获取
      itemsCount.value = carouselRef.value.children.length
    }
  })
}

// 导航方法
const goTo = (index: number) => {
  if (index < 0 || index >= itemsCount.value) return
  
  currentIndex.value = index
  emit('change', index)
  resetAutoplay()
}

const goToNext = () => {
  if (props.loop) {
    goTo((currentIndex.value + 1) % itemsCount.value)
  } else {
    if (currentIndex.value < itemsCount.value - 1) {
      goTo(currentIndex.value + 1)
    }
  }
}

const goToPrev = () => {
  if (props.loop) {
    goTo((currentIndex.value - 1 + itemsCount.value) % itemsCount.value)
  } else {
    if (currentIndex.value > 0) {
      goTo(currentIndex.value - 1)
    }
  }
}

// 自动播放
const startAutoplay = () => {
  if (!props.autoplay || itemsCount.value <= 1) return
  if (autoplayTimer) clearInterval(autoplayTimer)
  
  autoplayTimer = setInterval(() => {
    if (!isHovering || !props.pauseOnHover) {
      goToNext()
    }
  }, props.interval)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const resetAutoplay = () => {
  stopAutoplay()
  if (props.autoplay) {
    startAutoplay()
  }
}

// 触摸事件处理
const handleTouchStart = (e: TouchEvent) => {
  if (!props.touchable) return
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
  isDragging.value = true
  stopAutoplay()
}

const handleTouchMove = (e: TouchEvent) => {
  if (!props.touchable || !isDragging.value) return
  e.preventDefault()
}

const handleTouchEnd = (e: TouchEvent) => {
  if (!props.touchable || !isDragging.value) return
  
  touchEndX.value = e.changedTouches[0].clientX
  touchEndY.value = e.changedTouches[0].clientY
  
  const diffX = touchStartX.value - touchEndX.value
  const diffY = touchStartY.value - touchEndY.value
  
  // 判断是横向滑动还是纵向滑动
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    if (diffX > 0) {
      // 向左滑动，显示下一张
      goToNext()
    } else {
      // 向右滑动，显示上一张
      goToPrev()
    }
  }
  
  isDragging.value = false
  resetAutoplay()
}

// 鼠标悬停
const handleMouseEnter = () => {
  isHovering = true
  if (props.pauseOnHover) {
    stopAutoplay()
  }
}

const handleMouseLeave = () => {
  isHovering = false
  if (props.pauseOnHover) {
    resetAutoplay()
  }
}

// 监听索引变化
watch(() => props.initialIndex, (newIndex) => {
  if (newIndex >= 0 && newIndex < itemsCount.value) {
    currentIndex.value = newIndex
  }
})

// 监听图片数组变化
watch(() => props.images, () => {
  updateItemsCount()
}, { deep: true })

// 生命周期
onMounted(() => {
  updateItemsCount()
  if (props.autoplay) {
    startAutoplay()
  }
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

