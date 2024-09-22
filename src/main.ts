import './assets/main.css';
 
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import Router from './Router.vue';
import router from './router';

const app = createApp( Router );

app.use( createPinia() );
app.use( router );

app.mount( '#app' );
