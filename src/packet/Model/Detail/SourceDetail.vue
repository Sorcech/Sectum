<template>
  <div class="flex flex-col p-2">
    <ipt :label="t('data.Code')" v-model="item.Code" disabled></ipt>
    <ipt :label="t('data.Ver')" v-model="item.Ver" disabled></ipt>
    <ipt :label="t('data.Name')" v-model="item.Name"></ipt>
    <ipt :label="t('data.Model')" v-model="item.Model"></ipt>
    <ipt :label="t('data.Detail')" v-model="item.Detail"></ipt>
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
import type { SourceDetail } from '~/type/Sheet'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps<{
  item: SourceDetail
}>()
</script>~/type/Sheet