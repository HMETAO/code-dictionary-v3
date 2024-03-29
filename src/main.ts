import {createApp} from 'vue'
import './assets/css/globel.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'md-editor-v3/lib/style.css';
import 'animate.css';
import App from './App.vue'
import mitt from 'mitt'
import pinia from "./plugin/pinia";
import router from "./router";
import Tuikit from "./plugin/tuikit";
const app = createApp(App)
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere
import "prismjs/themes/prism-tomorrow.css";

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const Mit = mitt()
declare module 'vue' {
    export interface ComponentCustomProperties {
        $bus: typeof Mit
    }
}
app.config.globalProperties.$bus = Mit

app.use(pinia)
app.use(router)
app.use(Tuikit)
app.mount('#app')

