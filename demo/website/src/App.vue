<template>
  <div class="min-h-screen bg-base-300">
    <Header 
      :project-name="config.project.name"
      :theme-component="Theme"
      :dark-component="DarkToggle"
      :language-component="Language"
      :nav-items="navItems"
      nav-items-gap="8rem"
      :user-link="config.user.profileLink"
    />
    <div class="flex min-h-screen flex-col">
      <main class="flex-1 min-w-0 overflow-hidden">
        <RouterView />
      </main>
      <Footer 
        :sitemap-links="footerLinks"
        :copyright-holder="config.footer.copyrightHolder"
        :additional-info="config.footer.additionalInfo"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Header, Footer, Theme, DarkToggle, Language } from 'sectum'
import config from './config/config'

const { t } = useI18n()

// Header 导航菜单配置（支持国际化）
const navItems = computed(() => [
  { title: t('nav.home'), path: '/' },
  { title: t('nav.product'), path: '/product' },
  { title: t('nav.solution'), path: '/solution' },
  { title: t('nav.service'), path: '/service' },
  { title: t('nav.about'), path: '/about' }
])

// Footer 网站地图链接配置（支持国际化）
const footerLinks = computed(() => [
  {
    title: t('footer.product'),
    links: [
      { title: t('footer.productSelection'), path: '/product/selection' },
      { title: t('footer.electricRoller'), path: '/product/electric-roller' },
      { title: t('footer.drivenRoller'), path: '/product/driven-roller' },
      { title: t('footer.driveModule'), path: '/product/drive-module' },
      { title: t('footer.gatewayModule'), path: '/product/gateway-module' }
    ]
  },
  {
    title: t('footer.solution'),
    links: [
      { title: t('footer.enterpriseSolution'), path: '/solution/enterprise' },
      { title: t('footer.smbSolution'), path: '/solution/smb' }
    ]
  },
  {
    title: t('footer.service'),
    links: [
      { title: t('footer.support'), path: '/service/support' },
      { title: t('footer.training'), path: '/service/training' },
      { title: t('footer.maintenance'), path: '/service/maintenance' }
    ]
  },
  {
    title: t('footer.about'),
    links: [
      { title: t('footer.companyIntro'), path: '/about' },
      { title: t('footer.contact'), path: '/about#contact' }
    ]
  }
])

const routes = [
  {
    path: '/',
    meta: { title: '首页' },
    children: [
      {
        path: '/',
        meta: { title: '欢迎' }
      }
    ]
  }
]
</script>
