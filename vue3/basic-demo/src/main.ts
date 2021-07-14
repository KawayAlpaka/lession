import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import directives from './directives';

const app = createApp(App);

app.use(router);
app.use(directives);

app.mount('#app');
