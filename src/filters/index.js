exports.scaleLinks = function(url) {
    if (!url) return;
    var urlTask = /^\//.test(url);
    var urlResult = url;
    if (!urlTask) {
        urlResult = '/' + urlResult;
    }
    console.log(urlResult);

    var objs = {
        '/csc': '/index#/csc/customer/toMaintainCscCustomerListPage',
        '/pdc': '/index#/pdc/serviceLevelAgreement',
        '/rmc': '/index#/rmc/lineoften/toMaintainLineOftenListPage',
        '/ofc': '/index#/ofc/tranLoad',
        '/dpc': '/index#/dpc/transpoolrule/toMaintainDpcTransPoolRuleListPage',
        '/whc': '/index#/whc/page/toMaintainInventoryPage',
        '/tfc': '/index#/tfc/transport/toTransportListPage',
        '/epc': '/index#/epc/log/toRecordMapListPage',
        '/ac': '/index#/ac/cabannes/chargeRestLog'
    }

    switch (process.env.NODE_ENV) {
        // 生产
        case 'production':
            if (objs[urlResult]) {
                return 'http://paas.xianyiscm.com' + objs[urlResult];
            } else {
                return 'http://paas-web.xianyiscm.com' + urlResult;
            }
        break;
        // 预生产
        case 'beta':
            if (objs[urlResult]) {
                return 'http://paas-beta.xianyiscm.com' + objs[urlResult];
            } else {
                return 'http://paas-web-beta.xianyiscm.com' + urlResult;
            }
        break;
        // 测试
        case 'test':
            if (objs[urlResult]) {
                return 'http://paas-test.xianyiscm.com' + objs[urlResult];
            } else {
                return 'http://paas-web-test.xianyiscm.com' + urlResult;
            }
        break;
        // 开发版-devend
        case 'devend':
            if (objs[urlResult]) {
                return 'http://paas-dev.xianyiscm.com' + objs[urlResult];
            } else {
                return 'http://paas-web-dev.xianyiscm.com' + urlResult;
            }
        break;
        default:
            return urlResult;
    };
};
