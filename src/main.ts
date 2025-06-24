import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'virtual:svg-icons/register' // recommended
// if you just want to import css
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import I18n from './modules/i8n'
import { setupDirective } from './directives'


const app = createApp(App)
setupDirective(app)
app.use(createPinia())
app.use(router)
app.use(I18n)

app.mount('#app')
