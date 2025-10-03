<template>
  <div class="flex flex-col p-2">
    <ipt :label="t('data.Code')" v-model="item.Code" disabled></ipt>
    <ipt :label="t('data.Ver')" v-model="item.Ver" disabled></ipt>
    <ipt :label="t('data.Name')" v-model="item.Name" disabled></ipt>
    <ipt :label="t('data.Model')" v-model="item.Model"></ipt>
    <ipt :label="t('data.Unit')" v-model="item.Unit"></ipt>
    <ipt :label="t('data.Detail')" v-model="item.Detail"></ipt>
    <ipt :label="t('data.Mass')" v-model="item.Mass"></ipt>
    <MaterialSelect :label="t('data.Material')" :selected="item.Material"></MaterialSelect>
    <SurfaceSelect :label="t('data.Surface')" :selected="item.Surface"></SurfaceSelect>
    <StandardSelect :label="t('data.Standard')" :selected="item.Standard"></StandardSelect>
    <SymbolSelect :label="t('data.Symbol')" :selected="item.Symbol"></SymbolSelect>
    <Select :label="t('data.Brand')" :options="item.Select" :selected="selectBrand" fieldLabel="Brand"
      fieldValue="BrandId" @selectIndex="selectedBrand" :disabled="isBrands"></Select>
    <Select :label="t('data.Select')" :options="selectModels" :selected="selectModel" fieldLabel="Model"
      fieldValue="Model" @selectIndex="selectedModel" :disabled="isModels"></Select>
    <ipt :label="t('data.Cost')" v-model="selectCost" disabled></ipt>
    <ipt :label="t('data.Price')" v-model="selectPrice" disabled></ipt>
    <File :label="t('data.File')" :files="item.File"></File>
    <MemberSelect :label="t('data.DesignBy')" :selected="item.DesignBy"></MemberSelect>
    <Date :label="t('data.DesignAt')" :selected="item.DesignAt"></Date>
    <MemberSelect :label="t('data.DraftBy')" :selected="item.DraftBy"></MemberSelect>
    <Date :label="t('data.DraftAt')" :selected="item.DraftAt"></Date>
    <MemberSelect :label="t('data.InspectBy')" :selected="item.InspectBy"></MemberSelect>
    <Date :label="t('data.InspectAt')" :selected="item.InspectAt"></Date>
    <MemberSelect :label="t('data.DirectBy')" :selected="item.DirectBy"></MemberSelect>
    <Date :label="t('data.DirectAt')" :selected="item.DirectAt"></Date>
    <MemberSelect :label="t('data.CreateBy')" :selected="item.CreateBy"></MemberSelect>
    <Date :label="t('data.CreateAt')" :selected="item.CreateAt"></Date>
    <MemberSelect :label="t('data.UpdateBy')" :selected="item.UpdateBy"></MemberSelect>
    <Date :label="t('data.UpdateAt')" :selected="item.UndateAt"></Date>
    <MemberSelect :label="t('data.DeleteBy')" :selected="item.DeleteBy"></MemberSelect>
    <Date :label="t('data.DeleteAt')" :selected="item.DeleteAt"></Date>
    <ipt :label="t('data.Remark')" v-model="item.Remark"></ipt>
    <btn>{{ t('data.Update') }}</btn>
  </div>
</template>
<script lang="ts" setup>
import { PartDetail } from '~/type/Sheet'
import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue';
const { t } = useI18n()
const props = defineProps<{
  item: PartDetail
}>()
const isBrands = ref(false)
const isModels = ref(false)
const selectModels = ref()
const selectBrand = ref()
const selectModel = ref()
const selectCost = ref()
const selectPrice = ref()
const selectIndex = ref()
const selectModelIndex = ref()
watch(() => props.item, async () => {
  if (props.item) {
    selectBrand.value = props.item.Select[0].Brand
    selectModel.value = props.item.Select[0].Purchase[0].Model
    selectCost.value = props.item.Select[0].Purchase[0].Cost
    selectPrice.value = props.item.Select[0].Purchase[0].Price
    selectModels.value = props.item.Select[0].Purchase
    if (props.item.Select.length <= 1) {
      isBrands.value = true
    }
    if (props.item.Select[0].Purchase.length <= 1) {
      isModels.value = true
    }
  }
})
const selectedBrand = (e: number) => {
  selectIndex.value = e
  selectModels.value = null
  selectModels.value = props.item.Select[selectIndex.value].Purchase
  selectModel.value = props.item.Select[selectIndex.value].Purchase[0].Model
  selectCost.value = props.item.Select[selectIndex.value].Purchase[0].Cost
  selectPrice.value = props.item.Select[selectIndex.value].Purchase[0].Price

  if (props.item.Select[selectIndex.value].Purchase.length <= 1) {
    isModels.value = true
  }
}
const selectedModel = (e: number) => {
  selectModelIndex.value = e
  selectPrice.value = props.item.Select[selectIndex.value].Purchase[selectModelIndex.value].Price
}

</script>~/type/Sheet