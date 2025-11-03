<template>
  <div class="space-y-0">
    <!-- Hero 轮播图区域 -->
    <section class="mb-16">
      <Carousel 
        :autoplay="config.carousel.autoplay" 
        :interval="config.carousel.interval"
        :pause-on-hover="config.carousel.pauseOnHover"
        :height="config.carousel.height"
        class="rounded-lg overflow-hidden"
      >
        <div 
          v-for="(slide, index) in heroSlides" 
          :key="index"
          class="relative h-full flex items-center justify-center bg-gradient-to-r from-primary/90 to-secondary/90"
          :style="slide.image ? { backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
        >
          <div class="absolute inset-0 bg-black/20"></div>
          <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h2 class="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              {{ t(slide.title) }}
            </h2>
            <p class="text-xl md:text-2xl text-white/90 mb-8">
              {{ t(slide.description) }}
            </p>
            <btn 
              color="primary" 
              size="lg"
              class="text-lg px-8 py-3"
              @click="slide.link && router.push(slide.link)"
            >
              {{ t('home.learnMore') }}
            </btn>
          </div>
        </div>
      </Carousel>
    </section>

    <!-- 产品特色区域 -->
    <section class="py-16 bg-base-100">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-primary mb-4">{{ t('home.features') }}</h2>
          <p class="text-lg text-base-content/70">{{ t('home.featuresDesc') }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div class="card-body items-center text-center">
              <div class="mb-4 p-4 bg-primary/10 rounded-full">
                <icn :name="feature.icon" solid xl color="primary" />
              </div>
              <h3 class="card-title text-xl mb-2">{{ t(feature.title) }}</h3>
              <p class="text-base-content/70">{{ t(feature.description) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据统计区域 -->
    <section class="py-16 bg-primary text-primary-content">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div 
            v-for="(stat, index) in statistics" 
            :key="index"
            class="space-y-2"
          >
            <div class="text-4xl md:text-5xl font-bold">{{ stat.value }}</div>
            <div class="text-lg opacity-90">{{ t(stat.label) }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 解决方案预览 -->
    <section class="py-16 bg-base-100">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-primary mb-4">{{ t('home.solutions') }}</h2>
          <p class="text-lg text-base-content/70">{{ t('home.solutionsDesc') }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(solution, index) in solutions" 
            :key="index"
            class="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div class="card-body">
              <h3 class="card-title text-2xl mb-3">
                <icn :name="solution.icon" solid lg color="primary" class="mr-2" />
                {{ t(solution.title) }}
              </h3>
              <p class="text-base-content/70 mb-4">{{ t(solution.description) }}</p>
              <div class="card-actions justify-end">
                <btn color="primary" variant="outline">
                  {{ t('home.learnMore') }}
                </btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 行动号召区域 -->
    <section class="py-20 bg-gradient-to-r from-primary to-secondary text-primary-content">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">{{ t('home.ctaTitle') }}</h2>
        <p class="text-xl mb-8 opacity-90">{{ t('home.ctaDesc') }}</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <btn 
            size="lg" 
            color="base-100"
            class="text-lg px-8 py-3"
            @click="$router.push('/product')"
          >
            {{ t('home.viewProducts') }}
          </btn>
          <btn 
            size="lg" 
            variant="outline"
            class="text-lg px-8 py-3 border-2 border-primary-content text-primary-content hover:bg-primary-content hover:text-primary"
            @click="$router.push('/about')"
          >
            {{ t('home.contactUs') }}
          </btn>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Carousel } from 'sectum'
import config from '../config/config'

const { t } = useI18n()
const router = useRouter()

// Hero 轮播图数据（从配置文件读取）
const heroSlides = computed(() => config.carousel.slides)

// 产品特色
const features = computed(() => [
  {
    icon: 'rocket',
    title: 'home.feature1.title',
    description: 'home.feature1.desc'
  },
  {
    icon: 'shield-alt',
    title: 'home.feature2.title',
    description: 'home.feature2.desc'
  },
  {
    icon: 'cog',
    title: 'home.feature3.title',
    description: 'home.feature3.desc'
  }
])

// 数据统计
const statistics = computed(() => [
  {
    value: '1000+',
    label: 'home.stat1'
  },
  {
    value: '50+',
    label: 'home.stat2'
  },
  {
    value: '24/7',
    label: 'home.stat3'
  },
  {
    value: '99%',
    label: 'home.stat4'
  }
])

// 解决方案
const solutions = computed(() => [
  {
    icon: 'building',
    title: 'home.solution1.title',
    description: 'home.solution1.desc'
  },
  {
    icon: 'users',
    title: 'home.solution2.title',
    description: 'home.solution2.desc'
  }
])
</script>
