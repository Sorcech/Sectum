// ============================================================================
// 状态管理（参考 Tiptap EditorState）
// ============================================================================

/**
 * 状态管理（参考 Tiptap EditorState）
 * 
 * 核心思想：
 * 1. 状态不可变
 * 2. 单一数据源
 * 3. 通过更新函数修改状态
 * 4. 支持订阅状态变化
 */

/**
 * 编辑器状态
 */
export interface EditorState {
  content: EditorJSON
  selection: SelectionInfo | null
  history: EditorJSON[]
  historyIndex: number
  format: CurrentFormat
  isComposing: boolean
  isUpdating: boolean
}

/**
 * 状态更新函数
 */
export type StateUpdater = (state: EditorState) => EditorState

/**
 * 状态监听器
 */
export type StateListener = (state: EditorState) => void

/**
 * 状态管理器
 */
export class StateManager {
  private state: EditorState
  private listeners: Set<StateListener> = new Set()
  
  constructor(initialState: Partial<EditorState> = {}) {
    this.state = {
      content: initialState.content || { type: 'doc', content: [{ type: 'paragraph' }] },
      selection: initialState.selection || null,
      history: initialState.history || [],
      historyIndex: initialState.historyIndex ?? -1,
      format: initialState.format || {},
      isComposing: initialState.isComposing || false,
      isUpdating: initialState.isUpdating || false,
    }
  }
  
  /**
   * 获取当前状态（不可变）
   */
  getState(): EditorState {
    return { ...this.state }
  }
  
  /**
   * 更新状态
   */
  updateState(updater: StateUpdater): void {
    const newState = updater(this.state)
    this.state = newState
    this.notifyListeners()
  }
  
  /**
   * 订阅状态变化
   */
  subscribe(listener: StateListener): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }
  
  /**
   * 通知所有监听器
   */
  private notifyListeners(): void {
    const state = this.getState()
    this.listeners.forEach(listener => {
      try {
        listener(state)
      } catch (error) {
        console.error('State listener error:', error)
      }
    })
  }
  
  /**
   * 获取内容
   */
  getContent(): EditorJSON {
    return this.state.content
  }
  
  /**
   * 获取选择
   */
  getSelection(): SelectionInfo | null {
    return this.state.selection
  }
  
  /**
   * 获取历史
   */
  getHistory(): { history: EditorJSON[]; index: number } {
    return {
      history: [...this.state.history],
      index: this.state.historyIndex
    }
  }
}

// ============================================================================
// DOM 管理（统一 DOM 操作）
// ============================================================================

/**
 * DOM 管理（统一 DOM 操作）
 * 
 * 核心思想：
 * 1. 所有 DOM 操作都通过这个类
 * 2. 同步执行，不异步
 * 3. 统一的内容更新和选择管理
 */

/**
 * DOM 管理器
 */
export class DOMManager {
  private editor: HTMLElement
  
  constructor(editor: HTMLElement) {
    this.editor = editor
  }
  
  /**
   * 更新内容（同步）
   */
  updateContent(content: EditorJSON): void {
    const html = jsonToHTML(content)
    this.editor.innerHTML = html
  }
  
  /**
   * 获取内容（从 DOM）
   */
  getContent(): EditorJSON {
    const html = this.editor.innerHTML
    return htmlToJSON(html, this.editor)
  }
  
  /**
   * 设置选择（同步）
   */
  setSelection(selection: SelectionInfo | null): boolean {
    if (!selection) return false
    return restoreSelectionInfo(selection, this.editor)
  }
  
  /**
   * 获取选择（从 DOM）
   */
  getSelection(): SelectionInfo | null {
    return saveSelectionInfo(this.editor)
  }
  
  /**
   * 获取编辑器元素
   */
  getEditor(): HTMLElement {
    return this.editor
  }
  
  /**
   * 聚焦编辑器
   */
  focus(): void {
    this.editor.focus()
  }
  
  /**
   * 检查编辑器是否包含节点
   */
  contains(node: Node): boolean {
    return this.editor.contains(node)
  }
}

// ============================================================================
// 事件处理（统一事件管理）
// ============================================================================

/**
 * 事件处理（统一事件管理）
 * 
 * 核心思想：
 * 1. 统一的事件处理系统
 * 2. 完全阻止默认行为（对于需要处理的键）
 * 3. 同步执行命令
 * 4. 延迟 emit（不阻塞）
 */

/**
 * 事件处理器
 */
export class EventHandler {
  private commandManager: CommandManager
  private stateManager: StateManager
  private domManager: DOMManager
  private editor: HTMLElement
  private emitCallback?: (content: any) => void
  
  constructor(
    commandManager: CommandManager,
    stateManager: StateManager,
    domManager: DOMManager,
    editor: HTMLElement
  ) {
    this.commandManager = commandManager
    this.stateManager = stateManager
    this.domManager = domManager
    this.editor = editor
  }
  
  /**
   * 设置 emit 回调
   */
  setEmitCallback(callback: (content: any) => void): void {
    this.emitCallback = callback
  }
  
  /**
   * 处理键盘事件
   */
  handleKeydown(event: KeyboardEvent): boolean {
    if (event.key === 'Enter' && !event.shiftKey) { // Enter 键处理
      this.handleEnterKey(event)
      return true
    }
    
    if (event.ctrlKey && event.key === 'z' && !event.shiftKey) { // Ctrl+Z 撤销
      event.preventDefault()
      return this.executeCommand('undo')
    }
    
    if ((event.ctrlKey && event.key === 'y') || (event.ctrlKey && event.shiftKey && event.key === 'z')) { // Ctrl+Y 或 Ctrl+Shift+Z 重做
      event.preventDefault()
      return this.executeCommand('redo')
    }
    
    if (event.ctrlKey && event.key === 'b') { // Ctrl+B 粗体
      event.preventDefault()
      return this.executeCommand('format-bold')
    }
    
    if (event.ctrlKey && event.key === 'i') { // Ctrl+I 斜体
      event.preventDefault()
      return this.executeCommand('format-italic')
    }
    
    if (event.ctrlKey && event.key === 'u') { // Ctrl+U 下划线
      event.preventDefault()
      return this.executeCommand('format-underline')
    }
    
    return false
  }
  
  /**
   * 执行命令（通用方法）
   */
  executeCommand(commandName: string, data?: any): boolean {
    const context = this.createCommandContext() // 创建命令上下文
    
    const currentSelection = window.getSelection()
    const savedRange = currentSelection && currentSelection.rangeCount > 0 // 保存当前选择（在命令执行前）
      ? currentSelection.getRangeAt(0).cloneRange()
      : null
    
    this.stateManager.updateState(state => ({ // 设置 isUpdating 标志，防止 watch 和 handleInput 干扰
      ...state,
      isUpdating: true
    }))
    
    const result = this.commandManager.execute(commandName, context, data)
    
    if (result.success && result.newState) {
      this.stateManager.updateState((currentState) => ({ // 同步更新状态（保留当前状态的所有属性）
        ...currentState,
        content: result.newState!.content,
        selection: result.newState!.selection,
        isUpdating: false
      }))
      
      requestAnimationFrame(() => { // 恢复光标位置（使用命令返回的 newSelection，或使用保存的范围）
        if (result.newSelection) {
          this.domManager.setSelection(result.newSelection)
          this.editor.focus()
        } else if (savedRange && this.editor.contains(savedRange.commonAncestorContainer)) {
          const sel = window.getSelection() // 如果命令没有返回 newSelection，尝试恢复保存的范围
          if (sel) {
            sel.removeAllRanges()
            sel.addRange(savedRange)
          }
          this.editor.focus()
        } else {
          const currentSel = window.getSelection() // 如果都没有，检查当前选择是否还在编辑器内
          if (currentSel && currentSel.rangeCount > 0) {
            const currentRange = currentSel.getRangeAt(0)
            if (this.editor.contains(currentRange.commonAncestorContainer)) {
              this.editor.focus()
            } else {
              const firstBlock = this.editor.querySelector('p, h1, h2, h3, h4, h5, h6, div, blockquote')
              if (firstBlock) {
                const newRange = document.createRange()
                newRange.setStart(firstBlock, 0)
                newRange.collapse(true)
                const sel = window.getSelection()
                if (sel) {
                  sel.removeAllRanges()
                  sel.addRange(newRange)
                }
                this.editor.focus()
              }
            }
          }
        }
      })
      
      if (result.shouldEmit !== false) { // 延迟 emit（不阻塞）
        this.stateManager.updateState(state => ({ // 延长 isUpdating 时间，确保 watch 和 handleInput 完全跳过
          ...state,
          isUpdating: true
        }))
        
        requestAnimationFrame(() => {
          if (this.emitCallback) {
            this.emitCallback(result.newState!.content)
          }
          
          setTimeout(() => { // 延迟清除 isUpdating，确保 watch 和 handleInput 完全跳过
            this.stateManager.updateState(state => ({
              ...state,
              isUpdating: false
            }))
          }, 500) // 500ms 足够跳过所有后续事件
        })
      } else {
        this.stateManager.updateState(state => ({ // 如果不 emit，立即清除 isUpdating
          ...state,
          isUpdating: false
        }))
      }
      
      return true
    } else {
      this.stateManager.updateState(state => ({ // 如果命令失败，重置 isUpdating
        ...state,
        isUpdating: false
      }))
    }
    
    return false
  }
  
  /**
   * 处理 Enter 键（完全同步执行）
   */
  private handleEnterKey(event: KeyboardEvent): void {
    event.preventDefault() // 完全阻止默认行为
    event.stopPropagation()
    event.stopImmediatePropagation()
    
    this.stateManager.updateState(state => ({ // 设置 isUpdating 标志，防止 watch 和 handleInput 干扰
      ...state,
      isUpdating: true
    }))
    
    const context = this.createCommandContext() // 创建命令上下文
    const result = this.commandManager.execute('enter', context) // 同步执行命令
    
    if (result.success && result.newState) {
      let newParagraph: HTMLParagraphElement | null = null // 先保存新创建段落的光标位置（在更新 DOM 之前）
      if (result.newSelection) {
        const allP = this.editor.querySelectorAll('p') // 从 newSelection 中获取段落信息
        if (allP.length > 0) {
          newParagraph = allP[allP.length - 1] as HTMLParagraphElement
        }
      }
      
      this.stateManager.updateState((currentState) => ({ // 同步更新状态（保留当前状态的所有属性）
        ...currentState,
        content: result.newState!.content,
        selection: result.newState!.selection,
        isUpdating: false
      }))
      
      requestAnimationFrame(() => { // 恢复光标位置（使用命令返回的 newSelection，或使用保存的段落）
        if (result.newSelection) {
          this.domManager.setSelection(result.newSelection)
          this.editor.focus()
        } else if (newParagraph && this.editor.contains(newParagraph)) {
          const newRange = document.createRange() // 如果没有 newSelection，但找到了新段落，设置光标到新段落
          const firstChild = newParagraph.firstChild
          if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
            newRange.setStart(firstChild, 0)
          } else if (firstChild && firstChild.nodeName === 'BR') {
            newRange.setStart(newParagraph, 0)
          } else {
            newRange.setStart(newParagraph, 0)
          }
          newRange.collapse(true)
          const sel = window.getSelection()
          if (sel) {
            sel.removeAllRanges()
            sel.addRange(newRange)
          }
          this.editor.focus()
        } else {
          const currentSel = window.getSelection() // 如果都没有，检查当前选择是否还在编辑器内
          if (currentSel && currentSel.rangeCount > 0) {
            const currentRange = currentSel.getRangeAt(0)
            if (this.editor.contains(currentRange.commonAncestorContainer)) {
              this.editor.focus()
            } else {
              const firstP = this.editor.querySelector('p')
              if (firstP) {
                const newRange = document.createRange()
                newRange.setStart(firstP, 0)
                newRange.collapse(true)
                const sel = window.getSelection()
                if (sel) {
                  sel.removeAllRanges()
                  sel.addRange(newRange)
                }
                this.editor.focus()
              }
            }
          }
        }
      })
      
      if (result.shouldEmit !== false) { // 延迟 emit（不阻塞）
        this.stateManager.updateState(state => ({ // 延长 isUpdating 时间，确保 watch 和 handleInput 完全跳过
          ...state,
          isUpdating: true
        }))
        
        requestAnimationFrame(() => {
          if (this.emitCallback) {
            this.emitCallback(result.newState!.content)
          }
          
          setTimeout(() => { // 延迟清除 isUpdating，确保 watch 和 handleInput 完全跳过
            this.stateManager.updateState(state => ({
              ...state,
              isUpdating: false
            }))
          }, 500) // 500ms 足够跳过所有后续事件
        })
      }
    } else {
      this.stateManager.updateState(state => ({ // 如果命令失败，重置 isUpdating
        ...state,
        isUpdating: false
      }))
    }
  }
  
  /**
   * 处理输入事件
   */
  handleInput(event: Event): void {
    if (this.isCommandExecuting()) { // 检查是否在处理命令
      return // 完全跳过
    }
    // 正常处理输入（这里可以添加其他输入处理逻辑）
  }
  
  /**
   * 创建命令上下文
   */
  private createCommandContext(): CommandContext {
    const selection = window.getSelection()
    const state = this.stateManager.getState()
    
    return {
      editor: this.editor,
      selection: selection && selection.rangeCount > 0 ? selection : null,
      state: {
        content: state.content,
        selection: state.selection
      }
    }
  }
  
  /**
   * 检查是否正在执行命令
   */
  private isCommandExecuting(): boolean {
    const state = this.stateManager.getState()
    return state.isUpdating
  }
}

/**
 * Editor 组件类型定义和工具函数
 */

import type { CommandManager, CommandContext } from './Command'

export interface SelectionInfo { // 简化的选择信息接口（基于Range对象的关键信息）
  startContainer: Node | null
  startOffset: number
  endContainer: Node | null
  endOffset: number
  collapsed: boolean
}

// 基于路径的选择信息接口（更可靠，不依赖节点引用）
export interface PathSelectionInfo {
  startPath: number[]
  startOffset: number
  endPath: number[]
  endOffset: number
  collapsed: boolean
}

export interface ColorOption { // 颜色选项类型
  name: string
  value: string
}

// 当前格式状态类型
export interface CurrentFormat {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikeThrough?: boolean
  heading?: number | null
  listType?: 'ul' | 'ol' | 'taskList' | null
  align?: 'left' | 'center' | 'right' | 'justify' | null
  blockquote?: boolean
  codeBlock?: boolean
  link?: string | null
  superscript?: boolean
  subscript?: boolean
  code?: boolean
  highlight?: boolean
}

export const textColors: ColorOption[] = [ // 颜色选项
  { name: '黑色', value: '#000000' },
  { name: '深灰', value: '#333333' },
  { name: '灰色', value: '#666666' },
  { name: '浅灰', value: '#999999' },
  { name: '白色', value: '#ffffff' },
  { name: '红色', value: '#ef4444' },
  { name: '橙色', value: '#f97316' },
  { name: '黄色', value: '#eab308' },
  { name: '绿色', value: '#22c55e' },
  { name: '蓝色', value: '#3b82f6' },
  { name: '靛蓝', value: '#6366f1' },
  { name: '紫色', value: '#a855f7' },
  { name: '粉色', value: '#ec4899' },
]

export const blockTags = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'blockquote', 'pre', 'ul', 'ol', 'li', 'hr', 'table']) // 块级标签集合

export const maxHistorySize = 50 // 历史记录最大大小

export const saveSelectionInfo = (editorRef: HTMLElement | null): SelectionInfo | null => { // 保存选择信息（基于Range对象）
  if (!editorRef) return null
  
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return null
  
  const range = selection.getRangeAt(0)
  if (!editorRef.contains(range.commonAncestorContainer)) return null
  
  return {
    startContainer: range.startContainer,
    startOffset: range.startOffset,
    endContainer: range.endContainer,
    endOffset: range.endOffset,
    collapsed: range.collapsed
  }
}

export const restoreSelectionInfo = (info: SelectionInfo | null, editorRef: HTMLElement | null): boolean => { // 恢复选择信息
  if (!info || !editorRef) {
    return false
  }
  
  if (!info.startContainer || !info.endContainer) { // 验证节点是否仍然在文档中
    return false
  }
  
  const startInDoc = editorRef.contains(info.startContainer)
  const endInDoc = editorRef.contains(info.endContainer)
  if (!startInDoc || !endInDoc) {
    return false
  }
  
  const selection = window.getSelection()
  if (!selection) return false
  
  try {
    const range = document.createRange()
    
    if (info.startContainer.nodeType === Node.TEXT_NODE) { // 验证并设置起始位置
      const textNode = info.startContainer as Text
      const maxOffset = textNode.textContent?.length || 0
      const safeOffset = Math.max(0, Math.min(info.startOffset, maxOffset))
      range.setStart(textNode, safeOffset)
    } else {
      const maxOffset = info.startContainer.childNodes.length
      const safeOffset = Math.max(0, Math.min(info.startOffset, maxOffset))
      range.setStart(info.startContainer, safeOffset)
    }
    
    // 设置结束位置
    if (info.collapsed) {
      range.collapse(true)
    } else {
      if (info.endContainer.nodeType === Node.TEXT_NODE) {
        const textNode = info.endContainer as Text
        const maxOffset = textNode.textContent?.length || 0
        const safeOffset = Math.max(0, Math.min(info.endOffset, maxOffset))
        range.setEnd(textNode, safeOffset)
      } else {
        const maxOffset = info.endContainer.childNodes.length
        const safeOffset = Math.max(0, Math.min(info.endOffset, maxOffset))
        range.setEnd(info.endContainer, safeOffset)
      }
    }
    
    selection.removeAllRanges()
    selection.addRange(range)
    editorRef.focus()
    return true
  } catch (e) {
    return false
  }
}

/**
 * 获取节点在编辑器中的路径
 * 路径是一个数字数组，表示从编辑器根节点到目标节点的索引序列
 */
export const getNodePath = (node: Node, root: HTMLElement): number[] | null => {
  const path: number[] = []
  let current: Node | null = node
  
  while (current && current !== root) { // 向上遍历到根节点
    const parent: Node | null = current.parentNode
    if (!parent) return null
    
    let index = -1 // 找到当前节点在父节点中的索引
    for (let i = 0; i < parent.childNodes.length; i++) {
      if (parent.childNodes[i] === current) {
        index = i
        break
      }
    }
    
    if (index === -1) return null
    path.unshift(index)
    current = parent
  }
  
  return path.length > 0 ? path : null
}

export const getNodeByPath = (path: number[], root: HTMLElement): Node | null => { // 根据路径获取节点
  let current: Node = root
  
  for (const index of path) {
    if (index < 0 || index >= current.childNodes.length) {
      return null
    }
    current = current.childNodes[index]
  }
  
  return current
}

export const savePathSelectionInfo = (editorRef: HTMLElement | null): PathSelectionInfo | null => { // 保存选择信息（基于路径，保留用于将来的功能）
  if (!editorRef) return null
  
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return null
  
  const range = selection.getRangeAt(0)
  if (!editorRef.contains(range.commonAncestorContainer)) return null
  
  const startPath = getNodePath(range.startContainer, editorRef)
  const endPath = getNodePath(range.endContainer, editorRef)
  
  if (!startPath || !endPath) return null
  
  return {
    startPath,
    startOffset: range.startOffset,
    endPath,
    endOffset: range.endOffset,
    collapsed: range.collapsed
  }
}

/**
 * 恢复选择信息（基于路径）
 */
export const restorePathSelectionInfo = (info: PathSelectionInfo | null, editorRef: HTMLElement | null): boolean => {
  if (!info || !editorRef) return false
  
  const selection = window.getSelection()
  if (!selection) return false
  
  try {
    const startNode = getNodeByPath(info.startPath, editorRef)
    const endNode = getNodeByPath(info.endPath, editorRef)
    
    if (!startNode || !endNode) return false
    
    const range = document.createRange()
    
    if (startNode.nodeType === Node.TEXT_NODE) { // 设置起始位置
      const textNode = startNode as Text
      const maxOffset = textNode.textContent?.length || 0
      const safeOffset = Math.max(0, Math.min(info.startOffset, maxOffset))
      range.setStart(textNode, safeOffset)
    } else {
      const maxOffset = startNode.childNodes.length
      const safeOffset = Math.max(0, Math.min(info.startOffset, maxOffset))
      range.setStart(startNode, safeOffset)
    }
    
    if (info.collapsed) { // 设置结束位置
      range.collapse(true)
    } else {
      if (endNode.nodeType === Node.TEXT_NODE) {
        const textNode = endNode as Text
        const maxOffset = textNode.textContent?.length || 0
        const safeOffset = Math.max(0, Math.min(info.endOffset, maxOffset))
        range.setEnd(textNode, safeOffset)
      } else {
        const maxOffset = endNode.childNodes.length
        const safeOffset = Math.max(0, Math.min(info.endOffset, maxOffset))
        range.setEnd(endNode, safeOffset)
      }
    }
    
    selection.removeAllRanges()
    selection.addRange(range)
    editorRef.focus()
    return true
  } catch (e) {
    return false
  }
}

export const findParentElement = (node: Node, tagName: string | string[], root: HTMLElement): Element | null => { // 向上查找指定标签的父元素
  let element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as Element
  const tags = Array.isArray(tagName) ? tagName : [tagName]
  while (element && element !== root) {
    if (tags.includes(element.tagName.toLowerCase())) return element
    element = element.parentElement
  }
  return null
}

export const rgbToHex = (rgb: string): string => { // RGB 转 Hex
  const rgbMatch = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  if (!rgbMatch) return rgb

  const toHex = (c: number) => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return '#' + toHex(parseInt(rgbMatch[1])) + toHex(parseInt(rgbMatch[2])) + toHex(parseInt(rgbMatch[3]))
}

export const queryCommandState = (command: string): boolean => { // 包装废弃的 queryCommandState API
  return (document as any).queryCommandState(command) as boolean
}

export const queryCommandValue = (command: string): string => { // 包装废弃的 queryCommandValue API
  return (document as any).queryCommandValue(command) as string
}

export interface EditorJSONNode { // JSON 节点类型
  type: string
  attrs?: Record<string, any>
  content?: EditorJSONNode[]
  text?: string
  marks?: Array<{ type: string; attrs?: Record<string, any> }>
}

export interface EditorJSON { // JSON 文档类型
  type: 'doc'
  content: EditorJSONNode[]
}

const extractAttributes = (element: Element): Record<string, any> => { // 提取元素属性
  const attrs: Record<string, any> = {}
  
  Array.from(element.attributes).forEach(attr => { // 提取所有属性
    const name = attr.name
    const value = attr.value
    
    if (name === 'style') { // 处理特殊属性：解析 style 属性
      const styles: Record<string, string> = {}
      value.split(';').forEach(style => {
        const [key, val] = style.split(':').map(s => s.trim())
        if (key && val) {
          styles[key] = val
        }
      })
      if (Object.keys(styles).length > 0) {
        attrs.style = styles
      }
    } else if (name === 'class') {
      attrs.class = value
    } else if (name === 'href' || name === 'src' || name === 'alt' || name === 'title') {
      attrs[name] = value
    } else if (name.startsWith('data-')) {
      attrs[name] = value
    }
  })
  
  if (element.tagName.match(/^H[1-6]$/i)) { // 特殊处理：标题级别
    attrs.level = parseInt(element.tagName.charAt(1))
  }
  
  if (element.tagName === 'OL') { // 特殊处理：列表类型
    const start = element.getAttribute('start')
    if (start) attrs.start = parseInt(start)
  }
  
  return attrs
}

const extractMarks = (element: Element): Array<{ type: string; attrs?: Record<string, any> }> => { // 提取行内格式标记
  const marks: Array<{ type: string; attrs?: Record<string, any> }> = []
  
  const formatTags: Record<string, string> = { // 检查格式标签
    'strong': 'bold',
    'b': 'bold',
    'em': 'italic',
    'i': 'italic',
    'u': 'underline',
    's': 'strike',
    'del': 'strike',
    'code': 'code',
    'sup': 'superscript',
    'sub': 'subscript'
  }
  
  const tagName = element.tagName.toLowerCase()
  if (formatTags[tagName]) {
    marks.push({ type: formatTags[tagName] })
  }
  
  // 只提取 span 的字体颜色，不提取 mark 的字体颜色（mark 只有背景色）
  if (tagName === 'span') {
    const color = element.getAttribute('style')?.match(/color:\s*([^;]+)/)?.[1] // 检查颜色
    if (color) {
      marks.push({ type: 'textColor', attrs: { color: color.trim() } })
    }
  }
  
  // 只提取 mark 的背景色，不提取 span 的背景色
  if (tagName === 'mark') {
    const backgroundColor = element.getAttribute('style')?.match(/background-color:\s*([^;]+)/)?.[1] // 检查背景色（高亮）
    if (backgroundColor) {
      marks.push({ type: 'highlight', attrs: { color: backgroundColor.trim() } })
    }
  }
  
  if (tagName === 'a') { // 检查链接
    const href = element.getAttribute('href')
    const target = element.getAttribute('target')
    const rel = element.getAttribute('rel')
    marks.push({
      type: 'link',
      attrs: {
        href: href || '',
        target: target || undefined,
        rel: rel || undefined
      }
    })
  }
  
  return marks
}

export const htmlToJSON = (html: string, rootElement: HTMLElement): EditorJSON => { // HTML 转 JSON
  if (!html || !rootElement) {
    return { type: 'doc', content: [] }
  }
  
  const temp = document.createElement('div') // 创建临时容器解析 HTML
  temp.innerHTML = html
  
  const content: EditorJSONNode[] = []
  
  const nodeToJSON = (node: Node): EditorJSONNode | null => { // 递归转换节点
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node as Text).textContent || ''
      if (!text.trim() && text !== '\n') return null
      return { type: 'text', text }
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
      const tagName = element.tagName.toLowerCase()
      
      if (['script', 'style', 'meta', 'link'].includes(tagName)) { // 跳过 script、style 等标签
        return null
      }
      
      if (blockTags.has(tagName)) { // 处理块级元素
        const children: EditorJSONNode[] = []
        
        const hasOnlyBr = element.childNodes.length === 1 && // 检查是否只有 <br> 标签（空段落）
          element.firstChild?.nodeType === Node.ELEMENT_NODE &&
          (element.firstChild as Element).tagName.toLowerCase() === 'br'
        
        Array.from(element.childNodes).forEach(child => { // 处理子节点
          if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName.toLowerCase() === 'br') { // 如果是 <br> 标签，保留它（用于空段落，作为零宽空格，确保段落有高度）
            children.push({ type: 'text', text: '\u200B' })
            return
          }
          
          const childJSON = nodeToJSON(child)
          if (childJSON) {
            if (childJSON.type === 'text') { // 如果是文本节点，直接添加
              children.push(childJSON)
            } else { // 如果是元素节点，检查是否需要提取 marks
              const marks = extractMarks(element)
              if (marks.length > 0 && childJSON.type === 'text') {
                children.push({ ...childJSON, marks })
              } else {
                children.push(childJSON)
              }
            }
          }
        })
        
        if (hasOnlyBr && children.length === 0) { // 如果段落只有 <br>，确保有内容
          children.push({ type: 'text', text: '\u200B' })
        }
        
        const marks = extractMarks(element) // 处理行内格式（如果块级元素本身有格式）
        const attrs = extractAttributes(element)
        
        if (tagName === 'li') { // 特殊处理：列表项
          const checkbox = element.querySelector('input[type="checkbox"]')
          if (checkbox) {
            return {
              type: 'taskItem',
              attrs: {
                checked: (checkbox as HTMLInputElement).checked
              },
              content: children.length > 0 ? children : undefined
            }
          }
        }
        
        if (tagName === 'pre') { // 特殊处理：代码块
          const code = element.querySelector('code')
          if (code) {
            return {
              type: 'codeBlock',
              attrs,
              content: code.textContent ? [{ type: 'text', text: code.textContent }] : undefined
            }
          }
        }
        
        if (tagName === 'ul' || tagName === 'ol') { // 特殊处理：列表
          const listItems: EditorJSONNode[] = []
          Array.from(element.querySelectorAll('li')).forEach(li => {
            const itemJSON = nodeToJSON(li)
            if (itemJSON) {
              listItems.push({
                type: 'listItem',
                content: itemJSON.content || []
              })
            }
          })
          return {
            type: tagName === 'ul' ? 'bulletList' : 'orderedList',
            attrs,
            content: listItems
          }
        }
        
        // 映射标签名到 JSON 类型
        const typeMap: Record<string, string> = {
          'p': 'paragraph',
          'h1': 'heading',
          'h2': 'heading',
          'h3': 'heading',
          'h4': 'heading',
          'h5': 'heading',
          'h6': 'heading',
          'blockquote': 'blockquote',
          'hr': 'horizontalRule',
          'div': 'paragraph'
        }
        
        const type = typeMap[tagName] || tagName
        
        return {
          type,
          attrs,
          content: children.length > 0 ? children : undefined,
          marks: marks.length > 0 ? marks : undefined
        }
      } else {
        const children: EditorJSONNode[] = [] // 处理行内元素
        Array.from(element.childNodes).forEach(child => {
          const childJSON = nodeToJSON(child)
          if (childJSON) children.push(childJSON)
        })
        
        const marks = extractMarks(element)
        
        if (children.length === 1 && children[0].type === 'text' && marks.length > 0) { // 如果只有文本内容，合并为带 marks 的文本节点
          // 合并 marks：先应用子节点的 marks，再应用父元素的 marks（从内到外）
          const childMarks = children[0].marks || []
          // 去重相同类型的 marks，保留最后一个（外层优先级更高）
          const allMarks = [...childMarks, ...marks]
          const mergedMarks: Array<{ type: string; attrs?: Record<string, any> }> = []
          const seenTypes = new Map<string, number>()
          
          // 从后往前遍历，保留最后一个相同类型的 mark
          for (let i = allMarks.length - 1; i >= 0; i--) {
            const mark = allMarks[i]
            const key = mark.type
            if (!seenTypes.has(key)) {
              seenTypes.set(key, i)
              mergedMarks.unshift(mark) // 从前面插入，保持顺序
            }
          }
          
          return {
            ...children[0],
            marks: mergedMarks
          }
        }
        
        return { // 否则返回元素节点
          type: tagName,
          attrs: extractAttributes(element),
          content: children.length > 0 ? children : undefined,
          marks: marks.length > 0 ? marks : undefined
        }
      }
    }
    
    return null
  }
  
  Array.from(temp.childNodes).forEach(node => { // 转换所有子节点
    const json = nodeToJSON(node)
    if (json) {
      content.push(json)
    }
  })
  
  if (content.length === 0) { // 如果没有内容，创建一个空段落
    content.push({ type: 'paragraph' })
  }
  
  return { type: 'doc', content }
}

export const jsonToHTML = (json: EditorJSON): string => { // JSON 转 HTML
  if (!json || json.type !== 'doc' || !json.content) {
    return '<p></p>'
  }
  
  const applyMarks = (text: string, marks?: Array<{ type: string; attrs?: Record<string, any> }>): string => { // 应用 marks 到文本
    if (!marks || marks.length === 0) return text
    
    // 去重相同类型的 marks，只保留最后一个（从内到外，最后一个优先级最高）
    const deduplicatedMarks: Array<{ type: string; attrs?: Record<string, any> }> = []
    const seenTypes = new Set<string>()
    
    // 从后往前遍历，保留最后一个相同类型的 mark（只按类型去重，不按颜色）
    for (let i = marks.length - 1; i >= 0; i--) {
      const mark = marks[i]
      const key = mark.type // 只按类型去重，不按颜色值
      if (!seenTypes.has(key)) {
        seenTypes.add(key)
        deduplicatedMarks.unshift(mark) // 从前面插入，保持顺序
      }
    }
    
    let result = text
    const markMap: Record<string, string> = {
      'bold': 'strong',
      'italic': 'em',
      'underline': 'u',
      'strike': 's',
      'code': 'code',
      'superscript': 'sup',
      'subscript': 'sub'
    }
    
    // 按顺序应用 marks，但确保相同类型的 mark 只应用一次（使用最后一个值）
    let textColor: string | null = null
    let highlightColor: string | null = null
    let linkHref: string | null = null
    let linkTarget: string | undefined = undefined
    let linkRel: string | undefined = undefined
    const otherMarks: Array<{ type: string }> = []
    
    // 收集所有 marks，相同类型只保留最后一个
    deduplicatedMarks.forEach(mark => {
      if (mark.type === 'textColor' && mark.attrs?.color) {
        textColor = mark.attrs.color as string
      } else if (mark.type === 'highlight' && mark.attrs?.color) {
        highlightColor = mark.attrs.color as string
      } else if (mark.type === 'link' && mark.attrs?.href) {
        linkHref = mark.attrs.href as string
        linkTarget = mark.attrs.target as string | undefined
        linkRel = mark.attrs.rel as string | undefined
      } else if (markMap[mark.type]) {
        otherMarks.push(mark)
      }
    })
    
    // 从内到外应用 marks：先应用其他格式，再应用字体颜色，最后应用高亮
    otherMarks.forEach(mark => {
      result = `<${markMap[mark.type]}>${result}</${markMap[mark.type]}>`
    })
    
    if (textColor) {
      result = `<span style="color: ${textColor}">${result}</span>`
    }
    
    if (linkHref) {
      const attrs = []
      attrs.push(`href="${escapeHtml(linkHref)}"`)
      if (linkTarget) attrs.push(`target="${escapeHtml(linkTarget)}"`)
      if (linkRel) attrs.push(`rel="${escapeHtml(linkRel)}"`)
      result = `<a ${attrs.join(' ')}>${result}</a>`
    }
    
    if (highlightColor) {
      result = `<mark style="background-color: ${highlightColor}">${result}</mark>`
    }
    
    return result
  }
  
  const nodeToHTML = (node: EditorJSONNode): string => {
    if (node.type === 'text') {
      const text = escapeHtml(node.text || '')
      return applyMarks(text, node.marks) // 文本节点应用 marks
    }
    
    let content = '' // 处理子节点内容
    if (node.content) {
      content = node.content.map(child => nodeToHTML(child)).join('')
    }
    
    const typeMap: Record<string, string> = { // 处理块级元素
      'paragraph': 'p',
      'heading': 'h',
      'blockquote': 'blockquote',
      'codeBlock': 'pre',
      'horizontalRule': 'hr',
      'bulletList': 'ul',
      'orderedList': 'ol',
      'listItem': 'li',
      'taskItem': 'li'
    }
    
    const tagName = typeMap[node.type] || node.type
    
    // 特殊处理：标题
    if (node.type === 'heading') {
      const level = node.attrs?.level || 1
      const attrs = formatAttributes(node.attrs)
      return `<h${level}${attrs}>${content}</h${level}>`
    }
    
    if (node.type === 'codeBlock') { // 特殊处理：代码块
      const attrs = formatAttributes(node.attrs)
      return `<pre${attrs}><code>${content}</code></pre>`
    }
    
    if (node.type === 'taskItem') { // 特殊处理：任务列表项
      const checked = node.attrs?.checked ? 'checked' : ''
      return `<li><input type="checkbox" class="ckb ckb-xs ckb-primary mr-2" ${checked}>${content}</li>`
    }
    
    if (node.type === 'listItem') { // 特殊处理：列表项
      return `<li>${content}</li>`
    }
    
    if (node.type === 'horizontalRule') { // 特殊处理：分隔线
      return '<hr>'
    }
    
    // 特殊处理：列表
    if (node.type === 'bulletList' || node.type === 'orderedList') {
      const attrs = formatAttributes(node.attrs)
      const items = node.content?.map(nodeToHTML).join('') || ''
      return `<${tagName}${attrs}>${items}</${tagName}>`
    }
    
    if (blockTags.has(tagName)) { // 普通块级元素
      const attrs = formatAttributes(node.attrs)
      if (tagName === 'p' && (!content || content.trim() === '\u200B' || content.trim() === '')) { // 如果段落内容为空或只有零宽空格，使用 <br> 保持高度
        return `<${tagName}${attrs}><br></${tagName}>`
      }
      return `<${tagName}${attrs}>${content}</${tagName}>`
    }
    
    const attrs = formatAttributes(node.attrs) // 行内元素
    return `<${tagName}${attrs}>${content}</${tagName}>`
  }
  
  return json.content.map(nodeToHTML).join('')
}

const formatAttributes = (attrs?: Record<string, any>): string => { // 格式化属性
  if (!attrs || Object.keys(attrs).length === 0) return ''
  
  const parts: string[] = []
  
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'style' && typeof value === 'object') {
      const styles = Object.entries(value).map(([k, v]) => `${k}: ${v}`).join('; ')
      if (styles) parts.push(`style="${escapeHtml(styles)}"`)
    } else if (key === 'class' && value) {
      parts.push(`class="${escapeHtml(String(value))}"`)
    } else if (key !== 'level' && value !== undefined && value !== null) {
      parts.push(`${key}="${escapeHtml(String(value))}"`)
    }
  })
  
  return parts.length > 0 ? ' ' + parts.join(' ') : ''
}

const escapeHtml = (text: string): string => { // HTML 转义
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

export const isHTMLString = (value: any): boolean => { // 检测是否为 HTML 字符串（简单检测：包含 HTML 标签）
  if (typeof value !== 'string') return false
  return /<[a-z][\s\S]*>/i.test(value)
}

export const isJSONFormat = (value: any): boolean => { // 检测是否为 JSON 格式
  if (typeof value === 'object' && value !== null) {
    return value.type === 'doc' && Array.isArray(value.content)
  }
  return false
}

export const isMarkdownFormat = (value: any): boolean => { // 检测是否为 Markdown 格式
  if (typeof value !== 'string') return false
  if (isHTMLString(value)) return false // HTML 优先
  
  // 检测常见的 Markdown 语法特征
  const markdownPatterns = [
    /^#{1,6}\s+.+$/m,           // 标题 (# 标题)
    /^\s*[-*+]\s+.+$/m,         // 无序列表 (- 或 * 或 +)
    /^\s*\d+\.\s+.+$/m,         // 有序列表 (1. 项目)
    /^\s*>\s+.+$/m,              // 引用 (> 引用)
    /```[\s\S]*?```/,            // 代码块 (```代码```)
    /`[^`]+`/,                   // 行内代码 (`代码`)
    /\[.+\]\(.+\)/,              // 链接 ([文本](url))
    /!\[.+\]\(.+\)/,             // 图片 (![alt](url))
    /^\s*\|.+\|$/m,              // 表格 (| 列1 | 列2 |)
    /^\s*---+\s*$/,              // 水平线 (---)
    /\*\*[^*]+\*\*/,             // 粗体 (**文本**)
    /\*[^*]+\*/,                 // 斜体 (*文本*)
    /~~[^~]+~~/,                 // 删除线 (~~文本~~)
  ]
  
  return markdownPatterns.some(pattern => pattern.test(value))
}

/**
 * Markdown 转 JSON
 * @param markdown Markdown 字符串
 * @param rootElement 根元素（用于创建临时容器）
 * @returns EditorJSON
 */
export const markdownToJSON = (markdown: string, rootElement: HTMLElement): EditorJSON => {
  if (!markdown || !rootElement) {
    return { type: 'doc', content: [{ type: 'paragraph' }] }
  }

  // 创建一个临时容器来解析 Markdown
  const temp = document.createElement('div')
  
  // 简单的 Markdown 到 HTML 转换（可以后续使用更强大的库如 marked.js）
  let html = markdown
  
  // 处理标题
  html = html.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, text) => {
    const level = hashes.length
    return `<h${level}>${text}</h${level}>`
  })
  
  // 处理粗体 (**text** 或 __text__)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>')
  
  // 处理斜体 (*text* 或 _text_)
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>')
  
  // 处理删除线 (~~text~~)
  html = html.replace(/~~([^~]+)~~/g, '<s>$1</s>')
  
  // 处理行内代码 (`code`)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // 处理代码块 (```language\ncode\n```)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || ''
    return `<pre><code${language ? ` class="language-${language}"` : ''}>${code.trim()}</code></pre>`
  })
  
  // 处理链接 ([text](url))
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  
  // 处理图片 (![alt](url))
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
  
  // 处理引用 (> text)
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>')
  
  // 处理列表（先处理有序列表，再处理无序列表，避免冲突）
  const lines = html.split('\n')
  const processedLines: string[] = []
  let inUnorderedList = false
  let inOrderedList = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const unorderedMatch = line.match(/^(\s*)[-*+]\s+(.+)$/)
    const orderedMatch = line.match(/^(\s*)\d+\.\s+(.+)$/)
    
    if (orderedMatch) {
      // 有序列表项
      if (!inOrderedList) {
        if (inUnorderedList) {
          processedLines.push('</ul>')
          inUnorderedList = false
        }
        processedLines.push('<ol>')
        inOrderedList = true
      }
      processedLines.push(`<li>${orderedMatch[2]}</li>`)
    } else if (unorderedMatch) {
      // 无序列表项
      if (!inUnorderedList) {
        if (inOrderedList) {
          processedLines.push('</ol>')
          inOrderedList = false
        }
        processedLines.push('<ul>')
        inUnorderedList = true
      }
      processedLines.push(`<li>${unorderedMatch[2]}</li>`)
    } else {
      // 非列表项，关闭当前列表
      if (inOrderedList) {
        processedLines.push('</ol>')
        inOrderedList = false
      }
      if (inUnorderedList) {
        processedLines.push('</ul>')
        inUnorderedList = false
      }
      processedLines.push(line)
    }
  }
  
  // 关闭未关闭的列表
  if (inOrderedList) {
    processedLines.push('</ol>')
  }
  if (inUnorderedList) {
    processedLines.push('</ul>')
  }
  
  html = processedLines.join('\n')
  
  // 处理水平线 (--- 或 ***)
  html = html.replace(/^[-*]{3,}$/gm, '<hr>')
  
  // 处理段落（将连续的非空行包装为段落）
  const paragraphLines = html.split('\n')
  const finalLines: string[] = []
  let currentParagraph: string[] = []
  
  for (const line of paragraphLines) {
    const trimmed = line.trim()
    if (!trimmed) {
      if (currentParagraph.length > 0) {
        finalLines.push(`<p>${currentParagraph.join(' ')}</p>`)
        currentParagraph = []
      }
      finalLines.push('')
    } else if (trimmed.startsWith('<') && (trimmed.endsWith('>') || trimmed.includes('</'))) {
      // 已经是 HTML 标签（包括闭合标签），直接添加
      if (currentParagraph.length > 0) {
        finalLines.push(`<p>${currentParagraph.join(' ')}</p>`)
        currentParagraph = []
      }
      finalLines.push(trimmed)
    } else {
      currentParagraph.push(trimmed)
    }
  }
  
  if (currentParagraph.length > 0) {
    finalLines.push(`<p>${currentParagraph.join(' ')}</p>`)
  }
  
  html = finalLines.join('\n')
  
  // 将 HTML 字符串设置到临时容器
  temp.innerHTML = html
  
  // 使用现有的 htmlToJSON 函数转换
  return htmlToJSON(temp.innerHTML, rootElement)
}

/**
 * JSON 转 Markdown
 * @param json EditorJSON
 * @returns Markdown 字符串
 */
export const jsonToMarkdown = (json: EditorJSON): string => {
  if (!json || !json.content) return ''
  
  const nodeToMarkdown = (node: EditorJSONNode, indent = ''): string => {
    if (node.type === 'text') {
      let text = node.text || ''
      
      // 应用 marks
      if (node.marks) {
        // 按优先级处理 marks（从内到外）
        const marks = [...node.marks].reverse()
        marks.forEach(mark => {
          switch (mark.type) {
            case 'bold':
              text = `**${text}**`
              break
            case 'italic':
              text = `*${text}*`
              break
            case 'strike':
              text = `~~${text}~~`
              break
            case 'code':
              text = `\`${text}\``
              break
            case 'link':
              const href = mark.attrs?.href || ''
              text = `[${text}](${href})`
              break
          }
        })
      }
      
      return text
    }
    
    const children = node.content ? node.content.map(child => nodeToMarkdown(child, indent)).join('') : ''
    
    switch (node.type) {
      case 'paragraph':
        return children ? `${children}\n\n` : '\n\n'
      case 'heading':
        const level = node.attrs?.level || 1
        const hashes = '#'.repeat(level)
        return `${hashes} ${children.trim()}\n\n`
      case 'bulletList':
        const items = node.content ? node.content.map(item => {
          if (item.type === 'listItem') {
            const itemContent = item.content ? item.content.map(child => nodeToMarkdown(child, indent + '  ')).join('').trim() : ''
            return `${indent}- ${itemContent}`
          }
          return ''
        }).filter(Boolean).join('\n') : ''
        return items ? `${items}\n\n` : ''
      case 'orderedList':
        const orderedItems = node.content ? node.content.map((item, index) => {
          if (item.type === 'listItem') {
            const itemContent = item.content ? item.content.map(child => nodeToMarkdown(child, indent + '  ')).join('').trim() : ''
            return `${indent}${index + 1}. ${itemContent}`
          }
          return ''
        }).filter(Boolean).join('\n') : ''
        return orderedItems ? `${orderedItems}\n\n` : ''
      case 'listItem':
        return children
      case 'blockquote':
        const quoteLines = children.trim().split('\n').map(line => `> ${line}`).join('\n')
        return `${quoteLines}\n\n`
      case 'codeBlock':
        const language = node.attrs?.language || ''
        const code = children.trim()
        return `\`\`\`${language}\n${code}\n\`\`\`\n\n`
      case 'hardBreak':
        return '\n'
      case 'horizontalRule':
        return '---\n\n'
      case 'image':
        const src = node.attrs?.src || ''
        const alt = node.attrs?.alt || ''
        return `![${alt}](${src})\n\n`
      default:
        return children
    }
  }
  
  const markdown = json.content.map(node => nodeToMarkdown(node)).join('')
  return markdown.trim()
}

/**
 * JSON 路径光标系统（保留用于将来的功能）
 * 
 * 注意：以下代码目前未被使用，但保留用于将来的功能实现
 * 如果将来需要实现基于 JSON 路径的光标管理系统，可以使用这些函数
 */

export interface JSONPath { // JSON 路径类型：在 JSON 树中的路径，例如 [0, 1, 0] 表示 doc.content[0].content[1].content[0]
  path: number[] // JSON 树路径
  offset: number // 在文本节点中的字符偏移量
}

export interface JSONSelectionInfo { // JSON 选择信息
  startPath: JSONPath
  endPath: JSONPath
  collapsed: boolean
}

interface PathCache { // 位置缓存：缓存 DOM 节点到 JSON 路径的映射，提升性能
  domNode: Node
  jsonPath: JSONPath
  timestamp: number
}

const pathCacheMap = new WeakMap<HTMLElement, Map<Node, PathCache>>() // 使用 WeakMap 存储缓存，避免内存泄漏
const CACHE_TTL = 1000 // 缓存有效期 1 秒
const cleanExpiredCache = (rootElement: HTMLElement) => {
  const cache = pathCacheMap.get(rootElement)
  if (!cache) return
  
  const now = Date.now()
  for (const [node, cached] of Array.from(cache.entries())) {
    if (now - cached.timestamp > CACHE_TTL) {
      cache.delete(node)
    }
  }
}

const getCachedPath = (domNode: Node, rootElement: HTMLElement): JSONPath | null => { // 获取缓存
  const cache = pathCacheMap.get(rootElement)
  if (!cache) return null
  
  const cached = cache.get(domNode)
  if (!cached) return null
  
  const now = Date.now()
  if (now - cached.timestamp > CACHE_TTL) {
    cache.delete(domNode)
    return null
  }
  
  return cached.jsonPath
}

const setCachedPath = (domNode: Node, jsonPath: JSONPath, rootElement: HTMLElement) => { // 设置缓存
  let cache = pathCacheMap.get(rootElement)
  if (!cache) {
    cache = new Map()
    pathCacheMap.set(rootElement, cache)
  }
  
  cache.set(domNode, {
    domNode,
    jsonPath,
    timestamp: Date.now()
  })
  
  if (cache.size > 100) { // 定期清理过期缓存
    cleanExpiredCache(rootElement)
  }
}

export const clearPathCache = (rootElement: HTMLElement) => { // 清除所有缓存
  pathCacheMap.delete(rootElement)
}

/**
 * 从 DOM Range 和 JSON 数据计算 JSON 路径
 * 
 * 优化说明：
 * 1. 改进行内格式嵌套处理：正确处理 bold, italic, link 等行内格式
 * 2. 改进文本节点映射准确性：考虑行内格式元素的嵌套结构
 * 3. 添加位置缓存机制：减少重复计算，提升性能
 * 4. 改进边界情况处理：处理空节点、特殊格式组合等边缘场景
 */
export const getJSONPathFromRange = (
  range: Range,
  json: EditorJSON,
  rootElement: HTMLElement
): JSONPath | null => {
  if (!rootElement.contains(range.commonAncestorContainer)) return null
  
  const startNode = range.startContainer // 找到光标所在的 DOM 节点
  const offset = range.startOffset
  
  const cached = getCachedPath(startNode, rootElement) // 尝试从缓存获取
  if (cached && cached.offset === offset) { // 如果偏移量相同，直接返回缓存
    return cached
  }
  
  const result = mapDOMPositionToJSONPath(startNode, offset, json, rootElement) // 将 DOM 位置映射到 JSON 路径
  if (result) { // 缓存结果
    setCachedPath(startNode, result, rootElement)
  }
  
  return result
}

const mapDOMPositionToJSONPath = ( // 将 DOM 位置映射到 JSON 路径（优化版本：改进行内格式嵌套处理和文本节点映射）
  domNode: Node,
  domOffset: number,
  json: EditorJSON,
  rootElement: HTMLElement
): JSONPath | null => {
  let currentDOMNode: Node | null = domNode // 找到 DOM 节点在编辑器中的位置
  const domPath: Node[] = []
  
  while (currentDOMNode && currentDOMNode !== rootElement) { // 向上遍历到根元素
    domPath.unshift(currentDOMNode)
    currentDOMNode = currentDOMNode.parentNode
  }
  
  if (domPath.length === 0) return null
  
  const jsonPath: number[] = [] // 将 DOM 路径映射到 JSON 路径
  let currentOffset = domOffset
  
  for (let i = 0; i < domPath.length; i++) { // 遍历 DOM 路径，找到对应的 JSON 节点
    const domNode = domPath[i]
    
    if (domNode.nodeType === Node.TEXT_NODE) {
      const textNode = domNode as Text // 文本节点：找到对应的文本节点在 JSON 中的位置（优化：考虑行内格式嵌套）
      const parentElement = textNode.parentElement // 计算在父元素中的索引（考虑行内格式元素）
      if (!parentElement) break
      
      const parentPath = findElementInJSON(parentElement, json, rootElement) // 找到父元素在 JSON 中的路径（优化：处理行内格式，始终使用根 JSON）
      if (!parentPath) {
        let blockParent = parentElement.parentElement // 如果找不到父元素，可能是行内格式元素，向上查找块级元素
        while (blockParent && blockParent !== rootElement) {
          const blockPath = findElementInJSON(blockParent, json, rootElement) // 关键：始终使用根 JSON
          if (blockPath) { // 找到块级元素，计算文本节点在其中的位置
            return findTextNodeInBlockWithInlineFormats(textNode, domOffset, blockPath, json, rootElement)
          }
          blockParent = blockParent.parentElement
        }
        break
      }
      
      const textOffset = calculateTextOffsetWithInlineFormats(textNode, parentElement) // 计算文本节点在父元素中的位置（优化：考虑行内格式）
      const jsonNode = getJSONNodeByPath(parentPath.path, json) // 在 JSON 中找到对应的文本节点（优化：处理 marks）
      if (jsonNode && jsonNode.content) {
        const result = findTextNodeInJSONContent(jsonNode.content, textOffset + currentOffset, parentPath.path)
        if (result) return result
      }
      
      return { // 如果没找到精确匹配，返回父元素路径和计算的偏移量
        path: [...parentPath.path],
        offset: Math.max(0, textOffset + currentOffset)
      }
    } else if (domNode.nodeType === Node.ELEMENT_NODE) {
      const element = domNode as Element // 元素节点：找到在 JSON 中的索引（始终从根 JSON 开始查找）
      const elementPath = findElementInJSON(element, json, rootElement)
      if (!elementPath) {
        const tagName = element.tagName.toLowerCase() // 如果是行内格式元素（strong, em, a等），跳过，继续向上查找
        if (['strong', 'b', 'em', 'i', 'u', 's', 'del', 'code', 'sup', 'sub', 'a', 'span', 'mark'].includes(tagName)) {
          continue
        }
        break
      }
      
      jsonPath.push(...elementPath.path) // 注意：不再需要更新 currentJSON，因为我们已经改为始终从根 JSON 开始查找
    }
  }
  
  return jsonPath.length > 0 ? { path: jsonPath, offset: currentOffset } : null
}

const calculateTextOffsetWithInlineFormats = (textNode: Text, parentElement: Element): number => { // 计算文本节点在父元素中的偏移量（考虑行内格式）
  let textOffset = 0
  let sibling: Node | null = textNode.previousSibling
  
  while (sibling) {
    if (sibling.nodeType === Node.TEXT_NODE) {
      textOffset += (sibling as Text).textContent?.length || 0
    } else if (sibling.nodeType === Node.ELEMENT_NODE) {
      const element = sibling as Element // 对于行内格式元素，计算其文本内容长度
      const tagName = element.tagName.toLowerCase()
      if (['strong', 'b', 'em', 'i', 'u', 's', 'del', 'code', 'sup', 'sub', 'a', 'span', 'mark'].includes(tagName)) {
        textOffset += element.textContent?.length || 0
      } else { // 块级元素，计算其文本内容长度
        textOffset += element.textContent?.length || 0
      }
    }
    sibling = sibling.previousSibling
  }
  
  return textOffset
}

const findTextNodeInJSONContent = ( // 在 JSON 内容中查找文本节点位置（处理 marks）
  content: EditorJSONNode[],
  targetOffset: number,
  basePath: number[]
): JSONPath | null => {
  let currentTextOffset = 0
  
  for (let j = 0; j < content.length; j++) {
    const child = content[j]
    
    if (child.type === 'text') {
      const textLength = child.text?.length || 0
      if (currentTextOffset + textLength >= targetOffset) {
        return {
          path: [...basePath, j],
          offset: targetOffset - currentTextOffset
        }
      }
      currentTextOffset += textLength
    } else if (child.content) {
      const childTextLength = getTextLength(child) // 递归计算子节点的文本长度（考虑 marks）
      if (currentTextOffset + childTextLength >= targetOffset) {
        const childPath = findTextInJSONNode(child, targetOffset - currentTextOffset) // 在子节点中查找
        if (childPath) {
          return {
            path: [...basePath, j, ...childPath.path],
            offset: childPath.offset
          }
        }
      }
      currentTextOffset += childTextLength
    }
  }
  
  return null
}

// 在块级元素中查找文本节点（考虑行内格式嵌套）
const findTextNodeInBlockWithInlineFormats = (
  textNode: Text,
  domOffset: number,
  blockPath: { path: number[] },
  json: EditorJSON,
  rootElement: HTMLElement
): JSONPath | null => {
  const jsonNode = getJSONNodeByPath(blockPath.path, json)
  if (!jsonNode || !jsonNode.content) return null
  
  const textOffset = calculateTextOffsetInBlock(textNode, rootElement) // 计算文本节点在块级元素中的偏移量
  return findTextNodeInJSONContent(jsonNode.content, textOffset + domOffset, blockPath.path) // 在 JSON 内容中查找
}

const calculateTextOffsetInBlock = (textNode: Text, rootElement: HTMLElement): number => { // 计算文本节点在块级元素中的偏移量（优化：处理边界情况）
  if (!textNode.textContent) return 0 // 边界情况：空文本节点
  
  let textOffset = 0
  let current: Node | null = textNode
  
  let blockElement: Element | null = null // 向上找到块级元素
  while (current && current !== rootElement) {
    if (current.nodeType === Node.ELEMENT_NODE) {
      const tagName = (current as Element).tagName.toLowerCase()
      if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'blockquote', 'li'].includes(tagName)) {
        blockElement = current as Element
        break
      }
    }
    current = current.parentNode
  }
  
  if (!blockElement) return 0 // 边界情况：找不到块级元素
  
  current = textNode // 计算文本节点在块级元素中的位置
  while (current && current !== blockElement) {
    let sibling: Node | null = current.previousSibling
    while (sibling) {
      if (sibling.nodeType === Node.TEXT_NODE) {
        const text = (sibling as Text).textContent || ''
        textOffset += text.replace(/\u200B/g, '').length // 边界情况：处理零宽空格
      } else if (sibling.nodeType === Node.ELEMENT_NODE) {
        const element = sibling as Element
        const tagName = element.tagName.toLowerCase()
        if (!['script', 'style', 'meta', 'link'].includes(tagName)) { // 边界情况：跳过 script, style 等标签
          textOffset += element.textContent?.replace(/\u200B/g, '').length || 0
        }
      }
      sibling = sibling.previousSibling
    }
    current = current.parentNode
  }
  
  return textOffset
}

const findElementInJSON = ( // 在 JSON 中查找元素（第一步：实现 DOM 到 JSON 路径映射）
  element: Element,
  json: EditorJSON | EditorJSONNode,
  rootElement: HTMLElement
): { path: number[] } | null => {
  const domPath: Element[] = [] // 通过同步 DOM 和 JSON 结构来查找：1. 找到元素在 DOM 中的路径（相对于 rootElement）
  let current: Element | null = element
  while (current && current !== rootElement) {
    domPath.unshift(current)
    current = current.parentElement
  }
  
  if (domPath.length === 0) return null
  
  const jsonPath: number[] = [] // 2. 在 JSON 中查找对应的路径
  let currentJSON: EditorJSON | EditorJSONNode = json
  let domIndex = 0
  
  while (domIndex < domPath.length && currentJSON) { // 从 JSON 的根节点开始，逐层匹配 DOM 路径
    const domElement = domPath[domIndex]
    const tagName = domElement.tagName.toLowerCase()
    
    let targetType: string | null = null // 根据标签名确定 JSON 节点类型
    if (tagName === 'p' || tagName === 'div') {
      targetType = 'paragraph'
    } else if (tagName.match(/^h[1-6]$/)) {
      targetType = 'heading'
    } else if (tagName === 'ul') {
      targetType = 'bulletList'
    } else if (tagName === 'ol') {
      targetType = 'orderedList'
    } else if (tagName === 'li') {
      targetType = domElement.querySelector('input[type="checkbox"]') ? 'taskItem' : 'listItem' // 检查是否是任务列表项
    } else if (tagName === 'blockquote') {
      targetType = 'blockquote'
    } else if (tagName === 'pre') {
      targetType = 'codeBlock'
    } else if (tagName === 'hr') {
      targetType = 'horizontalRule'
    }
    
    if (!targetType || !currentJSON.content) break
    
    const domParent = domElement.parentElement // 获取当前 DOM 元素在父元素中的索引（只计算同类型的元素）
    if (!domParent) break
    
    const domSiblings = Array.from(domParent.children)
    let domIndexInParent = 0
    for (let j = 0; j < domSiblings.length; j++) {
      if (domSiblings[j] === domElement) {
        domIndexInParent = j
        break
      }
    }
    
    let sameTypeCount = 0 // 计算在父元素中，同类型元素的索引
    for (let j = 0; j <= domIndexInParent; j++) {
      const sibling = domSiblings[j]
      const siblingTagName = sibling.tagName.toLowerCase()
      if (
        (targetType === 'paragraph' && (siblingTagName === 'p' || siblingTagName === 'div')) ||
        (targetType === 'heading' && siblingTagName.match(/^h[1-6]$/)) ||
        (targetType === 'bulletList' && siblingTagName === 'ul') ||
        (targetType === 'orderedList' && siblingTagName === 'ol') ||
        (targetType === 'listItem' && siblingTagName === 'li' && !sibling.querySelector('input[type="checkbox"]')) ||
        (targetType === 'taskItem' && siblingTagName === 'li' && sibling.querySelector('input[type="checkbox"]')) ||
        (targetType === 'blockquote' && siblingTagName === 'blockquote') ||
        (targetType === 'codeBlock' && siblingTagName === 'pre') ||
        (targetType === 'horizontalRule' && siblingTagName === 'hr')
      ) {
      sameTypeCount++
    }
  }
  
  let found = false // 在 JSON 中查找对应索引的元素
  const currentContentLength = currentJSON.content?.length || 0
  const matchingTypes: number[] = []
  
  for (let i = 0; i < currentContentLength; i++) { // 先找出所有匹配类型的索引
      const child = currentJSON.content![i]
      if (child.type === targetType) {
        if (targetType === 'heading') {
          const level = parseInt(tagName.charAt(1))
          if (child.attrs?.level === level) {
            matchingTypes.push(i)
          }
        } else {
          matchingTypes.push(i)
      }
    }
  }
  
  if (matchingTypes.length >= sameTypeCount) { // 检查是否有足够的匹配元素
      const targetIndex = matchingTypes[sameTypeCount - 1]
      jsonPath.push(targetIndex)
      currentJSON = currentJSON.content![targetIndex]
      found = true
    }
    
    if (!found) {
      break
    }
    domIndex++
  }
  
  return jsonPath.length > 0 ? { path: jsonPath } : null
}

const getJSONNodeByPath = (path: number[], json: EditorJSON | EditorJSONNode): EditorJSONNode | null => { // 根据 JSON 路径获取节点
  let current: EditorJSON | EditorJSONNode = json
  
  for (const index of path) {
    if (!current.content || !current.content[index]) return null
    current = current.content[index]
  }
  
  return current as EditorJSONNode
}

const getTextLength = (node: EditorJSONNode): number => { // 获取 JSON 节点的文本长度
  if (node.type === 'text') {
    return node.text?.length || 0
  }
  if (node.content) {
    return node.content.reduce((sum, child) => sum + getTextLength(child), 0)
  }
  return 0
}

const findTextInJSONNode = (node: EditorJSONNode, targetOffset: number): JSONPath | null => { // 在 JSON 节点中查找文本位置
  if (node.type === 'text') {
    return {
      path: [],
      offset: Math.min(targetOffset, node.text?.length || 0)
    }
  }
  
  if (node.content) {
    let currentOffset = 0
    for (let i = 0; i < node.content.length; i++) {
      const child = node.content[i]
      const childLength = getTextLength(child)
      
      if (currentOffset + childLength >= targetOffset) {
        const childPath = findTextInJSONNode(child, targetOffset - currentOffset)
        if (childPath) {
          return {
            path: [i, ...childPath.path],
            offset: childPath.offset
          }
        }
      }
      currentOffset += childLength
    }
  }
  
  return null
}

export const saveJSONSelectionInfo = ( // 保存 JSON 选择信息
  range: Range,
  json: EditorJSON,
  rootElement: HTMLElement
): JSONSelectionInfo | null => {
  const startPath = getJSONPathFromRange(range, json, rootElement)
  if (!startPath) {
    return null
  }
  
  let endPath: JSONPath
  if (range.collapsed) {
    endPath = startPath
  } else {
    const endRange = range.cloneRange() // 创建结束位置的 Range
    endRange.collapse(false)
    const end = getJSONPathFromRange(endRange, json, rootElement)
    if (!end) return null
    endPath = end
  }
  
  return {
    startPath,
    endPath,
    collapsed: range.collapsed
  }
}

export const restoreJSONPathToDOM = ( // 根据 JSON 路径恢复 DOM 位置（第二步：实现 JSON 路径到 DOM 映射）
  jsonPath: JSONPath,
  json: EditorJSON,
  rootElement: HTMLElement
): { node: Node; offset: number } | null => {
  const jsonNode = getJSONNodeByPath(jsonPath.path, json) // 根据 JSON 路径找到对应的 JSON 节点
  if (!jsonNode) return null
  
  let currentElement: Element | null = rootElement // 将 JSON 路径映射回 DOM 位置：1. 找到 JSON 路径对应的块级元素
  let pathIndex = 0
  
  while (pathIndex < jsonPath.path.length && currentElement) { // 遍历 JSON 路径，找到对应的 DOM 元素
    const index = jsonPath.path[pathIndex]
    
    const currentJSON = getJSONNodeByPath(jsonPath.path.slice(0, pathIndex + 1), json) // 获取当前 JSON 节点类型
    if (!currentJSON) break
    
    const children: Element[] = Array.from(currentElement.children) // 根据 JSON 节点类型找到对应的 DOM 元素
    let found = false
    
    for (let i = 0; i < children.length; i++) {
      const child: Element = children[i]
      const tagName = child.tagName.toLowerCase()
      
      let matches = false // 检查是否匹配 JSON 节点类型
      if (currentJSON.type === 'paragraph' && (tagName === 'p' || tagName === 'div')) {
        matches = true
      } else if (currentJSON.type === 'heading' && tagName.match(/^h[1-6]$/)) {
        const level = parseInt(tagName.charAt(1))
        matches = currentJSON.attrs?.level === level
      } else if (currentJSON.type === 'bulletList' && tagName === 'ul') {
        matches = true
      } else if (currentJSON.type === 'orderedList' && tagName === 'ol') {
        matches = true
      } else if (currentJSON.type === 'listItem' && tagName === 'li' && !child.querySelector('input[type="checkbox"]')) {
        matches = true
      } else if (currentJSON.type === 'taskItem' && tagName === 'li' && child.querySelector('input[type="checkbox"]')) {
        matches = true
      } else if (currentJSON.type === 'blockquote' && tagName === 'blockquote') {
        matches = true
      } else if (currentJSON.type === 'codeBlock' && tagName === 'pre') {
        matches = true
      } else if (currentJSON.type === 'horizontalRule' && tagName === 'hr') {
        matches = true
      }
      
      if (matches) {
        let matchCount = 0 // 计算匹配的元素索引（考虑可能有其他不匹配的元素）
        for (let j = 0; j <= i; j++) {
          const checkChild = children[j]
          const checkTagName = checkChild.tagName.toLowerCase()
          if (
            (currentJSON.type === 'paragraph' && (checkTagName === 'p' || checkTagName === 'div')) ||
            (currentJSON.type === 'heading' && checkTagName.match(/^h[1-6]$/)) ||
            (currentJSON.type === 'bulletList' && checkTagName === 'ul') ||
            (currentJSON.type === 'orderedList' && checkTagName === 'ol') ||
            (currentJSON.type === 'listItem' && checkTagName === 'li' && !checkChild.querySelector('input[type="checkbox"]')) ||
            (currentJSON.type === 'taskItem' && checkTagName === 'li' && checkChild.querySelector('input[type="checkbox"]')) ||
            (currentJSON.type === 'blockquote' && checkTagName === 'blockquote') ||
            (currentJSON.type === 'codeBlock' && checkTagName === 'pre') ||
            (currentJSON.type === 'horizontalRule' && checkTagName === 'hr')
          ) {
            matchCount++
          }
        }
        
        if (matchCount - 1 === index) {
          currentElement = child
          found = true
          break
        }
      }
    }
    
    if (!found) break
    pathIndex++
  }
  
  if (!currentElement || currentElement === rootElement) return null
  
  if (pathIndex < jsonPath.path.length) { // 2. 如果是文本节点路径，找到对应的文本节点（还有更多路径，说明是文本节点）
    const textIndex = jsonPath.path[pathIndex]
    const jsonParent = getJSONNodeByPath(jsonPath.path.slice(0, pathIndex), json)
    
    if (jsonParent && jsonParent.content) {
      const walker = document.createTreeWalker(currentElement, NodeFilter.SHOW_TEXT, null) // 在 DOM 元素中查找对应的文本节点
      
      let textNodeIndex = 0
      let textNode: Text | null = null
      while ((textNode = walker.nextNode() as Text | null)) {
        if (textNodeIndex === textIndex) {
          const offset = Math.min(jsonPath.offset, textNode.textContent?.length || 0)
          return { node: textNode, offset }
        }
        textNodeIndex++
      }
      
      if (textNodeIndex > 0) { // 如果没找到对应的文本节点，返回最后一个文本节点
        walker.currentNode = currentElement
        let lastTextNode: Text | null = null
        let tempNode: Text | null = null
        while ((tempNode = walker.nextNode() as Text | null)) {
          lastTextNode = tempNode
        }
        if (lastTextNode) {
          const offset = Math.min(jsonPath.offset, lastTextNode.textContent?.length || 0)
          return { node: lastTextNode, offset }
        }
      }
    }
    
    return { node: currentElement, offset: 0 } // 如果找不到文本节点，返回元素节点
  } else { // 路径结束，返回元素节点（如果元素是空的或者没有文本节点，需要确保光标在文本节点中）
    const walker = document.createTreeWalker(currentElement, NodeFilter.SHOW_TEXT, null) // 查找第一个文本节点，或者创建一个零宽空格文本节点
    
    const firstTextNode = walker.nextNode() as Text | null
    if (firstTextNode) {
      const offset = Math.min(jsonPath.offset, firstTextNode.textContent?.length || 0) // 找到文本节点，使用它
      return { node: firstTextNode, offset }
    } else {
      const textNode = document.createTextNode('\u200B') // 没有文本节点，创建一个零宽空格文本节点
      currentElement.appendChild(textNode)
      return { node: textNode, offset: 0 }
    }
  }
}

export const restoreJSONSelectionInfo = ( // 恢复 JSON 选择信息到 DOM
  info: JSONSelectionInfo | null,
  json: EditorJSON,
  rootElement: HTMLElement
): boolean => {
  if (!info) return false

  const startPos = restoreJSONPathToDOM(info.startPath, json, rootElement)
  if (!startPos) {
    return false
  }
  
  const selection = window.getSelection()
  if (!selection) return false
  
  try {
    const range = document.createRange()
    range.setStart(startPos.node, startPos.offset)
    
    if (info.collapsed) {
      range.collapse(true)
    } else {
      const endPos = restoreJSONPathToDOM(info.endPath, json, rootElement)
      if (endPos) {
        range.setEnd(endPos.node, endPos.offset)
      } else {
        range.collapse(true)
      }
    }
    
    selection.removeAllRanges()
    selection.addRange(range)
    
    rootElement.focus() // 确保编辑器有焦点，并且光标位置正确
    
    if (selection.rangeCount > 0) { // 再次验证光标位置
      const verifyRange = selection.getRangeAt(0)
      if (verifyRange.startContainer.nodeType === Node.ELEMENT_NODE) { // 如果光标在元素节点上，尝试移动到文本节点
        const element = verifyRange.startContainer as Element
        const textNode = element.firstChild
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          const newRange = document.createRange()
          newRange.setStart(textNode, 0)
          newRange.collapse(true)
          selection.removeAllRanges()
          selection.addRange(newRange)
        } else if (!textNode) {
          const textNode = document.createTextNode('\u200B') // 如果没有文本节点，创建一个
          element.appendChild(textNode)
          const newRange = document.createRange()
          newRange.setStart(textNode, 0)
          newRange.collapse(true)
          selection.removeAllRanges()
          selection.addRange(newRange)
        }
      }
    }
    
    return true
  } catch (e) {
    return false
  }
}

