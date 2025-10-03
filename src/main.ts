import App from './App.vue'
import { createApp } from 'vue'
import Section from './packet'
import Router from './router'
import I18n from './locale'
import 'uno.css'
import '~/packet/Layout/scrollbar.css'


createApp(App).use(Router).use(Section).use(I18n).mount('#app')
