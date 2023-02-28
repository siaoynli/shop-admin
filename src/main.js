import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import router from './router'
import App from './App.vue'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//全局引入图标
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(ElementPlus)
app.use(router)

import './permission'
import 'nprogress/nprogress.css'

app.mount('#app')
