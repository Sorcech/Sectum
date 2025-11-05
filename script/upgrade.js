import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, relative } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const workspaceRoot = resolve(rootDir, '..')

// 读取 package.json 获取版本号
const packageJson = JSON.parse(readFileSync(resolve(rootDir, 'package.json'), 'utf-8'))
const version = packageJson.version

// 更新 README.md 版本号
const readmePath = resolve(rootDir, 'README.md')
let readmeContent = readFileSync(readmePath, 'utf-8')

// 更新版本号徽章中的版本号
// 匹配格式: Version-0.1.7 或 Version-{version}
const versionBadgePattern = /(Version-)([\d.]+)(-blue)/g
readmeContent = readmeContent.replace(versionBadgePattern, `$1${version}$3`)

// 写回文件
writeFileSync(readmePath, readmeContent, 'utf-8')

console.log(`✅ README.md 版本号已更新为: ${version}`)

// 同步 Markdown 文件到 Cumulu
const sectumPacketDir = resolve(rootDir, 'src/packet')
const cumuluPacketDir = resolve(workspaceRoot, 'Cumulu/src/packet')

/**
 * 递归查找所有 .md 文件
 */
function findMarkdownFiles(dir, baseDir = dir) {
  const files = []
  
  try {
    const entries = readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = resolve(dir, entry.name)
      
      if (entry.isDirectory()) {
        // 递归查找子目录
        files.push(...findMarkdownFiles(fullPath, baseDir))
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // 获取相对于 baseDir 的路径
        const relativePath = relative(baseDir, fullPath)
        files.push({
          fullPath,
          relativePath
        })
      }
    }
  } catch (error) {
    console.error(`❌ 读取目录失败: ${dir}`, error.message)
  }
  
  return files
}

/**
 * 确保目录存在，如果不存在则创建
 */
function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * 将文件路径转换为扁平化路径（移除组件文件夹层级）
 * 例如: Element/Button/button.md -> Element/button.md
 * 例如: Layout/Header/Header.md -> Layout/Header.md
 */
function flattenPath(relativePath) {
  const parts = relativePath.split(/[\\/]/)
  
  // 如果路径是 3 级或更多（如 Element/Button/button.md），移除中间层
  if (parts.length >= 3) {
    // 保留顶层目录（Element、Layout、Pattern、Section、Config）和文件名
    const topLevel = parts[0]  // Element, Layout, Pattern, Section, Config
    const fileName = parts[parts.length - 1]  // button.md
    
    // 所有类型都直接平铺到顶层目录下
    return `${topLevel}/${fileName}`
  }
  
  // 如果已经是扁平结构，直接返回
  return relativePath
}

/**
 * 同步 Markdown 文件
 */
function syncMarkdownFiles() {
  console.log('\n📄 开始同步 Markdown 文件...')
  
  // 查找所有 .md 文件
  const mdFiles = findMarkdownFiles(sectumPacketDir)
  
  if (mdFiles.length === 0) {
    console.log('⚠️  未找到任何 Markdown 文件')
    return
  }
  
  let syncedCount = 0
  let skippedCount = 0
  
  for (const { fullPath, relativePath } of mdFiles) {
    // 将路径扁平化（移除组件文件夹层级）
    const flatPath = flattenPath(relativePath)
    const targetPath = resolve(cumuluPacketDir, flatPath)
    const targetDir = dirname(targetPath)
    
    try {
      // 确保目标目录存在
      ensureDir(targetDir)
      
      // 读取源文件
      const content = readFileSync(fullPath, 'utf-8')
      
      // 写入目标文件
      writeFileSync(targetPath, content, 'utf-8')
      
      console.log(`  ✓ ${relativePath} -> ${flatPath}`)
      syncedCount++
    } catch (error) {
      console.error(`  ✗ ${relativePath}: ${error.message}`)
      skippedCount++
    }
  }
  
  console.log(`\n✅ 同步完成: ${syncedCount} 个文件已同步，${skippedCount} 个文件失败`)
}

// 执行同步
syncMarkdownFiles()

