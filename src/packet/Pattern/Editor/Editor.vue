<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { SelectionInfo, CurrentFormat, EditorJSON } from './Editor'
import {
  textColors,
  blockTags,
  maxHistorySize,
  saveSelectionInfo as saveSelectionInfoUtil,
  restoreSelectionInfo as restoreSelectionInfoUtil,
  findParentElement,
  rgbToHex,
  queryCommandState,
  queryCommandValue,
  htmlToJSON,
  jsonToHTML,
  isHTMLString,
  isJSONFormat,
  isMarkdownFormat,
  markdownToJSON,
  jsonToMarkdown,
  type PathSelectionInfo
} from './Editor'

import { CommandManager } from './Command' // 新架构：导入核心模块
import { StateManager, DOMManager, EventHandler } from './Editor'
import { EnterKeyCommand,FormatCommand,ListCommand,TaskListCommand,BlockquoteCommand,CodeBlockCommand,
  CodeCommand,HeadingCommand,AlignCommand,TextColorCommand,HighlightColorCommand,HorizontalRuleCommand,
  TableCommand,ImageCommand } from './Command'
import Toast from '~/packet/Element/Toast/Toast'

interface Props {
  modelValue?: string | EditorJSON  // 支持 HTML 字符串或 JSON 格式
  placeholder?: string
  showToolbar?: boolean
  showCharCount?: boolean
  minHeight?: string
  maxHeight?: string
  wrapperClass?: string
  contentClass?: string
  editable?: boolean
  fullWidth?: boolean
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '开始输入...',
  showToolbar: true,
  showCharCount: false,
  minHeight: 'min-h-64',
  maxHeight: '',
  wrapperClass: '',
  contentClass: '',
  editable: true,
  fullWidth: false,
  rounded: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string | EditorJSON]  // 输出 JSON 格式
  'change': [value: string | EditorJSON]
  'focus': []
  'blur': []
}>()

const editorRef = ref<HTMLElement | null>(null)// 编辑器引用

let commandManager: CommandManager | null = null // 新架构：核心模块
let stateManager: StateManager | null = null
let domManager: DOMManager | null = null
let eventHandler: EventHandler | null = null

// 统一状态管理（使用单一状态源，减少状态不一致）
const editorState = reactive({
  isComposing: false,        // 中文输入法状态
  isUpdating: false,         // 防止更新循环的标志
  content: null as EditorJSON | null,  // 内容（JSON 格式）
  selection: null as PathSelectionInfo | null,  // 当前选择（基于路径）
})

// 内部内容：统一使用 JSON 格式存储
const getInitialContent = (): EditorJSON => {
  const value = props.modelValue
  if (!value) return { type: 'doc', content: [{ type: 'paragraph' }] }
  // 如果输入是 JSON，直接使用
  if (isJSONFormat(value)) {
    return value as EditorJSON
  }
  // HTML 字符串和 Markdown 字符串需要在 onMounted 中处理（需要 editorRef）
  return { type: 'doc', content: [{ type: 'paragraph' }] }  // 默认创建空文档
}
const internalContent = ref<EditorJSON>(getInitialContent())
const history = ref<EditorJSON[]>([])// 撤销/重做历史（使用 JSON 格式）
const historyIndex = ref(-1)
const currentFormat = ref<CurrentFormat>({})// 当前格式状态
const currentTextColor = ref<string>('')
const currentHighlightColor = ref<string>('')
const showLinkDialog = ref(false)// 链接对话框状态
const linkUrl = ref('')
const linkInputRef = ref<any>(null)
const savedLinkSelection = ref<SelectionInfo | null>(null)

// 兼容性：保持旧的 ref 引用
const isComposing = computed({
  get: () => editorState.isComposing,
  set: (val) => { editorState.isComposing = val }
})
const isUpdating = computed({
  get: () => editorState.isUpdating,
  set: (val) => { editorState.isUpdating = val }
})

// 字符计数
const charCount = computed(() => {
  if (!editorRef.value) return 0
  return editorRef.value.innerText.length
})

// 词数统计
const wordCount = computed(() => {
  if (!editorRef.value) return 0
  const text = editorRef.value.innerText.trim()
  return text ? text.split(/\s+/).length : 0
})

// 检查内容是否为空（用于显示 placeholder）
const isEmpty = ref(true)

// 更新 isEmpty 状态
const updateIsEmpty = () => {
  if (!editorRef.value) {
    isEmpty.value = true
    return
  }
  const text = editorRef.value.innerText.trim()
  // 检查是否为空，或者只有零宽空格
  isEmpty.value = text === '' || text === '\u200B' || text.length === 0
}
const canUndo = computed(() => historyIndex.value > 0)// 撤销/重做状态
const canRedo = computed(() => historyIndex.value < history.value.length - 1)
// 保存到历史（使用 JSON 格式）
const saveToHistory = () => {
  if (!editorRef.value) return
  // 从 DOM 获取 HTML 并转换为 JSON
  const html = editorRef.value.innerHTML
  const json = htmlToJSON(html, editorRef.value)
  history.value = history.value.slice(0, historyIndex.value + 1)  // 移除当前索引之后的历史
  history.value.push(json)  // 添加新内容（JSON 格式）
  if (history.value.length > maxHistorySize) {  // 限制历史大小
    history.value.shift()
  } else {
    historyIndex.value = history.value.length - 1
  }
}



// 兼容旧接口（使用新架构）
const execCommand = (command: string, value?: string | boolean) => {
  if (eventHandler && commandManager) { // 使用新架构处理格式化命令
    const formatCommands: Record<string, string> = {
      'bold': 'format-bold',
      'italic': 'format-italic',
      'underline': 'format-underline',
      'strikeThrough': 'format-strikethrough',
      'superscript': 'format-superscript',
      'subscript': 'format-subscript'
    }
    
    const commandName = formatCommands[command]
    if (commandName && commandManager.has(commandName)) {
      const handled = eventHandler.executeCommand(commandName)
      if (handled) {
        updateContent() // 更新状态
        saveToHistory()
        nextTick(() => {
          updateFormatState()
        })
        return
      }
    }
  }
}

// 保存选择信息（包装函数，传入 editorRef）
const saveSelectionInfo = (): SelectionInfo | null => {
  return saveSelectionInfoUtil(editorRef.value)
}
// 恢复选择信息（包装函数，传入 editorRef）
const restoreSelectionInfo = (info: SelectionInfo | null): boolean => {
  return restoreSelectionInfoUtil(info, editorRef.value)
}
const updateContent = (delayEmit = false) => {
  if (!editorRef.value) return
  // 保存选择信息（如果光标在编辑器中）
  const selection = window.getSelection()
  const savedInfo = selection && selection.rangeCount > 0 && editorRef.value.contains(selection.getRangeAt(0).commonAncestorContainer)
    ? saveSelectionInfo()
    : null
  
  // 从 DOM 获取 HTML 并转换为 JSON
  const html = editorRef.value.innerHTML
  const json = htmlToJSON(html, editorRef.value)
  internalContent.value = json  // 存储 JSON 格式
  
  // 如果 delayEmit 为 true，延迟 emit 确保 isUpdating 已设置
  if (delayEmit) {
    nextTick(() => {
      isUpdating.value = true
      emit('update:modelValue', json)
      emit('change', json)
      nextTick(() => {
        isUpdating.value = false
        if (savedInfo) {
          restoreSelectionInfo(savedInfo)
        }
      })
    })
  } else {
    emit('update:modelValue', json)  // 输出 JSON 格式
    emit('change', json)
    // 恢复光标位置（如果之前有保存）
    if (savedInfo) {
      nextTick(() => {
        restoreSelectionInfo(savedInfo)
      })
    }
  }
}


// 更新格式状态
const updateFormatState = () => {
  try {
    if (!editorRef.value) return
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    // 使用 Object.assign 更新属性，而不是替换整个对象
    Object.assign(currentFormat.value, {
      bold: queryCommandState('bold'),
      italic: queryCommandState('italic'),
      underline: queryCommandState('underline'),
      strikeThrough: queryCommandState('strikeThrough'),
    })

  const range = selection.getRangeAt(0)
  if (!range?.commonAncestorContainer || !editorRef.value.contains(range.commonAncestorContainer)) return

  const node = range.commonAncestorContainer
  
  // 检查标题（如果当前没有设置 heading，才更新）
  const headingEl = findParentElement(node, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], editorRef.value)
  if (headingEl) {
    currentFormat.value.heading = parseInt(headingEl.tagName.charAt(1))
  } else if (currentFormat.value.heading === undefined) {
    // 只有在 heading 未定义时才设置为 null，避免覆盖手动设置的值
    currentFormat.value.heading = null
  }

  // 检查列表
  const ulEl = findParentElement(node, 'ul', editorRef.value)
  const olEl = findParentElement(node, 'ol', editorRef.value)
  if (ulEl) {
    currentFormat.value.listType = ulEl.querySelector('input[type="checkbox"]') ? 'taskList' : 'ul'
  } else if (olEl) {
    currentFormat.value.listType = 'ol'
  } else {
    currentFormat.value.listType = null
  }

  // 检查对齐
  currentFormat.value.align = queryCommandValue('justifyLeft') ? 'left' :
                queryCommandValue('justifyCenter') ? 'center' :
                queryCommandValue('justifyRight') ? 'right' :
                queryCommandValue('justifyFull') ? 'justify' : null

  // 检查引用、代码块、链接、行内代码、高亮
  currentFormat.value.blockquote = !!findParentElement(node, 'blockquote', editorRef.value)
  currentFormat.value.codeBlock = !!findParentElement(node, 'pre', editorRef.value)
  const linkEl = findParentElement(node, 'a', editorRef.value) as HTMLAnchorElement | null
  currentFormat.value.link = linkEl?.href || null
  currentFormat.value.code = !!findParentElement(node, 'code', editorRef.value)
  
  const markEl = findParentElement(node, 'mark', editorRef.value)
  if (markEl) {
    currentFormat.value.highlight = true
    const bgColor = window.getComputedStyle(markEl as HTMLElement).backgroundColor
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
      currentHighlightColor.value = rgbToHex(bgColor)
    }
  } else {
    currentFormat.value.highlight = false
  }

  // 检查上标和下标
  currentFormat.value.superscript = queryCommandState('superscript')
  currentFormat.value.subscript = queryCommandState('subscript')
  } catch (error) {
    // 忽略 DOM 操作错误，避免在编辑器内容变化时导致崩溃
    console.warn('updateFormatState error:', error)
  }
}

// 检查格式是否激活
const isFormatActive = (format: string): boolean => {
  return currentFormat.value[format as keyof typeof currentFormat.value] === true
}

// 检查标题是否激活
const isHeadingActive = (level: number): boolean => {
  return currentFormat.value.heading === level
}

// 检查列表是否激活
const isListActive = (type: 'ul' | 'ol' | 'taskList'): boolean => {
  return currentFormat.value.listType === type
}

// 检查对齐是否激活
const isAlignActive = (align: 'left' | 'center' | 'right' | 'justify'): boolean => {
  return currentFormat.value.align === align
}

// 检查引用是否激活
const isBlockquoteActive = (): boolean => {
  return currentFormat.value.blockquote === true
}

// 检查代码块是否激活
const isCodeBlockActive = (): boolean => {
  return currentFormat.value.codeBlock === true
}

// 检查链接是否激活
const isLinkActive = (): boolean => {
  return currentFormat.value.link !== null && currentFormat.value.link !== undefined
}

// 设置标题（使用新架构）
const setHeading = (level: number) => {
  if (eventHandler && commandManager) { // 使用新架构
    const commandName = `heading-${level}`
    if (commandManager.has(commandName)) {
      const handled = eventHandler.executeCommand(commandName)
      if (handled) {
        updateContent()
        saveToHistory()
        nextTick(() => {
          updateFormatState()
        })
        return
      }
    }
  }
}

// 切换列表
const toggleList = (type: 'ul' | 'ol') => {
  if (eventHandler && commandManager) { // 使用新架构
    const commandName = `list-${type}`
    if (commandManager.has(commandName)) {
      const handled = eventHandler.executeCommand(commandName)
      if (handled) {
        updateContent()
        saveToHistory()
        nextTick(() => {
          updateFormatState()
        })
        return
      }
    }
  }
}

// 切换任务列表（使用新架构）
const toggleTaskList = () => {
  if (eventHandler && commandManager) { // 使用新架构
    if (commandManager.has('list-task')) {
      const handled = eventHandler.executeCommand('list-task')
      if (handled) {
        updateContent()
        saveToHistory()
        nextTick(() => {
          updateFormatState()
        })
        return
      }
    }
  }
}

// 设置对齐（使用新架构）
const setAlign = (align: 'left' | 'center' | 'right' | 'justify') => {
  if (eventHandler && commandManager) { // 使用新架构
    const commandName = `align-${align}`
    if (commandManager.has(commandName)) {
      const handled = eventHandler.executeCommand(commandName)
      if (handled) {
        updateContent()
        saveToHistory()
        nextTick(() => {
          updateFormatState()
        })
        return
      }
    }
  }
}

// 切换引用（使用新架构）
const toggleBlockquote = () => {
  if (eventHandler && commandManager) { // 使用新架构
    if (commandManager.has('blockquote')) {
      const handled = eventHandler.executeCommand('blockquote')
      if (handled) {
        updateContent()
        saveToHistory()
        nextTick(() => {
          updateFormatState()
        })
        return
      }
    }
  }
}

// 切换代码块
const toggleCodeBlock = () => {
  if (eventHandler && commandManager) { // 使用新架构
    if (commandManager.has('code-block')) {
      const handled = eventHandler.executeCommand('code-block')
      if (handled) {
        updateContent()
        saveToHistory()
        nextTick(() => {
          updateFormatState()
        })
        return
      }
    }
  }
}

// 切换行内代码（使用新架构）
const toggleCode = () => {
  if (eventHandler && commandManager) { // 使用新架构
    if (commandManager.has('code')) {
      const handled = eventHandler.executeCommand('code')
      if (handled) {
        updateContent()
        updateFormatState()
        return
      }
    }
  }
}

// 设置链接
// 切换链接对话框
const toggleLinkDialog = () => {
  if (!editorRef.value) return
  
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)
  const node = range.commonAncestorContainer
  let linkElement: HTMLAnchorElement | null = null
  let element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as Element
  
  // 查找当前链接
  while (element && element !== editorRef.value) {
    if (element.tagName.toLowerCase() === 'a') {
      linkElement = element as HTMLAnchorElement
      break
    }
    element = element.parentElement
  }

  // 如果已经显示对话框，则关闭
  if (showLinkDialog.value) {
    showLinkDialog.value = false
    return
  }

  // 保存当前选择信息，以便在确认时使用
  savedLinkSelection.value = saveSelectionInfo()
  
  // 显示对话框并填充现有链接地址
  linkUrl.value = linkElement?.href || ''
  showLinkDialog.value = true
  
  // 聚焦输入框
  nextTick(() => {
    const inputElement = linkInputRef.value?.$el?.querySelector('input') as HTMLInputElement
    if (inputElement) {
      inputElement.focus()
      inputElement.select()
    }
  })
}

// 确认链接
const confirmLink = () => {
  if (!editorRef.value) return
  
  const url = linkUrl.value.trim()
  
  if (!url) {
    // 如果 URL 为空，移除链接
    removeLink()
    showLinkDialog.value = false
    return
  }

  // 使用原始 URL，不自动添加 https
  const finalUrl = url
  
  // 恢复之前保存的选择信息
  if (savedLinkSelection.value) {
    restoreSelectionInfo(savedLinkSelection.value)
  }
  
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) {
    showLinkDialog.value = false
    savedLinkSelection.value = null
    return
  }

  const range = selection.getRangeAt(0)
  const node = range.commonAncestorContainer
  let linkElement: HTMLAnchorElement | null = null
  let element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as Element
  
  // 查找当前链接
  while (element && element !== editorRef.value) {
    if (element.tagName.toLowerCase() === 'a') {
      linkElement = element as HTMLAnchorElement
      break
    }
    element = element.parentElement
  }

  // 创建或更新链接
  if (linkElement) {
    linkElement.href = finalUrl
    linkElement.target = '_blank'
    linkElement.rel = 'noopener noreferrer nofollow'
  } else {
    const selectedText = selection.toString()
    if (selectedText) {
      // 如果有选中文本，用链接包裹选中的文本
      const a = document.createElement('a')
      a.href = finalUrl
      a.target = '_blank'
      a.rel = 'noopener noreferrer nofollow'
      a.textContent = selectedText
      range.deleteContents()
      range.insertNode(a)
    } else {
      // 如果没有选中文本，在光标位置插入链接，链接文本显示为 URL
      const a = document.createElement('a')
      a.href = finalUrl
      a.target = '_blank'
      a.rel = 'noopener noreferrer nofollow'
      a.textContent = finalUrl
      
      // 如果光标在文本节点中，插入链接
      if (range.collapsed) {
        range.insertNode(a)
        // 将光标移到链接后面
        range.setStartAfter(a)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
      } else {
        range.deleteContents()
        range.insertNode(a)
      }
    }
  }
  
  updateContent()
  saveToHistory()
  nextTick(() => {
    // 将光标移到链接后面
    const newRange = document.createRange()
    const newSelection = window.getSelection()
    if (newSelection && linkElement) {
      newRange.setStartAfter(linkElement)
      newRange.collapse(true)
      newSelection.removeAllRanges()
      newSelection.addRange(newRange)
    } else if (newSelection && range.collapsed === false) {
      // 如果之前有选中文本，光标应该在链接后面
      const linkNodes = editorRef.value?.querySelectorAll('a')
      if (linkNodes && linkNodes.length > 0) {
        const lastLink = linkNodes[linkNodes.length - 1] as HTMLAnchorElement
        newRange.setStartAfter(lastLink)
        newRange.collapse(true)
        newSelection.removeAllRanges()
        newSelection.addRange(newRange)
      }
    }
    updateFormatState()
  })
  
  showLinkDialog.value = false
  linkUrl.value = ''
  savedLinkSelection.value = null
}

// 取消链接
const cancelLink = () => {
  showLinkDialog.value = false
  linkUrl.value = ''
  savedLinkSelection.value = null
  editorRef.value?.focus()
}

// 移除链接
const removeLink = () => {
  if (!editorRef.value) return
  
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)
  const node = range.commonAncestorContainer
  let linkElement: HTMLAnchorElement | null = null
  let element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as Element
  
  // 查找当前链接
  while (element && element !== editorRef.value) {
    if (element.tagName.toLowerCase() === 'a') {
      linkElement = element as HTMLAnchorElement
      break
    }
    element = element.parentElement
  }

  if (linkElement) {
    const parent = linkElement.parentElement
    while (linkElement.firstChild) {
      parent?.insertBefore(linkElement.firstChild, linkElement)
    }
    parent?.removeChild(linkElement)
    updateContent()
    saveToHistory()
    updateFormatState()
  }
}

// 点击外部关闭链接对话框
const handleClickOutside = (event: MouseEvent) => {
  if (showLinkDialog.value) {
    const target = event.target as HTMLElement
    if (!target.closest('.link-dialog-container') && !target.closest('[title="插入链接"]')) {
      showLinkDialog.value = false
      linkUrl.value = ''
    }
  }
}

// 添加图片（插入内联上传占位符）
const addImage = () => {
  if (!editorRef.value || !eventHandler) return
  editorRef.value.focus()
  
  // 使用命令系统插入内联上传占位符
  const handled = eventHandler.executeCommand('image')
  
  if (handled) {
    updateContent()
    saveToHistory()
    
    // 等待 DOM 更新后，初始化文件输入事件
    // 使用 requestAnimationFrame 确保 DOM 完全渲染
    requestAnimationFrame(() => {
      nextTick(() => {
        initializeImageUploads()
      })
    })
  }
}


// 初始化单个上传占位符
const initializeSingleUpload = (uploadId: string, placeholder: Element) => {
  if (!placeholder) return
  if (placeholder.hasAttribute('data-initialized')) return// 检查是否已经初始化过（避免重复绑定）
  const fileInput = placeholder.querySelector('.upload-file-input') as HTMLInputElement
  if (!fileInput) return
  placeholder.setAttribute('data-initialized', 'true')// 标记为已初始化
  
  // 添加文件选择事件
  const handleFileChange = async (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      await handleImageUpload(uploadId, Array.from(target.files))
      target.value = ''// 清空 input，允许重复选择同一文件
    }
  }
  fileInput.addEventListener('change', handleFileChange)
  const clickArea = placeholder.querySelector('.upload-click-text') as HTMLElement// 确保点击区域能触发文件选择
  if (clickArea) {
    clickArea.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (fileInput && fileInput.parentElement) {
        fileInput.click()
      }
    }, { capture: true })
  }
  
  // 确保整个占位符也可以点击
  placeholder.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target !== fileInput && 
        !target.closest('.upload-file-item') && 
        !target.closest('button') &&
        target !== clickArea) {
      e.preventDefault()
      e.stopPropagation()
      if (fileInput && fileInput.parentElement) {
        fileInput.click()
      }
    }
  }, { capture: true })
}

// 初始化图片上传功能
const initializeImageUploads = () => {
  if (!editorRef.value) return
  const placeholders = editorRef.value.querySelectorAll('.inline-image-upload-placeholder')// 查找所有上传占位符
  placeholders.forEach((placeholder) => {
    const uploadId = placeholder.getAttribute('data-upload-id')
    if (!uploadId) return
    initializeSingleUpload(uploadId, placeholder)
  })
}

// 处理图片上传
const handleImageUpload = async (uploadId: string, files: File[]) => {
  if (!editorRef.value || !eventHandler) return
  const MAX_FILES = 3
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
  // 过滤和验证文件
  const imageFiles = files.filter(file => file.type.startsWith('image/'))
  if (imageFiles.length === 0) return
  if (imageFiles.length > MAX_FILES) {
    Toast({ type: 'error', message: `最多只能上传 ${MAX_FILES} 个文件` })
    return
  }
  const validFiles: File[] = []
  for (const file of imageFiles) {
    if (file.size > MAX_FILE_SIZE) {
      Toast({ type: 'error', message: `文件 "${file.name}" 超过 5MB 限制` })
      continue
    }
    validFiles.push(file)
  }
  if (validFiles.length === 0) return
  const placeholder = editorRef.value.querySelector(`[data-upload-id="${uploadId}"]`) as HTMLElement// 显示上传界面（文件列表和进度条）
  if (!placeholder) return
  const originalContent = placeholder.querySelector('div:first-child')// 隐藏原始上传界面
  if (originalContent) {
    (originalContent as HTMLElement).style.display = 'none'
  }
  const uploadListContainer = document.createElement('div')// 创建上传文件列表容器
  uploadListContainer.className = 'upload-files-list'
  uploadListContainer.style.cssText = 'width: 100%; padding: 1rem;'
  
  // 为每个文件创建上传项
  const uploadItems: Array<{ file: File; element: HTMLElement; progressBar: HTMLElement; progressText: HTMLElement }> = []
  
  validFiles.forEach((file, index) => {
    const fileItem = document.createElement('div')
    fileItem.className = 'upload-file-item'
    fileItem.style.cssText = `
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background-color: var(--base-200);
      border-radius: 0.5rem;
      margin-bottom: ${index < validFiles.length - 1 ? '0.5rem' : '0'};
      position: relative;
    `
    
    // 文件图标
    const icon = document.createElement('div')
    icon.style.cssText = `
      width: 48px;
      height: 48px;
      background-color: var(--primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-center;
      flex-shrink: 0;
    `
    icon.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16V8M8 12L12 8L16 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 15V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
    
    // 文件信息
    const fileInfo = document.createElement('div')
    fileInfo.style.cssText = 'flex: 1; min-width: 0;'
    
    const fileName = document.createElement('div')
    fileName.style.cssText = 'font-size: 0.875rem; font-weight: 500; color: var(--base-content); margin-bottom: 0.25rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'
    fileName.textContent = file.name
    
    const fileSize = document.createElement('div')
    fileSize.style.cssText = 'font-size: 0.75rem; color: var(--base-content) / 0.6;'
    fileSize.textContent = formatFileSize(file.size)
    
    fileInfo.appendChild(fileName)
    fileInfo.appendChild(fileSize)
    
    // 进度条容器
    const progressContainer = document.createElement('div')
    progressContainer.style.cssText = 'position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background-color: var(--base-300)); border-radius: 0 0 0.5rem 0.5rem; overflow: hidden;'
    
    const progressBar = document.createElement('div')
    progressBar.className = 'upload-progress-bar'
    progressBar.style.cssText = `
      height: 100%;
      width: 0%;
      background-color: var(--primary);
      transition: width 0.3s ease;
    `
    
    const progressText = document.createElement('div')
    progressText.className = 'upload-progress-text'
    progressText.style.cssText = `
      font-size: 0.75rem;
      color: var(--primary);
      font-weight: 500;
      margin-left: auto;
      flex-shrink: 0;
    `
    progressText.textContent = '0%'
    
    progressContainer.appendChild(progressBar)
    
    // 取消按钮
    const cancelBtn = document.createElement('button')
    cancelBtn.style.cssText = `
      width: 24px;
      height: 24px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-center;
      color: var(--base-content) / 0.6;
      flex-shrink: 0;
    `
    cancelBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `
    cancelBtn.onclick = () => {
      fileItem.remove()
      // 如果所有文件都取消了，恢复原始界面
      if (uploadListContainer.children.length === 0) {
        uploadListContainer.remove()
        if (originalContent) {
          (originalContent as HTMLElement).style.display = 'flex'
        }
      }
    }
    
    fileItem.appendChild(icon)
    fileItem.appendChild(fileInfo)
    fileItem.appendChild(progressText)
    fileItem.appendChild(cancelBtn)
    fileItem.appendChild(progressContainer)
    
    uploadListContainer.appendChild(fileItem)
    
    uploadItems.push({
      file,
      element: fileItem,
      progressBar,
      progressText
    })
  })
  
  placeholder.appendChild(uploadListContainer)
  
  try {
    // 将图片转换为 data URL（模拟上传进度）
    const imageUrls: string[] = []
    
    for (let i = 0; i < validFiles.length; i++) {
      const { file, progressBar, progressText } = uploadItems[i]
      
      // 模拟上传进度
      const updateProgress = (progress: number) => {
        progressBar.style.width = `${progress}%`
        progressText.textContent = `${Math.round(progress)}%`
      }
      
      // 模拟进度更新
      let progress = 0
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15
        if (progress > 90) {
          progress = 90
          clearInterval(progressInterval)
        }
        updateProgress(progress)
      }, 100)
      
      // 读取文件
      const dataUrl = await fileToDataURL(file)
      clearInterval(progressInterval)
      updateProgress(100)
      
      imageUrls.push(dataUrl)
    }
    
    // 等待一小段时间让用户看到 100% 进度
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // 使用命令系统替换占位符为图片
    const handled = eventHandler.executeCommand('image', {
      imageUrls,
      replaceUploadId: uploadId
    })
    
    if (handled) {
      updateContent()
      saveToHistory()
      // 图片已插入到编辑器中，占位符已被替换
    }
  } catch (error) {
    console.error('Upload error:', error)
    Toast({ type: 'error', message: '上传失败，请重试' })
    
    // 移除上传列表，恢复原始界面
    uploadListContainer.remove()
    if (originalContent) {
      (originalContent as HTMLElement).style.display = 'flex'
    }
  }
}

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

// 将文件转换为 data URL
const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// 插入表格
const insertTable = () => {
  if (eventHandler && commandManager) { // 使用新架构
    if (commandManager.has('table')) {
      const handled = eventHandler.executeCommand('table')
      if (handled) {
        updateContent()
        return
      }
    }
  }
}


// 设置文字颜色（使用新架构）
const setTextColor = (color: string) => {
  if (eventHandler && commandManager && editorRef.value) { // 使用新架构
    const command = new TextColorCommand(color) // 创建临时命令实例并执行
    const context = {
      editor: editorRef.value,
      selection: window.getSelection(),
      state: {
        content: internalContent.value,
        selection: saveSelectionInfo()
      }
    }
    const result = command.execute(context)
    if (result.success && result.newState) {
      // 同步更新
      if (stateManager) {
        const currentState = stateManager.getState()
        stateManager.updateState(() => ({
          content: result.newState!.content,
          selection: result.newState!.selection,
          history: currentState.history,
          historyIndex: currentState.historyIndex,
          format: currentState.format,
          isComposing: currentState.isComposing,
          isUpdating: false
        }))
      }
      // 注意：命令已经直接修改了 DOM，不需要再次调用 domManager.updateContent
      // 先恢复光标位置，再更新内容，避免 updateContent 保存错误的光标位置
      if (result.newSelection && domManager && editorRef.value) {
        // 立即恢复光标位置，确保在 updateContent 之前
        const restored = domManager.setSelection(result.newSelection!)
        if (restored) {
          editorRef.value.focus()
        }
      }
      
      // 更新内容（此时光标位置已经正确，updateContent 会保存正确的位置）
      updateContent()
      saveToHistory()
      currentTextColor.value = color
      
      // 使用双重 nextTick 确保在 DOM 完全更新后恢复光标
      nextTick(() => {
        nextTick(() => {
          // 再次确认光标位置（防止 updateContent 的恢复失败）
          if (result.newSelection && domManager && editorRef.value) {
            const currentSel = window.getSelection()
            // 如果光标位置无效或不在编辑器内，重新恢复
            if (!currentSel || currentSel.rangeCount === 0 || 
                !editorRef.value.contains(currentSel.getRangeAt(0).commonAncestorContainer)) {
              // 尝试恢复选择信息
              const restored = domManager.setSelection(result.newSelection!)
              if (!restored && editorRef.value) {
                // 如果恢复失败，尝试找到当前光标应该所在的位置
                // 查找包含颜色 span 的文本节点（按颜色值匹配）
                const colorSpans = Array.from(editorRef.value.querySelectorAll('span[style*="color"]')) as HTMLElement[]
                // 找到颜色匹配的 span
                const matchingSpan = colorSpans.find(span => {
                  const spanColor = span.style.color
                  return spanColor && spanColor.toLowerCase() === color.toLowerCase()
                })
                
                if (matchingSpan) {
                  // 查找 span 内的文本节点
                  const walker = document.createTreeWalker(
                    matchingSpan,
                    NodeFilter.SHOW_TEXT,
                    null
                  )
                  const textNode = walker.nextNode() as Text | null
                  if (textNode) {
                    const range = document.createRange()
                    range.setStart(textNode, 0)
                    range.collapse(true)
                    const sel = window.getSelection()
                    if (sel) {
                      sel.removeAllRanges()
                      sel.addRange(range)
                    }
                    editorRef.value.focus()
                  }
                } else {
                  // 如果没有匹配的颜色 span，使用第一个文本节点
                  const firstBlock = editorRef.value.querySelector('p, h1, h2, h3, h4, h5, h6, div, blockquote')
                  const firstTextNode = firstBlock?.firstChild
                  if (firstTextNode && firstTextNode.nodeType === Node.TEXT_NODE) {
                    const range = document.createRange()
                    range.setStart(firstTextNode, 0)
                    range.collapse(true)
                    const sel = window.getSelection()
                    if (sel) {
                      sel.removeAllRanges()
                      sel.addRange(range)
                    }
                    editorRef.value.focus()
                  }
                }
              } else if (restored) {
                editorRef.value.focus()
              }
            }
          }
          updateFormatState()
        })
      })
      return
    }
  }
}


// 设置高亮颜色（使用新架构）
const setHighlightColor = (color: string) => {
  if (eventHandler && commandManager && editorRef.value) { // 使用新架构
    const command = new HighlightColorCommand(color) // 创建临时命令实例并执行
    const context = {
      editor: editorRef.value,
      selection: window.getSelection(),
      state: {
        content: internalContent.value,
        selection: saveSelectionInfo()
      }
    }
    const result = command.execute(context)
    if (result.success && result.newState) {
      // 同步更新
      if (stateManager) {
        const currentState = stateManager.getState()
        stateManager.updateState(() => ({
          content: result.newState!.content,
          selection: result.newState!.selection,
          history: currentState.history,
          historyIndex: currentState.historyIndex,
          format: currentState.format,
          isComposing: currentState.isComposing,
          isUpdating: false
        }))
      }
      // 注意：命令已经直接修改了 DOM，不需要再次调用 domManager.updateContent
      // 先恢复光标位置，再更新内容，避免 updateContent 保存错误的光标位置
      if (result.newSelection && domManager && editorRef.value) {
        // 立即恢复光标位置，确保在 updateContent 之前
        const restored = domManager.setSelection(result.newSelection)
        if (restored) {
          editorRef.value.focus()
        }
      }
      
      // 更新内容（此时光标位置已经正确，updateContent 会保存正确的位置）
      updateContent()
      saveToHistory()
      currentHighlightColor.value = color
      nextTick(() => {
        updateFormatState()
      })
      return
    }
  }
}

// 插入分隔线（使用新架构）
const insertHorizontalRule = () => {
  if (eventHandler && commandManager) { // 使用新架构
    if (commandManager.has('horizontal-rule')) {
      const handled = eventHandler.executeCommand('horizontal-rule')
      if (handled) {
        updateContent()
        saveToHistory()
        return
      }
    }
  }
}

// 撤销
const undo = () => {
  if (!canUndo.value || !editorRef.value) return
  historyIndex.value--
  const json = history.value[historyIndex.value]
  // 将 JSON 转换为 HTML 并设置到 DOM
  const html = jsonToHTML(json)
  editorRef.value.innerHTML = html
  internalContent.value = json
  emit('update:modelValue', json)
  emit('change', json)
  updateFormatState()
}

// 重做
const redo = () => {
  if (!canRedo.value || !editorRef.value) return
  historyIndex.value++
  const json = history.value[historyIndex.value]
  // 将 JSON 转换为 HTML 并设置到 DOM
  const html = jsonToHTML(json)
  editorRef.value.innerHTML = html
  internalContent.value = json
  emit('update:modelValue', json)
  emit('change', json)
  updateFormatState()
}

// 确保编辑器内容被正确包裹在块级元素中
const normalizeContent = () => {
  if (!editorRef.value) return
  
  const editor = editorRef.value
  // 关键：如果正在处理 Enter 键，不要规范化（Enter 键已经处理了）
  // 检查新架构的状态
  if (stateManager) {
    const state = stateManager.getState()
    if (state.isUpdating) {
      return // 新架构正在处理，完全跳过
    }
  }
  
  const savedInfo = saveSelectionInfo()
  
  // 关键：不要清理 <br> 标签！<br> 标签用于保持空段落的高度
  // 如果清理了 <br>，空段落会变成完全空的，可能被其他逻辑删除
  // 完全跳过清理 <br> 的逻辑
  
  const childNodes = Array.from(editor.childNodes)
  const nodeGroups: Node[][] = []
  let currentGroup: Node[] = []
  
  for (const node of childNodes) {
    // 跳过 <br> 标签（它们不应该作为顶级节点存在）
    if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName.toLowerCase() === 'br') {
      node.remove()
      continue
    }
    
    // 关键：如果节点已经是块级元素（如 p），跳过处理，避免重复创建
    if (node.nodeType === Node.ELEMENT_NODE && blockTags.has((node as Element).tagName.toLowerCase())) {
      // 已经是块级元素，不需要包裹，跳过
      continue
    }
    
    const needsWrapping = node.nodeType === Node.TEXT_NODE 
      ? !!node.textContent?.trim().length
      : (node.nodeType === Node.ELEMENT_NODE && !blockTags.has((node as Element).tagName.toLowerCase()))
    
    if (needsWrapping) {
      currentGroup.push(node)
    } else if (currentGroup.length > 0) {
      nodeGroups.push(currentGroup)
      currentGroup = []
    }
  }
  
  if (currentGroup.length > 0) nodeGroups.push(currentGroup)
  
  // 关键：如果已经有段落，且没有需要包裹的节点，直接返回，不创建新段落
  const hasExistingP = editor.querySelector('p') !== null
  // 检查新架构的状态
  const isEnterKeyHandled = stateManager ? stateManager.getState().isUpdating : false
  
  if (nodeGroups.length === 0) {
    // 如果编辑器为空且没有段落，且不在处理 Enter 键，创建一个空的p标签（使用 <br> 确保有高度）
    // 关键：如果正在处理 Enter 键，不要创建段落（Enter 键已经创建了）
    if (editor.childNodes.length === 0 && !hasExistingP && !isEnterKeyHandled) {
      const p = document.createElement('p')
      p.style.textAlign = 'left'
      const br = document.createElement('br')
      p.appendChild(br)
      editor.appendChild(p)
    }
    // 关键：如果已经有段落，直接返回，不进行任何操作
    if (savedInfo) nextTick(() => restoreSelectionInfo(savedInfo))
    return
  }
  
  for (let i = nodeGroups.length - 1; i >= 0; i--) {
    const group = nodeGroups[i]
    if (group.length === 0) continue
    
    // 保存第一个节点的引用和位置信息，因为节点可能被移动
    const firstNode = group[0]
    const insertBeforeNode = firstNode.nextSibling
    const p = document.createElement('p')
    p.style.textAlign = 'left'
    
    // 将所有需要包裹的节点移动到p标签中
    for (const node of group) {
      if (node.parentNode === editor) { p.appendChild(node)}
    }
    
    // 插入p标签
    if (p.childNodes.length > 0) {
      // 如果insertBeforeNode仍然在编辑器中，在它之前插入
      if (insertBeforeNode && insertBeforeNode.parentNode === editor) {
        editor.insertBefore(p, insertBeforeNode)
      } else if (firstNode.parentNode === editor) {
        editor.insertBefore(p, firstNode) // 如果firstNode还在编辑器中，在它之前插入
      } else {
        editor.appendChild(p) // 否则，追加到编辑器末尾
      }
    }
  }
  
  // 确保编辑器至少有一个p标签（即使是空的，使用 <br> 确保有高度）
  // 关键：检查是否已经有段落，避免重复创建
  // 关键：如果正在处理 Enter 键，不要创建段落（Enter 键已经创建了）
  const existingP = editor.querySelector('p')
  // isEnterKeyHandled 已在函数开头声明
  
  // 关键：不要清理任何空段落！空段落是用户有意创建的（通过回车键）
  // 只有在用户明确删除内容时，才应该清理空段落
  // 这里完全跳过清理空段落的逻辑
  
  if (!existingP && !isEnterKeyHandled) {
    // 如果没有段落且不在处理 Enter 键，创建一个空的p标签
    const p = document.createElement('p')
    p.style.textAlign = 'left'
    const br = document.createElement('br')
    p.appendChild(br)
    // 如果有其他内容，在最后追加；否则直接追加
    if (editor.childNodes.length > 0) {
      editor.appendChild(p)
    } else {
      editor.appendChild(p)
    }
  }
  if (savedInfo) nextTick(() => restoreSelectionInfo(savedInfo))
}

// 处理中文输入法
const handleCompositionStart = () => { isComposing.value = true }
const handleCompositionEnd = () => {
  isComposing.value = false
  // 输入完成后，规范化内容并更新
  if (editorRef.value) {
    if (isUpdating.value) return // 如果正在更新，跳过处理
    const savedInfo = saveSelectionInfo()
    normalizeContent() // 规范化内容，确保所有文本都被包裹在块级元素中
    
    // 从 DOM 获取 HTML 并转换为 JSON
    const html = editorRef.value.innerHTML
    const json = htmlToJSON(html, editorRef.value)
    internalContent.value = json
    isUpdating.value = true // 设置标志，防止 watch 触发循环
    emit('update:modelValue', json)
    emit('change', json)
    saveToHistory()
    nextTick(() => {
      isUpdating.value = false // 重置标志
    })
    
    // 恢复光标位置并更新格式状态
    if (savedInfo) {
      nextTick(() => {
        restoreSelectionInfo(savedInfo)
        updateFormatState()
        // 重新初始化图片上传功能
        initializeImageUploads()
      })
    } else {
      nextTick(() => {
        updateFormatState()
        // 重新初始化图片上传功能
        initializeImageUploads()
      })
    }
  }
}

// 处理输入
const handleInput = (event?: Event) => {
  updateIsEmpty() // 更新 isEmpty 状态
  if (!editorRef.value) return
  if (isComposing.value) {
    return // 如果正在输入中文，跳过处理
  }
  
  if (stateManager) { // 检查新架构的状态：如果新架构正在处理命令，完全跳过 input 事件
    const state = stateManager.getState()
    if (state.isUpdating) {
      return // 新架构正在处理，完全跳过
    }
  }
  
  if (isUpdating.value) {
    return // 如果正在更新，跳过处理，防止循环
  }
  
  // 保存选择信息（在规范化之前）
  const savedInfo = saveSelectionInfo()
  
  // 延迟规范化，避免在输入时立即修改 DOM 导致重复输入
  nextTick(() => {
    if (isUpdating.value || !editorRef.value) {
      return // 再次检查
    }
    
    // 再次检查新架构的状态（防止异步执行时冲突）
    if (stateManager) {
      const state = stateManager.getState()
      if (state.isUpdating) {
        // 新架构正在处理，完全跳过
        return
      }
    }
    
    // 检测并转换 Markdown 语法（在规范化之前）
    // 只检测当前光标所在的段落，避免误转换其他段落
    let markdownConverted = false
    const selection = window.getSelection()
    
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const container = range.startContainer
      
      // 获取当前段落或块级元素
      let blockElement: HTMLElement | null = null
      if (container.nodeType === Node.TEXT_NODE) {
        blockElement = container.parentElement
      } else if (container.nodeType === Node.ELEMENT_NODE) {
        blockElement = container as HTMLElement
      }
      
      // 向上查找块级元素（必须是段落或 div）
      while (blockElement && blockElement !== editorRef.value) {
        const tagName = blockElement.tagName
        if (['P', 'DIV'].includes(tagName)) {
          break
        }
        if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'BLOCKQUOTE'].includes(tagName)) {
          // 如果已经在标题或列表中，不处理
          blockElement = null
          break
        }
        blockElement = blockElement.parentElement
      }
      
      if (blockElement && blockElement !== editorRef.value && (blockElement.tagName === 'P' || blockElement.tagName === 'DIV')) {
        const text = (blockElement.textContent || '').trim()
        
        // 检测标题语法 (# 标题)
        const headingMatch = text.match(/^(#{1,6})\s+(.+)$/)
        if (headingMatch) {
          const level = headingMatch[1].length
          const headingText = headingMatch[2].trim()
          
          if (headingText) {
            // 创建标题元素
            const heading = document.createElement(`h${level}`)
            heading.textContent = headingText
            
            // 替换当前段落
            if (blockElement.parentElement) {
              blockElement.parentElement.replaceChild(heading, blockElement)
              markdownConverted = true
              
              // 设置光标到标题末尾
              nextTick(() => {
                const cursorRange = document.createRange()
                cursorRange.selectNodeContents(heading)
                cursorRange.collapse(false)
                const sel = window.getSelection()
                if (sel) {
                  sel.removeAllRanges()
                  sel.addRange(cursorRange)
                }
              })
            }
          }
        }
        
        // 检测无序列表语法 (- 列表项) - 只在标题未匹配时检测
        if (!markdownConverted) {
          const listMatch = text.match(/^[-*+]\s+(.+)$/)
          if (listMatch) {
            const listText = listMatch[1].trim()
            
            if (listText) {
              // 检查是否已经在列表中
              let listContainer: HTMLElement | null = blockElement.parentElement
              let isInList = false
              while (listContainer && listContainer !== editorRef.value) {
                if (listContainer.tagName === 'UL' || listContainer.tagName === 'OL') {
                  isInList = true
                  break
                }
                listContainer = listContainer.parentElement
              }
              
              if (!isInList) {
                // 创建新的无序列表
                const ul = document.createElement('ul')
                const li = document.createElement('li')
                li.textContent = listText
                ul.appendChild(li)
                
                // 替换当前段落
                if (blockElement.parentElement) {
                  blockElement.parentElement.replaceChild(ul, blockElement)
                  markdownConverted = true
                  
                  // 设置光标到列表项末尾
                  nextTick(() => {
                    const cursorRange = document.createRange()
                    cursorRange.selectNodeContents(li)
                    cursorRange.collapse(false)
                    const sel = window.getSelection()
                    if (sel) {
                      sel.removeAllRanges()
                      sel.addRange(cursorRange)
                    }
                  })
                }
              }
            }
          }
        }
      }
    }
    
    // 如果 Markdown 已转换，直接更新内容并返回，跳过规范化
    if (markdownConverted) {
      const html = editorRef.value.innerHTML
      const json = htmlToJSON(html, editorRef.value)
      internalContent.value = json
      isUpdating.value = true
      emit('update:modelValue', json)
      emit('change', json)
      saveToHistory()
      
      nextTick(() => {
        isUpdating.value = false
        updateFormatState()
        initializeImageUploads()
      })
      return
    }
    
    // 规范化内容，确保所有文本都被包裹在块级元素中
    // 关键：如果已经有段落，完全跳过规范化，避免重复创建段落和清理空段落
    const hasP = editorRef.value.querySelector('p') !== null
    
    // 关键：如果已经有段落，完全跳过 normalizeContent
    // 因为 Enter 键已经创建了段落，不需要再次规范化
    // 这样可以避免清理用户有意创建的空段落
    if (!hasP) {
      // 只有在没有段落时才调用 normalizeContent
      normalizeContent()
    }
    
    // 从 DOM 获取 HTML 并转换为 JSON
    const html = editorRef.value.innerHTML
    const json = htmlToJSON(html, editorRef.value)
    internalContent.value = json
    isUpdating.value = true // 设置标志，防止 watch 触发循环
    emit('update:modelValue', json)
    emit('change', json)
    saveToHistory()
    
    nextTick(() => {
      isUpdating.value = false // 重置标志
      // 恢复光标位置（只在规范化后恢复，避免影响输入）
      if (savedInfo) {
        // 检查保存的节点是否仍然有效
        if (savedInfo.startContainer && editorRef.value?.contains(savedInfo.startContainer)) {
          restoreSelectionInfo(savedInfo)
        }
      }
      updateFormatState()
      // 重新初始化图片上传功能
      initializeImageUploads()
    })
  })
}

// 处理焦点
const handleFocus = () => {
  emit('focus')
  updateFormatState()
}

// 处理失焦
const handleBlur = () => {
  // 失去焦点时同步 internalContent，确保数据一致性
  if (editorRef.value) {
    const html = editorRef.value.innerHTML
    const json = htmlToJSON(html, editorRef.value)
    internalContent.value = json
  }
  emit('blur')
}

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  // 检测 Markdown 语法：当用户输入空格时，检查当前行是否是 Markdown
  // 必须在 eventHandler 之前检测，确保优先处理
  if (event.key === ' ' && !event.ctrlKey && !event.metaKey && !event.altKey) {
    if (!editorRef.value) {
      if (eventHandler) {
        eventHandler.handleKeydown(event)
      }
      return
    }
    
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
      if (eventHandler) {
        eventHandler.handleKeydown(event)
      }
      return
    }
    
    const range = selection.getRangeAt(0)
    
    // 检查选择是否在编辑器内
    if (!editorRef.value.contains(range.commonAncestorContainer)) {
      if (eventHandler) {
        eventHandler.handleKeydown(event)
      }
      return
    }
    
    const container = range.startContainer
    
    // 获取当前段落或块级元素
    let blockElement: HTMLElement | null = null
    if (container.nodeType === Node.TEXT_NODE) {
      blockElement = container.parentElement
    } else if (container.nodeType === Node.ELEMENT_NODE) {
      blockElement = container as HTMLElement
    }
    
    // 向上查找块级元素（必须是段落或 div）
    while (blockElement && blockElement !== editorRef.value) {
      const tagName = blockElement.tagName
      if (['P', 'DIV'].includes(tagName)) {
        break
      }
      if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'BLOCKQUOTE'].includes(tagName)) {
        // 如果已经在标题或列表中，不处理
        if (eventHandler) {
          eventHandler.handleKeydown(event)
        }
        return
      }
      blockElement = blockElement.parentElement
    }
    
    if (blockElement && blockElement !== editorRef.value && (blockElement.tagName === 'P' || blockElement.tagName === 'DIV')) {
      // 获取块级元素的完整文本内容（去除所有 HTML 标签）
      const blockText = (blockElement.textContent || '').trim()
      
      // 获取光标位置之前的文本（包括即将插入的空格）
      // 我们需要获取从块级元素开始到光标位置的所有文本
      let textBeforeCursor = ''
      
      if (container.nodeType === Node.TEXT_NODE) {
        // 如果是文本节点，需要获取从块级元素开始到光标位置的所有文本
        const textNode = container as Text
        const offset = range.startOffset
        
        // 创建一个临时范围，从块级元素开始到光标位置
        const tempRange = document.createRange()
        tempRange.setStart(blockElement, 0)
        tempRange.setEnd(textNode, offset)
        textBeforeCursor = tempRange.toString()
      } else {
        // 如果是元素节点，获取整个元素的文本
        textBeforeCursor = blockText
      }
      
      // 加上即将插入的空格
      textBeforeCursor += ' '
      
      // 检测标题语法 (# 标题) - 参考 Tiptap: /^(#{1,6})\s$/
      // 匹配行首的 # 后跟空格（可以有文本，也可以没有）
      const headingMatch = textBeforeCursor.match(/^(#{1,6})\s$/) || textBeforeCursor.match(/^(#{1,6})\s+(.+)$/)
      if (headingMatch) {
        event.preventDefault()
        event.stopPropagation()
        
        const level = headingMatch[1].length
        const headingText = headingMatch[2] ? headingMatch[2].trim() : ''
        
        // 创建标题元素
        const heading = document.createElement(`h${level}`)
        if (headingText) {
          heading.textContent = headingText
        } else {
          // 如果没有文本，创建一个零宽空格，确保标题不为空
          heading.appendChild(document.createTextNode('\u200B'))
        }
        
        // 替换当前段落
        if (blockElement.parentElement) {
          blockElement.parentElement.replaceChild(heading, blockElement)
          
          // 设置光标到标题末尾
          nextTick(() => {
            const cursorRange = document.createRange()
            if (headingText) {
              cursorRange.selectNodeContents(heading)
              cursorRange.collapse(false)
            } else {
              // 如果没有文本，光标放在零宽空格后面
              if (heading.firstChild) {
                cursorRange.setStartAfter(heading.firstChild)
                cursorRange.collapse(true)
              } else {
                cursorRange.selectNodeContents(heading)
                cursorRange.collapse(false)
              }
            }
            const sel = window.getSelection()
            if (sel) {
              sel.removeAllRanges()
              sel.addRange(cursorRange)
            }
            
            // 触发 input 事件以更新内容
            handleInput()
          })
        }
        return
      }
      
      // 检测无序列表语法 (- 列表项) - 匹配行首的 - 后跟空格
      const listMatch = textBeforeCursor.match(/^[-*+]\s$/) || textBeforeCursor.match(/^[-*+]\s+(.+)$/)
      if (listMatch) {
        event.preventDefault()
        event.stopPropagation()
        
        const listText = listMatch[1] ? listMatch[1].trim() : ''
        
        // 检查是否已经在列表中
        let listContainer: HTMLElement | null = blockElement.parentElement
        let isInList = false
        while (listContainer && listContainer !== editorRef.value) {
          if (listContainer.tagName === 'UL' || listContainer.tagName === 'OL') {
            isInList = true
            break
          }
          listContainer = listContainer.parentElement
        }
        
        if (!isInList) {
          // 创建新的无序列表
          const ul = document.createElement('ul')
          const li = document.createElement('li')
          if (listText) {
            li.textContent = listText
          } else {
            li.appendChild(document.createTextNode('\u200B'))
          }
          ul.appendChild(li)
          
          // 替换当前段落
          if (blockElement.parentElement) {
            blockElement.parentElement.replaceChild(ul, blockElement)
            
            // 设置光标到列表项末尾
            nextTick(() => {
              const cursorRange = document.createRange()
              if (listText) {
                cursorRange.selectNodeContents(li)
                cursorRange.collapse(false)
              } else {
                if (li.firstChild) {
                  cursorRange.setStartAfter(li.firstChild)
                  cursorRange.collapse(true)
                } else {
                  cursorRange.selectNodeContents(li)
                  cursorRange.collapse(false)
                }
              }
              const sel = window.getSelection()
              if (sel) {
                sel.removeAllRanges()
                sel.addRange(cursorRange)
              }
              
              // 触发 input 事件以更新内容
              handleInput()
            })
          }
        }
        return
      }
    }
  }
  
  if (eventHandler) { // 使用新架构处理所有键盘事件
    const handled = eventHandler.handleKeydown(event)
    if (handled) {
      return // 新架构已处理
    }
  }
}

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
  if (!editorRef.value || !newValue) return
  
  if (stateManager) { // 检查新架构的状态：如果新架构正在处理命令，完全跳过 watch
    const state = stateManager.getState()
    if (state.isUpdating) {
      return // 新架构正在处理，完全跳过
    }
  }
  
  if (isUpdating.value) return // 如果正在更新，跳过处理，防止循环
  
  let json: EditorJSON// 将输入值转换为 JSON
  if (isHTMLString(newValue)) {
    json = htmlToJSON(newValue as string, editorRef.value)// 如果是 HTML 字符串，转换为 JSON
  } else if (isJSONFormat(newValue)) {
    json = newValue as EditorJSON// 如果已经是 JSON，直接使用
  } else if (isMarkdownFormat(newValue)) {
    json = markdownToJSON(newValue as string, editorRef.value)// 如果是 Markdown 字符串，转换为 JSON
  } else {
    json = { type: 'doc', content: [{ type: 'paragraph' }] }// 默认创建空文档
  }
  
  const html = jsonToHTML(json)// 将 JSON 转换为 HTML 并设置到 DOM
  const currentHTML = editorRef.value.innerHTML// 比较时忽略空白字符、属性顺序和格式差异，避免不必要的 DOM 替换
  
  // 标准化 HTML：移除 style 属性的格式差异（空格、引号等）
  const normalizeHTML = (htmlStr: string) => {
    return htmlStr
      .replace(/\s+/g, ' ')  // 多个空格合并为一个
      .replace(/style="([^"]*)"/g, (match, styleContent) => {
        // 标准化 style 属性：移除多余空格，统一格式
        const normalized = styleContent.split(';').map((s: string) => s.trim()).filter((s: string) => s).sort().join('; ')
        return `style="${normalized}"`
      })
      .replace(/="([^"]*)"/g, '="$1"')  // 统一引号格式
      .trim()
  }
  
  const normalizedCurrent = normalizeHTML(currentHTML)
  const normalizedNew = normalizeHTML(html)
  
  // 简单比较：如果内容基本相同，不替换 DOM
  const currentText = currentHTML.replace(/<[^>]+>/g, '').trim()
  const newText = html.replace(/<[^>]+>/g, '').trim()
  
  // 只有当文本内容不同或标准化后的 HTML 不同时才替换 DOM
  // 但是，如果 isUpdating 是 true，说明是内部更新，不应该替换 DOM（双重检查）
  if (stateManager) { // 再次检查新架构的状态
    const state = stateManager.getState()
    if (state.isUpdating) {
      return // 新架构正在处理，完全跳过
    }
  }
  
  if (!isUpdating.value && (currentText !== newText || normalizedCurrent !== normalizedNew)) {
    if (stateManager) { // 在设置 innerHTML 之前，再次检查新架构状态
      const state = stateManager.getState()
      if (state.isUpdating) {
        return // 新架构正在处理，完全跳过
      }
    }
    
    isUpdating.value = true // 设置标志，防止触发 input 事件
    // 保存选择信息（如果编辑器有焦点）
    const savedInfo = editorRef.value === document.activeElement ? saveSelectionInfo() : null
    editorRef.value.innerHTML = html
    internalContent.value = json
    updateIsEmpty() // 更新 isEmpty 状态
    // 确保内容被正确包裹
    // 关键：如果正在处理 Enter 键，不要规范化（Enter 键已经处理了）
    nextTick(() => {
      if (stateManager) { // 再次检查新架构的状态
        const state = stateManager.getState()
        if (state.isUpdating) {
          isUpdating.value = false
          return
        }
      }
      updateIsEmpty() // 更新 isEmpty 状态
      
      const hasP = editorRef.value?.querySelector('p') !== null // 检查是否已经有段落，如果有，跳过规范化
      if (hasP) {
        isUpdating.value = false
        return
      }
      
      normalizeContent() // 调用 normalizeContent
      isUpdating.value = false // 重置标志
    })
    
    // 重置历史（使用 JSON 格式）
    history.value = [json]
    historyIndex.value = 0
    
    // 恢复光标位置
    if (savedInfo) {
      nextTick(() => {
        restoreSelectionInfo(savedInfo)
      })
    }
  }
}, { immediate: true })

// 监听可编辑状态
watch(() => props.editable, (newValue) => {
  if (editorRef.value) {
    editorRef.value.contentEditable = newValue ? 'true' : 'false'
  }
})

// 组件挂载
onMounted(() => {
  // 监听占位符创建事件
  if (editorRef.value) {
    editorRef.value.addEventListener('image-upload-placeholder-created', ((e: CustomEvent) => {
      const { uploadId, placeholder } = e.detail
      // 立即初始化这个占位符
      nextTick(() => {
        initializeSingleUpload(uploadId, placeholder)
      })
    }) as EventListener)
  }
  
  if (editorRef.value) {
    commandManager = new CommandManager() // 初始化新架构：1. 创建命令管理器
    
    // 2. 注册命令
    commandManager.register('enter', new EnterKeyCommand())
    
    // 格式化命令
    commandManager.register('format-bold', new FormatCommand('bold'))
    commandManager.register('format-italic', new FormatCommand('italic'))
    commandManager.register('format-underline', new FormatCommand('underline'))
    commandManager.register('format-strikethrough', new FormatCommand('strikethrough'))
    commandManager.register('format-superscript', new FormatCommand('superscript'))
    commandManager.register('format-subscript', new FormatCommand('subscript'))
    
    // 列表命令
    commandManager.register('list-ul', new ListCommand('ul'))
    commandManager.register('list-ol', new ListCommand('ol'))
    commandManager.register('list-task', new TaskListCommand())
    
    // 块级命令
    commandManager.register('blockquote', new BlockquoteCommand())
    commandManager.register('code-block', new CodeBlockCommand())
    commandManager.register('code', new CodeCommand())
    
    // 标题命令
    commandManager.register('heading-1', new HeadingCommand(1))
    commandManager.register('heading-2', new HeadingCommand(2))
    commandManager.register('heading-3', new HeadingCommand(3))
    commandManager.register('heading-4', new HeadingCommand(4))
    commandManager.register('heading-5', new HeadingCommand(5))
    commandManager.register('heading-6', new HeadingCommand(6))
    
    // 对齐命令
    commandManager.register('align-left', new AlignCommand('left'))
    commandManager.register('align-center', new AlignCommand('center'))
    commandManager.register('align-right', new AlignCommand('right'))
    commandManager.register('align-justify', new AlignCommand('justify'))
    
    // 插入命令
    commandManager.register('horizontal-rule', new HorizontalRuleCommand())
    commandManager.register('table', new TableCommand())
    commandManager.register('image', new ImageCommand())
    
    // 注意：颜色命令需要动态创建（因为需要传入颜色参数）
    // 所以不在初始化时注册，而是在使用时动态创建
    
    // 3. 创建状态管理器
    let json: EditorJSON
    const value = props.modelValue
    if (!value) {
      json = { type: 'doc', content: [{ type: 'paragraph' }] }
    } else if (isHTMLString(value)) {
      json = htmlToJSON(value as string, editorRef.value)
    } else if (isJSONFormat(value)) {
      json = value as EditorJSON
    } else if (isMarkdownFormat(value)) {
      json = markdownToJSON(value as string, editorRef.value)
    } else {
      json = { type: 'doc', content: [{ type: 'paragraph' }] }
    }
    
    stateManager = new StateManager({
      content: json,
      selection: null,
      history: [json],
      historyIndex: 0,
      format: {},
      isComposing: false,
      isUpdating: false
    })
    
    // 4. 创建 DOM 管理器
    domManager = new DOMManager(editorRef.value)
    
    // 5. 创建事件处理器
    eventHandler = new EventHandler(
      commandManager,
      stateManager,
      domManager,
      editorRef.value
    )
    
    // 6. 设置 emit 回调
    eventHandler.setEmitCallback((content: EditorJSON) => {
      internalContent.value = content
      editorState.content = content
      emit('update:modelValue', content)
      emit('change', content)
    })
    
    const html = jsonToHTML(json) // 初始化内容：将 JSON 转换为 HTML 并设置到 DOM
    editorRef.value.innerHTML = html
    internalContent.value = json
    
    // 初始化历史（使用 JSON 格式）
    history.value = [json]
    historyIndex.value = 0
    
    // 设置可编辑状态
    editorRef.value.contentEditable = props.editable ? 'true' : 'false'
    
    // 确保初始内容被正确包裹
    nextTick(() => {
      normalizeContent()
      updateIsEmpty() // 初始化 isEmpty 状态
    })
    
    // 监听选择变化
    document.addEventListener('selectionchange', updateFormatState)
    
    // 监听点击外部关闭链接对话框
    document.addEventListener('click', handleClickOutside)
  }
})

// 组件卸载
onBeforeUnmount(() => {
  document.removeEventListener('selectionchange', updateFormatState)
  document.removeEventListener('click', handleClickOutside)
})

// 暴露编辑器实例和方法
defineExpose({
  editor: editorRef,
  getHTML: () => editorRef.value?.innerHTML || '',
  getJSON: () => {
    if (!editorRef.value) return { type: 'doc', content: [] }
    return htmlToJSON(editorRef.value.innerHTML, editorRef.value)
  },
  getText: () => editorRef.value?.innerText || '',
  getMarkdown: () => {
    if (!editorRef.value) return ''
    const json = htmlToJSON(editorRef.value.innerHTML, editorRef.value)
    return jsonToMarkdown(json)
  },
  setContent: (content: string | EditorJSON) => {
    if (!editorRef.value) return
    
    // 支持 HTML 字符串、Markdown 字符串或 JSON 格式输入
    let json: EditorJSON
    if (isHTMLString(content)) {
      json = htmlToJSON(content as string, editorRef.value)
    } else if (isJSONFormat(content)) {
      json = content as EditorJSON
    } else if (isMarkdownFormat(content)) {
      json = markdownToJSON(content as string, editorRef.value)
    } else {
      json = { type: 'doc', content: [{ type: 'paragraph' }] }
    }
    
    const html = jsonToHTML(json)
    editorRef.value.innerHTML = html
    internalContent.value = json
    history.value = [json]
    historyIndex.value = 0
  },
  clear: () => {
    if (editorRef.value) {
      const emptyJson: EditorJSON = { type: 'doc', content: [{ type: 'paragraph' }] }
      editorRef.value.innerHTML = jsonToHTML(emptyJson)
      internalContent.value = emptyJson
      updateContent()
    }
  },
  focus: () => {
    editorRef.value?.focus()
  }
})
</script>

<template>
  <div class="border-2 border-solid border-base-300 dark:border-base-600 bg-base-100 dark:bg-base-900 flex flex-col shadow-sm min-h-[200px]" 
    :class="[wrapperClass, fullWidth ? 'w-full' : '', rounded ? 'rounded-lg' : 'rounded-none']" >
    <!-- 工具栏 -->
    <div v-if="showToolbar" 
      class="sticky top-0 z-10  border-b-solid border-b-2 border-base-300 bg-base-50 dark:bg-base-200 p-2 flex items-center justify-center gap-1 flex-wrap"
      :class="rounded ? 'rounded-t-lg' : 'rounded-none'"
    >
      <!-- 撤销和重做 -->
      <div class="flex items-center gap-1">
        <btn variant="transparent" size="sm" :disabled="!canUndo" @click="undo" title="撤销 (Ctrl+Z)" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="arrow-rotate-left" light sm class="text-base-content/60 hover:text-base-content"></icn>
        </btn>
        <btn variant="transparent" size="sm" :disabled="!canRedo" @click="redo" title="重做 (Ctrl+Y)" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="arrow-rotate-right" light sm class="text-base-content/60 hover:text-base-content"></icn>
        </btn>
      </div>
      <!-- 分隔线 -->
      <div class="w-px h-6 bg-base-300 mx-1"></div>
      
      <!-- 标题下拉 -->
      <div class="flex items-center gap-1 ">
        <Dropdown hover fitContent>
          <template #trigger>
            <btn variant="transparent" size="sm" title="标题" class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
              <span v-if="!currentFormat.heading">
                <icn name="h" light sm class="text-base-content/60 hover:text-base-content"></icn>
              </span>
              <span v-else-if="currentFormat.heading === 1">
                <icn name="h1" light sm class="text-base-content/60 hover:text-base-content"></icn>
              </span>
              <span v-else-if="currentFormat.heading === 2">
                <icn name="h2" light sm class="text-base-content/60 hover:text-base-content"></icn>
              </span>
              <span v-else-if="currentFormat.heading === 3">
                <icn name="h3" light sm class="text-base-content/60 hover:text-base-content"></icn>
              </span>
              <span v-else-if="currentFormat.heading === 4">
                <icn name="h4" light sm class="text-base-content/60 hover:text-base-content"></icn>
              </span>
              <span v-else>
                <icn name="h" light sm class="text-base-content/60 hover:text-base-content"></icn>
              </span>
              <icn name="angle-down" light xs class="ml-0.5 text-base-content/60"></icn>
        </btn>
          </template>
          <Menu rounded fitContent>
            <btn v-for="level in [1, 2, 3, 4]" :key="level" item :class="isHeadingActive(level) ? 'bg-primary/10 text-primary' : ''" 
            @click="setHeading(level)">
              <span v-if="level === 1">
                <icn name="h1" light xs class="text-base-content/60"></icn>
              </span>
              <span v-else-if="level === 2">
                <icn name="h2" light xs class="text-base-content/60"></icn>
              </span>
              <span v-else-if="level === 3">
                <icn name="h3" light xs class="text-base-content/60"></icn>
              </span>
              <span v-else-if="level === 4">
                <icn name="h4" light xs class="text-base-content/60"></icn>
              </span>
              Heading{{ level }}
        </btn>
          </Menu>
        </Dropdown>
      </div>

      <!-- 列表下拉 -->
      <div class="flex items-center gap-1">
        <Dropdown hover fitContent>
          <template #trigger>
            <btn variant="transparent" size="sm" title="列表" class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
              <span v-if="currentFormat.listType === 'ul' || currentFormat.listType === null || currentFormat.listType === undefined">
                <icn name="list-ul" light sm class="text-base-content/60 hover:text-base-content"></icn>
              </span>
              <span v-else-if="currentFormat.listType === 'ol'">
                <icn name="list-ol" light sm class="text-base-content/60 hover:text-base-content"></icn>
              </span>
              <span v-else-if="currentFormat.listType === 'taskList'">
                <icn name="list-check" light sm class="text-base-content/60 hover:text-base-content"></icn>
              </span>
              <span v-else>
                <icn name="list-ul" light sm class="text-base-content/60 hover:text-base-content"></icn>
              </span>
              <icn name="angle-down" light xs class="ml-0.5 text-base-content/60"></icn>
        </btn>
          </template>
          <Menu rounded fitContent>
            <btn item :class="isListActive('ul') ? 'bg-primary/10 text-primary' : ''" @click="toggleList('ul')">
              <icn name="list-ul" light xs class="text-base-content/60"></icn>
              无序列表
            </btn>
            <btn item :class="isListActive('ol') ? 'bg-primary/10 text-primary' : ''" @click="toggleList('ol')">
              <icn name="list-ol" light xs class="text-base-content/60"></icn>
              有序列表
            </btn>
            <btn item :class="isListActive('taskList') ? 'bg-primary/10 text-primary' : ''" @click="toggleTaskList">
              <icn name="list-check" light xs class="text-base-content/60"></icn>
              任务列表
            </btn>
          </Menu>
        </Dropdown>
      </div>

      <!-- 引用 -->
      <div class="flex items-center gap-1 ">
        <btn variant="transparent" size="sm" @click="toggleBlockquote" title="引用"
          class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="block-quote" light sm :class="isBlockquoteActive() ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
      </div>

      <!-- 代码块 -->
      <div class="flex items-center gap-1">
        <btn variant="transparent" size="sm" @click="toggleCodeBlock" title="代码块" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="rectangle-code" light sm :class="isCodeBlockActive() ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
      </div>

      <!-- 分隔线 -->
      <div class="w-px h-6 bg-base-300 mx-1"></div>

      <!-- 文本格式组：粗体、斜体、删除线、行内代码、下划线 -->
      <div class="flex items-center gap-1">
        <btn variant="transparent" size="sm" @click="execCommand('bold')" title="粗体 (Ctrl+B)" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="bold" light sm :class="isFormatActive('bold') ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
        <btn variant="transparent" size="sm" @click="execCommand('italic')" title="斜体 (Ctrl+I)" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="italic" light sm :class="isFormatActive('italic') ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
        <btn variant="transparent" size="sm" @click="execCommand('strikeThrough')" title="删除线" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="strikethrough" light sm :class="isFormatActive('strikeThrough') ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
        <btn variant="transparent" size="sm" :class="{ '': isFormatActive('underline') }" 
        @click="execCommand('underline')" title="下划线 (Ctrl+U)" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="underline" light sm :class="isFormatActive('underline') ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
        <btn variant="transparent" size="sm" @click="toggleCode" title="行内代码" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="code" light sm :class="isFormatActive('code') ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
        <!-- 颜色选择 -->
        <Dropdown hover fitContent>
          <template #trigger>
            <btn variant="transparent" size="sm" title="文字颜色" 
            class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
              <icn name="a" light sm :class="currentTextColor ? '' : 'text-base-content/60 hover:text-base-content'" :style="currentTextColor ? { color: currentTextColor } : {}"></icn>
        </btn>
          </template>
          <Menu rounded fitContent padding class="grid grid-cols-8 gap-1">
            <btn v-for="color in textColors" :key="color.value" item variant="transparent" size="sm" :style="{ backgroundColor: color.value }" 
            :class="['w-6 h-6 rounded border border-base-300 hover:scale-110 transition-transform p-0', currentTextColor === color.value ? 'ring-2 ring-primary' : '']" 
            @click="setTextColor(color.value)" :title="color.name"></btn>
          </Menu>
        </Dropdown>
        <!-- 高亮颜色选择 -->
        <Dropdown hover fitContent>
          <template #trigger>
            <btn variant="transparent" size="sm" title="高亮" 
            class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
              <icn name="paint-brush" light sm :class="currentHighlightColor ? '' : 'text-base-content/60 hover:text-base-content'"
               :style="currentHighlightColor ? { color: currentHighlightColor } : {}"></icn>
        </btn>
          </template>
          <Menu rounded fitContent padding class="grid grid-cols-8 gap-1">
            <btn v-for="color in textColors" :key="color.value" item variant="transparent" size="sm" :style="{ backgroundColor: color.value }" 
            :class="['w-6 h-6 rounded hover:scale-110 transition-transform p-0', currentHighlightColor === color.value ? 'ring-2 ring-primary' : '']" @click="setHighlightColor(color.value)" :title="color.name"></btn>
          </Menu>
        </Dropdown>
        <div class="relative link-dialog-container">
          <btn variant="transparent" size="sm" @click="toggleLinkDialog" title="插入链接" 
          class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
            <icn name="link" light sm :class="isLinkActive() ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
          
          <!-- 链接对话框 -->
          <div v-if="showLinkDialog" class="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-base-100 rounded-lg shadow-lg border border-base-300 dark:border-base-600 p-3 z-50 min-w-[400px] link-dialog-container" @click.stop>
            <div class="flex items-center gap-2">
              <div class="flex-1 relative">
                <ipt ref="linkInputRef" v-model="linkUrl"  type="text" placeholder="Paste a link..." right-icon="xmark"  size="sm"
                  full-width @keydown.enter="confirmLink" @keydown.esc="cancelLink"/>
            </div>
              <btn variant="transparent" size="sm" @click="confirmLink" title="确认" 
              class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
                <icn name="check" light sm class="text-primary"></icn>
          </btn>
            </div>
          </div>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="w-px h-6 bg-base-300 mx-1"></div>

      <!-- 上标、下标 -->
      <div class="flex items-center gap-1">
        <btn variant="transparent" size="sm" :class="{ 'text-primary': isFormatActive('superscript') }" 
        @click="execCommand('superscript')" title="上标" class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="superscript" light sm :class="isFormatActive('superscript') ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
        <btn variant="transparent" size="sm" :class="{ 'text-primary': isFormatActive('subscript') }" 
        @click="execCommand('subscript')" title="下标" class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="subscript" light sm :class="isFormatActive('subscript') ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
      </div>

      <!-- 分隔线 -->
      <div class="w-px h-6 bg-base-300 mx-1"></div>

      <!-- 对齐组 -->
      <div class="flex items-center gap-1">
        <btn variant="transparent" size="sm" @click="setAlign('left')" title="左对齐" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="align-left" light sm :class="isAlignActive('left') ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
        <btn variant="transparent" size="sm" @click="setAlign('center')" title="居中" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="align-center" light sm :class="isAlignActive('center') ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
        <btn variant="transparent" size="sm" @click="setAlign('right')" title="右对齐" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="align-right" light sm :class="isAlignActive('right') ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
        <btn variant="transparent" size="sm" @click="setAlign('justify')" title="两端对齐" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="align-justify" light sm :class="isAlignActive('justify') ? 'text-primary' : 'text-base-content/60 hover:text-base-content'"></icn>
        </btn>
      </div>

      <!-- 分隔线 -->
      <div class="w-px h-6 bg-base-300 mx-1"></div>

      <!-- 添加媒体 -->
      <div class="flex items-center gap-1">
        <btn variant="transparent" size="sm" @click="addImage" title="插入图片" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="image" light sm class="text-base-content/60 hover:text-base-content"></icn>
        </btn>
        <btn variant="transparent" size="sm" @click="insertTable" title="插入表格" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="table" light sm class="text-base-content/60 hover:text-base-content"></icn>
        </btn>
        <btn variant="transparent" size="sm" @click="insertHorizontalRule" title="插入分隔线" 
        class="w-8 h-8 p-0 flex items-center justify-center rounded hover:bg-base-200 transition-colors">
          <icn name="minus" light sm class="text-base-content/60 hover:text-base-content"></icn>
        </btn>
      </div>
    </div>

    <!-- 编辑器内容区域 -->
    <div  class="flex-1 overflow-y-auto min-h-[150px] h-full" 
      :class="[contentClass, minHeight, maxHeight, minHeight === 'min-h-96' ? 'min-h-96' : '']" 
      :style="{ minHeight: minHeight && minHeight.startsWith('min-h-') ? undefined : minHeight }">
      <div ref="editorRef" :contenteditable="editable" :data-placeholder="placeholder"
        :class="['editor-content', 'p-5', 'outline-none', 'prose', 'prose-sm', 'max-w-none', 'h-full', 'bg-base-150', 'text-base-content', { 'is-empty': isEmpty }]"
        @input="handleInput"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
        @focus="handleFocus" 
        @blur="handleBlur" 
        @keydown="handleKeydown"
      ></div>
    </div>

    <!-- 字符计数（可选） -->
    <div  v-if="showCharCount"  class="editor-footer bg-base-100 dark:bg-base-200 px-4 py-2 text-xs text-base-content/60"
      :class="rounded ? 'rounded-b-lg' : 'rounded-none'">
      <div class="flex items-center justify-between">
        <span>{{ charCount }} 字符</span>
        <span v-if="wordCount > 0">{{ wordCount }} 词</span>
      </div>
    </div>

  </div>
</template>

<style scoped>
  /* 伪元素样式必须保留在 CSS 中 */
.editor-content:empty::before,
.editor-content.is-empty::before {
  content: attr(data-placeholder);
  color: var(--base-content) / 0.4;
  pointer-events: none;
  display: block;
}

/* Dark 模式下的占位符颜色 */
.dark .editor-content:empty::before,
.dark .editor-content.is-empty::before,
[data-theme="dark"] .editor-content:empty::before,
[data-theme="dark"] .editor-content.is-empty::before {
  color: var(--base-content) / 0.5;
}

/* 编辑器内容区域背景色仅在内容区域（不包括 padding） */
.editor-content {
  background-clip: content-box;
  color: var(--base-content);
}

/* Dark 模式下的编辑器内容区域 - 使用 dark-base-content 或直接使用白色 */
.dark .editor-content,
[data-theme="dark"] .editor-content {
  color: var(--base-content) ;
}

/* Dark 模式下覆盖 prose 类的颜色 */
.dark .editor-content.prose,
[data-theme="dark"] .editor-content.prose {
  color: var(--base-content) ;
}

/* Dark 模式下确保所有文本元素都是白色（覆盖 prose 和其他样式） */
.dark .editor-content p,
.dark .editor-content span:not([style*="color"]),
.dark .editor-content div:not([class*="upload"]):not([class*="ckb"]),
.dark .editor-content strong,
.dark .editor-content em,
.dark .editor-content u,
.dark .editor-content s,
.dark .editor-content code:not(pre code),
.dark .editor-content li,
.dark .editor-content td,
.dark .editor-content th,
[data-theme="dark"] .editor-content p,
[data-theme="dark"] .editor-content span:not([style*="color"]),
[data-theme="dark"] .editor-content div:not([class*="upload"]):not([class*="ckb"]),
[data-theme="dark"] .editor-content strong,
[data-theme="dark"] .editor-content em,
[data-theme="dark"] .editor-content u,
[data-theme="dark"] .editor-content s,
[data-theme="dark"] .editor-content code:not(pre code),
[data-theme="dark"] .editor-content li,
[data-theme="dark"] .editor-content td,
[data-theme="dark"] .editor-content th {
  color: var(--base-content) ;
}

/* Dark 模式下覆盖 prose 类的所有子元素 */
.dark .editor-content.prose *:not([style*="color"]):not(a):not(img):not(pre):not(code),
[data-theme="dark"] .editor-content.prose *:not([style*="color"]):not(a):not(img):not(pre):not(code) {
  color: var(--base-content) ;
}

/* 动态生成的子元素样式 */
.editor-content h1 {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  color: var(--base-content);
}

.dark .editor-content h1,
[data-theme="dark"] .editor-content h1 {
  color: var(--base-content);
}

.editor-content h2 {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  margin-top: 1.25rem;
  color: var(--base-content);
}

.dark .editor-content h2,
[data-theme="dark"] .editor-content h2 {
  color: var(--base-content) ;
}

.editor-content h3 {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  color: var(--base-content);
}

.dark .editor-content h3,
[data-theme="dark"] .editor-content h3 {
  color: var(--base-content) ;
}

.editor-content p {
  margin-bottom: 1rem;
  line-height: 1.625;
  color: var(--base-content);
}

.dark .editor-content p,
[data-theme="dark"] .editor-content p {
  color: var(--base-content) ;
}

.editor-content ul,
.editor-content ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  color: var(--base-content);
}

/* Dark 模式下的列表 */
.dark .editor-content ul,
.dark .editor-content ol,
[data-theme="dark"] .editor-content ul,
[data-theme="dark"] .editor-content ol {
  color: var(--base-content) ;
}

.editor-content ul {
  list-style-type: disc;
}

/* 任务列表（包含 checkbox 的列表）隐藏圆点 */
.editor-content ul.task-list,
.editor-content ul:has(li input[type="checkbox"]) {
  list-style-type: none ;
  padding-left: 0;
}

/* 兼容性更好的选择器：直接选择包含 checkbox 的 li */
.editor-content ul li:has(input[type="checkbox"]) {
  list-style: none ;
}

/* 确保任务列表的 ul 不显示圆点（通过类名） */
.editor-content ul.task-list {
  list-style-type: none ;
  padding-left: 0;
}

/* 确保任务列表的 checkbox 有合适的间距 */
.editor-content ul li input[type="checkbox"] {
  margin-right: 0.5rem;
}

/* 为每个包含 checkbox 的 li 隐藏圆点 */
.editor-content ul > li:has(input[type="checkbox"]) {
  list-style: none ;
}

/* 兼容性更好的选择器：直接选择包含 checkbox 的 ul */
.editor-content ul li:has(input[type="checkbox"]) {
  list-style: none;
}

/* 确保任务列表的 ul 不显示圆点 */
.editor-content ul li input[type="checkbox"] {
  margin-right: 0.5rem;
}

/* 更精确的任务列表样式：通过父元素选择 */
.editor-content ul > li:first-child:has(input[type="checkbox"]) ~ li,
.editor-content ul > li:has(input[type="checkbox"]) {
  list-style: none;
}

/* 如果 ul 包含 checkbox，隐藏所有圆点 */
.editor-content ul[class*="task"] {
  list-style-type: none;
  padding-left: 0;
}

/* ckb 组件样式（用于任务列表中的 checkbox） */
.editor-content .ckb {
  appearance: none;
  cursor: pointer;
  border: 2px solid var(--primary);
  border-radius: var(--rounded-btn);
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  position: relative;
  display: inline-block;
  vertical-align: middle;
}

.editor-content .ckb:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* 尺寸样式 */
.editor-content .ckb-xs { width: 1rem; height: 1rem; }
.editor-content .ckb-sm { width: 1.25rem; height: 1.25rem; }
.editor-content .ckb-md { width: 1.5rem; height: 1.5rem; }
.editor-content .ckb-lg { width: 2rem; height: 2rem; }
.editor-content .ckb-xl { width: 2.5rem; height: 2.5rem; }

/* 颜色变体 */
.editor-content .ckb-primary {
  --chkbg: var(--primary);
  --chkfg: var(--primary-content);
  border-color: var(--primary);
}

.editor-content .ckb-secondary {
  --chkbg: var(--secondary);
  --chkfg: var(--secondary-content);
  border-color: var(--secondary);
}

.editor-content .ckb-success {
  --chkbg: var(--success);
  --chkfg: var(--success-content);
  border-color: var(--success);
}

.editor-content .ckb-warning {
  --chkbg: var(--warning);
  --chkfg: var(--warning-content);
  border-color: var(--warning);
}

.editor-content .ckb-error {
  --chkbg: var(--error);
  --chkfg: var(--error-content);
  border-color: var(--error);
}

/* 选中状态 */
.editor-content .ckb:checked,
.editor-content .ckb[checked="true"] {
  background-color: var(--chkbg);
  animation: checkmark var(--animation-input, 0.2s) ease-in-out;
  background-image:
    linear-gradient(-45deg, transparent 65%, var(--chkbg) 65.99%),
    linear-gradient(45deg, transparent 75%, var(--chkbg) 75.99%),
    linear-gradient(-45deg, var(--chkbg) 40%, transparent 40.99%),
    linear-gradient(45deg,
      var(--chkbg) 30%,
      var(--chkfg) 30.99%,
      var(--chkfg) 40%,
      transparent 40.99%),
    linear-gradient(-45deg,
      var(--chkfg) 50%,
      var(--chkbg) 50.99%);
}

/* 禁用状态 */
.editor-content .ckb:disabled {
  cursor: not-allowed;
  border-color: transparent;
  background-color: var(--base-250);
  opacity: 0.2;
}

/* 悬停效果 */
.editor-content .ckb:not(:disabled):hover {
  border-color: var(--chkbg);
  background-color: rgba(var(--chkbg), 0.1);
}

/* 动画 */
@keyframes checkmark {
  0% { background-position-y: 5px }
  50% { background-position-y: -2px; }
  100% { background-position-y: 0; }
}

.editor-content ol {
  list-style-type: decimal;
}

.editor-content li {
  margin-bottom: 0.5rem;
  color: var(--base-content);
}

/* Dark 模式下的列表项 */
.dark .editor-content li,
[data-theme="dark"] .editor-content li {
  color: var(--base-content) ;
}

.editor-content li p {
  margin-bottom: 0;
}

/* Blockquote 样式 */
.editor-content blockquote {
  border-left: 4px solid var(--primary);
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 0;
  margin-right: 0;
  color: var(--base-content);
  background-color: var(--base-200) / 0.3;
  border-radius: 0 0.25rem 0.25rem 0;
  display: block;
  box-sizing: border-box;
}

/* Dark 模式下的 Blockquote 样式 */
.dark .editor-content blockquote,
[data-theme="dark"] .editor-content blockquote {
  background-color: var(--base-700) / 0.3;
  color: var(--base-content) ;
}

/* 行内代码样式 */
.editor-content code:not(pre code) {
  background-color: #f0f0f0;
  border: 1px solid #e0e0e0;
  border-radius: 0.25rem;
  padding: 0.125rem 0.375rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875em;
  color: #1f2937;
  display: inline;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-sizing: border-box;
  line-height: 1.5;
}

/* 暗色模式下的行内代码样式 */
.dark .editor-content code:not(pre code),
[data-theme="dark"] .editor-content code:not(pre code) {
  background-color: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: #e0e0e0;
}

/* 代码块样式 */
.editor-content pre {
  border: 1px solid var(--base-300);
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 0;
  margin-right: 0;
  background-color: var(--base-200) / 0.5;
  border-radius: 0.25rem;
  display: block;
  box-sizing: border-box;
  overflow-x: auto;
}

/* Dark 模式下的代码块 */
.dark .editor-content pre,
[data-theme="dark"] .editor-content pre {
  background-color: var(--base-700) / 0.8;
  border-color: var(--base-600);
}

.editor-content pre code {
  background-color: transparent;
  border: none;
  padding: 0;
  color: var(--base-content);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-wrap;
  display: block;
  word-wrap: break-word;
}

.editor-content hr {
  border-top: 1px solid var(--base-300);
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

/* Dark 模式下的水平线 */
.dark .editor-content hr,
[data-theme="dark"] .editor-content hr {
  border-top-color: var(--base-600);
}

.editor-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.editor-content a {
  color: var(--primary);
  text-decoration: underline;
}

.editor-content a:hover {
  color: var(--primary) / 0.8;
}

.editor-content mark {
  background-color: #fef08a;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  color: inherit;
}

/* Dark 模式下的高亮样式 */
.dark .editor-content mark,
[data-theme="dark"] .editor-content mark {
  background-color: #854d0e;
  color: #fef08a;
}

.editor-content table {
  width: 100% ;
  border-collapse: collapse ;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--base-300) ;
  box-sizing: border-box;
}

.editor-content table td,
.editor-content table th {
  border: 1px solid var(--base-300) ;
  padding: 0.5rem;
  box-sizing: border-box;
}

.editor-content table th {
  background-color: var(--base-200) ;
  font-weight: 600;
  border-bottom: 2px solid var(--base-300) ;
}

.editor-content table thead {
  border-bottom: 2px solid var(--base-300) ;
}

.editor-content table tbody tr {
  border-bottom: 1px solid var(--base-300) ;
}

.editor-content table tbody tr:last-child {
  border-bottom: none ;
}

.editor-content table tbody tr:nth-child(even) {
  background-color: var(--base-50) ;
}

/* 暗色模式下的表格样式 */
.dark .editor-content table,
[data-theme="dark"] .editor-content table {
  border-color: var(--dark-base-300) ;
}

.dark .editor-content table td,
.dark .editor-content table th,
[data-theme="dark"] .editor-content table td,
[data-theme="dark"] .editor-content table th {
  border-color: var(--dark-base-300) ;
}

.dark .editor-content table th,
[data-theme="dark"] .editor-content table th {
  background-color: var(--dark-base-200) ;
  border-bottom-color: var(--dark-base-300) ;
}

.dark .editor-content table thead,
[data-theme="dark"] .editor-content table thead {
  border-bottom-color: var(--dark-base-300) ;
}

.dark .editor-content table tbody tr,
[data-theme="dark"] .editor-content table tbody tr {
  border-bottom-color: var(--dark-base-300) ;
}

.dark .editor-content table tbody tr:nth-child(even),
[data-theme="dark"] .editor-content table tbody tr:nth-child(even) {
  background-color: var(--dark-base-100) ;
}

/* 内联图片上传占位符样式 */
.editor-content .inline-image-upload-placeholder {
  min-height: 200px;
  border: 2px dashed var(--primary) ;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  margin: 1rem 0;
  position: relative;
  background-color: transparent;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.editor-content .inline-image-upload-placeholder:hover {
  border-color: var(--primary) ;
  background-color: var(--primary) / 0.05;
}

.editor-content .inline-image-upload-placeholder.dragging {
  border-color: var(--primary) ;
  background-color: var(--primary) / 0.1;
}

/* Dark 模式下的图片上传占位符 */
.dark .editor-content .inline-image-upload-placeholder,
[data-theme="dark"] .editor-content .inline-image-upload-placeholder {
  background-color: var(--base-700) / 0.3;
}

.dark .editor-content .inline-image-upload-placeholder:hover,
[data-theme="dark"] .editor-content .inline-image-upload-placeholder:hover {
  background-color: var(--primary) / 0.1;
}

.dark .editor-content .inline-image-upload-placeholder.dragging,
[data-theme="dark"] .editor-content .inline-image-upload-placeholder.dragging {
  background-color: var(--primary) / 0.15;
}

/* 上传文件列表样式 */
.editor-content .upload-files-list {
  width: 100%;
  padding: 1rem;
}

.editor-content .upload-file-item {
  position: relative;
}

.editor-content .upload-progress-bar {
  transition: width 0.3s ease;
}
</style>