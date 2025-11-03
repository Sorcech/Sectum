<template>
  <div class="flex min-h-screen">
    <Sidebar 
      title="产品分类"
      :items="sidebarItems"
    />
    <div class="flex-1 min-w-0 overflow-hidden lg:ml-10">
      <div class="h-full overflow-y-auto p-6">
        <div class="space-y-6">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-primary mb-4">产品中心</h1>
            <p class="text-lg text-base-content/70">探索我们的优质产品</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- 产品卡片 1 -->
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">产品 A</h2>
                <p class="text-base-content/70">这是一个优秀的产品，具有强大的功能和出色的性能。</p>
                <div class="card-actions justify-end">
                  <btn color="primary">了解更多</btn>
                </div>
              </div>
            </div>

            <!-- 产品卡片 2 -->
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">产品 B</h2>
                <p class="text-base-content/70">专为现代企业设计，提供完整的解决方案。</p>
                <div class="card-actions justify-end">
                  <btn color="primary">了解更多</btn>
                </div>
              </div>
            </div>

            <!-- 产品卡片 3 -->
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">产品 C</h2>
                <p class="text-base-content/70">创新的技术架构，满足各种业务需求。</p>
                <div class="card-actions justify-end">
                  <btn color="primary">了解更多</btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Sidebar } from 'sectum'

// 产品侧边栏菜单项
const sidebarItems = [
  { title: '产品选型', path: '/product/selection' },
  { title: '电动辊筒', path: '/product/electric-roller' },
  { title: '从动辊筒', path: '/product/driven-roller' },
  { title: '驱动模块', path: '/product/drive-module' },
  { title: '网关模块', path: '/product/gateway-module' }
]
</script>
