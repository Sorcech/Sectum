<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue'
import type { MarkdownItHeader } from '@mdit-vue/plugin-headers'
import type { Frontmatter } from 'vite-plugin-md'
import Tableofcontent from './Tableofcontent.vue'
import './markdown.css'

interface MdFrontmatter extends Frontmatter {
  type: string
  author: string
  date: Date | string
  toc: MarkdownItHeader[]
  categories: string[]
  tags: string[]
}
defineProps({
  frontmatter: { type: Object as PropType<MdFrontmatter>, default: () => { } },
})
// 滚动监听
const list: any[] = []
onMounted(() => {
  var toc = document.querySelectorAll(".site-toc li a")
  // console.log('toc', toc)
  list.length = 0
  for (let i = 0; i < toc.length; i++) {
    list.push(toc[i].hash.substr(1))
  }
  // console.log('list', list)
  window.addEventListener('scroll', handleScroll, true)
})
const index = ref('')
const handleScroll = () => {
  let a = document.getElementsByClassName('doc')[0]
  // console.log('a', a.scrollTop)
  for (let i = 0; i < list.length; i++) {
    let b: any = document.getElementById(list[i])
    let e: any = document.getElementById(list[i + 1])
    // console.log('b', b?.offsetTop)
    if (a.scrollTop >= b?.offsetTop && a.scrollTop < e?.offsetTop) {
      // console.log('i', i, list[i])
      index.value = list[i]
    }
    if (a.scrollTop >= e?.offsetTop) {
      // console.log('i', i, list[i+1])
      index.value = list[i + 1]
    }
  }
}
onMounted(() => {
  index.value = ''
  // console.log('on----')
})
</script>

<template>
  <article class="flex flex-row px-10 pt-10 w-full min-w-0 h-screen overflow-y-scroll">
    <div class="lg:w-5/6 w-full lg:pr-10">
      <slot></slot>
    </div>
    <div v-if="frontmatter.toc?.length > 0" class="hidden  xl:block xl:row-span-3 ">
      <Tableofcontent :toc="frontmatter.toc" :index="index"
        class="max-h-[calc(100vh-4rem-env(safe-area-inset-bottom))] fixed border-l h-screen " />
    </div>
  </article>
</template>
