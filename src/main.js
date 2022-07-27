import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from '@/router'
import store from '@/store'

require('@/mock')

const app = createApp(App);

app.use(router)
app.use(store)
app.use(Antd).mount('#app')
