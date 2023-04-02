import { createApp} from 'vue'
import './style.css'
import 'vant/es/dialog/style';
import router from './router/index'
import App from './App.vue'


createApp(App).use(router).mount('#app')
 