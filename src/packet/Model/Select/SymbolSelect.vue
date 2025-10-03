<template>
  <Select :options="sheet" :selected="selected" fieldLabel="Model" fieldValue="StandardId" @select="select"
    :disabled="disabled"></Select>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { Sheet } from '~/store/sheet/sheet'
defineProps({
  selected: { type: String, required: false },
  disabled: { type: Boolean, default: false, required: false }
})
const sheet: any[] = reactive([])
onMounted(() => {
  Sheet.SymbolSelect().then((res: any) => {
    sheet.length = 0
    sheet.push(...res.data.data)
  }).catch(reason => {
    console.log(reason)
  })
})

const select = (e: any) => {
  console.log(e);
}
</script>