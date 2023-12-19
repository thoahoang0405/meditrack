import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import mitt from 'mitt';
import clickOutside from './js/common/directive';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import vi from "element-plus/es/locale/lang/vi";
const app =createApp(App)
const emitter= mitt();
app.directive("outside", clickOutside);
app.use(ElementPlus, {
    locale: vi,
  });
app.use(ToastPlugin);

app.config.globalProperties.emitter = emitter;
app.use(router);

app.mount("#app");


