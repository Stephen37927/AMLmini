import './assets/main.css'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import "element-plus/lib/theme-chalk/index.css";


const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:8000'

app.use(router, axios, ElementPlus)

app.mount('#app')
