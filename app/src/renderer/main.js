import Vue from 'vue';
import Electron from 'vue-electron';
import Resource from 'vue-resource';
import Router from 'vue-router';
import './common/index.styl';
import App from './App';
import routes from './routes';

Vue.use(Electron);
Vue.use(Resource);
Vue.use(Router);
Vue.config.debug = true;
import vSelect from 'vue-select';
Vue.component('v-select', vSelect);
const router = new Router({
    scrollBehavior: () => ({y: 0}),
    routes
});

/* eslint-disable no-new */
new Vue({
    router,
    ...App
}).$mount('#app');
