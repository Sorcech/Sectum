<template>
  <div class="p-5 h-screen">
    <ipt class="my-2 h-10"></ipt>
    <table class="w-full m-0 text-center table-fixed fixed-thead z-10">
      <tr class="bg-base-200 border-b-1 h-10 shadow shadow-lg !w-10">
        <!-- <th>
          <ckb></ckb>
        </th> -->
        <th v-for="info of tHead" :key="info.key" class=" font-medium text-base-content"
          :class="[checkWidth(info.key)]">{{ info.text }}</th>
        <!-- <th class="font-medium text-base-content w-15">More</th> -->
      </tr>
    </table>
    <div class="overflow-auto overflow-x-hidden w-full h-6/7">
      <table class="w-full m-0 table-fixed">
        <tr v-for="(item, index) of tBody" :key="item.id" class="bg-base-100 h-8 hover:bg-base-200">
          <!-- <th>
            <ckb></ckb>
          </th> -->
          <td v-for="(value, key) in item" :key="key" @click.stop="showEditInput($event, key, index)"
            class="relative border-1 hover:bg-base-300 font-thin text-current"
            :class="[checkTruncate(key), checkAlign(key), checkWidth(key)]">
            {{ value }}</td>
          <!-- <td class="text-center w-15 !h-5">
            <btn variant="link" class="h-5">more</btn>
          </td> -->
        </tr>
      </table>
    </div>
    <table class="w-full text-center table-fixed">
      <tr class="bg-base-200 border-b-1 h-10">
        <td>Quantity: {{ quantity }}</td>
        <!-- <ButtonGroup class="space-x-1">
          <btn variant="outline">1</btn>
          <btn variant="outline">2</btn>
          <btn variant="outline" active>3</btn>
          <btn variant="outline">4</btn>
          <btn variant="outline">5</btn>
          <btn variant="outline">6</btn>
          <btn variant="outline" active>7</btn>
          <btn variant="outline">8</btn>
          <btn variant="outline">9</btn>
          <btn variant="outline">10</btn>
          <btn variant="outline" active>1</btn>
          <btn variant="outline">12</btn>
        </ButtonGroup> -->
      </tr>
    </table>
  </div>
</template>
<script setup lang="ts">
import { createApp, toRefs, reactive, App } from 'vue'
import EditInput from './EditInput.vue'
let editInputApp: App<Element> | null = null
const state = reactive({
  key: '',
  value: '',
  index: -1,
  text: ''
})
const props = defineProps({
  data: { type: Object, default: { tHead: [], tBody: [] }, required: true },
  quantity: { type: Number, default: 0, required: false }
})
const emit = defineEmits(['submit'])

const { tHead, tBody } = toRefs(props.data)

function showEditInput(event: { target: any; }, key: any, index: any) {
  editInputApp && removeEditInputApp
  if (!checkEditable(key)) return
  const target = event.target
  const oFrag = document.createDocumentFragment()
  editInputApp = createApp(EditInput, {
    value: target.textContent,
    setValue
  })
  if (editInputApp) {
    editInputApp.mount(oFrag)
    target.appendChild(oFrag)
    target.querySelector('input').select()
  }
  setData({ index, key, text: findText(key) })
}
function setData({ index, key, value = '', text }: any) {
  state.key = key
  state.index = index
  state.value = value
  state.text = text
}
/**
 * 查找key对应的text值
 * @param {*} key 
 */
function findText(key: any) {
  const { text } = tHead.value.find((item: { key: any; }) => item.key === key)
  return text
}
/**
 * update data of table cell
 * @param {*} value 
 */
function setValue(value: string) {
  state.value = value
  emit('submit', { ...state }, removeEditInputApp)
}
/**
 * remove editinput when target change
 */
function removeEditInputApp() {
  editInputApp && editInputApp.unmount()
  setData({
    index: -1,
    key: '',
    value: '',
    text: ''
  })
}
/**
 * check tHead.editable
 * @param {*} key 
 */
function checkEditable(key: any) {
  const { editable } = tHead.value.find((item: { key: any; }) => item.key === key)
  return editable
}
window.addEventListener('click', removeEditInputApp, false)

/**
 * check tHead.truncate
 * @param {*} key 
 */
function checkTruncate(key: any) {
  const { truncate } = tHead.value.find((item: { key: any; }) => item.key === key)
  if (truncate) {
    return 'truncate'
  }
  return ''
}

/**
 * check tHead.align
 * @param {*} key 
 */
function checkAlign(key: any) {
  const { align } = tHead.value.find((item: { key: any; }) => item.key === key)
  return 'text-' + align
}

/**
 * check tHead.width
 * @param {*} key 
 */
function checkWidth(key: any) {
  const { width } = tHead.value.find((item: { key: any; }) => item.key === key)
  return 'px-2' + ' ' + width
}

</script>
<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>