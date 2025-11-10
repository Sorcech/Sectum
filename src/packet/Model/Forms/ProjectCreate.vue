<template>
  <Form class="bg-base/5 space-y-3 w-full">
    <FormItem>
      <ipt v-model="project.Name" size="sm" class="w-full" :placeholder="t('project.name')" />
    </FormItem>
    <FormItem>
      <Select :options="options" @select="select" :placeholder="t('project.type')" class="w-full"></Select>
    </FormItem>
    <FormItem>
      <btn class="w-full" @click="handleSubmit">{{ t('toolbar.create') }}
      </btn>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n'
import Toast from '~/packet/Element/Toast/Toast';
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

// 使用 computed 来确保选项在语言切换时更新
const options = computed(() => [
  { label: t('project.order'), value: 0 },
  { label: t('project.train'), value: 1 },
  { label: t('project.section'), value: 2 },
  { label: t('project.assembly'), value: 3 },
  { label: t('project.source'), value: 4 },
  { label: t('project.machine'), value: 5 },
  { label: t('project.system'), value: 6 },
  { label: t('project.standard'), value: 7 },
  { label: t('project.industry'), value: 8 },
  { label: t('project.technology'), value: 9 },
])

const project: ProjectCreate = reactive({
  Type: 0,
  Name: '',
})
const select = (e: any) => {
  project.Type = e
}

const handleSubmit = async () => {
  // 验证表单
  if (!project.Name || project.Name.trim() === '') {
    Toast({ type: "error", message: t('project.nameRequired') })
    return
  }

  try {
    // 调用父组件传入的提交回调
    if (props.onSubmit) {
      const response = await props.onSubmit({ ...project })
      // 如果成功，调用成功回调并重置表单
      if (props.onSuccess) {
        props.onSuccess(response)
      }
      // 重置表单
      project.Name = ''
      project.Type = 0
    } else {
      // 默认处理逻辑（如果没有传入回调）
      Toast({ type: "success", message: t('project.createSuccess') })
    }
  } catch (error: any) {
    // 调用父组件传入的错误回调
    if (props.onError) {
      props.onError(error, error.response || error)
    } else {
      // 默认错误处理
      const errorMessage = error?.response?.data?.message || error?.data?.message || t('project.createFailed')
      Toast({ type: "error", message: errorMessage })
    }
  }
}
</script>