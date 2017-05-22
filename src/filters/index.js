exports.scaleLinks = function (url) {
    if (!url) return;
    var urlTask = /^\//.test(url);
    var urlResult = url;
    if (!urlTask) {
        urlResult = '/' + urlResult;
    }
    console.log(urlResult);

    function menuData(flag) {
        var menuList = window.localStorage.getItem('menuList');
        var datas = menuList ? JSON.parse(menuList) : [];
        var result = {};
        if(datas.length) {
            datas.some((item, index) => {
                if (item.url === flag) {
                    if (item.hasMenu) {
                        if (item.subMenu[0].hasMenu) {
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
        };
        return result;
    };

    var objs = {
        '/csc': '/index#' + (menuData('/csc').url ? menuData('/csc').url : '/csc/customer/toMaintainCscCustomerListPage'),
        '/rmc': '/index#' + (menuData('/rmc').url ? menuData('/rmc').url : '/rmc/lineoften/toMaintainLineOftenListPage'),
        '/ofc': '/index#' + (menuData('/ofc').url ? menuData('/ofc').url : '/ofc/tranLoad'),
        '/dpc': '/index#' + (menuData('/dpc').url ? menuData('/dpc').url : '/dpc/transpoolrule/toMaintainDpcTransPoolRuleListPage'),
        '/whc': '/index#' + (menuData('/whc').url ? menuData('/whc').url : '/whc/page/toMaintainInventoryPage'),
        '/tfc': '/index#' + (menuData('/tfc').url ? menuData('/tfc').url : '/tfc/transport/toTransportListPage'),
        '/epc': '/index#' + (menuData('/epc').url ? menuData('/epc').url : '/epc/log/toRecordMapListPage'),
        '/ac': '/index#' + (menuData('/ac').url ? menuData('/ac').url : '/ac/transport/transportReceivable'),
        '/adc': '/index#' + (menuData('/adc').url ? menuData('/adc').url : '/adc/financialStatements/transport')
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
exports.fnScaleLinks = function (url) {
  if (!url) return;
  var objs = ['/csc','/rmc','/ofc','/dpc','/whc','/tfc','/epc','/ac','/adc'];
  var regResult = false;
  for (var i=0;i<objs.length;i++){
    var patternUrl = new RegExp("^" + objs[i]);
    regResult = patternUrl.test(url);
    if(regResult){
        break;
    }
  }
  var urlResult = url;

  switch (process.env.NODE_ENV) {
    // 生产
    case 'production':
      if (regResult) {
        return 'http://paas.xianyiscm.com/index#' + urlResult;
      } else {
        return 'http://paas-web.xianyiscm.com' + urlResult;
      }
      break;
    // 预生产
    case 'beta':
      if (regResult) {
        return 'http://paas-beta.xianyiscm.com/index#' + urlResult;
      } else {
        return 'http://paas-web-beta.xianyiscm.com' + urlResult;
      }
      break;
    // 测试
    case 'test':
      if (regResult) {
        return 'http://paas-test.xianyiscm.com/index#' + urlResult;
      } else {
        return 'http://paas-web-test.xianyiscm.com' + urlResult;
      }
      break;
    // 开发版-devend
    case 'devend':
      if (regResult) {
        return 'http://paas-dev.xianyiscm.com/index#' + urlResult;
      } else {
        return 'http://paas-web-dev.xianyiscm.com' + urlResult;
      }
      break;
    default:
      return urlResult;
  };
};
