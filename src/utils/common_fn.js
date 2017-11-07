import Cookies from 'js-cookie';
import Vue from 'vue';
import axios from 'axios';
import {toObject} from './assist.js';

let NODE_ENVS = process.env.NODE_ENV;

export function resetSystemId () {
    var userInfo = getNowCookie().userInfo;
    if (userInfo) {
        userInfo.systemId = '1000';
        resetUserInfo(JSON.stringify(userInfo));
    }
}

export function menuData(flag) {

    var projectLink = getHomeProjectLink();

    var userInfo = getNowCookie().userInfo;

    if (!userInfo) {
        goLogin();
    }

    switch (userInfo.userStatus) {
        case '100' :
            // 未认证
            window.location.href = projectLink.locationUserInit;
            break;
        case '200' :
            // 认证中userauthentication
            window.location.href = projectLink.locationTication;
            break;
        case '300' :
            // 驳回reject
            window.location.href = projectLink.locationReject;
            break;
        case '400' :
            // 已认证
            break;
    }

    var menuList = undefined;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var res = JSON.parse(xhr.responseText);
                menuList = res.result;
            }
        }
    };

    xhr.open("post", getHomeProjectLink().apiBaseUrl + '/page/uam/menu/common/getUserAuthDto/' + 1000 + '/' + getNowCookie().userInfo.userId, false);

    xhr.setRequestHeader("Authorization", 'Bearer ' + getNowCookie().token);

    xhr.send();

    let NODE_ENVS = process.env.NODE_ENV;
    if (!menuList) {
        goLogin();
    }
    var datas = menuList ? menuList : [];
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

export function goLogin() {
    logOut();
    if (NODE_ENVS === 'development') {
        window.location.href = 'http://paas-web.xianyiscm.com/userAuth/login';
    } else if (NODE_ENVS === 'devend') {
        window.location.href = 'http://paas-web-dev.xianyiscm.com/userAuth/login';
    } else if (NODE_ENVS === 'test') {
        window.location.href = 'http://paas-web-test.xianyiscm.com/userAuth/login';
    } else if (NODE_ENVS === 'beta') {
        window.location.href = 'http://paas-web-beta.xianyiscm.com/userAuth/login';
    } else {
        window.location.href = 'http://localhost:8001/userAuth/login';
    }
}

export function goCwb() {
    if (NODE_ENVS === 'development') {
        window.location.href = 'http://localhost:3000/';
    } else if (NODE_ENVS === 'devend') {
        window.location.href = 'http://cwb-dev.xianyiscm.com';
    } else if (NODE_ENVS === 'test') {
        window.location.href = 'http://cwb-test.xianyiscm.com';
    } else if (NODE_ENVS === 'beta') {
        window.location.href = 'http://cwb-beta.xianyiscm.com';
    } else {
        window.location.href = 'http://cwb.xianyiscm.com';
    }
}

// 全局退出登录 -- 删除cookie
export function logOut() {
    if (NODE_ENVS === 'development') {
        Cookies.remove('USER_INFO_DEV');
        Cookies.remove('PASS_TOKEN_DEV');
    } else if (NODE_ENVS === 'devend') {
        Cookies.remove('USER_INFO_DEV', {domain: '.xianyiscm.com'});
        Cookies.remove('PASS_TOKEN_DEV', {domain: '.xianyiscm.com'});
    } else if(NODE_ENVS === 'test') {
        Cookies.remove('USER_INFO_TEST', {domain: '.xianyiscm.com'});
        Cookies.remove('PASS_TOKEN_TEST', {domain: '.xianyiscm.com'});
    } else if(NODE_ENVS === 'beta') {
        Cookies.remove('USER_INFO_BETA', {domain: '.xianyiscm.com'});
        Cookies.remove('PASS_TOKEN_BETA', {domain: '.xianyiscm.com'});
    } else {
        Cookies.remove('USER_INFO', {domain: '.xianyiscm.com'});
        Cookies.remove('PASS_TOKEN', {domain: '.xianyiscm.com'});
    }
    window.localStorage.removeItem('menuList');
    window.localStorage.removeItem('C_MENU_LIST');
}

export function getUserStatus(cb) {
    Vue.prototype.$http({
        method: 'post',
        url: '/page/uam/approve/queryUamUserStatusSys/1000'
    }).then(function (res) {
        cb(res.result.userStatus);
    })
}

// 全局取当前环境的cookie
export function getNowCookie() {
    let token = null;
    let userInfo = null;
    let reUserInfo = null;

    switch (NODE_ENVS) {
        case 'production':
            token = Cookies.get('PASS_TOKEN');
            userInfo = Cookies.get('USER_INFO');
            break;
        case 'beta':
            token = Cookies.get('PASS_TOKEN_BETA');
            userInfo = Cookies.get('USER_INFO_BETA');
            break;
        case 'test':
            token = Cookies.get('PASS_TOKEN_TEST');
            userInfo = Cookies.get('USER_INFO_TEST');
            break;
        case 'devend':
            token = Cookies.get('PASS_TOKEN_DEV');
            userInfo = Cookies.get('USER_INFO_DEV');
            break;
        default :
            token = Cookies.get('PASS_TOKEN_DEV');
            userInfo = Cookies.get('USER_INFO_DEV');
    }

    if (!userInfo || !token) {
        token = null;
        reUserInfo = null;
    } else {
        if (userInfo.indexOf('\\') >= 0) {
            var userInfoObj = userInfo.replace(/\\/g, '');
            if (userInfoObj) {
                reUserInfo = JSON.parse(userInfoObj);
            }
        } else {
            if (userInfo) {
                reUserInfo = JSON.parse(userInfo);
            }
        }
    }

    return {
        token: token, // String
        userInfo: reUserInfo // Object
    };
}

// 全局续租更新TOKEN cookie
export function resetTokenCookie(token_result) {
    if (NODE_ENVS === 'development') {
        Cookies.set('PASS_TOKEN_DEV', token_result);
    } else if (NODE_ENVS === 'devend') {
        Cookies.set('PASS_TOKEN_DEV', token_result, {domain: '.xianyiscm.com'});
    } else if(NODE_ENVS === 'test') {
        Cookies.set('PASS_TOKEN_TEST', token_result, {domain: '.xianyiscm.com'});
    } else if(NODE_ENVS === 'beta') {
        Cookies.set('PASS_TOKEN_BETA', token_result, {domain: '.xianyiscm.com'});
    } else {
        Cookies.set('PASS_TOKEN', token_result, {domain: '.xianyiscm.com'});
    }
}

// // 全局续租更新TOKEN userInfo
export function resetUserInfo(userInfo) {
    if (NODE_ENVS === 'development') {
        Cookies.set('USER_INFO_DEV', userInfo);
    } else if (NODE_ENVS === 'devend') {
        Cookies.set('USER_INFO_DEV', userInfo, {domain: '.xianyiscm.com'});
    } else if(NODE_ENVS === 'test') {
        Cookies.set('USER_INFO_TEST', userInfo, {domain: '.xianyiscm.com'});
    } else if(NODE_ENVS === 'beta') {
        Cookies.set('USER_INFO_BETA', userInfo, {domain: '.xianyiscm.com'});
    } else {
        Cookies.set('USER_INFO', userInfo, {domain: '.xianyiscm.com'});
    }
}


// 全局更新 cookie userInfo
export function resetUserInfoCookie(result = {}, options = {}) {
    let defaultOptions = {
        domain: '.xianyiscm.com'
    };
    let settings = toObject([defaultOptions, options]);
    console.log(settings);
    if (NODE_ENVS === 'development') {
        Cookies.set('PASS_TOKEN_DEV', result);
    } else if (NODE_ENVS === 'devend') {
        Cookies.set('PASS_TOKEN_DEV', result, settings);
    } else if(NODE_ENVS === 'test') {
        Cookies.set('PASS_TOKEN_TEST', result, settings);
    } else if(NODE_ENVS === 'beta') {
        Cookies.set('PASS_TOKEN_BETA', result, settings);
    } else {
        Cookies.set('PASS_TOKEN', result, settings);
    }
}

// 非home项目跳home项目链接
export function getHomeProjectLink() {
    let fineReportUrl = null; //ac打印报表域名
    let homeBaseUrl = null; //跳转home主页链接
    let apiBaseUrl = null; //用户中心后台API地址
    let ofcApiBaseUrl = null; //订单中心后台API地址
    let rmcApiBaseUrl = null; //资源中心后台API地址
    let cscApiBaseUrl = null; //客户中心后台API地址
    let tfcApiBaseUrl = null; //运输中心后台API地址
    let whcApiBaseUrl = null; //仓储中心后台API地址
    let dpcApiBaseUrl = null; //调度中心后台API地址
    let acApiBaseUrl = null; //结算中心后台API地址
    let fcApiBaseUrl = null; //金融中心后台API地址
    let adcApiBaseUrl = null; //数据中心后台API地址
    let epcApiBaseUrl = null; //对接中心后台API地址
    let pdcApiBaseUrl = null; //产品中心后天API地址
    let locationHref = null; // 跳转登录页链接
    let locationUserInit = null; // 跳转认证初始页链接
    let locationReject = null; // 跳转认证驳回页链接
    // let locationPerfectMessage = null; // 跳转认证完善个人信息链接
    let locationTication = ''; // 跳转认证审核页面信息链接
    switch (NODE_ENVS) {
        case 'production':
            fineReportUrl = 'http://print.xianyiscm.com:7020/AcSettleReport/ReportServer';
            homeBaseUrl = 'http://paas-web.xianyiscm.com';
            apiBaseUrl = 'http://paas.xianyiscm.com';
            ofcApiBaseUrl = 'http://ofc.xianyiscm.com';
            rmcApiBaseUrl = 'http://rmc.xianyiscm.com';
            cscApiBaseUrl = 'http://csc.xianyiscm.com';
            tfcApiBaseUrl = 'http://tfc.xianyiscm.com';
            whcApiBaseUrl = 'http://whc.xianyiscm.com';
            dpcApiBaseUrl = 'http://dpc.xianyiscm.com';
            acApiBaseUrl = 'http://ac.xianyiscm.com';
            fcApiBaseUrl = 'http://fc.xianyiscm.com';
            adcApiBaseUrl = 'http://adc.xianyiscm.com';
            epcApiBaseUrl = 'http://epc.xianyiscm.com';
            pdcApiBaseUrl = 'http://pdc.xianyiscm.com';
            locationHref = 'http://paas-web.xianyiscm.com/userauth/login';
            locationUserInit = 'http://paas-web.xianyiscm.com/home/userinitial';
            locationReject = 'http://paas-web.xianyiscm.com/home/locationReject';
            // locationPerfectMessage = 'http://paas-web.xianyiscm.com/home/perfectMessage';
            locationTication = 'http://paas-web.xianyiscm.com/home/userauthentication';
            break;
        case 'beta':
            fineReportUrl = 'http://60.205.235.205:7020/AcSettleReport/ReportServer';
            homeBaseUrl = 'http://paas-web-beta.xianyiscm.com';
            apiBaseUrl = 'http://paas-beta.xianyiscm.com';
            ofcApiBaseUrl = 'http://ofc-beta.xianyiscm.com';
            rmcApiBaseUrl = 'http://rmc-beta.xianyiscm.com';
            cscApiBaseUrl = 'http://csc-beta.xianyiscm.com';
            tfcApiBaseUrl = 'http://tfc-beta.xianyiscm.com';
            whcApiBaseUrl = 'http://whc-beta.xianyiscm.com';
            dpcApiBaseUrl = 'http://dpc-beta.xianyiscm.com';
            acApiBaseUrl = 'http://ac-beta.xianyiscm.com';
            fcApiBaseUrl = 'http://fc-beta.xianyiscm.com';
            adcApiBaseUrl = 'http://adc-beta.xianyiscm.com';
            epcApiBaseUrl = 'http://epc-beta.xianyiscm.com';
            pdcApiBaseUrl = 'http://pdc-beta.xianyiscm.com';
            locationHref = 'http://paas-web-beta.xianyiscm.com/userauth/login';
            locationUserInit = 'http://paas-web-beta.xianyiscm.com/home/userinitial';
            locationReject = 'http://paas-web-beta.xianyiscm.com/home/locationReject';
            // locationPerfectMessage = 'http://paas-web-beta.xianyiscm.com/home/perfectMessage';
            locationTication = 'http://paas-web-beta.xianyiscm.com/home/userauthentication';
            break;
        case 'test':
            fineReportUrl = 'http://60.205.233.183:7020/AcSettleReport/ReportServer';
            homeBaseUrl = 'http://paas-web-test.xianyiscm.com';
            apiBaseUrl = 'http://paas-test.xianyiscm.com';
            ofcApiBaseUrl = 'http://ofc-test.xianyiscm.com';
            rmcApiBaseUrl = 'http://rmc-test.xianyiscm.com';
            cscApiBaseUrl = 'http://csc-test.xianyiscm.com';
            tfcApiBaseUrl = 'http://tfc-test.xianyiscm.com';
            whcApiBaseUrl = 'http://whc-test.xianyiscm.com';
            dpcApiBaseUrl = 'http://dpc-test.xianyiscm.com';
            acApiBaseUrl = 'http://ac-test.xianyiscm.com';
            fcApiBaseUrl = 'http://fc-test.xianyiscm.com';
            adcApiBaseUrl = 'http://adc-test.xianyiscm.com';
            epcApiBaseUrl = 'http://epc-test.xianyiscm.com';
            pdcApiBaseUrl = 'http://pdc-test.xianyiscm.com';
            locationHref = 'http://paas-web-test.xianyiscm.com/userauth/login';
            locationUserInit = 'http://paas-web-test.xianyiscm.com/home/userinitial';
            locationReject = 'http://paas-web-test.xianyiscm.com/home/locationReject';
            // locationPerfectMessage = 'http://paas-web-test.xianyiscm.com/home/perfectMessage';
            locationTication = 'http://paas-web-test.xianyiscm.com/home/userauthentication';
            break;
        case 'devend':
            fineReportUrl = 'http://60.205.233.183:7020/AcSettleReport/ReportServer';
            homeBaseUrl = 'http://paas-web-dev.xianyiscm.com';
            apiBaseUrl = 'http://paas-dev.xianyiscm.com';
            ofcApiBaseUrl = 'http://ofc-dev.xianyiscm.com';
            rmcApiBaseUrl = 'http://rmc-dev.xianyiscm.com';
            cscApiBaseUrl = 'http://csc-dev.xianyiscm.com';
            tfcApiBaseUrl = 'http://tfc-dev.xianyiscm.com';
            whcApiBaseUrl = 'http://whc-dev.xianyiscm.com';
            dpcApiBaseUrl = 'http://dpc-dev.xianyiscm.com';
            acApiBaseUrl = 'http://ac-dev.xianyiscm.com';
            fcApiBaseUrl = 'http://fc-dev.xianyiscm.com';
            adcApiBaseUrl = 'http://adc-dev.xianyiscm.com';
            epcApiBaseUrl = 'http://epc-dev.xianyiscm.com';
            pdcApiBaseUrl = 'http://pdc-dev.xianyiscm.com';
            locationHref = 'http://paas-web-dev.xianyiscm.com/userauth/login';
            locationUserInit = 'http://paas-web-dev.xianyiscm.com/home/userinitial';
            locationReject = 'http://paas-web-dev.xianyiscm.com/home/locationReject';
            // locationPerfectMessage = 'http://paas-web-dev.xianyiscm.com/home/perfectMessage';
            locationTication = 'http://paas-web-dev.xianyiscm.com/home/userauthentication';
            break;
        default:
            fineReportUrl = '';
            apiBaseUrl = '';
            ofcApiBaseUrl = '';
            rmcApiBaseUrl = '';
            cscApiBaseUrl = '';
            tfcApiBaseUrl = '';
            whcApiBaseUrl = '';
            dpcApiBaseUrl = '';
            acApiBaseUrl = '';
            fcApiBaseUrl = '';
            adcApiBaseUrl = '';
            epcApiBaseUrl = '';
            pdcApiBaseUrl = '';
            homeBaseUrl = 'http://localhost:8001/';
            locationHref = 'http://localhost:8001/userauth/login';
            locationUserInit = 'http://localhost:8001/home/userinitial';
            locationReject = 'http://localhost:8001/home/locationReject';
            // locationPerfectMessage = 'http://localhost:8001/home/perfectMessage';
            locationTication = 'http://localhost:8001/home/userauthentication';
    }
    return {
        fineReportUrl: fineReportUrl,
        homeBaseUrl: homeBaseUrl,
        apiBaseUrl: apiBaseUrl,
        ofcApiBaseUrl: ofcApiBaseUrl,
        rmcApiBaseUrl: rmcApiBaseUrl,
        cscApiBaseUrl: cscApiBaseUrl,
        tfcApiBaseUrl: tfcApiBaseUrl,
        whcApiBaseUrl: whcApiBaseUrl,
        dpcApiBaseUrl: dpcApiBaseUrl,
        acApiBaseUrl: acApiBaseUrl,
        fcApiBaseUrl: fcApiBaseUrl,
        adcApiBaseUrl: adcApiBaseUrl,
        epcApiBaseUrl: epcApiBaseUrl,
        pdcApiBaseUrl: pdcApiBaseUrl,
        locationHref: locationHref,
        locationUserInit: locationUserInit,
        locationReject: locationReject,
        locationTication: locationTication
    };
}
