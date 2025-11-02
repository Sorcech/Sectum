<template>
  <div class="flex flex-col p-2">
    <ipt :label="t('data.TaskId')" v-model="item.TaskId" disabled></ipt>
    <ipt :label="t('data.Title')" v-model="item.Title"></ipt>
    <ipt :label="t('data.Completed')" v-model="item.IsCompleted"></ipt>
    <MemberSelect :label="t('data.Sponsor')" :selected="item.Sponsor"></MemberSelect>
    <MemberSelect :label="t('data.Executor')" :selected="item.Executor"></MemberSelect>
    <ipt :label="t('data.Profile')" v-model="item.Profile"></ipt>
    <ipt :label="t('data.StartAt')" v-model="item.StartAt"></ipt>
    <ipt :label="t('data.EndAt')" v-model="item.EndAt"></ipt>
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
import type { TaskDetail } from '~/type/Sheet'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps<{
  item: TaskDetail
}>()
</script>~/type/Sheet