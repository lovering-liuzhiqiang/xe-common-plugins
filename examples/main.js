/**
 * Created by zhangwen on 17/3/23.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import xcmsCommonPlugins from '../src/index';

Vue.use(VueRouter);
Vue.use(xcmsCommonPlugins);

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    routes: [
        {
            path: '/header',
            component: require('./routers/header.vue')
        }
    ]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
