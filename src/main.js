import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import router from './router'
import App from './App.vue'
import store from './store'

const app = createApp(App)

app.use(store)
app.use(ElementPlus)
app.use(router)

import './permission'
import 'nprogress/nprogress.css'

app.mount('#app')
