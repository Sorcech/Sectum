<script lang="ts" setup>
import { ref } from 'vue'
import RollerSelector from './RollerSelector.vue'
import RollerParser from './RollerParser.vue'
import MatterGenerator from '~/packet/Layout/Matter/MatterGenerator.vue'
import { generateFullCombinationsCSV } from './RollerSelector'

// 布局模式：横向或纵向
const layoutMode = ref<'horizontal' | 'vertical'>('horizontal')

const isGenerating = ref(false)
const csvContent = ref('')
const combinationCount = ref(0)

const generateTable = () => {
  isGenerating.value = true
  combinationCount.value = 0
  
  // 使用 setTimeout 避免阻塞UI
  setTimeout(() => {
    try {
      const csv = generateFullCombinationsCSV()
      csvContent.value = csv
      combinationCount.value = csv.split('\n').length - 1 // 减去表头
    } catch (error) {
      console.error('生成失败:', error)
      alert('生成失败: ' + (error as Error).message)
    } finally {
      isGenerating.value = false
    }
  }, 100)
}

const downloadCSV = () => {
  if (!csvContent.value) return
  
  const blob = new Blob(['\uFEFF' + csvContent.value], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `产品型号和编号遍历表_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="product-selector-container w-full box-border max-w-full overflow-x-hidden">
    <!-- 标题和布局切换 -->
    <div class="p-4 w-full bg-base-200 rounded-lg mb-4 box-border max-w-full">
      <div class="flex justify-between items-center">
        <div class="text-2xl font-bold text-base-content">辊筒选型</div>
        <div class="flex items-center gap-2">
          <span class="text-sm text-base-content/60">布局模式：</span>
          <btn :color="layoutMode === 'horizontal' ? 'primary' : 'secondary'" size="sm" @click="layoutMode = 'horizontal'">
            横向
          </btn>
          <btn :color="layoutMode === 'vertical' ? 'primary' : 'secondary'" size="sm" @click="layoutMode = 'vertical'">
            纵向
          </btn>
        </div>
      </div>
    </div>
    
    <!-- 加载 RollerSelect 组件 -->
    <RollerSelector :layout-mode="layoutMode" />
    
    <!-- 滚轮参数解析器 -->
    <div class="p-4 mt-8 border-t border-base-300 bg-base-150 rounded-lg box-border max-w-full">
      <RollerParser />
    </div>
    
    <!-- Matter 编码生成器 -->
    <div class="p-4 mt-8 border-t border-base-300 bg-base-150 rounded-lg box-border max-w-full">
      <div class="mb-6 pb-4 border-b border-base-300">
        <h2 class="text-2xl font-bold text-base-content">Matter 编码生成器</h2>
        <p class="text-sm text-base-content/60 mt-1">根据编码体系生成 Matter Code</p>
      </div>
      <MatterGenerator />
    </div>
    
    <!-- 产品型号和编号遍历表生成器 -->
    <div class="p-4 mt-8 border-t border-base-300 bg-base-150 rounded-lg box-border max-w-full">
      <div class="mb-6 pb-4 border-b border-base-300">
        <h2 class="text-2xl font-bold text-base-content">产品型号和编号遍历表生成器</h2>
        <p class="text-sm text-base-content/60 mt-1">生成所有可能的产品组合并导出为CSV文件</p>
      </div>
      
      <div class="mb-6 flex flex-wrap gap-3">
        <btn @click="generateTable" :disabled="isGenerating" color="primary" size="md">
          {{ isGenerating ? '生成中...' : '生成完整遍历表' }}
        </btn>
        <btn v-if="csvContent" @click="downloadCSV"  color="success" size="md">
          下载CSV文件
        </btn>
      </div>
      
      <div v-if="isGenerating" class="mb-6 p-4 bg-base-200 rounded-lg border border-base-300">
        <div class="flex items-center gap-2 text-base-content">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <p class="font-medium">正在生成，请稍候...</p>
        </div>
        <p class="text-sm text-base-content/60 mt-2">已生成: {{ combinationCount }} 条记录</p>
      </div>
      
      <div v-if="csvContent" class="mb-6 p-4 bg-success/10 rounded-lg border border-success/20">
        <p class="text-success font-bold mb-1">✓ 生成完成！</p>
        <p class="text-sm text-base-content/80">共 {{ combinationCount }} 条记录，文件大小: {{ (csvContent.length / 1024).toFixed(2) }} KB</p>
      </div>
      
      <div v-if="csvContent" class="max-h-96 overflow-auto border border-base-300 p-4 bg-base-200 rounded-lg">
        <pre class="text-xs font-mono text-base-content whitespace-pre-wrap break-all">{{ csvContent.substring(0, 2000) }}{{ csvContent.length > 2000 ? '...' : '' }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-selector-container {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}
</style>

