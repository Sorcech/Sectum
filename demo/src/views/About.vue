<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-primary mb-4">关于我们</h1>
      <p class="text-lg text-base-content/70">了解我们的团队和使命</p>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">公司简介</h2>
        <p class="text-base-content/80 leading-relaxed mb-4">
          我们是一家专注于创新技术和优质服务的企业，致力于为客户提供最优秀的产品和解决方案。
          多年来，我们始终坚持"客户至上，创新驱动"的理念，不断突破自我，追求卓越。
        </p>
        <p class="text-base-content/80 leading-relaxed">
          我们的团队由经验丰富的技术专家和行业精英组成，具备强大的研发能力和服务能力，
          能够为不同规模的客户提供专业的定制化服务。
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- 价值观 1 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
          <icn name="lightbulb" solid xl color="primary" class="mb-4" />
          <h2 class="card-title">创新</h2>
          <p class="text-base-content/70">持续创新，引领行业发展</p>
        </div>
      </div>

      <!-- 价值观 2 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
          <icn name="handshake" solid xl color="primary" class="mb-4" />
          <h2 class="card-title">诚信</h2>
          <p class="text-base-content/70">诚信经营，客户至上</p>
        </div>
      </div>

      <!-- 价值观 3 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
          <icn name="trophy" solid xl color="primary" class="mb-4" />
          <h2 class="card-title">卓越</h2>
          <p class="text-base-content/70">追求卓越，精益求精</p>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">联系方式</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center gap-3">
            <icn name="envelope" solid lg color="primary" />
            <div>
              <p class="font-semibold">邮箱</p>
              <p class="text-base-content/70">contact@example.com</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <icn name="phone" solid lg color="primary" />
            <div>
              <p class="font-semibold">电话</p>
              <p class="text-base-content/70">400-123-4567</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <icn name="map-marker-alt" solid lg color="primary" />
            <div>
              <p class="font-semibold">地址</p>
              <p class="text-base-content/70">北京市朝阳区XXX街道XXX号</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <icn name="clock" solid lg color="primary" />
            <div>
              <p class="font-semibold">工作时间</p>
              <p class="text-base-content/70">周一至周五 9:00-18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 关于我们页面
</script>

