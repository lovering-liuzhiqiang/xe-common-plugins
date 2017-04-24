exports.scaleLinks = function(url) {
    if (!url) return;
    var urlTask = /^\//.test(url);
    var urlResult = url;
    if (!urlTask) {
        urlResult = '/' + urlResult;
    }
    switch (process.env.NODE_ENV) {
        // 生产
        case 'production':
            return 'http://paas-web.xianyiscm.com' + urlResult;
        break;
        // 预生产
        case 'beta':
            return 'http://paas-web-beta.xianyiscm.com' + urlResult;
        break;
        // 测试
        case 'test':
            return 'http://paas-web-test.xianyiscm.com' + urlResult;
        break;
        // 开发版-devend
        case 'devend':
            return 'http://paas-web-dev.xianyiscm.com' + urlResult;
        break;
        default:
            return urlResult;
    };
};
