import Cookies from 'js-cookie';

import {toObject} from './assist.js';

let NODE_ENVS = process.env.NODE_ENV;

console.log('====common_fn====');
console.log(NODE_ENVS);
console.log('====common_fn====');

// 全局退出登录 -- 删除cookie
export function logOut() {
    if (NODE_ENVS === 'development') {
        Cookies.remove('userInfo');
        Cookies.remove('token');
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
};

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
            token = Cookies.get('token');
            userInfo = Cookies.get('userInfo');
    };

    if (!userInfo || !token) {
        token = null;
        reUserInfo = null
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
    };

    return {
        token: token, // String
        userInfo: reUserInfo // Object
    };
}

// 全局续租更新TOKEN cookie
export function resetTokenCookie(token_result) {
    if (NODE_ENV === 'development') {
        Cookies.set('token', token_result);
    } else if (NODE_ENV === 'devend') {
        Cookies.set('USER_INFO_DEV', token_result, {domain: '.xianyiscm.com'});
    } else if(NODE_ENV === 'test') {
        Cookies.set('USER_INFO_TEST', token_result, {domain: '.xianyiscm.com'});
    } else if(NODE_ENV === 'beta') {
        Cookies.set('USER_INFO_BETA', token_result, {domain: '.xianyiscm.com'});
    } else {
        Cookies.set('USER_INFO', token_result, {domain: '.xianyiscm.com'});
    }
}

// 全局更新 cookie userInfo
export function resetUserInfoCookie(result = {}, options = {}) {
    let defaultOptions = {
        domain: '.xianyiscm.com'
    }
    let settings = toObject([defaultOptions, options]);
    console.log(settings);
    if (NODE_ENVS === 'development') {
        Cookies.set('userInfo', result);
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
    let apiBaseUrl = null;
    let locationHref = null; // 跳转登录页链接
    let locationUserInit = null; // 跳转认证初始页链接
    let locationReject = null; // 跳转认证驳回页链接
    // let locationPerfectMessage = null; // 跳转认证完善个人信息链接
    let locationTication = ''; // 跳转认证审核页面信息链接
    switch (NODE_ENVS) {
        case 'production':
            apiBaseUrl = 'http://paas.xianyiscm.com';
            locationHref = 'http://paas-web.xianyiscm.com/userauth/login';
            locationUserInit = 'http://paas-web.xianyiscm.com/home/userinitial';
            locationReject = 'http://paas-web.xianyiscm.com/home/locationReject';
            // locationPerfectMessage = 'http://paas-web.xianyiscm.com/home/perfectMessage';
            locationTication = 'http://paas-web.xianyiscm.com/home/userauthentication';
            break;
        case 'beta':
            apiBaseUrl = 'http://paas-beta.xianyiscm.com';
            locationHref = 'http://paas-web-beta.xianyiscm.com/userauth/login';
            locationUserInit = 'http://paas-web-beta.xianyiscm.com/home/userinitial';
            locationReject = 'http://paas-web-beta.xianyiscm.com/home/locationReject';
            // locationPerfectMessage = 'http://paas-web-beta.xianyiscm.com/home/perfectMessage';
            locationTication = 'http://paas-web-beta.xianyiscm.com/home/userauthentication';
            break;
        case 'test':
            apiBaseUrl = 'http://paas-test.xianyiscm.com';
            locationHref = 'http://paas-web-test.xianyiscm.com/userauth/login';
            locationUserInit = 'http://paas-web-test.xianyiscm.com/home/userinitial';
            locationReject = 'http://paas-web-test.xianyiscm.com/home/locationReject';
            // locationPerfectMessage = 'http://paas-web-test.xianyiscm.com/home/perfectMessage';
            locationTication = 'http://paas-web-test.xianyiscm.com/home/userauthentication';
            break;
        case 'devend':
            apiBaseUrl = 'http://paas-dev.xianyiscm.com';
            locationHref = 'http://paas-web-dev.xianyiscm.com/userauth/login';
            locationUserInit = 'http://paas-web-dev.xianyiscm.com/home/userinitial';
            locationReject = 'http://paas-web-dev.xianyiscm.com/home/locationReject';
            // locationPerfectMessage = 'http://paas-web-dev.xianyiscm.com/home/perfectMessage';
            locationTication = 'http://paas-web-dev.xianyiscm.com/home/userauthentication';
            break;
        default:
            apiBaseUrl = '';
            locationHref = 'http://localhost:8001/userauth/login';
            locationUserInit = 'http://localhost:8001/home/userinitial';
            locationReject = 'http://localhost:8001/home/locationReject';
            // locationPerfectMessage = 'http://localhost:8001/home/perfectMessage';
            locationTication = 'http://localhost:8001/home/userauthentication';
    };
    return {
        apiBaseUrl: apiBaseUrl,
        locationHref: locationHref,
        locationUserInit: locationUserInit,
        locationReject: locationReject,
        locationTication: locationTication
    };
}
