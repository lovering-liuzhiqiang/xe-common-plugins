exports.scaleLinks = function (url) {
    if (!url) return;
    var urlTask = /^\//.test(url);
    var urlResult = url;
    if (!urlTask) {
        urlResult = '/' + urlResult;
    }
    console.log(urlResult);

    function menuDataOld(flag) {
        var menuList = window.localStorage.getItem('menuList');
        var datas = menuList ? JSON.parse(menuList) : [];
        var result = {};
        if(datas.length) {
            datas.some((item, index) => {
                if (item.url === flag) {
                    if (item.hasMenu) {
                        if (item.subMenu[0].url === '') {
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
        '/csc': '/index#' + (menuDataOld('/csc').url ? menuDataOld('/csc').url : '/csc/customer/toMaintainCscCustomerListPage'),
        '/pdc': '/index#' + (menuDataOld('/pdc').url ? menuDataOld('/pdc').url : '/pdc/serviceLevelAgreement'),
        '/rmc': '/index#' + (menuDataOld('/rmc').url ? menuDataOld('/rmc').url : '/rmc/lineoften/toMaintainLineOftenListPage'),
        '/ofc': '/index#' + (menuDataOld('/ofc').url ? menuDataOld('/ofc').url : '/ofc/tranLoad'),
        '/dpc': '/index#' + (menuDataOld('/dpc').url ? menuDataOld('/dpc').url : '/dpc/transpoolrule/toMaintainDpcTransPoolRuleListPage'),
        '/whc': '/index#' + (menuDataOld('/whc').url ? menuDataOld('/whc').url : '/whc/page/toMaintainInventoryPage'),
        '/tfc': '/index#' + (menuDataOld('/tfc').url ? menuDataOld('/tfc').url : '/tfc/transport/toTransportListPage'),
        '/epc': '/index#' + (menuDataOld('/epc').url ? menuDataOld('/epc').url : '/epc/log/toRecordMapListPage'),
        '/ac': '/index#' + (menuDataOld('/ac').url ? menuDataOld('/ac').url : '/ac/transport/transportReceivable'),
        '/adc': '/index#' + (menuDataOld('/adc').url ? menuDataOld('/adc').url : '/adc/financialStatements/transport')
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
