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
    
    // 水平方向：计算最佳位置，确保面板不超出屏幕左右边界
    // 默认左对齐，计算面板右边缘位置
    const panelLeft = 0 // 相对于触发器的左偏移
    const panelRightEdge = rect.left + panelLeft + panelWidth
    
    // 如果面板会超出屏幕右边界
    if (panelRightEdge > viewportWidth - edgeGap) {
      // 尝试右对齐（面板右边缘对齐触发器右边缘）
      const rightAlignedLeft = rect.width - panelWidth
      const rightAlignedRightEdge = rect.left + rightAlignedLeft + panelWidth
      
      // 如果右对齐后仍超出右边界，或者左边界空间不足
      if (rightAlignedRightEdge > viewportWidth - edgeGap || rightAlignedLeft < -rect.left + edgeGap) {
        // 使用右对齐，但确保不超出左边界
        const adjustedLeft = Math.max(
          rightAlignedLeft,
          -(rect.left - edgeGap)
        )
        styles.left = `${adjustedLeft}px`
        styles.right = 'auto'
        // 计算实际可用宽度
        const availableWidth = Math.min(
          viewportWidth - (rect.left + adjustedLeft) - edgeGap,
          panelWidth
        )
        styles.maxWidth = `${availableWidth}px`
      } else {
        // 右对齐可行
        styles.left = `${rightAlignedLeft}px`
        styles.right = 'auto'
        styles.maxWidth = `${Math.min(panelWidth, viewportWidth - edgeGap - (rect.left + rightAlignedLeft))}px`
      }
    } else {
      // 左对齐不会超出右边界，检查左边界
      if (rect.left + panelLeft < edgeGap) {
        // 左边界空间不足，向右偏移
        const adjustedLeft = edgeGap - rect.left
        styles.left = `${adjustedLeft}px`
        styles.right = 'auto'
        // 计算实际可用宽度
        const availableWidth = Math.min(
          viewportWidth - rect.left - adjustedLeft - edgeGap,
          panelWidth
        )
        styles.maxWidth = `${availableWidth}px`
      } else {
        // 默认左对齐
        styles.left = '0'
        styles.right = 'auto'
        styles.maxWidth = `${Math.min(panelWidth, viewportWidth - rect.left - edgeGap)}px`
      }
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

