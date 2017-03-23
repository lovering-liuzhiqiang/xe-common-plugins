// es6 polyfill
import 'core-js/fn/array/find-index';

import xcmsheader from './components/header/';
import mainmenu from './components/mainmenu/';

const xcms = {
    xcmsheader,
    mainmenu
};

const install = function (Vue, opts = {}) {
    if (install.installed) return;
    Object.keys(xcms).forEach((key) => {
        Vue.component(key, xcms[key]);
    });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    install,
    xcmsheader,
    mainmenu
};
