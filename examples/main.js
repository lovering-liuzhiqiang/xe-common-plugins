/**
 * Created by zhangwen on 17/3/23.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import xcmsCommonPlugins from '../src/index';
import Cookies from 'js-cookie';
import Bus from './vueBus.js';
// import { commonMapLink } from '../src/utils/';

Vue.use(VueRouter);
Vue.use(xcmsCommonPlugins);

Vue.prototype.$xeCookies = Cookies;
Vue.prototype.$xeStore = window.localStorage;
Vue.prototype.$xeBus = Bus;
// Vue.$coMapLink = Vue.prototype.$coMapLink = new commonMapLink();

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    routes: [
        {
            path: '/header',
            component: require('./routers/header.vue')
        },
        {
            path: '/mainmenu',
            component: require('./routers/mainmenu.vue')
        },
        {
            path: '/icons',
            component: require('./routers/icons.vue')
        }
    ]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
