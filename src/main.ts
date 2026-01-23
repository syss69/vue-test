import './assets/base.css'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

App.use(createPinia())

createApp(App).use(router).mount('#app')
