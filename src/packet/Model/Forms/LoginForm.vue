<template>
  <form @submit.prevent="handleSubmit" class="w-full">
    <div class="mt-6 w-full login-form-item">
      <ipt 
        class="w-full"
        :model-value="modelValue.Passport"
        @update:model-value="updatePassport"
        type="text" 
        label="Passport"
        bordered
        color="default"
        placeholder="Enter your passport"
      />
    </div>
    <div class="mt-6 w-full login-form-item">
      <ipt 
        class="w-full"
        :model-value="modelValue.Password"
        @update:model-value="updatePassword"
        type="password" 
        label="Password"
        bordered
        color="default"
        placeholder="Enter your password"
      />
    </div>
    <div class="mt-6">
      <btn type="submit" color="primary" size="md" class="w-full">
        Login
      </btn>
    </div>
  </form>
</template>

<script lang="ts" setup>
interface AccountInfo {
  Passport: string
  Password: string
}

interface Props {
  modelValue: AccountInfo
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: AccountInfo]
  'submit': []
}>()

const updatePassport = (value: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    Passport: value
  })
}

const updatePassword = (value: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    Password: value
  })
}

const handleSubmit = () => {
  emit('submit')
}
</script>

<style scoped>
.login-form-item :deep(div) {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.login-form-item :deep(label) {
  width: 6rem; /* w-24 = 6rem */
  min-width: 6rem;
  flex-shrink: 0;
  margin-right: 0.75rem; /* 添加右边距 */
}

.login-form-item :deep(input) {
  flex: 1;
  min-width: 0;
  border: 1px solid rgb(209 213 219); /* gray-300 */
  border-radius: 0.375rem; /* rounded-md */
}

</style>

