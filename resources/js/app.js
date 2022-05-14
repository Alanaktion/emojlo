import { createApp } from 'vue';
import Router from './router';
import AppRoot from './components/AppRoot.vue';

require('./bootstrap');

createApp(AppRoot)
    .use(Router)
    .mount('#app');
