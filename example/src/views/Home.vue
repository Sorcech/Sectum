<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-primary mb-4">欢迎使用 Sectum UI</h1>
      <p class="text-lg text-base-content/70">一个现代化的 Vue 3 组件库</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 按钮示例 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">按钮组件</h2>
          <div class="space-y-2">
            <btn>默认按钮</btn>
            <btn variant="primary">主要按钮</btn>
            <btn variant="secondary">次要按钮</btn>
            <btn variant="outline">轮廓按钮</btn>
          </div>
        </div>
      </div>

      <!-- 输入框示例 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">输入框组件</h2>
          <div class="space-y-2">
            <ipt v-model="inputValue" placeholder="请输入内容" />
            <txa v-model="textareaValue" placeholder="请输入多行文本" />
          </div>
        </div>
      </div>

      <!-- 表单示例 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">表单组件</h2>
          <Form>
            <FormItem>
              <ipt v-model="formData.name" placeholder="姓名" />
            </FormItem>
            <FormItem>
              <Select :options="options" v-model="formData.type" placeholder="选择类型" />
            </FormItem>
            <FormItem>
              <btn @click="submitForm" variant="primary">提交</btn>
            </FormItem>
          </Form>
        </div>
      </div>

      <!-- 开关示例 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">开关组件</h2>
          <div class="space-y-2">
            <tgl v-model="toggleValue" />
            <ckb v-model="checkboxValue" label="复选框" />
          </div>
        </div>
      </div>

      <!-- 图标示例 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">图标组件</h2>
          <div class="flex space-x-2">
            <icn name="home" />
            <icn name="user" />
            <icn name="settings" />
            <icn name="heart" />
          </div>
        </div>
      </div>

      <!-- 主题组件 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">主题组件</h2>
          <div class="flex space-x-2">
            <ThemeSelect />
            <DarkChange />
            <LanguageSelect />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, FormItem, Select } from 'sectum'

const inputValue = ref('')
const textareaValue = ref('')
const toggleValue = ref(false)
const checkboxValue = ref(false)

const formData = ref({
  name: '',
  type: ''
})

const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]

const submitForm = () => {
  console.log('提交表单:', formData.value)
}
</script>
