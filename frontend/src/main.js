import './assets/main.css'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'



const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:8000'

/* // 注册所有 Element Plus 图标组件
for (const iconName in ElIcons) {
    app.component(iconName, ElIcons[iconName])
} */

// 注册Element Plus图标组件
Object.keys(ElIcons).forEach(key => {
    app.component(key, ElIcons[key])
})

app.use(router, axios, ElementPlus)

app.mount('#app')
