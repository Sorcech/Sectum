<template>
    <KeepAlive :max="10">
      <component :is="currentComponent" v-if="currentComponent" :key="route.path" />
      <div v-else style="padding: 20px;">
        <p>组件未找到</p>
        <p>当前路径: {{ route.path }}</p>
      </div>
    </KeepAlive>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, KeepAlive } from 'vue'
import { useRoute } from 'vue-router'
import routeConfig from '~/router/route'

// KeepAlive 在模板中使用
void KeepAlive

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

// 缓存组件实例，避免重复创建
const componentCache = new Map<string, any>()

// 根据当前路径动态导入对应的文档组件
const currentComponent = computed(() => {
  const path = route.path
  
  // 如果已缓存，直接返回缓存的组件
  if (componentCache.has(path)) {
    return componentCache.get(path)
  }
  
  const componentFn = findRouteComponent(routeConfig, path)
  
  if (componentFn) {
    const component = defineAsyncComponent({
      loader: componentFn,
      onError: (err) => {
        // 静默处理错误
      }
    })
    // 缓存组件实例
    componentCache.set(path, component)
    return component
  }
  return null
})
</script>
