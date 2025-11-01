<template>
  <div class="min-h-screen bg-base-300">
    <Header 
      project-name="Sectum UI 示例"
      :theme-component="ThemeSelect"
      :dark-component="DarkChange"
      :language-component="LanguageSelect"
      user-link="/profile"
    />
    <div class="flex min-h-screen">
      <Sidebar :routes="routes" />
      <main class="flex-1 min-w-0 overflow-hidden lg:ml-10">
        <div class="h-full overflow-y-auto p-6">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { Header, Sidebar, ThemeSelect, DarkChange, LanguageSelect } from 'sectum'

const routes = [
  {
    path: '/',
    meta: { title: '首页' },
    children: [
      {
        path: '/',
        meta: { title: '欢迎' }
      }
    ]
  }
]
</script>
