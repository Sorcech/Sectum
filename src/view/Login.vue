<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="flex justify-center h-screen">
      <div class="hidden bg-cover lg:block lg:w-2/3" style="
                  background-image: url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
                ">
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 class="text-4xl font-bold text-white">{{ config.project.name }}</h2>
            <p class="max-w-xl mt-3 text-gray-300">
              Welcome to Login {{ config.project.name }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1">
          <div class="text-center">
            <h2 class="text-4xl font-bold text-center text-gray-700 dark:text-white">
              {{ config.project.name }}
            </h2>
            <p class="mt-3 text-gray-500 dark:text-gray-300">
              Sign in to access your account
            </p>
          </div>
          <div class="mt-8">
            <LoginForm v-model="account" @submit="login" />
            <p class="mt-6 text-sm text-center text-gray-400">
              Don&#x27;t have an account yet?
              <btn to="/" variant="link" size="sm">
                Sign up
              </btn>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
// import { useRouter } from 'vue-router'; // 使用 window.location.href 跳转，不需要 router
// import { Store } from 'sectum' // 将在实际登录逻辑中使用
import config from '~/config/config'
import LoginForm from '~/packet/Model/Forms/LoginForm.vue'

interface AccountInfo {
  Passport: string
  Password: string
}

const account = reactive<AccountInfo>({
  Passport: '',
  Password: ''
})

const login = () => {
  // TODO: 实现登录逻辑
  // 示例：可以在这里调用登录API
  // Account.Login(account).then((res: any) => {
  //   Store.setLocalStorage('Token', res.data.data.Token)
  //   Store.setLocalStorage('Expire', res.data.data.Expire)
  //   window.location.href = '/console/dashboard'
  // }).catch((reason) => {
  //   console.error(reason)
  // })
  
  // 临时：直接跳转到控制台（用于演示）
  // 可以在这里添加实际的登录逻辑
  
  // 使用 window.location.href 强制刷新页面，确保页面正确跳转
  // 这样可以绕过 Vue Router 的响应式系统，确保页面正确渲染
  window.location.href = '/console/dashboard'
}
</script>

