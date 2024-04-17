import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import store from './store/index'
//全局引入css样式
import './assets/global.css'
import './assets/iconfont/icons/iconfont.css'
import * as API from './api/index'
// const apiMixin = {
//      created() {
//           this.$API = API
//      }  
// }

const app = createApp(App)
app.config.globalProperties.$API = API //将API挂载到全局


app.use(router).use(store).mount('#app')

export default app

