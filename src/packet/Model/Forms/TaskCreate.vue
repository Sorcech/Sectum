<template>
  <Form class="bg-base/5 space-y-3 w-full">
    <FormItem>
      <ipt v-model="TaskCreateForm.Name" class="w-full" :placeholder="t('task.name')" />
    </FormItem>
    <FormItem>
      <Date 
        v-model="TaskCreateForm.EndAt"
        class="w-full" 
        :placeholder="t('toolbar.date')"
        @select="handleDateSelect"
      ></Date>
    </FormItem>
    <FormItem>
      <Select 
        :options="projectOptions" 
        @select="handleProjectSelect"
        class="w-full" 
        :placeholder="t('project.project')"
      ></Select>
    </FormItem>
    <FormItem>
      <btn class="w-full" @click="TaskCreate(TaskCreateForm)">{{ t('toolbar.create') }}
      </btn>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n'
import Toast from '~/packet/Element/Toast/Toast';
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

// 项目选项（示例数据，实际应该从 API 或 props 获取）
const projectOptions = computed(() => [
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

// 处理项目选择
const handleProjectSelect = (value: any) => {
  TaskCreateForm.Project = value
}

// 处理日期选择
const handleDateSelect = (value: any) => {
  TaskCreateForm.EndAt = value
}

const TaskCreate = async (form: any) => {
  // 验证表单
  if (!form.Name || form.Name.trim() === '') {
    Toast({ type: "warning", message: t('task.pleaseEnterTaskTitle') })
    return
  }
  
  const param: TaskCreate = {
    Name: form.Name,
    "Project": form.Project,
    "EndAt": form.EndAt,
  }
  
  try {
    // 调用父组件传入的提交回调
    if (props.onSubmit) {
      const response = await props.onSubmit(param)
      // 如果成功，调用成功回调并重置表单
      if (props.onSuccess) {
        props.onSuccess(response)
      }
      // 重置表单
      TaskCreateForm.Name = ''
      TaskCreateForm.Project = 0
      TaskCreateForm.EndAt = ''
    } else {
      // 默认处理逻辑（如果没有传入回调）
      Toast({ type: "success", message: t('project.createSuccess') })
      // 重置表单
      TaskCreateForm.Name = ''
      TaskCreateForm.Project = 0
      TaskCreateForm.EndAt = ''
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