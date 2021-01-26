import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './styles/element-variables.scss'; // 引入自定义主题，无需引入 Element Plus 编译好的 CSS 文件
import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css'; 

const app = createApp(App)
app.use(ElementPlus)

app.use(store)
  .use(router)
  .mount("#app");
