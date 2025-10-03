<template>
  <Form class="bg-base/5 space-y-3 w-full">
    <FormItem>
      <ipt v-model="ProjectCreateForm.Abbr" size="sm" class="w-full" :placeholder="t('project.abbr')" />
    </FormItem>
    <FormItem>
      <ipt v-model="ProjectCreateForm.Name" size="sm" class="w-full" :placeholder="t('project.name')" />
    </FormItem>
    <FormItem>
      <txa v-model="ProjectCreateForm.Profile" class="w-full" resize="resize-y" :placeholder="t('project.profile')">
      </txa>
    </FormItem>
    <FormItem>
      <Select :options="options" @select="select" :placeholder="t('project.type')" class="w-full"></Select>
    </FormItem>
    <FormItem>
      <Date @select="selectDate" class="w-full" :placeholder="t('toolbar.date')">
      </Date>
    </FormItem>
    <FormItem>
      <btn :disabled="btnEnable" class="w-full" @click="ProjectCreate(ProjectCreateForm)">{{ t('toolbar.create') }}
      </btn>
    </FormItem>
    <div class="pt-5">
      {{ ProjectCreateForm }}
    </div>
  </Form>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import Message from '~/packet/Element/Message/Message';
// Props 定义
const props = defineProps<{
  onSubmit?: (formData: any) => void | Promise<void>
  onSuccess?: (response: any) => void
  onError?: (error: any, response?: any) => void
}>()

const { t } = useI18n()
const state = reactive({
  options: [
    { label: computed(() => t('project.order')), value: 0 },
    { label: computed(() => t('project.train')), value: 1 },
    { label: computed(() => t('project.section')), value: 2 },
    { label: computed(() => t('project.assembly')), value: 3 },
    { label: computed(() => t('project.source')), value: 4 },
    { label: computed(() => t('project.machine')), value: 5 },
    { label: computed(() => t('project.system')), value: 6 },
    { label: computed(() => t('project.standard')), value: 7 },
    { label: computed(() => t('project.industry')), value: 8 },
    { label: computed(() => t('project.technology')), value: 9 },
  ]
})
const { options } = state

const ProjectCreateForm = reactive({
  Type: 0,
  Abbr: '',
  Name: '',
  Profile: '',
  EndAt: '',
})
const select = (e: any) => {
  ProjectCreateForm.Type = e
}
const selectDate = (e: any) => {
  ProjectCreateForm.EndAt = e
}
const btnEnable = ref(false)
const ProjectCreate = async (form: any) => {
  const param = {
    "Type": form.Type,
    "Abbr": form.Abbr,
    "Name": form.Name,
    "Profile": form.Profile,
    "EndAt": form.EndAt,
  }
  
  try {
    // 调用父组件传入的提交回调
    if (props.onSubmit) {
      await props.onSubmit(param)
    } else {
      // 默认处理逻辑（如果没有传入回调）
      Message({ type: 'success', message: t('project.create') })
    }
  } catch (error: any) {
    // 调用父组件传入的错误回调
    if (props.onError) {
      props.onError(error, error.response || error)
    } else {
      // 默认错误处理
      const errorMessage = error?.response?.data?.message || error?.data?.message || '创建失败'
      Message({ type: 'error', message: errorMessage })
    }
  }
}
</script>