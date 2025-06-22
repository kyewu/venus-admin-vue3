import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'virtual:svg-icons/register' // recommended
// if you just want to import css
import 'element-plus/theme-chalk/dark/css-vars.css'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'zh-cn',
  fallbackLocale: 'en',
  messages
})

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')

console.log('i18n messages:', messages)