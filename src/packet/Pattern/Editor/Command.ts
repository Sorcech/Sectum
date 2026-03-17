/**
 * 命令系统（参考 Tiptap CommandManager）
 * 
 * 核心思想：
 * 1. 所有编辑操作都封装为命令
 * 2. 命令完全同步执行
 * 3. 命令返回结果，不直接修改状态
 * 4. 支持命令链（参考 Tiptap 的 first() 方法）
 */

import type { EditorJSON, SelectionInfo } from './Editor'
import { htmlToJSON, saveSelectionInfo, findParentElement } from './Editor'

/**
 * 命令上下文
 */
export interface CommandContext {
  editor: HTMLElement
  selection: Selection | null
  state: EditorState
}

/**
 * 编辑器状态（简化版，后续会扩展）
 */
export interface EditorState {
  content: EditorJSON
  selection: SelectionInfo | null
}

/**
 * 命令执行结果
 */
export interface CommandResult {
  success: boolean
  newState?: EditorState
  newSelection?: SelectionInfo
  shouldEmit?: boolean
  error?: string
}

/**
 * 命令接口
 */
export interface Command {
  /**
   * 执行命令
   */
  execute(context: CommandContext): CommandResult
  
  /**
   * 检查是否可以执行
   */
  canExecute?(context: CommandContext): boolean
}

/**
 * 命令管理器（参考 Tiptap CommandManager）
 */
export class CommandManager {
  private commands: Map<string, Command> = new Map()
  
  /**
   * 注册命令
   */
  register(name: string, command: Command): void {
    this.commands.set(name, command)
  }
  
  /**
   * 执行命令
   */
  execute(name: string, context: CommandContext, data?: any): CommandResult {
    const command = this.commands.get(name)
    if (!command) {
      return {
        success: false,
        error: `Command "${name}" not found`
      }
    }
    
    // 检查是否可以执行
    if (command.canExecute && !command.canExecute(context)) {
      return {
        success: false,
        error: `Command "${name}" cannot be executed`
      }
    }
    
    // 执行命令，如果有额外数据，合并到 context 中
    const extendedContext = data ? { ...context, data } : context
    return command.execute(extendedContext)
  }
  
  /**
   * 命令链执行（参考 Tiptap 的 first() 方法）
   * 按顺序执行命令，第一个返回 true 的停止
   */
  first(commands: Array<() => boolean>): boolean {
    for (const command of commands) {
      if (command()) {
        return true
      }
    }
    return false
  }
  
  /**
   * 检查命令是否存在
   */
  has(name: string): boolean {
    return this.commands.has(name)
  }
  
  /**
   * 获取所有命令名称
   */
  getCommandNames(): string[] {
    return Array.from(this.commands.keys())
  }
}

// ============================================================================
// 基础命令类
// ============================================================================
export abstract class BaseCommand {
  protected createSuccessResult(editor: HTMLElement): CommandResult {
    const html = editor.innerHTML
    const json = htmlToJSON(html, editor)
    const newSelection = saveSelectionInfo(editor) || undefined
    
    return {
      success: true,
      newState: {
        content: json,
        selection: newSelection || null
      },
      newSelection: newSelection,
      shouldEmit: true
    }
  }
  
  /**
   * 查找块级元素
   */
  protected findBlockElement(node: Node, editor: HTMLElement): Element | null {
    let element: Element | null = node.nodeType === Node.TEXT_NODE
      ? node.parentElement
      : node as Element
    
    while (element && element !== editor) {
      const tagName = element.tagName.toLowerCase()
      if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'li', 'pre'].includes(tagName)) {
        return element
      }
      element = element.parentElement
    }
    return null
  }
}

// ============================================================================
// 格式命令组
// ============================================================================
export class FormatCommand implements Command {
  constructor(private format: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'superscript' | 'subscript') {}
  
  execute(context: CommandContext): CommandResult {
    const { editor, selection } = context
    
    if (!selection || selection.rangeCount === 0) {
      return { success: false, error: 'No selection' }
    }
    
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.commonAncestorContainer)) {
      return { success: false, error: 'Selection outside editor' }
    }
    
    // 映射格式名称到标签
    const tagMap: Record<string, 'strong' | 'em' | 'u' | 's' | 'sup' | 'sub'> = {
      'bold': 'strong',
      'italic': 'em',
      'underline': 'u',
      'strikethrough': 's',
      'superscript': 'sup',
      'subscript': 'sub'
    }
    
    const tagName = tagMap[this.format]
    if (!tagName) {
      return { success: false, error: `Unknown format: ${this.format}` }
    }
    // 检查当前选择是否已经在对应标签内
    let element: Element | null = range.commonAncestorContainer.nodeType === Node.TEXT_NODE
      ? range.commonAncestorContainer.parentElement
      : range.commonAncestorContainer as Element
    let formatElement: Element | null = null
    while (element && element !== editor) {
      if (element.tagName.toLowerCase() === tagName) {
        formatElement = element
        break
      }
      element = element.parentElement
    }
    if (formatElement) {
      // 如果已经在格式标签内，移除格式
      const parent = formatElement.parentElement
      if (parent) {
        while (formatElement.firstChild) {
          parent.insertBefore(formatElement.firstChild, formatElement)
        }
        parent.removeChild(formatElement)
        parent.normalize()
      }
    } else {
      // 如果不在格式标签内，添加格式
      const formatTag = document.createElement(tagName)
      if (range.collapsed) {
        // 光标位置，插入格式标签
        const textNode = range.startContainer.nodeType === Node.TEXT_NODE
          ? range.startContainer as Text
          : null
        if (textNode) {
          const offset = range.startOffset
          const text = textNode.textContent || ''
          const beforeText = text.substring(0, offset)
          const afterText = text.substring(offset)
          const beforeNode = document.createTextNode(beforeText)
          const afterNode = document.createTextNode(afterText)
          const zeroWidthSpace = document.createTextNode('\u200B')
          formatTag.appendChild(zeroWidthSpace)
          const parent = textNode.parentElement
          if (parent) {
            parent.replaceChild(beforeNode, textNode)
            parent.insertBefore(formatTag, beforeNode.nextSibling)
            parent.insertBefore(afterNode, formatTag.nextSibling)
            const newRange = document.createRange()
            newRange.setStart(zeroWidthSpace, 0)
            newRange.collapse(true)
            const sel = window.getSelection()
            if (sel) {
              sel.removeAllRanges()
              sel.addRange(newRange)
            }
          }
        }
      } else {
        // 有选择内容，包裹选择
        try {
          const contents = range.extractContents()
          formatTag.appendChild(contents)
          range.insertNode(formatTag)
          const newRange = document.createRange()
          newRange.selectNodeContents(formatTag)
          newRange.collapse(false)
          const sel = window.getSelection()
          if (sel) {
            sel.removeAllRanges()
            sel.addRange(newRange)
          }
        } catch (e) {
          // 如果 extractContents 失败，尝试其他方法
          const contents = range.cloneContents()
          formatTag.appendChild(contents)
          range.deleteContents()
          range.insertNode(formatTag)
        }
      }
    }
    editor.focus()
    const html = editor.innerHTML
    const json = htmlToJSON(html, editor)
    const newSelection = saveSelectionInfo(editor) || undefined
    return {
      success: true,
      newState: {
        content: json,
        selection: newSelection || null
      },
      newSelection: newSelection,
      shouldEmit: true
    }
  }
}

// ============================================================================
// 标题命令组
// ============================================================================
export class HeadingCommand extends BaseCommand implements Command {
  constructor(private level: number) {
    super()
  }
  
  execute(context: CommandContext): CommandResult {
    const { editor, selection } = context
    
    if (!selection || selection.rangeCount === 0) {
      return { success: false, error: 'No selection' }
    }
    
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.commonAncestorContainer)) {
      return { success: false, error: 'Selection outside editor' }
    }
    
    // 保存光标位置（在替换元素之前）
    const savedOffset = range.startOffset
    const savedContainer = range.startContainer
    
    const block = this.findBlockElement(range.commonAncestorContainer, editor)
    
    if (!block || !block.parentElement) {
      return { success: false, error: 'No block element found' }
    }
    
    // 计算光标在块级元素中的相对位置
    let relativeOffset = 0
    if (savedContainer.nodeType === Node.TEXT_NODE) {
      // 如果光标在文本节点中，计算在块级元素文本中的位置
      const textBeforeCursor = this.getTextBeforeNode(savedContainer, block)
      relativeOffset = textBeforeCursor.length + savedOffset
    } else {
      // 如果光标在元素节点中，计算子节点索引
      const nodesBeforeCursor = this.getNodesBeforeNode(savedContainer, block)
      relativeOffset = nodesBeforeCursor.length
    }
    
    const heading = document.createElement(`h${this.level}`)
    let targetElement: HTMLElement | null = null
    
    // 如果当前已经是标题，且级别相同，转换为段落
    if (block.tagName.toLowerCase() === `h${this.level}`) {
      const p = document.createElement('p')
      while (block.firstChild) {
        p.appendChild(block.firstChild)
      }
      block.parentElement.replaceChild(p, block)
      targetElement = p
    } else {
      // 转换为标题
      while (block.firstChild) {
        heading.appendChild(block.firstChild)
      }
      block.parentElement.replaceChild(heading, block)
      targetElement = heading
    }
    
    // 恢复光标位置
    if (targetElement) {
      this.restoreCursorPosition(targetElement, relativeOffset)
    }
    
    editor.focus()
    return this.createSuccessResult(editor)
  }
  
  /**
   * 获取节点之前的文本内容
   */
  private getTextBeforeNode(node: Node, container: Element): string {
    let text = ''
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    )
    
    let currentNode: Node | null
    while ((currentNode = walker.nextNode())) {
      if (currentNode === node) {
        break
      }
      text += currentNode.textContent || ''
    }
    
    return text
  }
  
  /**
   * 获取节点之前的节点数量
   */
  private getNodesBeforeNode(node: Node, container: Element): Node[] {
    const nodes: Node[] = []
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_ALL,
      null
    )
    
    let currentNode: Node | null
    while ((currentNode = walker.nextNode())) {
      if (currentNode === node) {
        break
      }
      nodes.push(currentNode)
    }
    
    return nodes
  }
  
  /**
   * 恢复光标位置
   */
  private restoreCursorPosition(element: HTMLElement, offset: number): void {
    const textContent = element.textContent || ''
    const targetOffset = Math.min(offset, textContent.length)
    
    // 查找包含目标偏移位置的文本节点
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    )
    
    let currentOffset = 0
    let targetNode: Text | null = null
    let targetNodeOffset = 0
    
    let node: Node | null
    while ((node = walker.nextNode())) {
      const textNode = node as Text
      const nodeLength = textNode.textContent?.length || 0
      
      if (currentOffset + nodeLength >= targetOffset) {
        targetNode = textNode
        targetNodeOffset = targetOffset - currentOffset
        break
      }
      
      currentOffset += nodeLength
    }
    
    // 设置光标位置
    const newRange = document.createRange()
    if (targetNode) {
      const safeOffset = Math.min(targetNodeOffset, targetNode.textContent?.length || 0)
      newRange.setStart(targetNode, safeOffset)
    } else {
      // 如果没有找到文本节点，设置到元素末尾
      if (element.lastChild && element.lastChild.nodeType === Node.TEXT_NODE) {
        const lastText = element.lastChild as Text
        newRange.setStart(lastText, lastText.textContent?.length || 0)
      } else {
        newRange.setStart(element, element.childNodes.length)
      }
    }
    
    newRange.collapse(true)
    const sel = window.getSelection()
    if (sel) {
      sel.removeAllRanges()
      sel.addRange(newRange)
    }
  }
}

// ============================================================================
// 引用命令组
// ============================================================================
export class BlockquoteCommand extends BaseCommand implements Command {
  execute(context: CommandContext): CommandResult {
    const { editor, selection } = context
    
    if (!selection || selection.rangeCount === 0) {
      return { success: false, error: 'No selection' }
    }
    
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.commonAncestorContainer)) {
      return { success: false, error: 'Selection outside editor' }
    }
    
    // 查找当前是否在 blockquote 中
    let element: Element | null = range.commonAncestorContainer.nodeType === Node.TEXT_NODE
      ? range.commonAncestorContainer.parentElement
      : range.commonAncestorContainer as Element
    
    let blockquoteElement: HTMLElement | null = null
    while (element && element !== editor) {
      if (element.tagName.toLowerCase() === 'blockquote') {
        blockquoteElement = element as HTMLElement
        break
      }
      element = element.parentElement
    }
    
    if (blockquoteElement) {
      // 如果已经在 blockquote 中，移除它
      
      // 保存光标位置（在替换元素之前）
      const savedOffset = range.startOffset
      const savedContainer = range.startContainer
      
      // 计算光标在 blockquote 中的相对位置
      let targetBlock: HTMLElement | null = null
      let relativeOffset = 0
      
      // 找到光标所在的块级元素（blockquote 内的段落或其他块级元素）
      let currentElement: Node | null = savedContainer
      while (currentElement && currentElement !== blockquoteElement) {
        if (currentElement.nodeType === Node.ELEMENT_NODE) {
          const el = currentElement as Element
          const tagName = el.tagName.toLowerCase()
          if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
            targetBlock = el as HTMLElement
            break
          }
        }
        currentElement = currentElement.parentNode
      }
      
      // 计算光标在 blockquote 中的相对位置（无论是否找到 targetBlock）
      if (targetBlock) {
        // 计算光标在块级元素文本中的相对位置
        if (savedContainer.nodeType === Node.TEXT_NODE) {
          const textBeforeCursor = this.getTextBeforeNode(savedContainer, targetBlock)
          relativeOffset = textBeforeCursor.length + savedOffset
        } else {
          // 如果不是文本节点，需要找到光标在该元素中的实际文本位置
          // 创建一个临时 Range 来查找光标位置
          const tempRange = range.cloneRange()
          tempRange.setStart(targetBlock, 0)
          tempRange.setEnd(savedContainer, savedOffset)
          relativeOffset = tempRange.toString().length
        }
      } else {
        // 如果没有找到 targetBlock，直接从 blockquote 计算相对位置
        const tempRange = range.cloneRange()
        tempRange.setStart(blockquoteElement, 0)
        tempRange.setEnd(savedContainer, savedOffset)
        relativeOffset = tempRange.toString().length
      }
      
      const parent = blockquoteElement.parentElement
      if (parent) {
        const fragment = document.createDocumentFragment()
        const blockMap = new Map<HTMLElement, HTMLElement>() // 映射：原块级元素 -> 新块级元素
        const blockElements: HTMLElement[] = [] // 保存所有块级元素，用于 fallback
        const nodeToBlockMap = new Map<Node, HTMLElement>() // 映射：原节点 -> 新块级元素（用于查找被包装的节点）
        
        // 处理 blockquote 的所有子节点
        const nodes = Array.from(blockquoteElement.childNodes)
        nodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element
            const tagName = el.tagName.toLowerCase()
            // 如果已经是块级元素，直接移动
            if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol'].includes(tagName)) {
              fragment.appendChild(node)
              const blockEl = el as HTMLElement
              blockMap.set(blockEl, blockEl) // 同一个元素
              nodeToBlockMap.set(node, blockEl)
              blockElements.push(blockEl)
            } else {
              // 如果不是块级元素，包装为段落
              const p = document.createElement('p')
              p.appendChild(node)
              fragment.appendChild(p)
              nodeToBlockMap.set(node, p)
              blockElements.push(p)
            }
          } else if (node.nodeType === Node.TEXT_NODE) {
            // 文本节点包装为段落
            const text = (node as Text).textContent || ''
            if (text.trim()) {
              const p = document.createElement('p')
              p.appendChild(node)
              fragment.appendChild(p)
              nodeToBlockMap.set(node, p)
              blockElements.push(p)
            }
          }
        })
        
        // 在替换之前，找到目标块对应的新块级元素
        let targetBlockAfter: HTMLElement | null = null
        if (targetBlock) {
          targetBlockAfter = blockMap.get(targetBlock) || null
          // 如果直接找不到，可能是 targetBlock 被包装了，尝试查找其父节点或子节点
          if (!targetBlockAfter) {
            // 检查 targetBlock 是否在 blockquote 的直接子节点中
            if (blockquoteElement.contains(targetBlock)) {
              let searchNode: Node | null = targetBlock
              while (searchNode && searchNode !== blockquoteElement) {
                if (nodeToBlockMap.has(searchNode)) {
                  targetBlockAfter = nodeToBlockMap.get(searchNode)!
                  break
                }
                searchNode = searchNode.parentNode
              }
            }
          }
        }
        parent.replaceChild(fragment, blockquoteElement)// 替换 blockquote
        let targetElement: HTMLElement | null = null// 恢复光标到正确的块级元素
        let targetOffset = 0
        
        if (targetBlockAfter) {
          targetElement = targetBlockAfter
          targetOffset = relativeOffset
        } else if (blockElements.length > 0) {
          // 如果没有找到目标块，使用第一个块级元素
          const firstBlock = blockElements[0]
          targetElement = firstBlock
          // 如果 relativeOffset 超过了第一个块的文本长度，限制在块的长度内
          const firstBlockTextLength = firstBlock.textContent?.length || 0
          targetOffset = Math.min(relativeOffset, firstBlockTextLength)
        } else {
          // 如果连第一个块都没有，尝试从 parent 中查找
          const firstChild = parent.firstElementChild as HTMLElement
          if (firstChild && ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(firstChild.tagName.toLowerCase())) {
            targetElement = firstChild
            targetOffset = 0
          }
        }
        
        // 如果有目标元素，恢复光标并保存选择信息
        if (targetElement) {
          this.restoreCursorPosition(targetElement, targetOffset)
          
          // 使用 requestAnimationFrame 确保光标已设置完成后再保存
          requestAnimationFrame(() => {
            saveSelectionInfo(editor)
          })
          
          // 立即保存选择信息（用于返回结果）
          const restoredSelection = saveSelectionInfo(editor)
          if (restoredSelection) {
            editor.focus()
            const html = editor.innerHTML
            const json = htmlToJSON(html, editor)
            return {
              success: true,
              newState: {
                content: json,
                selection: restoredSelection
              },
              newSelection: restoredSelection,
              shouldEmit: true
            }
          }
        }
      }
    } else {
      const savedOffset = range.startOffset
      const savedContainer = range.startContainer
      const block = this.findBlockElement(range.commonAncestorContainer, editor)
      if (block && block.parentElement) {
        let relativeOffset = 0
        if (savedContainer.nodeType === Node.TEXT_NODE) {
          const textBeforeCursor = this.getTextBeforeNode(savedContainer, block)
          relativeOffset = textBeforeCursor.length + savedOffset
        } else {
          // 如果不是文本节点，需要找到光标在该元素中的实际文本位置
          // 创建一个临时 Range 来查找光标位置
          const tempRange = range.cloneRange()
          tempRange.setStart(block, 0)
          tempRange.setEnd(savedContainer, savedOffset)
          relativeOffset = tempRange.toString().length
        }
        
        const blockquote = document.createElement('blockquote')
        while (block.firstChild) {
          blockquote.appendChild(block.firstChild)
        }
        block.parentElement.replaceChild(blockquote, block)
        
        // 恢复光标位置（blockquote 内的第一个块级元素）
        const firstBlock = blockquote.querySelector('p, div, h1, h2, h3, h4, h5, h6') as HTMLElement
        if (firstBlock) {
          this.restoreCursorPosition(firstBlock, relativeOffset)
        } else {
          
          this.restoreCursorPosition(blockquote, relativeOffset)// 如果没有块级元素，使用 blockquote 本身
        }
        
        // 使用 requestAnimationFrame 确保光标已设置完成后再保存
        requestAnimationFrame(() => {
          saveSelectionInfo(editor)
        })
        
        // 立即保存选择信息（用于返回结果）
        const restoredSelection = saveSelectionInfo(editor)
        if (restoredSelection) {
          editor.focus()
          const html = editor.innerHTML
          const json = htmlToJSON(html, editor)
          return {
            success: true,
            newState: {
              content: json,
              selection: restoredSelection
            },
            newSelection: restoredSelection,
            shouldEmit: true
          }
        }
      } else {
        // 如果没有找到块级元素，创建新段落并包装为 blockquote
        const p = document.createElement('p')
        const blockquote = document.createElement('blockquote')
        
        if (range.collapsed) {
          p.appendChild(document.createTextNode('\u200B'))
          blockquote.appendChild(p)
          range.insertNode(blockquote)
          
          const newRange = document.createRange()
          newRange.selectNodeContents(p)
          newRange.collapse(true)
          const sel = window.getSelection()
          if (sel) {
            sel.removeAllRanges()
            sel.addRange(newRange)
          }
        } else {
          const contents = range.extractContents()
          p.appendChild(contents)
          blockquote.appendChild(p)
          range.insertNode(blockquote)
          
          const newRange = document.createRange()
          newRange.setStartAfter(blockquote)
          newRange.collapse(true)
          const sel = window.getSelection()
          if (sel) {
            sel.removeAllRanges()
            sel.addRange(newRange)
          }
        }
      }
    }
    
    editor.focus()
    return this.createSuccessResult(editor)
  }
  
  /**
   * 获取节点之前的文本内容
   */
  private getTextBeforeNode(node: Node, container: Element): string {
    let text = ''
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    )
    
    let currentNode: Node | null
    while ((currentNode = walker.nextNode())) {
      if (currentNode === node) {
        break
      }
      text += currentNode.textContent || ''
    }
    
    return text
  }
  
  /**
   * 恢复光标位置
   */
  private restoreCursorPosition(element: HTMLElement, offset: number): void {
    // 使用 Range API 来精确计算文本偏移量
    const tempRange = document.createRange()
    tempRange.selectNodeContents(element)
    const textContent = tempRange.toString()
    const targetOffset = Math.min(offset, textContent.length)
    
    // 查找包含目标偏移位置的文本节点
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    )
    
    let currentOffset = 0
    let targetNode: Text | null = null
    let targetNodeOffset = 0
    
    let node: Node | null
    while ((node = walker.nextNode())) {
      const textNode = node as Text
      const nodeText = textNode.textContent || ''
      const nodeLength = nodeText.length
      
      if (currentOffset + nodeLength >= targetOffset) {
        targetNode = textNode
        targetNodeOffset = targetOffset - currentOffset
        break
      }
      
      currentOffset += nodeLength
    }
    
    // 设置光标位置
    const newRange = document.createRange()
    if (targetNode) {
      const safeOffset = Math.min(targetNodeOffset, targetNode.textContent?.length || 0)
      newRange.setStart(targetNode, safeOffset)
      newRange.collapse(true)
    } else {
      // 如果没有找到文本节点，设置到元素末尾
      if (element.lastChild && element.lastChild.nodeType === Node.TEXT_NODE) {
        const lastText = element.lastChild as Text
        newRange.setStart(lastText, lastText.textContent?.length || 0)
        newRange.collapse(true)
      } else {
        // 如果元素没有文本节点，尝试在第一个子节点前设置光标
        if (element.firstChild) {
          newRange.setStartBefore(element.firstChild)
          newRange.collapse(true)
        } else {
          newRange.setStart(element, 0)
          newRange.collapse(true)
        }
      }
    }
    
    const sel = window.getSelection()
    if (sel) {
      sel.removeAllRanges()
      sel.addRange(newRange)
    }
  }
}

// ============================================================================
// 代码块命令组
// ============================================================================
export class CodeBlockCommand extends BaseCommand implements Command {
  execute(context: CommandContext): CommandResult {
    const { editor, selection } = context
    
    if (!selection || selection.rangeCount === 0) {
      return { success: false, error: 'No selection' }
    }
    
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.commonAncestorContainer)) {
      return { success: false, error: 'Selection outside editor' }
    }
    
    // 查找当前是否在 pre 中
    let element: Element | null = range.commonAncestorContainer.nodeType === Node.TEXT_NODE
      ? range.commonAncestorContainer.parentElement
      : range.commonAncestorContainer as Element
    
    let preElement: HTMLElement | null = null
    while (element && element !== editor) {
      if (element.tagName.toLowerCase() === 'pre') {
        preElement = element as HTMLElement
        break
      }
      element = element.parentElement
    }
    
    if (preElement) {
      // 如果已经在代码块中，移除它
      // 保存光标位置（在替换元素之前）
      const savedOffset = range.startOffset
      const savedContainer = range.startContainer
      
      // 计算光标在代码块中的相对位置
      const code = preElement.querySelector('code')
      const codeElement = code || preElement
      let relativeOffset = 0
      
      if (savedContainer.nodeType === Node.TEXT_NODE) {
        const textBeforeCursor = this.getTextBeforeNode(savedContainer, codeElement)
        relativeOffset = textBeforeCursor.length + savedOffset
      } else {
        // 如果不是文本节点，使用 Range API 计算
        const tempRange = range.cloneRange()
        tempRange.setStart(codeElement, 0)
        tempRange.setEnd(savedContainer, savedOffset)
        relativeOffset = tempRange.toString().length
      }
      
      const parent = preElement.parentElement
      if (parent) {
        const code = preElement.querySelector('code')
        const nodes = code ? Array.from(code.childNodes) : Array.from(preElement.childNodes)
        if (nodes.length > 0) {
          const p = document.createElement('p')
          nodes.forEach(node => {
            p.appendChild(node)
          })
          parent.replaceChild(p, preElement)
          
          // 恢复光标位置
          this.restoreCursorPosition(p, relativeOffset)
          
          // 立即保存选择信息
          const restoredSelection = saveSelectionInfo(editor)
          if (restoredSelection) {
            editor.focus()
            const html = editor.innerHTML
            const json = htmlToJSON(html, editor)
            return {
              success: true,
              newState: {
                content: json,
                selection: restoredSelection
              },
              newSelection: restoredSelection,
              shouldEmit: true
            }
          }
        } else {
          parent.removeChild(preElement)
        }
      }
    } else {
      // 如果不在代码块中，创建代码块
      // 保存光标位置（在替换元素之前）
      const savedOffset = range.startOffset
      const savedContainer = range.startContainer
      
      const block = this.findBlockElement(range.commonAncestorContainer, editor)
      
      if (block && block.parentElement) {
        // 计算光标在块级元素中的相对位置
        let relativeOffset = 0
        if (savedContainer.nodeType === Node.TEXT_NODE) {
          const textBeforeCursor = this.getTextBeforeNode(savedContainer, block)
          relativeOffset = textBeforeCursor.length + savedOffset
        } else {
          // 如果不是文本节点，使用 Range API 计算
          const tempRange = range.cloneRange()
          tempRange.setStart(block, 0)
          tempRange.setEnd(savedContainer, savedOffset)
          relativeOffset = tempRange.toString().length
        }
        
        const pre = document.createElement('pre')
        const code = document.createElement('code')
        
        // 处理节点，将块级元素转换为换行
        const processNode = (node: Node, isFirst: boolean = true): void => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || ''
            if (text.trim()) {
              code.appendChild(document.createTextNode(text))
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            const tagName = element.tagName.toLowerCase()
            
            if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'pre'].includes(tagName)) {
              if (!isFirst) {
                code.appendChild(document.createTextNode('\n'))
              }
              Array.from(element.childNodes).forEach((child, index) => {
                processNode(child, index === 0)
              })
              code.appendChild(document.createTextNode('\n'))
            } else if (tagName === 'br') {
              code.appendChild(document.createTextNode('\n'))
            } else {
              Array.from(element.childNodes).forEach((child, index) => {
                processNode(child, isFirst && index === 0)
              })
            }
          }
        }
        
        Array.from(block.childNodes).forEach((node, index) => {
          processNode(node, index === 0)
        })
        
        pre.appendChild(code)
        block.parentElement.replaceChild(pre, block)
        
        // 恢复光标位置（在 code 元素中）
        this.restoreCursorPosition(code, relativeOffset)
        
        // 立即保存选择信息
        const restoredSelection = saveSelectionInfo(editor)
        if (restoredSelection) {
          editor.focus()
          const html = editor.innerHTML
          const json = htmlToJSON(html, editor)
          return {
            success: true,
            newState: {
              content: json,
              selection: restoredSelection
            },
            newSelection: restoredSelection,
            shouldEmit: true
          }
        }
      }
    }
    
    editor.focus()
    return this.createSuccessResult(editor)
  }
  
  /**
   * 获取节点之前的文本内容
   */
  private getTextBeforeNode(node: Node, container: Element): string {
    let text = ''
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    )
    
    let currentNode: Node | null
    while ((currentNode = walker.nextNode())) {
      if (currentNode === node) {
        break
      }
      text += currentNode.textContent || ''
    }
    
    return text
  }
  
  /**
   * 恢复光标位置
   */
  private restoreCursorPosition(element: HTMLElement, offset: number): void {
    // 使用 Range API 来精确计算文本偏移量
    const tempRange = document.createRange()
    tempRange.selectNodeContents(element)
    const textContent = tempRange.toString()
    const targetOffset = Math.min(offset, textContent.length)
    
    // 查找包含目标偏移位置的文本节点
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    )
    
    let currentOffset = 0
    let targetNode: Text | null = null
    let targetNodeOffset = 0
    
    let node: Node | null
    while ((node = walker.nextNode())) {
      const textNode = node as Text
      const nodeText = textNode.textContent || ''
      const nodeLength = nodeText.length
      
      if (currentOffset + nodeLength >= targetOffset) {
        targetNode = textNode
        targetNodeOffset = targetOffset - currentOffset
        break
      }
      
      currentOffset += nodeLength
    }
    
    // 设置光标位置
    const newRange = document.createRange()
    if (targetNode) {
      const safeOffset = Math.min(targetNodeOffset, targetNode.textContent?.length || 0)
      newRange.setStart(targetNode, safeOffset)
      newRange.collapse(true)
    } else {
      // 如果没有找到文本节点，设置到元素末尾
      if (element.lastChild && element.lastChild.nodeType === Node.TEXT_NODE) {
        const lastText = element.lastChild as Text
        newRange.setStart(lastText, lastText.textContent?.length || 0)
        newRange.collapse(true)
      } else {
        // 如果元素没有文本节点，尝试在第一个子节点前设置光标
        if (element.firstChild) {
          newRange.setStartBefore(element.firstChild)
          newRange.collapse(true)
        } else {
          newRange.setStart(element, 0)
          newRange.collapse(true)
        }
      }
    }
    
    const sel = window.getSelection()
    if (sel) {
      sel.removeAllRanges()
      sel.addRange(newRange)
    }
  }
}

// ============================================================================
// 行内代码命令组
// ============================================================================
export class CodeCommand extends BaseCommand implements Command {
  execute(context: CommandContext): CommandResult {
    const { editor, selection } = context
    
    if (!selection || selection.rangeCount === 0) {
      return { success: false, error: 'No selection' }
    }
    
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.commonAncestorContainer)) {
      return { success: false, error: 'Selection outside editor' }
    }
    
    // 查找当前 code
    let element: Element | null = range.commonAncestorContainer.nodeType === Node.TEXT_NODE
      ? range.commonAncestorContainer.parentElement
      : range.commonAncestorContainer as Element
    
    let codeElement: Element | null = null
    while (element && element !== editor) {
      if (element.tagName.toLowerCase() === 'code') {
        codeElement = element
        break
      }
      element = element.parentElement
    }
    
    if (codeElement) {
      // 移除 code
      const parent = codeElement.parentElement
      if (parent) {
        // 保存光标位置（在移除之前）
        const savedOffset = range.startOffset
        const savedContainer = range.startContainer
        
        // 计算光标在 code 元素中的相对位置
        let relativeOffset = 0
        if (savedContainer.nodeType === Node.TEXT_NODE) {
          const textBeforeCursor = this.getTextBeforeNode(savedContainer, codeElement)
          relativeOffset = textBeforeCursor.length + savedOffset
        } else {
          const tempRange = range.cloneRange()
          tempRange.setStart(codeElement, 0)
          tempRange.setEnd(savedContainer, savedOffset)
          relativeOffset = tempRange.toString().length
        }
        
        // 移除 code 元素
        while (codeElement.firstChild) {
          parent.insertBefore(codeElement.firstChild, codeElement)
        }
        parent.removeChild(codeElement)
        parent.normalize()
        
        // 恢复光标位置
        if (parent.firstChild) {
          // 找到包含相对位置的文本节点
          const walker = document.createTreeWalker(
            parent,
            NodeFilter.SHOW_TEXT,
            null
          )
          
          let currentOffset = 0
          let targetNode: Text | null = null
          let targetNodeOffset = 0
          
          let node: Node | null
          while ((node = walker.nextNode())) {
            const textNode = node as Text
            const nodeLength = textNode.textContent?.length || 0
            
            if (currentOffset + nodeLength >= relativeOffset) {
              targetNode = textNode
              targetNodeOffset = relativeOffset - currentOffset
              break
            }
            
            currentOffset += nodeLength
          }
          
          // 设置光标位置
          const newRange = document.createRange()
          if (targetNode) {
            const safeOffset = Math.min(targetNodeOffset, targetNode.textContent?.length || 0)
            newRange.setStart(targetNode, safeOffset)
            newRange.collapse(true)
          } else {
            // 如果没有找到，设置到父元素末尾
            if (parent.lastChild && parent.lastChild.nodeType === Node.TEXT_NODE) {
              const lastText = parent.lastChild as Text
              newRange.setStart(lastText, lastText.textContent?.length || 0)
              newRange.collapse(true)
            } else {
              newRange.setStart(parent, parent.childNodes.length)
              newRange.collapse(true)
            }
          }
          
          const sel = window.getSelection()
          if (sel) {
            sel.removeAllRanges()
            sel.addRange(newRange)
          }
        }
        
        // 保存选择信息
        const restoredSelection = saveSelectionInfo(editor)
        if (restoredSelection) {
          editor.focus()
          const html = editor.innerHTML
          const json = htmlToJSON(html, editor)
          return {
            success: true,
            newState: {
              content: json,
              selection: restoredSelection
            },
            newSelection: restoredSelection,
            shouldEmit: true
          }
        }
      }
    } else {
      // 创建 code
      const code = document.createElement('code')
      
      if (range.collapsed) {
        // 光标位置，插入 code 标签
        const textNode = range.startContainer.nodeType === Node.TEXT_NODE
          ? range.startContainer as Text
          : null
        
        if (textNode) {
          const offset = range.startOffset
          const text = textNode.textContent || ''
          const beforeText = text.substring(0, offset)
          const afterText = text.substring(offset)
          
          const beforeNode = document.createTextNode(beforeText)
          const afterNode = document.createTextNode(afterText)
          const zeroWidthSpace = document.createTextNode('\u200B')
          code.appendChild(zeroWidthSpace)
          
          const parent = textNode.parentElement
          if (parent) {
            parent.replaceChild(beforeNode, textNode)
            parent.insertBefore(code, beforeNode.nextSibling)
            parent.insertBefore(afterNode, code.nextSibling)
            
            const newRange = document.createRange()
            newRange.setStart(zeroWidthSpace, 0)
            newRange.collapse(true)
            const sel = window.getSelection()
            if (sel) {
              sel.removeAllRanges()
              sel.addRange(newRange)
            }
          }
        } else {
          // 如果不在文本节点中，直接插入
          code.appendChild(document.createTextNode('\u200B'))
          range.insertNode(code)
          
          const newRange = document.createRange()
          newRange.setStart(code.firstChild!, 0)
          newRange.collapse(true)
          const sel = window.getSelection()
          if (sel) {
            sel.removeAllRanges()
            sel.addRange(newRange)
          }
        }
      } else {
        // 有选择内容，包裹选择
        try {
          const contents = range.extractContents()
          code.appendChild(contents)
          range.insertNode(code)
          
          const newRange = document.createRange()
          newRange.selectNodeContents(code)
          newRange.collapse(false)
          const sel = window.getSelection()
          if (sel) {
            sel.removeAllRanges()
            sel.addRange(newRange)
          }
        } catch (e) {
          // 如果 extractContents 失败，尝试其他方法
          const contents = range.cloneContents()
          code.appendChild(contents)
          range.deleteContents()
          range.insertNode(code)
        }
      }
      
      // 保存选择信息
      const restoredSelection = saveSelectionInfo(editor)
      if (restoredSelection) {
        editor.focus()
        const html = editor.innerHTML
        const json = htmlToJSON(html, editor)
        return {
          success: true,
          newState: {
            content: json,
            selection: restoredSelection
          },
          newSelection: restoredSelection,
          shouldEmit: true
        }
      }
    }
    
    editor.focus()
    return this.createSuccessResult(editor)
  }
  
  /**
   * 获取节点之前的文本内容
   */
  private getTextBeforeNode(node: Node, container: Element): string {
    let text = ''
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    )
    
    let currentNode: Node | null
    while ((currentNode = walker.nextNode())) {
      if (currentNode === node) {
        break
      }
      text += currentNode.textContent || ''
    }
    
    return text
  }
}

// ============================================================================
// 对齐命令组
// ============================================================================
export class AlignCommand extends BaseCommand implements Command {
  constructor(private align: 'left' | 'center' | 'right' | 'justify') {
    super()
  }
  
  execute(context: CommandContext): CommandResult {
    const { editor, selection } = context
    
    if (!selection || selection.rangeCount === 0) {
      return { success: false, error: 'No selection' }
    }
    
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.commonAncestorContainer)) {
      return { success: false, error: 'Selection outside editor' }
    }
    
    const block = this.findBlockElement(range.commonAncestorContainer, editor)
    
    if (block) {
      ;(block as HTMLElement).style.textAlign = this.align === 'justify' ? 'justify' : this.align
    }
    
    editor.focus()
    return this.createSuccessResult(editor)
  }
}

// ============================================================================
// 分隔线命令组
// ============================================================================
export class HorizontalRuleCommand extends BaseCommand implements Command {
  execute(context: CommandContext): CommandResult {
    const { editor, selection } = context
    
    if (!selection || selection.rangeCount === 0) {
      return { success: false, error: 'No selection' }
    }
    
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.commonAncestorContainer)) {
      return { success: false, error: 'Selection outside editor' }
    }
    
    const hr = document.createElement('hr')
    
    // 找到包含光标的块级元素
    const block = this.findBlockElement(range.commonAncestorContainer, editor)
    
    if (block && block.parentElement) {
      // 在块级元素后插入分隔线
      block.parentElement.insertBefore(hr, block.nextSibling)
      
      // 创建新段落
      const p = document.createElement('p')
      p.style.textAlign = 'left'
      const br = document.createElement('br')
      p.appendChild(br)
      block.parentElement.insertBefore(p, hr.nextSibling)
      
      // 设置光标到新段落
      const newRange = document.createRange()
      newRange.setStart(p, 0)
      newRange.collapse(true)
      const sel = window.getSelection()
      if (sel) {
        sel.removeAllRanges()
        sel.addRange(newRange)
      }
    } else {
      // 如果没有找到块级元素，直接插入
      range.insertNode(hr)
      
      // 创建新段落
      const p = document.createElement('p')
      p.style.textAlign = 'left'
      const br = document.createElement('br')
      p.appendChild(br)
      hr.parentElement?.insertBefore(p, hr.nextSibling)
      
      // 设置光标到新段落
      const newRange = document.createRange()
      newRange.setStart(p, 0)
      newRange.collapse(true)
      const sel = window.getSelection()
      if (sel) {
        sel.removeAllRanges()
        sel.addRange(newRange)
      }
    }
    
    editor.focus()
    return this.createSuccessResult(editor)
  }
}

// ============================================================================
// 表格命令组
// ============================================================================
export class TableCommand extends BaseCommand implements Command {
  execute(context: CommandContext): CommandResult {
    const { editor, selection } = context
    
    if (!selection || selection.rangeCount === 0) {
      return { success: false, error: 'No selection' }
    }
    
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.commonAncestorContainer)) {
      return { success: false, error: 'Selection outside editor' }
    }
    
    // 获取计算后的颜色值（从编辑器元素）
    // 注意：CSS 变量可能是 RGB 格式（如 "215 223 233"），需要转换为 rgb() 格式
    const computedStyle = window.getComputedStyle(editor)
    let borderColor = computedStyle.getPropertyValue('--base-300').trim()
    let bgColor200 = computedStyle.getPropertyValue('--base-200').trim()
    let bgColor50 = computedStyle.getPropertyValue('--base-50').trim()
    
    // 如果 CSS 变量是 RGB 格式（空格分隔），转换为 rgb() 格式
    // 否则直接使用（可能是十六进制）
    const formatColor = (color: string, fallback: string): string => {
      if (!color) return fallback
      // 如果是 RGB 格式（如 "215 223 233"），转换为 rgb()
      if (/^\d+\s+\d+\s+\d+$/.test(color)) {
        return `rgb(${color})`
      }
      // 如果已经是 rgb() 或 hex 格式，直接使用
      return color
    }
    
    borderColor = formatColor(borderColor, '#d7dfe9')
    bgColor200 = formatColor(bgColor200, '#eaeff5')
    bgColor50 = formatColor(bgColor50, '#f8fafc')
    
    const table = document.createElement('table')
    // 使用内联样式确保边框显示，同时添加类名以便 CSS 样式也能应用
    table.className = 'editor-table'
    table.style.cssText = `width: 100%; border-collapse: collapse; margin-top: 1rem; margin-bottom: 1rem; border: 1px solid ${borderColor} ; box-sizing: border-box;`
    
    // 创建表头
    const thead = document.createElement('thead')
    const headerRow = document.createElement('tr')
    for (let i = 0; i < 3; i++) {
      const th = document.createElement('th')
      th.style.cssText = `border: 1px solid ${borderColor} ; padding: 0.5rem; background-color: ${bgColor200} ; font-weight: 600; border-bottom: 2px solid ${borderColor} ; box-sizing: border-box;`
      th.textContent = `标题 ${i + 1}`
      headerRow.appendChild(th)
    }
    thead.appendChild(headerRow)
    table.appendChild(thead)
    
    // 创建表体
    const tbody = document.createElement('tbody')
    for (let i = 0; i < 2; i++) {
      const tr = document.createElement('tr')
      if (i % 2 === 1) {
        tr.style.backgroundColor = bgColor50
      }
      for (let j = 0; j < 3; j++) {
        const td = document.createElement('td')
        td.style.cssText = `border: 1px solid ${borderColor} ; padding: 0.5rem; box-sizing: border-box;`
        td.textContent = `内容 ${i + 1}-${j + 1}`
        tr.appendChild(td)
      }
      tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    
    // 插入表格
    if (range.collapsed) {
      range.insertNode(table)
    } else {
      range.deleteContents()
      range.insertNode(table)
    }
    
    // 设置光标到第一个单元格
    const firstCell = table.querySelector('td')
    if (firstCell) {
      const newRange = document.createRange()
      newRange.setStart(firstCell, 0)
      newRange.collapse(true)
      const sel = window.getSelection()
      if (sel) {
        sel.removeAllRanges()
        sel.addRange(newRange)
      }
    }
    
    editor.focus()
    return this.createSuccessResult(editor)
  }
}

// ============================================================================
// 高亮颜色命令组
// ============================================================================
export class HighlightColorCommand extends BaseCommand implements Command {
  constructor(private color: string) {
    super()
  }
  
  execute(context: CommandContext): CommandResult {
    const { editor, selection } = context
    
    if (!selection || selection.rangeCount === 0) {
      return { success: false, error: 'No selection' }
    }
    
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.commonAncestorContainer)) {
      return { success: false, error: 'Selection outside editor' }
    }
    
    // 检查光标是否在已有的高亮 mark 内
    let existingMark: HTMLElement | null = null
    if (range.collapsed) {
      let node: Node | null = range.startContainer
      while (node && node !== editor) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement
          if (element.tagName.toLowerCase() === 'mark') {
            existingMark = element
            break
          }
        }
        node = node.parentNode
      }
    }
    
    // 如果光标在已有的高亮 mark 内，直接替换背景颜色（不影响字体颜色）
    if (existingMark && range.collapsed) {
      existingMark.style.backgroundColor = this.color
      
      // 保持光标在当前位置
      let targetTextNode: Text | null = null
      let targetOffset = range.startOffset
      
      // 查找 mark 内的文本节点
      if (range.startContainer.nodeType === Node.TEXT_NODE) {
        let node: Node | null = range.startContainer
        while (node && node !== existingMark) {
          node = node.parentNode
        }
        if (node === existingMark) {
          targetTextNode = range.startContainer as Text
          targetOffset = range.startOffset
        }
      }
      
      // 如果没有找到文本节点，查找 mark 内的第一个文本节点
      if (!targetTextNode) {
        const walker = document.createTreeWalker(
          existingMark,
          NodeFilter.SHOW_TEXT,
          null
        )
        targetTextNode = walker.nextNode() as Text | null
        targetOffset = 0
      }
      
      // 设置光标位置
      const newRange = document.createRange()
      if (targetTextNode) {
        const maxOffset = targetTextNode.textContent?.length || 0
        const safeOffset = Math.min(targetOffset, maxOffset)
        newRange.setStart(targetTextNode, safeOffset)
        newRange.collapse(true)
      } else {
        const textNode = document.createTextNode('\u200B')
        existingMark.appendChild(textNode)
        newRange.setStart(textNode, 0)
        newRange.collapse(true)
      }
      
      const sel = window.getSelection()
      if (sel) {
        sel.removeAllRanges()
        sel.addRange(newRange)
      }
    } else {
      // 处理选中文本或新位置
      const mark = document.createElement('mark')
      mark.style.backgroundColor = this.color
      // 确保 mark 不会影响字体颜色（只设置背景色）
      
      if (range.collapsed) {
        // 光标位置，创建一个带高亮的 mark
        mark.appendChild(document.createTextNode('\u200B'))
        range.insertNode(mark)
        
        const newRange = document.createRange()
        newRange.selectNodeContents(mark)
        newRange.collapse(true)
        const sel = window.getSelection()
        if (sel) {
          sel.removeAllRanges()
          sel.addRange(newRange)
        }
      } else { 
        try {
          // 方法1：尝试使用 surroundContents（最简单，但可能失败）
          try {
            range.surroundContents(mark)
            // surroundContents 后，光标会在 mark 内，需要移到 mark 后
            const newRange = document.createRange()
            newRange.setStartAfter(mark)
            newRange.collapse(true)
            const sel = window.getSelection()
            if (sel) {
              sel.removeAllRanges()
              sel.addRange(newRange)
            }
          } catch (surroundError) {
            // surroundContents 失败（通常是因为选择跨越了多个节点边界）
            // 使用更可靠的方法：提取内容并包装
            const contents = range.extractContents()
            mark.appendChild(contents)
            range.insertNode(mark)
            
            const newRange = document.createRange()
            newRange.setStartAfter(mark)
            newRange.collapse(true)
            const sel = window.getSelection()
            if (sel) {
              sel.removeAllRanges()
              sel.addRange(newRange)
            }
          }
        } catch (e) {
          return { success: false, error: `Failed to set highlight color: ${e}` }
        }
      }
    }
    
    editor.focus()
    
    // 立即保存当前的选择信息
    const savedSelection = saveSelectionInfo(editor)
    
    // 创建结果
    const html = editor.innerHTML
    const json = htmlToJSON(html, editor)
    
    return {
      success: true,
      newState: {
        content: json,
        selection: savedSelection || null
      },
      newSelection: savedSelection || undefined,
      shouldEmit: true
    }
  }
}

// ============================================================================
// Enter 键命令组
// ============================================================================

/**
 * Enter 键命令（参考 Tiptap splitBlock）
 * 
 * 核心思想：
 * 1. 完全同步执行
 * 2. 命令链模式（参考 Tiptap first()）
 * 3. 不依赖外部状态
 * 4. 返回新状态，不直接修改
 */
export class EnterKeyCommand implements Command {
  execute(context: CommandContext): CommandResult {
    const { editor, selection } = context
    
    if (!selection || selection.rangeCount === 0) {
      return { success: false, error: 'No selection' }
    }
    
    const range = selection.getRangeAt(0)
    
    // 检查选择是否在编辑器内
    if (!editor.contains(range.commonAncestorContainer)) {
      return { success: false, error: 'Selection outside editor' }
    }
    
    // 命令链（参考 Tiptap keymap.ts 的 handleEnter）
    const commands = [
      () => this.newlineInCode(editor, range),
      () => this.splitListItem(editor, range), // 优先处理列表项
      () => this.createParagraphNear(editor, range),
      () => this.liftEmptyBlock(editor, range),
      () => this.splitBlock(editor, range),
    ]
    
    // 执行第一个成功的命令
    for (const cmd of commands) {
      const result = cmd()
      if (result) {
        return result
      }
    }
    
    return { success: false, error: 'No command executed' }
  }
  
  /**
   * 命令 1: 代码块中插入换行（参考 Tiptap newlineInCode）
   */
  private newlineInCode(editor: HTMLElement, range: Range): CommandResult | null {
    const codeBlock = findParentElement(range.commonAncestorContainer, 'pre', editor)
    if (!codeBlock) return null
    
    // 在代码块中，插入换行符
    const textNode = document.createTextNode('\n')
    range.insertNode(textNode)
    range.setStartAfter(textNode)
    range.collapse(true)
    
    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
      selection.addRange(range)
    }
    
    return this.createSuccessResult(editor)
  }
  
  /**
   * 命令 2: 在标题后创建段落（参考 Tiptap createParagraphNear）
   */
  private createParagraphNear(editor: HTMLElement, range: Range): CommandResult | null {
    const heading = findParentElement(
      range.commonAncestorContainer,
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      editor
    )
    if (!heading) return null
    
    // 在标题后创建新段落
    const p = document.createElement('p')
    p.style.textAlign = 'left'
    const br = document.createElement('br')
    p.appendChild(br)
    heading.parentNode?.insertBefore(p, heading.nextSibling)
    
    // 设置光标到新段落
    const newRange = document.createRange()
    newRange.setStart(p, 0)
    newRange.collapse(true)
    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
      selection.addRange(newRange)
    }
    editor.focus()
    
    return this.createSuccessResult(editor)
  }
  
  /**
   * 命令 2.5: 分割列表项（参考 Tiptap splitListItem）
   * 在列表项中按回车时，创建新的列表项
   */
  private splitListItem(editor: HTMLElement, range: Range): CommandResult | null {
    const node = range.commonAncestorContainer
    
    // 查找当前列表项
    let listItem: Element | null = null
    let listContainer: Element | null = null
    
    let element: Element | null = null
    if (node.nodeType === Node.TEXT_NODE) {
      element = node.parentElement
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      element = node as Element
    }
    
    // 向上查找列表项
    while (element && element !== editor) {
      const tagName = element.tagName.toLowerCase()
      if (tagName === 'li') {
        listItem = element
        // 继续向上查找列表容器
        let parent = element.parentElement
        while (parent && parent !== editor) {
          if (parent.tagName.toLowerCase() === 'ul' || parent.tagName.toLowerCase() === 'ol') {
            listContainer = parent
            break
          }
          parent = parent.parentElement
        }
        break
      }
      element = element.parentElement
    }
    
    if (!listItem || !listContainer) {
      return null
    }
    
    // 检查列表项是否为空（只有空白或零宽空格）
    const listItemText = (listItem.textContent || '').trim()
    const isEmpty = !listItemText || listItemText === '\u200B'
    
    // 获取光标位置
    const textNode = node.nodeType === Node.TEXT_NODE ? node as Text : null
    const offset = textNode ? range.startOffset : 0
    
    // 检查光标是否在列表项末尾
    let isAtEnd = false
    if (textNode) {
      const textLength = textNode.textContent?.length || 0
      if (offset === textLength) {
        // 检查是否有后续内容
        let hasNextContent = false
        let currentNode: Node | null = textNode
        while (currentNode && currentNode !== listItem) {
          if (currentNode.nextSibling) {
            hasNextContent = true
            break
          }
          currentNode = currentNode.parentElement
        }
        if (!hasNextContent) {
          isAtEnd = true
        }
      }
    } else {
      // 如果没有文本节点，检查是否是最后一个子节点
      if (!listItem.lastChild || listItem.lastChild === node) {
        isAtEnd = true
      }
    }
    
    if (isEmpty && isAtEnd) {
      // 如果列表项为空且在末尾，提升列表项（退出列表）
      if (listItem.parentElement) {
        // 创建新段落
        const p = document.createElement('p')
        p.style.textAlign = 'left'
        p.appendChild(document.createTextNode('\u200B'))
        
        // 在列表容器后插入段落
        if (listContainer.nextSibling) {
          listContainer.parentNode?.insertBefore(p, listContainer.nextSibling)
        } else {
          listContainer.parentNode?.appendChild(p)
        }
        
        // 设置光标到新段落
        const newRange = document.createRange()
        if (p.firstChild) {
          newRange.setStartAfter(p.firstChild)
        } else {
          newRange.setStart(p, 0)
        }
        newRange.collapse(true)
        const selection = window.getSelection()
        if (selection) {
          selection.removeAllRanges()
          selection.addRange(newRange)
        }
        editor.focus()
        
        // 删除空的列表项
        listItem.remove()
        
        // 如果列表容器为空，也删除它
        if (listContainer.children.length === 0) {
          listContainer.remove()
        }
        
        return this.createSuccessResult(editor)
      }
    } else {
      // 分割列表项：创建新的列表项
      const newLi = document.createElement('li')
      newLi.style.textAlign = 'left'
      
      // 处理文本分割
      if (textNode && offset < (textNode.textContent?.length || 0)) {
        // 光标后有文本，需要分割
        textNode.textContent = textNode.textContent?.substring(0, offset) || ''
        
        // 提取光标后的所有内容（包括格式元素）
        const extractRange = document.createRange()
        extractRange.setStart(textNode, offset)
        if (listItem.lastChild) {
          extractRange.setEndAfter(listItem.lastChild)
        } else {
          extractRange.setEnd(listItem, listItem.childNodes.length)
        }
        
        const fragment = extractRange.extractContents()
        if (fragment.hasChildNodes()) {
          while (fragment.firstChild) {
            newLi.appendChild(fragment.firstChild)
          }
        } else {
          newLi.appendChild(document.createTextNode('\u200B'))
        }
      } else {
        // 光标在末尾，创建空的列表项
        newLi.appendChild(document.createTextNode('\u200B'))
      }
      
      // 在列表项后插入新的列表项
      if (listItem.nextSibling) {
        listContainer.insertBefore(newLi, listItem.nextSibling)
      } else {
        listContainer.appendChild(newLi)
      }
      
      // 清理空的格式元素
      this.cleanupEmptyInlineElements(listItem)
      
      // 设置光标到新列表项
      const newRange = document.createRange()
      if (newLi.firstChild) {
        if (newLi.firstChild.nodeType === Node.TEXT_NODE) {
          const textNode = newLi.firstChild as Text
          newRange.setStart(textNode, 0)
        } else {
          // 查找第一个文本节点
          const walker = document.createTreeWalker(
            newLi,
            NodeFilter.SHOW_TEXT,
            null
          )
          const firstTextNode = walker.nextNode() as Text | null
          if (firstTextNode) {
            newRange.setStart(firstTextNode, 0)
          } else {
            newRange.setStart(newLi, 0)
          }
        }
      } else {
        newRange.setStart(newLi, 0)
      }
      newRange.collapse(true)
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(newRange)
      }
      editor.focus()
      
      return this.createSuccessResult(editor)
    }
    
    return null
  }
  
  /**
   * 命令 3: 提升空块（参考 Tiptap liftEmptyBlock）
   */
  private liftEmptyBlock(editor: HTMLElement, range: Range): CommandResult | null {
    const node = range.commonAncestorContainer
    let block: Element | null = null
    
    if (node.nodeType === Node.TEXT_NODE) {
      block = node.parentElement
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      block = node as Element
    }
    
    if (!block) return null
    
    const tagName = block.tagName.toLowerCase()
    if (!['p', 'div', 'blockquote', 'li'].includes(tagName)) return null
    
    // 检查是否为空块
    const text = block.textContent?.trim() || ''
    if (text !== '') return null
    
    // 创建新段落
    const p = document.createElement('p')
    p.style.textAlign = 'left'
    const br = document.createElement('br')
    p.appendChild(br)
    block.parentNode?.insertBefore(p, block.nextSibling)
    
    // 设置光标到新段落
    const newRange = document.createRange()
    newRange.setStart(p, 0)
    newRange.collapse(true)
    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
      selection.addRange(newRange)
    }
    editor.focus()
    
    return this.createSuccessResult(editor)
  }
  
  /**
   * 命令 4: 分割段落（参考 Tiptap splitBlock）
   * 改进：正确处理嵌套的行内格式元素（span、code 等）
   */
  private splitBlock(editor: HTMLElement, range: Range): CommandResult | null {
    const node = range.commonAncestorContainer
    let element: Element | null = null
    
    if (node.nodeType === Node.TEXT_NODE) {
      element = node.parentElement
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      element = node as Element
    }
    
    // 查找当前块级元素
    let currentBlock: Element | null = null
    while (element && element !== editor) {
      const tagName = element.tagName.toLowerCase()
      if (['p', 'div', 'blockquote', 'li'].includes(tagName)) {
        currentBlock = element
        break
      }
      element = element.parentElement
    }
    
    if (!currentBlock) {
      // 不在块级元素中，返回 false，让其他命令处理
      return null
    }
    
    // 创建新段落
    const p = document.createElement('p')
    p.style.textAlign = 'left'
    
    // 处理文本节点分割（包括嵌套在行内格式元素内的情况）
    if (node.nodeType === Node.TEXT_NODE) {
      const textNode = node as Text
      const offset = range.startOffset
      const text = textNode.textContent || ''
      const afterText = text.substring(offset)
      
      // 分割文本节点
      if (afterText) {
        // 如果光标后有文本，需要处理
        // 先创建新的文本节点用于光标后的内容
        const afterTextNode = document.createTextNode(afterText)
        const textParent = textNode.parentElement
        
        // 分割文本节点
        textNode.textContent = text.substring(0, offset)
        
        if (textParent) {
          // 在文本节点后插入新的文本节点
          textParent.insertBefore(afterTextNode, textNode.nextSibling)
          
          // 创建新的range来提取光标后的所有内容
          const extractRange = document.createRange()
          extractRange.setStart(afterTextNode, 0) // 从新文本节点开始
          // 将结束位置设置为块级元素的结束
          if (currentBlock.lastChild) {
            extractRange.setEndAfter(currentBlock.lastChild)
          } else {
            extractRange.setEnd(currentBlock, currentBlock.childNodes.length)
          }
          
          // 提取内容（这会自动处理嵌套的格式元素，保留格式）
          const fragment = extractRange.extractContents()
          
          if (fragment.hasChildNodes()) {
            // 将提取的内容（包括格式）移到新段落
            while (fragment.firstChild) {
              p.appendChild(fragment.firstChild)
            }
          } else {
            // 如果没有内容，使用 <br> 确保有高度
            const br = document.createTextNode('\u200B') // 使用零宽空格而不是 br，保持格式上下文
            p.appendChild(br)
          }
        } else {
          // 如果找不到父元素，直接处理
          if (afterText.trim()) {
            p.appendChild(document.createTextNode(afterText))
          } else {
            const br = document.createElement('br')
            p.appendChild(br)
          }
        }
        
        // 清理空的格式元素
        this.cleanupEmptyInlineElements(currentBlock)
      } else {
        // 光标后没有文本，检查光标是否在段落末尾
        // 如果光标在段落末尾，直接创建新段落
        let isAtEnd = false
        
        // 检查文本节点是否在段落末尾
        // 方法1：检查文本节点的 offset 是否等于文本长度
        const textLength = textNode.textContent?.length || 0
        if (offset === textLength) {
          // 光标在文本节点末尾，检查是否有后续兄弟节点
          let hasNextContent = false
          let currentNode: Node | null = textNode
          
          // 检查当前节点及其所有父节点是否有后续兄弟节点
          while (currentNode && currentNode !== currentBlock) {
            if (currentNode.nextSibling) {
              hasNextContent = true
              break
            }
            currentNode = currentNode.parentElement
          }
          
          // 如果文本节点是段落的最后一个子节点，或者没有后续内容
          if (!hasNextContent) {
            isAtEnd = true
          }
        }
        
        if (isAtEnd) {
          // 光标在段落末尾，直接创建新段落（保留格式上下文）
          // 先插入新段落，确保它被正确创建
          if (currentBlock.parentNode) {
            currentBlock.parentNode.insertBefore(p, currentBlock.nextSibling)
          }
          
          let inlineParent: Element | null = null
          let current: Node | null = textNode
          while (current && current !== currentBlock) {
            if (current.nodeType === Node.ELEMENT_NODE) {
              const elem = current as Element
              const tagName = elem.tagName.toLowerCase()
              if (['span', 'code', 'strong', 'b', 'em', 'i', 'u', 's', 'del', 'mark', 'a'].includes(tagName)) {
                inlineParent = elem
                break
              }
            }
            current = current.parentNode
          }
          
          if (inlineParent) {
            // 如果光标在格式元素内，创建相同的格式元素
            const clonedInline = inlineParent.cloneNode(false) as Element
            clonedInline.appendChild(document.createTextNode('\u200B'))
            p.appendChild(clonedInline)
          } else {
            // 没有格式，使用 <br>
            const br = document.createElement('br')
            p.appendChild(br)
          }
          
          // 设置光标到新段落（提前设置，避免后续代码重复设置）
          const newRange = document.createRange()
          const firstChild = p.firstChild
          if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
            newRange.setStart(firstChild, 0)
          } else if (firstChild && firstChild.nodeName === 'BR') {
            newRange.setStart(p, 0)
          } else if (firstChild && firstChild.nodeType === Node.ELEMENT_NODE) {
            const walker = document.createTreeWalker(
              firstChild,
              NodeFilter.SHOW_TEXT,
              null
            )
            const textNode = walker.nextNode() as Text | null
            if (textNode) {
              newRange.setStart(textNode, 0)
            } else {
              newRange.setStart(p, 0)
            }
          } else {
            newRange.setStart(p, 0)
          }
          newRange.collapse(true)
          const selection = window.getSelection()
          if (selection) {
            selection.removeAllRanges()
            selection.addRange(newRange)
          }
          editor.focus()
          
          return this.createSuccessResult(editor)
        } else {
          // 光标不在段落末尾，提取后续内容
          const extractRange = document.createRange()
          extractRange.setStart(textNode, offset)
          if (currentBlock.lastChild) {
            extractRange.setEndAfter(currentBlock.lastChild)
          } else {
            extractRange.setEnd(currentBlock, currentBlock.childNodes.length)
          }
          
          // 提取内容（保留格式）
          const fragment = extractRange.extractContents()
          
          if (fragment.hasChildNodes()) {
            // 将提取的内容（包括格式）移到新段落
            while (fragment.firstChild) {
              p.appendChild(fragment.firstChild)
            }
          } else {
            // 没有内容，检查光标是否在格式元素内，如果是，保留格式上下文
            let inlineParent: Element | null = null
            let current: Node | null = textNode
            while (current && current !== currentBlock) {
              if (current.nodeType === Node.ELEMENT_NODE) {
                const elem = current as Element
                const tagName = elem.tagName.toLowerCase()
                if (['span', 'code', 'strong', 'b', 'em', 'i', 'u', 's', 'del', 'mark', 'a'].includes(tagName)) {
                  inlineParent = elem
                  break
                }
              }
              current = current.parentNode
            }
            
            if (inlineParent) {
              // 如果光标在格式元素内，创建相同的格式元素
              const clonedInline = inlineParent.cloneNode(false) as Element
              clonedInline.appendChild(document.createTextNode('\u200B'))
              p.appendChild(clonedInline)
            } else {
              // 没有格式，使用 <br>
              const br = document.createElement('br')
              p.appendChild(br)
            }
          }
        }
        
        // 清理空的格式元素
        this.cleanupEmptyInlineElements(currentBlock)
      }
    } else {
      // 光标在元素节点上，检查是否需要移动后续内容
      if (element && element !== currentBlock) {
        // 光标在行内格式元素上，需要将后续内容移到新段落
        const parent = element.parentElement
        if (parent) {
          // 创建range从当前元素到块级元素结束
          const extractRange = document.createRange()
          extractRange.setStartAfter(element)
          if (currentBlock.lastChild) {
            extractRange.setEndAfter(currentBlock.lastChild)
          } else {
            extractRange.setEnd(currentBlock, currentBlock.childNodes.length)
          }
          
          // 提取内容（保留格式）
          const fragment = extractRange.extractContents()
          
          if (fragment.hasChildNodes()) {
            // 将提取的内容（包括格式）移到新段落
            while (fragment.firstChild) {
              p.appendChild(fragment.firstChild)
            }
          } else {
            // 没有后续内容，检查当前元素是否是格式元素，如果是，保留格式
            const tagName = element.tagName.toLowerCase()
            if (['span', 'code', 'strong', 'b', 'em', 'i', 'u', 's', 'del', 'mark', 'a'].includes(tagName)) {
              const clonedInline = element.cloneNode(false) as Element
              clonedInline.appendChild(document.createTextNode('\u200B'))
              p.appendChild(clonedInline)
            } else {
              const br = document.createElement('br')
              p.appendChild(br)
            }
          }
        } else {
          // 如果新段落为空，使用 <br> 确保有高度
          const br = document.createElement('br')
          p.appendChild(br)
        }
      } else {
        // 如果新段落为空，使用 <br> 确保有高度
        const br = document.createElement('br')
        p.appendChild(br)
      }
    }
    
    // 插入新段落
    if (currentBlock.parentNode) {
      currentBlock.parentNode.insertBefore(p, currentBlock.nextSibling)
    }
    
    // 设置光标到新段落
    const newRange = document.createRange()
    const firstChild = p.firstChild
    if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
      newRange.setStart(firstChild, 0)
    } else if (firstChild && firstChild.nodeName === 'BR') {
      newRange.setStart(p, 0)
    } else if (firstChild && firstChild.nodeType === Node.ELEMENT_NODE) {
      // 如果第一个子节点是元素（如 span），查找其中的文本节点
      const walker = document.createTreeWalker(
        firstChild,
        NodeFilter.SHOW_TEXT,
        null
      )
      const textNode = walker.nextNode() as Text | null
      if (textNode) {
        newRange.setStart(textNode, 0)
      } else {
        newRange.setStart(p, 0)
      }
    } else {
      const br = document.createElement('br')
      p.appendChild(br)
      newRange.setStart(p, 0)
    }
    newRange.collapse(true)
    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
      selection.addRange(newRange)
    }
    editor.focus()
    
    return this.createSuccessResult(editor)
  }
  
  /**
   * 清理空的格式元素
   */
  private cleanupEmptyInlineElements(block: Element): void {
    const inlineElements = block.querySelectorAll('span, code, strong, b, em, i, u, s, del, mark, a')
    inlineElements.forEach((elem) => {
      const element = elem as Element
      if (!element.textContent || element.textContent.trim() === '') {
        const parent = element.parentElement
        if (parent) {
          // 移除空的格式元素，但保留其子节点（如果有）
          while (element.firstChild) {
            parent.insertBefore(element.firstChild, element)
          }
          parent.removeChild(element)
        }
      }
    })
  }
  
  /**
   * 创建成功结果
   */
  private createSuccessResult(editor: HTMLElement): CommandResult {
    // 同步获取新状态
    const html = editor.innerHTML
    const json = htmlToJSON(html, editor)
    const newSelection = saveSelectionInfo(editor) || undefined
    
    return {
      success: true,
      newState: {
        content: json,
        selection: newSelection || null
      },
      newSelection: newSelection,
      shouldEmit: true
    }
  }
}

// ============================================================================
// 文字颜色命令组
// ============================================================================

/**
 * 文字颜色命令
 */
export class TextColorCommand extends BaseCommand implements Command {
  constructor(private color: string) {
    super()
  }
  
  execute(context: CommandContext): CommandResult {
    const { editor, selection } = context
    
    if (!selection || selection.rangeCount === 0) {
      return { success: false, error: 'No selection' }
    }
    
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.commonAncestorContainer)) {
      return { success: false, error: 'Selection outside editor' }
    }
    
    // 检查光标或选中文本是否在已有的颜色 span 内
    let existingColorSpan: HTMLSpanElement | null = null
    
    if (range.collapsed) {
      // 光标位置，查找包含光标的颜色 span
      let node: Node | null = range.startContainer
      while (node && node !== editor) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement
          if (element.tagName.toLowerCase() === 'span' && element.style.color) {
            existingColorSpan = element as HTMLSpanElement
            break
          }
        }
        node = node.parentNode
      }
    } else {
      // 有选中文本，检查选择是否完全在一个颜色 span 内
      const startNode = range.startContainer
      const endNode = range.endContainer
      
      // 查找开始和结束节点的共同颜色 span
      let startSpan: HTMLSpanElement | null = null
      let endSpan: HTMLSpanElement | null = null
      
      let node: Node | null = startNode
      while (node && node !== editor) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement
          if (element.tagName.toLowerCase() === 'span' && element.style.color) {
            startSpan = element as HTMLSpanElement
            break
          }
        }
        node = node.parentNode
      }
      
      node = endNode
      while (node && node !== editor) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement
          if (element.tagName.toLowerCase() === 'span' && element.style.color) {
            endSpan = element as HTMLSpanElement
            break
          }
        }
        node = node.parentNode
      }
      
      // 如果开始和结束都在同一个颜色 span 内，使用这个 span
      if (startSpan && endSpan && startSpan === endSpan) {
        existingColorSpan = startSpan
      }
    }
    
    // 如果光标或选中文本在已有的颜色 span 内，直接替换颜色
    if (existingColorSpan) {
      if (range.collapsed) {
        existingColorSpan.style.color = this.color
        
        // 保持光标在当前位置，确保使用 span 内的文本节点
        let targetTextNode: Text | null = null
        let targetOffset = range.startOffset
        
        // 查找 span 内的文本节点
        if (range.startContainer.nodeType === Node.TEXT_NODE) {
          // 如果光标已经在文本节点中，检查它是否在 span 内
          let node: Node | null = range.startContainer
          while (node && node !== existingColorSpan) {
            node = node.parentNode
          }
          if (node === existingColorSpan) {
            // 文本节点在 span 内，使用它
            targetTextNode = range.startContainer as Text
            targetOffset = range.startOffset
          }
        }
        
        // 如果没有找到文本节点，查找 span 内的第一个文本节点
        if (!targetTextNode) {
          const walker = document.createTreeWalker(
            existingColorSpan,
            NodeFilter.SHOW_TEXT,
            null
          )
          targetTextNode = walker.nextNode() as Text | null
          targetOffset = 0
        }
        
        // 设置光标位置
        const newRange = document.createRange()
        if (targetTextNode) {
          const maxOffset = targetTextNode.textContent?.length || 0
          const safeOffset = Math.min(targetOffset, maxOffset)
          newRange.setStart(targetTextNode, safeOffset)
          newRange.collapse(true)
        } else {
          // 如果没有文本节点，创建一个
          const textNode = document.createTextNode('\u200B')
          existingColorSpan.appendChild(textNode)
          newRange.setStart(textNode, 0)
          newRange.collapse(true)
        }
        
        const sel = window.getSelection()
        if (sel) {
          sel.removeAllRanges()
          sel.addRange(newRange)
        }
      } else {
        // 有选中文本，且选择完全在一个颜色 span 内，直接更新颜色
        existingColorSpan.style.color = this.color
        
        // 保持选择范围（如果可能）
        try {
          // 尝试保持原有的选择范围
          // 先检查原始容器是否仍然有效
          let startNode: Node | null = null
          let startOffset = range.startOffset
          let endNode: Node | null = null
          let endOffset = range.endOffset
          
          // 检查开始节点是否仍然有效
          if (range.startContainer.nodeType === Node.TEXT_NODE && 
              editor.contains(range.startContainer)) {
            startNode = range.startContainer
          } else {
            // 如果开始节点无效，尝试在 span 内找到对应的文本节点
            const walker = document.createTreeWalker(
              existingColorSpan,
              NodeFilter.SHOW_TEXT,
              null
            )
            let textNode: Text | null = null
            let charCount = 0
            while ((textNode = walker.nextNode() as Text | null)) {
              const textLength = textNode.textContent?.length || 0
              if (charCount + textLength >= range.startOffset) {
                startNode = textNode
                startOffset = range.startOffset - charCount
                break
              }
              charCount += textLength
            }
          }
          
          // 检查结束节点是否仍然有效
          if (range.endContainer.nodeType === Node.TEXT_NODE && 
              editor.contains(range.endContainer)) {
            endNode = range.endContainer
          } else {
            // 如果结束节点无效，尝试在 span 内找到对应的文本节点
            const walker = document.createTreeWalker(
              existingColorSpan,
              NodeFilter.SHOW_TEXT,
              null
            )
            let textNode: Text | null = null
            let charCount = 0
            while ((textNode = walker.nextNode() as Text | null)) {
              const textLength = textNode.textContent?.length || 0
              if (charCount + textLength >= range.endOffset) {
                endNode = textNode
                endOffset = range.endOffset - charCount
                break
              }
              charCount += textLength
            }
          }
          
          if (startNode && endNode) {
            const newRange = document.createRange()
            newRange.setStart(startNode, Math.min(startOffset, (startNode as Text).textContent?.length || 0))
            newRange.setEnd(endNode, Math.min(endOffset, (endNode as Text).textContent?.length || 0))
            
            const sel = window.getSelection()
            if (sel) {
              sel.removeAllRanges()
              sel.addRange(newRange)
            }
          } else {
            // 如果无法保持原有范围，将光标放在 span 后
            const newRange = document.createRange()
            newRange.setStartAfter(existingColorSpan)
            newRange.collapse(true)
            const sel = window.getSelection()
            if (sel) {
              sel.removeAllRanges()
              sel.addRange(newRange)
            }
          }
        } catch (e) {
          // 如果无法保持原有范围，将光标放在 span 后
          const newRange = document.createRange()
          newRange.setStartAfter(existingColorSpan)
          newRange.collapse(true)
          const sel = window.getSelection()
          if (sel) {
            sel.removeAllRanges()
            sel.addRange(newRange)
          }
        }
      }
    } else {
      const span = document.createElement('span')
      span.style.color = this.color
      
      if (range.collapsed) {
        // 光标位置，创建一个带颜色的 span
        span.appendChild(document.createTextNode('\u200B'))
        range.insertNode(span)
        
        // 将光标放在 span 内的文本节点中
        const textNode = span.firstChild as Text
        const newRange = document.createRange()
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          newRange.setStart(textNode, 0)
          newRange.collapse(true)
        } else {
          newRange.selectNodeContents(span)
          newRange.collapse(true)
        }
        const sel = window.getSelection()
        if (sel) {
          sel.removeAllRanges()
          sel.addRange(newRange)
        }
      } else {
        // 有选中文本，包装选中内容
        // 先保存选择范围信息，用于后续恢复
        const startContainer = range.startContainer
        const startOffset = range.startOffset
        const endContainer = range.endContainer
        const endOffset = range.endOffset
        
        try {
          // 方法1：尝试使用 surroundContents（最简单，但可能失败）
          try {
            range.surroundContents(span)
            // surroundContents 后，光标会在 span 内，需要移到 span 后
            const newRange = document.createRange()
            newRange.setStartAfter(span)
            newRange.collapse(true)
            const sel = window.getSelection()
            if (sel) {
              sel.removeAllRanges()
              sel.addRange(newRange)
            }
          } catch (surroundError) {
            // surroundContents 失败（通常是因为选择跨越了多个节点边界）
            // 使用更可靠的方法：先展开嵌套的颜色span，然后重新包装
            
            // 查找选择范围内的所有颜色span
            const colorSpans: HTMLSpanElement[] = []
            const allSpans = editor.querySelectorAll('span[style*="color"]')
            allSpans.forEach((spanEl) => {
              const spanElement = spanEl as HTMLSpanElement
              try {
                // 检查span是否在选择范围内
                if (range.intersectsNode(spanElement)) {
                  colorSpans.push(spanElement)
                }
              } catch (e) {
                // 忽略错误
              }
            })
            
            // 如果有颜色span在选择范围内，先展开它们（移除span但保留文本）
            if (colorSpans.length > 0) {
              // 从内到外处理，避免破坏DOM结构
              const sortedSpans = colorSpans.sort((a, b) => {
                // 计算DOM深度，深的先处理
                let depthA = 0
                let depthB = 0
                let node: Node | null = a
                while (node && node !== editor) {
                  depthA++
                  node = node.parentNode
                }
                node = b
                while (node && node !== editor) {
                  depthB++
                  node = node.parentNode
                }
                return depthB - depthA // 深度大的先处理
              })
              
              // 展开所有颜色span
              sortedSpans.forEach(colorSpan => {
                const parent = colorSpan.parentNode
                if (parent) {
                  // 将span的所有子节点移到父节点
                  const fragment = document.createDocumentFragment()
                  while (colorSpan.firstChild) {
                    fragment.appendChild(colorSpan.firstChild)
                  }
                  parent.insertBefore(fragment, colorSpan)
                  parent.removeChild(colorSpan)
                }
              })
              
              // DOM结构已改变，需要重新创建range
              // 先尝试使用原始容器（如果它们还在DOM中）
              let newStart: { node: Text; offset: number } | null = null
              let newEnd: { node: Text; offset: number } | null = null
              
              // 尝试使用原始容器
              if (startContainer.nodeType === Node.TEXT_NODE && editor.contains(startContainer)) {
                const textNode = startContainer as Text
                const maxOffset = textNode.textContent?.length || 0
                newStart = { node: textNode, offset: Math.min(startOffset, maxOffset) }
              }
              if (endContainer.nodeType === Node.TEXT_NODE && editor.contains(endContainer)) {
                const textNode = endContainer as Text
                const maxOffset = textNode.textContent?.length || 0
                newEnd = { node: textNode, offset: Math.min(endOffset, maxOffset) }
              }
              
              // 如果原始容器不在DOM中，通过文本内容重新定位
              if (!newStart || !newEnd) {
                const walker = document.createTreeWalker(
                  range.commonAncestorContainer,
                  NodeFilter.SHOW_TEXT,
                  null
                )
                
                let textNode: Text | null = null
                let currentText = ''
                
                while ((textNode = walker.nextNode() as Text | null)) {
                  const text = textNode.textContent || ''
                  const prevLength = currentText.length
                  currentText += text
                  
                  // 找到开始位置
                  if (!newStart && currentText.length >= startOffset) {
                    const nodeOffset = startOffset - prevLength
                    newStart = { 
                      node: textNode, 
                      offset: Math.min(Math.max(0, nodeOffset), text.length) 
                    }
                  }
                  
                  // 找到结束位置
                  if (!newEnd && currentText.length >= endOffset) {
                    const nodeOffset = endOffset - prevLength
                    newEnd = { 
                      node: textNode, 
                      offset: Math.min(Math.max(0, nodeOffset), text.length) 
                    }
                    break
                  }
                }
              }
              
              if (newStart && newEnd) {
                // 创建新的range并提取内容
                const newRange = document.createRange()
                newRange.setStart(newStart.node, newStart.offset)
                newRange.setEnd(newEnd.node, newEnd.offset)
                
                // 提取内容并用新span包装
                const contents = newRange.extractContents()
                span.appendChild(contents)
                newRange.insertNode(span)
                
                // 将光标放在 span 后
                const finalRange = document.createRange()
                finalRange.setStartAfter(span)
                finalRange.collapse(true)
                const sel = window.getSelection()
                if (sel) {
                  sel.removeAllRanges()
                  sel.addRange(finalRange)
                }
              } else {
                // 如果还是找不到，回退到简单方法
                const contents = range.extractContents()
                span.appendChild(contents)
                range.insertNode(span)
                
                const finalRange = document.createRange()
                finalRange.setStartAfter(span)
                finalRange.collapse(true)
                const sel = window.getSelection()
                if (sel) {
                  sel.removeAllRanges()
                  sel.addRange(finalRange)
                }
              }
            } else {
              // 没有颜色span，正常处理
              const contents = range.extractContents()
              span.appendChild(contents)
              range.insertNode(span)
              
              // 将光标放在 span 后
              const newRange = document.createRange()
              newRange.setStartAfter(span)
              newRange.collapse(true)
              const sel = window.getSelection()
              if (sel) {
                sel.removeAllRanges()
                sel.addRange(newRange)
              }
            }
          }
        } catch (e) {
          return { success: false, error: `Failed to set text color: ${e}` }
        }
      }
    }
    
    editor.focus()
    
    // 立即保存当前的选择信息，确保在 DOM 更新前捕获正确的光标位置
    const savedSelection = saveSelectionInfo(editor)
    
    // 创建结果，使用保存的选择信息
    const html = editor.innerHTML
    const json = htmlToJSON(html, editor)
    
    return {
      success: true,
      newState: {
        content: json,
        selection: savedSelection || null
      },
      newSelection: savedSelection || undefined,
      shouldEmit: true
    }
  }
}

// ============================================================================
// 列表命令组
// ============================================================================
export class ListCommand implements Command {
  constructor(private type: 'ul' | 'ol') {}
  
  execute(context: CommandContext): CommandResult {
    const { editor, selection } = context
    
    if (!selection || selection.rangeCount === 0) {
      return { success: false, error: 'No selection' }
    }
    
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.commonAncestorContainer)) {
      return { success: false, error: 'Selection outside editor' }
    }
    
    const node = range.commonAncestorContainer
    let element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as Element
    
    // 查找当前列表项
    let listItem: HTMLElement | null = null
    let list: HTMLElement | null = null
    
    while (element && element !== editor) {
      if (element.tagName.toLowerCase() === 'li') {
        listItem = element as HTMLElement
        const parent = element.parentElement
        if (parent && (parent.tagName.toLowerCase() === 'ul' || parent.tagName.toLowerCase() === 'ol')) {
          list = parent as HTMLElement
          break
        }
      }
      element = element.parentElement
    }
    
    // 如果已经在列表中
    if (list && listItem) {
      const currentListType = list.tagName.toLowerCase()
      const targetListType = this.type === 'ul' ? 'ul' : 'ol'
      const allItems = list.querySelectorAll('li')
      
      // 检查是否是任务列表
      let hasCheckboxes = Array.from(allItems).some(li => li.querySelector('input[type="checkbox"]'))
      
      // 如果当前是任务列表，先移除所有 checkbox，然后转换为目标列表类型
      if (hasCheckboxes) {
        allItems.forEach(li => {
          const checkbox = li.querySelector('input[type="checkbox"]')
          if (checkbox) checkbox.remove()
        })
        list.classList.remove('task-list')
        
        // 如果当前列表类型不是目标类型，转换列表类型
        if (currentListType !== targetListType) {
          const newList = document.createElement(targetListType)
          while (list.firstChild) {
            newList.appendChild(list.firstChild)
          }
          list.parentElement?.replaceChild(newList, list)
        }
        
        // 移除 checkbox 后，直接返回（不执行移除列表格式的逻辑）
        editor.focus()
        return this.createSuccessResult(editor)
      }
      
      // 如果当前列表类型已经是目标类型，移除列表格式
      if (currentListType === targetListType) {
        // 保存光标位置（在替换元素之前）
        const savedOffset = range.startOffset
        const savedContainer = range.startContainer
        
        // 计算光标在列表项中的相对位置
        let targetListItem: HTMLElement | null = null
        let relativeOffset = 0
        
        // 找到光标所在的列表项
        let currentElement: Node | null = savedContainer
        while (currentElement && currentElement !== editor) {
          if (currentElement.nodeType === Node.ELEMENT_NODE) {
            const el = currentElement as Element
            if (el.tagName.toLowerCase() === 'li') {
              targetListItem = el as HTMLElement
              break
            }
          }
          currentElement = currentElement.parentNode
        }
        
        if (targetListItem) {
          // 计算光标在列表项文本中的相对位置
          if (savedContainer.nodeType === Node.TEXT_NODE) {
            const textBeforeCursor = this.getTextBeforeNode(savedContainer, targetListItem)
            relativeOffset = textBeforeCursor.length + savedOffset
          } else {
            const nodesBeforeCursor = this.getNodesBeforeNode(savedContainer, targetListItem)
            relativeOffset = nodesBeforeCursor.length
          }
        }
        
        const parent = list.parentElement
        if (parent) {
          const fragment = document.createDocumentFragment()
          const paragraphMap = new Map<HTMLElement, HTMLElement>() // 映射：原列表项 -> 新段落
          
          allItems.forEach((li) => {
            const p = document.createElement('p')
            while (li.firstChild) {
              p.appendChild(li.firstChild)
            }
            if (!p.textContent?.trim() && !p.hasChildNodes()) {
              p.appendChild(document.createTextNode('\u200B'))
            }
            fragment.appendChild(p)
            paragraphMap.set(li as HTMLElement, p)
          })
          parent.replaceChild(fragment, list)
          
          // 恢复光标到正确的段落
          const targetParagraph = targetListItem ? paragraphMap.get(targetListItem) : null
          if (targetParagraph) {
            this.restoreCursorPosition(targetParagraph, relativeOffset)
          } else {
            // 如果没有找到目标段落，使用第一个段落
            const firstP = fragment.firstChild as HTMLElement
            if (firstP) {
              this.restoreCursorPosition(firstP, 0)
            }
          }
        }
        // 移除列表格式后，直接返回
        editor.focus()
        return this.createSuccessResult(editor)
      } else {
        // 转换列表类型
        // 保存光标位置（在替换元素之前）
        const savedOffset = range.startOffset
        const savedContainer = range.startContainer
        
        // 计算光标在列表项中的相对位置
        let relativeOffset = 0
        if (listItem) {
          if (savedContainer.nodeType === Node.TEXT_NODE) {
            const textBeforeCursor = this.getTextBeforeNode(savedContainer, listItem)
            relativeOffset = textBeforeCursor.length + savedOffset
          } else {
            const nodesBeforeCursor = this.getNodesBeforeNode(savedContainer, listItem)
            relativeOffset = nodesBeforeCursor.length
          }
        }
        
        const newList = document.createElement(targetListType)
        const listItemMap = new Map<HTMLElement, HTMLElement>() // 映射：原列表项 -> 新列表项
        
        // 转换列表项（直接移动，不克隆，避免引用问题）
        while (list.firstChild) {
          const li = list.firstChild as HTMLElement
          newList.appendChild(li)
          listItemMap.set(li, li) // 同一个元素，只是移动了位置
        }
        
        list.parentElement?.replaceChild(newList, list)
        
        // 转换后，恢复光标位置（保持在同一列表项中）
        // 由于是直接移动元素，listItem 引用仍然有效
        if (listItem && listItem.parentElement === newList) {
          this.restoreCursorPosition(listItem, relativeOffset)
        } else {
          // 如果没有找到目标列表项，使用第一个列表项
          const firstLi = newList.querySelector('li') as HTMLElement
          if (firstLi) {
            this.restoreCursorPosition(firstLi, 0)
          }
        }
      }
    } else {
      // 如果不在列表中，创建新列表
      let blockElement = range.commonAncestorContainer.nodeType === Node.TEXT_NODE
        ? range.commonAncestorContainer.parentElement
        : range.commonAncestorContainer as Element
      
      let block: Element | null = null
      let current: Element | null = blockElement
      while (current && current !== editor) {
        const tagName = current.tagName.toLowerCase()
        if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'].includes(tagName)) {
          block = current
          break
        }
        current = current.parentElement
      }
      
      if (block && block.parentElement) {
        const list = document.createElement(this.type === 'ul' ? 'ul' : 'ol')
        const li = document.createElement('li')
        
        const selectedText = selection.toString()
        if (selectedText) {
          li.appendChild(document.createTextNode(selectedText))
          range.deleteContents()
        } else {
          while (block.firstChild) {
            li.appendChild(block.firstChild)
          }
        }
        
        list.appendChild(li)
        block.parentElement.replaceChild(list, block)
        
        // 恢复光标（同步）
        const textNode = li.firstChild
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          const newRange = document.createRange()
          newRange.setStart(textNode, textNode.textContent?.length || 0)
          newRange.collapse(true)
          const sel = window.getSelection()
          if (sel) {
            sel.removeAllRanges()
            sel.addRange(newRange)
          }
        }
      }
    }
    
    editor.focus()
    return this.createSuccessResult(editor)
  }
  
  /**
   * 获取节点之前的文本内容
   */
  private getTextBeforeNode(node: Node, container: Element): string {
    let text = ''
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    )
    
    let currentNode: Node | null
    while ((currentNode = walker.nextNode())) {
      if (currentNode === node) {
        break
      }
      text += currentNode.textContent || ''
    }
    
    return text
  }
  
  /**
   * 获取节点之前的节点数量
   */
  private getNodesBeforeNode(node: Node, container: Element): Node[] {
    const nodes: Node[] = []
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_ALL,
      null
    )
    
    let currentNode: Node | null
    while ((currentNode = walker.nextNode())) {
      if (currentNode === node) {
        break
      }
      nodes.push(currentNode)
    }
    
    return nodes
  }
  
  /**
   * 恢复光标位置
   */
  private restoreCursorPosition(element: HTMLElement, offset: number): void {
    const textContent = element.textContent || ''
    const targetOffset = Math.min(offset, textContent.length)
    
    // 查找包含目标偏移位置的文本节点
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    )
    
    let currentOffset = 0
    let targetNode: Text | null = null
    let targetNodeOffset = 0
    
    let node: Node | null
    while ((node = walker.nextNode())) {
      const textNode = node as Text
      const nodeLength = textNode.textContent?.length || 0
      
      if (currentOffset + nodeLength >= targetOffset) {
        targetNode = textNode
        targetNodeOffset = targetOffset - currentOffset
        break
      }
      
      currentOffset += nodeLength
    }
    
    // 设置光标位置
    const newRange = document.createRange()
    if (targetNode) {
      const safeOffset = Math.min(targetNodeOffset, targetNode.textContent?.length || 0)
      newRange.setStart(targetNode, safeOffset)
    } else {
      // 如果没有找到文本节点，设置到元素末尾
      if (element.lastChild && element.lastChild.nodeType === Node.TEXT_NODE) {
        const lastText = element.lastChild as Text
        newRange.setStart(lastText, lastText.textContent?.length || 0)
      } else {
        newRange.setStart(element, element.childNodes.length)
      }
    }
    
    newRange.collapse(true)
    const sel = window.getSelection()
    if (sel) {
      sel.removeAllRanges()
      sel.addRange(newRange)
    }
  }
  
  private createSuccessResult(editor: HTMLElement): CommandResult {
    const html = editor.innerHTML
    const json = htmlToJSON(html, editor)
    const newSelection = saveSelectionInfo(editor) || undefined
    
    return {
      success: true,
      newState: {
        content: json,
        selection: newSelection || null
      },
      newSelection: newSelection,
      shouldEmit: true
    }
  }
}

// ============================================================================
// 任务列表命令组
// ============================================================================
export class TaskListCommand extends BaseCommand implements Command {
  /**
   * 获取节点之前的文本内容
   */
  private getTextBeforeNode(node: Node, container: Element): string {
    let text = ''
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    )
    
    let currentNode: Node | null
    while ((currentNode = walker.nextNode())) {
      if (currentNode === node) {
        break
      }
      text += currentNode.textContent || ''
    }
    
    return text
  }
  
  /**
   * 获取节点之前的节点数量
   */
  private getNodesBeforeNode(node: Node, container: Element): Node[] {
    const nodes: Node[] = []
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_ALL,
      null
    )
    
    let currentNode: Node | null
    while ((currentNode = walker.nextNode())) {
      if (currentNode === node) {
        break
      }
      nodes.push(currentNode)
    }
    
    return nodes
  }
  
  /**
   * 恢复光标位置
   */
  private restoreCursorPosition(element: HTMLElement, offset: number): void {
    const textContent = element.textContent || ''
    const targetOffset = Math.min(offset, textContent.length)
    
    // 查找包含目标偏移位置的文本节点
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    )
    
    let currentOffset = 0
    let targetNode: Text | null = null
    let targetNodeOffset = 0
    
    let node: Node | null
    while ((node = walker.nextNode())) {
      const textNode = node as Text
      const nodeLength = textNode.textContent?.length || 0
      
      if (currentOffset + nodeLength >= targetOffset) {
        targetNode = textNode
        targetNodeOffset = targetOffset - currentOffset
        break
      }
      
      currentOffset += nodeLength
    }
    
    // 设置光标位置
    const newRange = document.createRange()
    if (targetNode) {
      const safeOffset = Math.min(targetNodeOffset, targetNode.textContent?.length || 0)
      newRange.setStart(targetNode, safeOffset)
    } else {
      // 如果没有找到文本节点，设置到元素末尾
      if (element.lastChild && element.lastChild.nodeType === Node.TEXT_NODE) {
        const lastText = element.lastChild as Text
        newRange.setStart(lastText, lastText.textContent?.length || 0)
      } else {
        newRange.setStart(element, element.childNodes.length)
      }
    }
    
    newRange.collapse(true)
    const sel = window.getSelection()
    if (sel) {
      sel.removeAllRanges()
      sel.addRange(newRange)
    }
  }
  
  execute(context: CommandContext): CommandResult {
    const { editor, selection } = context
    
    if (!selection || selection.rangeCount === 0) {
      return { success: false, error: 'No selection' }
    }
    
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.commonAncestorContainer)) {
      return { success: false, error: 'Selection outside editor' }
    }
    
    const node = range.commonAncestorContainer
    let element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as Element
    
    // 查找当前列表项
    let listItem: HTMLElement | null = null
    let list: HTMLElement | null = null
    
    while (element && element !== editor) {
      if (element.tagName.toLowerCase() === 'li') {
        listItem = element as HTMLElement
        const parent = element.parentElement
        if (parent && (parent.tagName.toLowerCase() === 'ul' || parent.tagName.toLowerCase() === 'ol')) {
          list = parent as HTMLElement
          break
        }
      }
      element = element.parentElement
    }
    
    // 如果已经在列表中
    if (listItem && list) {
      // 如果是有序列表，先转换为无序列表
      if (list.tagName.toLowerCase() === 'ol') {
        const ul = document.createElement('ul')
        while (list.firstChild) {
          ul.appendChild(list.firstChild)
        }
        list.parentElement?.replaceChild(ul, list)
        list = ul
      }
      
      // 检查是否已经是任务列表
      const allItems = list.querySelectorAll('li')
      const hasCheckbox = Array.from(allItems).some(li => li.querySelector('input[type="checkbox"]'))
      
      if (hasCheckbox) {
        // 移除任务列表格式，将列表项转换为普通段落
        // 保存光标位置（在替换元素之前）
        const savedOffset = range.startOffset
        const savedContainer = range.startContainer
        
        // 计算光标在列表项中的相对位置
        let targetListItem: HTMLElement | null = null
        let relativeOffset = 0
        
        // 找到光标所在的列表项
        let currentElement: Node | null = savedContainer
        while (currentElement && currentElement !== editor) {
          if (currentElement.nodeType === Node.ELEMENT_NODE) {
            const el = currentElement as Element
            if (el.tagName.toLowerCase() === 'li') {
              targetListItem = el as HTMLElement
              break
            }
          }
          currentElement = currentElement.parentNode
        }
        
        if (targetListItem) {
          // 计算光标在列表项文本中的相对位置
          if (savedContainer.nodeType === Node.TEXT_NODE) {
            const textBeforeCursor = this.getTextBeforeNode(savedContainer, targetListItem)
            relativeOffset = textBeforeCursor.length + savedOffset
          } else {
            const nodesBeforeCursor = this.getNodesBeforeNode(savedContainer, targetListItem)
            relativeOffset = nodesBeforeCursor.length
          }
        }
        
        const parent = list.parentElement
        if (parent) {
          const fragment = document.createDocumentFragment()
          const paragraphMap = new Map<HTMLElement, HTMLElement>() // 映射：原列表项 -> 新段落
          
          allItems.forEach((li) => {
            // 移除 checkbox
            const checkbox = li.querySelector('input[type="checkbox"]')
            if (checkbox) checkbox.remove()
            
            // 创建段落
            const p = document.createElement('p')
            p.style.textAlign = 'left'
            while (li.firstChild) {
              p.appendChild(li.firstChild)
            }
            if (!p.textContent?.trim() && !p.hasChildNodes()) {
              p.appendChild(document.createTextNode('\u200B'))
            }
            fragment.appendChild(p)
            paragraphMap.set(li as HTMLElement, p)
          })
          parent.replaceChild(fragment, list)
          
          // 恢复光标到正确的段落
          const targetParagraph = targetListItem ? paragraphMap.get(targetListItem) : null
          if (targetParagraph) {
            this.restoreCursorPosition(targetParagraph, relativeOffset)
          } else {
            // 如果没有找到目标段落，使用第一个段落
            const firstP = fragment.firstChild as HTMLElement
            if (firstP) {
              this.restoreCursorPosition(firstP, 0)
            }
          }
        }
        editor.focus()// 移除任务列表格式后，直接返回
        return this.createSuccessResult(editor)
      } else {
        list.classList.add('task-list')// 添加任务列表格式
        allItems.forEach(li => {
          if (!li.querySelector('input[type="checkbox"]')) {
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.className = 'ckb ckb-xs ckb-primary mr-2'
            li.insertBefore(checkbox, li.firstChild)
          }
        })
      }
    } else {
      const block = this.findBlockElement(range.commonAncestorContainer, editor)// 如果不在列表中，创建任务列表
      if (block && block.parentElement) {
        const selectedText = selection.toString()
        const li = document.createElement('li')
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.className = 'ckb ckb-xs ckb-primary mr-2'
        li.appendChild(checkbox)
        
        if (selectedText) {
          li.appendChild(document.createTextNode(selectedText))
          range.deleteContents()
        } else {
          while (block.firstChild) {
            li.appendChild(block.firstChild)
          }
        }
        
        // 创建或使用现有的 ul
        let ul: HTMLUListElement
        const prevSibling = block.previousElementSibling
        if (prevSibling && prevSibling.tagName.toLowerCase() === 'ul' && 
            prevSibling.querySelector('input[type="checkbox"]')) {
          ul = prevSibling as HTMLUListElement
          ul.classList.add('task-list')
          ul.appendChild(li)
          block.parentElement.removeChild(block)
        } else {
          ul = document.createElement('ul')
          ul.classList.add('task-list')
          ul.appendChild(li)
          block.parentElement.replaceChild(ul, block)
        }
        
        // 恢复光标
        const textNode = li.childNodes[1] || li.firstChild
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          const newRange = document.createRange()
          newRange.setStart(textNode, textNode.textContent?.length || 0)
          newRange.collapse(true)
          const sel = window.getSelection()
          if (sel) {
            sel.removeAllRanges()
            sel.addRange(newRange)
          }
        }
      }
    }
    
    editor.focus()
    return this.createSuccessResult(editor)
  }
}

// ============================================================================
// 图片命令组
// ============================================================================

/**
 * 图片命令数据接口
 */
export interface ImageCommandData {
  imageUrls?: string[]
  replaceUploadId?: string  // 如果提供，替换指定 ID 的上传占位符
}

/**
 * 图片插入命令
 */
export class ImageCommand extends BaseCommand implements Command {
  execute(context: CommandContext): CommandResult {
    // 从 context 中获取额外数据（通过类型断言）
    const data = (context as any).data as ImageCommandData | undefined
    const imageUrls = data?.imageUrls
    const replaceUploadId = data?.replaceUploadId
    const { editor, selection } = context
    
    // 如果有图片 URL，插入图片（可能替换占位符）
    if (imageUrls && imageUrls.length > 0) {
      return this.insertImages(editor, selection, imageUrls, replaceUploadId)
    }
    
    // 否则插入内联上传占位符
    return this.insertUploadPlaceholder(editor, selection)
  }
  
  /**
   * 插入内联上传占位符
   */
  private insertUploadPlaceholder(editor: HTMLElement, selection: Selection | null): CommandResult {
    const uploadId = `image-upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // 创建占位符 div
    const placeholder = document.createElement('div')
    placeholder.className = 'inline-image-upload-placeholder'
    placeholder.setAttribute('data-upload-id', uploadId)
    placeholder.setAttribute('contenteditable', 'false')
    
    // 创建上传界面的 HTML
    placeholder.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 150px;">
        <div style="position: relative; margin-bottom: 1rem;">
          <div style="width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; background-color: rgb(var(--base-200)); border-radius: 0.5rem;">
            <svg width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity: 0.4;">
              <path d="M0 64C0 28.7 28.7 0 64 0H224V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.7 512 0 483.3 0 448V64zM256 128V0L384 128H256z" fill="currentColor"/>
            </svg>
          </div>
          <div style="position: absolute; bottom: -4px; right: -4px; width: 32px; height: 32px; background-color: rgb(var(--primary)); border-radius: 50%; display: flex; align-items: center; justify-center;">
            <svg width="16" height="16" viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32S0 334.3 0 352v96c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96H64V352z" fill="white"/>
            </svg>
          </div>
        </div>
        <div style="margin-bottom: 0.5rem;">
          <span style="text-decoration: underline; cursor: pointer;" class="upload-click-text">Click to upload</span>
          <span> or drag and drop</span>
        </div>
        <p style="font-size: 0.875rem; color: rgb(var(--base-content) / 0.6); margin: 0;">Maximum 3 files, 5MB each</p>
        <input type="file" accept="image/*" multiple style="display: none;" class="upload-file-input">
      </div>
    `
    
    // 添加事件监听
    // 注意：文件输入的 change 事件将在 Editor.vue 的 initializeImageUploads 中绑定
    // 这里只绑定点击和拖拽事件
    const fileInput = placeholder.querySelector('.upload-file-input') as HTMLInputElement
    const clickArea = placeholder.querySelector('.upload-click-text') as HTMLElement
    
    if (fileInput) {
      // 点击事件处理
      const handleClick = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        // 确保文件输入存在且可访问
        if (fileInput && fileInput.parentElement) {
          fileInput.click()
        }
      }
      
      if (clickArea) {
        clickArea.addEventListener('click', handleClick, { capture: true })
      }
      
      // 整个占位符也可以点击
      placeholder.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        // 如果点击的不是文件输入框本身、上传文件项或按钮，触发文件选择
        if (target !== fileInput && 
            !target.closest('.upload-file-item') && 
            !target.closest('button') &&
            target !== clickArea) {
          handleClick(e)
        }
      }, { capture: true })
      
      // 拖拽事件
      placeholder.addEventListener('dragover', (e) => {
        e.preventDefault()
        e.stopPropagation()
        placeholder.classList.add('dragging')
      })
      
      placeholder.addEventListener('dragleave', (e) => {
        e.preventDefault()
        e.stopPropagation()
        placeholder.classList.remove('dragging')
      })
      
      placeholder.addEventListener('drop', (e) => {
        e.preventDefault()
        e.stopPropagation()
        placeholder.classList.remove('dragging')
        
        if (e.dataTransfer?.files) {
          // 触发 change 事件，让 Editor.vue 中的监听器处理
          const dataTransfer = new DataTransfer()
          Array.from(e.dataTransfer.files).forEach(file => dataTransfer.items.add(file))
          fileInput.files = dataTransfer.files
          fileInput.dispatchEvent(new Event('change', { bubbles: true }))
        }
      })
    }
    
    // 插入占位符
    if (!selection || selection.rangeCount === 0) {
      // 如果没有选择，在编辑器末尾插入
      const p = document.createElement('p')
      p.appendChild(placeholder)
      editor.appendChild(p)
    } else {
      const range = selection.getRangeAt(0)
      const blockElement = this.findBlockElement(range.commonAncestorContainer, editor)
      
      if (blockElement) {
        // 在块级元素后插入
        const p = document.createElement('p')
        p.appendChild(placeholder)
        if (blockElement.nextSibling) {
          blockElement.parentElement?.insertBefore(p, blockElement.nextSibling)
        } else {
          blockElement.parentElement?.appendChild(p)
        }
      } else {
        // 直接在光标位置插入
        const p = document.createElement('p')
        p.appendChild(placeholder)
        range.insertNode(p)
      }
    }
    
    // 将光标移动到占位符后
    const newRange = document.createRange()
    newRange.setStartAfter(placeholder)
    newRange.collapse(true)
    const sel = window.getSelection()
    if (sel) {
      sel.removeAllRanges()
      sel.addRange(newRange)
    }
    
    // 触发自定义事件，通知 Editor.vue 初始化上传功能
    // 使用 setTimeout 确保 DOM 已完全插入
    setTimeout(() => {
      const event = new CustomEvent('image-upload-placeholder-created', {
        detail: { uploadId, placeholder }
      })
      editor.dispatchEvent(event)
    }, 0)
    
    editor.focus()
    return this.createSuccessResult(editor)
  }
  
  /**
   * 插入图片
   */
  private insertImages(
    editor: HTMLElement,
    selection: Selection | null,
    imageUrls: string[],
    replaceUploadId?: string
  ): CommandResult {
    // 如果指定了要替换的占位符 ID，在占位符位置插入图片
    if (replaceUploadId) {
      const placeholder = editor.querySelector(`[data-upload-id="${replaceUploadId}"]`) as HTMLElement
      if (placeholder && placeholder.parentElement) {
        const parentP = placeholder.parentElement
        
        // 在占位符位置插入图片
        imageUrls.forEach((url, index) => {
          const img = document.createElement('img')
          img.src = url
          img.className = 'max-w-full h-auto rounded-lg my-4 shadow-sm'
          img.loading = 'lazy'
          img.alt = ''
          
          const p = document.createElement('p')
          p.appendChild(img)
          
          if (index === 0) {
            // 第一个图片替换占位符
            if (parentP.tagName.toLowerCase() === 'p' && parentP.children.length === 1) {
              // 如果父段落只有占位符，直接替换整个段落
              parentP.replaceWith(p)
            } else {
              // 否则在占位符前插入，然后删除占位符
              parentP.insertBefore(p, placeholder)
              placeholder.remove()
            }
          } else {
            // 后续图片插入到前一个图片后
            const lastP = editor.querySelectorAll('p')
            if (lastP.length > 0) {
              const lastParagraph = lastP[lastP.length - 1]
              if (lastParagraph.nextSibling) {
                lastParagraph.parentElement?.insertBefore(p, lastParagraph.nextSibling)
              } else {
                lastParagraph.parentElement?.appendChild(p)
              }
            } else {
              editor.appendChild(p)
            }
          }
        })
        
        // 将光标移动到最后一个图片后
        const lastP = editor.querySelectorAll('p')
        if (lastP.length > 0) {
          const lastParagraph = lastP[lastP.length - 1]
          const newRange = document.createRange()
          newRange.setStart(lastParagraph, lastParagraph.childNodes.length)
          newRange.collapse(true)
          
          const sel = window.getSelection()
          if (sel) {
            sel.removeAllRanges()
            sel.addRange(newRange)
          }
        }
        
        // 保存选择信息
        const restoredSelection = saveSelectionInfo(editor)
        if (restoredSelection) {
          editor.focus()
          const html = editor.innerHTML
          const json = htmlToJSON(html, editor)
          return {
            success: true,
            newState: {
              content: json,
              selection: restoredSelection
            },
            newSelection: restoredSelection,
            shouldEmit: true
          }
        }
        
        editor.focus()
        return this.createSuccessResult(editor)
      }
    }
    
    // 如果没有指定 replaceUploadId，使用原来的逻辑
    if (!selection || selection.rangeCount === 0) {
      // 如果没有选择，在编辑器末尾插入
      imageUrls.forEach(url => {
        const img = document.createElement('img')
        img.src = url
        img.className = 'max-w-full h-auto rounded-lg my-4 shadow-sm'
        img.loading = 'lazy'
        img.alt = ''
        
        // 确保图片在段落中
        const p = document.createElement('p')
        p.appendChild(img)
        editor.appendChild(p)
      })
    } else {
      const range = selection.getRangeAt(0)
      
      // 查找当前块级元素
      const blockElement = this.findBlockElement(range.commonAncestorContainer, editor)
      
      if (blockElement) {
        // 在块级元素后插入图片
        imageUrls.forEach((url, index) => {
          const img = document.createElement('img')
          img.src = url
          img.className = 'max-w-full h-auto rounded-lg my-4 shadow-sm'
          img.loading = 'lazy'
          img.alt = ''
          
          // 确保图片在段落中
          const p = document.createElement('p')
          p.appendChild(img)
          
          if (index === 0) {
            // 第一个图片插入到当前块级元素后
            if (blockElement.nextSibling) {
              blockElement.parentElement?.insertBefore(p, blockElement.nextSibling)
            } else {
              blockElement.parentElement?.appendChild(p)
            }
          } else {
            // 后续图片插入到前一个图片后
            const lastImg = editor.querySelector('img:last-of-type')
            if (lastImg && lastImg.parentElement) {
              if (lastImg.parentElement.nextSibling) {
                lastImg.parentElement.parentElement?.insertBefore(p, lastImg.parentElement.nextSibling)
              } else {
                lastImg.parentElement.parentElement?.appendChild(p)
              }
            } else {
              editor.appendChild(p)
            }
          }
        })
        
        // 将光标移动到最后一个图片后
        const lastP = editor.querySelectorAll('p')
        if (lastP.length > 0) {
          const lastParagraph = lastP[lastP.length - 1]
          const newRange = document.createRange()
          newRange.setStart(lastParagraph, lastParagraph.childNodes.length)
          newRange.collapse(true)
          
          const sel = window.getSelection()
          if (sel) {
            sel.removeAllRanges()
            sel.addRange(newRange)
          }
        }
      } else {
        // 如果没有找到块级元素，直接在光标位置插入
        imageUrls.forEach(url => {
          const img = document.createElement('img')
          img.src = url
          img.className = 'max-w-full h-auto rounded-lg my-4 shadow-sm'
          img.loading = 'lazy'
          img.alt = ''
          
          const p = document.createElement('p')
          p.appendChild(img)
          range.insertNode(p)
        })
      }
    }
    
    // 保存选择信息
    const restoredSelection = saveSelectionInfo(editor)
    if (restoredSelection) {
      editor.focus()
      const html = editor.innerHTML
      const json = htmlToJSON(html, editor)
      return {
        success: true,
        newState: {
          content: json,
          selection: restoredSelection
        },
        newSelection: restoredSelection,
        shouldEmit: true
      }
    }
    
    editor.focus()
    return this.createSuccessResult(editor)
  }
}
