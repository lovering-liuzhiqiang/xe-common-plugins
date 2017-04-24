<template>
    <div :class="classes">
        <div class="btn-mainmenu" @click='changeWidth'>
            <span class="xcms-iconfont icon-zhankaishouhui" :class='{"icon-act": menuflag }'></span>
        </div>
        <ul>
            <li v-for="(item, pindex) in menuData" :key="item.id" :class="{'active': item.url ? new RegExp(item.url, 'g').test(hrefValue) : false}" @click="menuItemClick(item.url ? new RegExp(item.url, 'g').test(hrefValue) : false, $event)">
                <el-tooltip effect="light" popper-class='mainmenu-tip' :disabled='tipflag' :content="item.menuName" placement="right">
                    <a :href="item.url | scaleLinks">
                        <em class="xcms-iconfont" :class="'icon-'+item.icon"></em>
                        <span class='text'>
                            {{item.menuName}}
                        </span>
                    </a>
                </el-tooltip>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    import {scaleLinks} from '../../filters/';
    import {Tooltip} from 'element-ui';
    //    import {getNowCookie, toObject, resetUserInfoCookie} from 'xcms-common-plugins/src/utils/';
    import { addClass, removeClass, getNowCookie} from '../../utils/';
    const prefixCls = 'xcms-mainmenu';
    export default {
        data() {
            return {
                menuflag: false
            };
        },
        computed: {
            hrefValue() {
                return window.location.href;
            },
            classes() {
                return [
                        `${prefixCls}`,
                        {
                            [`${prefixCls}-sort`]: this.menuflag
                        }
                ];
            },
            tipflag() {
                return !this.menuflag
            },
            menuData() {
                var menuList = window.localStorage.getItem('menuList');
                var datas = menuList ? JSON.parse(menuList) : [];
                var result = [];
                if(datas.length) {
                    datas.forEach((item, index) => {
                        this.$delete(item, 'subMenu')
                        result.push(item);
                    });
                }
                console.log(result);
                return result;
            }
        },
        methods: {
            menuItemClick(flag, event) {
                console.log(flag);
                if (flag) {
                    event.preventDefault();
                }
                // 判断是否认证信息
                var approveFlag = getNowCookie().userInfo.userStatus;
                console.log(approveFlag);
                switch (approveFlag) {
                    case '100' :
                        // 未认证
                        event.preventDefault();
                        this.$router.replace({
                            name: 'userinitial'
                        });
                        break;
                    case '200' :
                        // 认证中
                        event.preventDefault();
                        console.log(123123123);
                        this.$router.replace({
                            name: 'userauthentication'
                        });
                        console.log(123123123);
                        break;
                    case '300' :
                        // 驳回
                        event.preventDefault();
                        this.$router.replace({
                            name: 'reject'
                        });
                        break;
                    case '400' :
                        // 已认证
                        break;
                }
            },
            changeWidth() {
                this.menuflag = !this.menuflag;
                if (this.menuflag) {
                    this.$nextTick(() => {
                        addClass(document.querySelector('body'), 'body-mainmenu-sort');
                    });
                } else {
                    this.$nextTick(() => {
                        removeClass(document.querySelector('body'), 'body-mainmenu-sort');
                    });
                }
            }
        },
        filters: {
            scaleLinks
        },
        components: {
            'el-tooltip': Tooltip
        },
        destroyed() {
            removeClass(document.querySelector('body'), 'body-mainmenu-sort');
        }
    };
</script>
