<template>
  <div class="doc">
    <component :is="currentComponent" v-if="currentComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import routeConfig from '~/router/route'

const route = useRoute()

// 递归查找路由配置中的组件
const findRouteComponent = (routes: any[], targetPath: string): (() => Promise<any>) | null => {
  for (const routeItem of routes) {
    if (routeItem.path === targetPath && routeItem.component) {
      return routeItem.component
    }
    if (routeItem.children) {
      const found = findRouteComponent(routeItem.children, targetPath)
      if (found) return found
    }
  }
  return null
}

// 根据当前路径动态导入对应的文档组件
const currentComponent = computed(() => {
  const path = route.path
  const componentFn = findRouteComponent(routeConfig, path)
  
  if (componentFn) {
    return defineAsyncComponent(componentFn)
  }
  return null
})
</script>
