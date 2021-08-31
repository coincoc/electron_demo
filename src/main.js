import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import gl from './plugins/global'

import './assets/iconfont.css';

const app = createApp(App);
app.use(store);
app.use(router);

app.config.globalProperties.$gl = gl;

app.mount('#app')
