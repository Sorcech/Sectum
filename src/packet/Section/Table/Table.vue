<template>
  <div :class="containerClasses">
    <table :class="headerTableClasses">
      <thead>
        <tr :class="headerRowClasses">
          <th v-for="info of props.data.tableHead" :key="info.key" :class="headerCellClasses(info.key)">
            {{ info.text }}
          </th>
          <th :class="moreHeaderCellClasses">More</th>
        </tr>
      </thead>
    </table>
    <div :class="bodyContainerClasses">
      <table :class="bodyTableClasses">
        <tbody>
          <tr v-for="(item, index) of props.data.tableBody" :key="item.id" :class="bodyRowClasses">
            <td v-for="(value, key) in item" :key="key" 
                @click.stop="showEditInput($event, key, index)"
                :class="bodyCellClasses(key)" 
                @click="print(key)">
              {{ value }}
            </td>
            <td :class="moreBodyCellClasses">
              <btn variant="link" class="h-5">More</btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <table :class="footerTableClasses">
      <tfoot>
        <tr :class="footerRowClasses">
          <td>Quantity: {{ quantity }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script setup lang="ts">
import { createApp, reactive, App, computed } from 'vue'
import EditInput from './EditInput.vue'

let editInputApp: App<Element> | null = null
const state = reactive({ key: '', value: '', index: -1, text: '' })
const props = defineProps({
  data: { type: Object, default: { tableHead: [], tableBody: [] }, required: true },
  quantity: { type: Number, default: 0, required: false }
})

// 容器样式
const containerClasses = computed(() => {
  return 'px-3 pt-2 h-screen'
})

// 表头表格样式
const headerTableClasses = computed(() => {
  return 'w-full m-0 text-center table-fixed fixed-thead z-10'
})

// 表头行样式
const headerRowClasses = computed(() => {
  return 'bg-base-200 border-b-1 h-12 shadow shadow-lg !w-10'
})

// 表头单元格样式
const headerCellClasses = computed(() => {
  return (key: any) => {
    return [
      'font-medium text-base-content',
      checkWidth(key)
    ].filter(Boolean).join(' ')
  }
})

// More 表头单元格样式
const moreHeaderCellClasses = computed(() => {
  return 'font-medium text-base-content w-15'
})

// 表格体容器样式
const bodyContainerClasses = computed(() => {
  return 'overflow-y-auto w-full h-8/9 scrollbar-hide'
})

// 表格体表格样式
const bodyTableClasses = computed(() => {
  return 'w-full m-0 table-fixed'
})

// 表格体行样式
const bodyRowClasses = computed(() => {
  return 'bg-base-100 h-8 hover:bg-base-200'
})

// 表格体单元格样式
const bodyCellClasses = computed(() => {
  return (key: any) => {
    return [
      'relative border-1 hover:bg-base-300 font-thin text-current text-base whitespace-nowrap p-4 align-middle',
      checkTruncate(key),
      checkAlign(key),
      checkWidth(key)
    ].filter(Boolean).join(' ')
  }
})

// More 表格体单元格样式
const moreBodyCellClasses = computed(() => {
  return 'text-center w-15 !h-5 border-1'
})

// 表尾表格样式
const footerTableClasses = computed(() => {
  return 'w-full text-center table-fixed'
})

// 表尾行样式
const footerRowClasses = computed(() => {
  return 'bg-base-200 border-b-1 h-10'
})
function showEditInput(event: { target: any; }, key: any, index: any) {
  editInputApp && removeEditInputApp()
  if (!checkEditable(key)) return
  const target = event.target
  editInputApp = createApp(EditInput, {
    value: target.textContent,
    setValue
  })
  if (editInputApp) {
    editInputApp.mount(target)
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
  const { text } = props.data.tableHead.value.find((item: { key: any; }) => item.key === key)
  return text
}
/**
 * update data of table cell
 * @param {*} value 
 */
function setValue(value: string) {
  state.value = value
  editData({ ...state }, removeEditInputApp)
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
  const editable = props.data.tableHead.find((item: { key: any; }) => item.key === key)
  return editable
}
window.addEventListener('click', removeEditInputApp, false)

/**
 * check tableHead.truncate
 * @param {*} key 
 */
function checkTruncate(key: any) {
  const arr = JSON.parse(JSON.stringify(props.data.tableHead))
  const truncate = arr.find((item: { key: any; }) => item.key === key)
  return truncate.truncate ? 'truncate' : ''
}

/**
 * check tableHead.align
 * @param {*} key 
 */
function checkAlign(key: any) {
  const arr = JSON.parse(JSON.stringify(props.data.tableHead))
  const align = arr.find((item: { key: any; }) => item.key === key)
  return 'text-' + align.align
}

/**
 * check tableHead.width
 * @param {*} key 
 */
function checkWidth(key: any) {
  const arr = JSON.parse(JSON.stringify(props.data.tableHead))
  const width = arr.find((item: { key: any; }) => item.key === key)
  return 'px-2' + ' ' + width.width
}
const editData = ({ index, key, value, text }: any, removeInput: () => void) => {
  removeInput()
  if (props.data.tableBody[index][key] != value) {
    const cfm = window.confirm(`
    您确定将数据下表第${index}项${text}字段的内容修改为${value}吗？`)
    if (cfm) {
      props.data.tableBody = props.data.tableBody.map((item: { [x: string]: any; }, idx: any) => {
        index === idx && (item[key] = value)
        return item
      })
    } else {
      removeInput()
    }
  }
}
const print = (key: any) => {
  props.data.tableHead[key].align
}
</script>
<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
</style>