<template>
  <div class="container mx-auto px-6 py-12">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-primary mb-4">用户中心</h1>
        <p class="text-lg text-base-content/70">管理您的账户信息</p>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title mb-4">个人信息</h2>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-24">
                  <span class="text-3xl">用户</span>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-semibold">用户名</h3>
                <p class="text-base-content/70">user@example.com</p>
              </div>
            </div>
            <div class="divider"></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text">姓名</span>
                </label>
                <input type="text" placeholder="请输入姓名" class="input input-bordered w-full" />
              </div>
              <div>
                <label class="label">
                  <span class="label-text">邮箱</span>
                </label>
                <input type="email" placeholder="请输入邮箱" class="input input-bordered w-full" />
              </div>
              <div>
                <label class="label">
                  <span class="label-text">电话</span>
                </label>
                <input type="tel" placeholder="请输入电话" class="input input-bordered w-full" />
              </div>
              <div>
                <label class="label">
                  <span class="label-text">公司</span>
                </label>
                <input type="text" placeholder="请输入公司名称" class="input input-bordered w-full" />
              </div>
            </div>
            <div class="card-actions justify-end mt-6">
              <btn color="primary">保存修改</btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 用户中心页面
</script>

