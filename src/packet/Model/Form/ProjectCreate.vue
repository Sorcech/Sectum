<template>
  <Form class="bg-base/5 space-y-3 w-full">
    <FormItem>
      <ipt v-model="project.Name" size="sm" class="w-full" :placeholder="t('project.name')" />
    </FormItem>
    <FormItem>
      <Select :options="state.options" @select="select" :placeholder="t('project.type')" class="w-full"></Select>
    </FormItem>
    <FormItem>
      <btn class="w-full" @click="ProjectCreate(project)">{{ t('toolbar.create') }}
      </btn>
    </FormItem>
    <div class="pt-5">
      {{ project }}
    </div>
  </Form>
</template>
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n'
import Message from '~/packet/Element/Message/Message';
// 定义项目创建表单的类型
interface ProjectCreate {
  Type: number,
  Name: string,
}
// Props 定义
const props = defineProps<{
  onSubmit?: (formData: ProjectCreate) => void | Promise<void>
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

const project: ProjectCreate = reactive({
  Type: 0,
  Name: '',
})
const select = (e: any) => {
  project.Type = e
}
const ProjectCreate = async (project: ProjectCreate) => {
  try {
    // 调用父组件传入的提交回调
    if (props.onSubmit) {
      await props.onSubmit(project)
    } else {
      // 默认处理逻辑（如果没有传入回调）
      Message({ type: "success", message: t('project.create') })
    }
  } catch (error: any) {
    // 调用父组件传入的错误回调
    if (props.onError) {
      props.onError(error, error.response || error)
    } else {
      // 默认错误处理
      const errorMessage = error?.response?.data?.message || error?.data?.message || '创建失败'
      Message({ type: "error", message: errorMessage })
    }
  }
}
</script>~/type/type~/type/type