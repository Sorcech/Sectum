import App from './App.vue'
import { createApp } from 'vue'
import Sectum from './packet'
import Router from './router'
import I18n from './locale'
import 'uno.css'


createApp(App).use(Router).use(Sectum).use(I18n).mount('#app')
