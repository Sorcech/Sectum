<template>
  <div class="flex flex-col p-2">
    <ipt :label="t('data.StorageId')" v-model="item.StorageId" disabled></ipt>
    <ipt :label="t('data.Name')" v-model="item.Name"></ipt>
    <ipt :label="t('data.Size')" v-model="item.Size"></ipt>
    <ipt :label="t('data.Type')" v-model="item.Type"></ipt>
    <ipt :label="t('data.Bucket')" v-model="item.Bucket"></ipt>
    <ipt :label="t('data.Link')" v-model="item.Link"></ipt>
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
import { StorageDetail } from '~/type/Sheet'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps<{
  item: StorageDetail
}>()
</script>~/type/Sheet