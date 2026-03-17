<script setup lang="ts">
import { computed, defineAsyncComponent, KeepAlive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '~/packet/Model/Sidebar/Sidebar.vue'

// KeepAlive 在模板中使用
void KeepAlive

interface Props {
  routes?: any[]
}

const props = defineProps<Props>()
const route = useRoute()
const router = useRouter()

// 使用传入的 routes 或默认的 routeConfig
const routes = computed(() => {
  return props.routes
})

// 侧边栏使用路由：若顶层是 /sectum 则取其 children 作为菜单分组，否则用原 routes
const sidebarRoutes = computed(() => {
  const r = props.routes
  if (!r || !Array.isArray(r) || r.length === 0) return []
  const first = r[0]
  if (first?.path === '/sectum' && first?.children?.length) return first.children
  return r
})

// 路由跳转处理函数
const handleNavigate = (path: string) => {
  router.push(path)
}

// 递归查找路由配置中的组件
const findRouteComponent = (routes: any[], targetPath: string, depth: number = 0): (() => Promise<any>) | null => {
  for (const routeItem of routes) {
    if (routeItem.path === targetPath && routeItem.component) {
      return routeItem.component
    }
    if (routeItem.children) {
      const found = findRouteComponent(routeItem.children, targetPath, depth + 1)
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
  
  // 检查 routes 是否存在
  if (!routes.value) {
    return null
  }
  
  // 查找时使用完整 routes（含 /sectum 顶层），以便匹配到子路由的 component
  const componentFn = findRouteComponent(Array.isArray(routes.value) ? routes.value : [], path)
  
  if (componentFn) {
    const component = defineAsyncComponent({
      loader: componentFn,
      delay: 200,
      timeout: 10000
    })
    // 缓存组件实例
    componentCache.set(path, component)
    return component
  }
  return null
})
</script>
<template>
  <div class="flex flex-1 min-h-0">
    <Sidebar v-if="sidebarRoutes" :routes="sidebarRoutes" :on-navigate="handleNavigate" />
    <main class="flex-1 min-w-0 lg:ml-10">
      <div class="flex flex-col h-full min-h-0 overflow-y-auto">
        <KeepAlive :max="10">
          <component :is="currentComponent" v-if="currentComponent" :key="route.path" />
          <div v-else style="padding: 20px; background: #fee; border: 2px solid #f00;">
            <p><strong>组件未找到</strong></p>
            <p>当前路径: {{ route.path }}</p>
            <p>Routes 是否存在: {{ routes ? '是' : '否' }}</p>
            <p>Routes 长度: {{ routes?.length || 0 }}</p>
            <details style="margin-top: 10px;">
              <summary>调试信息</summary>
              <pre style="background: #f5f5f5; padding: 10px; margin-top: 10px; overflow: auto;">{{ JSON.stringify({ path: route.path, hasRoutes: !!routes, routesLength: routes?.length, routesPreview: routes?.slice(0, 2) }, null, 2) }}</pre>
            </details>
          </div>
        </KeepAlive>
      </div>
    </main>
  </div>
</template>