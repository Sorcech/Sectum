import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')

// 读取 package.json 获取版本号
const packageJson = JSON.parse(readFileSync(resolve(rootDir, 'package.json'), 'utf-8'))
const version = packageJson.version

// 读取 README.md
const readmePath = resolve(rootDir, 'README.md')
let readmeContent = readFileSync(readmePath, 'utf-8')

// 更新版本号徽章中的版本号
// 匹配格式: Version-0.1.7 或 Version-{version}
const versionBadgePattern = /(Version-)([\d.]+)(-blue)/g
readmeContent = readmeContent.replace(versionBadgePattern, `$1${version}$3`)

// 写回文件
writeFileSync(readmePath, readmeContent, 'utf-8')

console.log(`✅ README.md 版本号已更新为: ${version}`)

