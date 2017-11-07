function menuData(flag) {
    var menuList = window.localStorage.getItem('menuList');
    let NODE_ENVS = process.env.NODE_ENV;
    if (!menuList) {
        if (NODE_ENVS === 'development') {
            window.location.href = 'http://paas-web.xianyiscm.com/userAuth/login';
        } else if (NODE_ENVS === 'devend') {
            window.location.href = 'http://paas-web-dev.xianyiscm.com/userAuth/login';
        } else if (NODE_ENVS === 'test') {
            window.location.href = 'http://paas-web-test.xianyiscm.com/userAuth/login';
        } else if (NODE_ENVS === 'beta') {
            window.location.href = 'http://paas-web-beta.xianyiscm.com/userAuth/login';
        } else {
            window.location.href = 'http://paas-web.xianyiscm.com/userAuth/login';
        }
    }
    var datas = menuList ? JSON.parse(menuList) : [];
    var result = {};
    if(datas.length) {
        datas.some((item, index) => {
            if (item.url === flag) {
                if (item.hasMenu) {
                    if (item.subMenu[0].hasMenu || item.subMenu[0].url === '') {
                        result = item.subMenu[0].subMenu[0];
                    } else {
                        result = item.subMenu[0];
                    }
                } else {
                    result = item;
                }
                return true;
            }
        });
    }
    return result;
}

exports.menuData = menuData;

exports.scaleLinks = function (url) {
    if (!url) return;
    var urlTask = /^\//.test(url);
    var urlResult = url;
    if (!urlTask) {
        urlResult = '/' + urlResult;
    }
    //
    // var objs = {
    //     '/ac': '/index#' + (menuData('/ac').url ? menuData('/ac').url : '/ac/transport/transportReceivable')
    // };
    switch (process.env.NODE_ENV) {
        // 生产
        case 'production':
            // if (objs[urlResult]) {
            //     return 'http://paas.xianyiscm.com' + objs[urlResult];
            // } else {
            //     return 'http://paas-web.xianyiscm.com' + urlResult;
            // }
            return 'http://paas-web.xianyiscm.com' + urlResult;
            break;
        // 预生产
        case 'beta':
            // if (objs[urlResult]) {
            //     return 'http://paas-beta.xianyiscm.com' + objs[urlResult];
            // } else {
            //     return 'http://paas-web-beta.xianyiscm.com' + urlResult;
            // }
            return 'http://paas-web-beta.xianyiscm.com' + urlResult;
            break;
        // 测试
        case 'test':
            // if (objs[urlResult]) {
            //     return 'http://paas-test.xianyiscm.com' + objs[urlResult];
            // } else {
            //     return 'http://paas-web-test.xianyiscm.com' + urlResult;
            // }
            return 'http://paas-web-test.xianyiscm.com' + urlResult;
            break;
        // 开发版-devend
        case 'devend':
            // if (objs[urlResult]) {
            //     return 'http://paas-dev.xianyiscm.com' + objs[urlResult];
            // } else {
            //     return 'http://paas-web-dev.xianyiscm.com' + urlResult;
            // }
            return 'http://paas-web-dev.xianyiscm.com' + urlResult;
            break;
        default:
            return urlResult;
    }
};
exports.fnScaleLinks = function (url) {
    if (!url) return;
    // var objs = ['/ac'];
    // var regResult = false;
    // for (var i=0;i<objs.length;i++){
    //     var patternUrl = new RegExp('^' + objs[i]);
    //     regResult = patternUrl.test(url);
    //     if(regResult){
    //         break;
    //     }
    // }
    var urlResult = url;

    switch (process.env.NODE_ENV) {
    // 生产
        case 'production':
            // if (regResult) {
            //     return 'http://paas.xianyiscm.com/index#' + urlResult;
            // } else {
            //     return 'http://paas-web.xianyiscm.com' + urlResult;
            // }
            // break;
            return 'http://paas-web.xianyiscm.com' + urlResult;
            break;
        // 预生产
        case 'beta':
            // if (regResult) {
            //     return 'http://paas-beta.xianyiscm.com/index#' + urlResult;
            // } else {
            //     return 'http://paas-web-beta.xianyiscm.com' + urlResult;
            // }
            // break;
            return 'http://paas-web-beta.xianyiscm.com' + urlResult;
            break;
        // 测试
        case 'test':
            // if (regResult) {
            //     return 'http://paas-test.xianyiscm.com/index#' + urlResult;
            // } else {
            //     return 'http://paas-web-test.xianyiscm.com' + urlResult;
            // }
            // break;
            return 'http://paas-web-test.xianyiscm.com' + urlResult;
            break;
        // 开发版-devend
        case 'devend':
            // if (regResult) {
            //     return 'http://paas-dev.xianyiscm.com/index#' + urlResult;
            // } else {
            //     return 'http://paas-web-dev.xianyiscm.com' + urlResult;
            // }
            // break;
            return 'http://paas-web-dev.xianyiscm.com' + urlResult;
            break;
        default:
            return urlResult;
    }
};
