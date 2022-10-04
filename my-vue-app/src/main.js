import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import ArcoVue from '@arco-design/web-vue/es/arco-vue' 
import "@arco-design/web-vue/dist/arco.css"

const app = createApp(App)
axios.defaults.baseURL = 'http://119.29.141.196:9000'
app.config.globalProperties.$http = axios

app.use(ArcoVue)
app.use(router)
app.mount('#app')
