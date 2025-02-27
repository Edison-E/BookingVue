import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from "axios"

const app = createApp(App)
axios.defaults.withCredentials = true;
app.use(router)
app.use(store)

app.mount('#app')
