import { initTheme } from './theme/theme'
import './theme/theme.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import i18n from './business/lang'

import './styles/element/index.scss'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

initTheme()
const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(i18n)

app.use(ElementPlus)

app.mount('#app')
