<template>
  <div class="flex flex-col p-4 space-y-4">
    <ipt :label="t('project.code')" v-model="formData.Code" disabled></ipt>
    <ipt :label="t('project.version')" v-model="formData.Ver" disabled></ipt>
    <ipt :label="t('project.name')" v-model="formData.Name"></ipt>
    <ipt :label="t('project.purpose')" v-model="formData.Purpose"></ipt>
    <ipt :label="t('project.target')" v-model="formData.Target"></ipt>
    <ipt :label="t('project.remark')" v-model="formData.Remark"></ipt>
    <div class="flex gap-2 pt-2">
      <btn color="primary" @click="handleUpdate">{{ t('common.save') }}</btn>
      <btn variant="outline" @click="handleCancel">{{ t('common.cancel') }}</btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ProjectDetail } from '~/type'

interface Props {
  item: ProjectDetail
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update': [data: ProjectDetail]
  'cancel': []
}>()

const { t } = useI18n()

const formData = reactive<ProjectDetail>({
  ProjectId: props.item.ProjectId,
  Code: props.item.Code,
  Ver: props.item.Ver,
  Name: props.item.Name || '',
  Purpose: props.item.Purpose || '',
  Target: props.item.Target || '',
  Remark: props.item.Remark || '',
  CreateBy: props.item.CreateBy,
  CreateAt: props.item.CreateAt,
  InspectBy: props.item.InspectBy,
  InspectAt: props.item.InspectAt,
  DirectBy: props.item.DirectBy,
  DirectAt: props.item.DirectAt,
  UpdateBy: props.item.UpdateBy,
  UndateAt: props.item.UndateAt,
  DeleteBy: props.item.DeleteBy,
  DeleteAt: props.item.DeleteAt,
})

// 监听 props 变化，更新表单数据
watch(() => props.item, (newItem) => {
  Object.assign(formData, {
    ProjectId: newItem.ProjectId,
    Code: newItem.Code,
    Ver: newItem.Ver,
    Name: newItem.Name || '',
    Purpose: newItem.Purpose || '',
    Target: newItem.Target || '',
    Remark: newItem.Remark || '',
    CreateBy: newItem.CreateBy,
    CreateAt: newItem.CreateAt,
    InspectBy: newItem.InspectBy,
    InspectAt: newItem.InspectAt,
    DirectBy: newItem.DirectBy,
    DirectAt: newItem.DirectAt,
    UpdateBy: newItem.UpdateBy,
    UndateAt: newItem.UndateAt,
    DeleteBy: newItem.DeleteBy,
    DeleteAt: newItem.DeleteAt,
  })
}, { deep: true })

const handleUpdate = () => {
  emit('update', { ...formData })
}

const handleCancel = () => {
  // 重置表单数据
  Object.assign(formData, {
    ProjectId: props.item.ProjectId,
    Code: props.item.Code,
    Ver: props.item.Ver,
    Name: props.item.Name || '',
    Purpose: props.item.Purpose || '',
    Target: props.item.Target || '',
    Remark: props.item.Remark || '',
  })
  emit('cancel')
}
</script>

