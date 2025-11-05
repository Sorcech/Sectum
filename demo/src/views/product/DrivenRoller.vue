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
            <h1 class="text-4xl font-bold text-primary mb-4">从动辊筒</h1>
            <p class="text-lg text-base-content/70">优质从动辊筒产品</p>
          </div>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <p class="text-base-content/70">从动辊筒产品详情...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Sidebar } from 'sectum'

const sidebarItems = [
  { title: '产品选型', path: '/product/selection' },
  { title: '电动辊筒', path: '/product/electric-roller' },
  { title: '从动辊筒', path: '/product/driven-roller' },
  { title: '驱动模块', path: '/product/drive-module' },
  { title: '网关模块', path: '/product/gateway-module' }
]
</script>

