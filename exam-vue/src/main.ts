import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios';

import 'jquery';
import 'popper.js';
import 'bootstrap';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';
import './assets/css/sb.admin-2.min.css';
import './assets/css/site.css';

createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .mount('#app')
