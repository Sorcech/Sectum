<template>
  <div class="flex flex-col p-2">
    <ipt :label="t('data.Code')" v-model="item.Code" disabled></ipt>
    <ipt :label="t('data.Ver')" v-model="item.Ver" disabled></ipt>
    <ipt :label="t('data.Name')" v-model="item.Name"></ipt>
    <ipt :label="t('data.Contact')" v-model="item.Contact"></ipt>
    <ipt :label="t('data.Phone')" v-model="item.Phone"></ipt>
    <ipt :label="t('data.Gender')" v-model="item.Gender"></ipt>
    <Date :label="t('data.Birthday')" :selected="item.Birthday"></Date>
    <ipt :label="t('data.Detail')" v-model="item.Detail"></ipt>
    <ipt :label="t('data.Address')" v-model="item.Address"></ipt>
    <ipt :label="t('data.Website')" v-model="item.Website"></ipt>
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
import type { InterlinkDetail } from '~/type/Sheet'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps<{
  item: InterlinkDetail
}>()
</script>~/type/Sheet