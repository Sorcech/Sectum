<script lang="ts" setup>
import { h, ref, useSlots } from 'vue'
const globalProps = defineProps<{
  name: string
  default?: string
}>()
const slots = useSlots()
let currentTab = ref<string>(globalProps.default || '')
const renderOneButton = (name: string, tab: string, index: number) => h(
  'label',
  {
    class: {
      'mx-2 px-2 cursor-pointer hover:text-primary': true,
      'border-b-2': (currentTab.value === name) || (index === 0 && !currentTab.value)
    }
  },
  [
    h('input',
      {
        name: globalProps.name,
        value: name,
        type: 'radio',
        class: 'hidden',
        onClick: () => { currentTab.value = name }
      }, {}),
    tab
  ]
)

const renderTabBar = () => h(
  'div',
  { class: 'flex flex-warp overflow-x-scroll' },
  slots.default && slots.default().map((it, index) => {
    return renderOneButton(it.props?.name, it.props?.tab, index)
  })
)
const renderContent = () => {
  return slots.default && slots.default().find(it => {
    if (currentTab.value === '') {
      return true
    }
    return it.props?.name === currentTab.value
  })
}
</script>
<template>
  <div>
    <renderTabBar />
    <renderContent />
  </div>
</template>