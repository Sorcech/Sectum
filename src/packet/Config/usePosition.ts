import { ref, type Ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

export interface PositionOptions {
  /** 下拉面板的预估高度 */
  panelHeight?: number
  /** 下拉面板的预估宽度 */
  panelWidth?: number
  /** 触发元素与面板之间的间距 */
  gap?: number
  /** 距离屏幕边缘的最小距离 */
  edgeGap?: number
}

/**
 * 计算下拉面板的最佳位置
 * @param triggerRef 触发元素的 ref
 * @param options 位置计算选项
 * @returns 位置相关的响应式状态
 */
export function usePosition(triggerRef: Ref<HTMLElement | null>, options: PositionOptions = {}) {
  const { panelHeight = 300, panelWidth = 256, gap = 8, edgeGap = 16 } = options
  
  const placement = ref<'top' | 'bottom'>('bottom')
  const positionStyle = ref<Record<string, string>>({})
  
  const calculatePosition = () => {
    if (!triggerRef.value) return
    
    const rect = triggerRef.value.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    
    // 计算下方可用空间
    const spaceBelow = viewportHeight - rect.bottom - gap
    // 计算上方可用空间
    const spaceAbove = rect.top - gap
    
    // 计算右侧可用空间
    const spaceRight = viewportWidth - rect.right - edgeGap
    // 计算左侧可用空间
    const spaceLeft = rect.left - edgeGap
    
    const styles: Record<string, string> = {}
    
    // 决定垂直方向：如果下方空间不足但上方空间足够，则向上弹出
    if (spaceBelow < panelHeight && spaceAbove > spaceBelow) {
      placement.value = 'top'
      // 向上弹出时，位置在元素上方
      styles.bottom = `${rect.height + gap}px`
      styles.maxHeight = `${Math.min(spaceAbove - gap, panelHeight)}px`
    } else {
      placement.value = 'bottom'
      // 向下弹出时，位置在元素下方
      styles.top = `${rect.height + gap}px`
      styles.maxHeight = `${Math.min(spaceBelow, panelHeight)}px`
    }
    
    // 水平方向：尽量保持左对齐，但如果会超出屏幕右侧，则调整
    if (spaceRight < panelWidth && spaceLeft > spaceRight) {
      // 右侧空间不足，向左对齐
      styles.right = '0'
      styles.left = 'auto'
      styles.maxWidth = `${spaceLeft}px`
    } else {
      // 默认左对齐
      styles.left = '0'
      styles.right = 'auto'
      styles.maxWidth = `${Math.min(spaceRight, panelWidth)}px`
    }
    
    // 确保面板不会超出视口
    if (placement.value === 'top') {
      styles.maxHeight = `${Math.min(spaceAbove - gap, panelHeight)}px`
    } else {
      styles.maxHeight = `${Math.min(spaceBelow, panelHeight)}px`
    }
    
    positionStyle.value = styles
  }
  
  // 监听滚动和窗口大小变化，重新计算位置
  const updatePosition = () => {
    nextTick(() => {
      calculatePosition()
    })
  }
  
  onMounted(() => {
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updatePosition, true)
    window.removeEventListener('resize', updatePosition)
  })
  
  return {
    placement,
    positionStyle,
    calculatePosition,
    updatePosition
  }
}

