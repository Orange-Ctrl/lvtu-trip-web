import { createApp } from 'vue'
import App from './App.vue'
import "normalize.css"
import "./assets/css/index.css"
import router from './router'
import { createPinia } from 'pinia'
import Vant from 'vant';
import 'vant/lib/index.css'
import lazy from './directives/lazy'


const app = createApp(App)

// 注册懒加载指令
app.directive('lazy', lazy)

app.use(createPinia())
app.use(router)

app.use(Vant);

app.mount('#app')
