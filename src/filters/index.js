 export function scaleLinks(url) {
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
        '/ac': '/index#/ac/transport/transportReceivable',
        '/adc': '/index#/adc/financialStatements/transport'
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
 export function fnScaleLinks(url) {
  if (!url) return;
  var objs = ['/csc','/pdc','/rmc','/ofc','/dpc','/whc','/tfc','/epc','/ac','/adc'];
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
