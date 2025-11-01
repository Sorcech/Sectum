import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Sectum from 'sectum'
import 'sectum/dist/style.css'
import App from './App.vue'
import Home from './views/Home.vue'

const routes = [
  {
    path: '/',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(Sectum)
app.use(router)
app.mount('#app')
