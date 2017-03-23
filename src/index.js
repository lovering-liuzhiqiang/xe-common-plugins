// es6 polyfill
import 'core-js/fn/array/find-index';

import xcmsheader from './components/header/';

const iview = {
    xcmsheader
};

const install = function (Vue, opts = {}) {
    Object.keys(iview).forEach((key) => {
        Vue.component(key, iview[key]);
    });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = Object.assign(iview, {install});   // eslint-disable-line no-undef
