<template>
  <Form class="bg-base/5 space-y-3 w-full">
    <FormItem>
      <ipt class="w-full" :placeholder="t('task.name')" />
    </FormItem>
    <FormItem>
      <Date class="w-full" :placeholder="t('toolbar.date')"></Date>
    </FormItem>
    <FormItem>
      <Select class="w-full" :placeholder="t('project.type')"></Select>
    </FormItem>
    <FormItem>
      <btn class="w-full" @click="TaskCreate(TaskCreateForm)">{{ t('toolbar.create') }}
      </btn>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n'
import Message from '~/packet/Element/Message/Message';
// 定义任务创建表单的类型
interface TaskCreate {
  Name: string,
  Project: number,
  EndAt: string
}
// Props 定义
const props = defineProps<{
  onSubmit?: (formData: TaskCreate) => void | Promise<void>
  onSuccess?: (response: any) => void
  onError?: (error: any, response?: any) => void
}>()

const { t } = useI18n()
const TaskCreateForm = reactive({
  Name: '',
  Project: 0,
  EndAt: '',
})
const TaskCreate = async (form: any) => {
  const param: TaskCreate = {
    Name: form.Name,
    "Project": form.Project,
    "EndAt": form.EndAt,
  }
  
  try {
    // 调用父组件传入的提交回调
    if (props.onSubmit) {
      await props.onSubmit(param)
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