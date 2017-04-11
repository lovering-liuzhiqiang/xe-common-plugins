<template>
    <div :class="classes">
        <div class="btn-mainmenu" @click='changeWidth'>
            <span class="u-icon">{{menuflag ? '展开' : '收起'}}</span>
        </div>
        <ul>
            <li v-for="(item, pindex) in menuData" :key="item.id" :class="{'active': item.url ? new RegExp(item.url, 'g').test(hrefValue) : false}" @click="menuItemClick(item.url ? new RegExp(item.url, 'g').test(hrefValue) : false, $event)">
                <el-tooltip effect="light" popper-class='mainmenu-tip' :disabled='tipflag' :content="item.menuName" placement="right">
                    <a target="_blank" :href="item.url | scaleLinks">
                        <em class="u-icon el-icon-menu"></em>
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
    import { addClass, removeClass } from '../../utils/';
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
                var approveFlag = this.$xeCookies.get('approveFlag');
                switch (approveFlag) {
                    case 'NOT_THROUGH' :
                        // 未验证
                        event.preventDefault();
                        this.$router.replace({
                            name: 'userinitial'
                        });
                        break;
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
                        this.$router.replace({
                            name: 'userauthentication'
                        });
                        break;
                    case '300' :
                        // 驳回
                        event.preventDefault();
                        this.$router.replace({
                            name: 'reject'
                        });
                        break;
                    default :
                        next({
                            path: '/'
                        });
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
        }
    };
</script>
