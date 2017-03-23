// es6 polyfill
import 'core-js/fn/array/find-index';

import Timeline from './components/timeline';

const iview = {
    Timeline,
    TimelineItem: Timeline.Item
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
